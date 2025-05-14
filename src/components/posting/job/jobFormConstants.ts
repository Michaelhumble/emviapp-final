
import { JobTemplateOption } from './types';

export const JOB_TEMPLATES_EN: JobTemplateOption[] = [
  {
    id: "nail-technician",
    title: "Nail Technician",
    description: "We are looking for an experienced nail technician to join our salon team. The ideal candidate should have skills in manicures, pedicures, and nail extensions. Experience with gel and acrylic applications is required.",
    type: "fullTime"
  },
  {
    id: "hair-stylist",
    title: "Hair Stylist",
    description: "We're hiring a creative hair stylist with expertise in cutting, coloring, and styling. Must be able to work with diverse hair types and stay updated on current trends.",
    type: "fullTime"
  },
  {
    id: "spa-technician",
    title: "Spa Technician",
    description: "Join our wellness center as a spa technician. We're seeking someone experienced in facials, body treatments, and massage therapy. Must create a relaxing environment for clients.",
    type: "partTime"
  },
  {
    id: "salon-receptionist",
    title: "Salon Receptionist",
    description: "We need a friendly, organized receptionist to manage our front desk operations, schedule appointments, and provide excellent customer service. Computer skills required.",
    type: "fullTime"
  },
  {
    id: "other",
    title: "Other",
    description: "",
    type: ""
  }
];

export const JOB_TEMPLATES_VI: JobTemplateOption[] = [
  {
    id: "nail-technician",
    title: "Thợ Nail",
    description: "Chúng tôi đang tìm kiếm thợ nail có kinh nghiệm để tham gia đội ngũ salon của chúng tôi. Ứng viên lý tưởng nên có kỹ năng làm móng tay, móng chân và nail extensions. Yêu cầu có kinh nghiệm với gel và acrylic.",
    type: "fullTime"
  },
  {
    id: "hair-stylist",
    title: "Thợ Tóc",
    description: "Chúng tôi đang tuyển thợ tóc sáng tạo với chuyên môn về cắt, nhuộm và tạo kiểu. Phải có khả năng làm việc với nhiều loại tóc khác nhau và cập nhật các xu hướng hiện tại.",
    type: "fullTime"
  },
  {
    id: "spa-technician",
    title: "Kỹ thuật viên Spa",
    description: "Tham gia trung tâm wellness của chúng tôi với vai trò kỹ thuật viên spa. Chúng tôi đang tìm kiếm người có kinh nghiệm về chăm sóc da mặt, điều trị cơ thể và massage. Phải tạo môi trường thư giãn cho khách hàng.",
    type: "partTime"
  },
  {
    id: "salon-receptionist",
    title: "Lễ tân Salon",
    description: "Chúng tôi cần một lễ tân thân thiện, có tổ chức để quản lý hoạt động tiếp tân, lên lịch hẹn và cung cấp dịch vụ khách hàng xuất sắc. Yêu cầu kỹ năng máy tính.",
    type: "fullTime"
  },
  {
    id: "other",
    title: "Khác",
    description: "",
    type: ""
  }
];

export const JOB_TYPES_EN = {
  fullTime: 'Full Time',
  partTime: 'Part Time',
  contract: 'Contract',
  freelance: 'Freelance',
  other: 'Other'
};

export const JOB_TYPES_VI = {
  fullTime: 'Toàn thời gian',
  partTime: 'Bán thời gian',
  contract: 'Theo hợp đồng',
  freelance: 'Làm tự do',
  other: 'Khác'
};

