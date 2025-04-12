import Grid from '@mui/material/Grid';
import { lazy, Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

// Lazy load section components
const MarketListTable = lazy(() => import('../section/MarketListTable'));
const MarketCategorizationSection = lazy(() => import('../section/MarketCategorizationSection'));

const MarketPage = () => {
  return (
    <Grid container spacing={3} justifyContent="center">
      {/* Categorization Section */}
      <Suspense
        fallback={
          <div className="w-full flex justify-center py-10">
            <CircularProgress sx={{ color: '#D4F935' }} />
          </div>
        }
      >
        <MarketCategorizationSection />
      </Suspense>

      {/* Market Table */}
      <Suspense
        fallback={
          <div className="w-full flex justify-center py-10">
            <CircularProgress sx={{ color: '#D4F935' }} />
          </div>
        }
      >
        <MarketListTable />
      </Suspense>
    </Grid>
  );
};

export default MarketPage;
