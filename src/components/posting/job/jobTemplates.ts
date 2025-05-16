
import { IndustryType } from './jobFormSchema';

export interface JobTemplate {
  title: string;
  description: string;
  salary_range: string;
  jobType: string;
  experience_level: string;
}

// Job templates organized by industry type
export const jobTemplates: Record<IndustryType, JobTemplate> = {
  nails: {
    title: "Experienced Nail Technician - High Commission + Benefits",
    description: 
      "We are looking for a professional, detail-oriented nail technician to join our luxury salon. The ideal candidate has experience with acrylic, gel, and nail art techniques, and provides exceptional customer service. You'll work in a friendly team environment with a stable client base and opportunities for growth.\n\n" +
      "✓ Experience with acrylic & gel services required\n" +
      "✓ Nail art expertise highly valued\n" +
      "✓ Must maintain a clean, safe work environment\n" +
      "✓ Strong English communication skills preferred\n" +
      "✓ Valid cosmetology/nail tech license required",
    salary_range: "$700-1200/week + tips",
    jobType: "full-time",
    experience_level: "experienced"
  },
  hair: {
    title: "Creative Hair Stylist - High-End Salon",
    description: 
      "Join our award-winning salon as a hair stylist with opportunities for growth and creativity. We're seeking talented professionals who excel in cutting, coloring, and styling techniques for all hair types. Our collaborative environment encourages artistic expression while providing excellent compensation.\n\n" +
      "✓ Proficient in modern cutting & color techniques\n" +
      "✓ Experience with diverse hair textures and styles\n" +
      "✓ Strong client communication & consultation skills\n" +
      "✓ Portfolio of work preferred\n" +
      "✓ Valid cosmetology license required",
    salary_range: "$50-65K/year + commission",
    jobType: "full-time",
    experience_level: "experienced"
  },
  lashes: {
    title: "Lash Artist / Extension Specialist - Luxury Spa",
    description: 
      "We're expanding our premier beauty spa and looking for skilled lash artists to join our team. The ideal candidate has professional training in classic and volume techniques, with a meticulous eye for detail and client safety. You'll work with premium products in an upscale environment.\n\n" +
      "✓ Certified in classic and volume lash extensions\n" +
      "✓ Experience with various lash styles and techniques\n" +
      "✓ Excellent attention to detail and hygiene practices\n" +
      "✓ Strong client retention skills\n" +
      "✓ Esthetician license preferred",
    salary_range: "$25-35/hour + commission",
    jobType: "part-time",
    experience_level: "intermediate"
  },
  massage: {
    title: "Licensed Massage Therapist - Upscale Wellness Center",
    description: 
      "Our growing wellness center seeks licensed massage therapists to provide exceptional therapeutic services. We value therapists skilled in multiple modalities who can customize treatments to client needs. Join our supportive team environment with flexible scheduling and excellent compensation.\n\n" +
      "✓ Licensed massage therapist with 2+ years experience\n" +
      "✓ Proficient in Swedish, deep tissue, and sports massage\n" +
      "✓ Knowledge of anatomy and proper techniques\n" +
      "✓ Excellent communication and interpersonal skills\n" +
      "✓ Ability to maintain accurate client records",
    salary_range: "$60-80K/year",
    jobType: "full-time",
    experience_level: "experienced"
  },
  tattoo: {
    title: "Tattoo Artist - Creative Studio Environment",
    description: 
      "We're looking for a passionate tattoo artist to join our creative studio. The ideal candidate has a strong portfolio demonstrating versatility in styles, excellent drawing skills, and impeccable cleanliness standards. Our studio offers a collaborative environment and a steady client base.\n\n" +
      "✓ 3+ years professional tattooing experience\n" +
      "✓ Impressive portfolio showing range of styles\n" +
      "✓ Knowledge of sterilization and safety procedures\n" +
      "✓ Strong drawing and design skills\n" +
      "✓ Professional certification required",
    salary_range: "50/50 commission split",
    jobType: "full-time",
    experience_level: "experienced"
  },
  brows: {
    title: "Brow Specialist / Microblading Artist",
    description: 
      "We are seeking a skilled brow specialist with experience in threading, waxing, tinting, and microblading techniques. The ideal candidate will provide custom brow solutions for clients, maintain impeccable hygiene standards, and contribute to our salon's reputation for excellence.\n\n" +
      "✓ Certified in microblading and/or powder brows\n" +
      "✓ Experience with shaping, tinting, and waxing\n" +
      "✓ Knowledge of color theory and facial morphology\n" +
      "✓ Excellent attention to detail and cleanliness\n" +
      "✓ Portfolio of before/after work required",
    salary_range: "$30-40/hour + commission",
    jobType: "full-time",
    experience_level: "experienced"
  },
  skincare: {
    title: "Licensed Esthetician - Medical Spa",
    description: 
      "Our premier medical spa is looking for a licensed esthetician to join our team of skincare professionals. The ideal candidate is knowledgeable about advanced skincare treatments, has experience with medical-grade products, and excels at client consultation and education.\n\n" +
      "✓ Licensed esthetician with 2+ years experience\n" +
      "✓ Experience with chemical peels and microdermabrasion\n" +
      "✓ Knowledge of medical-grade skincare lines\n" +
      "✓ Strong client consultation and retention skills\n" +
      "✓ Experience with facial devices and technologies a plus",
    salary_range: "$50-65K/year + commission",
    jobType: "full-time",
    experience_level: "intermediate"
  }
};