// English polished descriptions
export const POLISHED_DESCRIPTIONS_EN = {
  nail: [
    {
      title: "Professional",
      description: "We are seeking a skilled nail technician to join our team. The ideal candidate will have experience with manicures, pedicures, and nail extensions. You should be detail-oriented, creative, and committed to providing excellent customer service. Knowledge of gel, acrylic, and specialized nail art techniques is a plus."
    },
    {
      title: "Friendly",
      description: "Looking for a friendly nail tech to be part of our salon family! If you love creating beautiful nails and building relationships with clients, we'd love to meet you. Experience with manicures, pedicures, and extensions required. We offer competitive pay, flexible hours, and a supportive team environment."
    },
    {
      title: "Detailed",
      description: "Experienced nail technician needed for busy salon. Must be skilled in manicures, pedicures, gel, acrylic, dip powder, and basic nail art. Strong attention to detail and excellent time management required. Must maintain a clean, sanitary workspace and provide exceptional customer care. Health benefits available for full-time positions."
    }
  ],
  hair: [
    {
      title: "Professional",
      description: "Experienced hair stylist wanted for upscale salon. We seek candidates with proven expertise in cutting, coloring, and styling for diverse hair types. The ideal candidate will possess excellent communication skills, creative vision, and the ability to build a loyal clientele. Continuing education opportunities available."
    },
    {
      title: "Friendly",
      description: "Join our hair salon team! We're looking for a talented stylist who creates amazing styles while making clients feel welcome and valued. Experience with cutting, coloring, and styling required. We offer competitive commission, flexible scheduling, and a fun work environment."
    },
    {
      title: "Detailed",
      description: "Hair stylist position available at established salon. Must be proficient in precision cutting, advanced color techniques, balayage, highlights, and current styling trends. Experience with diverse hair textures required. Must be detail-oriented with excellent time management. Commission-based with potential for performance bonuses."
    }
  ],
  spa: [
    {
      title: "Professional",
      description: "Licensed massage therapist/esthetician needed for growing spa. The ideal candidate will be experienced in various massage techniques, facials, and body treatments. Must be knowledgeable about skincare products, maintain a calm demeanor, and create a relaxing environment for clients. Weekend availability required."
    },
    {
      title: "Friendly",
      description: "Spa technician wanted! Join our wellness team providing relaxing, therapeutic services. Experience in facials, massage, body treatments, or waxing preferred. We value therapists who create a soothing atmosphere and genuine care for clients' wellbeing. Competitive pay plus tips with loyal customer base."
    },
    {
      title: "Detailed",
      description: "Licensed esthetician/massage therapist position available at luxury spa. Must be certified in advanced techniques and demonstrate knowledge of anatomy, skincare science, and wellness practices. Experience with high-end product lines preferred. Must maintain detailed client records and provide personalized treatment recommendations."
    }
  ],
  receptionist: [
    {
      title: "Professional",
      description: "Salon receptionist needed to manage front desk operations. Responsibilities include scheduling appointments, greeting clients, answering phones, processing payments, and maintaining a clean reception area. Must have excellent customer service, organization, and multitasking abilities. Previous salon or retail experience preferred."
    },
    {
      title: "Friendly",
      description: "Salon receptionist wanted! Become the welcoming face of our business. You'll greet clients, manage appointments, handle phone calls, and process payments. We're looking for someone organized, friendly, and who thrives in a busy environment. Computer skills and a passion for the beauty industry are big pluses!"
    },
    {
      title: "Detailed",
      description: "Front desk coordinator needed for busy salon. Responsibilities include managing the appointment book, client communications, inventory control, retail sales, and maintaining salon cleanliness. Must be proficient with salon software, have exceptional phone etiquette, and ability to upsell services and products. Weekend availability required."
    }
  ],
  other: [
    {
      title: "Professional",
      description: "Beauty professional wanted for established salon. The ideal candidate will be licensed, experienced, and passionate about delivering excellent service. Must be reliable, client-focused, and ready to contribute to a team environment. Compensation based on experience and performance."
    },
    {
      title: "Friendly",
      description: "Join our beauty team! We're looking for talented professionals who love making clients look and feel their best. Bring your skills, positive attitude, and creativity to our welcoming salon. Competitive compensation, flexible hours, and a supportive work environment await the right candidate!"
    },
    {
      title: "Detailed",
      description: "Beauty industry position available for qualified professional. Must be licensed, experienced, and knowledgeable about current trends and techniques. Strong technical skills, attention to detail, and excellent client communication required. Must maintain accurate service records and contribute to salon cleanliness and organization."
    }
  ]
};

