
import { JobFormValues } from "@/components/posting/job/jobFormSchema";

export interface DescriptionTemplate {
  id: string;
  title: string;
  description: string;
  vietnameseDescription?: string;
}

export interface IndustryTemplates {
  industry: string;
  templates: DescriptionTemplate[];
}

// Standard templates for nails industry
export const jobDescriptionTemplates: IndustryTemplates[] = [
  {
    industry: "nails",
    templates: [
      {
        id: "nails-1",
        title: "Experienced Nail Technician",
        description: "We are seeking an experienced Nail Technician to join our team. The ideal candidate has at least 2 years of experience with manicures, pedicures, gel, dip, and acrylic services. We offer competitive commission and a friendly work environment with plenty of walk-in clients. Opportunity for growth and flexible schedule available for the right candidate.",
        vietnameseDescription: "Chúng tôi đang tìm kiếm một Kỹ thuật viên Nail có kinh nghiệm để tham gia nhóm của chúng tôi. Ứng viên lý tưởng có ít nhất 2 năm kinh nghiệm với dịch vụ làm móng tay, móng chân, gel, nhúng bột và acrylic. Chúng tôi cung cấp hoa hồng cạnh tranh và môi trường làm việc thân thiện với nhiều khách vãng lai. Cơ hội phát triển và lịch trình linh hoạt cho ứng viên phù hợp."
      },
      {
        id: "nails-2",
        title: "Full-Service Nail Artist",
        description: "Join our upscale salon as a Full-Service Nail Artist! We're looking for talented professionals skilled in manicures, pedicures, acrylics, and nail art. Must have excellent customer service skills and attention to detail. We offer competitive compensation, flexible hours, and a positive team environment. Experience preferred but willing to train the right candidate.",
        vietnameseDescription: "Tham gia tiệm salon cao cấp của chúng tôi với vị trí Nghệ nhân Nail Toàn diện! Chúng tôi đang tìm kiếm các chuyên gia tài năng có kỹ năng làm móng tay, móng chân, đắp bột, và vẽ móng nghệ thuật. Phải có kỹ năng phục vụ khách hàng xuất sắc và chú ý đến chi tiết. Chúng tôi cung cấp thù lao cạnh tranh, giờ làm việc linh hoạt và môi trường làm việc tích cực. Ưu tiên người có kinh nghiệm nhưng sẵn sàng đào tạo ứng viên phù hợp."
      }
    ]
  },
  {
    industry: "hair",
    templates: [
      {
        id: "hair-1",
        title: "Professional Hair Stylist",
        description: "Seeking a creative and talented Hair Stylist to join our growing salon team. The ideal candidate has experience in cutting, coloring, styling, and hair treatments. Must be passionate about staying current with the latest hair trends and techniques. We offer competitive commission, flexible scheduling, and ongoing education opportunities."
      }
    ]
  },
  {
    industry: "lashes",
    templates: [
      {
        id: "lashes-1",
        title: "Certified Lash Technician",
        description: "We are currently looking for a Certified Lash Technician to join our busy beauty studio. The ideal candidate should have experience with classic and volume lash extensions, lash lifts, and proper lash care. Strong attention to detail and excellent client communication skills are essential. We offer competitive commission rates and a positive work environment."
      }
    ]
  },
  {
    industry: "barber",
    templates: [
      {
        id: "barber-1",
        title: "Experienced Barber",
        description: "Seeking an experienced Barber to join our modern barbershop. We're looking for someone skilled in men's haircuts, fades, beard trims, and straight razor shaves. The ideal candidate has a strong client base, excellent communication skills, and can provide a premium service experience. We offer competitive commission or booth rental options in a high-traffic location."
      }
    ]
  },
  {
    industry: "skincare",
    templates: [
      {
        id: "skincare-1",
        title: "Licensed Esthetician",
        description: "Join our wellness spa as a Licensed Esthetician. We're seeking a dedicated skincare professional experienced in facials, chemical peels, waxing, and skin analysis. Knowledge of professional product lines and ability to recommend appropriate treatments is essential. Must be passionate about helping clients achieve healthy skin. We offer competitive pay, flexible scheduling, and a serene work environment."
      }
    ]
  },
  {
    industry: "microblading",
    templates: [
      {
        id: "microblading-1",
        title: "Microblading & PMU Artist",
        description: "We're seeking a talented Microblading and Permanent Makeup Artist to join our studio. The ideal candidate should be certified in microblading, powder brows, and other permanent makeup techniques. Must have a strong portfolio demonstrating precision work and natural-looking results. We offer competitive commission, flexible scheduling, and a modern, upscale work environment."
      }
    ]
  },
  {
    industry: "other",
    templates: [
      {
        id: "other-1",
        title: "Beauty Professional",
        description: "Seeking a talented Beauty Professional to join our team. The ideal candidate has experience in their specialty, excellent customer service skills, and a passion for the beauty industry. We offer a supportive team environment, competitive compensation, and opportunities for growth and development. Both new graduates and experienced professionals are encouraged to apply."
      }
    ]
  }
];
