
import { ImageGridProps } from "./types";
import { Button } from "@/components/ui/button";
import { Trash2, ZoomIn, Loader2 } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const PortfolioImageGrid = ({ images, onRemoveImage, isUploading }: ImageGridProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!imageToDelete) return;
    
    setIsDeleting(true);
    await onRemoveImage(imageToDelete);
    setIsDeleting(false);
    setImageToDelete(null);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((url, index) => (
          <div key={`portfolio-image-${index}`} className="relative group aspect-square">
            <div className="h-full w-full rounded-md overflow-hidden border border-border">
              <img
                src={url}
                alt={`Portfolio item ${index + 1}`}
                className="object-cover w-full h-full transition-transform group-hover:scale-105 duration-300"
                onError={(e) => {
                  console.error("Failed to load image:", url);
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; // Prevent infinite error loop
                  target.src = ""; // Clear src
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-opacity opacity-0 group-hover:opacity-100 flex items-center justify-center">
                <div className="flex space-x-2">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(url);
                    }}
                    size="sm"
                    variant="secondary"
                    className="rounded-full p-2 h-8 w-8"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageToDelete(url);
                    }}
                    size="sm"
                    variant="destructive"
                    className="rounded-full p-2 h-8 w-8"
                    disabled={isUploading || isDeleting}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image preview dialog */}
      <AlertDialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <AlertDialogContent className="max-w-4xl">
          <div className="relative">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Portfolio preview"
                className="w-full h-auto object-contain max-h-[70vh]"
              />
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogAction>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete confirmation dialog */}
      <AlertDialog open={!!imageToDelete} onOpenChange={(open) => !open && setImageToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this image from your portfolio.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PortfolioImageGrid;
