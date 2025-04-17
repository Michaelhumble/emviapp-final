
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trash2, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArtistPortfolioGridItemProps {
  imageUrl: string;
  onDelete: () => void;
  onPreview: () => void;
  index: number;
}

const ArtistPortfolioGridItem = ({ 
  imageUrl, 
  onDelete, 
  onPreview, 
  index 
}: ArtistPortfolioGridItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative group aspect-square"
    >
      <div className="h-full w-full rounded-md overflow-hidden border border-border">
        <img
          src={imageUrl}
          alt={`Portfolio item ${index + 1}`}
          className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-opacity opacity-0 group-hover:opacity-100 flex items-center justify-center">
          <div className="flex space-x-2">
            <Button
              onClick={onPreview}
              size="sm"
              variant="secondary"
              className="rounded-full p-2 h-8 w-8"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              onClick={onDelete}
              size="sm"
              variant="destructive"
              className="rounded-full p-2 h-8 w-8"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistPortfolioGridItem;
