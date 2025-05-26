
import React from "react";
import { Job } from "@/types/job";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Diamond, Crown, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface TopDiamondFeaturedSectionProps {
  featuredJobs: Job[];
  onViewDetails: (job: Job) => void;
  maxSpots?: number;
}

const TopDiamondFeaturedSection = ({ 
  featuredJobs, 
  onViewDetails, 
  maxSpots = 3 // Updated to 3 max spots (public spots only)
}: TopDiamondFeaturedSectionProps) => {
  const diamondJobs = featuredJobs.filter(job => 
    job.pricingTier === 'diamond' || job.pricing_tier === 'diamond'
  ).slice(0, maxSpots);

  const availableSpots = maxSpots - diamondJobs.length;
  const isFullyBooked = availableSpots === 0;

  if (diamondJobs.length === 0 && availableSpots === 0) return null;

  return (
    <motion.section 
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Diamond className="h-6 w-6 text-cyan-500 mr-2" />
          <h2 className="text-2xl lg:text-3xl font-playfair font-semibold">
            Diamond Exclusive
          </h2>
          <Badge className="ml-3 bg-cyan-100 text-cyan-800 border-cyan-200">
            Limited to {maxSpots} spots
          </Badge>
        </div>
        
        {!isFullyBooked && availableSpots > 0 && (
          <div className="text-sm text-gray-500">
            {availableSpots} spot{availableSpots !== 1 ? 's' : ''} available
          </div>
        )}

        {isFullyBooked && (
          <div className="flex items-center text-sm text-orange-600 font-medium">
            <Lock className="h-4 w-4 mr-1" />
            All spots filled
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Diamond Job Listings */}
        {diamondJobs.map((job) => (
          <Card key={job.id} className="overflow-hidden border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50">
            <div className="h-2 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-playfair font-bold text-xl text-gray-900">{job.title}</h3>
                  <p className="text-gray-700 mt-1 font-medium">
                    {job.company}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-none">
                    <Diamond className="h-3 w-3 mr-1" />
                    Diamond
                  </Badge>
                </div>
              </div>

              <div className="flex items-center text-base text-gray-700 mb-2">
                <MapPin className="h-4 w-4 mr-2" /> {job.location}
              </div>

              {job.salary_range && (
                <div className="flex items-center text-base text-gray-700 mb-3">
                  <DollarSign className="h-4 w-4 mr-2" /> {job.salary_range}
                </div>
              )}

              <p className="text-base text-gray-700 mb-4 line-clamp-2">
                {job.description}
              </p>

              <Button 
                className="w-full font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                onClick={() => onViewDetails(job)}
              >
                View Exclusive Details
              </Button>
            </CardContent>
          </Card>
        ))}

        {/* Available Spots Placeholder or Waitlist */}
        {!isFullyBooked && availableSpots > 0 && (
          <Card className="overflow-hidden border-2 border-dashed border-cyan-300 bg-gradient-to-br from-cyan-50/50 to-blue-50/50">
            <CardContent className="p-6 text-center">
              <Diamond className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="font-playfair font-semibold text-lg text-gray-700 mb-2">
                Diamond Spot Available
              </h3>
              <p className="text-gray-600 mb-4">
                Premium placement for exceptional opportunities
              </p>
              <Button 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                onClick={() => window.location.href = '/post-job'}
              >
                Apply for Diamond
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Waitlist Card when all spots are filled */}
        {isFullyBooked && (
          <Card className="overflow-hidden border-2 border-dashed border-orange-300 bg-gradient-to-br from-orange-50/50 to-red-50/50">
            <CardContent className="p-6 text-center">
              <Lock className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-playfair font-semibold text-lg text-gray-700 mb-2">
                All Diamond Spots Filled
              </h3>
              <p className="text-gray-600 mb-4">
                Join the waitlist for future openings
              </p>
              <Button 
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                onClick={() => window.location.href = '/waitlist'}
              >
                Join Waitlist
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {diamondJobs.length === maxSpots && (
        <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-orange-800 text-center">
            <Crown className="h-4 w-4 inline mr-1" />
            All Diamond spots are filled. Join the waitlist to be notified when a spot opens.
          </p>
        </div>
      )}
    </motion.section>
  );
};

export default TopDiamondFeaturedSection;
