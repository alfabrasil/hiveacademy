import React, { useState } from 'react';
import { Volume2, Globe, Settings, Pencil, Calendar, RotateCcw, AlertTriangle } from 'lucide-react';
import HoneyButton from '../ui/HoneyButton';

const SettingsScreen = ({ isNight, setIsNight, playSound, bee, setBee, advanceDay, resetSave }) => {
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(bee.name);

  const handleSaveName = () => {
    if (tempName.trim()) {
      setBee(prev => ({ ...prev, name: tempName }));
      setEditingName(false);
      playSound('pop');
    }
  };

  return (
    <div className="p-6 pb-28 h-full overflow-y-auto animate-slide-up">
      <h2 className="text-2xl font-black mb-6 text-gray-800 dark:text-white flex items-center gap-2">
        <Settings size={24} className="text-gray-500" /> Configurações
      </h2>
      
      <div className="space-y-4">
        {/* PERSONALIZAÇÃO */}
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-6 mb-2">Personalização</h3>
        
        <div className="bg-white dark:bg-[#1A1A1A] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold dark:text-white flex items-center gap-2"><Pencil size={16} className="text-orange-500"/> Nome da Abelha</span>
            {!editingName && (
              <button onClick={() => setEditingName(true)} className="text-xs font-bold text-blue-500 hover:text-blue-600">Editar</button>
            )}
          </div>
          {editingName ? (
            <div className="flex gap-2">
              <input 
                type="text" 
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="flex-1 bg-gray-100 dark:bg-white/10 rounded-xl px-3 py-2 text-sm font-bold outline-none border-2 border-transparent focus:border-orange-400 dark:text-white"
                autoFocus
              />
              <button onClick={handleSaveName} className="bg-green-500 text-white px-3 py-2 rounded-xl font-bold text-xs shadow-md active:scale-95">OK</button>
            </div>
          ) : (
            <p className="text-lg font-black text-gray-700 dark:text-white pl-1">{bee.name}</p>
          )}
        </div>

        <HoneyButton
          onClick={advanceDay}
          variant="secondary"
          className="w-full justify-between gap-2 border-orange-300 bg-orange-50 text-orange-700"
        >
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span>Avançar 1 Dia</span>
          </div>
          <span className="text-xs font-bold text-orange-500">Dia {bee.ageDays}</span>
        </HoneyButton>

        <div className="bg-white dark:bg-[#1A1A1A] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex justify-between items-center opacity-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-purple-500"><Volume2 size={20}/></div>
            <span className="font-bold dark:text-white">Efeitos Sonoros</span>
          </div>
          <span className="text-xs font-bold text-gray-400">Sempre Ativo</span>
        </div>

        <div className="bg-white dark:bg-[#1A1A1A] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex justify-between items-center opacity-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-xl text-green-500"><Globe size={20}/></div>
            <span className="font-bold dark:text-white">Idioma</span>
          </div>
          <span className="text-xs font-bold text-gray-400">Português (PT)</span>
        </div>

        {/* FERRAMENTAS DO DESENVOLVEDOR */}
        <h3 className="text-sm font-bold text-red-500 uppercase tracking-widest mt-8 mb-2 flex items-center gap-2"><AlertTriangle size={14}/> Área de Testes (Dev)</h3>
        
        <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-2xl border border-red-100 dark:border-red-900/30 space-y-3">
          <p className="text-xs text-red-400 font-medium mb-2">Use estas ferramentas para testar o ciclo de vida e a economia.</p>

          <HoneyButton onClick={resetSave} variant="secondary" className="w-full justify-start gap-2 border-red-300 bg-white text-red-600">
            <RotateCcw size={18}/> Resetar Save
          </HoneyButton>
        </div>

      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-gray-400 font-bold">Hive Academy v1.0.0 (MVP)</p>
        <p className="text-xs text-gray-300 mt-1">Desenvolvido com ❤️ pela BeeTeam</p>
      </div>
    </div>
  );
};

export default SettingsScreen;
