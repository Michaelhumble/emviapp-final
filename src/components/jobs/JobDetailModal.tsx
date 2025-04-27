
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/types/job";
import { MapPin, DollarSign, Calendar, ArrowRight, Clock, RefreshCw, Lock } from "lucide-react";
import { useAuth } from "@/context/auth";
import AuthAction from "@/components/common/AuthAction";
import { useTranslation } from "@/hooks/useTranslation";

export interface JobDetailModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  isExpired?: boolean;
  onRenew?: (job: Job) => Promise<void>;
  isRenewing?: boolean;
  isOwner?: boolean;
}

const JobDetailModal = ({ 
  job, 
  isOpen, 
  onClose,
  isExpired = false,
  onRenew,
  isRenewing = false,
  isOwner = false
}: JobDetailModalProps) => {
  const { isSignedIn } = useAuth();
  const { t, isVietnamese } = useTranslation();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const renderRenewalButton = () => {
    if (!isExpired || !isOwner || !onRenew) return null;
    
    return (
      <div className="pt-4 border-t mt-6">
        <p className="text-gray-600 mb-2 text-sm">This job listing has expired. Renew it to make it visible in search results again.</p>
        <Button 
          onClick={() => onRenew(job)}
          disabled={isRenewing}
          className="w-full"
        >
          {isRenewing ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Renewing...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Renew for 30 Days
            </>
          )}
        </Button>
      </div>
    );
  };

  const renderContactInfo = () => {
    if (!isSignedIn && !isOwner) {
      return (
        <div className="bg-muted p-4 rounded-lg mt-6">
          <div className="flex items-center mb-2">
            <Lock className="h-4 w-4 mr-2" />
            <h4 className="font-medium">{isVietnamese ? 'Thông tin liên lạc' : 'Contact Information'}</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            {isVietnamese 
              ? 'Đăng ký để xem thông tin liên lạc và ứng tuyển công việc này.'
              : 'Sign in to view contact details and apply for this job.'}
          </p>
          <AuthAction type="signUp">
            <Button variant="default" className="w-full">
              {isVietnamese ? 'Đăng ký' : 'Sign Up'}
            </Button>
          </AuthAction>
        </div>
      );
    }

    if (job.contact_info) {
      return (
        <div className="bg-muted p-4 rounded-lg mt-6">
          <h4 className="font-medium mb-3">{isVietnamese ? 'Thông tin liên lạc' : 'Contact Information'}</h4>
          
          {job.contact_info.owner_name && (
            <p className="text-sm mb-2">
              <span className="font-medium">Contact name:</span> {job.contact_info.owner_name}
            </p>
          )}
          
          {job.contact_info.phone && (
            <p className="text-sm mb-2">
              <span className="font-medium">Phone:</span> {job.contact_info.phone}
            </p>
          )}
          
          {job.contact_info.email && (
            <p className="text-sm mb-2">
              <span className="font-medium">Email:</span> {job.contact_info.email}
            </p>
          )}
          
          {job.contact_info.notes && (
            <p className="text-sm mb-2">
              <span className="font-medium">Notes:</span> {job.contact_info.notes}
            </p>
          )}
          
          <Button className="w-full mt-3">
            {isVietnamese ? 'Liên hệ ngay' : 'Contact Now'} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    }
    
    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{job.title}</DialogTitle>
          <DialogDescription className="text-base text-primary/80">{job.company}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 opacity-70" /> {job.location}
          </div>
          
          {job.created_at && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 opacity-70" /> 
              Posted on {formatDate(job.created_at)}
            </div>
          )}
          
          {job.salary_range && (
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 opacity-70" /> {job.salary_range}
            </div>
          )}
          
          {job.employment_type && (
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline">{job.employment_type}</Badge>
              {job.is_remote && <Badge variant="outline">Remote</Badge>}
            </div>
          )}
          
          <div className="mt-4">
            <h4 className="font-medium mb-2">{isVietnamese ? 'Mô tả công việc' : 'Job Description'}</h4>
            <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
          </div>
          
          {job.vietnamese_description && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Mô Tả Công Việc (Tiếng Việt)</h4>
              <p className="text-gray-700 whitespace-pre-line">{job.vietnamese_description}</p>
            </div>
          )}
          
          {job.specialties && job.specialties.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">{isVietnamese ? 'Chuyên môn' : 'Specialties'}</h4>
              <div className="flex flex-wrap gap-2">
                {job.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary">{specialty}</Badge>
                ))}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-3 mt-2">
            {job.weekly_pay && (
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm">Weekly Pay</span>
              </div>
            )}
            
            {job.owner_will_train && (
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm">Owner Will Train</span>
              </div>
            )}
            
            {job.has_housing && (
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-sm">Housing Available</span>
              </div>
            )}
            
            {job.no_supply_deduction && (
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-sm">No Supply Deduction</span>
              </div>
            )}
          </div>

          {renderContactInfo()}
          {renderRenewalButton()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal;
