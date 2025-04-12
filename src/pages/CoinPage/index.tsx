import { Suspense, lazy } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const CoinDetials = lazy(() => import('@/features/coin-details/pages/CoinDetails'));

const CoinPage = () => {
  return (
    <Suspense
      fallback={
        <Box
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}
        >
          <CircularProgress sx={{ color: '#D4F935' }} />
        </Box>
      }
    >
      <CoinDetials />
    </Suspense>
  );
};

export default CoinPage;
