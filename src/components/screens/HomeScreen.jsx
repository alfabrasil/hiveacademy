import React from 'react';
import { Moon, Sun, Gift, Trophy, Flame, Volume2, Coffee, Zap, Droplet, Award, Activity, Book, Star, Package } from 'lucide-react';
import HoneyButton from '../ui/HoneyButton';
import ProgressBar from '../ui/ProgressBar';
import BeeAvatar from '../ui/BeeAvatar';

const HomeScreen = ({ 
  bee, 
  isNight, 
  setIsNight, 
  missions, 
  setShowSpinModal, 
  setShowMissions, 
  beeSpeech, 
  speakEnglishText, 
  inventory, 
  feedBee, 
  cleanBee, 
  useVitamin, 
  study, 
  retireBee,
  petBee,
  showHearts,
  goToWarehouse,
  goToAchievements
}) => {
  
  const isHungry = bee.hunger < 40;
  const isTired = bee.energy < 40;
  const isDirty = bee.cleanliness < 40;
  const isCritical = isHungry || isTired || isDirty;

  const getStatusColor = (val, defaultColor) => {
    if (val <= 20) return 'bg-red-500';
    if (val <= 40) return 'bg-orange-500';
    return defaultColor;
  };

  return (
    <div className="flex flex-col h-full w-full relative">
      <div className="flex justify-between items-center p-4 z-10 shrink-0">
        <button onClick={goToAchievements} className="bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-2xl p-2 px-4 shadow-sm border border-white/20 flex flex-col hover:scale-105 active:scale-95 transition-all text-left group">
          <span className="text-xs text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1 group-hover:text-gray-700 dark:group-hover:text-gray-300">
            Lvl. {bee.level} {bee.stage} <span className="text-[#F4A300]">• Dia {bee.ageDays}</span>
            {bee.consecutiveStudyDays > 0 && (
              <span className="text-orange-500 ml-1 flex items-center" title="Ofensiva de Estudos">
                <Flame size={12} fill="currentColor" className="animate-pulse" /> {bee.consecutiveStudyDays}
              </span>
            )}
          </span>
          <span className="text-xl font-black text-gray-800 dark:text-white drop-shadow-sm group-hover:text-[#FFC83D] transition-colors">{bee.name}</span>
        </button>
        <div className="flex gap-2">
          <button onClick={() => setShowSpinModal(true)} className="p-3 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-full shadow-lg border border-white/20 hover:scale-105 transition text-purple-500 relative">
            <Gift fill="currentColor" size={20} />
          </button>
          <button onClick={() => setShowMissions(true)} className="p-3 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-full shadow-lg border border-white/20 hover:scale-105 transition text-yellow-500 relative">
            <Trophy fill="currentColor" size={20} />
            {missions.some(m => m.done && !m.claimed) && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white dark:border-black"></span>
              </span>
            )}
          </button>
          <button onClick={() => setIsNight(!isNight)} className="p-3 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-full shadow-lg border border-white/20 hover:scale-105 transition">
            {isNight ? <Moon className="text-blue-400 fill-current" /> : <Sun className="text-orange-400 fill-current" />}
          </button>
        </div>
      </div>

      <div className="relative flex-1 overflow-y-auto hide-scrollbar">
        {!isNight && (
          <div className="absolute top-0 w-full h-full bg-gradient-to-b from-[#FFF8E1]/40 to-transparent mix-blend-overlay pointer-events-none"></div>
        )}
        
        {beeSpeech && !isNight && (
          <div className="absolute top-[5%] sm:top-[10%] z-40 bg-white dark:bg-[#1A1A1A] p-2 rounded-2xl rounded-bl-none shadow-[0_10px_25px_rgba(0,0,0,0.2)] border border-gray-200 dark:border-white/10 animate-bounce-slow max-w-[180px] text-center ml-28">
            <p className="font-black text-gray-800 dark:text-white text-xs">"{beeSpeech.en}"</p>
            <p className="text-[10px] text-gray-500 font-bold mt-0.5">{beeSpeech.pt}</p>
            <button onClick={(e) => speakEnglishText(beeSpeech.en, e)} className="absolute -right-2 -top-2 bg-blue-100 dark:bg-blue-900/80 text-blue-600 dark:text-blue-400 p-1 rounded-full shadow-md hover:scale-110 transition-transform">
              <Volume2 size={12} />
            </button>
          </div>
        )}

        <div className="flex flex-col items-center pt-2 pb-64">
          <div className="scale-[0.74] origin-center transform transition-transform duration-500 -mt-6">
            <BeeAvatar stage={bee.stage} isSleeping={isNight} profession={bee.profession} isNight={isNight} isCritical={isCritical} onPet={petBee} showHearts={showHearts} accessory={bee.equippedAccessory} />
          </div>
          
          <div className="w-[90%] max-w-sm bg-white/70 dark:bg-[#1A1A1A]/70 backdrop-blur-xl rounded-[24px] p-3 shadow-xl border border-white/40 dark:border-white/10 mt-2 mb-8">
            <div className="grid grid-cols-2 gap-2">
              <ProgressBar value={bee.hunger} color={getStatusColor(bee.hunger, "bg-green-400")} icon={Coffee} label="Alimentação" />
              <ProgressBar value={bee.energy} color={getStatusColor(bee.energy, "bg-blue-400")} icon={Zap} label="Energia" />
              <ProgressBar value={bee.cleanliness} color={getStatusColor(bee.cleanliness, "bg-cyan-400")} icon={Droplet} label="Higiene" />
              <ProgressBar value={bee.exp % 100} max={100} color="bg-[#F4A300]" icon={Award} label="EXP (Prox. Nível)" />
            </div>
          </div>
        </div>

        {bee.stage === 'Idosa' && (
          <div className="mt-4 max-w-xs mx-auto animate-bounce-slow px-6 pb-64">
            <HoneyButton onClick={retireBee} variant="primary" className="w-full bg-gradient-to-r from-yellow-300 to-yellow-500 border-yellow-600 text-black shadow-[0_0_20px_rgba(255,215,0,0.6)]">
              <Star size={18} fill="currentColor" className="text-white" /> Aposentar com Honras
            </HoneyButton>
          </div>
        )}
      </div>

      <div className="absolute bottom-28 left-0 right-0 px-6 z-30 pointer-events-none">
        <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto pointer-events-auto">
          <HoneyButton onClick={feedBee} variant="action" className="w-full h-14 text-sm px-1 relative">
            {isHungry && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>}
            {isHungry && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border border-[#FFF8E1]"></span>}
            <div className="flex items-center justify-center gap-1 w-full">
              <Coffee size={15} className="shrink-0" />
              <span className="font-bold whitespace-nowrap">Alimentar ({inventory.food})</span>
            </div>
          </HoneyButton>
          <HoneyButton onClick={cleanBee} variant="action" className="w-full h-14 text-sm px-1 bg-gradient-to-b from-cyan-400 to-blue-500 border-blue-600 relative">
            {isDirty && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>}
            {isDirty && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border border-blue-400"></span>}
            <div className="flex items-center justify-center gap-1 w-full">
              <Droplet size={15} className="shrink-0" />
              <span className="font-bold whitespace-nowrap">Limpar ({inventory.clean})</span>
            </div>
          </HoneyButton>
          <HoneyButton onClick={useVitamin} variant="secondary" className="w-full h-14 text-sm px-1 relative">
            {isTired && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>}
            {isTired && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border border-[#FFE0B2]"></span>}
            <div className="flex items-center justify-center gap-1 w-full">
              <Activity size={15} className="text-yellow-600 shrink-0" />
              <span className="whitespace-nowrap">Vitamina ({inventory.vitamin})</span>
            </div>
          </HoneyButton>
          <HoneyButton onClick={goToWarehouse} variant="secondary" className="w-full h-14 text-sm px-1 relative">
            <div className="flex items-center justify-center gap-1 w-full">
              <Package size={15} className="text-[#FF9F1C] shrink-0" />
              <span className="whitespace-nowrap">Armazém</span>
            </div>
          </HoneyButton>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
