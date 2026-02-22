import React from 'react';
import { ShoppingBag, Coffee, Droplet, Activity, Crown } from 'lucide-react';
import HoneyButton from '../ui/HoneyButton';
import { COSMETICS } from '../../data/gameData';

const ShopScreen = ({ wallet, buyItem, ownedAccessories, playSound }) => {
  return (
    <div className="p-6 pb-28 h-full overflow-y-auto animate-slide-up">
      <h2 className="text-2xl font-black mb-6 text-gray-800 dark:text-white flex items-center gap-2">
        <ShoppingBag className="text-purple-500" /> Loja da Colmeia
      </h2>
      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-[30px] p-6 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 blur-3xl rounded-full"></div>
        <p className="text-purple-100 font-bold text-sm uppercase tracking-wider mb-1">Saldo Disponível</p>
        <div className="flex items-end gap-2">
           <h3 className="text-4xl font-black">{wallet.hny.toFixed(2)}</h3>
           <span className="text-lg font-bold mb-1 opacity-80">HNY</span>
        </div>
      </div>

      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Consumíveis</h3>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white dark:bg-[#1A1A1A] p-4 rounded-3xl shadow-lg border border-gray-100 dark:border-white/5 flex flex-col items-center hover:scale-105 transition-transform">
           <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex justify-center items-center mb-3 text-orange-500 shadow-inner"><Coffee size={28}/></div>
           <span className="font-bold text-gray-800 dark:text-white text-sm mb-1">Ração Néctar</span>
           <span className="text-xs text-gray-400 mb-3 text-center leading-tight h-8 flex items-center">Recupera 30 de Fome</span>
           <HoneyButton onClick={() => buyItem('food', 10)} variant="action" className="w-full py-2 text-xs bg-orange-500 border-orange-600 text-white shadow-orange-200">
             10 HNY
           </HoneyButton>
        </div>
        <div className="bg-white dark:bg-[#1A1A1A] p-4 rounded-3xl shadow-lg border border-gray-100 dark:border-white/5 flex flex-col items-center hover:scale-105 transition-transform">
           <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex justify-center items-center mb-3 text-blue-500 shadow-inner"><Droplet size={28}/></div>
           <span className="font-bold text-gray-800 dark:text-white text-sm mb-1">Kit Limpeza</span>
           <span className="text-xs text-gray-400 mb-3 text-center leading-tight h-8 flex items-center">Recupera 30 de Higiene</span>
           <HoneyButton onClick={() => buyItem('clean', 10)} variant="action" className="w-full py-2 text-xs bg-blue-500 border-blue-600 text-white shadow-blue-200">
             10 HNY
           </HoneyButton>
        </div>
        <div className="bg-white dark:bg-[#1A1A1A] p-4 rounded-3xl shadow-lg border border-gray-100 dark:border-white/5 flex flex-col items-center col-span-2 sm:col-span-1 hover:scale-105 transition-transform">
           <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl flex justify-center items-center mb-3 text-yellow-500 shadow-inner"><Activity size={28}/></div>
           <span className="font-bold text-gray-800 dark:text-white text-sm mb-1">Vitamina B</span>
           <span className="text-xs text-gray-400 mb-3 text-center leading-tight h-8 flex items-center">Recupera 30 de Energia</span>
           <HoneyButton onClick={() => buyItem('vitamin', 50)} variant="action" className="w-full py-2 text-xs bg-yellow-500 border-yellow-600 text-white shadow-yellow-200">
             50 HNY
           </HoneyButton>
        </div>
      </div>

      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
        <Crown size={16} className="text-pink-500"/> Cosméticos Raros
      </h3>
      <div className="space-y-3">
        {COSMETICS.map((item) => {
          const isOwned = ownedAccessories.includes(item.id);
          return (
            <div key={item.id} className={`flex items-center p-3 rounded-2xl border ${isOwned ? 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 opacity-70 grayscale' : 'bg-white dark:bg-[#1A1A1A] border-purple-100 dark:border-purple-900/30 shadow-sm'}`}>
              <div className="w-12 h-12 bg-pink-50 dark:bg-pink-900/20 rounded-xl flex items-center justify-center text-2xl mr-4 shadow-sm">
                {item.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 dark:text-white text-sm">{item.name}</h4>
                <p className="text-xs text-purple-500 font-bold">{item.price} HNY</p>
              </div>
              <HoneyButton 
                onClick={() => !isOwned && buyItem(item.id, item.price, 'accessory')} 
                disabled={isOwned}
                variant="secondary"
                className={`text-xs px-3 py-1.5 ${isOwned ? 'bg-transparent border-transparent text-gray-400' : 'bg-purple-50 text-purple-600 border-purple-200'}`}
              >
                {isOwned ? 'Comprado' : 'Comprar'}
              </HoneyButton>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShopScreen;
