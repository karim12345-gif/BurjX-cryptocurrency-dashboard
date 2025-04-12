import CircularProgress from '@mui/material/CircularProgress';
import { lazy, Suspense } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useMarket } from '@/context/MarketContext'; // Import the context hook

const MarketTable = lazy(() => import('@/features/market/components/MarketTable'));

const MarketListTable = () => {
  // Use the market context instead of local state
  const { coins, isLoading, isError, hasMore, loadMore } = useMarket();

  if (isLoading && coins.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress sx={{ color: '#D4F935' }} />
      </div>
    );
  }

  if (isError && coins.length === 0) return null;

  return (
    <div className="px-6 py-4 w-full max-w-[1400px] mx-auto">
      <h1 className="text-3xl mb-4 text-white">All Coins</h1>

      <Suspense
        fallback={
          <div className="flex justify-center py-8">
            <CircularProgress sx={{ color: '#D4F935' }} />
          </div>
        }
      >
        <InfiniteScroll
          dataLength={coins.length}
          next={loadMore} // Use loadMore from context
          hasMore={hasMore}
          loader={
            <div className="text-center py-4">
              <CircularProgress size={24} sx={{ color: '#D4F935' }} />
            </div>
          }
          endMessage={<div className="text-center text-gray-400 py-4">No more coins to load</div>}
          className="w-full overflow-x-auto"
        >
          <MarketTable data={coins} />
        </InfiniteScroll>
      </Suspense>
    </div>
  );
};

export default MarketListTable;
