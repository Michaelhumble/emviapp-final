
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, DollarSign, Phone, Mail } from 'lucide-react';
import { Job } from '@/types/job';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import JobCardContact from './JobCardContact';

interface JobDetailModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

const JobDetailModal = ({ job, isOpen, onClose }: JobDetailModalProps) => {
  const { isSignedIn } = useAuth();
  
  if (!job) return null;

  const isVietnameseJob = job.vietnamese_description && job.vietnamese_description.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg md:max-w-2xl">
        <DialogHeader>
          <Link to="/" className="text-sm text-gray-500 hover:text-purple-600 underline mt-4 mb-2">
            ← Back to Home
          </Link>
          <DialogTitle className="text-2xl font-playfair font-semibold">{job.title}</DialogTitle>
          <DialogDescription className="text-gray-600">{job.company}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Display job image if available */}
          {job.image && (
            <div className="w-full h-64 rounded-md overflow-hidden">
              <img 
                src={job.image} 
                alt={`${job.title} at ${job.company}`}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="grid grid-cols-1 gap-2 text-base">
            {job.location && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                <span>{job.location}</span>
              </div>
            )}
            
            {job.salary_range && (
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                <span>{job.salary_range}</span>
              </div>
            )}
            
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              <span>Posted on {new Date(job.created_at).toLocaleDateString()}</span>
            </div>
          </div>
          
          {/* Description section */}
          <div className="border-t pt-4 mt-2">
            <h3 className="font-playfair font-medium mb-2">Description</h3>
            {isVietnameseJob ? (
              <div className="space-y-4">
                <p className="text-base text-gray-700 whitespace-pre-line">
                  {job.vietnamese_description}
                </p>
                {job.description && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-base text-gray-700 whitespace-pre-line">
                      {job.description}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-base text-gray-700 whitespace-pre-line">
                {job.description || "No description provided."}
              </p>
            )}
          </div>
          
          {/* Contact information */}
          {job.contact_info && (
            <div className="border-t pt-4 mt-2">
              <h3 className="font-playfair font-medium mb-2">Contact Information</h3>
              <div className="space-y-2">
                {job.contact_info.phone && (
                  <JobCardContact phoneNumber={job.contact_info.phone} />
                )}
                
                {job.contact_info.email && (
                  <div className="flex items-center">
                    {isSignedIn ? (
                      <>
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{job.contact_info.email}</span>
                      </>
                    ) : (
                      <div className="text-xs text-gray-500 italic flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        <span>Sign in to see email address</span>
                      </div>
                    )}
                  </div>
                )}
                
                {job.contact_info.owner_name && (
                  <div className="text-base">
                    {isSignedIn ? (
                      <>
                        <span className="text-gray-500">Contact:</span> {job.contact_info.owner_name}
                      </>
                    ) : (
                      <div className="text-xs text-gray-500 italic">
                        <span>Sign in to see contact name</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose} className="font-bold">
            Close
          </Button>
          {job.contact_info?.email && isSignedIn && (
            <Button className="font-bold">Apply Now</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal;
