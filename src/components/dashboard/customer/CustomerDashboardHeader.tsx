
import React from 'react';
import { useAuth } from '@/context/auth';
import EmviLogo from '@/components/branding/EmviLogo';
import { NotificationCenter } from "@/components/notifications/NotificationCenter";

export interface CustomerDashboardHeaderProps {
  profile?: any;
}

const CustomerDashboardHeader = ({ profile }: CustomerDashboardHeaderProps) => {
  const { userProfile } = useAuth();
  const userDisplayData = profile || userProfile;
  
  return (
    <div className="mb-6 relative">
      <div className="flex items-center mb-3">
        <img 
          src="https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/emvilogo/emvi-logo-transparent.png"
          alt="EmviApp logo"
          width={80}
          height="auto"
          className="mr-3"
        />
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome, {userDisplayData?.full_name || 'Customer'}!
        </h1>
        <div className="ml-auto">
          <NotificationCenter className="relative" />
        </div>
      </div>
      <p className="text-gray-600">
        Find your favorite nail artists, book appointments, and manage your schedule all in one place.
      </p>
    </div>
  );
};

export default CustomerDashboardHeader;
