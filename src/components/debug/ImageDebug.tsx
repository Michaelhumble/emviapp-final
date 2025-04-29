
import React from 'react';
import { getAllNailImages } from '@/utils/nailSalonImages';

/**
 * Debug component to verify that all nail salon images are loading correctly
 * This can be used temporarily to check image loading status
 */
const ImageDebug = () => {
  const allImages = getAllNailImages();
  
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Image Debug Panel</h3>
      <p className="mb-4 text-sm text-gray-600">
        This panel shows all nail salon images to verify loading.
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {allImages.map((imgSrc, index) => (
          <div key={index} className="bg-white p-2 rounded border">
            <div className="aspect-video overflow-hidden mb-2">
              <img 
                src={imgSrc} 
                alt={`Test image ${index + 1}`} 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  console.error(`Failed to load image: ${imgSrc}`);
                  e.currentTarget.src = 'https://placehold.co/600x400?text=Image+Error';
                }}
              />
            </div>
            <p className="text-xs truncate">{imgSrc}</p>
          </div>
        ))}
      </div>
      
      {allImages.length === 0 && (
        <p className="text-red-500">No nail salon images found!</p>
      )}
    </div>
  );
};

export default ImageDebug;
