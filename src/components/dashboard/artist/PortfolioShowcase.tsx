
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { GalleryHorizontal, Plus, ExternalLink } from "lucide-react";
import { usePortfolioImages } from "@/hooks/artist/usePortfolioImages";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PortfolioImage } from "@/types/artist";

interface PortfolioShowcaseProps {
  artistId?: string;
  artistUsername?: string;
  limit?: number;
  isPreview?: boolean;
  onAddClick?: () => void;
}

const PortfolioShowcase = ({ 
  artistId, 
  artistUsername,
  limit = 6,
  isPreview = false,
  onAddClick
}: PortfolioShowcaseProps) => {
  const { images, isLoading } = usePortfolioImages(artistId);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Use either prop images or fetch from hook
  const displayImages = images.slice(0, limit);
  const hasImages = displayImages.length > 0;
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 } 
    }
  };
  
  // Handle loading state with skeleton placeholders
  if (isLoading) {
    return (
      <Card className="overflow-hidden border border-gray-100 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-serif flex items-center">
            <GalleryHorizontal className="h-5 w-5 mr-2 text-purple-500" />
            Portfolio
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Array(limit).fill(0).map((_, i) => (
              <div 
                key={`skeleton-${i}`}
                className="aspect-square bg-gray-100 animate-pulse rounded-md"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="overflow-hidden border border-gray-100 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-serif flex items-center">
          <GalleryHorizontal className="h-5 w-5 mr-2 text-purple-500" />
          Portfolio
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4">
        {hasImages ? (
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {displayImages.map((image, index) => (
              <Dialog key={image.id || index}>
                <DialogTrigger asChild>
                  <motion.div
                    variants={itemVariants}
                    className="relative aspect-square overflow-hidden rounded-md border border-gray-200 cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img
                      src={image.url}
                      alt={`Portfolio item ${index + 1}`}
                      className="object-cover h-full w-full"
                    />
                    <motion.div 
                      className="absolute inset-0 bg-black/50 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button variant="secondary" size="sm" className="rounded-full h-9 w-9 p-0">
                        <GalleryHorizontal className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-[90vw]">
                  <img 
                    src={image.url} 
                    alt={`Portfolio item ${index + 1}`}
                    className="w-full rounded-lg"
                  />
                  {image.description && (
                    <p className="text-sm text-gray-600 mt-2">{image.description}</p>
                  )}
                </DialogContent>
              </Dialog>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="flex flex-col items-center justify-center py-8 text-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-purple-50 p-4 rounded-full mb-4">
              <GalleryHorizontal className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-lg font-medium mb-1">Showcase your work</h3>
            <p className="text-gray-500 mb-6 max-w-md">
              Upload photos of your best work to attract clients and showcase your talent.
            </p>
            
            <Button 
              onClick={onAddClick} 
              className="min-h-[44px] min-w-[200px] bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Upload Portfolio Images
            </Button>
          </motion.div>
        )}
        
        {hasImages && (
          <div className="mt-6 flex justify-center">
            <Button 
              onClick={onAddClick}
              className="min-h-[44px] bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add More Images
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PortfolioShowcase;
