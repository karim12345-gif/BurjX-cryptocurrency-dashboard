interface ReactQueryProviderProps {
  children: React.ReactNode;
}

export type MarketCapCoin = {
  currentPrice: number;
  id: string;
  image: string;
  marketCap: number;
  name: string;
  priceChangePercentage24h: number;
  productId: number;
  sparkline: number[];
  symbol: string;
  tradingVolume: number;
  chartData?: { date: string; price: number }[];
};

interface GetListOfMarketCap {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  data: MarketCapCoin[];
}

// Coin data interfaces
export interface CurrencyData {
  open: number;
  high: number;
  low: number;
  close: number;
}

interface CoinOHLC {
  date: number;
  usd: CurrencyData;
  aed: CurrencyData;
  [key: string]: CurrencyData | number;
}

export type { ReactQueryProviderProps, GetListOfMarketCap, CoinOHLC };
