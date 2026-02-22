import React from 'react';

const HoneyButton = ({ children, onClick, className = '', disabled = false, variant = 'primary' }) => {
  const baseStyle = "relative font-bold py-3 px-6 rounded-2xl transition-all duration-150 flex items-center justify-center gap-2 overflow-hidden group";
  
  const variants = {
    primary: "bg-gradient-to-b from-[#FFC83D] to-[#F4A300] text-[#1A1A1A] border-b-4 border-[#CC8800] shadow-[0_4px_15px_rgba(244,163,0,0.4)] hover:shadow-[0_6px_20px_rgba(244,163,0,0.6)] hover:-translate-y-0.5 active:border-b-0 active:translate-y-1",
    secondary: "bg-gradient-to-b from-[#FFF8E1] to-[#FFE0B2] text-[#1A1A1A] border-b-4 border-[#FFB74D] shadow-md active:border-b-0 active:translate-y-1",
    dark: "bg-gradient-to-b from-[#333] to-[#1A1A1A] text-[#FFC83D] border-b-4 border-black shadow-md active:border-b-0 active:translate-y-1",
    action: "bg-gradient-to-b from-[#FF9F1C] to-[#E67E22] text-white border-b-4 border-[#D35400] shadow-md active:border-b-0 active:translate-y-1",
    danger: "bg-gradient-to-b from-red-500 to-red-700 text-white border-b-4 border-red-900 shadow-md active:border-b-0 active:translate-y-1"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed transform-none' : ''} ${className}`}
    >
      <div className="absolute top-0 left-0 w-full h-1/3 bg-white opacity-20 rounded-t-2xl pointer-events-none"></div>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};

export default HoneyButton;
