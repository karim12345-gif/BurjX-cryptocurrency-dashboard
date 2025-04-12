import React, { createContext, useContext, useState, useEffect } from 'react';
import { MarketCapCoin } from '@/interfaces';
import { useGetListOfMarketCapByQuery } from '@/services/hooks';

interface MarketContextType {
  coins: MarketCapCoin[];
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  loadMore: () => void;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export const MarketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [page, setPage] = useState(1);
  const [coins, setCoins] = useState<MarketCapCoin[]>([]);
  const [hasMore, setHasMore] = useState(true);

  // Use React Query to fetch data with the page in the query key
  const { data, isLoading, isError } = useGetListOfMarketCapByQuery(page, 20);

  // Update coins when new data arrives
  useEffect(() => {
    if (!data?.data || !Array.isArray(data.data)) return;

    if (data.data.length === 0) {
      setHasMore(false);
      return;
    }

    setCoins((prevCoins) => {
      const existingIds = new Set(prevCoins.map((coin) => coin.id));
      const newUniqueCoins = data.data.filter((coin) => !existingIds.has(coin.id));

      if (newUniqueCoins.length === 0) {
        setHasMore(false);
        return prevCoins;
      }

      return [...prevCoins, ...newUniqueCoins];
    });
  }, [data]);

  // Function to load more data
  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <MarketContext.Provider value={{ coins, isLoading, isError, hasMore, loadMore }}>
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  const context = useContext(MarketContext);
  if (context === undefined) {
    throw new Error('useMarket must be used within a MarketProvider');
  }
  return context;
};
