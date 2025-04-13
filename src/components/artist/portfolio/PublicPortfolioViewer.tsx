
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, X } from 'lucide-react';

export interface PublicPortfolioImage {
  id: string;
  url: string;
}

interface PublicPortfolioViewerProps {
  images: PublicPortfolioImage[];
  artistName: string;
}

const PublicPortfolioViewer = ({ images, artistName }: PublicPortfolioViewerProps) => {
  const [selectedImage, setSelectedImage] = useState<PublicPortfolioImage | null>(null);
  
  if (images.length === 0) {
    return (
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ImageIcon className="h-5 w-5 mr-2 text-purple-500" />
            Portfolio
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">
            {artistName} hasn't uploaded any portfolio images yet.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ImageIcon className="h-5 w-5 mr-2 text-purple-500" />
            Portfolio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="relative aspect-square rounded-md overflow-hidden cursor-pointer group border"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.url}
                  alt={`${artistName}'s portfolio work`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Image preview modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          {selectedImage && (
            <>
              <DialogHeader className="p-4">
                <DialogTitle className="flex items-center justify-between">
                  <span>{artistName}'s Work</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setSelectedImage(null)}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </DialogTitle>
              </DialogHeader>
              <div className="relative max-h-[70vh] overflow-hidden">
                <img
                  src={selectedImage.url}
                  alt={`${artistName}'s work`}
                  className="w-full h-auto"
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default PublicPortfolioViewer;
