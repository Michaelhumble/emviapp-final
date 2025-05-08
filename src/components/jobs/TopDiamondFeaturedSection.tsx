
import React from "react";
import { Job } from "@/types/job";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Diamond } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { motion } from "framer-motion";
import JobCardContact from "./JobCardContact";

interface TopDiamondFeaturedSectionProps {
  featuredJobs: Job[];
  onViewDetails: (job: Job) => void;
}

const TopDiamondFeaturedSection = ({ featuredJobs, onViewDetails }: TopDiamondFeaturedSectionProps) => {
  if (!featuredJobs.length) return null;

  // Get the first real job (Magic Nails)
  const mainJob = featuredJobs[0];
  
  // Create placeholder cards for remaining diamond slots
  const placeholderCards = Array(5).fill(null);

  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-6">
        <Diamond className="h-6 w-6 text-amber-500 mr-2" />
        <h2 className="text-2xl lg:text-3xl font-playfair font-semibold">🟨 Top Diamond Featured</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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

            {mainJob.salary_range && (
              <div className="flex items-center text-base text-gray-600 mb-2">
                <span className="text-lg mr-1">💰</span> {mainJob.salary_range}
              </div>
            )}

            <div className="flex items-center text-base text-gray-600 mb-4">
              <Calendar className="h-4 w-4 mr-1" /> {new Date(mainJob.created_at).toLocaleDateString()}
            </div>

            <div className="border-t border-amber-100 pt-3 mb-4">
              {mainJob.contact_info?.phone && (
                <JobCardContact phoneNumber={mainJob.contact_info.phone} />
              )}
            </div>

            <Button
              className="w-full font-bold bg-gradient-to-r from-amber-500 to-amber-600"
              onClick={() => onViewDetails(mainJob)}
            >
              View Details
            </Button>
          </CardContent>
        </Card>

        {/* First placeholder card in first row */}
        <Card
          key="diamond-placeholder-1"
          className="overflow-hidden border-2 border-amber-100 shadow-sm hover:shadow-md transition-all duration-300 group"
        >
          <div className="h-2 bg-gradient-to-r from-amber-300 to-amber-500" />

          <div className="aspect-video bg-gradient-to-r from-amber-50 to-amber-100 flex items-center justify-center">
            <ImageWithFallback
              src="/lovable-uploads/f7ba1d82-2928-4e73-a61b-112e5aaf5b7e.png"
              alt="Diamond placement"
              className="w-full h-full object-cover opacity-50"
            />
            <Badge className="absolute top-2 left-2 bg-amber-500 text-white border-0">
              Diamond
            </Badge>
          </div>

          <CardContent className="p-6">
            <div className="mb-3">
              <h3 className="font-playfair font-semibold text-lg">Coming Soon...</h3>
              <p className="text-gray-500">This spot is reserved for top-tier beauty businesses.</p>
            </div>

            <div className="mt-auto pt-6">
              <Button
                className="w-full font-bold bg-gradient-to-r from-amber-400 to-amber-500 opacity-70"
                disabled
              >
                Reserve This Spot
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second row of Diamond cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Placeholder cards for second row */}
        {[2, 3].map((index) => (
          <Card
            key={`diamond-placeholder-${index}`}
            className="overflow-hidden border-2 border-amber-100 shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <div className="h-2 bg-gradient-to-r from-amber-300 to-amber-500" />

            <div className="aspect-video bg-gradient-to-r from-amber-50 to-amber-100 flex items-center justify-center">
              <ImageWithFallback
                src={`/lovable-uploads/${index === 2 ? '6e6289a0-0f43-4a7e-8517-ba5aadbbf872' : 'c9e52825-c7f4-4923-aecf-a92a8799530b'}.png`}
                alt="Diamond placement"
                className="w-full h-full object-cover opacity-50"
              />
              <Badge className="absolute top-2 left-2 bg-amber-500 text-white border-0">
                Diamond
              </Badge>
            </div>

            <CardContent className="p-6">
              <div className="mb-3">
                <h3 className="font-playfair font-semibold text-lg">Coming Soon...</h3>
                <p className="text-gray-500">This spot is reserved for top-tier beauty businesses.</p>
              </div>

              <div className="mt-auto pt-6">
                <Button
                  className="w-full font-bold bg-gradient-to-r from-amber-400 to-amber-500 opacity-70"
                  disabled
                >
                  Reserve This Spot
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Third row of Diamond cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Placeholder cards for third row */}
        {[4, 5].map((index) => (
          <Card
            key={`diamond-placeholder-${index}`}
            className="overflow-hidden border-2 border-amber-100 shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <div className="h-2 bg-gradient-to-r from-amber-300 to-amber-500" />

            <div className="aspect-video bg-gradient-to-r from-amber-50 to-amber-100 flex items-center justify-center">
              <ImageWithFallback
                src={`/lovable-uploads/${index === 4 ? '9a7898e7-739c-4a79-8705-70090e25c10b' : 'f2fa8004-6611-4006-9c47-23797d750523'}.png`}
                alt="Diamond placement"
                className="w-full h-full object-cover opacity-50"
              />
              <Badge className="absolute top-2 left-2 bg-amber-500 text-white border-0">
                Diamond
              </Badge>
            </div>

            <CardContent className="p-6">
              <div className="mb-3">
                <h3 className="font-playfair font-semibold text-lg">Coming Soon...</h3>
                <p className="text-gray-500">This spot is reserved for top-tier beauty businesses.</p>
              </div>

              <div className="mt-auto pt-6">
                <Button
                  className="w-full font-bold bg-gradient-to-r from-amber-400 to-amber-500 opacity-70"
                  disabled
                >
                  Reserve This Spot
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.section>
  );
};

export default TopDiamondFeaturedSection;
