
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

        {/* Enhanced Image Gallery Section */}
        {(() => {
          // Get job images with priority order
          const jobAny = job as any;
          let jobImages: string[] = [];

          // Check for multiple uploaded images first (new format)
          if (jobAny.image_urls && Array.isArray(jobAny.image_urls) && jobAny.image_urls.length > 0) {
            const validUrls = jobAny.image_urls.filter((url: any) => url && typeof url === 'string' && url.trim() && url !== 'photos-uploaded');
            if (validUrls.length > 0) jobImages = validUrls;
          }
          
          // Check photos field (backup format)
          if (jobImages.length === 0 && jobAny.photos && Array.isArray(jobAny.photos) && jobAny.photos.length > 0) {
            const validUrls = jobAny.photos.filter((url: any) => url && typeof url === 'string' && url.trim() && url !== 'photos-uploaded');
            if (validUrls.length > 0) jobImages = validUrls;
          }
          
          // Check for single uploaded image (backwards compatibility)
          if (jobImages.length === 0) {
            const singleImage = job.image_url || jobAny.imageUrl || job.image;
            if (singleImage && typeof singleImage === 'string' && singleImage.trim()) {
              jobImages = [singleImage];
            }
          }

          console.log('🔍 [JOB-DETAIL-CONTENT] Found images:', jobImages);

          if (jobImages.length === 0) return null;

          return (
            <div className="mb-8">
              {jobImages.length === 1 ? (
                // Single image display
                <img
                  src={jobImages[0]}
                  alt={job.title}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    console.error('❌ [JOB-DETAIL-CONTENT] Image failed to load:', jobImages[0]);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                // Multiple images gallery
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {jobImages.map((imageUrl, index) => (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`${job.title} - Image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg shadow-md cursor-pointer hover:opacity-75 transition-opacity"
                      onError={(e) => {
                        console.error('❌ [JOB-DETAIL-CONTENT] Image failed to load:', imageUrl);
                        e.currentTarget.style.display = 'none';
                      }}
                      onClick={() => {
                        // Open image in modal or new tab for better viewing
                        window.open(imageUrl, '_blank');
                      }}
                    />
                  ))}
                </div>
              )}
              {jobImages.length > 1 && (
                <p className="text-sm text-gray-500 mt-2 text-center">
                  📸 {jobImages.length} photos - Click to view full size
                </p>
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
                  <div className="space-y-3">
                    {job.contact_info?.owner_name && (
                      <div>
                        <span className="font-medium">Contact Person:</span>
                        <p className="text-gray-700">{job.contact_info.owner_name}</p>
                      </div>
                    )}
                    {job.contact_info?.phone && (
                      <div>
                        <span className="font-medium">Phone:</span>
                        <p className="text-gray-700">{job.contact_info.phone}</p>
                      </div>
                    )}
                    {job.contact_info?.email && (
                      <div>
                        <span className="font-medium">Email:</span>
                        <p className="text-gray-700">{job.contact_info.email}</p>
                      </div>
                    )}
                  </div>
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
