import { Box, Button } from '@mui/material';
import { TimeframeSelectorProps } from '../interface';

const TimeframeSelector = ({ timeframe, onChange }: TimeframeSelectorProps) => {
  const timeframes = ['1H', '1D', '1W', '1M', '1Y', 'ALL'];

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {timeframes.map((timeFrame) => (
        <Button
          key={timeFrame}
          variant="text"
          size="small"
          onClick={() => onChange(timeFrame)}
          sx={{
            color: timeframe === timeFrame ? 'black' : '#888',
            bgcolor: timeframe === timeFrame ? '#D4F935' : 'transparent',
            minWidth: '40px',
            borderRadius: 1,
            '&:hover': {
              bgcolor: timeframe === timeFrame ? '#D4F935' : 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          {timeFrame}
        </Button>
      ))}
    </Box>
  );
};

export default TimeframeSelector;
