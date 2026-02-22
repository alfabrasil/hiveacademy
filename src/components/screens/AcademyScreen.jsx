import React from 'react';
import { BookOpen, Star, Lock, CheckCircle, Play, Gift } from 'lucide-react';
import { LEARNING_PATH } from '../../data/gameData';
import HoneyButton from '../ui/HoneyButton';

const AcademyScreen = ({ bee, startStudy, playSound }) => {
  const currentLevel = bee.level;

  const handleNodeClick = (node) => {
    playSound('pop');
    if (node.level <= currentLevel) {
      // Se for um baú e já tiver passado, apenas mostra info. Se for atual, coleta (lógica simplificada aqui, foca no estudo)
      if (node.type === 'chest') {
        alert(`Baú do Nível ${node.level}! Continue evoluindo para mais recompensas.`);
        return;
      }
      startStudy(node.lessonId);
    } else {
      alert(`Bloqueado! Chegue ao Nível ${node.level} para desbloquear.`);
    }
  };

  return (
    <div className="p-6 pb-28 h-full overflow-y-auto animate-slide-up bg-gradient-to-b from-blue-50 to-white dark:from-[#111] dark:to-[#1a1a1a]">
      <header className="mb-8 text-center">
        <h2 className="text-2xl font-black text-gray-800 dark:text-white flex justify-center items-center gap-2">
          <BookOpen className="text-blue-500" /> Trilha de Aprendizado
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Nível Atual: <span className="text-blue-600 font-bold">{currentLevel}</span></p>
      </header>

      <div className="relative max-w-md mx-auto">
        {/* Linha Conectora Central */}
        <div className="absolute left-1/2 top-4 bottom-10 w-2 bg-gray-200 dark:bg-gray-800 -translate-x-1/2 rounded-full z-0"></div>

        <div className="space-y-12 relative z-10 pb-10">
          {LEARNING_PATH.map((node, index) => {
            const isCompleted = node.level < currentLevel;
            const isCurrent = node.level === currentLevel;
            const isLocked = node.level > currentLevel;

            let moduleHeader = null;
            if (node.id === 1) moduleHeader = { title: "Módulo 1: Fundamentos", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800" };
            if (node.id === 11) moduleHeader = { title: "Módulo 2: Construção", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800" };
            if (node.id === 19) moduleHeader = { title: "Módulo 3: Fluência", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800" };

            // Posição para efeito ziguezague suave (alternando levemente esquerda/direita ou centralizado)
            // Para mobile, centralizado é mais seguro e limpo. Vamos manter centralizado com ícones grandes.

            let statusColor = 'bg-gray-200 text-gray-400 border-gray-300'; // Bloqueado
            let icon = <Lock size={20} />;
            
            if (isCompleted) {
              statusColor = 'bg-green-500 text-white border-green-600 shadow-lg shadow-green-200 dark:shadow-none';
              icon = <CheckCircle size={24} />;
            } else if (isCurrent) {
              statusColor = 'bg-blue-500 text-white border-blue-600 ring-4 ring-blue-200 dark:ring-blue-900 animate-pulse-slow scale-110';
              icon = <Play size={24} fill="currentColor" />;
            } else if (node.type === 'chest') {
               statusColor = 'bg-yellow-400 text-yellow-900 border-yellow-500';
               icon = <Gift size={24} />;
            }

            return (
              <div key={node.id} className="flex flex-col items-center group w-full">
                {moduleHeader && (
                  <div className={`mb-12 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-sm border ${moduleHeader.color} z-20 animate-slide-up`}>
                    {moduleHeader.title}
                  </div>
                )}
                
                <div className="flex flex-col items-center">
                <button
                  onClick={() => handleNodeClick(node)}
                  className={`w-20 h-20 rounded-full flex items-center justify-center border-b-4 transition-all active:scale-95 ${statusColor} relative z-10`}
                >
                  {node.type === 'chest' && !isCompleted && !isLocked ? <Gift size={32} className="animate-bounce"/> : 
                   node.type === 'chest' ? <Gift size={28}/> :
                   isCompleted ? <CheckCircle size={32}/> :
                   isCurrent ? <Star size={32} fill="currentColor" className="animate-spin-slow"/> :
                   <span className="text-2xl grayscale opacity-50">{node.icon}</span>
                  }
                  
                  {/* Floating Stars for current */}
                  {isCurrent && (
                    <>
                      <Star size={12} className="absolute -top-1 -right-2 text-yellow-400 animate-bounce delay-100" fill="currentColor"/>
                      <Star size={10} className="absolute top-0 -left-2 text-yellow-400 animate-bounce delay-300" fill="currentColor"/>
                    </>
                  )}
                </button>
                
                {/* Etiqueta do Nível */}
                <div className={`mt-3 bg-white dark:bg-[#222] px-4 py-2 rounded-xl shadow-sm border border-gray-100 dark:border-white/10 text-center transition-all ${isCurrent ? 'scale-105' : 'opacity-80'}`}>
                  <h4 className="font-bold text-gray-800 dark:text-white text-sm leading-tight">{node.title}</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Nível {node.level}</p>
                </div>
              </div>
            </div>
            );
          })}
        </div>
        
        <div className="text-center mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/50">
          <p className="text-xs text-blue-600 dark:text-blue-300 font-bold">Mais fases em breve!</p>
        </div>
      </div>
    </div>
  );
};

export default AcademyScreen;
