export const JOB_TEMPLATES = [
  {
    id: 'nail-tech',
    title: 'Nail Technician',
    type: 'fullTime',
    description: 'Looking for an experienced Nail Technician to join our busy salon. Must be skilled in manicures, pedicures, acrylics, and gel. Full-time position with competitive pay and tips.'
  },
  {
    id: 'hair-stylist',
    title: 'Hair Stylist',
    type: 'fullTime',
    description: 'Seeking a professional Hair Stylist with at least 2 years of experience. Skills in cutting, coloring, and styling required. Join our friendly team in a modern salon with loyal clientele.'
  },
  {
    id: 'spa-tech',
    title: 'Spa Technician',
    type: 'fullTime',
    description: 'Now hiring a Spa Technician with experience in facials, waxing, and body treatments. Must have excellent customer service skills and knowledge of skincare products.'
  },
  {
    id: 'receptionist',
    title: 'Salon Receptionist',
    type: 'partTime',
    description: 'Looking for a friendly, organized Receptionist to handle bookings, answer calls, and greet clients. Experience with salon software preferred. Part-time position available weekends.'
  },
  {
    id: 'manager',
    title: 'Salon Manager',
    type: 'fullTime',
    description: 'Experienced Salon Manager needed to oversee daily operations, staff management, and client relations. Must have previous salon management experience and excellent leadership skills.'
  },
  {
    id: 'massage',
    title: 'Massage Therapist',
    type: 'contract',
    description: 'Licensed Massage Therapist needed for upscale spa. Must be skilled in various massage techniques including deep tissue, hot stone, and relaxation. Flexible hours available.'
  },
  {
    id: 'lash',
    title: 'Lash Technician',
    type: 'fullTime',
    description: 'Certified Lash Technician wanted for busy beauty salon. Experience with classic and volume lash extensions required. Build your clientele with our marketing support.'
  },
  {
    id: 'tattoo',
    title: 'Tattoo Artist',
    type: 'fullTime',
    description: 'Professional Tattoo Artist wanted for established studio. Must have strong portfolio showing versatility in styles. Health certifications required. Commission-based position.'
  },
  {
    id: 'makeup',
    title: 'Makeup Artist',
    type: 'freelance',
    description: 'Freelance Makeup Artist needed for bridal and special events. Experience with diverse skin tones and photography makeup a plus. Weekend availability essential.'
  },
  {
    id: 'booth-rental',
    title: 'Booth Rental Available',
    type: 'other',
    description: 'Premium booth space available for rent in busy salon. Great location with high foot traffic. Perfect for established beauty professionals looking for a new space. All utilities included.'
  },
  {
    id: 'other',
    title: 'Other Beauty Professional',
    type: 'fullTime',
    description: 'Seeking a skilled beauty professional to join our team. Please specify your expertise and experience when applying.'
  }
];

export const JOB_TYPES = {
  fullTime: {
    en: 'Full Time',
    vi: 'Toàn thời gian'
  },
  partTime: {
    en: 'Part Time',
    vi: 'Bán thời gian'
  },
  contract: {
    en: 'Contract',
    vi: 'Theo hợp đồng'
  },
  freelance: {
    en: 'Freelance',
    vi: 'Làm tự do'
  },
  other: {
    en: 'Other',
    vi: 'Khác'
  }
};

