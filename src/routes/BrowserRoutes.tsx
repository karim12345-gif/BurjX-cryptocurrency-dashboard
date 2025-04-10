import { Error500, HomePage, NotFoundPage } from '@/pages';
import { createBrowserRouter } from 'react-router-dom';

// ** Router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />, // Market Page
    errorElement: <NotFoundPage />,
  },
  {
    path: '/',
    // element: , // Coin Details Page
    errorElement: <NotFoundPage />,
  },
  {
    path: '/500',
    element: <Error500 />,
    errorElement: <Error500 />,
  },
  {
    path: '/404',
    element: <NotFoundPage />,
    errorElement: <NotFoundPage />,
  },
]);

export default router;
