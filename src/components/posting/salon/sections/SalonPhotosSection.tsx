
import React from 'react';
import { motion } from 'framer-motion';
import { Camera, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SalonPhotosSectionProps {
  data: any;
  onSubmit: (data: any) => void;
  onPrevious: () => void;
}

const SalonPhotosSection = ({ data, onSubmit, onPrevious }: SalonPhotosSectionProps) => {
  const handleSubmit = () => {
    onSubmit({ photos: { photos: [], coverPhotoIndex: 0 } });
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-3 rounded-full">
            <Camera className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
          Showcase Your Salon
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          High-quality photos are essential for attracting serious buyers.
        </p>
      </motion.div>

      <div className="bg-gray-100 p-8 rounded-lg text-center">
        <p className="text-gray-600 mb-4">Photo upload section coming soon...</p>
        <p className="text-sm text-gray-500">
          This will include drag-and-drop gallery, cover photo selector, and real-time previews.
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
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3 text-lg"
        >
          Continue to About
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default SalonPhotosSection;
