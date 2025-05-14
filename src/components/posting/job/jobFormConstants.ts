import { JobFormValues } from "./jobFormSchema";

// Define the job templates that will be used in the job posting form
export const JOB_TEMPLATES = [
  {
    id: "nail-technician",
    title: "Nail Technician",
    type: "fullTime",
    description: "We are looking for experienced nail technicians to join our salon. Must have knowledge of manicures, pedicures, acrylics, and gel applications."
  },
  {
    id: "hair-stylist",
    title: "Hair Stylist",
    type: "fullTime",
    description: "Seeking talented hair stylists with experience in cutting, coloring, and styling. Must have good customer service skills."
  },
  {
    id: "spa-technician",
    title: "Spa Technician",
    type: "fullTime",
    description: "Looking for skilled spa technicians with experience in facials, waxing, and body treatments. Certification required."
  },
  {
    id: "salon-receptionist",
    title: "Salon Receptionist",
    type: "fullTime",
    description: "We need a friendly receptionist to greet clients, schedule appointments, and handle payments. Good organizational skills required."
  },
  {
    id: "other",
    title: "Other",
    type: "fullTime",
    description: ""
  }
];

// Polish descriptions - English
export const POLISHED_DESCRIPTIONS_EN = {
  nail: [
    {
      id: "professional",
      title: "Professional & Concise",
      description: "We are seeking skilled nail technicians to join our established salon. Candidates must have experience with manicures, pedicures, gel, acrylics, and nail art. We offer competitive pay, a professional environment, and a steady client base. Prior salon experience and excellent customer service skills required."
    },
    {
      id: "friendly",
      title: "Friendly & Welcoming",
      description: "Join our nail salon family! We're looking for talented nail techs who love making clients feel beautiful. Our team is supportive and fun to work with. If you have experience with manicures, pedicures, and nail enhancements, we'd love to meet you! Competitive pay and great tips in our busy, friendly salon."
    },
    {
      id: "luxury",
      title: "Luxury & High-end",
      description: "Premier nail salon seeking exceptional nail artists to serve our discerning clientele. Candidates must demonstrate mastery of nail techniques including luxury manicures, pedicures, extensions, and intricate nail art. We offer premium compensation, an elegant work environment, and a sophisticated client base. Only experienced professionals with impeccable standards need apply."
    },
    {
      id: "casual",
      title: "Casual & Approachable",
      description: "Chill nail salon looking for talented techs to join our team! We keep things simple and drama-free while providing great service. Experience with the basics (mani, pedi, gel, acrylics) is a must. Flexible schedule, relaxed atmosphere, steady clients, and good income potential. Come work with us!"
    },
    {
      id: "detailed",
      title: "Detailed & Informative",
      description: "POSITION: Full-time and part-time Nail Technician\nREQUIREMENTS: Valid nail technician license, 1+ years experience with manicures, pedicures, gel, acrylics, and basic nail art\nCOMPENSATION: Base pay plus commission (averaging $800-1200/week), paid vacation after 6 months\nHOURS: Flexible scheduling, salon open 9am-8pm\nBENEFITS: Product discounts, continued education opportunities, health insurance options for full-time employees\nLOCATION: Modern salon in high-traffic shopping center with established clientele"
    },
    {
      id: "urgent",
      title: "Urgent & Direct",
      description: "NAIL TECHS NEEDED IMMEDIATELY! Busy salon needs experienced nail technicians TODAY. Must know acrylics, gel, dip powder, and basic nail art. Make money right away with our full book of clients. Walk-in for immediate interview or call now! Great location, high tips, flexible hours. Don't wait - position will fill fast!"
    },
    {
      id: "supportive",
      title: "Supportive & Encouraging",
      description: "Growing nail salon seeking passionate nail technicians to join our supportive team. We believe in helping each other succeed and creating a positive atmosphere for both staff and clients. Experience with standard nail services required, but we also offer continuing education to help you expand your skills. Competitive pay structure and a drama-free workplace where your contributions are valued."
    },
    {
      id: "modern",
      title: "Modern & Trendy",
      description: "Forward-thinking nail studio looking for creative nail artists who stay on top of the latest trends. Our Instagram-worthy salon attracts clients who want cutting-edge designs and techniques. If you're skilled with modern services like gel-x, nail art, Japanese gel, or chrome effects, we want you on our team! Collaborative environment with excellent earning potential and social media exposure for your work."
    },
    {
      id: "stable",
      title: "Stable & Reliable",
      description: "Established nail salon with 15+ years in business seeks dependable nail technicians. We offer consistent clientele, stable income, and a drama-free workplace. Looking for technicians with experience in standard services who value long-term employment. Our staff enjoys predictable scheduling, loyal clients, and a secure work environment. Perfect for professionals seeking work-life balance."
    },
    {
      id: "community",
      title: "Community & Team-oriented",
      description: "Family-owned nail salon looking for team players to join our close-knit group. We treat our staff and clients like family and work together to create a welcoming atmosphere. Experience with basic nail services required. We offer fair compensation, a supportive environment, team celebrations, and a sense of belonging. Many of our staff have been with us for 5+ years!"
    }
  ],
  hair: [
    {
      id: "hair-professional",
      title: "Professional & Concise",
      description: "Upscale salon seeking experienced hair stylists with a strong clientele. Must be proficient in cutting, coloring, and styling techniques. We offer competitive pay, benefits, and a supportive work environment."
    },
    {
      id: "hair-creative",
      title: "Creative & Artistic",
      description: "Join our team of talented hair artists! We're looking for stylists with a passion for creativity and a desire to push the boundaries of hair design. Must be skilled in the latest trends and techniques."
    },
    {
      id: "hair-customerFocused",
      title: "Customer-Focused",
      description: "We're looking for friendly and outgoing hair stylists who love making clients feel their best. Must have excellent customer service skills and a desire to build long-term relationships with clients."
    },
    {
      id: "hair-modern",
      title: "Modern & Trendy",
      description: "Stay ahead of the curve with our modern salon! We're looking for stylists who are passionate about the latest trends and techniques. Must be skilled in cutting, coloring, and styling."
    },
    {
      id: "hair-teamOriented",
      title: "Team-Oriented",
      description: "Join our supportive and collaborative team! We're looking for stylists who are team players and willing to help each other succeed. Must have excellent communication skills and a positive attitude."
    }
  ],
  spa: [
    {
      id: "spa-professional",
      title: "Professional & Concise",
      description: "Luxury spa seeking experienced estheticians and massage therapists. Must be licensed and proficient in a variety of spa treatments. We offer competitive pay, benefits, and a relaxing work environment."
    },
    {
      id: "spa-customerFocused",
      title: "Customer-Focused",
      description: "We're looking for friendly and compassionate spa therapists who love helping clients relax and rejuvenate. Must have excellent customer service skills and a desire to build long-term relationships with clients."
    },
    {
      id: "spa-holistic",
      title: "Holistic & Wellness-Oriented",
      description: "Join our team of holistic spa therapists! We're looking for therapists who are passionate about wellness and a desire to help clients achieve optimal health and well-being. Must be skilled in a variety of holistic spa treatments."
    },
    {
      id: "spa-modern",
      title: "Modern & Innovative",
      description: "Stay ahead of the curve with our modern spa! We're looking for therapists who are passionate about the latest trends and techniques. Must be skilled in a variety of modern spa treatments."
    },
    {
      id: "spa-teamOriented",
      title: "Team-Oriented",
      description: "Join our supportive and collaborative team! We're looking for therapists who are team players and willing to help each other succeed. Must have excellent communication skills and a positive attitude."
    }
  ],
  receptionist: [
    {
      id: "receptionist-professional",
      title: "Professional & Concise",
      description: "Busy salon seeking a friendly and organized receptionist to greet clients, schedule appointments, and handle payments. Must have excellent customer service skills and a professional demeanor."
    },
    {
      id: "receptionist-customerFocused",
      title: "Customer-Focused",
      description: "We're looking for a warm and welcoming receptionist who loves making clients feel comfortable and valued. Must have excellent customer service skills and a desire to build long-term relationships with clients."
    },
    {
      id: "receptionist-organized",
      title: "Organized & Efficient",
      description: "We need a highly organized and efficient receptionist to manage our busy front desk. Must be able to multitask, prioritize tasks, and maintain a professional appearance."
    },
    {
      id: "receptionist-techSavvy",
      title: "Tech-Savvy",
      description: "We're looking for a tech-savvy receptionist who is comfortable using computers, scheduling software, and other office equipment. Must have excellent computer skills and a willingness to learn new technologies."
    },
    {
      id: "receptionist-teamOriented",
      title: "Team-Oriented",
      description: "Join our supportive and collaborative team! We're looking for a receptionist who is a team player and willing to help out wherever needed. Must have excellent communication skills and a positive attitude."
    }
  ],
  other: [
    {
      id: "other-professional",
      title: "Professional & Concise",
      description: "We are seeking a skilled and experienced professional to join our team. Must have excellent communication and interpersonal skills."
    },
    {
      id: "other-customerFocused",
      title: "Customer-Focused",
      description: "We're looking for a friendly and outgoing professional who loves working with people. Must have excellent customer service skills and a desire to build long-term relationships with clients."
    },
    {
      id: "other-organized",
      title: "Organized & Efficient",
      description: "We need a highly organized and efficient professional to manage our busy office. Must be able to multitask, prioritize tasks, and maintain a professional appearance."
    },
    {
      id: "other-techSavvy",
      title: "Tech-Savvy",
      description: "We're looking for a tech-savvy professional who is comfortable using computers, software, and other office equipment. Must have excellent computer skills and a willingness to learn new technologies."
    },
    {
      id: "other-teamOriented",
      title: "Team-Oriented",
      description: "Join our supportive and collaborative team! We're looking for a professional who is a team player and willing to help out wherever needed. Must have excellent communication skills and a positive attitude."
    }
  ]
};