// Vietnamese polished descriptions
export const POLISHED_DESCRIPTIONS_VI = {
  nail: [
    {
      title: "Chuyên nghiệp",
      description: "Chúng tôi đang tìm kiếm một thợ nail có kỹ năng để tham gia vào đội ngũ của chúng tôi. Ứng viên lý tưởng sẽ có kinh nghiệm với manicure, pedicure và nail extension. Bạn nên chú ý đến chi tiết, sáng tạo và cam kết cung cấp dịch vụ khách hàng xuất sắc. Kiến thức về gel, acrylic và kỹ thuật nail art chuyên biệt là một lợi thế."
    },
    {
      title: "Thân thiện",
      description: "Đang tìm thợ nail thân thiện để trở thành một phần của gia đình salon chúng tôi! Nếu bạn yêu thích việc tạo ra những bộ móng đẹp và xây dựng mối quan hệ với khách hàng, chúng tôi muốn gặp bạn. Yêu cầu có kinh nghiệm với manicure, pedicure và extensions. Chúng tôi cung cấp mức lương cạnh tranh, giờ làm việc linh hoạt và môi trường đội ngũ hỗ trợ."
    },
    {
      title: "Chi tiết",
      description: "Cần thợ nail có kinh nghiệm cho salon bận rộn. Phải có kỹ năng về manicure, pedicure, gel, acrylic, dip powder và nail art cơ bản. Yêu cầu chú ý chi tiết và quản lý thời gian tốt. Phải duy trì không gian làm việc sạch sẽ, vệ sinh và cung cấp dịch vụ khách hàng xuất sắc. Có phúc lợi sức khỏe cho vị trí toàn thời gian."
    }
  ],
  hair: [
    {
      title: "Chuyên nghiệp",
      description: "Cần thợ tóc có kinh nghiệm cho salon cao cấp. Chúng tôi tìm kiếm ứng viên có chuyên môn đã được chứng minh trong cắt, nhuộm và tạo kiểu cho các loại tóc đa dạng. Ứng viên lý tưởng sẽ có kỹ năng giao tiếp xuất sắc, tầm nhìn sáng tạo và khả năng xây dựng nhóm khách hàng trung thành. Có cơ hội đào tạo nâng cao."
    },
    {
      title: "Thân thiện",
      description: "Tham gia vào đội ngũ salon tóc của chúng tôi! Chúng tôi đang tìm kiếm một stylist tài năng, người tạo ra những kiểu tóc tuyệt vời trong khi khiến khách hàng cảm thấy được chào đón và trân trọng. Yêu cầu kinh nghiệm với cắt, nhuộm và tạo kiểu. Chúng tôi cung cấp hoa hồng cạnh tranh, lịch làm việc linh hoạt và môi trường làm việc vui vẻ."
    },
    {
      title: "Chi tiết",
      description: "Vị trí thợ tóc có sẵn tại salon đã thành lập. Phải thành thạo trong cắt tóc chính xác, kỹ thuật màu nâng cao, balayage, highlight và xu hướng tạo kiểu hiện tại. Yêu cầu kinh nghiệm với các kết cấu tóc đa dạng. Phải chú ý đến chi tiết với quản lý thời gian xuất sắc. Dựa trên hoa hồng với tiềm năng thưởng hiệu suất."
    }
  ],
  spa: [
    {
      title: "Chuyên nghiệp",
      description: "Cần nhân viên massage/thẩm mỹ có giấy phép cho spa đang phát triển. Ứng viên lý tưởng sẽ có kinh nghiệm trong các kỹ thuật massage, chăm sóc da mặt và điều trị cơ thể khác nhau. Phải có kiến thức về sản phẩm chăm sóc da, duy trì thái độ bình tĩnh và tạo môi trường thư giãn cho khách hàng. Yêu cầu làm việc cuối tuần."
    },
    {
      title: "Thân thiện",
      description: "Cần kỹ thuật viên spa! Tham gia vào đội ngũ wellness của chúng tôi cung cấp các dịch vụ thư giãn, trị liệu. Ưu tiên có kinh nghiệm về chăm sóc da mặt, massage, điều trị cơ thể hoặc waxing. Chúng tôi đánh giá cao các nhà trị liệu tạo ra bầu không khí dễ chịu và quan tâm chân thành đến sức khỏe của khách hàng. Lương cạnh tranh cộng tiền tip với cơ sở khách hàng trung thành."
    },
    {
      title: "Chi tiết",
      description: "Vị trí thẩm mỹ viên/nhân viên massage có giấy phép có sẵn tại spa cao cấp. Phải được chứng nhận về các kỹ thuật nâng cao và thể hiện kiến thức về giải phẫu, khoa học chăm sóc da và thực hành sức khỏe. Ưu tiên có kinh nghiệm với các dòng sản phẩm cao cấp. Phải duy trì hồ sơ khách hàng chi tiết và cung cấp các khuyến nghị điều trị cá nhân hóa."
    }
  ],
  receptionist: [
    {
      title: "Chuyên nghiệp",
      description: "Cần lễ tân salon để quản lý hoạt động tiếp tân. Trách nhiệm bao gồm lên lịch hẹn, chào đón khách, trả lời điện thoại, xử lý thanh toán và duy trì khu vực tiếp tân sạch sẽ. Phải có dịch vụ khách hàng xuất sắc, khả năng tổ chức và đa nhiệm. Ưu tiên có kinh nghiệm salon hoặc bán lẻ trước đó."
    },
    {
      title: "Thân thiện",
      description: "Cần lễ tân salon! Trở thành khuôn mặt chào đón của doanh nghiệp chúng tôi. Bạn sẽ chào đón khách hàng, quản lý cuộc hẹn, xử lý cuộc gọi điện thoại và xử lý thanh toán. Chúng tôi đang tìm kiếm người có tổ chức, thân thiện và phát triển trong môi trường bận rộn. Kỹ năng máy tính và niềm đam mê với ngành công nghiệp làm đẹp là những lợi thế lớn!"
    },
    {
      title: "Chi tiết",
      description: "Cần điều phối viên tiếp tân cho salon bận rộn. Trách nhiệm bao gồm quản lý sổ hẹn, liên lạc với khách hàng, kiểm soát hàng tồn kho, bán lẻ và duy trì sự sạch sẽ của salon. Phải thành thạo với phần mềm salon, có phong cách điện thoại nổi bật và khả năng bán thêm dịch vụ và sản phẩm. Yêu cầu làm việc cuối tuần."
    }
  ],
  other: [
    {
      title: "Chuyên nghiệp",
      description: "Cần chuyên gia làm đẹp cho salon đã thành lập. Ứng viên lý tưởng sẽ có giấy phép, kinh nghiệm và đam mê cung cấp dịch vụ xuất sắc. Phải đáng tin cậy, tập trung vào khách hàng và sẵn sàng đóng góp cho môi trường làm việc nhóm. Thù lao dựa trên kinh nghiệm và hiệu suất."
    },
    {
      title: "Thân thiện",
      description: "Tham gia vào đội ngũ làm đẹp của chúng tôi! Chúng tôi đang tìm kiếm các chuyên gia tài năng yêu thích việc làm cho khách hàng trông đẹp và cảm thấy tốt nhất. Mang kỹ năng, thái độ tích cực và sáng tạo của bạn đến salon thân thiện của chúng tôi. Thù lao cạnh tranh, giờ làm việc linh hoạt và môi trường làm việc hỗ trợ đang chờ đợi ứng viên phù hợp!"
    },
    {
      title: "Chi tiết",
      description: "Vị trí trong ngành làm đẹp có sẵn cho chuyên gia đủ điều kiện. Phải có giấy phép, kinh nghiệm và hiểu biết về xu hướng và kỹ thuật hiện tại. Yêu cầu kỹ năng kỹ thuật mạnh mẽ, chú ý đến chi tiết và giao tiếp với khách hàng xuất sắc. Phải duy trì hồ sơ dịch vụ chính xác và đóng góp vào sự sạch sẽ và tổ chức của salon."
    }
  ]
};

// UI translations for polish modal
export const POLISH_UI_TRANSLATIONS = {
  en: {
    title: "AI Polished Descriptions",
    subtitle: "Choose a professionally written job description that fits your needs",
    selectStyle: "Select a Style",
    preview: "Preview",
    cancel: "Cancel",
    useStyle: "Use This Style"
  },
  vi: {
    title: "Mô tả được hoàn thiện bởi AI",
    subtitle: "Chọn một mô tả công việc viết chuyên nghiệp phù hợp với nhu cầu của bạn",
    selectStyle: "Chọn phong cách",
    preview: "Xem trước",
    cancel: "Hủy",
    useStyle: "Sử dụng phong cách này"
  }
};
