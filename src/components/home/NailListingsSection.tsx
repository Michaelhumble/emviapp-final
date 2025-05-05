
import React from 'react';
import { motion } from 'framer-motion';
import { useSession } from '@/context/auth/hooks/useSession';
import AuthAction from '@/components/common/AuthAction';
import { Link, useNavigate } from 'react-router-dom';
import OpportunityCard from '@/components/home/opportunities/OpportunityCard';
import { Job } from '@/types/job';

// Nail Listings Data with featured and plan properties
const nailListings = [
  {
    id: "clawson-mi-01",
    title: "TIM THỢ NAILS",
    location: "Clawson, MI",
    price: "$1.200 - $1.800/tuần",
    description: "Chúng tôi đang tuyển gấp thợ nail có kinh nghiệm làm bột, dip và gel-x. Không cần giỏi design, chỉ cần siêng năng, tay nghề tốt. Tiệm ở Clawson, MI 48017. Thu nhập từ $1.200 - $1.800/tuần. Tiệm nằm tại vị trí đắt địa – khu Downtown Clawson, khách chủ yếu là người Mỹ trắng, lịch sự và tip hậu. Tiệm nhỏ xinh, chỉ 6 ghế, dễ làm, dễ quản lý.",
    contact: "(248) 403-6472 | (248) 525-9911",
    type: "job" as const,
    featured: true,
    plan: "yearly",
    created_at: new Date().toISOString(),
    image: "/lovable-uploads/8858fff4-1fa3-4803-86b1-beadca5fd1df.png",
  },
  {
    id: "humble-tx-02",
    title: "TIM THỢ NAILS",
    location: "Humble, TX – Milano Nail Spa",
    price: ">$2.000/tuần",
    description: "Tiệm nail lớn nhất khu Humble/Kingwood/Atascocita, zipcode 77346. Tuyển thợ bột chuyên design >$2.000/tuần. Receptionist $150/ngày. 60 người đang làm chung. 6947 FM 1960 Rd E, Humble TX 77346.",
    contact: "(346) 398 6868 gặp Nhi",
    type: "job" as const,
    featured: true,
    plan: "monthly",
    created_at: new Date().toISOString(),
    image: "/lovable-uploads/89855878-2908-47b5-98b0-1935d73cdd71.png",
  },
  {
    id: "south-lake-03",
    title: "TIM THỢ NAILS",
    location: "South Lake Tahoe, CA",
    price: "$1.600 - $2.500+/tuần",
    description: "Tiệm thợ trẻ, dễ thương cần tìm đồng đội làm CTN hoặc everything. Giá nail cao, tip cao khỏi chê. Khách du lịch chịu xài tiền. Thu nhập mùa hè $1.600-$2.500+/tuần. Tip $3.000+/tháng. Ưu tiên biết tiếng Anh, có sức khỏe.",
    contact: "916-802-1922",
    type: "job" as const,
    featured: true,
    plan: "monthly",
    created_at: new Date().toISOString(),
    image: "/lovable-uploads/2542d0a3-5117-433d-baee-5c0fe2bfeca2.png",
  },
  {
    id: "greenwood-co-04",
    title: "Greenwood Village, CO – Cần Sang Tiệm",
    location: "Greenwood Village, CO",
    price: "$35k - $45k/tháng",
    description: "Greenwood Village, khu nhà giàu lịch sự. Income $35k - $45k. 9 ghế, 9 bàn, đầy đủ supply. Rent $4.800/tháng đã bao gồm tất cả. Lý do sang: chủ không biết làm nail.",
    contact: "(720) 645-5531",
    type: "salon" as const,
    featured: true,
    plan: "yearly",
    created_at: new Date().toISOString(),
    image: "/lovable-uploads/8283328c-3a93-4562-be8b-32c35c31a600.png",
  },
  {
    id: "beavercreek-oh-05",
    title: "Beavercreek, OH – Tiệm Lớn Cần Sang",
    location: "Beavercreek, OH",
    price: "$1.800.000/năm",
    description: "Diện tích 11.000 sqft, 48 bàn, 45 ghế. Income $1.800.000/năm. Nằm trong khu shopping, khách sang, giá cao. Tiệm đầy đủ tiện nghi, hoạt động tốt. Giá bán thương lượng.",
    contact: "(404) 723-1170",
    type: "salon" as const,
    featured: true,
    plan: "yearly",
    created_at: new Date().toISOString(),
    image: "/lovable-uploads/8283328c-3a93-4562-be8b-32c35c31a600.png",
  }
];

