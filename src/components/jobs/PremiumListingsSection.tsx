
import React, { useState } from "react";
import { Job } from "@/types/job";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Crown, Star } from "lucide-react";
import { motion } from "framer-motion";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import JobCardContact from "./JobCardContact";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth";

interface PremiumListingsSectionProps {
  jobs: Job[];
  onViewDetails: (job: Job) => void;
}

const PremiumListingsSection = ({ jobs, onViewDetails }: PremiumListingsSectionProps) => {
  const { isSignedIn } = useAuth();
  const [randomImage] = useState(`/lovable-uploads/f575cfa2-98b5-4a1e-910c-acbc69a3736d.png`);
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Use only the first job (Magic Nails)
  const magicNailsJob = jobs.length > 0 ? jobs[0] : null;
  
  if (!magicNailsJob) return null;

  return (
    <motion.section
      className="mt-12 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex justify-between items-center mb-6 border-b border-amber-300 pb-2 relative">
        <div className="flex items-center gap-2">
          <Crown className="h-6 w-6 text-amber-500" />
          <h2 className="text-2xl lg:text-3xl font-playfair font-bold text-gray-800">
            Top Diamond Featured
          </h2>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Magic Nails (locked) */}
        <Card
          key={magicNailsJob.id}
          className="overflow-hidden border-2 border-amber-400 shadow-lg hover:shadow-xl transition-all duration-300 group bg-gradient-to-b from-amber-50 to-white"
        >
          <div className="aspect-video relative">
            <ImageWithFallback
              src={magicNailsJob.image || ""}
              alt={magicNailsJob.title || "Job listing"}
              className="w-full h-full object-cover"
              businessName={magicNailsJob.company}
            />
            <Badge className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white border-0 flex items-center gap-1 px-3 py-1 rounded-full">
              <Star className="h-3 w-3 mr-1 fill-white" /> Diamond Tier
            </Badge>
          </div>

          <CardContent className="p-6">
            <div className="mb-3">
              <h3 className="font-playfair font-bold text-xl line-clamp-2">{magicNailsJob.title}</h3>
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

            <div className="flex items-center text-base text-gray-600 mb-4">
              <Calendar className="h-4 w-4 mr-1" /> {new Date(magicNailsJob.created_at).toLocaleDateString()}
            </div>

            <div className="border-t border-amber-200 pt-3 mb-4">
              {magicNailsJob.contact_info?.phone && isSignedIn ? (
                <JobCardContact phoneNumber={magicNailsJob.contact_info.phone} />
              ) : (
                <div className="text-sm text-gray-500 flex items-center">
                  <span className="text-amber-600 font-medium">Sign in to view contact details</span>
                </div>
              )}
            </div>

            <div className="flex justify-center">
              <Button
                className="w-full font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-sm py-5 rounded-xl"
                onClick={() => onViewDetails(magicNailsJob)}
              >
                Xem Chi Tiết
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Diamond Upgrade Teaser */}
        <Card className="overflow-hidden border-2 border-amber-400 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-b from-amber-50 to-white">
          <div className="aspect-video relative">
            <ImageWithFallback
              src={randomImage}
              alt="Premium nail salon"
              className="w-full h-full object-cover"
              businessName="Diamond Tier"
            />
            <Badge className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white border-0 flex items-center gap-1 px-3 py-1 rounded-full">
              <Star className="h-3 w-3 mr-1 fill-white" /> Diamond Tier – Available Now
            </Badge>
          </div>

          <CardContent className="p-6">
            <div className="mb-3">
              <h3 className="font-playfair font-bold text-xl line-clamp-2">This Spot Could Be Yours</h3>
              <p className="text-gray-600 font-medium">Trusted by top-tier beauty businesses</p>
            </div>

            <div className="flex items-center text-base text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" /> Nationwide
            </div>

            <div className="flex items-center text-base text-gray-600 mb-2">
              <span className="text-lg mr-1">💰</span> $1,000–$2,000/week
            </div>

            <div className="flex items-center text-base text-gray-600 mb-4">
              <Calendar className="h-4 w-4 mr-1" /> {today}
            </div>

            <div className="border-t border-amber-200 pt-3 mb-4">
              <p className="text-gray-700 leading-relaxed">
                Get discovered by the best artists and salon owners.
                Appear first. Build trust. Close faster.
                Includes full photo, phone visibility, and 1-year exposure.
              </p>
            </div>

            <div className="flex justify-center">
              <Link to="/jobs/create" className="w-full">
                <Button
                  className="w-full font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-sm py-5 rounded-xl"
                >
                  Get Featured Now
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  );
};

export default PremiumListingsSection;
