
import React from "react";

interface PortfolioImage {
  id: string;
  url: string;
  name: string;
}

interface PortfolioGalleryProps {
  images: PortfolioImage[];
}

const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ images }) => {
  if (images.length === 0) return null;
  
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-serif font-semibold mb-4">Portfolio</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image.id} className="aspect-square rounded-md overflow-hidden border">
            <img 
              src={image.url} 
              alt={image.name} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioGallery;
