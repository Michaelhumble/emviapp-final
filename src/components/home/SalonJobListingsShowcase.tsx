import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Star, ExternalLink } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import ListingDetailModal from "./ListingDetailModal";
import { Job } from "@/types/job";
import { SalonSale } from "@/types/salonSale";

// Combined type for all listings
type Listing = JobListing | SalonSaleListing;

// Job listing type
interface JobListing {
  id: string;
  type: 'job';
  name: {
    en: string;
    vi?: string;
  };
  location: string;
  image: string;
  rating?: number;
  status: {
    en: string;
    vi?: string;
  };
  description: {
    en: string;
    vi?: string;
  };
  compensation?: string;
  perks?: string[];
  employment_type?: string;
  has_housing?: boolean;
  weekly_pay?: boolean;
  created_at: string;
}

// Salon sale listing type
interface SalonSaleListing {
  id: string;
  type: 'salon-sale';
  name: {
    en: string;
    vi?: string;
  };
  city: string;
  state: string;
  image: string;
  rating?: number;
  status: {
    en: string;
    vi?: string;
  };
  description: {
    en: string;
    vi?: string;
  };
  asking_price: string | number;
  size?: string;
  is_urgent?: boolean;
  business_type?: string;
  created_at: string;
}

// Sample realistic listings data
const sampleListings: Listing[] = [
  {
    id: "1",
    type: 'job',
    name: {
      en: "Hiring Nail Technicians",
      vi: "Cần Gấp Thợ Nail"
    },
    location: "Highlands Ranch, CO",
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=60",
    rating: 4.7,
    status: {
      en: "Urgently Hiring",
      vi: "Cần Gấp"
    },
    description: {
      en: "Looking for experienced nail technicians for full-time and part-time positions. Great clients and friendly environment. Guaranteed $1,200/week for full-time.",
      vi: "Cần thợ nail có kinh nghiệm, làm full-time và part-time. Khách tốt, môi trường thân thiện. Bao lương $1,200/tuần cho full-time."
    },
    compensation: "$1,200-$1,800/week",
    perks: ["Housing Available", "Weekly Pay", "Health Insurance"],
    employment_type: "Full-time",
    has_housing: true,
    weekly_pay: true,
    created_at: "2023-11-15T00:00:00Z"
  },
  {
    id: "2",
    type: 'salon-sale',
    name: {
      en: "Nail Salon For Sale",
      vi: "Tiệm Nail Sang Nhượng"
    },
    city: "Mannheim",
    state: "Germany",
    image: "https://images.unsplash.com/photo-1610709305212-10c701c9591d?auto=format&fit=crop&w=800&q=60",
    rating: 4.9,
    status: {
      en: "For Sale",
      vi: "Sang Nhượng"
    },
    description: {
      en: "Established nail salon with steady clientele. 5 manicure tables, 2 pedicure chairs. Great location with affordable rent. Owner retiring.",
      vi: "Tiệm nail đông khách quen. 5 bàn, 2 ghế. Vị trí đẹp, giá thuê rẻ. Chủ về hưu."
    },
    asking_price: "$65,000",
    size: "900 sqft",
    is_urgent: true,
    business_type: "Nail Salon",
    created_at: "2023-10-28T00:00:00Z"
  },
  {
    id: "3",
    type: 'job',
    name: {
      en: "Luxe Beauty Bar",
      vi: ""
    },
    location: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=60",
    rating: 4.8,
    status: {
      en: "Currently Hiring",
      vi: ""
    },
    description: {
      en: "Upscale salon seeking talented nail artists and estheticians. $2,000 bi-weekly guaranteed for qualified candidates. Benefits include paid training and flexible schedule.",
      vi: ""
    },
    compensation: "$2,000/2 weeks guaranteed",
    perks: ["Paid Training", "Flexible Schedule", "Product Discounts"],
    employment_type: "Full-time",
    has_housing: false,
    weekly_pay: true,
    created_at: "2023-11-05T00:00:00Z"
  },
  {
    id: "4",
    type: 'job',
    name: {
      en: "Nail Techs Needed",
      vi: "Cần Thợ Nails"
    },
    location: "Atlanta, GA",
    image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=60",
    rating: 4.5,
    status: {
      en: "Hiring All Positions",
      vi: "Cần Nhiều Thợ"
    },
    description: {
      en: "Busy nail salon hiring full-time nail technicians. Specializing in acrylic, dip powder, and gel. Commission 60% or weekly salary $900-$1,300.",
      vi: "Tiệm đông khách cần thợ nail full-time. Làm bột, dip, và gel. Chia 60% hoặc lương tuần $900-$1,300."
    },
    compensation: "$900-$1,300/week",
    perks: ["Commission Option", "Tips", "Flexible Hours"],
    employment_type: "Full-time",
    has_housing: false,
    weekly_pay: true,
    created_at: "2023-11-10T00:00:00Z"
  },
  {
    id: "5",
    type: 'salon-sale',
    name: {
      en: "Prime Location Nail Salon",
      vi: "Tiệm Nail Vị Trí Đẹp"
    },
    city: "Houston",
    state: "TX",
    image: "https://images.unsplash.com/photo-1604654894611-6973b376cbde?auto=format&fit=crop&w=800&q=60",
    rating: 4.7,
    status: {
      en: "For Sale - Urgent",
      vi: "Cần Bán Gấp"
    },
    description: {
      en: "Highly profitable nail salon in shopping center. 8 manicure tables, 6 pedicure chairs. Monthly revenue $45,000+. Seller motivated - relocating.",
      vi: "Tiệm nail lợi nhuận cao trong trung tâm mua sắm. 8 bàn, 6 ghế. Doanh thu hàng tháng $45,000+. Chủ cần bán gấp vì chuyển đi xa."
    },
    asking_price: "$120,000",
    size: "1,500 sqft",
    is_urgent: true,
    business_type: "Nail Salon",
    created_at: "2023-10-15T00:00:00Z"
  },
  {
    id: "6",
    type: 'job',
    name: {
      en: "Lash Artists Wanted",
      vi: "Cần Thợ Mi"
    },
    location: "Miami, FL",
    image: "https://images.unsplash.com/photo-1583997052301-0042b33fc598?auto=format&fit=crop&w=800&q=60",
    rating: 4.9,
    status: {
      en: "Premium Position",
      vi: "Vị Trí Cao Cấp"
    },
    description: {
      en: "Luxury beauty studio seeking skilled lash technicians. Specializing in volume and hybrid sets. Base pay plus commission, $1,500-$2,500/week potential.",
      vi: "Studio làm đẹp cao cấp cần thợ mi có kỹ năng. Chuyên làm mi volume và hybrid. Lương cơ bản cộng hoa hồng, thu nhập $1,500-$2,500/tuần."
    },
    compensation: "$1,500-$2,500/week",
    perks: ["High-End Clientele", "Continuing Education", "Product Discounts"],
    employment_type: "Full-time",
    has_housing: false,
    weekly_pay: true,
    created_at: "2023-11-08T00:00:00Z"
  },
  {
    id: "7",
    type: 'salon-sale',
    name: {
      en: "Nail & Spa Business",
      vi: "Spa Và Tiệm Nail"
    },
    city: "San Jose",
    state: "CA",
    image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=800&q=60",
    rating: 4.8,
    status: {
      en: "For Sale - Great Deal",
      vi: "Giá Tốt"
    },
    description: {
      en: "Established salon with strong online presence and loyal clientele. 10 manicure stations, 8 pedicure chairs, 2 facial rooms. Net $25,000/month.",
      vi: "Tiệm có thương hiệu online mạnh và khách hàng trung thành. 10 bàn làm móng, 8 ghế pedicure, 2 phòng facial. Thu nhập ròng $25,000/tháng."
    },
    asking_price: "$180,000",
    size: "2,200 sqft",
    is_urgent: false,
    business_type: "Nail Salon & Spa",
    created_at: "2023-10-20T00:00:00Z"
  },
  {
    id: "8",
    type: 'job',
    name: {
      en: "Barbers Needed",
      vi: "Cần Thợ Cắt Tóc"
    },
    location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=60",
    rating: 4.6,
    status: {
      en: "Immediate Start",
      vi: "Bắt Đầu Ngay"
    },
    description: {
      en: "Modern barbershop seeking skilled barbers. High-traffic location with established clientele. Commission 60% with guaranteed $1,000/week minimum.",
      vi: "Tiệm cắt tóc hiện đại cần thợ có tay nghề. Vị trí đông khách với lượng khách hàng ổn định. Chia 60% với mức đảm bảo tối thiểu $1,000/tuần."
    },
    compensation: "$1,000-$1,800/week",
    perks: ["Walk-In Clients", "Modern Equipment", "Growth Opportunities"],
    employment_type: "Full-time",
    has_housing: false,
    weekly_pay: true,
    created_at: "2023-11-01T00:00:00Z"
  },
  {
    id: "9",
    type: 'job',
    name: {
      en: "Nail Salon Hiring",
      vi: "Tiệm Nail Tuyển Dụng"
    },
    location: "Denver, CO",
    image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=60",
    rating: 4.7,
    status: {
      en: "All Positions",
      vi: "Nhiều Vị Trí"
    },
    description: {
      en: "Family-owned salon seeking nail technicians, specializing in gel and acrylic. Friendly team, loyal customers. $800-$1,400/week depending on experience.",
      vi: "Tiệm gia đình cần thợ nail, chuyên làm gel và bột. Đội ngũ thân thiện, khách hàng trung thành. $800-$1,400/tuần tùy kinh nghiệm."
    },
    compensation: "$800-$1,400/week",
    perks: ["Family Environment", "Flexible Schedule", "Parking Available"],
    employment_type: "Full-time",
    has_housing: false,
    weekly_pay: true,
    created_at: "2023-11-12T00:00:00Z"
  },
  {
    id: "10",
    type: 'salon-sale',
    name: {
      en: "Nail Salon - Great Location",
      vi: "Tiệm Nail - Vị Trí Đẹp"
    },
    city: "Orlando",
    state: "FL",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=60",
    rating: 4.5,
    status: {
      en: "Owner Retiring",
      vi: "Chủ Về Hưu"
    },
    description: {
      en: "Turnkey operation in high-foot-traffic shopping center. 6 manicure stations, 5 pedicure chairs. Consistent clientele, great reviews. All equipment included.",
      vi: "Tiệm hoạt động tốt trong trung tâm mua sắm đông người qua lại. 6 bàn làm móng, 5 ghế pedicure. Khách hàng ổn định, đánh giá tốt. Bao gồm tất cả thiết bị."
    },
    asking_price: "$75,000",
    size: "1,100 sqft",
    is_urgent: false,
    business_type: "Nail Salon",
    created_at: "2023-10-25T00:00:00Z"
  },
  {
    id: "11",
    type: 'job',
    name: {
      en: "Hair Stylists & Colorists",
      vi: "Thợ Làm Tóc & Nhuộm"
    },
    location: "Seattle, WA",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=60",
    rating: 4.8,
    status: {
      en: "Growing Team",
      vi: "Mở Rộng Đội Ngũ"
    },
    description: {
      en: "Upscale hair salon seeking talented stylists and colorists. Strong clientele with high-end services. Commission 50% with $1,300+ weekly potential.",
      vi: "Salon tóc cao cấp cần thợ tài năng. Khách hàng cao cấp với các dịch vụ chất lượng. Chia 50% với thu nhập tiềm năng $1,300+/tuần."
    },
    compensation: "$1,300-$2,200/week",
    perks: ["Education Allowance", "Professional Products", "Flexible Hours"],
    employment_type: "Full-time",
    has_housing: false,
    weekly_pay: true,
    created_at: "2023-11-07T00:00:00Z"
  },
  {
    id: "12",
    type: 'salon-sale',
    name: {
      en: "Hair & Nail Salon",
      vi: "Tiệm Tóc & Nail"
    },
    city: "Brooklyn",
    state: "NY",
    image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=60",
    rating: 4.6,
    status: {
      en: "Price Reduced",
      vi: "Giảm Giá"
    },
    description: {
      en: "Established hair and nail salon in trendy neighborhood. 5 hair stations, 4 manicure tables, 3 pedicure chairs. Rent $3,500/month. Owner relocating out of state.",
      vi: "Tiệm tóc và nail trong khu phố sầm uất. 5 ghế làm tóc, 4 bàn làm móng, 3 ghế pedicure. Tiền thuê $3,500/tháng. Chủ chuyển đi tiểu bang khác."
    },
    asking_price: "$85,000",
    size: "1,300 sqft",
    is_urgent: true,
    business_type: "Hair & Nail Salon",
    created_at: "2023-10-18T00:00:00Z"
  },
  {
    id: "13",
    type: 'job',
    name: {
      en: "Full Service Salon Hiring",
      vi: "Tiệm Đầy Đủ Dịch Vụ Cần Thợ"
    },
    location: "Phoenix, AZ",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=60",
    rating: 4.7,
    status: {
      en: "Multiple Positions",
      vi: "Nhiều Vị Trí"
    },
    description: {
      en: "Fast-growing salon seeking nail techs, estheticians, and massage therapists. New location with modern equipment. Base pay plus commission structure.",
      vi: "Tiệm đang phát triển nhanh cần thợ nail, esthetician, và massage. Địa điểm mới với thiết bị hiện đại. Lương cơ bản cộng với cơ cấu hoa hồng."
    },
    compensation: "$900-$1,700/week",
    perks: ["New Equipment", "Growth Potential", "Team Bonuses"],
    employment_type: "Full-time",
    has_housing: false,
    weekly_pay: true,
    created_at: "2023-11-03T00:00:00Z"
  },
  {
    id: "14",
    type: 'salon-sale',
    name: {
      en: "Nail Spa - Prime Location",
      vi: "Tiệm Nail Spa - Vị Trí Đắc Địa"
    },
    city: "Dallas",
    state: "TX",
    image: "https://images.unsplash.com/photo-1604654894611-6973b376cbde?auto=format&fit=crop&w=800&q=60",
    rating: 4.9,
    status: {
      en: "Motivated Seller",
      vi: "Cần Bán Gấp"
    },
    description: {
      en: "Luxury nail spa in affluent area with high-end clientele. 7 manicure stations, 6 pedicure chairs, 2 treatment rooms. Monthly revenue $55,000+. 5-star rated.",
      vi: "Tiệm nail spa cao cấp trong khu vực giàu có với khách hàng cao cấp. 7 bàn làm móng, 6 ghế pedicure, 2 phòng điều trị. Doanh thu hàng tháng $55,000+. Đánh giá 5 sao."
    },
    asking_price: "$230,000",
    size: "1,800 sqft",
    is_urgent: true,
    business_type: "Nail Spa",
    created_at: "2023-10-22T00:00:00Z"
  },
  {
    id: "15",
    type: 'job',
    name: {
      en: "Experienced Nail Technicians",
      vi: "Thợ Nail Có Kinh Nghiệm"
    },
    location: "Portland, OR",
    image: "https://images.unsplash.com/photo-1610709305212-10c701c9591d?auto=format&fit=crop&w=800&q=60",
    rating: 4.6,
    status: {
      en: "High Income",
      vi: "Thu Nhập Cao"
    },
    description: {
      en: "Established salon looking for experienced nail technicians. Specializing in natural nails and gel services. Commission 55-65% based on skill level. $1,200-$1,800 weekly potential.",
      vi: "Tiệm đã hoạt động lâu năm cần thợ nail có kinh nghiệm. Chuyên làm móng tự nhiên và dịch vụ gel. Chia 55-65% dựa trên trình độ kỹ năng. Thu nhập tiềm năng $1,200-$1,800 mỗi tuần."
    },
    compensation: "$1,200-$1,800/week",
    perks: ["Paid Time Off", "Continuing Education", "Steady Clientele"],
    employment_type: "Full-time",
    has_housing: false,
    weekly_pay: true,
    created_at: "2023-11-09T00:00:00Z"
  }
];

