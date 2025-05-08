
import { Job } from "@/types/job";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Diamond } from "lucide-react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { motion } from "framer-motion";
import JobCardContact from "./JobCardContact";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

interface TopDiamondFeaturedSectionProps {
  featuredJobs: Job[];
  onViewDetails: (job: Job) => void;
}

const TopDiamondFeaturedSection = ({ featuredJobs, onViewDetails }: TopDiamondFeaturedSectionProps) => {
  const [nailImages, setNailImages] = useState<string[]>([]);
  
  // Fetch nail salon images from Supabase bucket
  useEffect(() => {
    const fetchNailImages = async () => {
      try {
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
            return supabase.storage.from('nails').getPublicUrl(file.name).data.publicUrl;
          });
          
          setNailImages(imageUrls);
        }
      } catch (err) {
        console.error('Failed to fetch nail salon images:', err);
      }
    };
    
    fetchNailImages();
  }, []);

  // Get the first real job (Magic Nails)
  const mainJob = featuredJobs[0];
  
  // Create 5 more diamond featured cards (total 6)
  const diamondPlaceholders = Array(5).fill(null).map((_, index) => ({
    id: `diamond-placeholder-${index}`,
    title: "Premium Diamond Listing",
    company: "Available For Your Business",
    location: "United States",
    created_at: new Date().toISOString(),
    description: "This premium Diamond position will make your business stand out. Reach thousands of potential customers or employees.",
    image: nailImages[index % nailImages.length] || "",
    pricingTier: "diamond" as const,
    isPinned: true,
    is_featured: true
  }));

  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-6">
        <Diamond className="h-6 w-6 text-amber-500 mr-2" />
        <h2 className="text-2xl lg:text-3xl font-playfair font-semibold">Top Diamond Featured</h2>
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

        {/* Placeholder cards for diamond slots */}
        {diamondPlaceholders.map((job) => (
          <Card
            key={job.id}
            className="overflow-hidden border-2 border-amber-100 shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <div className="h-2 bg-gradient-to-r from-amber-300 to-amber-500" />

            <div className="aspect-video relative">
              {job.image ? (
                <ImageWithFallback
                  src={job.image}
                  alt={job.title}
                  className="w-full h-full object-cover opacity-70"
                />
              ) : (
                <div className="aspect-video bg-gradient-to-r from-amber-50 to-amber-100 flex items-center justify-center">
                  <Diamond className="h-12 w-12 text-amber-300" />
                </div>
              )}
              <Badge className="absolute top-2 left-2 bg-amber-500 text-white border-0 opacity-70">
                Diamond
              </Badge>
            </div>

            <CardContent className="p-6">
              <div className="mb-3">
                <h3 className="font-playfair font-semibold text-lg">{job.title}</h3>
                <p className="text-gray-500">{job.company}</p>
              </div>

              <p className="text-base text-gray-500 mb-4 line-clamp-2">
                {job.description}
              </p>

              <div className="mt-auto pt-3">
                <Button
                  className="w-full font-bold bg-gradient-to-r from-amber-400 to-amber-500 opacity-70"
                  disabled
                >
                  Premium Position Available
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
