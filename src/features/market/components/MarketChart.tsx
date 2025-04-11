import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

interface Props {
  sparkline: number[];
  isPositive: boolean;
}

const MarketChart = ({ sparkline, isPositive }: Props) => {
  const chartData = sparkline.map((price, i) => ({ date: `${i}h`, price }));
  const min = Math.min(...sparkline) * 0.995;
  const max = Math.max(...sparkline) * 1.005;

  return (
    <div className="h-16 w-32">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <YAxis domain={[min, max]} hide />
          <Line
            type="monotone"
            dataKey="price"
            stroke={isPositive ? '#A3E635' : '#EF4444'}
            dot={false}
            strokeWidth={2}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketChart;
