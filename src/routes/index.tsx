const pageRoutes = {
  home: '/home',
  coinDetail: '/coin/:coinId',
};

const errorRoutes = {
  404: '/404',
  500: '/500',
  error: '/error',
};

const routes = {
  ...pageRoutes,
  ...errorRoutes,
};

export default routes;
