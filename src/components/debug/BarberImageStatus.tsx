
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
        <p className="mb-1">Random barber image: {getRandomBarberShopImage()}</p>
        <p className="mb-1">Premium barber image: {getBarberShopImage(true, true)}</p>
        <p className="mb-1">Barber booth image: {getBarberBoothImage()}</p>
        <p className="mb-1">Barber job image: {getBarberJobImage()}</p>
        <details className="mt-2">
          <summary className="cursor-pointer text-amber-700">Show all barber images</summary>
          <ul className="pl-4 mt-1">
            {Object.entries(BARBERSHOP_IMAGES).map(([key, url]) => (
              <li key={key} className="mb-1">
                {key}: {url}
              </li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  );
};

export default BarberImageStatus;
