
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const SalonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Link to="/salons">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Salon Directory
            </Button>
          </Link>
          
          <div className="p-8 text-center bg-gray-50 rounded-lg border border-gray-100">
            <h1 className="text-2xl font-bold mb-4">Salon Detail Page</h1>
            <p className="text-gray-600 mb-4">
              Detailed information for salon ID: {id} would appear here.
            </p>
            <p className="text-sm text-gray-500">
              This is a placeholder for the salon detail page.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SalonDetail;
