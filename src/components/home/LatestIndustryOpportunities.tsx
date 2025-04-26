
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/context/auth";
import { useTranslation } from "@/hooks/useTranslation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import { MapPin, Briefcase, Building, ArrowRight, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AuthAction from "@/components/common/AuthAction";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

interface ListingItem {
  id: string;
  type: "job" | "salon";
  title: string;
  location: string;
  details: string[];
  image?: string;
  isUrgent: boolean;
  vietnameseTitle?: string;
  vietnameseDetails?: string[];
}

const LatestIndustryOpportunities = () => {
  const isMobile = useIsMobile();
  const { isSignedIn } = useAuth();
  const { t, lang, isVietnamese } = useTranslation();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const listings: ListingItem[] = [
    {
      id: "1",
      type: "job",
      title: "Hiring Nail Tech | Wheeling, WV",
      vietnameseTitle: "Tuyển Nail Tech | Wheeling, WV",
      location: "Wheeling, WV",
      details: ["$7,000–$12,000/month", "Free Housing", "High-End Clients"],
      vietnameseDetails: ["$7,000–$12,000/tháng", "Chỗ ở miễn phí", "Khách hàng cao cấp"],
      isUrgent: true,
      image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "2",
      type: "salon",
      title: "Salon for Sale | Fresno, CA",
      vietnameseTitle: "Tiệm Nail Bán | Fresno, CA",
      location: "Fresno, CA",
      details: ["2700 sqft", "$450K Negotiable", "20 Tables/Chairs", "Busy Location"],
      vietnameseDetails: ["2700 sqft", "$450K Thương lượng", "20 Bàn/Ghế", "Vị trí đông đúc"],
      isUrgent: false,
      image: "https://images.unsplash.com/photo-1613843351058-1dd06fccdc6a?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "3",
      type: "job",
      title: "Need 2 Powder Techs | Tampa, FL",
      vietnameseTitle: "Cần 2 Thợ Bột | Tampa, FL",
      location: "Tampa, FL",
      details: ["$1,800/week", "Housing Provided", "No Rent"],
      vietnameseDetails: ["$1,800/tuần", "Có chỗ ở", "Không tính tiền thuê"],
      isUrgent: true,
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "4",
      type: "job",
      title: "Full-Time Nail Tech | Silver Spring, MD",
      vietnameseTitle: "Thợ Nail Toàn Thời Gian | Silver Spring, MD",
      location: "Silver Spring, MD",
      details: ["Stable Clients", "High Tips", "Drama-Free Environment"],
      vietnameseDetails: ["Khách hàng ổn định", "Típ cao", "Môi trường làm việc tốt"],
      isUrgent: true,
      image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "5",
      type: "salon",
      title: "Salon for Sale | Daniel Island, SC",
      vietnameseTitle: "Tiệm Nail Bán | Daniel Island, SC",
      location: "Daniel Island, SC",
      details: ["10 Tables & Chairs", "Prime Shopping Center", "Contact for Price"],
      vietnameseDetails: ["10 Bàn & Ghế", "Trung tâm mua sắm đắc địa", "Liên hệ để biết giá"],
      isUrgent: false,
      image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "6",
      type: "job",
      title: "Hiring Dip & Gel Tech | Charlotte, NC",
      vietnameseTitle: "Tuyển Thợ Nhúng & Gel | Charlotte, NC",
      location: "Charlotte, NC",
      details: ["$1,500/week", "Clean Environment", "Flexible Hours"],
      vietnameseDetails: ["$1,500/tuần", "Môi trường sạch sẽ", "Giờ làm linh hoạt"],
      isUrgent: true,
      image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "7",
      type: "salon",
      title: "Large Nail Salon for Sale | Kennesaw, GA",
      vietnameseTitle: "Tiệm Nail Lớn Cần Bán | Kennesaw, GA",
      location: "Kennesaw, GA",
      details: ["Income $20K–$28K/month", "Fully Equipped", "Beautiful Location"],
      vietnameseDetails: ["Thu nhập $20K–$28K/tháng", "Đầy đủ thiết bị", "Vị trí đẹp"],
      isUrgent: false,
      image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "8",
      type: "job",
      title: "Hiring Nail Tech | Highlands Ranch, CO",
      vietnameseTitle: "Tuyển Thợ Nail | Highlands Ranch, CO",
      location: "Highlands Ranch, CO",
      details: ["Part-Time", "$1,200–$1,500/week", "Friendly Team"],
      vietnameseDetails: ["Bán thời gian", "$1,200–$1,500/tuần", "Nhóm thân thiện"],
      isUrgent: true,
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "9",
      type: "salon",
      title: "Salon for Sale | Fontana, CA",
      vietnameseTitle: "Tiệm Nail Bán | Fontana, CA",
      location: "Fontana, CA",
      details: ["1173 sqft", "Rent $3,400", "Newly Renovated Plaza"],
      vietnameseDetails: ["1173 sqft", "Tiền thuê $3,400", "Trung tâm mới tu sửa"],
      isUrgent: false,
      image: "https://images.unsplash.com/photo-1613843351058-1dd06fccdc6a?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  // Prioritize urgent and high-income listings
  const sortedListings = [...listings].sort((a, b) => {
    if (a.isUrgent && !b.isUrgent) return -1;
    if (!a.isUrgent && b.isUrgent) return 1;
    
    // Check for income potential in details
    const aHasHighIncome = a.details.some(detail => 
      detail.includes("$") && 
      (detail.includes("K") || parseInt(detail.replace(/\D/g, '')) > 1000)
    );
    
    const bHasHighIncome = b.details.some(detail => 
      detail.includes("$") && 
      (detail.includes("K") || parseInt(detail.replace(/\D/g, '')) > 1000)
    );
    
    if (aHasHighIncome && !bHasHighIncome) return -1;
    if (!aHasHighIncome && bHasHighIncome) return 1;
    
    return 0;
  });

  // Set up auto-rotation
  useEffect(() => {
    if (api && !isPaused) {
      autoplayRef.current = setInterval(() => {
        api.scrollNext();
      }, 5000);
    }
    
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [api, isPaused]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const getContactMessage = () => {
    return isVietnamese 
      ? "🔒 Đăng ký để xem chi tiết liên hệ"
      : "🔒 Sign up to view contact details";
  };

  const getCtaText = () => {
    return isSignedIn 
      ? isVietnamese ? "Xem Chi Tiết" : "View Details"
      : isVietnamese ? "Đăng Ký" : "Sign Up";
  };

  const getBilingual = (english: string, vietnamese?: string) => {
    if (!vietnamese) return english;
    
    if (isVietnamese) {
      return vietnamese;
    }
    
    return english;
  };

  const renderListingCard = (listing: ListingItem) => {
    const handleAction = () => {
      // This would be replaced with actual logic in a real implementation
      console.log(`Action for ${listing.title}`);
      return true;
    };
    
    return (
      <Card 
        className="h-full shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
        onMouseEnter={handlePause}
        onMouseLeave={handleResume}
        onTouchStart={handlePause}
        onTouchEnd={handleResume}
      >
        <div className="relative h-40 overflow-hidden bg-gray-100">
          <ImageWithFallback
            src={listing.image}
            alt={getBilingual(listing.title, listing.vietnameseTitle)}
            className="w-full h-full object-cover"
            fallbackImage={
              listing.type === "job" 
                ? "https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=2070&auto=format&fit=crop" 
                : "https://images.unsplash.com/photo-1613843351058-1dd06fccdc6a?q=80&w=2070&auto=format&fit=crop"
            }
            businessName={getBilingual(listing.title, listing.vietnameseTitle)}
          />
          <div className="absolute top-2 right-2">
            <Badge 
              className={
                listing.isUrgent 
                  ? "bg-red-100 text-red-800 border border-red-200"
                  : "bg-purple-50 text-purple-800 border border-purple-100"
              }
            >
              {listing.type === "job" 
                ? listing.isUrgent 
                  ? "🔥 Urgent Hire" 
                  : "👩‍💼 Job Opening"
                : "🏢 Salon for Sale"}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-medium mb-1 text-lg">
            {getBilingual(listing.title, listing.vietnameseTitle)}
          </h3>
          
          <div className="flex items-center text-gray-600 text-sm mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{listing.location}</span>
          </div>
          
          <div className="space-y-1">
            {listing.details.map((detail, i) => (
              <div key={i} className="flex items-start">
                <span className="text-sm">
                  {getBilingual(detail, listing.vietnameseDetails?.[i])}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-3 text-sm text-gray-500 italic">
            {getContactMessage()}
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          {isSignedIn ? (
            <Button 
              className="w-full" 
              variant={listing.type === "job" ? "default" : "outline"}
              asChild
            >
              <Link to={listing.type === "job" ? "/jobs" : "/salon-marketplace"}>
                {getCtaText()} <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          ) : (
            <AuthAction onAction={handleAction} creditMessage="View all job and salon listings for free">
              <Button 
                className="w-full" 
                variant={listing.type === "job" ? "default" : "outline"}
              >
                <Lock className="h-4 w-4 mr-1" /> {getCtaText()}
              </Button>
            </AuthAction>
          )}
        </CardFooter>
      </Card>
    );
  };

  // Responsive layout with grid for desktop and carousel for mobile
  if (isMobile) {
    return (
      <section className="py-16 px-4 overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Latest Beauty Industry Opportunities</h2>
            <p className="text-gray-600">
              {isVietnamese 
                ? "Công việc thật, tiệm bán thật, cập nhật hàng ngày."
                : "Real jobs, real salons for sale, real people — updated daily."}
            </p>
          </div>

          <Carousel 
            setApi={setApi}
            className="w-full max-w-sm mx-auto"
          >
            <CarouselContent>
              {sortedListings.slice(0, 6).map((listing) => (
                <CarouselItem key={listing.id} className="p-1">
                  {renderListingCard(listing)}
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4">
              <div className="flex gap-1">
                {Array.from({ length: Math.min(count, 6) }).map((_, i) => (
                  <button
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i === current % count ? "bg-primary" : "bg-gray-300"
                    }`}
                    onClick={() => api?.scrollTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Button variant="outline" asChild>
              <Link to="/jobs">
                {isVietnamese ? "Xem Tất Cả Công Việc" : "See All Jobs"}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/salon-marketplace">
                {isVietnamese ? "Xem Tất Cả Tiệm Bán" : "See All Salons for Sale"}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Desktop view
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Latest Beauty Industry Opportunities</h2>
          <p className="text-lg text-gray-600">
            {isVietnamese 
              ? "Công việc thật, tiệm bán thật, cập nhật hàng ngày."
              : "Real jobs, real salons for sale, real people — updated daily."}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          onMouseEnter={handlePause}
          onMouseLeave={handleResume}
        >
          {sortedListings.slice(0, 4).map((listing) => (
            <motion.div 
              key={listing.id} 
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
            >
              {renderListingCard(listing)}
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/jobs">
              {isVietnamese ? "Xem Tất Cả Công Việc" : "See All Jobs"}
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/salon-marketplace">
              {isVietnamese ? "Xem Tất Cả Tiệm Bán" : "See All Salons for Sale"}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestIndustryOpportunities;
