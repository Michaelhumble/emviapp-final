
import React from "react";
import { SalonSale } from "@/types/salonSale";
import { SalonSaleCard } from "./SalonSaleCard";
import { Loader2, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SalonSalesGridProps {
  salonSales: SalonSale[];
  isLoading: boolean;
  onViewDetails: (salon: SalonSale) => void;
  showFeatureButton?: boolean;
  onFeatureSuccess?: () => void;
}

export const SalonSalesGrid = ({ 
  salonSales, 
  isLoading, 
  onViewDetails,
  showFeatureButton = false,
  onFeatureSuccess
}: SalonSalesGridProps) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (salonSales.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <Store className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-medium mb-2">No Salon Listings Found</h2>
        <p className="text-gray-600 mb-6">
          There are currently no salon listings that match your search criteria.
        </p>
        <Button onClick={() => navigate("/sell-salon/new")}>
          List Your Salon
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {salonSales.map((salon) => (
        <SalonSaleCard 
          key={salon.id} 
          salon={salon} 
          onViewDetails={onViewDetails}
          showFeatureButton={showFeatureButton}
          onFeatureSuccess={onFeatureSuccess}
        />
      ))}
    </div>
  );
};
