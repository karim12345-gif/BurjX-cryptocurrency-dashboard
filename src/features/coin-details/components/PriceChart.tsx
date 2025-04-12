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

  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    return data
      .map((item) => {
        const currencyKey = currency.toLowerCase();
        const c = item[currencyKey as keyof typeof item] || {};

        if (!c || typeof c !== 'object') return null;

        const currencyData = c as CurrencyData;

        if (
          currencyData.open === undefined ||
          currencyData.high === undefined ||
          currencyData.low === undefined ||
          currencyData.close === undefined
        ) {
          return null;
        }

        return {
          x: new Date(item.date).getTime(),
          y:
            chartType === line
              ? currencyData.close
              : [currencyData.open, currencyData.high, currencyData.low, currencyData.close],
        };
      })
      .filter(Boolean) as Array<{ x: number; y: number | number[] }>;
  }, [data, currency, chartType]);

  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: (chartType === line ? line : candlestick) as ApexChart['type'],
        height: 400,
        background: '#1E1E1E',
        foreColor: '#aaa',
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: timeframe === '1H' || timeframe === '1D',
        },
      },
      colors: chartType === line ? ['#A3E635'] : undefined,
      title: {
        align: 'left',
        style: {
          color: '#fff',
        },
      },
      xaxis: {
        type: 'datetime',
        labels: {
          datetimeUTC: false,
          format: getTimeFormat(timeframe),
          style: {
            colors: '#aaa',
          },
        },
        tickAmount: timeframe === '1H' ? 6 : undefined,
      },
      yaxis: {
        opposite: true,
        tooltip: {
          enabled: true,
        },
        labels: {
          formatter: (value: number) => {
            if (value >= 1000) {
              return `$${Math.round(value / 1000)}k`;
            }
            return `$${value.toLocaleString()}`;
          },
          style: {
            colors: '#aaa',
          },
        },
      },
      tooltip: {
        x: {
          format: getTimeFormat(timeframe),
        },
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
      theme: {
        mode: 'dark',
      },
      stroke: {
        curve: 'smooth',
        width: chartType === line ? 2 : 1,
      },
    }),
    [chartType, timeframe]
  );

  const series = useMemo(
    () => [
      {
        name: coinSymbol.toUpperCase(),
        data: chartData,
      },
    ],
    [coinSymbol, chartData]
  );

  return (
    <Box sx={{ height: 400, width: '100%', background: '#1A1A1A', borderRadius: '16px' }}>
      {chartData.length > 0 ? (
        <ReactApexChart
          options={options}
          series={series}
          type={chartType === line ? line : candlestick}
          height={400}
        />
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            color: '#aaa',
          }}
        >
          No data available
        </Box>
      )}
    </Box>
  );
};

export default memo(PriceChart);
