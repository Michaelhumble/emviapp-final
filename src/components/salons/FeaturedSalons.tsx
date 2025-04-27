
import { SalonListing } from "@/types/salon";
import SalonCard from "./SalonCard";

interface FeaturedSalonsProps {
  featuredSalons: SalonListing[];
}

const FeaturedSalons = ({ featuredSalons }: FeaturedSalonsProps) => {
  if (!featuredSalons.length) return null;
  
  return (
    <div className="mb-12">
      <h2 className="font-playfair text-2xl font-semibold mb-6">Featured Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredSalons.map((salon, index) => (
          <SalonCard 
            key={salon.id} 
            salon={salon} 
            featured={true} 
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedSalons;
