import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Book, 
  Coffee, 
  Moon, 
  Sun, 
  Briefcase, 
  Heart, 
  Settings, 
  Home, 
  ShoppingBag, 
  Lock, 
  ChevronUp,
  Award,
  Zap,
  Shield,
  Activity,
  Wrench,
  Droplet,
  DollarSign,
  Menu,
  Globe,
  User,
  FileText,
  Play,
  Target,
  Cpu,
  X,
  Package,
  ShoppingCart,
  Trophy,
  CheckCircle,
  Star,
  Medal,
  MessageSquare,
  MessageCircle,
  Send,
  Volume2,
  Flame,
  PartyPopper,
  BookOpen,
  AlertTriangle,
  Plane,
  Bed,
  Car,
  MapPin,
  Compass,
  Gem,
  Shirt,
  Mic,
  AlignLeft,
  Gift,
  Headphones
} from 'lucide-react';

import { playSound, speakEnglish } from './utils/audio';

import { 
  CONVERSION_RATE, 
  BASE_INVESTMENT_USD, 
  ACHIEVEMENTS_LIST, 
  TRAVEL_SCENARIOS, 
  SENTENCE_GAMES, 
  CURRICULUM, 
  LESSONS_CONTENT,
  CONVERSATIONS, 
  QUIZ_WORDS, 
  PROFESSIONS, 
  COSMETICS 
} from './data/gameData';

import HoneyButton from './components/ui/HoneyButton';
import ProgressBar from './components/ui/ProgressBar';
import BeeAvatar from './components/ui/BeeAvatar';
import HiveBackground from './components/layout/HiveBackground';

import SettingsScreen from './components/screens/SettingsScreen';
import TeamScreen from './components/screens/TeamScreen';
import RankingScreen from './components/screens/RankingScreen';
import ReportsScreen from './components/screens/ReportsScreen';
import AchievementsScreen from './components/screens/AchievementsScreen';
import WalletScreen from './components/screens/WalletScreen';
import AcademyScreen from './components/screens/AcademyScreen';
import PvPArenaScreen from './components/screens/PvPArenaScreen';
import HomeScreen from './components/screens/HomeScreen';
import VaultScreen from './components/screens/VaultScreen';
import ShopScreen from './components/screens/ShopScreen';
import WarehouseScreen from './components/screens/WarehouseScreen';























