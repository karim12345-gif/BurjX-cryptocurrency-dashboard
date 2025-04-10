interface ReactQueryProviderProps {
  children: React.ReactNode;
}

type CryptoData = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  percentChange: number;
  chartData: { date: string; price: number }[];
  color: string;
  icon: string;
};

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
  data: MarketCapCoin;
}

export type { ReactQueryProviderProps, CryptoData, GetListOfMarketCap };
