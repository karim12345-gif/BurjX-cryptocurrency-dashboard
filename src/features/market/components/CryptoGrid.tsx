import { MarketCapCoin } from '@/interfaces';
import CryptoCard from './CryptoCard';

interface Props {
  data: MarketCapCoin[];
}

const CryptoGrid = ({ data }: Props) => (
  <div className="overflow-x-auto w-full">
    <div className="flex gap-4 min-w-max">
      {data.map((crypto) => (
        <CryptoCard key={crypto.id + Math.random()} crypto={crypto} />
      ))}
    </div>
  </div>
);

export default CryptoGrid;
