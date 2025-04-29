
import React, { useState, useEffect } from 'react';
import { NAIL_SALON_IMAGES, getAllNailImages } from '@/utils/nailSalonImages';
import { Button } from '../ui/button';
import { BadgeCheck, X, ChevronDown, ChevronUp, ImageIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

/**
 * Enhanced component to display the status of all nail salon images
 * This helps verify that all custom nail images are loading correctly
 * This component should be used in development for testing purposes
 */
const NailImageStatus = () => {
  const [expanded, setExpanded] = useState(false);
  const images = getAllNailImages();
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  
  // Reset loaded state when images change
  useEffect(() => {
    setLoadedImages({});
  }, [images]);
  
  const handleImageLoad = (imgSrc: string) => {
    setLoadedImages(prev => ({ ...prev, [imgSrc]: true }));
  };
  
  const handleImageError = (imgSrc: string) => {
    setLoadedImages(prev => ({ ...prev, [imgSrc]: false }));
    console.error(`Failed to load nail salon image: ${imgSrc}`);
  };
  
  const loadedCount = Object.values(loadedImages).filter(Boolean).length;
  const failedCount = Object.values(loadedImages).filter(v => v === false).length;
  
  return (
    <Card className="rounded-lg border bg-white shadow-sm overflow-hidden">
      <CardHeader className="p-4 flex flex-row justify-between items-center bg-gradient-to-r from-pink-50 to-amber-50">
        <div className="flex items-center">
          <ImageIcon className="h-5 w-5 text-primary mr-2" />
          <h3 className="font-medium text-lg">Custom Nail Salon Image Verification</h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm">
            <span className="text-green-600 font-medium">{loadedCount}</span>
            <span className="mx-1 text-gray-400">/</span>
            <span className="text-gray-600">{images.length}</span>
            {failedCount > 0 && (
              <span className="ml-2 text-red-500">({failedCount} failed)</span>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1 h-8 w-8"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </Button>
        </div>
      </CardHeader>
      
      {expanded && (
        <CardContent className="p-4 bg-gray-50 max-h-[600px] overflow-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {images.map((img, i) => {
              // Get the key name for this image path
              const keyName = Object.keys(NAIL_SALON_IMAGES).find(key => 
                NAIL_SALON_IMAGES[key as keyof typeof NAIL_SALON_IMAGES] === img
              ) || `nail-image-${i + 1}`;
              
              return (
                <div key={i} className="relative bg-white rounded-md border p-2 shadow-sm">
                  <div className="aspect-video overflow-hidden rounded-md">
                    <img 
                      src={img} 
                      alt={`Nail salon image - ${keyName}`} 
                      className="w-full h-full object-cover"
                      onLoad={() => handleImageLoad(img)}
                      onError={() => handleImageError(img)}
                    />
                  </div>
                  
                  <div className="absolute top-1 right-1">
                    {loadedImages[img] === true && (
                      <div className="bg-green-500 text-white rounded-full p-0.5">
                        <BadgeCheck className="h-3 w-3" />
                      </div>
                    )}
                    {loadedImages[img] === false && (
                      <div className="bg-red-500 text-white rounded-full p-0.5">
                        <X className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-2">
                    <p className="text-xs font-medium text-gray-700">{keyName}</p>
                    <p className="text-[10px] truncate text-gray-500">{img.split('/').pop()}</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 p-4 bg-amber-50 rounded-md text-sm">
            <h4 className="font-medium mb-1">Implementation Notes:</h4>
            <ul className="list-disc pl-5 space-y-1 text-amber-800">
              <li>These custom nail salon images are now being used consistently across all nail-related components</li>
              <li>Images rotate systematically to ensure visual variety across listings</li>
              <li>Premium/luxury listings are paired with the most upscale salon images</li>
              <li>All other industry categories (hair, barber, spa, etc.) remain untouched</li>
            </ul>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default NailImageStatus;
