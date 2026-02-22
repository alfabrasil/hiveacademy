import React, { useState } from 'react';
import { User, Users, Copy, Check, Share2, TrendingUp } from 'lucide-react';
import HoneyButton from '../ui/HoneyButton';

const TeamScreen = () => {
  const [copied, setCopied] = useState(false);
  const inviteLink = "https://hive.academy/invite/buzzy123";

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const levels = [
    { level: 1, percent: "20%", members: 12, earnings: 450 },
    { level: 2, percent: "10%", members: 8, earnings: 120 },
    { level: 3, percent: "5%", members: 5, earnings: 40 },
    { level: 4, percent: "3%", members: 2, earnings: 15 },
    { level: 5, percent: "2%", members: 0, earnings: 0 },
    { level: 6, percent: "1%", members: 0, earnings: 0 },
    { level: 7, percent: "1%", members: 0, earnings: 0 },
    { level: 8, percent: "1%", members: 0, earnings: 0 },
    { level: 9, percent: "1%", members: 0, earnings: 0 },
    { level: 10, percent: "1%", members: 0, earnings: 0 },
  ];

  return (
    <div className="p-6 pb-28 h-full overflow-y-auto animate-slide-up">
      <h2 className="text-2xl font-black mb-6 text-gray-800 dark:text-white flex items-center gap-2">
        <Users className="text-green-500" /> Rede de Afiliados
      </h2>
      
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-[30px] p-6 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 blur-3xl rounded-full"></div>
        <p className="text-emerald-100 font-bold text-sm uppercase tracking-wider mb-1">Ganhos de Rede</p>
        <div className="flex items-end gap-2 mb-6">
           <h3 className="text-5xl font-black">625</h3>
           <span className="text-xl font-bold mb-1 opacity-80">HNY</span>
        </div>
        
        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
          <p className="text-xs font-bold text-emerald-100 mb-2">Seu Link de Convite</p>
          <div className="flex gap-2">
            <div className="bg-black/20 flex-1 rounded-xl px-3 py-2 text-sm font-mono truncate text-emerald-50">
              {inviteLink}
            </div>
            <button onClick={handleCopy} className="bg-white text-emerald-600 p-2 rounded-xl hover:scale-105 transition-transform shadow-md">
              {copied ? <Check size={18}/> : <Copy size={18}/>}
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <TrendingUp size={20} className="text-gray-400"/> Comissões (10 Níveis)
        </h3>
        <span className="text-xs font-bold text-green-500 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-lg">27 Membros</span>
      </div>
      
      <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl border border-gray-100 dark:border-white/5 overflow-hidden shadow-sm">
        <div className="grid grid-cols-4 bg-gray-50 dark:bg-[#222] p-3 text-xs font-black text-gray-500 uppercase tracking-wider border-b border-gray-100 dark:border-white/5">
          <div className="text-center">Nível</div>
          <div className="text-center">%</div>
          <div className="text-center">Membros</div>
          <div className="text-right pr-2">HNY</div>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-white/5">
          {levels.map((lvl) => (
            <div key={lvl.level} className="grid grid-cols-4 p-3 items-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
              <div className="text-center font-bold text-gray-800 dark:text-white flex justify-center">
                <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-xs">
                  {lvl.level}
                </div>
              </div>
              <div className="text-center font-bold text-blue-500 text-xs">{lvl.percent}</div>
              <div className="text-center font-medium text-gray-500 text-xs">{lvl.members > 0 ? lvl.members : '-'}</div>
              <div className={`text-right pr-2 font-black text-xs ${lvl.earnings > 0 ? 'text-green-500' : 'text-gray-300'}`}>
                {lvl.earnings > 0 ? `+${lvl.earnings}` : '-'}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-400 max-w-xs mx-auto">
          Convide amigos e ganhe comissões vitalícias sobre a produção deles. Quanto mais eles crescem, mais você ganha!
        </p>
      </div>

    </div>
  );
};

export default TeamScreen;
