
import React from 'react';

const CatchAllRoute = () => {
  const currentPath = window.location.pathname;
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-500 text-white p-8">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 border-8 border-white p-8 bg-black">
          🚨 THIS IS THE CATCH-ALL ROUTE TEST 🚨
        </h1>
        <p className="text-2xl mb-4">
          Current path: <strong>{currentPath}</strong>
        </p>
        <p className="text-xl">
          If you see this message at /sign-up, then catch-all routes work and we can override platform pages!
        </p>
      </div>
    </div>
  );
};

export default CatchAllRoute;
