
import React, { useState } from "react";
import { Job } from "@/types/job";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Diamond, Lock } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { motion } from "framer-motion";
import JobCardContact from "./JobCardContact";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface TopDiamondFeaturedSectionProps {
  featuredJobs: Job[];
  onViewDetails: (job: Job) => void;
}

const TopDiamondFeaturedSection = ({ featuredJobs, onViewDetails }: TopDiamondFeaturedSectionProps) => {
  const { user } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  
  // Get the first real job (Magic Nails)
  const mainJob = featuredJobs[0];

  // Define fallback images for verification
  const mainJobImagePath = "/lovable-uploads/583cdb14-9991-4d8f-8d00-711aa760fdeb.png";
  const secondaryImagePath = "/lovable-uploads/d98977ed-9565-4629-b2e7-fc4cf3f93a7f.png";
  
  // Supabase fallback if the lovable uploads are not available
  const supabaseFallback = "https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails/_A%20long%2C%20luxurious%20nail%20salon-10.png";
  
  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-6">
        <Diamond className="h-6 w-6 text-amber-500 mr-2" />
        <h2 className="text-2xl lg:text-3xl font-playfair font-semibold text-amber-800">Exclusive Diamond Featured</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card #1 - Magic Nails - PAID */}
        <Card
          key={mainJob.id}
          className="overflow-hidden border-2 border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg"
          style={{
            background: "linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(253,248,232,1) 100%)",
            boxShadow: "0 10px 25px -5px rgba(251, 191, 36, 0.4)"
          }}
        >
          <div className="h-2 bg-gradient-to-r from-amber-400 to-amber-600" />

          <div className="aspect-video relative">
            <ImageWithFallback
              src={mainJobImagePath}
              alt="Magic Nails"
              className="w-full h-full object-cover"
              fallbackImage={supabaseFallback}
            />
            <Badge className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white border-0 font-medium">
              ✨ Top Diamond Exclusive
            </Badge>
          </div>

          <CardContent className="p-6">
            <div className="mb-3">
              <h3 className="font-playfair font-semibold text-xl text-amber-900">Tìm Thợ Nails – Magic Nails, Great Falls, MT</h3>
              <p className="text-amber-800 font-medium text-lg">$1,200–$1,500/tuần</p>
            </div>

            <div className="flex items-center text-base text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" /> {mainJob.location}
            </div>

            <div className="flex items-center text-base text-gray-600 mb-4">
              <Calendar className="h-4 w-4 mr-1" /> {new Date(mainJob.created_at).toLocaleDateString()}
            </div>

            <p className="text-gray-700 mb-4">Magic Nails cần thợ biết làm bột và tay chân nước.</p>

            <div className="border-t border-amber-100 pt-3 mb-4">
              {user ? (
                mainJob.contact_info?.phone && (
                  <JobCardContact phoneNumber={mainJob.contact_info.phone} />
                )
              ) : (
                <div className="flex items-center text-amber-700 font-medium">
                  <Lock size={16} className="mr-2" /> Contact details hidden (sign in to view)
                </div>
              )}
            </div>

            <Button
              className="w-full font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700"
              onClick={() => onViewDetails(mainJob)}
            >
              Xem Chi Tiết
            </Button>
          </CardContent>
        </Card>

        {/* Card #2 - EmviApp Internal Ad - FREE */}
        <Card
          className="overflow-hidden border-2 border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg flex flex-col"
          style={{
            background: "linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(253,248,232,1) 100%)",
            boxShadow: "0 10px 25px -5px rgba(251, 191, 36, 0.4)"
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="h-2 bg-gradient-to-r from-amber-400 to-amber-600" />

          <div className="aspect-video relative">
            <ImageWithFallback
              src={secondaryImagePath}
              alt="Premium Listing Opportunity"
              className="w-full h-full object-cover transition-transform duration-700"
              style={{
                transform: isHovered ? 'scale(1.05)' : 'scale(1)'
              }}
              fallbackImage={supabaseFallback}
            />
            <Badge className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white border-0 font-medium">
              ✨ Be Seen by Thousands
            </Badge>
          </div>

          <CardContent className="p-6 flex flex-col flex-grow">
            <div className="flex-grow">
              <h3 className="font-playfair font-bold text-xl text-amber-900 mb-3">Claim the Most Powerful Spot on EmviApp</h3>
              
              <p className="text-amber-700 font-semibold text-lg mb-2 text-center">✨ $999.99/year ✨</p>
              
              <p className="text-base text-gray-700 mb-6 font-medium">
                Reach Unlimited Employees and Customers Every Day.<br />
                First Come, First Served – Unmatched Visibility.
              </p>
            </div>

            <Link to="/post-job" className="block w-full mt-auto">
              <Button
                className="w-full font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 py-6"
                size="lg"
              >
                Claim Your Premium Spot
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  );
};

export default TopDiamondFeaturedSection;
