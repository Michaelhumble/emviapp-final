
// 🚨 DO NOT REMOVE, HIDE, OR EDIT THESE MOCKUP LISTINGS.
// These demo/sample listings must remain visible in production until at least June 26, 2026.
// Only the project owner (Michael) can approve any removal or update of these mockups.

export interface Salon {
  id: number;
  name: string;
  location: string;
  price: number;
  monthlyRent: number;
  staff: number;
  revenue: number;
  description: {
    vi: string;
    en: string;
  };
  willTrain: boolean;
  images: string[];
  featured: boolean;
  image?: string; // Add this field to match our usage
}

export const salons: Salon[] = [
  {
    id: 1,
    name: "Paris Nails & Spa",
    location: "Houston, TX",
    price: 180000,
    monthlyRent: 3500,
    staff: 8,
    revenue: 25000,
    description: {
      vi: "Tiệm đẹp, khu tốt, khách sang. Đã hoạt động 5 năm, có khách quen ổn định. Chủ cần về Việt Nam nên muốn bán gấp.",
      en: "Beautiful salon in a great area with upscale clientele. Established for 5 years with a stable customer base. Owner needs to return to Vietnam, looking for quick sale."
    },
    willTrain: true,
    images: ["salon1.jpg", "salon2.jpg"],
    featured: true
  },
  {
    id: 2,
    name: "Diamond Nails",
    location: "Atlanta, GA",
    price: 120000,
    monthlyRent: 2800,
    staff: 6,
    revenue: 18000,
    description: {
      vi: "Tiệm rộng rãi, khu tốt, vị trí đẹp. Đã hoạt động 3 năm. Chủ muốn đổi ngành nên bán.",
      en: "Spacious salon in a good area, great location. Operating for 3 years. Owner looking to change industries."
    },
    willTrain: true,
    images: ["salon3.jpg", "salon4.jpg"],
    featured: false
  },
  {
    id: 3,
    name: "Luxury Nails & Spa",
    location: "Miami, FL",
    price: 250000,
    monthlyRent: 4200,
    staff: 12,
    revenue: 35000,
    description: {
      vi: "Tiệm cao cấp trong khu thượng lưu Miami. Được trang bị đầy đủ thiết bị hiện đại. Doanh thu cao và ổn định.",
      en: "Upscale salon in Miami's affluent area. Fully equipped with modern equipment. High and stable revenue."
    },
    willTrain: false,
    images: ["salon5.jpg", "salon6.jpg"],
    featured: true
  },
  {
    id: 4,
    name: "Golden Nails",
    location: "Los Angeles, CA",
    price: 200000,
    monthlyRent: 5000,
    staff: 10,
    revenue: 30000,
    description: {
      vi: "Tiệm trong trung tâm mua sắm sầm uất. Khách hàng ổn định, doanh thu cao. Chủ về hưu nên muốn bán.",
      en: "Salon in a busy shopping center. Stable clientele, high revenue. Owner retiring and looking to sell."
    },
    willTrain: true,
    images: ["salon7.jpg", "salon8.jpg"],
    featured: false
  },
  {
    id: 5,
    name: "Royal Nails",
    location: "Dallas, TX",
    price: 150000,
    monthlyRent: 3000,
    staff: 7,
    revenue: 22000,
    description: {
      vi: "Tiệm đẹp, khu dân cư cao cấp. Hoạt động 4 năm, có lượng khách hàng ổn định.",
      en: "Beautiful salon in an upscale residential area. Operating for 4 years with a stable customer base."
    },
    willTrain: true,
    images: ["salon9.jpg", "salon10.jpg"],
    featured: true
  },
  {
    id: 6,
    name: "Queen Nails",
    location: "Chicago, IL",
    price: 170000,
    monthlyRent: 3800,
    staff: 9,
    revenue: 27000,
    description: {
      vi: "Tiệm rộng rãi tại khu trung tâm Chicago. Thiết kế hiện đại, trang thiết bị mới.",
      en: "Spacious salon in downtown Chicago. Modern design with new equipment."
    },
    willTrain: false,
    images: ["salon11.jpg", "salon12.jpg"],
    featured: false
  }
];
