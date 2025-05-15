import { JobTemplateOption, JobType, PolishedDescription, PolishedDescriptions } from "./types";

// English Job Templates
export const JOB_TEMPLATES_EN: JobTemplateOption[] = [
  {
    id: "nail-technician",
    label: "Nail Technician",
    defaultTitle: "Nail Technician",
    defaultDescription: "Looking for an experienced Nail Technician to join our busy salon. Must be skilled in manicures, pedicures, acrylics, and gel.",
    defaultType: "fullTime"
  },
  {
    id: "hair-stylist",
    label: "Hair Stylist",
    defaultTitle: "Hair Stylist",
    defaultDescription: "Seeking a creative Hair Stylist with experience in cutting, coloring, and styling. Must have a strong portfolio and excellent customer service.",
    defaultType: "fullTime"
  },
  {
    id: "spa-technician",
    label: "Spa Technician",
    defaultTitle: "Spa Technician",
    defaultDescription: "Looking for a licensed massage therapist or esthetician to join our spa team. Experience with various massage techniques and skincare services required.",
    defaultType: "partTime"
  },
  {
    id: "salon-receptionist",
    label: "Salon Receptionist",
    defaultTitle: "Salon Receptionist",
    defaultDescription: "Seeking a friendly, organized receptionist to manage appointments, greet clients, and handle phone calls for our busy salon.",
    defaultType: "fullTime"
  },
  {
    id: "other",
    label: "Other",
    defaultTitle: "",
    defaultDescription: "",
    defaultType: ""
  }
];

// Vietnamese Job Templates 
export const JOB_TEMPLATES_VI: JobTemplateOption[] = [
  {
    id: "tho-nail",
    label: "Thợ Nail",
    defaultTitle: "Thợ Nail",
    defaultDescription: "Cần tuyển thợ nail có kinh nghiệm, làm đầy đủ các dịch vụ (bột, gel, dip, pedicure). Lương cao, tip tốt, môi trường làm việc thân thiện.",
    defaultType: "fullTime"
  },
  {
    id: "tho-toc",
    label: "Thợ Tóc",
    defaultTitle: "Thợ Tóc",
    defaultDescription: "Cần tuyển thợ tóc có kinh nghiệm cắt, nhuộm và tạo kiểu. Yêu cầu có tay nghề cao và khả năng giao tiếp tốt với khách hàng.",
    defaultType: "fullTime"
  },
  {
    id: "ky-thuat-vien-spa",
    label: "Kỹ thuật viên Spa",
    defaultTitle: "Kỹ thuật viên Spa",
    defaultDescription: "Tuyển kỹ thuật viên spa có chứng chỉ và kinh nghiệm làm việc. Yêu cầu thành thạo các kỹ thuật massage và dịch vụ chăm sóc da.",
    defaultType: "partTime"
  },
  {
    id: "le-tan-salon",
    label: "Lễ tân Salon",
    defaultTitle: "Lễ tân Salon",
    defaultDescription: "Cần tuyển nhân viên lễ tân có khả năng giao tiếp tốt, sắp xếp lịch hẹn và đón tiếp khách hàng cho salon của chúng tôi.",
    defaultType: "fullTime"
  },
  {
    id: "khac",
    label: "Khác",
    defaultTitle: "",
    defaultDescription: "",
    defaultType: ""
  }
];

// Updated English Job Types
export const JOB_TYPES_EN: JobType[] = [
  { value: "fullTime", label: "Full Time" },
  { value: "partTime", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "freelance", label: "Freelance" },
  { value: "nailTechnician", label: "Nail Technician" },
  { value: "hairStylist", label: "Hair Stylist" },
  { value: "spaTechnician", label: "Spa Technician" },
  { value: "salonReceptionist", label: "Salon Receptionist" },
  { value: "salonManager", label: "Salon Manager" },
  { value: "massageTherapist", label: "Massage Therapist" },
  { value: "lashTechnician", label: "Lash Technician" },
  { value: "tattooArtist", label: "Tattoo Artist" },
  { value: "makeupArtist", label: "Makeup Artist" },
  { value: "boothRental", label: "Booth Rental Available" },
  { value: "otherBeauty", label: "Other Beauty Professional" },
  { value: "other", label: "Other" }
];

