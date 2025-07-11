import React, { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Phone, Mail, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { JobSummary } from './card-sections/JobSummary';
import { PricingProvider } from '@/context/pricing/PricingProvider';
import { PricingOptions } from '@/utils/posting/types';
import { JobPricingTier } from '@/utils/posting/types';
import { useAuth } from '@/context/auth';
import PremiumContactGate from '@/components/common/PremiumContactGate';
import { isJobExpired, getDaysUntilExpiration } from '@/utils/jobExpiration';

interface JobDetailModalProps {
  job: any; // Replace with actual Job type
  isOpen: boolean;
  onClose: () => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({ job, isOpen, onClose }) => {
  const { isSignedIn } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Ensure we have valid job data before rendering
  if (!job) {
    console.error('🚨 [JOB-DETAIL-MODAL] No job data provided');
    return null;
  }

  // Log the full job object for debugging
  console.log('🔍 [JOB-DETAIL-MODAL] Full job object:', {
    id: job.id,
    title: job.title,
    vietnamese_title: job.vietnamese_title,
    description: job.description,
    vietnamese_description: job.vietnamese_description,
    contact_info: job.contact_info,
    image_url: job.image_url,
    image_urls: job.image_urls,
    expires_at: job.expires_at,
    pricing_tier: job.pricing_tier,
    created_at: job.created_at
  });

  // Get job images (support for multiple photos)
  const getJobImages = () => {
    // Check for multiple uploaded images first
    if (job.image_urls && Array.isArray(job.image_urls) && job.image_urls.length > 0) {
      return job.image_urls.filter(url => url && typeof url === 'string' && url.trim());
    }
    
    // Check for single uploaded image (backwards compatibility)
    const uploadedImage = job.image_url || job.imageUrl || job.image;
    if (uploadedImage && typeof uploadedImage === 'string' && uploadedImage.trim()) {
      return [uploadedImage];
    }
    
    return [];
  };

  const jobImages = getJobImages();

  // Check expiration status
  const expired = job.expires_at ? isJobExpired(job.expires_at) : false;
  const daysUntilExpiration = job.expires_at ? getDaysUntilExpiration(job.expires_at) : null;

  // Create default pricing options based on the job's pricing tier
  const defaultPricingOptions: PricingOptions = {
    selectedPricingTier: (job.pricingTier as JobPricingTier) || 'free',
    durationMonths: job.durationMonths || 1,
    autoRenew: job.autoRenew !== undefined ? job.autoRenew : true,
    isFirstPost: job.isFirstPost !== undefined ? job.isFirstPost : false,
    isNationwide: job.isNationwide !== undefined ? job.isNationwide : false
  };

  // Handle image navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % jobImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + jobImages.length) % jobImages.length);
  };

  // Get display title and description (prioritize Vietnamese)
  const displayTitle = job.vietnamese_title || job.title || 'Untitled Job';
  const displayDescription = job.vietnamese_description || job.description || 'No description available';
  const displayCompany = job.contact_info?.salon_name || job.company || 'Company Name';

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 backdrop-blur-sm">
        <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl m-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4 z-10" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          {/* Ensure PricingProvider has valid options */}
          <PricingProvider initialOptions={defaultPricingOptions}>
            <div className="space-y-6">
              {/* Enhanced Image Gallery Section */}
              {jobImages && jobImages.length > 0 && (
                <div className="relative">
                  <img 
                    src={jobImages[currentImageIndex]}
                    alt={`${displayTitle} - Image ${currentImageIndex + 1}`}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      console.error('Modal image failed to load:', jobImages[currentImageIndex]);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  
                  {/* Image Navigation */}
                  {jobImages.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-6 w-6" />
                      </Button>
                      
                      {/* Image indicators */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {jobImages.map((_, index) => (
                          <button
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                            onClick={() => setCurrentImageIndex(index)}
                          />
                        ))}
                      </div>

                      {/* Photo count */}
                      <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                        {currentImageIndex + 1} / {jobImages.length}
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="p-6">
                {/* Job Header */}
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{displayTitle}</h2>
                  <p className="text-lg text-gray-600 mb-4">{displayCompany} • {job.location}</p>
                  
                  <JobSummary 
                    employmentType={job.employmentType || job.employment_type || "Full-time"}
                    salaryRange={job.compensation_details || job.salaryRange || "Contact for details"}
                    createdAt={job.created_at || new Date()}
                    pricingTier={job.pricing_tier || job.pricingTier}
                  />

                  {/* Expiration Status */}
                  {job.expires_at && (
                    <div className="mt-4 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      {expired ? (
                        <span className="text-sm text-red-600 font-medium">
                          ❌ Expired on {new Date(job.expires_at).toLocaleDateString()}
                        </span>
                      ) : daysUntilExpiration !== null ? (
                        <span className={`text-sm font-medium ${
                          daysUntilExpiration <= 3 ? 'text-red-600' : 
                          daysUntilExpiration <= 7 ? 'text-orange-600' : 'text-green-600'
                        }`}>
                          {daysUntilExpiration === 0 ? 'Expires today' : 
                           daysUntilExpiration === 1 ? 'Expires tomorrow' :
                           `Expires in ${daysUntilExpiration} days`}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-600">
                          Expires on {new Date(job.expires_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Job Description */}
                <div className="border-t pt-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Job Description</h3>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {displayDescription}
                    </p>
                  </div>
                </div>
                
                {/* Salon Features */}
                {job.salon_features && job.salon_features.length > 0 && (
                  <div className="border-t pt-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4">Salon Features</h3>
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
                
                {/* Enhanced Contact Information with Premium Gating */}
                <div className="border-t pt-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  
                  <PremiumContactGate 
                    contactName={job.contact_info?.owner_name}
                    contactPhone={job.contact_info?.phone}
                    contactEmail={job.contact_info?.email}
                  />
                </div>
                
                {/* Action Buttons */}
                <div className="border-t pt-6 flex justify-end space-x-3">
                  <Button onClick={onClose} variant="outline">
                    Close
                  </Button>
                  {isSignedIn && !expired && (
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                      Apply Now ✨
                    </Button>
                  )}
                  {expired && (
                    <Button disabled variant="outline">
                      Position Filled
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </PricingProvider>
        </div>
      </div>
    </Dialog>
  );
};