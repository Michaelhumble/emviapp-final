
import { JobFormValues } from "./jobFormSchema";

// English job templates
export const JOB_TEMPLATES_EN = [
  {
    id: "nail-tech",
    title: "Experienced Nail Technician",
    type: "Full Time",
    description: "Seeking an experienced nail technician to join our busy salon. The ideal candidate has at least 2 years of experience with acrylics, gel, and natural nails. We offer competitive commission, a friendly team environment, and a steady client base.",
    shortSummary: "Full-time nail tech position at a busy salon with competitive pay and benefits."
  },
  {
    id: "hair-stylist",
    title: "Creative Hair Stylist",
    type: "Full Time",
    description: "Join our award-winning salon team! We're looking for a talented hair stylist with color expertise and a passion for creating beautiful styles. You'll work with high-end products in a modern salon with a loyal clientele.",
    shortSummary: "Stylist position at an upscale salon with growth opportunities and loyal clients."
  },
  {
    id: "esthetician",
    title: "Licensed Esthetician",
    type: "Part Time",
    description: "We need a skilled esthetician to perform facials, waxing, and skincare treatments. The right candidate has excellent customer service skills, knowledge of skincare products, and the ability to recommend home care routines.",
    shortSummary: "Part-time esthetician role performing facials and skincare treatments."
  },
  {
    id: "lash-tech",
    title: "Lash Extension Specialist",
    type: "Full Time",
    description: "Busy beauty studio seeking a certified lash technician. You should be experienced in classic and volume techniques, maintaining a clean workspace, and building client relationships. Competitive commission with bonus opportunities.",
    shortSummary: "Full-time lash artist position with competitive pay and growing clientele."
  },
  {
    id: "spa-manager",
    title: "Spa Manager / Receptionist",
    type: "Full Time",
    description: "Looking for an organized, professional spa manager to oversee daily operations, schedule appointments, manage inventory, and provide exceptional customer service. Experience in the beauty industry preferred.",
    shortSummary: "Spa manager role handling operations, scheduling, and client relations."
  }
];

// Vietnamese job templates
export const JOB_TEMPLATES_VI = [
  {
    id: "nail-tech",
    title: "Thợ Nail Có Kinh Nghiệm",
    type: "Toàn Thời Gian",
    description: "Cần thợ nail có ít nhất 2 năm kinh nghiệm làm bột, gel, và móng tự nhiên. Tiệm đông khách, tip cao, môi trường làm việc thân thiện, có thể bao lương tùy khả năng.",
    shortSummary: "Vị trí thợ nail toàn thời gian tại tiệm đông khách với lương cạnh tranh."
  },
  {
    id: "hair-stylist",
    title: "Thợ Tóc Sáng Tạo",
    type: "Toàn Thời Gian",
    description: "Cần thợ tóc có kinh nghiệm nhuộm, uốn, và tạo kiểu tóc. Sẽ làm việc với sản phẩm cao cấp trong salon hiện đại với khách hàng thân thiết. Lương thưởng hấp dẫn.",
    shortSummary: "Vị trí thợ tóc tại salon cao cấp với nhiều cơ hội phát triển."
  },
  {
    id: "esthetician",
    title: "Kỹ Thuật Viên Chăm Sóc Da",
    type: "Bán Thời Gian",
    description: "Cần người có kinh nghiệm làm facial, wax, và các liệu trình chăm sóc da. Ứng viên phải có kỹ năng chăm sóc khách hàng tốt, hiểu biết về sản phẩm skincare.",
    shortSummary: "Vị trí bán thời gian cho facial và chăm sóc da."
  },
  {
    id: "lash-tech",
    title: "Chuyên Gia Nối Mi",
    type: "Toàn Thời Gian",
    description: "Cần thợ nối mi có chứng chỉ và kinh nghiệm với kỹ thuật classic và volume. Yêu cầu giữ không gian làm việc sạch sẽ và biết cách xây dựng mối quan hệ với khách hàng.",
    shortSummary: "Vị trí thợ mi toàn thời gian với lương cao và khách hàng ổn định."
  },
  {
    id: "spa-manager",
    title: "Quản Lý Spa / Lễ Tân",
    type: "Toàn Thời Gian",
    description: "Tìm người có kỹ năng tổ chức để quản lý hoạt động hàng ngày, lên lịch hẹn, quản lý hàng tồn kho và cung cấp dịch vụ khách hàng xuất sắc. Ưu tiên người có kinh nghiệm trong ngành làm đẹp.",
    shortSummary: "Vị trí quản lý spa phụ trách vận hành và chăm sóc khách hàng."
  }
];

// Job Types - English
export const JOB_TYPES_EN = [
  { value: "full-time", label: "Full Time" },
  { value: "part-time", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "temporary", label: "Temporary" },
  { value: "flexible", label: "Flexible Hours" }
];

// Job Types - Vietnamese
export const JOB_TYPES_VI = [
  { value: "full-time", label: "Toàn Thời Gian" },
  { value: "part-time", label: "Bán Thời Gian" },
  { value: "contract", label: "Hợp Đồng" },
  { value: "temporary", label: "Tạm Thời" },
  { value: "flexible", label: "Giờ Giấc Linh Hoạt" }
];

