
import { useState } from "react";
import { Job } from "@/types/job";
import { MapPin, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

interface BilingualJobCardProps {
  job: Job;
  onViewDetails: () => void;
  onRenew?: () => void;
  isRenewing?: boolean;
  variant?: "standard" | "expired";
}

const BilingualJobCard = ({
  job,
  onViewDetails,
  onRenew,
  isRenewing = false,
  variant = "standard"
}: BilingualJobCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  
  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!isSignedIn) {
      toast({
        title: "Sign in required",
        description: "Please sign in to view job details",
        variant: "destructive",
      });
      navigate('/signin');
      return;
    }
    
    onViewDetails();
  };

  const isExpired = variant === "expired";
  const cardClasses = isExpired 
    ? "border border-gray-200 rounded-lg overflow-hidden h-full shadow-sm hover:shadow-md transition-all duration-300 bg-gray-50" 
    : "border border-gray-200 rounded-lg overflow-hidden h-full shadow-sm hover:shadow-md transition-all duration-300";

  const imageClasses = isExpired
    ? "w-full h-48 object-cover grayscale transition-transform duration-300"
    : "w-full h-48 object-cover transition-transform duration-300";

  return (
    <div 
      className={cardClasses}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img 
          src={job.image || "https://via.placeholder.com/400x300"} 
          alt={job.title || "Job Listing"} 
          className={imageClasses}
          style={{ transform: isHovering ? 'scale(1.05)' : 'scale(1)' }}
        />
        
        {/* Premium Badge - Show only for non-expired jobs */}
        {job.is_featured && !isExpired && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
            ✓ Premium
          </div>
        )}
        
        {/* Expired Badge */}
        {isExpired && (
          <div className="absolute top-2 left-2 bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded">
            Expired
          </div>
        )}
      </div>
      
      {/* Card Content */}
      <div className="p-4">
        {/* Job Title - English */}
        <h3 className={`font-medium text-lg mb-1 ${isExpired ? 'text-gray-500' : 'text-gray-800'}`}>
          {job.title || "Nail Technician Job"}
        </h3>
        
        {/* Job Title - Vietnamese */}
        {job.vietnamese_description && (
          <p className={`text-sm mb-3 ${isExpired ? 'text-gray-400' : 'text-gray-600'}`}>
            Thợ {job.role?.includes('Powder') ? 'Bột' : 'Nail'}
          </p>
        )}
        
        {/* Location */}
        <div className={`flex items-center text-sm mb-2 ${isExpired ? 'text-gray-400' : 'text-gray-600'}`}>
          <MapPin className="h-4 w-4 mr-1" />
          {job.location || "Houston, TX"}
        </div>
        
        {/* Posted Date */}
        <div className={`flex items-center text-sm mb-2 ${isExpired ? 'text-gray-400' : 'text-gray-600'}`}>
          <Clock className="h-4 w-4 mr-1" />
          {isExpired ? "Over 30 days ago" : `Posted ${new Date(job.created_at).toLocaleDateString()}`}
        </div>
        
        {/* Salary - Only for non-expired */}
        {!isExpired && job.salary_range && (
          <div className="flex items-center text-sm mb-3 text-emerald-600">
            <DollarSign className="h-4 w-4 mr-1" />
            {job.salary_range}
          </div>
        )}
        
        {/* Benefits/Features - Only for non-expired */}
        {!isExpired && (
          <div className="flex flex-wrap gap-1 mb-3">
            {job.weekly_pay && (
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Weekly Pay</span>
            )}
            {job.has_housing && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Housing</span>
            )}
            {job.owner_will_train && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Training</span>
            )}
          </div>
        )}
        
        {/* Action Button */}
        <div className="mt-auto pt-2">
          {isExpired && onRenew ? (
            <Button 
              onClick={onRenew} 
              className="w-full bg-amber-500 hover:bg-amber-600 text-white"
              disabled={isRenewing}
            >
              {isRenewing ? "Renewing..." : "Renew Listing"}
            </Button>
          ) : (
            <Button 
              onClick={handleViewDetails} 
              className="w-full"
            >
              {job.vietnamese_description ? "Xem Chi Tiết" : "View Details"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BilingualJobCard;
