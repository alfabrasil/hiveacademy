import React, { useState } from 'react';
import { Check } from 'lucide-react';

const LANGUAGES = [
  { id: 'en', flag: '🇺🇸', name: 'English' },
  { id: 'pt', flag: '🇧🇷', name: 'Português' },
  { id: 'es', flag: '🇪🇸', name: 'Español' }
];

export default function LanguageSelector({ playSound }) {
  const [selectedLang, setSelectedLang] = useState('pt');
  const [showToast, setShowToast] = useState(false);

  const handleSelect = (lang) => {
    if (selectedLang !== lang.id) {
      playSound('pop');
      setSelectedLang(lang.id);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  return (
    <div className="relative mb-6">
      <div className="flex justify-center gap-4">
        {LANGUAGES.map((lang) => (
          <button 
            key={lang.id}
            onClick={() => handleSelect(lang)}
            className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden transition-all shadow-md active:scale-95 relative ${
              selectedLang === lang.id 
                ? 'bg-gray-700 border-2 border-[#FFC83D] scale-110' 
                : 'bg-gray-800 border-2 border-white/20 hover:border-white/50'
            }`}
            title={lang.name}
          >
            <span className="text-xl">{lang.flag}</span>
            {selectedLang === lang.id && (
              <div className="absolute bottom-0 right-0 bg-[#FFC83D] rounded-full p-[2px]">
                <Check size={10} className="text-black stroke-[4]" />
              </div>
            )}
          </button>
        ))}
      </div>

      {showToast && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#FFC83D] text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-slide-up pointer-events-none whitespace-nowrap">
          Idioma alterado!
        </div>
      )}
    </div>
  );
}
