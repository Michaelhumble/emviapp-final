import { Salon } from '@/types/salon';

// Regular salon listings
export const salonListings: Salon[] = [
  {
    id: '1',
    name: 'Luxury Spa & Salon',
    location: 'Beverly Hills, CA',
    price: 75000,
    imageUrl: 'https://images.unsplash.com/photo-1616226895723-81f46109e481?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'Upscale salon and spa in the heart of Beverly Hills. High-end clientele and experienced staff.',
    features: ['Massage rooms', 'Facial services', 'Hair styling', 'Nail services'],
    square_feet: 2500,
    monthly_rent: 8000,
  },
  {
    id: '2',
    name: 'Modern Hair Studio',
    location: 'West Hollywood, CA',
    price: 50000,
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'Chic hair studio with a modern aesthetic. Specializes in cutting-edge hair styling and coloring techniques.',
    features: ['Hair styling', 'Coloring', 'Extensions', 'Bridal services'],
    square_feet: 1800,
    monthly_rent: 6000,
  },
  {
    id: '3',
    name: 'Tranquil Day Spa',
    location: 'Santa Monica, CA',
    price: 60000,
    imageUrl: 'https://images.unsplash.com/photo-1506905951942-1c84bec5919d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    description: 'Relaxing day spa offering a variety of massage and skincare treatments. Serene atmosphere and loyal clientele.',
    features: ['Massage therapy', 'Facials', 'Body wraps', 'Waxing'],
    square_feet: 2000,
    monthly_rent: 7000,
  },
  {
    id: '4',
    name: 'Nail Salon & Spa',
    location: 'Los Angeles, CA',
    price: 40000,
    imageUrl: 'https://images.unsplash.com/photo-1543791188-c85f89f139cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'Full-service nail salon and spa with a focus on providing high-quality manicures and pedicures.',
    features: ['Manicures', 'Pedicures', 'Acrylics', 'Waxing'],
    square_feet: 1500,
    monthly_rent: 5000,
  },
  {
    id: '5',
    name: 'Barber Shop & Shave',
    location: 'Downtown LA',
    price: 35000,
    imageUrl: 'https://images.unsplash.com/photo-1517433484932-9f060ca9192e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'Traditional barber shop offering classic haircuts and straight razor shaves. Experienced barbers and a loyal customer base.',
    features: ['Haircuts', 'Shaves', 'Beard trims', 'Hot towel service'],
    square_feet: 1200,
    monthly_rent: 4000,
  },
  {
    id: '6',
    name: 'Eyelash Extension Studio',
    location: 'Hollywood, CA',
    price: 45000,
    imageUrl: 'https://images.unsplash.com/photo-1607954473544-399c89db297f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'Specialized studio offering a variety of eyelash extension services. Skilled technicians and a glamorous atmosphere.',
    features: ['Classic lashes', 'Volume lashes', 'Hybrid lashes', 'Lash lifts'],
    square_feet: 1000,
    monthly_rent: 3500,
  },
  {
    id: '7',
    name: 'Brow Bar & Waxing Studio',
    location: 'Beverly Grove, CA',
    price: 30000,
    imageUrl: 'https://images.unsplash.com/photo-1588974269162-4c0d5ccc6094?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'Boutique studio specializing in brow shaping and waxing services. Experienced estheticians and a focus on customer satisfaction.',
    features: ['Brow shaping', 'Waxing', 'Tinting', 'Threading'],
    square_feet: 800,
    monthly_rent: 3000,
  },
  {
    id: '8',
    name: 'Massage Therapy Center',
    location: 'Brentwood, CA',
    price: 55000,
    imageUrl: 'https://images.unsplash.com/photo-1544731612-de7f559b0744?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'Therapeutic massage center offering a variety of massage modalities. Licensed massage therapists and a calming environment.',
    features: ['Swedish massage', 'Deep tissue massage', 'Sports massage', 'Prenatal massage'],
    square_feet: 1600,
    monthly_rent: 5500,
  },
  {
    id: '9',
    name: 'Facial & Skincare Clinic',
    location: 'Century City, CA',
    price: 65000,
    imageUrl: 'https://images.unsplash.com/photo-1596493862544-cde88b5e6d43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'Advanced skincare clinic offering a range of facial treatments and skincare products. Experienced estheticians and a focus on results.',
    features: ['Facials', 'Chemical peels', 'Microdermabrasion', 'Acne treatments'],
    square_feet: 1400,
    monthly_rent: 4500,
  },
  {
    id: '10',
    name: 'Tattoo & Piercing Studio',
    location: 'Venice, CA',
    price: 40000,
    imageUrl: 'https://images.unsplash.com/photo-1622543458731-a96a49195b14?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    description: 'Popular tattoo and piercing studio with a talented team of artists. Clean and sterile environment with a focus on safety.',
    features: ['Tattoos', 'Piercings', 'Custom designs', 'Aftercare products'],
    square_feet: 1100,
    monthly_rent: 3800,
  }
];

