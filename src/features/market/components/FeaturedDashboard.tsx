import { useState, useMemo } from 'react';
import CryptoTabs from './CryptoTabs';
import CryptoGrid from './CryptoGrid';
import { MarketCapCoin } from '@/interfaces';
import { useGetListOfMarketCapByQuery } from '@/services/hooks';

const FeaturedDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('🔥 Featured');
  const { data, isLoading } = useGetListOfMarketCapByQuery(1, 20);

  const marketCoins: MarketCapCoin[] = Array.isArray(data?.data) ? data.data : [];

  // Filter and sort data based on selected tab
  const filteredCoins = useMemo(() => {
    if (selectedTab === '🚀 Top Gainers') {
      return [...marketCoins]
        .filter((coin) => coin.priceChangePercentage24h > 0)
        .sort((a, b) => b.priceChangePercentage24h - a.priceChangePercentage24h)
        .slice(0, 20);
    }

    if (selectedTab === '🚨 Top Losers') {
      return [...marketCoins]
        .filter((coin) => coin.priceChangePercentage24h < 0)
        .sort((a, b) => a.priceChangePercentage24h - b.priceChangePercentage24h)
        .slice(0, 20);
    }

    // Featured: Top 20 by Market Cap
    return [...marketCoins].sort((a, b) => b.marketCap - a.marketCap).slice(0, 20);
  }, [marketCoins, selectedTab]);

  return (
    <div className="text-white p-6 w-full bg-black min-h-screen">
      <h1 className="text-4xl mb-8 text-left">Markets</h1>
      <CryptoTabs selected={selectedTab} onSelect={setSelectedTab} />

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-400"></div>
        </div>
      ) : (
        <CryptoGrid data={filteredCoins} />
      )}
    </div>
  );
};

export default FeaturedDashboard;
