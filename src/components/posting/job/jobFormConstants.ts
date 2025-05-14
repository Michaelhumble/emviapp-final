
// This file contains constants used in the job form
import { JobType } from "./types";

export const jobTypeTitles: Record<JobType, string> = {
  "nail technician": "Nail Technician",
  hairstylist: "Hairstylist",
  "lash technician": "Lash Technician",
  "makeup artist": "Makeup Artist",
  "front desk": "Front Desk",
  manager: "Manager",
  "salon assistant": "Salon Assistant",
  massage: "Massage Therapist",
  esthetician: "Esthetician",
  barber: "Barber",
  apprentice: "Apprentice",
  "tattoo artist": "Tattoo Artist",
  "other beauty": "Other Beauty Professional",
};

export const experienceLevels = [
  { value: "entry", label: "Entry Level" },
  { value: "midLevel", label: "Mid-Level" },
  { value: "senior", label: "Senior" },
  { value: "expert", label: "Expert" },
  { value: "any", label: "Any Experience Level" },
];

export const employmentTypes = [
  { value: "fullTime", label: "Full Time" },
  { value: "partTime", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "booth", label: "Booth Rental" },
  { value: "commission", label: "Commission" },
];

export const compensationTypes = [
  { value: "hourly", label: "Hourly" },
  { value: "commission", label: "Commission" },
  { value: "salary", label: "Salary" },
  { value: "hourlyPlusCommission", label: "Hourly + Commission" },
  { value: "salaryPlusCommission", label: "Salary + Commission" },
  { value: "other", label: "Other" },
];

export const scheduleDays = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
  { value: "flexible", label: "Flexible" },
];

export const benefitOptions = [
  { value: "healthInsurance", label: "Health Insurance" },
  { value: "dentalInsurance", label: "Dental Insurance" },
  { value: "paidTimeOff", label: "Paid Time Off" },
  { value: "retirement", label: "Retirement Plan" },
  { value: "flexibleSchedule", label: "Flexible Schedule" },
  { value: "productDiscount", label: "Product Discount" },
  { value: "training", label: "Training & Education" },
  { value: "tips", label: "Tips & Gratuities" },
];

