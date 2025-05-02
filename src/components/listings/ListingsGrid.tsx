
import { useState } from "react";
import { Job } from "@/types/job";
import { Salon } from "@/types/salon";
import ListingDetailModal from "@/components/home/ListingDetailModal";
import VietnameseListingCard from "@/components/listings/VietnameseListingCard";

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

  const getListingType = (listing: Job | Salon): "job" | "salon" => {
    if ('type' in listing && listing.type) {
      return listing.type as "job" | "salon";
    }
    // Default to job if type is not specified
    return 'title' in listing ? "job" : "salon";
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing, index) => (
          <VietnameseListingCard
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
          listingType={getListingType(selectedListing)}
        />
      )}
    </>
  );
};

export default ListingsGrid;
