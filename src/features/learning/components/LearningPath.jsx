import React, { useMemo } from 'react';
import { LEARNING_PATH } from '../../../data/gameData';
import LearningNode from './LearningNode';

const getModuleHeader = (nodeId) => {
  if (nodeId === 1) {
    return {
      title: 'Módulo 1: Fundamentos',
      className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800'
    };
  }
  if (nodeId === 11) {
    return {
      title: 'Módulo 2: Construção',
      className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800'
    };
  }
  if (nodeId === 19) {
    return {
      title: 'Módulo 3: Fluência',
      className: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800'
    };
  }
  return null;
};

const LearningPath = ({ currentLevel, onNodeClick }) => {
  const nodes = useMemo(() => LEARNING_PATH, []);

  return (
    <div className="relative max-w-md mx-auto">
      <div className="absolute left-1/2 top-4 bottom-10 w-2 bg-gray-200 dark:bg-gray-800 -translate-x-1/2 rounded-full z-0"></div>

      <div className="space-y-12 relative z-10 pb-10">
        {nodes.map((node) => {
          const isCompleted = node.level < currentLevel;
          const isCurrent = node.level === currentLevel;
          const isLocked = node.level > currentLevel;
          const moduleHeader = getModuleHeader(node.id);

          return (
            <div key={node.id} className="flex flex-col items-center w-full">
              {moduleHeader && (
                <div className={`mb-12 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-sm border ${moduleHeader.className} z-20 animate-slide-up`}>
                  {moduleHeader.title}
                </div>
              )}

              <LearningNode
                node={node}
                isCompleted={isCompleted}
                isCurrent={isCurrent}
                isLocked={isLocked}
                onClick={() => onNodeClick(node, { isCompleted, isCurrent, isLocked })}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LearningPath;
