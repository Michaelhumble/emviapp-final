
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SalonPerformanceSectionProps {
  data: any;
  onSubmit: (data: any) => void;
  onPrevious: () => void;
}

const SalonPerformanceSection = ({ data, onSubmit, onPrevious }: SalonPerformanceSectionProps) => {
  const handleSubmit = () => {
    onSubmit({ performance: { placeholder: 'data' } });
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-full">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
          Business Performance Metrics
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Share your salon's financial performance to attract serious buyers.
        </p>
      </motion.div>

      <div className="bg-gray-100 p-8 rounded-lg text-center">
        <p className="text-gray-600 mb-4">Performance section coming soon...</p>
        <p className="text-sm text-gray-500">
          This will include revenue fields, client metrics, and privacy controls.
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
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 text-lg"
        >
          Continue to Assets
        </Button>
      </div>
    </div>
  );
};

export default SalonPerformanceSection;
