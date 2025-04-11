import { Box, Typography } from '@mui/material';
import { CoinSelectorProps } from '../interface';

const CoinTriggerButton = ({
  selectedCoin,
  onClick,
}: {
  selectedCoin: CoinSelectorProps['selectedCoin'];
  onClick: () => void;
}) => {
  if (!selectedCoin) return null;

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        width: { xs: '100%', sm: 257 },
        height: { xs: 'auto', sm: 64 },
        bgcolor: '#1E1E1E',
        padding: '12px',
        borderRadius: '24px',
        border: '1px solid #333',
        cursor: 'pointer',
        '&:hover': { bgcolor: '#262626' },
      }}
    >
      <Box
        component="img"
        src={selectedCoin.image}
        alt={selectedCoin.name}
        sx={{ width: 32, height: 32, borderRadius: '50%' }}
      />
      <Typography
        sx={{
          color: 'white',
          fontFamily: 'Lufga, sans-serif',
          fontWeight: 400,
          fontSize: '24px',
          lineHeight: '36px',
          letterSpacing: '0%',
          flexGrow: 1,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {selectedCoin.name} ({selectedCoin.symbol.toUpperCase()})
      </Typography>

      <Box
        component="span"
        sx={{
          marginRight: '8px',
          width: 8,
          height: 8,
          borderRight: '2px solid #A3E635',
          borderBottom: '2px solid #A3E635',
          transform: 'rotate(45deg)',
          flexShrink: 0,
        }}
      />
    </Box>
  );
};

export default CoinTriggerButton;
