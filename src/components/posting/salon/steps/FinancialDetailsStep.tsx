
import React from 'react';
import { SalonFormValues } from '../salonFormSchema';

interface FinancialDetailsStepProps {
  formData: SalonFormValues;
  updateFormData: (data: Partial<SalonFormValues>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export const FinancialDetailsStep = ({ formData, updateFormData }: FinancialDetailsStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Financial Details</h2>
        <p className="text-gray-600">Share your salon's financial information</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Asking Price *
          </label>
          <input
            type="text"
            value={formData.askingPrice}
            onChange={(e) => updateFormData({ askingPrice: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="150000"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Rent *
          </label>
          <input
            type="text"
            value={formData.monthlyRent}
            onChange={(e) => updateFormData({ monthlyRent: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="5000"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Revenue
          </label>
          <input
            type="text"
            value={formData.monthlyRevenue || ''}
            onChange={(e) => updateFormData({ monthlyRevenue: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="25000"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Chairs
          </label>
          <input
            type="text"
            value={formData.numberOfChairs || ''}
            onChange={(e) => updateFormData({ numberOfChairs: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="8"
          />
        </div>
      </div>
    </div>
  );
};
