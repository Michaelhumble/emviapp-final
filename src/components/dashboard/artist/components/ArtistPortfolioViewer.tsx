
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { X } from "lucide-react";

interface ArtistPortfolioViewerProps {
  image: { url: string; name: string; id: string } | null;
  onClose: () => void;
}

const ArtistPortfolioViewer = ({ image, onClose }: ArtistPortfolioViewerProps) => {
  if (!image) return null;

  return (
    <Dialog open={!!image} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>{image.name}</span>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-hidden">
          <AspectRatio ratio={1}>
            <img 
              src={image.url} 
              alt={image.name || "Portfolio image"} 
              className="object-contain w-full h-full"
            />
          </AspectRatio>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArtistPortfolioViewer;
