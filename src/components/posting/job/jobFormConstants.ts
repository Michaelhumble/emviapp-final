import { JobFormValues } from "./jobFormSchema";

// Job templates for pre-filling the job form
export const JOB_TEMPLATES = [
  {
    id: "nail-technician",
    title: "Nail Technician",
    type: "full-time",
    description: "We are seeking experienced nail technicians to join our team. Responsibilities include manicures, pedicures, and nail enhancements. Must have excellent customer service skills and attention to detail."
  },
  {
    id: "hair-stylist",
    title: "Hair Stylist",
    type: "full-time", 
    description: "Looking for professional hair stylists with experience in cutting, coloring, and styling. Must have a portfolio of work and be able to consult with clients to achieve their desired look."
  },
  {
    id: "esthetician",
    title: "Esthetician",
    type: "full-time",
    description: "Seeking licensed estheticians for facials, waxing, and skincare treatments. Knowledge of products and skincare routines required."
  },
  {
    id: "receptionist",
    title: "Salon Receptionist",
    type: "full-time",
    description: "Front desk position for greeting clients, answering phones, scheduling appointments, and handling payments. Must be organized with excellent communication skills."
  },
  {
    id: "other",
    title: "Other Beauty Professional",
    type: "full-time",
    description: "Looking for beauty professionals to join our team. Please specify your specialty and experience in your application."
  }
];

// Vietnamese Job templates
export const JOB_TEMPLATES_VI = [
  {
    id: "nail-technician",
    title: "Thợ Nail",
    type: "full-time",
    description: "Chúng tôi đang tìm kiếm thợ nail có kinh nghiệm để gia nhập đội ngũ của chúng tôi. Công việc bao gồm làm móng tay, móng chân và đắp móng. Phải có kỹ năng phục vụ khách hàng tốt và chú ý đến chi tiết."
  },
  {
    id: "hair-stylist",
    title: "Thợ Tóc",
    type: "full-time",
    description: "Đang tìm kiếm thợ tóc chuyên nghiệp có kinh nghiệm cắt, nhuộm và tạo kiểu. Phải có hồ sơ công việc và có thể tư vấn với khách hàng để đạt được kiểu tóc mong muốn của họ."
  },
  {
    id: "esthetician",
    title: "Chuyên Viên Thẩm Mỹ",
    type: "full-time",
    description: "Tìm kiếm chuyên viên thẩm mỹ được cấp phép cho các dịch vụ chăm sóc da mặt, wax lông và điều trị da. Yêu cầu kiến thức về sản phẩm và quy trình chăm sóc da."
  },
  {
    id: "receptionist",
    title: "Lễ Tân Salon",
    type: "full-time",
    description: "Vị trí lễ tân phụ trách chào đón khách hàng, trả lời điện thoại, sắp xếp cuộc hẹn và xử lý thanh toán. Phải có tổ chức và kỹ năng giao tiếp tốt."
  },
  {
    id: "other",
    title: "Chuyên Gia Làm Đẹp Khác",
    type: "full-time",
    description: "Đang tìm kiếm các chuyên gia làm đẹp để gia nhập đội ngũ của chúng tôi. Vui lòng nêu rõ chuyên môn và kinh nghiệm của bạn trong đơn đăng ký."
  }
];

