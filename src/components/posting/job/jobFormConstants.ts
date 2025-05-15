
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

// Add empty placeholder structure for Vietnamese polished descriptions
export const POLISHED_DESCRIPTIONS_VI = {
  nail: {
    professional: [
      "Cần thợ tay chân nước làm liền, khách sang, tip cao, khu Mỹ trắng, có chỗ ở riêng. Lương cao nếu làm giỏi.",
      "Tiệm đông khách quanh năm, cần thợ bột biết ombré, vẽ đơn giản. Bao lương $1,600/tuần + chỗ ở sạch sẽ."
    ],
    friendly: [
      "Tuyển thợ nữ biết dipping và tay chân nước. Khách Mỹ trắng, tiệm trong mall sang, làm 6 ngày, tip nhiều.",
      "Cần thợ bột hoặc nước đi làm liền. Chủ dễ chịu, khách quen, lương ổn định, bao ăn ở, không drama."
    ],
    luxury: [
      "Tiệm family khu sang, đang cần gấp 1 thợ giỏi có tâm, tip mỗi tuần $1,800+. Làm vui vẻ, không áp lực.",
      "Tuyển thợ full set có kinh nghiệm. Giá nails cao, khách Mỹ trắng, làm lâu dài sẽ có thưởng + tăng lương."
    ],
    casual: [
      "Tiệm ở khu Houston, cần 2 thợ tay chân nước, bao lương + tip cao. Ưu tiên thợ biết design đơn giản.",
      "Tuyển thợ nước làm tại spa decor đẹp, khách dễ thương, bao ăn ở, lương + tip $1,500+/tuần."
    ],
    detailed: [
      "Tiệm không thiếu khách, cần thợ bột biết vẽ đơn giản, có chỗ ở riêng, không chung chủ, làm thoải mái.",
      "Cần thợ nails đi làm liền – càng giỏi càng tốt. Tiệm khách sang, chủ vui vẻ, làm không stress, có tiền liền!"
    ],
    // Add the 10 new Vietnamese templates
    "warm": [
      "Chào mừng bạn đến với salon nails thân thiện của chúng tôi! Cần tìm thợ nail có kinh nghiệm làm móng bột, gel, đắp hoa, vẽ móng. Khách sang, tip cao, chủ dễ chịu, môi trường làm việc như gia đình. Lương căn bản + ăn chia hấp dẫn, nhiều khách Mỹ trắng, khách đặt hẹn sẵn, không lo ngồi không!"
    ],
    "polite": [
      "Salon nails khu Mỹ trắng cần thợ nail tay nghề cứng, biết làm bột, gel, chân tay nước. Khách quen, giá nails cao, môi trường chuyên nghiệp, làm việc đúng giờ, lịch sự, ổn định lâu dài. Chủ có tâm, lương ổn định, có bonus, chủ yếu làm khách appointment."
    ],
    "creative": [
      "Salon nghệ thuật cần thợ biết vẽ móng, design ombre, đính đá, làm mẫu. Tự do sáng tạo, không áp lực, khách trẻ trung, nhiều cơ hội phát triển bản thân. Thu nhập cao, môi trường năng động, hỗ trợ sản phẩm tốt."
    ],
    "local": [
      "Salon nails khu đông người Việt, khách dễ thương, cần tìm thợ biết làm đủ các dịch vụ (bột, gel, chân tay nước). Chủ bao lương, môi trường vui vẻ, phù hợp anh chị em muốn ổn định, sống lâu dài gần cộng đồng người Việt."
    ],
    "direct": [
      "Cần thợ nail biết làm bột, gel, chân tay nước, khách đông quanh năm, tip tốt, chủ dễ tính. Lương cao, có chỗ ở nếu cần. Nhắn tin trực tiếp nếu muốn làm ngay!"
    ],
    "passionate": [
      "Bạn đam mê nghề nails? Hãy về đội với chúng tôi! Salon đông khách, khách Mỹ trắng, cần người chịu khó, muốn phát triển nghề. Môi trường trẻ, vui vẻ, được training thêm nếu cần."
    ],
    "supportive": [
      "Salon nhỏ, chủ thân thiện, đồng nghiệp dễ thương, cần thêm thợ làm bột hoặc chân tay nước. Chủ bao lương tháng đầu, ưu tiên biết tiếng Anh cơ bản, khách ổn định, tip chia đều."
    ],
    "longterm": [
      "Salon mới remodel, vị trí đẹp, cần thợ gắn bó lâu dài, ưu tiên ai muốn tìm môi trường làm việc ổn định, có chính sách nghỉ phép và thưởng lễ."
    ],
    "gentle": [
      "Salon như gia đình nhỏ, chủ tận tâm, khách quen lâu năm, cần thợ biết làm căn bản. Không yêu cầu áp lực doanh số, chỉ cần vui vẻ, hoà đồng, trung thực."
    ],
    "premium": [
      "Salon luxury khu trung tâm, khách sành điệu, cần thợ tay nghề cao về design, đắp bột, gel. Thu nhập cao nhất khu vực, khách bo nhiều, chủ hỗ trợ sản phẩm cao cấp, môi trường chuyên nghiệp."
    ]
  },
  hair: {
    professional: [],
    friendly: [],
    luxury: [],
    casual: [],
    detailed: [],
  },
  massage: {
    professional: [],
    friendly: [],
    luxury: [],
    casual: [],
    detailed: [],
  },
  tattoo: {
    professional: [],
    friendly: [],
    luxury: [],
    casual: [],
    detailed: [],
  },
  spa: {
    professional: [],
    friendly: [],
    luxury: [],
    casual: [],
    detailed: [],
  },
  lash: {
    professional: [],
    friendly: [],
    luxury: [],
    casual: [],
    detailed: [],
  },
  makeup: {
    professional: [],
    friendly: [],
    luxury: [],
    casual: [],
    detailed: [],
  },
  booth: {
    professional: [],
    friendly: [],
    luxury: [],
    casual: [],
    detailed: [],
  },
  manager: {
    professional: [],
    friendly: [],
    luxury: [],
    casual: [],
    detailed: [],
  },
  other: {
    professional: [],
    friendly: [],
    luxury: [],
    casual: [],
    detailed: [],
  }
};
