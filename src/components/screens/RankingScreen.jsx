import React from 'react';
import { Medal, Trophy, Crown, TrendingUp } from 'lucide-react';

const RankingScreen = () => {
  const ranking = [
    { rank: 1, name: "Queen B", score: 25400, level: 50 },
    { rank: 2, name: "HoneyMaster", score: 18200, level: 42 },
    { rank: 3, name: "NectarKing", score: 15100, level: 38 },
    { rank: 4, name: "PollenPro", score: 12500, level: 35 },
    { rank: 5, name: "BuzzLight", score: 9800, level: 29 },
  ];

  return (
    <div className="p-6 pb-28 h-full overflow-y-auto animate-slide-up">
      <h2 className="text-2xl font-black mb-6 text-gray-800 dark:text-white flex items-center gap-2">
        <Medal className="text-yellow-500" /> Ranking Global
      </h2>

      <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-6 text-white shadow-lg mb-8 relative overflow-hidden">
        <Trophy size={120} className="absolute -right-6 -bottom-6 text-white/20 rotate-12"/>
        <div className="relative z-10">
          <p className="font-bold text-white/80 uppercase tracking-widest text-xs mb-1">Sua Posição Atual</p>
          <div className="flex items-end gap-3">
            <h3 className="text-5xl font-black">#142</h3>
            <div className="mb-2 bg-white/20 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
              <TrendingUp size={12}/> Top 5%
            </div>
          </div>
          <p className="font-medium mt-2 text-sm text-yellow-50 max-w-[200px]">Continue evoluindo para alcançar o topo da colmeia!</p>
        </div>
      </div>

      <div className="space-y-3">
        {ranking.map((player) => (
          <div key={player.rank} className={`flex items-center p-4 rounded-2xl border ${player.rank === 1 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-700' : 'bg-white dark:bg-[#1A1A1A] border-gray-100 dark:border-white/5'} shadow-sm`}>
             <div className="mr-4 relative">
               <div className={`w-10 h-10 flex items-center justify-center font-black rounded-full text-sm ${player.rank <= 3 ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 text-white shadow-md' : 'bg-gray-100 dark:bg-white/10 text-gray-500'}`}>
                 {player.rank}
               </div>
               {player.rank === 1 && <Crown size={16} className="absolute -top-2 -right-1 text-yellow-500 fill-current animate-bounce-slow"/>}
             </div>
             
             <div className="flex-1">
               <h4 className="font-bold text-gray-800 dark:text-white text-sm">{player.name}</h4>
               <p className="text-xs text-gray-400 font-bold">Nível {player.level}</p>
             </div>
             
             <div className="text-right">
               <span className="block font-black text-gray-700 dark:text-gray-200">{player.score.toLocaleString()}</span>
               <span className="text-xs text-yellow-500 font-bold">HNY</span>
             </div>
          </div>
        ))}
        
        <div className="flex items-center justify-center py-4">
          <div className="h-1 w-1 bg-gray-300 rounded-full mx-1"></div>
          <div className="h-1 w-1 bg-gray-300 rounded-full mx-1"></div>
          <div className="h-1 w-1 bg-gray-300 rounded-full mx-1"></div>
        </div>

        <div className="flex items-center p-4 rounded-2xl border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/20 shadow-sm opacity-80">
           <div className="mr-4">
             <div className="w-10 h-10 flex items-center justify-center font-black rounded-full text-sm bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300">
               142
             </div>
           </div>
           <div className="flex-1">
             <h4 className="font-bold text-blue-900 dark:text-blue-100 text-sm">Você</h4>
             <p className="text-xs text-blue-700 dark:text-blue-300 font-bold">Nível Atual</p>
           </div>
           <div className="text-right">
             <span className="block font-black text-blue-900 dark:text-blue-100">---</span>
             <span className="text-xs text-blue-500 font-bold">HNY</span>
           </div>
        </div>

      </div>
    </div>
  );
};

export default RankingScreen;
