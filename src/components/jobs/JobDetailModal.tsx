
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, CalendarIcon, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Job } from '@/types/job';
import { Badge } from "@/components/ui/badge";
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { useAuth } from '@/context/auth';
import AuthAction from '@/components/common/AuthAction';

interface JobDetailModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

const JobDetailModal: React.FC<JobDetailModalProps> = ({ job, isOpen, onClose }) => {
  const { isSignedIn } = useAuth();
  
  if (!job) return null;

  // Format the posted date
  const formatPostedDate = () => {
    try {
      return formatDistanceToNow(new Date(job.created_at), { addSuffix: true });
    } catch (e) {
      return "Recently";
    }
  };

  // Check if job is premium featured
  const isPremiumFeatured = job.id === 'vn-job-premium';

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="sticky top-0 bg-white z-10 px-6 pt-6 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-serif">{job.title}</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
        
        {/* Main Content */}
        <div className="p-6">
          {/* Image */}
          <div className="aspect-video rounded-md overflow-hidden mb-6">
            <ImageWithFallback
              src={job.image || ''}
              alt={job.title || 'Job listing'}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Job Quick Info */}
          <div className={`p-4 rounded-md mb-6 ${isPremiumFeatured ? 'bg-amber-50 border border-amber-200' : 'bg-gray-50'}`}>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                <span className="text-sm text-gray-700">{job.location}</span>
              </div>
              
              {job.employment_type && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-700">{job.employment_type}</span>
                </div>
              )}
              
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 text-gray-500 mr-1" />
                <span className="text-sm text-gray-700">Posted {formatPostedDate()}</span>
              </div>
            </div>
          </div>
          
          {/* Job Specialties */}
          {job.specialties && job.specialties.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-2">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {job.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Compensation */}
          {job.salary_range && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-2">Compensation</h3>
              <p className="text-lg font-semibold text-primary">{job.salary_range}</p>
            </div>
          )}
          
          {/* Job Benefits */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2">Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {job.weekly_pay && (
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Weekly Pay</span>
                </div>
              )}
              {job.has_housing && (
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Housing Provided</span>
                </div>
              )}
              {job.no_supply_deduction && (
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">No Supply Deduction</span>
                </div>
              )}
              {job.owner_will_train && (
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Owner Will Train</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Job Description */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2">Description</h3>
            <div className="text-gray-700 whitespace-pre-line">
              {job.vietnamese_description || job.description}
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2">Contact Information</h3>
            
            {isSignedIn ? (
              <div className="space-y-3">
                {job.contact_info?.phone && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-500 mr-2" />
                    <a href={`tel:${job.contact_info.phone}`} className="text-primary hover:underline">
                      {job.contact_info.phone}
                    </a>
                  </div>
                )}
                
                {job.contact_info?.email && (
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-500 mr-2" />
                    <a href={`mailto:${job.contact_info.email}`} className="text-primary hover:underline">
                      {job.contact_info.email}
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <AuthAction
                customTitle="Sign in to see contact details"
                onAction={() => true}
                fallbackContent={
                  <div className="bg-gray-50 p-4 rounded-md flex items-center gap-2">
                    <LockIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Sign in to see contact information</span>
                    <Button size="sm" variant="outline" className="ml-auto">Sign In</Button>
                  </div>
                }
              />
            )}
          </div>
          
          {/* Similar Jobs Teaser */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold mb-4">Looking for more opportunities?</h3>
            <Button variant="outline" onClick={() => onClose()}>
              Browse Similar Jobs
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Import missing LockIcon
const LockIcon = (props) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      {...props}
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  );
};

export default JobDetailModal;
