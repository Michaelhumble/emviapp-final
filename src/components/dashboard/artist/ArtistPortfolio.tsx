
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/context/auth";
import { useArtistData } from "./context/ArtistDataContext";
import ArtistPortfolioUploader from "./components/ArtistPortfolioUploader";
import ArtistPortfolioGrid from "./components/ArtistPortfolioGrid";
import ArtistPortfolioViewer from "./components/ArtistPortfolioViewer";

interface PortfolioImage {
  id: string;
  url: string;
  name: string;
}

const ArtistPortfolio = () => {
  const { user } = useAuth();
  const { artistProfile, refreshArtistProfile } = useArtistData();
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load portfolio images from user profile
  useEffect(() => {
    if (artistProfile && artistProfile.portfolio_urls) {
      const loadedImages = (artistProfile.portfolio_urls || []).map((url, index) => ({
        id: `${index}-${new Date().getTime()}`,
        url,
        name: url.split('/').pop() || `image-${index}`
      }));
      setImages(loadedImages);
    }
    setIsLoading(false);
  }, [artistProfile]);

  const handleImagesUpdated = async () => {
    await refreshArtistProfile();
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-serif">My Portfolio</CardTitle>
          <CardDescription>Showcase your best work to attract clients</CardDescription>
        </div>
        
        <ArtistPortfolioUploader 
          user={user} 
          artistProfile={artistProfile} 
          images={images} 
          onImagesUpdated={handleImagesUpdated} 
        />
      </CardHeader>
      
      <CardContent>
        <ArtistPortfolioGrid 
          images={images}
          isLoading={isLoading}
          userId={user?.id}
          onImageClick={setSelectedImage}
          onImagesUpdated={handleImagesUpdated}
        />
        
        <ArtistPortfolioViewer 
          image={selectedImage} 
          onClose={() => setSelectedImage(null)} 
        />
      </CardContent>
    </Card>
  );
};

export default ArtistPortfolio;
