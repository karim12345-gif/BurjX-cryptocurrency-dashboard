import { createBrowserRouter } from 'react-router-dom';
import { Error500, HomePage } from '@/pages';
import Error404 from '@/pages/404';
import GlobalErrorBoundary from '@/pages/ErrorBoundary';
import CoinPage from '@/pages/CoinPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <GlobalErrorBoundary />,
  },

  {
    path: '/coin/:coinId',
    element: <CoinPage />,
    errorElement: <Error404 />,
  },

  {
    path: '/500',
    element: <Error500 />,
    errorElement: <GlobalErrorBoundary />,
  },
  {
    path: '/404',
    element: <Error404 />,
    errorElement: <GlobalErrorBoundary />,
  },
]);

export default router;
