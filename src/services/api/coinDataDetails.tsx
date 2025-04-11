export default {
  getListOfCoinDataDetials: (productId: number, days: number) =>
    `https://coingeko.burjx.com/coin-ohlc?productId=${productId}&days=${days}`,
};
