export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatLargeNumber = (value: number): string => {
  if (value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(2)}B`;
  } else if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(2)}K`;
  } else {
    return `$${value.toFixed(2)}`;
  }
};

export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};

export const daysMap: Record<string, number | 'max'> = {
  '1D': 1,
  '1W': 7,
  '1M': 30,
  '1Y': 365,
  ALL: 'max',
};

// Get appropriate time format based on timeframe
export const getTimeFormat = (timeframe: string): string => {
  switch (timeframe) {
    case '1H':
      return 'HH:mm'; // Hours and minutes for 1H timeframe
    case '1D':
      return 'HH:mm'; // Hours and minutes for 1D timeframe
    case '1W':
    case '1M':
      return 'MMM dd'; // Month and day for weekly and monthly
    case '1Y':
    case 'ALL':
      return 'MMM yyyy'; // Month and year for yearly and all time
    default:
      return 'MMM dd HH:mm';
  }
};
