export default {
  getListOfMarketCap: (page: number, pageSize: number) =>
    `https://coingeko.burjx.com/coin-prices-all?currency=usd&page=${page}&pageSize=${pageSize}`,
};
