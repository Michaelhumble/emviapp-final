
import React from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { JobSummary } from './card-sections/JobSummary';
import { PricingProvider } from '@/context/pricing/PricingProvider';
import { PricingOptions } from '@/utils/posting/types';
import { JobPricingTier } from '@/utils/posting/types';

interface JobDetailModalProps {
  job: any; // Replace with actual Job type
  isOpen: boolean;
  onClose: () => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({ job, isOpen, onClose }) => {
  // Ensure we have valid job data before rendering
  if (!job) return null;

  // Create default pricing options based on the job's pricing tier
  // Ensure all required fields are defined with fallbacks
  const defaultPricingOptions: PricingOptions = {
    selectedPricingTier: (job.pricingTier as JobPricingTier) || 'free',
    durationMonths: job.durationMonths || 1,
    autoRenew: job.autoRenew !== undefined ? job.autoRenew : true,
    isFirstPost: job.isFirstPost !== undefined ? job.isFirstPost : false,
    isNationwide: job.isNationwide !== undefined ? job.isNationwide : false
  };

  // Log the options being used to help with debugging
  console.log('Job Detail Modal - PricingProvider Options:', defaultPricingOptions);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50">
        <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl p-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          {/* Ensure PricingProvider has valid options */}
          <PricingProvider initialOptions={defaultPricingOptions}>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">{job.title}</h2>
                <p className="text-gray-600">{job.company} • {job.location}</p>
                
                <JobSummary 
                  employmentType={job.employmentType || "Full-time"}
                  salaryRange={job.salaryRange}
                  createdAt={job.created_at || new Date()}
                  pricingTier={job.pricingTier}
                />
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: job.description }} />
              </div>
              
              {job.salon_features && job.salon_features.length > 0 && (
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold mb-2">Salon Features</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {job.salon_features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <span className="mr-2 text-green-500">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {job.contact_info && (
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                  <div className="space-y-1">
                    {job.contact_info.owner_name && (
                      <p><span className="font-medium">Contact:</span> {job.contact_info.owner_name}</p>
                    )}
                    {job.contact_info.phone && (
                      <p><span className="font-medium">Phone:</span> {job.contact_info.phone}</p>
                    )}
                    {job.contact_info.email && (
                      <p><span className="font-medium">Email:</span> {job.contact_info.email}</p>
                    )}
                  </div>
                </div>
              )}
              
              <div className="border-t pt-4 flex justify-end">
                <Button onClick={onClose} variant="outline" className="mr-2">
                  Close
                </Button>
                <Button>
                  Apply Now
                </Button>
              </div>
            </div>
          </PricingProvider>
        </div>
      </div>
    </Dialog>
  );
};
