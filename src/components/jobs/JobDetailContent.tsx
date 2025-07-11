
import React from 'react';
import { Job } from '@/types/job';
import { useAuth } from "@/context/auth";
import AuthAction from "@/components/common/AuthAction";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, DollarSign, Phone, Mail, User, LockIcon } from "lucide-react";

interface JobDetailContentProps {
  job: Job | null;
}

const JobDetailContent = ({ job }: JobDetailContentProps) => {
  const { isSignedIn } = useAuth();

  if (!job) {
    return (
      <div className="container mx-auto py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <p className="text-gray-600">The job you're looking for could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-600">
            {job.company && (
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>{job.company}</span>
              </div>
            )}
            {job.location && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{job.location}</span>
              </div>
            )}
            {job.created_at && (
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>

            {/* ENHANCED Image Gallery Section - ALL paid job photos display */}
        {(() => {
          const jobAny = job as any;
          let jobImages: string[] = [];

          console.log('🔍 [JOB-DETAIL-MODAL] Analyzing job for photos:', {
            jobId: job.id,
            pricing_tier: job.pricing_tier,
            'metadata.photos': jobAny.metadata?.photos,
            'metadata.image_urls': jobAny.metadata?.image_urls,
            'image_urls': jobAny.image_urls,
            'photos': jobAny.photos,
            'image_url': job.image_url
          });

          // PRIORITY 1: Check metadata.photos (webhook processed jobs)
          if (jobAny.metadata?.photos && Array.isArray(jobAny.metadata.photos)) {
            const validUrls = jobAny.metadata.photos.filter((url: any) => 
              url && typeof url === 'string' && url.trim() && url !== 'photos-uploaded' && url.startsWith('http')
            );
            if (validUrls.length > 0) {
              jobImages = validUrls;
              console.log('🔍 [JOB-DETAIL-MODAL] Using metadata.photos:', jobImages.length, 'images');
            }
          }

          // PRIORITY 2: Check metadata.image_urls (webhook processed jobs)
          if (jobImages.length === 0 && jobAny.metadata?.image_urls && Array.isArray(jobAny.metadata.image_urls)) {
            const validUrls = jobAny.metadata.image_urls.filter((url: any) => 
              url && typeof url === 'string' && url.trim() && url !== 'photos-uploaded' && url.startsWith('http')
            );
            if (validUrls.length > 0) {
              jobImages = validUrls;
              console.log('🔍 [JOB-DETAIL-MODAL] Using metadata.image_urls:', jobImages.length, 'images');
            }
          }

          // PRIORITY 3: Check direct image_urls field
          if (jobImages.length === 0 && jobAny.image_urls && Array.isArray(jobAny.image_urls)) {
            const validUrls = jobAny.image_urls.filter((url: any) => 
              url && typeof url === 'string' && url.trim() && url !== 'photos-uploaded' && url.startsWith('http')
            );
            if (validUrls.length > 0) {
              jobImages = validUrls;
              console.log('🔍 [JOB-DETAIL-MODAL] Using direct image_urls:', jobImages.length, 'images');
            }
          }
          
          // PRIORITY 4: Check direct photos field 
          if (jobImages.length === 0 && jobAny.photos && Array.isArray(jobAny.photos)) {
            const validUrls = jobAny.photos.filter((url: any) => 
              url && typeof url === 'string' && url.trim() && url !== 'photos-uploaded' && url.startsWith('http')
            );
            if (validUrls.length > 0) {
              jobImages = validUrls;
              console.log('🔍 [JOB-DETAIL-MODAL] Using direct photos:', jobImages.length, 'images');
            }
          }
          
          // PRIORITY 5: Check single image_url (backwards compatibility)
          if (jobImages.length === 0 && job.image_url && typeof job.image_url === 'string' && job.image_url.trim() && job.image_url.startsWith('http')) {
            jobImages = [job.image_url];
            console.log('🔍 [JOB-DETAIL-MODAL] Using single image_url:', jobImages[0]);
          }

          console.log('🔍 [JOB-DETAIL-MODAL] Final images array:', jobImages);

          if (jobImages.length === 0) {
            console.log('⚠️ [JOB-DETAIL-MODAL] No valid images found for display');
            return null;
          }

          return (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">📸 Job Photos ({jobImages.length})</h3>
              {jobImages.length === 1 ? (
                // Single image display
                <div className="text-center">
                  <img
                    src={jobImages[0]}
                    alt={job.title}
                    className="w-full max-w-2xl h-64 object-cover rounded-lg shadow-md mx-auto"
                    onError={(e) => {
                      console.error('❌ [JOB-DETAIL-MODAL] Image failed to load:', jobImages[0]);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              ) : (
                // Multiple images gallery with improved layout
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {jobImages.map((imageUrl, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={imageUrl}
                          alt={`${job.title} - Photo ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg shadow-md cursor-pointer hover:opacity-90 transition-all duration-200 group-hover:shadow-lg"
                          onError={(e) => {
                            console.error('❌ [JOB-DETAIL-MODAL] Gallery image failed to load:', imageUrl);
                            e.currentTarget.style.display = 'none';
                          }}
                          onClick={() => {
                            // Open image in new tab for full-size viewing
                            window.open(imageUrl, '_blank');
                          }}
                        />
                        <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-sm">
                          {index + 1} of {jobImages.length}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 text-center">
                    💡 Click any photo to view full size
                  </p>
                </div>
              )}
            </div>
          );
        })()}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description with Vietnamese support */}
            {(job.vietnamese_description || job.description) && (
              <Card>
                <CardHeader>
                  <CardTitle>Job Description</CardTitle>
                </CardHeader>
                <CardContent>
                  {job.category === 'Nail Tech' && job.vietnamese_description ? (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Tiếng Việt:</h4>
                        <p className="text-gray-700 whitespace-pre-wrap">{job.vietnamese_description}</p>
                      </div>
                      {job.description && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">English:</h4>
                          <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {job.description && (
                        <div>
                          {job.vietnamese_description && (
                            <h4 className="font-medium text-gray-900 mb-2">English:</h4>
                          )}
                          <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
                        </div>
                      )}
                      {job.vietnamese_description && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Tiếng Việt:</h4>
                          <p className="text-gray-700 whitespace-pre-wrap">{job.vietnamese_description}</p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    {Array.isArray(job.requirements) ? (
                      job.requirements.map((requirement, index) => (
                        <li key={index} className="text-gray-700">{requirement}</li>
                      ))
                    ) : (
                      <li className="text-gray-700">{job.requirements}</li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    {Array.isArray(job.benefits) ? (
                      job.benefits.map((benefit, index) => (
                        <li key={index} className="text-gray-700">{benefit}</li>
                      ))
                    ) : (
                      <li className="text-gray-700">{job.benefits}</li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Specialties */}
            {job.specialties && job.specialties.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Specialties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(job.specialties) ? (
                      job.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary">{specialty}</Badge>
                      ))
                    ) : (
                      <Badge variant="secondary">{job.specialties}</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Compensation */}
            {(job.salary_range || job.compensation_details || job.price) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Compensation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-green-600">
                    {job.salary_range || job.compensation_details || job.price}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Employment Type */}
            {job.employment_type && (
              <Card>
                <CardHeader>
                  <CardTitle>Employment Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="capitalize">
                    {job.employment_type.replace('-', ' ')}
                  </Badge>
                </CardContent>
              </Card>
            )}

            {/* Contact Information - Gated */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                 {isSignedIn ? (
                  (() => {
                    const jobAny = job as any;
                    let contactInfo = null;

                    // Priority 1: Check metadata.contact_info (webhook processed)
                    if (jobAny.metadata?.contact_info && typeof jobAny.metadata.contact_info === 'object') {
                      contactInfo = jobAny.metadata.contact_info;
                      console.log('🔍 [JOB-DETAIL-MODAL] Using metadata contact info:', contactInfo);
                    }
                    // Priority 2: Check direct contact_info field
                    else if (job.contact_info && typeof job.contact_info === 'object') {
                      contactInfo = job.contact_info;
                      console.log('🔍 [JOB-DETAIL-MODAL] Using direct contact info:', contactInfo);
                    }

                    if (!contactInfo) {
                      console.log('⚠️ [JOB-DETAIL-MODAL] No contact info found');
                      return (
                        <div className="text-center py-4">
                          <p className="text-gray-500 text-sm">Contact information not available</p>
                        </div>
                      );
                    }

                    return (
                      <div className="space-y-3">
                        {contactInfo.salon_name && (
                          <div>
                            <span className="font-medium text-gray-600">Salon:</span>
                            <p className="text-gray-900 font-medium">{contactInfo.salon_name}</p>
                          </div>
                        )}
                        {contactInfo.owner_name && (
                          <div>
                            <span className="font-medium text-gray-600">Contact Person:</span>
                            <p className="text-gray-900">{contactInfo.owner_name}</p>
                          </div>
                        )}
                        {contactInfo.phone && (
                          <div>
                            <span className="font-medium text-gray-600">Phone:</span>
                            <p className="text-gray-900">
                              <a href={`tel:${contactInfo.phone}`} className="hover:text-blue-600 transition-colors">
                                {contactInfo.phone}
                              </a>
                            </p>
                          </div>
                        )}
                        {contactInfo.email && (
                          <div>
                            <span className="font-medium text-gray-600">Email:</span>
                            <p className="text-gray-900">
                              <a href={`mailto:${contactInfo.email}`} className="hover:text-blue-600 transition-colors">
                                {contactInfo.email}
                              </a>
                            </p>
                          </div>
                        )}
                        {contactInfo.notes && (
                          <div>
                            <span className="font-medium text-gray-600">Notes:</span>
                            <p className="text-gray-700 text-sm">{contactInfo.notes}</p>
                          </div>
                        )}
                      </div>
                    );
                  })()
                ) : (
                  <AuthAction
                    customTitle="Sign in to see contact details"
                    onAction={() => true}
                    fallbackContent={
                      <div className="text-center py-4">
                        <LockIcon className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-500 text-sm">
                          Sign in to view contact information
                        </p>
                      </div>
                    }
                  />
                )}
              </CardContent>
            </Card>

            {/* Featured Badge */}
            {(job.is_featured || job.featured) && (
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Badge className="bg-yellow-500 text-white">
                      ⭐ Featured Listing
                    </Badge>
                    {job.featured_text && (
                      <p className="text-sm text-gray-600 mt-2">{job.featured_text}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailContent;
