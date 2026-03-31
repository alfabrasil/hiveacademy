import React from 'react';
import { Star, Lock, CheckCircle, Play, Gift } from 'lucide-react';

const LearningNode = ({ node, isCompleted, isCurrent, isLocked, onClick }) => {
  let statusClassName = 'bg-gray-200 text-gray-400 border-gray-300';

  if (isCompleted) {
    statusClassName = 'bg-green-500 text-white border-green-600 shadow-lg shadow-green-200 dark:shadow-none';
  } else if (isCurrent) {
    statusClassName = 'bg-blue-500 text-white border-blue-600 ring-4 ring-blue-200 dark:ring-blue-900 animate-pulse-slow scale-110';
  } else if (node.type === 'chest') {
    statusClassName = 'bg-yellow-400 text-yellow-900 border-yellow-500';
  }

  return (
    <div className="flex flex-col items-center group w-full">
      <div className="flex flex-col items-center">
        <button
          onClick={onClick}
          className={`w-20 h-20 rounded-full flex items-center justify-center border-b-4 transition-all active:scale-95 ${statusClassName} relative z-10`}
        >
          {node.type === 'chest' && !isCompleted && !isLocked ? (
            <Gift size={32} className="animate-bounce" />
          ) : node.type === 'chest' ? (
            <Gift size={28} />
          ) : isCompleted ? (
            <CheckCircle size={32} />
          ) : isCurrent ? (
            <Star size={32} fill="currentColor" className="animate-spin-slow" />
          ) : isLocked ? (
            <Lock size={24} />
          ) : (
            <span className="text-2xl grayscale opacity-50">{node.icon}</span>
          )}

          {isCurrent && (
            <>
              <Star size={12} className="absolute -top-1 -right-2 text-yellow-400 animate-bounce delay-100" fill="currentColor" />
              <Star size={10} className="absolute top-0 -left-2 text-yellow-400 animate-bounce delay-300" fill="currentColor" />
              <Play size={14} className="absolute -bottom-2 text-white/90" fill="currentColor" />
            </>
          )}
        </button>

        <div
          className={`mt-3 bg-white dark:bg-[#222] px-4 py-2 rounded-xl shadow-sm border border-gray-100 dark:border-white/10 text-center transition-all ${
            isCurrent ? 'scale-105' : 'opacity-80'
          }`}
        >
          <h4 className="font-bold text-gray-800 dark:text-white text-sm leading-tight">{node.title}</h4>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Nível {node.level}</p>
        </div>
      </div>
    </div>
  );
};

export default LearningNode;
