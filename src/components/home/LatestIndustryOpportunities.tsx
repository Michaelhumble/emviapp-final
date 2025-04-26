
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { useAuth } from "@/context/auth";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslation } from "@/hooks/useTranslation";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import AuthAction from "@/components/common/AuthAction";

// Types for our listings
interface Listing {
  id: string;
  type: "job" | "salon";
  tag: "urgent" | "salon-sale";
  titleVi: string;
  titleEn: string;
  locationVi: string;
  locationEn: string;
  detailsVi: string;
  detailsEn: string;
  contactVi: string;
  contactEn: string;
}

const listings: Listing[] = [
  {
    id: "job1",
    type: "job",
    tag: "urgent",
    titleVi: "Cần Thợ Nails",
    titleEn: "Hiring Nail Techs",
    locationVi: "Jacksonville, FL",
    locationEn: "Jacksonville, FL",
    detailsVi: "Full-time + Part-time • Bao lương cao • Có nhà cho thợ ở",
    detailsEn: "High Salary • Housing Provided • Flexible Hours",
    contactVi: "🔒 Đăng ký để xem chi tiết liên hệ",
    contactEn: "🔒 Sign up to view contact details"
  },
  {
    id: "salon1",
    type: "salon",
    tag: "salon-sale",
    titleVi: "Cần Sang Tiệm Nail",
    titleEn: "Salon for Sale",
    locationVi: "Fresno, CA",
    locationEn: "Fresno, CA",
    detailsVi: "2700 sqft • 20 Bàn 20 Ghế • Khu Đông Khách • $450K Thương Lượng",
    detailsEn: "2700 sqft • 20 Tables • Busy Location • $450K Negotiable",
    contactVi: "🔒 Đăng ký để xem chi tiết liên hệ",
    contactEn: "🔒 Sign up to view contact details"
  },
  {
    id: "job2",
    type: "job",
    tag: "urgent",
    titleVi: "Cần Thợ Bột & Everything",
    titleEn: "Hiring Powder & Full Tech",
    locationVi: "Charlotte, NC",
    locationEn: "Charlotte, NC",
    detailsVi: "$1,800/tuần • Môi trường vui vẻ • Bao lương",
    detailsEn: "$1,800/week • Friendly Environment • Salary Guarantee",
    contactVi: "🔒 Đăng nhập để ứng tuyển",
    contactEn: "🔒 Login to apply"
  },
  {
    id: "salon2",
    type: "salon",
    tag: "salon-sale",
    titleVi: "Tiệm Nail Cần Bán",
    titleEn: "Salon for Sale",
    locationVi: "Kennesaw, GA",
    locationEn: "Kennesaw, GA",
    detailsVi: "Thu nhập $20K–28K/tháng • 10 ghế spa • Đầy đủ đồ nghề",
    detailsEn: "$20K–28K Monthly Income • 10 Chairs • Fully Equipped",
    contactVi: "🔒 Đăng ký để xem chi tiết",
    contactEn: "🔒 Sign up to unlock details"
  },
  {
    id: "job3",
    type: "job",
    tag: "urgent",
    titleVi: "Cần Thợ Nails",
    titleEn: "Urgent Nail Tech Hiring",
    locationVi: "Silver Spring, MD",
    locationEn: "Silver Spring, MD",
    detailsVi: "Khách ổn định • Tip cao • Không drama",
    detailsEn: "Stable Clients • High Tips • Drama-Free",
    contactVi: "🔒 Đăng nhập để ứng tuyển ngay",
    contactEn: "🔒 Login to apply"
  },
  {
    id: "salon3",
    type: "salon",
    tag: "salon-sale",
    titleVi: "Sang Tiệm Nail",
    titleEn: "Salon for Sale",
    locationVi: "Daniel Island, SC",
    locationEn: "Daniel Island, SC",
    detailsVi: "10 Bàn 10 Ghế • Khu Mỹ Trắng 100% • Khu shopping lớn",
    detailsEn: "10 Stations • Prime Shopping Center • White Neighborhood",
    contactVi: "🔒 Đăng ký để xem liên hệ",
    contactEn: "🔒 Sign up for contact info"
  },
  {
    id: "job4",
    type: "job",
    tag: "urgent",
    titleVi: "Tuyển Thợ Dip & Bột",
    titleEn: "Need Dip & Powder Techs",
    locationVi: "Tampa, FL",
    locationEn: "Tampa, FL",
    detailsVi: "$1,800/6 ngày • Có chỗ ở miễn phí",
    detailsEn: "$1,800/6 days • Free Housing",
    contactVi: "🔒 Đăng nhập để ứng tuyển",
    contactEn: "🔒 Login to apply"
  },
  {
    id: "salon4",
    type: "salon",
    tag: "salon-sale",
    titleVi: "Bán Tiệm Nail",
    titleEn: "Salon for Sale",
    locationVi: "Fontana, CA",
    locationEn: "Fontana, CA",
    detailsVi: "1173 sqft • Plaza mới nâng cấp • Giá $90K",
    detailsEn: "1173 sqft • Renovated Plaza • $90K",
    contactVi: "🔒 Đăng ký để xem chi tiết",
    contactEn: "🔒 Sign up to view details"
  }
];

