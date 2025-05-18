
import { JobFormValues, IndustryType } from './jobFormSchema';

// Define the industry type properly
export type { IndustryType };

// Template suggestions for AI polish (disabled as per requirements)
export const aiPolishSuggestions: Record<IndustryType, string[]> = {
  nails: [
    "Highlight exceptional nail art skills",
    "Emphasize clean, hygienic work environment",
    "Mention ability to work with different nail types"
  ],
  hair: [
    "Showcase color technique expertise",
    "Emphasize cutting-edge styling knowledge",
    "Highlight client consultation skills"
  ],
  lashes: [
    "Emphasize precision and attention to detail",
    "Highlight knowledge of different lash techniques",
    "Mention client safety and comfort focus"
  ],
  massage: [
    "Focus on therapeutic techniques",
    "Emphasize client relaxation experience",
    "Mention specialized modalities"
  ],
  tattoo: [
    "Highlight artistic capabilities",
    "Emphasize cleanliness and safety protocols",
    "Showcase versatility in styles"
  ],
  brows: [
    "Emphasize precision and symmetry skills",
    "Highlight knowledge of different brow techniques",
    "Mention attention to facial features"
  ],
  skincare: [
    "Focus on skincare knowledge",
    "Emphasize personalized treatment capabilities",
    "Highlight product expertise"
  ]
};

export const aiPolishSuggestionsVietnamese: Record<IndustryType, string[]> = {
  nails: [
    "Nhấn mạnh kỹ năng làm móng nghệ thuật xuất sắc",
    "Nhấn mạnh môi trường làm việc sạch sẽ, vệ sinh",
    "Đề cập đến khả năng làm việc với các loại móng khác nhau"
  ],
  hair: [
    "Thể hiện chuyên môn kỹ thuật màu sắc",
    "Nhấn mạnh kiến thức phong cách hiện đại",
    "Nhấn mạnh kỹ năng tư vấn khách hàng"
  ],
  lashes: [
    "Nhấn mạnh sự chính xác và chú ý đến chi tiết",
    "Nêu bật kiến thức về các kỹ thuật mi khác nhau",
    "Đề cập đến sự an toàn và thoải mái của khách hàng"
  ],
  massage: [
    "Tập trung vào các kỹ thuật trị liệu",
    "Nhấn mạnh trải nghiệm thư giãn của khách hàng",
    "Đề cập đến các phương pháp chuyên biệt"
  ],
  tattoo: [
    "Nhấn mạnh khả năng nghệ thuật",
    "Nhấn mạnh quy trình vệ sinh và an toàn",
    "Thể hiện sự linh hoạt trong các phong cách"
  ],
  brows: [
    "Nhấn mạnh kỹ năng chính xác và đối xứng",
    "Nêu bật kiến thức về các kỹ thuật lông mày khác nhau",
    "Đề cập đến sự chú ý đến đặc điểm khuôn mặt"
  ],
  skincare: [
    "Tập trung vào kiến thức chăm sóc da",
    "Nhấn mạnh khả năng điều trị cá nhân hóa",
    "Nêu bật chuyên môn về sản phẩm"
  ]
};

