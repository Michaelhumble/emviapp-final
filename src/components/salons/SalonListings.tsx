import { useState } from "react";
import { Job } from "@/types/job";
import SalonDetailModal from "./SalonDetailModal";
import FilterSection from "./FilterSection";
import PricingInfoCard from "./PricingInfoCard";
import SalonCard from "./SalonCard";
import EmptyState from "./EmptyState";

interface SalonListingsProps {
  salonsForSale: Job[];
}

export const SalonListings = ({ salonsForSale }: SalonListingsProps) => {
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [sizeRange, setSizeRange] = useState<[number, number]>([0, 5000]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedSalon, setSelectedSalon] = useState<Job | null>(null);

  const isExpired = (salon: Job) => {
    if (salon.id === "104") return true;
    return false;
  };

  const filteredSalons = salonsForSale.filter(salon => {
    const matchesLocation = locationFilter === "" || 
      salon.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    const priceValue = parseFloat(salon.asking_price?.replace(/[^0-9.-]+/g, "") || "0");
    const matchesPrice = priceValue >= priceRange[0] && priceValue <= priceRange[1];
    
    const sizeValue = parseFloat(salon.square_feet?.replace(/[^0-9.-]+/g, "") || "0");
    const matchesSize = sizeValue >= sizeRange[0] && sizeValue <= sizeRange[1];
    
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "active" && !isExpired(salon)) ||
      (statusFilter === "expired" && isExpired(salon));
    
    return matchesLocation && matchesPrice && matchesSize && matchesStatus;
  });
  
  const handleViewDetails = (salon: Job) => {
    setSelectedSalon(salon);
  };
  
  const handleCloseModal = () => {
    setSelectedSalon(null);
  };

  return (
    <div className="space-y-6">
      <FilterSection 
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        sizeRange={sizeRange}
        setSizeRange={setSizeRange}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <PricingInfoCard />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredSalons.length > 0 ? (
          filteredSalons.map((salon, index) => (
            <div key={salon.id} className="h-full">
              <SalonCard 
                salon={salon}
                index={index}
                isExpired={isExpired(salon)}
                onViewDetails={handleViewDetails}
              />
            </div>
          ))
        ) : (
          <EmptyState />
        )}
      </div>
      
      <SalonDetailModal
        salon={selectedSalon}
        isOpen={!!selectedSalon}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default SalonListings;
