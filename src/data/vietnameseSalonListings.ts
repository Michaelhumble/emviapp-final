
// Vietnamese salon listings data for marketplace
import { Salon } from '@/types/salon';

// Nail image URLs from the dedicated folder
const nailImages = [
  "/lovable-uploads/887c837a-5c2a-44d9-a73a-d3aedfef2c84.png", // Luxury pink and white salon
  "/lovable-uploads/9e581dd6-e5a7-4794-aa3c-b4da59e2381a.png", // Beige luxury nail salon
  "/lovable-uploads/009c07d8-9e50-4d56-86f2-3f8662606519.png", // Classy nail salon with pedicure chairs
  "/lovable-uploads/74b3ba02-2378-41d7-8cb5-023145e94700.png", // Modern nail salon with chairs
  "/lovable-uploads/5371f69f-154f-450b-af8b-28774f7d4215.png", // Black and red modern salon
  
  // Original nail folder images
  "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png",
  "/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png",
  "/lovable-uploads/d1da4b24-248e-4e84-9289-06237e7d4458.png",
  "/lovable-uploads/7dd3d7e2-dc6b-4d9a-9feb-9e3b023a9f28.png",
  "/lovable-uploads/c540558f-09db-483f-b844-bacb8824f789.png",
  "/lovable-uploads/f7ba1d82-2928-4e73-a61b-112e5aaf5b7e.png",
  "/lovable-uploads/9a7898e7-739c-4a79-8705-70090e25c10b.png",
  "/lovable-uploads/6fdf0a39-d203-4f5a-90ba-808059c3ae5e.png", 
  "/lovable-uploads/2951176b-68c9-45d6-8bc5-20513e72d0a3.png", 
  "/lovable-uploads/4e47f970-963a-483f-8356-eb64235bc2db.png", 
];

// Helper function to get nail image by index with wrapping
const getNailImage = (index: number) => {
  return nailImages[index % nailImages.length];
};

