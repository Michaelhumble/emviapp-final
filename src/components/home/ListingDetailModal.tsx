
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarIcon, DollarSign, MapPin, Clock, Award, Briefcase, Phone, Mail } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Job } from "@/types/job";
import { Salon } from "@/types/salon";
import { useAuth } from "@/context/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

interface ListingDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: Job | Salon;
  listingType: "job" | "salon";
}

const ListingDetailModal = ({
  isOpen,
  onClose,
  listing,
  listingType,
}: ListingDetailModalProps) => {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const { isVietnamese, toggleLanguage } = useTranslation();

  // Safely access nested properties with null checks
  const safeGetProperty = (obj: any, path: string, defaultVal: any = "") => {
    if (!obj) return defaultVal;
    
    const parts = path.split(".");
    let value = obj;
    for (const part of parts) {
      if (value === null || value === undefined || typeof value !== "object") {
        return defaultVal;
      }
      value = value[part];
    }
    return value === undefined || value === null ? defaultVal : value;
  };

  const getListingTitle = () => {
    if (listingType === "job") {
      return safeGetProperty(listing, "title", "Job Opportunity");
    } else {
      return safeGetProperty(listing, "name", "Salon");
    }
  };

  // Get appropriate description based on language preference
  const getDescription = () => {
    if (isVietnamese && 'vietnamese_description' in listing && listing.vietnamese_description) {
      return listing.vietnamese_description;
    }
    
    return safeGetProperty(listing, "description", "No description available.");
  };

  // Handle authentication check
  const handleActionClick = () => {
    if (!user) {
      setShowLogin(true);
    } else {
      // Handle apply or visit based on listing type
      if (listingType === "job") {
        console.log("User applying for job:", listing.id);
        // Implementation for job application would go here
      } else {
        console.log("User viewing salon details:", listing.id);
        // Implementation for salon visit would go here
      }
    }
  };

  const renderContactInfo = () => {
    if (!user) return null;
    
    const contactInfo = safeGetProperty(listing, "contact_info", null);
    if (!contactInfo) return null;
    
    return (
      <div className="mt-4 border-t pt-4">
        <h3 className="font-medium text-lg mb-2">Contact Information</h3>
        <div className="space-y-2">
          {contactInfo.owner_name && (
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-gray-600" />
              <span>{contactInfo.owner_name}</span>
            </div>
          )}
          {contactInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-green-600" />
              <span>{contactInfo.phone}</span>
            </div>
          )}
          {contactInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-600" />
              <span>{contactInfo.email}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderJobDetails = (job: Job) => {
    return (
      <div className="mt-6 space-y-4">
        <div className="w-full aspect-video overflow-hidden rounded-lg mb-4">
          <ImageWithFallback
            src={job.imageUrl || ""}
            alt={job.title || "Job listing"}
            className="w-full h-full object-cover"
            priority={true}
            category={job.salon_type || 'nail'}
          />
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-lg mb-2">Job Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safeGetProperty(job, "location") && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span>{safeGetProperty(job, "location")}</span>
              </div>
            )}
            {safeGetProperty(job, "salary_range") && (
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span>{safeGetProperty(job, "salary_range")}</span>
              </div>
            )}
            {safeGetProperty(job, "created_at") && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <span>Posted: {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}</span>
              </div>
            )}
            {job.for_sale && (
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-amber-600" />
                <span>Business For Sale</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-lg">Description</h3>
            {job.is_vietnamese_listing && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleLanguage}
                className="text-xs"
              >
                {isVietnamese ? "English" : "Tiếng Việt"}
              </Button>
            )}
          </div>
          <p className="text-gray-700 whitespace-pre-line">
            {getDescription()}
          </p>
        </div>

        {job.salon_features && job.salon_features.length > 0 && (
          <div>
            <h3 className="font-medium text-lg mb-2">Features</h3>
            <div className="flex flex-wrap gap-2">
              {job.salon_features.map((feature, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {renderContactInfo()}

        <div className="pt-4">
          <Button
            onClick={handleActionClick}
            className="w-full"
            size="lg"
          >
            {!user ? "Sign In to View Contact Details" : "Contact Now"}
          </Button>
        </div>
      </div>
    );
  };

  const renderSalonDetails = (salon: Salon) => {
    return (
      <div className="mt-6 space-y-4">
        <div className="w-full aspect-video overflow-hidden rounded-lg mb-4">
          <ImageWithFallback
            src={salon.imageUrl || ""}
            alt={salon.name || "Salon"}
            className="w-full h-full object-cover"
            priority={true}
            category={salon.salon_type || 'nail'}
          />
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-lg mb-2">Salon Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safeGetProperty(salon, "location") && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span>{safeGetProperty(salon, "location")}</span>
              </div>
            )}
            {safeGetProperty(salon, "salon_type") && (
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-amber-600" />
                <span>Type: {safeGetProperty(salon, "salon_type")}</span>
              </div>
            )}
            {safeGetProperty(salon, "square_feet") && (
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Size:</span>
                <span>{safeGetProperty(salon, "square_feet")} sq ft</span>
              </div>
            )}
            {safeGetProperty(salon, "monthly_rent") && (
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span>Rent: ${safeGetProperty(salon, "monthly_rent")}/month</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-lg">Description</h3>
            {salon.is_vietnamese_listing && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleLanguage}
                className="text-xs"
              >
                {isVietnamese ? "English" : "Tiếng Việt"}
              </Button>
            )}
          </div>
          <p className="text-gray-700 whitespace-pre-line">
            {getDescription()}
          </p>
        </div>
        
        {salon.features && salon.features.length > 0 && (
          <div>
            <h3 className="font-medium text-lg mb-2">Features</h3>
            <div className="flex flex-wrap gap-2">
              {salon.features.map((feature, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {renderContactInfo()}

        <div className="pt-4">
          <Button
            onClick={handleActionClick}
            className="w-full"
            size="lg"
          >
            {!user ? "Sign In to View Contact Details" : "Contact Salon"}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-semibold">
            {getListingTitle()}
          </DialogTitle>
          <DialogDescription>
            {listingType === "job" 
              ? safeGetProperty(listing, "company", "") 
              : safeGetProperty(listing, "location", "")}
          </DialogDescription>
        </DialogHeader>

        {showLogin ? (
          <div className="py-8 text-center">
            <h3 className="text-lg font-medium mb-4">
              Sign in to continue
            </h3>
            <p className="mb-6 text-gray-600">
              Create an account or sign in to apply to jobs and view salon details.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/sign-in">
                <Button className="w-full sm:w-auto" size="lg">
                  Sign In
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  size="lg"
                >
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Display appropriate details based on listing type */}
            {listingType === "job" ? renderJobDetails(listing as Job) : renderSalonDetails(listing as Salon)}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ListingDetailModal;