// Polish description templates by job type
export const polishedTemplates = {
  "nail technician": [
    {
      style: "professional",
      en: "We are seeking an experienced Nail Technician to join our established salon. The ideal candidate will have expertise in manicures, pedicures, and nail enhancements. You will be responsible for providing high-quality nail services while maintaining a clean and welcoming environment. Must have current license and 1+ years of experience.",
      vi: "Chúng tôi đang tìm kiếm một Kỹ thuật viên Nail có kinh nghiệm để gia nhập tiệm salon của chúng tôi. Ứng viên lý tưởng sẽ có chuyên môn về dịch vụ làm móng tay, móng chân và đắp móng. Bạn sẽ chịu trách nhiệm cung cấp dịch vụ làm móng chất lượng cao trong khi duy trì môi trường sạch sẽ và thân thiện. Phải có giấy phép hiện hành và kinh nghiệm trên 1 năm."
    },
    {
      style: "friendly",
      en: "Join our nail salon family! We're looking for a talented nail tech who loves creating beautiful nails and making clients smile. If you enjoy a fun, supportive workspace where creativity is valued, we'd love to meet you! Bring your passion for nail art and customer care - we offer competitive pay and a positive team environment.",
      vi: "Hãy gia nhập gia đình tiệm nail của chúng tôi! Chúng tôi đang tìm kiếm một thợ nail tài năng, người yêu thích tạo ra những bộ móng đẹp và làm cho khách hàng mỉm cười. Nếu bạn thích một không gian làm việc vui vẻ, hỗ trợ nơi sự sáng tạo được đánh giá cao, chúng tôi rất muốn gặp bạn! Mang đam mê nghệ thuật làm móng và chăm sóc khách hàng của bạn - chúng tôi cung cấp mức lương cạnh tranh và môi trường làm việc tích cực."
    },
    {
      style: "luxury",
      en: "Prestigious nail salon seeks an exceptional nail artist to serve our exclusive clientele. We provide premium services in an upscale environment and require someone with impeccable attention to detail and mastery of advanced techniques. Only candidates with extensive experience in luxury nail services and a sophisticated portfolio need apply. Excellent compensation for the right talent.",
      vi: "Tiệm nail danh tiếng đang tìm kiếm một nghệ sĩ nail xuất sắc để phục vụ khách hàng cao cấp của chúng tôi. Chúng tôi cung cấp các dịch vụ cao cấp trong một môi trường sang trọng và yêu cầu người có sự chú ý đến từng chi tiết và thành thạo các kỹ thuật nâng cao. Chỉ các ứng viên có kinh nghiệm phong phú trong các dịch vụ nail cao cấp và có portfolio tinh tế mới cần nộp đơn. Đãi ngộ tuyệt vời cho người có tài năng phù hợp."
    },
    {
      style: "casual",
      en: "Nail tech wanted for our busy, laid-back salon! Good vibes, great clients, and a supportive team await. We're not super formal - just looking for someone who does quality work and enjoys connecting with customers. Part-time or full-time options available. Come grow with us!",
      vi: "Cần thợ nail cho tiệm salon nhộn nhịp, thoải mái của chúng tôi! Không khí vui vẻ, khách hàng tuyệt vời và một đội ngũ hỗ trợ đang chờ đợi bạn. Chúng tôi không quá trang trọng - chỉ tìm kiếm người làm việc chất lượng và thích kết nối với khách hàng. Có các lựa chọn làm việc bán thời gian hoặc toàn thời gian. Hãy đến và phát triển cùng chúng tôi!"
    },
    {
      style: "detailed",
      en: "NAIL TECHNICIAN POSITION: Requirements: Valid cosmetology license, 2+ years experience in acrylic, gel, and natural nail services. Duties: Perform manicures, pedicures, nail enhancements, and nail art. Maintain sanitation standards. Skills needed: Customer service excellence, attention to detail, knowledge of current nail trends. Hours: Tuesday-Saturday, 10am-7pm. Benefits include: Commission-based pay (starting at 50%), tips, paid training opportunities, and product discounts. Located in a high-traffic shopping center with established clientele.",
      vi: "VỊ TRÍ KỸ THUẬT VIÊN NAIL: Yêu cầu: Giấy phép thẩm mỹ hợp lệ, hơn 2 năm kinh nghiệm trong dịch vụ móng acrylic, gel và móng tự nhiên. Nhiệm vụ: Thực hiện dịch vụ làm móng tay, móng chân, đắp móng và nghệ thuật móng. Duy trì tiêu chuẩn vệ sinh. Kỹ năng cần thiết: Dịch vụ khách hàng xuất sắc, chú ý đến chi tiết, kiến thức về xu hướng móng hiện tại. Giờ làm việc: Thứ Ba - Thứ Bảy, 10 giờ sáng - 7 giờ tối. Quyền lợi bao gồm: Lương dựa trên hoa hồng (bắt đầu từ 50%), tiền tip, cơ hội đào tạo có lương và giảm giá sản phẩm. Nằm trong trung tâm mua sắm có lượng khách qua lại cao với lượng khách hàng ổn định."
    }
  ],
  hairstylist: [
    {
      style: "professional",
      en: "Licensed Hairstylist needed for our established salon. The ideal candidate will have strong skills in cutting, coloring, and styling for diverse clientele. We seek someone with technical excellence, creativity, and professional demeanor. Must have current cosmetology license and minimum 2 years salon experience. Booth rental available for experienced stylists.",
      vi: "Cần thợ tóc có bằng hành nghề cho salon đã thành lập của chúng tôi. Ứng viên lý tưởng sẽ có kỹ năng mạnh mẽ trong cắt, nhuộm và tạo kiểu cho đa dạng khách hàng. Chúng tôi tìm kiếm người có sự xuất sắc về kỹ thuật, sáng tạo và phong thái chuyên nghiệp. Phải có giấy phép thẩm mỹ hiện hành và tối thiểu 2 năm kinh nghiệm làm việc tại salon. Có booth cho thuê cho những thợ có kinh nghiệm."
    },
    {
      style: "friendly",
      en: "Join our hair salon family! We're looking for a passionate hairstylist who loves creating beautiful looks and connecting with clients. Our team is supportive, fun, and dedicated to helping each other grow. Bring your scissor skills and friendly personality - we offer great pay, flexible scheduling, and a positive atmosphere where your creativity can shine!",
      vi: "Hãy tham gia vào gia đình salon tóc của chúng tôi! Chúng tôi đang tìm kiếm một nhà tạo mẫu tóc nhiệt huyết, người yêu thích tạo ra những kiểu dáng đẹp và kết nối với khách hàng. Đội ngũ của chúng tôi hỗ trợ, vui vẻ và tận tâm giúp đỡ nhau phát triển. Mang theo kỹ năng cắt tóc và tính cách thân thiện của bạn - chúng tôi cung cấp mức lương tốt, lịch trình linh hoạt và một bầu không khí tích cực nơi sự sáng tạo của bạn có thể tỏa sáng!"
    },
    {
      style: "luxury",
      en: "Elite hair salon seeks master stylist to join our prestigious team. We cater to discerning clients who expect exceptional service and artistry. The ideal candidate possesses advanced expertise in precision cutting, color formulation, and transformative styling techniques. Proven experience with high-end clientele required. We offer premium compensation for extraordinary talent in our luxurious, state-of-the-art facility.",
      vi: "Salon tóc cao cấp tìm kiếm nhà tạo mẫu tóc bậc thầy để tham gia vào đội ngũ uy tín của chúng tôi. Chúng tôi phục vụ những khách hàng tinh tế, những người mong đợi dịch vụ và nghệ thuật xuất sắc. Ứng viên lý tưởng sở hữu chuyên môn cao cấp trong cắt tóc chính xác, pha màu và kỹ thuật tạo kiểu biến đổi. Yêu cầu có kinh nghiệm làm việc với khách hàng cao cấp. Chúng tôi cung cấp mức đãi ngộ cao cấp cho tài năng phi thường trong cơ sở sang trọng, hiện đại của chúng tôi."
    },
    {
      style: "casual",
      en: "Cool hairstylist wanted for our laid-back, friendly salon! We're a drama-free team who loves what we do. Looking for someone with solid cutting and coloring skills who enjoys connecting with clients. Flexible schedule, good pay structure, and a supportive environment. No strict dress code - just bring your talent and good vibes!",
      vi: "Cần thợ tóc cool cho salon thân thiện, thoải mái của chúng tôi! Chúng tôi là một đội ngũ không drama, yêu thích công việc của mình. Đang tìm kiếm người có kỹ năng cắt và nhuộm vững chắc, thích kết nối với khách hàng. Lịch trình linh hoạt, cơ cấu lương tốt và môi trường hỗ trợ. Không có quy định trang phục nghiêm ngặt - chỉ cần mang theo tài năng và năng lượng tích cực của bạn!"
    },
    {
      style: "detailed",
      en: "HAIRSTYLIST POSITION: Requirements: Valid cosmetology license, minimum 2 years salon experience, proficiency in modern cutting techniques, color application, and styling for diverse hair types. Services include: precision cuts, color services (balayage, highlights, fashion colors), blowouts, and special occasion styling. Hours: Wednesday-Sunday with two weekdays off. Compensation: Commission-based (55-65% depending on experience) plus retail commission. Benefits include: Paid education, health insurance contribution after 6 months, paid vacation after 1 year, and professional product discounts. Must provide own basic tools, color and products provided by salon.",
      vi: "VỊ TRÍ STYLIST TÓC: Yêu cầu: Giấy phép thẩm mỹ hợp lệ, tối thiểu 2 năm kinh nghiệm salon, thành thạo các kỹ thuật cắt hiện đại, ứng dụng màu sắc và tạo kiểu cho các loại tóc đa dạng. Dịch vụ bao gồm: cắt chính xác, dịch vụ màu (balayage, highlight, màu thời trang), sấy tạo kiểu và làm tóc cho các dịp đặc biệt. Giờ làm việc: Thứ Tư-Chủ Nhật với hai ngày trong tuần được nghỉ. Thù lao: Dựa trên hoa hồng (55-65% tùy thuộc vào kinh nghiệm) cộng với hoa hồng bán lẻ. Quyền lợi bao gồm: Đào tạo có lương, đóng góp bảo hiểm y tế sau 6 tháng, nghỉ phép có lương sau 1 năm và giảm giá sản phẩm chuyên nghiệp. Phải tự cung cấp công cụ cơ bản, thuốc nhuộm và sản phẩm do salon cung cấp."
    }
  ],
  "lash technician": [
    {
      style: "professional",
      en: "Licensed Lash Technician needed for our upscale beauty studio. The ideal candidate will have certification in classic, volume, and hybrid lash extensions with demonstrated expertise in proper application techniques. You will provide consultations and customize lash services to meet client needs while maintaining impeccable sanitation standards. Minimum 1 year professional experience required.",
      vi: "Cần Kỹ thuật viên Mi có bằng hành nghề cho studio làm đẹp cao cấp của chúng tôi. Ứng viên lý tưởng sẽ có chứng chỉ về nối mi classic, volume và hybrid với chuyên môn đã được chứng minh trong các kỹ thuật ứng dụng phù hợp. Bạn sẽ cung cấp tư vấn và tùy chỉnh dịch vụ mi để đáp ứng nhu cầu của khách hàng trong khi duy trì các tiêu chuẩn vệ sinh hoàn hảo. Yêu cầu tối thiểu 1 năm kinh nghiệm chuyên nghiệp."
    },
    {
      style: "friendly",
      en: "Join our amazing lash studio family! We're looking for a talented lash artist who loves creating beautiful extensions and making clients feel gorgeous. Our team is super supportive and focused on creating a positive experience for both clients and staff. If you're passionate about lashes and building relationships with clients, we want to meet you! Great compensation and flexible scheduling available.",
      vi: "Tham gia vào gia đình studio mi tuyệt vời của chúng tôi! Chúng tôi đang tìm kiếm một nghệ sĩ mi tài năng, người yêu thích tạo ra những bộ mi nối đẹp và làm cho khách hàng cảm thấy tuyệt vời. Đội ngũ của chúng tôi rất hỗ trợ và tập trung vào việc tạo ra trải nghiệm tích cực cho cả khách hàng và nhân viên. Nếu bạn đam mê về mi và xây dựng mối quan hệ với khách hàng, chúng tôi muốn gặp bạn! Có chế độ đãi ngộ tốt và lịch trình linh hoạt."
    },
    {
      style: "luxury",
      en: "Premier lash studio seeks an exceptional lash artist for our exclusive clientele. We provide the finest in customized lash artistry and require someone with extraordinary talent and precision. The ideal candidate will possess mastery of all advanced techniques including mega volume, Kim K, and intricate styling. Only those with extensive experience in luxury beauty services and an impressive portfolio should apply. Exceptional compensation for the right artist.",
      vi: "Studio mi hàng đầu tìm kiếm một nghệ sĩ mi xuất sắc cho khách hàng độc quyền của chúng tôi. Chúng tôi cung cấp dịch vụ nghệ thuật mi tùy chỉnh tốt nhất và yêu cầu người có tài năng và độ chính xác phi thường. Ứng viên lý tưởng sẽ sở hữu sự thành thạo tất cả các kỹ thuật nâng cao bao gồm mega volume, Kim K và tạo kiểu phức tạp. Chỉ những người có kinh nghiệm phong phú trong các dịch vụ làm đẹp cao cấp và một portfolio ấn tượng mới nên ứng tuyển. Đãi ngộ đặc biệt cho nghệ sĩ phù hợp."
    },
    {
      style: "casual",
      en: "Lash tech wanted for our friendly neighborhood beauty studio! We're all about good vibes and making clients feel amazing. No drama here - just a relaxed atmosphere where you can do great work. Looking for someone with lash extension skills who's reliable and enjoys connecting with people. Part-time or full-time options with competitive pay!",
      vi: "Cần thợ mi cho studio làm đẹp thân thiện trong khu vực của chúng tôi! Chúng tôi đề cao không khí tốt đẹp và làm cho khách hàng cảm thấy tuyệt vời. Không có drama ở đây - chỉ có một bầu không khí thoải mái nơi bạn có thể làm việc tốt. Đang tìm kiếm người có kỹ năng nối mi, đáng tin cậy và thích kết nối với mọi người. Có các lựa chọn bán thời gian hoặc toàn thời gian với mức lương cạnh tranh!"
    },
    {
      style: "detailed",
      en: "LASH TECHNICIAN POSITION: Requirements: Valid esthetician or cosmetology license, lash extension certification, minimum 1 year professional experience. Services provided: Classic extensions, volume fans (2D-5D), hybrid sets, lash lifts, tints, and fills. Equipment: Must be proficient with various adhesives, isolation tools, and tape applications. Work schedule: 4-5 days per week including Saturday rotation (Tuesday-Saturday). Compensation: $25-35/hour base plus 10% service add-ons and retail commission. Benefits include: Paid continuing education, product discounts, and performance bonuses. Must maintain detailed client records and adhere to strict sanitation protocols.",
      vi: "VỊ TRÍ KỸ THUẬT VIÊN MI: Yêu cầu: Giấy phép thẩm mỹ hoặc khoa học thẩm mỹ hợp lệ, chứng nhận nối mi, tối thiểu 1 năm kinh nghiệm chuyên nghiệp. Dịch vụ cung cấp: Nối mi cổ điển, mi volume (2D-5D), mi hybrid, uốn mi, nhuộm mi và điền mi. Thiết bị: Phải thành thạo với các loại keo dán khác nhau, dụng cụ tách mi và ứng dụng băng dính. Lịch làm việc: 4-5 ngày mỗi tuần bao gồm luân phiên thứ Bảy (Thứ Ba-Thứ Bảy). Thù lao: $25-35/giờ cơ bản cộng với 10% dịch vụ bổ sung và hoa hồng bán lẻ. Quyền lợi bao gồm: Đào tạo liên tục được trả lương, giảm giá sản phẩm và tiền thưởng hiệu suất. Phải duy trì hồ sơ khách hàng chi tiết và tuân thủ các quy định vệ sinh nghiêm ngặt."
    }
  ],
  "makeup artist": [
    {
      style: "professional",
      en: "Experienced Makeup Artist sought for our established beauty studio. The ideal candidate will have proven expertise in various makeup techniques including bridal, special occasion, and photoshoot applications. Must have a professional kit with quality products, excellent color theory knowledge, and the ability to work with diverse skin tones and features. Portfolio review required during interview.",
      vi: "Tìm kiếm Chuyên gia Trang điểm có kinh nghiệm cho studio làm đẹp đã thành lập của chúng tôi. Ứng viên lý tưởng sẽ có chuyên môn được chứng minh trong các kỹ thuật trang điểm khác nhau bao gồm trang điểm cô dâu, dịp đặc biệt và chụp ảnh. Phải có bộ dụng cụ chuyên nghiệp với các sản phẩm chất lượng, kiến thức về lý thuyết màu sắc xuất sắc và khả năng làm việc với nhiều tông da và đặc điểm khuôn mặt khác nhau. Yêu cầu xem xét portfolio trong quá trình phỏng vấn."
    },
    {
      style: "friendly",
      en: "Creative makeup artist wanted for our fun beauty team! We're looking for someone who loves making clients look and feel their best through the art of makeup. Whether it's a natural everyday look or full glam, your passion for beauty should shine through! Join our supportive salon where we celebrate creativity and building genuine connections with our clients.",
      vi: "Cần nghệ sĩ trang điểm sáng tạo cho đội ngũ làm đẹp vui vẻ của chúng tôi! Chúng tôi đang tìm kiếm người yêu thích làm cho khách hàng trông và cảm thấy tốt nhất thông qua nghệ thuật trang điểm. Cho dù đó là một diện mạo tự nhiên hàng ngày hay full glam, niềm đam mê làm đẹp của bạn nên tỏa sáng! Tham gia vào salon hỗ trợ của chúng tôi, nơi chúng tôi tôn vinh sự sáng tạo và xây dựng kết nối chân thành với khách hàng."
    },
    {
      style: "luxury",
      en: "Elite beauty studio seeks master makeup artist with exceptional talent to serve our sophisticated clientele. We require someone with extensive editorial, runway, or celebrity experience who can deliver flawless, transformative results for the most discerning clients. Mastery of advanced techniques, perfect color matching, and impeccable attention to detail are essential. Only artists with premium kit and distinguished portfolio considered for this prestigious position.",
      vi: "Studio làm đẹp cao cấp tìm kiếm nghệ sĩ trang điểm bậc thầy với tài năng xuất sắc để phục vụ khách hàng tinh tế của chúng tôi. Chúng tôi yêu cầu người có kinh nghiệm biên tập, sàn diễn, hoặc làm việc với người nổi tiếng, người có thể mang lại kết quả hoàn hảo, biến đổi cho những khách hàng khó tính nhất. Sự thành thạo các kỹ thuật nâng cao, khả năng phối màu hoàn hảo và sự chú ý đến từng chi tiết là điều cần thiết. Chỉ những nghệ sĩ có bộ dụng cụ cao cấp và portfolio nổi bật mới được xem xét cho vị trí danh giá này."
    },
    {
      style: "casual",
      en: "Makeup artist needed for our cool, welcoming beauty spot! We're not super formal - just looking for someone with good makeup skills who can make clients happy with natural looks or creative glam. Bring your brushes, your talent, and your friendly personality. Flexible hours and good pay for the right person. Come join our drama-free team!",
      vi: "Cần nghệ sĩ trang điểm cho địa điểm làm đẹp cool, thân thiện của chúng tôi! Chúng tôi không quá trang trọng - chỉ tìm kiếm người có kỹ năng trang điểm tốt, có thể làm cho khách hàng hài lòng với kiểu trang điểm tự nhiên hoặc sáng tạo glam. Mang theo cọ, tài năng và tính cách thân thiện của bạn. Giờ làm việc linh hoạt và mức lương tốt cho người phù hợp. Hãy đến tham gia vào đội ngũ không drama của chúng tôi!"
    },
    {
      style: "detailed",
      en: "MAKEUP ARTIST POSITION: Requirements: Documented training in professional makeup application, minimum 2 years experience in bridal/special event makeup, complete professional kit with high-quality products for all skin types/tones. Services: Bridal makeup, special occasion, mature skin techniques, contouring, and airbrush application. Schedule: Thursday-Sunday plus on-call for events. Weekend availability essential. Compensation: $30-45/hour base rate with bonus for bridal parties and special events. Add-on services (lash application, skin prep) earn additional commission. Benefits include: Makeup brand discounts, paid training workshops quarterly, and performance bonuses during wedding season. Must be comfortable with early morning appointments and on-location services.",
      vi: "VỊ TRÍ NGHỆ SĨ TRANG ĐIỂM: Yêu cầu: Đào tạo có chứng nhận về ứng dụng trang điểm chuyên nghiệp, tối thiểu 2 năm kinh nghiệm trong trang điểm cô dâu/sự kiện đặc biệt, bộ dụng cụ chuyên nghiệp đầy đủ với sản phẩm chất lượng cao cho mọi loại da/tông da. Dịch vụ: Trang điểm cô dâu, dịp đặc biệt, kỹ thuật cho da trưởng thành, tạo khối và ứng dụng airbrush. Lịch trình: Thứ Năm-Chủ Nhật cộng với trực cho các sự kiện. Khả năng làm việc cuối tuần là điều cần thiết. Thù lao: $30-45/giờ cơ bản với tiền thưởng cho các nhóm cô dâu và sự kiện đặc biệt. Dịch vụ bổ sung (gắn mi, chuẩn bị da) kiếm được hoa hồng bổ sung. Quyền lợi bao gồm: Giảm giá thương hiệu trang điểm, hội thảo đào tạo được trả lương hàng quý và tiền thưởng hiệu suất trong mùa cưới. Phải thoải mái với các cuộc hẹn sớm và dịch vụ tại chỗ."
    }
  ]
};

// Default template for user input
export const defaultJobDescription = "We are currently looking for a talented professional to join our team. This position offers competitive compensation and a supportive work environment. The ideal candidate will have relevant experience and a passion for client service.";
