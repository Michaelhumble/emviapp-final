
import React, { useState, useEffect } from "react";
import { Job } from "@/types/job";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Diamond, Info } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TopDiamondFeaturedSectionProps {
  vietnameseJobs: Job[];
  onViewDetails: (job: Job) => void;
  searchTerm?: string;
}

const TopDiamondFeaturedSection = ({
  vietnameseJobs,
  onViewDetails,
  searchTerm = "",
}: TopDiamondFeaturedSectionProps) => {
  const [nailImages, setNailImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch nail salon images from Supabase bucket
  useEffect(() => {
    const fetchNailImages = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.storage.from('nails').list('', {
          sortBy: { column: 'name', order: 'asc' },
        });
        
        if (error) {
          console.error('Error fetching nail images:', error);
          return;
        }
        
        if (data) {
          // Get public URLs for all images
          const imageUrls = data.map(file => {
            const publicUrl = supabase.storage.from('nails').getPublicUrl(file.name).data.publicUrl;
            return publicUrl;
          });
          
          setNailImages(imageUrls);
        }
      } catch (err) {
        console.error('Failed to fetch nail salon images:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNailImages();
  }, []);

  // Always use the first image for Magic Nails
  const getMagicNailsImage = () => {
    if (nailImages.length > 0) {
      return nailImages[0];
    }
    return "";
  };

  // Create the Magic Nails featured job
  const magicNailsJob = vietnameseJobs.find(job => 
    job.company?.includes('Magic Nails') || job.title?.includes('Magic Nails')
  ) || vietnameseJobs[0];

  const jobImage = getMagicNailsImage();

  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center">
          <Diamond size={22} className="text-yellow-500 mr-2" />
          <h2 className="text-2xl font-serif font-bold">Top Diamond Featured</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Magic Nails Card - Always in first position */}
        <Card className="overflow-hidden border-2 border-yellow-300 shadow-lg relative group">
          <div className="absolute top-0 left-0 right-0 bg-yellow-400 text-yellow-900 py-1 px-3 text-xs font-medium flex items-center justify-center z-10">
            <span className="mr-1">⭐</span> Top Diamond Featured
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-amber-100 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
          
          <div className="w-full h-48 overflow-hidden">
            {jobImage && (
              <img
                src={jobImage}
                alt={magicNailsJob.title || "Featured Job"}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            )}
          </div>
          
          <CardContent className="p-6 relative">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-lg">{magicNailsJob.title}</h3>
                <p className="text-gray-600">{magicNailsJob.company}</p>
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-600 mb-3">
              <MapPin className="h-4 w-4 mr-1" /> {magicNailsJob.location}
            </div>

            {magicNailsJob.salary_range && (
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <span className="h-4 w-4 mr-1 text-lg">💰</span> {magicNailsJob.salary_range}
              </div>
            )}

            <div className="flex items-center text-sm text-gray-600 mb-4">
              <Calendar className="h-4 w-4 mr-1" /> {new Date(magicNailsJob.created_at).toLocaleDateString()}
            </div>

            {magicNailsJob.vietnamese_description && (
              <p className="text-gray-700 italic mb-4 line-clamp-2">
                {magicNailsJob.vietnamese_description}
              </p>
            )}

            <Button
              variant="default"
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 transition-all duration-300"
              onClick={() => onViewDetails({ ...magicNailsJob, image: jobImage })}
            >
              Xem Chi Tiết
            </Button>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="absolute top-2 right-2 text-yellow-500 cursor-help">
                    <Info size={16} />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="p-3 bg-amber-50 border border-amber-200">
                  <p className="text-amber-900">Reserved for $999.99/year — 2 spots left</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardContent>
        </Card>

        {/* Placeholder Cards */}
        {[1, 2].map((_, index) => (
          <Card
            key={`placeholder-${index}`}
            className="overflow-hidden border border-yellow-200 border-dashed shadow-sm relative"
          >
            <div className="absolute top-0 left-0 right-0 bg-yellow-100 text-yellow-800 py-1 px-3 text-xs font-medium flex items-center justify-center">
              <span className="mr-1">⭐</span> Diamond Tier Opportunity
            </div>
            
            <div className="h-48 bg-gradient-to-r from-yellow-50 to-amber-50 flex items-center justify-center">
              <Diamond size={40} className="text-yellow-200" />
            </div>
            
            <CardContent className="p-6">
              <div className="flex justify-center mb-3">
                <h3 className="font-bold text-lg text-center text-yellow-700">Coming Soon...</h3>
              </div>
              
              <p className="text-gray-500 text-center text-sm mb-6">
                This premium spot is reserved for top-tier beauty businesses
              </p>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full border-yellow-300 text-yellow-700"
                      disabled
                    >
                      Reserve This Spot
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="p-3 bg-amber-50 border border-amber-200">
                    <p className="text-amber-900">Reserved for $999.99/year — Contact for availability</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.section>
  );
};

export default TopDiamondFeaturedSection;
