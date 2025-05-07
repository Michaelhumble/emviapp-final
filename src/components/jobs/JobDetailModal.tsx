
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Calendar, Users, Briefcase, Phone, Mail } from 'lucide-react';
import { Job } from '@/types/job';
import { formatDistanceToNow } from 'date-fns';
import { JobExpirationInfo } from './card-sections/JobExpirationInfo';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { useAuth } from '@/context/auth';
import AuthAction from '@/components/common/AuthAction';

interface JobDetailModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

const JobDetailModal: React.FC<JobDetailModalProps> = ({ 
  job, 
  isOpen, 
  onClose 
}) => {
  const { isSignedIn } = useAuth();
  
  if (!job) return null;

  const getPostedDate = () => {
    try {
      const date = new Date(job.created_at);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return "Recently posted";
    }
  };

  // Check if job is expired (over 30 days old)
  const isExpired = () => {
    const createdDate = new Date(job.created_at);
    const now = new Date();
    const diffDays = Math.ceil(
      (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diffDays >= 30;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{job.title}</DialogTitle>
          <DialogDescription className="flex items-center text-base text-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            {job.location}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Main content */}
          <div className="md:col-span-3 space-y-4">
            <div className="rounded-md overflow-hidden h-64">
              <ImageWithFallback
                src={job.image || ''}
                alt={job.title || ''}
                className="w-full h-full object-cover"
              />
            </div>

            <JobExpirationInfo
              isExpired={isExpired()}
              createdAt={job.created_at}
              contactInfo={isSignedIn ? job.contact_info : undefined}
            />

            {/* Description */}
            {job.description && (
              <div>
                <h3 className="font-semibold mb-2">Job Description</h3>
                <div className="whitespace-pre-line text-gray-700">
                  {job.description}
                </div>
              </div>
            )}

            {/* Vietnamese description if available */}
            {job.vietnamese_description && (
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Mô tả công việc</h3>
                <div className="whitespace-pre-line text-gray-700">
                  {job.vietnamese_description}
                </div>
              </div>
            )}

            {/* Contact information - Only for logged-in users */}
            {(job.contact_info?.phone || job.contact_info?.email) && (
              <div className="mt-6 p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold mb-2">Contact Information</h3>
                
                {isSignedIn ? (
                  <div className="space-y-2">
                    {job.contact_info?.owner_name && (
                      <p className="text-gray-700">
                        <span className="font-medium">Contact:</span> {job.contact_info.owner_name}
                      </p>
                    )}
                    
                    {job.contact_info?.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">{job.contact_info.phone}</span>
                        <a 
                          href={`tel:${job.contact_info.phone.replace(/\D/g, '')}`}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          Call now
                        </a>
                      </div>
                    )}
                    
                    {job.contact_info?.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">{job.contact_info.email}</span>
                        <a 
                          href={`mailto:${job.contact_info.email}`}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          Send email
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <AuthAction
                    customTitle="Sign in to see contact details"
                    onAction={() => true}
                    fallbackContent={
                      <div className="text-center p-2 border border-dashed border-gray-300 rounded">
                        <p className="text-sm text-gray-600 mb-2">
                          Sign in to view contact information
                        </p>
                        <Button size="sm" variant="outline">
                          Sign in now
                        </Button>
                      </div>
                    }
                  />
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="md:col-span-2 space-y-4">
            <div className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Posted</p>
                  <p className="text-sm">{getPostedDate()}</p>
                </div>
              </div>

              {job.employment_type && (
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Job Type</p>
                    <p className="text-sm">{job.employment_type}</p>
                  </div>
                </div>
              )}

              {job.compensation_details && (
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-xs text-gray-500">Compensation</p>
                    <p className="text-sm font-medium text-green-700">{job.compensation_details}</p>
                  </div>
                </div>
              )}
            </div>

            {job.specialties && job.specialties.length > 0 && (
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <h3 className="font-medium">Required Skills</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {job.specialties.map((specialty, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {job.benefits && job.benefits.length > 0 && (
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium mb-2">Benefits</h3>
                <ul className="list-disc pl-4 space-y-1 text-sm text-gray-700">
                  {job.benefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal;
