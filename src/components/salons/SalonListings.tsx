
import { useState } from "react";
import { SalonListing, Job } from "@/types/salon";
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

  // Check if a salon is expired (for demo purposes, using random)
  const isExpired = (salon: Job) => {
    // In a real application, this would check the creation date against current date
    if (salon.id === "104") return true; // Make one of the salons expired for demonstration
    return false;
  };

  // Filter salons based on selected criteria
  const filteredSalons = salonsForSale.filter(salon => {
    const matchesLocation = locationFilter === "" || 
      salon.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    // Handle price as either string or number
    const priceValue = typeof salon.asking_price === 'string' ? 
      parseFloat(salon.asking_price.replace(/[^0-9.-]+/g, "") || "0") : 
      (salon.asking_price || 0);
    
    const matchesPrice = priceValue >= priceRange[0] && priceValue <= priceRange[1];
    
    // Handle both square_feet and squareFeet properties
    let sizeValue = 0;
    if (salon.square_feet) {
      sizeValue = typeof salon.square_feet === 'string' ?
        parseFloat(salon.square_feet.replace(/[^0-9.-]+/g, "") || "0") :
        salon.square_feet;
    } else if (salon.squareFeet) {
      sizeValue = typeof salon.squareFeet === 'number' ?
        salon.squareFeet : 0;
    }
    
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

  const handleResetFilters = () => {
    setLocationFilter("");
    setPriceRange([0, 500000]);
    setSizeRange([0, 5000]);
    setStatusFilter("all");
  };

  return (
    <div className="space-y-6">
      {/* Smart filters section */}
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

      {/* Pricing info card */}
      <PricingInfoCard />
      
      {/* Salon listings grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredSalons.length > 0 ? (
          filteredSalons.map((salon, index) => (
            <SalonCard 
              key={salon.id}
              salon={salon}
              index={index}
              isExpired={isExpired(salon)}
              onViewDetails={handleViewDetails}
            />
          ))
        ) : (
          <EmptyState resetFilters={handleResetFilters} />
        )}
      </div>
      
      {/* Salon detail modal */}
      <SalonDetailModal
        salon={selectedSalon}
        isOpen={!!selectedSalon}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default SalonListings;
