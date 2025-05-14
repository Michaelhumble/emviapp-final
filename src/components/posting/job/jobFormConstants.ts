import { JobTemplateOption } from './types';

export const JOB_TYPES = [
  { value: 'nail-tech', label: 'Nail Technician', labelVi: 'Thợ Nail' },
  { value: 'hair-stylist', label: 'Hair Stylist', labelVi: 'Thợ Tóc' },
  { value: 'barber', label: 'Barber', labelVi: 'Thợ Cắt Tóc Nam' },
  { value: 'esthetician', label: 'Esthetician', labelVi: 'Thợ Chăm Sóc Da' },
  { value: 'massage-therapist', label: 'Massage Therapist', labelVi: 'Thợ Massage' },
  { value: 'makeup-artist', label: 'Makeup Artist', labelVi: 'Thợ Trang Điểm' },
  { value: 'lash-tech', label: 'Lash Technician', labelVi: 'Thợ Mi' },
  { value: 'eyebrow-tech', label: 'Eyebrow Technician', labelVi: 'Thợ Lông Mày' },
  { value: 'spa-manager', label: 'Spa Manager', labelVi: 'Quản Lý Spa' },
  { value: 'receptionist', label: 'Receptionist', labelVi: 'Lễ Tân' },
  { value: 'other', label: 'Other', labelVi: 'Khác' },
];

// This is the interface expected by JobForm when mapping templates
export const JOB_TEMPLATES: {
  id: string;
  title: string;
  type: string;
  description: string;
  summary?: string;
}[] = [
  {
    id: 'nail-tech',
    title: 'Nail Technician Needed',
    type: 'nail-tech',
    description: 'We are looking for an experienced nail technician to join our salon team. The ideal candidate should have at least 2 years of experience, strong customer service skills, and knowledge of acrylic/gel applications, manicures, and pedicures.\n\nResponsibilities:\n- Provide high-quality nail services\n- Maintain a clean and sanitized workspace\n- Build client relationships\n- Assist in inventory management when needed\n\nBenefits:\n- Competitive compensation\n- Flexible scheduling\n- Paid training opportunities\n- Professional work environment',
    summary: 'Experienced nail tech for upscale salon'
  },
  {
    id: 'hair-stylist',
    title: 'Hair Stylist Position Available',
    type: 'hair-stylist',
    description: 'Our growing salon is seeking a talented hair stylist with cutting and coloring expertise. We value creativity, technical skill, and excellent customer service.\n\nResponsibilities:\n- Provide professional hair services including cuts, colors, and styling\n- Consult with clients on hair care and styling options\n- Keep up with current trends and techniques\n- Maintain clean and organized station\n\nBenefits:\n- Competitive commission structure\n- Flexible schedule\n- Continuing education opportunities\n- Product discounts',
    summary: 'Creative stylist for modern salon'
  },
  {
    id: 'esthetician',
    title: 'Esthetician / Skin Care Specialist',
    type: 'esthetician',
    description: 'We are looking for a licensed esthetician passionate about skin care to join our team. The ideal candidate will have experience with various facial treatments, waxing services, and product knowledge.\n\nResponsibilities:\n- Perform facial treatments and skin analyses\n- Provide waxing and other skin care services\n- Recommend appropriate products and home care\n- Maintain a clean and sanitary environment\n\nBenefits:\n- Base pay plus commission\n- Retail commission opportunities\n- Continuing education\n- Professional development',
    summary: 'Licensed esthetician for spa services'
  },
  {
    id: 'massage-therapist',
    title: 'Licensed Massage Therapist',
    type: 'massage-therapist',
    description: 'Our spa is seeking a licensed massage therapist to provide therapeutic and relaxation massages. Experience with multiple modalities including Swedish, deep tissue, and hot stone preferred.\n\nResponsibilities:\n- Perform various massage techniques\n- Customize treatments to client needs\n- Maintain proper documentation\n- Ensure cleanliness of treatment rooms\n\nBenefits:\n- Competitive pay structure\n- Flexible scheduling\n- Loyal client base\n- Professional, upscale environment',
    summary: 'Experienced LMT for busy spa'
  },
  {
    id: 'receptionist',
    title: 'Salon Receptionist / Front Desk',
    type: 'receptionist',
    description: 'We are looking for a friendly, organized receptionist to manage our front desk operations. The ideal candidate will have excellent customer service skills and basic computer knowledge.\n\nResponsibilities:\n- Greet clients and manage the appointment schedule\n- Process payments and handle retail sales\n- Answer phones and respond to inquiries\n- Maintain the reception area\n\nBenefits:\n- Hourly pay plus tips\n- Potential for growth\n- Professional work environment\n- Staff discounts on services and products',
    summary: 'Front desk professional for salon'
  }
];

