import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CssBaseline from '@mui/material/CssBaseline';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import router from './routes/BrowserRoutes';

import { QueryClient } from '@tanstack/react-query';
import { MarketProvider } from './context';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true, // Let query errors bubble up
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MarketProvider>
        <CssBaseline />
        <RouterProvider router={router} />
      </MarketProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
