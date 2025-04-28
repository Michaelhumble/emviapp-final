
import { Salon } from '@/types/salon';

// Vietnamese salon listings data
export const vietnameseSalonListings: Salon[] = [
  {
    id: 'vn-nail-001',
    name: 'Tiệm Nail Hoa Mai',
    is_vietnamese_listing: true,
    vietnamese_title: 'Tiệm Nail Đang Bán - Khu Vực Đông Khách',
    vietnamese_description: 'Tiệm nail đang kinh doanh tốt, cần bán gấp vì lý do cá nhân. Tiệm có 6 ghế và 4 bàn, khu vực đông người Việt. Giá cả thương lượng.',
    description: 'Well-established nail salon for sale in a busy area with strong Vietnamese community. 6 chairs and 4 tables included.',
    price: 55000,
    location: 'Westminster, CA',
    imageUrl: '/lovable-uploads/ac31083b-3861-4851-99ac-ed1bc185c4d9.png',
    contact_info: {
      phone: '(714) 555-1234',
      email: 'hoamai@example.com'
    },
    square_feet: 1200,
  },
  {
    id: 'vn-nail-002',
    name: 'Happy Nails',
    is_vietnamese_listing: true,
    vietnamese_title: 'Bán Tiệm Nail - Lợi Nhuận Cao',
    vietnamese_description: 'Cần bán tiệm nail vì nghỉ hưu. Tiệm hoạt động ổn định 10 năm, khách hàng trung thành. Có 8 bàn nail, 6 ghế spa pedicure, 1 phòng wax.',
    description: 'Profitable nail salon for sale due to retirement. 10 years of stable operation with loyal customers.',
    price: 80000,
    location: 'Garden Grove, CA',
    imageUrl: '/lovable-uploads/b4f117ee-b209-43be-8e30-ecbf1d025c93.png',
    contact_info: {
      phone: '(714) 555-6789',
      email: 'happynails@example.com'
    },
    square_feet: 1500,
  },
  {
    id: 'vn-nail-003',
    name: 'Luxury Nails & Spa',
    is_vietnamese_listing: true,
    vietnamese_title: 'Sang Tiệm Nail & Spa Đang Đông Khách',
    vietnamese_description: 'Cần sang gấp tiệm nail vị trí đẹp trong trung tâm mua sắm. Tiệm rộng 1800sf, có 10 ghế làm chân, 8 bàn làm tay, 2 phòng wax/facial.',
    description: 'Urgent sale of nail salon in prime shopping center location. Spacious 1800sf with 10 pedicure chairs, 8 manicure tables, 2 wax/facial rooms.',
    price: 120000,
    location: 'Fountain Valley, CA',
    imageUrl: '/lovable-uploads/f7491bd3-25bf-43f9-80e2-d53b137a70d7.png',
    contact_info: {
      phone: '(714) 555-4321',
      email: 'luxuryspa@example.com'
    },
    square_feet: 1800,
    featured: true,
  }
];
