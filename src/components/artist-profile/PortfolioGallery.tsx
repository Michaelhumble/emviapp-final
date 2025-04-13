
import React, { useState } from "react";
import { PortfolioImage } from "@/pages/a/artist-profile/types";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface PortfolioGalleryProps {
  images: PortfolioImage[];
  artistName?: string;
}

const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ images, artistName = "Artist" }) => {
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(null);

  if (!images || images.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-gray-500">No portfolio images available yet.</p>
      </Card>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <Dialog key={image.id || index}>
            <DialogTrigger asChild>
              <Card 
                className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedImage(image)}
              >
                <AspectRatio ratio={1}>
                  <img 
                    src={image.url} 
                    alt={`${artistName}'s portfolio - ${image.name || `Image ${index + 1}`}`}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    loading={index < 6 ? "eager" : "lazy"}
                  />
                </AspectRatio>
                {image.description && (
                  <div className="p-3">
                    <p className="text-sm font-medium">{image.description}</p>
                  </div>
                )}
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
              <div className="relative">
                <img 
                  src={image.url} 
                  alt={`${artistName}'s portfolio - ${image.name || `Image ${index + 1}`}`}
                  className="w-full rounded-md"
                />
                {image.description && (
                  <div className="mt-2">
                    <p className="text-lg font-medium">{image.description}</p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {images.length > 0 && (
        <div className="mt-8 text-center">
          <Separator className="mb-8" />
          <p className="text-sm text-gray-500">
            View {images.length} portfolio {images.length === 1 ? 'image' : 'images'} from {artistName}'s professional work collection
          </p>
        </div>
      )}
    </>
  );
};

export default PortfolioGallery;
