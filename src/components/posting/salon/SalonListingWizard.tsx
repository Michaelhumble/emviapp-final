import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SalonDetailsStep from './steps/SalonDetailsStep';
import SalonLocationStep from './steps/SalonLocationStep';
import SalonPhotoUpload from './SalonPostPhotoUpload';
import SalonPricingStep from './steps/SalonPricingStep';

interface Step {
  id: number;
  label: string;
  component: React.ComponentType<any>;
}

const steps: Step[] = [
  { id: 1, label: 'Details', component: SalonDetailsStep },
  { id: 2, label: 'Location', component: SalonLocationStep },
  { id: 3, label: 'Photos', component: SalonPhotoUpload },
  { id: 4, label: 'Pricing', component: SalonPricingStep },
];

const SalonListingWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [salonDetails, setSalonDetails] = useState({});
  const [salonLocation, setSalonLocation] = useState({});
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [salonPricing, setSalonPricing] = useState({});

  const totalSteps = steps.length;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setProgress((currentStep / totalSteps) * 100);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setProgress(((currentStep - 2) / totalSteps) * 100);
    }
  };

  const CurrentStepComponent = steps.find(step => step.id === currentStep)?.component || (() => <p>No step found</p>);

  return (
    <div className="container mx-auto py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden"
      >
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Post a Salon Listing</h2>
          <Progress value={progress} className="mb-4" />

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && <SalonDetailsStep salonDetails={salonDetails} setSalonDetails={setSalonDetails} />}
              {currentStep === 2 && <SalonLocationStep salonLocation={salonLocation} setSalonLocation={setSalonLocation} />}
              {currentStep === 3 && <SalonPhotoUpload photoUploads={photoUploads} setPhotoUploads={setPhotoUploads} />}
              {currentStep === 4 && <SalonPricingStep salonPricing={salonPricing} setSalonPricing={setSalonPricing} />}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button onClick={nextStep} disabled={currentStep === totalSteps}>
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default SalonListingWizard;
