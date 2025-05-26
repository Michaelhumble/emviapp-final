
import React from 'react';
import { motion } from 'framer-motion';
import { Package, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SalonAssetsSectionProps {
  data: any;
  onSubmit: (data: any) => void;
  onPrevious: () => void;
}

const SalonAssetsSection = ({ data, onSubmit, onPrevious }: SalonAssetsSectionProps) => {
  const handleSubmit = () => {
    onSubmit({ assets: { placeholder: 'data' } });
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-full">
            <Package className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
          Assets & Equipment
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          List what's included in the sale - equipment, furniture, and staff.
        </p>
      </motion.div>

      <div className="bg-gray-100 p-8 rounded-lg text-center">
        <p className="text-gray-600 mb-4">Assets section coming soon...</p>
        <p className="text-sm text-gray-500">
          This will include equipment checklists, team details, and value estimators.
        </p>
      </div>

      <div className="flex justify-between pt-6">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onPrevious}
          className="px-8 py-3"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          type="button"
          size="lg"
          onClick={handleSubmit}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3 text-lg"
        >
          Continue to Promotion
        </Button>
      </div>
    </div>
  );
};

export default SalonAssetsSection;
