
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpRedirect = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the premium sign-up page
    navigate('/auth/signup', { replace: true });
  }, [navigate]);
  
  // Show nothing while redirecting
  return null;
};

export default SignUpRedirect;
