
import { JobFormValues } from "./jobFormSchema";

// Use export type for re-exporting types with isolatedModules
export type { IndustryType } from "./jobFormSchema";

// Export the AI polish suggestions
export const aiPolishSuggestions: Record<string, string[]> = {
  nails: [
    "Expert nail technicians with 3+ years of experience needed for high-end salon",
    "Seeking skilled nail artist for busy salon, competitive commission offered",
    "Join our award-winning team! Nail technician position available",
    "Experienced nail technician needed for full-time position in luxury spa",
    "Now hiring: Professional nail tech with gel and acrylic experience"
  ],
  hair: [
    "Hair stylist wanted for upscale salon, must have color and cutting expertise",
    "Experienced hair professional needed for growing salon, flexible hours",
    "Join our dynamic team as a senior hair stylist, commission + benefits",
    "Hair colorist position available at top-rated salon, portfolio required",
    "Seeking talented hair stylist with loyal client base, booth rental available"
  ],
  lashes: [
    "Certified lash technician needed for boutique beauty studio",
    "Experienced lash artist wanted for full-time position, training provided",
    "Join our team of lash extension specialists, competitive pay",
    "Seeking skilled lash tech with 2+ years experience, flexible schedule",
    "Now hiring: Lash artist for upscale salon, commission negotiable"
  ],
  massage: [
    "Licensed massage therapist wanted for spa center, full-time hours",
    "Experienced massage therapist needed for wellness clinic, flexible schedule",
    "Join our team as a massage professional, competitive compensation",
    "Seeking massage therapist with deep tissue expertise, part-time available",
    "Now hiring: Massage therapist for luxury hotel spa, benefits included"
  ],
  tattoo: [
    "Professional tattoo artist needed for established studio",
    "Experienced tattoo artist wanted, must have portfolio",
    "Join our creative team of tattoo professionals, booth rental available",
    "Seeking talented tattoo artist with client following, competitive split",
    "Now hiring: Tattoo artist for busy studio, apprentice position also available"
  ],
  brows: [
    "Microblading artist needed for beauty studio, certification required",
    "Experienced brow specialist wanted for upscale salon",
    "Join our team of brow experts, PMU experience a plus",
    "Seeking skilled brow artist with threading and tinting experience",
    "Now hiring: Brow specialist for growing beauty bar, competitive pay"
  ],
  skincare: [
    "Licensed esthetician wanted for medical spa, dermaplane experience required",
    "Experienced skincare specialist needed for dermatology clinic",
    "Join our team as a skincare professional, product knowledge important",
    "Seeking skilled esthetician with facial and peel expertise",
    "Now hiring: Skincare expert for luxury spa, competitive pay + benefits"
  ]
};

// Export the Vietnamese version of AI polish suggestions
export const aiPolishSuggestionsVietnamese: Record<string, string[]> = {
  nails: [
    "Cần thợ nail có kinh nghiệm 3+ năm làm việc tại tiệm cao cấp",
    "Tìm thợ nail chuyên nghiệp cho tiệm đông khách, hoa hồng cạnh tranh",
    "Gia nhập đội ngũ từng đoạt giải thưởng! Có vị trí cho thợ nail",
    "Cần thợ nail có kinh nghiệm cho vị trí toàn thời gian tại spa cao cấp",
    "Đang tuyển: Thợ nail chuyên nghiệp có kinh nghiệm về gel và bột"
  ],
  hair: [
    "Cần thợ tóc cho tiệm cao cấp, phải có chuyên môn về màu và cắt",
    "Cần chuyên gia tóc có kinh nghiệm cho tiệm đang phát triển, giờ làm việc linh hoạt",
    "Gia nhập đội ngũ năng động của chúng tôi với tư cách là thợ tóc cao cấp, hoa hồng + phúc lợi",
    "Có vị trí cho thợ nhuộm tóc tại tiệm được xếp hạng hàng đầu, yêu cầu có portfolio",
    "Tìm kiếm thợ tóc tài năng có khách hàng trung thành, có bàn cho thuê"
  ],
  lashes: [
    "Cần thợ mi đã được chứng nhận cho studio làm đẹp boutique",
    "Cần thợ mi có kinh nghiệm cho vị trí toàn thời gian, có đào tạo",
    "Tham gia đội ngũ chuyên gia nối mi của chúng tôi, lương cạnh tranh",
    "Tìm thợ mi có kỹ năng với 2+ năm kinh nghiệm, lịch linh hoạt",
    "Đang tuyển: Thợ mi cho tiệm cao cấp, hoa hồng thương lượng"
  ],
  massage: [
    "Cần nhân viên massage có giấy phép cho trung tâm spa, giờ làm việc toàn thời gian",
    "Cần nhân viên massage có kinh nghiệm cho phòng khám sức khỏe, lịch linh hoạt",
    "Tham gia đội ngũ chuyên gia massage của chúng tôi, thù lao cạnh tranh",
    "Tìm kiếm nhân viên massage có chuyên môn về mô sâu, có thể làm việc bán thời gian",
    "Đang tuyển: Nhân viên massage cho spa khách sạn cao cấp, có phúc lợi"
  ],
  tattoo: [
    "Cần nghệ sĩ xăm chuyên nghiệp cho studio đã thành lập",
    "Cần nghệ sĩ xăm có kinh nghiệm, phải có portfolio",
    "Tham gia đội ngũ sáng tạo của các chuyên gia xăm, có bàn cho thuê",
    "Tìm nghệ sĩ xăm tài năng có khách hàng theo dõi, chia hoa hồng cạnh tranh",
    "Đang tuyển: Nghệ sĩ xăm cho studio bận rộn, cũng có vị trí cho người học việc"
  ],
  brows: [
    "Cần nghệ sĩ microblading cho studio làm đẹp, yêu cầu có chứng chỉ",
    "Cần chuyên gia về lông mày có kinh nghiệm cho tiệm cao cấp",
    "Tham gia đội ngũ chuyên gia về lông mày, kinh nghiệm PMU là một lợi thế",
    "Tìm nghệ sĩ lông mày có kỹ năng với kinh nghiệm về threading và nhuộm",
    "Đang tuyển: Chuyên gia lông mày cho beauty bar đang phát triển, lương cạnh tranh"
  ],
  skincare: [
    "Cần chuyên viên thẩm mỹ có giấy phép cho spa y tế, yêu cầu kinh nghiệm dermaplane",
    "Cần chuyên gia chăm sóc da có kinh nghiệm cho phòng khám da liễu",
    "Tham gia đội ngũ chúng tôi với tư cách là chuyên gia chăm sóc da, kiến thức sản phẩm quan trọng",
    "Tìm kiếm chuyên viên thẩm mỹ có kỹ năng với chuyên môn về facial và peel",
    "Đang tuyển: Chuyên gia chăm sóc da cho spa cao cấp, lương cạnh tranh + phúc lợi"
  ]
};

