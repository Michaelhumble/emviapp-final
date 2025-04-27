
import React from 'react';
import { SalonListing } from "@/types/salon";
import { Card, CardContent } from "@/components/ui/card";

// Stub component for SalonSalesGrid
interface SalonSalesGridProps {
  salons: SalonListing[];
  onViewSalon?: (salon: SalonListing) => void;
}

const SalonSalesGrid = ({ salons, onViewSalon }: SalonSalesGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {salons.length === 0 ? (
        <Card className="col-span-full">
          <CardContent className="p-6 text-center">
            <p>No salon listings found. Please adjust your filters.</p>
          </CardContent>
        </Card>
      ) : (
        salons.map(salon => (
          <Card 
            key={salon.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onViewSalon && onViewSalon(salon)}
          >
            <CardContent className="p-6">
              <h3 className="font-semibold">{salon.name}</h3>
              <p className="text-sm text-gray-500">{salon.location}</p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default SalonSalesGrid;
