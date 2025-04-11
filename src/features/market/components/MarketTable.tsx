// MarketTable.tsx
import { MarketCapCoin } from '@/interfaces';
import MarketTableRow from './MarketTableRow';

interface Props {
  data: MarketCapCoin[];
}

const MarketTable = ({ data }: Props) => (
  <div className="w-full text-white overflow-x-auto  p-4">
    <table
      className="min-w-full border-collapse border-spacing-y-4 w-[1306px] mx-auto"
      style={{ borderSpacing: '0 16px', borderCollapse: 'separate' }}
    >
      <thead>
        <tr className="text-left text-gray-400 text-sm">
          <th className="py-4 pl-3 pr-6">Market Name</th>
          <th className="py-4 px-6">
            Market Cap
            <span className="inline-block ml-1 text-blue-400">ⓘ</span>
          </th>
          <th className="py-4 px-6">
            Trading Volume
            <span className="inline-block ml-1 text-blue-400">ⓘ</span>
          </th>
          <th className="py-4 px-6">24h Chart</th>
          <th className="py-4 px-6">Price</th>
          <th className="py-4 px-6">24h Change</th>
          <th className="py-4 px-6"></th>
        </tr>
      </thead>
      <tbody>
        {data.map((coin) => (
          <MarketTableRow key={coin.id} coin={coin} />
        ))}
      </tbody>
    </table>
  </div>
);

export default MarketTable;