// Updated Vietnamese Job Types with translations
export const JOB_TYPES_VI: JobType[] = [
  { value: "fullTime", label: "Toàn thời gian" },
  { value: "partTime", label: "Bán thời gian" },
  { value: "contract", label: "Theo hợp đồng" },
  { value: "freelance", label: "Làm tự do" },
  { value: "nailTechnician", label: "Thợ Nail" },
  { value: "hairStylist", label: "Thợ Tóc" },
  { value: "spaTechnician", label: "Kỹ thuật viên Spa" },
  { value: "salonReceptionist", label: "Lễ tân Salon" },
  { value: "salonManager", label: "Quản lý Salon" },
  { value: "massageTherapist", label: "Thợ Massage" },
  { value: "lashTechnician", label: "Thợ Nối Mi" },
  { value: "tattooArtist", label: "Thợ Xăm" },
  { value: "makeupArtist", label: "Thợ Trang Điểm" },
  { value: "boothRental", label: "Cho Thuê Ghế" },
  { value: "otherBeauty", label: "Chuyên Gia Sắc Đẹp Khác" },
  { value: "other", label: "Khác" }
];

// English AI Polish descriptions
export const POLISHED_DESCRIPTIONS_EN: PolishedDescriptions = {
  nail: [
    {
      title: "Experienced Nail Technician",
      description: "We are seeking an experienced nail technician to join our busy salon. The ideal candidate has 2+ years of experience with acrylic, gel, dip powder, and nail art. Must be licensed, detail-oriented, and provide excellent customer service. Competitive pay, flexible scheduling, and a friendly work environment."
    },
    {
      title: "Full Service Nail Artist",
      description: "Looking for a talented nail artist skilled in manicures, pedicures, acrylic, gel, and nail art. Must have excellent customer service skills and the ability to maintain a loyal clientele. We offer competitive commission, guaranteed hourly wage, and flexible hours."
    },
    {
      title: "Nail Technician - High End Salon",
      description: "Luxury nail salon seeking licensed nail technician with 3+ years of experience. Must excel in all nail services including complex designs and be committed to providing an exceptional client experience. We offer a beautiful workspace, premium products, and generous compensation package."
    }
  ],
  hair: [
    {
      title: "Creative Hair Stylist",
      description: "Seeking a passionate hair stylist with expertise in cutting, coloring, and styling. Must have a strong portfolio demonstrating versatility and creativity. We provide ongoing education, competitive pay, and a collaborative team environment."
    },
    {
      title: "Warm & Welcoming",
      description: "Join our hair salon family! We're looking for passionate stylists who create beautiful transformations and meaningful client connections. Our supportive team celebrates creativity and growth in a positive, drama-free environment. Competitive compensation with loyal clientele."
    },
    {
      title: "Luxury & High-End",
      description: "Prestigious salon seeking master hair stylist to serve our exclusive clientele. Candidates must demonstrate exceptional technique in precision cutting, advanced color formulation, and editorial styling. We offer an elegant atmosphere, premium tools, and compensation reflecting your expertise."
    }
  ],
  spa: [
    {
      title: "Licensed Massage Therapist",
      description: "Upscale day spa seeking licensed massage therapist skilled in Swedish, deep tissue, and hot stone massage. Must have excellent customer service skills and the ability to customize treatments to client needs. Flexible scheduling with competitive pay and benefits."
    },
    {
      title: "Warm & Welcoming",
      description: "Join our spa family! We're looking for caring therapists who create rejuvenating experiences and help clients feel their best. Our friendly team offers support, growth opportunities, and a harmonious work environment. Competitive compensation with steady clientele."
    },
    {
      title: "Luxury & High-End",
      description: "Exclusive spa seeking exceptional talent to serve our discerning clientele. We provide an elegant environment with premium products and advanced equipment. Candidates must demonstrate mastery of therapeutic techniques and luxury treatments. Excellent compensation reflecting your expertise."
    }
  ],
  other: [
    {
      title: "Professional & Concise",
      description: "Seeking qualified beauty professional with relevant experience and certification. Must be reliable, client-focused, and team-oriented. Competitive compensation structure with growth opportunities. Join our established business with loyal clientele in a prime location."
    },
    {
      title: "Warm & Welcoming",
      description: "Join our beauty family! We're looking for passionate professionals who love their craft and creating wonderful client experiences. Our supportive team offers a positive, drama-free environment where you can thrive. Competitive compensation with steady clientele."
    },
    {
      title: "Luxury & High-End",
      description: "Premium establishment seeking exceptional talent to serve our discerning clientele. We offer an elegant atmosphere with high-end products and equipment. Candidates must demonstrate mastery of techniques and professional presence. Excellent compensation reflecting your expertise."
    }
  ]
};