// Job templates for each industry
export const jobTemplates: Record<IndustryType | 'custom', JobFormValues> = {
  nails: {
    title: "Nail Technician Superstar",
    description: "Join our award-winning salon as a Nail Technician! We're looking for talented, friendly professionals who can deliver exceptional manicures, pedicures, and nail art. Our clients love getting pampered in our modern, clean environment, and we need someone who can maintain our high standards while bringing their own creative flair.",
    vietnameseDescription: "Tham gia cùng salon đạt giải thưởng của chúng tôi với vị trí Kỹ thuật viên Nail! Chúng tôi đang tìm kiếm các chuyên gia tài năng, thân thiện có thể cung cấp dịch vụ làm móng tay, móng chân và nghệ thuật móng xuất sắc. Khách hàng của chúng tôi thích được chăm sóc trong môi trường hiện đại, sạch sẽ của chúng tôi, và chúng tôi cần người có thể duy trì tiêu chuẩn cao của chúng tôi đồng thời mang đến phong cách sáng tạo riêng của họ.",
    location: "San Jose, CA",
    compensation_details: "$30-45/hr plus tips",
    salary_range: "$60,000-90,000/year",
    jobType: "full-time",
    experience_level: "experienced", 
    contactEmail: "manager@emviapp.com",
    requirements: [
      "2+ years experience in nail services",
      "Manicure and pedicure expertise",
      "Gel application proficiency",
      "Excellent customer service skills",
      "Weekend availability"
    ],
    specialties: ["Nail Art", "Gel Extensions", "Acrylic"]
  },
  hair: {
    title: "Creative Hair Stylist",
    description: "Looking for a talented Hair Stylist to join our vibrant team! We need someone passionate about creating beautiful styles, with excellent cutting, coloring, and styling skills. Our ideal candidate has a friendly personality, keeps up with the latest trends, and makes clients feel amazing about their hair.",
    vietnameseDescription: "Đang tìm kiếm một Stylist Tóc tài năng để tham gia vào đội ngũ năng động của chúng tôi! Chúng tôi cần người đam mê tạo ra những kiểu tóc đẹp, có kỹ năng cắt, nhuộm và tạo kiểu tuyệt vời. Ứng viên lý tưởng của chúng tôi có tính cách thân thiện, cập nhật các xu hướng mới nhất và làm cho khách hàng cảm thấy tuyệt vời về mái tóc của họ.",
    location: "Orange County, CA",
    compensation_details: "$25-40/hr + commissions",
    salary_range: "$55,000-80,000/year",
    jobType: "full-time",
    experience_level: "intermediate",
    contactEmail: "careers@emviapp.com",
    requirements: [
      "Cosmetology license required",
      "2+ years salon experience",
      "Strong cutting and coloring skills",
      "Knowledge of current hair trends",
      "Portfolio of work preferred"
    ],
    specialties: ["Balayage", "Color Correction", "Bridal Styling"]
  },
  lashes: {
    title: "Expert Lash Artist",
    description: "Join our luxury beauty studio as a Lash Artist! We're looking for a detail-oriented professional with experience in classic and volume lash extensions. Our clients expect perfection, and we need someone with steady hands, patience, and an eye for enhancing natural beauty.",
    vietnameseDescription: "Tham gia studio làm đẹp cao cấp của chúng tôi với vị trí Nghệ sĩ Mi! Chúng tôi đang tìm kiếm một chuyên gia chú ý đến chi tiết với kinh nghiệm về nối mi classic và volume. Khách hàng của chúng tôi mong đợi sự hoàn hảo, và chúng tôi cần người có bàn tay vững vàng, kiên nhẫn và có con mắt nâng cao vẻ đẹp tự nhiên.",
    location: "Westminster, CA",
    compensation_details: "$25-35/hr plus tips",
    salary_range: "$50,000-70,000/year",
    jobType: "part-time",
    experience_level: "experienced",
    contactEmail: "hiring@emviapp.com",
    requirements: [
      "Lash certification required",
      "1+ year experience with lash extensions",
      "Knowledge of different lash techniques",
      "Attention to detail and steady hands",
      "Excellent time management"
    ],
    specialties: ["Classic Lashes", "Volume Lashes", "Hybrid Sets"]
  },
  massage: {
    title: "Licensed Massage Therapist",
    description: "We're seeking a skilled Massage Therapist to provide relaxing and therapeutic treatments to our valued clients. The ideal candidate has excellent knowledge of various massage techniques, a healing touch, and the ability to customize treatments based on client needs.",
    vietnameseDescription: "Chúng tôi đang tìm kiếm một Chuyên viên Massage có kỹ năng để cung cấp các liệu pháp thư giãn và trị liệu cho khách hàng quý giá của chúng tôi. Ứng viên lý tưởng có kiến thức xuất sắc về các kỹ thuật massage khác nhau, bàn tay chữa lành và khả năng tùy chỉnh liệu pháp dựa trên nhu cầu của khách hàng.",
    location: "Garden Grove, CA",
    compensation_details: "$25-40/hr plus tips",
    salary_range: "$55,000-75,000/year",
    jobType: "full-time",
    experience_level: "experienced",
    contactEmail: "spa@emviapp.com",
    requirements: [
      "State massage therapy license",
      "500+ hours of certified training",
      "2+ years of professional experience",
      "Knowledge of multiple modalities",
      "Excellent client communication"
    ],
    specialties: ["Deep Tissue", "Swedish", "Hot Stone", "Sports Massage"]
  },
  tattoo: {
    title: "Talented Tattoo Artist",
    description: "Creative tattoo studio seeking an experienced artist to join our team. We're looking for someone with a strong portfolio, excellent linework and shading skills, and the ability to create custom designs that exceed client expectations. Must be professional, hygienic, and passionate about the art of tattooing.",
    vietnameseDescription: "Studio xăm sáng tạo đang tìm kiếm một nghệ sĩ có kinh nghiệm để tham gia vào đội ngũ của chúng tôi. Chúng tôi đang tìm kiếm người có danh mục đầu tư mạnh mẽ, kỹ năng vẽ đường nét và tô bóng xuất sắc và khả năng tạo ra các thiết kế tùy chỉnh vượt quá mong đợi của khách hàng. Phải chuyên nghiệp, vệ sinh và đam mê nghệ thuật xăm.",
    location: "Los Angeles, CA",
    compensation_details: "Commission-based (50-70%)",
    salary_range: "$60,000-120,000/year",
    jobType: "full-time",
    experience_level: "experienced",
    contactEmail: "art@emviapp.com",
    requirements: [
      "3+ years professional tattooing experience",
      "Strong portfolio demonstrating versatility",
      "Knowledge of proper sterilization techniques",
      "Excellent customer service",
      "California tattoo license"
    ],
    specialties: ["Traditional", "Realism", "Watercolor", "Fine Line"]
  },
  brows: {
    title: "Brow Artist & Specialist",
    description: "High-end beauty studio looking for a talented Brow Artist to shape, tint, and transform our clients' eyebrows. We need someone skilled in multiple techniques with a keen eye for facial symmetry who can create personalized brow shapes to enhance each client's unique features.",
    vietnameseDescription: "Studio làm đẹp cao cấp đang tìm kiếm một Nghệ sĩ Lông mày tài năng để định hình, nhuộm và biến đổi lông mày của khách hàng. Chúng tôi cần người có kỹ năng trong nhiều kỹ thuật với con mắt nhạy bén về sự đối xứng của khuôn mặt, người có thể tạo ra hình dạng lông mày được cá nhân hóa để nâng cao các đặc điểm độc đáo của từng khách hàng.",
    location: "Irvine, CA",
    compensation_details: "$20-30/hr plus tips",
    salary_range: "$45,000-65,000/year",
    jobType: "full-time",
    experience_level: "intermediate",
    contactEmail: "beautystudio@emviapp.com",
    requirements: [
      "Certification in microblading preferred",
      "Experience with brow lamination",
      "Knowledge of brow shaping techniques",
      "Color theory understanding",
      "Excellent attention to detail"
    ],
    specialties: ["Microblading", "Brow Lamination", "Henna Brows", "Tinting"]
  },
  skincare: {
    title: "Licensed Esthetician",
    description: "Join our spa team as a Licensed Esthetician! We're seeking someone passionate about skincare who can provide facials, chemical peels, and skin treatments while educating clients about home care routines. The ideal candidate has excellent product knowledge and a gentle, effective approach to skin health.",
    vietnameseDescription: "Tham gia đội ngũ spa của chúng tôi với tư cách là Chuyên viên Thẩm mỹ có Giấy phép! Chúng tôi đang tìm kiếm người đam mê chăm sóc da, người có thể cung cấp các liệu pháp facial, peel hóa học và điều trị da đồng thời giáo dục khách hàng về các quy trình chăm sóc tại nhà. Ứng viên lý tưởng có kiến thức xuất sắc về sản phẩm và cách tiếp cận nhẹ nhàng, hiệu quả đối với sức khỏe làn da.",
    location: "Huntington Beach, CA",
    compensation_details: "$20-30/hr plus tips",
    salary_range: "$45,000-65,000/year",
    jobType: "part-time",
    experience_level: "entry",
    contactEmail: "spa@emviapp.com",
    requirements: [
      "Current esthetician license",
      "Knowledge of skincare products and ingredients",
      "Experience with various facial techniques",
      "Understanding of different skin types",
      "Excellent sanitation practices"
    ],
    specialties: ["Anti-aging Treatments", "Acne Treatments", "Chemical Peels"]
  },
  custom: {
    title: "",
    description: "",
    location: "",
    compensation_details: "",
    jobType: "full-time",
    experience_level: "experienced",
    contactEmail: "",
    requirements: [],
    specialties: []
  }
};

