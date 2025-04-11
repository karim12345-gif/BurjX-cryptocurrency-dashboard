import { GetListOfMarketCap } from '@/interfaces';
import marketCapApi from '@/services/api/marketCapApi';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const GetListOfMarketCapByQuery = async (
  page: number,
  pageSize: number
): Promise<GetListOfMarketCap> => {
  const response = await axios.get<GetListOfMarketCap>(
    marketCapApi.getListOfMarketCap(page, pageSize)
  );

  // console.log('response', response);

  return response.data;
};

// hook to get the list of market cap by query
export const useGetListOfMarketCapByQuery = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: ['GetListOfMarketCap'],
    queryFn: () => GetListOfMarketCapByQuery(page, pageSize),
    refetchInterval: 30000, // optional: refresh every 30s
  });
};
