// 1. Convert to a custom hook
import toast from 'react-hot-toast';
import { ResponseModel } from '../../models';
import { useNavigate, useSearchParams } from 'react-router-dom';
import routes from '@/routes';

export const isResponseModel = (obj: any): obj is ResponseModel<any> => {
  if (typeof obj === 'object' && obj !== null) {
    return 'result' in obj && 'body' in obj && 'message' in obj;
  } else {
    return false;
  }
};

export const useResponseModelHelper = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleError = (error: any) => {
    if (!error.response) {
      // Redirect to error page
      navigate(routes.error, {
        state: {
          message: error.message,
          returnUrl: searchParams.get('returnUrl'),
        },
      });
      toast.error(error.message, { id: 'loading' });
      return;
    }

    if (isResponseModel(error.response.data)) {
      const { result, message } = error.response.data;

      if (result === 400) {
        navigate(routes['404']);
        return;
      } else {
        toast.error(message, { id: 'loading' });
        return;
      }
    } else {
      const status = error.response.status;
      if (status === 400) {
        navigate(routes['404']);
        toast.error(error.message, { id: 'loading' });
        return;
      } else if (status === 500) {
        navigate(routes['500']);
        toast.error('Something is wrong', { id: 'loading' });
        return;
      } else if (status === 404) {
        navigate(routes['404']);
        toast.error('Something is wrong', { id: 'loading' });
        return;
      }

      // Redirect to error page for other status codes
      navigate(routes.error, {
        state: {
          message: error.message,
          returnUrl: searchParams.get('returnUrl'),
        },
      });
      toast.error(error.message, { id: 'loading' });
      return;
    }
  };

  return handleError;
};
