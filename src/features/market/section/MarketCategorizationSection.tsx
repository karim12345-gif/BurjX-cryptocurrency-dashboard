import { useState, useMemo } from 'react';
import CryptoTabs from '../components/CryptoTabs';
import CryptoGrid from '../components/CryptoGrid';
import { TabType } from '../interface';
import { useMarket } from '@/context/MarketContext';
import { CircularProgress } from '@mui/material';

const CategorizationSection = () => {
  const [selectedTab, setSelectedTab] = useState('🔥 Featured' as TabType);

  // Use the shared market context so sync with the table of data
  const { coins, isLoading } = useMarket();

  // Filter and sort data based on selected tab
  const filteredCoins = useMemo(() => {
    if (selectedTab === '🚀 Top Gainers') {
      return [...coins]
        .filter((coin) => coin.priceChangePercentage24h > 0)
        .sort((a, b) => b.priceChangePercentage24h - a.priceChangePercentage24h)
        .slice(0, 20);
    }

    if (selectedTab === '🚨 Top Losers') {
      return [...coins]
        .filter((coin) => coin.priceChangePercentage24h < 0)
        .sort((a, b) => a.priceChangePercentage24h - b.priceChangePercentage24h)
        .slice(0, 20);
    }

    // Top 20 by Market Cap
    return [...coins].sort((a, b) => b.marketCap - a.marketCap).slice(0, 20);
  }, [coins, selectedTab]);

  return (
    <div className="text-white p-6 w-full">
      <h1 className="text-4xl mb-8 text-left">Markets</h1>
      <CryptoTabs selected={selectedTab} onSelect={setSelectedTab} />

      {isLoading && coins.length === 0 ? (
        <div className="flex justify-center items-center h-40">
          <CircularProgress sx={{ color: '#D4F935' }} />
        </div>
      ) : (
        <CryptoGrid data={filteredCoins} />
      )}
    </div>
  );
};

export default CategorizationSection;
