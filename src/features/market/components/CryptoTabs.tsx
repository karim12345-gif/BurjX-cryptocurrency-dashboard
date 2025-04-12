import React from 'react';
import { CryptoTabsProps, TABS, TabType } from '../interface';

const CryptoTabs = ({ selected, onSelect }: CryptoTabsProps) => {
  // Memoizing tab button handler creation to avoid creating functions during render
  const createTabHandler = React.useCallback((tab: TabType) => () => onSelect(tab), [onSelect]);

  return (
    <div className="flex mb-6 border-b border-gray-700 text-sm font-medium w-full overflow-x-auto">
      {TABS.map((tab) => {
        const isSelected = selected === tab;
        const buttonClass = `whitespace-nowrap px-4 py-2 mr-2 rounded-t-md ${
          isSelected
            ? 'text-yellow-400 border-b-2 border-yellow-400'
            : 'text-gray-400 hover:text-white'
        }`;

        return (
          <button
            key={tab}
            className={buttonClass}
            onClick={createTabHandler(tab)}
            aria-selected={isSelected}
            role="tab"
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};

export default React.memo(CryptoTabs);
