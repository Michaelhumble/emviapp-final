
import { useState } from "react";
import { Job } from "@/types/job";
import { Salon } from "@/types/salon"; 
import SalonDetailsDialog from "./SalonDetailModal";
import FilterSection from "./FilterSection";
import PricingInfoCard from "./PricingInfoCard";
import SalonCard from "./SalonCard";
import EmptyState from "./EmptyState";

interface SalonListingsProps {
  salonsForSale: Job[];
}

// Create a conversion function to adapt Job type to Salon type
const convertJobToSalon = (job: Job): Salon => {
  return {
    id: job.id,
    name: job.company || 'Unnamed Salon',
    location: job.location || '',
    price: typeof job.price === 'string' ? parseFloat(job.price.replace(/[^0-9.-]+/g, "")) : 0,
    imageUrl: job.image || '',
    description: job.description || '',
    image: job.image,
    featured: job.is_featured
  };
};

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

  const resetFilters = () => {
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
          filteredSalons.map((salon) => (
            <SalonCard 
              key={salon.id}
              salon={convertJobToSalon(salon)} // Convert Job to Salon
              isExpired={isExpired(salon)}
              onViewDetails={() => handleViewDetails(salon)}
            />
          ))
        ) : (
          <EmptyState resetFilters={resetFilters} />
        )}
      </div>
      
      {/* Salon detail modal */}
      <SalonDetailsDialog
        salon={selectedSalon}
        isOpen={!!selectedSalon}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default SalonListings;
