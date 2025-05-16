export const mockPremiumSalons = [
  {
    id: "1",
    title: "Luxury Nail Spa for Sale",
    description: "Established nail salon with loyal clientele in upscale shopping center. 8 manicure stations, 6 pedicure chairs, all equipment included. Owner retiring after 15 years.",
    vietnameseDescription: "Tiệm nail sang trọng đã hoạt động lâu năm với khách hàng thân thiết trong trung tâm mua sắm cao cấp. 8 bàn làm móng tay, 6 ghế làm móng chân, bao gồm tất cả thiết bị. Chủ nghỉ hưu sau 15 năm.",
    location: {
      city: "San Jose",
      state: "CA",
      zipCode: "95123"
    },
    contact: {
      name: "Linda Tran",
      phone: "(408) 555-1234",
      email: "linda@example.com"
    },
    price: 120000,
    monthlyRent: 3500,
    size: 1800,
    chairs: 14,
    established: 2008,
    reason: "Retirement",
    images: [
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702",
      "https://images.unsplash.com/photo-1600948836101-f9ffda59d250",
      "https://images.unsplash.com/photo-1604654894611-6973b7069ce9"
    ],
    features: ["Parking", "High Traffic", "Established Clientele", "All Equipment Included"],
    category: "nail",
    createdAt: "2023-09-15T14:30:00Z",
    expiresAt: "2023-12-15T14:30:00Z",
    status: "active",
    premium: true,
    views: 342,
    saves: 28
  },
  {
    id: "2",
    title: "Profitable Hair Salon - Prime Location",
    description: "Turnkey hair salon in downtown area with high foot traffic. 6 styling stations, 3 shampoo bowls, break room and office. Established for 7 years with strong repeat business.",
    vietnameseDescription: "Tiệm tóc có lợi nhuận cao ở vị trí đắc địa trong khu trung tâm với lưu lượng người qua lại cao. 6 trạm cắt tóc, 3 bồn gội đầu, phòng nghỉ và văn phòng. Đã hoạt động 7 năm với nhiều khách hàng thường xuyên.",
    location: {
      city: "Houston",
      state: "TX",
      zipCode: "77002"
    },
    contact: {
      name: "Michael Johnson",
      phone: "(713) 555-6789",
      email: "michael@example.com"
    },
    price: 95000,
    monthlyRent: 2800,
    size: 1500,
    chairs: 6,
    established: 2016,
    reason: "Relocating",
    images: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035",
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f",
      "https://images.unsplash.com/photo-1562322140-8baeececf3df"
    ],
    features: ["Prime Location", "Fully Equipped", "Loyal Clientele", "Modern Design"],
    category: "hair",
    createdAt: "2023-09-20T10:15:00Z",
    expiresAt: "2023-12-20T10:15:00Z",
    status: "active",
    premium: true,
    views: 289,
    saves: 19
  },
  {
    id: "3",
    title: "Established Nail Salon with Housing",
    description: "Successful nail salon with attached 2-bedroom apartment. Perfect owner-operator opportunity. 5 manicure tables, 4 pedicure chairs, waxing room. Consistent monthly income.",
    vietnameseDescription: "Tiệm nail thành công với căn hộ 2 phòng ngủ đính kèm. Cơ hội tuyệt vời cho chủ sở hữu kiêm vận hành. 5 bàn làm móng tay, 4 ghế làm móng chân, phòng wax. Thu nhập hàng tháng ổn định.",
    location: {
      city: "Orlando",
      state: "FL",
      zipCode: "32801"
    },
    contact: {
      name: "Kim Nguyen",
      phone: "(407) 555-3456",
      email: "kim@example.com"
    },
    price: 180000,
    monthlyRent: 3200,
    size: 2200,
    chairs: 9,
    established: 2014,
    reason: "Family Reasons",
    images: [
      "https://images.unsplash.com/photo-1610991149688-c1321006bcc1",
      "https://images.unsplash.com/photo-1632345031435-8727f6897d53",
      "https://images.unsplash.com/photo-1604654894611-6973b7069ce9"
    ],
    features: ["Housing Included", "Waxing Room", "Established 8+ Years", "Seller Financing Available"],
    category: "nail",
    createdAt: "2023-09-18T16:45:00Z",
    expiresAt: "2023-12-18T16:45:00Z",
    status: "active",
    premium: true,
    views: 412,
    saves: 37,
    hasHousing: true
  },
  {
    id: "4",
    title: "High-End Beauty Salon & Spa",
    description: "Luxurious full-service salon and spa in affluent neighborhood. Hair, nails, facials, massage. 10 stations total. High-end clientele, premium pricing. Excellent reputation.",
    vietnameseDescription: "Tiệm làm đẹp và spa cao cấp trong khu phố giàu có. Tóc, móng, chăm sóc da, massage. Tổng cộng 10 trạm. Khách hàng cao cấp, giá cao. Danh tiếng xuất sắc.",
    location: {
      city: "Scottsdale",
      state: "AZ",
      zipCode: "85251"
    },
    contact: {
      name: "Jennifer Smith",
      phone: "(480) 555-7890",
      email: "jennifer@example.com"
    },
    price: 275000,
    monthlyRent: 4800,
    size: 2800,
    chairs: 10,
    established: 2012,
    reason: "New Business Venture",
    images: [
      "https://images.unsplash.com/photo-1470259078422-826894b933aa",
      "https://images.unsplash.com/photo-1633681926022-84c23e8cb3d6",
      "https://images.unsplash.com/photo-1600948836101-f9ffda59d250"
    ],
    features: ["Upscale Location", "Full Service", "High Profit Margin", "Established Brand"],
    category: "beauty",
    createdAt: "2023-09-10T09:20:00Z",
    expiresAt: "2023-12-10T09:20:00Z",
    status: "active",
    premium: true,
    views: 378,
    saves: 42
  },
  {
    id: "5",
    title: "Turnkey Barbershop - Great Location",
    description: "Modern barbershop with loyal clientele. 5 stations fully equipped. Located near business district with high foot traffic. Established 5 years with strong social media presence.",
    vietnameseDescription: "Tiệm cắt tóc nam hiện đại với khách hàng trung thành. 5 trạm đầy đủ thiết bị. Nằm gần khu thương mại với lưu lượng người qua lại cao. Hoạt động 5 năm với sự hiện diện mạnh mẽ trên mạng xã hội.",
    location: {
      city: "Atlanta",
      state: "GA",
      zipCode: "30308"
    },
    contact: {
      name: "Marcus Williams",
      phone: "(404) 555-2345",
      email: "marcus@example.com"
    },
    price: 85000,
    monthlyRent: 2200,
    size: 1200,
    chairs: 5,
    established: 2018,
    reason: "Moving Out of State",
    images: [
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70",
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1",
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a"
    ],
    features: ["Modern Design", "Strong Social Media", "All Equipment Included", "Growing Revenue"],
    category: "barber",
    createdAt: "2023-09-22T11:30:00Z",
    expiresAt: "2023-12-22T11:30:00Z",
    status: "active",
    premium: true,
    views: 256,
    saves: 23
  },
  {
    id: "6",
    title: "Profitable Nail Salon - Shopping Center",
    description: "Well-established nail salon in busy shopping center. 6 manicure stations, 5 pedicure chairs. Strong cash flow, loyal clientele. All inventory and equipment included.",
    vietnameseDescription: "Tiệm nail có lợi nhuận cao trong trung tâm mua sắm sầm uất. 6 bàn làm móng tay, 5 ghế làm móng chân. Dòng tiền mạnh, khách hàng trung thành. Bao gồm tất cả hàng tồn kho và thiết bị.",
    location: {
      city: "Denver",
      state: "CO",
      zipCode: "80202"
    },
    contact: {
      name: "Tina Pham",
      phone: "(720) 555-8901",
      email: "tina@example.com"
    },
    price: 110000,
    monthlyRent: 3000,
    size: 1600,
    chairs: 11,
    established: 2015,
    reason: "Retirement",
    images: [
      "https://images.unsplash.com/photo-1604654894611-6973b7069ce9",
      "https://images.unsplash.com/photo-1632345031435-8727f6897d53",
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702"
    ],
    features: ["Shopping Center Location", "Stable Income", "Loyal Clientele", "Room for Expansion"],
    category: "nail",
    createdAt: "2023-09-14T13:45:00Z",
    expiresAt: "2023-12-14T13:45:00Z",
    status: "active",
    premium: true,
    views: 301,
    saves: 26
  },
  {
    id: "7",
    title: "Upscale Hair Salon in Mall Location",
    description: "Premium hair salon in high-traffic mall. 8 styling stations, color bar, retail area. Established clientele, experienced staff willing to stay. Seller will train.",
    vietnameseDescription: "Tiệm tóc cao cấp trong trung tâm thương mại sầm uất. 8 trạm cắt tóc, quầy nhuộm, khu vực bán lẻ. Khách hàng ổn định, nhân viên có kinh nghiệm sẵn sàng ở lại. Người bán sẽ đào tạo.",
    location: {
      city: "Seattle",
      state: "WA",
      zipCode: "98101"
    },
    contact: {
      name: "Sarah Johnson",
      phone: "(206) 555-4567",
      email: "sarah@example.com"
    },
    price: 150000,
    monthlyRent: 4000,
    size: 2000,
    chairs: 8,
    established: 2013,
    reason: "Other Business Interests",
    images: [
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f",
      "https://images.unsplash.com/photo-1562322140-8baeececf3df",
      "https://images.unsplash.com/photo-1600948836101-f9ffda59d250"
    ],
    features: ["Mall Location", "Staff Will Stay", "Seller Training", "Retail Revenue"],
    category: "hair",
    createdAt: "2023-09-12T15:20:00Z",
    expiresAt: "2023-12-12T15:20:00Z",
    status: "active",
    premium: true,
    views: 325,
    saves: 31
  },
  {
    id: "8",
    title: "Nail & Spa with Owner Housing",
    description: "Successful nail salon with 2-bedroom apartment above. 6 manicure stations, 5 pedicure chairs, waxing room. Great work-life balance opportunity. Strong local reputation.",
    vietnameseDescription: "Tiệm nail và spa thành công với căn hộ 2 phòng ngủ phía trên. 6 bàn làm móng tay, 5 ghế làm móng chân, phòng wax. Cơ hội cân bằng tốt giữa công việc và cuộc sống. Danh tiếng địa phương mạnh mẽ.",
    location: {
      city: "Portland",
      state: "OR",
      zipCode: "97205"
    },
    contact: {
      name: "Lily Tran",
      phone: "(503) 555-6789",
      email: "lily@example.com"
    },
    price: 195000,
    monthlyRent: 0,
    size: 2400,
    chairs: 11,
    established: 2011,
    reason: "Family Reasons",
    images: [
      "https://images.unsplash.com/photo-1632345031435-8727f6897d53",
      "https://images.unsplash.com/photo-1604654894611-6973b7069ce9",
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702"
    ],
    features: ["Owner Housing", "Property Included", "Waxing Services", "Established 10+ Years"],
    category: "nail",
    createdAt: "2023-09-08T12:10:00Z",
    expiresAt: "2023-12-08T12:10:00Z",
    status: "active",
    premium: true,
    views: 398,
    saves: 45,
    hasHousing: true
  },
  {
    id: "9",
    title: "Modern Barbershop - Excellent Reviews",
    description: "Contemporary barbershop with 4 stations. Known for premium cuts and grooming services. 5-star reviews online. Located in trendy neighborhood with young professionals.",
    vietnameseDescription: "Tiệm cắt tóc nam hiện đại với 4 trạm. Nổi tiếng với các kiểu cắt cao cấp và dịch vụ chăm sóc. Đánh giá 5 sao trực tuyến. Nằm trong khu phố thời thượng với nhiều chuyên gia trẻ.",
    location: {
      city: "Austin",
      state: "TX",
      zipCode: "78701"
    },
    contact: {
      name: "James Wilson",
      phone: "(512) 555-9012",
      email: "james@example.com"
    },
    price: 90000,
    monthlyRent: 2500,
    size: 1100,
    chairs: 4,
    established: 2019,
    reason: "New Venture",
    images: [
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1",
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70",
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a"
    ],
    features: ["Trendy Location", "5-Star Rated", "Growing Revenue", "Premium Brand"],
    category: "barber",
    createdAt: "2023-09-19T14:50:00Z",
    expiresAt: "2023-12-19T14:50:00Z",
    status: "active",
    premium: true,
    views: 267,
    saves: 24
  },
  {
    id: "10",
    title: "Full-Service Beauty Salon - Turnkey",
    description: "Established beauty salon offering hair, nails, skincare, and waxing. 12 stations total. Excellent location in upscale area. Fully staffed and operational. Walk in and take over.",
    vietnameseDescription: "Tiệm làm đẹp đã thành lập cung cấp dịch vụ tóc, móng, chăm sóc da và wax. Tổng cộng 12 trạm. Vị trí tuyệt vời trong khu vực cao cấp. Đầy đủ nhân viên và đang hoạt động. Bước vào và tiếp quản.",
    location: {
      city: "Miami",
      state: "FL",
      zipCode: "33131"
    },
    contact: {
      name: "Elena Rodriguez",
      phone: "(305) 555-1234",
      email: "elena@example.com"
    },
    price: 230000,
    monthlyRent: 4500,
    size: 2600,
    chairs: 12,
    established: 2010,
    reason: "Retirement",
    images: [
      "https://images.unsplash.com/photo-1470259078422-826894b933aa",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035",
      "https://images.unsplash.com/photo-1633681926022-84c23e8cb3d6"
    ],
    features: ["Full Service", "Staff Will Stay", "Prime Location", "High Revenue"],
    category: "beauty",
    createdAt: "2023-09-05T10:30:00Z",
    expiresAt: "2023-12-05T10:30:00Z",
    status: "active",
    premium: true,
    views: 456,
    saves: 52
  },
  {
    id: "11",
    title: "Nail Salon with Loyal Clientele",
    description: "Well-established nail salon with 5 manicure stations and 4 pedicure chairs. Located in busy strip mall with ample parking. Consistent monthly income and loyal customer base.",
    vietnameseDescription: "Tiệm nail đã hoạt động lâu năm với 5 bàn làm móng tay và 4 ghế làm móng chân. Nằm trong trung tâm mua sắm sầm uất với nhiều chỗ đậu xe. Thu nhập hàng tháng ổn định và cơ sở khách hàng trung thành.",
    location: {
      city: "Charlotte",
      state: "NC",
      zipCode: "28202"
    },
    contact: {
      name: "Nancy Tran",
      phone: "(704) 555-3456",
      email: "nancy@example.com"
    },
    price: 95000,
    monthlyRent: 2600,
    size: 1400,
    chairs: 9,
    established: 2016,
    reason: "Moving Out of State",
    images: [
      "https://images.unsplash.com/photo-1604654894611-6973b7069ce9",
      "https://images.unsplash.com/photo-1610991149688-c1321006bcc1",
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702"
    ],
    features: ["Strip Mall Location", "Ample Parking", "Stable Income", "Loyal Customers"],
    category: "nail",
    createdAt: "2023-09-17T11:15:00Z",
    expiresAt: "2023-12-17T11:15:00Z",
    status: "active",
    premium: true,
    views: 278,
    saves: 21
  },
  {
    id: "12",
    title: "Hair Salon in Downtown Location",
    description: "Stylish hair salon in the heart of downtown. 6 styling stations, 2 shampoo bowls. Modern decor, high-end products. Strong social media presence with over 10k followers.",
    vietnameseDescription: "Tiệm tóc phong cách ở trung tâm thành phố. 6 trạm cắt tóc, 2 bồn gội đầu. Trang trí hiện đại, sản phẩm cao cấp. Sự hiện diện mạnh mẽ trên mạng xã hội với hơn 10 nghìn người theo dõi.",
    location: {
      city: "Nashville",
      state: "TN",
      zipCode: "37203"
    },
    contact: {
      name: "Amanda Clark",
      phone: "(615) 555-7890",
      email: "amanda@example.com"
    },
    price: 120000,
    monthlyRent: 3200,
    size: 1700,
    chairs: 6,
    established: 2017,
    reason: "New Business Venture",
    images: [
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f",
      "https://images.unsplash.com/photo-1562322140-8baeececf3df",
      "https://images.unsplash.com/photo-1600948836101-f9ffda59d250"
    ],
    features: ["Downtown Location", "Strong Social Media", "Modern Design", "High-End Products"],
    category: "hair",
    createdAt: "2023-09-16T09:40:00Z",
    expiresAt: "2023-12-16T09:40:00Z",
    status: "active",
    premium: true,
    views: 312,
    saves: 29
  },
  {
    id: "13",
    title: "Nail & Spa with Waxing Room",
    description: "Profitable nail salon with dedicated waxing room. 6 manicure stations, 5 pedicure chairs. Located in affluent suburb with high-income clients. Owner will train.",
    vietnameseDescription: "Tiệm nail có lợi nhuận cao với phòng wax riêng. 6 bàn làm móng tay, 5 ghế làm móng chân. Nằm trong vùng ngoại ô giàu có với khách hàng thu nhập cao. Chủ sẽ đào tạo.",
    location: {
      city: "Bellevue",
      state: "WA",
      zipCode: "98004"
    },
    contact: {
      name: "Helen Nguyen",
      phone: "(425) 555-9012",
      email: "helen@example.com"
    },
    price: 140000,
    monthlyRent: 3800,
    size: 1900,
    chairs: 11,
    established: 2015,
    reason: "Family Reasons",
    images: [
      "https://images.unsplash.com/photo-1632345031435-8727f6897d53",
      "https://images.unsplash.com/photo-1610991149688-c1321006bcc1",
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702"
    ],
    features: ["Affluent Area", "Waxing Services", "Owner Training", "High-Income Clients"],
    category: "nail",
    createdAt: "2023-09-13T16:25:00Z",
    expiresAt: "2023-12-13T16:25:00Z",
    status: "active",
    premium: true,
    views: 329,
    saves: 33
  },
  {
    id: "14",
    title: "Barbershop with Strong Brand",
    description: "Popular barbershop with strong local brand. 5 stations, all equipment included. Located near university with steady client flow. Great opportunity for barber looking to own.",
    vietnameseDescription: "Tiệm cắt tóc nam phổ biến với thương hiệu địa phương mạnh mẽ. 5 trạm, bao gồm tất cả thiết bị. Nằm gần trường đại học với dòng khách hàng ổn định. Cơ hội tuyệt vời cho thợ cắt tóc muốn làm chủ.",
    location: {
      city: "Columbus",
      state: "OH",
      zipCode: "43201"
    },
    contact: {
      name: "Robert Thomas",
      phone: "(614) 555-2345",
      email: "robert@example.com"
    },
    price: 85000,
    monthlyRent: 2300,
    size: 1300,
    chairs: 5,
    established: 2018,
    reason: "Relocating",
    images: [
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70",
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1",
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a"
    ],
    features: ["Near University", "Established Brand", "All Equipment Included", "Steady Clientele"],
    category: "barber",
    createdAt: "2023-09-21T13:35:00Z",
    expiresAt: "2023-12-21T13:35:00Z",
    status: "active",
    premium: true,
    views: 245,
    saves: 18
  },
  {
    id: "15",
    title: "Full-Service Salon with Housing",
    description: "Established salon with 3-bedroom house included. Hair, nails, and skincare services. 8 stations total. Property ownership means no rent! Great investment opportunity.",
    vietnameseDescription: "Tiệm làm đẹp đã thành lập với nhà 3 phòng ngủ. Dịch vụ tóc, móng và chăm sóc da. Tổng cộng 8 trạm. Sở hữu bất động sản đồng nghĩa với việc không phải trả tiền thuê! Cơ hội đầu tư tuyệt vời.",
    location: {
      city: "Las Vegas",
      state: "NV",
      zipCode: "89109"
    },
    contact: {
      name: "David Chen",
      phone: "(702) 555-4567",
      email: "david@example.com"
    },
    price: 350000,
    monthlyRent: 0,
    size: 3200,
    chairs: 8,
    established: 2009,
    reason: "Retirement",
    images: [
      "https://images.unsplash.com/photo-1600948836101-f9ffda59d250",
      "https://images.unsplash.com/photo-1470259078422-826894b933aa",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035"
    ],
    features: ["Property Included", "Housing Included", "No Rent", "Multiple Services"],
    category: "beauty",
    createdAt: "2023-09-07T15:55:00Z",
    expiresAt: "2023-12-07T15:55:00Z",
    status: "active",
    premium: true,
    views: 487,
    saves: 59,
    hasHousing: true
  },
  {
    id: "16",
    title: "Nail Salon in Shopping Plaza",
    description: "Profitable nail salon in busy shopping plaza. 7 manicure stations, 6 pedicure chairs. Strong cash flow, all financials available to serious buyers. Seller financing possible.",
    vietnameseDescription: "Tiệm nail có lợi nhuận cao trong trung tâm mua sắm sầm uất. 7 bàn làm móng tay, 6 ghế làm móng chân. Dòng tiền mạnh, tất cả thông tin tài chính có sẵn cho người mua nghiêm túc. Có thể tài trợ từ người bán.",
    location: {
      city: "Phoenix",
      state: "AZ",
      zipCode: "85016"
    },
    contact: {
      name: "Lisa Tran",
      phone: "(602) 555-6789",
      email: "lisa@example.com"
    },
    price: 130000,
    monthlyRent: 3300,
    size: 1800,
    chairs: 13,
    established: 2014,
    reason: "Other Business Interests",
    images: [
      "https://images.unsplash.com/photo-1604654894611-6973b7069ce9",
      "https://images.unsplash.com/photo-1610991149688-c1321006bcc1",
      "https://images.unsplash.com/photo-1632345031435-8727f6897d53"
    ],
    features: ["Shopping Plaza", "Seller Financing", "Strong Cash Flow", "Financials Available"],
    category: "nail",
    createdAt: "2023-09-11T10:05:00Z",
    expiresAt: "2023-12-11T10:05:00Z",
    status: "active",
    premium: true,
    views: 356,
    saves: 32
  },
  {
    id: "17",
    title: "Hair Salon with Apartment Above",
    description: "Hair salon with 1-bedroom apartment upstairs. 5 styling stations, 2 shampoo bowls. Great work-life balance. Live where you work and save on commuting and housing costs.",
    vietnameseDescription: "Tiệm tóc với căn hộ 1 phòng ngủ ở tầng trên. 5 trạm cắt tóc, 2 bồn gội đầu. Cân bằng tốt giữa công việc và cuộc sống. Sống nơi bạn làm việc và tiết kiệm chi phí đi lại và nhà ở.",
    location: {
      city: "Philadelphia",
      state: "PA",
      zipCode: "19107"
    },
    contact: {
      name: "Maria Garcia",
      phone: "(215) 555-8901",
      email: "maria@example.com"
    },
    price: 175000,
    monthlyRent: 0,
    size: 2100,
    chairs: 5,
    established: 2013,
    reason: "Relocating",
    images: [
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f",
      "https://images.unsplash.com/photo-1562322140-8baeececf3df",
      "https://images.unsplash.com/photo-1600948836101-f9ffda59d250"
    ],
    features: ["Housing Included", "Property Included", "No Rent", "Work-Life Balance"],
    category: "hair",
    createdAt: "2023-09-09T14:15:00Z",
    expiresAt: "2023-12-09T14:15:00Z",
    status: "active",
    premium: true,
    views: 367,
    saves: 41,
    hasHousing: true
  },
  {
    id: "18",
    title: "Modern Nail Spa - New Equipment",
    description: "Contemporary nail spa with all new equipment purchased in 2022. 6 manicure stations, 6 pedicure chairs. Located in high-end retail center. Growing business with excellent reviews.",
    vietnameseDescription: "Tiệm nail hiện đại với tất cả thiết bị mới mua vào năm 2022. 6 bàn làm móng tay, 6 ghế làm móng chân. Nằm trong trung tâm bán lẻ cao cấp. Doanh nghiệp đang phát triển với đánh giá xuất sắc.",
    location: {
      city: "San Diego",
      state: "CA",
      zipCode: "92101"
    },
    contact: {
      name: "Jenny Pham",
      phone: "(619) 555-1234",
      email: "jenny@example.com"
    },
    price: 145000,
    monthlyRent: 3700,
    size: 1700,
    chairs: 12,
    established: 2020,
    reason: "Family Reasons",
    images: [
      "https://images.unsplash.com/photo-1610991149688-c1321006bcc1",
      "https://images.unsplash.com/photo-1604654894611-6973b7069ce9",
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702"
    ],
    features: ["New Equipment", "High-End Location", "Growing Business", "Excellent Reviews"],
    category: "nail",
    createdAt: "2023-09-15T09:25:00Z",
    expiresAt: "2023-12-15T09:25:00Z",
    status: "active",
    premium: true,
    views: 298,
    saves: 27
  },
  {
    id: "19",
    title: "Barbershop with Loyal Following",
    description: "Established barbershop with loyal clientele. 4 stations, vintage-inspired decor. Located in trendy neighborhood. Perfect for barber with existing clients looking to own.",
    vietnameseDescription: "Tiệm cắt tóc nam đã thành lập với khách hàng trung thành. 4 trạm, trang trí lấy cảm hứng từ phong cách cổ điển. Nằm trong khu phố thời thượng. Hoàn hảo cho thợ cắt tóc có sẵn khách hàng muốn làm chủ.",
    location: {
      city: "Brooklyn",
      state: "NY",
      zipCode: "11201"
    },
    contact: {
      name: "Anthony Miller",
      phone: "(718) 555-3456",
      email: "anthony@example.com"
    },
    price: 95000,
    monthlyRent: 2700,
    size: 1100,
    chairs: 4,
    established: 2017,
    reason: "New Venture",
    images: [
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1",
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70",
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a"
    ],
    features: ["Trendy Location", "Loyal Clientele", "Vintage Style", "Turnkey Operation"],
    category: "barber",
    createdAt: "2023-09-18T11:40:00Z",
    expiresAt: "2023-12-18T11:40:00Z",
    status: "active",
    premium: true,
    views: 276,
    saves: 25
  },
  {
    id: "20",
    title: "Full-Service Beauty Salon - Established",
    description: "Well-established beauty salon offering complete services. 10 stations total. Located in busy downtown area with high foot traffic. Excellent reputation and loyal clientele.",
    vietnameseDescription: "Tiệm làm đẹp đã hoạt động lâu năm cung cấp đầy đủ dịch vụ. Tổng cộng 10 trạm. Nằm ở khu vực trung tâm thành phố sầm uất với lưu lượng người qua lại cao. Danh tiếng xuất sắc và khách hàng trung thành.",
    location: {
      city: "Chicago",
      state: "IL",
      zipCode: "60611"
    },
    contact: {
      name: "Patricia Wong",
      phone: "(312) 555-7890",
      email: "patricia@example.com"
    },
    price: 210000,
    monthlyRent: 4200,
    size: 2400,
    chairs: 10,
    established: 2008,
    reason: "Retirement",
    images: [
      "https://images.unsplash.com/photo-1470259078422-826894b933aa",
      "https://images.unsplash.com/photo-1633681926022-84c23e8cb3d6",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035"
    ],
    features: ["Downtown Location", "Established 10+ Years", "Full Service", "Loyal Clientele"],
    category: "beauty",
    createdAt: "2023-09-06T12:50:00Z",
    expiresAt: "2023-12-06T12:50:00Z",
    status: "active",
    premium: true,
    views: 423,
    saves: 47
  },
  {
    id: "505",
    title: "Luxury Nail Spa with Housing",
    description: "High-end nail spa with attached 2-bedroom apartment. 8 manicure stations, 7 pedicure chairs, waxing room. Located in affluent area with high-income clients.",
    vietnameseDescription: "Tiệm nail cao cấp với căn hộ 2 phòng ngủ đính kèm. 8 bàn làm móng tay, 7 ghế làm móng chân, phòng wax. Nằm trong khu vực giàu có với khách hàng thu nhập cao.",
    location: {
      city: "Irvine",
      state: "CA",
      zipCode: "92618"
    },
    contact: {
      name: "Michelle Tran",
      phone: "(949) 555-9012",
      email: "michelle@example.com"
    },
    price: 280000,
    monthlyRent: 0,
    size: 2800,
    chairs: 15,
    established: 2012,
    reason: "Family Reasons",
    images: [
      "https://images.unsplash.com/photo-1632345031435-8727f6897d53",
      "https://images.unsplash.com/photo-1610991149688-c1321006bcc1",
      "https://images.unsplash.com/photo-1604654894611-6973b7069ce9"
    ],
    features: ["Housing Included", "Affluent Area", "Waxing Services", "High-Income Clients"],
    category: "nail",
    createdAt: "2023-09-04T15:30:00Z",
    expiresAt: "2023-12-04T15:30:00Z",
    status: "active",
    premium: true,
    views: 467,
    saves: 53,
    hasHousing: true
  }
];