// Polish templates for the AI Polish modal
export const POLISH_TEMPLATES = {
  "nail-technician": [
    {
      id: "professional",
      title: "Professional",
      description: "We are seeking experienced nail technicians to join our established salon. The ideal candidate will have a minimum of 2 years of experience in manicures, pedicures, and nail enhancements including acrylics and gel. Attention to detail, excellent sanitation practices, and customer service skills are essential. Our clientele expects high-quality work in a clean, professional environment. Full-time and part-time positions available with competitive pay structure."
    },
    {
      id: "friendly",
      title: "Friendly",
      description: "Join our nail salon family! We're looking for friendly, talented nail techs who love creating beautiful nails and making clients feel special. Experience with manicures, pedicures, and enhancements (acrylics, gel, dip) is needed. We offer a positive, drama-free workplace where everyone helps each other succeed. Great tips, flexible scheduling, and a fun work environment await the right person!"
    },
    {
      id: "luxury",
      title: "Luxury",
      description: "Prestigious nail salon seeking exceptional nail artists to serve our exclusive clientele. Candidates must demonstrate impeccable technique in luxury nail services, including intricate nail art, perfect application of gel and acrylic enhancements, and flawless manicure/pedicure services. We provide ongoing education in the latest techniques and premium products. Compensation includes high-end service commission, gratuities, and benefits befitting top industry professionals."
    },
    {
      id: "simple",
      title: "Simple",
      description: "Nail tech wanted. Must know manicures, pedicures, gel, and acrylic. Clean work and good attitude required. Good pay and tips. Call to apply."
    },
    {
      id: "detailed",
      title: "Detailed",
      description: "NAIL TECHNICIAN POSITION\n\nQualifications:\n- Valid nail technician license\n- 2+ years experience in salon setting\n- Proficient in: gel polish, acrylics, dip powder, nail art, manicures, pedicures\n- Knowledge of proper sanitation procedures\n\nSchedule:\n- Full-time & part-time available\n- Weekend availability required\n\nCompensation:\n- Commission-based (up to 60% DOE)\n- Tips average $100-200 daily\n- Product discount\n- Paid continuing education\n\nApply with resume and work samples."
    }
  ],
  "hair-stylist": [
    {
      id: "professional",
      title: "Professional",
      description: "We are seeking experienced hair stylists to join our established salon. The ideal candidate will have a minimum of 2 years of experience in cutting, coloring, and styling. Attention to detail, excellent sanitation practices, and customer service skills are essential. Our clientele expects high-quality work in a clean, professional environment. Full-time and part-time positions available with competitive pay structure."
    },
    {
      id: "friendly",
      title: "Friendly",
      description: "Join our hair salon family! We're looking for friendly, talented hair stylists who love creating beautiful hair and making clients feel special. Experience with cutting, coloring, and styling is needed. We offer a positive, drama-free workplace where everyone helps each other succeed. Great tips, flexible scheduling, and a fun work environment await the right person!"
    },
    {
      id: "luxury",
      title: "Luxury",
      description: "Prestigious hair salon seeking exceptional hair artists to serve our exclusive clientele. Candidates must demonstrate impeccable technique in luxury hair services, including intricate hair coloring, perfect hair cuts, and flawless styling services. We provide ongoing education in the latest techniques and premium products. Compensation includes high-end service commission, gratuities, and benefits befitting top industry professionals."
    },
    {
      id: "simple",
      title: "Simple",
      description: "Hair stylist wanted. Must know cutting, coloring, and styling. Clean work and good attitude required. Good pay and tips. Call to apply."
    },
    {
      id: "detailed",
      title: "Detailed",
      description: "HAIR STYLIST POSITION\n\nQualifications:\n- Valid hair stylist license\n- 2+ years experience in salon setting\n- Proficient in: hair cutting, hair coloring, hair styling, hair extensions\n- Knowledge of proper sanitation procedures\n\nSchedule:\n- Full-time & part-time available\n- Weekend availability required\n\nCompensation:\n- Commission-based (up to 60% DOE)\n- Tips average $100-200 daily\n- Product discount\n- Paid continuing education\n\nApply with resume and work samples."
    }
  ],
  "esthetician": [
    {
      id: "professional",
      title: "Professional",
      description: "We are seeking licensed estheticians to join our established salon. The ideal candidate will have a minimum of 2 years of experience in facials, waxing, and skincare treatments. Knowledge of products and skincare routines required. Attention to detail, excellent sanitation practices, and customer service skills are essential. Our clientele expects high-quality work in a clean, professional environment. Full-time and part-time positions available with competitive pay structure."
    },
    {
      id: "friendly",
      title: "Friendly",
      description: "Join our salon family! We're looking for friendly, talented estheticians who love creating beautiful skin and making clients feel special. Experience with facials, waxing, and skincare treatments is needed. We offer a positive, drama-free workplace where everyone helps each other succeed. Great tips, flexible scheduling, and a fun work environment await the right person!"
    },
    {
      id: "luxury",
      title: "Luxury",
      description: "Prestigious salon seeking exceptional estheticians to serve our exclusive clientele. Candidates must demonstrate impeccable technique in luxury skincare services, including advanced facials, perfect waxing, and flawless skincare treatments. We provide ongoing education in the latest techniques and premium products. Compensation includes high-end service commission, gratuities, and benefits befitting top industry professionals."
    },
    {
      id: "simple",
      title: "Simple",
      description: "Esthetician wanted. Must know facials, waxing, and skincare treatments. Clean work and good attitude required. Good pay and tips. Call to apply."
    },
    {
      id: "detailed",
      title: "Detailed",
      description: "ESTHETICIAN POSITION\n\nQualifications:\n- Valid esthetician license\n- 2+ years experience in salon setting\n- Proficient in: facials, waxing, skincare treatments, microdermabrasion\n- Knowledge of proper sanitation procedures\n\nSchedule:\n- Full-time & part-time available\n- Weekend availability required\n\nCompensation:\n- Commission-based (up to 60% DOE)\n- Tips average $100-200 daily\n- Product discount\n- Paid continuing education\n\nApply with resume and work samples."
    }
  ],
  "receptionist": [
    {
      id: "professional",
      title: "Professional",
      description: "We are seeking a professional salon receptionist to join our team. Responsibilities include greeting clients, answering phones, scheduling appointments, and handling payments. Must be organized with excellent communication skills. Our clientele expects high-quality service in a clean, professional environment. Full-time and part-time positions available with competitive pay structure."
    },
    {
      id: "friendly",
      title: "Friendly",
      description: "Join our salon family! We're looking for a friendly, organized receptionist to greet clients, answer phones, and schedule appointments. Must have excellent communication skills and a positive attitude. We offer a positive, drama-free workplace where everyone helps each other succeed. Great pay, flexible scheduling, and a fun work environment await the right person!"
    },
    {
      id: "luxury",
      title: "Luxury",
      description: "Prestigious salon seeking an exceptional receptionist to serve our exclusive clientele. Candidates must demonstrate impeccable communication skills, be highly organized, and have a professional demeanor. Responsibilities include greeting clients, answering phones, scheduling appointments, and handling payments. We provide ongoing training in the latest techniques and premium products. Compensation includes high-end service commission, gratuities, and benefits befitting top industry professionals."
    },
    {
      id: "simple",
      title: "Simple",
      description: "Salon receptionist wanted. Must be organized, have excellent communication skills, and a positive attitude. Responsibilities include greeting clients, answering phones, and scheduling appointments. Good pay and benefits. Call to apply."
    },
    {
      id: "detailed",
      title: "Detailed",
      description: "SALON RECEPTIONIST POSITION\n\nQualifications:\n- High school diploma or equivalent\n- 2+ years experience in a salon setting\n- Proficient in: Microsoft Office, salon software\n- Knowledge of proper sanitation procedures\n\nSchedule:\n- Full-time & part-time available\n- Weekend availability required\n\nCompensation:\n- Hourly wage (DOE)\n- Benefits package available\n- Paid time off\n- Paid continuing education\n\nApply with resume and cover letter."
    }
  ],
  "other": [
    {
      id: "professional",
      title: "Professional",
      description: "We are seeking beauty professionals to join our team. Please specify your specialty and experience in your application. Our clientele expects high-quality service in a clean, professional environment. Full-time and part-time positions available with competitive pay structure."
    },
    {
      id: "friendly",
      title: "Friendly",
      description: "Join our salon family! We're looking for friendly, talented beauty professionals to join our team. Please specify your specialty and experience in your application. We offer a positive, drama-free workplace where everyone helps each other succeed. Great pay, flexible scheduling, and a fun work environment await the right person!"
    },
    {
      id: "luxury",
      title: "Luxury",
      description: "Prestigious salon seeking exceptional beauty professionals to serve our exclusive clientele. Candidates must demonstrate impeccable technique in their specialty, be highly organized, and have a professional demeanor. Please specify your specialty and experience in your application. We provide ongoing training in the latest techniques and premium products. Compensation includes high-end service commission, gratuities, and benefits befitting top industry professionals."
    },
    {
      id: "simple",
      title: "Simple",
      description: "Beauty professional wanted. Please specify your specialty and experience in your application. Clean work and good attitude required. Good pay and benefits. Call to apply."
    },
    {
      id: "detailed",
      title: "Detailed",
      description: "BEAUTY PROFESSIONAL POSITION\n\nQualifications:\n- Valid license in your specialty\n- 2+ years experience in a salon setting\n- Proficient in: your specialty\n- Knowledge of proper sanitation procedures\n\nSchedule:\n- Full-time & part-time available\n- Weekend availability required\n\nCompensation:\n- Hourly wage (DOE)\n- Benefits package available\n- Paid time off\n- Paid continuing education\n\nApply with resume and cover letter."
    }
  ]
};