// AI polish suggestions by industry
export const aiPolishSuggestions: Record<IndustryType, string[]> = {
  nails: [
    "Add details about your nail salon atmosphere and clientele",
    "Mention specific nail services you specialize in",
    "Include information about booth rental or commission structure",
    "Describe advancement opportunities for nail technicians",
    "Include details about supplies provided vs. technician-provided",
    "Mention if housing assistance is available",
    "Describe typical client spending and tipping habits",
    "Add specific nail art styles your salon is known for",
    "Mention if you offer nail training or certification",
    "Include information about salon schedule and peak hours"
  ],
  hair: [
    "Highlight your salon's atmosphere and client demographics",
    "Mention specific hair services your stylists perform",
    "Include details about product lines you use",
    "Describe advancement paths for stylists at your salon",
    "Add information about continued education opportunities",
    "Mention typical styling appointment frequency",
    "Include details about assistant or apprentice programs",
    "Describe specialties like extensions, curly hair, or coloring",
    "Mention if you have a social media presence for stylists",
    "Include information about chair rental vs. employee options"
  ],
  lashes: [
    "Describe your spa/salon atmosphere and client experience",
    "Mention the lash extension brands and products you use",
    "Include information about appointment scheduling and frequency",
    "Add details about required certification or training",
    "Mention if supplies and equipment are provided",
    "Include information about lash styles your clients prefer",
    "Describe your client retention and rebooking rates",
    "Mention any combination services with other treatments",
    "Include information about sanitation and safety protocols",
    "Describe marketing support for lash artists"
  ],
  massage: [
    "Describe your wellness center's philosophy and approach",
    "Mention specific massage modalities your clients request",
    "Include information about appointment length and frequency",
    "Describe your client demographics and common treatment goals",
    "Mention if you provide tables, oils, and other supplies",
    "Include information about breaks between appointments",
    "Describe marketing support for building clientele",
    "Mention integration with other wellness practitioners",
    "Include information about continuing education support",
    "Describe typical client retention and rebooking rates"
  ],
  tattoo: [
    "Describe your studio's artistic style and reputation",
    "Mention client demographics and popular tattoo styles",
    "Include details about studio equipment and supplies",
    "Describe guest artist opportunities and collaborations",
    "Mention portfolio building and social media support",
    "Include information about apprenticeship programs",
    "Describe commission structure and booth rental options",
    "Mention typical appointment scheduling and client volume",
    "Include information about studio hygiene standards",
    "Describe opportunities for convention attendance"
  ],
  brows: [
    "Describe your salon's clientele and brow service demand",
    "Mention specific brow techniques in highest demand",
    "Include details about service pricing and appointment duration",
    "Describe products and supplies provided vs. artist-provided",
    "Mention marketing support for client acquisition",
    "Include information about training on new techniques",
    "Describe typical client rebooking frequency",
    "Mention complementary services offered with brows",
    "Include information about required certification or training",
    "Describe commission structure or booth rental options"
  ],
  skincare: [
    "Describe your spa's skincare philosophy and approach",
    "Mention specific treatments and technology available",
    "Include details about product lines used in treatments",
    "Describe typical client concerns and treatment goals",
    "Mention retail sales commission opportunities",
    "Include information about client booking frequency",
    "Describe marketing support for building clientele",
    "Mention training provided on equipment and products",
    "Include information about treatment room setup",
    "Describe collaboration with medical professionals if applicable"
  ]
};

