
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

        {/* Image Section */}
        {job.image && (
          <div className="mb-8">
            <img
              src={job.image}
              alt={job.title}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            {job.description && (
              <Card>
                <CardHeader>
                  <CardTitle>Job Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
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
