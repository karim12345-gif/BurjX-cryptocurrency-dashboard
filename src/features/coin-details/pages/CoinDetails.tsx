import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Container, Divider, Paper, CircularProgress } from '@mui/material';
import ChartStyleToggle from '../components/ChartStyleToggle';
import { lazy, useEffect } from 'react';
import { useGetListOfCoinDatabyId } from '@/services/hooks/CoinData';
import { MarketCapCoin } from '@/interfaces';
import { BackButton } from '@/components/button';
import { daysMap } from '../utils';
import { useMarket } from '@/context/MarketContext';

const PriceChart = lazy(() => import('../components/PriceChart'));
const CoinSelector = lazy(() => import('../components/CoinSelector'));
const TimeframeSelector = lazy(() => import('../components/TimeframeSelector'));

const CoinDetials = () => {
  const coindUsd = 'usd';
  const oneHour = '1H';
  const candlestick = 'candlestick';
  const { coinId } = useParams<{ coinId: string }>();
  const [selectedCoin, setSelectedCoin] = useState<MarketCapCoin | null>(null);
  const [chartType, setChartType] = useState<'line' | 'candlestick'>(candlestick);
  const [timeframe, setTimeframe] = useState(oneHour);

  // Use the market context for coin data
  const { coins, isLoading: isLoadingCoins } = useMarket();

  // Find the selected coin from the context
  useEffect(() => {
    if (coins.length > 0 && coinId) {
      const found = coins.find((coin) => coin.id === coinId);
      if (found) setSelectedCoin(found);
    }
  }, [coins, coinId]);

  const days = useMemo(() => daysMap[timeframe] ?? 1, [timeframe]);

  const { data: chartData, isLoading: isLoadingChart } = useGetListOfCoinDatabyId(
    selectedCoin?.productId ?? 0,
    days as number
  );

  // Handle the chart type change
  const handleChartTypeChange = (newType: 'line' | 'candlestick') => {
    setChartType(newType);
  };

  // Handle if the selected coin is not found
  if (!selectedCoin || isLoadingCoins) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}
      >
        <CircularProgress sx={{ color: '#D4F935' }} />
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
            coins={coins}
          />
          <Divider orientation="horizontal" flexItem sx={{ mx: 2, borderColor: '#333' }} />
        </Box>

        {/* Rest of your component remains the same */}
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
          {/* Header with price and percentage */}
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}
          >
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold' }}>
                  ${selectedCoin?.currentPrice.toLocaleString()}
                </Typography>
                <ChartStyleToggle chartType={chartType} onChange={handleChartTypeChange} />
              </Box>
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
                <CircularProgress sx={{ color: '#D4F935' }} />
              </Box>
            ) : (
              <Box sx={{ position: 'relative' }}>
                <PriceChart
                  data={Array.isArray(chartData) ? chartData : []}
                  chartType={chartType}
                  timeframe={timeframe}
                  coinSymbol={selectedCoin?.symbol?.toUpperCase() ?? ''}
                  currency={coindUsd}
                />
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

export default CoinDetials;
