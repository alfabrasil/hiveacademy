import React, { useEffect, useMemo, useState } from 'react';
import { X, CheckCircle2, Eye, ArrowRight, BookOpen } from 'lucide-react';
import HoneyButton from '../../../components/ui/HoneyButton';

const ReviewModal = ({ open, items, onClose, playSound, addNotification }) => {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const total = items?.length ?? 0;
  const current = items?.[index] ?? null;

  const title = useMemo(() => {
    if (current?.ctx) return `Revisão • ${current.ctx}`;
    return 'Revisão';
  }, [current?.ctx]);

  useEffect(() => {
    if (!open) return;
    setIndex(0);
    setRevealed(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setRevealed(false);
  }, [index, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[2000] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-[#1A1A1A] rounded-[32px] shadow-2xl border border-white/20 overflow-hidden">
        <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300">
              <BookOpen size={18} />
            </div>
            <div className="min-w-0">
              <p className="font-black text-gray-800 dark:text-white leading-tight">{title}</p>
              <p className="text-xs font-bold text-gray-400">{total > 0 ? `${index + 1}/${total}` : '0/0'}</p>
            </div>
          </div>
          <button
            onClick={() => {
              if (typeof playSound === 'function') playSound('pop');
              onClose();
            }}
            className="p-2 rounded-2xl bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-200 hover:scale-105 transition-transform"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5">
          {current ? (
            <div className="rounded-[28px] border border-gray-100 dark:border-white/10 bg-gradient-to-b from-white to-gray-50 dark:from-[#111] dark:to-[#1A1A1A] p-5 shadow-sm">
              <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">Inglês</p>
              <p className="mt-1 text-xl font-black text-gray-900 dark:text-white leading-snug">{current.en}</p>

              <div className="mt-5 h-px bg-gray-200 dark:bg-white/10"></div>

              <p className="mt-5 text-[11px] font-black uppercase tracking-widest text-gray-400">Português</p>
              {revealed ? (
                <p className="mt-1 text-lg font-bold text-gray-700 dark:text-gray-200 leading-snug">{current.pt}</p>
              ) : (
                <div className="mt-2">
                  <HoneyButton
                    onClick={() => {
                      if (typeof playSound === 'function') playSound('pop');
                      setRevealed(true);
                    }}
                    variant="secondary"
                    className="w-full"
                  >
                    <Eye size={16} /> Mostrar tradução
                  </HoneyButton>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500 dark:text-gray-300 font-bold">
              Nenhum conteúdo disponível para revisão.
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-white/10 bg-white/70 dark:bg-black/20">
          <div className="flex gap-2">
            <HoneyButton
              onClick={() => {
                if (!current) {
                  onClose();
                  return;
                }

                const isLast = index >= total - 1;

                if (!revealed && !isLast) {
                  if (typeof playSound === 'function') playSound('error');
                  if (typeof addNotification === 'function') addNotification('Veja a tradução antes de avançar.');
                  return;
                }

                if (isLast) {
                  if (typeof playSound === 'function') playSound('success');
                  if (typeof addNotification === 'function') addNotification('Revisão concluída! ✅');
                  onClose();
                  return;
                }

                if (typeof playSound === 'function') playSound('pop');
                setIndex((v) => v + 1);
              }}
              variant="primary"
              className="w-full"
            >
              {index >= total - 1 ? (
                <>
                  <CheckCircle2 size={18} /> Concluir
                </>
              ) : (
                <>
                  Próximo <ArrowRight size={18} />
                </>
              )}
            </HoneyButton>
          </div>
          <p className="mt-2 text-[10px] text-center font-bold text-gray-400">
            Reforço rápido não gasta energia e funciona à noite.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
