
import React from 'react';
import { useAuth } from '@/context/auth';
import EmviLogo from '@/components/branding/EmviLogo';

export interface CustomerDashboardHeaderProps {
  profile?: any;
}

const CustomerDashboardHeader = ({ profile }: CustomerDashboardHeaderProps) => {
  const { userProfile } = useAuth();
  const userDisplayData = profile || userProfile;
  
  return (
    <div className="mb-6">
      <div className="flex items-center mb-3">
        <EmviLogo size="small" className="mr-3" />
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome, {userDisplayData?.full_name || 'Customer'}!
        </h1>
      </div>
      <p className="text-gray-600">
        Find your favorite nail artists, book appointments, and manage your schedule all in one place.
      </p>
    </div>
  );
};

export default CustomerDashboardHeader;