// Define Vietnamese polish styles for job descriptions
export const POLISH_UI_TRANSLATIONS = {
  en: {
    title: "Polish with AI",
    subtitle: "Choose a professional style for your job description",
    selectStyle: "Select a style",
    preview: "Preview",
    cancel: "Cancel",
    useStyle: "Use this style"
  },
  vi: {
    title: "Làm chuyên nghiệp với AI",
    subtitle: "Chọn phong cách cho mô tả công việc của bạn",
    selectStyle: "Chọn phong cách",
    preview: "Xem trước",
    cancel: "Hủy",
    useStyle: "Sử dụng phong cách này"
  }
};

// English polished descriptions
export const POLISHED_DESCRIPTIONS_EN = {
  nail: [
    {
      title: "Professional",
      description: "We are seeking an experienced nail technician to join our established salon. The ideal candidate will have at least 2 years of experience with acrylic, gel, and natural nail services. Must be professional, detail-oriented, and provide excellent customer service.\n\nResponsibilities include:\n- Performing manicures and pedicures\n- Applying and maintaining artificial nails\n- Nail art and specialized treatments\n- Maintaining a clean, sanitized workspace\n\nWe offer competitive pay (commission or hourly with tips), a friendly team environment, and a loyal client base. Part-time and full-time positions available."
    },
    {
      title: "Friendly & Casual",
      description: "Join our nail salon family! We're looking for friendly, talented nail techs who love what they do. Experience with acrylics, gel, and natural nails preferred, but we're willing to train the right person with basic skills and a great attitude.\n\nWhat you'll do:\n- Make our clients feel amazing with beautiful nail services\n- Bring your creativity to nail art and designs\n- Enjoy a drama-free, supportive workplace\n\nWe offer flexible schedules, great pay, and a fun place to work. Bonus: we celebrate birthdays and have team lunches! Come grow with us!"
    },
    {
      title: "Luxury Salon",
      description: "An exclusive opportunity awaits at our premium nail salon. We are seeking an exceptional nail artist with impeccable skills and a sophisticated approach to join our prestigious team.\n\nThe ideal candidate possesses:\n- Extensive experience in luxury nail services\n- Mastery of gel, acrylic, and specialty techniques\n- Immaculate attention to detail\n- Refined client interaction abilities\n\nIn return, we offer an upscale work environment, sophisticated clientele, superior compensation, and opportunities for artistic expression and professional advancement. Only those committed to excellence need apply."
    },
    {
      title: "Growth Opportunity",
      description: "Growing salon seeking nail technicians ready to build their career! Whether you're experienced or recently licensed, we offer a path to success with our tiered advancement program.\n\nWhat we provide:\n- Guaranteed base pay + commission structure\n- Paid training and certification opportunities\n- Career advancement potential\n- Benefits for full-time staff\n\nJoin our positive, educational environment where your skills and client list can flourish. Perfect for motivated professionals looking to increase their earnings while developing their expertise. Mentorship available for newer technicians."
    },
    {
      title: "High-Volume",
      description: "Busy nail salon needs experienced technicians ASAP! High-traffic location with steady client flow guarantees excellent earning potential. Full-time positions available with immediate start.\n\nRequirements:\n- Speed and efficiency without sacrificing quality\n- Experience with quick-service manicures/pedicures\n- Ability to handle multiple clients\n- Reliable and punctual work ethic\n\nTop earners at our salon make $1000-1500+ weekly including tips. Walk-in clients daily plus established appointment book available for the right candidate. Weekend availability required."
    }
  ],
  hair: [
    {
      title: "Professional & Concise",
      description: "We are seeking licensed hair stylists to join our established salon. Applicants must be skilled in cutting, coloring, styling, and customer service. We offer competitive compensation, a pleasant work environment, and a steady client base. Full-time and part-time positions available."
    },
    {
      title: "Friendly & Welcoming",
      description: "Join our hair salon family! We're looking for talented stylists who love creating beautiful hair and making clients feel special. Our team is supportive, our clients are wonderful, and our salon is a happy place to work. Great pay, flexible hours, and a fun atmosphere await the right candidates!"
    }
  ],
  spa: [
    {
      title: "Professional & Concise",
      description: "We are seeking licensed massage therapists and estheticians to join our established spa. Applicants must be skilled in various massage techniques, facials, and customer service. We offer competitive compensation, a serene work environment, and a loyal client base. Full-time and part-time positions available."
    },
    {
      title: "Friendly & Welcoming",
      description: "Join our spa family! We're looking for talented therapists who love helping clients relax and feel their best. Our team is supportive, our clients are wonderful, and our spa is a peaceful place to work. Great pay, flexible hours, and a soothing atmosphere await the right candidates!"
    }
  ],
  receptionist: [
    {
      title: "Professional & Concise",
      description: "We are seeking a receptionist to join our established salon. Responsibilities include scheduling appointments, answering phones, greeting clients, and processing payments. Must have excellent communication skills and basic computer knowledge. We offer competitive compensation and a pleasant work environment. Full-time and part-time positions available."
    },
    {
      title: "Friendly & Welcoming",
      description: "Join our salon family as our new receptionist! We're looking for a friendly, organized person who loves making clients feel welcome. You'll be the first smile our clients see and the helpful voice on our phone. Great pay, fun team environment, and the satisfaction of helping our business run smoothly!"
    }
  ],
  other: [
    {
      title: "Professional & Concise",
      description: "We are seeking qualified professionals to join our established beauty business. We offer competitive compensation, a pleasant work environment, and growth opportunities. Full-time and part-time positions available. Please inquire with your specific qualifications."
    },
    {
      title: "Friendly & Welcoming",
      description: "Join our beauty business family! We're looking for talented individuals who are passionate about their craft and making clients feel special. Our team is supportive, our clients are wonderful, and our workplace is a happy place to be. Great pay, flexible hours, and a fun atmosphere await the right candidates!"
    }
  ]
};

