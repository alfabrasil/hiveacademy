import React, { useState, useEffect, useRef } from 'react';
import { Target, Shield, Zap, Skull, Trophy, X, Sword, Clock, Activity, MessageSquare } from 'lucide-react';
import HoneyButton from '../ui/HoneyButton';
import BeeAvatar from '../ui/BeeAvatar';
import ProgressBar from '../ui/ProgressBar';
import { QUIZ_WORDS, LESSONS_CONTENT } from '../../data/gameData';

const ATTACK_TYPES = {
  quick: { name: 'Ferroada Rápida', damage: 15, cost: 5, time: 5000, color: 'text-yellow-500' },
  heavy: { name: 'Zumbido Sônico', damage: 30, cost: 15, time: 8000, color: 'text-red-500' },
  heal: { name: 'Mel Curativo', heal: 25, cost: 20, time: 6000, color: 'text-green-500' }
};

const PvPArenaScreen = ({ bee, setBee, wallet, setWallet, addTransaction, playSound, addNotification, onClose }) => {
  const [phase, setPhase] = useState('lobby'); // lobby, searching, battle, victory, defeat
  const [opponent, setOpponent] = useState(null);
  const [playerHP, setPlayerHP] = useState(100);
  const [opponentHP, setOpponentHP] = useState(100);
  const [turn, setTurn] = useState('player'); // player, opponent
  const [battleLog, setBattleLog] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedAttack, setSelectedAttack] = useState(null);
  const [shake, setShake] = useState({ player: false, opponent: false });
  const [betAmount, setBetAmount] = useState(10);
  
  const timerRef = useRef(null);

  // Efeito de tremer a tela ao receber dano
  useEffect(() => {
    if (shake.player || shake.opponent) {
      const timeout = setTimeout(() => setShake({ player: false, opponent: false }), 500);
      return () => clearTimeout(timeout);
    }
  }, [shake]);

  // Timer do turno
  useEffect(() => {
    if (phase === 'battle' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 100);
      }, 100);
    } else if (timeLeft <= 0 && phase === 'battle') {
      clearInterval(timerRef.current);
      if (turn === 'player' && currentQuestion) {
        handleTimeOut();
      }
    }
    return () => clearInterval(timerRef.current);
  }, [phase, timeLeft, turn]);

  const addToLog = (msg, type = 'info') => {
    setBattleLog(prev => [{ msg, type, id: Date.now() }, ...prev].slice(0, 5));
  };

  const startSearch = () => {
    if (wallet.hny < betAmount) {
      playSound('error');
      addNotification(`Precisa de ${betAmount} HNY para apostar!`);
      return;
    }
    
    playSound('pop');
    setWallet(prev => ({ ...prev, hny: prev.hny - betAmount }));
    addTransaction('expense', betAmount, 'Aposta PvP Arena');
    
    setPhase('searching');
    
    // Simula busca
    setTimeout(() => {
      const oppLevel = Math.max(1, bee.level + Math.floor(Math.random() * 3) - 1);
      const oppNames = ["Zangão Furioso", "Vespa Ninja", "Queen B", "Killer Bee", "Robo-Bee"];
      const randomName = oppNames[Math.floor(Math.random() * oppNames.length)];
      
      setOpponent({
        name: randomName,
        level: oppLevel,
        maxHP: 100 + (oppLevel * 10),
        avatarColor: ['bg-red-500', 'bg-purple-500', 'bg-black'][Math.floor(Math.random() * 3)]
      });
      setOpponentHP(100 + (oppLevel * 10));
      setPlayerHP(100 + (bee.level * 5)); // Player HP bonus por nível
      
      playSound('celebration');
      setPhase('battle');
      setTurn('player');
      addToLog(`Encontrou ${randomName} (Lvl ${oppLevel})!`, 'warning');
    }, 2500);
  };

  const generateQuestion = () => {
    // Mistura palavras do quiz e lições
    const allWords = [...QUIZ_WORDS];
    
    // Tenta pegar frases das lições se disponível
    Object.values(LESSONS_CONTENT).forEach(lesson => {
      lesson.forEach(item => {
        if (item.en && item.pt && item.en.split(' ').length < 4) { // Apenas frases curtas
          allWords.push({ en: item.en, pt: item.pt });
        }
      });
    });

    const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
    
    // Gera opções erradas
    const wrongOptions = allWords
      .filter(w => w.pt !== randomWord.pt)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(w => w.pt);
      
    const options = [...wrongOptions, randomWord.pt].sort(() => 0.5 - Math.random());
    
    return {
      word: randomWord.en,
      correct: randomWord.pt,
      options
    };
  };

  const prepareAttack = (type) => {
    if (bee.energy < ATTACK_TYPES[type].cost) {
      playSound('error');
      addNotification("Energia insuficiente!");
      return;
    }
    
    setSelectedAttack(type);
    const question = generateQuestion();
    setCurrentQuestion(question);
    setTimeLeft(ATTACK_TYPES[type].time);
    playSound('pop');
  };

  const handleAnswer = (answer) => {
    clearInterval(timerRef.current);
    const isCorrect = answer === currentQuestion.correct;
    const attack = ATTACK_TYPES[selectedAttack];
    
    if (isCorrect) {
      playSound('success');
      // Dano base + Bonus de Nível + Bonus de Formação
      const damage = Math.floor(attack.damage * (1 + bee.level * 0.1) * bee.formationIndex);
      
      if (selectedAttack === 'heal') {
        setPlayerHP(prev => Math.min(100 + (bee.level * 5), prev + attack.heal));
        addToLog(`Curou ${attack.heal} HP!`, 'success');
        addNotification(`Cura realizada! +${attack.heal} HP`);
      } else {
        setOpponentHP(prev => Math.max(0, prev - damage));
        setShake(prev => ({ ...prev, opponent: true }));
        addToLog(`Acertou! Causou ${damage} de dano!`, 'success');
      }

      setBee(prev => ({ ...prev, energy: Math.max(0, prev.energy - attack.cost) }));
      
      if (opponentHP - damage <= 0 && selectedAttack !== 'heal') {
        setTimeout(() => handleVictory(), 1000);
        return;
      }
    } else {
      playSound('error');
      addToLog(`Errou! Ataque falhou.`, 'error');
      addNotification(`Errado! Era "${currentQuestion.correct}"`);
    }
    
    setCurrentQuestion(null);
    setSelectedAttack(null);
    setTurn('opponent');
    setTimeout(opponentTurn, 1500);
  };

  const handleTimeOut = () => {
    playSound('error');
    addToLog(`Tempo esgotado! Perdeu o turno.`, 'error');
    setCurrentQuestion(null);
    setSelectedAttack(null);
    setTurn('opponent');
    setTimeout(opponentTurn, 1500);
  };

  const opponentTurn = () => {
    if (phase !== 'battle') return;
    
    // IA Simples
    const damage = Math.floor((10 + opponent.level * 2) * (Math.random() * 0.5 + 0.8));
    const hitChance = 0.7; // 70% de chance de acertar
    
    if (Math.random() < hitChance) {
      playSound('error'); // Som de dano
      setPlayerHP(prev => Math.max(0, prev - damage));
      setShake(prev => ({ ...prev, player: true }));
      addToLog(`${opponent.name} atacou! -${damage} HP`, 'warning');
      
      if (playerHP - damage <= 0) {
        setTimeout(() => handleDefeat(), 1000);
        return;
      }
    } else {
      addToLog(`${opponent.name} errou o ataque!`, 'info');
    }
    
    setTurn('player');
  };

  const handleVictory = () => {
    setPhase('victory');
    playSound('celebration');
    const prize = betAmount * 2;
    const exp = 50 + (opponent.level * 10);
    
    setWallet(prev => ({ ...prev, hny: prev.hny + prize }));
    addTransaction('income', prize, 'Vitória PvP Arena');
    
    setBee(prev => {
      const newExp = prev.exp + exp;
      const newLevel = Math.floor(newExp / 100) + 1;
      return { ...prev, exp: newExp, level: newLevel };
    });
  };

  const handleDefeat = () => {
    setPhase('defeat');
    playSound('error');
    // Perdeu a aposta (já descontada no início)
  };

  // --- RENDERIZADORES ---

  const renderLobby = () => (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-slide-up">
      <div className="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.5)] animate-pulse">
        <Sword size={64} className="text-white" />
      </div>
      
      <div>
        <h2 className="text-3xl font-black text-white uppercase drop-shadow-md">Arena PvP</h2>
        <p className="text-gray-300 font-bold">Desafie outras abelhas em batalhas de conhecimento!</p>
      </div>

      <div className="bg-white/10 p-4 rounded-2xl w-full max-w-xs backdrop-blur-sm border border-white/20">
        <p className="text-sm text-gray-300 font-bold mb-2">Sua Aposta:</p>
        <div className="flex items-center justify-between bg-black/30 rounded-xl p-2">
          <button onClick={() => setBetAmount(Math.max(10, betAmount - 10))} className="p-2 text-white hover:text-red-400 font-bold">-</button>
          <span className="text-xl font-black text-[#FFC83D]">{betAmount} HNY</span>
          <button onClick={() => setBetAmount(betAmount + 10)} className="p-2 text-white hover:text-green-400 font-bold">+</button>
        </div>
        <p className="text-xs text-gray-400 mt-2">Prêmio: <span className="text-green-400">{betAmount * 2} HNY</span></p>
      </div>

      <HoneyButton onClick={startSearch} variant="action" className="w-full max-w-xs bg-gradient-to-r from-red-600 to-orange-600 border-red-800 hover:scale-105">
        Procurar Oponente
      </HoneyButton>
      
      <button onClick={onClose} className="text-gray-400 text-sm font-bold hover:text-white underline">
        Voltar para Home
      </button>
    </div>
  );

  const renderSearching = () => (
    <div className="flex flex-col items-center justify-center h-full text-center animate-slide-up">
      <div className="w-24 h-24 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-8"></div>
      <h3 className="text-2xl font-black text-white animate-pulse">Procurando Oponente...</h3>
      <p className="text-gray-400 mt-2 font-medium">Analisando níveis de conhecimento...</p>
    </div>
  );

  const renderBattle = () => (
    <div className="flex flex-col h-full animate-slide-up relative">
      {/* HUD Superior */}
      <div className="flex justify-between items-center bg-black/40 p-3 rounded-2xl backdrop-blur-md border border-white/10 mb-4">
        {/* Player */}
        <div className={`flex flex-col items-start w-[45%] ${shake.player ? 'animate-shake' : ''}`}>
          <div className="flex items-center gap-2 mb-1">
             <div className="w-8 h-8 bg-[#FFC83D] rounded-full border-2 border-white flex items-center justify-center overflow-hidden">
                <span className="text-xs font-black text-black">EU</span>
             </div>
             <span className="text-white font-bold text-sm truncate">{bee.name}</span>
          </div>
          <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden border border-white/20">
             <div 
               className="h-full bg-green-500 transition-all duration-500" 
               style={{ width: `${(playerHP / (100 + bee.level * 5)) * 100}%` }}
             ></div>
          </div>
          <span className="text-xs text-white font-mono mt-1">{playerHP} HP</span>
        </div>

        <div className="text-red-500 font-black text-xl italic">VS</div>

        {/* Oponente */}
        <div className={`flex flex-col items-end w-[45%] ${shake.opponent ? 'animate-shake' : ''}`}>
          <div className="flex items-center gap-2 mb-1 flex-row-reverse">
             <div className={`w-8 h-8 ${opponent.avatarColor} rounded-full border-2 border-white flex items-center justify-center overflow-hidden`}>
                <Skull size={16} className="text-white"/>
             </div>
             <span className="text-white font-bold text-sm truncate">{opponent.name}</span>
          </div>
          <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden border border-white/20">
             <div 
               className="h-full bg-red-500 transition-all duration-500" 
               style={{ width: `${(opponentHP / opponent.maxHP) * 100}%` }}
             ></div>
          </div>
          <span className="text-xs text-white font-mono mt-1">{opponentHP} HP</span>
        </div>
      </div>

      {/* Arena Central */}
      <div className="flex-1 flex flex-col justify-center items-center relative my-4">
         {currentQuestion ? (
           <div className="w-full bg-white dark:bg-[#222] rounded-[30px] p-6 shadow-2xl border-4 border-blue-500 animate-slide-up z-20">
             <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Traduza Rápido!</span>
                <div className="flex items-center gap-1 text-red-500 font-black">
                   <Clock size={16} /> {(timeLeft / 1000).toFixed(1)}s
                </div>
             </div>
             
             <h3 className="text-3xl font-black text-center text-gray-800 dark:text-white mb-6">"{currentQuestion.word}"</h3>
             
             <div className="grid grid-cols-2 gap-3">
               {currentQuestion.options.map((opt, idx) => (
                 <button
                   key={idx}
                   onClick={() => handleAnswer(opt)}
                   className="p-4 bg-gray-100 dark:bg-black/40 rounded-xl font-bold text-gray-700 dark:text-gray-200 hover:bg-blue-500 hover:text-white transition-all border-2 border-transparent hover:border-blue-300 active:scale-95"
                 >
                   {opt}
                 </button>
               ))}
             </div>
             
             <div className="h-1 bg-gray-200 mt-4 rounded-full overflow-hidden">
               <div className="h-full bg-blue-500 transition-all duration-100" style={{ width: `${(timeLeft / ATTACK_TYPES[selectedAttack].time) * 100}%` }}></div>
             </div>
           </div>
         ) : (
           <div className="text-center space-y-4">
             <div className="bg-black/40 p-4 rounded-2xl backdrop-blur-sm h-32 overflow-y-auto flex flex-col-reverse text-sm font-medium border border-white/10">
               {battleLog.map((log) => (
                 <p key={log.id} className={`text-left ${log.type === 'error' ? 'text-red-400' : log.type === 'success' ? 'text-green-400' : log.type === 'warning' ? 'text-yellow-400' : 'text-gray-300'}`}>
                   • {log.msg}
                 </p>
               ))}
             </div>
             
             {turn === 'player' ? (
               <div className="grid grid-cols-3 gap-2 w-full animate-slide-up">
                 <button 
                   onClick={() => prepareAttack('quick')}
                   className={`bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-xl shadow-lg border-b-4 border-yellow-700 active:border-b-0 active:translate-y-1 transition-all flex flex-col items-center gap-1 ${bee.energy < 5 ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                 >
                   <Zap size={24} />
                   <span className="text-xs font-black uppercase">Rápido</span>
                   <span className="text-[10px] bg-black/20 px-1 rounded">5 Energy</span>
                 </button>
                 
                 <button 
                   onClick={() => prepareAttack('heavy')}
                   className={`bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl shadow-lg border-b-4 border-red-700 active:border-b-0 active:translate-y-1 transition-all flex flex-col items-center gap-1 ${bee.energy < 15 ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                 >
                   <Target size={24} />
                   <span className="text-xs font-black uppercase">Forte</span>
                   <span className="text-[10px] bg-black/20 px-1 rounded">15 Energy</span>
                 </button>
                 
                 <button 
                   onClick={() => prepareAttack('heal')}
                   className={`bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl shadow-lg border-b-4 border-green-700 active:border-b-0 active:translate-y-1 transition-all flex flex-col items-center gap-1 ${bee.energy < 20 ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                 >
                   <Activity size={24} />
                   <span className="text-xs font-black uppercase">Curar</span>
                   <span className="text-[10px] bg-black/20 px-1 rounded">20 Energy</span>
                 </button>
               </div>
             ) : (
               <div className="p-4 bg-red-500/20 rounded-xl border border-red-500/50 animate-pulse">
                 <p className="text-red-200 font-bold uppercase tracking-widest">Turno do Oponente...</p>
               </div>
             )}
             
             {/* BOTÃO DE FUGIR/SAIR CASO FIQUE PRESO SEM ENERGIA */}
             {turn === 'player' && bee.energy < 5 && (
                <div className="animate-pulse mt-4">
                  <HoneyButton onClick={() => handleDefeat()} variant="secondary" className="w-full border-red-500 text-red-500">
                     Fugir da Batalha (Sem Energia)
                  </HoneyButton>
                </div>
             )}
           </div>
         )}
      </div>
      
      <button onClick={onClose} className="absolute top-0 right-0 p-2 text-white/50 hover:text-white z-50 bg-black/50 rounded-full m-2">
        <X size={24} />
      </button>
    </div>
  );

  const renderResult = (result) => (
    <div className="flex flex-col items-center justify-center h-full text-center animate-slide-up space-y-6">
      <div className={`w-32 h-32 rounded-full flex items-center justify-center shadow-[0_0_50px_currentColor] ${result === 'win' ? 'bg-green-500 text-green-200' : 'bg-red-500 text-red-200'}`}>
        {result === 'win' ? <Trophy size={64} className="text-white animate-bounce" /> : <Skull size={64} className="text-white" />}
      </div>
      
      <div>
        <h2 className={`text-4xl font-black uppercase ${result === 'win' ? 'text-green-400' : 'text-red-500'}`}>
          {result === 'win' ? 'Vitória!' : 'Derrota'}
        </h2>
        <p className="text-gray-300 font-bold mt-2">
          {result === 'win' ? `Você ganhou ${betAmount * 2} HNY!` : 'Você perdeu a aposta.'}
        </p>
      </div>

      <HoneyButton onClick={() => setPhase('lobby')} variant={result === 'win' ? 'primary' : 'secondary'} className="w-full max-w-xs">
        Jogar Novamente
      </HoneyButton>
      
      <button onClick={onClose} className="text-gray-400 text-sm font-bold hover:text-white underline">
        Sair da Arena
      </button>
    </div>
  );

  return (
    <div className="absolute inset-0 z-50 bg-[#1A1A1A] flex flex-col items-center justify-center p-4 animate-slide-up overflow-hidden">
      <div className="w-full h-full max-w-md bg-[#1A1A1A] rounded-[30px] border-2 border-gray-800 shadow-2xl relative overflow-hidden p-4 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] flex flex-col">
        
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 pointer-events-none"></div>
        
        <div className="relative z-10 h-full flex flex-col">
          {phase === 'lobby' && renderLobby()}
          {phase === 'searching' && renderSearching()}
          {phase === 'battle' && renderBattle()}
          {phase === 'victory' && renderResult('win')}
          {phase === 'defeat' && renderResult('loss')}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default PvPArenaScreen;
