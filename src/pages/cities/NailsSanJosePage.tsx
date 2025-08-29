import React from 'react';
import { Navigate } from 'react-router-dom';

const NailsSanJosePage: React.FC = () => {
  return <Navigate to="/artists/nails/san-jose-ca" replace />;
};

export default NailsSanJosePage;