// Polish descriptions - Vietnamese
export const POLISHED_DESCRIPTIONS_VI = {
  nail: [
    {
      id: "warm-friendly",
      title: "Ấm áp & Thân thiện",
      description: "Chào mừng bạn đến với salon nails thân thiện của chúng tôi! Cần tìm thợ nail có kinh nghiệm làm móng bột, gel, đắp hoa, vẽ móng. Khách sang, tip cao, chủ dễ chịu, môi trường làm việc như gia đình. Lương căn bản + ăn chia hấp dẫn, nhiều khách Mỹ trắng, khách đặt hẹn sẵn, không lo ngồi không!"
    },
    {
      id: "professional-polite",
      title: "Chuyên nghiệp & Lịch sự",
      description: "Salon nails khu Mỹ trắng cần thợ nail tay nghề cứng, biết làm bột, gel, chân tay nước. Khách quen, giá nails cao, môi trường chuyên nghiệp, làm việc đúng giờ, lịch sự, ổn định lâu dài. Chủ có tâm, lương ổn định, có bonus, chủ yếu làm khách appointment."
    },
    {
      id: "creative-artistic",
      title: "Sáng tạo & Nghệ thuật",
      description: "Salon nghệ thuật cần thợ biết vẽ móng, design ombre, đính đá, làm mẫu. Tự do sáng tạo, không áp lực, khách trẻ trung, nhiều cơ hội phát triển bản thân. Thu nhập cao, môi trường năng động, hỗ trợ sản phẩm tốt."
    },
    {
      id: "local-friendly",
      title: "Địa phương & Gần gũi",
      description: "Salon nails khu đông người Việt, khách dễ thương, cần tìm thợ biết làm đủ các dịch vụ (bột, gel, chân tay nước). Chủ bao lương, môi trường vui vẻ, phù hợp anh chị em muốn ổn định, sống lâu dài gần cộng đồng người Việt."
    },
    {
      id: "brief-direct",
      title: "Ngắn gọn & Trực tiếp",
      description: "Cần thợ nail biết làm bột, gel, chân tay nước, khách đông quanh năm, tip tốt, chủ dễ tính. Lương cao, có chỗ ở nếu cần. Nhắn tin trực tiếp nếu muốn làm ngay!"
    },
    {
      id: "passion-enthusiasm",
      title: "Đam mê & Nhiệt huyết",
      description: "Bạn đam mê nghề nails? Hãy về đội với chúng tôi! Salon đông khách, khách Mỹ trắng, cần người chịu khó, muốn phát triển nghề. Môi trường trẻ, vui vẻ, được training thêm nếu cần."
    },
    {
      id: "support-unity",
      title: "Hỗ trợ & Đoàn kết",
      description: "Salon nhỏ, chủ thân thiện, đồng nghiệp dễ thương, cần thêm thợ làm bột hoặc chân tay nước. Chủ bao lương tháng đầu, ưu tiên biết tiếng Anh cơ bản, khách ổn định, tip chia đều."
    },
    {
      id: "long-term-investment",
      title: "Đầu tư lâu dài",
      description: "Salon mới remodel, vị trí đẹp, cần thợ gắn bó lâu dài, ưu tiên ai muốn tìm môi trường làm việc ổn định, có chính sách nghỉ phép và thưởng lễ."
    },
    {
      id: "gentle-emotional",
      title: "Nhẹ nhàng & Tình cảm",
      description: "Salon như gia đình nhỏ, chủ tận tâm, khách quen lâu năm, cần thợ biết làm căn bản. Không yêu cầu áp lực doanh số, chỉ cần vui vẻ, hoà đồng, trung thực."
    },
    {
      id: "class-premium",
      title: "Đẳng cấp & Cao cấp",
      description: "Salon luxury khu trung tâm, khách sành điệu, cần thợ tay nghề cao về design, đắp bột, gel. Thu nhập cao nhất khu vực, khách bo nhiều, chủ hỗ trợ sản phẩm cao cấp, môi trường chuyên nghiệp."
    }
  ],
  hair: [
    {
      id: "hair-professional-vi",
      title: "Chuyên nghiệp & Tinh tế",
      description: "Salon tóc cao cấp tìm kiếm nhà tạo mẫu tóc giàu kinh nghiệm, có lượng khách hàng ổn định. Phải thành thạo các kỹ thuật cắt, nhuộm và tạo kiểu. Chúng tôi cung cấp mức lương cạnh tranh, phúc lợi tốt và môi trường làm việc hỗ trợ."
    },
    {
      id: "hair-creative-vi",
      title: "Sáng tạo & Nghệ thuật",
      description: "Tham gia vào đội ngũ các nghệ sĩ tóc tài năng của chúng tôi! Chúng tôi đang tìm kiếm các nhà tạo mẫu có niềm đam mê sáng tạo và mong muốn vượt qua các giới hạn của thiết kế tóc. Phải có kỹ năng về các xu hướng và kỹ thuật mới nhất."
    },
    {
      id: "hair-customerFocused-vi",
      title: "Tập trung vào Khách hàng",
      description: "Chúng tôi đang tìm kiếm các nhà tạo mẫu tóc thân thiện và cởi mở, những người thích làm cho khách hàng cảm thấy tuyệt vời nhất. Phải có kỹ năng dịch vụ khách hàng xuất sắc và mong muốn xây dựng mối quan hệ lâu dài với khách hàng."
    },
    {
      id: "hair-modern-vi",
      title: "Hiện đại & Hợp thời trang",
      description: "Luôn đi đầu xu hướng với salon hiện đại của chúng tôi! Chúng tôi đang tìm kiếm các nhà tạo mẫu có đam mê với các xu hướng và kỹ thuật mới nhất. Phải có kỹ năng cắt, nhuộm và tạo kiểu."
    },
    {
      id: "hair-teamOriented-vi",
      title: "Định hướng Đồng đội",
      description: "Tham gia vào đội ngũ hỗ trợ và hợp tác của chúng tôi! Chúng tôi đang tìm kiếm các nhà tạo mẫu là những người đồng đội và sẵn sàng giúp đỡ lẫn nhau để thành công. Phải có kỹ năng giao tiếp xuất sắc và thái độ tích cực."
    }
  ],
  spa: [
    {
      id: "spa-professional-vi",
      title: "Chuyên nghiệp & Tinh tế",
      description: "Spa sang trọng tìm kiếm các chuyên gia thẩm mỹ và trị liệu massage có kinh nghiệm. Phải có giấy phép hành nghề và thành thạo nhiều liệu pháp spa khác nhau. Chúng tôi cung cấp mức lương cạnh tranh, phúc lợi tốt và môi trường làm việc thư giãn."
    },
    {
      id: "spa-customerFocused-vi",
      title: "Tập trung vào Khách hàng",
      description: "Chúng tôi đang tìm kiếm các nhà trị liệu spa thân thiện và giàu lòng trắc ẩn, những người thích giúp khách hàng thư giãn và trẻ hóa. Phải có kỹ năng dịch vụ khách hàng xuất sắc và mong muốn xây dựng mối quan hệ lâu dài với khách hàng."
    },
    {
      id: "spa-holistic-vi",
      title: "Toàn diện & Định hướng Sức khỏe",
      description: "Tham gia vào đội ngũ các nhà trị liệu spa toàn diện của chúng tôi! Chúng tôi đang tìm kiếm các nhà trị liệu có đam mê với sức khỏe và mong muốn giúp khách hàng đạt được sức khỏe và hạnh phúc tối ưu. Phải có kỹ năng về nhiều liệu pháp spa toàn diện."
    },
    {
      id: "spa-modern-vi",
      title: "Hiện đại & Đổi mới",
      description: "Luôn đi đầu xu hướng với spa hiện đại của chúng tôi! Chúng tôi đang tìm kiếm các nhà trị liệu có đam mê với các xu hướng và kỹ thuật mới nhất. Phải có kỹ năng về nhiều liệu pháp spa hiện đại."
    },
    {
      id: "spa-teamOriented-vi",
      title: "Định hướng Đồng đội",
      description: "Tham gia vào đội ngũ hỗ trợ và hợp tác của chúng tôi! Chúng tôi đang tìm kiếm các nhà trị liệu là những người đồng đội và sẵn sàng giúp đỡ lẫn nhau để thành công. Phải có kỹ năng giao tiếp xuất sắc và thái độ tích cực."
    }
  ],
  receptionist: [
    {
      id: "receptionist-professional-vi",
      title: "Chuyên nghiệp & Tinh tế",
      description: "Salon bận rộn tìm kiếm một nhân viên lễ tân thân thiện và có tổ chức để chào đón khách hàng, lên lịch hẹn và xử lý thanh toán. Phải có kỹ năng dịch vụ khách hàng xuất sắc và thái độ chuyên nghiệp."
    },
    {
      id: "receptionist-customerFocused-vi",
      title: "Tập trung vào Khách hàng",
      description: "Chúng tôi đang tìm kiếm một nhân viên lễ tân ấm áp và niềm nở, người thích làm cho khách hàng cảm thấy thoải mái và được trân trọng. Phải có kỹ năng dịch vụ khách hàng xuất sắc và mong muốn xây dựng mối quan hệ lâu dài với khách hàng."
    },
    {
      id: "receptionist-organized-vi",
      title: "Có tổ chức & Hiệu quả",
      description: "Chúng tôi cần một nhân viên lễ tân có tổ chức và hiệu quả cao để quản lý bàn tiếp tân bận rộn của chúng tôi. Phải có khả năng làm nhiều việc cùng một lúc, ưu tiên các nhiệm vụ và duy trì vẻ ngoài chuyên nghiệp."
    },
    {
      id: "receptionist-techSavvy-vi",
      title: "Am hiểu Công nghệ",
      description: "Chúng tôi đang tìm kiếm một nhân viên lễ tân am hiểu công nghệ, người thoải mái sử dụng máy tính, phần mềm lên lịch và các thiết bị văn phòng khác. Phải có kỹ năng máy tính xuất sắc và sẵn sàng học các công nghệ mới."
    },
    {
      id: "receptionist-teamOriented-vi",
      title: "Định hướng Đồng đội",
      description: "Tham gia vào đội ngũ hỗ trợ và hợp tác của chúng tôi! Chúng tôi đang tìm kiếm một nhân viên lễ tân là một người đồng đội và sẵn sàng giúp đỡ bất cứ khi nào cần thiết. Phải có kỹ năng giao tiếp xuất sắc và thái độ tích cực."
    }
  ],
  other: [
    {
      id: "other-professional-vi",
      title: "Chuyên nghiệp & Tinh tế",
      description: "Chúng tôi đang tìm kiếm một chuyên gia lành nghề và giàu kinh nghiệm để tham gia vào đội ngũ của chúng tôi. Phải có kỹ năng giao tiếp và межличностные xuất sắc."
    },
    {
      id: "other-customerFocused-vi",
      title: "Tập trung vào Khách hàng",
      description: "Chúng tôi đang tìm kiếm một chuyên gia thân thiện và cởi mở, người thích làm việc với mọi người. Phải có kỹ năng dịch vụ khách hàng xuất sắc và mong muốn xây dựng mối quan hệ lâu dài với khách hàng."
    },
    {
      id: "other-organized-vi",
      title: "Có tổ chức & Hiệu quả",
      description: "Chúng tôi cần một chuyên gia có tổ chức và hiệu quả cao để quản lý văn phòng bận rộn của chúng tôi. Phải có khả năng làm nhiều việc cùng một lúc, ưu tiên các nhiệm vụ và duy trì vẻ ngoài chuyên nghiệp."
    },
    {
      id: "other-techSavvy-vi",
      title: "Am hiểu Công nghệ",
      description: "Chúng tôi đang tìm kiếm một chuyên gia am hiểu công nghệ, người thoải mái sử dụng máy tính, phần mềm và các thiết bị văn phòng khác. Phải có kỹ năng máy tính xuất sắc và sẵn sàng học các công nghệ mới."
    },
    {
      id: "other-teamOriented-vi",
      title: "Định hướng Đồng đội",
      description: "Tham gia vào đội ngũ hỗ trợ và hợp tác của chúng tôi! Chúng tôi đang tìm kiếm một chuyên gia là một người đồng đội và sẵn sàng giúp đỡ bất cứ khi nào cần thiết. Phải có kỹ năng giao tiếp xuất sắc và thái độ tích cực."
    }
  ]
};
