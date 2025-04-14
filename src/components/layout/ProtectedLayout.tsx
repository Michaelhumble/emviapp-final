
import React from 'react';
import { useAuth } from '@/context/auth';
import { Navigate } from 'react-router-dom';
import Layout from './Layout';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/signin" replace />;
  }

  return (
    <Layout>
      {children}
    </Layout>
  );
};
