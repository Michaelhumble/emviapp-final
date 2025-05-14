
import { JobTemplate, JobType } from './types';

// Job templates for different roles
export const JOB_TEMPLATES: JobTemplate[] = [
  {
    id: 'nail-technician',
    title: 'Nail Technician',
    type: 'Nail Technician',
    description: 'We are looking for an experienced nail technician to join our team. Must be skilled in manicures, pedicures, gel polish, and acrylic application. Competitive pay and great working environment.'
  },
  {
    id: 'hair-stylist',
    title: 'Hair Stylist',
    type: 'Hair Stylist',
    description: 'Seeking an experienced hair stylist for our salon. Must be skilled in cutting, coloring, and styling for diverse clientele. Competitive commission and friendly work environment.'
  },
  {
    id: 'esthetician',
    title: 'Esthetician',
    type: 'Esthetician',
    description: 'We are hiring a licensed esthetician specializing in facials, waxing, and skincare treatments. Join our growing team in a beautiful, upscale salon environment.'
  },
  {
    id: 'lash-tech',
    title: 'Lash Technician',
    type: 'Lash Technician',
    description: 'Seeking a skilled lash technician with experience in classic and volume extensions. Must have attention to detail and passion for creating beautiful looks.'
  },
  {
    id: 'salon-manager',
    title: 'Salon Manager',
    type: 'Manager',
    description: 'Looking for an experienced salon manager to oversee daily operations, staff management, and client relations. Must have prior salon management experience and strong leadership skills.'
  }
];

// Vietnamese job templates
export const JOB_TEMPLATES_VI: JobTemplate[] = [
  {
    id: 'nail-technician',
    title: 'Thợ Nail',
    type: 'Thợ Nail',
    description: 'Tiệm nail đang tuyển thợ có kinh nghiệm làm móng tay, móng chân, đắp bột và sơn gel. Môi trường làm việc thoải mái, lương cao, tip hậu, khách đông.'
  },
  {
    id: 'hair-stylist',
    title: 'Thợ Tóc',
    type: 'Thợ Tóc',
    description: 'Cần tuyển thợ tóc có kinh nghiệm cắt, nhuộm, và tạo kiểu cho nhiều loại khách hàng. Hoa hồng cạnh tranh và môi trường làm việc thân thiện.'
  },
  {
    id: 'esthetician',
    title: 'Chuyên Viên Chăm Sóc Da',
    type: 'Chuyên Viên Chăm Sóc Da',
    description: 'Đang tuyển chuyên viên chăm sóc da có bằng cấp chuyên về facial, waxing, và điều trị da. Tham gia đội ngũ đang phát triển trong môi trường sang trọng.'
  },
  {
    id: 'lash-tech',
    title: 'Kỹ Thuật Viên Mi',
    type: 'Kỹ Thuật Viên Mi',
    description: 'Tìm kiếm kỹ thuật viên mi có kỹ năng với kinh nghiệm nối mi classic và volume. Phải có sự chú ý đến chi tiết và đam mê tạo ra vẻ đẹp.'
  },
  {
    id: 'salon-manager',
    title: 'Quản Lý Salon',
    type: 'Quản Lý',
    description: 'Đang tìm quản lý salon có kinh nghiệm để giám sát hoạt động hàng ngày, quản lý nhân viên và quan hệ khách hàng. Phải có kinh nghiệm quản lý salon trước đó và kỹ năng lãnh đạo mạnh mẽ.'
  }
];

