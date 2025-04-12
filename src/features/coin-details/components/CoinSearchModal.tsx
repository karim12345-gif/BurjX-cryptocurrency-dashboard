import React, { useMemo, useCallback, memo } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  InputBase,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { MarketCapCoin } from '@/interfaces';
import { CoinSearchModalProps } from '../interface';

const CoinSearchModal: React.FC<CoinSearchModalProps> = ({
  open,
  onClose,
  coins,
  onSelect,
  searchTerm,
  setSearchTerm,
}) => {
  // Memoize filtered coins to prevent unnecessary recalculations
  const filteredCoins = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    return normalizedSearch
      ? coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(normalizedSearch) ||
            coin.symbol.toLowerCase().includes(normalizedSearch)
        )
      : coins;
  }, [coins, searchTerm]);

  const handleCoinSelect = useCallback(
    (coin: MarketCapCoin) => {
      onSelect(coin);
      onClose();
      setSearchTerm('');
    },
    [onSelect, onClose, setSearchTerm]
  );

  // coin list
  const coinList = useMemo(
    () =>
      filteredCoins.map((coin) => (
        <Box
          key={coin.id}
          onClick={() => handleCoinSelect(coin)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            bgcolor: '#3A3A3A',
            borderRadius: '16px',
            px: 2,
            py: 1.5,
            mb: 1.5,
            cursor: 'pointer',
            '&:hover': { bgcolor: '#444' },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component="img"
              src={coin.image}
              alt={coin.name}
              sx={{ width: 40, height: 40, borderRadius: '50%', mr: 2 }}
              loading="lazy"
            />
            <Box>
              <Typography sx={{ color: 'white', fontWeight: 600 }}>
                {coin.symbol.toUpperCase()}
              </Typography>
              <Typography variant="caption" sx={{ color: '#aaa' }}>
                {coin.name}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ textAlign: 'right' }}>
            <Typography sx={{ color: 'white', fontWeight: 500 }}>
              $
              {coin.currentPrice.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 6,
              })}
            </Typography>
            <Typography
              sx={{
                color: coin.priceChangePercentage24h >= 0 ? '#A3E635' : '#EF4444',
                fontSize: '12px',
              }}
            >
              {coin.priceChangePercentage24h >= 0 ? '+' : ''}
              {coin.priceChangePercentage24h.toFixed(2)}%
            </Typography>
          </Box>
        </Box>
      )),
    [filteredCoins, handleCoinSelect]
  );

  const dialogContent = useMemo(
    () => (
      <>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#444',
            borderRadius: '999px',
            px: 2,
            py: 1,
            mb: 2,
          }}
        >
          <SearchIcon sx={{ color: '#888', mr: 1 }} />
          <InputBase
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ color: 'white', width: '100%' }}
            autoFocus
          />
        </Box>

        <Typography variant="caption" sx={{ color: '#888', mb: 1, display: 'block' }}>
          All Coins
        </Typography>

        <Box>{coinList}</Box>
      </>
    ),
    [searchTerm, setSearchTerm, coinList]
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          bgcolor: '#2C2C2C',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.1)',
          width: '391px',
          maxHeight: '758px',
          p: 4,
          pt: 3,
        },
      }}
    >
      <DialogTitle
        sx={{
          color: 'white',
          fontSize: '24px',
          fontWeight: 600,
          p: 0,
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        Search crypto
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>{dialogContent}</DialogContent>
    </Dialog>
  );
};

export default memo(CoinSearchModal);
