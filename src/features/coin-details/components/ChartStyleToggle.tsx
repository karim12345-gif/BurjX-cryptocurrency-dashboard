import React, { memo } from 'react';
import { Box, ToggleButton, ToggleButtonGroup, SxProps, Theme } from '@mui/material';
import { ShowChart } from '@mui/icons-material';
import { ChartStyleToggleProps } from '../interface';
import { ColoredCandlestickIcon } from '@/components/icons';

const toggleButtonGroupStyles: SxProps<Theme> = {
  bgcolor: 'rgba(0, 0, 0, 0.3)',
  borderRadius: 8,
  overflow: 'hidden',
  '& .MuiToggleButton-root': {
    border: 'none',
    color: '#aaa',
    borderRadius: 8,
    transition: 'all 0.2s ease',
    '&.Mui-selected': {
      color: '#D4F935',
      bgcolor: 'rgba(255, 255, 255, 0.05)',
    },
    '&:hover': {
      bgcolor: 'rgba(255, 255, 255, 0.1)',
    },
  },
};

const ChartStyleToggle: React.FC<ChartStyleToggleProps> = ({ chartType, onChange }) => {
  // Memoizing the change handler to prevent unnecessary rerenders
  const handleChange = React.useCallback(
    (_event: React.MouseEvent<HTMLElement>, newChartType: 'line' | 'candlestick' | null) => {
      if (newChartType !== null) {
        onChange(newChartType);
      }
    },
    [onChange]
  );

  return (
    <Box component="div" aria-label="Chart Style Selector">
      <ToggleButtonGroup
        value={chartType}
        exclusive
        onChange={handleChange}
        aria-label="chart style"
        size="small"
        sx={toggleButtonGroupStyles}
      >
        <ToggleButton value="candlestick" aria-label="candlestick chart" title="Candlestick Chart">
          <ColoredCandlestickIcon />
        </ToggleButton>
        <ToggleButton value="line" aria-label="line chart" title="Line Chart">
          <ShowChart />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default memo(ChartStyleToggle);
