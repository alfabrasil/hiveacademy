import React from 'react';
import { Package, Coffee, Droplet, Activity, Shirt } from 'lucide-react';
import { COSMETICS } from '../../data/gameData';

const WarehouseScreen = ({ inventory, ownedAccessories, bee, toggleAccessory }) => {
  return (
    <div className="p-6 pb-28 h-full overflow-y-auto animate-slide-up">
      <h2 className="text-2xl font-black mb-6 text-gray-800 dark:text-white flex items-center gap-2">
        <Package className="text-[#FF9F1C]" /> Armazém
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Gerencie seus suprimentos e vitaminas. Se acabarem, pode comprar mais na Loja.</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-[#1A1A1A] p-5 rounded-3xl border border-gray-100 dark:border-white/5 shadow-lg flex flex-col items-center hover:scale-105 transition-transform">
           <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex justify-center items-center mb-3 shadow-inner"><Coffee className="text-orange-500" size={32}/></div>
           <span className="font-bold dark:text-white">Ração Néctar</span>
           <span className="text-xs text-gray-400 font-bold bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-full mt-2">x{inventory.food} un.</span>
        </div>
        <div className="bg-white dark:bg-[#1A1A1A] p-5 rounded-3xl border border-gray-100 dark:border-white/5 shadow-lg flex flex-col items-center hover:scale-105 transition-transform">
           <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex justify-center items-center mb-3 shadow-inner"><Droplet className="text-blue-500" size={32}/></div>
           <span className="font-bold dark:text-white">Kit Limpeza</span>
           <span className="text-xs text-gray-400 font-bold bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-full mt-2">x{inventory.clean} un.</span>
        </div>
        <div className="bg-white dark:bg-[#1A1A1A] p-5 rounded-3xl border border-gray-100 dark:border-white/5 shadow-lg flex flex-col items-center col-span-2 sm:col-span-1 hover:scale-105 transition-transform">
           <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl flex justify-center items-center mb-3 shadow-inner"><Activity className="text-yellow-500" size={32}/></div>
           <span className="font-bold dark:text-white">Vitamina B</span>
           <span className="text-xs text-gray-400 font-bold bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-full mt-2">x{inventory.vitamin} un.</span>
        </div>
      </div>

      {ownedAccessories.length > 0 && (
        <>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2 mt-8">
            <Shirt size={16} className="text-pink-500"/> Guarda-Roupa
          </h3>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {ownedAccessories.map(id => {
              const item = COSMETICS.find(c => c.id === id);
              const isEquipped = bee.equippedAccessory === id;
              if (!item) return null;
              
              return (
                <button 
                  key={id} 
                  onClick={() => toggleAccessory(id)}
                  className={`p-4 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 active:scale-95 ${isEquipped ? 'bg-pink-50 dark:bg-pink-900/20 border-pink-400 shadow-md' : 'bg-white dark:bg-[#1A1A1A] border-gray-100 dark:border-white/5 shadow-sm hover:border-pink-300'}`}
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span className={`font-bold text-xs ${isEquipped ? 'text-pink-600 dark:text-pink-400' : 'text-gray-600 dark:text-gray-400'}`}>
                    {isEquipped ? 'Equipado' : 'Equipar'}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default WarehouseScreen;
