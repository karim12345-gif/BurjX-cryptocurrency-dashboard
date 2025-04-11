import { useGetListOfMarketCapByQuery } from '@/services/hooks';
import CircularProgress from '@mui/material/CircularProgress';
import { lazy, Suspense } from 'react';

const MarketTable = lazy(() => import('@/features/market/components/MarketTable'));

const CoinListPage = () => {
  const { data, isLoading, isError } = useGetListOfMarketCapByQuery(1, 100);
  const coins = Array.isArray(data?.data) ? data.data : [];

  if (isLoading && !data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress sx={{ color: '#D4F935' }} />
      </div>
    );
  }

  if (isError || !data) return null;

  return (
    <div className="px-6 py-4 w-full max-w-[1400px] mx-auto">
      <h1 className="text-3xl mb-4 text-white">All Coins</h1>

      <div className="w-full overflow-x-auto">
        <Suspense
          fallback={
            <div className="flex justify-center py-8">
              <CircularProgress sx={{ color: '#D4F935' }} />
            </div>
          }
        >
          <MarketTable data={coins} />
        </Suspense>
      </div>
    </div>
  );
};

export default CoinListPage;