const SalonJobListingsShowcase = () => {
  const isMobile = useIsMobile();
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayedListings, setDisplayedListings] = useState<Listing[]>([]);
  
  // Function to shuffle the listings to keep the page dynamic
  useEffect(() => {
    // Shuffle the listings and get the first 3 (or 6 on mobile) to display
    const shuffledListings = [...sampleListings].sort(() => 0.5 - Math.random());
    const displayCount = isMobile ? 2 : 3;
    setDisplayedListings(shuffledListings.slice(0, displayCount));
  }, [isMobile]);
  
  const openDetailModal = (listing: Listing) => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };
  
  const closeDetailModal = () => {
    setIsModalOpen(false);
    setSelectedListing(null);
  };
  
  // Convert our internal listing type to the ListingDetailModal's expected props
  const convertToModalListing = (listing: Listing) => {
    if (listing.type === 'job') {
      return {
        title: listing.name.en,
        description: listing.description.en,
        location: listing.location,
        role: listing.name.vi ? listing.name.vi.replace('Cần Thợ ', '') : undefined,
        employment_type: listing.employment_type,
        salary_range: listing.compensation,
        has_housing: listing.has_housing,
        weekly_pay: listing.weekly_pay,
        benefits: listing.perks,
        created_at: listing.created_at
      };
    } else {
      return {
        title: listing.name.en,
        description: listing.description.en,
        city: listing.city,
        state: listing.state,
        asking_price: listing.asking_price,
        size: listing.size,
        is_urgent: listing.is_urgent,
        business_type: listing.business_type,
        created_at: listing.created_at
      };
    }
  };
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nail & Beauty Salons Hiring Now</h2>
          <p className="text-lg text-gray-600">
            Connect with top salons looking for talented beauty professionals like you
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {displayedListings.map((listing) => (
            <motion.div key={listing.id} variants={item}>
              <Card className="overflow-hidden h-full transition-shadow hover:shadow-lg">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={listing.image} 
                    alt={listing.name.en} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">
                      {listing.name.en}
                      {listing.name.vi && (
                        <span className="block text-sm font-medium text-gray-600 mt-1">
                          {listing.name.vi}
                        </span>
                      )}
                    </h3>
                    {listing.rating && (
                      <div className="flex items-center text-amber-500">
                        <Star className="w-4 h-4 fill-current mr-1" />
                        <span className="text-sm font-medium">{listing.rating}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">
                      {listing.type === 'job' 
                        ? listing.location 
                        : `${listing.city}, ${listing.state}`}
                    </span>
                  </div>
                  <p className="text-primary font-medium">
                    {listing.status.en}
                    {listing.status.vi && (
                      <span className="block text-sm text-gray-600">
                        {listing.status.vi}
                      </span>
                    )}
                  </p>
                  
                  {listing.type === 'job' && listing.compensation && (
                    <div className="mt-3 mb-1">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {listing.compensation}
                      </Badge>
                    </div>
                  )}
                  
                  {listing.type === 'salon-sale' && (
                    <div className="mt-3 mb-1">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {typeof listing.asking_price === 'string' ? listing.asking_price : `$${listing.asking_price}`}
                      </Badge>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="pt-0 flex justify-between items-center">
                  <Button 
                    variant="link" 
                    className="text-primary hover:text-primary/80 text-sm font-medium p-0"
                    onClick={() => openDetailModal(listing)}
                  >
                    View details →
                  </Button>
                  <Button size="sm" onClick={() => openDetailModal(listing)}>
                    {listing.type === 'job' ? 'Apply Now' : 'Inquire'}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Button 
            size="lg" 
            onClick={() => {
              // This could link to a dedicated page in the future
              const allListingsElement = document.getElementById('all-listings');
              if (allListingsElement) {
                allListingsElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="font-medium flex items-center gap-2"
          >
            <span>Explore All Salons & Jobs</span>
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {selectedListing && (
        <ListingDetailModal
          isOpen={isModalOpen}
          onClose={closeDetailModal}
          listing={convertToModalListing(selectedListing)}
          listingType={selectedListing.type === 'job' ? 'job' : 'salon'}
        />
      )}
    </section>
  );
};

export default SalonJobListingsShowcase;
