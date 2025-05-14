
// This file contains constants used by the job form components

import { JobFormValues } from "./jobFormSchema";

// Job templates for quick selection
export const JOB_TEMPLATES = [
  {
    id: "nail-technician",
    title: "Nail Technician",
    type: "Full Time",
    description: "We are looking for an experienced Nail Technician to join our team. The ideal candidate has strong skills in manicures, pedicures, and nail enhancements. You should be professional, detail-oriented, and enjoy creating a great experience for our clients."
  },
  {
    id: "hair-stylist",
    title: "Hair Stylist",
    type: "Full Time",
    description: "Experienced Hair Stylist wanted for a busy salon. Must be skilled in cutting, coloring, and styling for diverse clientele. The right candidate will have excellent customer service skills and the ability to build a loyal client base."
  },
  {
    id: "receptionist",
    title: "Salon Receptionist",
    type: "Part Time",
    description: "We're seeking a friendly, organized Salon Receptionist to manage our front desk operations. Responsibilities include greeting clients, scheduling appointments, answering phones, and processing payments. Must have excellent communication skills and a professional demeanor."
  },
  {
    id: "esthetician",
    title: "Esthetician",
    type: "Full Time",
    description: "Join our spa team as an Esthetician providing facial treatments, body treatments, and waxing services. The ideal candidate will have a valid license, experience with various skin types, and knowledge of skincare products and techniques."
  },
  {
    id: "massage-therapist",
    title: "Massage Therapist",
    type: "Part Time",
    description: "Licensed Massage Therapist needed for our growing spa. Must be proficient in various massage modalities including Swedish, deep tissue, and hot stone. Strong communication skills and ability to customize treatments to client needs required."
  }
];

// Polish descriptions for Vietnamese language 
export const POLISHED_DESCRIPTIONS_VI = {
  nails: {
    professional: [
      "Cần thợ nails giỏi gấp! Tiệm khu Mỹ trắng, tip cao, khách sang. Lương hấp dẫn, bao ăn ở. Làm là mê ngay!",
      "Tuyển gấp thợ bột + chân tay nước. Tiệm đông khách, chủ dễ thương, khách đều quanh năm. Lương rõ ràng, không áp lực!"
    ],
    friendly: [
      "Tiệm sang như spa khu Mỹ trắng – cần thợ làm nhanh, đẹp, chuyên nghiệp. Có khách sẵn, tip hậu. Ưu tiên làm lâu dài!",
      "Tuyển thợ có kinh nghiệm làm bột, ombré, design đơn giản. Chỗ ở sạch sẽ, lương cao, làm 6 ngày, tip mỗi ngày đều."
    ],
    luxury: [
      "Cần người biết dipping, chân tay nước hoặc full set. Tiệm nằm trong mall, khách đều, tip mạnh. Bao lương + bao ở.",
      "Chủ hiền, không drama, khách dễ, cần thợ nữ làm ổn định. Ưu tiên người miền Nam, nói chuyện vui vẻ, biết chăm khách."
    ],
    casual: [
      "Tiệm family, khu Mỹ trắng, đang thiếu người làm gấp. Khách sẵn mỗi ngày, chỗ ở gần tiệm, tip cao mỗi tuần.",
      "Làm êm, khách đều, chủ bao lương $160–$180/ngày tùy tay nghề. Cần người vô làm ngay, không cần giỏi quá."
    ],
    detailed: [
      "Tiệm không cần quảng cáo – khách tự tới. Chỉ thiếu thợ giỏi. Lương cao, khách sang, cần làm lâu dài. Ai làm là ở luôn!",
      "Ưu tiên thợ có tâm, biết giữ khách. Tiệm đông việc, hỗ trợ hết mình, làm càng lâu càng có thưởng và tăng lương!"
    ]
  },
  hair: {
    professional: [],
    friendly: [],
    luxury: [],
    casual: [],
    detailed: []
  },
  spa: {
    professional: [],
    friendly: [],
    luxury: [],
    casual: [],
    detailed: []
  },
  barber: {
    professional: [],
    friendly: [],
    luxury: [],
    casual: [],
    detailed: []
  },
  makeup: {
    professional: [],
    friendly: [],
    luxury: [],
    casual: [],
    detailed: []
  }
};