// Professional Types - English
export const PROFESSIONAL_TYPES_EN = [
  { value: "nail-tech", label: "Nail Technician" },
  { value: "hair-stylist", label: "Hair Stylist" },
  { value: "esthetician", label: "Esthetician" },
  { value: "lash-tech", label: "Lash Technician" },
  { value: "makeup-artist", label: "Makeup Artist" },
  { value: "massage-therapist", label: "Massage Therapist" },
  { value: "receptionist", label: "Receptionist" },
  { value: "salon-manager", label: "Salon Manager" },
  { value: "other", label: "Other" }
];

// Professional Types - Vietnamese
export const PROFESSIONAL_TYPES_VI = [
  { value: "nail-tech", label: "Thợ Nail" },
  { value: "hair-stylist", label: "Thợ Tóc" },
  { value: "esthetician", label: "Chuyên Viên Chăm Sóc Da" },
  { value: "lash-tech", label: "Thợ Mi" },
  { value: "makeup-artist", label: "Chuyên Gia Trang Điểm" },
  { value: "massage-therapist", label: "Thợ Massage" },
  { value: "receptionist", label: "Lễ Tân" },
  { value: "salon-manager", label: "Quản Lý Salon" },
  { value: "other", label: "Khác" }
];

// Field-specific prefilled content based on professional type
export const getPrefillContent = (professionalType: string, isVietnamese: boolean) => {
  const templates = isVietnamese ? JOB_TEMPLATES_VI : JOB_TEMPLATES_EN;
  const template = templates.find(t => t.id === professionalType);
  
  if (!template) {
    return null;
  }
  
  return template;
};

// Define job templates for the template selector
export const JOB_TEMPLATES = [
  ...JOB_TEMPLATES_EN.map(template => ({
    ...template,
    language: "english"
  })),
  ...JOB_TEMPLATES_VI.map(template => ({
    ...template,
    language: "vietnamese"
  }))
];

// Yes Ladder questions
export const YES_LADDER_QUESTIONS_EN = [
  {
    id: "faster_visibility",
    question: "Do you want more artists to see your job faster?",
    feature: "Priority Placement",
    description: "Your job will be shown to more qualified candidates within the first 24 hours."
  },
  {
    id: "top_listing",
    question: "Would you like your job to appear at the top of the list?",
    feature: "Featured Listing",
    description: "Your job will be pinned to the top of search results for maximum visibility."
  },
  {
    id: "qualified_professionals",
    question: "Want to reach the most qualified professionals first?",
    feature: "Premium Targeting",
    description: "Smart matching to show your job to professionals with the exact skills you need."
  },
  {
    id: "add_photos",
    question: "Add photos to attract more candidates?",
    feature: "Visual Showcase",
    description: "Jobs with photos receive 37% more applications on average."
  },
  {
    id: "instant_applications",
    question: "Enable instant applications to hire faster?",
    feature: "Quick Apply",
    description: "Let candidates apply with one click for faster response times."
  },
  {
    id: "urgent_tag",
    question: "Mark this position as urgent to attract immediate attention?",
    feature: "Urgent Badge",
    description: "Highlight your job with an eye-catching urgent tag for immediate responses."
  }
];

export const YES_LADDER_QUESTIONS_VI = [
  {
    id: "faster_visibility",
    question: "Bạn muốn nhiều thợ nhìn thấy tin tuyển dụng nhanh hơn?",
    feature: "Vị Trí Ưu Tiên",
    description: "Tin của bạn sẽ được hiển thị cho nhiều ứng viên chất lượng hơn trong 24 giờ đầu tiên."
  },
  {
    id: "top_listing",
    question: "Bạn muốn tin đăng xuất hiện ở đầu danh sách?",
    feature: "Tin Nổi Bật",
    description: "Tin của bạn sẽ được ghim ở đầu kết quả tìm kiếm để đạt khả năng hiển thị tối đa."
  },
  {
    id: "qualified_professionals",
    question: "Muốn tiếp cận những thợ giỏi nhất trước tiên?",
    feature: "Tìm Kiếm Cao Cấp",
    description: "Hệ thống thông minh ghép tin với những thợ có kỹ năng chính xác bạn cần."
  },
  {
    id: "add_photos",
    question: "Thêm hình ảnh để thu hút nhiều ứng viên hơn?",
    feature: "Giới Thiệu Hình Ảnh",
    description: "Tin đăng có hình nhận được nhiều đơn ứng tuyển hơn 37%."
  },
  {
    id: "instant_applications",
    question: "Bật ứng tuyển nhanh để tuyển nhanh hơn?",
    feature: "Ứng Tuyển Nhanh",
    description: "Cho phép ứng viên nộp đơn với một cú nhấp để có thời gian phản hồi nhanh hơn."
  },
  {
    id: "urgent_tag",
    question: "Đánh dấu vị trí này là khẩn cấp để thu hút sự chú ý ngay lập tức?",
    feature: "Nhãn Khẩn Cấp",
    description: "Làm nổi bật tin tuyển dụng với nhãn khẩn cấp để nhận phản hồi nhanh chóng."
  }
];
