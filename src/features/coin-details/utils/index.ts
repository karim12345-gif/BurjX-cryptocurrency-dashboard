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

export const timeframes = ['1H', '1D', '1W', '1M', '1Y', 'ALL'];
