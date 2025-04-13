import { Box, BoxProps, styled, Typography } from '@mui/material';

const Img = styled('img')(({ theme }) => ({
  marginTop: theme.spacing(10),
  marginBottom: theme.spacing(10),
  maxWidth: '100%',
  height: 300,

  [theme.breakpoints.down('lg')]: {
    height: 250,
  },
  [theme.breakpoints.down('md')]: {
    height: 200,
  },
  [theme.breakpoints.down('sm')]: {
    height: 180,
  },
}));

//** Styled component Typography
const StyledTypography = styled(Typography)`
  color: #fff;
`;

// ** Styled Components
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw',
  },
}));

const formatLargeNumber = (value: number): string => {
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

export { Img, StyledTypography, BoxWrapper, formatLargeNumber };
