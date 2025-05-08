
import React from "react";
import { Job } from "@/types/job";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Crown, Star } from "lucide-react";
import { motion } from "framer-motion";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import JobCardContact from "./JobCardContact";
import { Link } from "react-router-dom";

interface DiamondListingsSectionProps {
  jobs: Job[];
  onViewDetails: (job: Job) => void;
}

const DiamondListingsSection = ({ jobs, onViewDetails }: DiamondListingsSectionProps) => {
  if (!jobs.length) return null;

  // Get today's date formatted as Month Day, Year
  const today = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Always use the first job as Magic Nails
  const magicNailsJob = jobs[0];

  return (
    <motion.section
      className="mt-8 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-2 rounded-lg bg-gradient-to-r from-amber-50 to-amber-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl lg:text-3xl font-playfair font-semibold flex items-center">
            <Crown className="h-6 w-6 mr-2 text-amber-500" />
            Top Diamond Featured
          </h2>
          <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white border-0 px-3 py-1">
            <Star className="h-3 w-3 mr-1 inline-block" /> Premium Exposure
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Magic Nails Card - Always first */}
          <Card
            key={magicNailsJob.id}
            className="overflow-hidden border-2 border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-50 to-white rounded-2xl transform hover:-translate-y-1"
          >
            <div className="aspect-video relative">
              <div className="absolute -top-0 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold px-4 py-1 rounded-b-lg shadow-md flex items-center">
                  <Star className="h-3 w-3 mr-1" /> Top Diamond Featured
                </div>
              </div>
              <ImageWithFallback
                src={magicNailsJob.image || "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png"}
                alt={magicNailsJob.title || "Magic Nails job listing"}
                className="w-full h-full object-cover"
                businessName={magicNailsJob.company}
              />
            </div>

            <CardContent className="p-6">
              <div className="mb-3">
                <h3 className="font-playfair font-bold text-lg">{magicNailsJob.title}</h3>
                <p className="text-gray-700 font-medium">{magicNailsJob.company}</p>
              </div>

              <div className="flex items-center text-base text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" /> {magicNailsJob.location}
              </div>

              {magicNailsJob.salary_range && (
                <div className="flex items-center text-base text-gray-600 mb-2">
                  <span className="text-lg mr-1">💰</span> {magicNailsJob.salary_range}
                </div>
              )}

              <div className="border-t border-yellow-100 pt-3 mb-4">
                {magicNailsJob.contact_info?.phone && (
                  <JobCardContact phoneNumber={magicNailsJob.contact_info.phone} />
                )}
              </div>

              <div className="flex justify-center">
                <Button
                  className="font-bold bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-white rounded-full px-6"
                  onClick={() => onViewDetails(magicNailsJob)}
                >
                  Xem Chi Tiết
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Available Spot Teaser Card */}
          <Card
            className="overflow-hidden border-2 border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-50 to-white rounded-2xl transform hover:-translate-y-1"
          >
            <div className="aspect-video relative">
              <div className="absolute -top-0 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold px-4 py-1 rounded-b-lg shadow-md flex items-center">
                  <Star className="h-3 w-3 mr-1" /> Top Diamond Featured
                </div>
              </div>
              <ImageWithFallback
                src="/lovable-uploads/7fa90fdd-d4e6-4d07-9d3b-b00811006d23.png"
                alt="Premium nail salon image"
                className="w-full h-full object-cover"
                businessName="Your Salon Name Here"
              />
            </div>

            <CardContent className="p-6">
              <div className="mb-3">
                <h3 className="font-playfair font-bold text-lg">✨ This Spot Could Be Yours — Top Diamond Status</h3>
                <p className="text-gray-700 font-medium">Your Salon Name Here</p>
              </div>

              <div className="flex items-center text-base text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" /> Anywhere in the U.S.
              </div>

              <div className="flex items-center text-base text-gray-600 mb-2">
                <span className="text-lg mr-1">💰</span> $1000–$2000+/week
              </div>

              <div className="flex items-center text-base text-gray-600 mb-3">
                <Calendar className="h-4 w-4 mr-1" /> {today}
              </div>

              <div className="text-sm text-gray-700 mb-3 space-y-2">
                <p>You're looking at the most powerful job ad spot in the beauty industry.</p>
                <p>This Diamond Tier is handpicked by EmviApp — and seen by thousands.</p>
                <p className="font-medium">
                  ⭐ $999.99/year<br />
                  📈 Only 3 total slots — 1 already taken.<br />
                  🎯 Perfect for growing brands, chains, or owners serious about results.
                </p>
              </div>

              <div className="flex justify-center mt-3">
                <Button
                  className="font-bold bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-white rounded-full px-6"
                  asChild
                >
                  <Link to="/post-job?tier=diamond">Get Featured Now</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.section>
  );
};

export default DiamondListingsSection;
