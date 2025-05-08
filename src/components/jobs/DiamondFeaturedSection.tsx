
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Job } from "@/types/job";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, DollarSign, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useAuth } from "@/context/auth";
import ImageWithFallback from "../ui/ImageWithFallback";
import { diamondJobs } from "@/data/jobs/diamondJobs";
import JobCardContact from "./JobCardContact";

// Selected nail images from the nails bucket
const FEATURED_NAIL_IMAGES = [
  "/lovable-uploads/72f0f6c8-5793-4750-993d-f250b495146d.png",
  "/lovable-uploads/955feb1d-3a31-4a0e-b6b2-44f8240519c1.png",
  "/lovable-uploads/f7ba1d82-2928-4e73-a61b-112e5aaf5b7e.png",
  "/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png"
];

const DiamondFeaturedSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const today = new Date();

  // Magic Nails listing (always first position)
  const magicNailsListing = diamondJobs[0];

  // Image rotation for the opportunity card
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % FEATURED_NAIL_IMAGES.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleViewDetails = (job: Job) => {
    navigate(`/jobs/${job.id}`);
  };

  const handleGetFeatured = () => {
    navigate("/post-job?tier=diamond");
  };

  return (
    <section className="mb-12">
      <div className="flex items-center mb-4">
        <Crown className="h-7 w-7 text-yellow-500 mr-2" />
        <h2 className="text-3xl font-playfair font-semibold">
          💎 Diamond Featured
        </h2>
      </div>
      <div className="h-1 w-32 bg-gradient-to-r from-yellow-300 to-yellow-500 mb-6 rounded-full" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Magic Nails Fixed Position */}
        <Card className="overflow-hidden border border-yellow-300 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-yellow-50 to-white">
          <div className="aspect-video relative">
            <ImageWithFallback
              src={magicNailsListing.image || ""}
              alt={magicNailsListing.title || "Magic Nails"}
              className="w-full h-full object-cover"
            />
            <Badge className="absolute top-2 right-2 bg-yellow-500 text-white border-0 font-medium px-3 py-1 flex items-center">
              <Crown className="h-3.5 w-3.5 mr-1.5" /> Diamond
            </Badge>
          </div>

          <CardContent className="p-5">
            <div className="mb-3">
              <h3 className="font-playfair font-semibold text-xl mb-1 line-clamp-2">
                {magicNailsListing.title}
              </h3>
              <p className="text-gray-700 flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-gray-500" /> {magicNailsListing.location}
              </p>
            </div>

            <div className="flex items-center text-gray-700 mb-3">
              <Calendar className="h-4 w-4 mr-1 text-gray-500" />
              <span className="text-sm">
                {format(new Date(magicNailsListing.created_at), "MMM dd, yyyy")}
              </span>
            </div>

            <div className="border-t border-gray-100 pt-3 mb-3">
              {user && magicNailsListing.contact_info?.phone && (
                <JobCardContact phoneNumber={magicNailsListing.contact_info.phone} />
              )}
              {!user && (
                <div className="text-gray-500 text-sm italic mb-3">
                  Log in to view contact details
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold w-full"
                onClick={() => handleViewDetails(magicNailsListing)}
              >
                Xem Chi Tiết
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Diamond Opportunity (Available Now) */}
        <Card className="overflow-hidden border border-yellow-300 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-yellow-50 to-white">
          <div className="aspect-video relative">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <img
                src={FEATURED_NAIL_IMAGES[currentImageIndex]}
                alt="Diamond tier opportunity"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <Badge className="absolute top-2 right-2 bg-yellow-500 text-white border-0 font-medium px-3 py-1 flex items-center">
              <Crown className="h-3.5 w-3.5 mr-1.5" /> Diamond Tier
            </Badge>
          </div>

          <CardContent className="p-5">
            <div className="mb-3">
              <h3 className="font-playfair font-semibold text-xl mb-1">
                💎 Diamond Tier – Available Now
              </h3>
              <p className="text-gray-700 mb-1 font-medium">Your Nail Salon Here</p>
              <p className="text-gray-600 flex items-center">
                <MapPin className="h-4 w-4 mr-1" /> Choose Your City
              </p>
            </div>

            <div className="flex items-center text-gray-700 mb-3">
              <DollarSign className="h-4 w-4 mr-1 text-green-600" /> 
              <span className="font-medium">Starts at $999.99/year</span>
            </div>

            <div className="flex items-center text-gray-700 mb-3">
              <Calendar className="h-4 w-4 mr-1" /> 
              <span className="text-sm">{format(today, "MMM dd, yyyy")}</span>
            </div>

            <p className="text-gray-600 text-sm mb-4">
              Want your salon to be the #1 spotlight on EmviApp? This premium spot guarantees nonstop traffic, credibility, and customers.
              Get featured above every other listing with stunning visuals and a permanent badge of trust.
              <span className="font-medium text-yellow-700"> Only 1 slot left — lock it in before it's gone.</span>
            </p>

            <Button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold w-full"
              onClick={handleGetFeatured}
            >
              Get Featured Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DiamondFeaturedSection;
