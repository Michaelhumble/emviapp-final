import React from 'react';
import { motion } from 'framer-motion';
import { Job } from '@/types/job';
import OpportunityCard from './opportunities/OpportunityCard';
import AuthAction from '@/components/common/AuthAction';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/context/auth/hooks/useSession';

// Vietnamese Nail Salon listings with featured flags and plan types
const vietnameseNailListings = [
  {
    id: "clawson-mi-01",
    title: "TIM THỢ NAILS",
    location: "Clawson, MI",
    price: "$1.200 - $1.800/tuần",
    description: "Chúng tôi đang tuyển gấp thợ nail có kinh nghiệm làm bột, dip và gel-x. Không cần giỏi design, chỉ cần siêng năng, tay nghề tốt. Tiệm ở Clawson, MI 48017. Thu nhập từ $1.200 - $1.800/tuần. Tiệm nằm tại vị trí đắt địa – khu Downtown Clawson, khách chủ yếu là người Mỹ trắng, lịch sự và tip hậu. Tiệm nhỏ xinh, chỉ 6 ghế, dễ làm, dễ quản lý.",
    contact: "(248) 403-6472 | (248) 525-9911",
    type: "job",
    featured: true,
    plan: "yearly",
    created_at: new Date().toISOString(),
    image: "/lovable-uploads/f2fa8004-6611-4006-9c47-23797d750523.png"
  },
  {
    id: "humble-tx-02",
    title: "TIM THỢ NAILS",
    location: "Humble, TX – Milano Nail Spa",
    price: ">$2.000/tuần",
    description: "Tiệm nail lớn nhất khu Humble/Kingwood/Atascocita, zipcode 77346. Tuyển thợ bột chuyên design >$2.000/tuần. Receptionist $150/ngày. 60 người đang làm chung. 6947 FM 1960 Rd E, Humble TX 77346.",
    contact: "(346) 398 6868 gặp Nhi",
    type: "job",
    featured: true,
    plan: "monthly",
    created_at: new Date().toISOString(),
    image: "/lovable-uploads/5a90dfeb-f56b-4670-ad3c-222cd50cf9f9.png"
  },
  {
    id: "south-lake-03",
    title: "TIM THỢ NAILS",
    location: "South Lake Tahoe, CA",
    price: "$1.600 - $2.500+/tuần",
    description: "Tiệm thợ trẻ, dễ thương cần tìm đồng đội làm CTN hoặc everything. Giá nail cao, tip cao khỏi chê. Khách du lịch chịu xài tiền. Thu nhập mùa hè $1.600-$2.500+/tuần. Tip $3.000+/tháng. Ưu tiên biết tiếng Anh, có sức khỏe.",
    contact: "916-802-1922",
    type: "job",
    featured: true,
    plan: "monthly",
    created_at: new Date().toISOString(),
    image: "/lovable-uploads/11e0c15e-b017-43fa-af96-28d679bb1bbc.png"
  },
  {
    id: "greenwood-co-04",
    title: "Greenwood Village, CO – Cần Sang Tiệm",
    location: "Greenwood Village, CO",
    price: "$35k - $45k/tháng",
    description: "Greenwood Village, khu nhà giàu lịch sự. Income $35k - $45k. 9 ghế, 9 bàn, đầy đủ supply. Rent $4.800/tháng đã bao gồm tất cả. Lý do sang: chủ không biết làm nail.",
    contact: "(720) 645-5531",
    type: "salon",
    featured: true,
    plan: "yearly",
    created_at: new Date().toISOString(),
    image: "/lovable-uploads/05b19d7b-cea2-4b04-8e12-0309816126bc.png"
  },
  {
    id: "beavercreek-oh-05",
    title: "Beavercreek, OH – Tiệm Lớn Cần Sang",
    location: "Beavercreek, OH",
    price: "$1.800.000/năm",
    description: "Diện tích 11.000 sqft, 48 bàn, 45 ghế. Income $1.800.000/năm. Nằm trong khu shopping, khách sang, giá cao. Tiệm đầy đủ tiện nghi, hoạt động tốt. Giá bán thương lượng.",
    contact: "(404) 723-1170",
    type: "salon",
    featured: true,
    plan: "yearly",
    created_at: new Date().toISOString(),
    image: "/lovable-uploads/c88b81b8-848c-49d4-b009-3f8d800bda5b.png"
  }
];

interface NailListingsSectionProps {
  // Keep the props interface even though we're not using it in this implementation
  nailSalons?: any[];
}

const NailListingsSection = ({ nailSalons }: NailListingsSectionProps) => {
  const navigate = useNavigate();
  const { session } = useSession();

  // 1. Filter to show only featured listings
  // 2. Sort by plan priority (yearly first, then monthly)
  const featuredListings = vietnameseNailListings
    .filter(listing => listing.featured)
    .sort((a, b) => {
      if (a.plan === 'yearly' && b.plan !== 'yearly') return -1;
      if (a.plan !== 'yearly' && b.plan === 'yearly') return 1;
      return 0;
    })
    .slice(0, 5); // Limit to 5 listings

  const handleCardClick = (listing: any): boolean | Promise<boolean> => {
    if (session) {
      // User is authenticated, navigate to the appropriate detail page
      const route = listing.type === 'salon' ? `/salons/${listing.id}` : `/jobs/${listing.id}`;
      navigate(route);
      return true;
    }
    // If not authenticated, AuthAction component will handle showing the login modal
    return false;
  };

  // Create preview-only listings with limited data for non-authenticated users
  const previewListings = featuredListings.map(listing => {
    // Get description preview (60-80 characters)
    const descPreview = listing.description 
      ? `${listing.description.substring(0, 70)}...`
      : "🔒 Đăng nhập để xem chi tiết";

    return {
      id: listing.id,
      title: listing.title,
      location: listing.location,
      price: listing.price, // Show teaser price info
      created_at: listing.created_at,
      image: listing.image,
      type: listing.type,
      // For non-authenticated users, limit description and add lock emoji
      description: "🔒 Đăng nhập để xem chi tiết",
      descriptionPreview: descPreview,
      hideLink: true,
      buttonText: "Xem chi tiết",
      // No contact info is included for security
    };
  });

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Tin Đăng Tìm Thợ Nail — Nail Salon Listings</h2>
        <p className="text-center text-gray-600 mb-12">Những tin đăng nổi bật trong ngành Nail. Đăng nhập để xem thông tin liên hệ.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {previewListings.map((listing, index) => (
            <AuthAction
              key={listing.id}
              onAction={() => handleCardClick(listing)}
              redirectPath={listing.type === 'salon' ? `/salons/${listing.id}` : `/jobs/${listing.id}`}
              customTitle="Đăng nhập để xem chi tiết"
              creditMessage="Tạo tài khoản miễn phí để xem thông tin liên hệ và chi tiết đầy đủ."
            >
              <OpportunityCard 
                listing={{
                  ...listing,
                  buttonText: "Xem chi tiết",
                }} 
                index={index} 
              />
            </AuthAction>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-2">🔒 Thông tin liên hệ đã được khóa</p>
          <p className="text-sm text-gray-500">Đăng nhập để xem đầy đủ chi tiết và thông tin liên hệ</p>
          <p className="text-xs text-gray-400 mt-4">
            Chúng tôi chỉ hiển thị 5 tin nổi bật mỗi ngành nghề. Thành viên gói năm được ưu tiên hơn gói tháng.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NailListingsSection;
