
import React from 'react';
import { AlertCircle, Users, Briefcase, Store } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CommunityPostingRestriction = () => {
  return (
    <div className="mb-6">
      <Alert className="border-purple-200 bg-purple-50">
        <Users className="h-4 w-4 text-purple-600" />
        <AlertDescription className="text-purple-800">
          <strong>Community Guidelines:</strong> This space is exclusively for sharing inspiring beauty stories, transformations, and connecting with fellow professionals. 
          
          <div className="flex flex-col sm:flex-row gap-2 mt-3">
            <Button asChild variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-50">
              <Link to="/post-job" className="flex items-center gap-1">
                <Briefcase className="h-3 w-3" />
                Post Jobs Here
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-50">
              <Link to="/sell-salon" className="flex items-center gap-1">
                <Store className="h-3 w-3" />
                List Salons Here
              </Link>
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default CommunityPostingRestriction;