// Vietnamese salon listings
export const vietnameseSalonListings: Salon[] = [
  {
    id: 'vn-001',
    name: 'Tiệm Nail Đang Hoạt Động Cần Bán Gấp',
    location: 'Westminster, California',
    price: 45000,
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Tiệm rộng 1,200sf, 6 ghế nail, 6 bàn, 2 phòng wax. Thu nhập ổn định, tiền rent rẻ. Cần bán gấp vì lý do sức khỏe. Giá thương lượng cho người mua thiện chí.',
    features: ['6 ghế nail', '6 bàn', '2 phòng wax', 'Khu Mỹ trắng'],
    square_feet: 1200,
    monthly_rent: 2000,
    is_vietnamese_listing: true,
    vietnamese_title: 'Tiệm Nail Đang Hoạt Động Cần Bán Gấp',
    vietnamese_description: 'Tiệm rộng 1,200sf, 6 ghế nail, 6 bàn, 2 phòng wax. Thu nhập ổn định, tiền rent rẻ. Cần bán gấp vì lý do sức khỏe. Giá thương lượng cho người mua thiện chí.',
    contact_info: {
      phone: '714-555-1234',
      owner_name: 'Chủ Tiệm'
    }
  },
  {
    id: 'vn-002',
    name: 'Cần Sang Tiệm Nails - Khu Mỹ Trắng',
    location: 'Huntington Beach, California',
    price: 85000,
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Cần sang tiệm trong khu Mỹ trắng, income cao, 8 ghế 6 bàn, tiệm rộng 1500sqft, giá thuê rẻ. Tiệm hoạt động trên 10 năm, khách walk-in nhiều.',
    features: ['8 ghế nail', '6 bàn', 'Khu Mỹ trắng', 'Income cao', 'Khách walk-in'],
    square_feet: 1500,
    monthly_rent: 3200,
    is_vietnamese_listing: true,
    vietnamese_title: 'Cần Sang Tiệm Nails - Khu Mỹ Trắng',
    vietnamese_description: 'Cần sang tiệm trong khu Mỹ trắng, income cao, 8 ghế 6 bàn, tiệm rộng 1500sqft, giá thuê rẻ. Tiệm hoạt động trên 10 năm, khách walk-in nhiều.',
    contact_info: {
      phone: '714-555-2345',
      owner_name: 'Anh Tuấn'
    }
  },
  {
    id: 'vn-003',
    name: 'Sang Tiệm Nail - Vị Trí Đẹp',
    location: 'Garden Grove, California',
    price: 65000,
    imageUrl: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Sang tiệm nail vị trí đẹp, nằm trong khu shopping center sầm uất. Tiệm có 10 ghế nail, 8 bàn, 2 phòng wax/facial. Tiền rent hợp lý.',
    features: ['10 ghế nail', '8 bàn', '2 phòng wax/facial', 'Khu shopping center'],
    square_feet: 1800,
    monthly_rent: 3500,
    is_vietnamese_listing: true,
    vietnamese_title: 'Sang Tiệm Nail - Vị Trí Đẹp',
    vietnamese_description: 'Sang tiệm nail vị trí đẹp, nằm trong khu shopping center sầm uất. Tiệm có 10 ghế nail, 8 bàn, 2 phòng wax/facial. Tiền rent hợp lý.',
    contact_info: {
      phone: '714-555-3456',
      owner_name: 'Chị Hương'
    }
  },
  {
    id: 'vn-004',
    name: 'Cần Sang Gấp Tiệm Nails',
    location: 'Santa Ana, California',
    price: 35000,
    imageUrl: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Cần sang gấp tiệm nails vì về Việt Nam. Tiệm 4 ghế, 4 bàn, 1 phòng wax. Income ổn định, đông khách. Giá thương lượng cho người thiện chí.',
    features: ['4 ghế nail', '4 bàn', '1 phòng wax'],
    square_feet: 900,
    monthly_rent: 1800,
    is_vietnamese_listing: true,
    vietnamese_title: 'Cần Sang Gấp Tiệm Nails',
    vietnamese_description: 'Cần sang gấp tiệm nails vì về Việt Nam. Tiệm 4 ghế, 4 bàn, 1 phòng wax. Income ổn định, đông khách. Giá thương lượng cho người thiện chí.',
    contact_info: {
      phone: '714-555-4567',
      owner_name: 'Anh Hoàng'
    }
  },
  {
    id: 'vn-005',
    name: 'Sang Tiệm Nails Khu Mỹ',
    location: 'Irvine, California',
    price: 120000,
    imageUrl: 'https://images.unsplash.com/photo-1588974269162-4c0d5ccc6094?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Sang tiệm khu Mỹ cao cấp, khách sang, tip cao. Tiệm 10 ghế, 12 bàn, 3 phòng wax/facial/massage. Income $45K-$55K/tháng, giá thuê $5K. Cơ hội đầu tư tốt.',
    features: ['10 ghế nail', '12 bàn', '3 phòng wax/facial', 'Khu Mỹ cao cấp', 'Income $45K-55K/tháng'],
    square_feet: 2200,
    monthly_rent: 5000,
    is_vietnamese_listing: true,
    vietnamese_title: 'Sang Tiệm Nails Khu Mỹ',
    vietnamese_description: 'Sang tiệm khu Mỹ cao cấp, khách sang, tip cao. Tiệm 10 ghế, 12 bàn, 3 phòng wax/facial/massage. Income $45K-$55K/tháng, giá thuê $5K. Cơ hội đầu tư tốt.',
    contact_info: {
      phone: '949-555-5678',
      owner_name: 'Chị Lan'
    }
  },
  {
    id: 'vn-006',
    name: 'Bán Tiệm Nails Thương Hiệu Đã Có Sẵn',
    location: 'Fountain Valley, California',
    price: 95000,
    imageUrl: 'https://images.unsplash.com/photo-1610991149688-c1321006bcc1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Bán tiệm nails thương hiệu đã có sẵn, hoạt động 5 năm. Tiệm 8 ghế, 8 bàn, 2 phòng wax. Tiệm rất đẹp, máy móc và trang thiết bị hiện đại.',
    features: ['8 ghế nail', '8 bàn', '2 phòng wax', 'Thương hiệu 5 năm', 'Trang thiết bị hiện đại'],
    square_feet: 1600,
    monthly_rent: 3800,
    is_vietnamese_listing: true,
    vietnamese_title: 'Bán Tiệm Nails Thương Hiệu Đã Có Sẵn',
    vietnamese_description: 'Bán tiệm nails thương hiệu đã có sẵn, hoạt động 5 năm. Tiệm 8 ghế, 8 bàn, 2 phòng wax. Tiệm rất đẹp, máy móc và trang thiết bị hiện đại.',
    contact_info: {
      phone: '714-555-6789',
      owner_name: 'Anh Phong'
    }
  },
  {
    id: 'vn-007',
    name: 'Sang Tiệm Nail Gấp - Giá Rẻ',
    location: 'Anaheim, California',
    price: 25000,
    imageUrl: 'https://images.unsplash.com/photo-1610386715822-936b2f79d72f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Cần sang gấp tiệm nail giá rẻ. Tiệm 5 ghế, 5 bàn, tiền rent chỉ $1,200/tháng. Sang trọn gói nội thất, máy móc.',
    features: ['5 ghế nail', '5 bàn', 'Rent rẻ $1,200/tháng'],
    square_feet: 1000,
    monthly_rent: 1200,
    is_vietnamese_listing: true,
    vietnamese_title: 'Sang Tiệm Nail Gấp - Giá Rẻ',
    vietnamese_description: 'Cần sang gấp tiệm nail giá rẻ. Tiệm 5 ghế, 5 bàn, tiền rent chỉ $1,200/tháng. Sang trọn gói nội thất, máy móc.',
    contact_info: {
      phone: '714-555-7890',
      owner_name: 'Chị Ngọc'
    }
  },
  {
    id: 'vn-008',
    name: 'Sang Tiệm Nails Khu Mỹ Đen',
    location: 'Long Beach, California',
    price: 40000,
    imageUrl: 'https://images.unsplash.com/photo-1604902396830-aca29e19b067?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Sang tiệm nails trong khu Mỹ đen. Tiệm 6 ghế, 6 bàn. Tiệm có lợi nhuận tốt, giá thuê thấp. Không gian rộng rãi, có chỗ để mở rộng thêm.',
    features: ['6 ghế nail', '6 bàn', 'Khu Mỹ đen'],
    square_feet: 1200,
    monthly_rent: 1600,
    is_vietnamese_listing: true,
    vietnamese_title: 'Sang Tiệm Nails Khu Mỹ Đen',
    vietnamese_description: 'Sang tiệm nails trong khu Mỹ đen. Tiệm 6 ghế, 6 bàn. Tiệm có lợi nhuận tốt, giá thuê thấp. Không gian rộng rãi, có chỗ để mở rộng thêm.',
    contact_info: {
      phone: '562-555-8901',
      owner_name: 'Anh Lộc'
    }
  },
  {
    id: 'vn-009',
    name: 'Cần Sang Tiệm Gấp Vì Lý Do Gia Đình',
    location: 'Orange, California',
    price: 55000,
    imageUrl: 'https://images.unsplash.com/photo-1599559827712-3e9c12a998bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Vì lý do gia đình nên cần sang gấp tiệm nail. Tiệm đẹp, rộng 1,400sf, có 6 ghế, 6 bàn, 2 phòng spa. Địa điểm đẹp, khu shopping center.',
    features: ['6 ghế nail', '6 bàn', '2 phòng spa', 'Khu shopping center'],
    square_feet: 1400,
    monthly_rent: 2800,
    is_vietnamese_listing: true,
    vietnamese_title: 'Cần Sang Tiệm Gấp Vì Lý Do Gia Đình',
    vietnamese_description: 'Vì lý do gia đình nên cần sang gấp tiệm nail. Tiệm đẹp, rộng 1,400sf, có 6 ghế, 6 bàn, 2 phòng spa. Địa điểm đẹp, khu shopping center.',
    contact_info: {
      phone: '714-555-9012',
      owner_name: 'Chị Thanh'
    }
  },
  {
    id: 'vn-010',
    name: 'Sang Tiệm Nail Giá Thương Lượng',
    location: 'Costa Mesa, California',
    price: 0,
    imageUrl: 'https://images.unsplash.com/photo-1588965208323-d78aafc31a1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Sang tiệm nail vì nghỉ hưu, giá thương lượng. Tiệm 5 ghế, 5 bàn, 1 phòng wax. Vị trí đẹp trong khu dân cư đông đúc. Khách quen ổn định.',
    features: ['5 ghế nail', '5 bàn', '1 phòng wax', 'Khách quen'],
    square_feet: 1100,
    monthly_rent: 2500,
    is_vietnamese_listing: true,
    vietnamese_title: 'Sang Tiệm Nail Giá Thương Lượng',
    vietnamese_description: 'Sang tiệm nail vì nghỉ hưu, giá thương lượng. Tiệm 5 ghế, 5 bàn, 1 phòng wax. Vị trí đẹp trong khu dân cư đông đúc. Khách quen ổn định.',
    contact_info: {
      phone: '714-555-0123',
      owner_name: 'Bác Tâm'
    }
  }
];
