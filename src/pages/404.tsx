// ** React Imports
import { ReactNode } from 'react';

//** react dom */
import { Link } from 'react-router-dom';

// ** MUI Components
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import BlankLayout from '../components/layouts/BlankLayout';
import { BoxWrapper, Img, StyledTypography } from '@/utils';

//** Error404 Component
const Error404 = () => {
  return (
    <Box className="content-center">
      <Box
        sx={{
          p: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <BoxWrapper>
          <StyledTypography variant="h1" sx={{ mb: 2.5 }}>
            404
          </StyledTypography>
          <StyledTypography
            variant="h5"
            sx={{
              mb: 2.5,
              letterSpacing: '0.18px',
              fontSize: '1.5rem !important',
            }}
          >
            {' '}
            Page Not Found ⚠️
          </StyledTypography>
          <StyledTypography variant="body2">
            We couldn&prime;t find the page you are looking for.
          </StyledTypography>
        </BoxWrapper>
        <Img height="300" alt="error-illustration" src="/images/pages/404.png" />
        <Button component={Link} to="/" variant="contained" sx={{ px: 5.5 }}>
          Back to Home
        </Button>
      </Box>
    </Box>
  );
};

Error404.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

export default Error404;
