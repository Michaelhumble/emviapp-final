
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { motion, useAnimation } from "framer-motion";
import { useAuth } from "@/context/auth";
import ListingDetailModal, { BasicListing } from "./ListingDetailModal";
import { Job } from "@/types/job";
import { SalonSale } from "@/types/salonSale";

interface JobListing extends BasicListing {
  type: 'job';
  title: string;
  location: string;
  employment_type: string;
  salary_range: string;
  description?: string;
  has_housing?: boolean;
  weekly_pay?: boolean;
  urgent?: boolean;
  vietnamese_title?: string;
  vietnamese_description?: string;
}

interface SalonListing extends BasicListing {
  type: 'salon';
  title: string;
  location: string;
  size?: string;
  asking_price: string | number;
  description?: string;
  is_urgent?: boolean;
  business_type?: string;
  vietnamese_title?: string;
  vietnamese_description?: string;
}

type Listing = JobListing | SalonListing;

// Sample data - jobs and salons for sale
const listings: Listing[] = [
  {
    type: 'job',
    title: 'Hiring Nail Techs',
    vietnamese_title: 'Cần Thợ Nails',
    location: 'Jacksonville, FL',
    employment_type: 'Full-time + Part-time',
    salary_range: 'High Salary',
    description: 'High Salary • Housing Provided • Flexible Hours',
    vietnamese_description: 'Bao lương cao • Có nhà cho thợ ở',
    has_housing: true,
    weekly_pay: true,
    urgent: true,
    created_at: new Date().toISOString()
  },
  {
    type: 'salon',
    title: 'Salon for Sale',
    vietnamese_title: 'Cần Sang Tiệm Nail',
    location: 'Fresno, CA',
    size: '2700 sqft',
    asking_price: '450000',
    description: '2700 sqft • 20 Tables • Busy Location • $450K Negotiable',
    vietnamese_description: '2700 sqft • 20 Bàn 20 Ghế • Khu Đông Khách • $450K Thương Lượng',
    is_urgent: true,
    business_type: 'Nail Salon',
    created_at: new Date().toISOString()
  },
  {
    type: 'job',
    title: 'Hiring Powder & Full Tech',
    vietnamese_title: 'Cần Thợ Bột & Everything',
    location: 'Charlotte, NC',
    employment_type: 'Full-time',
    salary_range: '$1,800/week',
    description: '$1,800/week • Friendly Environment • Salary Guarantee',
    vietnamese_description: '$1,800/tuần • Môi trường vui vẻ • Bao lương',
    weekly_pay: true,
    urgent: true,
    created_at: new Date().toISOString()
  },
  {
    type: 'salon',
    title: 'Salon for Sale',
    vietnamese_title: 'Tiệm Nail Cần Bán',
    location: 'Kennesaw, GA',
    asking_price: '25000',
    description: '$20K–28K Monthly Income • 10 Chairs • Fully Equipped',
    vietnamese_description: 'Thu nhập $20K–28K/tháng • 10 ghế spa • Đầy đủ đồ nghề',
    business_type: 'Nail Salon',
    created_at: new Date().toISOString()
  },
  {
    type: 'job',
    title: 'Urgent Nail Tech Hiring',
    vietnamese_title: 'Cần Thợ Nails',
    location: 'Silver Spring, MD',
    employment_type: 'Full-time + Part-time',
    salary_range: 'High Tips',
    description: 'Stable Clients • High Tips • Drama-Free',
    vietnamese_description: 'Khách ổn định • Tip cao • Không drama',
    urgent: true,
    created_at: new Date().toISOString()
  },
  {
    type: 'salon',
    title: 'Salon for Sale',
    vietnamese_title: 'Sang Tiệm Nail',
    location: 'Daniel Island, SC',
    asking_price: '180000',
    description: '10 Stations • Prime Shopping Center • White Neighborhood',
    vietnamese_description: '10 Bàn 10 Ghế • Khu Mỹ Trắng 100% • Khu shopping lớn',
    is_urgent: false,
    business_type: 'Nail Salon',
    created_at: new Date().toISOString()
  },
  {
    type: 'job',
    title: 'Need Dip & Powder Techs',
    vietnamese_title: 'Tuyển Thợ Dip & Bột',
    location: 'Tampa, FL',
    employment_type: 'Full-time',
    salary_range: '$1,800/6 days',
    description: '$1,800/6 days • Free Housing',
    vietnamese_description: '$1,800/6 ngày • Có chỗ ở miễn phí',
    has_housing: true,
    urgent: true,
    created_at: new Date().toISOString()
  },
  {
    type: 'salon',
    title: 'Salon for Sale',
    vietnamese_title: 'Bán Tiệm Nail',
    location: 'Fontana, CA',
    size: '1173 sqft',
    asking_price: '90000',
    description: '1173 sqft • Renovated Plaza • $90K',
    vietnamese_description: '1173 sqft • Plaza mới nâng cấp • Giá $90K',
    business_type: 'Nail Salon',
    created_at: new Date().toISOString()
  }
];

