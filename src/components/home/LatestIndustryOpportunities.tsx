
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Building, MapPin } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useTranslation } from "@/hooks/useTranslation";
import { useAuth } from "@/context/auth";
import ListingDetailModal from "./ListingDetailModal";

// Define mock data types
interface JobListing {
  id: string;
  type: 'job';
  title: {
    en: string;
    vi: string;
  };
  location: string;
  details: {
    en: string;
    vi: string;
  };
  tag: {
    en: string;
    vi: string;
    type: 'urgent' | 'salon';
  };
  // Fields mirroring the Job type for better compatibility
  role?: string;
  employment_type?: string;
  salary_range?: string;
  has_housing?: boolean;
  weekly_pay?: boolean;
  benefits?: string[];
}

interface SalonListing {
  id: string;
  type: 'salon';
  title: {
    en: string;
    vi: string;
  };
  location: string;
  details: {
    en: string;
    vi: string;
  };
  tag: {
    en: string;
    vi: string;
    type: 'urgent' | 'salon';
  };
  // Fields mirroring the SalonSale type for better compatibility
  city: string;
  state: string;
  asking_price: number;
  size?: string;
  business_type?: string;
  is_urgent?: boolean;
}

type Listing = JobListing | SalonListing;

const listings: Listing[] = [
  {
    id: "1",
    type: 'job',
    title: {
      en: "Hiring Nail Techs | Jacksonville, FL",
      vi: "Cần Thợ Nails | Jacksonville, FL"
    },
    location: "Jacksonville, FL",
    role: "Nail Tech",
    employment_type: "Full-time",
    salary_range: "$7,000-$12,000/month",
    has_housing: true,
    weekly_pay: true,
    benefits: ["Flexible Hours", "High Tips", "Paid Training"],
    details: {
      en: "High Salary • Housing Provided • Flexible Hours",
      vi: "Bao lương cao • Có nhà cho thợ ở • Giờ linh động"
    },
    tag: {
      en: "Urgent Hire",
      vi: "Tuyển Gấp",
      type: "urgent"
    }
  },
  {
    id: "2",
    type: 'salon',
    title: {
      en: "Salon for Sale | Fresno, CA",
      vi: "Cần Sang Tiệm Nail | Fresno, CA"
    },
    location: "Fresno, CA",
    city: "Fresno",
    state: "CA",
    asking_price: 450000,
    size: "2700",
    business_type: "Nail Salon",
    is_urgent: true,
    details: {
      en: "2700 sqft • 20 Tables • Busy Location • $450K Negotiable",
      vi: "2700 sqft • 20 Bàn 20 Ghế • Khu Đông Khách • $450K Thương Lượng"
    },
    tag: {
      en: "Salon for Sale",
      vi: "Sang Tiệm",
      type: "salon"
    }
  },
  {
    id: "3",
    type: 'job',
    title: {
      en: "Hiring Powder & Full Tech | Charlotte, NC",
      vi: "Cần Thợ Bột & Everything | Charlotte, NC"
    },
    location: "Charlotte, NC",
    role: "Powder & Full Tech",
    employment_type: "Full-time",
    salary_range: "$1,800/week",
    has_housing: false,
    weekly_pay: true,
    benefits: ["Friendly Environment", "Salary Guarantee"],
    details: {
      en: "$1,800/week • Friendly Environment • Salary Guarantee",
      vi: "$1,800/tuần • Môi trường vui vẻ • Bao lương"
    },
    tag: {
      en: "Urgent Hire",
      vi: "Tuyển Gấp",
      type: "urgent"
    }
  },
  {
    id: "4",
    type: 'salon',
    title: {
      en: "Salon for Sale | Kennesaw, GA",
      vi: "Tiệm Nail Cần Bán | Kennesaw, GA"
    },
    location: "Kennesaw, GA",
    city: "Kennesaw",
    state: "GA",
    asking_price: 280000,
    business_type: "Nail Salon",
    is_urgent: false,
    details: {
      en: "$20K–28K Monthly Income • 10 Chairs • Fully Equipped",
      vi: "Thu nhập $20K–28K/tháng • 10 ghế spa • Đầy đủ đồ nghề"
    },
    tag: {
      en: "Salon for Sale",
      vi: "Sang Tiệm",
      type: "salon"
    }
  },
  {
    id: "5",
    type: 'job',
    title: {
      en: "Urgent Nail Tech Hiring | Silver Spring, MD",
      vi: "Cần Thợ Nails | Silver Spring, MD"
    },
    location: "Silver Spring, MD",
    role: "Nail Tech",
    employment_type: "Full-time",
    salary_range: "$1,500-$2,000/week",
    has_housing: false,
    weekly_pay: true,
    benefits: ["Stable Clients", "High Tips", "Drama-Free"],
    details: {
      en: "Stable Clients • High Tips • Drama-Free",
      vi: "Khách ổn định • Tip cao • Không drama"
    },
    tag: {
      en: "Urgent Hire",
      vi: "Tuyển Gấp",
      type: "urgent"
    }
  },
  {
    id: "6",
    type: 'salon',
    title: {
      en: "Salon for Sale | Daniel Island, SC",
      vi: "Sang Tiệm Nail | Daniel Island, SC"
    },
    location: "Daniel Island, SC",
    city: "Daniel Island",
    state: "SC",
    asking_price: 350000,
    business_type: "Nail Salon",
    is_urgent: true,
    details: {
      en: "10 Stations • Prime Shopping Center • White Neighborhood",
      vi: "10 Bàn 10 Ghế • Khu Mỹ Trắng 100% • Khu shopping lớn"
    },
    tag: {
      en: "Salon for Sale",
      vi: "Sang Tiệm",
      type: "salon"
    }
  },
  {
    id: "7",
    type: 'job',
    title: {
      en: "Need Dip & Powder Techs | Tampa, FL",
      vi: "Tuyển Thợ Dip & Bột | Tampa, FL"
    },
    location: "Tampa, FL",
    role: "Dip & Powder Tech",
    employment_type: "Full-time",
    salary_range: "$1,800/week",
    has_housing: true,
    weekly_pay: false,
    benefits: ["Free Housing", "6-day work week"],
    details: {
      en: "$1,800/6 days • Free Housing",
      vi: "$1,800/6 ngày • Có chỗ ở miễn phí"
    },
    tag: {
      en: "Urgent Hire",
      vi: "Tuyển Gấp",
      type: "urgent"
    }
  },
  {
    id: "8",
    type: 'salon',
    title: {
      en: "Salon for Sale | Fontana, CA",
      vi: "Bán Tiệm Nail | Fontana, CA"
    },
    location: "Fontana, CA",
    city: "Fontana",
    state: "CA",
    asking_price: 90000,
    size: "1173",
    business_type: "Nail Salon",
    is_urgent: false,
    details: {
      en: "1173 sqft • Renovated Plaza • $90K",
      vi: "1173 sqft • Plaza mới nâng cấp • Giá $90K"
    },
    tag: {
      en: "Salon for Sale",
      vi: "Sang Tiệm",
      type: "salon"
    }
  },
];

