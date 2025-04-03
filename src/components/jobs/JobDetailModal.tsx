
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail, Calendar, Clock, Briefcase, CheckCircle, Users, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Job {
  id: string;
  created_at: string;
  title: string;
  company: string;
  location: string;
  salary_range: string;
  description: string;
  weekly_pay: boolean;
  owner_will_train: boolean;
  employment_type: string;
  responsibilities?: string[];
  qualifications?: string[];
  benefits?: string[];
  company_description?: string;
  contact_info?: {
    phone?: string;
    email?: string;
  };
  trust_indicators?: {
    verified: boolean;
    activelyHiring: boolean;
    chatAvailable: boolean;
  };
}

interface JobDetailModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

const JobDetailModal = ({ job, isOpen, onClose }: JobDetailModalProps) => {
  const formatPostedDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return `Posted ${formatDistanceToNow(date, { addSuffix: false })} ago`;
    } catch (error) {
      return "Recently posted";
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl font-serif">
                {job.title}
              </DialogTitle>
              <DialogDescription className="text-base mt-1">
                {job.company} – {job.location}
              </DialogDescription>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {job.trust_indicators?.verified && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> Verified
                </Badge>
              )}
              
              {job.trust_indicators?.activelyHiring && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
                  <Users className="h-3 w-3" /> Hiring Actively
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>
        
        {/* Job Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{job.employment_type}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{job.location}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>{formatPostedDate(job.created_at)}</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            {job.salary_range && (
              <div className="text-xl font-medium text-green-700">
                {job.salary_range}
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {job.weekly_pay && (
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Weekly Pay 💰
                </Badge>
              )}
              {job.owner_will_train && (
                <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                  Owner Will Train ✨
                </Badge>
              )}
              {job.trust_indicators?.chatAvailable && (
                <Badge className="bg-purple-100 text-purple-800 border-purple-200 flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" /> Chat Available
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        {/* Company Description */}
        {job.company_description && (
          <div className="mb-6">
            <h3 className="font-serif text-lg font-semibold mb-2">About The Salon</h3>
            <p className="text-gray-700">{job.company_description}</p>
          </div>
        )}
        
        <Separator className="my-6" />
        
        {/* Full Description */}
        <div className="mb-6">
          <h3 className="font-serif text-lg font-semibold mb-2">Job Description</h3>
          <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
        </div>
        
        {/* Responsibilities */}
        {job.responsibilities && job.responsibilities.length > 0 && (
          <div className="mb-6">
            <h3 className="font-serif text-lg font-semibold mb-2">Responsibilities</h3>
            <ul className="list-disc pl-5 space-y-1">
              {job.responsibilities.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Qualifications */}
        {job.qualifications && job.qualifications.length > 0 && (
          <div className="mb-6">
            <h3 className="font-serif text-lg font-semibold mb-2">Qualifications</h3>
            <ul className="list-disc pl-5 space-y-1">
              {job.qualifications.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Benefits */}
        {job.benefits && job.benefits.length > 0 && (
          <div className="mb-6">
            <h3 className="font-serif text-lg font-semibold mb-2">Benefits</h3>
            <ul className="list-disc pl-5 space-y-1">
              {job.benefits.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
          </div>
        )}
        
        <Separator className="my-6" />
        
        {/* Contact Information */}
        <div className="mb-6">
          <h3 className="font-serif text-lg font-semibold mb-3">Contact Information</h3>
          <div className="flex flex-col md:flex-row gap-4">
            {job.contact_info?.phone && (
              <Button variant="outline" className="flex items-center gap-2" asChild>
                <a href={`tel:${job.contact_info.phone}`}>
                  <Phone className="h-4 w-4" />
                  {job.contact_info.phone}
                </a>
              </Button>
            )}
            
            {job.contact_info?.email && (
              <Button variant="outline" className="flex items-center gap-2" asChild>
                <a href={`mailto:${job.contact_info.email}`}>
                  <Mail className="h-4 w-4" />
                  Contact via Email
                </a>
              </Button>
            )}
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button className="flex-1">Apply Now</Button>
          <Button variant="secondary" className="flex-1" asChild>
            <a href={`tel:${job.contact_info?.phone}`}>
              Call Salon
            </a>
          </Button>
          {job.trust_indicators?.chatAvailable && (
            <Button variant="outline" className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" /> Chat
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal;