// Vietnamese AI polish suggestions by industry
export const aiPolishSuggestionsVietnamese: Record<IndustryType, string[]> = {
  nails: [
    "Thêm chi tiết về không gian tiệm và khách hàng mục tiêu",
    "Đề cập đến các dịch vụ nail đặc biệt của tiệm",
    "Thêm thông tin về cấu trúc hoa hồng hoặc thuê bàn",
    "Mô tả cơ hội thăng tiến cho thợ nail",
    "Nêu rõ dụng cụ nào do tiệm cung cấp và thợ tự mang",
    "Đề cập nếu có hỗ trợ chỗ ở",
    "Mô tả thói quen chi tiêu và tip của khách hàng",
    "Thêm các kiểu nail art tiệm chuyên làm",
    "Đề cập nếu tiệm có đào tạo hoặc cấp chứng chỉ",
    "Thêm thông tin về lịch làm việc và giờ cao điểm"
  ],
  hair: [
    "Nhấn mạnh không khí salon và đặc điểm khách hàng",
    "Đề cập các dịch vụ tóc cụ thể thợ sẽ thực hiện",
    "Thêm thông tin về các dòng sản phẩm salon sử dụng",
    "Mô tả lộ trình thăng tiến tại salon",
    "Thêm thông tin về cơ hội học tập nâng cao",
    "Đề cập tần suất đặt lịch làm tóc thông thường",
    "Thêm chi tiết về chương trình trợ lý hoặc học việc",
    "Mô tả các chuyên môn như nối tóc, tóc xoăn, nhuộm màu",
    "Đề cập nếu salon có hiện diện trên mạng xã hội cho stylist",
    "Thêm thông tin về thuê ghế hoặc làm nhân viên"
  ],
  lashes: [
    "Mô tả không gian spa/salon và trải nghiệm khách hàng",
    "Đề cập đến các thương hiệu mi và sản phẩm sử dụng",
    "Thêm thông tin về lịch hẹn và tần suất",
    "Bổ sung chi tiết về chứng chỉ hoặc đào tạo yêu cầu",
    "Đề cập nếu có cung cấp vật tư và thiết bị",
    "Thêm thông tin về kiểu mi khách hàng ưa thích",
    "Mô tả tỷ lệ giữ chân và đặt lại lịch của khách hàng",
    "Đề cập các dịch vụ kết hợp với các liệu pháp khác",
    "Thêm thông tin về quy trình vệ sinh và an toàn",
    "Mô tả hỗ trợ marketing cho nghệ sĩ mi"
  ],
  massage: [
    "Mô tả triết lý và cách tiếp cận của trung tâm",
    "Đề cập các phương pháp massage khách hàng yêu cầu",
    "Thêm thông tin về thời lượng và tần suất cuộc hẹn",
    "Mô tả đặc điểm khách hàng và mục tiêu điều trị phổ biến",
    "Đề cập nếu cung cấp bàn, dầu và vật tư khác",
    "Thêm thông tin về thời gian nghỉ giữa các cuộc hẹn",
    "Mô tả hỗ trợ marketing để xây dựng khách hàng",
    "Đề cập sự phối hợp với các chuyên gia wellness khác",
    "Thêm thông tin về hỗ trợ đào tạo liên tục",
    "Mô tả tỷ lệ giữ chân khách hàng điển hình"
  ],
  tattoo: [
    "Mô tả phong cách nghệ thuật và danh tiếng của studio",
    "Đề cập đặc điểm khách hàng và phong cách xăm phổ biến",
    "Thêm chi tiết về thiết bị và vật tư của studio",
    "Mô tả cơ hội nghệ sĩ khách mời và hợp tác",
    "Đề cập xây dựng portfolio và hỗ trợ mạng xã hội",
    "Thêm thông tin về chương trình học việc",
    "Mô tả cấu trúc hoa hồng và tùy chọn thuê chỗ",
    "Đề cập lịch hẹn điển hình và lượng khách hàng",
    "Thêm thông tin về tiêu chuẩn vệ sinh của studio",
    "Mô tả cơ hội tham dự hội nghị"
  ],
  brows: [
    "Mô tả khách hàng của salon và nhu cầu dịch vụ lông mày",
    "Đề cập các kỹ thuật lông mày có nhu cầu cao nhất",
    "Thêm chi tiết về giá dịch vụ và thời lượng cuộc hẹn",
    "Mô tả sản phẩm và vật tư được cung cấp",
    "Đề cập hỗ trợ marketing để thu hút khách hàng",
    "Thêm thông tin về đào tạo kỹ thuật mới",
    "Mô tả tần suất đặt lại lịch khách hàng điển hình",
    "Đề cập các dịch vụ bổ sung cùng với làm lông mày",
    "Thêm thông tin về chứng chỉ hoặc đào tạo yêu cầu",
    "Mô tả cấu trúc hoa hồng hoặc tùy chọn thuê chỗ"
  ],
  skincare: [
    "Mô tả triết lý và cách tiếp cận chăm sóc da của spa",
    "Đề cập các liệu pháp và công nghệ cụ thể hiện có",
    "Thêm chi tiết về dòng sản phẩm sử dụng trong điều trị",
    "Mô tả các vấn đề và mục tiêu điều trị phổ biến của khách hàng",
    "Đề cập cơ hội hoa hồng bán lẻ sản phẩm",
    "Thêm thông tin về tần suất đặt lịch của khách hàng",
    "Mô tả hỗ trợ marketing để xây dựng khách hàng",
    "Đề cập đào tạo về thiết bị và sản phẩm",
    "Thêm thông tin về thiết lập phòng điều trị",
    "Mô tả hợp tác với chuyên gia y tế nếu có"
  ]
};

export type IndustryType = 'nails' | 'hair' | 'lashes' | 'massage' | 'tattoo' | 'brows' | 'skincare';
