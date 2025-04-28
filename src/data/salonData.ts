import { Salon } from '@/types/salon';

export const vietnameseSalonListings: Salon[] = [
  {
    id: 'vn-1',
    name: 'Tiệm Nail Rowlett',
    vietnamese_title: 'Cần sang tiệm nail ở Rowlett',
    location: 'Rowlett, TX',
    price: 0, // Contact for price
    imageUrl: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80',
    description: 'Nail salon in Rowlett, 10 minutes from Garland. Stable year-round clientele.',
    vietnamese_description: 'Tiệm ở Rowlett cần sang lại, cách Garland 10", income 120-150K/tháng. Tiệm lâu năm, khách ổn định quanh năm. Income last year 1.7M.',
    features: ['Established Business', 'High Income', 'Prime Location'],
    monthly_revenue: '120000-150000',
    yearly_revenue: '1700000',
    is_vietnamese_listing: true,
    contact_info: {
      phone: '(469)-438-5980'
    }
  },
  {
    id: 'vn-2',
    name: 'Nail Salon - Carrollton',
    vietnamese_title: 'Bán tiệm nail ở Carrollton, Georgia',
    location: 'Carrollton, GA',
    price: 195000,
    imageUrl: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=80',
    description: 'Nail salon near Walmart',
    vietnamese_description: 'Tiệm trong khu Walmart, giá 195K.',
    features: ['Near Walmart', 'Prime Location'],
    is_vietnamese_listing: true,
    contact_info: {
      phone: '404-543-0144'
    }
  },
  {
    id: 'vn-3',
    name: 'Davi Nails',
    vietnamese_title: 'Cần bán tiệm Davi Nails - Bismarck, North Dakota',
    location: 'Bismarck, ND',
    price: 40000,
    imageUrl: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80',
    description: '5 chairs, 5 tables, wax room. Rent includes utilities.',
    vietnamese_description: '5 ghế, 5 bàn, phòng wax, bao rent (điện, nước, wifi...). Giá $40K.',
    features: ['5 Stations', 'Wax Room', 'Utilities Included'],
    is_vietnamese_listing: true,
    contact_info: {
      phone: '(714) 787-8858',
      owner_name: 'Thư'
    }
  }
];

export const salonListings: Salon[] = [
  {
    id: '1',
    name: 'Nail Salon - Rowlett, TX',
    location: 'Rowlett, TX',
    price: 0, // Price not listed
    imageUrl: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80',
    description: 'Established nail salon with steady clientele. Monthly income: $120K - $150K. Last year income: $1.7M. Stable customer base, long-standing business.',
    features: ['Established Clientele', 'High Income Potential', 'Prime Location'],
    monthly_revenue: '120000-150000',
    yearly_revenue: '1700000',
    contact_info: {
      phone: '(469)-438-5980'
    }
  },
  {
    id: '2',
    name: 'Nail Salon - Carrollton, GA',
    location: 'Carrollton, GA',
    price: 195000,
    imageUrl: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=80',
    description: 'Beautiful salon in prime location near Walmart, 1 hour from HK. Excellent location with established business.',
    features: ['Near Walmart', 'Prime Location', 'Well-Maintained'],
    contact_info: {
      phone: '404-543-0144'
    }
  },
  {
    id: '3',
    name: 'Davi Nails',
    location: 'Bismarck, ND',
    price: 40000,
    imageUrl: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80',
    description: '5 chairs, 5 tables, wax room. Rent includes utilities. Supplies included. Stable income in upscale area.',
    features: ['5 Stations', 'Wax Room', 'Utilities Included', 'Supplies Included'],
    contact_info: {
      phone: '(714) 787-8858'
    }
  },
  {
    id: '4',
    name: 'Large Nail Salon',
    location: 'Terrell, TX',
    price: 0, // Contact for price
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    description: 'Spacious 3,000 sqft salon with 24 chairs, 12 tables, lash & facial rooms. Ready for immediate operation with steady clientele.',
    features: ['3,000 sqft', '24 Chairs', '12 Tables', 'Lash Room', 'Facial Room'],
    square_feet: 3000,
    contact_info: {
      phone: '971-407-0664'
    }
  },
  {
    id: '5',
    name: 'Nail Salon - Cumming',
    location: 'Cumming, GA',
    price: 85000,
    imageUrl: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80',
    description: '1,200 sqft salon in upscale area. 8 chairs, 7 tables. High-tip area. Monthly rent: $3,300.',
    features: ['1,200 sqft', '8 Chairs', '7 Tables', 'Upscale Area'],
    square_feet: 1200,
    monthly_rent: 3300,
    contact_info: {
      phone: '404-455-5608'
    }
  },
  {
    id: '6',
    name: 'Lv Nail Spa',
    location: 'Fort Collins, CO',
    price: 95000,
    imageUrl: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=80',
    description: '7 tables, 7 chairs. Near schools with steady customer flow.',
    features: ['7 Stations', 'Near Schools', 'Established Clientele'],
    contact_info: {
      phone: '206-489-7081'
    }
  },
  {
    id: '7',
    name: 'Nail Salon - Cornelia',
    location: 'Cornelia, GA',
    price: 0, // Contact for price
    imageUrl: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80',
    description: 'New salon in major shopping center. 10 chairs, 8 tables. Monthly rent: $1,905. Ready for immediate operation.',
    features: ['10 Chairs', '8 Tables', 'Shopping Center Location', 'New Setup'],
    monthly_rent: 1905,
    contact_info: {
      phone: '832-441-0876'
    }
  },
  {
    id: '8',
    name: 'Nail Salon - Murrieta',
    location: 'Murrieta, CA',
    price: 220000,
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    description: '1,400 sqft salon with prime location. 9 tables, 9 chairs. Annual income: $750,000.',
    features: ['1,400 sqft', '9 Stations', 'Prime Location'],
    square_feet: 1400,
    yearly_revenue: '750000',
    contact_info: {
      phone: '657-346-4466'
    }
  },
  {
    id: '9',
    name: 'Nail Salon - Arlington',
    location: 'Arlington, TX',
    price: 60000,
    imageUrl: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80',
    description: 'Established 20-year business. 8 chairs, 7 tables. Monthly rent: $3,400. Steady clientele.',
    features: ['20 Years Established', '8 Chairs', '7 Tables'],
    monthly_rent: 3400,
    contact_info: {
      phone: '903-245-6488'
    }
  },
  {
    id: '10',
    name: 'Nail Salon - Marietta East Cobb',
    location: 'Marietta East Cobb, GA',
    price: 450000,
    imageUrl: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=80',
    description: 'Large 3,000 sqft salon. 24 chairs, 14 tables. Annual income over $1M. Monthly rent: $10,200.',
    features: ['3,000 sqft', '24 Chairs', '14 Tables', 'High Income'],
    square_feet: 3000,
    yearly_revenue: '1000000',
    monthly_rent: 10200,
    contact_info: {
      phone: '678-488-2583'
    }
  }
];

export const salonListings: Salon[] = [...vietnameseSalonListings, ...salonListings];
