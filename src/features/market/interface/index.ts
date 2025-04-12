import { MarketCapCoin } from '@/interfaces';

interface CryptoCardProps {
  crypto: MarketCapCoin;
}

interface MarketCapCoinProp {
  data: MarketCapCoin[];
}

// Move tabs array outside component to prevent recreation on each render
export const TABS = ['🔥 Featured', '🚀 Top Gainers', '🚨 Top Losers'] as const;

// Create a type from the tabs array for type safety
type TabType = (typeof TABS)[number];

interface CryptoTabsProps {
  selected: TabType;
  onSelect: (tab: TabType) => void;
}

interface MarketChartProps {
  sparkline: number[];
  isPositive: boolean;
}

export type { CryptoCardProps, MarketCapCoinProp, CryptoTabsProps, TabType, MarketChartProps };
