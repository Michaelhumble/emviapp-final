
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Mail, Phone, Clock, DollarSign, Tag } from "lucide-react";
import { Job } from "@/types/job";
import { format } from "date-fns";
import { useAuth } from "@/context/auth";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/useTranslation";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface JobDetailModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

const JobDetailModal = ({ job, isOpen, onClose }: JobDetailModalProps) => {
  const { isSignedIn } = useAuth();
  const { t, isVietnamese } = useTranslation();
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);
  
  // Get a default image based on job type
  const getFallbackImage = () => {
    if (job.employment_type?.toLowerCase().includes('sale')) {
      return "https://images.unsplash.com/photo-1613843351058-1dd06fccdc6a?q=80&w=2070&auto=format&fit=crop";
    } else if (job.specialties?.some(s => s.toLowerCase().includes('nail'))) {
      return "https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=2070&auto=format&fit=crop";
    } else if (job.specialties?.some(s => s.toLowerCase().includes('hair'))) {
      return "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2070&auto=format&fit=crop";
    }
    return "https://images.unsplash.com/photo-1607008829749-c0f284a49841?q=80&w=2070&auto=format&fit=crop";
  };

  const handleContactClick = () => {
    if (!isSignedIn) {
      setShowSignInPrompt(true);
    } else {
      // Handle contact action for signed in users
      console.log("Contact action");
    }
  };

  // Format date if available
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Recent";
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch (e) {
      return "Recent";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair">
            {job.title || "Job Details"}
          </DialogTitle>
        </DialogHeader>

        {/* Job Banner Image */}
        <div className="aspect-video w-full overflow-hidden rounded-md mb-6">
          <ImageWithFallback
            src={job.image}
            alt={job.title || "Job listing"}
            className="w-full h-full object-cover"
            fallbackImage={getFallbackImage()}
            businessName={job.company}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column - job details */}
          <div className="md:col-span-2 space-y-6">
            {/* Header info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{job.title}</h2>
              <p className="text-lg text-gray-700 mb-2">{job.company}</p>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{job.location || "Location not specified"}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {job.employment_type && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {job.employment_type}
                  </Badge>
                )}
                {job.weekly_pay && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Weekly Pay
                  </Badge>
                )}
                {job.has_housing && (
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    Housing Available
                  </Badge>
                )}
                {job.owner_will_train && (
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    Training Provided
                  </Badge>
                )}
                {job.is_remote && (
                  <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                    Remote
                  </Badge>
                )}
                {job.no_supply_deduction && (
                  <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                    No Supply Deduction
                  </Badge>
                )}
                {job.for_sale && (
                  <Badge className="bg-pink-600">
                    For Sale
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center text-gray-600 mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Posted: {formatDate(job.created_at)}</span>
              </div>
              
              {job.salary_range && (
                <div className="flex items-center text-gray-600 mb-2">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <span>Compensation: {job.salary_range}</span>
                </div>
              )}
            </div>
            
            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <div className="prose max-w-none text-gray-700">
                <p className="whitespace-pre-line">{isVietnamese && job.vietnamese_description ? job.vietnamese_description : job.description}</p>
              </div>
            </div>
            
            {/* Additional sections if available */}
            {job.requirements && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                {Array.isArray(job.requirements) ? (
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {job.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700">{job.requirements}</p>
                )}
              </div>
            )}
            
            {job.benefits && Array.isArray(job.benefits) && job.benefits.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Benefits</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {job.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {job.specialties && job.specialties.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {job.specialties.map((specialty) => (
                    <Badge key={specialty} variant="outline" className="bg-gray-50">
                      <Tag className="h-3 w-3 mr-1" />
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Right column - contact info */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4">Contact Information</h3>
              
              {isSignedIn ? (
                job.contact_info ? (
                  <div className="space-y-4">
                    {job.contact_info.owner_name && (
                      <div>
                        <p className="text-sm text-gray-500">Contact Person</p>
                        <p className="font-medium">{job.contact_info.owner_name}</p>
                      </div>
                    )}
                    
                    {job.contact_info.phone && (
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-500" />
                          <a href={`tel:${job.contact_info.phone}`} className="font-medium text-blue-600 hover:underline">
                            {job.contact_info.phone}
                          </a>
                        </div>
                      </div>
                    )}
                    
                    {job.contact_info.email && (
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-500" />
                          <a href={`mailto:${job.contact_info.email}`} className="font-medium text-blue-600 hover:underline">
                            {job.contact_info.email}
                          </a>
                        </div>
                      </div>
                    )}
                    
                    {job.contact_info.notes && (
                      <div>
                        <p className="text-sm text-gray-500">Additional Notes</p>
                        <p>{job.contact_info.notes}</p>
                      </div>
                    )}
                    
                    <Button className="w-full mt-2">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Now
                    </Button>
                  </div>
                ) : (
                  <p className="text-gray-600">No contact information provided. Please contact the employer through their website or visit in person.</p>
                )
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded border border-gray-200 text-center">
                    <p className="font-medium mb-2">Sign in to view contact details</p>
                    <p className="text-sm text-gray-600 mb-4">Create a free account to access contact information and additional details.</p>
                    <div className="space-y-2">
                      <Link to={`/sign-in?redirect=${encodeURIComponent(`/opportunities/${job.id}`)}`}>
                        <Button className="w-full">Sign In</Button>
                      </Link>
                      <Link to={`/sign-up?redirect=${encodeURIComponent(`/opportunities/${job.id}`)}`}>
                        <Button variant="outline" className="w-full">Create Account</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Additional info */}
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4">Job Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{job.employment_type || "Not specified"}</span>
                </div>
                
                {job.salary_range && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pay Range:</span>
                    <span className="font-medium">{job.salary_range}</span>
                  </div>
                )}
                
                {job.tip_range && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tips:</span>
                    <span className="font-medium">{job.tip_range}</span>
                  </div>
                )}
                
                {job.experience_level && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium">{job.experience_level}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Posted:</span>
                  <span className="font-medium">{formatDate(job.created_at)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal;