const LatestIndustryOpportunities: React.FC = () => {
  const { isSignedIn } = useAuth();
  const isMobile = useIsMobile();
  const { t, isVietnamese } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotate listings
  useEffect(() => {
    const startAutoRotate = () => {
      intervalRef.current = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % (isMobile ? listings.length : Math.ceil(listings.length / 4)));
      }, 5000);
    };

    startAutoRotate();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isMobile]);

  // Component for rendering listing card
  const ListingCard = ({ listing }: { listing: Listing }) => {
    const tagStyle = listing.tag === "urgent" 
      ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
      : "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";
      
    const tagText = listing.tag === "urgent" 
      ? "🔥 Tuyển Gấp / Urgent Hire"
      : "🏢 Sang Tiệm / Salon for Sale";

    return (
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
        <CardContent className="p-6 flex-grow">
          <div className="mb-3">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${tagStyle}`}>
              {tagText}
            </span>
          </div>

          <div className="space-y-1 mb-3">
            <h3 className="font-medium text-lg">
              {isVietnamese ? listing.titleVi : listing.titleEn} 
              <span className="text-gray-500"> | </span>
              {isVietnamese ? listing.locationVi : listing.locationEn}
            </h3>
            <p className="text-gray-500 text-sm italic">
              {!isVietnamese && listing.titleVi} {!isVietnamese && listing.locationVi && `| ${listing.locationVi}`}
            </p>
          </div>

          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-600">
              {isVietnamese ? listing.detailsVi : listing.detailsEn}
            </p>
            {!isVietnamese && (
              <p className="text-xs text-gray-500 italic">
                {listing.detailsVi}
              </p>
            )}
          </div>

          <div className="text-sm text-gray-500 italic mb-3">
            {isVietnamese ? listing.contactVi : listing.contactEn}
          </div>
        </CardContent>
        
        <CardFooter className="pt-0 pb-6 px-6">
          {isSignedIn ? (
            <Button 
              className="w-full" 
              asChild
            >
              <Link to={listing.type === "job" ? "/jobs" : "/salon-for-sale"}>
                {isVietnamese ? "Xem Chi Tiết" : "View Details"}
              </Link>
            </Button>
          ) : (
            <AuthAction onAction={() => true}>
              <Button className="w-full">
                <Lock className="h-4 w-4 mr-1" /> 
                {isVietnamese ? "Đăng Ký" : "Sign Up"}
              </Button>
            </AuthAction>
          )}
        </CardFooter>
      </Card>
    );
  };

  // Section title and description
  const SectionHeader = () => (
    <div className="text-center max-w-3xl mx-auto mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        {t("Latest Beauty Industry Opportunities")}
      </h2>
      <p className="text-gray-600 text-lg">
        {isVietnamese ? "Công việc và tiệm nails thật — được cập nhật mỗi ngày." : "Real jobs, real salons for sale, real people — updated daily."}
      </p>
    </div>
  );

  // Render mobile carousel view
  if (isMobile) {
    return (
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <SectionHeader />
          
          <div className="mt-8">
            <Carousel className="w-full">
              <CarouselContent>
                {listings.map((listing) => (
                  <CarouselItem key={listing.id}>
                    <ListingCard listing={listing} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex left-2" />
              <CarouselNext className="hidden sm:flex right-2" />
            </Carousel>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/jobs">
                {isVietnamese ? "Xem Tất Cả Việc Làm" : "See All Jobs"}
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/salon-for-sale">
                {isVietnamese ? "Xem Tất Cả Tiệm Bán" : "See All Salons for Sale"}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Render desktop grid view
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <SectionHeader />
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {listings.slice(0, 4).map((listing) => (
            <motion.div 
              key={listing.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <ListingCard listing={listing} />
            </motion.div>
          ))}
        </motion.div>
        
        <div className="flex justify-center gap-6 mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/jobs">
              {isVietnamese ? "Xem Tất Cả Việc Làm" : "See All Jobs"}
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/salon-for-sale">
              {isVietnamese ? "Xem Tất Cả Tiệm Bán" : "See All Salons for Sale"}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestIndustryOpportunities;
