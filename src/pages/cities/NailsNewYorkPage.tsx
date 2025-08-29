import React from 'react';
import { Navigate } from 'react-router-dom';

const NailsNewYorkPage: React.FC = () => {
  return <Navigate to="/artists/nails/new-york-ny" replace />;
};

export default NailsNewYorkPage;