// Adding Vietnamese polish templates
export const POLISH_TEMPLATES_VI = {
  "nail-technician": [
    {
      id: "professional",
      title: "Chuyên Nghiệp",
      description: "Chúng tôi đang tìm kiếm thợ nail có kinh nghiệm để gia nhập salon đã được thiết lập của chúng tôi. Ứng viên lý tưởng sẽ có tối thiểu 2 năm kinh nghiệm làm móng tay, móng chân và đắp móng bao gồm bột và gel. Chú ý đến chi tiết, thực hành vệ sinh tuyệt vời và kỹ năng phục vụ khách hàng là điều cần thiết. Khách hàng của chúng tôi mong đợi công việc chất lượng cao trong môi trường sạch sẽ, chuyên nghiệp. Có vị trí toàn thời gian và bán thời gian với cơ cấu lương cạnh tranh."
    },
    {
      id: "friendly",
      title: "Thân Thiện",
      description: "Hãy gia nhập gia đình salon móng của chúng tôi! Chúng tôi đang tìm kiếm các thợ nail thân thiện, tài năng, những người yêu thích việc tạo ra những bộ móng đẹp và làm cho khách hàng cảm thấy đặc biệt. Cần có kinh nghiệm với móng tay, móng chân và đắp móng (bột, gel, nhúng). Chúng tôi cung cấp một nơi làm việc tích cực, không drama, nơi mọi người giúp đỡ nhau thành công. Tiền tip tốt, lịch làm việc linh hoạt và môi trường làm việc vui vẻ đang chờ đợi người phù hợp!"
    },
    {
      id: "luxury",
      title: "Sang Trọng",
      description: "Salon móng uy tín đang tìm kiếm những nghệ sĩ nail xuất sắc để phục vụ khách hàng độc quyền của chúng tôi. Ứng viên phải thể hiện kỹ thuật hoàn hảo trong các dịch vụ móng cao cấp, bao gồm nghệ thuật móng phức tạp, ứng dụng hoàn hảo của gel và đắp bột, và dịch vụ làm móng tay/chân hoàn hảo. Chúng tôi cung cấp giáo dục liên tục về các kỹ thuật mới nhất và sản phẩm cao cấp. Thù lao bao gồm hoa hồng dịch vụ cao cấp, tiền boa và phúc lợi xứng đáng với các chuyên gia hàng đầu trong ngành."
    },
    {
      id: "simple",
      title: "Đơn Giản",
      description: "Cần thợ nail. Phải biết làm móng tay, móng chân, gel và bột. Yêu cầu làm việc sạch sẽ và thái độ tốt. Lương và tip hấp dẫn. Gọi điện để ứng tuyển."
    },
    {
      id: "detailed",
      title: "Chi Tiết",
      description: "VỊ TRÍ THỢ NAIL\n\nYêu cầu:\n- Giấy phép thợ nail hợp lệ\n- Trên 2 năm kinh nghiệm trong môi trường salon\n- Thành thạo: sơn gel, đắp bột, bột nhúng, nghệ thuật móng, làm móng tay, móng chân\n- Kiến thức về quy trình vệ sinh đúng cách\n\nLịch làm việc:\n- Có cả toàn thời gian & bán thời gian\n- Yêu cầu làm việc cuối tuần\n\nThù lao:\n- Dựa trên hoa hồng (lên đến 60% tùy kinh nghiệm)\n- Tiền tip trung bình $100-200 mỗi ngày\n- Giảm giá sản phẩm\n- Đào tạo nâng cao có lương\n\nỨng tuyển với sơ yếu lý lịch và mẫu công việc."
    },
    {
      id: "modern",
      title: "Hiện Đại",
      description: "🌟 TUYỂN THỢ NAIL CHUYÊN NGHIỆP 🌟\n\nSalon hiện đại của chúng tôi đang mở rộng! Chúng tôi cung cấp môi trường làm việc sạch sẽ, thiết bị mới nhất và sản phẩm cao cấp. Thợ nail có kinh nghiệm sẽ được hưởng lương cao, tiền boa tốt và lịch làm việc linh hoạt. Chúng tôi phục vụ khách hàng cao cấp và đánh giá cao thợ nail có thể tạo ra các thiết kế hiện đại, từ nghệ thuật móng tối giản đến các thiết kế phức tạp. Hãy tham gia đội ngũ của chúng tôi để phát triển sự nghiệp của bạn!"
    },
    {
      id: "supportive",
      title: "Hỗ Trợ",
      description: "🤝 SALON THÂN THIỆN ĐANG TUYỂN THỢ NAIL 🤝\n\nChúng tôi tin vào việc hỗ trợ thợ nail của mình! Salon của chúng tôi cung cấp:\n• Lương cạnh tranh + tiền boa tuyệt vời\n• Có bảo hiểm y tế cho nhân viên toàn thời gian\n• 5 ngày nghỉ phép có lương mỗi năm\n• Lịch làm việc ổn định, không thay đổi phút chót\n• Cung cấp bữa trưa miễn phí\n• Môi trường không độc hại, hỗ trợ lẫn nhau\n\nChúng tôi tìm kiếm thợ nail biết làm dịch vụ cơ bản đến nâng cao. Vui lòng liên hệ để biết thêm thông tin!"
    },
    {
      id: "premium",
      title: "Cao Cấp",
      description: "✨ CƠ HỘI CHO THỢ NAIL CAO CẤP ✨\n\nSalon 5 sao của chúng tôi chỉ phục vụ những khách hàng tinh tế nhất. Chúng tôi tìm kiếm nghệ nhân nail xuất sắc có thể:\n• Thực hiện hoàn hảo các dịch vụ bao gồm: gel, bột acrylic, nghệ thuật 3D, đính đá\n• Duy trì tiêu chuẩn vệ sinh hoàn hảo\n• Giao tiếp chuyên nghiệp với khách hàng VIP\n\nChúng tôi cung cấp thu nhập cao nhất trong ngành (lên đến $10,000-$15,000/tháng bao gồm tiền tip), khách hàng ổn định, và các sản phẩm cao cấp nhất. Chỉ những ứng viên xuất sắc mới được xem xét."
    }
  ],
  "hair-stylist": [
    {
      id: "professional",
      title: "Chuyên Nghiệp",
      description: "Chúng tôi đang tìm kiếm thợ tóc có kinh nghiệm để gia nhập salon đã được thiết lập của chúng tôi. Ứng viên lý tưởng sẽ có tối thiểu 2 năm kinh nghiệm trong việc cắt, nhuộm và tạo kiểu tóc. Chú ý đến chi tiết, thực hành vệ sinh tuyệt vời và kỹ năng phục vụ khách hàng là điều cần thiết. Khách hàng của chúng tôi mong đợi công việc chất lượng cao trong môi trường sạch sẽ, chuyên nghiệp. Có vị trí toàn thời gian và bán thời gian với cơ cấu lương cạnh tranh."
    },
    {
      id: "friendly",
      title: "Thân Thiện",
      description: "Hãy gia nhập gia đình salon tóc của chúng tôi! Chúng tôi đang tìm kiếm những thợ tóc thân thiện, tài năng, những người yêu thích việc tạo ra những kiểu tóc đẹp và làm cho khách hàng cảm thấy đặc biệt. Cần có kinh nghiệm trong việc cắt, nhuộm và tạo kiểu tóc. Chúng tôi cung cấp một nơi làm việc tích cực, không drama, nơi mọi người giúp đỡ nhau thành công. Tiền tip tốt, lịch làm việc linh hoạt và môi trường làm việc vui vẻ đang chờ đợi người phù hợp!"
    },
    {
      id: "luxury",
      title: "Sang Trọng",
      description: "Salon tóc uy tín đang tìm kiếm những nghệ sĩ tóc xuất sắc để phục vụ khách hàng độc quyền của chúng tôi. Ứng viên phải thể hiện kỹ thuật hoàn hảo trong các dịch vụ tóc cao cấp, bao gồm nhuộm tóc phức tạp, cắt tóc hoàn hảo và dịch vụ tạo kiểu tóc hoàn hảo. Chúng tôi cung cấp giáo dục liên tục về các kỹ thuật mới nhất và sản phẩm cao cấp. Thù lao bao gồm hoa hồng dịch vụ cao cấp, tiền boa và phúc lợi xứng đáng với các chuyên gia hàng đầu trong ngành."
    },
    {
      id: "simple",
      title: "Đơn Giản",
      description: "Cần thợ tóc. Phải biết cắt, nhuộm và tạo kiểu tóc. Yêu cầu làm việc sạch sẽ và thái độ tốt. Lương và tip hấp dẫn. Gọi điện để ứng tuyển."
    },
    {
      id: "detailed",
      title: "Chi Tiết",
      description: "VỊ TRÍ THỢ TÓC\n\nYêu cầu:\n- Giấy phép thợ tóc hợp lệ\n- Trên 2 năm kinh nghiệm trong môi trường salon\n- Thành thạo: cắt tóc, nhuộm tóc, tạo kiểu tóc, nối tóc\n- Kiến thức về quy trình vệ sinh đúng cách\n\nLịch làm việc:\n- Có cả toàn thời gian & bán thời gian\n- Yêu cầu làm việc cuối tuần\n\nThù lao:\n- Dựa trên hoa hồng (lên đến 60% tùy kinh nghiệm)\n- Tiền tip trung bình $100-200 mỗi ngày\n- Giảm giá sản phẩm\n- Đào tạo nâng cao có lương\n\nỨng tuyển với sơ yếu lý lịch và mẫu công việc."
    }
  ],
  "esthetician": [
    {
      id: "professional",
      title: "Chuyên Nghiệp",
      description: "Chúng tôi đang tìm kiếm chuyên viên thẩm mỹ có kinh nghiệm để gia nhập salon đã được thiết lập của chúng tôi. Ứng viên lý tưởng sẽ có tối thiểu 2 năm kinh nghiệm trong việc chăm sóc da mặt, wax lông và điều trị da. Yêu cầu kiến thức về sản phẩm và quy trình chăm sóc da. Chú ý đến chi tiết, thực hành vệ sinh tuyệt vời và kỹ năng phục vụ khách hàng là điều cần thiết. Khách hàng của chúng tôi mong đợi công việc chất lượng cao trong môi trường sạch sẽ, chuyên nghiệp. Có vị trí toàn thời gian và bán thời gian với cơ cấu lương cạnh tranh."
    },
    {
      id: "friendly",
      title: "Thân Thiện",
      description: "Hãy gia nhập gia đình salon của chúng tôi! Chúng tôi đang tìm kiếm những chuyên viên thẩm mỹ thân thiện, tài năng, những người yêu thích việc tạo ra làn da đẹp và làm cho khách hàng cảm thấy đặc biệt. Cần có kinh nghiệm trong việc chăm sóc da mặt, wax lông và điều trị da. Chúng tôi cung cấp một nơi làm việc tích cực, không drama, nơi mọi người giúp đỡ nhau thành công. Tiền tip tốt, lịch làm việc linh hoạt và môi trường làm việc vui vẻ đang chờ đợi người phù hợp!"
    },
    {
      id: "luxury",
      title: "Sang Trọng",
      description: "Salon uy tín đang tìm kiếm những chuyên viên thẩm mỹ xuất sắc để phục vụ khách hàng độc quyền của chúng tôi. Ứng viên phải thể hiện kỹ thuật hoàn hảo trong các dịch vụ chăm sóc da cao cấp, bao gồm chăm sóc da mặt nâng cao, wax lông hoàn hảo và điều trị da hoàn hảo. Chúng tôi cung cấp giáo dục liên tục về các kỹ thuật mới nhất và sản phẩm cao cấp. Thù lao bao gồm hoa hồng dịch vụ cao cấp, tiền boa và phúc lợi xứng đáng với các chuyên gia hàng đầu trong ngành."
    },
    {
      id: "simple",
      title: "Đơn Giản",
      description: "Cần chuyên viên thẩm mỹ. Phải biết chăm sóc da mặt, wax lông và điều trị da. Yêu cầu làm việc sạch sẽ và thái độ tốt. Lương và tip hấp dẫn. Gọi điện để ứng tuyển."
    },
    {
      id: "detailed",
      title: "Chi Tiết",
      description: "VỊ TRÍ CHUYÊN VIÊN THẨM MỸ\n\nYêu cầu:\n- Giấy phép chuyên viên thẩm mỹ hợp lệ\n- Trên 2 năm kinh nghiệm trong môi trường salon\n- Thành thạo: chăm sóc da mặt, wax lông, điều trị da, mài da vi điểm\n- Kiến thức về quy trình vệ sinh đúng cách\n\nLịch làm việc:\n- Có cả toàn thời gian & bán thời gian\n- Yêu cầu làm việc cuối tuần\n\nThù lao:\n- Dựa trên hoa hồng (lên đến 60% tùy kinh nghiệm)\n- Tiền tip trung bình $100-200 mỗi ngày\n- Giảm giá sản phẩm\n- Đào tạo nâng cao có lương\n\nỨng tuyển với sơ yếu lý lịch và mẫu công việc."
    }
  ],
  "receptionist": [
    {
      id: "professional",
      title: "Chuyên Nghiệp",
      description: "Chúng tôi đang tìm kiếm một lễ tân salon chuyên nghiệp để gia nhập đội ngũ của chúng tôi. Trách nhiệm bao gồm chào đón khách hàng, trả lời điện thoại, lên lịch hẹn và xử lý thanh toán. Phải có tổ chức và kỹ năng giao tiếp xuất sắc. Khách hàng của chúng tôi mong đợi dịch vụ chất lượng cao trong một môi trường sạch sẽ và chuyên nghiệp. Có vị trí toàn thời gian và bán thời gian với cơ cấu lương cạnh tranh."
    },
    {
      id: "friendly",
      title: "Thân Thiện",
      description: "Hãy gia nhập gia đình salon của chúng tôi! Chúng tôi đang tìm kiếm một lễ tân thân thiện, có tổ chức để chào đón khách hàng, trả lời điện thoại và lên lịch hẹn. Phải có kỹ năng giao tiếp xuất sắc và thái độ tích cực. Chúng tôi cung cấp một nơi làm việc tích cực, không драма, nơi mọi người giúp đỡ lẫn nhau để thành công. Mức lương tuyệt vời, lịch trình linh hoạt và một môi trường làm việc thú vị đang chờ đón người phù hợp!"
    },
    {
      id: "luxury",
      title: "Sang Trọng",
      description: "Salon uy tín đang tìm kiếm một lễ tân đặc biệt để phục vụ khách hàng độc quyền của chúng tôi. Các ứng viên phải thể hiện kỹ năng giao tiếp hoàn hảo, có tính tổ chức cao và có thái độ chuyên nghiệp. Trách nhiệm bao gồm chào đón khách hàng, trả lời điện thoại, lên lịch hẹn và xử lý thanh toán. Chúng tôi cung cấp đào tạo liên tục về các kỹ thuật mới nhất và các sản phẩm cao cấp. Thù lao bao gồm hoa hồng dịch vụ cao cấp, tiền thưởng và các phúc lợi phù hợp với các chuyên gia hàng đầu trong ngành."
    },
    {
      id: "simple",
      title: "Đơn Giản",
      description: "Cần lễ tân salon. Phải có tổ chức, có kỹ năng giao tiếp xuất sắc và thái độ tích cực. Trách nhiệm bao gồm chào đón khách hàng, trả lời điện thoại và lên lịch hẹn. Lương và phúc lợi tốt. Gọi để ứng tuyển."
    },
    {
      id: "detailed",
      title: "Chi Tiết",
      description: "VỊ TRÍ LỄ TÂN SALON\n\nYêu cầu:\n- Tốt nghiệp trung học phổ thông hoặc tương đương\n- 2+ năm kinh nghiệm trong môi trường salon\n- Thành thạo: Microsoft Office, phần mềm salon\n- Kiến thức về các quy trình vệ sinh thích hợp\n\nLịch trình:\n- Có cả toàn thời gian và bán thời gian\n- Yêu cầu làm việc vào cuối tuần\n\nBồi thường:\n- Lương theo giờ (DOE)\n- Gói phúc lợi có sẵn\n- Nghỉ phép có lương\n- Giáo dục thường xuyên có lương\n\nNộp đơn với sơ yếu lý lịch và thư xin việc."
    }
  ],
  "other": [
    {
      id: "professional",
      title: "Chuyên Nghiệp",
      description: "Chúng tôi đang tìm kiếm các chuyên gia làm đẹp để tham gia đội ngũ của chúng tôi. Vui lòng nêu rõ chuyên môn và kinh nghiệm của bạn trong đơn đăng ký. Khách hàng của chúng tôi mong đợi dịch vụ chất lượng cao trong một môi trường sạch sẽ và chuyên nghiệp. Có vị trí toàn thời gian và bán thời gian với cơ cấu lương cạnh tranh."
    },
    {
      id: "friendly",
      title: "Thân Thiện",
      description: "Hãy tham gia gia đình salon của chúng tôi! Chúng tôi đang tìm kiếm các chuyên gia làm đẹp thân thiện, tài năng để tham gia đội ngũ của chúng tôi. Vui lòng nêu rõ chuyên môn và kinh nghiệm của bạn trong đơn đăng ký. Chúng tôi cung cấp một nơi làm việc tích cực, không drama, nơi mọi người giúp đỡ lẫn nhau để thành công. Mức lương tuyệt vời, lịch trình linh hoạt và một môi trường làm việc thú vị đang chờ đón người phù hợp!"
    },
    {
      id: "luxury",
      title: "Sang Trọng",
      description: "Salon uy tín đang tìm kiếm các chuyên gia làm đẹp đặc biệt để phục vụ khách hàng độc quyền của chúng tôi. Các ứng viên phải thể hiện kỹ thuật hoàn hảo trong chuyên môn của họ, có tính tổ chức cao và có thái độ chuyên nghiệp. Vui lòng nêu rõ chuyên môn và kinh nghiệm của bạn trong đơn đăng ký. Chúng tôi cung cấp đào tạo liên tục về các kỹ thuật mới nhất và các sản phẩm cao cấp. Thù lao bao gồm hoa hồng dịch vụ cao cấp, tiền thưởng và các phúc lợi phù hợp với các chuyên gia hàng đầu trong ngành."
    },
    {
      id: "simple",
      title: "Đơn Giản",
      description: "Cần chuyên gia làm đẹp. Vui lòng nêu rõ chuyên môn và kinh nghiệm của bạn trong đơn đăng ký. Yêu cầu công việc sạch sẽ và thái độ tốt. Lương và phúc lợi tốt. Gọi để ứng tuyển."
    },
    {
      id: "detailed",
      title: "Chi Tiết",
      description: "VỊ TRÍ CHUYÊN GIA LÀM ĐẸP\n\nYêu cầu:\n- Giấy phép hợp lệ trong chuyên môn của bạn\n- 2+ năm kinh nghiệm trong môi trường salon\n- Thành thạo: chuyên môn của bạn\n- Kiến thức về các quy trình vệ sinh thích hợp\n\nLịch trình:\n- Có cả toàn thời gian và bán thời gian\n- Yêu cầu làm việc vào cuối tuần\n\nBồi thường:\n- Lương theo giờ (DOE)\n- Gói phúc lợi có sẵn\n- Nghỉ phép có lương\n- Giáo dục thường xuyên có lương\n\nNộp đơn với sơ yếu lý lịch và thư xin việc."
    }
  ]
};

// Form field descriptions that can be reused
export const FORM_FIELD_DESCRIPTIONS = {
  title: "Create a clear, attention-grabbing job title",
  description: "Describe the job role, responsibilities, and qualifications",
  location: "Enter the physical location where the job will be performed",
  compensation: "Provide details about pay structure, benefits, or other compensation",
  contactEmail: "Where candidates should send their applications or questions",
  contactPhone: "Alternative way for candidates to reach you"
};

// The below exports are for compatibility with existing code
export const JOB_FORM_TEMPLATES = JOB_TEMPLATES;
export const JOB_FORM_TEMPLATES_VI = JOB_TEMPLATES_VI;
