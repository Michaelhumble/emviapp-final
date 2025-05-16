
import { Job } from "@/types/job";

export const vietnameseSalonSales: Job[] = [
  {
    id: "v-salon-sale-1",
    title: "Bán tiệm Nail - BELLEVUE NAILS & SPA",
    description: "Cần bán tiệm trong Bellevue. Tiệm rất đẹp, rộng rãi, sang trọng, khu upper class. Tiệm có 8 bàn nail, 6 ghế pedicar, 1 phòng wax, 1 phòng facial. Income cao.",
    vietnamese_description: "Cần bán tiệm trong Bellevue. Tiệm rất đẹp, rộng rãi, sang trọng, khu upper class. Tiệm có 8 bàn nail, 6 ghế pedicar, 1 phòng wax, 1 phòng facial. Income cao.",
    location: "Bellevue, WA",
    image: "/lovable-uploads/9c17ae10-5590-4c10-a59f-0830de25f070.png",
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    user_id: "user123",
    owner_id: "owner456",
    type: "salon",
    status: "active",
    pricingTier: "premium",
    for_sale: true,
    chair_count: 6,
    station_count: 8,
    square_feet: 1200, // Changed from string to number
    monthly_rent: 2500, // Changed from string to number
    revenue: "25000", // Keep as string since in Job interface it's defined as string
    asking_price: 85000,
    is_vietnamese_listing: true,
    preferred_languages: ["Vietnamese", "English"],
    contact_info: {
      phone: "(206) 555-1234",
      owner_name: "Ms. Linh",
      email: "contact@example.com"
    }
  },
  {
    id: "v-salon-sale-2",
    title: "Sang Tiệm Nail vùng Tacoma",
    description: "Cần sang tiệm khu TACOMA, WA. Location cực tốt, parking rộng, gần chợ, đối diện trường học. Tiệm rộng 1,100 sqft, có 5 bàn, 5 ghế, có phòng wax, store front parking. Rent $1,600 pass 3 năm. Thu nhập đều $18,000/tháng.",
    vietnamese_description: "Cần sang tiệm khu TACOMA, WA. Location cực tốt, parking rộng, gần chợ, đối diện trường học. Tiệm rộng 1,100 sqft, có 5 bàn, 5 ghế, có phòng wax, store front parking. Rent $1,600 pass 3 năm. Thu nhập đều $18,000/tháng.",
    location: "Tacoma, WA",
    image: "/lovable-uploads/9c17ae10-5590-4c10-a59f-0830de25f070.png",
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    user_id: "user456",
    owner_id: "owner789",
    type: "salon",
    status: "active",
    pricingTier: "gold",
    for_sale: true,
    chair_count: 5,
    station_count: 5,
    square_feet: 1100, // Changed from string to number
    monthly_rent: 1600, // Changed from string to number
    revenue: "18000", // Keep as string since in Job interface it's defined as string
    asking_price: 65000,
    is_vietnamese_listing: true,
    preferred_languages: ["Vietnamese"],
    contact_info: {
      phone: "(253) 555-2345",
      owner_name: "Mr. Tuan",
      zalo: "tuannailsalon"
    }
  },
  {
    id: "v-salon-sale-3",
    title: "Bán tiệm Nail vùng Seattle",
    description: "Cần bán tiệm khu SEATTLE. Tiệm có 6 bàn, 6 ghế, tiệm mới remodel, rent rẻ, income $25K-30K/tháng. Tiệm làm 20 năm.",
    vietnamese_description: "Cần bán tiệm khu SEATTLE. Tiệm có 6 bàn, 6 ghế, tiệm mới remodel, rent rẻ, income $25K-30K/tháng. Tiệm làm 20 năm.",
    location: "Seattle, WA",
    image: "/lovable-uploads/4bc7eaab-8b8b-4b00-a4bb-6ea3b6deb483.png",
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    user_id: "user789",
    owner_id: "owner101112",
    type: "salon",
    status: "active",
    pricingTier: "premium",
    for_sale: true,
    chair_count: 6,
    station_count: 6,
    square_feet: 1800, // Changed from string to number
    monthly_rent: 3200, // Changed from string to number
    revenue: "27500", // Keep as string since in Job interface it's defined as string
    asking_price: 120000,
    is_vietnamese_listing: true,
    preferred_languages: ["Vietnamese", "English"],
    reason_for_selling: "Chuyển tiểu bang",
    contact_info: {
      phone: "(206) 555-3456",
      owner_name: "Ms. Hoa",
      email: "hoanails@example.com"
    }
  },
  {
    id: "v-salon-sale-4",
    title: "Sang tiệm Nail ở Kent",
    description: "Sang tiệm vùng KENT. Tiệm đẹp, đông khách. Có 10 bàn, 10 ghế, phòng wax, phòng facial, phòng massage. Thu nhập tốt, trên $50K/tháng.",
    vietnamese_description: "Sang tiệm vùng KENT. Tiệm đẹp, đông khách. Có 10 bàn, 10 ghế, phòng wax, phòng facial, phòng massage. Thu nhập tốt, trên $50K/tháng.",
    location: "Kent, WA",
    image: "/lovable-uploads/9f39ea95-e42c-4f4e-89a9-b44cb4e215e2.png",
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    user_id: "user101112",
    owner_id: "owner131415",
    type: "salon",
    status: "active",
    pricingTier: "diamond",
    is_featured: true,
    for_sale: true,
    chair_count: 10,
    station_count: 10,
    has_wax_room: true,
    square_feet: 2500,
    monthly_rent: 4500,
    revenue: "50000",
    asking_price: 250000,
    is_vietnamese_listing: true,
    preferred_languages: ["Vietnamese", "English"],
    reason_for_selling: "Về Việt Nam",
    contact_info: {
      phone: "(425) 555-4567",
      owner_name: "Anh Minh",
      zalo: "minhnailspa",
      email: "minhnails@example.com"
    }
  }
];
