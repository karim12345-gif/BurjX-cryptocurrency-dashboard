import { MarketCapCoin } from '@/interfaces';
import { Line, LineChart, ResponsiveContainer, YAxis } from 'recharts';

interface Props {
  crypto: MarketCapCoin;
}

const CryptoCard = ({ crypto }: Props) => {
  // transform sparkline into recharts-compatible data
  const chartData = crypto.sparkline.map((price, i) => ({
    date: `${i}h`,
    price,
  }));

  // Get min and max values to set the domain
  const priceValues = chartData.map((item) => item.price);
  const minPrice = Math.min(...priceValues) * 0.995; // Add small buffer
  const maxPrice = Math.max(...priceValues) * 1.005; // Add small buffer

  return (
    <div className="bg-[#1E1E1E] rounded-xl p-4 cursor-pointer hover:shadow-lg transition-transform duration-300 transform hover:scale-[1.02] min-w-[250px]">
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2 text-sm">
          <img src={crypto.image} alt={crypto.name} className="w-full h-full rounded-full" />
        </div>
        <div>
          <div className="font-bold text-white">{crypto.symbol}</div>
          <div className="text-gray-400 text-xs">{crypto.name}</div>
        </div>
      </div>

      <div className="h-20 my-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            {/* Hidden YAxis to control domain but not show the axis */}
            <YAxis domain={[minPrice, maxPrice]} hide={true} />
            <Line
              type="monotone"
              dataKey="price"
              stroke={crypto.priceChangePercentage24h >= 0 ? '#A3E635' : '#EF4444'}
              dot={false}
              strokeWidth={2}
              isAnimationActive={false} // Disable animation for crisp rendering
              connectNulls={true} // Connect across null values
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between items-center mt-3">
        <div className="text-xl font-bold">${crypto.currentPrice.toLocaleString()}</div>
        <div
          className={`text-sm px-2 py-1 rounded-full font-medium bg-[#FFFFFF0D] ${
            crypto.priceChangePercentage24h >= 0 ? 'text-[#A3E635]' : 'text-[#EF4444]'
          }`}
        >
          {crypto.priceChangePercentage24h >= 0 ? '+' : ''}
          {crypto.priceChangePercentage24h.toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;