const LatestIndustryOpportunities = () => {
  const isMobile = useIsMobile();
  const { isVietnamese } = useTranslation();
  const { isSignedIn } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Container animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Item animation variants
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Auto-rotate listings
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setActiveIndex(prevIndex => (prevIndex + 1) % listings.length);
      }, 5000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused, listings.length]);

  // Function to handle opening the modal
  const handleViewDetails = (listing: Listing) => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  // Function to get tag style based on type
  const getTagStyle = (type: 'urgent' | 'salon') => {
    if (type === 'urgent') {
      return 'bg-orange-100 text-orange-800';
    }
    return 'bg-purple-100 text-purple-800';
  };

  // Function to get icon based on type
  const getIcon = (type: 'urgent' | 'salon') => {
    if (type === 'urgent') {
      return <Briefcase className="h-3 w-3 mr-1" />;
    }
    return <Building className="h-3 w-3 mr-1" />;
  };

  const renderListingCard = (listing: Listing) => (
    <Card 
      className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <CardContent className="p-5 flex flex-col h-full">
        {/* Tag */}
        <div className={`inline-flex items-center text-xs px-2 py-1 rounded-full self-start mb-2 ${getTagStyle(listing.tag.type)}`}>
          {getIcon(listing.tag.type)}
          <span>{isVietnamese ? listing.tag.vi : listing.tag.en}</span>
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-semibold mb-1">
          {isVietnamese ? listing.title.vi : listing.title.en}
        </h3>
        <div className="text-xs text-gray-500 mb-2">
          {isVietnamese ? listing.title.en : listing.title.vi}
        </div>
        
        {/* Location */}
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" /> {listing.location}
        </div>
        
        {/* Details */}
        <p className="text-sm text-gray-600 mb-2">
          {isVietnamese ? listing.details.vi : listing.details.en}
        </p>
        <p className="text-xs text-gray-400 mb-4">
          {isVietnamese ? listing.details.en : listing.details.vi}
        </p>
        
        {/* Contact Info - Gated */}
        <div className="text-sm text-gray-500 italic mb-4 mt-auto">
          {isVietnamese ? "🔒 Đăng ký để xem chi tiết liên hệ" : "🔒 Sign up to view contact details"}
        </div>
        
        {/* CTA Button */}
        <Button 
          className="w-full" 
          onClick={() => handleViewDetails(listing)}
        >
          {listing.type === 'job' 
            ? (isVietnamese ? "Ứng Tuyển Ngay" : "Apply Now") 
            : (isVietnamese ? "Xem Chi Tiết" : "View Details")}
        </Button>
      </CardContent>
    </Card>
  );

  // Render the listings as a carousel on mobile
  if (isMobile) {
    return (
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {isVietnamese ? "Cơ Hội Mới Trong Ngành Làm Đẹp" : "Latest Beauty Industry Opportunities"}
            </h2>
            <p className="text-gray-600">
              {isVietnamese 
                ? "Công việc và tiệm nails thật — được cập nhật mỗi ngày." 
                : "Real jobs, real salons for sale, real people — updated daily."}
            </p>
          </motion.div>

          <div 
            className="mt-8" 
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <Carousel className="w-full">
              <CarouselContent>
                {listings.map((listing) => (
                  <CarouselItem key={listing.id}>
                    {renderListingCard(listing)}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div className="mt-10 flex justify-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/jobs">
                {isVietnamese ? "Xem Tất Cả Việc Làm" : "See All Jobs"}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/salons">
                {isVietnamese ? "Xem Tất Cả Tiệm Bán" : "See All Salons for Sale"}
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Modal for showing listing details */}
        <ListingDetailModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          listing={selectedListing}
          listingType={selectedListing?.type || 'job'}
        />
      </section>
    );
  }

  // Render the listings as a grid on desktop
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {isVietnamese ? "Cơ Hội Mới Trong Ngành Làm Đẹp" : "Latest Beauty Industry Opportunities"}
          </h2>
          <p className="text-lg text-gray-600">
            {isVietnamese 
              ? "Công việc và tiệm nails thật — được cập nhật mỗi ngày." 
              : "Real jobs, real salons for sale, real people — updated daily."}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {listings.map((listing) => (
            <motion.div key={listing.id} variants={item}>
              {renderListingCard(listing)}
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 flex justify-center gap-6">
          <Button variant="outline" size="lg" asChild>
            <Link to="/jobs">
              {isVietnamese ? "Xem Tất Cả Việc Làm" : "See All Jobs"}
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/salons">
              {isVietnamese ? "Xem Tất Cả Tiệm Bán" : "See All Salons for Sale"}
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Modal for showing listing details */}
      <ListingDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        listing={selectedListing}
        listingType={selectedListing?.type || 'job'}
      />
    </section>
  );
};

export default LatestIndustryOpportunities;
