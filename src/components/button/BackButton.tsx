import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <>
      <IconButton size="medium" onClick={() => navigate(-1)}>
        <ArrowBackIcon className="text-white p-1" />
      </IconButton>
    </>
  );
};

export default BackButton;
