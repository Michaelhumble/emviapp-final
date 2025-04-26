
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { Job } from "@/types/job";
import { SalonSale } from "@/types/salonSale";

interface ListingDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: Job | SalonSale | null;
  listingType: 'job' | 'salon';
}

const ListingDetailModal = ({ isOpen, onClose, listing, listingType }: ListingDetailModalProps) => {
  const { isVietnamese } = useTranslation();
  const [title, setTitle] = useState<{ en: string; vi: string }>({ en: '', vi: '' });
  const [details, setDetails] = useState<{ en: string; vi: string }>({ en: '', vi: '' });
  
  useEffect(() => {
    if (!listing) return;
    
    if (listingType === 'job') {
      const jobListing = listing as Job;
      
      // Extract title
      setTitle({
        en: jobListing.title || `Hiring ${jobListing.role || 'Nail Tech'} | ${jobListing.location}`,
        vi: `Cần Thợ ${jobListing.role?.includes('Powder') ? 'Bột' : 'Nails'} | ${jobListing.location}`
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
      const salonListing = listing as SalonSale;
      
      // Extract title
      setTitle({
        en: `Salon for Sale | ${salonListing.city}, ${salonListing.state}`,
        vi: `Cần Sang Tiệm Nail | ${salonListing.city}, ${salonListing.state}`
      });
      
      // Extract details
      const enDetails = [
        salonListing.size ? `${salonListing.size} sqft` : '',
        salonListing.asking_price ? `$${new Intl.NumberFormat('en-US').format(salonListing.asking_price)} ${salonListing.is_urgent ? 'Negotiable' : ''}` : 'Contact for price',
        'Prime Location',
        salonListing.business_type
      ].filter(Boolean).join(' • ');
      
      const viDetails = [
        salonListing.size ? `${salonListing.size} sqft` : '',
        salonListing.asking_price ? `$${new Intl.NumberFormat('en-US').format(salonListing.asking_price)} ${salonListing.is_urgent ? 'Thương Lượng' : ''}` : 'Liên hệ để biết giá',
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
