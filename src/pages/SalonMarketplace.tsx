
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const SalonMarketplace: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Salon Marketplace</h1>
          <p className="text-gray-600 mb-8">
            The Salon Marketplace is being updated. Please use our new Salon Directory instead.
          </p>
          <Button onClick={() => navigate('/salons')}>
            Go to Salon Directory
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SalonMarketplace;
