
import React from 'react';
import { 
  BARBERSHOP_IMAGES, 
  getBarberShopImage, 
  getBarberBoothImage, 
  getBarberJobImage, 
  getRandomBarberShopImage 
} from '@/utils/barberShopImages';

/**
 * Development component to verify barber image loading
 * Only shown in development mode
 */
const BarberImageStatus: React.FC = () => {
  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="mb-4 p-4 border border-amber-200 rounded-md bg-amber-50 text-xs">
      <h3 className="font-bold mb-2">🔍 Barbershop Image Status (Dev Only)</h3>
      <div>
        <p className="mb-1">Premium barber image: {getBarberShopImage(true, true)}</p>
        <p className="mb-1">Standard barber image: {getBarberShopImage(false, false)}</p>
        <p className="mb-1">Barber booth image: {getBarberBoothImage()}</p>
        <p className="mb-1">Barber job image: {getBarberJobImage()}</p>
        <p className="mb-1">Random barber image: {getRandomBarberShopImage()}</p>
        
        <details className="mt-3">
          <summary className="cursor-pointer text-amber-700">Show all available barber images</summary>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {Object.entries(BARBERSHOP_IMAGES).map(([key, url]) => (
              <div key={key} className="border rounded p-2">
                <p className="mb-1 font-medium">{key}:</p>
                <img 
                  src={url as string} 
                  alt={`Barber image - ${key}`} 
                  className="w-full h-32 object-cover rounded"
                />
                <p className="mt-1 text-[10px] break-all">{url as string}</p>
              </div>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
};

export default BarberImageStatus;
