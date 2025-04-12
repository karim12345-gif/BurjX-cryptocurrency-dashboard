import React from 'react';
import MarketTableRow from './MarketTableRow';
import { MarketCapCoinProp } from '../interface';
import { COLUMNS } from '../constants';

const MarketTable = ({ data }: MarketCapCoinProp) => {
  if (!data || data.length === 0) {
    return <div className="w-full text-center text-gray-400 py-8">No market data available</div>;
  }

  return (
    <div className="w-full text-white overflow-x-auto p-4">
      <table
        className="min-w-full border-collapse border-spacing-y-4 w-[1306px] mx-auto"
        style={{ borderSpacing: '0 16px', borderCollapse: 'separate' }}
      >
        <thead>
          <tr className="text-left text-gray-400 text-sm">
            {COLUMNS.map((column) => (
              <th key={column.id} className="py-4 px-6 first:pl-3 first:pr-6 last:pr-6 last:pl-6">
                {column.label}
                {column.info && (
                  <span className="inline-block ml-1 text-blue-400" title="More information">
                    ⓘ
                  </span>
                )}
              </th>
            ))}
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
};

export default React.memo(MarketTable);
