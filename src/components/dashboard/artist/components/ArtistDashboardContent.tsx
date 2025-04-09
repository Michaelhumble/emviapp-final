
import React from 'react';

export interface ArtistDashboardContentProps {
  artistData: any;
}

const ArtistDashboardContent = ({ artistData }: ArtistDashboardContentProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <h2 className="text-2xl font-semibold mb-4">Welcome, {artistData?.full_name || 'Artist'}</h2>
          <p className="text-gray-600">
            This is your dashboard where you can manage your profile, services, and bookings.
          </p>
        </div>
        
        <div className="col-span-2">
          <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-medium mb-2">Your Profile</h3>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                {artistData?.avatar_url ? (
                  <img 
                    src={artistData.avatar_url} 
                    alt={artistData.full_name} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-purple-600 text-xl font-semibold">
                    {artistData?.full_name?.[0] || 'A'}
                  </span>
                )}
              </div>
              <div>
                <h4 className="font-medium">{artistData?.full_name}</h4>
                <p className="text-sm text-gray-500">{artistData?.specialty || 'Nail Artist'}</p>
                <p className="text-sm text-gray-500">{artistData?.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDashboardContent;
