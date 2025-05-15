import { JobFormValues } from "./jobFormSchema";

export const JOB_TYPES = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'temporary', label: 'Temporary' },
  { value: 'internship', label: 'Internship' },
  { value: 'volunteer', label: 'Volunteer' },
  { value: 'other', label: 'Other' },
];

export const JOB_TEMPLATES = [
  {
    id: "nail_technician",
    title: "Nail Technician",
    type: "full-time",
    description: "We are looking for a skilled and creative nail technician to join our team. Must have experience with manicures, pedicures, and nail art."
  },
  {
    id: "hair_stylist",
    title: "Hair Stylist",
    type: "full-time",
    description: "We are seeking a talented hair stylist to provide excellent hair care services, including cutting, coloring, and styling."
  },
  {
    id: "esthetician",
    title: "Esthetician",
    type: "full-time",
    description: "We need a licensed esthetician to provide skincare treatments such as facials, waxing, and microdermabrasion."
  },
  {
    id: "massage_therapist",
    title: "Massage Therapist",
    type: "full-time",
    description: "We are hiring a certified massage therapist to offer therapeutic massage services to our clients."
  },
  {
    id: "salon_manager",
    title: "Salon Manager",
    type: "full-time",
    description: "We are looking for an experienced salon manager to oversee daily operations, manage staff, and ensure customer satisfaction."
  }
];

export const JOB_TITLES = [
  "Nail Technician",
  "Hair Stylist",
  "Esthetician",
  "Massage Therapist",
  "Salon Manager",
  "Cosmetologist",
  "Barber",
  "Makeup Artist",
  "Waxing Specialist",
  "Eyelash Technician",
  "Receptionist",
  "Assistant Salon Manager",
  "Salon Owner",
  "Booth Renter",
  "Freelance Stylist"
];

export const JOB_FORM_DEFAULT: Partial<JobFormValues> = {
  title: '',
  description: '',
  location: '',
  type: '',
  compensation: '',
  contactEmail: '',
  contactPhone: '',
  isUrgent: false,
  template: '',
  perks: [],
  summary: '',
  shortSummary: '',
  payWeekly: false,
  provideLunch: false,
  qualityProducts: false,
  reviewBonuses: false,
  flexibleHours: false,
  growthOpportunities: false
};

