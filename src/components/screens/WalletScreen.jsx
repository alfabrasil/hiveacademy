import React from 'react';
import { DollarSign, ArrowUpRight, ArrowDownLeft, History } from 'lucide-react';

const WalletScreen = ({ wallet, setWalletAction, history }) => {
  return (
    <div className="p-6 pb-28 h-full overflow-y-auto animate-slide-up">
      <h2 className="text-2xl font-black mb-6 text-gray-800 dark:text-white flex items-center gap-2">
        <DollarSign className="text-emerald-500" /> Minha Carteira
      </h2>

      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[30px] p-6 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 blur-3xl rounded-full"></div>
        <p className="text-emerald-100 font-bold text-sm uppercase tracking-wider mb-1">Saldo Disponível</p>
        <div className="flex items-end gap-2 mb-6">
           <h3 className="text-5xl font-black">{wallet.hny.toFixed(2)}</h3>
           <span className="text-xl font-bold mb-1 opacity-80">HNY</span>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => setWalletAction('deposit')}
            className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-2xl font-bold flex flex-col items-center gap-1 transition-colors active:scale-95"
          >
            <div className="bg-white/20 p-2 rounded-full"><ArrowDownLeft size={20}/></div>
            <span className="text-xs">Depositar</span>
          </button>
          <button 
            onClick={() => setWalletAction('withdraw')}
            className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-2xl font-bold flex flex-col items-center gap-1 transition-colors active:scale-95"
          >
            <div className="bg-white/20 p-2 rounded-full"><ArrowUpRight size={20}/></div>
            <span className="text-xs">Sacar</span>
          </button>
        </div>
      </div>

      <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
        <History size={20} className="text-gray-400"/> Histórico Recente
      </h3>
      
      <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl border border-gray-100 dark:border-white/5 overflow-hidden">
        {history.length === 0 ? (
           <div className="p-8 text-center text-gray-400">Sem movimentações.</div>
        ) : (
           <div className="divide-y divide-gray-100 dark:divide-white/5">
             {history.slice(0, 5).map((tx) => (
               <div key={tx.id} className="p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                 <div className="flex items-center gap-3">
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                     {tx.type === 'income' ? <ArrowDownLeft size={18}/> : <ArrowUpRight size={18}/>}
                   </div>
                   <div>
                     <p className="font-bold text-sm text-gray-800 dark:text-white">{tx.desc}</p>
                     <p className="text-xs text-gray-400">{tx.date}</p>
                   </div>
                 </div>
                 <span className={`font-black ${tx.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                   {tx.type === 'income' ? '+' : '-'}{tx.amount.toFixed(2)}
                 </span>
               </div>
             ))}
           </div>
        )}
      </div>
      
      <div className="mt-4 text-center">
        <button onClick={() => setWalletAction(null)} className="text-sm text-gray-400 font-bold hover:text-emerald-500 transition-colors">
          Ver extrato completo
        </button>
      </div>

    </div>
  );
};

export default WalletScreen;
