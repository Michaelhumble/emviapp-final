
import React from 'react';
import { 
  HAIR_SALON_IMAGES, 
  getHairSalonImage, 
  getHairBoothImage, 
  getHairJobImage, 
  getRandomHairSalonImage 
} from '@/utils/hairSalonImages';

/**
 * Development component to verify hair salon image loading
 * Only shown in development mode
 */
const HairSalonImageStatus: React.FC = () => {
  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="mb-4 p-4 border border-pink-200 rounded-md bg-pink-50 text-xs">
      <h3 className="font-bold mb-2">🔍 Hair Salon Image Status (Dev Only)</h3>
      <div>
        <p className="mb-1">Premium hair salon image: {getHairSalonImage(true, true)}</p>
        <p className="mb-1">Standard hair salon image: {getHairSalonImage(false, false)}</p>
        <p className="mb-1">Hair booth image: {getHairBoothImage()}</p>
        <p className="mb-1">Hair stylist job image: {getHairJobImage()}</p>
        <p className="mb-1">Random hair salon image: {getRandomHairSalonImage()}</p>
        
        <details className="mt-3">
          <summary className="cursor-pointer text-pink-700">Show all available hair salon images</summary>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {Object.entries(HAIR_SALON_IMAGES).map(([key, url]) => (
              <div key={key} className="border rounded p-2">
                <p className="mb-1 font-medium">{key}:</p>
                <img 
                  src={url} 
                  alt={`Hair salon image - ${key}`} 
                  className="w-full h-32 object-cover rounded"
                />
                <p className="mt-1 text-[10px] break-all">{url}</p>
              </div>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
};

export default HairSalonImageStatus;
