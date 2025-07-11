import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, DollarSign, User, MessageSquare } from "lucide-react";
import { useAuth } from "@/context/auth";
import AuthAction from "@/components/common/AuthAction";
import { getIndustryFallbackImage } from "@/utils/jobImageValidation";

interface Job {
  id: string;
  title: string;
  vietnamese_title?: string;
  description?: string;
  vietnamese_description?: string;
  location?: string;
  compensation_details?: string;
  category: string;
  pricing_tier?: string;
  metadata?: any;
  contact_info?: any;
  photos?: string[];
  image_urls?: string[];
  image_url?: string;
  [key: string]: any;
}

interface PremiumJobModalProps {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PremiumJobModal = ({ job, open, onOpenChange }: PremiumJobModalProps) => {
  const { isSignedIn } = useAuth();

  if (!job) return null;

  // Helper function to get job photos with fallback system
  const getJobPhotos = (job: Job): string[] => {
    const allPhotos: string[] = [];

    // Collect photos from all possible sources
    const photoSources = [
      job.metadata?.photos,
      job.metadata?.image_urls,
      job.image_urls,
      job.photos,
      job.image_url ? [job.image_url] : null
    ];

    for (const source of photoSources) {
      if (Array.isArray(source)) {
        const validUrls = source.filter((url: any) => 
          url && typeof url === 'string' && url.trim() && 
          url !== 'photos-uploaded' && url.startsWith('http')
        );
        allPhotos.push(...validUrls);
      }
    }

    // Remove duplicates
    const uniquePhotos = [...new Set(allPhotos)];

    // For paid jobs: if no real photos, use industry-specific mockups
    if (uniquePhotos.length === 0 && job.pricing_tier && job.pricing_tier !== 'free') {
      const fallbackImage = getIndustryFallbackImage(job.category);
      return [fallbackImage];
    }

    return uniquePhotos;
  };

  // Helper function to get contact information
  const getContactInfo = (job: Job) => {
    // Priority 1: metadata.contact_info (new format)
    if (job.metadata?.contact_info && typeof job.metadata.contact_info === 'object') {
      return job.metadata.contact_info;
    }
    
    // Priority 2: root contact_info field
    if (job.contact_info && typeof job.contact_info === 'object') {
      return job.contact_info;
    }
    
    // Priority 3: Build from root fields (fallback for old jobs)
    const fallbackContact: any = {};
    
    // Check various possible root field names
    if (job.phone) fallbackContact.phone = job.phone;
    if (job.email) fallbackContact.email = job.email;
    if (job.salon_name) fallbackContact.salon_name = job.salon_name;
    if (job.owner_name) fallbackContact.owner_name = job.owner_name;
    if (job.contact_name) fallbackContact.owner_name = job.contact_name;
    if (job.company) fallbackContact.salon_name = job.company;
    if (job.business_name) fallbackContact.salon_name = job.business_name;
    if (job.contact_phone) fallbackContact.phone = job.contact_phone;
    if (job.contact_email) fallbackContact.email = job.contact_email;
    
    // Also check metadata for individual fields
    if (job.metadata?.phone) fallbackContact.phone = job.metadata.phone;
    if (job.metadata?.email) fallbackContact.email = job.metadata.email;
    if (job.metadata?.salon_name) fallbackContact.salon_name = job.metadata.salon_name;
    if (job.metadata?.owner_name) fallbackContact.owner_name = job.metadata.owner_name;
    
    // Use fallback if we found any contact fields
    if (Object.keys(fallbackContact).length > 0) {
      return fallbackContact;
    }
    
    return null;
  };

  const photos = getJobPhotos(job);
  const contactInfo = getContactInfo(job);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[95vh] overflow-y-auto p-0">
        <div className="relative">
          {/* Header with close button */}
          <DialogHeader className="relative px-6 pt-6 pb-4">
            <DialogTitle className="text-2xl font-serif text-center pr-8">
              {job.title}
            </DialogTitle>
            {job.vietnamese_title && (
              <p className="text-lg text-gray-600 italic text-center">{job.vietnamese_title}</p>
            )}
            {contactInfo?.salon_name && (
              <p className="text-lg font-semibold text-gray-800 text-center">{contactInfo.salon_name}</p>
            )}
          </DialogHeader>

