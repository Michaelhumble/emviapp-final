
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Image, ExternalLink } from "lucide-react";
import { UserProfile } from "@/types/profile";
import { toast } from "sonner";

interface ArtistPortfolioSectionProps {
  profileData?: UserProfile;
}

const ArtistPortfolioSection = ({ profileData }: ArtistPortfolioSectionProps) => {
  const [isUploading, setIsUploading] = useState(false);
  
  // Portfolio images from profile data or empty array
  const portfolioImages = profileData?.portfolio_urls || [];
  
  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      toast.info("Portfolio upload feature coming soon!");
    }, 1000);
  };
  
  return (
    <Card className="border-purple-100 overflow-hidden">
      <CardHeader className="bg-purple-50/50 border-b border-purple-100 pb-4">
        <CardTitle className="text-xl flex items-center text-purple-900">
          <Image className="h-5 w-5 mr-2 text-purple-600" />
          Portfolio
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        {portfolioImages.length > 0 ? (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {portfolioImages.map((url, index) => (
                <div 
                  key={index} 
                  className="aspect-square rounded-lg overflow-hidden relative group border border-purple-100"
                >
                  <img 
                    src={url} 
                    alt={`Portfolio item ${index + 1}`} 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-purple-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button 
                      size="sm" 
                      variant="secondary"
                      className="text-xs"
                      onClick={() => window.open(url, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleUpload}
              disabled={isUploading}
              className="border-purple-200 text-purple-800 hover:bg-purple-50"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add More Images
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="bg-purple-100 rounded-full p-4 mb-4">
              <Image className="h-8 w-8 text-purple-500" />
            </div>
            <h3 className="text-lg font-medium mb-2">Showcase your work</h3>
            <p className="text-gray-500 mb-6 max-w-md">
              Upload photos of your best work to attract clients and showcase your talent.
            </p>
            <Button 
              onClick={handleUpload}
              disabled={isUploading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Upload Portfolio Images
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ArtistPortfolioSection;
