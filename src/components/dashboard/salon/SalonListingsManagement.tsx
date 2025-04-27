
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SalonListing } from "@/types/salon";
import FeatureListingButton from "@/components/sell-salon/FeatureListingButton";

interface SalonListingsManagementProps {
  salons: SalonListing[];
  isLoading?: boolean;
  onFeature?: (salonId: string) => void;
  onEdit?: (salon: SalonListing) => void;
  onDelete?: (salonId: string) => void;
}

const SalonListingsManagement = ({
  salons,
  isLoading = false,
  onFeature,
  onEdit,
  onDelete
}: SalonListingsManagementProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Salon Listings</CardTitle>
      </CardHeader>
      <CardContent>
        {salons.length === 0 ? (
          <p className="text-center py-4 text-muted-foreground">
            You don't have any salon listings yet.
          </p>
        ) : (
          <div className="space-y-4">
            {salons.map(salon => (
              <div key={salon.id} className="flex justify-between items-center p-4 border rounded-md">
                <div>
                  <h3 className="font-medium">{salon.name}</h3>
                  <p className="text-sm text-muted-foreground">{salon.location}</p>
                </div>
                <div className="flex gap-2">
                  <FeatureListingButton 
                    salonId={salon.id} 
                    currentlyFeatured={salon.is_featured} 
                    onFeature={onFeature}
                  />
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onEdit && onEdit(salon)}
                  >
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => onDelete && onDelete(salon.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SalonListingsManagement;
