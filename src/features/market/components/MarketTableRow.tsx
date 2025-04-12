import { useNavigate } from 'react-router-dom';
import { MarketTableRowProps } from '@/interfaces';
import { Line, LineChart, ResponsiveContainer, YAxis } from 'recharts';
import { formatLargeNumber } from '../utils/formatters';
import React, { useMemo } from 'react';

const MarketTableRow = ({ coin }: MarketTableRowProps) => {
  const navigate = useNavigate();

  const handleTradeClick = () => {
    navigate(`/coin/${coin.id}`);
  };

  // Memoize chart-related calculations to improve performance
  const { chartData, minPrice, maxPrice, isPriceUp } = useMemo(() => {
    const chartData = coin.sparkline.map((price, i) => ({
      date: `${i}h`,
      price,
    }));

    const priceValues = chartData.map((item) => item.price);
    const minPrice = Math.min(...priceValues) * 0.995;
    const maxPrice = Math.max(...priceValues) * 1.005;
    const isPriceUp = coin.priceChangePercentage24h >= 0;

    return { chartData, minPrice, maxPrice, isPriceUp };
  }, [coin.sparkline, coin.priceChangePercentage24h]);

  return (
    <tr>
      <td colSpan={7} className="py-2">
        <div className="flex items-center justify-between bg-[#121212] hover:bg-[#1A1A1A] transition-colors rounded-[24px] h-[80px] border border-[#1E1E1E] px-4">
          {/* Coin Info */}
          <div className="flex items-center w-[200px]">
            <div className="w-10 h-10 rounded-full mr-3 flex-shrink-0">
              <img src={coin.image} alt={coin.name} className="w-full h-full rounded-full" />
            </div>
            <div>
              <div className="font-bold text-white text-lg">{coin.symbol}</div>
              <div className="text-gray-400 text-sm">{coin.name}</div>
            </div>
          </div>

          {/* Market Cap */}
          <div className="text-white w-[160px] text-sm">$ {formatLargeNumber(coin.marketCap)}</div>

          {/* Trading Volume */}
          <div className="text-white w-[160px] text-sm">
            $ {formatLargeNumber(coin.tradingVolume)}
          </div>

          {/* Sparkline Chart */}
          <div className="h-12 w-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <YAxis domain={[minPrice, maxPrice]} hide />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke={isPriceUp ? '#D4F935' : '#EF4444'}
                  dot={false}
                  strokeWidth={1.5}
                  isAnimationActive={false}
                  connectNulls
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Price */}
          <div className="text-white w-[140px] text-sm font-medium">
            ${coin.currentPrice.toLocaleString()}
          </div>

          {/* 24h Change */}
          <div
            className={`w-[100px] text-sm font-medium text-right ${
              isPriceUp ? 'text-[#D4F935]' : 'text-[#EF4444]'
            }`}
          >
            {isPriceUp ? '+ ' : ''}
            {coin.priceChangePercentage24h.toFixed(2)}%
          </div>

          {/* Trade Button */}
          <div className="w-[120px] text-right">
            <button
              className="bg-[#D4F935] w-[108px] h-[48px] rounded-full text-black font-medium hover:bg-opacity-90 transition-colors"
              onClick={handleTradeClick}
            >
              Trade
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default React.memo(MarketTableRow);
