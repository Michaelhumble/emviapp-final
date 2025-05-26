
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SellSalon = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the post-salon page
    navigate('/post-salon', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
        <p className="text-gray-600">Taking you to the salon listing form</p>
      </div>
    </div>
  );
};

export default SellSalon;
