import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryProviderProps } from '../interfaces';
import { useResponseModelHelper } from '@/services/helpers/ResponseModelHelper';

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const handleError = useResponseModelHelper();

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error: any) => handleError(error),
    }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        retry: false,
      },
    },
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
