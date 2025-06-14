
import React from 'react';
import { useAuth } from '@/context/auth';
import { Card, CardContent } from '@/components/ui/card';
import { Camera } from 'lucide-react';

const ArtistPortfolioGallery = () => {
  const { userRole } = useAuth();

  // Check if user is artist
  const isArtist = userRole === 'nail-artist' || 
                  userRole === 'hair-stylist' || 
                  userRole === 'lash-tech' || 
                  userRole === 'barber' || 
                  userRole === 'esthetician' || 
                  userRole === 'massage-therapist' || 
                  userRole === 'freelancer';

  if (!isArtist) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Portfolio Gallery</h2>
      
      <Card>
        <CardContent className="p-8 text-center">
          <Camera className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2">Portfolio Coming Soon</h3>
          <p className="text-gray-600">
            Portfolio management will be available soon. Upload and showcase your best work to attract more clients.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArtistPortfolioGallery;
