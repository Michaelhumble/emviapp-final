
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Job } from "@/types/job";
import { ArrowRight, Clock, MapPin, Briefcase, DollarSign, Building, X } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

interface JobDetailModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  isOpen,
  onClose,
}) => {
  if (!job) return null;

  const postedDate = job.created_at
    ? formatDistanceToNow(new Date(job.created_at), { addSuffix: true })
    : "";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-0 top-0" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <DialogTitle className="text-2xl font-playfair pr-8">{job.title || job.role}</DialogTitle>
          <DialogDescription className="flex flex-wrap gap-4 text-sm">
            {job.company && (
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-1.5 text-gray-500" />
                <span>{job.company}</span>
              </div>
            )}
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1.5 text-gray-500" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1.5 text-gray-500" />
              <span>Posted {postedDate}</span>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Job image */}
            <div className="rounded-md overflow-hidden mb-6">
              <ImageWithFallback
                src={job.image || job.imageUrl || ""}
                alt={job.title || job.role || "Job listing"}
                className="w-full aspect-video object-cover"
                businessName={job.company || job.title || ""}
              />
            </div>

            {/* Job description */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Job Description</h3>
              
              {/* English description */}
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-line text-gray-700">
                  {job.description || "No description provided."}
                </p>
              </div>
              
              {/* Vietnamese description if available */}
              {job.vietnamese_description && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-medium text-lg mb-2">Mô Tả Công Việc</h3>
                  <div className="prose prose-sm max-w-none">
                    <p className="whitespace-pre-line text-gray-700">
                      {job.vietnamese_description}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-medium text-lg mb-2">Requirements</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {typeof job.requirements === 'string' ? (
                      <li>{job.requirements}</li>
                    ) : (
                      job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))
                    )}
                  </ul>
                </div>
              )}
              
              {/* Benefits */}
              {job.benefits && job.benefits.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-medium text-lg mb-2">Benefits</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {job.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Job details sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-5 space-y-4 sticky top-4">
              <h3 className="font-medium text-lg">Job Details</h3>
              
              {/* Job type */}
              <div>
                <div className="text-sm text-gray-500 mb-1">Job Type</div>
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1.5 text-gray-600" />
                  <span>{job.employment_type || "Full-time"}</span>
                </div>
              </div>
              
              {/* Salary/Compensation */}
              {(job.salary_range || job.compensation_details) && (
                <div>
                  <div className="text-sm text-gray-500 mb-1">Compensation</div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1.5 text-gray-600" />
                    <span>{job.salary_range || job.compensation_details}</span>
                  </div>
                </div>
              )}
              
              {/* Special features */}
              <div className="space-y-2">
                {job.weekly_pay && (
                  <div className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2"></span>
                    <span className="text-sm">Weekly Pay</span>
                  </div>
                )}
                
                {job.has_housing && (
                  <div className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2"></span>
                    <span className="text-sm">Housing Provided</span>
                  </div>
                )}
                
                {job.owner_will_train && (
                  <div className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2"></span>
                    <span className="text-sm">Training Provided</span>
                  </div>
                )}
              </div>
              
              {/* Contact info */}
              {job.contact_info && (
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <h4 className="font-medium mb-2">Contact Information</h4>
                  {job.contact_info.owner_name && (
                    <div className="text-sm mb-1">
                      <span className="font-medium">Contact:</span> {job.contact_info.owner_name}
                    </div>
                  )}
                  {job.contact_info.email && (
                    <div className="text-sm mb-1">
                      <span className="font-medium">Email:</span>{" "}
                      <a href={`mailto:${job.contact_info.email}`} className="text-primary hover:underline">
                        {job.contact_info.email}
                      </a>
                    </div>
                  )}
                  {job.contact_info.phone && (
                    <div className="text-sm">
                      <span className="font-medium">Phone:</span>{" "}
                      <a href={`tel:${job.contact_info.phone}`} className="text-primary hover:underline">
                        {job.contact_info.phone}
                      </a>
                    </div>
                  )}
                </div>
              )}
              
              {/* Apply button */}
              <Button className="w-full mt-4 group">
                Apply Now <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>Apply for this Position</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal;