// Define placeholder descriptions for polished templates by style
export const POLISHED_DESCRIPTIONS: Record<string, Record<JobType, string>> = {
  // English versions
  professional: {
    'nail-technician': 'We are seeking an experienced Nail Technician to join our professional team. The ideal candidate will have expertise in manicures, pedicures, gel application, and nail art. Attention to detail and dedication to client satisfaction are essential.',
    'hair-stylist': 'Our salon is looking for a professional Hair Stylist to join our team. The successful candidate will have experience in cutting, coloring, and styling for a diverse clientele. Strong technical skills and creativity are required.',
    'esthetician': 'We are searching for a licensed Esthetician to provide exceptional skincare services. The ideal candidate will be skilled in facials, body treatments, and hair removal techniques. Knowledge of advanced skincare protocols is preferred.',
    'lash-tech': 'Our beauty studio is seeking a professional Lash Technician with experience in classic and volume extensions. The ideal candidate will have excellent attention to detail and be committed to creating beautiful, customized looks.',
    'massage-therapist': 'We are looking for a licensed Massage Therapist to join our wellness team. The ideal candidate will be proficient in multiple massage techniques and able to customize treatments based on client needs. Strong anatomical knowledge is essential.',
    'salon-receptionist': 'We are seeking a professional Salon Receptionist to manage our front desk operations. The ideal candidate will have excellent communication skills, be detail-oriented, and have experience with scheduling software and payment processing.',
    'salon-manager': 'Our salon is looking for an experienced Salon Manager to oversee daily operations. The ideal candidate will have proven leadership abilities, business acumen, and experience in team management. Strong customer service skills are essential.',
    'other': 'We are seeking a qualified professional to join our beauty team. The ideal candidate will have relevant experience in their field, excellent client communication skills, and a commitment to maintaining our high standards of service.'
  },
  friendly: {
    'nail-technician': 'Join our nail salon family! We're looking for a talented Nail Technician who loves creating beautiful nails and making clients smile. If you enjoy a friendly work environment and have skills in manicures, pedicures, and nail art, we'd love to meet you!',
    'hair-stylist': 'Come join our fun, supportive salon team! We're looking for a passionate Hair Stylist who enjoys connecting with clients and creating gorgeous styles. If you love what you do and want to work in a place that feels like family, we're the salon for you!',
    'esthetician': 'We're growing our skincare family! If you're an Esthetician who loves helping people feel confident in their skin and enjoys working in a warm, welcoming environment, we want to talk to you! Join our team of friendly skincare enthusiasts.',
    'lash-tech': 'Join our lash family! We're looking for a friendly Lash Artist who enjoys creating beautiful lashes and making genuine connections with clients. Our studio values kindness, creativity, and a warm environment.',
    'massage-therapist': 'Become part of our wellness family! We're seeking a caring Massage Therapist who enjoys helping others relax and heal. Our supportive team values connection and creating a warm experience for all our clients.',
    'salon-receptionist': 'Join our welcoming salon family! We need a friendly Receptionist with a warm smile and great people skills. If you love creating a positive first impression and enjoy helping clients feel at home, we'd love to meet you!',
    'salon-manager': 'We're looking for a Salon Manager who leads with heart! Join our salon family and help us create an amazing workplace where stylists thrive and clients feel welcome. If you're passionate about people and salon success, this role is for you!',
    'other': 'Join our friendly beauty team! We're looking for someone who loves what they do and enjoys creating connections with clients. If you value kindness, teamwork, and bringing your best to work every day, we'd love to welcome you to our salon family!'
  },
  luxury: {
    'nail-technician': 'Our exclusive nail salon is seeking an elite Nail Artist to serve our discerning clientele. The ideal candidate will possess exceptional technical precision in luxury services including gel extensions, intricate nail art, and premium treatments. Only those with a portfolio demonstrating extraordinary talent need apply.',
    'hair-stylist': 'Our premier salon seeks a distinguished Hair Artist to join our exclusive team. The ideal candidate will have an impressive portfolio showcasing mastery of cutting-edge techniques, celebrity styling experience, and the ability to create transformative, high-end results for our elite clientele.',
    'esthetician': 'Our luxury spa is seeking a master Esthetician to provide exceptional skincare experiences. The ideal candidate will have advanced training in premium treatments, experience with high-end product lines, and the ability to deliver transformative results with impeccable attention to detail.',
    'lash-tech': 'Our prestigious beauty studio is seeking a master Lash Artist to serve our elite clientele. We require exceptional technique in volume lashing, perfect symmetry, and the ability to create custom designs that enhance our clients' natural beauty with luxurious results.',
    'massage-therapist': 'Our exclusive spa is seeking a distinguished Massage Therapist to provide exceptional wellness experiences. The ideal candidate will have mastery of premium modalities, experience serving high-profile clientele, and the ability to customize therapeutic journeys of unparalleled quality.',
    'salon-receptionist': 'Our premium salon seeks a sophisticated Front Desk Concierge to create exceptional first impressions. The ideal candidate will possess immaculate presentation, exceptional communication skills, and the ability to anticipate the needs of our distinguished clientele.',
    'salon-manager': 'Our prestigious salon group seeks an accomplished Director to elevate our luxury brand experience. The ideal candidate will have a proven track record in premium salon management, exceptional business acumen, and the vision to maintain our position as a leader in luxury beauty services.',
    'other': 'Our exclusive beauty establishment seeks an exceptional professional to enhance our premium service offerings. The ideal candidate will have demonstrated excellence in their specialized field, impeccable client relations, and the ability to contribute to our reputation for uncompromising quality.'
  },
  casual: {
    'nail-technician': 'Looking for a nail tech to join our cool salon! If you're good with gel, acrylics, and basic designs, and want to work with a laid-back team, hit us up! Flexible scheduling and good vibes guaranteed.',
    'hair-stylist': 'Cool hair stylist wanted for our chill salon! If you can cut, color, and create styles that make people happy and want to work in a relaxed environment with nice people, let's talk!',
    'esthetician': 'Chill esthetician needed for our friendly spa! If you enjoy doing facials, waxing, and helping people feel good about their skin in a relaxed setting, we want to meet you!',
    'lash-tech': 'Cool lash artist wanted! If you're good at classic and volume lashes and want to work in a chill, drama-free studio with flexible hours, reach out to us. Good vibes only!',
    'massage-therapist': 'Relaxed massage therapist needed for our chill wellness space! If you have good technique and want to work in a low-stress environment with a friendly team, we'd love to chat.',
    'salon-receptionist': 'Looking for a friendly face for our salon front desk! If you're organized, good with people, and want to work in a relaxed, positive environment, drop us a message!',
    'salon-manager': 'Need a cool, level-headed salon manager! If you can handle scheduling, keep the team happy, and manage clients without drama, all while maintaining a relaxed vibe, we want to talk!',
    'other': 'Talented beauty pro wanted for our laid-back salon! Whatever your specialty, if you're good at what you do and want to work in a chill environment with cool people, we should definitely connect!'
  },
  detailed: {
    'nail-technician': 'Position: Full-time Nail Technician\nRequirements: Minimum 2 years experience, current license, proficiency in gel application, acrylic sets, dipping powder, and nail art. Must maintain sanitization standards and manage 6-8 clients daily. Services include manicures ($25-45), pedicures ($35-60), full sets ($45-75), and fills ($35-55).\nSchedule: Tuesday-Saturday, 9:30am-7:00pm with 1-hour lunch break. Sunday/Monday off.\nCompensation: 50-65% commission based on experience + tips (averaging $100-200 daily).',
    'hair-stylist': 'Position: Full-time Hair Stylist\nRequirements: Minimum 2 years salon experience, current cosmetology license, proficiency in modern cutting techniques, color formulation, balayage, and styling. Portfolio review required. Must maintain station cleanliness and manage 6-10 clients daily. Services include cuts ($45-75), color ($65-150), highlights ($85-200), and styling ($45-85).\nSchedule: Wednesday-Sunday with flexible hours. Monday/Tuesday off.\nCompensation: 45-60% commission based on experience + retail commission (10%) + tips.',
    'esthetician': 'Position: Licensed Esthetician\nRequirements: Current esthetics license with minimum 1 year experience. Proficiency in facials, chemical peels (up to 30%), waxing (full body), lash/brow tinting, and makeup application. Knowledge of product lines including Image, Dermalogica, and SkinCeuticals preferred. Services include facials ($75-150), peels ($85-175), waxing ($15-80), and tinting ($25-45).\nSchedule: Thursday-Monday, 10am-8pm with 1-hour break. Tuesday/Wednesday off.\nCompensation: 50% commission + 10% product commission + tips.',
    'lash-tech': 'Position: Certified Lash Technician\nRequirements: Current cosmetology/esthetician license, lash certification, and 1+ years of professional experience. Proficiency in classic, hybrid, and volume techniques with thorough knowledge of proper isolation, application, and removal. Must maintain detailed client records and perform 4-6 services daily. Services include classic full sets ($120-150), volume sets ($180-250), fills ($65-120), and lash removal ($35).\nSchedule: Tuesday-Saturday, 10am-7pm. Sunday/Monday off.\nCompensation: 50-60% commission based on experience + retail bonuses + tips.',
    'massage-therapist': 'Position: Licensed Massage Therapist\nRequirements: Current massage license with 500+ hours training and 1+ years experience. Proficiency in Swedish, Deep Tissue, Hot Stone, and Prenatal massage. Ability to perform 4-6 massages daily while maintaining proper body mechanics. Services include 60-min ($80-95), 90-min ($120-140), and specialty treatments ($140-180).\nSchedule: Wednesday-Sunday with morning and evening shifts available. Monday/Tuesday off.\nCompensation: $25-35/hour base + 15% service commission + tips (averaging $15-25 per service).',
    'salon-receptionist': 'Position: Salon Receptionist/Coordinator\nRequirements: Previous customer service experience, proficiency with booking software (Vagaro preferred), excellent phone manner, and ability to multitask in fast-paced environment. Responsibilities include managing appointments for 10+ service providers, processing payments (average 25-40 transactions daily), maintaining retail inventory (30+ SKUs), and ensuring exceptional client experience from greeting to checkout.\nSchedule: Tuesday-Saturday, 9:30am-6:30pm with 30-minute lunch. Sunday/Monday off.\nCompensation: $15-18/hour base + retail commission (3%) + monthly bonus based on rebooking rate.',
    'salon-manager': 'Position: Salon Manager\nRequirements: 3+ years salon industry experience with 1+ year in management. Strong leadership, scheduling, inventory management, and conflict resolution skills. Responsibilities include overseeing 15+ staff members, maintaining 85%+ booking efficiency, managing retail (monthly sales $8K-12K), handling payroll, ensuring compliance with health regulations, and maintaining service quality standards. QuickBooks and Vagaro experience required.\nSchedule: Tuesday-Saturday with mixture of opening (9am-5pm) and closing shifts (12pm-8pm). Sunday/Monday off.\nCompensation: $50K-65K annual salary based on experience + quarterly performance bonuses + health insurance contribution + paid vacation.',
    'other': 'Position: Beauty Professional\nRequirements: Current license in relevant specialty with minimum 1 year professional experience. Must demonstrate technical proficiency in your field, excellent client communication, ability to maintain detailed service records, and commitment to continuing education. Portfolio/practical demonstration may be required.\nSchedule: Flexible scheduling available with minimum 25 hours weekly commitment. One weekend day required.\nCompensation: Competitive commission structure (45-65% based on experience and service type) + retail commission + tips. Booth rental options available for experienced professionals with existing clientele.'
  },
  // Vietnamese versions
  professionalVi: {
    'nail-technician': 'Chúng tôi đang tìm kiếm một Kỹ thuật viên Nail có kinh nghiệm để tham gia vào đội ngũ chuyên nghiệp của chúng tôi. Ứng viên lý tưởng sẽ có chuyên môn về manicure, pedicure, đắp gel và nghệ thuật trang trí móng. Sự chú ý đến chi tiết và tận tâm với sự hài lòng của khách hàng là điều cần thiết.',
    'hair-stylist': 'Salon của chúng tôi đang tìm kiếm một Stylist Tóc chuyên nghiệp để tham gia vào đội ngũ. Ứng viên thành công sẽ có kinh nghiệm cắt, nhuộm và tạo kiểu cho đa dạng khách hàng. Kỹ năng kỹ thuật mạnh mẽ và sáng tạo là yêu cầu bắt buộc.',
    'esthetician': 'Chúng tôi đang tìm kiếm một Chuyên viên Chăm sóc da được cấp phép để cung cấp dịch vụ chăm sóc da ngoại hạng. Ứng viên lý tưởng sẽ thành thạo trong các liệu pháp facial, điều trị cơ thể và kỹ thuật tẩy lông. Kiến thức về các quy trình chăm sóc da nâng cao là điều ưu tiên.',
    'lash-tech': 'Studio làm đẹp của chúng tôi đang tìm kiếm một Kỹ thuật viên Mi chuyên nghiệp có kinh nghiệm về nối mi classic và volume. Ứng viên lý tưởng sẽ có sự chú ý tuyệt vời đến chi tiết và cam kết tạo ra vẻ ngoài đẹp, được cá nhân hóa.',
    'massage-therapist': 'Chúng tôi đang tìm kiếm một Chuyên viên Massage được cấp phép để tham gia vào đội ngũ chăm sóc sức khỏe của chúng tôi. Ứng viên lý tưởng sẽ thành thạo nhiều kỹ thuật massage và có khả năng tùy chỉnh các liệu pháp dựa trên nhu cầu của khách hàng. Kiến thức giải phẫu học mạnh mẽ là điều cần thiết.',
    'salon-receptionist': 'Chúng tôi đang tìm kiếm một Lễ tân Salon chuyên nghiệp để quản lý hoạt động lễ tân của chúng tôi. Ứng viên lý tưởng sẽ có kỹ năng giao tiếp xuất sắc, chú ý đến chi tiết và có kinh nghiệm với phần mềm lịch hẹn và xử lý thanh toán.',
    'salon-manager': 'Salon của chúng tôi đang tìm kiếm một Quản lý Salon có kinh nghiệm để giám sát hoạt động hàng ngày. Ứng viên lý tưởng sẽ có khả năng lãnh đạo đã được chứng minh, óc kinh doanh và kinh nghiệm quản lý đội ngũ. Kỹ năng dịch vụ khách hàng mạnh mẽ là điều cần thiết.',
    'other': 'Chúng tôi đang tìm kiếm một chuyên gia có trình độ để tham gia vào đội ngũ làm đẹp của chúng tôi. Ứng viên lý tưởng sẽ có kinh nghiệm liên quan trong lĩnh vực của họ, kỹ năng giao tiếp khách hàng xuất sắc và cam kết duy trì tiêu chuẩn dịch vụ cao của chúng tôi.'
  },
  friendlyVi: {
    'nail-technician': 'Hãy tham gia vào gia đình salon nail của chúng tôi! Chúng tôi đang tìm kiếm một Kỹ thuật viên Nail tài năng, người yêu thích việc tạo ra những bộ móng đẹp và làm cho khách hàng mỉm cười. Nếu bạn thích môi trường làm việc thân thiện và có kỹ năng làm móng tay, móng chân, và nail art, chúng tôi rất muốn gặp bạn!',
    'hair-stylist': 'Hãy tham gia vào đội ngũ salon vui vẻ, hỗ trợ của chúng tôi! Chúng tôi đang tìm kiếm một Stylist Tóc đam mê, người thích kết nối với khách hàng và tạo ra những kiểu tóc tuyệt đẹp. Nếu bạn yêu thích công việc của mình và muốn làm việc tại một nơi cảm giác như gia đình, chúng tôi là salon dành cho bạn!',
    'esthetician': 'Chúng tôi đang phát triển gia đình chăm sóc da! Nếu bạn là một Chuyên viên Chăm sóc da thích giúp mọi người tự tin về làn da của họ và thích làm việc trong môi trường ấm áp, thân thiện, chúng tôi muốn trò chuyện với bạn! Tham gia đội ngũ những người đam mê chăm sóc da thân thiện của chúng tôi.',
    'lash-tech': 'Tham gia vào gia đình mi của chúng tôi! Chúng tôi đang tìm kiếm một Nghệ sĩ Mi thân thiện, người thích tạo ra những bộ mi đẹp và tạo kết nối chân thành với khách hàng. Studio của chúng tôi đề cao sự thân thiện, sáng tạo và môi trường ấm áp.',
    'massage-therapist': 'Trở thành một phần của gia đình wellness của chúng tôi! Chúng tôi đang tìm kiếm một Chuyên viên Massage chu đáo, người thích giúp đỡ người khác thư giãn và chữa lành. Đội ngũ hỗ trợ của chúng tôi đề cao sự kết nối và tạo ra trải nghiệm ấm áp cho tất cả khách hàng của chúng tôi.',
    'salon-receptionist': 'Tham gia vào gia đình salon thân thiện của chúng tôi! Chúng tôi cần một Lễ tân thân thiện với nụ cười ấm áp và kỹ năng giao tiếp tốt. Nếu bạn thích tạo ấn tượng đầu tiên tích cực và giúp khách hàng cảm thấy như ở nhà, chúng tôi rất muốn gặp bạn!',
    'salon-manager': 'Chúng tôi đang tìm kiếm một Quản lý Salon lãnh đạo bằng trái tim! Tham gia vào gia đình salon của chúng tôi và giúp chúng tôi tạo ra một nơi làm việc tuyệt vời nơi các stylist phát triển và khách hàng cảm thấy được chào đón. Nếu bạn đam mê con người và thành công của salon, vai trò này dành cho bạn!',
    'other': 'Tham gia vào đội ngũ làm đẹp thân thiện của chúng tôi! Chúng tôi đang tìm kiếm người yêu thích công việc của họ và thích tạo kết nối với khách hàng. Nếu bạn coi trọng sự thân thiện, làm việc nhóm và mang lại điều tốt nhất cho công việc mỗi ngày, chúng tôi rất muốn chào đón bạn vào gia đình salon của chúng tôi!'
  },
  luxuryVi: {
    'nail-technician': 'Salon nail cao cấp của chúng tôi đang tìm kiếm một Nghệ sĩ Nail xuất sắc để phục vụ khách hàng tinh tế của chúng tôi. Ứng viên lý tưởng sẽ sở hữu độ chính xác kỹ thuật ngoại hạng trong các dịch vụ sang trọng bao gồm đắp gel, nail art phức tạp và các liệu pháp cao cấp. Chỉ những người có portfolio thể hiện tài năng phi thường mới cần nộp đơn.',
    'hair-stylist': 'Salon hàng đầu của chúng tôi tìm kiếm một Nghệ sĩ Tóc xuất chúng để tham gia vào đội ngũ độc quyền của chúng tôi. Ứng viên lý tưởng sẽ có portfolio ấn tượng thể hiện sự thành thạo các kỹ thuật tiên tiến, kinh nghiệm làm tóc cho người nổi tiếng và khả năng tạo ra kết quả biến đổi, cao cấp cho khách hàng ưu tú của chúng tôi.',
    'esthetician': 'Spa sang trọng của chúng tôi đang tìm kiếm một Chuyên gia Chăm sóc da bậc thầy để mang đến những trải nghiệm chăm sóc da ngoại hạng. Ứng viên lý tưởng sẽ có đào tạo nâng cao về các liệu pháp cao cấp, kinh nghiệm với các dòng sản phẩm cao cấp và khả năng mang đến kết quả chuyển đổi với sự chú ý đến từng chi tiết hoàn hảo.',
    'lash-tech': 'Studio làm đẹp danh tiếng của chúng tôi đang tìm kiếm một Nghệ sĩ Mi bậc thầy để phục vụ khách hàng tinh hoa của chúng tôi. Chúng tôi yêu cầu kỹ thuật nối mi volume ngoại hạng, tính đối xứng hoàn hảo và khả năng tạo ra những thiết kế tùy chỉnh làm nổi bật vẻ đẹp tự nhiên của khách hàng với kết quả sang trọng.',
    'massage-therapist': 'Spa độc quyền của chúng tôi đang tìm kiếm một Chuyên viên Massage xuất sắc để mang đến những trải nghiệm wellness ngoại hạng. Ứng viên lý tưởng sẽ thành thạo các phương pháp massage cao cấp, có kinh nghiệm phục vụ khách hàng cao cấp và có khả năng tùy chỉnh các hành trình trị liệu chất lượng vượt trội.',
    'salon-receptionist': 'Salon cao cấp của chúng tôi tìm kiếm một Lễ tân Tiếp đón tinh tế để tạo ra ấn tượng đầu tiên ngoại hạng. Ứng viên lý tưởng sẽ sở hữu phong thái hoàn hảo, kỹ năng giao tiếp xuất sắc và khả năng dự đoán nhu cầu của khách hàng danh giá của chúng tôi.',
    'salon-manager': 'Tập đoàn salon danh tiếng của chúng tôi tìm kiếm một Giám đốc tài năng để nâng cao trải nghiệm thương hiệu sang trọng của chúng tôi. Ứng viên lý tưởng sẽ có thành tích đã được chứng minh trong quản lý salon cao cấp, óc kinh doanh xuất sắc và tầm nhìn để duy trì vị thế của chúng tôi như một nhà lãnh đạo trong dịch vụ làm đẹp sang trọng.',
    'other': 'Cơ sở làm đẹp cao cấp của chúng tôi tìm kiếm một chuyên gia xuất sắc để nâng cao dịch vụ cao cấp của chúng tôi. Ứng viên lý tưởng sẽ thể hiện sự xuất sắc trong lĩnh vực chuyên môn của họ, quan hệ khách hàng hoàn hảo và khả năng đóng góp vào danh tiếng của chúng tôi về chất lượng không thỏa hiệp.'
  },
  casualVi: {
    'nail-technician': 'Đang tìm thợ nail để tham gia salon cool của chúng tôi! Nếu bạn giỏi về gel, bột đắp và các thiết kế cơ bản, và muốn làm việc với một đội ngũ thoải mái, hãy liên hệ với chúng tôi! Đảm bảo lịch làm việc linh hoạt và môi trường tốt.',
    'hair-stylist': 'Đang tìm thợ tóc cool cho salon chill của chúng tôi! Nếu bạn biết cắt, nhuộm và tạo kiểu làm mọi người hài lòng và muốn làm việc trong môi trường thoải mái với những người dễ thương, hãy nói chuyện với chúng tôi!',
    'esthetician': 'Đang cần một chuyên viên chăm sóc da chill cho spa thân thiện của chúng tôi! Nếu bạn thích làm facial, waxing và giúp mọi người cảm thấy tốt về làn da của họ trong một môi trường thoải mái, chúng tôi muốn gặp bạn!',
    'lash-tech': 'Đang tìm nghệ sĩ mi cool! Nếu bạn giỏi về mi classic và volume và muốn làm việc trong một studio chill, không drama với giờ làm việc linh hoạt, hãy liên hệ với chúng tôi. Chỉ nhận người tích cực!',
    'massage-therapist': 'Đang cần chuyên viên massage thoải mái cho không gian wellness chill của chúng tôi! Nếu bạn có kỹ thuật tốt và muốn làm việc trong một môi trường ít căng thẳng với một đội ngũ thân thiện, chúng tôi rất muốn trò chuyện.',
    'salon-receptionist': 'Đang tìm một gương mặt thân thiện cho quầy lễ tân salon của chúng tôi! Nếu bạn có tổ chức, giỏi giao tiếp với mọi người và muốn làm việc trong một môi trường thoải mái, tích cực, hãy gửi tin nhắn cho chúng tôi!',
    'salon-manager': 'Cần một quản lý salon cool, bình tĩnh! Nếu bạn có thể xử lý lịch trình, giữ cho đội ngũ hạnh phúc và quản lý khách hàng không drama, đồng thời duy trì một không khí thoải mái, chúng tôi muốn nói chuyện!',
    'other': 'Đang tìm chuyên gia làm đẹp tài năng cho salon thoải mái của chúng tôi! Dù chuyên môn của bạn là gì, nếu bạn giỏi về điều bạn làm và muốn làm việc trong một môi trường chill với những người cool, chúng ta chắc chắn nên kết nối!'
  },
  detailedVi: {
    'nail-technician': 'Vị trí: Kỹ thuật viên Nail toàn thời gian\nYêu cầu: Tối thiểu 2 năm kinh nghiệm, giấy phép hợp lệ, thành thạo đắp gel, đắp bột, dipping powder và nail art. Phải duy trì tiêu chuẩn vệ sinh và phục vụ 6-8 khách hàng mỗi ngày. Dịch vụ bao gồm làm móng tay (25-45$), móng chân (35-60$), đắp bột (45-75$) và fill (35-55$).\nLịch làm việc: Thứ Ba-Thứ Bảy, 9:30 sáng-7:00 tối với 1 giờ nghỉ trưa. Chủ nhật/Thứ Hai nghỉ.\nThù lao: 50-65% hoa hồng dựa trên kinh nghiệm + tip (trung bình 100-200$ mỗi ngày).',
    'hair-stylist': 'Vị trí: Stylist Tóc toàn thời gian\nYêu cầu: Tối thiểu 2 năm kinh nghiệm salon, giấy phép thẩm mỹ hợp lệ, thành thạo kỹ thuật cắt hiện đại, pha màu, balayage và tạo kiểu. Yêu cầu xem xét portfolio. Phải duy trì sạch sẽ khu vực làm việc và phục vụ 6-10 khách hàng mỗi ngày. Dịch vụ bao gồm cắt (45-75$), nhuộm màu (65-150$), highlight (85-200$) và tạo kiểu (45-85$).\nLịch làm việc: Thứ Tư-Chủ Nhật với giờ linh hoạt. Thứ Hai/Thứ Ba nghỉ.\nThù lao: 45-60% hoa hồng dựa trên kinh nghiệm + hoa hồng bán lẻ (10%) + tip.',
    'esthetician': 'Vị trí: Chuyên viên Chăm sóc da được cấp phép\nYêu cầu: Giấy phép chăm sóc da hợp lệ với tối thiểu 1 năm kinh nghiệm. Thành thạo facial, peel hóa học (đến 30%), wax (toàn thân), nhuộm mi/lông mày và trang điểm. Ưu tiên kiến thức về các dòng sản phẩm bao gồm Image, Dermalogica và SkinCeuticals. Dịch vụ bao gồm facial (75-150$), peel (85-175$), wax (15-80$) và nhuộm (25-45$).\nLịch làm việc: Thứ Năm-Thứ Hai, 10 giờ sáng-8 giờ tối với 1 giờ nghỉ. Thứ Ba/Thứ Tư nghỉ.\nThù lao: 50% hoa hồng + 10% hoa hồng sản phẩm + tip.',
    'lash-tech': 'Vị trí: Kỹ thuật viên Mi được chứng nhận\nYêu cầu: Giấy phép thẩm mỹ/chăm sóc da hợp lệ, chứng chỉ nối mi và 1+ năm kinh nghiệm chuyên nghiệp. Thành thạo kỹ thuật classic, hybrid và volume với kiến thức kỹ lưỡng về cách tách mi, nối và tháo mi đúng cách. Phải duy trì hồ sơ khách hàng chi tiết và thực hiện 4-6 dịch vụ mỗi ngày. Dịch vụ bao gồm nối mi classic full set (120-150$), nối mi volume (180-250$), fill (65-120$) và tháo mi (35$).\nLịch làm việc: Thứ Ba-Thứ Bảy, 10 giờ sáng-7 giờ tối. Chủ nhật/Thứ Hai nghỉ.\nThù lao: 50-60% hoa hồng dựa trên kinh nghiệm + thưởng bán lẻ + tip.',
    'massage-therapist': 'Vị trí: Chuyên viên Massage được cấp phép\nYêu cầu: Giấy phép massage hiện hành với 500+ giờ đào tạo và 1+ năm kinh nghiệm. Thành thạo massage Thụy Điển, Deep Tissue, Đá nóng và Thai sản. Có khả năng thực hiện 4-6 buổi massage mỗi ngày trong khi duy trì cơ chế cơ thể đúng. Dịch vụ bao gồm 60 phút (80-95$), 90 phút (120-140$) và các liệu pháp đặc biệt (140-180$).\nLịch làm việc: Thứ Tư-Chủ Nhật với ca sáng và tối. Thứ Hai/Thứ Ba nghỉ.\nThù lao: 25-35$/giờ cơ bản + 15% hoa hồng dịch vụ + tip (trung bình 15-25$ mỗi dịch vụ).',
    'salon-receptionist': 'Vị trí: Lễ tân/Điều phối viên Salon\nYêu cầu: Kinh nghiệm dịch vụ khách hàng trước đó, thành thạo với phần mềm đặt lịch (ưu tiên Vagaro), kỹ năng giao tiếp điện thoại tốt, và khả năng đa nhiệm trong môi trường nhịp độ nhanh. Trách nhiệm bao gồm quản lý lịch hẹn cho 10+ nhà cung cấp dịch vụ, xử lý thanh toán (trung bình 25-40 giao dịch mỗi ngày), duy trì hàng tồn kho bán lẻ (30+ SKUs), và đảm bảo trải nghiệm khách hàng ngoại hạng từ chào đón đến thanh toán.\nLịch làm việc: Thứ Ba-Thứ Bảy, 9:30 sáng-6:30 tối với 30 phút ăn trưa. Chủ nhật/Thứ Hai nghỉ.\nThù lao: 15-18$/giờ cơ bản + hoa hồng bán lẻ (3%) + thưởng hàng tháng dựa trên tỷ lệ đặt lịch lại.',
    'salon-manager': 'Vị trí: Quản lý Salon\nYêu cầu: 3+ năm kinh nghiệm ngành salon với 1+ năm trong quản lý. Kỹ năng lãnh đạo, lập lịch, quản lý hàng tồn kho và giải quyết xung đột mạnh mẽ. Trách nhiệm bao gồm giám sát 15+ nhân viên, duy trì hiệu quả đặt lịch 85%+, quản lý bán lẻ (doanh số hàng tháng 8K-12K$), xử lý bảng lương, đảm bảo tuân thủ quy định sức khỏe và duy trì tiêu chuẩn chất lượng dịch vụ. Yêu cầu kinh nghiệm QuickBooks và Vagaro.\nLịch làm việc: Thứ Ba-Thứ Bảy với kết hợp ca mở cửa (9 giờ sáng-5 giờ chiều) và ca đóng cửa (12 giờ trưa-8 giờ tối). Chủ nhật/Thứ Hai nghỉ.\nThù lao: 50K-65K$ lương hàng năm dựa trên kinh nghiệm + thưởng hiệu suất hàng quý + đóng góp bảo hiểm sức khỏe + nghỉ phép có lương.',
    'other': 'Vị trí: Chuyên gia Làm đẹp\nYêu cầu: Giấy phép hiện hành trong chuyên ngành liên quan với tối thiểu 1 năm kinh nghiệm chuyên nghiệp. Phải thể hiện thành thạo kỹ thuật trong lĩnh vực của bạn, giao tiếp khách hàng xuất sắc, khả năng duy trì hồ sơ dịch vụ chi tiết, và cam kết học tập liên tục. Có thể yêu cầu portfolio/trình diễn thực tế.\nLịch làm việc: Lịch làm việc linh hoạt với cam kết tối thiểu 25 giờ mỗi tuần. Yêu cầu một ngày cuối tuần.\nThù lao: Cơ cấu hoa hồng cạnh tranh (45-65% dựa trên kinh nghiệm và loại dịch vụ) + hoa hồng bán lẻ + tip. Có lựa chọn thuê booth cho các chuyên gia có kinh nghiệm với khách hàng sẵn có.'
  }
};
