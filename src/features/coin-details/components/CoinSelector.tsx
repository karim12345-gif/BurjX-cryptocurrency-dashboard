import React, { lazy, Suspense, useState, useCallback, memo } from 'react';
import { CoinSelectorProps } from '../interface';
import CoinTriggerButton from './CoinTriggerButton';
import { MarketCapCoin } from '@/interfaces';

const CoinSearchModal = lazy(() => import('./CoinSearchModal'));

const CoinSelector: React.FC<CoinSelectorProps> = ({ selectedCoin, onSelectCoin, coins }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // handle open
  const handleOpenModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
    // Reset search term when closing
    setSearchTerm('');
  }, []);

  // handle select coin
  const handleSelectCoin = useCallback(
    (coin: MarketCapCoin) => {
      onSelectCoin(coin);
      handleCloseModal();
    },
    [onSelectCoin, handleCloseModal]
  );

  const handleSearchTermChange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  return (
    <>
      <CoinTriggerButton selectedCoin={selectedCoin} onClick={handleOpenModal} />
      <Suspense fallback={null}>
        {isOpen && (
          <CoinSearchModal
            open={isOpen}
            onClose={handleCloseModal}
            coins={coins}
            onSelect={handleSelectCoin}
            searchTerm={searchTerm}
            setSearchTerm={handleSearchTermChange}
          />
        )}
      </Suspense>
    </>
  );
};

export default memo(CoinSelector);
