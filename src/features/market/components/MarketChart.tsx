import React, { useMemo } from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { MarketChartProps } from '../interface';

const MarketChart = ({ sparkline, isPositive }: MarketChartProps) => {
  const strokeColor = isPositive ? '#A3E635' : '#EF4444';

  // Memoize the data processing to avoid recalculation on each render
  const { chartData, min, max } = useMemo(() => {
    const chartData = sparkline.map((price, i) => ({ date: `${i}h`, price }));
    const min = Math.min(...sparkline) * 0.995;
    const max = Math.max(...sparkline) * 1.005;
    return { chartData, min, max };
  }, [sparkline]);

  return (
    <div className="h-16 w-32">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <YAxis domain={[min, max]} hide />
          <Line
            type="monotone"
            dataKey="price"
            stroke={strokeColor}
            dot={false}
            strokeWidth={2}
            isAnimationActive={false}
            connectNulls // Handle any null values
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default React.memo(MarketChart);
