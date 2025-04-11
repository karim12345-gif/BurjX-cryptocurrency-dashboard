import { lazy } from 'react';
import { useState } from 'react';
import { CoinSelectorProps } from '../interface';
import CoinTriggerButton from './CoinTriggerButton';
const CoinSearchModal = lazy(() => import('./CoinSearchModal'));

const CoinSelector = ({ selectedCoin, onSelectCoin, coins }: CoinSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <CoinTriggerButton selectedCoin={selectedCoin} onClick={() => setIsOpen(true)} />
      <CoinSearchModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        coins={coins}
        onSelect={onSelectCoin}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </>
  );
};

export default CoinSelector;
