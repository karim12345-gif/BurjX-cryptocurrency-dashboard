import { MarketCapCoin } from '@/interfaces';

interface CryptoCardProps {
  crypto: MarketCapCoin;
}

interface MarketCapCoinProp {
  data: MarketCapCoin[];
}

export const TABS = ['🔥 Featured', '🚀 Top Gainers', '🚨 Top Losers'] as const;

// tabs array for type safety
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
