import React, { useMemo, useState } from 'react';
import { BookOpen, Briefcase, Home } from 'lucide-react';
import HoneyButton from '../../../components/ui/HoneyButton';
import { LEARNING_PATH, LESSONS_CONTENT } from '../../../data/gameData';
import LearningPath from '../components/LearningPath';
import LearningCta from '../components/LearningCta';
import ReviewModal from '../components/ReviewModal';

const PROFESSION_CHANGE_COST = 500;
const REVIEW_ITEMS_COUNT = 5;

const LearningScreen = ({ bee, isNight, startStudy, playSound, addNotification, wallet, onChangeProfession, onClose }) => {
  const currentLevel = bee?.level ?? 1;
  const currentNode = useMemo(() => LEARNING_PATH.find((n) => n.level === currentLevel) || null, [currentLevel]);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewItems, setReviewItems] = useState([]);

  const canStudy = !isNight && (bee?.energy ?? 0) >= 20;
  const canChangeProfession = (wallet?.hny ?? 0) >= PROFESSION_CHANGE_COST;
  const streakCount = typeof bee?.consecutiveStudyDays === 'number' ? bee.consecutiveStudyDays : 0;

  const notify = (msg) => {
    if (typeof addNotification === 'function') addNotification(msg);
  };

  const buildReviewPool = () => {
    const lessonIds = Array.from(
      new Set(
        LEARNING_PATH.filter((n) => n.level <= currentLevel && typeof n.lessonId === 'string' && n.lessonId.length > 0).map((n) => n.lessonId)
      )
    );

    const pool = [];
    for (const lessonId of lessonIds) {
      const content = LESSONS_CONTENT?.[lessonId];
      if (!Array.isArray(content)) continue;
      for (const item of content) {
        if (!item?.en || !item?.pt) continue;
        pool.push({ en: item.en, pt: item.pt, ctx: item.ctx || null });
      }
    }
    return pool;
  };

  const startReview = () => {
    const pool = buildReviewPool();
    if (pool.length === 0) {
      if (typeof playSound === 'function') playSound('error');
      notify('Sem conteúdo para revisão ainda. Faça pelo menos uma lição.');
      return;
    }

    const picked = [];
    const used = new Set();
    const count = Math.min(REVIEW_ITEMS_COUNT, pool.length);

    while (picked.length < count) {
      const idx = Math.floor(Math.random() * pool.length);
      if (used.has(idx)) continue;
      used.add(idx);
      picked.push(pool[idx]);
    }

    setReviewItems(picked);
    setReviewOpen(true);
    if (typeof playSound === 'function') playSound('pop');
  };

  const handleNodeClick = (node, { isLocked, isCompleted }) => {
    if (typeof playSound === 'function') playSound('pop');

    if (isLocked) {
      notify(`Bloqueado! Chegue ao Nível ${node.level} para desbloquear.`);
      return;
    }

    if (node.type === 'chest') {
      notify(`Baú do Nível ${node.level}! Continue evoluindo para mais recompensas.`);
      return;
    }

    if (!canStudy) {
      startReview();
      return;
    }

    if (typeof startStudy !== 'function') {
      if (typeof playSound === 'function') playSound('error');
      notify('Estudo indisponível no momento.');
      return;
    }

    startStudy(node.lessonId);
  };

  const handlePrimaryStudy = () => {
    if (!currentNode) return;
    if (canStudy) {
      handleNodeClick(currentNode, { isLocked: false, isCompleted: false });
      return;
    }
    startReview();
  };

  const handleChangeProfession = () => {
    if (typeof playSound === 'function') playSound('pop');
    if (typeof onChangeProfession !== 'function') {
      notify('Ação indisponível no momento.');
      return;
    }
    if (!canChangeProfession) {
      if (typeof playSound === 'function') playSound('error');
      notify('HNY insuficiente para mudar de profissão.');
      return;
    }
    onChangeProfession();
  };

  const ctaMode = canStudy ? 'study' : 'review';
  const ctaLabel = canStudy
    ? currentNode
      ? `Estudar: ${currentNode.title}`
      : 'Estudar'
    : 'Revisar (reforço)';
  const ctaSublabel = canStudy
    ? `Energia atual: ${bee.energy}`
    : isNight
      ? 'Noite: faça revisão sem gastar energia'
      : `Energia baixa (${bee.energy}/20): faça revisão`;

  return (
    <div className="p-6 pb-28 h-full overflow-y-auto animate-slide-up bg-gradient-to-b from-blue-50 to-white dark:from-[#111] dark:to-[#1a1a1a]">
      <div className="mb-6">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <div />
          <h2 className="text-2xl font-black text-gray-800 dark:text-white flex justify-center items-center gap-2 text-center">
            <BookOpen className="text-blue-500" /> Trilha de Aprendizado
          </h2>
          <button
            onClick={() => {
              if (typeof playSound === 'function') playSound('pop');
              if (typeof onClose === 'function') onClose();
            }}
            className="justify-self-end px-3 py-2 rounded-xl bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white font-bold text-xs border border-gray-200 dark:border-white/10 hover:scale-105 transition"
          >
            <span className="inline-flex items-center gap-1"><Home size={14}/> Sair</span>
          </button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium text-center">
          Nível Atual: <span className="text-blue-600 font-bold">{currentLevel}</span>
        </p>
      </div>

      <LearningCta
        mode={ctaMode}
        disabled={ctaMode === 'study' && !currentNode}
        label={ctaLabel}
        sublabel={ctaSublabel}
        streakCount={streakCount}
        onClick={handlePrimaryStudy}
      />

      <ReviewModal
        open={reviewOpen}
        items={reviewItems}
        onClose={() => setReviewOpen(false)}
        playSound={playSound}
        addNotification={addNotification}
      />

      <LearningPath currentLevel={currentLevel} onNodeClick={handleNodeClick} />

      <div className="text-center mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/50 max-w-md mx-auto">
        <p className="text-xs text-blue-600 dark:text-blue-300 font-bold">Mais fases em breve!</p>
      </div>

      <div className="mt-6 flex flex-col items-center max-w-md mx-auto">
        <HoneyButton
          onClick={handleChangeProfession}
          disabled={!canChangeProfession}
          variant="secondary"
          className="w-full py-4 border-2 border-purple-200 dark:border-purple-900 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 shadow-sm"
        >
          <div className="flex items-center justify-center gap-2">
            <Briefcase size={20} />
            <span>Mudar Profissão</span>
          </div>
        </HoneyButton>
        <p className="text-xs text-gray-400 mt-2 font-bold">Custo: {PROFESSION_CHANGE_COST} HNY</p>
      </div>
    </div>
  );
};

export default LearningScreen;