const NailListingsSection: React.FC = () => {
  const { session, user } = useSession();
  const navigate = useNavigate();
  const isAuthenticated = !!session && !!user;
  
  // Sort featured listings by plan priority (yearly first, then monthly)
  const sortedListings = [...nailListings]
    .filter(listing => listing.featured)
    .sort((a, b) => {
      if (a.plan === 'yearly' && b.plan !== 'yearly') return -1;
      if (a.plan !== 'yearly' && b.plan === 'yearly') return 1;
      return 0;
    })
    .slice(0, 5); // Limit to 5 listings
  
  const handleViewDetails = (listing: typeof nailListings[0]) => {
    if (isAuthenticated) {
      // If authenticated, navigate to the appropriate page based on listing type
      if (listing.type === 'job') {
        navigate(`/jobs/${listing.id}`);
      } else if (listing.type === 'salon') {
        navigate(`/salons/${listing.id}`);
      }
    }
    // If not authenticated, the AuthAction component will handle showing the login modal
  };
  
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Tin Tuyển Thợ & Sang Tiệm Nail</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Những thông tin tuyển dụng và cơ hội kinh doanh mới nhất trong ngành nail
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedListings.map((listing, index) => {
            // For non-authenticated users, create a limited listing preview
            const descPreview = isAuthenticated 
              ? listing.description 
              : `${listing.description.substring(0, 75)}...`;
            
            // Prepare the listing data based on authentication state
            const listingData: Job & { 
              hideLink?: boolean;
              buttonText?: string;
              descriptionPreview?: string;
            } = isAuthenticated ? {
              id: listing.id,
              title: listing.title,
              location: listing.location,
              price: listing.price,
              created_at: listing.created_at,
              image: listing.image,
              type: listing.type,
              description: listing.description,
              contact_info: {
                owner_name: "Owner",
                phone: listing.contact,
                email: ""
              },
              // For authenticated users, we want to navigate directly to the full listing page
              hideLink: false,
              buttonText: "Xem chi tiết"
            } : {
              id: listing.id,
              title: listing.title,
              location: listing.location,
              price: listing.price, // Show teaser price info
              created_at: listing.created_at,
              image: listing.image,
              type: listing.type, 
              description: "🔒 Đăng nhập để xem chi tiết",
              descriptionPreview: descPreview,
              // For non-authenticated users, hide direct links
              hideLink: true,
              buttonText: "Đăng nhập để xem chi tiết"
            };
            
            return isAuthenticated ? (
              <div 
                key={listing.id} 
                className="cursor-pointer"
                onClick={() => handleViewDetails(listing)}
              >
                <OpportunityCard listing={listingData} index={index} />
              </div>
            ) : (
              <AuthAction
                key={listing.id}
                onAction={() => true}
                customTitle="Đăng nhập để xem thông tin chi tiết"
                creditMessage="Tạo tài khoản miễn phí để xem thông tin liên hệ và nội dung đầy đủ."
              >
                <OpportunityCard listing={listingData} index={index} />
              </AuthAction>
            );
          })}
        </div>
        
        <div className="text-center mt-10">
          <Link 
            to="/jobs" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
          >
            Xem tất cả tin tuyển dụng
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NailListingsSection;
