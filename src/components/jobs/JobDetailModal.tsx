import React, { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Phone, Mail, Calendar, ChevronLeft, ChevronRight, DollarSign, MapPin, Building, User, FileText } from 'lucide-react';
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
    photos: job.photos,
    expires_at: job.expires_at,
    pricing_tier: job.pricing_tier,
    created_at: job.created_at
  });

  // 🔍 DEBUG: Specifically log contact info extraction
  console.log('🔍 [JOB-DETAIL-MODAL] Contact info breakdown:', {
    rawContactInfo: job.contact_info,
    ownerName: job.contact_info?.owner_name,
    phone: job.contact_info?.phone,
    email: job.contact_info?.email,
    typeof: typeof job.contact_info
  });

  // Get job images (support for multiple photos)
  const getJobImages = () => {
    console.log('🔍 [JOB-DETAIL-MODAL] Getting job images from:', {
      image_urls: job.image_urls,
      photos: job.photos,
      image_url: job.image_url,
      metadata: job.metadata
    });

    // Check metadata for photos first (webhook processed jobs)
    if (job.metadata?.photos && Array.isArray(job.metadata.photos)) {
      const validUrls = job.metadata.photos.filter(url => 
        url && typeof url === 'string' && url.trim() && url !== 'photos-uploaded'
      );
      console.log('🔍 [JOB-DETAIL-MODAL] Found metadata photos:', validUrls);
      if (validUrls.length > 0) return validUrls;
    }

    // Check metadata for image_urls (webhook processed jobs)
    if (job.metadata?.image_urls && Array.isArray(job.metadata.image_urls)) {
      const validUrls = job.metadata.image_urls.filter(url => 
        url && typeof url === 'string' && url.trim() && url !== 'photos-uploaded'
      );
      console.log('🔍 [JOB-DETAIL-MODAL] Found metadata image_urls:', validUrls);
      if (validUrls.length > 0) return validUrls;
    }

    // Check for multiple uploaded images first (new format)
    if (job.image_urls && Array.isArray(job.image_urls) && job.image_urls.length > 0) {
      const validUrls = job.image_urls.filter(url => url && typeof url === 'string' && url.trim() && url !== 'photos-uploaded');
      console.log('🔍 [JOB-DETAIL-MODAL] Found image_urls:', validUrls);
      if (validUrls.length > 0) return validUrls;
    }
    
    // Check photos field (backup format)
    if (job.photos && Array.isArray(job.photos) && job.photos.length > 0) {
      const validUrls = job.photos.filter(url => url && typeof url === 'string' && url.trim() && url !== 'photos-uploaded');
      console.log('🔍 [JOB-DETAIL-MODAL] Found photos:', validUrls);
      if (validUrls.length > 0) return validUrls;
    }
    
    // Check for single uploaded image (backwards compatibility)
    const uploadedImage = job.image_url || job.imageUrl || job.image;
    if (uploadedImage && typeof uploadedImage === 'string' && uploadedImage.trim()) {
      console.log('🔍 [JOB-DETAIL-MODAL] Found single image:', uploadedImage);
      return [uploadedImage];
    }
    
    console.log('🔍 [JOB-DETAIL-MODAL] No valid images found');
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
                </div>

                {/* Salary and Location Boxes - Matching Reference Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Weekly Salary Box */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                      <h3 className="font-semibold text-green-800">Weekly Salary</h3>
                    </div>
                    <p className="text-2xl font-bold text-green-700">
                      {job.compensation_details || job.salary_range || job.salaryRange || "Contact for details"}
                    </p>
                  </div>

                  {/* Location Box */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                      <h3 className="font-semibold text-blue-800">Location</h3>
                    </div>
                    <p className="text-2xl font-bold text-blue-700">{job.location || "Location not specified"}</p>
                  </div>
                </div>

                {/* Contact Information - MOVED UP to appear right after salary/location */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center mb-3">
                    <Phone className="h-5 w-5 text-green-600 mr-2" />
                    <h3 className="font-semibold text-green-800">Contact Information</h3>
                  </div>
                  
                  {isSignedIn ? (
                    (() => {
                      // Enhanced contact info extraction with extensive fallbacks
                      const jobAny = job as any;
                      let contactInfo: any = null;

                      // Priority 1: metadata.contact_info (new format)
                      if (jobAny.metadata?.contact_info && typeof jobAny.metadata.contact_info === 'object') {
                        contactInfo = jobAny.metadata.contact_info;
                      }
                      // Priority 2: root contact_info field
                      else if (job.contact_info && typeof job.contact_info === 'object') {
                        contactInfo = job.contact_info;
                      }
                      // Priority 3: Build from root fields (fallback for old jobs)
                      else {
                        const fallbackContact: any = {};
                        
                        // Check various possible root field names
                        if (jobAny.phone) fallbackContact.phone = jobAny.phone;
                        if (jobAny.email) fallbackContact.email = jobAny.email;
                        if (jobAny.salon_name) fallbackContact.salon_name = jobAny.salon_name;
                        if (jobAny.owner_name) fallbackContact.owner_name = jobAny.owner_name;
                        if (jobAny.contact_name) fallbackContact.owner_name = jobAny.contact_name;
                        if (jobAny.company) fallbackContact.salon_name = jobAny.company;
                        if (jobAny.business_name) fallbackContact.salon_name = jobAny.business_name;
                        if (jobAny.contact_phone) fallbackContact.phone = jobAny.contact_phone;
                        if (jobAny.contact_email) fallbackContact.email = jobAny.contact_email;
                        
                        // Also check metadata for individual fields
                        if (jobAny.metadata?.phone) fallbackContact.phone = jobAny.metadata.phone;
                        if (jobAny.metadata?.email) fallbackContact.email = jobAny.metadata.email;
                        if (jobAny.metadata?.salon_name) fallbackContact.salon_name = jobAny.metadata.salon_name;
                        if (jobAny.metadata?.owner_name) fallbackContact.owner_name = jobAny.metadata.owner_name;
                        
                        // Use fallback if we found any contact fields
                        if (Object.keys(fallbackContact).length > 0) {
                          contactInfo = fallbackContact;
                        }
                      }

                      if (!contactInfo) {
                        return (
                          <div className="text-center py-4">
                            <p className="text-gray-500 text-sm">Contact information not available</p>
                          </div>
                        );
                      }

                      return (
                        <div className="space-y-3">
                          {contactInfo.phone && (
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 text-green-600 mr-2" />
                              <span className="text-lg font-semibold text-green-800">
                                {contactInfo.phone}
                              </span>
                            </div>
                          )}
                          {contactInfo.email && (
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 text-green-600 mr-2" />
                              <span className="text-green-800">
                                <a href={`mailto:${contactInfo.email}`} className="hover:underline">
                                  {contactInfo.email}
                                </a>
                              </span>
                            </div>
                          )}
                          {contactInfo.salon_name && (
                            <div className="flex items-center">
                              <Building className="h-4 w-4 text-green-600 mr-2" />
                              <span className="font-medium text-green-800">{contactInfo.salon_name}</span>
                            </div>
                          )}
                          {contactInfo.owner_name && (
                            <div className="flex items-center">
                              <User className="h-4 w-4 text-green-600 mr-2" />
                              <span className="text-green-800">{contactInfo.owner_name}</span>
                            </div>
                          )}
                          
                          {/* Success message matching reference */}
                          <div className="flex items-center mt-3 text-green-700">
                            <span className="text-green-600 mr-2">✓</span>
                            <span className="text-sm font-medium">Contact details unlocked! Call now to apply.</span>
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    <PremiumContactGate 
                      contactName={job.metadata?.contact_info?.owner_name || job.contact_info?.owner_name}
                      contactPhone={job.metadata?.contact_info?.phone || job.contact_info?.phone}
                      contactEmail={job.metadata?.contact_info?.email || job.contact_info?.email}
                    />
                  )}
                </div>

                {/* Job Description - Now appears AFTER contact info */}
                <div className="border-t pt-6 mb-6">
                  <div className="flex items-center mb-4">
                    <FileText className="h-5 w-5 text-gray-600 mr-2" />
                    <h3 className="text-lg font-semibold">Job Description</h3>
                  </div>
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