export default function App() {
  const [isRegistered, setIsRegistered] = useState(() => {
    const saved = localStorage.getItem('hive_isRegistered');
    return saved !== null ? JSON.parse(saved) : false;
  });
  
  const [bee, setBee] = useState(() => {
    const saved = localStorage.getItem('hive_bee');
    return saved !== null ? JSON.parse(saved) : {
      name: 'Buzzy',
      ageDays: 0,
      stage: 'Jovem', 
      profession: null,
      equippedAccessory: null,
      hunger: 80,
      energy: 100,
      cleanliness: 90,
      happiness: 100,
      exp: 0,
      level: 1,
      formationIndex: 1.0,
      activityIndex: 1.0,
      consecutiveStudyDays: 0,
      lastStudyDay: -1,
      totalProduced: 0
    };
  });

  const [wallet, setWallet] = useState(() => {
    const saved = localStorage.getItem('hive_wallet');
    return saved !== null ? JSON.parse(saved) : {
      hny: 50,
      usdInvested: BASE_INVESTMENT_USD, 
      vaultContribution: 0
    };
  });

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('hive_history');
    return saved !== null ? JSON.parse(saved) : [
      { id: 1, type: 'income', amount: 50, desc: 'Bónus de Boas-Vindas', date: new Date().toLocaleDateString() }
    ];
  });

  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('hive_inventory');
    return saved !== null ? JSON.parse(saved) : {
      food: 5,
      clean: 3,
      vitamin: 1
    };
  });

  const [isNight, setIsNight] = useState(() => {
    const saved = localStorage.getItem('hive_isNight');
    return saved !== null ? JSON.parse(saved) : false;
  });

  const [dictionary, setDictionary] = useState(() => {
    const saved = localStorage.getItem('hive_dictionary');
    return saved !== null ? JSON.parse(saved) : [];
  });

  const [ownedAccessories, setOwnedAccessories] = useState(() => {
    const saved = localStorage.getItem('hive_ownedAccessories');
    return saved !== null ? JSON.parse(saved) : [];
  });

  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem('hive_achievements');
    return saved !== null ? JSON.parse(saved) : [];
  });
  
  const [showHearts, setShowHearts] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showSpinModal, setShowSpinModal] = useState(false);
  const [spinResult, setSpinResult] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinUsage, setSpinUsage] = useState(() => {
    const saved = localStorage.getItem('hive_spinUsage');
    if (saved !== null) {
      try {
        return JSON.parse(saved);
      } catch {
      }
    }
    const beeSaved = localStorage.getItem('hive_bee');
    let initialDay = 0;
    if (beeSaved !== null) {
      try {
        const parsed = JSON.parse(beeSaved);
        initialDay = parsed.ageDays || 0;
      } catch {
        initialDay = 0;
      }
    }
    return { day: initialDay, freeUsed: false, paidCount: 0 };
  });

  const [currentTab, setCurrentTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfModal, setShowProfModal] = useState(false);
  const [showDictionaryModal, setShowDictionaryModal] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const [studySession, setStudySession] = useState({ active: false, step: 0, phrases: [], revealed: false, earnedExp: 0 });
  const [chatSession, setChatSession] = useState({ active: false, dialogue: null, step: 0, history: [], mistakes: 0, finished: false });
  const [quizState, setQuizState] = useState({ active: false, questions: [], currentIndex: 0, correctCount: 0, finished: false });
  const [activeScenario, setActiveScenario] = useState(null); 
  const [sentenceState, setSentenceState] = useState({ active: false, questions: [], currentIndex: 0, selectedWords: [], correctCount: 0, finished: false });
  const [listeningGameState, setListeningGameState] = useState({ active: false, questions: [], currentIndex: 0, correctCount: 0, finished: false });

  const [walletAction, setWalletAction] = useState(null);
  const [walletInput, setWalletInput] = useState('');

  const [levelUpData, setLevelUpData] = useState(null);
  const [showMissions, setShowMissions] = useState(false);
  
  const [missions, setMissions] = useState(() => {
    const saved = localStorage.getItem('hive_missions');
    return saved !== null ? JSON.parse(saved) : [
      { id: 1, title: 'Alimentar a Abelha', reward: 5, done: false, claimed: false },
      { id: 2, title: 'Estudar um Idioma', reward: 10, done: false, claimed: false },
      { id: 3, title: 'Manter a Higiene', reward: 5, done: false, claimed: false }
    ];
  });

  useEffect(() => {
    localStorage.setItem('hive_isRegistered', JSON.stringify(isRegistered));
    localStorage.setItem('hive_bee', JSON.stringify(bee));
    localStorage.setItem('hive_wallet', JSON.stringify(wallet));
    localStorage.setItem('hive_inventory', JSON.stringify(inventory));
    localStorage.setItem('hive_isNight', JSON.stringify(isNight));
    localStorage.setItem('hive_history', JSON.stringify(history));
    localStorage.setItem('hive_missions', JSON.stringify(missions));
    localStorage.setItem('hive_dictionary', JSON.stringify(dictionary));
    localStorage.setItem('hive_achievements', JSON.stringify(achievements));
    localStorage.setItem('hive_ownedAccessories', JSON.stringify(ownedAccessories));
    localStorage.setItem('hive_spinUsage', JSON.stringify(spinUsage));
  }, [isRegistered, bee, wallet, inventory, isNight, history, missions, dictionary, achievements, ownedAccessories, spinUsage]);

  useEffect(() => {
    if (!isRegistered) return;
    const newlyUnlocked = [];
    if (dictionary.length >= 3 && !achievements.includes('first_words')) newlyUnlocked.push('first_words');
    if (wallet.hny >= 200 && !achievements.includes('rich_bee')) newlyUnlocked.push('rich_bee');
    if (bee.consecutiveStudyDays >= 3 && !achievements.includes('scholar')) newlyUnlocked.push('scholar');
    if (bee.level >= 5 && !achievements.includes('level_5')) newlyUnlocked.push('level_5');

    if (newlyUnlocked.length > 0) {
      setAchievements(prev => [...prev, ...newlyUnlocked]);
      newlyUnlocked.forEach(id => {
         const ach = ACHIEVEMENTS_LIST.find(a => a.id === id);
         if(ach) {
           setTimeout(() => {
             playSound('celebration');
             addNotification(`🏆 Conquista: ${ach.title}!`);
           }, 500); 
         }
      });
    }
  }, [dictionary.length, wallet.hny, bee.consecutiveStudyDays, bee.level, achievements, isRegistered]);

  const speakEnglishText = (text, e) => {
    speakEnglish(text, e);
  };

  const handleSpeechPractice = (expectedText, e) => {
    if (e) e.stopPropagation();
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      playSound('error');
      addNotification("O seu navegador não suporta microfone.");
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    playSound('pop');

    recognition.start();

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript.toLowerCase().replace(/[.,!?]/g, '').trim();
      const target = expectedText.toLowerCase().replace(/[.,!?]/g, '').trim();
      
      setIsListening(false);

      if (target.includes(speechResult) || speechResult.includes(target)) {
         playSound('success');
         addNotification(`Excelente pronúncia! 🎙️✨ (+5 EXP)`);
         setBee(p => ({...p, exp: p.exp + 5}));
      } else {
         playSound('error');
         addNotification(`Ouvi "${speechResult}". Tente falar mais devagar!`);
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      if(event.error === 'not-allowed') {
         addNotification("Permissão de microfone negada.");
      } else {
         addNotification("Não consegui ouvir. Tente novamente.");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const addNotification = (msg) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, msg }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const addTransaction = (type, amount, desc) => {
    const now = new Date();
    const dateStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    setHistory(prev => [{ id: Date.now(), type, amount, desc, date: dateStr }, ...prev].slice(0, 30));
  };

  const getStageByAge = (age) => {
    if (age < 15) return 'Jovem';
    if (age < 30) return 'Adolescente';
    if (age < 240) return 'Adulta';
    return 'Idosa';
  };

  const calculateIndexes = (currentBee) => {
    const avgStatus = (currentBee.hunger + currentBee.energy + currentBee.cleanliness) / 300;
    const activityIndex = Math.max(0.5, Math.min(1.5, avgStatus * 1.5));
    return { activityIndex };
  };

  const calculateDailyProduction = (currentBee, investUsd) => {
    if (currentBee.stage !== 'Adulta' && currentBee.stage !== 'Idosa') return 0;
    const profData = PROFESSIONS[currentBee.profession];
    const profMult = profData ? profData.mult : 1.0;
    const investHNY = investUsd * CONVERSION_RATE;
    let pd = (investHNY * currentBee.formationIndex * currentBee.activityIndex * profMult) / 1000;
    if (currentBee.ageDays > 240) pd *= 0.85; 
    if (currentBee.ageDays > 270) pd *= 0.30; 
    return pd;
  };

  const resetSave = () => {
    if (window.confirm("Tem a certeza? Todo o progresso será perdido.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const advanceDay = () => {
    let earnedShare = 0;
    const nextAge = bee.ageDays + 1;
    playSound('pop'); 
    
    setBee(prev => {
      // Verifica Streak
      let newConsecutive = prev.consecutiveStudyDays;
      if (prev.lastStudyDay !== prev.ageDays) {
         // Se não estudou no dia que passou (ageDays), perde o streak
         // Ex: Estava no dia 5. Se lastStudyDay for 4, ok. Se for 5, ok. 
         // Mas se lastStudyDay for diferente de ageDays (5), significa que hoje (5) não estudou.
         // Então zera.
         if (newConsecutive > 0) {
            addNotification("Que pena! Perdeu a ofensiva de estudos. 😢");
            newConsecutive = 0;
         }
      }

      const newAge = prev.ageDays + 1;
      const newStage = getStageByAge(newAge);
      const newHunger = Math.max(0, prev.hunger - (isNight ? 10 : 30));
      const newEnergy = Math.max(0, prev.energy - (isNight ? -40 : 20)); 
      const newClean = Math.max(0, prev.cleanliness - 15);
      
      const tempBee = { 
          ...prev, 
          hunger: newHunger, 
          energy: newEnergy, 
          cleanliness: newClean, 
          ageDays: newAge, 
          stage: newStage,
          consecutiveStudyDays: newConsecutive
      };
      const { activityIndex } = calculateIndexes(tempBee);
      tempBee.activityIndex = parseFloat(activityIndex.toFixed(2));

      if (newStage === 'Adolescente' && !prev.profession) {
        setShowProfModal(true);
      }

      if ((newStage === 'Adulta' || newStage === 'Idosa') && tempBee.profession) {
        const investHNY = wallet.usdInvested * CONVERSION_RATE;
        const maxProfit = investHNY * 2; 
        
        if (tempBee.totalProduced >= maxProfit) {
            earnedShare = 0;
            addNotification("🛑 Limite de 200% de lucro atingido! Aposente a abelha.");
        } else {
            let pd = calculateDailyProduction(tempBee, wallet.usdInvested);
            earnedShare = pd * 0.5;
            
            if (tempBee.totalProduced + earnedShare > maxProfit) {
                earnedShare = maxProfit - tempBee.totalProduced;
            }
            tempBee.totalProduced += earnedShare;
        }
      }
      return tempBee;
    });

    if (earnedShare > 0) {
      setWallet(w => ({
        ...w,
        hny: parseFloat((w.hny + earnedShare).toFixed(2)),
        vaultContribution: parseFloat((w.vaultContribution + earnedShare).toFixed(2))
      }));
      addTransaction('income', earnedShare, `Rendimento (Dia ${nextAge})`);
      addNotification(`Dia ${nextAge}: +${earnedShare.toFixed(1)} HNY Produzidos!`);
    } else if (bee.totalProduced >= wallet.usdInvested * CONVERSION_RATE * 2) {
      addNotification(`Dia ${nextAge}. A abelha não produz mais (Limite 200%).`);
    } else {
      addNotification(`Dia ${nextAge} alcançado!`);
    }
  };

  const feedBee = () => {
    if (inventory.food > 0) {
      playSound('pop');
      setInventory(prev => ({ ...prev, food: prev.food - 1 }));
      setBee(p => ({ ...p, hunger: Math.min(100, p.hunger + 30) }));
      setMissions(m => m.map(x => x.id === 1 ? { ...x, done: true } : x));
      addNotification("Alimentada! (-1 Ração)");
    } else {
      playSound('error');
      addNotification("Sem Ração! Vá à Loja comprar mais.");
    }
  };
  
  const cleanBee = () => {
    if (inventory.clean > 0) {
      playSound('pop');
      setInventory(prev => ({ ...prev, clean: prev.clean - 1 }));
      setBee(p => ({ ...p, cleanliness: 100 }));
      setMissions(m => m.map(x => x.id === 3 ? { ...x, done: true } : x));
      addNotification("Limpinha! (-1 Kit)");
    } else {
      playSound('error');
      addNotification("Sem Kit de Limpeza! Vá à Loja.");
    }
  };

  const petBee = () => {
    if (isNight) return;
    playSound('success'); 
    setShowHearts(true);
    setBee(p => ({ ...p, happiness: Math.min(100, p.happiness + 5) }));
    setTimeout(() => setShowHearts(false), 1000);
  };

  const useVitamin = () => {
    if (inventory.vitamin > 0) {
      playSound('success');
      setInventory(prev => ({ ...prev, vitamin: prev.vitamin - 1 }));
      setBee(p => ({ ...p, energy: 100, happiness: 100 }));
      addNotification("Vitamina consumida! (+Energia)");
    } else {
      playSound('error');
      addNotification("Sem Vitamina! Vá à Loja comprar mais.");
    }
  };

  const study = (lessonId = null) => {
    if (isNight || bee.energy < 20) {
      playSound('error');
      return;
    }
    playSound('pop');
    
    let stagePhrases;
    if (lessonId && LESSONS_CONTENT[lessonId]) {
      stagePhrases = LESSONS_CONTENT[lessonId];
    } else {
      stagePhrases = CURRICULUM[bee.stage] || CURRICULUM['Jovem'];
    }

    const shuffled = [...stagePhrases].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    setStudySession({ active: true, step: 0, phrases: selected, revealed: false, earnedExp: 0 });
  };

  const handleStudyEvaluation = (expAward) => {
    const nextStep = studySession.step + 1;
    const newTotalExp = studySession.earnedExp + expAward;
    const currentPhrase = studySession.phrases[studySession.step];

    if (!dictionary.some(w => w.en === currentPhrase.en)) {
      setDictionary(prev => [...prev, { en: currentPhrase.en, pt: currentPhrase.pt }]);
    }

    if (expAward === 15) playSound('success');
    else playSound('pop');

    if (nextStep < studySession.phrases.length) {
      setStudySession(prev => ({ ...prev, step: nextStep, revealed: false, earnedExp: newTotalExp }));
    } else {
      const finalExp = bee.exp + newTotalExp;
      const newLevel = Math.floor(finalExp / 100) + 1;
      const leveledUp = newLevel > bee.level;
      
      if (leveledUp) {
        playSound('celebration');
        setLevelUpData({ level: newLevel });
      } else {
        playSound('success');
        addNotification(`Revisão Concluída! +${newTotalExp} EXP`);
      }

      setBee(p => ({
        ...p,
        exp: finalExp,
        level: newLevel,
        formationIndex: Math.min(2.0, p.formationIndex + 0.05),
        energy: Math.max(0, p.energy - 15),
        consecutiveStudyDays: (p.consecutiveStudyDays || 0) + 1
      }));

      setMissions(m => m.map(x => x.id === 2 ? { ...x, done: true } : x));
      setStudySession({ active: false, step: 0, phrases: [], revealed: false, earnedExp: 0 });
    }
  };

  const startConversation = () => {
    if (isNight || bee.energy < 20) {
      playSound('error');
      addNotification("A abelha precisa de energia e luz do dia para praticar conversação!");
      return;
    }
    playSound('pop');
    const diag = CONVERSATIONS[bee.stage] || CONVERSATIONS['Jovem'];
    setChatSession({
       active: true,
       dialogue: diag,
       step: 1, 
       history: [diag.lines[0]], 
       mistakes: 0,
       finished: false
    });
  };

  const handleChatReply = (option) => {
    if (!option.correct) {
       playSound('error');
       addNotification("Isso não faz sentido no contexto! Tente novamente. ❌");
       setChatSession(p => ({ ...p, mistakes: p.mistakes + 1 }));
       return;
    }
    
    playSound('success');
    const nextNpcStep = chatSession.step + 1;
    const nextPlayerStep = chatSession.step + 2;
    
    const updatedHistory = [
        ...chatSession.history, 
        { type: 'player', text: option.text }
    ];
    
    if (nextNpcStep < chatSession.dialogue.lines.length) {
        updatedHistory.push(chatSession.dialogue.lines[nextNpcStep]);
    }

    setChatSession(p => ({
        ...p,
        history: updatedHistory,
        step: nextPlayerStep,
        finished: nextNpcStep >= chatSession.dialogue.lines.length
    }));
  };

  const finishConversation = () => {
    const mistakes = chatSession.mistakes;
    const expGained = Math.max(15, 60 - (mistakes * 15)); 
    
    const finalExp = bee.exp + expGained;
    const newLevel = Math.floor(finalExp / 100) + 1;
    
    if (newLevel > bee.level) {
       playSound('celebration');
       setLevelUpData({ level: newLevel });
    } else {
       playSound('success');
       addNotification(`Fluência Melhorada! +${expGained} EXP`);
    }

    setBee(p => ({
       ...p,
       exp: finalExp,
       level: newLevel,
       formationIndex: Math.min(2.0, p.formationIndex + 0.10), 
       energy: Math.max(0, p.energy - 20)
    }));

    setMissions(m => m.map(x => x.id === 2 ? { ...x, done: true } : x));
    setChatSession({ active: false, dialogue: null, step: 0, history: [], mistakes: 0, finished: false });
  };

  const retireBee = () => {
    playSound('celebration');
    setWallet(w => ({ ...w, hny: w.hny + 1000 }));
    addTransaction('income', 1000, 'Bónus de Aposentação');
    setBee(p => ({
      ...p,
      name: p.name + ' II',
      ageDays: 0,
      stage: 'Jovem',
      profession: null,
      equippedAccessory: null,
      hunger: 80,
      energy: 100,
      cleanliness: 100,
      exp: 0,
      level: 1,
      formationIndex: 1.0,
      activityIndex: 1.0,
      totalProduced: 0
    }));
    addNotification("Abelha aposentada com honras! +1000 HNY");
    setCurrentTab('home');
  };

  const finishScenarioTraining = () => {
    if (bee.energy >= 10) {
      playSound('success');
      const finalExp = bee.exp + 15;
      const newLevel = Math.floor(finalExp / 100) + 1;
      
      if (newLevel > bee.level) {
         playSound('celebration');
         setLevelUpData({ level: newLevel });
      } else {
         addNotification("Treino de Cenário concluído! -10 Energia | +15 EXP");
      }
      
      setBee(p => ({ ...p, energy: p.energy - 10, exp: finalExp, level: newLevel }));
      setActiveScenario(null);
      setCurrentTab('game');
    } else {
      playSound('error');
      addNotification("Energia insuficiente para treinar!");
    }
  };

  const startMiniGame = () => {
    const shuffled = [...QUIZ_WORDS].sort(() => 0.5 - Math.random()).slice(0, 3);
    setQuizState({ active: true, questions: shuffled, currentIndex: 0, correctCount: 0, finished: false });
    setCurrentTab('minigame');
  };

  const handleQuizAnswer = (selectedOption) => {
    const question = quizState.questions[quizState.currentIndex];
    const isCorrect = selectedOption === question.pt;
    const newCorrectCount = quizState.correctCount + (isCorrect ? 1 : 0);
    
    if (isCorrect) {
      playSound('success');
      addNotification("Correto! ✅");
      if (!dictionary.some(w => w.en === question.en)) {
        setDictionary(prev => [...prev, { en: question.en, pt: question.pt }]);
      }
    } else {
      playSound('error');
      addNotification(`Incorreto ❌. Era "${question.pt}".`);
    }
    
    if (quizState.currentIndex + 1 < quizState.questions.length) {
      setTimeout(() => {
        setQuizState(prev => ({ ...prev, currentIndex: prev.currentIndex + 1, correctCount: newCorrectCount }));
      }, 1000);
    } else {
      setTimeout(() => {
        setQuizState(prev => ({ ...prev, correctCount: newCorrectCount, finished: true }));
      }, 1000);
    }
  };

  const finishMiniGame = () => {
    const hnyReward = quizState.correctCount * 3; 
    const expReward = quizState.correctCount * 10; 
    
    playSound(quizState.correctCount > 0 ? 'celebration' : 'pop');

    if (hnyReward > 0) {
      setWallet(w => ({ ...w, hny: w.hny + hnyReward }));
      addTransaction('income', hnyReward, `Mini Jogo (${quizState.correctCount}/3 Acertos)`);
    }
    
    if (expReward > 0) {
      const finalExp = bee.exp + expReward;
      const newLevel = Math.floor(finalExp / 100) + 1;
      if (newLevel > bee.level) {
        setLevelUpData({ level: newLevel });
        playSound('celebration');
      }
      setBee(p => ({ ...p, exp: finalExp, level: newLevel }));
    }
    
    addNotification(`Fim do jogo! +${hnyReward} HNY | +${expReward} EXP`);
    setCurrentTab('game');
    setQuizState({ active: false, questions: [], currentIndex: 0, correctCount: 0, finished: false });
  };

  const startSentenceBuilder = () => {
    const shuffled = [...SENTENCE_GAMES].sort(() => 0.5 - Math.random()).slice(0, 3);
    setSentenceState({ active: true, questions: shuffled, currentIndex: 0, selectedWords: [], correctCount: 0, finished: false });
    setCurrentTab('sentenceBuilder');
  };

  const handleSelectSentenceWord = (word) => {
    setSentenceState(p => ({ ...p, selectedWords: [...p.selectedWords, word] }));
    playSound('pop');
  };

  const handleRemoveSentenceWord = (idx) => {
    setSentenceState(p => {
      const newWords = [...p.selectedWords];
      newWords.splice(idx, 1);
      return { ...p, selectedWords: newWords };
    });
    playSound('pop');
  };

  const handleCheckSentence = () => {
    const currentQ = sentenceState.questions[sentenceState.currentIndex];
    const formedSentence = sentenceState.selectedWords.join(" ");
    const isCorrect = formedSentence === currentQ.en;
    const newCorrectCount = sentenceState.correctCount + (isCorrect ? 1 : 0);

    if (isCorrect) {
      playSound('success');
      addNotification("Perfeito! ✅");
    } else {
      playSound('error');
      addNotification(`Incorreto ❌. A frase correta era: "${currentQ.en}".`);
    }

    if (sentenceState.currentIndex + 1 < sentenceState.questions.length) {
      setTimeout(() => {
        setSentenceState(prev => ({ ...prev, currentIndex: prev.currentIndex + 1, selectedWords: [], correctCount: newCorrectCount }));
      }, 1500);
    } else {
      setTimeout(() => {
        setSentenceState(prev => ({ ...prev, correctCount: newCorrectCount, finished: true }));
      }, 1500);
    }
  };

  const finishSentenceBuilder = () => {
    const hnyReward = sentenceState.correctCount * 5; 
    const expReward = sentenceState.correctCount * 15; 
    
    playSound(sentenceState.correctCount > 0 ? 'celebration' : 'pop');

    if (hnyReward > 0) {
      setWallet(w => ({ ...w, hny: w.hny + hnyReward }));
      addTransaction('income', hnyReward, `Construtor de Frases (${sentenceState.correctCount}/3)`);
    }
    
    if (expReward > 0) {
      const finalExp = bee.exp + expReward;
      const newLevel = Math.floor(finalExp / 100) + 1;
      if (newLevel > bee.level) {
        setLevelUpData({ level: newLevel });
      }
      setBee(p => ({ ...p, exp: finalExp, level: newLevel }));
    }
    
    addNotification(`Treino de Gramática concluído! +${hnyReward} HNY | +${expReward} EXP`);
    setCurrentTab('game');
    setSentenceState({ active: false, questions: [], currentIndex: 0, selectedWords: [], correctCount: 0, finished: false });
  };

  const startListeningGame = () => {
    const shuffled = [...QUIZ_WORDS].sort(() => 0.5 - Math.random()).slice(0, 3);
    setListeningGameState({ active: true, questions: shuffled, currentIndex: 0, correctCount: 0, finished: false });
    setCurrentTab('listeningGame');
    
    setTimeout(() => {
        speakEnglishText(shuffled[0].en, null);
    }, 500);
  };

  const handleListeningAnswer = (selectedOption) => {
    const question = listeningGameState.questions[listeningGameState.currentIndex];
    const isCorrect = selectedOption === question.pt;
    const newCorrectCount = listeningGameState.correctCount + (isCorrect ? 1 : 0);
    
    if (isCorrect) {
      playSound('success');
      addNotification("Boa audição! ✅");
      if (!dictionary.some(w => w.en === question.en)) {
        setDictionary(prev => [...prev, { en: question.en, pt: question.pt }]);
      }
    } else {
      playSound('error');
      addNotification(`Incorreto ❌. A palavra era "${question.en}" (${question.pt}).`);
    }
    
    if (listeningGameState.currentIndex + 1 < listeningGameState.questions.length) {
      setTimeout(() => {
        setListeningGameState(prev => ({ ...prev, currentIndex: prev.currentIndex + 1, correctCount: newCorrectCount }));
        speakEnglishText(listeningGameState.questions[listeningGameState.currentIndex + 1].en, null);
      }, 1500);
    } else {
      setTimeout(() => {
        setListeningGameState(prev => ({ ...prev, correctCount: newCorrectCount, finished: true }));
      }, 1500);
    }
  };

  const finishListeningGame = () => {
    const hnyReward = listeningGameState.correctCount * 4; 
    const expReward = listeningGameState.correctCount * 15; 
    
    playSound(listeningGameState.correctCount > 0 ? 'celebration' : 'pop');

    if (hnyReward > 0) {
      setWallet(w => ({ ...w, hny: w.hny + hnyReward }));
      addTransaction('income', hnyReward, `Desafio de Escuta (${listeningGameState.correctCount}/3 Acertos)`);
    }
    
    if (expReward > 0) {
      const finalExp = bee.exp + expReward;
      const newLevel = Math.floor(finalExp / 100) + 1;
      if (newLevel > bee.level) {
        setLevelUpData({ level: newLevel });
        playSound('celebration');
      }
      setBee(p => ({ ...p, exp: finalExp, level: newLevel }));
    }
    
    addNotification(`Fim do jogo! +${hnyReward} HNY | +${expReward} EXP`);
    setCurrentTab('game');
    setListeningGameState({ active: false, questions: [], currentIndex: 0, correctCount: 0, finished: false });
  };

  const buyItem = (itemKey, cost, itemName) => {
    if (wallet.hny >= cost) {
      playSound('coin');
      setWallet(prev => ({ ...prev, hny: prev.hny - cost }));
      setInventory(prev => ({ ...prev, [itemKey]: prev[itemKey] + 1 }));
      addTransaction('expense', cost, `Compra: ${itemName}`);
      addNotification(`Comprou ${itemName}! (-${cost} HNY)`);
    } else {
      playSound('error');
      addNotification("HNY Insuficiente para comprar!");
    }
  };

  const buyAccelerator = () => {
    if (wallet.hny >= 50) {
      playSound('coin');
      setWallet(prev => ({ ...prev, hny: prev.hny - 50 }));
      addTransaction('expense', 50, `Queima: Acelerador Genético`);
      
      const finalExp = bee.exp + 100;
      const newLevel = Math.floor(finalExp / 100) + 1;
      
      if (newLevel > bee.level) {
        playSound('celebration');
        setLevelUpData({ level: newLevel });
      } else {
        addNotification("Acelerador Ativado! +100 EXP");
      }
      
      setBee(p => ({ ...p, exp: finalExp, level: newLevel }));
    } else {
      playSound('error');
      addNotification("HNY Insuficiente para o Acelerador!");
    }
  };

  const handleWalletAction = () => {
    const val = parseFloat(walletInput);
    if (isNaN(val) || val <= 0) {
      playSound('error');
      addNotification("Valor inválido.");
      return;
    }

    if (walletAction === 'deposit') {
       playSound('coin');
       const hnyGross = val * CONVERSION_RATE;
       const fee = hnyGross * 0.02; 
       const hnyNet = hnyGross - fee;
       setWallet(prev => ({ ...prev, hny: prev.hny + hnyNet, usdInvested: prev.usdInvested + val }));
       addTransaction('income', hnyNet, `Depósito ($${val}) - 2% Queima`);
       addNotification(`Depósito concluído! +${hnyNet.toFixed(2)} HNY`);
    } else if (walletAction === 'withdraw') {
       if (val > wallet.hny) {
          playSound('error');
          addNotification("Saldo HNY insuficiente!");
          return;
       }
       playSound('coin');
       const usd = val / CONVERSION_RATE;
       setWallet(prev => ({ ...prev, hny: prev.hny - val }));
       addTransaction('expense', val, `Saque convertido para $${usd.toFixed(2)}`);
       addNotification(`Saque de $${usd.toFixed(2)} efetuado!`);
    }
    setWalletAction(null);
    setWalletInput('');
  };

  const claimMission = (mission) => {
    if (mission.done && !mission.claimed) {
      playSound('coin');
      setWallet(w => ({ ...w, hny: w.hny + mission.reward }));
      addTransaction('income', mission.reward, `Missão: ${mission.title}`);
      setMissions(m => m.map(x => x.id === mission.id ? { ...x, claimed: true } : x));
      addNotification(`Recompensa resgatada! +${mission.reward} HNY`);
    }
  };

  const buyCosmetic = (cosmetic) => {
    if (wallet.hny >= cosmetic.price) {
      playSound('coin');
      setWallet(prev => ({ ...prev, hny: prev.hny - cosmetic.price }));
      setOwnedAccessories(prev => [...prev, cosmetic.id]);
      setBee(p => ({ ...p, equippedAccessory: cosmetic.id }));
      addTransaction('expense', cosmetic.price, `Cosmético: ${cosmetic.name}`);
      addNotification(`Novo visual! Adquiriu ${cosmetic.name}.`);
    } else {
      playSound('error');
      addNotification("HNY Insuficiente para este item VIP!");
    }
  };

  const toggleAccessory = (id) => {
    playSound('pop');
    if (bee.equippedAccessory === id) {
       setBee(p => ({ ...p, equippedAccessory: null }));
       addNotification("Acessório removido.");
    } else {
       setBee(p => ({ ...p, equippedAccessory: id }));
       addNotification("Acessório equipado com sucesso!");
    }
  };

  const handleSpin = () => {
    let usage = spinUsage || { day: bee.ageDays, freeUsed: false, paidCount: 0 };
    if (usage.day !== bee.ageDays) {
      usage = { day: bee.ageDays, freeUsed: false, paidCount: 0 };
      setSpinUsage(usage);
    }

    const currentPaid = usage.paidCount || 0;
    const remainingPaid = Math.max(0, 2 - currentPaid);
    const hasFree = !usage.freeUsed;
    const canPaid = remainingPaid > 0;

    if (!hasFree && !canPaid) {
      playSound('error');
      addNotification("Limite diário da roleta atingido. Volte amanhã.");
      return;
    }

    if (hasFree) {
      playSound('pop');
      addNotification("Rodada grátis diária usada!");
      setSpinUsage(prev => {
        const base = prev && prev.day === bee.ageDays ? prev : { day: bee.ageDays, freeUsed: false, paidCount: 0 };
        return { ...base, freeUsed: true };
      });
    } else {
      if (wallet.hny < 5) {
        playSound('error');
        addNotification("HNY Insuficiente para girar a roleta (5 HNY)!");
        return;
      }
      playSound('pop');
      setWallet(w => ({ ...w, hny: w.hny - 5 }));
      addTransaction('expense', 5, 'Roleta da Sorte');
      setSpinUsage(prev => {
        const base = prev && prev.day === bee.ageDays ? prev : { day: bee.ageDays, freeUsed: true, paidCount: 0 };
        const paid = base.paidCount || 0;
        return { ...base, paidCount: paid + 1 };
      });
    }

    setIsSpinning(true);
    setSpinResult(null);

    setTimeout(() => {
      const prizes = [
        { type: 'hny', amount: 20, name: '20 HNY', color: 'text-yellow-500' },
        { type: 'hny', amount: 50, name: '50 HNY', color: 'text-yellow-500' },
        { type: 'item', id: 'food', name: 'Ração Néctar', color: 'text-orange-500' },
        { type: 'item', id: 'clean', name: 'Kit Limpeza', color: 'text-blue-500' },
        { type: 'item', id: 'vitamin', name: 'Vitamina B', color: 'text-yellow-600' },
        { type: 'exp', amount: 100, name: '100 EXP', color: 'text-blue-500' },
      ];
      
      const wonPrize = prizes[Math.floor(Math.random() * prizes.length)];
      setSpinResult(wonPrize);
      setIsSpinning(false);
      playSound('celebration');

      if (wonPrize.type === 'hny') {
        setWallet(w => ({ ...w, hny: w.hny + wonPrize.amount }));
        addTransaction('income', wonPrize.amount, 'Prémio da Roleta');
      } else if (wonPrize.type === 'item') {
        setInventory(prev => ({ ...prev, [wonPrize.id]: prev[wonPrize.id] + 1 }));
      } else if (wonPrize.type === 'exp') {
        setBee(p => {
          const finalExp = p.exp + wonPrize.amount;
          const newLevel = Math.floor(finalExp / 100) + 1;
          if (newLevel > p.level) setLevelUpData({ level: newLevel });
          return { ...p, exp: finalExp, level: newLevel };
        });
      }
    }, 3000);
  };

  const isHungry = bee.hunger < 40;
  const isTired = bee.energy < 40;
  const isDirty = bee.cleanliness < 40;
  const isCritical = isHungry || isTired || isDirty;

  let beeSpeech = null;
  if (isHungry) beeSpeech = { en: "I am hungry!", pt: "Estou com fome!" };
  else if (isDirty) beeSpeech = { en: "I need a bath!", pt: "Preciso de um banho!" };
  else if (isTired) beeSpeech = { en: "I am so tired...", pt: "Estou tão cansada..." };

  const getStatusColor = (val, defaultColor) => {
    if (val <= 20) return 'bg-red-500';
    if (val <= 40) return 'bg-orange-500';
    return defaultColor;
  };

  // --- TELAS ---


  const renderScenarios = () => {
    if (activeScenario) {
      return (
        <div className="p-6 pb-28 h-full overflow-y-auto animate-slide-up flex flex-col">
          <div className="w-full flex justify-between items-center mb-6">
             <button onClick={() => setActiveScenario(null)} className="p-3 bg-black/10 dark:bg-white/10 rounded-2xl text-gray-600 dark:text-gray-300 hover:bg-black/20 dark:hover:bg-white/20 transition-colors">
               <X size={24} />
             </button>
             <div className="bg-[#1A1A1A] dark:bg-black p-2 px-4 rounded-xl border border-[#FFC83D]/30 flex items-center gap-2">
                <activeScenario.icon className="text-[#FFC83D]" size={16}/>
                <span className="font-black text-[#FFC83D]">{activeScenario.title}</span>
             </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mb-4 font-bold text-sm">Ouça e pratique a pronúncia no microfone:</p>
          <div className="flex-1 space-y-3 mb-6 overflow-y-auto hide-scrollbar">
            {activeScenario.phrases.map((phrase, idx) => (
              <div key={idx} className="bg-white dark:bg-[#1A1A1A] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex flex-col gap-3">
                <div className="flex justify-between items-start gap-4">
                  <h4 className="font-black text-gray-800 dark:text-white text-lg leading-tight">{phrase.en}</h4>
                  
                  <div className="flex gap-2 shrink-0">
                    <button 
                      onClick={(e) => speakEnglishText(phrase.en, e)} 
                      className="p-2 bg-blue-50 dark:bg-blue-900/40 text-blue-500 rounded-full hover:scale-110 transition-transform"
                      title="Ouvir"
                    >
                      <Volume2 size={20} />
                    </button>
                    <button 
                      onClick={(e) => handleSpeechPractice(phrase.en, e)} 
                      className={`p-2 rounded-full transition-transform ${isListening ? 'bg-red-100 text-red-500 animate-pulse' : 'bg-green-50 dark:bg-green-900/40 text-green-500 hover:scale-110'}`}
                      title="Falar"
                    >
                      <Mic size={20} />
                    </button>
                  </div>
                </div>
                <p className="text-sm font-bold text-blue-500">{phrase.pt}</p>
              </div>
            ))}
          </div>
          <HoneyButton onClick={finishScenarioTraining} variant="action" className="w-full mt-auto">
            Concluir Treino (+15 EXP)
          </HoneyButton>
        </div>
      );
    }

    return (
      <div className="p-6 pb-28 h-full overflow-y-auto animate-slide-up">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setCurrentTab('game')} className="p-2 bg-black/10 dark:bg-white/10 rounded-full text-gray-600 dark:text-gray-300">
            <X size={20} />
          </button>
          <h2 className="text-2xl font-black text-gray-800 dark:text-white flex items-center gap-2">
            <Compass className="text-teal-500" /> Cenários Práticos
          </h2>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mb-6 font-bold">Escolha uma situação da vida real para treinar a sua conversação e expandir o seu vocabulário.</p>
        
        <div className="grid grid-cols-1 gap-4">
          {TRAVEL_SCENARIOS.map((scenario) => (
            <button 
              key={scenario.id}
              onClick={() => setActiveScenario(scenario)}
              className="bg-white dark:bg-[#1A1A1A] p-5 rounded-[24px] shadow-md border border-gray-100 dark:border-white/5 flex items-center gap-4 hover:scale-[1.02] active:scale-95 transition-all text-left"
            >
              <div className="w-14 h-14 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center shadow-inner shrink-0">
                <scenario.icon size={28} />
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-800 dark:text-white">{scenario.title}</h3>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{scenario.phrases.length} frases essenciais</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderGame = () => (
    <div className="p-6 pb-28 h-full overflow-y-auto animate-slide-up">
      <h2 className="text-2xl font-black mb-2 text-gray-800 dark:text-white flex items-center gap-2">
        <Play className="text-purple-500" /> Game Center
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6 font-bold">Jogue, aprenda e ganhe Recompensas em HNY!</p>
      <div className="space-y-4">
        
        <button onClick={startListeningGame} className="w-full relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-500 rounded-[30px] p-6 text-left shadow-[0_10px_20px_rgba(6,182,212,0.3)] hover:scale-[1.02] active:scale-95 transition-all border border-white/20">
          <div className="absolute right-[-20px] top-[-20px] opacity-20"><Headphones size={100} color="white"/></div>
          <div className="flex items-center gap-3 mb-2 relative z-10">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white shadow-inner"><Headphones size={28} /></div>
            <h3 className="text-xl font-black text-white drop-shadow-md">Desafio de Escuta</h3>
          </div>
          <p className="text-cyan-100 text-sm font-medium relative z-10">Apenas áudio! Treine o seu ouvido para entender o inglês sem ler.</p>
        </button>

        <button onClick={startSentenceBuilder} className="w-full relative overflow-hidden bg-gradient-to-r from-pink-500 to-rose-500 rounded-[30px] p-6 text-left shadow-[0_10px_20px_rgba(236,72,153,0.3)] hover:scale-[1.02] active:scale-95 transition-all border border-white/20">
          <div className="absolute right-[-20px] top-[-20px] opacity-20"><AlignLeft size={100} color="white"/></div>
          <div className="flex items-center gap-3 mb-2 relative z-10">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white shadow-inner"><AlignLeft size={28} /></div>
            <h3 className="text-xl font-black text-white drop-shadow-md">Construtor de Frases</h3>
          </div>
          <p className="text-pink-100 text-sm font-medium relative z-10">Aprenda a estruturar a gramática colocando as palavras na ordem certa.</p>
        </button>

        <button onClick={startMiniGame} className="w-full relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[30px] p-6 text-left shadow-[0_10px_20px_rgba(99,102,241,0.3)] hover:scale-[1.02] active:scale-95 transition-all border border-white/20">
          <div className="absolute right-[-20px] top-[-20px] opacity-20"><Book size={100} color="white"/></div>
          <div className="flex items-center gap-3 mb-2 relative z-10">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white shadow-inner"><Book size={28} /></div>
            <h3 className="text-xl font-black text-white drop-shadow-md">Mini Jogos Educativos</h3>
          </div>
          <p className="text-indigo-100 text-sm font-medium relative z-10">Aprenda vocabulário rápido. Acerte as palavras e ganhe bônus em HNY!</p>
        </button>

        <button onClick={() => setCurrentTab('pvp')} className="w-full relative overflow-hidden bg-gradient-to-r from-red-500 to-orange-500 rounded-[30px] p-6 text-left shadow-[0_10px_20px_rgba(239,68,68,0.3)] hover:scale-[1.02] active:scale-95 transition-all border border-white/20">
          <div className="absolute right-[-20px] top-[-20px] opacity-20"><Target size={100} color="white"/></div>
          <div className="flex items-center gap-3 mb-2 relative z-10">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white shadow-inner"><Target size={28} /></div>
            <h3 className="text-xl font-black text-white drop-shadow-md">PvP Arena (Arcade)</h3>
          </div>
          <p className="text-red-100 text-sm font-medium relative z-10">Batalha em Tempo Real! Ataque com conhecimento e ganhe HNY. (Aposta variável)</p>
        </button>

        <button onClick={() => setCurrentTab('scenarios')} className="w-full relative overflow-hidden bg-gradient-to-r from-teal-500 to-emerald-600 rounded-[30px] p-6 text-left shadow-[0_10px_20px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-95 transition-all border border-white/20">
          <div className="absolute right-[-20px] top-[-20px] opacity-20"><Compass size={100} color="white"/></div>
          <div className="flex items-center gap-3 mb-2 relative z-10">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white shadow-inner"><Compass size={28} /></div>
            <h3 className="text-xl font-black text-white drop-shadow-md">Cenários Práticos</h3>
          </div>
          <p className="text-teal-100 text-sm font-medium relative z-10">Pratique o que dizer no aeroporto, hotel, táxi e muito mais.</p>
        </button>
      </div>
    </div>
  );

  const renderListeningGame = () => {
    if (!listeningGameState.active || !listeningGameState.questions.length) return null;

    if (listeningGameState.finished) {
      return (
        <div className="p-6 pb-28 h-full overflow-y-auto animate-slide-up flex flex-col items-center justify-center">
          <div className="bg-white dark:bg-[#1A1A1A] w-full rounded-[40px] p-8 shadow-2xl border border-gray-100 dark:border-white/5 text-center relative overflow-hidden">
             <Headphones size={64} className="mx-auto text-blue-500 mb-4 animate-bounce-slow" />
             <h2 className="text-3xl font-black text-gray-800 dark:text-white mb-2">Seus Ouvidos</h2>
             <p className="text-gray-500 dark:text-gray-400 font-bold mb-6">Identificou {listeningGameState.correctCount} de {listeningGameState.questions.length} palavras!</p>
             
             <div className="flex justify-center gap-4 mb-8">
               <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-2xl flex flex-col items-center min-w-[80px] border border-yellow-100 dark:border-yellow-900/50">
                 <span className="text-yellow-600 font-black text-2xl">+{listeningGameState.correctCount * 4}</span>
                 <span className="text-xs text-yellow-700 dark:text-yellow-500 font-bold">HNY</span>
               </div>
               <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-2xl flex flex-col items-center min-w-[80px] border border-blue-100 dark:border-blue-900/50">
                 <span className="text-blue-600 font-black text-2xl">+{listeningGameState.correctCount * 15}</span>
                 <span className="text-xs text-blue-700 dark:text-blue-500 font-bold">EXP</span>
               </div>
             </div>

             <HoneyButton onClick={finishListeningGame} variant="action" className="w-full">
               Coletar Recompensas
             </HoneyButton>
          </div>
        </div>
      );
    }

    const question = listeningGameState.questions[listeningGameState.currentIndex];
    return (
      <div className="p-6 pb-28 h-full overflow-y-auto animate-slide-up flex flex-col items-center justify-center">
        <div className="w-full flex justify-between items-center mb-8">
           <button onClick={() => setCurrentTab('game')} className="p-3 bg-black/10 dark:bg-white/10 rounded-2xl text-gray-600 dark:text-gray-300 hover:bg-black/20 dark:hover:bg-white/20 transition-colors">
             <X size={24} />
           </button>
           <div className="bg-[#1A1A1A] dark:bg-black p-2 px-4 rounded-xl border border-blue-500/30 flex items-center gap-2">
              <span className="font-black text-blue-500">Áudio {listeningGameState.currentIndex + 1}/3</span>
           </div>
        </div>

        <div className="bg-white dark:bg-[#1A1A1A] w-full rounded-[40px] p-8 shadow-2xl border border-gray-100 dark:border-white/5 text-center relative overflow-hidden animate-slide-left" key={listeningGameState.currentIndex}>
           <div className="absolute top-0 left-0 w-full h-2 bg-gray-200 dark:bg-white/10">
             <div className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-300" style={{ width: `${(listeningGameState.currentIndex / listeningGameState.questions.length) * 100}%` }}></div>
           </div>
           
           <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/30 rounded-full mx-auto flex items-center justify-center mb-6 mt-4 shadow-inner">
             <button onClick={(e) => speakEnglishText(question.en, e)} className="p-4 bg-blue-500 text-white rounded-full hover:scale-110 hover:bg-blue-600 transition-all shadow-lg animate-pulse">
               <Volume2 size={36} />
             </button>
           </div>
           
           <p className="text-gray-500 dark:text-gray-400 font-bold mb-6 text-sm">Ouça com atenção e escolha a tradução correta:</p>
           
           <div className="grid grid-cols-1 gap-3">
             {question.options.map((opt, idx) => (
               <button 
                 key={idx}
                 onClick={() => handleListeningAnswer(opt)}
                 className="w-full p-4 rounded-2xl border-2 border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#222] hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-800 dark:text-white font-bold text-lg transition-all active:scale-95"
               >
                 {opt}
               </button>
             ))}
           </div>
        </div>
      </div>
    );
  };

  const renderSentenceBuilder = () => {
    if (!sentenceState.active || !sentenceState.questions.length) return null;

    if (sentenceState.finished) {
      return (
        <div className="p-6 pb-28 h-full overflow-y-auto animate-slide-up flex flex-col items-center justify-center">
          <div className="bg-white dark:bg-[#1A1A1A] w-full rounded-[40px] p-8 shadow-2xl border border-gray-100 dark:border-white/5 text-center relative overflow-hidden">
             <Trophy size={64} className="mx-auto text-pink-500 mb-4 animate-bounce-slow" />
             <h2 className="text-3xl font-black text-gray-800 dark:text-white mb-2">Gramática</h2>
             <p className="text-gray-500 dark:text-gray-400 font-bold mb-6">Construiu {sentenceState.correctCount} de {sentenceState.questions.length} frases perfeitas!</p>
             
             <div className="flex justify-center gap-4 mb-8">
               <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-2xl flex flex-col items-center min-w-[80px] border border-yellow-100 dark:border-yellow-900/50">
                 <span className="text-yellow-600 font-black text-2xl">+{sentenceState.correctCount * 5}</span>
                 <span className="text-xs text-yellow-700 dark:text-yellow-500 font-bold">HNY</span>
               </div>
               <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-2xl flex flex-col items-center min-w-[80px] border border-blue-100 dark:border-blue-900/50">
                 <span className="text-blue-600 font-black text-2xl">+{sentenceState.correctCount * 15}</span>
                 <span className="text-xs text-blue-700 dark:text-blue-500 font-bold">EXP</span>
               </div>
             </div>

             <HoneyButton onClick={finishSentenceBuilder} variant="action" className="w-full">
               Coletar Recompensas
             </HoneyButton>
          </div>
        </div>
      );
    }

    const currentQ = sentenceState.questions[sentenceState.currentIndex];
    const availableWords = currentQ.jumbled.filter((_, idx) => !sentenceState.selectedWords.includes(currentQ.jumbled[idx]));

    return (
      <div className="p-6 pb-28 h-full overflow-y-auto animate-slide-up flex flex-col">
        <div className="w-full flex justify-between items-center mb-6">
           <button onClick={() => setCurrentTab('game')} className="p-3 bg-black/10 dark:bg-white/10 rounded-2xl text-gray-600 dark:text-gray-300 hover:bg-black/20 dark:hover:bg-white/20 transition-colors">
             <X size={24} />
           </button>
           <div className="bg-[#1A1A1A] dark:bg-black p-2 px-4 rounded-xl border border-pink-500/30 flex items-center gap-2">
              <span className="font-black text-pink-500">Frase {sentenceState.currentIndex + 1}/{sentenceState.questions.length}</span>
           </div>
        </div>

        <div className="bg-white dark:bg-[#1A1A1A] w-full rounded-[40px] p-6 shadow-2xl border border-gray-100 dark:border-white/5 relative overflow-hidden flex-1 flex flex-col">
           <div className="absolute top-0 left-0 w-full h-2 bg-gray-200 dark:bg-white/10">
             <div className="h-full bg-gradient-to-r from-pink-400 to-rose-500 transition-all duration-300" style={{ width: `${(sentenceState.currentIndex / sentenceState.questions.length) * 100}%` }}></div>
           </div>
           
           <div className="mt-4 mb-6">
             <h2 className="text-xl font-black text-gray-800 dark:text-white leading-tight">Traduza esta frase:</h2>
             <p className="text-pink-500 font-bold mt-2 text-lg">"{currentQ.pt}"</p>
           </div>

           <div className="min-h-[100px] border-b-2 border-gray-200 dark:border-gray-700 flex flex-wrap content-start gap-2 pb-4 mb-6">
             {sentenceState.selectedWords.map((word, idx) => (
               <button 
                 key={idx} 
                 onClick={() => handleRemoveSentenceWord(idx)}
                 className="px-4 py-2 bg-white dark:bg-[#222] border-2 border-gray-300 dark:border-gray-600 rounded-xl font-bold text-gray-800 dark:text-white hover:border-red-400 hover:text-red-500 transition-colors shadow-sm"
               >
                 {word}
               </button>
             ))}
           </div>

           <div className="flex flex-wrap justify-center gap-3 mb-auto">
             {availableWords.map((word, idx) => (
               <button 
                 key={idx} 
                 onClick={() => handleSelectSentenceWord(word)}
                 className="px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl font-bold text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-pink-900/40 hover:text-pink-600 transition-colors shadow-sm border border-transparent active:scale-95"
               >
                 {word}
               </button>
             ))}
           </div>

           <HoneyButton 
             onClick={handleCheckSentence} 
             disabled={sentenceState.selectedWords.length === 0} 
             className="w-full mt-6 bg-gradient-to-r from-green-500 to-green-600 border-green-700"
           >
             Verificar Resposta
           </HoneyButton>
        </div>
      </div>
    );
  };

  const renderMiniGame = () => {
    if (!quizState.active || !quizState.questions.length) return null;

    if (quizState.finished) {
      return (
        <div className="p-6 pb-28 h-full overflow-y-auto animate-slide-up flex flex-col items-center justify-center">
          <div className="bg-white dark:bg-[#1A1A1A] w-full rounded-[40px] p-8 shadow-2xl border border-gray-100 dark:border-white/5 text-center relative overflow-hidden">
             <Trophy size={64} className="mx-auto text-yellow-500 mb-4 animate-bounce-slow" />
             <h2 className="text-3xl font-black text-gray-800 dark:text-white mb-2">Desempenho</h2>
             <p className="text-gray-500 dark:text-gray-400 font-bold mb-6">Acertou {quizState.correctCount} de {quizState.questions.length} palavras!</p>
             
             <div className="flex justify-center gap-4 mb-8">
               <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-2xl flex flex-col items-center min-w-[80px] border border-yellow-100 dark:border-yellow-900/50">
                 <span className="text-yellow-600 font-black text-2xl">+{quizState.correctCount * 3}</span>
                 <span className="text-xs text-yellow-700 dark:text-yellow-500 font-bold">HNY</span>
               </div>
               <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-2xl flex flex-col items-center min-w-[80px] border border-blue-100 dark:border-blue-900/50">
                 <span className="text-blue-600 font-black text-2xl">+{quizState.correctCount * 10}</span>
                 <span className="text-xs text-blue-700 dark:text-blue-500 font-bold">EXP</span>
               </div>
             </div>

             <HoneyButton onClick={finishMiniGame} variant="action" className="w-full">
               Coletar Recompensas
             </HoneyButton>
          </div>
        </div>
      );
    }

    const question = quizState.questions[quizState.currentIndex];
    return (
      <div className="p-6 pb-28 h-full overflow-y-auto animate-slide-up flex flex-col items-center justify-center">
        <div className="w-full flex justify-between items-center mb-8">
           <button onClick={() => setCurrentTab('game')} className="p-3 bg-black/10 dark:bg-white/10 rounded-2xl text-gray-600 dark:text-gray-300 hover:bg-black/20 dark:hover:bg-white/20 transition-colors">
             <X size={24} />
           </button>
           <div className="bg-[#1A1A1A] dark:bg-black p-2 px-4 rounded-xl border border-[#FFC83D]/30 flex items-center gap-2">
              <span className="font-black text-[#FFC83D]">Questão {quizState.currentIndex + 1}/3</span>
           </div>
        </div>

        <div className="bg-white dark:bg-[#1A1A1A] w-full rounded-[40px] p-8 shadow-2xl border border-gray-100 dark:border-white/5 text-center relative overflow-hidden animate-slide-left" key={quizState.currentIndex}>
           <div className="absolute top-0 left-0 w-full h-2 bg-gray-200 dark:bg-white/10">
             <div className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-300" style={{ width: `${(quizState.currentIndex / quizState.questions.length) * 100}%` }}></div>
           </div>
           <p className="text-gray-500 dark:text-gray-400 font-bold mb-2 uppercase tracking-widest text-xs mt-2">Traduza a palavra</p>
           <h2 className="text-5xl font-black text-gray-800 dark:text-white mb-8 flex items-center justify-center gap-3">
             {question.en}
             <button onClick={(e) => speakEnglishText(question.en, e)} className="p-2 bg-blue-100 dark:bg-blue-900/40 text-blue-500 rounded-full hover:scale-110 transition-transform">
               <Volume2 size={24} />
             </button>
           </h2>
           
           <div className="grid grid-cols-1 gap-3">
             {question.options.map((opt, idx) => (
               <button 
                 key={idx}
                 onClick={() => handleQuizAnswer(opt)}
                 className="w-full p-4 rounded-2xl border-2 border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#222] hover:border-blue-50 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-800 dark:text-white font-bold text-lg transition-all active:scale-95"
               >
                 {opt}
               </button>
             ))}
           </div>
        </div>
      </div>
    );
  };

  const renderLearningModal = () => {
    if (!studySession.active || studySession.phrases.length === 0) return null;
    
    const currentPhrase = studySession.phrases[studySession.step];

    return (
      <div className="absolute inset-0 z-50 bg-blue-900/90 backdrop-blur-md flex justify-center items-center p-4">
        <div className="bg-white dark:bg-[#1A1A1A] w-full max-w-md rounded-[40px] p-6 shadow-2xl flex flex-col relative overflow-hidden animate-slide-up">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 dark:bg-white/10">
            <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${(studySession.step / studySession.phrases.length) * 100}%` }}></div>
          </div>

          <div className="flex justify-between items-center mb-6 mt-2">
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-2">
              <MessageSquare size={14}/> {currentPhrase.ctx}
            </div>
            <span className="text-gray-400 font-bold text-sm">{studySession.step + 1} / {studySession.phrases.length}</span>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center text-center min-h-[160px] mb-8">
            <p className="text-gray-400 text-sm font-bold mb-2 uppercase tracking-widest">Traduza mentalmente:</p>
            <div className="text-2xl sm:text-3xl font-black text-gray-800 dark:text-white leading-tight flex flex-col items-center gap-4 mt-2">
              "{currentPhrase.en}"
              <div className="flex gap-3 mt-2">
                <button 
                  onClick={(e) => speakEnglishText(currentPhrase.en, e)} 
                  className="p-3 bg-blue-50 dark:bg-blue-900/40 text-blue-500 rounded-full hover:scale-110 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-all shadow-sm border border-blue-100 dark:border-blue-900/50"
                  title="Ouvir pronúncia"
                >
                  <Volume2 size={24} />
                </button>
                <button 
                  onClick={(e) => handleSpeechPractice(currentPhrase.en, e)} 
                  className={`p-3 rounded-full transition-all shadow-sm border ${isListening ? 'bg-red-100 text-red-500 border-red-500 animate-pulse' : 'bg-green-50 dark:bg-green-900/40 text-green-600 border-green-100 dark:border-green-900/50 hover:scale-110 hover:bg-green-100'}`}
                  title="Falar no microfone"
                >
                  <Mic size={24} />
                </button>
              </div>
            </div>
            
            {studySession.revealed && (
              <div className="mt-6 w-full animate-slide-up">
                <div className="h-px w-16 bg-gray-200 dark:bg-white/10 mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  "{currentPhrase.pt}"
                </h3>
              </div>
            )}
          </div>

          {!studySession.revealed ? (
            <HoneyButton onClick={() => setStudySession(p => ({ ...p, revealed: true }))} variant="action" className="w-full bg-gradient-to-b from-blue-400 to-blue-600 border-blue-700">
              Revelar Tradução
            </HoneyButton>
          ) : (
            <div className="w-full animate-slide-up">
              <p className="text-center text-xs font-bold text-gray-400 mb-3">Como você se saiu?</p>
              <div className="grid grid-cols-3 gap-2">
                <button onClick={() => handleStudyEvaluation(5)} className="py-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-bold rounded-2xl hover:bg-red-200 transition-colors active:scale-95 text-sm">
                  Difícil (+5 EXP)
                </button>
                <button onClick={() => handleStudyEvaluation(10)} className="py-3 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 font-bold rounded-2xl hover:bg-yellow-200 transition-colors active:scale-95 text-sm">
                  Bom (+10 EXP)
                </button>
                <button onClick={() => handleStudyEvaluation(15)} className="py-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-bold rounded-2xl hover:bg-green-200 transition-colors active:scale-95 text-sm">
                  Fácil (+15 EXP)
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    );
  };

  const renderChatModal = () => {
    if (!chatSession.active) return null;

    return (
      <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex justify-center items-center p-4">
        <div className="bg-[#E5DDD5] dark:bg-[#0B141A] w-full max-w-md h-[80%] rounded-[40px] shadow-2xl flex flex-col relative overflow-hidden animate-slide-up border border-white/20">
          
          <div className="bg-green-600 dark:bg-[#00A884] p-4 flex items-center justify-between shadow-md z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex justify-center items-center text-white"><MessageCircle size={20}/></div>
              <div>
                <h3 className="font-bold text-white leading-tight">{chatSession.dialogue.title}</h3>
                <p className="text-xs text-green-100 opacity-80">Prática de Inglês</p>
              </div>
            </div>
            <button onClick={() => setChatSession({ active: false })} className="text-white opacity-80 hover:opacity-100 p-2"><X size={20}/></button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col hide-scrollbar bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] dark:bg-none">
            {chatSession.history.map((msg, idx) => (
              <div key={idx} className={`max-w-[85%] p-3 rounded-2xl shadow-sm text-sm font-medium ${msg.type === 'npc' ? 'bg-white dark:bg-[#202C33] text-gray-800 dark:text-white rounded-tl-none self-start border border-gray-100 dark:border-[#202C33]' : 'bg-[#D9FDD3] dark:bg-[#005C4B] text-gray-800 dark:text-white rounded-tr-none self-end'}`}>
                {msg.type === 'npc' && (
                  <div className="flex items-center justify-between mb-1 pb-1 border-b border-gray-100 dark:border-gray-700/50">
                    <span className="text-xs font-bold text-green-600 dark:text-green-400">{msg.name}</span>
                    <button 
                      onClick={(e) => speakEnglishText(msg.text, e)} 
                      className="text-gray-400 hover:text-green-500 transition-colors"
                      title="Ouvir pronúncia"
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>
                )}
                {msg.text}
              </div>
            ))}
          </div>

          <div className="bg-gray-100 dark:bg-[#202C33] p-4 pb-6 border-t border-gray-200 dark:border-[#2A3942]">
            {!chatSession.finished ? (
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 text-center">Selecione a sua resposta:</p>
                {chatSession.dialogue.lines[chatSession.step]?.options.map((opt, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleChatReply(opt)}
                    className="w-full text-left p-3 rounded-xl bg-white dark:bg-[#2A3942] border border-gray-200 dark:border-white/10 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all text-sm font-bold text-gray-700 dark:text-white flex justify-between items-center group active:scale-95"
                  >
                    "{opt.text}"
                    <Send size={14} className="text-gray-300 group-hover:text-green-500 transition-colors"/>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center animate-slide-up">
                <p className="text-green-600 dark:text-green-400 font-bold mb-3">Diálogo Concluído!</p>
                <HoneyButton onClick={finishConversation} variant="action" className="w-full bg-gradient-to-b from-green-500 to-green-700 border-green-800">
                  Avaliar Desempenho
                </HoneyButton>
              </div>
            )}
          </div>

        </div>
      </div>
    );
  };

  const renderLevelUpModal = () => {
    if (!levelUpData) return null;

    return (
      <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-center items-center p-4">
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(40)].map((_, i) => (
            <div key={i} className="absolute w-3 h-3 rounded-sm animate-confetti-fall"
                 style={{
                   left: `${Math.random() * 100}%`,
                   animationDelay: `${Math.random() * 1.5}s`,
                   animationDuration: `${Math.random() * 2 + 2}s`,
                   backgroundColor: ['#FFC83D', '#F4A300', '#FF9F1C', '#ffffff', '#22C55E'][Math.floor(Math.random()*5)]
                 }}></div>
          ))}
        </div>

        <div className="bg-gradient-to-b from-[#FFF8E1] to-[#FFC83D] w-full max-w-sm rounded-[40px] p-8 shadow-[0_0_50px_rgba(255,200,61,0.6)] text-center relative overflow-hidden animate-slide-up border-4 border-[#F4A300] z-10">
          <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center mb-4 shadow-inner">
            <PartyPopper size={48} className="text-[#F4A300] animate-bounce-slow" />
          </div>
          <h2 className="text-3xl font-black text-gray-800 mb-2 uppercase tracking-wide drop-shadow-sm">Promoção!</h2>
          <p className="text-gray-700 font-medium mb-6">A sua abelha dedicou-se aos estudos e evoluiu o seu conhecimento.</p>
          
          <div className="bg-white/60 rounded-3xl p-4 mb-6 shadow-sm border border-white/50">
            <span className="block text-sm font-bold text-gray-500 uppercase">Novo Nível</span>
            <span className="text-6xl font-black text-[#F4A300] drop-shadow-md">{levelUpData.level}</span>
          </div>

          <HoneyButton onClick={() => setLevelUpData(null)} variant="primary" className="w-full text-lg shadow-xl">
            Incrível!
          </HoneyButton>
        </div>
      </div>
    );
  };

  const renderDictionaryModal = () => {
    if (!showDictionaryModal) return null;

    return (
      <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex justify-center items-center p-4">
        <div className="bg-white dark:bg-[#1A1A1A] w-full max-w-md h-[80%] rounded-[40px] shadow-2xl flex flex-col relative overflow-hidden animate-slide-up border border-white/20">
          <div className="p-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-gray-50 dark:bg-[#222]">
            <div>
              <h2 className="text-2xl font-black text-gray-800 dark:text-white flex items-center gap-2">
                <BookOpen className="text-blue-500" /> Meu Dicionário
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-bold mt-1">Palavras Dominadas: {dictionary.length}</p>
            </div>
            <button onClick={() => setShowDictionaryModal(false)} className="p-2 bg-gray-200 dark:bg-white/10 rounded-full text-gray-600 hover:text-gray-800 dark:hover:text-white"><X size={18}/></button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {dictionary.length === 0 ? (
              <div className="text-center p-8 opacity-50">
                <BookOpen size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="font-bold text-gray-500 dark:text-gray-400">O seu dicionário está vazio. Jogue Mini Jogos para aprender palavras novas!</p>
              </div>
            ) : (
              dictionary.map((word, idx) => (
                <div key={idx} className="bg-white dark:bg-black/40 p-4 rounded-2xl border border-gray-100 dark:border-white/5 flex justify-between items-center group hover:border-blue-400 transition-colors">
                  <div>
                    <h4 className="font-black text-gray-800 dark:text-white text-lg">{word.en}</h4>
                    <p className="text-sm font-bold text-blue-500">{word.pt}</p>
                  </div>
                  <button 
                    onClick={(e) => speakEnglishText(word.en, e)} 
                    className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-full opacity-0 group-hover:opacity-100 hover:bg-blue-100 hover:scale-110 transition-all focus:opacity-100"
                    title="Ouvir"
                  >
                    <Volume2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderWalletModal = () => {
    if (!walletAction) return null;
    const isDeposit = walletAction === 'deposit';
    
    return (
      <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
        <div className="bg-white dark:bg-[#1A1A1A] w-full max-w-sm rounded-[40px] p-6 shadow-2xl border border-white/20 animate-slide-up">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-gray-800 dark:text-white">{isDeposit ? 'Depositar USD' : 'Sacar HNY'}</h3>
            <button onClick={() => {setWalletAction(null); setWalletInput('');}} className="p-2 bg-gray-100 dark:bg-white/10 rounded-full text-gray-500 hover:text-gray-800 dark:hover:text-white"><X size={18}/></button>
          </div>
          
          <div className="mb-6">
            <label className="text-sm font-bold text-gray-500 mb-2 block">{isDeposit ? 'Valor em USD ($)' : 'Quantidade de HNY'}</label>
            <input 
              type="number" 
              value={walletInput}
              onChange={(e) => setWalletInput(e.target.value)}
              placeholder="0.00"
              className="w-full text-3xl font-black bg-transparent border-b-2 border-gray-200 dark:border-white/20 focus:border-[#FFC83D] outline-none py-2 text-gray-800 dark:text-white"
            />
            {isDeposit && walletInput > 0 && (
              <p className="text-xs text-orange-500 font-bold mt-2">Você receberá {(parseFloat(walletInput) * CONVERSION_RATE * 0.98).toFixed(2)} HNY (Taxa de 2% de queima aplicada)</p>
            )}
            {!isDeposit && walletInput > 0 && (
              <p className="text-xs text-green-500 font-bold mt-2">Você receberá ${(parseFloat(walletInput) / CONVERSION_RATE).toFixed(2)} USD</p>
            )}
          </div>
          
          <HoneyButton onClick={handleWalletAction} variant="action" className="w-full">
            Confirmar
          </HoneyButton>
        </div>
      </div>
    );
  };

  const renderMissionsModal = () => {
    if (!showMissions) return null;

    return (
      <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
        <div className="bg-white dark:bg-[#1A1A1A] w-full max-w-md rounded-[40px] p-6 shadow-2xl border border-white/20 animate-slide-up">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-gray-800 dark:text-white flex items-center gap-2">
              <Trophy className="text-[#F4A300]" /> Missões Diárias
            </h2>
            <button onClick={() => setShowMissions(false)} className="p-2 bg-gray-100 dark:bg-white/10 rounded-full text-gray-500 hover:text-gray-800 dark:hover:text-white"><X size={18}/></button>
          </div>
          <div className="space-y-3 mb-2">
            {missions.map(m => (
              <div key={m.id} className="bg-gray-50 dark:bg-[#222] p-4 rounded-3xl border border-gray-100 dark:border-white/5 flex justify-between items-center transition-all">
                 <div>
                    <p className={`font-bold text-sm ${m.done ? 'text-gray-400 line-through' : 'text-gray-800 dark:text-white'}`}>{m.title}</p>
                    <p className="text-xs text-[#F4A300] font-black flex items-center gap-1 mt-1"><Award size={12}/> {m.reward} HNY</p>
                 </div>
                 {m.claimed ? (
                    <div className="text-green-500 flex items-center gap-1 text-sm font-bold bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-xl"><CheckCircle size={16}/> Feito</div>
                 ) : m.done ? (
                    <HoneyButton onClick={() => claimMission(m)} variant="primary" className="py-2 px-4 text-xs shadow-none">Resgatar</HoneyButton>
                 ) : (
                    <div className="text-gray-400 flex items-center gap-1 text-sm font-bold px-3">0 / 1</div>
                 )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderProfessionModal = () => {
    if (!showProfModal) return null;

    return (
      <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
        <div className="bg-white dark:bg-[#1A1A1A] w-full max-w-md rounded-[40px] p-6 shadow-2xl border border-white/20 animate-slide-up">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-gray-800 dark:text-white mb-2">Fase Adolescente!</h2>
            <p className="text-gray-500">A sua abelha cresceu. Escolha uma profissão para definir os seus ganhos futuros.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {Object.entries(PROFESSIONS).map(([key, prof]) => (
              <button
                key={key}
                onClick={() => {
                  setBee(p => ({ ...p, profession: key }));
                  setShowProfModal(false);
                  addNotification(`Profissão ${prof.name} escolhida!`);
                }}
                className={`p-4 rounded-3xl border-2 border-transparent bg-gray-50 dark:bg-[#222] hover:border-[#FFC83D] flex flex-col items-center gap-2 transition-all active:scale-95`}
              >
                <div className={`p-3 rounded-full ${prof.color} text-white shadow-md`}>
                  <prof.icon size={24} />
                </div>
                <span className="font-bold text-sm dark:text-white">{prof.name}</span>
                <span className="text-xs font-black text-green-500 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-md">Mult: {prof.mult}x</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSpinModal = () => {
    if (!showSpinModal) return null;

    let usage = spinUsage || { day: bee.ageDays, freeUsed: false, paidCount: 0 };
    if (usage.day !== bee.ageDays) {
      usage = { day: bee.ageDays, freeUsed: false, paidCount: 0 };
    }
    const currentPaid = usage.paidCount || 0;
    const remainingPaid = Math.max(0, 2 - currentPaid);
    const hasFree = !usage.freeUsed;
    const disableByLimit = !hasFree && remainingPaid <= 0;
    const buttonLabel = isSpinning
      ? 'A girar...'
      : hasFree
        ? 'Girar Roleta (Grátis)'
        : remainingPaid > 0
          ? 'Girar Roleta (5 HNY)'
          : 'Limite de Hoje Atingido';

    return (
      <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-center items-center p-4">
        <div className="bg-gradient-to-b from-[#1A1A1A] to-[#333] w-full max-w-md rounded-[40px] p-8 shadow-2xl border-2 border-purple-500/30 text-center relative overflow-hidden animate-slide-up">
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <Gift className="text-purple-500" /> Roleta Diária
            </h2>
            <button onClick={() => { setShowSpinModal(false); setSpinResult(null); }} className="text-gray-400 hover:text-white"><X size={24}/></button>
          </div>
          
          <p className="text-gray-400 font-medium mb-4">Tente a sua sorte! Todos os dias tem 1 rodada grátis e até <span className="text-[#FFC83D] font-bold">2 rodadas pagas</span> por 5 HNY cada.</p>

          <div className="relative w-48 h-48 mx-auto mb-8">
            <div className={`w-full h-full rounded-full border-8 border-purple-500/50 flex items-center justify-center bg-[#222] shadow-[0_0_30px_rgba(168,85,247,0.4)] ${isSpinning ? 'animate-spin-fast' : ''}`}>
              {!isSpinning && !spinResult && <Gift size={64} className="text-purple-500 animate-bounce-slow" />}
              {isSpinning && <div className="text-purple-500 font-black text-2xl animate-pulse">A girar...</div>}
              {spinResult && (
                <div className="animate-slide-up text-center">
                  <span className={`text-3xl font-black ${spinResult.color}`}>{spinResult.name}</span>
                </div>
              )}
            </div>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[20px] border-t-yellow-400 drop-shadow-lg z-10"></div>
          </div>

          <HoneyButton onClick={handleSpin} disabled={isSpinning || disableByLimit} variant="action" className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 border-purple-800">
            {buttonLabel}
          </HoneyButton>
          <p className="text-xs text-gray-500 mt-3 font-bold">
            Hoje: <span className={hasFree ? 'text-green-400' : 'text-gray-400'}>{hasFree ? '1 rodada grátis disponível' : 'rodada grátis usada'}</span>
            <span className="ml-1 text-purple-300">{remainingPaid} pagas restantes</span>
          </p>
        </div>
      </div>
    );
  };

  if (!isRegistered) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans dark transition-colors duration-700">
        <HiveBackground isNight={true} />
        <div className="w-full sm:max-w-[420px] h-[100dvh] sm:h-[85vh] sm:min-h-[700px] sm:max-h-[900px] bg-black/50 backdrop-blur-md relative flex flex-col justify-center items-center p-8 shadow-2xl sm:rounded-[40px] sm:border-[8px] sm:border-white/10 overflow-hidden text-center animate-slide-up">
           <h1 className="text-5xl font-black text-[#FFC83D] mb-2 drop-shadow-[0_0_15px_rgba(255,200,61,0.6)]">HIVE</h1>
           <h2 className="text-2xl font-bold text-white mb-4 tracking-[0.2em] opacity-80">ACADEMY</h2>
           <p className="text-gray-300 mb-12 text-sm leading-relaxed">Educação que gera produtividade.<br/>Cuide, aprenda e construa o seu futuro.</p>
           
           <div className="w-32 h-32 bg-gradient-to-br from-[#FFC83D] to-[#F4A300] rounded-[40px] rotate-45 flex items-center justify-center shadow-[0_0_40px_rgba(255,200,61,0.4)] mb-12 animate-bounce-slow border-4 border-[#1A1A1A]">
              <div className="-rotate-45">
                 <User size={56} className="text-[#1A1A1A]" />
              </div>
           </div>

           <div className="bg-white/10 p-5 rounded-3xl border border-white/20 mb-8 w-full backdrop-blur-sm text-left">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2"><Award size={18} className="text-[#FFC83D]"/> Bónus de Boas-Vindas:</h3>
              <ul className="text-sm text-gray-300 space-y-3 font-medium">
                 <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex justify-center items-center border border-green-500/50"><div className="w-2 h-2 rounded-full bg-green-400"></div></div> 
                    1 Abelha Jovem
                 </li>
                 <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex justify-center items-center border border-yellow-500/50"><div className="w-2 h-2 rounded-full bg-yellow-400"></div></div> 
                    50 HoneyCoins (HNY)
                 </li>
              </ul>
           </div>

           <HoneyButton onClick={() => { playSound('celebration'); setIsRegistered(true); }} className="w-full text-lg py-4">
              Iniciar Jornada
           </HoneyButton>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center font-sans transition-colors duration-700 ${isNight ? 'dark' : ''}`}>
      <HiveBackground isNight={isNight} />

      <div className="w-full sm:max-w-[420px] h-[100dvh] sm:h-[85vh] sm:min-h-[700px] sm:max-h-[900px] bg-transparent sm:bg-white/5 dark:sm:bg-black/20 sm:backdrop-blur-md relative flex flex-col shadow-2xl sm:rounded-[40px] sm:border-[8px] sm:border-white/30 dark:sm:border-[#1a1a1a]/80 overflow-hidden transition-all duration-300">
        
        <div className="flex-1 overflow-hidden relative">
          {currentTab === 'home' && (
            <HomeScreen 
              bee={bee}
              isNight={isNight}
              setIsNight={setIsNight}
              missions={missions}
              setShowSpinModal={setShowSpinModal}
              setShowMissions={setShowMissions}
              beeSpeech={beeSpeech}
              speakEnglishText={speakEnglishText}
              inventory={inventory}
              feedBee={feedBee}
              cleanBee={cleanBee}
              useVitamin={useVitamin}
              study={study}
              retireBee={retireBee}
              petBee={petBee}
              showHearts={showHearts}
              goToAcademy={() => setCurrentTab('academy')}
            />
          )}
          {currentTab === 'academy' && (
            <AcademyScreen 
              bee={bee} 
              startStudy={study} 
              playSound={playSound} 
            />
          )}
          {currentTab === 'vault' && (
            <VaultScreen wallet={wallet} bee={bee} />
          )}
          {currentTab === 'armazem' && (
            <WarehouseScreen 
              inventory={inventory} 
              ownedAccessories={ownedAccessories} 
              bee={bee} 
              toggleAccessory={toggleAccessory} 
            />
          )}
          {currentTab === 'shop' && (
            <ShopScreen 
              wallet={wallet} 
              buyItem={buyItem} 
              ownedAccessories={ownedAccessories}
              playSound={playSound}
            />
          )}
          {currentTab === 'game' && renderGame()}
          {currentTab === 'listeningGame' && renderListeningGame()}
          {currentTab === 'scenarios' && renderScenarios()}
          {currentTab === 'minigame' && renderMiniGame()}
          {currentTab === 'sentenceBuilder' && renderSentenceBuilder()}
          {currentTab === 'wallet' && <WalletScreen wallet={wallet} setWalletAction={setWalletAction} history={history} />}
          {currentTab === 'team' && <TeamScreen />}
          {currentTab === 'reports' && <ReportsScreen history={history} />}
          {currentTab === 'achievements' && <AchievementsScreen achievements={achievements} />}
          {currentTab === 'ranking' && <RankingScreen />}
          {currentTab === 'settings' && (
            <SettingsScreen 
              isNight={isNight} 
              setIsNight={setIsNight} 
              playSound={playSound}
              bee={bee}
              setBee={setBee}
              advanceDay={advanceDay}
              resetSave={resetSave}
            />
          )}
        </div>

        {/* BOTTOM NAVIGATION RESTRUTURADA */}
        <div className="absolute bottom-0 w-full px-4 pb-6 pt-10 bg-gradient-to-t from-white via-white/90 to-transparent dark:from-[#0A0A0A] dark:via-[#0A0A0A]/90 z-40 pointer-events-none">
          
          {isMenuOpen && (
            <div className="absolute bottom-[90px] right-6 w-60 bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-[30px] p-2 shadow-2xl flex flex-col gap-1 animate-slide-up origin-bottom-right pointer-events-auto z-50">
              <button onClick={() => { setCurrentTab('settings'); setIsMenuOpen(false); }} className="flex items-center gap-3 p-3 w-full text-left rounded-2xl hover:bg-gray-100 dark:hover:bg-white/5 font-bold text-gray-700 dark:text-white transition-colors">
                <Settings size={20} className="text-gray-400"/> Configurações
              </button>
              <button onClick={() => { addNotification("Idiomas EN e ES chegarão no lançamento oficial!"); setIsMenuOpen(false); }} className="flex items-center gap-3 p-3 w-full text-left rounded-2xl hover:bg-gray-100 dark:hover:bg-white/5 font-bold text-gray-700 dark:text-white transition-colors">
                <Globe size={20} className="text-blue-500"/> Idiomas
              </button>
              <button onClick={() => { setCurrentTab('armazem'); setIsMenuOpen(false); }} className="flex items-center gap-3 p-3 w-full text-left rounded-2xl hover:bg-gray-100 dark:hover:bg-white/5 font-bold text-gray-700 dark:text-white transition-colors">
                <Package size={20} className="text-[#FF9F1C]"/> Armazém
              </button>
              <button onClick={() => { setCurrentTab('team'); setIsMenuOpen(false); }} className="flex items-center gap-3 p-3 w-full text-left rounded-2xl hover:bg-gray-100 dark:hover:bg-white/5 font-bold text-gray-700 dark:text-white transition-colors">
                <User size={20} className="text-green-500"/> Equipa
              </button>
              <button onClick={() => { setCurrentTab('ranking'); setIsMenuOpen(false); }} className="flex items-center gap-3 p-3 w-full text-left rounded-2xl hover:bg-gray-100 dark:hover:bg-white/5 font-bold text-gray-700 dark:text-white transition-colors">
                <Medal size={20} className="text-yellow-500"/> Ranking
              </button>
              <button onClick={() => { setCurrentTab('reports'); setIsMenuOpen(false); }} className="flex items-center gap-3 p-3 w-full text-left rounded-2xl hover:bg-gray-100 dark:hover:bg-white/5 font-bold text-gray-700 dark:text-white transition-colors">
                <FileText size={20} className="text-orange-500"/> Relatórios
              </button>
              <button onClick={() => { setCurrentTab('achievements'); setIsMenuOpen(false); }} className="flex items-center gap-3 p-3 w-full text-left rounded-2xl hover:bg-gray-100 dark:hover:bg-white/5 font-bold text-gray-700 dark:text-white transition-colors">
                <Star size={20} className="text-yellow-500"/> Conquistas
              </button>
              <div className="h-px w-[90%] mx-auto bg-gray-200 dark:bg-white/10 my-1"></div>
              <button onClick={() => { setCurrentTab('game'); setIsMenuOpen(false); }} className="flex items-center gap-3 p-3 w-full text-left rounded-2xl hover:bg-purple-50 dark:hover:bg-purple-900/30 font-black text-purple-600 dark:text-purple-400 transition-colors">
                <Play size={20} /> Game Center
              </button>
              <button onClick={() => { setCurrentTab('wallet'); setIsMenuOpen(false); }} className="flex items-center gap-3 p-3 w-full text-left rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-900/30 font-black text-emerald-600 dark:text-emerald-400 transition-colors">
                <DollarSign size={20} /> Wallet
              </button>
            </div>
          )}

          <div className="relative bg-[#1A1A1A] dark:bg-[#222] rounded-[30px] p-2 flex justify-between items-center shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-white/10 pointer-events-auto backdrop-blur-xl">
            <button onClick={() => {setCurrentTab('home'); setIsMenuOpen(false);}} className={`p-3 rounded-2xl flex-1 flex justify-center transition-all ${currentTab === 'home' && !isMenuOpen ? 'bg-[#FFC83D] text-black scale-105 shadow-lg' : 'text-gray-400 hover:text-white'}`}>
              <Home size={24} />
            </button>
            <button onClick={() => {setCurrentTab('game'); setIsMenuOpen(false);}} className={`p-3 rounded-2xl flex-1 flex justify-center transition-all ${currentTab === 'game' && !isMenuOpen ? 'bg-[#FFC83D] text-black scale-105 shadow-lg' : 'text-gray-400 hover:text-white'}`}>
              <Play size={24} />
            </button>
            <div className="flex-1 flex justify-center relative -top-6 mx-1">
              <button onClick={() => {setCurrentTab('shop'); setIsMenuOpen(false);}} className="w-16 h-16 bg-gradient-to-br from-[#FF9F1C] to-[#D35400] rounded-[24px] rotate-45 flex justify-center items-center shadow-[0_10px_20px_rgba(211,84,0,0.4)] border-4 border-[#1A1A1A] hover:scale-110 transition-transform active:scale-95">
                <div className="-rotate-45 text-white"><ShoppingBag size={28} /></div>
              </button>
            </div>
            <button onClick={() => {setCurrentTab('vault'); setIsMenuOpen(false);}} className={`p-3 rounded-2xl flex-1 flex justify-center transition-all ${currentTab === 'vault' && !isMenuOpen ? 'bg-[#FFC83D] text-black scale-105 shadow-lg' : 'text-gray-400 hover:text-white'}`}>
              <Lock size={24} />
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-3 rounded-2xl flex-1 flex justify-center transition-all ${isMenuOpen ? 'bg-[#FFC83D] text-black scale-105 shadow-lg' : 'text-gray-400 hover:text-white'}`}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MÓDULOS GLOBAIS E MODAIS */}
        {currentTab === 'pvp' && (
          <PvPArenaScreen 
            bee={bee}
            setBee={setBee}
            wallet={wallet}
            setWallet={setWallet}
            addTransaction={addTransaction}
            playSound={playSound}
            addNotification={addNotification}
            onClose={() => setCurrentTab('game')}
          />
        )}
        {showProfModal && renderProfessionModal()}
        {renderLearningModal()}
        {renderChatModal()}
        {walletAction && renderWalletModal()}
        {showMissions && renderMissionsModal()}
        {renderLevelUpModal()}
        {renderDictionaryModal()}
        {renderSpinModal()}

        <div className="absolute top-20 right-4 flex flex-col gap-2 z-50 pointer-events-none">
          {notifications.map(n => (
            <div key={n.id} className="bg-black/80 backdrop-blur-md border border-[#FFC83D]/30 text-white px-4 py-3 rounded-2xl shadow-2xl animate-slide-left flex items-center gap-3">
              {typeof n.msg === 'string' && (
                 <>
                   <div className="w-2 h-2 rounded-full bg-[#FFC83D] animate-ping"></div>
                   <span className="font-bold">{n.msg}</span>
                 </>
              )}
            </div>
          ))}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes flutter {
          0%, 100% { transform: rotate(-45deg) scaleY(1); }
          50% { transform: rotate(-65deg) scaleY(0.6); }
        }
        @keyframes flutter-reverse {
          0%, 100% { transform: rotate(45deg) scaleY(1); }
          50% { transform: rotate(65deg) scaleY(0.6); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes slide-up {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slide-left {
          from { transform: translateX(50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fill-bar {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); transition-duration: 2s; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-fast {
          from { transform: rotate(0deg); }
          to { transform: rotate(1440deg); }
        }
        @keyframes confetti-fall {
          0% { transform: translateY(-10vh) rotate(0deg) scale(1); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg) scale(0.5); opacity: 0; }
        }
        @keyframes float-particle {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.6; }
          100% { transform: translateY(-150px) scale(1.5); opacity: 0; }
        }
        .animate-flutter { animation: flutter 0.15s infinite ease-in-out; }
        .animate-flutter-reverse { animation: flutter-reverse 0.15s infinite ease-in-out; }
        .animate-bounce-slow { animation: bounce-slow 3s infinite ease-in-out; }
        .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-left { animation: slide-left 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fill-bar { animation: fill-bar 2s ease-out forwards; }
        .animate-spin-slow { animation: spin-slow 60s linear infinite; }
        .animate-spin-fast { animation: spin-fast 3s cubic-bezier(0.25, 0.1, 0.25, 1) forwards; }
        .animate-confetti-fall { animation: confetti-fall linear forwards; }
        .animate-float-particle { animation: float-particle 10s ease-in-out infinite; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
