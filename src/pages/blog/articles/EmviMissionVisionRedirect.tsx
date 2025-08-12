import React from 'react';
import { Navigate } from 'react-router-dom';

const EmviMissionVisionRedirect: React.FC = () => {
  return <Navigate to="/emviapp-mission-vision" replace />;
};

export default EmviMissionVisionRedirect;
