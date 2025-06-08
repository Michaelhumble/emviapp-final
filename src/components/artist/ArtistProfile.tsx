
import React from 'react';
import { Navigate } from 'react-router-dom';

// This component redirects to the main profile page
// The actual artist profile is now at src/components/profile/ArtistProfile.tsx
const ArtistProfile = () => {
  return <Navigate to="/profile" replace />;
};

export default ArtistProfile;
