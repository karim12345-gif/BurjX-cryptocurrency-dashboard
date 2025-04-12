import React, { useMemo, memo } from 'react';
import { Box } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { CurrencyData } from '@/interfaces';
import { ApexOptions } from 'apexcharts';
import { PriceChartProps } from '../interface';
import { getTimeFormat } from '../utils';

const PriceChart: React.FC<PriceChartProps> = ({
  data,
  chartType,
  timeframe,
  coinSymbol,
  currency = 'usd',
}) => {
  const line = 'line';
  const candlestick = 'candlestick';

  // Optimize data transformation with reduce
  const chartData = useMemo(() => {
    if (!data?.length) return [];

    return data.reduce<Array<{ x: number; y: number | number[] }>>((acc, item) => {
      const currencyKey = currency.toLowerCase();
      const c = item[currencyKey as keyof typeof item] as CurrencyData;

      // Early validation to reduce unnecessary computations
      if (!c?.open || !c?.high || !c?.low || !c?.close) return acc;

      const transformedItem = {
        x: new Date(item.date).getTime(),
        y: chartType === line ? c.close : [c.open, c.high, c.low, c.close],
      };

      acc.push(transformedItem);
      return acc;
    }, []);
  }, [data, currency, chartType]);

  // Memoize chart options
  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: (chartType === line ? line : candlestick) as ApexChart['type'],
        height: 400,
        background: '#1E1E1E',
        foreColor: '#aaa',
        toolbar: { show: false },
        zoom: { enabled: timeframe === '1H' || timeframe === '1D' },
      },
      colors: chartType === line ? ['#A3E635'] : undefined,
      xaxis: {
        type: 'datetime',
        labels: {
          datetimeUTC: false,
          format: getTimeFormat(timeframe),
          style: { colors: '#aaa' },
        },
        tickAmount: timeframe === '1H' ? 6 : undefined,
      },
      yaxis: {
        opposite: true,
        tooltip: { enabled: true },
        labels: {
          formatter: (value: number) =>
            value >= 1000 ? `$${Math.round(value / 1000)}k` : `$${value.toLocaleString()}`,
          style: { colors: '#aaa' },
        },
      },
      tooltip: {
        x: { format: getTimeFormat(timeframe) },
        theme: 'dark',
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: '#A3E635',
            downward: '#EF4444',
          },
        },
      },
      grid: {
        borderColor: '#333',
        strokeDashArray: 4,
      },
      theme: { mode: 'dark' },
      stroke: {
        curve: 'smooth',
        width: chartType === line ? 2 : 1,
      },
    }),
    [chartType, timeframe]
  );

  // Memoize series with stable reference
  const series = useMemo(
    () => [
      {
        name: coinSymbol.toUpperCase(),
        data: chartData,
      },
    ],
    [coinSymbol, chartData]
  );

  // Render with error boundary
  if (!data?.length) {
    return (
      <Box
        sx={{
          height: 400,
          width: '100%',
          background: '#1A1A1A',
          borderRadius: '16px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#aaa',
        }}
      >
        No data available
      </Box>
    );
  }

  return (
    <Box sx={{ height: 400, width: '100%', background: '#1A1A1A', borderRadius: '16px' }}>
      <ReactApexChart
        options={options}
        series={series}
        type={chartType === line ? line : candlestick}
        height={400}
      />
    </Box>
  );
};

export default memo(PriceChart);
