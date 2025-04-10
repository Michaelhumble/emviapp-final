
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/auth';
import GoogleReviewBoostPanel from './GoogleReviewBoostPanel';

const SalonMarketingTools = () => {
  const { userRole } = useAuth();
  
  // Only show for salon owner roles
  if (userRole !== 'salon' && userRole !== 'owner') {
    return null;
  }
  
  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-slate-50 to-white border-slate-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Marketing Tools</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <GoogleReviewBoostPanel />
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonMarketingTools;
