
export const JOB_TEMPLATES = [
  {
    id: 'nail-tech',
    title: 'Nail Technician',
    type: 'fullTime',
    description: 'Looking for an experienced Nail Technician to join our busy salon. Must be skilled in manicures, pedicures, acrylics, and gel. Full-time position with competitive pay and tips.'
  },
  {
    id: 'hair-stylist',
    title: 'Hair Stylist',
    type: 'fullTime',
    description: 'Seeking a professional Hair Stylist with at least 2 years of experience. Skills in cutting, coloring, and styling required. Join our friendly team in a modern salon with loyal clientele.'
  },
  {
    id: 'spa-tech',
    title: 'Spa Technician',
    type: 'fullTime',
    description: 'Now hiring a Spa Technician with experience in facials, waxing, and body treatments. Must have excellent customer service skills and knowledge of skincare products.'
  },
  {
    id: 'receptionist',
    title: 'Salon Receptionist',
    type: 'partTime',
    description: 'Looking for a friendly, organized Receptionist to handle bookings, answer calls, and greet clients. Experience with salon software preferred. Part-time position available weekends.'
  },
  {
    id: 'manager',
    title: 'Salon Manager',
    type: 'fullTime',
    description: 'Experienced Salon Manager needed to oversee daily operations, staff management, and client relations. Must have previous salon management experience and excellent leadership skills.'
  },
  {
    id: 'massage',
    title: 'Massage Therapist',
    type: 'contract',
    description: 'Licensed Massage Therapist needed for upscale spa. Must be skilled in various massage techniques including deep tissue, hot stone, and relaxation. Flexible hours available.'
  },
  {
    id: 'lash',
    title: 'Lash Technician',
    type: 'fullTime',
    description: 'Certified Lash Technician wanted for busy beauty salon. Experience with classic and volume lash extensions required. Build your clientele with our marketing support.'
  },
  {
    id: 'tattoo',
    title: 'Tattoo Artist',
    type: 'fullTime',
    description: 'Professional Tattoo Artist wanted for established studio. Must have strong portfolio showing versatility in styles. Health certifications required. Commission-based position.'
  },
  {
    id: 'makeup',
    title: 'Makeup Artist',
    type: 'freelance',
    description: 'Freelance Makeup Artist needed for bridal and special events. Experience with diverse skin tones and photography makeup a plus. Weekend availability essential.'
  },
  {
    id: 'booth-rental',
    title: 'Booth Rental Available',
    type: 'other',
    description: 'Premium booth space available for rent in busy salon. Great location with high foot traffic. Perfect for established beauty professionals looking for a new space. All utilities included.'
  },
  {
    id: 'other',
    title: 'Other Beauty Professional',
    type: 'fullTime',
    description: 'Seeking a skilled beauty professional to join our team. Please specify your expertise and experience when applying.'
  }
];

export const JOB_TYPES = {
  fullTime: {
    en: 'Full Time',
    vi: 'Toàn thời gian'
  },
  partTime: {
    en: 'Part Time',
    vi: 'Bán thời gian'
  },
  contract: {
    en: 'Contract',
    vi: 'Theo hợp đồng'
  },
  freelance: {
    en: 'Freelance',
    vi: 'Làm tự do'
  },
  other: {
    en: 'Other',
    vi: 'Khác'
  }
};

// This structure will hold our AI-polished descriptions
// It's currently a placeholder that will be expanded later
export const POLISHED_DESCRIPTIONS = {
  professional: [
    {
      title: "Professional & Sharp",
      description: "We're seeking an exceptional professional to join our established team. Our ideal candidate demonstrates attention to detail and commitment to excellence. Qualified individuals will receive competitive compensation and opportunities for growth."
    },
    {
      title: "Business-Focused",
      description: "Our growing business seeks a qualified candidate who can maintain our high standards. This position offers stability, competitive compensation, and a professional work environment focused on excellence and client satisfaction."
    }
  ],
  friendly: [
    {
      title: "Friendly & Warm",
      description: "We're so excited to welcome a new talent to our friendly team! We're like a family here, and we can't wait to meet you. Our salon has a warm, supportive atmosphere where everyone helps each other succeed."
    },
    {
      title: "Community-Centered",
      description: "Join our welcoming salon family! We support each other through busy days and celebrate successes together. We're looking for a team player who enjoys connecting with clients and creating a positive atmosphere."
    }
  ],
  luxury: [
    {
      title: "Luxury & Premium",
      description: "Join our premium establishment catering to discerning clientele seeking excellence. We use only the finest products and maintain an elegant, upscale atmosphere that reflects our commitment to luxury experiences."
    },
    {
      title: "High-End Experience",
      description: "We provide luxury services to high-end clients and seek exceptional talent to join our team. Our salon features designer interiors, premium equipment, and an exclusive ambiance for the most discerning clients."
    }
  ]
};

// Vietnamese polished descriptions - placeholder structure
export const POLISHED_DESCRIPTIONS_VI = {
  professional: [
    {
      title: "Chuyên Nghiệp & Sắc Sảo",
      description: "Chúng tôi đang tìm kiếm một chuyên gia xuất sắc để gia nhập đội ngũ có tiếng của chúng tôi. Ứng viên lý tưởng cần thể hiện sự chú ý đến chi tiết và cam kết với sự xuất sắc. Người đủ điều kiện sẽ nhận được mức lương cạnh tranh và cơ hội phát triển."
    },
    {
      title: "Định Hướng Kinh Doanh",
      description: "Doanh nghiệp đang phát triển của chúng tôi tìm kiếm ứng viên có đủ năng lực để duy trì tiêu chuẩn cao của chúng tôi. Vị trí này mang lại sự ổn định, mức lương cạnh tranh và môi trường làm việc chuyên nghiệp tập trung vào sự xuất sắc và sự hài lòng của khách hàng."
    }
  ],
  friendly: [
    {
      title: "Thân Thiện & Ấm Áp",
      description: "Chúng tôi rất vui mừng được chào đón một tài năng mới vào đội ngũ thân thiện của chúng tôi! Chúng tôi như một gia đình ở đây và rất mong được gặp bạn. Salon của chúng tôi có bầu không khí ấm áp, hỗ trợ, nơi mọi người giúp đỡ nhau thành công."
    },
    {
      title: "Hướng Đến Cộng Đồng",
      description: "Hãy tham gia vào gia đình salon thân thiện của chúng tôi! Chúng tôi hỗ trợ nhau trong những ngày bận rộn và cùng nhau ăn mừng thành công. Chúng tôi đang tìm kiếm một người đồng đội, người thích kết nối với khách hàng và tạo ra bầu không khí tích cực."
    }
  ],
  luxury: [
    {
      title: "Sang Trọng & Cao Cấp",
      description: "Tham gia cơ sở cao cấp của chúng tôi phục vụ khách hàng sành điệu tìm kiếm sự xuất sắc. Chúng tôi chỉ sử dụng những sản phẩm tốt nhất và duy trì một không gian thanh lịch, cao cấp phản ánh cam kết của chúng tôi đối với trải nghiệm xa xỉ."
    },
    {
      title: "Trải Nghiệm Cao Cấp",
      description: "Chúng tôi cung cấp dịch vụ sang trọng cho khách hàng cao cấp và tìm kiếm tài năng đặc biệt để gia nhập đội ngũ của chúng tôi. Salon của chúng tôi có nội thất thiết kế, thiết bị cao cấp và không khí độc quyền cho những khách hàng khó tính nhất."
    }
  ]
};

