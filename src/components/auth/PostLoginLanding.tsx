import React from 'react';
import { useRequireRole } from '@/hooks/useRequireRole';
import { AuthRedirect } from './AuthRedirect';

const PostLoginLanding: React.FC = () => {
  // Ensure users without a role are sent to the chooser (runs only on this landing route)
  useRequireRole();
  return <AuthRedirect />;
};

export default PostLoginLanding;
