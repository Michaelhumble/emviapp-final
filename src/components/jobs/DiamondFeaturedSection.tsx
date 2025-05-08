
import React from "react";
import { Job } from "@/types/job";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Diamond } from "lucide-react";
import { motion } from "framer-motion";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import JobCardContact from "./JobCardContact";

interface DiamondFeaturedSectionProps {
  jobs: Job[];
  onViewDetails: (job: Job) => void;
}

const DiamondFeaturedSection = ({ jobs, onViewDetails }: DiamondFeaturedSectionProps) => {
  // Magic Nails card is the first job
  const mainJob = jobs[0];

  if (!mainJob) return null;

  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-6">
        <Diamond className="h-6 w-6 text-amber-500 mr-2" />
        <h2 className="text-2xl lg:text-3xl font-playfair font-semibold">💎 Diamond Featured</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Magic Nails card - always in first position */}
        <Card
          key={mainJob.id}
          className="overflow-hidden border-2 border-amber-200 shadow-md hover:shadow-lg transition-all duration-300 group"
        >
          <div className="h-2 bg-gradient-to-r from-amber-400 to-amber-600" />

          <div className="aspect-video relative">
            <ImageWithFallback
              src={mainJob.image || ""}
              alt={mainJob.title || "Featured job listing"}
              className="w-full h-full object-cover"
            />
            <Badge className="absolute top-2 left-2 bg-amber-500 text-white border-0">
              Diamond
            </Badge>
            <Badge className="absolute top-2 right-2 bg-gradient-to-r from-amber-400 to-amber-600 text-white border-0">
              ✨ Featured by EmviApp
            </Badge>
          </div>

          <CardContent className="p-6">
            <div className="mb-3">
              <h3 className="font-playfair font-semibold text-lg line-clamp-2">{mainJob.title}</h3>
              <p className="text-gray-600 font-medium">{mainJob.company}</p>
              {mainJob.featured_text && (
                <p className="text-amber-600 text-sm mt-1">{mainJob.featured_text}</p>
              )}
            </div>

            <div className="flex items-center text-base text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" /> {mainJob.location}
            </div>

            <div className="flex items-center text-base text-gray-600 mb-4">
              <Calendar className="h-4 w-4 mr-1" /> {new Date(mainJob.created_at).toLocaleDateString()}
            </div>

            <p className="text-base text-gray-700 mb-4 line-clamp-2">
              {mainJob.description}
            </p>

            <div className="border-t border-amber-100 pt-3 mb-4">
              {mainJob.contact_info?.phone && (
                <JobCardContact phoneNumber={mainJob.contact_info.phone} />
              )}
            </div>

            <Button
              className="w-full font-bold bg-gradient-to-r from-amber-500 to-amber-600"
              onClick={() => onViewDetails(mainJob)}
            >
              Xem Chi Tiết
            </Button>
          </CardContent>
        </Card>

        {/* Promotional "Coming Soon" card for second diamond slot */}
        <Card
          className="overflow-hidden border-2 border-amber-100 shadow-sm hover:shadow-md transition-all duration-300 group"
        >
          <div className="h-2 bg-gradient-to-r from-amber-300 to-amber-500" />

          <div className="aspect-video relative">
            <ImageWithFallback
              src="/lovable-uploads/0003b2e9-4b56-4284-9fd7-56772930e035.png"
              alt="Vietnamese Nail Salon Spotlight"
              className="w-full h-full object-cover"
            />
            <Badge className="absolute top-2 left-2 bg-amber-500 text-white border-0">
              Available Slot
            </Badge>
          </div>

          <CardContent className="p-6">
            <div className="mb-3">
              <h3 className="font-playfair font-semibold text-lg">Vietnamese Nail Salon Spotlight</h3>
              <p className="text-gray-600">Only one Diamond slot left. Make your salon unforgettable.</p>
            </div>

            <p className="text-lg font-bold text-amber-600 mb-2">$999.99/year — No tax.</p>
            <p className="text-base text-gray-700 mb-6">
              Reserve it now and let EmviApp advertise your job all year for free.
            </p>

            <Button
              className="w-full font-bold bg-gradient-to-r from-amber-400 to-amber-500"
            >
              Reserve This Spot
            </Button>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  );
};

export default DiamondFeaturedSection;
