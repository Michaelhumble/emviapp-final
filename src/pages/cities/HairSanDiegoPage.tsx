import React from 'react';
import { Navigate } from 'react-router-dom';

const HairSanDiegoPage: React.FC = () => {
  return <Navigate to="/artists/hair/san-diego-ca" replace />;
};

export default HairSanDiegoPage;