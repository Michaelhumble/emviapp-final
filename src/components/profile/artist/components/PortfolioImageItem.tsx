
import { X } from "lucide-react";
import { ImageItemProps } from "./types";

const PortfolioImageItem = ({ url, index, onRemove, isUploading }: ImageItemProps) => {
  return (
    <div key={index} className="group relative aspect-square rounded-md overflow-hidden border">
      <img
        src={url}
        alt={`Portfolio image ${index + 1}`}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null; // Prevent infinite error loop
          target.src = '';
          target.classList.add('bg-muted');
          target.parentElement?.classList.add('bg-muted');
        }}
      />
      <button
        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(url);
        }}
        disabled={isUploading}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default PortfolioImageItem;
