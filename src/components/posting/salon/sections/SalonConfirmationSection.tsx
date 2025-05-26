
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ConfettiExplosion from '@/components/ui/ConfettiExplosion';

interface SalonConfirmationSectionProps {
  data: any;
  formData: any;
  onSubmit: (data: any) => void;
  onPrevious: () => void;
  isSubmitting: boolean;
}

const SalonConfirmationSection = ({ data, formData, onSubmit, onPrevious, isSubmitting }: SalonConfirmationSectionProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = () => {
    setShowConfetti(true);
    onSubmit({ askingPrice: '500000', ...formData });
  };

  return (
    <div className="space-y-8">
      {showConfetti && <ConfettiExplosion />}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-full">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
          Review Your Premium Listing
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Almost done! Review your information and launch your premium salon listing.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-8">
            <div className="text-center">
              <Sparkles className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-900 mb-2">
                🎉 Your Premium Listing is Ready!
              </h3>
              <p className="text-green-700 mb-6">
                You've created a comprehensive, professional salon listing that will attract serious buyers.
              </p>
              
              <div className="space-y-4 text-left">
                <div className="flex justify-between">
                  <span className="font-medium">Salon Name:</span>
                  <span>{formData?.identity?.salonName || 'Not provided'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Business Type:</span>
                  <span>{formData?.identity?.businessType || 'Not provided'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Location:</span>
                  <span>{formData?.location?.city || 'Not provided'}, {formData?.location?.state || ''}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Photos:</span>
                  <span>{formData?.photos?.photos?.length || 0} uploaded</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="flex justify-between pt-6">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onPrevious}
          className="px-8 py-3"
          disabled={isSubmitting}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          type="button"
          size="lg"
          onClick={handleSubmit}
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-3 text-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Publishing...' : 'Publish Premium Listing'}
        </Button>
      </div>
    </div>
  );
};

export default SalonConfirmationSection;
