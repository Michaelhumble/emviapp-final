
import { IndustryType } from './jobFormSchema';
import { JobFormValues } from './jobFormSchema';

interface JobTemplate {
  title: string;
  description: string;
  salary_range: string;
  jobType: string;
  experience_level: string;
}

// Job templates by industry
export const jobTemplates: Record<IndustryType, JobTemplate> = {
  nails: {
    title: "Experienced Nail Technician Needed for Upscale Salon",
    description: "We are seeking skilled nail technicians to join our team. Must have experience with acrylic, gel, dip powder, and nail art. Friendly attitude and attention to detail required.",
    salary_range: "$800-1200/week + tips",
    jobType: "full-time",
    experience_level: "experienced"
  },
  hair: {
    title: "Hair Stylist with Color Expertise for Busy Salon",
    description: "Join our team of creative professionals. Looking for stylists with skills in cutting, coloring, and styling. Experience with balayage and modern techniques preferred.",
    salary_range: "$1000-1500/week + commission",
    jobType: "full-time",
    experience_level: "experienced"
  },
  lashes: {
    title: "Lash Artist for Growing Beauty Studio",
    description: "Skilled and certified lash technician needed for our expanding beauty studio. Experience with classic and volume lashes required. Strong attention to detail a must.",
    salary_range: "$700-1000/week + tips",
    jobType: "full-time",
    experience_level: "intermediate"
  },
  massage: {
    title: "Licensed Massage Therapist for Day Spa",
    description: "Now hiring licensed massage therapists. Experience with deep tissue, Swedish, and hot stone techniques preferred. Professional demeanor and client-focused approach required.",
    salary_range: "$800-1200/week + tips",
    jobType: "full-time",
    experience_level: "experienced"
  },
  tattoo: {
    title: "Experienced Tattoo Artist for Established Studio",
    description: "Creative tattoo artist with a strong portfolio needed for our busy studio. Must be proficient in various styles and techniques. Client-focused attitude required.",
    salary_range: "Commission-based, earning potential $1500-2500/week",
    jobType: "full-time",
    experience_level: "senior"
  },
  brows: {
    title: "Microblading Artist for Premium Beauty Clinic",
    description: "Certified microblading artist needed for high-end beauty clinic. Experience with ombré brows and other permanent makeup techniques is a plus. Attention to detail is essential.",
    salary_range: "$800-1200/week + commission",
    jobType: "full-time",
    experience_level: "experienced"
  },
  skincare: {
    title: "Licensed Esthetician for Luxury Spa",
    description: "Join our team of skincare experts. Experience with facials, chemical peels, and skin treatments required. Knowledge of medical-grade skincare products preferred.",
    salary_range: "$700-1000/week + commission",
    jobType: "full-time",
    experience_level: "intermediate"
  }
};

// AI polish suggestions by industry for English
export const aiPolishSuggestions: Record<IndustryType, string[]> = {
  nails: [
    "Enhance description with client experience focus",
    "Add details about special benefits",
    "Mention team atmosphere and culture",
    "Highlight growth opportunities",
    "Add specific skill requirements",
    "Emphasize earning potential",
    "Include client base description",
    "Add training opportunities"
  ],
  hair: [
    "Emphasize creative environment",
    "Add salon clientele details",
    "Mention product lines used",
    "Highlight continuing education",
    "Add social media promotion opportunities",
    "Include benefits package details",
    "Mention styling for special events",
    "Add team culture description"
  ],
  lashes: [
    "Add certification requirements",
    "Emphasize client satisfaction",
    "Include growth potential",
    "Mention studio atmosphere",
    "Add product quality details",
    "Include client retention focus",
    "Highlight sanitation standards",
    "Mention training opportunities"
  ],
  massage: [
    "Add wellness philosophy",
    "Include client type details",
    "Mention relaxing environment",
    "Highlight work-life balance",
    "Add specialized techniques needed",
    "Include continuing education",
    "Emphasize client care approach",
    "Add team support structure"
  ],
  tattoo: [
    "Emphasize artistic freedom",
    "Add portfolio requirements",
    "Include studio reputation details",
    "Mention client base description",
    "Highlight sanitation standards",
    "Add specialization opportunities",
    "Include guest artist possibilities",
    "Mention social media presence"
  ],
  brows: [
    "Add certification requirements",
    "Emphasize precision and detail",
    "Include before/after portfolio focus",
    "Mention high-end clientele",
    "Add advanced technique details",
    "Include product knowledge requirements",
    "Highlight consultation skills",
    "Mention training opportunities"
  ],
  skincare: [
    "Emphasize knowledge of skin conditions",
    "Add product line details",
    "Include client education focus",
    "Mention spa environment",
    "Highlight advanced treatment skills",
    "Add medical spa cooperation",
    "Include retail sales opportunities",
    "Mention continuing education"
  ]
};

