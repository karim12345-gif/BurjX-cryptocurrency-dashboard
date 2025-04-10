import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { Suspense } from 'react';
import { Header } from '@/components/layouts';
import { FeaturedDashboard } from '@/features/market/components';

const Home = () => {
  return (
    <>
      <Header />
      <Grid container spacing={3} justifyContent="center">
        {/* Featured */}
        <FeaturedDashboard />
        {/* Table */}
        <Suspense fallback={<CircularProgress />} />
      </Grid>
    </>
  );
};

export default Home;
