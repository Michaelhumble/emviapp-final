
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface PortfolioImage {
  id: string;
  url: string;
  featured?: boolean;
  description?: string;
}

interface PortfolioGalleryProps {
  images: PortfolioImage[];
  artistName: string;
}

const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ 
  images, 
  artistName 
}) => {
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-3 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {images.map((image) => (
        <Dialog key={image.id}>
          <DialogTrigger asChild>
            <motion.div 
              variants={item}
              whileHover={{ scale: 1.02 }}
              className="relative cursor-pointer"
            >
              <Card className="overflow-hidden">
                <div className="aspect-square relative">
                  <img 
                    src={image.url} 
                    alt={`${artistName}'s work`}
                    className="object-cover w-full h-full"
                  />
                  {image.featured && (
                    <Badge 
                      className="absolute top-2 right-2 bg-amber-500"
                      variant="secondary"
                    >
                      <Star className="h-3 w-3 mr-1" /> Featured
                    </Badge>
                  )}
                </div>
              </Card>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="max-w-4xl w-[90vw]">
            <img 
              src={image.url} 
              alt={`${artistName}'s work`}
              className="w-full rounded-lg"
            />
            {image.description && (
              <p className="text-sm text-gray-600 mt-2">{image.description}</p>
            )}
          </DialogContent>
        </Dialog>
      ))}
    </motion.div>
  );
};

export default PortfolioGallery;
