
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Image, FileUpload } from "lucide-react";
import { UserProfile } from "@/types/profile";
import { motion } from "framer-motion";

interface ArtistPortfolioSectionProps {
  profileData?: UserProfile | null;
}

const ArtistPortfolioSection = ({ profileData }: ArtistPortfolioSectionProps) => {
  // Extract portfolio URLs from the profile data
  const portfolioImages = profileData?.portfolio_urls || [];
  
  const placeholderImages = [
    "/assets/placeholder-nail-1.jpg",
    "/assets/placeholder-nail-2.jpg",
    "/assets/placeholder-nail-3.jpg",
  ];

  // Use portfolio images if available, otherwise use placeholders
  const displayImages = portfolioImages.length > 0 ? portfolioImages : placeholderImages;
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Card className="border-purple-100 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-white pb-2">
        <CardTitle className="font-serif text-lg text-purple-700 flex items-center">
          <Image className="h-5 w-5 mr-2 text-purple-500" />
          Your Portfolio
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        {displayImages.length === 0 ? (
          <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-lg">
            <Image className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">No portfolio images yet</h3>
            <p className="text-gray-500 text-sm mb-4">
              Showcase your best nail art to attract new clients
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Photos
            </Button>
          </div>
        ) : (
          <div>
            <motion.div 
              className="grid grid-cols-3 gap-2 mb-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {displayImages.slice(0, 3).map((image, index) => (
                <motion.div key={index} variants={item}>
                  <div 
                    className="aspect-square rounded-md overflow-hidden bg-gray-100"
                    style={{
                      backgroundImage: `url(${image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
            <div className="flex justify-between items-center">
              <Button variant="link" className="text-purple-600 p-0 h-auto text-sm">
                View All ({displayImages.length})
              </Button>
              <Button variant="outline" className="text-sm h-8" size="sm">
                <FileUpload className="h-3.5 w-3.5 mr-1" />
                Update
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ArtistPortfolioSection;
