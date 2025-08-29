import React from 'react';
import { Navigate } from 'react-router-dom';

const HairChicagoPage: React.FC = () => {
  return <Navigate to="/artists/hair/chicago-il" replace />;
};

export default HairChicagoPage;