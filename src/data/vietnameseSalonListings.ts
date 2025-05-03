import { Salon } from '@/types/salon';

// Vietnamese Nail Salon Listings
export const vietnameseSalonListings: Salon[] = [
  // First 8 newer listings (keeping these as they are, but ensuring price is a number)
  {
    id: "vn-001",
    name: "Tiệm Nail Đẹp",
    location: "San Jose, California",
    price: 120000,  // Ensure this is a number, not a string
    imageUrl: "/lovable-uploads/55fac081-9f6d-4220-a212-94ee2720bde9.png",
    description: "Tiệm nail đẹp, rộng rãi, khách ổn định, income cao. Giá thuê rẻ, vị trí tốt ở trung tâm thành phố. Liên hệ ngay!",
    features: ["5 bàn", "6 ghế", "Có phòng wax", "Máy giặt sấy mới"],
    square_feet: 1200,
    monthly_rent: 1800,
    monthly_revenue: "$18,000 - $22,000",
    vietnamese_title: "Cần bán tiệm nail khu Mỹ trắng",
    vietnamese_description: "Tiệm rộng 1200sqft, 5 bàn, 6 ghế, có phòng wax, máy giặt sấy mới. Tiệm đẹp, khang trang, khách ổn định, thu nhập tốt. Giá thuê rẻ, vị trí thuận tiện. Liên hệ để biết thêm chi tiết.",
    is_vietnamese_listing: true,
    is_featured: true,
    contact_info: {
      phone: "408-123-4567",
      owner_name: "Anh Tuấn",
      zalo: "tuannail408"
    }
  },
  {
    id: "vn-002",
    name: "Tiệm Nail Sang Trọng",
    location: "Orange County, California",
    price: 150000,  // Ensure this is a number, not a string
    imageUrl: "/lovable-uploads/ca09b67d-f8b2-497c-bfd9-ac6ec0a491c7.png",
    description: "Cần sang tiệm gấp vì lý do sức khỏe. Tiệm vị trí đẹp, khu Mỹ trắng, income cao, khách sang.",
    features: ["8 bàn", "10 ghế", "2 phòng wax", "Máy giặt sấy"],
    square_feet: 1500,
    monthly_rent: 2200,
    monthly_revenue: "$25,000 - $30,000",
    vietnamese_title: "Sang tiệm nail gấp vì lý do sức khỏe",
    vietnamese_description: "Tiệm nail vị trí đẹp, khu Mỹ trắng, khách sang. Tiệm rộng 1500sqft, 8 bàn, 10 ghế, có 2 phòng wax riêng biệt. Thu nhập ổn định $25-30K/tháng. Cần sang lại gấp vì lý do sức khỏe, giá có thể thương lượng.",
    is_vietnamese_listing: true,
    is_featured: true,
    contact_info: {
      phone: "714-234-5678",
      owner_name: "Chị Hương",
      zalo: "huongnail714"
    }
  },
  {
    id: "vn-003",
    name: "Tiệm Nail Khu Trung Tâm",
    location: "Houston, Texas",
    price: 95000,  // Ensure this is a number, not a string
    imageUrl: "/lovable-uploads/f85b0984-587b-4ce1-bdc7-2bf357aa7695.png",
    description: "Sang tiệm khu trung tâm, giá rẻ cho người mới bắt đầu. Tiệm sạch sẽ, đầy đủ thiết bị.",
    features: ["4 bàn", "5 ghế", "Có phòng wax", "Khu thương mại"],
    square_feet: 1000,
    monthly_rent: 1500,
    monthly_revenue: "$12,000 - $15,000",
    vietnamese_title: "Sang tiệm nail giá rẻ cho người mới",
    vietnamese_description: "Cơ hội tốt cho người mới muốn làm chủ: Tiệm nail khu trung tâm thương mại, không gian sạch sẽ, đầy đủ thiết bị. Tiệm có 4 bàn, 5 ghế, 1 phòng wax. Thu nhập ổn định khoảng $12-15K/tháng. Giá thuê hợp lý chỉ $1,500/tháng.",
    is_vietnamese_listing: true,
    is_featured: true,
    contact_info: {
      phone: "281-345-6789",
      owner_name: "Anh Minh",
      zalo: "minhnail281"
    }
  },
  {
    id: "vn-004",
    name: "Tiệm Nail Khu Shopping",
    location: "Atlanta, Georgia",
    price: 110000,  // Ensure this is a number, not a string
    imageUrl: "/lovable-uploads/89ef4a43-b461-47fc-8b2d-97b07318a891.png",
    description: "Tiệm trong khu shopping sầm uất, bên cạnh siêu thị lớn. Thu nhập ổn định quanh năm.",
    features: ["6 bàn", "7 ghế", "2 phòng wax", "Khu mua sắm"],
    square_feet: 1300,
    monthly_rent: 1900,
    monthly_revenue: "$17,000 - $20,000",
    vietnamese_title: "Sang tiệm nail khu shopping center",
    vietnamese_description: "Sang tiệm nail trong khu shopping center sầm uất, bên cạnh siêu thị lớn. Khách ổn định quanh năm. Tiệm có 6 bàn, 7 ghế, 2 phòng wax. Diện tích 1300sqft, tiệm sạch đẹp. Thu nhập ổn định $17-20K/tháng, giá thuê $1,900.",
    is_vietnamese_listing: true,
    contact_info: {
      phone: "404-456-7890",
      owner_name: "Chị Lan",
      zalo: "lannail404"
    }
  },
  {
    id: "vn-005",
    name: "Tiệm Nail Cao Cấp",
    location: "Seattle, Washington",
    price: 180000,  // Ensure this is a number, not a string
    imageUrl: "/lovable-uploads/68057e27-17e9-4643-941f-d68d048d40ce.png",
    description: "Tiệm high-end trong khu phố sang trọng. Khách hàng ổn định, tip cao. Cơ hội tốt cho nhà đầu tư.",
    features: ["10 bàn", "12 ghế", "3 phòng wax", "Tiệm high-end"],
    square_feet: 1800,
    monthly_rent: 2800,
    monthly_revenue: "$30,000 - $35,000",
    vietnamese_title: "Sang tiệm nail cao cấp khu người giàu",
    vietnamese_description: "Cơ hội đầu tư: Tiệm nail cao cấp trong khu phố sang trọng, khách hàng ổn định, tip cao. Tiệm rộng 1800sqft với 10 bàn, 12 ghế, 3 phòng wax riêng biệt. Thu nhập $30-35K/tháng. Tiệm đang hoạt động tốt, cần sang lại vì chuyển tiểu bang.",
    is_vietnamese_listing: true,
    contact_info: {
      phone: "206-567-8901",
      owner_name: "Anh Thành",
      zalo: "thanhnail206"
    }
  },
  {
    id: "vn-006",
    name: "Tiệm Nail Mới Xây",
    location: "Orlando, Florida",
    price: 140000,  // Ensure this is a number, not a string
    imageUrl: "/lovable-uploads/5371f69f-154f-450b-af8b-28774f7d4215.png",
    description: "Tiệm mới xây dựng, trang thiết bị mới 100%. Vị trí đắc địa gần khu du lịch.",
    features: ["7 bàn", "8 ghế", "2 phòng wax", "Thiết bị mới"],
    square_feet: 1400,
    monthly_rent: 2000,
    monthly_revenue: "$20,000 - $25,000",
    vietnamese_title: "Sang tiệm nail mới xây gần khu du lịch",
    vietnamese_description: "Tiệm nail mới xây dựng, trang thiết bị mới 100%. Vị trí đắc địa gần khu du lịch, khách du lịch nhiều, tip cao. Tiệm có 7 bàn, 8 ghế, 2 phòng wax hiện đại. Diện tích 1400sqft, phong cách thiết kế sang trọng. Thu nhập khoảng $20-25K/tháng.",
    is_vietnamese_listing: true,
    contact_info: {
      phone: "407-678-9012",
      owner_name: "Chị Thảo",
      zalo: "thaonail407"
    }
  },
  {
    id: "vn-007",
    name: "Tiệm Nail Khu Văn Phòng",
    location: "Denver, Colorado",
    price: 125000,  // Ensure this is a number, not a string
    imageUrl: "/lovable-uploads/ec5e520a-440f-4a62-bee8-23ba0c7e7c4c.png",
    description: "Tiệm nằm trong khu văn phòng sầm uất, khách hàng là dân văn phòng, thu nhập cao.",
    features: ["6 bàn", "8 ghế", "1 phòng wax", "Khu văn phòng"],
    square_feet: 1200,
    monthly_rent: 1800,
    monthly_revenue: "$18,000 - $22,000",
    vietnamese_title: "Sang tiệm nail khu văn phòng trung tâm",
    vietnamese_description: "Tiệm nail nằm trong khu văn phòng sầm uất, khách hàng chủ yếu là dân văn phòng có thu nhập cao. Tiệm có 6 bàn, 8 ghế, 1 phòng wax. Diện tích 1200sqft, không gian thoáng mát. Thu nhập ổn định $18-22K/tháng, giá thuê hợp lý.",
    is_vietnamese_listing: true,
    contact_info: {
      phone: "303-789-0123",
      owner_name: "Anh Hoàng",
      zalo: "hoangnail303"
    }
  },
  {
    id: "vn-008",
    name: "Tiệm Nail & Spa",
    location: "San Diego, California",
    price: 165000,  // Ensure this is a number, not a string
    imageUrl: "/lovable-uploads/1f3cfd40-4041-4545-b71e-5a7f484f86e9.png",
    description: "Tiệm nail kết hợp spa, dịch vụ đa dạng. Vị trí đẹp, khu dân cư giàu có.",
    features: ["9 bàn", "11 ghế", "3 phòng spa", "Dịch vụ đa dạng"],
    square_feet: 1700,
    monthly_rent: 2500,
    monthly_revenue: "$28,000 - $32,000",
    vietnamese_title: "Sang tiệm nail & spa khu dân cư cao cấp",
    vietnamese_description: "Tiệm nail kết hợp spa, cung cấp nhiều dịch vụ đa dạng. Nằm trong khu dân cư giàu có, khách hàng sang trọng. Tiệm rộng 1700sqft với 9 bàn, 11 ghế, 3 phòng spa đầy đủ thiết bị. Thu nhập ổn định $28-32K/tháng. Cần sang lại vì chủ về Việt Nam định cư.",
    is_vietnamese_listing: true,
    contact_info: {
      phone: "619-890-1234",
      owner_name: "Chị Ngọc",
      zalo: "ngocspa619"
    }
  },
  
  // The following 20 original Vietnamese salon listings - making sure price is a number
  {
    id: "vn-101",
    name: "Tiệm Nail Phố Đông",
    location: "Westminster, CA",
    price: 85000,  // Ensure this is a number, not a string
    imageUrl: "/lovable-uploads/55fac081-9f6d-4220-a212-94ee2720bde9.png",
    description: "Cần sang tiệm gấp vì chuyển bang. Tiệm đẹp, khách quen đông. Giá thuê hợp lý.",
    vietnamese_title: "Sang tiệm nail gấp - Giá tốt",
    vietnamese_description: "Cần sang tiệm gấp vì chuyển bang. Tiệm rộng 1100sqft, có 5 bàn, 6 ghế, 1 phòng wax. Khách quen đông, income ổn định. Giá thuê rẻ $1,600/tháng, lease còn dài. Giá bán có thể thương lượng cho người thiện chí.",
    features: ["5 bàn", "6 ghế", "1 phòng wax", "Có chỗ đậu xe rộng"],
    square_feet: 1100,
    monthly_rent: 1600,
    is_vietnamese_listing: true,
    contact_info: {
      owner_name: "Anh Tâm",
      phone: "714-555-1234",
      zalo: "tamvn714"
    }
  },
  {
    id: "vn-102",
    name: "Tiệm Nail Trung Tâm",
    location: "Garden Grove, CA",
    price: 120000,  // Ensure this is a number, not a string
    imageUrl: "/lovable-uploads/ca09b67d-f8b2-497c-bfd9-ac6ec0a491c7.png", 
    description: "Tiệm trong trung tâm mua sắm lớn, khách Mỹ trắng, tip cao. Cơ hội tốt cho người muốn làm chủ.",
    vietnamese_title: "Sang tiệm nail khu Mỹ trắng - thu nhập cao",
    vietnamese_description: "Tiệm nằm trong trung tâm thương mại lớn, khách Mỹ trắng, tip cao. Diện tích 1300sqft, 6 bàn, 8 ghế, 2 phòng wax. Income trung bình $18,000-$22,000/tháng. Giá thuê $2,200/tháng bao gồm cam, nước. Sang lại vì chủ về Việt Nam định cư.",
    features: ["6 bàn", "8 ghế", "2 phòng wax", "Khu trung tâm"],
    square_feet: 1300,
    monthly_rent: 2200,
    is_vietnamese_listing: true,
    contact_info: {
      owner_name: "Chị Hoa",
      phone: "714-555-5678",
      zalo: "hoasalon"
    }
  },
  {
    id: "vn-103",
    name: "Tiệm Nail Vị Trí Đẹp",
    location: "Houston, TX",
    price: 95000,  // Ensure this is a number, not a string
    imageUrl: "/lovable-uploads/f85b0984-587b-4ce1-bdc7-2bf357aa7695.png",
    description: "Sang tiệm nail vị trí đẹp, gần khu dân cư đông đúc. Thu nhập ổn định, giá thuê rẻ.",
    vietnamese_title: "Sang tiệm nail Houston - Giá hợp lý",
    vietnamese_description: "Cần sang tiệm nail tại Houston, vị trí đẹp gần khu dân cư đông đúc. Tiệm rộng 1000sqft, có 4 bàn, 5 ghế, 1 phòng wax. Income trung bình $12,000-$15,000/tháng. Giá thuê chỉ $1,400/tháng, lease còn 3 năm. Giá bán phù hợp cho người mới bắt đầu.",
    features: ["4 bàn", "5 ghế", "1 phòng wax", "Giá thuê rẻ"],
    square_feet: 1000,
    monthly_rent: 1400,
    is_vietnamese_listing: true,
    contact_info: {
      owner_name: "Anh Dũng",
      phone: "281-555-9012",
      zalo: "dungnail281"
    }
  },
  {
    id: "vn-104",
    name: "Tiệm Nail & Spa Cao Cấp",
    location: "Atlanta, GA",
    price: 180000,  // Ensure this is a number, not a string
    imageUrl: "/lovable-uploads/89ef4a43-b461-47fc-8b2d-97b07318a891.png",
    description: "Tiệm nail & spa cao cấp, thiết kế sang trọng, đầy đủ dịch vụ. Thu nhập cao, khách hàng VIP.",
    vietnamese_title: "Sang tiệm nail & spa cao cấp Atlanta",
    vietnamese_description: "Cơ hội đầu tư: Tiệm nail & spa cao cấp tại Atlanta, thiết kế sang trọng hiện đại. Tiệm rộng 1800sqft, có 9 bàn, 10 ghế, 3 phòng spa đầy đủ trang thiết bị. Income $27,000-$32,000/tháng. Khách hàng VIP, tip cao. Sang lại vì chủ chuyển hướng kinh doanh.",
    features: ["9 bàn", "10 ghế", "3 phòng spa", "Thiết kế sang trọng"],
    square_feet: 1800,
    monthly_rent: 2800,
    is_vietnamese_listing: true,
    contact_info: {
      owner_name: "Chị Linh",
      phone: "404-555-3456",
      zalo: "linhspa404"
    }
  },
  {
    id: "vn-105",
    name: "Tiệm Nail Mới Trang Trí",
    location: "Orlando, FL",
    price: 135000,  // Ensure this is a number, not a string
    imageUrl: "/lovable-uploads/68057e27-17e9-4643-941f-d68d048d40ce.png",
    description: "Tiệm vừa trang trí mới, thiết bị hiện đại. Vị trí gần khu du lịch, khách du lịch nhiều.",
    vietnamese_title: "Sang tiệm mới trang trí - Khu du lịch",
    vietnamese_description: "Cần sang tiệm nail vừa trang trí mới 100%, thiết bị hiện đại. Vị trí đắc địa gần khu du lịch Orlando, khách du lịch quanh năm. Tiệm có 7 bàn, 9 ghế, 2 phòng wax. Rộng 1400sqft. Income ổn định $20,000-$25,000/tháng. Sang lại vì lý do sức khỏe.",
    features: ["7 bàn", "9 ghế", "2 phòng wax", "Thiết bị mới"],
    square_feet: 1400,
    monthly_rent: 2100,
    is_vietnamese_listing: true,
    contact_info: {
      owner_name: "Anh Phong",
      phone: "407-555-7890",
      zalo: "phongfl407"
    }
  },
  {
    id: "vn-106",
    name: "Tiệm Nail Giá Rẻ",
    location: "Garland, TX",
    price: 75000,  // Ensure this is a number, not a string
    imageUrl: "/lovable-uploads/5371f69f-154f-450b-af8b-28774f7d4215.png",
    description: "Cơ hội tốt cho người mới bắt đầu. Tiệm nhỏ gọn, giá thuê rẻ, dễ quản lý.",
    vietnamese_title: "Sang tiệm giá rẻ - Thích hợp người mới",
    vietnamese_description: "Cơ hội tốt cho người mới bắt đầu: Tiệm nhỏ gọn dễ quản lý, diện tích 850sqft, có 3 bàn, 4 ghế, 1 phòng wax. Giá thuê cực rẻ chỉ $1,200/tháng. Income trung bình $8,000-$10,000/tháng. Sang lại với giá hợp lý vì chủ về hưu.",
    features: ["3 bàn", "4 ghế", "1 phòng wax", "Giá rẻ"],
    square_feet: 850,
    monthly_rent: 1200,
    is_vietnamese_listing: true,
    contact_info: {
      owner_name: "Cô Tuyết",
      phone: "469-555-0123",
      zalo: "tuyetnail"
    }
  },
  {
    id: "vn-107",
    name: "Tiệm Nail Khu Văn Phòng",
    location: "Denver, CO",
    price: 130000,  // Ensure this is a number, not a string
    imageUrl: "/lovable-uploads/ec5e520a-440f-4a62-bee8-23ba0c7e7c4c.png",
    description: "Tiệm trong khu văn phòng đông đúc, khách hàng là dân văn phòng, thu nhập cao.",
    vietnamese_title: "Sang tiệm nail khu văn phòng cao cấp",
    vietnamese_description: "Tiệm nail trong khu văn phòng cao cấp trung tâm Denver, khách hàng đa phần là dân văn phòng thu nhập cao. Tiệm rộng 1250sqft, có 6 bàn, 7 ghế, 1 phòng wax. Income ổn định $19,000-$23,000/tháng. Giá thuê $2,000/tháng. Sang lại vì chủ mở thêm tiệm mới.",
    features: ["6 bàn", "7 ghế", "1 phòng wax", "Khu văn phòng"],
    square_feet: 1250,
    monthly_rent: 2000,
    is_vietnamese_listing: true,
    contact_info: {
      owner_name: "Anh Trung",
      phone: "303-555-4567",
      zalo: "trungnail303"
    }
  },
  {
    id: "vn-108",
    name: "Tiệm Nail Khu Shopping",
    location: "Dallas, TX",
    price: 110000,  // Ensure this is a number, not a string
    imageUrl: "/lovable-uploads/1f3cfd40-4041-4545-b71e-5a7f484f86e9.png",
    description: "Tiệm trong trung tâm mua sắm sầm uất, lưu lượng khách lớn. Giá thuê hợp lý.",
    vietnamese_title: "Sang tiệm nail khu shopping center",
    vietnamese_description: "Sang tiệm nail trong trung tâm mua sắm sầm uất tại Dallas. Lưu lượng khách lớn, khách vãng lai nhiều. Tiệm rộng 1200sqft, có 5 bàn, 6 ghế, 1 phòng wax. Income $15,000-$18,000/tháng. Giá thuê $1,800/tháng. Cần sang gấp vì chuyển về California.",
    features: ["5 bàn", "6 ghế", "1 phòng wax", "Khu shopping"],
    square_feet: 1200,
    monthly_rent: 1800,
    is_vietnamese_listing: true,
    contact_info: {
      owner_name: "Chị Mai",
      phone: "214-555-8901",
      zalo: "maitx214"
    }
  },
  {
    id: "vn-109",
    name: "Tiệm Nail Góc Phố",
    location: "Charlotte, NC",
    price: 92000,  // Ensure this is a number, not a string
    imageUrl: "/lovable-uploads/55fac081-9f6d-4220-a212-94ee2720bde9.png",
    description: "Tiệm ở vị trí góc phố đẹp, dễ nhìn thấy, khách vãng lai nhiều. Giá bán hợp lý.",
    vietnamese_title: "Sang tiệm nail vị trí góc phố đắc địa",
    vietnamese_description: "Tiệm nail vị trí góc phố đẹp tại Charlotte, dễ nhìn thấy từ đường lớn, khách vãng lai nhiều. Tiệm rộng 1000sqft, có 4 bàn, 5 ghế, 1 phòng wax. Income $12,000-$15,000/tháng. Giá thuê $1,700/tháng. Sang lại với giá hợp lý vì chủ mở business khác.",
    features: ["4 bàn", "5 ghế", "1 phòng wax", "Vị trí góc phố"],
    square_feet: 1000,
    monthly_rent: 1700,
    is_vietnamese_listing: true,
    contact_info: {
      owner_name: "Chị Thủy",
      phone: "704-555-2345",
      zalo: "thuync704"
    }
  },
  {
    id: "vn-110",
    name: "Tiệm Nail Khu Nhà Giàu",
    location: "Irvine, CA",
    price: 195000,  // Ensure this is a number, not a string
    imageUrl: "/lovable-uploads/ca09b67d-f8b2-497c-bfd9-ac6ec0a491c7.png",
    description: "Tiệm trong khu nhà giàu, khách hàng sang trọng, giá dịch vụ cao. Thu nhập rất tốt.",
    vietnamese_title: "Sang tiệm nail khu nhà giàu - thu nhập cao",
    vietnamese_description: "Cơ hội đầu tư: Tiệm nail trong khu nhà giàu Irvine, khách hàng sang trọng, giá dịch vụ cao. Tiệm rộng 1600sqft, có 8 bàn, 10 ghế, 2 phòng wax/spa. Income cao $30,000-$35,000/tháng. Giá thuê $3,000/tháng. Sang lại vì chủ về Việt Nam định cư.",
    features: ["8 bàn", "10 ghế", "2 phòng wax/spa", "Khu nhà giàu"],
    square_feet: 1600,
    monthly_rent: 3000,
    is_vietnamese_listing: true,
    contact_info: {
      owner_name: "Anh Khoa",
      phone: "949-555-6789",
      zalo: "khoairvine"
    }
  },
  {
    id: "vn-111",
    name: "Tiệm Nail & Eyelash",
    location: "Austin, TX",
    price: 140000,  // Ensure this is a number, not a string
    imageUrl: "/lovable-uploads/f85b0984-587b-4ce1-bdc7-2bf357aa7695.png",
    description: "Tiệm kết hợp nail và nối mi, dịch vụ đa dạng. Khách hàng trẻ trung, khu vực phát triển.",
    vietnamese_title: "Sang tiệm nail & eyelash Austin",
    vietnamese_description: "Sang tiệm nail kết hợp nối mi tại Austin. Khu vực đang phát triển mạnh, khách hàng trẻ trung. Tiệm rộng 1300sqft, có 6 bàn nail, 7 ghế, 2 ghế nối mi chuyên dụng, 1 phòng wax. Income tốt $20,000-$25,000/tháng. Giá thuê $2,200/tháng. Sang lại vì lý do sức khỏe.",
    features: ["6 bàn nail", "7 ghế", "2 ghế nối mi", "1 phòng wax"],
    square_feet: 1300,
    monthly_rent: 2200,
    is_vietnamese_listing: true,
    contact_info: {
      owner_name: "Chị Vy",
      phone: "512-555-0123",
      zalo: "vyaustin"
    }
  },
  {
    id: "vn-112",
    name: "Tiệm Nail Khu Dân Cư",
    location: "Sacramento, CA",
    price: 105000,  // Ensure this is a number, not a string
    imageUrl: "/lovable-uploads/89ef4a43-b461-47fc-8b2d-97b07318a891.png",
    description: "Tiệm trong khu dân cư đông đúc, khách quen nhiều. Income ổn định quanh năm.",
    vietnamese_title: "Sang tiệm nail khu dân cư đông đúc",
    vietnamese_description: "Sang tiệm nail nằm trong khu dân cư đông đúc Sacramento. Tiệm đã hoạt động 5 năm, có lượng khách quen ổn định. Diện tích 1100sqft, có 5 bàn, 6 ghế, 1 phòng wax. Income $14,000-$17,000/tháng, ít biến động theo mùa. Giá thuê $1,700/tháng. Sang lại vì chủ chuyển hướng kinh doanh.",
    features: ["5 bàn", "6 ghế", "1 phòng wax", "Khách quen đông"],
    square_feet: 1100,
    monthly_rent: 1700,
    is_vietnamese_listing: true,
    contact_info: {
      owner_name: "Anh Hải",
      phone: "916-555-4567",
      zalo: "haica916"
    }
  },
  {
    id: "vn-113",
    name: "Tiệm Nail Có Housing",
    location: "San Antonio, TX",
    price: 125000,  // Ensure this is a number, not a string
    imageUrl: "/lovable-uploads/68057e27-17e9-4643-941f-d68d048d40ce.png",
    description: "Tiệm nail có phòng ở phía sau cho nhân viên. Tiện lợi cho chủ tiệm muốn ở gần nơi làm việc.",
    vietnamese_title: "Sang tiệm nail có housing cho thợ",
    vietnamese_description: "Sang tiệm nail có housing phía sau tại San Antonio. Tiện lợi cho chủ tiệm và nhân viên muốn ở gần nơi làm việc. Tiệm rộng 1400sqft, có 6 bàn, 7 ghế, 1 phòng wax, phòng housing rộng rãi cho 4-5 người ở. Income $16,000-$19,000/tháng. Giá thuê $2,000/tháng. Sang lại vì chủ về Việt Nam.",
    features: ["6 bàn", "7 ghế", "1 phòng wax", "Có housing"],
    square_feet: 1400,
    monthly_rent: 2000,
    is_vietnamese_listing: true,
    contact_info: {
      owner_name: "Chị Hương",
      phone: "210-555-8901",
      zalo: "huongtx210"
    }
  },
  {
    id: "vn-114",
    name: "Tiệm Nail Town Center",
    location: "Tampa, FL",
    price: 115000,  // Ensure this is a number, not a string
    imageUrl: "/lovable-uploads/5371f69f-154f-450b-af8b-28774f7d4215.png",
    description: "Tiệm trong town center sầm uất, khách vãng lai nhiều. Cơ hội tốt cho nhà đầu tư.",
    vietnamese_title: "Sang tiệm nail town center Tampa",
    vietnamese_description: "Sang tiệm nail trong town center sầm uất tại Tampa. Vị trí đẹp, khách vãng lai nhiều. Tiệm rộng 1200sqft, có 5 bàn, 7 ghế, 1 phòng wax. Income ổn định $16,000-$19,000/tháng. Giá thuê $1,900/tháng. Cần sang lại gấp vì lý do gia đình, giá có thể thương lượng.",
    features: ["5 bàn", "7 ghế", "1 phòng wax", "Town center"],
    square_feet: 1200,
    monthly_rent: 1900,
    is_vietnamese_listing: true,
    contact_info: {
      owner_name: "Anh Tùng",
      phone: "813-555-2345",
      zalo: "tungfl813"
    }
  },
  {
    id: "vn-115",
    name: "Tiệm Nail Khu Resort",
    location: "Las Vegas, NV",
    price: 160000,  // Ensure this is a number, not a string
    imageUrl: "/lovable-uploads/ec5e520a-440f-4a62-bee8-23ba0c7e7c4c.png",
    description: "Tiệm trong khu resort nổi tiếng Las Vegas. Khách du lịch nhiều, tip cao.",
    vietnamese_title: "Sang tiệm nail khu resort Las Vegas",
    vietnamese_description: "Cơ hội đặc biệt: Sang tiệm nail trong khu resort nổi tiếng Las Vegas. Khách du lịch quốc tế, tip rất cao. Tiệm rộng 1500sqft, có 7 bàn, 9 ghế, 2 phòng spa. Income cao $25,000-$30,000/tháng. Giá thuê $2,700/tháng. Sang lại vì chủ đầu tư dự án mới.",
    features: ["7 bàn", "9 ghế", "2 phòng spa", "Khu resort"],
    square_feet: 1500,
    monthly_rent: 2700,
    is_vietnamese_listing: true,
    contact_info: {
      owner_name: "Chị Loan",
      phone: "702-555-6789",
      zalo: "loanlv702"
    }
  },
  {
    id: "vn-116",
    name: "Tiệm Nail Mới Xây",
    location: "Phoenix, AZ",
    price: 145000,  // Ensure this is a number, not a string
    imageUrl: "/lovable-uploads/1f3cfd40-4041-4545-b71e-5a7f484f86e9.png",
    description: "Tiệm mới xây 100%, trang thiết bị hiện đại. Vị trí đẹp, khu phát triển nhanh.",
    vietnamese_title: "Sang tiệm nail mới xây Phoenix",
    vietnamese_description: "Sang tiệm nail mới xây 100% tại Phoenix. Trang thiết bị hiện đại, nội thất sang trọng. Vị trí đẹp trong khu đang phát triển nhanh. Tiệm rộng 1400sqft, có 7 bàn, 8 ghế, 2 phòng wax. Income đang tăng, hiện tại $18,000-$22,000/tháng. Giá thuê $2,100/tháng. Sang lại vì chủ có việc gấp phải về Việt Nam.",
    features: ["7 bàn", "8 ghế", "2 phòng wax", "Mới xây"],
    square_feet: 1400, 
    monthly_rent: 2100,
    is_vietnamese_listing: true,
    contact_info: {
      owner_name: "Anh Hùng",
      phone: "480-555-0123",
      zalo: "hungaz480"
    }
  },
  {
    id: "vn-117",
    name: "Tiệm Nail Chủ Về Hưu",
    location: "Portland, OR",
    price: 88000,  // Ensure this is a number, not a string
    imageUrl: "/lovable-uploads/55fac081-9f6d-4220-a212-94ee2720bde9.png",
    description: "Chủ về hưu cần sang tiệm gấp. Giá bán rẻ, cơ hội tốt cho người mới bắt đầu.",
    vietnamese_title: "Sang rẻ tiệm nail - Chủ về hưu",
    vietnamese_description: "Chủ về hưu cần sang gấp tiệm nail tại Portland. Giá bán rẻ, cơ hội tốt cho người mới bắt đầu. Tiệm đã hoạt động 10 năm, có nhiều khách quen. Diện tích 950sqft, có 4 bàn, 5 ghế, 1 phòng wax. Income $10,000-$13,000/tháng. Giá thuê hợp lý $1,500/tháng.",
    features: ["4 bàn", "5 ghế", "1 phòng wax", "Khách quen nhiều"],
    square_feet: 950,
    monthly_rent: 1500,
    is_vietnamese_listing: true,
    contact_info: {
      owner_name: "Cô Hà",
      phone: "503-555-4567",
      zalo: "haor503"
    }
  },
  {
    id: "vn-118",
    name: "Tiệm Nail Khu Đại Học",
    location: "Berkeley, CA",
    price: 105000,  // Ensure this is a number, not a string
    imageUrl: "/lovable-uploads/ca09b67d-f8b2-497c-bfd9-ac6ec0a491c7.png",
    description: "Tiệm gần khu đại học Berkeley, khách hàng trẻ trung. Thu nhập ổn định, ít bị ảnh hưởng bởi mùa vụ.",
    vietnamese_title: "Sang tiệm nail khu đại học Berkeley",
    vietnamese_description: "Sang tiệm nail gần khu đại học Berkeley. Khách hàng trẻ trung, thu nhập ổn định quanh năm. Tiệm rộng 1000sqft, có 5 bàn, 6 ghế, 1 phòng wax. Income $14,000-$17,000/tháng, ít bị ảnh hưởng bởi mùa vụ. Giá thuê $1,800/tháng. Sang lại vì chủ chuyển bang.",
    features: ["5 bàn", "6 ghế", "1 phòng wax", "Khu đại học"],
    square_feet: 1000,
    monthly_rent: 1800,
    is_vietnamese_listing: true,
    contact_info: {
      owner_name: "Chị Thúy",
      phone: "510-555-8901",
      zalo: "thuyca510"
    }
  },
  {
    id: "vn-119",
    name: "Tiệm Nail & Lash Cao Cấp",
    location: "Bellevue, WA",
    price: 175000,  // Ensure this is a number, not a string
    imageUrl: "/lovable-uploads/f85b0984-587b-4ce1-bdc7-2bf357aa7695.png",
    description: "Tiệm nail và lash cao cấp, phong cách hiện đại sang trọng. Khách hàng là giới văn phòng cao cấp.",
    vietnamese_title: "Sang tiệm nail & lash cao cấp Bellevue",
    vietnamese_description: "Sang tiệm nail & lash cao cấp tại Bellevue. Nội thất sang trọng hiện đại, khách hàng là giới văn phòng cao cấp của Microsoft, Amazon. Tiệm rộng 1700sqft, có 8 bàn nail, 9 ghế, 3 ghế nối mi, 2 phòng spa. Income cao $28,000-$33,000/tháng. Giá thuê $2,900/tháng. Sang lại vì chủ mở chuỗi tiệm mới.",
    features: ["8 bàn", "9 ghế", "3 ghế nối mi", "2 phòng spa"],
    square_feet: 1700,
    monthly_rent: 2900,
    is_vietnamese_listing: true,
    contact_info: {
      owner_name: "Chị Phương",
      phone: "425-555-2345",
      zalo: "phuongwa425"
    }
  },
  {
    id: "vn-120",
    name: "Tiệm Nail Khu Biển",
    location: "San Diego, CA",
    price: 150000,  // Ensure this is a number, not a string
    imageUrl: "/lovable-uploads/89ef4a43-b461-47fc-8b2d-97b07318a891.png",
    description: "Tiệm gần khu biển nổi tiếng, khách du lịch nhiều vào mùa hè. Thu nhập cao mùa du lịch.",
    vietnamese_title: "Sang tiệm nail khu biển San Diego",
    vietnamese_description: "Sang tiệm nail gần khu biển nổi tiếng San Diego. Khách du lịch đông vào mùa hè, thu nhập cao mùa du lịch. Tiệm rộng 1300sqft, có 6 bàn, 8 ghế, 1 phòng wax. Income trung bình $17,000-$25,000/tháng (cao vào mùa hè). Giá thuê $2,300/tháng. Sang lại vì chủ về Việt Nam định cư.",
    features: ["6 bàn", "8 ghế", "1 phòng wax", "Gần biển"],
    square_feet: 1300,
    monthly_rent: 2300,
    is_vietnamese_listing: true,
    contact_info: {
      owner_name: "Anh Toàn",
      phone: "619-555-6789",
      zalo: "toanca619"
    }
  }
];
