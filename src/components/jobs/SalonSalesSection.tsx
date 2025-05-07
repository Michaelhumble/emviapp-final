
import React from "react";
import { Job } from "@/types/job";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Building } from "lucide-react";
import { motion } from "framer-motion";
import JobCardContact from "./JobCardContact";

interface SalonSalesSectionProps {
  listings: Job[];
  onViewDetails: (job: Job) => void;
}

const SalonSalesSection = ({ listings, onViewDetails }: SalonSalesSectionProps) => {
  if (!listings.length) return null;

  return (
    <motion.section
      className="mt-12 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl lg:text-3xl font-playfair font-semibold">
          🏬 Tiệm Nail Đang Sang <span className="text-base font-normal italic text-gray-500">(Nail Salons For Sale)</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <Card
            key={listing.id}
            className="overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300"
          >
            {listing.image && (
              <div className="aspect-video relative">
                <img
                  src={listing.image}
                  alt={listing.title || "Nail salon for sale"}
                  className="w-full h-full object-cover"
                />
                {(listing.pricingTier === "premium" || listing.pricingTier === "diamond") && (
                  <div className="absolute top-2 right-2">
                    <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded font-medium">
                      Premium Listing
                    </span>
                  </div>
                )}
              </div>
            )}

            <CardContent className="p-4">
              <div className="mb-3">
                <h3 className="font-playfair font-semibold text-lg mb-1">{listing.title}</h3>
              </div>

              {(listing.revenue || listing.monthly_revenue || listing.sale_price || listing.asking_price) && (
                <div className="flex items-center text-base text-gray-700 mb-2 font-medium">
                  <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                  <span>
                    {listing.sale_price || listing.asking_price
                      ? `Giá bán: ${listing.sale_price || listing.asking_price}`
                      : `Thu nhập: ${listing.revenue || listing.monthly_revenue}`}
                  </span>
                </div>
              )}

              <div className="flex items-center text-base text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" /> {listing.location}
              </div>

              {(listing.chair_count || listing.station_count) && (
                <div className="flex items-center text-base text-gray-600 mb-2">
                  <Building className="h-4 w-4 mr-1" />
                  <span>
                    {listing.chair_count && `${listing.chair_count} ghế`}
                    {listing.chair_count && listing.station_count && ", "}
                    {listing.station_count && `${listing.station_count} bàn`}
                  </span>
                </div>
              )}

              {listing.description && (
                <p className="text-base text-gray-700 mb-4 line-clamp-2">
                  {listing.description}
                </p>
              )}

              <div className="flex justify-between items-center mt-4">
                <div>
                  {listing.contact_info?.phone && (
                    <JobCardContact phoneNumber={listing.contact_info.phone} />
                  )}
                </div>

                <Button
                  onClick={() => onViewDetails(listing)}
                  className="bg-gradient-to-r from-[#9A7B69] to-[#FFB199] hover:opacity-90 text-white"
                >
                  Xem Chi Tiết
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.section>
  );
};

export default SalonSalesSection;
