
import React from "react";
import { Job } from "@/types/job";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Building } from "lucide-react";
import { motion } from "framer-motion";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import JobCardContact from "./JobCardContact";

interface VietnameseJobSectionProps {
  vietnameseJobs: Job[];
  onViewDetails: (job: Job) => void;
  searchTerm: string;
}

const VietnameseJobSection = ({ 
  vietnameseJobs, 
  onViewDetails, 
  searchTerm 
}: VietnameseJobSectionProps) => {
  // Filter for salon for sale only
  const salonJobs = vietnameseJobs.filter(job => job.is_salon_for_sale === true);
  
  // If no salon jobs or empty after filtering, return null
  if (!salonJobs.length) return null;
  
  // Filter by search term if needed
  const filteredJobs = searchTerm 
    ? salonJobs.filter(job => 
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : salonJobs;
    
  // If filtered to nothing, return null
  if (!filteredJobs.length) return null;

  return (
    <motion.section
      className="mt-8 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl lg:text-3xl font-playfair font-semibold">
          🏢 Featured Nail Salons for Sale
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredJobs.slice(0, 4).map((salon) => (
          <Card
            key={salon.id}
            className="overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            <div className="aspect-video relative">
              <ImageWithFallback
                src={salon.image || ""}
                alt={salon.title || "Salon for sale"}
                className="w-full h-full object-cover"
                businessName={salon.company}
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
                    <span className="text-green-600 font-bold mr-1">$</span> 
                    Asking: {salon.sale_price}
                  </p>
                )}
                
                {salon.monthly_revenue && (
                  <p className="text-sm text-gray-700 flex items-center">
                    <span className="text-green-600 font-bold mr-1">$</span> 
                    Revenue: {salon.monthly_revenue}/month
                  </p>
                )}
                
                {(salon.chair_count || salon.station_count) && (
                  <p className="text-sm text-gray-700 flex items-center">
                    <Building className="h-3.5 w-3.5 mr-1 text-gray-500" /> 
                    {salon.chair_count || salon.station_count} stations
                  </p>
                )}
              </div>

              <div className="border-t border-gray-100 pt-3 mb-3">
                {salon.contact_info?.phone && (
                  <JobCardContact phoneNumber={salon.contact_info.phone} />
                )}
              </div>

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

export default VietnameseJobSection;