const LatestIndustryOpportunities = () => {
  const { isVietnamese } = useTranslation();
  const { isSignedIn } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleListings, setVisibleListings] = useState<Listing[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideControls = useAnimation();
  const isMobile = window.innerWidth < 768;
  const visibleCount = isMobile ? 1 : Math.min(4, listings.length);
  const [selectedListing, setSelectedListing] = useState<Job | SalonSale | BasicListing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listingType, setListingType] = useState<'job' | 'salon'>('job');

  // Set number of visible listings based on screen size
  useEffect(() => {
    function updateVisibleListings() {
      const isMobileView = window.innerWidth < 768;
      const count = isMobileView ? 1 : Math.min(4, listings.length);
      
      // Get current listings based on activeIndex
      let items: Listing[] = [];
      
      if (isMobileView) {
        // On mobile we only show 1 item
        items = [listings[activeIndex]];
      } else {
        // On desktop we show 4 items in a row, with proper wrapping
        for (let i = 0; i < count; i++) {
          const idx = (activeIndex + i) % listings.length;
          items.push(listings[idx]);
        }
      }
      
      setVisibleListings(items);
    }

    updateVisibleListings();
    
    const handleResize = () => {
      updateVisibleListings();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [activeIndex]);

  // Auto-rotate carousel every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeIndex, isPaused]);

  const goToPrevious = () => {
    slideControls.start({ x: '100%', transition: { duration: 0.3 } })
      .then(() => {
        setActiveIndex(prev => (prev === 0 ? listings.length - 1 : prev - 1));
        slideControls.set({ x: '-100%' });
        slideControls.start({ x: 0, transition: { duration: 0.3 } });
      });
  };

  const goToNext = () => {
    slideControls.start({ x: '-100%', transition: { duration: 0.3 } })
      .then(() => {
        setActiveIndex(prev => (prev === listings.length - 1 ? 0 : prev + 1));
        slideControls.set({ x: '100%' });
        slideControls.start({ x: 0, transition: { duration: 0.3 } });
      });
  };

  const handleDetailView = (listing: Listing) => {
    // Create a compatible listing object for the modal
    const modalListing: BasicListing = {
      ...listing,
      // Map properties from Listing to properties expected by the modal
      title: listing.title,
      description: listing.description,
      role: listing.type === 'job' ? listing.title.split('|')[0].trim() : undefined,
      employment_type: listing.type === 'job' ? listing.employment_type : undefined,
      salary_range: listing.type === 'job' ? listing.salary_range : undefined,
      has_housing: listing.type === 'job' ? listing.has_housing : undefined,
      weekly_pay: listing.type === 'job' ? listing.weekly_pay : undefined,
      asking_price: listing.type === 'salon' ? listing.asking_price : undefined,
      size: listing.type === 'salon' ? listing.size : undefined,
      is_urgent: listing.type === 'salon' ? listing.is_urgent : undefined,
      business_type: listing.type === 'salon' ? listing.business_type : undefined,
      location: listing.location,
      created_at: listing.created_at,
    };
    
    setSelectedListing(modalListing);
    setListingType(listing.type);
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    setSelectedListing(null);
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Latest Beauty Industry Opportunities
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {isVietnamese 
              ? "Công việc và tiệm nails thật — được cập nhật mỗi ngày."
              : "Real jobs, real salons for sale, real people — updated daily."}
          </p>
        </div>

        <div 
          ref={containerRef} 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative overflow-hidden">
            <motion.div 
              animate={slideControls}
              initial={{ x: 0 }}
              className="flex flex-row"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
                {visibleListings.map((listing, index) => (
                  <div 
                    key={`${listing.type}-${index}-${listing.location}`}
                    className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className={`text-xs font-medium rounded-full px-2 py-0.5 ${listing.type === 'job' ? 'bg-red-100 text-red-600' : 'bg-violet-100 text-violet-600'}`}>
                        {listing.type === 'job' ? '🔥 Tuyển Gấp / Urgent Hire' : '🏢 Sang Tiệm / Salon for Sale'}
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      {/* Vietnamese title */}
                      <h3 className="font-bold">
                        {listing.vietnamese_title} | {listing.location}
                      </h3>
                      
                      {/* English title */}
                      <p className="text-gray-600 text-sm italic">
                        {listing.title} | {listing.location}
                      </p>
                      
                      {/* Vietnamese Description */}
                      <div className="text-sm text-gray-800">
                        {listing.vietnamese_description}
                      </div>
                      
                      {/* English Description */}
                      <div className="text-xs text-gray-600">
                        {listing.description}
                      </div>
                    </div>
                    
                    {/* Contact info - gated */}
                    <div className="text-sm text-gray-500 italic mb-4">
                      {isVietnamese 
                        ? "🔒 Đăng ký để xem chi tiết liên hệ"
                        : "🔒 Sign up to view contact details"}
                    </div>
                    
                    <Button 
                      className="w-full" 
                      onClick={() => handleDetailView(listing)}
                    >
                      {listing.type === 'job' 
                        ? (isVietnamese ? "Ứng Tuyển Ngay" : "Apply Now")
                        : (isVietnamese ? "Xem Chi Tiết" : "View Details")
                      }
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Navigation buttons for mobile and desktop */}
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 hidden md:flex rounded-full border shadow-sm" 
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 hidden md:flex rounded-full border shadow-sm" 
            onClick={goToNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Mobile indicators */}
          <div className="flex justify-center gap-1 mt-4 md:hidden">
            {listings.map((_, i) => (
              <button 
                key={`indicator-${i}`} 
                className={`w-2 h-2 rounded-full ${i === activeIndex ? 'bg-primary' : 'bg-gray-200'}`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        </div>

        {/* Call to action buttons at the bottom */}
        <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/jobs">
              {isVietnamese ? "Xem Tất Cả Việc Làm" : "See All Jobs"} <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link to="/sell-salon">
              {isVietnamese ? "Xem Tất Cả Tiệm Bán" : "See All Salons for Sale"} <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      
      <ListingDetailModal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        listing={selectedListing}
        listingType={listingType}
      />
    </section>
  );
};

export default LatestIndustryOpportunities;
