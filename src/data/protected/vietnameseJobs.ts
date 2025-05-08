
import { Job } from '@/types/job';

// Add 'gold' as a valid pricingTier value
export const vietnameseJobs: Job[] = [
  {
    id: "magicnails-top-diamond",
    title: "Magic Nails – Thợ Nail Giỏi",
    company: "Magic Nails",
    location: "Houston, TX",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ nail giỏi, làm đủ thứ, income cao, bao lương từ $1,200/tuần trở lên tùy theo khả năng. Chủ lo nhà ở, bao ăn ở. Cách Houston 30P lái xe nhưng khu vực sang, giàu.",
    contact_info: {
      phone: "713-555-1234",
      email: "info@magicnails.com",
      owner_name: "Chị Hoa"
    },
    vietnamese_description: "Cần thợ nail giỏi, làm đủ thứ, income cao, bao lương từ $1,200/tuần trở lên tùy theo khả năng. Chủ lo nhà ở, bao ăn ở. Cách Houston 30P lái xe nhưng khu vực sang, giàu.\n\nYêu cầu:\n- Biết làm bột\n- Biết làm chân tay nước\n- Có kinh nghiệm tối thiểu 2 năm\n- Có bang TX hoặc có thể transfer qua TX\n\nLiên hệ Chị Hoa để biết thêm chi tiết.",
    image: "/lovable-uploads/9c17ae10-5590-4c10-a59f-0830de25f070.png",
    salary_range: "$1,200+/tuần",
    pricingTier: "diamond",
    is_vietnamese_listing: true,
    is_featured: true,
    featured: true,
    featured_text: "Featured by EmviApp"
  },
  {
    id: "milano-nail-spa-premium-1",
    title: "Milano Nail Spa – Cần Thợ Gấp",
    company: "Milano Nail Spa",
    location: "Humble, TX",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tiệm khu Mỹ trắng, tip cao, cần nhiều thợ nail nữ/nam, biết làm đủ thứ hoặc chuyên môn. Lương $1,100-$1,500/tuần tùy khả năng. Chỗ làm vui vẻ, không khí gia đình.",
    contact_info: {
      phone: "281-555-6544",
      email: "info@milanonailspa.com",
      owner_name: "Anh Tùng"
    },
    vietnamese_description: "Tiệm khu Mỹ trắng, tip cao, cần nhiều thợ nail nữ/nam, biết làm đủ thứ hoặc chuyên môn. Lương $1,100-$1,500/tuần tùy khả năng. Chỗ làm vui vẻ, không khí gia đình.\n\nYêu cầu:\n- Biết làm bột/chân tay nước\n- Thợ có bang nghề hoặc có kinh nghiệm 2 năm trở lên\n- Ưu tiên người siêng năng, honest\n\nMọi chi tiết xin liên hệ Anh Tùng để biết thêm chi tiết.",
    image: "/lovable-uploads/8c7d4688-5f67-42e1-952b-1e4eb4bd4679.png",
    salary_range: "$1,100-$1,500/tuần",
    pricingTier: "premium",
    is_vietnamese_listing: true,
    featured: true
  },
  {
    id: "clawson-nail-salon-premium-2",
    title: "Clawson Nail Salon – Cần Thợ Bột + CTN",
    company: "Clawson Nail Salon",
    location: "Clawson, MI",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ bột và chân tay nước, khu Mỹ trắng sang, khách rất tốt và tip hậu. Lương $1,300-$1,600/tuần tuỳ năng lực. Bao ăn ở, môi trường làm việc tốt, không drama.",
    contact_info: {
      phone: "248-555-7890",
      email: "owner@clawsonnails.com",
      owner_name: "Chủ Tiệm"
    },
    vietnamese_description: "Cần thợ bột và chân tay nước, khu Mỹ trắng sang, khách rất tốt và tip hậu. Lương $1,300-$1,600/tuần tuỳ năng lực. Bao ăn ở, môi trường làm việc tốt, không drama.\n\nCần người:\n- Làm bột giỏi hoặc có thể làm chân tay nước\n- Kinh nghiệm từ 2 năm trở lên\n- Người có bang Michigan hoặc có thể transfer\n\nChi tiết xin gọi cho chủ tiệm.",
    image: "/lovable-uploads/ac31083b-3861-4851-99ac-ed1bc185c4d9.png",
    salary_range: "$1,300-$1,600/tuần",
    pricingTier: "premium",
    is_vietnamese_listing: true,
    featured: true
  },
  {
    id: "luxury-nail-spa-premium-3",
    title: "Luxury Nail & Spa – Cần Thợ Chân Tay Nước",
    company: "Luxury Nail & Spa",
    location: "South Lake Tahoe, CA",
    created_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần gấp thợ làm chân tay nước và wax. Khu resort, khách du lịch nên tip rất cao. Bao lương $1,200-$1,400/tuần. Bao ăn ở, môi trường làm việc vui vẻ, phúc lợi tốt.",
    contact_info: {
      phone: "530-555-3456",
      email: "jobs@luxurynailspa.com",
      owner_name: "Chị Mai"
    },
    vietnamese_description: "Cần gấp thợ làm chân tay nước và wax. Khu resort, khách du lịch nên tip rất cao. Bao lương $1,200-$1,400/tuần. Bao ăn ở, môi trường làm việc vui vẻ, phúc lợi tốt.\n\nƯu tiên:\n- Người biết làm chân tay nước và waxing\n- Có kinh nghiệm hoặc bằng CA\n- Siêng năng và có tinh thần trách nhiệm\n\nXin gọi cho Chị Mai để biết chi tiết.",
    image: "/lovable-uploads/b851c5dd-95de-4137-a29c-9833ea410cf4.png",
    salary_range: "$1,200-$1,400/tuần",
    pricingTier: "premium",
    is_vietnamese_listing: true,
    featured: true
  },
  {
    id: "elite-nails-and-spa-premium-4",
    title: "Elite Nails & Spa – Tuyển Thợ Full Time",
    company: "Elite Nails & Spa",
    location: "Charlotte, NC",
    created_at: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ nail biết làm đủ thứ, thợ bột, thợ chân tay nước, thợ eyelash extension. Khu khách sang, tip cao. Lương $1,000-$1,500/tuần. Có chỗ ở cho thợ ở xa.",
    contact_info: {
      phone: "704-555-9876",
      email: "apply@elitenailsspa.com",
      owner_name: "Anh Đức"
    },
    vietnamese_description: "Cần thợ nail biết làm đủ thứ, thợ bột, thợ chân tay nước, thợ eyelash extension. Khu khách sang, tip cao. Lương $1,000-$1,500/tuần. Có chỗ ở cho thợ ở xa.\n\nYêu cầu:\n- Thợ nail có kinh nghiệm từ 1 năm trở lên\n- Thợ eyelash extension có chứng chỉ\n- Làm việc nghiêm túc, có trách nhiệm\n\nVui lòng liên hệ Anh Đức.",
    image: "/lovable-uploads/d1abc88d-ed4e-4e7f-91d7-04104efd6ce6.png",
    salary_range: "$1,000-$1,500/tuần",
    pricingTier: "premium",
    is_vietnamese_listing: true,
    featured: true
  },
  {
    id: "elegant-nails-premium-5",
    title: "Elegant Nails – Tìm Thợ Nail Nam/Nữ",
    company: "Elegant Nails",
    location: "Santa Barbara, CA",
    created_at: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tiệm vị trí đẹp, khu khách hàng cao cấp, cần thợ nail nam/nữ biết làm đủ thứ hoặc chuyên môn đều được. Income $1,400-$1,800/tuần. Môi trường làm việc thân thiện.",
    contact_info: {
      phone: "805-555-1122",
      email: "hiring@elegantnails.com",
      owner_name: "Chị Trang"
    },
    vietnamese_description: "Tiệm vị trí đẹp, khu khách hàng cao cấp, cần thợ nail nam/nữ biết làm đủ thứ hoặc chuyên môn đều được. Income $1,400-$1,800/tuần. Môi trường làm việc thân thiện.\n\nLợi ích:\n- Lương cao + tip hậu\n- Được training thêm kỹ năng nếu cần\n- Có thể giúp tìm nhà ở gần tiệm\n\nXin liên hệ Chị Trang để biết thêm chi tiết.",
    image: "/lovable-uploads/fd1aa5a5-543c-4bb3-901b-12abeddb24a6.png",
    salary_range: "$1,400-$1,800/tuần",
    pricingTier: "premium",
    is_vietnamese_listing: true,
    featured: true
  },
  {
    id: "bellagio-nails-premium-6",
    title: "Bellagio Nails – Cần Thợ Gấp",
    company: "Bellagio Nails",
    location: "Boston, MA",
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tiệm khu downtown Boston cần thợ nail biết làm đủ thứ. Tiệm đông khách, tip cao. Bao lương từ $1,200/tuần trở lên. Làm full-time hoặc part-time đều được.",
    contact_info: {
      phone: "617-555-8899",
      email: "jobs@bellagionails.com",
      owner_name: "Anh Minh"
    },
    vietnamese_description: "Tiệm khu downtown Boston cần thợ nail biết làm đủ thứ. Tiệm đông khách, tip cao. Bao lương từ $1,200/tuần trở lên. Làm full-time hoặc part-time đều được.\n\nƯu tiên:\n- Thợ có kinh nghiệm trên 2 năm\n- Có bằng tiểu bang MA (hoặc có thể transfer)\n- Làm được ngày cuối tuần\n\nLiên hệ Anh Minh.",
    image: "/lovable-uploads/f9c0a9f2-e45c-4c98-8413-6fd84624a578.png",
    salary_range: "$1,200+/tuần",
    pricingTier: "premium",
    is_vietnamese_listing: true,
    featured: true
  },
  // Gold tier job listings
  {
    id: "golden-nails-spa-gold-1",
    title: "Golden Nails & Spa – Tuyển Thợ Full/Part Time",
    company: "Golden Nails & Spa",
    location: "Atlanta, GA",
    created_at: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tiệm mới khai trương tại Atlanta, cần thợ nail full time hoặc part time. Bao lương $1,000-$1,500/tuần tuỳ kinh nghiệm. Tiệm khu Mỹ trắng, tip cao.",
    contact_info: {
      phone: "404-555-3344",
      email: "goldnailsatl@gmail.com",
      owner_name: "Anh Khoa"
    },
    vietnamese_description: "Tiệm mới khai trương tại Atlanta, cần thợ nail full time hoặc part time. Bao lương $1,000-$1,500/tuần tuỳ kinh nghiệm. Tiệm khu Mỹ trắng, tip cao.\n\nƯu tiên:\n- Thợ biết làm đủ thứ\n- Có kinh nghiệm tối thiểu 1 năm\n- Người siêng năng và vui vẻ\n\nLiên hệ ngay Anh Khoa.",
    image: "/lovable-uploads/3016e425-432a-49f0-b106-be927292873e.png",
    salary_range: "$1,000-$1,500/tuần",
    pricingTier: "gold",
    is_vietnamese_listing: true
  },
  {
    id: "sunshine-nails-gold-2",
    title: "Sunshine Nails – Cần Thợ Bột",
    company: "Sunshine Nails",
    location: "Fort Worth, TX",
    created_at: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ bột giỏi, có kinh nghiệm làm design. Tiệm đông khách, khu Mỹ trắng, lương $1,200-$1,500/tuần. Môi trường làm việc vui vẻ, không khí gia đình.",
    contact_info: {
      phone: "817-555-7788",
      email: "info@sunshinenails.com",
      owner_name: "Chị Linh"
    },
    vietnamese_description: "Cần thợ bột giỏi, có kinh nghiệm làm design. Tiệm đông khách, khu Mỹ trắng, lương $1,200-$1,500/tuần. Môi trường làm việc vui vẻ, không khí gia đình.\n\nYêu cầu:\n- Biết làm bột và thiết kế móng nghệ thuật\n- Có kinh nghiệm ít nhất 2 năm\n- Có bang Texas hoặc đang ở Texas\n\nLiên hệ với Chị Linh để biết thêm chi tiết.",
    image: "/lovable-uploads/68057e27-17e9-4643-941f-d68d048d40ce.png",
    salary_range: "$1,200-$1,500/tuần",
    pricingTier: "gold",
    is_vietnamese_listing: true
  },
  {
    id: "beauty-nails-gold-3",
    title: "Beauty Nails – Tuyển Thợ Chân Tay Nước",
    company: "Beauty Nails",
    location: "Portland, OR",
    created_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ chân tay nước nam/nữ biết wax. Bao lương $1,000-$1,400/tuần. Tiệm đông khách, khu sang, tip cao. Có chỗ ở cho thợ ở xa.",
    contact_info: {
      phone: "503-555-6655",
      email: "contact@beautynails.com",
      owner_name: "Chị Hương"
    },
    vietnamese_description: "Cần thợ chân tay nước nam/nữ biết wax. Bao lương $1,000-$1,400/tuần. Tiệm đông khách, khu sang, tip cao. Có chỗ ở cho thợ ở xa.\n\nƯu tiên:\n- Người biết làm pedicure và wax\n- Làm việc nhanh nhẹn, sạch sẽ\n- Biết tiếng Anh cơ bản\n\nXin liên hệ Chị Hương.",
    image: "/lovable-uploads/86813678-0980-484a-b898-19b39a5d9c87.png",
    salary_range: "$1,000-$1,400/tuần",
    pricingTier: "gold",
    is_vietnamese_listing: true
  },
  {
    id: "crystal-nails-gold-4",
    title: "Crystal Nails – Cần Nhiều Thợ Nail",
    company: "Crystal Nails",
    location: "Minneapolis, MN",
    created_at: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần nhiều thợ nail nữ/nam, biết làm đủ thứ hoặc chuyên môn đều được. Lương cao từ $1,100-$1,600/tuần tùy khả năng. Chỗ làm vui vẻ, đồng nghiệp thân thiện.",
    contact_info: {
      phone: "612-555-9090",
      email: "crystalnails@gmail.com",
      owner_name: "Anh Tuấn"
    },
    vietnamese_description: "Cần nhiều thợ nail nữ/nam, biết làm đủ thứ hoặc chuyên môn đều được. Lương cao từ $1,100-$1,600/tuần tùy khả năng. Chỗ làm vui vẻ, đồng nghiệp thân thiện.\n\nƯu tiên:\n- Biết làm đủ thứ hoặc chuyên môn\n- Có kinh nghiệm hoặc mới ra trường\n- Có bằng Minnesota hoặc có thể transfer\n\nLiên hệ Anh Tuấn để biết thêm chi tiết.",
    image: "/lovable-uploads/4e42c014-9ec4-4834-ade3-2b11c8e47361.png",
    salary_range: "$1,100-$1,600/tuần",
    pricingTier: "gold",
    is_vietnamese_listing: true
  },
  {
    id: "luxury-nails-2-gold-5",
    title: "Luxury Nails II – Tuyển Gấp Nhiều Vị Trí",
    company: "Luxury Nails II",
    location: "Denver, CO",
    created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tiệm mới mở cần gấp nhiều thợ nail biết làm đủ thứ hoặc chuyên môn. Bao lương $1,200-$1,500/tuần. Tiệm khu Mỹ trắng, tip rất cao. Có hỗ trợ chỗ ở.",
    contact_info: {
      phone: "720-555-1234",
      email: "luxurynails2@gmail.com",
      owner_name: "Chị Lan"
    },
    vietnamese_description: "Tiệm mới mở cần gấp nhiều thợ nail biết làm đủ thứ hoặc chuyên môn. Bao lương $1,200-$1,500/tuần. Tiệm khu Mỹ trắng, tip rất cao. Có hỗ trợ chỗ ở.\n\nĐang cần:\n- Thợ bột\n- Thợ chân tay nước\n- Thợ wax\n\nXin liên hệ ngay với Chị Lan.",
    image: "/lovable-uploads/55fac081-9f6d-4220-a212-94ee2720bde9.png",
    salary_range: "$1,200-$1,500/tuần",
    pricingTier: "gold",
    is_vietnamese_listing: true
  },
  {
    id: "glamour-nails-spa-gold-6",
    title: "Glamour Nails & Spa – Cần Thợ Làm Việc Tại Arizona",
    company: "Glamour Nails & Spa",
    location: "Phoenix, AZ",
    created_at: new Date(Date.now() - 27 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ nail có bằng Arizona hoặc có thể transfer, biết làm đủ thứ hoặc chuyên môn bột/chân tay nước. Lương $1,100-$1,400/tuần. Môi trường làm việc thoải mái.",
    contact_info: {
      phone: "602-555-7766",
      email: "glamour.nails.az@gmail.com",
      owner_name: "Anh Hùng"
    },
    vietnamese_description: "Cần thợ nail có bằng Arizona hoặc có thể transfer, biết làm đủ thứ hoặc chuyên môn bột/chân tay nước. Lương $1,100-$1,400/tuần. Môi trường làm việc thoải mái.\n\nƯu tiên:\n- Người có bằng Arizona\n- Biết làm đủ thứ\n- Làm được cuối tuần\n\nLiên hệ Anh Hùng.",
    image: "/lovable-uploads/acf28832-50ab-40f1-8268-f15a5bbc1bd7.png",
    salary_range: "$1,100-$1,400/tuần",
    pricingTier: "gold",
    is_vietnamese_listing: true
  },
  {
    id: "diamond-nails-spa-gold-7",
    title: "Diamond Nails & Spa – Tuyển Thợ Nail",
    company: "Diamond Nails & Spa",
    location: "Austin, TX",
    created_at: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tiệm ở Austin cần thợ nail biết làm đủ thứ hoặc chuyên về một lĩnh vực. Bao lương $1,000-$1,300/tuần. Tiệm đông khách, tip cao, cách downtown Austin 15 phút lái xe.",
    contact_info: {
      phone: "512-555-3344",
      email: "diamondnailsatx@gmail.com",
      owner_name: "Anh Dũng"
    },
    vietnamese_description: "Tiệm ở Austin cần thợ nail biết làm đủ thứ hoặc chuyên về một lĩnh vực. Bao lương $1,000-$1,300/tuần. Tiệm đông khách, tip cao, cách downtown Austin 15 phút lái xe.\n\nCần người:\n- Biết làm bột hoặc chân tay nước\n- Có kinh nghiệm ít nhất 1 năm\n- Có bằng Texas hoặc không\n\nLiên hệ Anh Dũng để biết thêm chi tiết.",
    image: "/lovable-uploads/e84078f4-339e-4231-b027-e8cd67c8e4ae.png",
    salary_range: "$1,000-$1,300/tuần",
    pricingTier: "gold",
    is_vietnamese_listing: true
  },
  {
    id: "star-nails-gold-8",
    title: "Star Nails – Tiệm Mới Khai Trương Cần Thợ Gấp",
    company: "Star Nails",
    location: "San Jose, CA",
    created_at: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tiệm mới khai trương ở San Jose, cần gấp nhiều thợ nail biết làm đủ thứ. Bao lương $1,300-$1,800/tuần. Khu khách sang, tip hậu. Có hỗ trợ chỗ ở cho thợ từ xa.",
    contact_info: {
      phone: "408-555-9988",
      email: "starnails.sj@gmail.com",
      owner_name: "Chị Thủy"
    },
    vietnamese_description: "Tiệm mới khai trương ở San Jose, cần gấp nhiều thợ nail biết làm đủ thứ. Bao lương $1,300-$1,800/tuần. Khu khách sang, tip hậu. Có hỗ trợ chỗ ở cho thợ từ xa.\n\nƯu tiên:\n- Thợ biết làm đủ thứ\n- Có kinh nghiệm\n- Có bằng California hoặc có thể transfer\n\nLiên hệ Chị Thủy để biết thêm chi tiết.",
    image: "/lovable-uploads/5af131ca-038f-40e6-892a-502d1e822395.png",
    salary_range: "$1,300-$1,800/tuần",
    pricingTier: "gold",
    is_vietnamese_listing: true
  },
  // Additional free and expired job listings will follow this pattern
  // You can add more as needed
  {
    id: "dream-nails-free-1",
    title: "Dream Nails – Cần Thợ Nail",
    company: "Dream Nails",
    location: "Houston, TX", 
    created_at: new Date(Date.now() - 33 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ nail làm chân tay nước và wax. Lương $900-$1,200/tuần tùy năng lực. Tiệm đông khách, tip tốt.",
    contact_info: {
      phone: "713-555-4321",
      email: "info@dreamnails.com",
      owner_name: "Chị Hà"
    },
    vietnamese_description: "Cần thợ nail làm chân tay nước và wax. Lương $900-$1,200/tuần tùy năng lực. Tiệm đông khách, tip tốt.",
    image: "/lovable-uploads/887c837a-5c2a-44d9-a73a-d3aedfef2c84.png",
    salary_range: "$900-$1,200/tuần",
    pricingTier: "free",
    is_vietnamese_listing: true
  },
  {
    id: "fancy-nails-spa-free-2",
    title: "Fancy Nails & Spa – Tuyển Thợ",
    company: "Fancy Nails & Spa",
    location: "Seattle, WA",
    created_at: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Tiệm khu Seattle downtown cần thợ nail biết làm đủ thứ. Lương $900-$1,100/tuần. Môi trường làm việc thoải mái.",
    contact_info: {
      phone: "206-555-1234",
      email: "fancynails.sea@gmail.com",
      owner_name: "Chủ Tiệm"
    },
    vietnamese_description: "Tiệm khu Seattle downtown cần thợ nail biết làm đủ thứ. Lương $900-$1,100/tuần. Môi trường làm việc thoải mái.",
    image: "/lovable-uploads/e1ce1662-fb69-4ad9-995a-364ee16e42f6.png",
    salary_range: "$900-$1,100/tuần",
    pricingTier: "free",
    is_vietnamese_listing: true
  },
  // Add more free listings as needed
  // Expired listings
  {
    id: "gorgeous-nails-expired-1",
    title: "Gorgeous Nails – Cần Thợ Nails",
    company: "Gorgeous Nails",
    location: "Las Vegas, NV",
    created_at: new Date(Date.now() - 65 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ nail nam/nữ biết làm đủ thứ hoặc chuyên môn. Lương $900-$1,300/tuần.",
    contact_info: {
      phone: "702-555-9999", 
      email: "gorgeousnails.lv@gmail.com",
      owner_name: "Anh Phong"
    },
    image: "/lovable-uploads/362c9477-1040-49d9-a35a-639dc7d4d856.png",
    salary_range: "$900-$1,300/tuần",
    pricingTier: "expired",
    is_vietnamese_listing: true
  },
  {
    id: "elegant-nails-2-expired-2",
    title: "Elegant Nails II – Tìm Thợ Bột",
    company: "Elegant Nails II",
    location: "Chicago, IL",
    created_at: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cần thợ bột có kinh nghiệm. Lương $1,000-$1,200/tuần. Môi trường làm việc tốt.",
    contact_info: {
      phone: "312-555-8877",
      email: "elegantnails2@gmail.com",
      owner_name: "Chị Nga"
    },
    image: "/lovable-uploads/fe0bd314-25aa-4296-bf38-80dddf69b992.png", 
    salary_range: "$1,000-$1,200/tuần",
    pricingTier: "expired",
    is_vietnamese_listing: true
  }
  // Add more expired listings as needed
];
