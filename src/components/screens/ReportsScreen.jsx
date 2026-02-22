import React from 'react';
import { FileText, TrendingUp, TrendingDown } from 'lucide-react';

const ReportsScreen = ({ history }) => {
  return (
    <div className="p-6 pb-28 h-full overflow-y-auto animate-slide-up">
      <h2 className="text-2xl font-black mb-6 text-gray-800 dark:text-white flex items-center gap-2">
        <FileText className="text-orange-500" /> Relatórios
      </h2>
      
      <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl p-5 border border-gray-100 dark:border-white/5 shadow-sm mb-6">
        <h3 className="font-bold text-gray-800 dark:text-white mb-4">Últimas Transações</h3>
        {history.length === 0 ? (
          <p className="text-center text-gray-400 py-4">Nenhuma atividade registrada.</p>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
               <div key={item.id} className="flex justify-between items-center border-b border-gray-50 dark:border-white/5 pb-2 last:border-0 last:pb-0">
                 <div className="flex items-center gap-3">
                   <div className={`p-2 rounded-xl ${item.type === 'income' ? 'bg-green-100 dark:bg-green-900/20 text-green-600' : 'bg-red-100 dark:bg-red-900/20 text-red-600'}`}>
                     {item.type === 'income' ? <TrendingUp size={16}/> : <TrendingDown size={16}/>}
                   </div>
                   <div>
                     <p className="font-bold text-sm dark:text-white">{item.desc}</p>
                     <p className="text-xs text-gray-400">{item.date}</p>
                   </div>
                 </div>
                 <span className={`font-black ${item.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                   {item.type === 'income' ? '+' : '-'}{item.amount.toFixed(2)}
                 </span>
               </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsScreen;