// AI polish suggestions by industry for Vietnamese
export const aiPolishSuggestionsVietnamese: Record<IndustryType, string[]> = {
  nails: [
    "Làm nổi bật trải nghiệm khách hàng",
    "Thêm chi tiết về phúc lợi đặc biệt",
    "Đề cập đến bầu không khí và văn hóa nhóm",
    "Nhấn mạnh cơ hội phát triển",
    "Thêm yêu cầu kỹ năng cụ thể",
    "Nhấn mạnh tiềm năng thu nhập",
    "Mô tả về cơ sở khách hàng",
    "Thêm cơ hội đào tạo"
  ],
  hair: [
    "Nhấn mạnh môi trường sáng tạo",
    "Thêm chi tiết về khách hàng salon",
    "Đề cập đến các dòng sản phẩm sử dụng",
    "Nhấn mạnh đào tạo liên tục",
    "Thêm cơ hội quảng bá trên mạng xã hội",
    "Bao gồm chi tiết gói phúc lợi",
    "Đề cập đến tạo kiểu cho các sự kiện đặc biệt",
    "Thêm mô tả văn hóa đội nhóm"
  ],
  lashes: [
    "Thêm yêu cầu về chứng chỉ",
    "Nhấn mạnh sự hài lòng của khách hàng",
    "Bao gồm tiềm năng phát triển",
    "Đề cập đến không khí studio",
    "Thêm chi tiết về chất lượng sản phẩm",
    "Bao gồm trọng tâm giữ chân khách hàng",
    "Nhấn mạnh tiêu chuẩn vệ sinh",
    "Đề cập đến cơ hội đào tạo"
  ],
  massage: [
    "Thêm triết lý về sức khỏe",
    "Bao gồm chi tiết về loại khách hàng",
    "Đề cập đến môi trường thư giãn",
    "Nhấn mạnh cân bằng công việc-cuộc sống",
    "Thêm kỹ thuật chuyên biệt cần thiết",
    "Bao gồm đào tạo liên tục",
    "Nhấn mạnh phương pháp chăm sóc khách hàng",
    "Thêm cơ cấu hỗ trợ đội nhóm"
  ],
  tattoo: [
    "Nhấn mạnh tự do nghệ thuật",
    "Thêm yêu cầu về tác phẩm",
    "Bao gồm chi tiết về uy tín studio",
    "Đề cập đến mô tả cơ sở khách hàng",
    "Nhấn mạnh tiêu chuẩn vệ sinh",
    "Thêm cơ hội chuyên môn hóa",
    "Bao gồm khả năng nghệ sĩ khách mời",
    "Đề cập đến sự hiện diện trên mạng xã hội"
  ],
  brows: [
    "Thêm yêu cầu chứng chỉ",
    "Nhấn mạnh độ chính xác và chi tiết",
    "Bao gồm tập trung vào tác phẩm trước/sau",
    "Đề cập đến khách hàng cao cấp",
    "Thêm chi tiết kỹ thuật nâng cao",
    "Bao gồm yêu cầu kiến thức sản phẩm",
    "Nhấn mạnh kỹ năng tư vấn",
    "Đề cập đến cơ hội đào tạo"
  ],
  skincare: [
    "Nhấn mạnh kiến thức về tình trạng da",
    "Thêm chi tiết dòng sản phẩm",
    "Bao gồm trọng tâm giáo dục khách hàng",
    "Đề cập đến môi trường spa",
    "Nhấn mạnh kỹ năng điều trị nâng cao",
    "Thêm hợp tác spa y tế",
    "Bao gồm cơ hội bán lẻ",
    "Đề cập đến đào tạo liên tục"
  ]
};
