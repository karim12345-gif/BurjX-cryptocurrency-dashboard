import Grid from '@mui/material/Grid';
import { Header } from '@/components/layouts';
import { lazy, Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

// Lazy load both large feature components
const CoinListPage = lazy(() => import('../CoinListPage'));
const FeaturedDashboard = lazy(() => import('@/features/market/components/FeaturedDashboard'));

const Home = () => {
  return (
    <>
      <Header />
      <Grid container spacing={3} justifyContent="center">
        {/* Featured */}
        <Suspense
          fallback={
            <div className="w-full flex justify-center py-10">
              <CircularProgress sx={{ color: '#D4F935' }} />
            </div>
          }
        >
          <FeaturedDashboard />
        </Suspense>

        {/* Table */}
        <CoinListPage />
      </Grid>
    </>
  );
};

export default Home;
