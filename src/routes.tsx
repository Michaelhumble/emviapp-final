
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Artists from '@/pages/explore/artists';
import Community from '@/pages/Community';
import { Navigate } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Root route redirects to artists */}
      <Route path="/" element={<Navigate to="/artists" replace />} />
      
      {/* Main pages */}
      <Route path="/artists" element={<Artists />} />
      <Route path="/freelancers" element={<Artists />} />
      <Route path="/community" element={<Community />} />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/artists" replace />} />
    </Routes>
  );
};

export default AppRoutes;
