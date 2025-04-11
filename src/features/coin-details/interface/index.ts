import { CoinOHLC, MarketCapCoin } from '@/interfaces';

interface CurrencyData {
  close: number;
  high: number;
  low: number;
  open: number;
}

interface PriceChartProps {
  data: CoinOHLC[];
  chartType: 'line' | 'candlestick';
  timeframe: string;
  coinSymbol: string;
  currency?: string;
}

interface TimeframeSelectorProps {
  timeframe: string;
  onChange: (timeframe: string) => void;
}

interface ChartStyleToggleProps {
  chartType: 'line' | 'candlestick';
  onChange: (type: 'line' | 'candlestick') => void;
}

interface CoinSelectorProps {
  selectedCoin: MarketCapCoin | null;
  onSelectCoin: (coin: MarketCapCoin) => void;
  coins: MarketCapCoin[];
}

export type {
  CurrencyData,
  PriceChartProps,
  TimeframeSelectorProps,
  ChartStyleToggleProps,
  CoinSelectorProps,
};
