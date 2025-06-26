
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building, Calendar, DollarSign, Phone, Mail, LockIcon } from 'lucide-react';
import { Job } from '@/types/job';
import { useAuth } from '@/context/auth';
import AuthAction from '@/components/common/AuthAction';

interface JobDetailContentProps {
  job: Job | null;
}

const JobDetailContent: React.FC<JobDetailContentProps> = ({ job }) => {
  const { isSignedIn } = useAuth();

  if (!job) {
    return (
      <div className="container mx-auto py-12">
        <p className="text-center text-gray-500">Job not found</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {job.pricingTier && (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-300">
                {job.pricingTier.charAt(0).toUpperCase() + job.pricingTier.slice(1)} Listing
              </Badge>
            )}
            {job.is_featured && (
              <Badge className="bg-green-500 hover:bg-green-600">
                Featured
              </Badge>
            )}
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
          
          <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
            <div className="flex items-center">
              <Building className="h-5 w-5 mr-2" />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              <span>Posted {formatDate(job.created_at)}</span>
            </div>
          </div>

          {job.salary_range && (
            <div className="flex items-center text-green-600 font-semibold">
              <DollarSign className="h-5 w-5 mr-2" />
              <span>{job.salary_range}</span>
            </div>
          )}
        </div>

        {/* Job Image */}
        {job.image && (
          <div className="mb-8">
            <img 
              src={job.image} 
              alt={job.title}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {job.description ? (
                    <div dangerouslySetInnerHTML={{ __html: job.description }} />
                  ) : (
                    <p className="text-gray-600">No description available.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    {job.requirements.map((requirement, index) => (
                      <li key={index} className="text-gray-600">{requirement}</li>
                    ))}
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
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="text-gray-600">{benefit}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information - Gated */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                {isSignedIn ? (
                  <div className="space-y-3">
                    {job.contact_info?.owner_name && (
                      <div>
                        <p className="font-medium text-gray-900">Contact Person</p>
                        <p className="text-gray-600">{job.contact_info.owner_name}</p>
                      </div>
                    )}
                    
                    {job.contact_info?.phone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-gray-600">{job.contact_info.phone}</span>
                      </div>
                    )}
                    
                    {job.contact_info?.email && (
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-gray-600">{job.contact_info.email}</span>
                      </div>
                    )}
                    
                    {!job.contact_info?.phone && !job.contact_info?.email && !job.contact_info?.owner_name && (
                      <p className="text-gray-500 italic">Contact information not available</p>
                    )}
                  </div>
                ) : (
                  <AuthAction
                    customTitle="Sign in to see contact details"
                    onAction={() => true}
                    fallbackContent={
                      <div className="text-center py-4">
                        <LockIcon className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-gray-500 mb-3">Sign in to view contact information</p>
                        <div className="text-sm text-gray-400">
                          Phone, email, and contact details are available to registered users
                        </div>
                      </div>
                    }
                  />
                )}
              </CardContent>
            </Card>

            {/* Job Details */}
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {job.employment_type && (
                  <div>
                    <p className="font-medium text-gray-900">Employment Type</p>
                    <p className="text-gray-600">{job.employment_type}</p>
                  </div>
                )}
                
                {job.compensation_details && (
                  <div>
                    <p className="font-medium text-gray-900">Compensation</p>
                    <p className="text-gray-600">{job.compensation_details}</p>
                  </div>
                )}
                
                <div>
                  <p className="font-medium text-gray-900">Posted</p>
                  <p className="text-gray-600">{formatDate(job.created_at)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailContent;
