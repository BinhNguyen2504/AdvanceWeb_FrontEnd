import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  }, [navigate]);

  return <h1>Page Not Found</h1>;
};

export default ErrorPage;
