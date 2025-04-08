
import React from 'react';
import { useAuth } from '@/context/auth';

export interface CustomerDashboardHeaderProps {
  profile?: any;
}

const CustomerDashboardHeader = ({ profile }: CustomerDashboardHeaderProps) => {
  const { userProfile } = useAuth();
  const userDisplayData = profile || userProfile;
  
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Welcome, {userDisplayData?.full_name || 'Customer'}!
      </h1>
      <p className="text-gray-600">
        Find your favorite nail artists, book appointments, and manage your schedule all in one place.
      </p>
    </div>
  );
};

export default CustomerDashboardHeader;
