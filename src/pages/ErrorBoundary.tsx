import { useRouteError } from 'react-router-dom';
import Error404 from './404';
import Error500 from './500';

const GlobalErrorBoundary = () => {
  const error: any = useRouteError();
  const status = error?.response?.status;

  if (status === 404) return <Error404 />;
  if (status === 500) return <Error500 />;
  return (
    <div className="text-center text-white p-10">
      <h1 className="text-4xl mb-4">Something went wrong 🧨</h1>
      <p>{error?.message || 'Unexpected error'}</p>
    </div>
  );
};

export default GlobalErrorBoundary;