export const POLISH_TEMPLATES_EN = {
  nail_technician: [
    {
      title: "Professional",
      description: `We are looking for a skilled nail technician with experience in providing high-quality manicures, pedicures, and nail enhancements. Our salon offers a professional and friendly work environment with competitive pay and benefits.`
    },
    {
      title: "Detailed",
      description: `We are seeking a detail-oriented nail technician to join our team. The ideal candidate should have a strong understanding of nail care techniques and be able to provide excellent customer service. We offer ongoing training and opportunities for advancement.`
    },
    {
      title: "Friendly",
      description: `Join our friendly team of nail technicians! We are looking for someone who is passionate about nail care and enjoys working in a fast-paced environment. We offer flexible hours and a supportive work environment.`
    },
    {
      title: "Luxury",
      description: `Our luxury salon is seeking a talented nail technician to provide exceptional nail care services to our discerning clientele. The ideal candidate should have experience with high-end products and techniques and be able to provide a luxurious experience for our clients.`
    },
    {
      title: "Basic",
      description: `We are looking for a nail technician to provide basic nail care services such as manicures and pedicures. The ideal candidate should be reliable, detail-oriented, and able to work in a fast-paced environment.`
    }
  ],
  hair_stylist: [
    {
      title: "Creative",
      description: `We are looking for a creative hair stylist with a passion for creating unique and stylish looks for our clients. The ideal candidate should have experience with a variety of hair types and be able to provide excellent customer service.`
    },
    {
      title: "Experienced",
      description: `We are seeking an experienced hair stylist to join our team. The ideal candidate should have a strong understanding of hair care techniques and be able to provide excellent customer service. We offer ongoing training and opportunities for advancement.`
    },
    {
      title: "Passionate",
      description: `Join our passionate team of hair stylists! We are looking for someone who is dedicated to providing high-quality hair care services and enjoys working in a fast-paced environment. We offer flexible hours and a supportive work environment.`
    },
    {
      title: "Upscale",
      description: `Our upscale salon is seeking a talented hair stylist to provide exceptional hair care services to our discerning clientele. The ideal candidate should have experience with high-end products and techniques and be able to provide a luxurious experience for our clients.`
    },
    {
      title: "Modern",
      description: `We are looking for a modern hair stylist to provide trendy and stylish haircuts, coloring, and styling services. The ideal candidate should be up-to-date on the latest hair trends and techniques and be able to provide excellent customer service.`
    }
  ],
  esthetician: [
    {
      title: "Skilled",
      description: `We are looking for a skilled esthetician with experience in providing a variety of skincare treatments such as facials, waxing, and microdermabrasion. The ideal candidate should have a strong understanding of skincare techniques and be able to provide excellent customer service.`
    },
    {
      title: "Licensed",
      description: `We are seeking a licensed esthetician to join our team. The ideal candidate should have a strong understanding of skincare techniques and be able to provide excellent customer service. We offer ongoing training and opportunities for advancement.`
    },
    {
      title: "Caring",
      description: `Join our caring team of estheticians! We are looking for someone who is passionate about skincare and enjoys working in a fast-paced environment. We offer flexible hours and a supportive work environment.`
    },
    {
      title: "Spa",
      description: `Our spa is seeking a talented esthetician to provide exceptional skincare services to our discerning clientele. The ideal candidate should have experience with high-end products and techniques and be able to provide a luxurious experience for our clients.`
    },
    {
      title: "Holistic",
      description: `We are looking for a holistic esthetician to provide natural and organic skincare treatments. The ideal candidate should have a strong understanding of holistic skincare techniques and be able to provide excellent customer service.`
    }
  ],
  massage_therapist: [
    {
      title: "Certified",
      description: `We are looking for a certified massage therapist to provide therapeutic massage services to our clients. The ideal candidate should have a strong understanding of massage techniques and be able to provide excellent customer service.`
    },
    {
      title: "Experienced",
      description: `We are seeking an experienced massage therapist to join our team. The ideal candidate should have a strong understanding of massage techniques and be able to provide excellent customer service. We offer ongoing training and opportunities for advancement.`
    },
    {
      title: "Relaxing",
      description: `Join our relaxing team of massage therapists! We are looking for someone who is passionate about massage therapy and enjoys working in a fast-paced environment. We offer flexible hours and a supportive work environment.`
    },
    {
      title: "Therapeutic",
      description: `Our therapeutic massage center is seeking a talented massage therapist to provide exceptional massage therapy services to our discerning clientele. The ideal candidate should have experience with high-end products and techniques and be able to provide a luxurious experience for our clients.`
    },
    {
      title: "Wellness",
      description: `We are looking for a wellness-oriented massage therapist to provide massage therapy services that promote overall health and well-being. The ideal candidate should have a strong understanding of wellness techniques and be able to provide excellent customer service.`
    }
  ],
  salon_manager: [
    {
      title: "Organized",
      description: `We are looking for an organized salon manager to oversee daily operations, manage staff, and ensure customer satisfaction. The ideal candidate should have a strong understanding of salon management techniques and be able to provide excellent customer service.`
    },
    {
      title: "Experienced",
      description: `We are seeking an experienced salon manager to join our team. The ideal candidate should have a strong understanding of salon management techniques and be able to provide excellent customer service. We offer ongoing training and opportunities for advancement.`
    },
    {
      title: "Leadership",
      description: `Join our leadership team as a salon manager! We are looking for someone who is passionate about salon management and enjoys working in a fast-paced environment. We offer flexible hours and a supportive work environment.`
    },
    {
      title: "Business-Minded",
      description: `Our business-minded salon is seeking a talented salon manager to provide exceptional salon management services to our discerning clientele. The ideal candidate should have experience with high-end products and techniques and be able to provide a luxurious experience for our clients.`
    },
    {
      title: "Customer-Focused",
      description: `We are looking for a customer-focused salon manager to provide salon management services that promote customer satisfaction. The ideal candidate should have a strong understanding of customer service techniques and be able to provide excellent customer service.`
    }
  ]
};

