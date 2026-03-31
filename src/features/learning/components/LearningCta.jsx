import React from 'react';
import { Play, Zap, Flame, BookOpen } from 'lucide-react';
import HoneyButton from '../../../components/ui/HoneyButton';

const LearningCta = ({ mode, disabled, label, sublabel, streakCount, onClick }) => {
  const icon =
    mode === 'review' ? (
      <BookOpen size={18} />
    ) : (
      <Play size={18} fill="currentColor" />
    );

  const tone =
    mode === 'review'
      ? 'bg-gradient-to-b from-[#FFF8E1] to-[#FFE0B2] text-[#1A1A1A] border-b-4 border-[#FFB74D] shadow-md active:border-b-0 active:translate-y-1'
      : null;

  return (
    <div className="sticky bottom-24 z-20 w-full max-w-md mx-auto">
      <div className="bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-3xl border border-white/30 dark:border-white/10 shadow-xl p-3">
        <HoneyButton
          onClick={onClick}
          disabled={disabled}
          variant={mode === 'review' ? 'secondary' : 'primary'}
          className={`w-full h-14 text-base ${tone || ''}`}
        >
          {icon} {label}
        </HoneyButton>
        {sublabel && (
          <div className="mt-2 flex items-center justify-center gap-2 text-[11px] font-bold text-gray-500 dark:text-gray-300">
            <Zap size={12} className="opacity-80" />
            <span className="text-center">{sublabel}</span>
          </div>
        )}
        {typeof streakCount === 'number' && streakCount > 0 && (
          <div className="mt-2 flex items-center justify-center">
            <div className="px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 text-[11px] font-black text-orange-700 dark:text-orange-300 flex items-center gap-1">
              <Flame size={12} className="text-orange-500" fill="currentColor" /> {streakCount}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningCta;
