
import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Clock, CalendarClock, DollarSign, Home, BriefcaseBusiness, Search, Language } from "lucide-react";
import { Job } from "@/types/job";
import { Separator } from "@/components/ui/separator";
import AuthGuard from "@/components/auth/AuthGuard";
import { useAuth } from "@/context/auth";

interface JobDetailModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

const JobDetailModal = ({ job, isOpen, onClose }: JobDetailModalProps) => {
  const { isSignedIn } = useAuth();
  
  if (!job) return null;
  
  // Convert created_at to a Date object if it exists
  const createdAt = job.created_at ? new Date(job.created_at) : new Date();
  
  const isContactInfoVisible = isSignedIn;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">{job.title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Company and Location */}
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <BriefcaseBusiness className="h-4 w-4" />
              <span className="font-medium">{job.company}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
            </div>
          </div>
          
          {/* Job Image */}
          {job.image && (
            <div className="overflow-hidden rounded-md">
              <img 
                src={job.image} 
                alt={job.title} 
                className="w-full h-48 object-cover"
              />
            </div>
          )}
          
          {/* Job Details */}
          <div className="space-y-4">
            {/* Description Section */}
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              {job.vietnamese_description && (
                <div className="mb-3 text-gray-700 italic">
                  {job.vietnamese_description}
                </div>
              )}
              <div className="text-gray-700">
                {job.description}
              </div>
            </div>
            
            <Separator />
            
            {/* Requirements Section */}
            {job.requirements && (
              <>
                <div>
                  <h3 className="font-medium mb-2">Requirements</h3>
                  <div className="text-gray-700">
                    {job.requirements}
                  </div>
                </div>
                <Separator />
              </>
            )}
            
            {/* Job Features */}
            <div>
              <h3 className="font-medium mb-3">Job Details</h3>
              <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm">
                {job.employment_type && (
                  <div className="flex items-center">
                    <BriefcaseBusiness className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{job.employment_type}</span>
                  </div>
                )}
                {job.weekly_pay && (
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Weekly Pay</span>
                  </div>
                )}
                {job.has_housing && (
                  <div className="flex items-center">
                    <Home className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Housing Available</span>
                  </div>
                )}
                {job.languages && job.languages.length > 0 && (
                  <div className="flex items-center">
                    <Language className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{job.languages.join(', ')}</span>
                  </div>
                )}
                {job.owner_will_train && (
                  <div className="flex items-center">
                    <Search className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Owner Will Train</span>
                  </div>
                )}
              </div>
            </div>
            
            <Separator />
            
            {/* Contact Information - Protected */}
            <div>
              <h3 className="font-medium mb-2">Contact Information</h3>
              <AuthGuard
                fallback={
                  <div className="bg-gray-50 p-4 rounded-md text-center">
                    <p className="text-sm">Sign in to view contact details</p>
                  </div>
                }
              >
                <div className="space-y-2">
                  {job.contact_info?.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{job.contact_info.phone}</span>
                    </div>
                  )}
                  {job.contact_info?.email && (
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{job.contact_info.email}</span>
                    </div>
                  )}
                </div>
              </AuthGuard>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex-col sm:flex-row sm:justify-between gap-4">
          <div className="flex items-center text-gray-500 text-sm">
            <CalendarClock className="h-4 w-4 mr-1" />
            Posted on {createdAt.toLocaleDateString()}
          </div>
          
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <AuthGuard
              fallback={
                <Button asChild>
                  <Link to="/auth/signup">Sign Up to Apply</Link>
                </Button>
              }
            >
              <Button>
                <Phone className="h-4 w-4 mr-2" />
                Contact Employer
              </Button>
            </AuthGuard>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal;