// This structure will hold our AI-polished descriptions for both English and Vietnamese
export const POLISHED_DESCRIPTIONS = {
  professional: [
    {
      title: "Professional & Sharp",
      description: "We're seeking an exceptional professional to join our established team. Our ideal candidate demonstrates attention to detail and commitment to excellence. Qualified individuals will receive competitive compensation and opportunities for growth."
    },
    {
      title: "Business-Focused",
      description: "Our growing business seeks a qualified candidate who can maintain our high standards. This position offers stability, competitive compensation, and a professional work environment focused on excellence and client satisfaction."
    }
  ],
  friendly: [
    {
      title: "Friendly & Warm",
      description: "We're so excited to welcome a new talent to our friendly team! We're like a family here, and we can't wait to meet you. Our salon has a warm, supportive atmosphere where everyone helps each other succeed."
    },
    {
      title: "Community-Centered",
      description: "Join our welcoming salon family! We support each other through busy days and celebrate successes together. We're looking for a team player who enjoys connecting with clients and creating a positive atmosphere."
    }
  ],
  luxury: [
    {
      title: "Luxury & Premium",
      description: "Join our premium establishment catering to discerning clientele seeking excellence. We use only the finest products and maintain an elegant, upscale atmosphere that reflects our commitment to luxury experiences."
    },
    {
      title: "High-End Experience",
      description: "We provide luxury services to high-end clients and seek exceptional talent to join our team. Our salon features designer interiors, premium equipment, and an exclusive ambiance for the most discerning clients."
    }
  ],
  casual: [],
  detailed: [],
  nail: [
    // Professional - 2
    {
      title: "Professional Nail Expert",
      description: "We are seeking a professional Nail Technician to join our established salon. The ideal candidate possesses excellent technical skills, maintains high sanitation standards, and demonstrates proficiency in a variety of nail services including manicures, pedicures, and nail enhancements. Previous salon experience and a current license are required. We offer competitive compensation, a steady client base, and opportunities for professional growth."
    },
    {
      title: "Skilled Nail Professional",
      description: "Our upscale nail salon is looking for a licensed Nail Technician with proven expertise. We require strong attention to detail, consistent quality in service delivery, and the ability to maintain a clean, organized workspace. The position requires knowledge of current nail trends, techniques, and products. We provide a professional environment with competitive pay structure and the opportunity to build a loyal clientele."
    },
    
    // Friendly - 2
    {
      title: "Join Our Nail Family!",
      description: "We're a friendly, supportive nail salon looking for a warm and enthusiastic Nail Tech to join our team! Our salon focuses on creating a welcoming atmosphere where both staff and clients feel at home. We love team players who enjoy connecting with clients while providing beautiful nail services. Experience working with acrylics, gel, and natural nails preferred. Come grow with us in our positive, drama-free workplace!"
    },
    {
      title: "Nail Artist For Our Friendly Team",
      description: "Looking for a nail tech who loves making clients happy! Our salon is known for its friendly vibes and supportive team environment. We celebrate birthdays together, share meals, and help each other through busy and quiet times. Your positive attitude and people skills are just as important as your nail expertise. We offer flexible scheduling and a fun workplace where you'll make friends while building your career!"
    },
    
    // Luxury - 2
    {
      title: "Luxury Nail Artist",
      description: "Our premium nail atelier seeks an exceptional nail artist to serve our discerning clientele. We specialize in high-end nail services using only the finest products and techniques. The ideal candidate has experience in luxury salons and demonstrates refined artistic abilities. Our serene, elegant environment attracts clients who expect perfection and are willing to pay for exceptional service. We offer a sophisticated workplace and compensation reflecting the exclusive nature of our salon."
    },
    {
      title: "Elite Nail Specialist",
      description: "Join our exclusive nail boutique catering to upscale clients seeking bespoke nail services. We require a nail specialist with impeccable techniques, artistic flair, and the ability to provide a luxurious experience from start to finish. Our clients expect discreet, personalized attention and flawless results. We offer premium compensation, high-end products, and an atmosphere of sophistication that matches our clientele's expectations."
    },
    
    // Casual - 2
    {
      title: "Chill Nail Tech Wanted",
      description: "Looking for a laid-back nail tech to join our friendly neighborhood salon! We keep things simple and drama-free while still doing amazing nail work. Our relaxed atmosphere attracts clients who want great nails without the stuffy vibe. Experience with basic manicures, pedicures, and gel applications needed. Flexible scheduling, cool coworkers, and a supportive boss make this a great place to work!"
    },
    {
      title: "Easy-Going Nail Artist",
      description: "Our casual nail bar is looking for a talented nail tech who enjoys a relaxed work environment! We're all about good vibes, happy clients, and beautiful nails without the stress. If you're skilled, reliable, and can chat easily with clients while creating gorgeous nails, you'll fit right in. We offer fair pay, reasonable hours, and a no-pressure atmosphere where you can do what you love without workplace politics."
    },
    
    // Detailed - 2
    {
      title: "Detail-Oriented Nail Technician",
      description: "Position details: Full-time Nail Technician needed for established salon. Requirements include valid license, 2+ years experience, and proficiency in natural manicures, pedicures, gel polish, acrylics, and basic nail art. Hours: Tuesday-Saturday 9:30am-7:00pm with 30-minute lunch break. Base pay $20-25/hr plus tips (averaging $150-250 daily). Benefits include paid vacation after 6 months, product discounts, and continuing education allowance. Sanitation certification preferred."
    },
    {
      title: "Comprehensive Nail Position",
      description: "Nail Technician position details: 30-40 hours weekly with rotating weekend shifts required. Responsibilities include performing manicures, pedicures, gel applications, acrylics, dipping powder systems, and basic nail art. Must maintain detailed client records, follow strict sanitation protocols, and assist with salon upkeep. Commission structure: 50% for all services with bonus incentives for retail sales. Supplies provided except for personal hand tools. Advancement opportunities to Senior Tech after performance review."
    }
  ],
  hair: [
    // Professional - 2
    {
      title: "Professional Hair Stylist",
      description: "We are seeking a licensed Hair Stylist with a professional demeanor to join our established salon. The ideal candidate demonstrates technical excellence in cutting, coloring, and styling techniques. Must maintain a clean station, follow sanitation protocols, and provide consistent, high-quality service. Minimum 2 years post-license experience required. We offer a professional environment with opportunities for advanced education and career growth."
    },
    {
      title: "Experienced Hair Professional",
      description: "Our salon is recruiting a qualified Hair Stylist who exhibits professionalism and technical skill. The position requires expertise in modern cutting techniques, color formulation, and styling services. We value punctuality, organization, and the ability to maintain a consistent client schedule. The successful candidate will have documented experience and the ability to consult effectively with clients. Compensation includes competitive commission and benefits."
    },
    
    // Friendly - 2
    {
      title: "Join Our Hair Styling Family!",
      description: "We're looking for a friendly, outgoing Hair Stylist to join our salon family! Our team supports each other through thick and thin, and we create a warm, welcoming environment for both staff and clients. If you love connecting with people while creating beautiful hair, you'll fit right in! We celebrate birthdays, host team outings, and truly care about each other's success. Experience with cutting and coloring is important, but your positive attitude is just as valuable!"
    },
    {
      title: "Warm & Welcoming Hair Stylist",
      description: "Our salon family is growing and we need another amazing Hair Stylist who brings good vibes and great skills! We're a tight-knit team that loves what we do and has fun while doing it. Clients come back because of our friendly atmosphere and the personal connections we build. If you enjoy making people feel special while creating gorgeous hairstyles, we'd love to meet you! Flexible scheduling available and lots of laughter guaranteed!"
    },
    
    // Luxury - 2
    {
      title: "Luxury Hair Artist",
      description: "Our premium salon seeks an exceptional Hair Artist to serve our discerning clientele. We provide exclusive hair services in an elegant, sophisticated environment. The ideal candidate has experience in luxury establishments and demonstrates mastery of advanced cutting, coloring, and styling techniques. Our clients expect personalized attention and flawless results. We offer premium compensation reflecting the high-end nature of our services and a refined workplace setting."
    },
    {
      title: "High-End Hair Specialist",
      description: "Join our exclusive hair atelier catering to upscale clients seeking bespoke hair services. We require a hair specialist with impeccable techniques, artistic vision, and the ability to create personalized styles that complement our clients' lifestyles. Previous experience in luxury salons and knowledge of premium hair products is essential. We offer an atmosphere of sophistication, access to elite continuing education, and compensation commensurate with your expertise."
    },
    
    // Casual - 2
    {
      title: "Cool Hair Stylist Wanted",
      description: "Looking for a laid-back Hair Stylist to join our friendly neighborhood salon! We keep things simple and drama-free while still creating amazing hair. Our relaxed atmosphere attracts clients who want great styles without the stuffy attitude. Solid cutting and coloring skills required, but we value your unique approach and creativity. Flexible scheduling, cool coworkers, and a supportive environment make this a great place to grow your career!"
    },
    {
      title: "Relaxed Hair Artist Position",
      description: "Our casual, creative salon is looking for a talented Hair Stylist who enjoys a chill work environment! We're all about good vibes, happy clients, and beautiful hair without unnecessary stress. If you're skilled, reliable, and can chat easily with clients while creating gorgeous styles, you'll fit right in. We offer fair compensation, reasonable hours, and a no-pressure atmosphere where you can express your creativity and do what you love."
    },
    
    // Detailed - 2
    {
      title: "Detail-Oriented Hair Stylist",
      description: "Position specifics: Full-time Hair Stylist needed for established salon. Requirements include valid cosmetology license, 3+ years experience, and proficiency in precision cutting, color formulation, balayage/foiling techniques, and styling. Schedule: Tuesday-Saturday 9:00am-6:00pm with 45-minute lunch break. Commission-based pay: 45-55% based on experience and performance metrics. Benefits include health insurance contribution after 90 days, paid vacation after 1 year, retail commission (10%), and quarterly education allowance of $250."
    },
    {
      title: "Comprehensive Hair Stylist Role",
      description: "Hair Stylist position details: 32-40 hours weekly with rotating Saturday shifts required. Responsibilities include performing consultations, haircuts, color services (including balayage, foils, and creative color), treatments, and styling. Must maintain detailed client records, follow inventory protocols, and participate in monthly team meetings. Commission structure: tiered system starting at 45% with increases based on service volume and rebooking rates. Product and tool discounts provided. Advancement path to Senior Stylist or Educator available with performance reviews every 6 months."
    }
  ],
  massage: [],
  lash: [],
  barber: [],
  spa: [],
  makeup: [],
  skincare: [],
  tattoo: []
};

