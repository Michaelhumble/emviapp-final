
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image, Upload, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/context/auth';

const PortfolioGallery = () => {
  const { userProfile } = useAuth();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Gallery images from user profile or empty array
  const galleryImages = userProfile?.gallery || [];
  
  // Sample random images for demonstrating the layout (if no gallery images exist)
  const demoImages = [
    'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1604902396830-aca29e19b067?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1632345031435-8727f6897d53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
  ];
  
  // Use gallery images if available, otherwise use demo images (only for preview)
  const displayImages = galleryImages.length > 0 ? galleryImages : [];
  
  if (displayImages.length === 0) {
    return (
      <Card className="border border-gray-200 overflow-hidden">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Image className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">Portfolio Coming Soon</h3>
            <p className="text-gray-500 mb-4">
              Showcase your best work with a beautiful portfolio gallery.
            </p>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Upload className="mr-2 h-4 w-4" />
              Add Portfolio Items
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {displayImages.map((imageUrl, index) => (
          <motion.div
            key={`portfolio-item-${index}`}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => setSelectedImage(imageUrl)}
          >
            <Card className="overflow-hidden cursor-pointer border border-gray-100 hover:shadow-md transition-shadow">
              <AspectRatio ratio={1}>
                <img
                  src={imageUrl}
                  alt={`Portfolio item ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/placeholder-image.jpg';
                  }}
                />
              </AspectRatio>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Image preview modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <DialogHeader className="p-4">
            <DialogTitle>Portfolio Preview</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage}
                alt="Portfolio preview"
                className="w-full h-auto"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PortfolioGallery;
