import React from 'react';

const ProgressBar = ({ value, max = 100, color = 'bg-[#FFC83D]', icon: Icon, label }) => {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <div className="flex justify-between text-xs font-bold text-gray-700 dark:text-gray-300">
          <span className="flex items-center gap-1">{Icon && <Icon size={12} />}{label}</span>
          <span>{Math.round(percent)}%</span>
        </div>
      )}
      <div className="h-3 w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden shadow-inner">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-500 ease-out shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)]`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
