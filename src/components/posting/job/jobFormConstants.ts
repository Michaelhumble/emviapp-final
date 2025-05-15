import { JobTemplateOption } from './types';

// English Job Templates - Keep these exactly as they are
export const JOB_TEMPLATES_EN: JobTemplateOption[] = [
  {
    id: "nail_technician",
    label: "Nail Technician",
    defaultTitle: "Nail Technician Needed",
    defaultDescription: "We are looking for an experienced nail technician to join our team. The ideal candidate should have experience with manicures, pedicures, and nail extensions. Must be reliable and customer-focused.",
    defaultType: "fullTime"
  },
  {
    id: "hair_stylist",
    label: "Hair Stylist",
    defaultTitle: "Hair Stylist Position Available",
    defaultDescription: "Seeking a talented hair stylist with experience in cutting, coloring, and styling. Must have good communication skills and the ability to understand client needs.",
    defaultType: "fullTime"
  },
  {
    id: "spa_technician",
    label: "Spa Technician", 
    defaultTitle: "Spa Technician Wanted",
    defaultDescription: "Seeking a qualified spa technician with experience in facials, body treatments, and massage therapy. Must be professional and detail-oriented.",
    defaultType: "fullTime"
  },
  {
    id: "receptionist",
    label: "Salon Receptionist",
    defaultTitle: "Salon Receptionist Position",
    defaultDescription: "Looking for a friendly and organized receptionist to welcome clients, manage appointments, and handle phone calls. Experience with salon software is a plus.",
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
    id: "nail_technician",
    label: "Thợ Nail",
    defaultTitle: "Cần Tuyển Thợ Nail",
    defaultDescription: "Chúng tôi đang tìm kiếm thợ nail có kinh nghiệm để gia nhập đội ngũ của chúng tôi. Ứng viên lý tưởng nên có kinh nghiệm với dịch vụ làm móng tay, móng chân và nối móng. Phải đáng tin cậy và tập trung vào khách hàng.",
    defaultType: "fullTime"
  },
  {
    id: "nail_technician_experienced",
    label: "Thợ Nail Có Kinh Nghiệm",
    defaultTitle: "Cần Gấp Thợ Nail Có Kinh Nghiệm",
    defaultDescription: "Salon tại vị trí đẹp cần tuyển thợ nail có kinh nghiệm. Bao lương $800-1200/tuần tùy theo kinh nghiệm. Môi trường làm việc thân thiện, tips cao, có khách sẵn.",
    defaultType: "fullTime"
  },
  {
    id: "nail_technician_all_positions",
    label: "Thợ Nail Mọi Vị Trí",
    defaultTitle: "Tuyển Thợ Nail Mọi Vị Trí",
    defaultDescription: "Salon vị trí trung tâm cần tuyển thợ nail mọi vị trí (bột, gel, chân tay nước). Lương thưởng hậu hĩnh, môi trường làm việc chuyên nghiệp, có thể bao lương tùy năng lực.",
    defaultType: "fullTime"
  },
  {
    id: "nail_technician_part_time",
    label: "Thợ Nail Part-time",
    defaultTitle: "Tuyển Thợ Nail Part-time",
    defaultDescription: "Salon khu sang cần tuyển thợ nail làm part-time cuối tuần. Cần có kinh nghiệm cơ bản, lương + tips hấp dẫn. Liên hệ ngay để được phỏng vấn.",
    defaultType: "partTime"
  },
  {
    id: "hair_stylist",
    label: "Thợ Tóc",
    defaultTitle: "Cần Tuyển Thợ Tóc",
    defaultDescription: "Tìm kiếm thợ tóc tài năng có kinh nghiệm cắt, nhuộm và tạo kiểu tóc. Phải có kỹ năng giao tiếp tốt và khả năng hiểu nhu cầu của khách hàng.",
    defaultType: "fullTime"
  },
  {
    id: "hair_stylist_experienced",
    label: "Thợ Tóc Chuyên Nghiệp",
    defaultTitle: "Cần Thợ Tóc Chuyên Nghiệp",
    defaultDescription: "Salon tóc cao cấp cần thợ tóc có kinh nghiệm nhuộm highlight và balayage. Lương $900-1300/tuần tùy theo khả năng. Có chỗ ở cho thợ ở xa.",
    defaultType: "fullTime"
  },
  {
    id: "spa_technician",
    label: "Kỹ Thuật Viên Spa",
    defaultTitle: "Cần Tuyển Kỹ Thuật Viên Spa",
    defaultDescription: "Tìm kiếm kỹ thuật viên spa có trình độ với kinh nghiệm về chăm sóc da mặt, điều trị cơ thể và liệu pháp massage. Phải chuyên nghiệp và chú ý đến từng chi tiết.",
    defaultType: "fullTime"
  },
  {
    id: "spa_technician_facial",
    label: "Chuyên Viên Chăm Sóc Da",
    defaultTitle: "Tuyển Chuyên Viên Chăm Sóc Da",
    defaultDescription: "Spa sang trọng cần tuyển chuyên viên chăm sóc da có kinh nghiệm làm facial, trị mụn, trị nám. Lương thỏa thuận theo năng lực, môi trường làm việc đẳng cấp.",
    defaultType: "fullTime"
  },
  {
    id: "receptionist",
    label: "Lễ Tân Salon",
    defaultTitle: "Tuyển Lễ Tân Salon",
    defaultDescription: "Tìm kiếm lễ tân thân thiện và có tổ chức để chào đón khách hàng, quản lý lịch hẹn và xử lý cuộc gọi điện thoại. Kinh nghiệm với phần mềm salon là một lợi thế.",
    defaultType: "fullTime"
  },
  {
    id: "manager",
    label: "Quản Lý Salon",
    defaultTitle: "Tuyển Quản Lý Salon",
    defaultDescription: "Salon lớn tìm người quản lý có kinh nghiệm điều hành. Yêu cầu tiếng Anh tốt, kỹ năng lãnh đạo, quản lý nhân sự và kế toán cơ bản. Mức lương cạnh tranh cho ứng viên phù hợp.",
    defaultType: "fullTime"
  },
  {
    id: "apprentice",
    label: "Thợ Học Việc",
    defaultTitle: "Nhận Thợ Học Việc",
    defaultDescription: "Cơ hội cho người mới muốn vào nghề nail/tóc. Chủ salon sẽ đào tạo từ cơ bản đến nâng cao. Không cần kinh nghiệm, chỉ cần chăm chỉ và có tinh thần học hỏi.",
    defaultType: "partTime"
  },
  {
    id: "other",
    label: "Khác",
    defaultTitle: "",
    defaultDescription: "",
    defaultType: ""
  }
];

