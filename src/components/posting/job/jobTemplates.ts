import { IndustryType, JobTemplate } from './jobFormSchema';

// Define templates for each industry
export const jobTemplates: JobTemplate[] = [
  // Nail industry templates
  {
    id: "nail-tech-1",
    title: "Nail Technician - All Levels Welcome",
    vietnameseTitle: "Thợ Nail - Mọi Cấp Độ Kinh Nghiệm",
    industry: "nails",
    location: "San Jose, CA",
    description: [
      "We are a busy nail salon in the heart of San Jose looking for talented nail technicians to join our team.",
      "Our salon offers a friendly working environment with a loyal client base. We provide ongoing training and development opportunities.",
      "Looking for technicians who can provide excellent customer service and quality nail services including manicures, pedicures, gel polish, and nail art."
    ],
    vietnameseDescription: [
      "Chúng tôi là một tiệm nail bận rộn ở trung tâm San Jose đang tìm kiếm các thợ nail tài năng để tham gia vào đội ngũ của chúng tôi.",
      "Tiệm của chúng tôi cung cấp môi trường làm việc thân thiện với lượng khách hàng trung thành. Chúng tôi cung cấp các cơ hội đào tạo và phát triển liên tục.",
      "Tìm kiếm các thợ có thể cung cấp dịch vụ khách hàng xuất sắc và dịch vụ nail chất lượng bao gồm manicure, pedicure, sơn gel và nghệ thuật móng."
    ],
    requirements: [
      "Valid nail technician license",
      "At least 1 year of experience (preferred but not required)",
      "Excellent customer service skills",
      "Reliable and punctual"
    ],
    vietnameseRequirements: [
      "Bằng thợ nail hợp lệ",
      "Ít nhất 1 năm kinh nghiệm (ưu tiên nhưng không bắt buộc)",
      "Kỹ năng dịch vụ khách hàng xuất sắc",
      "Đáng tin cậy và đúng giờ"
    ],
    employment_type: "full-time",
    experience_level: "entry",
    salary_range: "$700-$1,200 weekly",
    popularity: "high"
  },
  // Hair industry templates
  {
    id: "hair-stylist-1",
    title: "Creative Hair Stylist Wanted",
    vietnameseTitle: "Tuyển Thợ Tóc Sáng Tạo",
    industry: "hair",
    location: "Los Angeles, CA",
    description: [
      "Upscale salon in Beverly Hills seeking a passionate and skilled hair stylist.",
      "We pride ourselves on providing top-notch service and staying ahead of the latest trends.",
      "Looking for a stylist with experience in cutting, coloring, and styling all types of hair."
    ],
    vietnameseDescription: [
      "Salon cao cấp ở Beverly Hills đang tìm kiếm một thợ làm tóc đam mê và lành nghề.",
      "Chúng tôi tự hào cung cấp dịch vụ hàng đầu và luôn đi đầu trong các xu hướng mới nhất.",
      "Tìm kiếm một nhà tạo mẫu có kinh nghiệm trong việc cắt, nhuộm và tạo kiểu tất cả các loại tóc."
    ],
    requirements: [
      "Cosmetology license",
      "3+ years of experience",
      "Strong communication skills",
      "Up-to-date with current trends"
    ],
    vietnameseRequirements: [
      "Giấy phép hành nghề thẩm mỹ",
      "3+ năm kinh nghiệm",
      "Kỹ năng giao tiếp tốt",
      "Cập nhật các xu hướng hiện tại"
    ],
    employment_type: "full-time",
    experience_level: "experienced",
    salary_range: "$50,000 - $80,000 yearly",
    popularity: "medium"
  },
  // Lash industry templates
  {
    id: "lash-artist-1",
    title: "Eyelash Extension Artist",
    vietnameseTitle: "Tuyển Chuyên Viên Nối Mi",
    industry: "lashes",
    location: "New York, NY",
    description: [
      "Busy lash studio in Manhattan looking for a talented lash artist to join our growing team.",
      "We specialize in classic, hybrid, and volume lash extensions.",
      "Seeking a detail-oriented artist with a passion for creating beautiful lash looks."
    ],
    vietnameseDescription: [
      "Studio mi bận rộn ở Manhattan đang tìm kiếm một nghệ sĩ mi tài năng để tham gia vào đội ngũ đang phát triển của chúng tôi.",
      "Chúng tôi chuyên về nối mi classic, hybrid và volume.",
      "Tìm kiếm một nghệ sĩ định hướng chi tiết với niềm đam mê tạo ra những vẻ ngoài mi tuyệt đẹp."
    ],
    requirements: [
      "Eyelash extension certification",
      "1+ years of experience",
      "Excellent attention to detail",
      "Strong customer service skills"
    ],
    vietnameseRequirements: [
      "Chứng chỉ nối mi",
      "1+ năm kinh nghiệm",
      "Chú ý đến chi tiết xuất sắc",
      "Kỹ năng dịch vụ khách hàng tốt"
    ],
    employment_type: "part-time",
    experience_level: "intermediate",
    salary_range: "$25 - $40 hourly",
    popularity: "low"
  },
  // Massage industry templates
  {
    id: "massage-therapist-1",
    title: "Licensed Massage Therapist",
    vietnameseTitle: "Tuyển Kỹ Thuật Viên Massage Có Giấy Phép",
    industry: "massage",
    location: "Houston, TX",
    description: [
      "Relaxing spa in Houston looking for a skilled and licensed massage therapist.",
      "We offer a variety of massage modalities including Swedish, deep tissue, and hot stone.",
      "Seeking a therapist with a passion for helping clients relieve stress and improve their well-being."
    ],
    vietnameseDescription: [
      "Spa thư giãn ở Houston đang tìm kiếm một kỹ thuật viên massage lành nghề và có giấy phép.",
      "Chúng tôi cung cấp nhiều phương pháp massage khác nhau bao gồm Thụy Điển, mô sâu và đá nóng.",
      "Tìm kiếm một nhà trị liệu có niềm đam mê giúp khách hàng giảm căng thẳng và cải thiện sức khỏe của họ."
    ],
    requirements: [
      "Massage therapy license",
      "1+ years of experience",
      "Knowledge of various massage modalities",
      "Excellent communication skills"
    ],
    vietnameseRequirements: [
      "Giấy phép hành nghề massage",
      "1+ năm kinh nghiệm",
      "Kiến thức về các phương pháp massage khác nhau",
      "Kỹ năng giao tiếp tốt"
    ],
    employment_type: "full-time",
    experience_level: "experienced",
    salary_range: "$40,000 - $60,000 yearly",
    popularity: "medium"
  },
  // Brows industry templates
  {
    id: "brow-artist-1",
    title: "Microblading/Brow Artist",
    vietnameseTitle: "Tuyển Chuyên Viên Điêu Khắc/Phun Xăm Lông Mày",
    industry: "brows",
    location: "Miami, FL",
    description: [
      "Trendy brow studio in Miami looking for a talented microblading/brow artist.",
      "We specialize in microblading, brow shaping, and brow tinting.",
      "Seeking an artist with a passion for creating perfect brows and enhancing natural beauty."
    ],
    vietnameseDescription: [
      "Studio lông mày hợp thời trang ở Miami đang tìm kiếm một nghệ sĩ điêu khắc/phun xăm lông mày tài năng.",
      "Chúng tôi chuyên về điêu khắc lông mày, tạo dáng lông mày và nhuộm lông mày.",
      "Tìm kiếm một nghệ sĩ có niềm đam mê tạo ra những hàng lông mày hoàn hảo và tôn lên vẻ đẹp tự nhiên."
    ],
    requirements: [
      "Microblading certification",
      "1+ years of experience",
      "Excellent attention to detail",
      "Strong customer service skills"
    ],
    vietnameseRequirements: [
      "Chứng chỉ điêu khắc lông mày",
      "1+ năm kinh nghiệm",
      "Chú ý đến chi tiết xuất sắc",
      "Kỹ năng dịch vụ khách hàng tốt"
    ],
    employment_type: "full-time",
    experience_level: "experienced",
    salary_range: "$45,000 - $75,000 yearly",
    popularity: "high"
  }
];

// Map templates by industry for easier access
export const jobTemplatesByIndustry: { [key in IndustryType]?: JobTemplate[] } = {
  "nails": jobTemplates.filter(t => t.industry === "nails"),
  "hair": jobTemplates.filter(t => t.industry === "hair"),
  "lashes": jobTemplates.filter(t => t.industry === "lashes"),
  "massage": jobTemplates.filter(t => t.industry === "massage"),
  "brows": jobTemplates.filter(t => t.industry === "brows"),
  // Add more industries as needed
};

// Utility functions for templates
export const getPopularityBadgeColor = (popularity?: string): string => {
  switch (popularity) {
    case "high":
      return "bg-green-100 text-green-800 border-green-200";
    case "medium":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "low":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const getPopularityLabel = (popularity?: string): { english: string; vietnamese: string } => {
  switch (popularity) {
    case "high":
      return { english: "High Response", vietnamese: "Phản Hồi Cao" };
    case "medium":
      return { english: "Good Response", vietnamese: "Phản Hồi Tốt" };
    case "low":
      return { english: "New", vietnamese: "Mới" };
    default:
      return { english: "Standard", vietnamese: "Tiêu Chuẩn" };
  }
};
