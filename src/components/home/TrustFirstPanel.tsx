import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Users,
  Store,
  ImageIcon,
  Home,
  Calendar,
  TrendingUp,
  Zap,
  Award,
  DollarSign,
  Shield,
  CheckCircle,
  Sparkles,
  Heart,
  Clock,
  Eye,
  Lock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, className }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className={className}
  >
    <Card className="h-full backdrop-blur-sm bg-white/90 border border-gray-100 shadow hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="p-3 rounded-full bg-primary/10 mb-4">
          {icon}
        </div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

interface TrustStatCardProps {
  icon: React.ReactNode;
  stat: string;
  description: string;
}

const TrustStatCard: React.FC<TrustStatCardProps> = ({ icon, stat, description }) => (
  <motion.div
    variants={itemVariants}
    className="flex flex-col items-center text-center p-4"
  >
    <div className="p-2 rounded-full bg-primary/5 mb-2">
      {icon}
    </div>
    <p className="font-semibold text-xl mb-1">{stat}</p>
    <p className="text-gray-600 text-sm">{description}</p>
  </motion.div>
);

interface SimplePrincipleCardProps {
  icon: React.ReactNode;
  title: string;
}

const SimplePrincipleCard: React.FC<SimplePrincipleCardProps> = ({ icon, title }) => (
  <motion.div variants={itemVariants} className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
    <div className="text-primary">{icon}</div>
    <p className="font-medium text-sm">{title}</p>
  </motion.div>
);

interface PricingModalTabProps {
  title: string;
  description: string;
  startingPrice: string;
  features: string[];
  ctaText: string;
  onCtaClick: () => void;
}

const PricingModalTab: React.FC<PricingModalTabProps> = ({
  title,
  description,
  startingPrice,
  features,
  ctaText,
  onCtaClick
}) => (
  <div className="space-y-4">
    <div className="text-center mb-4">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-3">{description}</p>
      <div className="flex justify-center items-baseline gap-2">
        <span className="text-3xl font-bold font-serif">{startingPrice}</span>
        {startingPrice !== "Free" && <span className="text-sm text-gray-500">starting price</span>}
      </div>
      <Badge variant="outline" className="bg-primary/5 mt-2">First post is free</Badge>
    </div>
    
    <div className="space-y-2">
      {features.map((feature, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
          <span className="text-sm">{feature}</span>
        </div>
      ))}
    </div>
    
    <div className="pt-4">
      <Button 
        onClick={onCtaClick} 
        className="w-full"
        variant="default"
      >
        {ctaText}
      </Button>
    </div>
  </div>
);

