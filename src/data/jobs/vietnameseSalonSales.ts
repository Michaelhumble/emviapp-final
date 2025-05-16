
import { Job } from '@/types/job';

export const vietnameseSalonSales: Job[] = [
  {
    id: "vs-sale-1",
    title: "Nail Salon for Sale - Prime Location in Orange County",
    description: "Well-established nail salon in busy shopping center. 8 stations, 6 pedicure chairs. Monthly revenue $40,000+. Owner retiring after 15 years.",
    vietnamese_description: "Tiệm nail đang kinh doanh tốt trong khu mua sắm sầm uất. 8 bàn nail, 6 ghế pedicure. Doanh thu hàng tháng hơn $40,000. Chủ nghỉ hưu sau 15 năm.",
    location: "Garden Grove, CA",
    created_at: "2023-02-15T00:00:00Z",
    image: "/lovable-uploads/nail-salon-1.jpg",
    type: "salon",
    status: "active",
    for_sale: true,
    monthly_revenue: "$40,000+",
    chair_count: 6,
    station_count: 8,
    sale_price: "$120,000",
    asking_price: "$120,000", // Converted to string
    square_feet: 1500,
    reason_for_selling: "Owner retiring",
    pricingTier: "premium",
    is_urgent: true,
    salon_features: ["High Traffic", "Parking", "Established Clientele"],
    contact_info: {
      phone: "(714) 555-1234",
      owner_name: "Mai Nguyen"
    }
  },
  {
    id: "vs-sale-2",
    title: "Profitable Nail Salon Business - Anaheim Hills",
    description: "Beautiful nail salon in upscale area with loyal clients. 10 manicure stations and 8 pedicure chairs. Monthly income $50,000+. Seller financing possible.",
    vietnamese_description: "Tiệm nail đẹp trong khu vực sang trọng với nhiều khách hàng trung thành. 10 bàn làm nail và 8 ghế làm chân. Thu nhập hàng tháng hơn $50,000. Có thể hỗ trợ tài chính.",
    location: "Anaheim Hills, CA",
    created_at: "2023-02-20T00:00:00Z",
    image: "/lovable-uploads/nail-salon-2.jpg",
    type: "salon",
    status: "active",
    for_sale: true,
    monthly_revenue: "$50,000+",
    chair_count: 8,
    station_count: 10,
    sale_price: "$250,000",
    asking_price: "$250,000", // Converted to string
    square_feet: 2000,
    reason_for_selling: "Relocating",
    pricingTier: "diamond",
    salon_features: ["Upscale Area", "Established 12+ years", "High Profit Margin"],
    contact_info: {
      phone: "(949) 555-5678",
      owner_name: "David Tran"
    }
  },
  {
    id: "vs-sale-3",
    title: "Established Nail Salon - Great Location in Westminster",
    description: "Well-maintained nail salon in high traffic shopping center. 6 manicure tables and 5 pedicure chairs. Current monthly revenue around $30,000.",
    vietnamese_description: "Tiệm nail được bảo quản tốt trong trung tâm mua sắm đông đúc. 6 bàn làm móng tay và 5 ghế làm chân. Doanh thu hàng tháng hiện tại khoảng $30,000.",
    location: "Westminster, CA",
    created_at: "2023-03-01T00:00:00Z",
    image: "/lovable-uploads/nail-salon-3.jpg",
    type: "salon",
    status: "active",
    for_sale: true,
    monthly_revenue: "$30,000",
    chair_count: 5,
    station_count: 6,
    sale_price: "$95,000",
    asking_price: "$95,000", // Converted to string
    square_feet: 1200,
    reason_for_selling: "Moving out of state",
    pricingTier: "gold",
    salon_features: ["Waxing Room", "Newly Remodeled", "Long Lease"],
    contact_info: {
      phone: "(714) 555-7890",
      owner_name: "Kim Tran"
    }
  },
  {
    id: "vs-sale-4",
    title: "Luxurious Day Spa & Nail Salon in Beverly Hills",
    description: "High-end day spa and nail salon with excellent reputation. 4 private rooms, 6 nail stations, 4 pedicure chairs. Monthly revenue exceeding $80,000. Established clientele includes celebrities.",
    vietnamese_description: "Spa và tiệm nail cao cấp với danh tiếng tuyệt vời. 4 phòng riêng, 6 bàn làm móng, 4 ghế làm chân. Doanh thu hàng tháng vượt quá $80,000. Khách hàng thân thiết bao gồm nhiều người nổi tiếng.",
    location: "Beverly Hills, CA",
    created_at: "2023-03-10T00:00:00Z",
    image: "/lovable-uploads/luxury-spa.jpg",
    type: "salon",
    status: "active",
    for_sale: true,
    monthly_revenue: "$80,000+",
    chair_count: 4,
    station_count: 6,
    sale_price: "$580,000",
    asking_price: "$580,000", // Converted to string
    square_feet: 2600,
    reason_for_selling: "Partnership dissolution",
    pricingTier: "diamond",
    is_featured: true,
    salon_features: ["Celebrity Clientele", "Full Spa Services", "Premium Location"],
    contact_info: {
      phone: "(310) 555-1212",
      owner_name: "Lisa Nguyen"
    }
  }
];
