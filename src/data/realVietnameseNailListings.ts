import { IndustryListing } from '@/types/industryListing';

// 🔒 REAL VIETNAMESE NAIL LISTINGS - DO NOT MODIFY WITHOUT MICHAEL'S APPROVAL
// These are real job listings provided by Michael Nguyen for EmviApp
// Last updated: January 2025

export const realVietnameseNailListings: IndustryListing[] = [
  // Premium Listings
  {
    id: 'vietnamese-premium-1',
    title: 'Cần Thợ Nails Gấp Làm Việc Tại Houston, TX',
    location: 'Houston, TX 77051',
    salary: '$800–$1,000/tuần',
    tier: 'premium' as const,
    summary: 'Cần thợ nail biết làm bột, tay chân nước. Full/part time, không cạnh tranh, vui vẻ.',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//_A%20long,%20luxurious%20nail%20salon-10.png',
    phone: '(832) 489-6956',
    rating: 4.8,
    isFeatured: true,
    fullDescription: 'Cần thợ nail biết làm bột, tay chân nước. Full/part time, không cạnh tranh, vui vẻ.',
    contact: {
      name: 'Houston Nail Salon',
      phone: '(832) 489-6956',
      email: 'contact@houstonnails.com'
    }
  },
  {
    id: 'vietnamese-premium-2',
    title: 'Cần Gấp Thợ Nails In Placerville CA 95667',
    location: 'Placerville, CA 95667',
    salary: 'Bao lương theo tay nghề',
    tier: 'premium' as const,
    summary: 'Tiệm V Star Nails Spa đang cần thợ biết làm bột, dip, tay chân nước...',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//_A%20long,%20luxurious%20nail%20salon-12.png',
    phone: '(209) 715-9244',
    rating: 4.7,
    isFeatured: true,
    fullDescription: 'Tiệm V Star Nails Spa đang cần thợ biết làm bột, dip, tay chân nước. Shopping center, giá cao, tip hậu.',
    contact: {
      name: 'V Star Nails Spa',
      phone: '(209) 715-9244',
      email: 'vstarnails@email.com'
    }
  },
  {
    id: 'vietnamese-premium-3',
    title: 'TUYỂN THỢ NAIL (Houston, TX)',
    location: 'Houston, TX 77014',
    salary: '$900–$1,200/tuần',
    tier: 'premium' as const,
    summary: 'Tiệm cần tuyển thợ bột, bao lương từ $900–$1,200. Không trừ tiền supply...',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//_A%20long,%20luxurious%20nail%20salon-13.png',
    phone: '(832) 513-0833',
    rating: 4.9,
    isFeatured: true,
    fullDescription: 'Gần chợ Tháng Hưng, tip cao, không trừ supply.',
    contact: {
      name: 'Houston Nail Studio',
      phone: '(832) 513-0833',
      email: 'houstonnailtx@email.com'
    }
  },
  {
    id: 'vietnamese-premium-4',
    title: 'Cần Gấp Thợ Nails In Champaign, IL',
    location: 'Champaign, IL',
    salary: '$1,000–$1,400/tuần',
    tier: 'premium' as const,
    summary: 'Tiệm 3 tiệm lớn ở vùng Champaign and Mahomet...',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//_A%20long,%20luxurious%20nail%20salon-6.png',
    phone: '(817) 501-6750',
    rating: 4.6,
    isFeatured: true,
    fullDescription: '3 tiệm lớn, có chỗ ở, chia turn công bằng.',
    contact: {
      name: 'Champaign Nails',
      phone: '(817) 501-6750',
      email: 'champaignails@email.com'
    }
  },
  {
    id: 'vietnamese-premium-5',
    title: 'Tiệm đang cần thêm thợ ở Massachusetts',
    location: 'Massachusetts',
    salary: '$1,500–$2,200/tuần',
    tier: 'premium' as const,
    summary: 'Mùa hè income $1,500–$2,200+...',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated%20(003).png',
    phone: '(617) 540-2096',
    rating: 4.8,
    isFeatured: true,
    fullDescription: 'Biết về, shape chuẩn, có phòng riêng, không drama.',
    contact: {
      name: 'Massachusetts Nail Spa',
      phone: '(617) 540-2096',
      email: 'manails@email.com'
    }
  },

  // Featured Listings
  {
    id: 'vietnamese-featured-1',
    title: 'TIM THỢ NAILS – Clawson, MI',
    location: 'Clawson, MI',
    salary: '$1,200–$1,800/tuần',
    tier: 'featured' as const,
    summary: 'Tiệm nhỏ xinh, dễ làm, khách Mỹ trắng, tip hậu...',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated%20(01).png',
    phone: '(248) 403-6472',
    rating: 4.7,
    isFeatured: true,
    fullDescription: 'Khu Downtown, khách Mỹ trắng, tip hậu.',
    contact: {
      name: 'Clawson Nails',
      phone: '(248) 403-6472, (248) 525-9911',
      email: 'clawsonnails@email.com'
    }
  },
  {
    id: 'vietnamese-featured-2',
    title: 'TIM THỢ NAILS – Humble, TX – Milano Nail Spa',
    location: 'Humble, TX',
    salary: '>$2,000/tuần',
    tier: 'featured' as const,
    summary: 'Tiệm nail lớn nhất khu Humble...',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated02.png',
    phone: '(346) 398-6868',
    rating: 4.9,
    isFeatured: true,
    fullDescription: 'Tiệm lớn nhất, chuyên design, 60 người.',
    contact: {
      name: 'Milano Nail Spa',
      phone: '(346) 398-6868',
      email: 'milanonailtx@email.com'
    }
  },
  {
    id: 'vietnamese-featured-3',
    title: 'TIM THỢ NAILS – South Lake Tahoe, CA',
    location: 'South Lake Tahoe, CA',
    salary: '$1,600–$2,500+/tuần',
    tier: 'featured' as const,
    summary: 'Tiệm thợ trẻ, giá nail cao, tip $3,000+/tháng...',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated%20(04).png',
    phone: '916-802-1922',
    rating: 4.8,
    isFeatured: true,
    fullDescription: 'Khách du lịch, giá cao, tip $3,000+/tháng.',
    contact: {
      name: 'Lake Tahoe Nails',
      phone: '916-802-1922',
      email: 'tahoenails@email.com'
    }
  },
  {
    id: 'vietnamese-featured-4',
    title: 'TIM THỢ NAILS – Killeen, TX',
    location: 'Killeen, TX',
    salary: 'Ít nhất $1,500/tuần',
    tier: 'featured' as const,
    summary: 'Tiệm lớn, khách đông, tip nhiều...',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated%20(1)0.png',
    phone: '512-540-6173',
    rating: 4.6,
    isFeatured: true,
    fullDescription: 'Tiệm lớn, giá cao, tip nhiều.',
    contact: {
      name: 'Killeen Nails',
      phone: '512-540-6173, 806-777-0526',
      email: 'killeennails@email.com'
    }
  },
  {
    id: 'vietnamese-featured-5',
    title: 'CẦN THỢ NAIL Ở COLUMBUS, GA – Luxury Nails and Spa',
    location: 'Columbus, GA',
    salary: '$1,500–$2,200/tuần',
    tier: 'featured' as const,
    summary: 'Thu nhập mùa này từ $1,500–$2,200/tuần, có chỗ ở cho thợ...',
    imageUrl: 'https://wwhqbjrhbajpabfdwnip.supabase.co/storage/v1/object/public/nails//generated-26.png',
    phone: '(206) 355-5249',
    rating: 4.7,
    isFeatured: true,
    fullDescription: 'Có chỗ ở, chuyên design, khách lịch sự.',
    contact: {
      name: 'Luxury Nails and Spa',
      phone: '(206) 355-5249, (706) 221-3953',
      email: 'luxurynailsga@email.com'
    }
  }
];

export default realVietnameseNailListings;