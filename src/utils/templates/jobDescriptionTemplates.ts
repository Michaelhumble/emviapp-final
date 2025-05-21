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

// Nail industry templates
const nailTemplates: DescriptionTemplate[] = [
  {
    id: "nail-1",
    title: "Experienced Nail Technician",
    description: "We are seeking a skilled nail technician with at least 2 years of experience to join our growing salon. The ideal candidate will be proficient in manicures, pedicures, gel applications, and acrylic extensions. We offer competitive pay, flexible hours, and a friendly work environment. Excellent customer service skills are a must.",
    vietnameseDescription: "Chúng tôi đang tìm kiếm một kỹ thuật viên làm móng có kỹ năng với ít nhất 2 năm kinh nghiệm để tham gia vào tiệm salon đang phát triển của chúng tôi. Ứng viên lý tưởng sẽ thành thạo trong việc làm móng tay, móng chân, đắp gel và nối móng acrylic. Chúng tôi cung cấp mức lương cạnh tranh, giờ làm việc linh hoạt và môi trường làm việc thân thiện. Kỹ năng dịch vụ khách hàng xuất sắc là điều bắt buộc."
  },
  {
    id: "nail-2",
    title: "Senior Nail Artist",
    description: "Luxury nail salon seeking a senior nail artist with expertise in nail art, 3D designs, and premium services. Must have 3+ years of experience and a portfolio of work. Position offers high-end clientele, commission-based pay with guaranteed minimum, and opportunity to build a loyal customer base. English proficiency required.",
    vietnameseDescription: "Tiệm làm móng cao cấp đang tìm kiếm nghệ sĩ làm móng cấp cao có chuyên môn về nghệ thuật móng, thiết kế 3D và các dịch vụ cao cấp. Phải có hơn 3 năm kinh nghiệm và có sẵn danh mục công việc. Vị trí này phục vụ khách hàng cao cấp, trả lương dựa trên hoa hồng với mức tối thiểu được đảm bảo và cơ hội xây dựng cơ sở khách hàng trung thành. Yêu cầu thông thạo tiếng Anh."
  },
  {
    id: "nail-3",
    title: "Entry-Level Nail Technician",
    description: "Busy nail salon looking for entry-level nail technicians. We will provide training for motivated individuals interested in building a career in the beauty industry. Basic knowledge of manicures and pedicures preferred but not required. Great opportunity to learn and grow with supportive team. Weekly pay available.",
    vietnameseDescription: "Tiệm nail bận rộn đang tìm kiếm thợ làm móng ở cấp độ cơ bản. Chúng tôi sẽ cung cấp đào tạo cho những cá nhân có động lực quan tâm đến việc xây dựng sự nghiệp trong ngành làm đẹp. Kiến thức cơ bản về làm móng tay và móng chân được ưa thích nhưng không bắt buộc. Cơ hội tuyệt vời để học hỏi và phát triển với đội ngũ hỗ trợ. Có trả lương hàng tuần."
  },
  {
    id: "nail-4",
    title: "Full-Service Nail Specialist",
    description: "Well-established salon seeks full-service nail specialist capable of performing all nail services including natural nail care, gel polish, acrylics, dipping powder, and nail art. Must be licensed and have at least 1 year of experience. We provide a clean, upscale environment with steady clientele and competitive compensation.",
    vietnameseDescription: "Tiệm salon được thành lập lâu đời tìm kiếm chuyên gia làm móng toàn diện có khả năng thực hiện tất cả các dịch vụ móng bao gồm chăm sóc móng tự nhiên, sơn gel, đắp bột, nhúng bột và vẽ móng nghệ thuật. Phải có giấy phép và có ít nhất 1 năm kinh nghiệm. Chúng tôi cung cấp một môi trường sạch sẽ, cao cấp với khách hàng ổn định và mức thù lao cạnh tranh."
  },
  {
    id: "nail-5",
    title: "Nail Manager",
    description: "Growing nail salon chain seeking experienced nail technician with leadership skills to join as salon manager. Responsibilities include staff supervision, scheduling, inventory management, and maintaining salon standards. Must have 4+ years experience as a nail technician and proven team leadership ability. Excellent compensation package plus benefits.",
    vietnameseDescription: "Chuỗi salon làm móng đang phát triển tìm kiếm kỹ thuật viên làm móng có kinh nghiệm với kỹ năng lãnh đạo để tham gia với vai trò quản lý salon. Trách nhiệm bao gồm giám sát nhân viên, lên lịch, quản lý hàng tồn kho và duy trì tiêu chuẩn salon. Phải có hơn 4 năm kinh nghiệm làm kỹ thuật viên làm móng và có khả năng lãnh đạo đội ngũ đã được chứng minh. Gói thù lao và phúc lợi hấp dẫn."
  },
  {
    id: "nail-6",
    title: "Acrylic Nail Specialist",
    description: "High-end nail salon looking for nail technician specializing in acrylic nail applications. Must be skilled in creating perfect extensions, French tips, and nail art on acrylics. Minimum 2 years experience with acrylic applications required. Position offers strong client base and commission-based pay structure with benefits.",
    vietnameseDescription: "Tiệm làm móng cao cấp đang tìm kiếm kỹ thuật viên làm móng chuyên về đắp móng acrylic. Phải có kỹ năng tạo ra móng nối hoàn hảo, đầu móng kiểu Pháp và nghệ thuật móng trên acrylic. Yêu cầu ít nhất 2 năm kinh nghiệm với ứng dụng acrylic. Vị trí cung cấp cơ sở khách hàng mạnh mẽ và cơ cấu trả lương dựa trên hoa hồng với các phúc lợi."
  },
  {
    id: "nail-7",
    title: "Vietnamese-Speaking Nail Tech",
    description: "Family-owned nail salon seeking Vietnamese-speaking nail technicians. All experience levels welcome. We offer a supportive environment where you can grow your skills and build clientele. Benefits include flexible scheduling, competitive pay, and transportation assistance. Both full-time and part-time positions available.",
    vietnameseDescription: "Tiệm nail gia đình đang tìm kiếm thợ nail nói tiếng Việt. Chào đón mọi cấp độ kinh nghiệm. Chúng tôi cung cấp một môi trường hỗ trợ nơi bạn có thể phát triển kỹ năng và xây dựng khách hàng. Lợi ích bao gồm lịch làm việc linh hoạt, lương cạnh tranh và hỗ trợ đi lại. Có vị trí cả toàn thời gian và bán thời gian."
  },
  {
    id: "nail-8",
    title: "Luxury Spa Nail Technician",
    description: "Upscale day spa seeking licensed nail technician for luxury nail services. Experience with high-end products and services required, including hot stone pedicures, paraffin treatments, and gel extensions. Must provide exceptional customer service in a relaxing environment. Competitive salary plus gratuities and spa service benefits.",
    vietnameseDescription: "Spa cao cấp đang tìm kiếm kỹ thuật viên làm móng có giấy phép cho các dịch vụ móng sang trọng. Yêu cầu kinh nghiệm với các sản phẩm và dịch vụ cao cấp, bao gồm pedicure đá nóng, điều trị paraffin và nối móng gel. Phải cung cấp dịch vụ khách hàng xuất sắc trong môi trường thư giãn. Mức lương cạnh tranh cộng với tiền boa và các phúc lợi dịch vụ spa."
  },
  {
    id: "nail-9",
    title: "Mobile Nail Technician",
    description: "Innovative nail service company seeking mobile nail technician to provide in-home services. Must have reliable transportation, portable equipment, and excellent time management skills. Services include basic manicures/pedicures, gel polish, and simple nail art. Great opportunity for self-motivated professionals who enjoy flexible scheduling.",
    vietnameseDescription: "Công ty dịch vụ làm móng sáng tạo đang tìm kiếm kỹ thuật viên làm móng di động để cung cấp dịch vụ tại gia. Phải có phương tiện đi lại đáng tin cậy, thiết bị di động và kỹ năng quản lý thời gian tuyệt vời. Dịch vụ bao gồm làm móng tay/chân cơ bản, sơn gel và nghệ thuật móng đơn giản. Cơ hội tuyệt vời cho các chuyên gia tự tạo động lực thích lịch trình linh hoạt."
  },
  {
    id: "nail-10",
    title: "Full-Time Nail Technician",
    description: "Popular nail salon in busy shopping district seeking full-time nail technicians. Experience with natural nails, gel, acrylics, and dipping powder required. Good communication skills and professional demeanor necessary. We offer competitive commission, guaranteed base pay, and a positive team environment with advancement opportunities.",
    vietnameseDescription: "Tiệm nail phổ biến ở khu mua sắm sầm uất đang tìm kiếm thợ làm móng toàn thời gian. Yêu cầu kinh nghiệm với móng tự nhiên, gel, acrylics và bột nhúng. Cần kỹ năng giao tiếp tốt và phong thái chuyên nghiệp. Chúng tôi cung cấp hoa hồng cạnh tranh, lương cơ bản được đảm bảo và môi trường làm việc nhóm tích cực với cơ hội thăng tiến."
  }
];

