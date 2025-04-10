
import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Clock, CalendarClock, DollarSign, Home, BriefcaseBusiness, Search, Languages, Lock } from "lucide-react";
import { Job } from "@/types/job";
import { Separator } from "@/components/ui/separator";
import AuthGuard from "@/components/auth/AuthGuard";
import { useAuth } from "@/context/auth";
import { Link } from "react-router-dom";

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
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">{job.title || job.role || job.company}</DialogTitle>
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
                alt={job.title || job.role || job.company} 
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
                    {typeof job.requirements === 'string' 
                      ? job.requirements 
                      : job.requirements.join(', ')}
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
                {job.preferred_languages && job.preferred_languages.length > 0 && (
                  <div className="flex items-center">
                    <Languages className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{job.preferred_languages.join(', ')}</span>
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
                    <div className="flex justify-center mb-2">
                      <Lock className="h-5 w-5 text-gray-500" />
                    </div>
                    <p className="text-sm font-medium mb-2">Sign in to view contact details</p>
                    <p className="text-xs text-gray-600 mb-3">
                      This information is hidden to protect our community
                    </p>
                    <div className="flex justify-center space-x-3">
                      <Link to="/auth/signin">
                        <Button size="sm" variant="outline">Sign In</Button>
                      </Link>
                      <Link to="/auth/signup">
                        <Button size="sm">Sign Up</Button>
                      </Link>
                    </div>
                  </div>
                }
              >
                <div className="space-y-2">
                  {job.contact_info?.owner_name && (
                    <div className="flex items-center">
                      <BriefcaseBusiness className="h-4 w-4 mr-2 text-gray-500" />
                      <span>Contact: {job.contact_info.owner_name}</span>
                    </div>
                  )}
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
                  {job.contact_info?.notes && (
                    <div className="text-sm italic bg-amber-50 p-2 rounded-md">
                      <span>{job.contact_info.notes}</span>
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