// 8 newest Vietnamese salon listings (first 3 will be featured)
export const vietnameseSalonListings: Salon[] = [
  {
    id: "vn-001",
    name: "Tiệm Nail Khu Mỹ Trắng Sang Trọng",
    location: "Gần chợ Kroger",
    description: "Tiệm nail sang trọng trong khu Mỹ trắng",
    vietnamese_description: `Tiệm nằm trong khu Mỹ trắng sang trọng, ngay cạnh chợ Kroger và nhiều business sầm uất khác.  
Khu vực đông khách, rất thuận lợi để phát triển lâu dài.  
Tiệm rộng khoảng 2000 sqft, gồm 16 ghế pedicure (có thể thêm 2 ghế ở phòng VIP), 8 bàn, 2 phòng wax/facial/eyelash, 2 phòng vệ sinh, máy giặt và máy sấy đầy đủ.  
Liên hệ: 346-770-4333 (vui lòng để lại tin nhắn nếu chưa kịp nghe máy).`,
    price: "Giá thương lượng",
    imageUrl: getNailImage(0),
    contact_info: {
      owner_name: "Chủ tiệm",
      phone: "346-770-4333"
    },
    square_feet: 2000,
    featured: true,
    is_vietnamese_listing: true
  },
  {
    id: "vn-002",
    name: "Tiệm Nail Tại Greenwood Village",
    location: "Greenwood Village, CO 80111",
    description: "Tiệm nail cao cấp trong khu nhà giàu",
    vietnamese_description: `Cần Sang Gấp Tiệm Nail Tại Greenwood Village, CO 80111 – Vị Trí Đẹp, Khách Sang  
Diện tích: 2000 sqft  
9 bàn, 9 ghế, 1 phòng wax, 1 restroom, phòng ăn, máy giặt sấy đầy đủ  
Tiệm mới xây gần 2 năm, sạch sẽ, đầy đủ supply  
Nhân sự hiện tại: 5 thợ bột full-time + eyelash  
Vị trí: Khu nhà giàu, khách lịch sự, giá cao, tip hậu  
Income 35k - 45k  
Rent: $4,800/tháng  
Giá sang: Thương lượng  
Liên lạc: (720) 645-5531`,
    price: "Thương lượng",
    imageUrl: getNailImage(1),
    contact_info: {
      owner_name: "Chủ tiệm",
      phone: "(720) 645-5531"
    },
    square_feet: 2000,
    featured: true,
    is_vietnamese_listing: true
  },
  {
    id: "vn-003", 
    name: "Tiệm Nail In Chantilly, VA",
    location: "Chantilly, VA",
    description: "Tiệm nail cao cấp mới remodel",
    vietnamese_description: `Cần Sang Gấp Tiệm Nail In Chantilly, VA  
Tiệm mới remodel 3 năm.  
Rộng 1,730 sqft, có 12 bàn, 8 ghế, 1 phòng wax, 1 phòng Facial. Đầy đủ tiện nghi.  
Hiện tại đang có 8 thợ và 1 thợ Facial  
Tiệm khu trung tâm, đông khách  
Income $600k/năm  
Rent $7.300  
Giá bán $260k  
Liên lạc: (919) 491-2692 or (703) 622-5269`,
    price: "$260,000",
    imageUrl: getNailImage(2),
    contact_info: {
      owner_name: "Chủ tiệm",
      phone: "(919) 491-2692"
    },
    square_feet: 1730,
    featured: true,
    is_vietnamese_listing: true
  },
  {
    id: "vn-004",
    name: "Tiệm Nail Ở Grand Island, Nebraska",
    location: "Grand Island, Nebraska",
    description: "Tiệm nail vị trí đẹp gần casino",
    vietnamese_description: `Tiệm nail đăng bán ở thành phố Grand Island, Nebraska  
Tiệm 8 ghế pedicure (mới), 6 bàn làm móng, phòng wax, phòng ăn, phòng supply, storage, bathroom, máy giặt, máy sấy  
Parking rộng, vị trí mặt tiền gần casino  
Rent $2,300/tháng  
Giá bán: $25,000  
Liên lạc: (308)383-2696`,
    price: "$25,000",
    imageUrl: getNailImage(3),
    contact_info: {
      owner_name: "Chủ tiệm",
      phone: "(308)383-2696"
    },
    featured: false,
    is_vietnamese_listing: true
  },
  {
    id: "vn-005",
    name: "Tiệm Nail Lớn Tại Beavercreek",
    location: "Beavercreek, OH",
    description: "Tiệm nail cỡ lớn, doanh thu cao",
    vietnamese_description: `Cần Sang Gấp Tiệm Nail Tại Beavercreek, OH  
Diện tích 11.000 sqft  
48 bàn, 45 ghế  
Income: $1,800,000/năm  
Vị trí: khu shopping, khách sang, giá cao  
Giá bán: thương lượng  
Liên lạc: (404) 723-1170`,
    price: "Thương lượng",
    imageUrl: getNailImage(4),
    contact_info: {
      owner_name: "Chủ tiệm",
      phone: "(404) 723-1170"
    },
    square_feet: 11000,
    featured: false,
    is_vietnamese_listing: true
  },
  {
    id: "vn-006",
    name: "Tiệm Nail ở Milton, Florida",
    location: "Milton, Florida 32570",
    description: "Tiệm nail trong khu chợ Publix",
    vietnamese_description: `Tiệm Nail em ở Milton, Florida 32570  
Trong khu chợ Publix, khách đông  
Cần thợ làm TCN, SNS, Bột  
Giá nail cao  
Liên hệ: Cody 404-434-3688  
*Chỉ nhận A/C có giấy tờ*`,
    price: "—",
    imageUrl: getNailImage(5),
    contact_info: {
      owner_name: "Cody",
      phone: "404-434-3688"
    },
    featured: false,
    is_vietnamese_listing: true
  },
  {
    id: "vn-007",
    name: "Tiệm Nail Gần Casino",
    location: "Grand Island, Nebraska",
    description: "Tiệm nail gần casino, ít cạnh tranh",
    vietnamese_description: `Tiệm nằm trên đường chính, gần casino, ít tiệm nail xung quanh.  
2400 sqft – hoạt động lâu năm, khách ổn định  
8 ghế, 6 bàn, phòng wax, phòng ăn  
Rent: $2,300  
Giá: $25,000  
Liên hệ: (308)383-2696`,
    price: "$25,000",
    imageUrl: getNailImage(6),
    contact_info: {
      owner_name: "Chủ tiệm",
      phone: "(308)383-2696"
    },
    square_feet: 2400,
    featured: false,
    is_vietnamese_listing: true
  },
  {
    id: "vn-008",
    name: "Tiệm Nail Tại Mission Viejo",
    location: "Mission Viejo, CA",
    description: "Tiệm nail vị trí đẹp tại khu sang",
    vietnamese_description: `Sang Tiệm Nail Vị Trí Đẹp, khu sang trọng tại Mission Viejo, CA  
Tiệm rộng, sạch sẽ, setup mới đẹp  
Giá bán: $68,000  
Liên hệ: (949) 678-1123`,
    price: "$68,000",
    imageUrl: getNailImage(7),
    contact_info: {
      owner_name: "Chủ tiệm",
      phone: "(949) 678-1123"
    },
    featured: false,
    is_vietnamese_listing: true
  },
  
  // Original 20 Vietnamese salon listings with updated image URLs
  {
    id: "vn-101",
    name: "Tiệm Nail Đẹp Quận Cam",
    location: "Orange County, CA",
    description: "Tiệm nail cao cấp tại khu thương mại sầm uất",
    vietnamese_description: "Cần sang tiệm nail đẹp, rộng 1800sqft, có 10 ghế spa pedicure, 8 bàn nail, 2 phòng wax. Income $45K-50K/tháng, giá $125K, rent $7200. Liên lạc A. Minh (714) 123-4567.",
    price: "$125,000",
    imageUrl: getNailImage(8),
    contact_info: {
      owner_name: "Anh Minh",
      phone: "(714) 123-4567"
    },
    square_feet: 1800,
    featured: false,
    is_vietnamese_listing: true
  },
  {
    id: "vn-102",
    name: "Tiệm Nail Khu Mỹ Trắng",
    location: "Houston, TX",
    description: "Tiệm nail trong khu dân cư cao cấp",
    vietnamese_description: "Sang tiệm nail khu Mỹ trắng, giàu, đông khách. Tiệm rộng 1400sqft, 6 bàn, 8 ghế, rent $3500/tháng all bills paid. Income $25K-30K/tháng. Giá $65K (có thể thương lượng). Liên hệ: Cô Thủy (832) 456-7890.",
    price: "$65,000",
    imageUrl: getNailImage(9),
    contact_info: {
      owner_name: "Cô Thủy",
      phone: "(832) 456-7890"
    },
    square_feet: 1400,
    featured: false,
    is_vietnamese_listing: true
  },
  {
    id: "vn-103",
    name: "Sang Tiệm Nail Florida",
    location: "Orlando, FL",
    description: "Tiệm nail lâu năm trong khu du lịch",
    vietnamese_description: "Cần sang tiệm nail ở Orlando, FL. Tiệm đã hoạt động 8 năm, có 12 ghế pedicure, 10 bàn làm nail, 2 phòng wax, 1 phòng facial. Income $60K-65K/tháng. Khách tip hậu. Giá sang $195K. Liên lạc Anh Tuấn (407) 234-5678.",
    price: "$195,000",
    imageUrl: getNailImage(10),
    contact_info: {
      owner_name: "Anh Tuấn",
      phone: "(407) 234-5678"
    },
    square_feet: 2200,
    featured: false,
    is_vietnamese_listing: true
  },
  {
    id: "vn-104",
    name: "Sang Gấp Tiệm Nail Georgia",
    location: "Atlanta, GA",
    description: "Cần sang gấp tiệm nail vị trí đẹp",
    vietnamese_description: "Cần sang gấp tiệm nail ở Atlanta, GA. Tiệm mới remodel với 8 bàn, 10 ghế spa pedicure mới. Vị trí đẹp, có sẵn khách, income ổn định $35K/tháng. Rent $3,800. Giá sang $75K. Liên lạc: Chị Hương (678) 345-6789.",
    price: "$75,000",
    imageUrl: getNailImage(11),
    contact_info: {
      owner_name: "Chị Hương",
      phone: "(678) 345-6789"
    },
    square_feet: 1600,
    featured: false,
    is_vietnamese_listing: true
  },
  {
    id: "vn-105",
    name: "Tiệm Nail Khu Shopping Center",
    location: "Virginia Beach, VA",
    description: "Tiệm nail trong trung tâm thương mại lớn",
    vietnamese_description: "Cần sang tiệm nail trong khu shopping center đông khách. Tiệm có 6 bàn, 8 ghế pedicure, 1 phòng wax. Income $28K-32K/tháng. Rent $2,900/tháng. Giá bán $55K. Liên hệ: Anh Phong (757) 876-5432.",
    price: "$55,000",
    imageUrl: getNailImage(12),
    contact_info: {
      owner_name: "Anh Phong",
      phone: "(757) 876-5432"
    },
    square_feet: 1200,
    featured: false,
    is_vietnamese_listing: true
  },
  {
    id: "vn-106",
    name: "Tiệm Nail Khu Little Saigon",
    location: "Westminster, CA",
    description: "Tiệm nail trong khu Little Saigon sầm uất",
    vietnamese_description: "Sang tiệm nail đẹp tại Little Saigon, Westminster, CA. Tiệm có 12 bàn, 14 ghế pedicure, 3 phòng làm dịch vụ. Income $70K-80K/tháng. Rent $9,500. Giá sang $230K. Liên hệ: Cô Lan (714) 987-6543.",
    price: "$230,000",
    imageUrl: getNailImage(13),
    contact_info: {
      owner_name: "Cô Lan",
      phone: "(714) 987-6543"
    },
    square_feet: 2800,
    featured: false,
    is_vietnamese_listing: true
  },
  {
    id: "vn-107",
    name: "Sang Tiệm Móng Cao Cấp",
    location: "Las Vegas, NV",
    description: "Tiệm nail cao cấp trong khu khách sạn nổi tiếng",
    vietnamese_description: "Sang tiệm móng cao cấp trong khu khách sạn nổi tiếng Las Vegas. Tiệm đẹp, sang trọng, khách sang, tip hậu. Có 8 bàn, 10 ghế pedicure cao cấp, 2 phòng dịch vụ. Income $55K-65K/tháng. Rent $6,800. Giá sang $180K. Liên hệ: Anh Dũng (702) 456-7891.",
    price: "$180,000",
    imageUrl: getNailImage(14),
    contact_info: {
      owner_name: "Anh Dũng",
      phone: "(702) 456-7891"
    },
    square_feet: 2000,
    featured: false,
    is_vietnamese_listing: true
  },
  {
    id: "vn-108",
    name: "Tiệm Nail Vùng Seattle",
    location: "Bellevue, WA",
    description: "Tiệm nail khu vực giàu có gần Seattle",
    vietnamese_description: "Sang tiệm nail khu vực giàu có Bellevue, WA. Tiệm 1500sqft, có 8 bàn, 10 ghế pedicure, 2 phòng wax, phòng breakroom riêng. Income $40K-45K/tháng. Rent $4,200. Giá bán $120K. Liên hệ: Chị Thảo (425) 678-9012.",
    price: "$120,000",
    imageUrl: getNailImage(15),
    contact_info: {
      owner_name: "Chị Thảo",
      phone: "(425) 678-9012"
    },
    square_feet: 1500,
    featured: false,
    is_vietnamese_listing: true
  },
  {
    id: "vn-109",
    name: "Tiệm Nail Đẹp Austin",
    location: "Austin, TX",
    description: "Tiệm nail sang trọng trong khu thương mại cao cấp",
    vietnamese_description: "Cần sang tiệm nail mới remodel tại Austin, TX. Tiệm rộng 1800sqft, có 10 bàn, 12 ghế spa pedicure cao cấp, 3 phòng dịch vụ. Khách sang, tip tốt. Income $50K-55K/tháng. Rent $5,200. Giá sang $140K. Liên hệ: Anh Hải (512) 345-6789.",
    price: "$140,000",
    imageUrl: getNailImage(0),
    contact_info: {
      owner_name: "Anh Hải",
      phone: "(512) 345-6789"
    },
    square_feet: 1800,
    featured: false,
    is_vietnamese_listing: true
  },
  {
    id: "vn-110",
    name: "Tiệm Nail Bờ Đông",
    location: "Boston, MA",
    description: "Tiệm nail khu trung tâm thành phố Boston",
    vietnamese_description: "Sang tiệm nail khu trung tâm Boston, MA. Tiệm hoạt động 15 năm, khách ổn định. Có 6 bàn, 8 ghế pedicure, 1 phòng wax. Income $30K-35K/tháng. Rent $3,800. Giá sang $85K. Liên hệ: Cô Mai (617) 234-5678.",
    price: "$85,000",
    imageUrl: getNailImage(1),
    contact_info: {
      owner_name: "Cô Mai",
      phone: "(617) 234-5678"
    },
    square_feet: 1300,
    featured: false,
    is_vietnamese_listing: true
  },
  {
    id: "vn-111",
    name: "Tiệm Nail Đẹp Chicago",
    location: "Chicago, IL",
    description: "Tiệm nail cao cấp khu downtown Chicago",
    vietnamese_description: "Cần sang tiệm nail khu downtown Chicago. Tiệm thiết kế hiện đại, sang trọng. Có 10 bàn, 12 ghế pedicure mới, 2 phòng wax, 1 phòng facial. Income $45K-50K/tháng. Rent $4,800. Giá bán $150K. Liên hệ: Anh Thắng (312) 456-7890.",
    price: "$150,000",
    imageUrl: getNailImage(2),
    contact_info: {
      owner_name: "Anh Thắng",
      phone: "(312) 456-7890"
    },
    square_feet: 1800,
    featured: false,
    is_vietnamese_listing: true
  },
  {
    id: "vn-112",
    name: "Tiệm Nail Nhỏ Phoenix",
    location: "Scottsdale, AZ",
    description: "Tiệm nail nhỏ xinh khu giàu có ở Arizona",
    vietnamese_description: "Sang tiệm nail nhỏ xinh ở khu giàu Scottsdale, AZ. Tiệm có 4 bàn, 6 ghế pedicure, 1 phòng dịch vụ. Khách rất sang và tip hậu. Income $20K-25K/tháng. Rent $2,200. Giá sang $40K. Liên hệ: Cô Hồng (480) 567-8901.",
    price: "$40,000",
    imageUrl: getNailImage(3),
    contact_info: {
      owner_name: "Cô Hồng",
      phone: "(480) 567-8901"
    },
    square_feet: 900,
    featured: false,
    is_vietnamese_listing: true
  },
  {
    id: "vn-113",
    name: "Tiệm Nail Cao Cấp Philadelphia",
    location: "Philadelphia, PA",
    description: "Tiệm nail cao cấp trong khu thương mại trung tâm",
    vietnamese_description: "Sang tiệm nail cao cấp ở Philadelphia, PA. Tiệm 2000sqft, có 12 bàn, 14 ghế pedicure cao cấp, 3 phòng dịch vụ. Income $55K-65K/tháng. Rent $5,500. Giá sang $170K. Liên hệ: Anh Đức (215) 678-9012.",
    price: "$170,000",
    imageUrl: getNailImage(4),
    contact_info: {
      owner_name: "Anh Đức",
      phone: "(215) 678-9012"
    },
    square_feet: 2000,
    featured: false,
    is_vietnamese_listing: true
  },
  {
    id: "vn-114",
    name: "Tiệm Nail Michigan",
    location: "Ann Arbor, MI",
    description: "Tiệm nail trong khu đại học sầm uất",
    vietnamese_description: "Sang tiệm nail gần khu đại học Michigan. Tiệm có 6 bàn, 8 ghế pedicure, 1 phòng wax. Khách sinh viên và giáo sư đông đúc. Income $25K-30K/tháng. Rent $2,800. Giá sang $60K. Liên hệ: Chị Ngọc (734) 789-0123.",
    price: "$60,000",
    imageUrl: getNailImage(5),
    contact_info: {
      owner_name: "Chị Ngọc",
      phone: "(734) 789-0123"
    },
    square_feet: 1200,
    featured: false,
    is_vietnamese_listing: true
  },
  {
    id: "vn-115",
    name: "Tiệm Nail Vùng Dallas",
    location: "Plano, TX",
    description: "Tiệm nail vùng ngoại ô Dallas giàu có",
    vietnamese_description: "Cần sang tiệm nail ở Plano, TX. Khu Mỹ trắng, giàu có. Tiệm có 8 bàn, 10 ghế pedicure cao cấp, 2 phòng dịch vụ. Income $35K-40K/tháng. Rent $3,700. Giá bán $90K. Liên hệ: Anh Tùng (972) 890-1234.",
    price: "$90,000",
    imageUrl: getNailImage(6),
    contact_info: {
      owner_name: "Anh Tùng",
      phone: "(972) 890-1234"
    },
    square_feet: 1500,
    featured: false,
    is_vietnamese_listing: true
  },
  {
    id: "vn-116",
    name: "Tiệm Nail New Jersey",
    location: "Princeton, NJ",
    description: "Tiệm nail khu học thuật cao cấp",
    vietnamese_description: "Sang tiệm nail khu Princeton, NJ. Khách học thức, sang trọng. Tiệm có 6 bàn, 8 ghế pedicure, 1 phòng wax. Income $28K-32K/tháng. Rent $3,200. Giá sang $70K. Liên hệ: Chị Trang (609) 901-2345.",
    price: "$70,000",
    imageUrl: getNailImage(7),
    contact_info: {
      owner_name: "Chị Trang",
      phone: "(609) 901-2345"
    },
    square_feet: 1200,
    featured: false,
    is_vietnamese_listing: true
  },
  {
    id: "vn-117",
    name: "Tiệm Nail Nam California",
    location: "San Diego, CA",
    description: "Tiệm nail khu biển sang trọng",
    vietnamese_description: "Cần sang tiệm nail khu biển San Diego. Tiệm rộng 1600sqft, có 8 bàn, 10 ghế pedicure, 2 phòng dịch vụ. Khách du lịch và dân địa phương sang trọng. Income $40K-50K/tháng. Rent $4,500. Giá sang $130K. Liên hệ: Chị Lan (619) 012-3456.",
    price: "$130,000",
    imageUrl: getNailImage(8),
    contact_info: {
      owner_name: "Chị Lan",
      phone: "(619) 012-3456"
    },
    square_feet: 1600,
    featured: false,
    is_vietnamese_listing: true
  },
  {
    id: "vn-118",
    name: "Sang Tiệm Đẹp Denver",
    location: "Denver, CO",
    description: "Tiệm nail cao cấp trong trung tâm thành phố",
    vietnamese_description: "Sang tiệm nail đẹp khu trung tâm Denver, CO. Tiệm 1800sqft, mới remodel với 10 bàn, 12 ghế pedicure cao cấp, 2 phòng wax, 1 phòng facial. Income $45K-50K/tháng. Rent $4,800. Giá sang $145K. Liên hệ: Anh Nam (303) 123-4567.",
    price: "$145,000",
    imageUrl: getNailImage(9),
    contact_info: {
      owner_name: "Anh Nam",
      phone: "(303) 123-4567"
    },
    square_feet: 1800,
    featured: false,
    is_vietnamese_listing: true
  },
  {
    id: "vn-119",
    name: "Tiệm Nail Portland",
    location: "Portland, OR",
    description: "Tiệm nail độc đáo phong cách hiện đại",
    vietnamese_description: "Sang tiệm nail khu Portland, OR. Tiệm thiết kế hiện đại, độc đáo, được nhiều tạp chí đăng tin. Có 6 bàn, 8 ghế pedicure đặc biệt, 2 phòng dịch vụ. Income $35K-40K/tháng. Rent $3,800. Giá sang $110K. Liên hệ: Chị Quỳnh (503) 234-5678.",
    price: "$110,000",
    imageUrl: getNailImage(10),
    contact_info: {
      owner_name: "Chị Quỳnh",
      phone: "(503) 234-5678"
    },
    square_feet: 1400,
    featured: false,
    is_vietnamese_listing: true
  },
  {
    id: "vn-120",
    name: "Tiệm Nail Nashville",
    location: "Nashville, TN",
    description: "Tiệm nail khu âm nhạc sôi động",
    vietnamese_description: "Cần sang tiệm nail khu âm nhạc Nashville, TN. Tiệm có 8 bàn, 10 ghế pedicure, 1 phòng wax, 1 phòng facial. Khách nghệ sĩ và du khách đông đúc. Income $32K-38K/tháng. Rent $3,400. Giá bán $80K. Liên hệ: Anh Hiếu (615) 345-6789.",
    price: "$80,000",
    imageUrl: getNailImage(11),
    contact_info: {
      owner_name: "Anh Hiếu",
      phone: "(615) 345-6789"
    },
    square_feet: 1500,
    featured: false,
    is_vietnamese_listing: true
  }
];

export default vietnameseSalonListings;
