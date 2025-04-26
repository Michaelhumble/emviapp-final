
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { Job } from "@/types/job";
import { SalonSale } from "@/types/salonSale";
import { getLocationString } from "@/utils/location";

// Define a more flexible listing type that can work with our sample data
export interface BasicListing {
  title?: string;
  description?: string;
  location?: string;
  role?: string;
  employment_type?: string;
  salary_range?: string;
  has_housing?: boolean;
  weekly_pay?: boolean;
  benefits?: string[];
  city?: string;
  state?: string;
  asking_price?: number | string;
  size?: string;
  is_urgent?: boolean;
  business_type?: string;
  created_at?: string;
}

interface ListingDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: Job | SalonSale | BasicListing | null;
  listingType: 'job' | 'salon';
}

const ListingDetailModal = ({ isOpen, onClose, listing, listingType }: ListingDetailModalProps) => {
  const { isVietnamese } = useTranslation();
  const [title, setTitle] = useState<{ en: string; vi: string }>({ en: '', vi: '' });
  const [details, setDetails] = useState<{ en: string; vi: string }>({ en: '', vi: '' });
  
  useEffect(() => {
    if (!listing) return;
    
    if (listingType === 'job') {
      const jobListing = listing as (Job | BasicListing);
      
      // Extract title
      setTitle({
        en: jobListing.title || `Hiring ${jobListing.role || 'Nail Tech'} | ${jobListing.location || ''}`,
        vi: `Cần Thợ ${jobListing.role?.includes('Powder') ? 'Bột' : 'Nails'} | ${jobListing.location || ''}`
      });
      
      // Extract details
      const enDetails = [
        jobListing.employment_type,
        jobListing.salary_range,
        jobListing.has_housing ? 'Housing Provided' : '',
        jobListing.weekly_pay ? 'Weekly Pay' : '',
        jobListing.benefits?.join(', ')
      ].filter(Boolean).join(' • ');
      
      const viDetails = [
        jobListing.employment_type === 'Full-time' ? 'Toàn thời gian' : 
          jobListing.employment_type === 'Part-time' ? 'Bán thời gian' : jobListing.employment_type,
        jobListing.salary_range,
        jobListing.has_housing ? 'Có chỗ ở' : '',
        jobListing.weekly_pay ? 'Trả lương hàng tuần' : '',
        'Nhiều khách tốt'
      ].filter(Boolean).join(' • ');
      
      setDetails({ en: enDetails, vi: viDetails });
    } else {
      const salonListing = listing as (SalonSale | BasicListing);
      
      // Get location by constructing it from city/state or using a helper function
      let displayLocation = '';
      
      if ('location' in salonListing && salonListing.location) {
        displayLocation = salonListing.location;
      } else if (salonListing.city || salonListing.state) {
        displayLocation = getLocationString(salonListing.city, salonListing.state);
      } else {
        displayLocation = 'Unknown Location';
      }
      
      setTitle({
        en: `Salon for Sale | ${displayLocation}`,
        vi: `Cần Sang Tiệm Nail | ${displayLocation}`
      });
      
      // Extract details
      const askingPrice = salonListing.asking_price ? 
        (typeof salonListing.asking_price === 'string' ? 
          salonListing.asking_price : 
          `$${new Intl.NumberFormat('en-US').format(salonListing.asking_price as number)}`
        ) : 'Contact for price';
      
      const isUrgent = 'is_urgent' in salonListing ? salonListing.is_urgent : false;
      
      const enDetails = [
        salonListing.size ? `${salonListing.size} sqft` : '',
        askingPrice + (isUrgent ? ' Negotiable' : ''),
        'Prime Location',
        salonListing.business_type
      ].filter(Boolean).join(' • ');
      
      const viDetails = [
        salonListing.size ? `${salonListing.size} sqft` : '',
        askingPrice + (isUrgent ? ' Thương Lượng' : ''),
        'Khu Đông Khách',
        salonListing.business_type
      ].filter(Boolean).join(' • ');
      
      setDetails({ en: enDetails, vi: viDetails });
    }
  }, [listing, listingType]);
  
  if (!listing) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl space-y-1">
            <div className="font-bold">{isVietnamese ? title.vi : title.en}</div>
            <div className="text-sm text-gray-500 font-normal">
              {isVietnamese ? title.en : title.vi}
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          {/* Listing details */}
          <div className="space-y-2">
            <div className="text-base font-medium">
              {isVietnamese ? details.vi : details.en}
            </div>
            <div className="text-sm text-gray-500">
              {isVietnamese ? details.en : details.vi}
            </div>
          </div>
          
          {/* Description section */}
          {listing.description && (
            <div className="space-y-2 py-2">
              <h4 className="text-sm font-medium text-gray-700">
                {isVietnamese ? 'Mô Tả' : 'Description'}
              </h4>
              <p className="text-sm text-gray-600">{listing.description}</p>
            </div>
          )}
          
          {/* Locked contact info message */}
          <div className="bg-gray-50 border border-gray-100 p-4 rounded-md text-center">
            <div className="flex items-center justify-center mb-2 text-gray-500">
              <Lock className="h-4 w-4 mr-1" />
              <p>
                {isVietnamese 
                  ? "🔒 Đăng ký hoặc đăng nhập để xem thông tin liên hệ đầy đủ." 
                  : "🔒 Please sign up or log in to view full contact details."}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 justify-center mt-4">
              <Button asChild>
                <Link to="/auth/signup">Đăng Ký / Sign Up</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/auth/login">Đăng Nhập / Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ListingDetailModal;