// Hair industry templates
const hairTemplates: DescriptionTemplate[] = [
  {
    id: "hair-1",
    title: "Experienced Hair Stylist",
    description: "Upscale salon seeking experienced hair stylist with a minimum of 3 years professional experience. Must be skilled in cutting, coloring, and styling for diverse clientele. Knowledge of current trends and techniques essential. Commission-based compensation with retail bonus opportunities and loyal client base."
  },
  {
    id: "hair-2",
    title: "Salon Manager & Stylist",
    description: "Well-established hair salon looking for a talented stylist with management experience. Responsibilities include team leadership, scheduling, inventory management, and maintaining a full client book. Competitive base salary plus commission and benefits package for the right candidate."
  },
  {
    id: "hair-3",
    title: "Color Specialist",
    description: "Busy salon seeking creative color specialist with advanced training in modern color techniques including balayage, ombre, and vivid fashion colors. Minimum 2 years experience with color services required. Position offers high-end clientele and competitive commission structure."
  }
];

// Lashes industry templates
const lashesTemplates: DescriptionTemplate[] = [
  {
    id: "lashes-1",
    title: "Lash Technician",
    description: "Growing lash studio seeking certified lash technicians skilled in classic and volume techniques. Experience with lash lifts and tints preferred. Must have excellent attention to detail and steady hands. We offer competitive commission rates, flexible scheduling, and a beautiful, well-equipped workspace."
  },
  {
    id: "lashes-2",
    title: "Senior Lash Artist",
    description: "Luxury lash boutique looking for experienced lash artist with 3+ years of expertise in volume, hybrid, and mega volume techniques. Must have strong portfolio and social media presence. Position offers premium pay structure, high-end clientele, and professional development opportunities."
  },
  {
    id: "lashes-3",
    title: "Lash Training Specialist",
    description: "Established lash academy seeking expert lash artist to join as a trainer. Must have 5+ years experience and strong teaching abilities. Position involves developing curriculum, conducting workshops, and mentoring new technicians. Excellent compensation package for the right candidate."
  }
];

