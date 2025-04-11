import { CoinOHLC } from '@/interfaces';
import { CoinDataDetailsApi } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const GetListOfCoinDataById = async (productId: number, days: number): Promise<CoinOHLC | null> => {
  // Check if productId is valid
  if (!productId) {
    // Return null or handle the case when id is not provided
    return null;
  }

  const response = await axios.get<CoinOHLC>(
    CoinDataDetailsApi.getListOfCoinDataDetials(productId, days)
  );

  console.log(CoinDataDetailsApi.getListOfCoinDataDetials(productId, days));

  //   console.log('response', response);

  return response.data;
};

// hook to get the list of coin data by id
export const useGetListOfCoinDatabyId = (productId: number, days: number) => {
  return useQuery({
    queryKey: ['GetListOfCoinData', productId, days],
    queryFn: () => GetListOfCoinDataById(productId, days),
  });
};
