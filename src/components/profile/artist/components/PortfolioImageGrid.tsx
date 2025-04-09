
import PortfolioImageItem from "./PortfolioImageItem";
import { Image } from "lucide-react";
import { ImageGridProps } from "./types";

const PortfolioImageGrid = ({ images, onRemoveImage, isUploading }: ImageGridProps) => {
  if (images.length === 0) {
    return (
      <div className="text-center p-4 bg-muted/20 rounded-lg mt-2">
        <Image className="h-8 w-8 mx-auto text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">No portfolio images uploaded yet.</p>
        <p className="text-xs text-muted-foreground">Upload your best work to attract more clients.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
      {images.map((url, index) => (
        <PortfolioImageItem 
          key={index}
          url={url} 
          index={index}
          onRemove={onRemoveImage}
          isUploading={isUploading}
        />
      ))}
    </div>
  );
};

export default PortfolioImageGrid;