// Vietnamese polished descriptions
export const POLISHED_DESCRIPTIONS_VI = {
  professional: [
    {
      title: "Chuyên Nghiệp & Sắc Sảo",
      description: "Chúng tôi đang tìm kiếm một chuyên gia xuất sắc để gia nhập đội ngũ có tiếng của chúng tôi. Ứng viên lý tưởng cần thể hiện sự chú ý đến chi tiết và cam kết với sự xuất sắc. Người đủ điều kiện sẽ nhận được mức lương cạnh tranh và cơ hội phát triển."
    },
    {
      title: "Định Hướng Kinh Doanh",
      description: "Doanh nghiệp đang phát triển của chúng tôi tìm kiếm ứng viên có đủ năng lực để duy trì tiêu chuẩn cao của chúng tôi. Vị trí này mang lại sự ổn định, mức lương cạnh tranh và môi trường làm việc chuyên nghiệp tập trung vào sự xuất sắc và sự hài lòng của khách hàng."
    }
  ],
  friendly: [
    {
      title: "Thân Thiện & Ấm Áp",
      description: "Chúng tôi rất vui mừng được chào đón một tài năng mới vào đội ngũ thân thiện của chúng tôi! Chúng tôi như một gia đình ở đây và rất mong được gặp bạn. Salon của chúng tôi có bầu không khí ấm áp, hỗ trợ, nơi mọi người giúp đỡ nhau thành công."
    },
    {
      title: "Hướng Đến Cộng Đồng",
      description: "Hãy tham gia vào gia đình salon thân thiện của chúng tôi! Chúng tôi hỗ trợ nhau trong những ngày bận rộn và cùng nhau ăn mừng thành công. Chúng tôi đang tìm kiếm một người đồng đội, người thích kết nối với khách hàng và tạo ra bầu không khí tích cực."
    }
  ],
  luxury: [
    {
      title: "Sang Trọng & Cao Cấp",
      description: "Tham gia cơ sở cao cấp của chúng tôi phục vụ khách hàng sành điệu tìm kiếm sự xuất sắc. Chúng tôi chỉ sử dụng những sản phẩm tốt nhất và duy trì một không gian thanh lịch, cao cấp phản ánh cam kết của chúng tôi đối với trải nghiệm xa xỉ."
    },
    {
      title: "Trải Nghiệm Cao Cấp",
      description: "Chúng tôi cung cấp dịch vụ sang trọng cho khách hàng cao cấp và tìm kiếm tài năng đặc biệt để gia nhập đội ngũ của chúng tôi. Salon của chúng tôi có nội thất thiết kế, thiết bị cao cấp và không khí độc quyền cho những khách hàng khó tính nhất."
    }
  ],
  casual: [],
  detailed: [],
  nail: [
    // Professional - 2
    {
      title: "Thợ Nail Chuyên Nghiệp",
      description: "Chúng tôi đang tìm kiếm một Thợ Nail chuyên nghiệp để gia nhập salon đã được thiết lập của chúng tôi. Ứng viên lý tưởng có kỹ năng kỹ thuật xuất sắc, duy trì tiêu chuẩn vệ sinh cao và thành thạo nhiều dịch vụ nail khác nhau bao gồm làm móng tay, móng chân và nối móng. Yêu cầu có kinh nghiệm làm việc tại salon trước đây và giấy phép hiện hành. Chúng tôi cung cấp mức lương cạnh tranh, khách hàng ổn định và cơ hội phát triển chuyên môn."
    },
    {
      title: "Chuyên Viên Nail Lành Nghề",
      description: "Salon nail cao cấp của chúng tôi đang tìm kiếm một Kỹ thuật viên Nail có giấy phép với chuyên môn đã được chứng minh. Chúng tôi yêu cầu sự chú ý đến chi tiết, chất lượng dịch vụ nhất quán và khả năng duy trì không gian làm việc sạch sẽ, có tổ chức. Vị trí này đòi hỏi kiến thức về xu hướng, kỹ thuật và sản phẩm nail hiện tại. Chúng tôi cung cấp môi trường chuyên nghiệp với cơ cấu lương cạnh tranh và cơ hội xây dựng khách hàng trung thành."
    },
    
    // Friendly - 2
    {
      title: "Tham Gia Gia Đình Nail Của Chúng Tôi!",
      description: "Chúng tôi là một tiệm nail thân thiện, hỗ trợ đang tìm kiếm một Kỹ thuật viên Nail nhiệt tình và ấm áp để tham gia vào đội ngũ của chúng tôi! Salon của chúng tôi tập trung vào việc tạo ra một bầu không khí chào đón nơi cả nhân viên và khách hàng đều cảm thấy như ở nhà. Chúng tôi yêu thích những người chơi đồng đội, những người thích kết nối với khách hàng trong khi cung cấp các dịch vụ nail đẹp. Ưu tiên có kinh nghiệm làm việc với acrylic, gel và móng tự nhiên. Hãy đến phát triển cùng chúng tôi trong môi trường làm việc tích cực, không drama!"
    },
    {
      title: "Nghệ Sĩ Nail Cho Đội Ngũ Thân Thiện Của Chúng Tôi",
      description: "Đang tìm kiếm một thợ nail yêu thích việc làm hài lòng khách hàng! Salon của chúng tôi nổi tiếng với không khí thân thiện và môi trường làm việc hỗ trợ. Chúng tôi cùng nhau ăn mừng sinh nhật, chia sẻ bữa ăn và giúp đỡ nhau trong những thời điểm bận rộn và yên tĩnh. Thái độ tích cực và kỹ năng giao tiếp của bạn cũng quan trọng như chuyên môn nail của bạn. Chúng tôi cung cấp lịch trình linh hoạt và một nơi làm việc vui vẻ, nơi bạn sẽ kết bạn trong khi xây dựng sự nghiệp của mình!"
    },
    
    // Luxury - 2
    {
      title: "Nghệ Sĩ Nail Cao Cấp",
      description: "Studio nail cao cấp của chúng tôi đang tìm kiếm một nghệ sĩ nail xuất sắc để phục vụ khách hàng sành điệu của chúng tôi. Chúng tôi chuyên về các dịch vụ nail cao cấp chỉ sử dụng các sản phẩm và kỹ thuật tốt nhất. Ứng viên lý tưởng có kinh nghiệm trong các salon sang trọng và thể hiện khả năng nghệ thuật tinh tế. Môi trường thanh bình, thanh lịch của chúng tôi thu hút khách hàng mong đợi sự hoàn hảo và sẵn sàng trả tiền cho dịch vụ đặc biệt. Chúng tôi cung cấp một nơi làm việc tinh tế và mức lương phản ánh bản chất độc quyền của salon chúng tôi."
    },
    {
      title: "Chuyên Gia Nail Đẳng Cấp",
      description: "Tham gia cửa hàng nail độc quyền của chúng tôi phục vụ khách hàng cao cấp tìm kiếm các dịch vụ nail theo yêu cầu. Chúng tôi yêu cầu một chuyên gia nail với kỹ thuật hoàn hảo, phong cách nghệ thuật và khả năng cung cấp trải nghiệm sang trọng từ đầu đến cuối. Khách hàng của chúng tôi mong đợi sự chú ý cá nhân, kín đáo và kết quả hoàn hảo. Chúng tôi cung cấp mức lương cao cấp, sản phẩm cao cấp và bầu không khí tinh tế phù hợp với mong đợi của khách hàng."
    },
    
    // Casual - 2
    {
      title: "Cần Thợ Nail Thoải Mái",
      description: "Đang tìm kiếm một thợ nail thoải mái để tham gia vào salon thân thiện trong khu vực của chúng tôi! Chúng tôi giữ mọi thứ đơn giản và không drama trong khi vẫn làm những mẫu nail tuyệt đẹp. Bầu không khí thoải mái của chúng tôi thu hút khách hàng muốn có móng đẹp mà không cần không khí ngột ngạt. Cần kinh nghiệm với các dịch vụ làm móng tay cơ bản, móng chân và gel. Lịch trình linh hoạt, đồng nghiệp tuyệt vời và một ông chủ hỗ trợ làm cho đây là một nơi tuyệt vời để làm việc!"
    },
    {
      title: "Nghệ Sĩ Nail Dễ Tính",
      description: "Tiệm nail thân thiện của chúng tôi đang tìm kiếm một thợ nail tài năng, người thích môi trường làm việc thoải mái! Chúng tôi đều hướng đến việc tạo ra không khí tốt, khách hàng hài lòng và móng đẹp mà không có căng thẳng. Nếu bạn có kỹ năng, đáng tin cậy và có thể trò chuyện dễ dàng với khách hàng trong khi tạo ra những bộ móng tuyệt đẹp, bạn sẽ hòa nhập ngay. Chúng tôi cung cấp mức lương công bằng, giờ làm việc hợp lý và môi trường không áp lực nơi bạn có thể làm những gì bạn yêu thích mà không có chính trị nơi làm việc."
    },
    
    // Detailed - 2
    {
      title: "Kỹ Thuật Viên Nail Chi Tiết",
      description: "Chi tiết vị trí: Cần Kỹ thuật viên Nail toàn thời gian cho salon đã thành lập. Yêu cầu bao gồm giấy phép hợp lệ, 2+ năm kinh nghiệm và thành thạo làm móng tay tự nhiên, móng chân, sơn gel, acrylic và nail art cơ bản. Giờ làm việc: Thứ Ba-Thứ Bảy 9:30 sáng-7:00 tối với thời gian nghỉ trưa 30 phút. Lương cơ bản $20-25/giờ cộng với tiền tip (trung bình $150-250 mỗi ngày). Phúc lợi bao gồm nghỉ phép có lương sau 6 tháng, giảm giá sản phẩm và trợ cấp đào tạo liên tục. Ưu tiên có chứng chỉ vệ sinh."
    },
    {
      title: "Vị Trí Nail Toàn Diện",
      description: "Chi tiết vị trí Kỹ thuật viên Nail: 30-40 giờ hàng tuần với yêu cầu luân phiên ca cuối tuần. Trách nhiệm bao gồm thực hiện làm móng tay, móng chân, đắp gel, acrylic, hệ thống bột nhúng và nail art cơ bản. Phải duy trì hồ sơ khách hàng chi tiết, tuân thủ các quy trình vệ sinh nghiêm ngặt và hỗ trợ việc duy trì salon. Cơ cấu hoa hồng: 50% cho tất cả các dịch vụ với tiền thưởng khuyến khích cho doanh số bán lẻ. Vật tư được cung cấp ngoại trừ dụng cụ cầm tay cá nhân. Cơ hội thăng tiến lên Kỹ thuật viên Cao cấp sau khi đánh giá hiệu suất."
    }
  ],
  hair: [
    // Professional - 2
    {
      title: "Thợ Tóc Chuyên Nghiệp",
      description: "Chúng tôi đang tìm kiếm một Nhà tạo mẫu tóc có giấy phép với phong cách chuyên nghiệp để tham gia vào salon đã thành lập của chúng tôi. Ứng viên lý tưởng thể hiện sự xuất sắc về kỹ thuật trong cắt, nhuộm và tạo kiểu tóc. Phải duy trì khu vực làm việc sạch sẽ, tuân thủ các quy định vệ sinh và cung cấp dịch vụ chất lượng cao nhất quán. Yêu cầu tối thiểu 2 năm kinh nghiệm sau khi có giấy phép. Chúng tôi cung cấp một môi trường chuyên nghiệp với cơ hội giáo dục nâng cao và phát triển sự nghiệp."
    },
    {
      title: "Chuyên Viên Tóc Có Kinh Nghiệm",
      description: "Salon chúng tôi đang tuyển dụng một Nhà tạo mẫu tóc có đủ trình độ, thể hiện sự chuyên nghiệp và kỹ năng kỹ thuật. Vị trí này đòi hỏi chuyên môn về kỹ thuật cắt hiện đại, pha màu và các dịch vụ tạo kiểu. Chúng tôi đề cao sự đúng giờ, tổ chức và khả năng duy trì lịch khách hàng ổn định. Ứng viên thành công sẽ có kinh nghiệm được ghi chép và khả năng tư vấn hiệu quả với khách hàng. Mức lương bao gồm hoa hồng cạnh tranh và phúc lợi."
    },
    
    // Friendly - 2
    {
      title: "Tham Gia Vào Gia Đình Tạo Mẫu Tóc Của Chúng Tôi!",
      description: "Chúng tôi đang tìm kiếm một Nhà tạo mẫu tóc thân thiện, cởi mở để tham gia vào gia đình salon của chúng tôi! Đội ngũ của chúng tôi hỗ trợ nhau trong mọi hoàn cảnh và chúng tôi tạo ra một môi trường ấm áp, chào đón cho cả nhân viên và khách hàng. Nếu bạn thích kết nối với mọi người trong khi tạo ra những kiểu tóc đẹp, bạn sẽ hòa nhập ngay! Chúng tôi tổ chức sinh nhật, tổ chức các buổi đi chơi cho đội và thực sự quan tâm đến sự thành công của nhau. Kinh nghiệm cắt và nhuộm tóc là quan trọng, nhưng thái độ tích cực của bạn cũng có giá trị như vậy!"
    },
    {
      title: "Thợ Tóc Ấm Áp & Thân Thiện",
      description: "Gia đình salon của chúng tôi đang phát triển và chúng tôi cần thêm một Nhà tạo mẫu tóc tuyệt vời mang lại năng lượng tốt và kỹ năng tuyệt vời! Chúng tôi là một đội ngũ gắn bó yêu thích những gì chúng tôi làm và vui vẻ trong khi làm việc. Khách hàng quay lại vì bầu không khí thân thiện và các mối quan hệ cá nhân mà chúng tôi xây dựng. Nếu bạn thích làm cho mọi người cảm thấy đặc biệt trong khi tạo ra những kiểu tóc tuyệt đẹp, chúng tôi rất muốn gặp bạn! Có lịch làm việc linh hoạt và đảm bảo nhiều tiếng cười!"
    },
    
    // Luxury - 2
    {
      title: "Nghệ Sĩ Tóc Cao Cấp",
      description: "Salon cao cấp của chúng tôi đang tìm kiếm một Nghệ sĩ tóc xuất sắc để phục vụ khách hàng sành điệu. Chúng tôi cung cấp các dịch vụ tóc độc quyền trong một môi trường thanh lịch, tinh tế. Ứng viên lý tưởng có kinh nghiệm trong các cơ sở sang trọng và chứng minh sự thành thạo về kỹ thuật cắt, nhuộm và tạo kiểu nâng cao. Khách hàng của chúng tôi mong đợi sự chú ý cá nhân và kết quả hoàn hảo. Chúng tôi cung cấp mức lương cao cấp phản ánh bản chất cao cấp của các dịch vụ của chúng tôi và một môi trường làm việc thanh lịch."
    },
    {
      title: "Chuyên Gia Tóc Cao Cấp",
      description: "Tham gia vào studio tóc độc quyền của chúng tôi phục vụ khách hàng cao cấp tìm kiếm các dịch vụ tóc theo yêu cầu. Chúng tôi yêu cầu một chuyên gia tóc với kỹ thuật hoàn hảo, tầm nhìn nghệ thuật và khả năng tạo ra các kiểu tóc cá nhân hóa bổ sung cho lối sống của khách hàng. Cần có kinh nghiệm trước đây trong các salon sang trọng và kiến thức về các sản phẩm tóc cao cấp. Chúng tôi cung cấp một bầu không khí tinh tế, tiếp cận với giáo dục liên tục đẳng cấp và mức lương tương xứng với chuyên môn của bạn."
    },
    
    // Casual - 2
    {
      title: "Cần Thợ Tóc Năng Động",
      description: "Đang tìm kiếm một Nhà tạo mẫu tóc thoải mái để tham gia vào salon thân thiện trong khu vực của chúng tôi! Chúng tôi giữ mọi thứ đơn giản và không drama trong khi vẫn tạo ra những kiểu tóc tuyệt đẹp. Bầu không khí thoải mái của chúng tôi thu hút khách hàng muốn có kiểu tóc tuyệt vời mà không có thái độ trịnh thượng. Yêu cầu kỹ năng cắt và nhuộm tóc vững chắc, nhưng chúng tôi đánh giá cao cách tiếp cận độc đáo và sáng tạo của bạn. Lịch trình linh hoạt, đồng nghiệp tuyệt vời và một môi trường hỗ trợ làm cho đây là một nơi tuyệt vời để phát triển sự nghiệp của bạn!"
    },
    {
      title: "Vị Trí Nghệ Sĩ Tóc Thoải Mái",
      description: "Salon sáng tạo và thoải mái của chúng tôi đang tìm kiếm một Nhà tạo mẫu tóc tài năng, người thích môi trường làm việc chill! Chúng tôi đều hướng đến việc tạo ra không khí tốt, khách hàng hài lòng và tóc đẹp mà không có căng thẳng không cần thiết. Nếu bạn có kỹ năng, đáng tin cậy và có thể trò chuyện dễ dàng với khách hàng trong khi tạo ra những kiểu tóc tuyệt đẹp, bạn sẽ hòa nhập ngay. Chúng tôi cung cấp mức lương công bằng, giờ làm việc hợp lý và môi trường không áp lực nơi bạn có thể thể hiện sự sáng tạo và làm những gì bạn yêu thích."
    },
    
    // Detailed - 2
    {
      title: "Nhà Tạo Mẫu Tóc Chi Tiết",
      description: "Thông tin chi tiết về vị trí: Cần Nhà tạo mẫu tóc toàn thời gian cho salon đã thành lập. Yêu cầu bao gồm giấy phép thẩm mỹ hợp lệ, 3+ năm kinh nghiệm và thành thạo cắt tóc chính xác, pha màu, kỹ thuật balayage/foiling và tạo kiểu. Lịch làm việc: Thứ Ba-Thứ Bảy 9:00 sáng-6:00 chiều với thời gian nghỉ trưa 45 phút. Mức lương dựa trên hoa hồng: 45-55% dựa trên kinh nghiệm và các chỉ số hiệu suất. Phúc lợi bao gồm đóng góp bảo hiểm y tế sau 90 ngày, nghỉ phép có lương sau 1 năm, hoa hồng bán lẻ (10%) và trợ cấp giáo dục hàng quý $250."
    },
    {
      title: "Vai Trò Nhà Tạo Mẫu Tóc Toàn Diện",
      description: "Chi tiết vị trí Nhà tạo mẫu tóc: 32-40 giờ hàng tuần với yêu cầu luân phiên ca thứ Bảy. Trách nhiệm bao gồm thực hiện tư vấn, cắt tóc, dịch vụ màu (bao gồm balayage, foils và màu sáng tạo), các liệu pháp và tạo kiểu. Phải duy trì hồ sơ khách hàng chi tiết, tuân theo quy trình kiểm kê và tham gia các cuộc họp nhóm hàng tháng. Cơ cấu hoa hồng: hệ thống phân tầng bắt đầu từ 45% với mức tăng dựa trên khối lượng dịch vụ và tỷ lệ đặt lại. Cung cấp giảm giá sản phẩm và công cụ. Lộ trình thăng tiến đến Nhà tạo mẫu Cao cấp hoặc Giáo viên có sẵn với đánh giá hiệu suất mỗi 6 tháng."
    }
  ],
  massage: [],
  lash: [],
  barber: [],
  spa: [],
  makeup: [],
  skincare: [],
  tattoo: []
};
