import React from 'react';
import { Lock, Briefcase, AlertTriangle, Shield } from 'lucide-react';
import { CONVERSION_RATE, PROFESSIONS } from '../../data/gameData';

const VaultScreen = ({ wallet, bee }) => {
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

  const pd = calculateDailyProduction(bee, wallet.usdInvested);
  const maxProfit = wallet.usdInvested * CONVERSION_RATE * 2; 
  const profitPercent = Math.min(100, (bee.totalProduced / maxProfit) * 100);

  return (
    <div className="p-6 pb-28 h-full overflow-y-auto animate-slide-up">
      <h2 className="text-2xl font-black mb-6 text-gray-800 dark:text-white flex items-center gap-2">
        <Lock className="text-[#F4A300]" /> Cofre & Economia
      </h2>
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#333] rounded-[30px] p-6 text-white shadow-2xl border border-white/10 mb-6 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#FFC83D]/20 blur-3xl rounded-full"></div>
        <p className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-1">Seu Saldo Total</p>
        <div className="flex items-end gap-2 mb-4">
          <h3 className="text-5xl font-black text-[#FFC83D] drop-shadow-[0_0_10px_rgba(255,200,61,0.5)]">
            {wallet.hny.toFixed(2)}
          </h3>
          <span className="text-xl font-bold mb-1 text-gray-400">HNY</span>
        </div>
        <div className="flex justify-between items-center bg-white/10 p-3 rounded-2xl">
          <span className="text-sm font-bold flex items-center gap-2"><Briefcase size={16}/> Investimento Ativo</span>
          <span className="font-bold text-[#FFC83D]">${wallet.usdInvested.toFixed(2)} USD</span>
        </div>
      </div>
      
      <div className="bg-white dark:bg-[#1A1A1A] p-5 rounded-3xl border border-gray-100 dark:border-white/5 shadow-lg mb-6">
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm font-bold text-gray-500 flex items-center gap-1"><AlertTriangle size={14} className="text-orange-500"/> Limite de 200%</span>
          <span className="text-xs font-black text-orange-500">{bee.totalProduced.toFixed(0)} / {maxProfit} HNY</span>
        </div>
        <div className="h-3 w-full bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-500 ${profitPercent >= 100 ? 'bg-red-500' : 'bg-gradient-to-r from-yellow-400 to-orange-500'}`} style={{ width: `${profitPercent}%` }}></div>
        </div>
        {profitPercent >= 100 && <p className="text-xs text-red-500 font-bold text-center mt-2">Limite alcançado. A abelha precisa aposentar-se!</p>}
      </div>

      <h3 className="text-lg font-bold mb-3 dark:text-white">Motor de Produção Diária (PD)</h3>
      <div className="bg-white dark:bg-[#222] rounded-[30px] p-5 shadow-lg border border-gray-100 dark:border-white/5 mb-6">
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-gray-50 dark:bg-black/30 rounded-2xl p-3 text-center border border-gray-100 dark:border-white/5">
            <p className="text-xs text-gray-500 font-bold mb-1">Índ. Formação</p>
            <p className="text-lg font-black text-blue-500">{bee.formationIndex.toFixed(2)}x</p>
          </div>
          <div className="bg-gray-50 dark:bg-black/30 rounded-2xl p-3 text-center border border-gray-100 dark:border-white/5">
            <p className="text-xs text-gray-500 font-bold mb-1">Índ. Atividade</p>
            <p className="text-lg font-black text-green-500">{bee.activityIndex.toFixed(2)}x</p>
          </div>
          <div className="bg-gray-50 dark:bg-black/30 rounded-2xl p-3 text-center border border-gray-100 dark:border-white/5">
            <p className="text-xs text-gray-500 font-bold mb-1">Profissão</p>
            <p className="text-lg font-black text-purple-500">
              {bee.profession ? PROFESSIONS[bee.profession].mult + 'x' : '0x'}
            </p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-2xl border border-green-200 dark:border-green-500/20 flex justify-between items-center">
          <div>
            <p className="text-sm text-green-700 dark:text-green-400 font-bold">Estimativa Diária (PD)</p>
            <p className="text-xs text-green-600/70 dark:text-green-400/70">Sua parte (50%)</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-green-600 dark:text-green-400">+{pd > 0 ? (pd/2).toFixed(2) : '0.00'}</p>
          </div>
        </div>
        {bee.stage !== 'Adulta' && bee.stage !== 'Idosa' && (
           <p className="text-xs text-red-500 text-center mt-3 font-bold">Abelha precisa ser Adulta para produzir.</p>
        )}
      </div>
      <div className="bg-[#FFF8E1] dark:bg-yellow-900/20 rounded-[30px] p-5 border border-[#FFC83D]/30 flex gap-4 items-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFC83D] to-[#F4A300] flex justify-center items-center shadow-lg">
          <Shield className="text-white" size={32} />
        </div>
        <div>
          <h4 className="font-bold text-gray-800 dark:text-white">Cofre da Colmeia</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">Sua contribuição gerou estabilidade para o ecossistema.</p>
          <p className="font-black text-[#F4A300] mt-1">{wallet.vaultContribution.toFixed(2)} HNY</p>
        </div>
      </div>
    </div>
  );
};

export default VaultScreen;
