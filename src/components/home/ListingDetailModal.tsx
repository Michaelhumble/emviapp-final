
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Calendar, Clock, DollarSign, Home, Award, User, Lock, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { Job } from "@/types/job";
import { SalonSale } from "@/types/salonSale";
import { getLocationString } from "@/utils/location";
import { useAuth } from "@/context/auth";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Badge } from "@/components/ui/badge";
import { determineSalonCategory } from "@/utils/salonImageFallbacks";

// Define a more flexible listing type that can work with our data
export interface BasicListing {
  id?: string;
  title?: string;
  name?: string;
  company?: string;
  description?: string;
  vietnamese_description?: string;
  location?: string;
  role?: string;
  employment_type?: string;
  salary_range?: string;
  has_housing?: boolean;
  weekly_pay?: boolean;
  benefits?: string[];
  specialties?: string[];
  city?: string;
  state?: string;
  asking_price?: number | string;
  size?: string;
  is_urgent?: boolean;
  business_type?: string;
  created_at?: string;
  contact_info?: any;
  image?: string;
  imageUrl?: string;
}

interface ListingDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: Job | SalonSale | BasicListing | null;
  listingType: 'job' | 'salon';
}

const ListingDetailModal = ({ isOpen, onClose, listing, listingType }: ListingDetailModalProps) => {
  const { isVietnamese, toggleLanguage } = useTranslation();
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const [hasSignedUp, setHasSignedUp] = useState(false);

  useEffect(() => {
    // Reset the signed up state when the modal opens
    if (isOpen) {
      setHasSignedUp(false);
    }
  }, [isOpen]);

  if (!listing) return null;

  // Get the title based on language and listing type
  const getTitle = () => {
    if (isVietnamese && 'vietnamese_title' in listing && listing.vietnamese_title) {
      return listing.vietnamese_title;
    }
    if ('title' in listing && listing.title) return listing.title;
    if ('name' in listing && listing.name) return listing.name;
    if ('company' in listing && listing.company) return listing.company;
    if ('role' in listing) {
      return `${listing.role} Position` + (listing.location ? ` | ${listing.location}` : '');
    }
    return listingType === 'job' ? 'Job Listing' : 'Salon For Sale';
  };

  // Get the description based on language and listing type
  const getDescription = () => {
    if (isVietnamese && 'vietnamese_description' in listing && listing.vietnamese_description) {
      return listing.vietnamese_description;
    }
    if ('description' in listing && listing.description) return listing.description;
    return '';
  };

  // Get the location
  const getLocation = () => {
    if ('location' in listing && listing.location) return listing.location;
    if ('city' in listing && 'state' in listing && listing.city && listing.state) {
      return getLocationString(listing.city, listing.state);
    }
    return '';
  };

  // Get date display
  const getDateDisplay = () => {
    if ('created_at' in listing && listing.created_at) {
      return new Date(listing.created_at).toLocaleDateString();
    }
    return '';
  };
  
  // Get image for the listing
  const getImage = () => {
    if ('imageUrl' in listing && listing.imageUrl) return listing.imageUrl;
    if ('image' in listing && listing.image) return listing.image;
    
    // Determine category for appropriate image
    const category = determineSalonCategory(
      getDescription(),
      getTitle()
    );
    
    return '/placeholder.svg';
  };

  // Get perks/features to display
  const getFeatures = () => {
    const features = [];
    
    if ('employment_type' in listing && listing.employment_type) {
      features.push({
        icon: <Clock className="h-4 w-4 text-gray-400" />,
        label: isVietnamese && listing.employment_type === 'Full-time' ? 'Toàn thời gian' : listing.employment_type
      });
    }
    
    if ('has_housing' in listing && listing.has_housing) {
      features.push({
        icon: <Home className="h-4 w-4 text-gray-400" />,
        label: isVietnamese ? 'Có chỗ ở' : 'Housing Included'
      });
    }
    
    if ('weekly_pay' in listing && listing.weekly_pay) {
      features.push({
        icon: <Award className="h-4 w-4 text-gray-400" />,
        label: isVietnamese ? 'Trả lương hàng tuần' : 'Weekly Pay'
      });
    }
    
    if ('salary_range' in listing && listing.salary_range) {
      features.push({
        icon: <DollarSign className="h-4 w-4 text-gray-400" />,
        label: listing.salary_range
      });
    } else if ('price' in listing || 'asking_price' in listing) {
      const price = 'price' in listing ? listing.price : 
                    'asking_price' in listing ? listing.asking_price : null;
      if (price) {
        features.push({
          icon: <DollarSign className="h-4 w-4 text-gray-400" />,
          label: typeof price === 'number' ? `$${price.toLocaleString()}` : price
        });
      }
    }
    
    return features;
  };

  // Get specialties
  const getSpecialties = () => {
    if ('specialties' in listing && listing.specialties) {
      if (typeof listing.specialties === 'string') {
        return [listing.specialties];
      }
      return listing.specialties;
    }
    return [];
  };

  // Handle the sign in action
  const handleSignInClick = () => {
    if (hasSignedUp || isSignedIn) {
      onClose();
    } else {
      navigate(`/sign-in?redirect=${encodeURIComponent(window.location.pathname)}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-3xl overflow-hidden">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-xl md:text-2xl font-bold">
            {getTitle()}
          </DialogTitle>
          <DialogDescription className="flex items-center text-base">
            <MapPin className="h-4 w-4 mr-1.5" />
            {getLocation()}
            {getDateDisplay() && (
              <span className="flex items-center ml-4">
                <Calendar className="h-4 w-4 mr-1.5" />
                {getDateDisplay()}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left column - Image and details */}
          <div className="space-y-4">
            {/* Image */}
            <div className="aspect-video rounded-md overflow-hidden">
              <ImageWithFallback
                src={getImage()}
                alt={getTitle()}
                className="w-full h-full object-cover"
                businessName={getTitle()}
                priority={true}
              />
            </div>
            
            {/* Features/Perks */}
            <div className="space-y-3">
              {getFeatures().length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {getFeatures().map((feature, index) => (
                    <div key={index} className="flex items-center bg-gray-50 px-3 py-1.5 rounded-md">
                      {feature.icon}
                      <span className="ml-1.5 text-sm">{feature.label}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Specialties */}
              {getSpecialties().length > 0 && (
                <div className="pt-2">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    {isVietnamese ? 'Chuyên môn' : 'Specialties'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {getSpecialties().map((specialty, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50">
                        <Sparkles className="h-3 w-3 mr-1 text-amber-500" />
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right column - Description and other details */}
          <div className="space-y-4">
            {/* Toggle language button */}
            {'vietnamese_description' in listing && listing.vietnamese_description && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleLanguage}
                className="mb-2"
              >
                {isVietnamese ? 'View in English' : 'Xem bằng tiếng Việt'}
              </Button>
            )}
            
            {/* Description */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-base font-medium mb-2">
                {isVietnamese ? 'Mô tả' : 'Description'}
              </h3>
              <p className="text-sm whitespace-pre-line">
                {getDescription()}
              </p>
            </div>
            
            {/* Contact info - only visible for authenticated users */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-base font-medium mb-1 flex items-center">
                <User className="h-4 w-4 mr-1.5" />
                {isVietnamese ? 'Thông tin liên hệ' : 'Contact Information'}
              </h3>
              
              {isSignedIn ? (
                <div className="space-y-1.5 mt-3">
                  {'contact_info' in listing && listing.contact_info ? (
                    <>
                      {listing.contact_info.owner_name && (
                        <p className="text-sm"><span className="font-medium">Name:</span> {listing.contact_info.owner_name}</p>
                      )}
                      {listing.contact_info.phone && (
                        <p className="text-sm"><span className="font-medium">Phone:</span> {listing.contact_info.phone}</p>
                      )}
                      {listing.contact_info.email && (
                        <p className="text-sm"><span className="font-medium">Email:</span> {listing.contact_info.email}</p>
                      )}
                      {listing.contact_info.notes && (
                        <p className="text-sm mt-3">{listing.contact_info.notes}</p>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      {isVietnamese ? 
                        'Hãy liên hệ với chúng tôi để biết thêm thông tin.' : 
                        'Please contact EmviApp for contact details.'}
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-center py-3">
                  <div className="flex items-center justify-center mb-3 text-gray-500">
                    <Lock className="h-5 w-5 mr-2" />
                    <p>
                      {isVietnamese 
                        ? "Đăng ký để xem thông tin liên lạc"
                        : "Sign up to view contact details"}
                    </p>
                  </div>
                  <Button 
                    onClick={handleSignInClick}
                    className="w-full"
                  >
                    {isVietnamese ? 'Đăng ký ngay' : 'Sign Up Now'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ListingDetailModal;