export const POLISH_TEMPLATES_VI = {
  hair_stylist: [
    {
      title: "Chuyên nghiệp",
      description: `Tuyển thợ làm tóc chuyên nghiệp, có kinh nghiệm cắt, uốn, duỗi, nhuộm. Lương cao, thưởng hấp dẫn, môi trường làm việc thân thiện.`
    },
    {
      title: "Sáng tạo",
      description: `Tìm kiếm thợ làm tóc sáng tạo, có khả năng tạo ra những kiểu tóc độc đáo và phù hợp với khách hàng. Mức lương cạnh tranh, cơ hội phát triển sự nghiệp.`
    },
    {
      title: "Năng động",
      description: `Cần tuyển thợ làm tóc năng động, nhiệt tình, có tinh thần làm việc nhóm. Đảm bảo thu nhập ổn định, chế độ đãi ngộ tốt.`
    },
    {
      title: "Cao cấp",
      description: `Salon tóc cao cấp tuyển thợ làm tóc có kinh nghiệm, tay nghề cao, phục vụ khách hàng VIP. Môi trường làm việc sang trọng, chuyên nghiệp, thu nhập xứng đáng.`
    },
    {
      title: "Cơ bản",
      description: `Tuyển thợ làm tóc cơ bản, không yêu cầu kinh nghiệm, sẽ được đào tạo bài bản. Lương khởi điểm hấp dẫn, cơ hội học hỏi và nâng cao tay nghề.`
    }
  ],
  esthetician: [
    {
      title: "Chăm sóc da",
      description: `Tuyển chuyên viên chăm sóc da có kinh nghiệm, am hiểu về các liệu pháp làm đẹp. Lương thưởng hấp dẫn, môi trường làm việc chuyên nghiệp.`
    },
    {
      title: "Spa",
      description: `Tìm kiếm kỹ thuật viên spa có tay nghề, thực hiện các dịch vụ massage, xông hơi, trị liệu. Mức lương cạnh tranh, cơ hội phát triển bản thân.`
    },
    {
      title: "Thẩm mỹ",
      description: `Cần tuyển nhân viên thẩm mỹ có kiến thức về các phương pháp làm đẹp hiện đại. Đảm bảo thu nhập ổn định, chế độ đãi ngộ tốt.`
    },
    {
      title: "Cao cấp",
      description: `Trung tâm thẩm mỹ cao cấp tuyển chuyên viên chăm sóc da có kinh nghiệm, phục vụ khách hàng VIP. Môi trường làm việc sang trọng, chuyên nghiệp, thu nhập xứng đáng.`
    },
    {
      title: "Cơ bản",
      description: `Tuyển nhân viên chăm sóc da cơ bản, không yêu cầu kinh nghiệm, sẽ được đào tạo bài bản. Lương khởi điểm hấp dẫn, cơ hội học hỏi và nâng cao tay nghề.`
    }
  ],
  massage_therapist: [
    {
      title: "Trị liệu",
      description: `Tuyển kỹ thuật viên massage trị liệu có kinh nghiệm, am hiểu về các kỹ thuật massage. Lương thưởng hấp dẫn, môi trường làm việc chuyên nghiệp.`
    },
    {
      title: "Thư giãn",
      description: `Tìm kiếm kỹ thuật viên massage thư giãn có tay nghề, thực hiện các dịch vụ massage toàn thân, massage chân. Mức lương cạnh tranh, cơ hội phát triển bản thân.`
    },
    {
      title: "Spa",
      description: `Cần tuyển nhân viên massage spa có kiến thức về các liệu pháp massage. Đảm bảo thu nhập ổn định, chế độ đãi ngộ tốt.`
    },
    {
      title: "Cao cấp",
      description: `Trung tâm massage cao cấp tuyển kỹ thuật viên massage có kinh nghiệm, phục vụ khách hàng VIP. Môi trường làm việc sang trọng, chuyên nghiệp, thu nhập xứng đáng.`
    },
    {
      title: "Cơ bản",
      description: `Tuyển nhân viên massage cơ bản, không yêu cầu kinh nghiệm, sẽ được đào tạo bài bản. Lương khởi điểm hấp dẫn, cơ hội học hỏi và nâng cao tay nghề.`
    }
  ],
  salon_manager: [
    {
      title: "Quản lý",
      description: `Tuyển quản lý salon có kinh nghiệm, khả năng điều hành và quản lý nhân viên. Lương thưởng hấp dẫn, môi trường làm việc chuyên nghiệp.`
    },
    {
      title: "Điều hành",
      description: `Tìm kiếm người điều hành salon có kinh nghiệm, có khả năng giải quyết các vấn đề phát sinh. Mức lương cạnh tranh, cơ hội phát triển bản thân.`
    },
    {
      title: "Nhân sự",
      description: `Cần tuyển quản lý nhân sự salon có kiến thức về luật lao động và quản lý nhân viên. Đảm bảo thu nhập ổn định, chế độ đãi ngộ tốt.`
    },
    {
      title: "Cao cấp",
      description: `Salon cao cấp tuyển quản lý có kinh nghiệm, phục vụ khách hàng VIP. Môi trường làm việc sang trọng, chuyên nghiệp, thu nhập xứng đáng.`
    },
    {
      title: "Cơ bản",
      description: `Tuyển quản lý salon cơ bản, không yêu cầu kinh nghiệm, sẽ được đào tạo bài bản. Lương khởi điểm hấp dẫn, cơ hội học hỏi và nâng cao tay nghề.`
    }
  ],
  nail_technician: [
    {
      title: "Chuyên Nghiệp",
      description: `Cần tuyển thợ nail có kinh nghiệm làm bột, chân tay nước và wax lông. Lương $800-1200/tuần tùy theo kinh nghiệm và kỹ năng. Tiệm rộng rãi, khách ổn định, có lượng khách quen lớn và được trang bị đầy đủ thiết bị hiện đại. Môi trường làm việc thân thiện, chuyên nghiệp. Bao ăn trưa và có tip cao. Liên hệ ngay để được phỏng vấn.`
    },
    {
      title: "Chi Tiết",
      description: `Cần tuyển thợ nail full-time hoặc part-time. Yêu cầu: có kinh nghiệm làm bột, gel, chân tay nước, waxing. Tiệm nằm ở khu trung tâm, đông khách, tip cao. Lương $700-1300/tuần tùy theo năng lực. Làm việc 5-6 ngày/tuần, bao ăn trưa. Môi trường làm việc vui vẻ, hòa đồng. Có thể bao chỗ ở cho thợ ở xa. Ưu tiên người có bằng nail của tiểu bang. Liên hệ ngay để biết thêm chi tiết.`
    },
    {
      title: "Thân Thiện",
      description: `Tiệm nail gia đình ở khu dân cư cao cấp cần tuyển thợ nail nam/nữ. Không cần kinh nghiệm, sẽ được đào tạo ngay tại tiệm. Môi trường làm việc thân thiện như gia đình, không khí vui vẻ, không áp lực. Lương $600-1000/tuần tùy theo kỹ năng. Bao ăn trưa, làm việc 5 ngày/tuần. Chủ tiệm dễ tính, thông cảm và hỗ trợ thợ. Liên hệ ngay để gia nhập đại gia đình của chúng tôi!`
    },
    {
      title: "Sang Trọng",
      description: `Spa nail cao cấp tại khu thượng lưu đang tìm kiếm những thợ nail chuyên nghiệp. Yêu cầu: thành thạo kỹ thuật bột, gel, dipping powder, thiết kế móng nghệ thuật phức tạp. Khách hàng của chúng tôi sẵn sàng trả giá cao cho dịch vụ chất lượng và tip hậu hĩnh (trung bình $50-100/khách). Lương $1000-1800/tuần tùy theo kỹ năng và khả năng phục vụ khách VIP. Môi trường sang trọng, thiết bị hiện đại, sản phẩm hàng hiệu. Cơ hội phát triển sự nghiệp và nâng cao thu nhập.`
    },
    {
      title: "Cơ Bản",
      description: `Cần tuyển thợ nail có kinh nghiệm hoặc mới học nghề. Lương $600-1000/tuần tùy theo khả năng. Tiệm rộng rãi, sạch sẽ, khách ổn định. Làm việc 5-6 ngày/tuần, giờ giấc linh hoạt. Môi trường làm việc vui vẻ, hòa đồng. Liên hệ để biết thêm chi tiết.`
    }
  ],
};
