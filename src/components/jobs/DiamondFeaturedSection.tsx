
import React from "react";
import { Job } from "@/types/job";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, DollarSign, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import JobCardContact from "./JobCardContact";

interface DiamondFeaturedSectionProps {
  jobs: Job[];
  onViewDetails: (job: Job) => void;
}

const DiamondFeaturedSection = ({ jobs, onViewDetails }: DiamondFeaturedSectionProps) => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  // Don't render if no diamond jobs
  if (jobs.length === 0) return null;

  const handleReserveSpot = () => {
    if (!isSignedIn) {
      navigate('/signin', { state: { from: '/post-job?tier=diamond' } });
    } else {
      navigate('/post-job?tier=diamond');
    }
  };

  return (
    <motion.section
      className="mt-8 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl lg:text-3xl font-playfair font-semibold flex items-center">
          <span className="mr-2">💎</span> Diamond Featured
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Actual job listings */}
        {jobs.map((job) => (
          <Card
            key={job.id}
            className="overflow-hidden border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="aspect-video relative">
              <ImageWithFallback
                src={job.image || ""}
                alt={job.title || "Diamond featured job listing"}
                className="w-full h-full object-cover"
                businessName={job.company}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(0,0,0,0.3)]"></div>
              <Badge className="absolute top-2 left-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white border-0 shadow-md">
                Diamond
              </Badge>
              {job.featured_text && (
                <div className="absolute top-2 right-2">
                  <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white border-0 shadow-md flex items-center gap-1">
                    <Star className="h-3 w-3" fill="white" />
                    {job.featured_text}
                  </Badge>
                </div>
              )}
            </div>

            <CardContent className="p-6 relative bg-gradient-to-br from-white to-purple-50">
              <div className="mb-3">
                <h3 className="font-playfair font-semibold text-xl">{job.title}</h3>
                <p className="text-purple-700 font-medium">{job.company}</p>
              </div>

              <div className="flex items-center text-base text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" /> {job.location}
              </div>

              {job.salary_range && (
                <div className="flex items-center text-base text-gray-700 mb-2">
                  <DollarSign className="h-4 w-4 mr-1 text-green-600" /> 
                  <span className="font-medium">{job.salary_range}</span>
                </div>
              )}

              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar className="h-4 w-4 mr-1" /> 
                {new Date(job.created_at).toLocaleDateString(undefined, { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>

              <div className="border-t border-purple-100 pt-3 mb-4">
                {job.contact_info?.phone && (
                  <JobCardContact phoneNumber={job.contact_info.phone} />
                )}
              </div>

              <Button
                className="w-full font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600"
                onClick={() => onViewDetails(job)}
              >
                Xem Chi Tiết
              </Button>
            </CardContent>
          </Card>
        ))}

        {/* Promotional card for the second spot */}
        <Card className="overflow-hidden border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="aspect-video relative">
            <img
              src="/lovable-uploads/003b2e9a-4b56-4284-9fd7-56772930e035.png"
              alt="Diamond Featured Promotional Spot"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(0,0,0,0.6)]"></div>
            <Badge className="absolute top-2 left-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white border-0 shadow-md">
              Diamond
            </Badge>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="font-playfair font-semibold text-xl leading-tight">Coming Soon...</h3>
            </div>
          </div>

          <CardContent className="p-6 relative bg-gradient-to-br from-white to-purple-50">
            <div className="mb-4">
              <h3 className="font-playfair font-semibold text-xl mb-2">Vietnamese Nail Salon Spotlight</h3>
              <p className="text-gray-700">Only one Diamond slot left. Make your salon unforgettable.</p>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between text-lg font-bold text-purple-700">
                <span>$999.99/year</span>
                <span className="text-green-600">No tax.</span>
              </div>
            </div>

            <Button
              className="w-full font-bold bg-gradient-to-r from-yellow-400 to-amber-500 text-white hover:from-yellow-500 hover:to-amber-600 shadow-md"
              onClick={handleReserveSpot}
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
