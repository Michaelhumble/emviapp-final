
import React, { useState, useEffect } from 'react';
import { getAllNailImages } from '@/utils/nailSalonImages';
import { Button } from "@/components/ui/button";
import { AlertCircle, Check } from "lucide-react";

/**
 * Enhanced debug component to verify that all nail salon images are loading correctly
 * This can be used to diagnose image loading issues and verify image paths
 */
const ImageDebug = () => {
  const allImages = getAllNailImages();
  const [loadStatus, setLoadStatus] = useState<Record<string, boolean>>({});
  const [showDetails, setShowDetails] = useState(false);
  
  // Track image loading success/failure
  const handleImageLoad = (imgSrc: string) => {
    setLoadStatus(prev => ({ ...prev, [imgSrc]: true }));
  };
  
  const handleImageError = (imgSrc: string) => {
    console.error(`Failed to load image: ${imgSrc}`);
    setLoadStatus(prev => ({ ...prev, [imgSrc]: false }));
  };
  
  // Calculate stats about image loading
  const stats = {
    total: allImages.length,
    loaded: Object.values(loadStatus).filter(Boolean).length,
    failed: Object.values(loadStatus).filter(status => status === false).length,
    pending: allImages.length - Object.keys(loadStatus).length
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Image Verification Panel</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </Button>
      </div>
      
      <div className="bg-white p-3 rounded border mb-4">
        <div className="flex flex-wrap gap-4">
          <div className="px-3 py-2 bg-blue-50 rounded text-blue-800 font-medium">
            Total Images: {stats.total}
          </div>
          <div className="px-3 py-2 bg-green-50 rounded text-green-800 font-medium">
            Loaded: {stats.loaded}
          </div>
          {stats.failed > 0 && (
            <div className="px-3 py-2 bg-red-50 rounded text-red-800 font-medium">
              Failed: {stats.failed}
            </div>
          )}
          {stats.pending > 0 && (
            <div className="px-3 py-2 bg-yellow-50 rounded text-yellow-800 font-medium">
              Loading: {stats.pending}
            </div>
          )}
        </div>
      </div>
      
      {allImages.length === 0 && (
        <div className="bg-red-50 p-4 rounded flex items-center gap-2 text-red-700">
          <AlertCircle className="h-5 w-5" />
          <span>No nail salon images found! Please check nailSalonImages.ts configuration.</span>
        </div>
      )}
      
      {showDetails && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {allImages.map((imgSrc, index) => (
            <div key={index} className="bg-white p-2 rounded border">
              <div className="aspect-video overflow-hidden mb-2 relative">
                <img 
                  src={imgSrc} 
                  alt={`Test image ${index + 1}`} 
                  className="w-full h-full object-cover" 
                  onError={() => handleImageError(imgSrc)}
                  onLoad={() => handleImageLoad(imgSrc)}
                />
                {loadStatus[imgSrc] === true && (
                  <div className="absolute top-1 right-1 bg-green-500 text-white p-1 rounded-full">
                    <Check className="h-3 w-3" />
                  </div>
                )}
                {loadStatus[imgSrc] === false && (
                  <div className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full">
                    <AlertCircle className="h-3 w-3" />
                  </div>
                )}
              </div>
              <p className="text-xs truncate">{imgSrc}</p>
              <p className="text-xs text-gray-500">Status: {loadStatus[imgSrc] === undefined ? 'Loading...' : (loadStatus[imgSrc] ? 'Loaded' : 'Failed')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageDebug;
