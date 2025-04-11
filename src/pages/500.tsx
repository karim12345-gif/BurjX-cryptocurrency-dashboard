// ** React Imports
import { ReactNode } from 'react';

//** react dom */
import { Link } from 'react-router-dom';

// ** MUI Components
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import BlankLayout from '../components/layouts/BlankLayout';
import { BoxWrapper, Img, StyledTypography } from '@/utils';

//** Error500 Component
const Error500 = () => {
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
            500
          </StyledTypography>

          <StyledTypography variant="h5" sx={{ mb: 2.5, fontSize: '1.5rem !important' }}>
            Internal server error 👨🏻‍💻
          </StyledTypography>

          <StyledTypography variant="body2">Oops, something went wrong!</StyledTypography>
        </BoxWrapper>
        <Img height="400" alt="error-illustration" src="/images/pages/404.png" />
        <Button component={Link} to="/" variant="contained" sx={{ px: 5.5 }}>
          Back to Home
        </Button>
      </Box>
    </Box>
  );
};

Error500.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

export default Error500;