// Barber industry templates
const barberTemplates: DescriptionTemplate[] = [
  {
    id: "barber-1",
    title: "Experienced Barber",
    description: "Modern barbershop seeking licensed barbers with minimum 2 years experience. Must be skilled in classic and modern cuts, fades, beard trims, and hot towel shaves. Strong customer service and professional appearance required. Commission-based pay with guaranteed minimum and flexible schedule."
  },
  {
    id: "barber-2",
    title: "Master Barber",
    description: "High-end men's grooming establishment looking for master barber with 5+ years experience. Must excel in precision cuts, razor work, and luxury grooming services. Position offers premium clientele, excellent earning potential, and upscale working environment."
  },
  {
    id: "barber-3",
    title: "Barber/Stylist Apprentice",
    description: "Busy barber shop seeking motivated apprentice barbers ready to build their skills. Great opportunity to learn from experienced professionals while developing your craft. We offer structured training program, competitive pay structure, and pathway to full barber position."
  }
];

// Skincare industry templates
const skincareTemplates: DescriptionTemplate[] = [
  {
    id: "skin-1",
    title: "Licensed Esthetician",
    description: "Upscale day spa looking for licensed esthetician with experience in facials, chemical peels, and waxing services. Knowledge of modern skincare technologies and product lines preferred. Must provide exceptional customer service in a relaxing environment. Commission plus hourly guarantee."
  },
  {
    id: "skin-2",
    title: "Medical Esthetician",
    description: "Medical spa seeking certified medical esthetician for advanced skincare treatments including microdermabrasion, dermaplaning, and laser services. Must have medical esthetics certification and 2+ years experience in a clinical setting. Full-time position with benefits and competitive pay."
  },
  {
    id: "skin-3",
    title: "Skincare Specialist",
    description: "Luxury retailer seeking knowledgeable skincare specialist to provide consultations and treatments. Must have thorough understanding of high-end skincare lines and ability to customize regimens for different skin types. Sales experience preferred. Base salary plus generous commission structure."
  }
];

