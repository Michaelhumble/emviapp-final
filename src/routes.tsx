
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Artists from '@/pages/explore/artists';
import Community from '@/pages/Community';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Root route redirects to artists */}
      <Route path="/" element={<Navigate to="/artists" replace />} />
      
      {/* Main pages */}
      <Route path="/artists" element={<Artists />} />
      <Route path="/freelancers" element={<Artists />} />
      <Route path="/community" element={<Community />} />
      
      {/* Placeholder routes for other navigation items */}
      <Route path="/salons" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl">Salons Coming Soon</h1></div>} />
      <Route path="/jobs" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl">Jobs Coming Soon</h1></div>} />
      <Route path="/about" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl">About Coming Soon</h1></div>} />
      <Route path="/contact" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl">Contact Coming Soon</h1></div>} />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/artists" replace />} />
    </Routes>
  );
};

export default AppRoutes;