// English Job Types - Keep these exactly as they are
export const JOB_TYPES_EN = [
  { value: "fullTime", label: "Full Time" },
  { value: "partTime", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "freelance", label: "Freelance" },
  { value: "other", label: "Other" }
];

// Vietnamese Job Types
export const JOB_TYPES_VI = [
  { value: "fullTime", label: "Toàn thời gian" },
  { value: "partTime", label: "Bán thời gian" },
  { value: "contract", label: "Theo hợp đồng" },
  { value: "freelance", label: "Làm tự do" },
  { value: "other", label: "Khác" }
];

// English Polish Descriptions - Keep these exactly as they are
export const POLISHED_DESCRIPTIONS_EN = {
  nail: [
    {
      title: "Professional & Concise",
      description: "Looking for experienced nail technician with minimum 2 years experience. Must be proficient in acrylics, gel, and nail art. Competitive pay structure with benefits and flexible scheduling available. Join our established salon with loyal client base."
    },
    {
      title: "Warm & Welcoming",
      description: "Join our nail salon family! We're looking for passionate nail artists who love creating beautiful nails and making clients feel special. Our friendly team offers support, growth opportunities, and a positive work environment. Competitive compensation with loyal clientele."
    },
    {
      title: "Luxury & High-End",
      description: "Premium nail salon seeking exceptional talent to serve our discerning clientele. We offer an elegant work environment with high-end products and equipment. Candidates must demonstrate flawless technique in luxury nail services. Excellent compensation package reflecting your expertise."
    }
  ],
  hair: [
    {
      title: "Professional & Concise",
      description: "Established salon seeking licensed hair stylist with minimum 2 years experience. Must excel in cutting, coloring, and styling for diverse clientele. Commission-based compensation with retail bonus opportunities. Bring your existing clients or build from our steady customer flow."
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
      title: "Professional & Concise",
      description: "Seeking licensed esthetician/massage therapist with minimum 2 years experience. Must be proficient in facials, body treatments, and massage therapy. Competitive pay structure with benefits and flexible scheduling. Join our established spa with loyal clientele."
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

// Vietnamese Polish Descriptions
export const POLISHED_DESCRIPTIONS_VI = {
  nail: [
    {
      title: "Chuyên nghiệp & Súc tích",
      description: "Cần tuyển thợ nail có kinh nghiệm tối thiểu 2 năm. Phải thành thạo bột, gel, và nail art. Cơ cấu lương thưởng cạnh tranh với phúc lợi và lịch làm việc linh hoạt. Gia nhập salon uy tín của chúng tôi với lượng khách hàng trung thành."
    },
    {
      title: "Thân thiện & Chào đón",
      description: "Gia nhập gia đình salon nail của chúng tôi! Chúng tôi đang tìm kiếm những nghệ nhân nail nhiệt huyết, yêu thích việc tạo ra những bộ móng đẹp và làm cho khách hàng cảm thấy đặc biệt. Đội ngũ thân thiện của chúng tôi luôn hỗ trợ, tạo cơ hội phát triển và môi trường làm việc tích cực. Mức lương cạnh tranh với lượng khách hàng trung thành."
    },
    {
      title: "Sang trọng & Cao cấp",
      description: "Salon nail cao cấp tìm kiếm nhân tài xuất sắc để phục vụ khách hàng tinh tế. Chúng tôi cung cấp môi trường làm việc thanh lịch với sản phẩm và thiết bị cao cấp. Ứng viên phải thể hiện kỹ thuật hoàn hảo trong các dịch vụ nail cao cấp. Gói lương thưởng tuyệt vời phản ánh chuyên môn của bạn."
    },
    {
      title: "Thực tế & Hấp dẫn",
      description: "Salon khu vực đông khách đang tuyển thợ nail full-time và part-time. Lương $800-1100/tuần tùy theo kinh nghiệm, tip cao và ổn định. Môi trường làm việc vui vẻ, không drama, chủ dễ tính. Có hỗ trợ chỗ ở cho thợ từ xa. Bao định cư cho thợ giỏi."
    },
    {
      title: "Chi tiết & Đầy đủ",
      description: "Cần tuyển thợ nail có kinh nghiệm làm bột, gel, chân tay nước. Yêu cầu làm việc sạch sẽ, tỉ mỉ, giao tiếp tốt với khách hàng. Thu nhập $900-1300/tuần (bao lương hoặc chia 6/4 tùy thỏa thuận). Làm việc 5-6 ngày/tuần, giờ linh hoạt. Salon có khách walk-in ổn định, tips hậu hĩnh. Không khấu trừ tiền vật liệu, hỗ trợ đào tạo nâng cao tay nghề."
    }
  ],
  hair: [
    {
      title: "Chuyên nghiệp & Súc tích",
      description: "Salon uy tín cần tuyển thợ tóc có bằng cấp với tối thiểu 2 năm kinh nghiệm. Phải xuất sắc trong cắt, nhuộm và tạo kiểu cho đa dạng khách hàng. Lương theo hoa hồng với cơ hội thưởng bán sản phẩm. Mang theo khách hàng hiện có hoặc xây dựng từ lượng khách đều đặn của chúng tôi."
    },
    {
      title: "Thân thiện & Chào đón",
      description: "Gia nhập gia đình salon tóc của chúng tôi! Chúng tôi đang tìm kiếm những stylist đam mê tạo ra những kiểu tóc đẹp và kết nối có ý nghĩa với khách hàng. Đội ngũ hỗ trợ của chúng tôi tôn vinh sự sáng tạo và phát triển trong môi trường tích cực, không drama. Mức lương cạnh tranh với lượng khách hàng trung thành."
    },
    {
      title: "Sang trọng & Cao cấp",
      description: "Salon danh tiếng tìm kiếm thợ tóc chuyên nghiệp để phục vụ khách hàng cao cấp. Ứng viên phải thể hiện kỹ thuật xuất sắc trong cắt tóc chính xác, pha màu nhuộm nâng cao và tạo kiểu theo xu hướng. Chúng tôi cung cấp không gian thanh lịch, công cụ cao cấp và mức lương xứng đáng với chuyên môn của bạn."
    },
    {
      title: "Thực tế & Hấp dẫn",
      description: "Salon khu vực trung tâm cần tuyển thợ tóc nam/nữ có kinh nghiệm. Lương $900-1400/tuần tùy năng lực. Yêu cầu thợ làm tốt uốn, duỗi, nhuộm highlight. Khách ổn định, tips cao, môi trường làm việc thoải mái. Có hỗ trợ chỗ ở cho thợ từ xa."
    }
  ],
  spa: [
    {
      title: "Chuyên nghiệp & Súc tích",
      description: "Tìm kiếm kỹ thuật viên spa/massage có bằng cấp với tối thiểu 2 năm kinh nghiệm. Phải thành thạo chăm sóc da mặt, điều trị cơ thể và liệu pháp massage. Cơ cấu lương thưởng cạnh tranh với phúc lợi và lịch làm việc linh hoạt. Gia nhập spa uy tín của chúng tôi với lượng khách hàng trung thành."
    },
    {
      title: "Thân thiện & Chào đón",
      description: "Gia nhập gia đình spa của chúng tôi! Chúng tôi đang tìm kiếm những chuyên viên trị liệu tận tâm, tạo ra những trải nghiệm thư giãn và giúp khách hàng cảm thấy tốt nhất. Đội ngũ thân thiện của chúng tôi luôn hỗ trợ, tạo cơ hội phát triển và môi trường làm việc hài hòa. Mức lương cạnh tranh với lượng khách hàng ổn định."
    },
    {
      title: "Sang trọng & Cao cấp",
      description: "Spa cao cấp tìm kiếm nhân tài xuất sắc để phục vụ khách hàng tinh tế. Chúng tôi cung cấp môi trường thanh lịch với sản phẩm cao cấp và thiết bị hiện đại. Ứng viên phải thể hiện sự thông thạo các kỹ thuật trị liệu và liệu pháp cao cấp. Mức lương tuyệt vời phản ánh chuyên môn của bạn."
    }
  ],
  other: [
    {
      title: "Chuyên nghiệp & Súc tích",
      description: "Tìm kiếm chuyên gia làm đẹp có trình độ với kinh nghiệm và chứng chỉ liên quan. Phải đáng tin cậy, tập trung vào khách hàng và định hướng làm việc nhóm. Cơ cấu lương thưởng cạnh tranh với cơ hội phát triển. Gia nhập doanh nghiệp uy tín của chúng tôi với lượng khách hàng trung thành tại vị trí đắc địa."
    },
    {
      title: "Thân thiện & Chào đón",
      description: "Gia nhập gia đình làm đẹp của chúng tôi! Chúng tôi đang tìm kiếm những chuyên gia nhiệt huyết, yêu thích nghề nghiệp và tạo trải nghiệm tuyệt vời cho khách hàng. Đội ngũ hỗ trợ của chúng tôi mang đến môi trường tích cực, không drama nơi bạn có thể phát triển. Mức lương cạnh tranh với lượng khách hàng ổn định."
    },
    {
      title: "Sang trọng & Cao cấp",
      description: "Cơ sở cao cấp tìm kiếm nhân tài xuất sắc để phục vụ khách hàng tinh tế. Chúng tôi cung cấp không gian thanh lịch với sản phẩm và thiết bị cao cấp. Ứng viên phải thể hiện sự thông thạo các kỹ thuật và phong cách chuyên nghiệp. Mức lương tuyệt vời phản ánh chuyên môn của bạn."
    }
  ]
};
