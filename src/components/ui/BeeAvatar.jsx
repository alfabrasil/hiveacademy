import React from 'react';
import { Heart, Activity, Book } from 'lucide-react';

const BeeAvatar = ({ stage, isSleeping, profession, isNight, isCritical, onPet, showHearts, accessory }) => {
  const isJovem = stage === 'Jovem';
  const isIdosa = stage === 'Idosa';
  
  return (
    <div onClick={onPet} className="relative w-48 h-48 md:w-64 md:h-64 flex justify-center items-center mt-8 cursor-pointer group">
      {showHearts && (
        <div className="absolute -top-12 z-50 flex gap-3 animate-slide-up pointer-events-none">
          <Heart className="text-pink-500 animate-bounce" size={24} fill="currentColor" style={{animationDelay: '0ms'}}/>
          <Heart className="text-pink-500 animate-bounce" size={36} fill="currentColor" style={{animationDelay: '100ms'}}/>
          <Heart className="text-pink-500 animate-bounce" size={24} fill="currentColor" style={{animationDelay: '200ms'}}/>
        </div>
      )}
      <div className="absolute bottom-4 w-32 h-8 bg-black/20 dark:bg-black/40 blur-md rounded-[100%] transition-all duration-1000 scale-100 animate-pulse"></div>
      <div className={`relative w-full h-full flex justify-center items-center ${isSleeping ? 'translate-y-4' : 'animate-bounce-slow group-active:scale-95 transition-transform'}`}>
        {/* Pernas */}
        <div className="absolute bottom-[10%] w-24 flex justify-between px-3 z-0">
           <div className={`w-2 h-14 bg-[#1A1A1A] rounded-full origin-top transform -rotate-12 shadow-sm ${!isSleeping ? 'animate-swing' : ''}`}>
              <div className="absolute -bottom-1 -left-1 w-4 h-5 bg-[#1A1A1A] rounded-full"></div>
           </div>
           <div className={`w-2 h-14 bg-[#1A1A1A] rounded-full origin-top transform rotate-12 shadow-sm ${!isSleeping ? 'animate-swing' : ''}`} style={{animationDelay: '0.5s'}}>
              <div className="absolute -bottom-1 -right-1 w-4 h-5 bg-[#1A1A1A] rounded-full"></div>
           </div>
        </div>

        {/* Braços */}
        <div className="absolute top-[45%] w-44 flex justify-between z-0 pointer-events-none">
           {/* Braço Esquerdo */}
           <div className={`relative w-12 h-8 ${isSleeping ? 'rotate-45 translate-y-4 translate-x-2' : 'rotate-12'}`}>
              <div className="w-full h-1.5 bg-[#1A1A1A] rounded-full origin-right"></div>
              <div className="absolute -left-1 -top-1.5 w-4 h-4 bg-[#FF9F1C] rounded-full shadow-sm border border-black/10"></div>
           </div>
           
           {/* Braço Direito */}
           <div className={`relative w-12 h-8 ${isSleeping ? '-rotate-45 translate-y-4 -translate-x-2' : 'animate-wave origin-left'}`}>
              <div className="w-full h-1.5 bg-[#1A1A1A] rounded-full origin-left"></div>
              <div className="absolute -right-1 -top-1.5 w-4 h-4 bg-[#FF9F1C] rounded-full shadow-sm border border-black/10"></div>
           </div>
        </div>

        {!isSleeping && (
          <div className="absolute top-8 flex gap-8 z-0">
            <div className="w-16 h-20 bg-blue-100/60 dark:bg-blue-300/40 rounded-full blur-[1px] transform -rotate-45 origin-bottom-right animate-flutter shadow-[inset_0_0_10px_rgba(255,255,255,0.8)] backdrop-blur-sm"></div>
            <div className="w-16 h-20 bg-blue-100/60 dark:bg-blue-300/40 rounded-full blur-[1px] transform rotate-45 origin-bottom-left animate-flutter-reverse shadow-[inset_0_0_10px_rgba(255,255,255,0.8)] backdrop-blur-sm"></div>
          </div>
        )}
        <div className="relative w-32 h-40 bg-gradient-to-br from-[#FFC83D] to-[#F4A300] rounded-[60px] shadow-[-10px_-10px_20px_rgba(255,255,255,0.3)_inset,10px_10px_20px_rgba(0,0,0,0.2)_inset] flex flex-col items-center z-10 overflow-hidden border-2 border-[#CC8800]/20">
          <div className="absolute top-12 w-full h-6 bg-[#1A1A1A] shadow-[0_2px_4px_rgba(0,0,0,0.5)]"></div>
          <div className="absolute top-24 w-full h-6 bg-[#1A1A1A] shadow-[0_2px_4px_rgba(0,0,0,0.5)]"></div>
          <div className="relative top-4 w-full px-6 flex justify-between items-center">
            {isSleeping ? (
              <>
                <div className="w-6 h-2 border-b-4 border-[#1A1A1A] rounded-full"></div>
                <div className="w-6 h-2 border-b-4 border-[#1A1A1A] rounded-full"></div>
              </>
            ) : (
              <>
                <div className="w-8 h-8 bg-white rounded-full flex justify-center items-center shadow-inner">
                  <div className="w-4 h-4 bg-[#1A1A1A] rounded-full relative">
                    <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="w-8 h-8 bg-white rounded-full flex justify-center items-center shadow-inner">
                  <div className="w-4 h-4 bg-[#1A1A1A] rounded-full relative">
                    <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                </div>
              </>
            )}
          </div>
          {!isSleeping && (
             <div className={`absolute top-10 w-4 h-2 ${isCritical ? 'border-t-2 mt-1' : 'border-b-2'} border-[#1A1A1A] rounded-full transition-all`}></div>
          )}
          {isIdosa && (
            <div className="absolute -top-1 w-24 h-6 bg-gray-200/80 rounded-t-full blur-[1px]"></div>
          )}
        </div>
        <div className="absolute -top-4 w-10 flex justify-between z-0">
          <div className="w-2 h-10 md:h-14 border-l-4 border-t-4 border-[#1A1A1A] rounded-tl-full transform -rotate-12">
            <div className="absolute -top-3 md:-top-4 -left-3 w-5 h-5 bg-[#FF9F1C] rounded-full shadow-md"></div>
          </div>
          <div className="w-2 h-10 md:h-14 border-r-4 border-t-4 border-[#1A1A1A] rounded-tr-full transform rotate-12">
            <div className="absolute -top-3 md:-top-4 -right-3 w-5 h-5 bg-[#FF9F1C] rounded-full shadow-md"></div>
          </div>
        </div>

        <div className="absolute z-40 pointer-events-none flex justify-center items-center w-full h-full">
          {accessory === 'glasses' && (
            <div className="absolute top-[52px] flex items-center justify-center gap-[2px] opacity-95 scale-110">
              <div className="w-12 h-8 bg-gray-900 rounded-xl border-t-2 border-gray-700 shadow-lg"></div>
              <div className="w-3 h-1.5 bg-gray-900 rounded-full"></div>
              <div className="w-12 h-8 bg-gray-900 rounded-xl border-t-2 border-gray-700 shadow-lg"></div>
            </div>
          )}
          {accessory === 'crown' && (
            <div className="absolute -top-12 text-yellow-400 drop-shadow-[0_5px_10px_rgba(250,204,21,0.6)]">
              <div className="w-16 h-10 bg-gradient-to-b from-yellow-300 to-yellow-600" style={{ clipPath: 'polygon(0 0, 20% 50%, 50% 0, 80% 50%, 100% 0, 100% 100%, 0 100%)' }}></div>
            </div>
          )}
          {accessory === 'bowtie' && (
            <div className="absolute bottom-8 flex items-center justify-center scale-90 drop-shadow-md">
              <div className="w-6 h-8 bg-red-600 rounded-sm transform -skew-y-12 border border-red-800"></div>
              <div className="w-4 h-4 bg-red-800 rounded-full z-10 -mx-2 shadow-sm"></div>
              <div className="w-6 h-8 bg-red-600 rounded-sm transform skew-y-12 border border-red-800"></div>
            </div>
          )}
          {accessory === 'headphone' && (
             <div className="absolute top-2 w-[140px] h-[100px] border-[10px] border-gray-800 rounded-t-[70px] border-b-0 drop-shadow-xl">
                <div className="absolute -left-5 bottom-0 w-8 h-14 bg-gray-800 rounded-full flex items-center justify-center"><div className="w-4 h-10 bg-red-500 rounded-full"></div></div>
                <div className="absolute -right-5 bottom-0 w-8 h-14 bg-gray-800 rounded-full flex items-center justify-center"><div className="w-4 h-10 bg-blue-500 rounded-full"></div></div>
             </div>
          )}
        </div>

        <div className="absolute z-30 pointer-events-none flex justify-center w-full h-full">
          {isJovem && <div className="absolute -right-6 top-16 w-12 h-16 bg-blue-500 rounded-lg shadow-lg border-2 border-blue-700 flex justify-center items-center transform rotate-12"><Book size={20} color="white"/></div>}
          
          {profession === 'operario' && <div className="absolute -top-6 w-16 h-10 bg-gray-400 rounded-t-[30px] shadow-lg border-b-4 border-gray-600"></div>}
          {profession === 'soldado' && <div className="absolute -top-8 w-20 h-12 bg-red-700 rounded-t-[40px] shadow-lg border-b-4 border-red-900 flex justify-center"><div className="w-4 h-4 bg-yellow-400 rounded-full mt-2"></div></div>}
          {profession === 'enfermeiro' && <div className="absolute top-20 w-32 h-20 border-4 border-pink-100 border-t-0 rounded-b-[50px] bg-pink-50/30 backdrop-blur-sm opacity-90 flex justify-center"><Heart size={16} className="text-pink-500 mt-2 fill-current"/></div>}
          {profession === 'engenheiro' && <div className="absolute -top-8 w-20 h-12 bg-yellow-500 rounded-t-[40px] shadow-lg border-b-4 border-yellow-700 flex justify-center"><div className="w-16 h-2 bg-yellow-300 rounded-full mt-2 opacity-50"></div></div>}
          {profession === 'medico' && <div className="absolute top-20 w-32 h-20 border-4 border-white border-t-0 rounded-b-[50px] bg-white/30 backdrop-blur-sm opacity-90 flex justify-center"><Activity size={16} className="text-blue-500 mt-2"/></div>}
          {profession === 'administrador' && <div className="absolute top-16 w-10 h-16 bg-transparent border-t-8 border-gray-800 flex justify-center"><div className="w-3 h-12 bg-red-600 mt-0 transform" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div></div>}
        </div>
      </div>
    </div>
  );
};

export default BeeAvatar;
