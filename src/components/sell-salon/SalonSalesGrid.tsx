
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface SalonSalesGridProps {
  salonSales: any[];
  isLoading: boolean;
  onViewDetails: (salon: any) => void;
}

export const SalonSalesGrid = ({ 
  salonSales, 
  isLoading, 
  onViewDetails 
}: SalonSalesGridProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (salonSales.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p>No salon listings found. Please adjust your filters.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {salonSales.map(salon => (
        <Card 
          key={salon.id} 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onViewDetails(salon)}
        >
          <CardContent className="p-6">
            <h3 className="font-semibold">{salon.salon_name}</h3>
            <p className="text-sm text-gray-500">{salon.city}, {salon.state}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SalonSalesGrid;
