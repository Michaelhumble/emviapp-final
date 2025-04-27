
import React from 'react';
import { SalonListing } from '@/types/salon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, DollarSign, Edit, Trash2 } from 'lucide-react';
import FeatureListingButton from '@/components/sell-salon/FeatureListingButton';

export interface SalonListingsManagementProps {
  salons: SalonListing[];
  onFeature: (salonId: string) => void;
  onEdit: (salon: SalonListing) => void;
  onDelete: (salonId: string) => void;
}

const SalonListingsManagement = ({
  salons,
  onFeature,
  onEdit,
  onDelete
}: SalonListingsManagementProps) => {
  if (!salons || salons.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
        <h3 className="font-medium text-gray-600 mb-2">No Salon Listings</h3>
        <p className="text-gray-500 mb-4">You haven't created any salon listings yet.</p>
        <Button>Create Your First Listing</Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Salon Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {salons.map(salon => (
          <Card key={salon.id} className="overflow-hidden">
            <div className="h-40 bg-gray-100 relative">
              {salon.image && (
                <img 
                  src={salon.image} 
                  alt={salon.name} 
                  className="w-full h-full object-cover"
                />
              )}
              {salon.is_featured && (
                <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded text-xs font-bold">
                  Featured
                </div>
              )}
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-1">{salon.name}</CardTitle>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{salon.location}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-green-700 font-medium mb-2">
                <DollarSign className="h-4 w-4 mr-1" />
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0
                }).format(salon.price)}
              </div>
              <p className="text-gray-600 text-sm line-clamp-2">{salon.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(salon)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => onDelete(salon.id)}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
              <FeatureListingButton 
                salonId={salon.id}
                currentlyFeatured={salon.is_featured}
                onFeature={onFeature}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SalonListingsManagement;
