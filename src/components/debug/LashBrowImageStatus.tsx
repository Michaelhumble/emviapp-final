
import React from 'react';
import { 
  LASH_BROW_SALON_IMAGES, 
  getLashSalonImage, 
  getBrowSalonImage, 
  getLashBrowJobImage, 
  getRandomLashBrowImage,
  isLuxuryLashStudio
} from '@/utils/lashBrowSalonImages';

/**
 * Development component to verify lash and brow salon images loading
 * Only shown in development mode
 */
const LashBrowImageStatus: React.FC = () => {
  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="mb-4 p-4 border border-rose-200 rounded-md bg-rose-50 text-xs">
      <h3 className="font-bold mb-2">🔍 Lash & Brow Image Status (Dev Only)</h3>
      <div>
        <p className="mb-1">Premium lash studio image: {getLashSalonImage(true)}</p>
        <p className="mb-1">Standard lash studio image: {getLashSalonImage(false)}</p>
        <p className="mb-1">Premium brow studio image: {getBrowSalonImage(true)}</p>
        <p className="mb-1">Standard brow studio image: {getBrowSalonImage(false)}</p>
        <p className="mb-1">Lash job image: {getLashBrowJobImage(true)}</p>
        <p className="mb-1">Brow job image: {getLashBrowJobImage(false)}</p>
        <p className="mb-1">Random lash/brow image: {getRandomLashBrowImage()}</p>
        
        <details className="mt-3">
          <summary className="cursor-pointer text-rose-700">Show all available lash & brow images</summary>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {Object.entries(LASH_BROW_SALON_IMAGES).map(([key, url]) => (
              <div key={key} className="border rounded p-2">
                <p className="mb-1 font-medium">{key}:</p>
                <img 
                  src={url} 
                  alt={`Lash & brow image - ${key}`} 
                  className="w-full h-32 object-cover rounded"
                />
                <p className="mt-1 text-[10px] break-all">{url}</p>
                <p className="mt-1 text-[10px] text-rose-600">
                  {key.includes('luxury') ? 'Premium Tier' : 'Standard Tier'}
                </p>
              </div>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
};

export default LashBrowImageStatus;