          <div className="px-6 pb-6 space-y-6">
            {/* Photo Gallery at the Top */}
            {photos.length > 0 && (
              <div className="w-full">
                {photos.length === 1 ? (
                  <img 
                    src={photos[0]} 
                    alt={job.title} 
                    className="w-full h-80 object-cover rounded-lg"
                    onError={(e) => {
                      // If fallback image fails, hide it
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="space-y-4">
                    <img 
                      src={photos[0]} 
                      alt={job.title} 
                      className="w-full h-80 object-cover rounded-lg"
                    />
                    {photos.length > 1 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {photos.slice(1, 5).map((photo, index) => (
                          <img 
                            key={index}
                            src={photo} 
                            alt={`${job.title} - Photo ${index + 2}`} 
                            className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => window.open(photo, '_blank')}
                          />
                        ))}
                      </div>
                    )}
                    {photos.length > 5 && (
                      <p className="text-sm text-gray-500 text-center">
                        +{photos.length - 5} more photos - Click to view
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Salary and Location in Colored Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-300 rounded-lg p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <DollarSign className="h-6 w-6 text-green-600 mr-2" />
                  <h3 className="text-lg font-semibold text-green-800">Compensation</h3>
                </div>
                <p className="text-2xl font-bold text-green-700">
                  {job.compensation_details || job.salary_range || 'Negotiable'}
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-300 rounded-lg p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <MapPin className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-blue-800">Location</h3>
                </div>
                <p className="text-2xl font-bold text-blue-700">
                  {job.location || 'Not specified'}
                </p>
              </div>
            </div>

            {/* Contact Information Block - Enhanced Design */}
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-300 rounded-lg p-6">
              <div className="flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-purple-600 mr-3" />
                <h3 className="text-xl font-semibold text-purple-800">Contact Information</h3>
              </div>
              
              {isSignedIn ? (
                contactInfo ? (
                  <div className="space-y-4">
                    {contactInfo.salon_name && (
                      <div className="bg-white/70 rounded-lg p-4 text-center">
                        <div className="flex items-center justify-center mb-2">
                          <User className="h-5 w-5 text-purple-600 mr-2" />
                          <span className="text-sm font-medium text-purple-700">Business Name</span>
                        </div>
                        <p className="text-xl font-bold text-purple-800">{contactInfo.salon_name}</p>
                      </div>
                    )}
                    
                    {contactInfo.owner_name && (
                      <div className="bg-white/70 rounded-lg p-4 text-center">
                        <div className="flex items-center justify-center mb-2">
                          <User className="h-5 w-5 text-purple-600 mr-2" />
                          <span className="text-sm font-medium text-purple-700">Contact Person</span>
                        </div>
                        <p className="text-xl font-bold text-purple-800">{contactInfo.owner_name}</p>
                      </div>
                    )}

                    {contactInfo.phone && (
                      <div className="bg-white/70 rounded-lg p-4 text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Phone className="h-5 w-5 text-purple-600 mr-2" />
                          <span className="text-sm font-medium text-purple-700">Phone Number</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-800">
                          <a href={`tel:${contactInfo.phone}`} className="hover:text-purple-600 transition-colors">
                            {contactInfo.phone}
                          </a>
                        </p>
                      </div>
                    )}

                    {contactInfo.email && (
                      <div className="bg-white/70 rounded-lg p-4 text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Mail className="h-5 w-5 text-purple-600 mr-2" />
                          <span className="text-sm font-medium text-purple-700">Email Address</span>
                        </div>
                        <p className="text-xl font-bold text-purple-800">
                          <a href={`mailto:${contactInfo.email}`} className="hover:text-purple-600 transition-colors">
                            {contactInfo.email}
                          </a>
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-4 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-yellow-700 text-sm font-medium">
                      ⚠️ Contact information may be available - please contact support if you need assistance reaching this employer.
                    </p>
                  </div>
                )
              ) : (
                <AuthAction
                  customTitle="Sign in to see contact details"
                  onAction={() => true}
                  fallbackContent={
                    <div className="text-center py-6">
                      <div className="bg-white/70 rounded-lg p-6">
                        <Phone className="h-12 w-12 mx-auto text-purple-400 mb-3" />
                        <p className="text-purple-700 font-medium">
                          Sign in to view contact information
                        </p>
                        <p className="text-purple-600 text-sm mt-2">
                          Connect directly with the employer
                        </p>
                      </div>
                    </div>
                  }
                />
              )}
            </div>

            {/* Job Description - Bilingual Support */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Job Description</h3>
              
              {/* Vietnamese Description - Always show if available */}
              {job.vietnamese_description && (
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                    🇻🇳 Tiếng Việt
                  </h4>
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {job.vietnamese_description}
                  </p>
                </div>
              )}
              
              {/* English Description - Only show if different from Vietnamese */}
              {job.description && job.description !== job.vietnamese_description && (
                <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                    🇺🇸 English
                  </h4>
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {job.description}
                  </p>
                </div>
              )}

              {/* Show "Not provided" only if English is missing and Vietnamese exists */}
              {job.vietnamese_description && (!job.description || job.description === job.vietnamese_description) && (
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-600 mb-3 flex items-center">
                    🇺🇸 English
                  </h4>
                  <p className="text-gray-500 italic">Not provided</p>
                </div>
              )}

              {/* Fallback for no descriptions */}
              {!job.description && !job.vietnamese_description && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-500 italic">No detailed description provided.</p>
                </div>
              )}
            </div>

            {/* Additional Information */}
            {(job.requirements || job.benefits) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {job.requirements && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Requirements</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      {Array.isArray(job.requirements) ? (
                        <ul className="list-disc list-inside space-y-1">
                          {job.requirements.map((req, index) => (
                            <li key={index} className="text-gray-700 text-sm">{req}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-700 text-sm">{job.requirements}</p>
                      )}
                    </div>
                  </div>
                )}

                {job.benefits && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Benefits</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      {Array.isArray(job.benefits) ? (
                        <ul className="list-disc list-inside space-y-1">
                          {job.benefits.map((benefit, index) => (
                            <li key={index} className="text-gray-700 text-sm">{benefit}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-700 text-sm">{job.benefits}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Sticky Apply Button */}
            <div className="sticky bottom-0 bg-white border-t pt-4">
              <div className="flex gap-3">
                <Button 
                  className="flex-1 h-12 text-lg font-semibold"
                  disabled={!isSignedIn}
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  {isSignedIn ? 'Apply Now' : 'Sign in to Apply'}
                </Button>
                {isSignedIn && contactInfo?.phone && (
                  <Button 
                    variant="outline" 
                    className="h-12 px-6"
                    onClick={() => window.open(`tel:${contactInfo.phone}`, '_self')}
                  >
                    <Phone className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumJobModal;