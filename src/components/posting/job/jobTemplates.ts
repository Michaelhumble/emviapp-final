
import { IndustryType, JobFormValues } from './jobFormSchema';

// Define templates structure with all required fields
interface JobTemplate extends Partial<JobFormValues> {
  location: string;
  shortDescription?: string;
}

// Define job templates for each industry
export const jobTemplates: Record<IndustryType, JobTemplate> = {
  nails: {
    title: "Experienced Nail Technician - $1,200+ Weekly",
    description: "We are seeking an experienced and talented nail technician to join our busy salon in the heart of Beverly Hills. The ideal candidate has at least 2 years of experience in acrylic, gel, dip powder, and nail art. You'll work with a diverse clientele in a clean, upscale environment with state-of-the-art equipment. We provide ongoing training and opportunities for advancement.",
    vietnameseDescription: "Chúng tôi đang tìm kiếm một kỹ thuật viên làm móng có kinh nghiệm và tài năng để tham gia vào tiệm salon nhộn nhịp của chúng tôi ở trung tâm Beverly Hills. Ứng viên lý tưởng có ít nhất 2 năm kinh nghiệm về acrylic, gel, bột nhúng và nghệ thuật làm móng. Bạn sẽ làm việc với nhiều khách hàng đa dạng trong một môi trường sạch sẽ, cao cấp với thiết bị hiện đại. Chúng tôi cung cấp đào tạo liên tục và cơ hội thăng tiến.",
    location: "Beverly Hills, CA",
    salary_range: "$1,200 - $2,000 weekly",
    jobType: "full-time",
    experience_level: "experienced",
    requirements: ["2+ years experience", "Acrylic & Gel skills", "Strong customer service", "English communication"],
    shortDescription: "Join our upscale salon with guaranteed clientele and extensive benefits"
  },
  
  hair: {
    title: "Hair Stylist / Colorist - $25/hr + Tips",
    description: "Join our modern, high-energy salon as a full-time Hair Stylist/Colorist. We're looking for creative professionals who are passionate about the latest hair trends and techniques. You'll have the freedom to build your clientele while we provide marketing support, continued education, and a collaborative team environment. Experience with balayage, color correction, and cutting-edge styling techniques is a plus.",
    vietnameseDescription: "Tham gia vào salon hiện đại, năng động của chúng tôi với vị trí Stylist/Chuyên gia màu tóc toàn thời gian. Chúng tôi đang tìm kiếm các chuyên gia sáng tạo đam mê với các xu hướng và kỹ thuật làm tóc mới nhất. Bạn sẽ có tự do xây dựng khách hàng của mình trong khi chúng tôi cung cấp hỗ trợ tiếp thị, đào tạo liên tục và môi trường làm việc nhóm hợp tác. Kinh nghiệm với balayage, sửa màu, và các kỹ thuật tạo kiểu tiên tiến là một lợi thế.",
    location: "Los Angeles, CA",
    salary_range: "$25/hr + Commission + Tips",
    jobType: "full-time",
    experience_level: "intermediate",
    requirements: ["Cosmetology license", "2+ years salon experience", "Cutting & coloring expertise", "Portfolio of work"],
    shortDescription: "Modern salon seeking creative stylists with cutting and color expertise"
  },
  
  lashes: {
    title: "Certified Lash Technician - $75K Annual Potential",
    description: "Become part of our luxury lash studio team! We're seeking a certified and experienced lash technician who specializes in classic, hybrid, and volume lash extensions. You'll work with premium products in a spa-like setting with a steady stream of high-end clients. We offer flexible scheduling, retail commission, and performance bonuses. Certification in lash extensions required.",
    vietnameseDescription: "Trở thành một phần của đội ngũ studio nối mi cao cấp của chúng tôi! Chúng tôi đang tìm kiếm một kỹ thuật viên nối mi có chứng chỉ và kinh nghiệm, chuyên về nối mi classic, hybrid và volume. Bạn sẽ làm việc với các sản phẩm cao cấp trong môi trường giống như spa với nguồn khách hàng cao cấp ổn định. Chúng tôi cung cấp lịch làm việc linh hoạt, hoa hồng bán lẻ và thưởng hiệu suất. Yêu cầu chứng chỉ nối mi.",
    location: "San Francisco, CA",
    salary_range: "$65K-$75K Annually",
    jobType: "full-time",
    experience_level: "experienced",
    requirements: ["Lash certification", "1+ year experience", "Knowledge of sanitation practices", "Customer service skills"],
    shortDescription: "Luxury lash studio with high-end clientele and premium product line"
  },
  
  massage: {
    title: "Licensed Massage Therapist - $40/hr + Tips",
    description: "Our growing wellness center is seeking a licensed massage therapist to provide therapeutic massages to our diverse clientele. We specialize in deep tissue, Swedish, hot stone, and sports massage techniques. You'll have your own dedicated treatment room with all necessary equipment provided. We offer flexible scheduling, competitive pay, and a supportive team environment.",
    vietnameseDescription: "Trung tâm wellness đang phát triển của chúng tôi đang tìm kiếm một nhà trị liệu massage có giấy phép để cung cấp các liệu pháp massage trị liệu cho khách hàng đa dạng của chúng tôi. Chúng tôi chuyên về các kỹ thuật massage deep tissue, Swedish, đá nóng và thể thao. Bạn sẽ có phòng điều trị riêng với tất cả các thiết bị cần thiết được cung cấp. Chúng tôi cung cấp lịch làm việc linh hoạt, lương cạnh tranh và môi trường làm việc hỗ trợ.",
    location: "Seattle, WA",
    salary_range: "$40-$60/hr + Tips",
    jobType: "part-time",
    experience_level: "intermediate",
    requirements: ["Massage therapy license", "Insurance coverage", "Multiple massage modalities", "Professional demeanor"],
    shortDescription: "Upscale wellness center with dedicated treatment rooms and flexible schedule"
  },
  
  tattoo: {
    title: "Experienced Tattoo Artist - $100K+ Annually",
    description: "Join our award-winning tattoo studio! We're looking for an experienced tattoo artist with a strong portfolio and client base. Our studio offers private work areas, top-quality equipment, and a collaborative environment with other talented artists. We've been featured in multiple tattoo magazines and have a reputation for cleanliness, professionalism, and artistic excellence.",
    vietnameseDescription: "Tham gia vào studio xăm đoạt giải thưởng của chúng tôi! Chúng tôi đang tìm kiếm một nghệ sĩ xăm có kinh nghiệm với danh mục đầu tư mạnh mẽ và cơ sở khách hàng. Studio của chúng tôi cung cấp khu vực làm việc riêng tư, thiết bị chất lượng cao và môi trường hợp tác với các nghệ sĩ tài năng khác. Chúng tôi đã được giới thiệu trong nhiều tạp chí xăm và có tiếng tăm về sự sạch sẽ, chuyên nghiệp và xuất sắc nghệ thuật.",
    location: "Portland, OR",
    salary_range: "$100K-$150K Annually",
    jobType: "full-time",
    experience_level: "senior",
    requirements: ["5+ years experience", "Strong portfolio", "Client base", "Modern tattoo techniques"],
    shortDescription: "Award-winning studio seeking artist with established portfolio and clientele"
  },
  
  brows: {
    title: "Microblading & Brow Artist - $80K Potential",
    description: "Premier beauty studio seeking a skilled microblading and brow specialist. You'll perform microblading, powder brows, combination brows, and traditional brow services. We provide all tools and products, plus ongoing training on the latest techniques. Our clientele is established and growing, with appointments typically booked weeks in advance.",
    vietnameseDescription: "Studio làm đẹp hàng đầu đang tìm kiếm một chuyên gia microblading và lông mày có kỹ năng. Bạn sẽ thực hiện các dịch vụ microblading, powder brows, kết hợp và dịch vụ lông mày truyền thống. Chúng tôi cung cấp tất cả các công cụ và sản phẩm, cộng với đào tạo liên tục về các kỹ thuật mới nhất. Khách hàng của chúng tôi đã được thiết lập và đang phát triển, với các cuộc hẹn thường được đặt trước nhiều tuần.",
    location: "Miami, FL",
    salary_range: "$70K-$80K Annually",
    jobType: "full-time",
    experience_level: "experienced",
    requirements: ["Microblading certification", "2+ years experience", "Brow shaping expertise", "Color theory knowledge"],
    shortDescription: "Luxury brow studio with booked appointments and premium clientele"
  },
  
  skincare: {
    title: "Licensed Esthetician - $60K + Benefits",
    description: "Our medical spa is seeking a licensed esthetician to join our team of skin care professionals. You'll perform facials, chemical peels, microdermabrasion, and other advanced skin treatments. We work with medical-grade products and state-of-the-art technology. Experience with laser treatments, microneedling, and dermal fillers is preferred but not required as training will be provided.",
    vietnameseDescription: "Spa y tế của chúng tôi đang tìm kiếm một chuyên gia thẩm mỹ có giấy phép để tham gia vào đội ngũ chuyên gia chăm sóc da của chúng tôi. Bạn sẽ thực hiện các liệu pháp facial, peel hóa học, microdermabrasion và các điều trị da nâng cao khác. Chúng tôi làm việc với các sản phẩm cấp y tế và công nghệ tiên tiến. Ưu tiên kinh nghiệm với điều trị laser, lăn kim và filler da nhưng không bắt buộc vì sẽ được đào tạo.",
    location: "Chicago, IL",
    salary_range: "$60K-$70K + Benefits",
    jobType: "full-time",
    experience_level: "intermediate",
    requirements: ["Esthetician license", "1+ year experience", "Knowledge of skin conditions", "Professional appearance"],
    shortDescription: "Medical spa with advanced treatments and ongoing professional training"
  }
};
