import React from 'react';
import { Star, Lock } from 'lucide-react';
import { ACHIEVEMENTS_LIST } from '../../data/gameData';

const AchievementsScreen = ({ achievements }) => {
  const unlockedList = Array.isArray(achievements) ? achievements : [];

  return (
    <div className="p-6 pb-28 h-full overflow-y-auto animate-slide-up">
      <h2 className="text-2xl font-black mb-6 text-gray-800 dark:text-white flex items-center gap-2">
        <Star className="text-yellow-500" /> Conquistas
      </h2>

      {unlockedList.length === 0 && (
        <div className="mb-6 p-4 rounded-3xl bg-yellow-50 border border-yellow-200 text-sm text-yellow-900 font-medium">
          Ainda não há conquistas desbloqueadas. Estude, produza HNY e explore a Hive Academy para começar a colecionar troféus!
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {ACHIEVEMENTS_LIST.map((ach) => {
          const unlocked = unlockedList.includes(ach.id);
          const Icon = ach.icon;
          return (
            <div
              key={ach.id}
              className={`relative p-5 rounded-3xl border-2 transition-all ${
                unlocked
                  ? 'bg-white dark:bg-[#1A1A1A] border-yellow-400 shadow-md'
                  : 'bg-gray-50 dark:bg-[#111] border-transparent opacity-80'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner ${
                    unlocked ? 'bg-yellow-100 dark:bg-yellow-900/20' : 'bg-gray-200 dark:bg-gray-800'
                  }`}
                >
                  {unlocked ? <Icon size={26} className={ach.color} /> : <Lock size={24} className="text-gray-400" />}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white text-lg">{ach.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-tight">{ach.desc}</p>
                </div>
              </div>
              {unlocked && (
                <div className="absolute top-4 right-4 text-xs font-black text-yellow-500 bg-yellow-50 dark:bg-yellow-900/30 px-2 py-1 rounded-lg">
                  DESBLOQUEADO
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsScreen;
