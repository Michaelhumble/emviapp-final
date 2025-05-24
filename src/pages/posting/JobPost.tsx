import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Crown, Star, Zap, Users, Clock, Shield, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import JobTemplateSelector from '@/components/legacy-job-templates/JobTemplateSelector';
import JobForm from '@/components/posting/job/JobForm';
import { useStripe } from '@/hooks/useStripe';
import { jobPricingOptions, calculateJobPostPrice } from '@/utils/posting/jobPricing';
import { PricingOptions, JobPricingOption } from '@/utils/posting/types';

interface FeatureItemProps {
  icon: React.ReactNode;
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, text }) => (
  <li className="flex items-center space-x-2">
    {icon}
    <span>{text}</span>
  </li>
);

const PricingCard: React.FC<{ option: JobPricingOption; isSelected: boolean; onSelect: (tier: string) => void }> = ({ option, isSelected, onSelect }) => {
  return (
    <Card
      className={`p-4 border-2 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-200 ${isSelected ? 'border-purple-500' : 'border-gray-200'}`}
      onClick={() => onSelect(option.tier)}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{option.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <span className="text-2xl font-bold">${option.price}</span>/month
        </div>
        <ul className="list-disc pl-5 space-y-2">
          {option.features?.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const PremiumPricingTable: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<string>('standard');
  const [durationMonths, setDurationMonths] = useState<number>(1);
  const [autoRenew, setAutoRenew] = useState<boolean>(false);
  const [isNationwide, setIsNationwide] = useState<boolean>(false);
  const [jobData, setJobData] = useState<any>(null); // Placeholder for job data

  const handleTierSelect = (tier: string) => {
    setSelectedTier(tier);
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDurationMonths(parseInt(event.target.value));
  };

  const handleAutoRenewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAutoRenew(event.target.checked);
  };

  const handleNationwideChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsNationwide(event.target.checked);
  };

  const pricingOptions: PricingOptions = {
    selectedPricingTier: selectedTier as any,
    durationMonths: durationMonths,
    autoRenew: autoRenew,
    isNationwide: isNationwide,
    jobData: jobData
  };

  const { originalPrice, finalPrice, discountPercentage } = calculateJobPostPrice(pricingOptions);
  const { isLoading, initiatePayment } = useStripe();
  const navigate = useNavigate();

  const handlePayment = async () => {
    const success = await initiatePayment(pricingOptions);
    if (success) {
      // Optionally, navigate or show a success message
      toast.success('Payment initiated successfully!');
      navigate('/post-success');
    } else {
      toast.error('Payment failed. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg rounded-md">
        <CardHeader className="p-6">
          <CardTitle className="text-2xl font-bold">Choose Your Premium Plan</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {jobPricingOptions.map((option) => (
              <PricingCard
                key={option.id}
                option={option}
                isSelected={selectedTier === option.tier}
                onSelect={handleTierSelect}
              />
            ))}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Duration (Months)</label>
            <select
              value={durationMonths}
              onChange={handleDurationChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="1">1 Month</option>
              <option value="3">3 Months</option>
              <option value="6">6 Months</option>
              <option value="12">12 Months</option>
            </select>
          </div>

          <div className="flex items-center mb-4">
            <input
              id="autoRenew"
              type="checkbox"
              checked={autoRenew}
              onChange={handleAutoRenewChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="autoRenew" className="ml-2 block text-sm text-gray-900">
              Auto-Renew
            </label>
          </div>

          <div className="flex items-center mb-6">
            <input
              id="isNationwide"
              type="checkbox"
              checked={isNationwide}
              onChange={handleNationwideChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="isNationwide" className="ml-2 block text-sm text-gray-900">
              Nationwide
            </label>
          </div>

          <div className="mb-6">
            <Separator />
          </div>

          <div className="mb-4">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-700">Original Price:</span>
              <span className="text-sm font-medium text-gray-700">${originalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-700">Discount:</span>
              <span className="text-sm font-medium text-green-500">-{discountPercentage}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg font-bold text-gray-900">Final Price:</span>
              <span className="text-lg font-bold text-gray-900">${finalPrice.toFixed(2)}</span>
            </div>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 rounded-md shadow-md transition-colors duration-200"
            onClick={handlePayment}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Proceed to Payment'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const JobPost: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'template' | 'form' | 'pricing'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const navigate = useNavigate();
  const { isLoading, initiatePayment } = useStripe();

  const handleTemplateSelect = (template: any) => {
    console.log('Template selected:', template);
    setSelectedTemplate(template);
    setCurrentStep('form');
  };

  const renderTemplateSelector = () => (
    <div className="max-w-4xl mx-auto">
      <JobTemplateSelector 
        onTemplateSelect={handleTemplateSelect}
        isSubmitting={false}
      />
    </div>
  );

  const renderJobForm = () => (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep('template')}
          className="mb-4"
        >
          ← Back to Templates
        </Button>
        <h2 className="text-2xl font-bold mb-2">Complete Your Job Details</h2>
        <p className="text-gray-600">Fill out the information below to create your job posting</p>
      </div>
      
      <JobForm />
      
      <div className="mt-8 flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep('template')}
        >
          Back
        </Button>
        <Button 
          onClick={() => setCurrentStep('pricing')}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
        >
          Continue to Pricing
        </Button>
      </div>
    </div>
  );

  const renderPricingTable = () => (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep('form')}
          className="mb-4"
        >
          ← Back to Job Form
        </Button>
        <h2 className="text-2xl font-bold mb-2">Choose Your Premium Plan</h2>
        <p className="text-gray-600">Select a pricing tier and options to enhance your job posting</p>
      </div>
      
      <PremiumPricingTable />
    </div>
  );

  const renderContent = () => {
    switch (currentStep) {
      case 'template':
        return renderTemplateSelector();
      case 'form':
        return renderJobForm();
      case 'pricing':
        return renderPricingTable();
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default JobPost;
