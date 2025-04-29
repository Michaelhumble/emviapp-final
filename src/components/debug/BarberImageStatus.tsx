
import React, { useState } from 'react';
import { BARBERSHOP_IMAGES } from '@/utils/barberShopImages';
import { Button } from '../ui/button';
import { BadgeCheck, X, ChevronDown, ChevronUp, ScissorsIcon } from 'lucide-react';

/**
 * A component to display the status of all barbershop images
 * This helps verify that all images are loading correctly
 */
const BarberImageStatus = () => {
  const [expanded, setExpanded] = useState(false);
  const images = Object.values(BARBERSHOP_IMAGES);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  
  const handleImageLoad = (imgSrc: string) => {
    setLoadedImages(prev => ({ ...prev, [imgSrc]: true }));
  };
  
  const handleImageError = (imgSrc: string) => {
    setLoadedImages(prev => ({ ...prev, [imgSrc]: false }));
  };
  
  const loadedCount = Object.values(loadedImages).filter(Boolean).length;
  const failedCount = Object.values(loadedImages).filter(v => v === false).length;
  
  return (
    <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <ScissorsIcon className="h-5 w-5 text-primary mr-2" />
          <h3 className="font-medium">Barbershop Image Verification</h3>
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
      </div>
      
      {expanded && (
        <div className="p-4 pt-0 bg-gray-50 max-h-80 overflow-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {images.map((img, i) => (
              <div key={i} className="relative bg-white rounded border p-1">
                <div className="aspect-video overflow-hidden rounded">
                  <img 
                    src={img} 
                    alt={`Barbershop image ${i + 1}`} 
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
                <p className="text-[10px] truncate mt-1 text-gray-600">{img.split('/').pop()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BarberImageStatus;
