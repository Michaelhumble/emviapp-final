
import { IndustryType } from './jobFormSchema';

// Export IndustryType from jobFormSchema for proper access
export { IndustryType } from './jobFormSchema';

// Polish suggestions for each industry type in English
export const aiPolishSuggestions: Record<IndustryType, string[]> = {
  nail: [
    "Highlight competitive pay + flexible hours",
    "Emphasize opportunity for skill development",
    "Add bonus structure and commission details",
    "Mention team culture and workplace atmosphere"
  ],
  hair: [
    "Showcase commission structure and advancement path",
    "Emphasize creative freedom and education opportunities",
    "Highlight client base and booking consistency",
    "Add details about salon reputation and team culture"
  ],
  lashes: [
    "Emphasize clean, modern workspace environment",
    "Highlight training opportunities and skill development",
    "Detail competitive pay structure and client flow",
    "Mention flexibility and work-life balance benefits"
  ],
  massage: [
    "Emphasize peaceful work environment and client quality",
    "Detail hourly rates, tips, and benefits package",
    "Highlight booking consistency and client retention",
    "Mention continued education and specialization opportunities"
  ],
  tattoo: [
    "Highlight creative freedom and client diversity",
    "Emphasize studio reputation and artist exposure",
    "Detail commission structure and supply provisions",
    "Mention guest artist opportunities and conventions"
  ],
  brows: [
    "Showcase growing client demand and repeat bookings",
    "Emphasize training in latest techniques and products",
    "Highlight competitive pay and advancement opportunities",
    "Detail modern workspace and professional environment"
  ],
  skincare: [
    "Emphasize clean, spa-like work environment",
    "Detail product lines available and treatment options",
    "Highlight training opportunities and certification support",
    "Mention client retention rates and booking consistency"
  ]
};

// Polish suggestions for each industry type in Vietnamese
export const aiPolishSuggestionsVietnamese: Record<IndustryType, string[]> = {
  nail: [
    "Nhấn mạnh lương cạnh tranh + giờ làm việc linh hoạt",
    "Nhấn mạnh cơ hội phát triển kỹ năng",
    "Thêm cơ cấu thưởng và chi tiết hoa hồng",
    "Đề cập đến văn hóa nhóm và không khí nơi làm việc"
  ],
  hair: [
    "Giới thiệu cơ cấu hoa hồng và lộ trình thăng tiến",
    "Nhấn mạnh tự do sáng tạo và cơ hội học tập",
    "Nhấn mạnh cơ sở khách hàng và tính nhất quán trong đặt lịch",
    "Thêm thông tin về uy tín của salon và văn hóa đội nhóm"
  ],
  lashes: [
    "Nhấn mạnh môi trường làm việc sạch sẽ, hiện đại",
    "Nhấn mạnh cơ hội đào tạo và phát triển kỹ năng",
    "Chi tiết cấu trúc lương cạnh tranh và lượng khách",
    "Đề cập đến lợi ích linh hoạt và cân bằng công việc-cuộc sống"
  ],
  massage: [
    "Nhấn mạnh môi trường làm việc yên bình và chất lượng khách hàng",
    "Chi tiết mức lương theo giờ, tiền tip và gói phúc lợi",
    "Nhấn mạnh tính nhất quán trong đặt lịch và giữ chân khách hàng",
    "Đề cập đến giáo dục liên tục và cơ hội chuyên môn hóa"
  ],
  tattoo: [
    "Nhấn mạnh tự do sáng tạo và sự đa dạng của khách hàng",
    "Nhấn mạnh uy tín của studio và sự xuất hiện của nghệ sĩ",
    "Chi tiết cơ cấu hoa hồng và cung cấp vật tư",
    "Đề cập đến cơ hội nghệ sĩ khách mời và các hội nghị"
  ],
  brows: [
    "Giới thiệu nhu cầu khách hàng ngày càng tăng và đặt lịch lặp lại",
    "Nhấn mạnh đào tạo về các kỹ thuật và sản phẩm mới nhất",
    "Nhấn mạnh lương cạnh tranh và cơ hội thăng tiến",
    "Chi tiết không gian làm việc hiện đại và môi trường chuyên nghiệp"
  ],
  skincare: [
    "Nhấn mạnh môi trường làm việc sạch sẽ, giống như spa",
    "Chi tiết các dòng sản phẩm có sẵn và các lựa chọn điều trị",
    "Nhấn mạnh cơ hội đào tạo và hỗ trợ chứng nhận",
    "Đề cập đến tỷ lệ giữ chân khách hàng và tính nhất quán trong đặt lịch"
  ]
};

// Add job templates to be exported
export const jobTemplates: Record<IndustryType, {
  title: string;
  description: string;
  salary_range: string;
  jobType: string;
  experience_level: string;
}> = {
  nail: {
    title: "Experienced Nail Technician - Competitive Pay & Flexible Hours",
    description: "We are looking for skilled nail technicians to join our growing team. Our modern salon offers a friendly atmosphere, steady client flow, and opportunities for growth. We value creativity and attention to detail.",
    salary_range: "$800-1200/week + tips",
    jobType: "full-time",
    experience_level: "experienced"
  },
  hair: {
    title: "Hair Stylist with Following - High Commission",
    description: "Join our upscale salon as a creative hair stylist. We offer excellent commission, flexible scheduling, and continuous education opportunities. Bring your clients and grow your career with us.",
    salary_range: "60% Commission + Retail Bonus",
    jobType: "full-time",
    experience_level: "experienced"
  },
  lashes: {
    title: "Certified Lash Technician - Modern Studio Environment",
    description: "Looking for a dedicated lash artist to join our specialized studio. We provide all high-quality supplies, booking management, and marketing support to keep your schedule full.",
    salary_range: "$25-35/hr + tips",
    jobType: "part-time",
    experience_level: "intermediate"
  },
  massage: {
    title: "Licensed Massage Therapist - Upscale Spa Setting",
    description: "Join our wellness center as a massage therapist in a peaceful, client-focused environment. We provide linens, high-quality oils, booking management, and a tranquil workspace.",
    salary_range: "$30-50/hr + gratuity",
    jobType: "part-time",
    experience_level: "intermediate"
  },
  tattoo: {
    title: "Tattoo Artist - Guest Spot Available",
    description: "Well-established tattoo studio seeking artists for guest spots with potential for permanent position. We offer a clean, modern environment with existing client base and social media promotion.",
    salary_range: "70/30 Split",
    jobType: "contract",
    experience_level: "experienced"
  },
  brows: {
    title: "Microblading Artist - High End Clientele",
    description: "Seeking experienced microblading and brow specialist for our luxury beauty studio. Must be certified with portfolio of consistent, natural-looking results. Join our team of professionals.",
    salary_range: "$50-65/hr or commission",
    jobType: "part-time",
    experience_level: "experienced"
  },
  skincare: {
    title: "Esthetician - Medical Spa Setting",
    description: "Join our medical spa team as a licensed esthetician. Experience with chemical peels, microdermabrasion, and advanced skin treatments preferred. Training provided for specialized treatments.",
    salary_range: "$18-25/hr + commission on products",
    jobType: "full-time",
    experience_level: "intermediate"
  }
};