// Template card data with emojis and slogans
export interface TemplateCardData {
  id: IndustryType | 'custom';
  emoji: string;
  title: string;
  subtitle: string;
  slogan: string;
  bgColor: string;
}

export const templateCards: TemplateCardData[] = [
  {
    id: 'nails',
    emoji: '💅',
    title: 'Nail Tech Superstar',
    subtitle: 'Magic hands, happy clients',
    slogan: 'Find your salon soulmate!',
    bgColor: 'bg-gradient-to-br from-pink-50 to-pink-100'
  },
  {
    id: 'hair',
    emoji: '💇',
    title: 'Hair Stylist',
    subtitle: 'Cut, color, create magic',
    slogan: 'Grow your glam squad!',
    bgColor: 'bg-gradient-to-br from-indigo-50 to-indigo-100'
  },
  {
    id: 'lashes',
    emoji: '👁️',
    title: 'Lash Artist',
    subtitle: 'Eyes that mesmerize',
    slogan: 'Batting a thousand!',
    bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100'
  },
  {
    id: 'massage',
    emoji: '🧖',
    title: 'Massage Therapist',
    subtitle: 'Healing touch, relaxed clients',
    slogan: 'The perfect hands for your team!',
    bgColor: 'bg-gradient-to-br from-green-50 to-green-100'
  },
  {
    id: 'tattoo',
    emoji: '🎨',
    title: 'Tattoo Artist',
    subtitle: 'Permanent art, lasting impressions',
    slogan: 'Ink your success story!',
    bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100'
  },
  {
    id: 'brows',
    emoji: '✨',
    title: 'Brow Specialist',
    subtitle: 'Frame faces, boost confidence',
    slogan: 'Raise your brow game!',
    bgColor: 'bg-gradient-to-br from-amber-50 to-amber-100'
  },
  {
    id: 'skincare',
    emoji: '🧴',
    title: 'Esthetician',
    subtitle: 'Glowing skin, radiant results',
    slogan: 'Your clients will thank you!',
    bgColor: 'bg-gradient-to-br from-teal-50 to-teal-100'
  },
  {
    id: 'custom',
    emoji: '✏️',
    title: 'Create My Own',
    subtitle: 'Start from scratch',
    slogan: 'Feeling creative? Let\'s go!',
    bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100'
  }
];
