import React from 'react';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { ShowChart } from '@mui/icons-material';
import { ChartStyleToggleProps } from '../interface';
import { ColoredCandlestickIcon } from '@/components/icons';

const ChartStyleToggle: React.FC<ChartStyleToggleProps> = ({ chartType, onChange }) => {
  // Handle the change of the chart type
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newChartType: 'line' | 'candlestick' | null
  ) => {
    if (newChartType !== null) {
      onChange(newChartType);
    }
  };

  return (
    <Box>
      <ToggleButtonGroup
        value={chartType}
        exclusive
        onChange={handleChange}
        aria-label="chart style"
        size="small"
        sx={{
          bgcolor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: 8,
          overflow: 'hidden',
          '& .MuiToggleButton-root': {
            border: 'none',
            color: '#aaa',
            borderRadius: 8,
            '&.Mui-selected': {
              color: '#D4F935',
              bgcolor: 'rgba(255, 255, 255, 0.05)',
            },
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.1)',
            },
          },
        }}
      >
        <ToggleButton value="candlestick" aria-label="candlestick chart">
          <ColoredCandlestickIcon />
        </ToggleButton>
        <ToggleButton value="line" aria-label="line chart">
          <ShowChart />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default ChartStyleToggle;
