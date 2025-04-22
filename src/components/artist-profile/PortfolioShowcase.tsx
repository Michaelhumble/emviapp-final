
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { GalleryHorizontal, ExternalLink } from "lucide-react";
import { usePortfolioImages } from "@/hooks/portfolio/usePortfolioImages";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface PortfolioShowcaseProps {
  artistId?: string;
  artistUsername?: string;
  limit?: number;
  isPreview?: boolean;
}

const PortfolioShowcase = ({ 
  artistId, 
  artistUsername,
  limit = 6,
  isPreview = false 
}: PortfolioShowcaseProps) => {
  const { images, isLoading } = usePortfolioImages();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Use either prop images or fetch from hook
  const displayImages = images.slice(0, limit);
  const hasImages = displayImages.length > 0;
  
  // Handle loading state with skeleton placeholders
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Portfolio Showcase</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Array(limit).fill(0).map((_, i) => (
            <div 
              key={`skeleton-${i}`}
              className="aspect-square bg-gray-100 animate-pulse rounded-md"
            />
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Portfolio Showcase</h3>
        {isPreview && hasImages && artistUsername && (
          <Link to={`/u/${artistUsername}/portfolio`}>
            <Button variant="ghost" size="sm" className="text-primary">
              View All <ExternalLink className="ml-1 h-3.5 w-3.5" />
            </Button>
          </Link>
        )}
      </div>
      
      {hasImages ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {displayImages.map((image, index) => (
              <motion.div
                key={image.id || index}
                className="relative aspect-square overflow-hidden rounded-md border border-border"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={image.url}
                  alt={`Portfolio item ${index + 1}`}
                  className={`object-cover h-full w-full transition-transform duration-300 ${
                    hoveredIndex === index ? 'scale-110' : 'scale-100'
                  }`}
                />
                <div 
                  className={`absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center`}
                >
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="secondary" size="sm" className="rounded-full h-8 w-8 p-0">
                        <GalleryHorizontal className="h-4 w-4" />
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80 p-0">
                      <img
                        src={image.url}
                        alt={`Portfolio preview ${index + 1}`}
                        className="h-auto w-full object-cover rounded-t-md"
                      />
                      <div className="p-3">
                        <p className="text-sm text-muted-foreground">
                          {image.name || `Portfolio item ${index + 1}`}
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </motion.div>
            ))}
          </div>
          
          {!isPreview && artistUsername && (
            <div className="flex justify-center mt-6">
              <Link to={`/u/${artistUsername}/portfolio`}>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  View Full Portfolio
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="border border-dashed rounded-md p-6 text-center text-muted-foreground bg-muted/30">
          <GalleryHorizontal className="h-8 w-8 mx-auto mb-3 text-muted-foreground/60" />
          <p>No portfolio items to display</p>
          {!isPreview && (
            <p className="text-sm mt-1">Check back soon for new additions</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PortfolioShowcase;
