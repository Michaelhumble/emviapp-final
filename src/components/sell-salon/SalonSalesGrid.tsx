
import React from "react";
import { SalonSale } from "@/types/salonSale";
import { SalonSaleCard } from "./SalonSaleCard";
import { Loader2, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

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
        <p className="text-gray-600 mb-6 px-4">
          There are currently no salon listings that match your search criteria.
        </p>
        <Button onClick={() => navigate("/sell-salon/new")} className="min-h-[44px]">
          List Your Salon
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {salonSales.map((salon, index) => (
        <motion.div
          key={salon.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.3, 
            delay: isMobile ? index * 0.1 : Math.min(index, 5) * 0.05 
          }}
        >
          <SalonSaleCard 
            salon={salon} 
            onViewDetails={onViewDetails}
            showFeatureButton={showFeatureButton}
            onFeatureSuccess={onFeatureSuccess}
          />
        </motion.div>
      ))}
    </div>
  );
};
