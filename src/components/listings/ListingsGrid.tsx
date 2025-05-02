
import { useState } from "react";
import ListingCard from "@/components/listings/ListingCard";
import { Job } from "@/types/job";
import { Salon } from "@/types/salon";
import ListingDetailModal from "@/components/home/ListingDetailModal";

interface ListingsGridProps {
  listings: Array<Job | Salon>;
  emptyMessage?: string;
}

const ListingsGrid = ({ listings, emptyMessage = "No listings found" }: ListingsGridProps) => {
  const [selectedListing, setSelectedListing] = useState<Job | Salon | null>(null);
  
  const viewListingDetails = (listing: Job | Salon) => {
    setSelectedListing(listing);
  };
  
  const closeDetails = () => {
    setSelectedListing(null);
  };

  if (listings.length === 0) {
    return (
      <div className="p-8 text-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing, index) => (
          <ListingCard 
            key={'id' in listing ? listing.id : index}
            listing={listing}
            onViewDetails={() => viewListingDetails(listing)}
          />
        ))}
      </div>
      
      {selectedListing && (
        <ListingDetailModal
          isOpen={!!selectedListing}
          onClose={closeDetails}
          listing={selectedListing}
          listingType={'salon_type' in selectedListing ? 'salon' : 'job'}
        />
      )}
    </>
  );
};

export default ListingsGrid;