// Export example job templates
export const jobTemplates: Record<string, {
  title: string;
  description: string;
  salary_range: string;
  jobType: string;
  experience_level: string;
}> = {
  nails: {
    title: "Nail Technician / Thợ Nail - Full Time",
    description: "We are seeking experienced nail technicians to join our busy salon. Must be proficient in acrylic, gel, dip powder, and nail art. Great earning potential with commission and tips. Clean and friendly work environment.",
    salary_range: "$600-$1200/week",
    jobType: "full-time",
    experience_level: "intermediate"
  },
  hair: {
    title: "Hair Stylist / Thợ Tóc - Booth Rental Available",
    description: "Established salon looking for licensed hair stylists. Strong skills in cutting, coloring, and styling required. Booth rental or commission options available. Bring your clients or build your clientele with us.",
    salary_range: "$800-$1500/week",
    jobType: "full-time",
    experience_level: "experienced"
  },
  lashes: {
    title: "Eyelash Technician / Thợ Mi - Part Time",
    description: "Growing beauty studio seeks certified lash artists for classic and volume extensions. Clean, upscale environment with steady clientele. Flexible scheduling and competitive pay structure.",
    salary_range: "$500-$900/week",
    jobType: "part-time",
    experience_level: "intermediate"
  },
  massage: {
    title: "Massage Therapist / Thợ Massage - Full or Part Time",
    description: "Licensed massage therapists needed for established spa. Experience in deep tissue, Swedish, and hot stone preferred. Clients provided plus opportunity to build your own book. Relaxing work environment.",
    salary_range: "$700-$1300/week",
    jobType: "full-time",
    experience_level: "experienced"
  },
  tattoo: {
    title: "Tattoo Artist - Commission or Booth Rental",
    description: "Professional tattoo studio looking for experienced artists to join our team. Must have strong portfolio and client service skills. Good location with walk-ins and appointments. Equipment provided.",
    salary_range: "$1000-$2000/week",
    jobType: "full-time",
    experience_level: "experienced"
  },
  brows: {
    title: "Eyebrow Specialist / Thợ Chân Mày - Flexible Hours",
    description: "Seeking skilled brow artists with experience in microblading, threading, and tinting. PMU certification a plus. Growing clientele in upscale location. Commission-based with guaranteed minimum.",
    salary_range: "$600-$1100/week",
    jobType: "part-time",
    experience_level: "intermediate"
  },
  skincare: {
    title: "Esthetician / Thợ Facial - Full Time Position",
    description: "Medical spa seeking licensed estheticians with experience in facials, chemical peels, and other skin treatments. Knowledge of medical-grade skincare products required. Full benefits package available.",
    salary_range: "$700-$1200/week",
    jobType: "full-time",
    experience_level: "experienced"
  }
};
