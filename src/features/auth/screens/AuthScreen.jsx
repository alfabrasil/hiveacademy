import React, { useState } from 'react';
import { Award } from 'lucide-react';
import HoneyButton from '../../../components/ui/HoneyButton';
import BeeAvatar from '../../../components/ui/BeeAvatar';
import HiveBackground from '../../../components/layout/HiveBackground';
import LanguageSelector from '../components/LanguageSelector';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export default function AuthScreen({ onComplete, playSound }) {
  const [view, setView] = useState('intro'); // 'intro', 'login', 'register'

  const handleLogin = (email, password) => {
    const users = JSON.parse(localStorage.getItem('hive_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      playSound('celebration');
      localStorage.setItem('hive_currentUser', JSON.stringify(user));
      onComplete();
      return null; // no error
    } else {
      playSound('error');
      return 'Credenciais inválidas! Tente novamente.';
    }
  };

  const handleRegister = (userData) => {
    const users = JSON.parse(localStorage.getItem('hive_users') || '[]');
    if (users.find(u => u.email === userData.email)) {
      playSound('error');
      return 'Este e-mail já está em uso!';
    }

    if (users.find(u => u.username === userData.username)) {
      playSound('error');
      return 'Este username já está em uso!';
    }
    
    const savedUser = { ...userData, createdAt: new Date().toISOString() };
    users.push(savedUser);
    localStorage.setItem('hive_users', JSON.stringify(users));
    localStorage.setItem('hive_currentUser', JSON.stringify(savedUser));
    playSound('celebration');
    onComplete();
    return null; // no error
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-sans dark transition-colors duration-700 overflow-hidden">
      <HiveBackground isNight={true} />
      <div
        className="w-full sm:max-w-[420px] h-[100dvh] sm:h-[85vh] sm:min-h-[600px] sm:max-h-[900px] backdrop-blur-md relative shadow-2xl sm:shadow-[0_0_120px_rgba(0,0,0,0.85)] sm:rounded-[40px] sm:border-[8px] sm:border-black/30 text-center animate-slide-up overflow-hidden"
        style={{
          backgroundColor: '#000000',
          backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.90) 14%, rgba(0,0,0,0.00) 32%, rgba(0,0,0,0.00) 68%, rgba(0,0,0,0.90) 86%, rgba(0,0,0,0.90) 100%), linear-gradient(to bottom, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.90) 14%, rgba(0,0,0,0.00) 32%, rgba(0,0,0,0.00) 68%, rgba(0,0,0,0.90) 86%, rgba(0,0,0,0.90) 100%), radial-gradient(ellipse at center, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.22) 58%, rgba(0,0,0,0.92) 100%), linear-gradient(rgba(0,0,0,0.58), rgba(0,0,0,0.58)), url('/assets/background/background1.png?v=4')",
          backgroundSize: '130% 130%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 pointer-events-none z-0 sm:rounded-[32px]" style={{ boxShadow: 'inset 0 0 220px rgba(0,0,0,0.90), inset 0 0 100px rgba(0,0,0,0.82)' }}></div>
        <div className="w-full h-full overflow-y-auto overflow-x-hidden px-8 pt-12 pb-16 sm:p-10 flex flex-col justify-between items-center relative z-10 hide-scrollbar">
          
          <div className="w-full flex flex-col items-center flex-shrink-0">
            <h1 className="text-4xl sm:text-5xl font-black text-[#FFC83D] mb-1 drop-shadow-[0_0_15px_rgba(255,200,61,0.6)]">HIVE</h1>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-[0.2em] opacity-80">ACADEMY</h2>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-[80%]">Educação que gera produtividade.</p>
          </div>
          
          <div className="flex-1 flex flex-col justify-center items-center w-full my-4">
            
            {view === 'intro' && (
              <div className="flex flex-col items-center animate-slide-left w-full">
                <div className="mb-4 scale-[0.55] origin-center -my-10">
                  <BeeAvatar 
                    stage="Jovem" 
                    isSleeping={false} 
                    isNight={true} 
                    showHearts={true}
                    onPet={() => playSound('pop')}
                  />
                </div>

                <div className="bg-white/10 p-4 sm:p-5 rounded-3xl border border-white/20 w-full backdrop-blur-sm text-left max-w-[320px] mb-8">
                  <h3 className="text-white font-bold mb-3 flex items-center gap-2 text-sm sm:text-base"><Award size={18} className="text-[#FFC83D]"/> Bónus de Boas-Vindas:</h3>
                  <ul className="text-xs sm:text-sm text-gray-300 space-y-2 font-medium">
                    <li className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-500/20 flex justify-center items-center border border-green-500/50 flex-shrink-0"><div className="w-2 h-2 rounded-full bg-green-400"></div></div> 
                        1 Abelha Jovem
                    </li>
                    <li className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex justify-center items-center border border-yellow-500/50 flex-shrink-0"><div className="w-2 h-2 rounded-full bg-yellow-400"></div></div> 
                        50 HoneyCoins (HNY)
                    </li>
                  </ul>
                </div>

                <HoneyButton onClick={() => { playSound('pop'); setView('login'); }} className="w-full text-lg py-4 shadow-[0_4px_14px_rgba(255,200,61,0.5)] hover:shadow-[0_6px_20px_rgba(255,200,61,0.7)] transition-shadow">
                  Iniciar Jornada
                </HoneyButton>
              </div>
            )}

            {view !== 'intro' && (
              <div className="w-full flex flex-col items-center">
                <LanguageSelector playSound={playSound} />
                
                {view === 'login' && (
                  <LoginForm 
                    onLogin={handleLogin} 
                    onGoToRegister={() => setView('register')} 
                    playSound={playSound}
                  />
                )}

                {view === 'register' && (
                  <RegisterForm 
                    onRegister={handleRegister} 
                    onGoToLogin={() => setView('login')} 
                    playSound={playSound}
                  />
                )}
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
