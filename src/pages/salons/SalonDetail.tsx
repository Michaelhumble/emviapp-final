
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const SalonDetail = () => {
  const { id } = useParams();

  // For now, show a placeholder since we're focusing on jobs flow
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Link to="/salons">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Salons
          </Button>
        </Link>
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Salon Details</h1>
        <p className="text-lg text-gray-600 mb-8">
          Salon ID: {id}
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-blue-800 mb-4">
            Detailed salon listings are coming soon! 
          </p>
          <Link to="/jobs">
            <Button>Browse Available Jobs</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SalonDetail;
