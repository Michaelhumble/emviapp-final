
import React from "react";
import { Job } from "@/types/job";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building, DollarSign, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import JobCardContact from "./JobCardContact";

interface SalonSalesSectionProps {
  listings: Job[];
  onViewDetails: (job: Job) => void;
}

const SalonSalesSection = ({ listings, onViewDetails }: SalonSalesSectionProps) => {
  if (!listings.length) return null;

  return (
    <motion.section
      className="mt-12 mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl lg:text-3xl font-playfair font-semibold">
          🏢 Featured Nail Salons for Sale
        </h2>
        <Link to="/salons" className="flex items-center text-purple-600 hover:text-purple-700 font-medium">
          View All <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {listings.map((salon) => (
          <Card
            key={salon.id}
            className="overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            <div className="aspect-video relative">
              <ImageWithFallback
                src={salon.image || ""}
                alt={salon.title || "Salon for sale"}
                className="w-full h-full object-cover"
                businessName={salon.company || "Salon"}
              />
              <Badge className="absolute top-2 right-2 bg-orange-500 text-white border-0">
                For Sale
              </Badge>
            </div>

            <CardContent className="p-4">
              <div className="mb-2">
                <h3 className="font-playfair font-semibold text-lg line-clamp-2">{salon.title}</h3>
                <p className="text-gray-600 flex items-center mb-1">
                  <MapPin className="h-3.5 w-3.5 mr-1" /> {salon.location}
                </p>
              </div>

              <div className="flex flex-col space-y-1 mb-3">
                {salon.sale_price && (
                  <p className="text-sm text-gray-700 flex items-center">
                    <DollarSign className="h-3.5 w-3.5 mr-1 text-green-600" /> 
                    Asking: {salon.sale_price}
                  </p>
                )}
                
                {(salon.monthly_revenue || salon.revenue) && (
                  <p className="text-sm text-gray-700 flex items-center">
                    <DollarSign className="h-3.5 w-3.5 mr-1 text-green-600" /> 
                    Revenue: {salon.monthly_revenue || salon.revenue}
                  </p>
                )}
                
                {(salon.chair_count || salon.station_count) && (
                  <p className="text-sm text-gray-700 flex items-center">
                    <Building className="h-3.5 w-3.5 mr-1 text-gray-500" /> 
                    {salon.chair_count || salon.station_count} stations
                  </p>
                )}
              </div>

              {salon.contact_info?.phone && (
                <div className="border-t border-gray-100 pt-3 mb-3">
                  <JobCardContact phoneNumber={salon.contact_info.phone} />
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  className="font-bold bg-purple-500 hover:bg-purple-600 text-white"
                  onClick={() => onViewDetails(salon)}
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