const PricingDialog: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2 font-medium shadow-md shadow-primary/10">
          <Sparkles className="h-4 w-4 text-yellow-300" />
          See How It Works
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-serif pb-2">Simple, Fair Pricing</DialogTitle>
          <DialogDescription className="text-center">
            Find the perfect way to connect with the beauty community.
            <div className="mt-2">
              <Badge variant="outline" className="bg-primary/5">No contracts</Badge>{' '}
              <Badge variant="outline" className="bg-primary/5">Cancel anytime</Badge>{' '}
              <Badge variant="outline" className="bg-primary/5">First post free</Badge>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="jobs" className="mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="salons">Salons</TabsTrigger>
            <TabsTrigger value="booths">Booths</TabsTrigger>
          </TabsList>
          
          <TabsContent value="jobs" className="p-2">
            <PricingModalTab
              title="Job Listings"
              description="Find talented artists for your salon"
              startingPrice="Free"
              features={[
                "First job post is always free",
                "AI-matched candidates",
                "$10 per additional post",
                "+$5 for nationwide boost",
                "Instant visibility"
              ]}
              ctaText="Post a Job"
              onCtaClick={() => navigate("/posting/job")}
            />
          </TabsContent>
          
          <TabsContent value="salons" className="p-2">
            <PricingModalTab
              title="Salon Listings"
              description="Sell your salon or promote your business"
              startingPrice="$20"
              features={[
                "Professional listing page",
                "+$10 for national reach",
                "Fast Sale Package available",
                "Photo gallery included",
                "Direct messaging with buyers"
              ]}
              ctaText="List a Salon"
              onCtaClick={() => navigate("/posting/salon")}
            />
          </TabsContent>
          
          <TabsContent value="booths" className="p-2">
            <PricingModalTab
              title="Booth Rentals"
              description="Fill your empty chairs with qualified artists"
              startingPrice="$15"
              features={[
                "Local & nationwide options",
                "Bundle with job posts for discount",
                "Featured placement available",
                "30-day active listing",
                "Booth rental agreement templates"
              ]}
              ctaText="Post a Booth"
              onCtaClick={() => navigate("/posting/booth")}
            />
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => navigate("/explore")}>
            Explore First
          </Button>
          <DialogClose asChild>
            <Button variant="ghost">Ask a Question</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const TrustFirstPanel: React.FC = () => {
  const [showStickyButton, setShowStickyButton] = useState(false);
  const { isVietnamese } = useTranslation();
  
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sectionPosition = document.getElementById('what-you-can-do')?.offsetTop || 0;
      setShowStickyButton(scrollY > sectionPosition + 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      {/* What You Can Do Section */}
      <section 
        id="what-you-can-do" 
        className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl opacity-30" aria-hidden="true"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-100 rounded-full filter blur-3xl opacity-20" aria-hidden="true"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-serif tracking-tight">
              What You Can Do With EmviApp
              {isVietnamese && <span className="block text-xl md:text-2xl text-gray-600 mt-2">EmviApp giúp bạn làm được gì?</span>}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              The all-in-one platform for salons, artists, and beauty professionals.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <FeatureCard
              icon={<Users className="h-6 w-6 text-primary" />}
              title="Hire Amazing Artists"
              description={isVietnamese ? "Tìm thợ giỏi, dễ thương và chuyên nghiệp" : "Find qualified, pre-screened nail techs and beauty professionals for your salon."}
            />
            <FeatureCard
              icon={<Store className="h-6 w-6 text-primary" />}
              title="Find Your Next Salon"
              description={isVietnamese ? "Tìm tiệm phù hợp nhanh chóng" : "Browse salon listings and connect directly with owners looking to sell."}
            />
            <FeatureCard
              icon={<ImageIcon className="h-6 w-6 text-primary" />}
              title="Post Your Portfolio"
              description={isVietnamese ? "Đăng hình ảnh tác phẩm của bạn" : "Showcase your best work and attract clients who love your style."}
            />
            <FeatureCard
              icon={<Home className="h-6 w-6 text-primary" />}
              title="Rent or List Booths"
              description={isVietnamese ? "Thuê ghế hoặc đăng tìm thợ dễ dàng" : "Find the perfect spot to grow your business or fill your empty chairs."}
            />
            <FeatureCard
              icon={<Calendar className="h-6 w-6 text-primary" />}
              title="Stay Booked & Grow Income"
              description={isVietnamese ? "Tăng thu nhập, giữ khách đều đặn" : "Manage appointments and increase your revenue with smart tools."}
            />
            <FeatureCard
              icon={<TrendingUp className="h-6 w-6 text-primary" />}
              title="Track Earnings & Analytics"
              description={isVietnamese ? "Theo dõi tiền tip, doanh thu, và hiệu suất" : "See your growth with easy-to-understand metrics and insights."}
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-primary" />}
              title="Get Discovered Online"
              description={isVietnamese ? "Cho người ta thấy tài năng của bạn" : "Get discovered and build your following with social boosting."}
            />
            <FeatureCard
              icon={<Award className="h-6 w-6 text-primary" />}
              title="Go Viral With Your Work"
              description={isVietnamese ? "Dễ lan toả trên mạng xã hội" : "Stand out with professional tools designed for the beauty industry."}
            />
            <FeatureCard
              icon={<DollarSign className="h-6 w-6 text-primary" />}
              title="Get Paid Weekly"
              description={isVietnamese ? "Thanh toán thường xuyên không trễ hẹn" : "Find opportunities with regular pay schedules that respect your value."}
            />
          </motion.div>
        </div>
      </section>

      {/* Why Artists & Salons Trust Us */}
      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif tracking-tight">
              Why Artists & Salons Trust Us
              {isVietnamese && <span className="block text-xl md:text-2xl text-gray-600 mt-2">Vì sao thợ & tiệm chọn EmviApp</span>}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're building a community that puts your needs first.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4"
          >
            <TrustStatCard
              icon={<Shield className="h-5 w-5 text-primary" />}
              stat="3,000+"
              description={isVietnamese ? "Hơn 3,000 tiệm đã xác minh trên toàn nước Mỹ" : "Verified Salons"}
            />
            <TrustStatCard
              icon={<Users className="h-5 w-5 text-primary" />}
              stat="Thousands"
              description={isVietnamese ? "Hàng ngàn thợ nails đang sử dụng mỗi ngày" : "Active Artists"}
            />
            <TrustStatCard
              icon={<Heart className="h-5 w-5 text-primary" />}
              stat="100%"
              description={isVietnamese ? "Tạo bởi người trong nghề — không phải công ty lớn" : "Built by Artists, Not Corporations"}
            />
            <TrustStatCard
              icon={<Home className="h-5 w-5 text-primary" />}
              stat="4 States"
              description={isVietnamese ? "Tin dùng ở các tiểu bang lớn như GA, CA, TX" : "Trusted in GA, CA, TX & FL"}
            />
            <TrustStatCard
              icon={<Lock className="h-5 w-5 text-primary" />}
              stat="Secure"
              description={isVietnamese ? "Thanh toán an toàn. Kết nối thông minh bằng AI" : "Payments & AI Matching"}
            />
          </motion.div>
        </div>
      </section>

      {/* We Keep It Simple Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-pink-50/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif tracking-tight">
              We Keep It Simple, Transparent, and Fair
              {isVietnamese && <span className="block text-xl md:text-2xl text-gray-600 mt-2">Chúng tôi làm mọi thứ rõ ràng & công bằng</span>}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              No games, no surprises—just the tools you need to succeed.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto"
          >
            <SimplePrincipleCard
              icon={<Sparkles className="h-5 w-5" />}
              title={isVietnamese ? "Đăng đầu tiên miễn phí cho mọi người" : "First post is always free"}
            />
            <SimplePrincipleCard
              icon={<Clock className="h-5 w-5" />}
              title={isVietnamese ? "Không hợp đồng ràng buộc. Huỷ bất kỳ lúc nào" : "No contracts, cancel anytime"}
            />
            <SimplePrincipleCard
              icon={<DollarSign className="h-5 w-5" />}
              title={isVietnamese ? "Giá rõ ràng, không phí ẩn" : "Flat prices, no hidden fees"}
            />
            <SimplePrincipleCard
              icon={<Eye className="h-5 w-5" />}
              title={isVietnamese ? "Hiển thị ngay lập tức" : "Instant visibility & social boosting"}
            />
            <SimplePrincipleCard
              icon={<Lock className="h-5 w-5" />}
              title={isVietnamese ? "Bạn hoàn toàn kiểm soát mọi thứ" : "You stay in control"}
            />
            <SimplePrincipleCard
              icon={<CheckCircle className="h-5 w-5" />}
              title={isVietnamese ? "Hỗ trợ nhiệt tình khi bạn cần" : "Expert support when you need it"}
            />
          </motion.div>

          <div className="mt-12 text-center">
            <PricingDialog />
          </div>
        </div>
      </section>

      {/* Sticky button for mobile */}
      {showStickyButton && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 w-auto max-w-[95%]"
        >
          <div className="flex gap-4 bg-white/95 backdrop-blur-md shadow-xl p-3 rounded-full border border-gray-100">
            <PricingDialog />
          </div>
        </motion.div>
      )}
    </>
  );
};

export default TrustFirstPanel;