// Vietnamese AI Polish descriptions
export const POLISHED_DESCRIPTIONS_VI: PolishedDescriptions = {
  nail: [
    {
      title: "Thợ Nail Chuyên Nghiệp",
      description: "Cần tuyển thợ Nail có kinh nghiệm 2+ năm, thành thạo bột, gel, dip và vẽ nail. Yêu cầu có bằng, tỉ mỉ và phục vụ khách hàng tốt. Lương cao, giờ làm linh hoạt, môi trường làm việc thân thiện."
    },
    {
      title: "Thợ Nail Đầy Đủ Dịch Vụ",
      description: "Tìm thợ nail có tay nghề cao, thành thạo các dịch vụ nail (manicure, pedicure, bột, gel, vẽ). Yêu cầu kỹ năng giao tiếp tốt và có khả năng giữ chân khách hàng. Chúng tôi cung cấp hoa hồng cạnh tranh, đảm bảo lương theo giờ và giờ làm việc linh hoạt."
    },
    {
      title: "Thợ Nail - Salon Cao Cấp",
      description: "Salon nail cao cấp cần tuyển thợ nail có bằng và kinh nghiệm 3+ năm. Phải thành thạo tất cả các dịch vụ nail bao gồm các thiết kế phức tạp và cam kết mang đến trải nghiệm khách hàng xuất sắc. Chúng tôi cung cấp không gian làm việc đẹp, sản phẩm cao cấp và chế độ lương thưởng hấp dẫn."
    }
  ],
  hair: [
    {
      title: "Thợ Tóc Sáng Tạo",
      description: "Tìm kiếm thợ tóc đam mê với chuyên môn về cắt, nhuộm và tạo kiểu tóc. Yêu cầu có portfolio mạnh thể hiện sự đa dạng và sáng tạo. Chúng tôi cung cấp đào tạo liên tục, lương cạnh tranh và môi trường làm việc hợp tác."
    },
    {
      title: "Warm & Welcoming",
      description: "Join our hair salon family! We're looking for passionate stylists who create beautiful transformations and meaningful client connections. Our supportive team celebrates creativity and growth in a positive, drama-free environment. Competitive compensation with loyal clientele."
    },
    {
      title: "Luxury & High-End",
      description: "Prestigious salon seeking master hair stylist to serve our exclusive clientele. Candidates must demonstrate exceptional technique in precision cutting, advanced color formulation, and editorial styling. We offer an elegant atmosphere, premium tools, and compensation reflecting your expertise."
    }
  ],
  spa: [
    {
      title: "Chuyên Viên Massage Có Chứng Chỉ",
      description: "Spa cao cấp tìm kiếm chuyên viên massage có chứng chỉ, thành thạo các kỹ thuật massage Thụy Điển, deep tissue và đá nóng. Yêu cầu kỹ năng phục vụ khách hàng tốt và khả năng điều chỉnh liệu pháp theo nhu cầu khách hàng. Lịch làm việc linh hoạt với lương và phúc lợi cạnh tranh."
    },
    {
      title: "Warm & Welcoming",
      description: "Join our spa family! We're looking for caring therapists who create rejuvenating experiences and help clients feel their best. Our friendly team offers support, growth opportunities, and a harmonious work environment. Competitive compensation with steady clientele."
    },
    {
      title: "Luxury & High-End",
      description: "Exclusive spa seeking exceptional talent to serve our discerning clientele. We provide an elegant environment with premium products and advanced equipment. Candidates must demonstrate mastery of therapeutic techniques and luxury treatments. Excellent compensation reflecting your expertise."
    }
  ],
  other: [
    {
      title: "Salon Receptionist",
      description: "Busy salon seeking friendly, organized receptionist to manage front desk operations. Responsibilities include scheduling appointments, greeting clients, processing payments, and maintaining a clean reception area. Must have excellent communication skills and the ability to multitask in a fast-paced environment."
    },
    {
      title: "Warm & Welcoming",
      description: "Join our beauty family! We're looking for passionate professionals who love their craft and creating wonderful client experiences. Our supportive team offers a positive, drama-free environment where you can thrive. Competitive compensation with steady clientele."
    },
    {
      title: "Luxury & High-End",
      description: "Premium establishment seeking exceptional talent to serve our discerning clientele. We offer an elegant atmosphere with high-end products and equipment. Candidates must demonstrate mastery of techniques and professional presence. Excellent compensation reflecting your expertise."
    }
  ]
};
