
import React from 'react';
import Layout from './Layout';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <Layout>
      {children}
    </Layout>
  );
};
