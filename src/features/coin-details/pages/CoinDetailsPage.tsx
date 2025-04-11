import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Container, Divider, Paper, CircularProgress } from '@mui/material';

import ChartStyleToggle from '../components/ChartStyleToggle';
import { lazy } from 'react';

import { useGetListOfCoinDatabyId } from '@/services/hooks/CoinData';
import { useGetListOfMarketCapByQuery } from '@/services/hooks';
import { MarketCapCoin } from '@/interfaces';
import { BackButton } from '@/components/button';
import { daysMap } from '../utils';

const PriceChart = lazy(() => import('../components/PriceChart'));
const CoinSelector = lazy(() => import('../components/CoinSelector'));
const TimeframeSelector = lazy(() => import('../components/TimeframeSelector'));

const CoinDetailsPage = () => {
  const coindUsd = 'usd';
  const oneHour = '1H';
  const candlestick = 'candlestick';
  const { coinId } = useParams<{ coinId: string }>();
  const [selectedCoin, setSelectedCoin] = useState<MarketCapCoin | null>(null);
  const [chartType, setChartType] = useState<'line' | 'candlestick'>(candlestick);
  const [timeframe, setTimeframe] = useState(oneHour);

  const { data: marketCapData, isLoading: isLoadingCoins } = useGetListOfMarketCapByQuery(1, 10);
  const coinList: MarketCapCoin[] = Array.isArray(marketCapData?.data) ? marketCapData.data : [];

  useEffect(() => {
    if (coinList && coinId) {
      const found = coinList.find((coin) => coin.id === coinId);
      if (found) setSelectedCoin(found);
    }
  }, [coinList, coinId]);

  const days = useMemo(() => daysMap[timeframe] ?? 1, [timeframe]);

  const { data: chartData, isLoading: isLoadingChart } = useGetListOfCoinDatabyId(
    selectedCoin?.productId ?? 0,
    days as number
  );

  // hanlde the chart type change
  const handleChartTypeChange = (newType: 'line' | 'candlestick') => {
    setChartType(newType);
  };

  // handling if the selected coin is not found
  if (!selectedCoin || isLoadingCoins) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '463px', py: 4 }}>
      <Container className="mb-6" maxWidth="lg">
        <BackButton />
        <Typography variant="h5" sx={{ color: 'white', mb: 4 }}>
          Coin page
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <CoinSelector
            selectedCoin={selectedCoin}
            onSelectCoin={(coin) => setSelectedCoin(coin as MarketCapCoin)}
            coins={coinList as MarketCapCoin[]}
          />
          <Divider orientation="horizontal" flexItem sx={{ mx: 2, borderColor: '#333' }} />
        </Box>

        <Paper
          elevation={0}
          sx={{
            bgcolor: '#1E1E1E',
            borderRadius: '24px',
            p: 3,
            mb: 4,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Header with price, percentage, and toggle */}
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}
          >
            <Box>
              {/* Price and toggle on the left */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                {/* Current price */}
                <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold' }}>
                  ${selectedCoin?.currentPrice.toLocaleString()}
                </Typography>

                {/* Chart toggle */}
                <ChartStyleToggle chartType={chartType} onChange={handleChartTypeChange} />
              </Box>

              {/* Price change percentage under price and toggle */}
              <Box
                sx={{
                  display: 'inline-block',
                  mt: 1,
                  px: 2,
                  py: 0.5,
                  borderRadius: 4,
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  color: (selectedCoin?.priceChangePercentage24h ?? 0) >= 0 ? '#A3E635' : '#EF4444',
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                  {(selectedCoin?.priceChangePercentage24h ?? 0) >= 0 ? '+' : ''}
                  {(selectedCoin?.priceChangePercentage24h ?? 0).toFixed(2)}%
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Chart container */}
          <Box sx={{ position: 'relative' }}>
            {isLoadingChart ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 8, height: 400 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Box sx={{ position: 'relative' }}>
                {/* Chart */}
                <PriceChart
                  data={Array.isArray(chartData) ? chartData : []}
                  chartType={chartType}
                  timeframe={timeframe}
                  coinSymbol={selectedCoin?.symbol?.toUpperCase() ?? ''}
                  currency={coindUsd}
                />

                {/* Timeframe selector  */}
                <Box sx={{ mt: 2, pl: 1 }}>
                  <TimeframeSelector timeframe={timeframe} onChange={setTimeframe} />
                </Box>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default CoinDetailsPage;
