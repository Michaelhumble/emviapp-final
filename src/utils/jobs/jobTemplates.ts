import { JobTemplate } from '@/types/job';

export type JobTemplateType = 
  'nails' | 
  'hair' | 
  'lashes' | 
  'barber' | 
  'skincare' | 
  'spa' | 
  'receptionist' | 
  'manager' | 
  'massage' | 
  'tattoo' | 
  'makeup' | 
  'booth' | 
  'beauty' | 
  'custom';

// Define a function to create a template with the correct type
const createTemplate = (template: JobTemplate): JobTemplate => template;

// Get a specific job template by type
export const getJobTemplate = (type: JobTemplateType): JobTemplate => {
  switch (type) {
    case 'nails':
      return createTemplate({
        title: "Nail Technician Needed",
        description: "We are looking for an experienced nail technician to join our team. The ideal candidate should have experience in manicures, pedicures, and nail art.",
        vietnameseDescription: "Chúng tôi đang tìm kiếm một kỹ thuật viên làm móng có kinh nghiệm để tham gia vào đội ngũ của chúng tôi. Ứng viên lý tưởng nên có kinh nghiệm về làm móng tay, làm móng chân và nghệ thuật làm móng.",
        location: "",
        jobType: "Full-time",
        compensation_type: "Salary + Commission",
        specialties: ["Manicures", "Pedicures", "Nail Art", "Acrylics"],
        salonName: "",
        weekly_pay: true,
        has_wax_room: false,
        owner_will_train: false,
        templateType: "nails",
        requirements: ["At least 1 year experience in nail services", "Valid nail technician license", "Good customer service skills", "Ability to perform manicures, pedicures, and nail art"]
      });
    
    case 'hair':
      return createTemplate({
        title: "Hair Stylist Position Available",
        description: "Join our salon team as a hair stylist. We are seeking talented individuals with experience in cutting, coloring, and styling.",
        vietnameseDescription: "Tham gia đội ngũ của chúng tôi với vị trí hair stylist. Chúng tôi đang tìm kiếm những cá nhân tài năng có kinh nghiệm cắt, nhuộm và tạo kiểu tóc.",
        location: "",
        jobType: "Full-time",
        compensation_type: "Commission",
        specialties: ["Haircuts", "Hair Coloring", "Styling", "Blow-outs"],
        salonName: "",
        weekly_pay: true,
        has_wax_room: false,
        owner_will_train: false,
        templateType: "hair",
        requirements: ["Cosmetology license", "At least 2 years of experience", "Knowledge of cutting and coloring techniques", "Portfolio of previous work"]
      });
      
    case 'lashes':
      return createTemplate({
        title: "Eyelash Extension Technician",
        description: "We are looking for a skilled eyelash extension technician to provide high-quality lash services to our clients.",
        vietnameseDescription: "Chúng tôi đang tìm kiếm một kỹ thuật viên nối mi lành nghề để cung cấp các dịch vụ mi chất lượng cao cho khách hàng của chúng tôi.",
        location: "",
        jobType: "Part-time",
        compensation_type: "Hourly + Tips",
        specialties: ["Classic Lashes", "Volume Lashes", "Lash Lifts", "Lash Tints"],
        salonName: "",
        weekly_pay: true,
        has_wax_room: false,
        owner_will_train: false,
        templateType: "lashes",
        requirements: ["Eyelash extension certification", "Experience with different lash techniques", "Attention to detail", "Excellent hygiene practices"]
      });

    case 'barber':
      return createTemplate({
        title: "Experienced Barber Wanted",
        description: "Our barbershop is looking for a barber with experience in traditional and modern cuts, fades, and shaves.",
        vietnameseDescription: "Tiệm cắt tóc của chúng tôi đang tìm kiếm một thợ cắt tóc có kinh nghiệm về cắt, fade và cạo truyền thống và hiện đại.",
        location: "",
        jobType: "Full-time",
        compensation_type: "Commission",
        specialties: ["Fades", "Tapers", "Straight Razor Shaves", "Beard Trims"],
        salonName: "",
        weekly_pay: true,
        has_wax_room: false,
        owner_will_train: false,
        templateType: "barber",
        requirements: ["Barber license", "Proficiency in various cutting techniques", "Knowledge of beard grooming", "Strong customer service skills"]
      });

    case 'skincare':
      return createTemplate({
        title: "Esthetician for Spa",
        description: "We are seeking a licensed esthetician to provide facials, waxing, and other skincare treatments in our spa.",
        vietnameseDescription: "Chúng tôi đang tìm kiếm một chuyên viên thẩm mỹ có giấy phép để cung cấp các dịch vụ chăm sóc da mặt, tẩy lông và các phương pháp điều trị da khác trong spa của chúng tôi.",
        location: "",
        jobType: "Full-time",
        compensation_type: "Hourly + Commission",
        specialties: ["Facials", "Waxing", "Microdermabrasion", "Chemical Peels"],
        salonName: "",
        weekly_pay: true,
        has_wax_room: true,
        owner_will_train: false,
        templateType: "skincare",
        requirements: ["Esthetician license", "Experience in skincare treatments", "Knowledge of skincare products", "Ability to recommend treatments"]
      });

    case 'spa':
      return createTemplate({
        title: "Spa Technician",
        description: "We are seeking a skilled spa technician to provide body treatments, wraps, and therapeutic services in our wellness center.",
        vietnameseDescription: "Chúng tôi đang tìm kiếm một kỹ thuật viên spa lành nghề để cung cấp các dịch vụ trị liệu toàn thân, quấn và các dịch vụ trị liệu trong trung tâm chăm sóc sức khỏe của chúng tôi.",
        location: "",
        jobType: "Full-time",
        compensation_type: "Hourly + Tips",
        specialties: ["Body Wraps", "Massage", "Salt Scrubs", "Aromatherapy"],
        salonName: "",
        weekly_pay: true,
        has_wax_room: false,
        owner_will_train: false,
        templateType: "spa",
        requirements: ["Certification in spa therapies", "Experience in body treatments", "Knowledge of aromatherapy", "Excellent communication skills"]
      });

    case 'receptionist':
      return createTemplate({
        title: "Salon Receptionist",
        description: "We are looking for a friendly and organized receptionist to manage scheduling, client check-ins, and salon operations.",
        vietnameseDescription: "Chúng tôi đang tìm kiếm một nhân viên lễ tân thân thiện và có tổ chức để quản lý lịch trình, đăng ký khách hàng và các hoạt động của salon.",
        location: "",
        jobType: "Part-time",
        compensation_type: "Hourly",
        specialties: ["Customer Service", "Scheduling", "Phone Etiquette", "Cash Handling"],
        salonName: "",
        weekly_pay: true,
        has_wax_room: false,
        owner_will_train: true,
        templateType: "receptionist",
        requirements: ["High school diploma", "Excellent communication skills", "Basic computer skills", "Ability to multitask"]
      });

    case 'manager':
      return createTemplate({
        title: "Salon Manager",
        description: "We are seeking an experienced salon manager to oversee salon operations, manage staff, and ensure customer satisfaction.",
        vietnameseDescription: "Chúng tôi đang tìm kiếm một người quản lý salon có kinh nghiệm để giám sát các hoạt động của salon, quản lý nhân viên và đảm bảo sự hài lòng của khách hàng.",
        location: "",
        jobType: "Full-time",
        compensation_type: "Salary + Bonuses",
        specialties: ["Staff Management", "Inventory Control", "Customer Relations", "Marketing"],
        salonName: "",
        weekly_pay: false,
        has_wax_room: false,
        owner_will_train: false,
        templateType: "manager",
        requirements: ["Management experience", "Leadership skills", "Knowledge of salon operations", "Excellent problem-solving skills"]
      });

    case 'massage':
      return createTemplate({
        title: "Licensed Massage Therapist",
        description: "Our spa is looking for a licensed massage therapist to provide therapeutic massage and bodywork services to our clients.",
        vietnameseDescription: "Spa của chúng tôi đang tìm kiếm một chuyên viên mát-xa có giấy phép để cung cấp dịch vụ mát-xa trị liệu và xoa bóp cho khách hàng của chúng tôi.",
        location: "",
        jobType: "Part-time",
        compensation_type: "Commission",
        specialties: ["Swedish Massage", "Deep Tissue Massage", "Hot Stone Massage", "Prenatal Massage"],
        salonName: "",
        weekly_pay: true,
        has_wax_room: false,
        owner_will_train: false,
        templateType: "massage",
        requirements: ["Massage therapy license", "Experience in massage techniques", "Knowledge of anatomy", "Excellent communication skills"]
      });

    case 'tattoo':
      return createTemplate({
        title: "Tattoo Artist",
        description: "Our tattoo studio is looking for a skilled tattoo artist with a strong portfolio and expertise in various tattooing styles.",
        vietnameseDescription: "Studio xăm của chúng tôi đang tìm kiếm một nghệ sĩ xăm hình lành nghề với một danh mục đầu tư mạnh mẽ và chuyên môn về các phong cách xăm khác nhau.",
        location: "",
        jobType: "Full-time",
        compensation_type: "Commission",
        specialties: ["Black and Gray", "Color Realism", "Traditional", "Geometric"],
        salonName: "",
        weekly_pay: true,
        has_wax_room: false,
        owner_will_train: false,
        templateType: "tattoo",
        requirements: ["Tattoo license", "Strong portfolio", "Knowledge of sterilization", "Excellent artistic skills"]
      });

    case 'makeup':
      return createTemplate({
        title: "Makeup Artist",
        description: "Our salon is seeking a talented makeup artist to provide makeup application services for weddings, events, and photoshoots.",
        vietnameseDescription: "Salon của chúng tôi đang tìm kiếm một nghệ sĩ trang điểm tài năng để cung cấp dịch vụ trang điểm cho đám cưới, sự kiện và chụp ảnh.",
        location: "",
        jobType: "Part-time",
        compensation_type: "Hourly + Tips",
        specialties: ["Bridal Makeup", "Special Effects", "Editorial", "Airbrushing"],
        salonName: "",
        weekly_pay: true,
        has_wax_room: false,
        owner_will_train: false,
        templateType: "makeup",
        requirements: ["Makeup artistry certification", "Experience in makeup application", "Knowledge of makeup products", "Excellent customer service skills"]
      });

    case 'booth':
      return createTemplate({
        title: "Booth Rental Available",
        description: "We are offering booth rental space to independent beauty professionals in our well-established salon.",
        vietnameseDescription: "Chúng tôi đang cung cấp không gian cho thuê gian hàng cho các chuyên gia làm đẹp độc lập trong salon đã có uy tín của chúng tôi.",
        location: "",
        jobType: "Booth Rental",
        compensation_type: "Rental Fee",
        specialties: ["Hair Stylists", "Nail Technicians", "Estheticians", "Massage Therapists"],
        salonName: "",
        weekly_pay: false,
        has_wax_room: false,
        owner_will_train: false,
        templateType: "booth",
        requirements: ["Valid professional license", "Liability insurance", "Own clientele", "Professional demeanor"]
      });

    case 'beauty':
      return createTemplate({
        title: "Other Beauty Professional",
        description: "We are looking for a skilled beauty professional to provide specialized beauty services such as microblading, threading, or waxing.",
        vietnameseDescription: "Chúng tôi đang tìm kiếm một chuyên gia làm đẹp lành nghề để cung cấp các dịch vụ làm đẹp chuyên biệt như microblading, threading hoặc waxing.",
        location: "",
        jobType: "Contract",
        compensation_type: "Commission",
        specialties: ["Microblading", "Threading", "Waxing", "Lash Extensions"],
        salonName: "",
        weekly_pay: true,
        has_wax_room: true,
        owner_will_train: false,
        templateType: "beauty",
        requirements: ["Certification in the specific service", "Experience in the service", "Knowledge of safety procedures", "Excellent customer service skills"]
      });
    
    case 'custom':
      return createTemplate({
        title: "",
        description: "",
        vietnameseDescription: "",
        location: "",
        jobType: "",
        compensation_type: "",
        salonName: "",
        weekly_pay: false,
        has_wax_room: false,
        owner_will_train: false,
        templateType: "custom",
        requirements: []
      });
      
    default:
      return createTemplate({
        title: "",
        description: "",
        vietnameseDescription: "",
        location: "",
        jobType: "",
        compensation_type: "",
        salonName: "",
        weekly_pay: false,
        has_wax_room: false,
        owner_will_train: false,
        templateType: "custom",
        requirements: []
      });
  }
};