// Microblading industry templates
const microbladingTemplates: DescriptionTemplate[] = [
  {
    id: "microblading-1",
    title: "Certified Microblading Artist",
    description: "Cosmetic tattoo studio seeking certified microblading artist with portfolio demonstrating exceptional technique and precision. Must have bloodborne pathogen certification and 1+ year experience. We offer high-end clientele, modern facility, and competitive commission structure."
  },
  {
    id: "microblading-2",
    title: "PMU Specialist",
    description: "Established beauty studio looking for permanent makeup artist skilled in microblading, powder brows, and lip blushing. Certification and portfolio required. Position offers premium rates, flexible schedule, and beautiful private studio space in upscale location."
  },
  {
    id: "microblading-3",
    title: "Brow Specialist",
    description: "High-end salon seeking brow specialist with microblading certification. Services include brow shaping, tinting, lamination and microblading. Must have excellent attention to detail and 2+ years experience. Commission-based position with guaranteed minimum and strong existing clientele."
  }
];

// Makeup industry templates
const makeupTemplates: DescriptionTemplate[] = [
  {
    id: "makeup-1",
    title: "Professional Makeup Artist",
    description: "Busy beauty studio seeking experienced makeup artist for bridal, special occasion, and editorial work. Must have diverse portfolio showcasing various styles and skin tones. Excellent communication skills and reliability essential. Commission-based pay with flexible scheduling."
  },
  {
    id: "makeup-2",
    title: "Makeup Artist & Beauty Advisor",
    description: "Luxury cosmetics retailer looking for professional makeup artist to perform services and consult on product recommendations. Experience with high-end makeup brands required. Position includes competitive hourly rate plus commission on services and product sales."
  },
  {
    id: "makeup-3",
    title: "Bridal Makeup Specialist",
    description: "Wedding-focused beauty company seeking makeup artist specializing in bridal and special occasion makeup. Must have reliable transportation, professional kit with quality products, and excellent time management. Experience with diverse skin tones and photography makeup techniques required."
  }
];

// Other industry templates
const otherTemplates: DescriptionTemplate[] = [
  {
    id: "other-1",
    title: "Massage Therapist",
    description: "Day spa seeking licensed massage therapist experienced in Swedish, deep tissue, and hot stone massage techniques. Part-time and full-time positions available with flexible scheduling. We provide a serene environment, loyal clientele, and competitive compensation package."
  },
  {
    id: "other-2",
    title: "Salon Receptionist",
    description: "Busy beauty salon seeking professional receptionist to manage front desk operations. Responsibilities include scheduling appointments, greeting clients, processing payments, and maintaining a clean reception area. Must have excellent communication skills and professional demeanor."
  },
  {
    id: "other-3",
    title: "Salon Manager",
    description: "Full-service salon looking for experienced manager to oversee daily operations. Responsibilities include staff management, inventory control, marketing initiatives, and ensuring exceptional client experience. Previous salon management experience required. Competitive salary plus benefits."
  }
];

// Combine all templates into one exported array
export const jobDescriptionTemplates: IndustryTemplates[] = [
  { industry: 'nails', templates: nailTemplates },
  { industry: 'hair', templates: hairTemplates },
  { industry: 'lashes', templates: lashesTemplates },
  { industry: 'barber', templates: barberTemplates },
  { industry: 'skincare', templates: skincareTemplates },
  { industry: 'microblading', templates: microbladingTemplates },
  { industry: 'makeup', templates: makeupTemplates },
  { industry: 'other', templates: otherTemplates }
];
