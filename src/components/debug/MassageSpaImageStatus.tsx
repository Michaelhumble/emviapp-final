
import React from 'react';
import { 
  MASSAGE_SPA_IMAGES, 
  getMassageSalonImage, 
  getMassageJobImage, 
  getRandomMassageSpaImage,
  isLuxuryMassageSpa
} from '@/utils/massageSalonImages';

/**
 * Development component to verify massage/spa images loading
 * Only shown in development mode
 */
const MassageSpaImageStatus: React.FC = () => {
  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  // Log massage images to console for debugging
  console.log('Massage/spa images available:', MASSAGE_SPA_IMAGES);
  console.log('Premium massage sample:', getMassageSalonImage(true, false));
  console.log('Standard massage sample:', getMassageSalonImage(false, false));

  return (
    <div className="mb-4 p-4 border border-blue-200 rounded-md bg-blue-50 text-xs">
      <h3 className="font-bold mb-2">🔍 Massage & Spa Image Status (Dev Only)</h3>
      <div>
        <p className="mb-1">Premium massage salon image: {getMassageSalonImage(true, false)}</p>
        <p className="mb-1">Standard massage salon image: {getMassageSalonImage(false, false)}</p>
        <p className="mb-1">Massage job image: {getMassageJobImage(false)}</p>
        <p className="mb-1">Random massage/spa image: {getRandomMassageSpaImage()}</p>
        
        <div className="mt-3 p-2 bg-blue-100 rounded-md">
          <p className="font-medium text-blue-700 mb-1">NEW SPA & FACIAL IMAGES:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            <div className="border rounded p-2 bg-white">
              <img 
                src="/lovable-uploads/c540558f-09db-483f-b844-bacb8824f789.png" 
                alt="New luxury spa image" 
                className="w-full h-32 object-cover rounded"
              />
              <p className="mt-1 text-xs text-center">Luxury Gold Spa</p>
            </div>
            <div className="border rounded p-2 bg-white">
              <img 
                src="/lovable-uploads/ada4c504-75cf-45ce-a673-c81a22b9dbe3.png" 
                alt="New contemporary spa image" 
                className="w-full h-32 object-cover rounded"
              />
              <p className="mt-1 text-xs text-center">Contemporary Spa</p>
            </div>
            <div className="border rounded p-2 bg-white">
              <img 
                src="/lovable-uploads/ca09b67d-f8b2-497c-bfd9-ac6ec0a491c7.png" 
                alt="New blue spa image" 
                className="w-full h-32 object-cover rounded"
              />
              <p className="mt-1 text-xs text-center">Blue Modern Spa</p>
            </div>
          </div>
        </div>
        
        <details className="mt-3">
          <summary className="cursor-pointer text-blue-700">Show all available massage & spa images</summary>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {Object.entries(MASSAGE_SPA_IMAGES).map(([key, url]) => (
              <div key={key} className="border rounded p-2">
                <p className="mb-1 font-medium">{key}:</p>
                <img 
                  src={url} 
                  alt={`Massage & spa image - ${key}`} 
                  className="w-full h-32 object-cover rounded"
                />
                <p className="mt-1 text-[10px] break-all">{url}</p>
                <p className="mt-1 text-[10px] text-blue-600">
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

export default MassageSpaImageStatus;