// Vietnamese polished descriptions
export const POLISHED_DESCRIPTIONS_VI = {
  nail: [
    {
      title: "Chuyên nghiệp",
      description: "Cần thợ nails kinh nghiệm, tiệm Mỹ trắng, khách sang, tip cao. Bao lương $1,700/tuần + ăn chia. Chủ dễ chịu, làm lâu dài, khu vực an ninh, có chỗ ở riêng."
    },
    {
      title: "Thợ Bột & Gel",
      description: "Tuyển thợ bột & gel, lương cao, tip mỗi ngày $200+, làm khu Mỹ trắng, tiệm đông khách quanh năm, hỗ trợ chỗ ở sạch sẽ."
    },
    {
      title: "Thợ Tay Chân Nước",
      description: "Tuyển thợ tay chân nước, lương căn bản $1,600/tuần, khách Mỹ trắng, tip rất cao, không áp lực doanh số. Tiệm sang trọng, chủ vui vẻ."
    },
    {
      title: "Thợ Bột Mới Ra Nghề",
      description: "Cần thợ bột, bao lương $1,400/tuần, tiệm Việt đông khách, khách quen nhiều, làm việc ổn định quanh năm. Nhận thợ mới ra nghề, chỉ dẫn tận tình."
    },
    {
      title: "Nam/Nữ, Bao Lương",
      description: "Tiệm nails khu đông người, cần thợ nam/nữ, bao lương + ăn chia, môi trường thân thiện, chủ dễ chịu, khách tip tốt."
    },
    {
      title: "Ăn Chia 6/4",
      description: "Tuyển thợ nail có tay nghề, làm ăn chia 6/4 hoặc lương căn bản, khách ổn định, chỗ ở riêng, nhận thợ part-time."
    },
    {
      title: "Tiệm Mới Mở",
      description: "Tiệm mới mở cần thợ tay chân nước, nhận cả thợ mới ra nghề, bao lương $1,200/tuần, khách ổn định, có cơ hội học thêm bột & design."
    },
    {
      title: "Part-time/Cuối Tuần",
      description: "Cần thợ làm theo ca hoặc cuối tuần, lương hấp dẫn + tip, phù hợp cho sinh viên hoặc ai muốn làm thêm. Không áp lực, thời gian linh động."
    },
    {
      title: "Design Nails",
      description: "Tuyển thợ nail sáng tạo, thích vẽ design, làm việc môi trường trẻ trung, chủ trẻ, khách trẻ trung, lương căn bản + % hoa hồng."
    },
    {
      title: "Cần Gấp",
      description: "Tin hot: Cần thợ nail gấp, khách đợi sẵn, chỉ cần có tay nghề cơ bản là được! Lương + tip cao, vào làm liền, thử việc được hỗ trợ. Inbox để biết thêm chi tiết (chỉ mở cho thành viên)."
    }
  ],
  hair: [
    {
      title: "Chuyên nghiệp",
      description: "Chúng tôi đang tìm kiếm thợ tóc chuyên nghiệp, có kinh nghiệm làm tóc, uốn, nhuộm, và cắt. Môi trường làm việc thoải mái, lương hấp dẫn, khách hàng ổn định."
    },
    {
      title: "Thân thiện",
      description: "Salon tóc thân thiện cần thợ tóc có kỹ năng cơ bản, ham học hỏi. Chúng tôi tạo môi trường làm việc như gia đình, lương thưởng rõ ràng, có cơ hội phát triển."
    }
  ],
  spa: [
    {
      title: "Chuyên nghiệp",
      description: "Spa cao cấp tìm kỹ thuật viên massage và chăm sóc da có chứng chỉ, kinh nghiệm làm việc với khách hàng cao cấp. Chúng tôi cung cấp mức lương cạnh tranh và môi trường làm việc chuyên nghiệp."
    },
    {
      title: "Thân thiện",
      description: "Spa thân thiện cần nhân viên massage và chăm sóc da, có hoặc không có kinh nghiệm, sẽ được đào tạo thêm. Môi trường làm việc thoải mái, giờ giấc linh hoạt."
    }
  ],
  receptionist: [
    {
      title: "Chuyên nghiệp",
      description: "Cần lễ tân salon có kinh nghiệm, thông thạo tiếng Anh, biết sử dụng máy tính cơ bản. Công việc bao gồm đặt lịch, tiếp đón khách, và xử lý thanh toán."
    },
    {
      title: "Thân thiện",
      description: "Salon thân thiện cần lễ tân vui vẻ, hoà đồng, biết tiếng Anh giao tiếp. Môi trường làm việc thoải mái, giờ giấc cố định, lương thưởng rõ ràng."
    }
  ],
  other: [
    {
      title: "Chuyên nghiệp",
      description: "Cơ sở làm đẹp cần nhân viên chuyên nghiệp, có kinh nghiệm trong ngành làm đẹp. Môi trường làm việc thoải mái, lương cạnh tranh, cơ hội phát triển."
    },
    {
      title: "Thân thiện",
      description: "Cơ sở làm đẹp thân thiện cần nhân viên vui vẻ, hoà đồng, ham học hỏi. Không yêu cầu kinh nghiệm, sẽ được đào tạo. Lương thưởng rõ ràng."
    }
  ]
};

// Default job descriptions for common roles
export const DEFAULT_JOB_DESCRIPTIONS = {
  nail: "We are looking for experienced nail technicians to join our salon. The ideal candidate will be skilled in a variety of nail services including manicures, pedicures, gel polish, acrylics, and nail art. We offer competitive pay and a friendly work environment.",
  hair: "Experienced hair stylist needed for our busy salon. Must be proficient in cutting, coloring, and styling for diverse clientele. We offer competitive compensation, a supportive team environment, and ongoing training opportunities.",
  spa: "We're seeking licensed massage therapists and estheticians for our wellness spa. Candidates should have experience in multiple modalities and a passion for client care. We provide a serene work environment and competitive compensation.",
  receptionist: "Front desk position available at our salon. Responsibilities include greeting clients, managing appointments, handling payments, and maintaining a welcoming atmosphere. Strong communication skills and basic computer proficiency required.",
  other: "We are looking for talented beauty professionals to join our team. Please include your specific qualifications and experience in your application."
};
