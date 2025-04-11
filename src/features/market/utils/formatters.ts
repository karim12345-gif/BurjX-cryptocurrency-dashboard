/**
 * Formats large numbers into trillion/billion/million format
 */
export const formatLargeNumber = (value: number): string => {
  if (value >= 1000000000000) {
    return `${(value / 1000000000000).toFixed(2)} trillion`;
  } else if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(2)} billion`;
  } else if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)} million`;
  } else {
    return value.toLocaleString();
  }
};

export * from './formatters';
