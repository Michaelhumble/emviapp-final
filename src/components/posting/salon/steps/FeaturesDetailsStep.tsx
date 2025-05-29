
import React from 'react';
import { SalonFormValues } from '../salonFormSchema';

interface FeaturesDetailsStepProps {
  formData: SalonFormValues;
  updateFormData: (data: Partial<SalonFormValues>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export const FeaturesDetailsStep = ({ formData, updateFormData }: FeaturesDetailsStepProps) => {
  const equipmentOptions = [
    'Nail Stations',
    'Pedicure Chairs',
    'UV Lamps',
    'Autoclave Sterilizer',
    'Ventilation System',
    'Massage Chairs',
    'Hair Dryers',
    'Styling Chairs',
    'Wax Equipment',
    'Facial Equipment'
  ];

  const handleEquipmentChange = (equipment: string, checked: boolean) => {
    const currentEquipment = formData.equipment || [];
    if (checked) {
      updateFormData({ equipment: [...currentEquipment, equipment] });
    } else {
      updateFormData({ equipment: currentEquipment.filter(item => item !== equipment) });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Features & Equipment</h2>
        <p className="text-gray-600">What features and equipment does your salon include?</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Salon Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hasParking"
                checked={formData.hasParking || false}
                onChange={(e) => updateFormData({ hasParking: e.target.checked })}
                className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="hasParking" className="text-sm text-gray-700">
                Parking Available
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hasWaitingArea"
                checked={formData.hasWaitingArea || false}
                onChange={(e) => updateFormData({ hasWaitingArea: e.target.checked })}
                className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="hasWaitingArea" className="text-sm text-gray-700">
                Waiting Area
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hasPrivateRooms"
                checked={formData.hasPrivateRooms || false}
                onChange={(e) => updateFormData({ hasPrivateRooms: e.target.checked })}
                className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="hasPrivateRooms" className="text-sm text-gray-700">
                Private Rooms
              </label>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Equipment Included</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {equipmentOptions.map((equipment) => (
              <div key={equipment} className="flex items-center">
                <input
                  type="checkbox"
                  id={equipment}
                  checked={(formData.equipment || []).includes(equipment)}
                  onChange={(e) => handleEquipmentChange(equipment, e.target.checked)}
                  className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor={equipment} className="text-sm text-gray-700">
                  {equipment}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Details
          </label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => updateFormData({ description: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Describe any additional features, recent renovations, or special equipment..."
          />
        </div>
      </div>
    </div>
  );
};
