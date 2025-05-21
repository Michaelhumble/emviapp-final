
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

export const jobDescriptionTemplates: IndustryTemplates[] = [
  {
    industry: "nails",
    templates: [
      {
        id: "nails-1",
        title: "Experienced Nail Technician",
        description: "We are seeking an experienced Nail Technician to join our growing team. The ideal candidate will have at least 2 years of experience in manicures, pedicures, gel polish application, and acrylic extensions. Must be detail-oriented with excellent customer service skills. Competitive commission-based pay with potential for a loyal client base.",
        vietnameseDescription: "Chúng tôi đang tìm kiếm một Kỹ thuật viên Làm móng có kinh nghiệm để tham gia vào đội ngũ đang phát triển của chúng tôi. Ứng viên lý tưởng sẽ có ít nhất 2 năm kinh nghiệm về mani, pedi, sơn gel và nối móng acrylic. Phải chú ý đến chi tiết với kỹ năng phục vụ khách hàng xuất sắc. Mức lương hấp dẫn dựa trên hoa hồng với tiềm năng có được lượng khách hàng trung thành."
      },
      {
        id: "nails-2",
        title: "Nail Technician - Full or Part Time",
        description: "Join our friendly salon team! We're looking for talented nail technicians for full or part-time positions. Skills needed: manicures, pedicures, gel polish, acrylic, and dip powder. We offer flexible scheduling, competitive pay, and a positive work environment. Great opportunity for both experienced techs and recent graduates.",
        vietnameseDescription: "Tham gia đội ngũ thân thiện của tiệm chúng tôi! Chúng tôi đang tìm kiếm các kỹ thuật viên làm móng tài năng cho vị trí toàn thời gian hoặc bán thời gian. Kỹ năng cần thiết: mani, pedi, sơn gel, acrylic và bột nhúng. Chúng tôi cung cấp lịch trình linh hoạt, lương cạnh tranh và môi trường làm việc tích cực. Cơ hội tuyệt vời cho cả thợ có kinh nghiệm và người mới tốt nghiệp."
      },
      {
        id: "nails-3",
        title: "Senior Nail Artist",
        description: "Upscale nail salon seeking Senior Nail Artist with 5+ years of experience. Must excel in premium services including gel extensions, nail art, 3D designs, and complex hand-painted designs. Ideal candidates will have a strong portfolio and experience with high-end clientele. Excellent earning potential with competitive commission rates and tips.",
        vietnameseDescription: "Tiệm nail cao cấp đang tìm kiếm Nghệ sĩ Nail Cao cấp với hơn 5 năm kinh nghiệm. Phải xuất sắc trong các dịch vụ cao cấp bao gồm nối gel, nghệ thuật móng, thiết kế 3D và các thiết kế vẽ tay phức tạp. Ứng viên lý tưởng sẽ có danh mục đầu tư mạnh mẽ và kinh nghiệm với khách hàng cao cấp. Tiềm năng thu nhập tuyệt vời với tỷ lệ hoa hồng cạnh tranh và tiền boa."
      },
      {
        id: "nails-4",
        title: "Nail Salon Manager",
        description: "Established nail salon seeking experienced Salon Manager to oversee daily operations. Responsibilities include staff management, scheduling, inventory control, and ensuring exceptional customer service. The ideal candidate will have 3+ years in salon management with strong leadership skills and knowledge of nail services. Competitive salary plus bonus opportunities.",
        vietnameseDescription: "Tiệm nail đã thành lập đang tìm kiếm Quản lý Tiệm có kinh nghiệm để giám sát hoạt động hàng ngày. Trách nhiệm bao gồm quản lý nhân viên, lập lịch, kiểm soát hàng tồn kho và đảm bảo dịch vụ khách hàng xuất sắc. Ứng viên lý tưởng sẽ có hơn 3 năm trong quản lý tiệm với kỹ năng lãnh đạo mạnh mẽ và kiến thức về dịch vụ làm móng. Mức lương cạnh tranh cộng với cơ hội thưởng."
      },
      {
        id: "nails-5",
        title: "Entry Level Nail Tech",
        description: "We're looking for motivated Entry Level Nail Technicians to join our team. Recent graduates welcome! We provide training and mentorship to help you build your skills in manicures, pedicures, and basic gel applications. Great opportunity to launch your career with a supportive team. Reliable transportation required. Base pay plus increasing commission as skills develop.",
        vietnameseDescription: "Chúng tôi đang tìm kiếm các Kỹ thuật viên Móng Cấp độ Nhập môn có động lực để tham gia vào đội ngũ của chúng tôi. Chào mừng người mới tốt nghiệp! Chúng tôi cung cấp đào tạo và hướng dẫn để giúp bạn xây dựng kỹ năng làm móng tay, móng chân và ứng dụng gel cơ bản. Cơ hội tuyệt vời để bắt đầu sự nghiệp của bạn với một đội ngũ hỗ trợ. Yêu cầu phương tiện đi lại đáng tin cậy. Lương cơ bản cộng với hoa hồng tăng dần khi kỹ năng phát triển."
      },
      {
        id: "nails-6",
        title: "Nail Tech with Waxing Skills",
        description: "Busy salon seeking talented Nail Technician with waxing experience. Must be proficient in manicures, pedicures, gel polish, and facial/body waxing services. Cross-trained professionals will earn higher commission rates. We offer flexible scheduling and a friendly team environment. Reliable transportation and good English communication skills required.",
        vietnameseDescription: "Tiệm bận rộn đang tìm kiếm Kỹ thuật viên Móng có kinh nghiệm wax lông. Phải thành thạo trong làm móng tay, móng chân, sơn gel và dịch vụ wax lông mặt/cơ thể. Các chuyên gia được đào tạo chéo sẽ nhận được tỷ lệ hoa hồng cao hơn. Chúng tôi cung cấp lịch trình linh hoạt và môi trường nhóm thân thiện. Yêu cầu phương tiện đi lại đáng tin cậy và kỹ năng giao tiếp tiếng Anh tốt."
      },
      {
        id: "nails-7",
        title: "Full Service Nail Professional",
        description: "High-end salon looking for experienced Full Service Nail Professionals. Skills required: natural nail manicures, pedicures, gel polish, acrylic application, dip powder, and nail art. Knowledge of SNS and polygel a plus. We provide a luxurious work environment with high-paying clientele. Commission-based position with retail bonus opportunities.",
        vietnameseDescription: "Tiệm cao cấp đang tìm kiếm các Chuyên gia Nail Dịch vụ Đầy đủ có kinh nghiệm. Kỹ năng yêu cầu: làm móng tự nhiên, pedi, sơn gel, đắp acrylic, bột nhúng và nghệ thuật móng. Kiến thức về SNS và polygel là một lợi thế. Chúng tôi cung cấp môi trường làm việc sang trọng với khách hàng trả lương cao. Vị trí dựa trên hoa hồng với cơ hội thưởng bán lẻ."
      },
      {
        id: "nails-8",
        title: "Nail Technician with Housing",
        description: "Family-owned salon seeking reliable Nail Technicians. We offer FREE HOUSING and stable weekly pay. Experience in manicures, pedicures, and acrylic required. Friendly work environment with established customer base. Great opportunity for technicians looking to relocate. Housing is conveniently located near salon and shopping centers.",
        vietnameseDescription: "Tiệm gia đình đang tìm kiếm các Kỹ thuật viên Móng đáng tin cậy. Chúng tôi cung cấp NHÀ Ở MIỄN PHÍ và lương hàng tuần ổn định. Yêu cầu kinh nghiệm làm móng tay, móng chân và acrylic. Môi trường làm việc thân thiện với cơ sở khách hàng đã được thiết lập. Cơ hội tuyệt vời cho các kỹ thuật viên muốn chuyển đến nơi khác. Nhà ở thuận tiện nằm gần tiệm và trung tâm mua sắm."
      },
      {
        id: "nails-9",
        title: "Nail Tech with Growth Opportunity",
        description: "Expanding nail salon chain seeking talented technicians for our newest location. Experience with manicures, pedicures, and gel services required. We offer paid training on advanced techniques, guaranteed base salary plus commission, and clear path to leadership roles. Join our team and grow with our company!",
        vietnameseDescription: "Chuỗi tiệm nail đang mở rộng tìm kiếm các kỹ thuật viên tài năng cho địa điểm mới nhất của chúng tôi. Yêu cầu kinh nghiệm với dịch vụ làm móng tay, móng chân và gel. Chúng tôi cung cấp đào tạo được trả lương về các kỹ thuật nâng cao, đảm bảo lương cơ bản cộng với hoa hồng, và con đường rõ ràng đến các vai trò lãnh đạo. Tham gia đội ngũ của chúng tôi và phát triển cùng công ty!"
      },
      {
        id: "nails-10",
        title: "Nail Technician - Weekly Pay",
        description: "Busy suburban salon hiring Nail Technicians with weekly guaranteed pay. Skills needed include manicures, pedicures, acrylic, and gel polish. No supply deduction and flexible scheduling available. Our established salon has loyal customers and walk-in traffic. Friendly, drama-free workplace with potential for long-term employment.",
        vietnameseDescription: "Tiệm nail ngoại ô bận rộn tuyển dụng Kỹ thuật viên Móng với mức lương hàng tuần được đảm bảo. Kỹ năng cần thiết bao gồm làm móng tay, móng chân, acrylic và sơn gel. Không khấu trừ tiền vật liệu và có lịch trình linh hoạt. Tiệm đã thành lập của chúng tôi có khách hàng trung thành và lượng khách ghé qua. Nơi làm việc thân thiện, không drama với tiềm năng việc làm lâu dài."
      }
    ]
  },
  {
    industry: "hair",
    templates: [
      {
        id: "hair-1",
        title: "Experienced Hair Stylist",
        description: "We're looking for a passionate Hair Stylist to join our team. Ideal candidates have 2+ years of experience with haircuts, coloring, highlights, and styling. Must have a strong portfolio and excellent customer service skills. Commission-based compensation with potential for loyal clientele and retail bonus opportunities."
      },
      {
        id: "hair-2",
        title: "Senior Hair Colorist",
        description: "Upscale salon seeking experienced Senior Hair Colorist with proven expertise in color correction, balayage, highlights, and creative color techniques. Must have 5+ years of experience and a strong portfolio. We offer competitive commission rates, continuing education, and a collaborative team environment."
      },
      {
        id: "hair-3", 
        title: "Hair Stylist - Rental Chair",
        description: "Beautiful, modern salon has booth rental opportunities available for established stylists with existing clientele. Our salon offers prime location, luxurious atmosphere, free WiFi, complimentary refreshments for clients, and marketing support. Flexible rental terms with weekly or monthly options."
      },
      {
        id: "hair-4",
        title: "Entry Level Stylist",
        description: "Busy salon seeking newly licensed hair stylists ready to start their career! We offer a comprehensive training program, guaranteed hourly wage during training period, and opportunity to build your clientele with our established salon. Perfect for recent beauty school graduates looking to grow their skills."
      },
      {
        id: "hair-5",
        title: "Hair Salon Manager",
        description: "Established salon seeking experienced Hair Salon Manager to oversee daily operations. Responsibilities include staff management, scheduling, inventory control, client relations, and salon promotion. Must have 3+ years of salon management experience and strong leadership skills. Competitive salary plus bonuses based on salon performance."
      },
      {
        id: "hair-6",
        title: "Men's Haircut Specialist",
        description: "Modern salon specializing in men's grooming seeks skilled Hair Stylist with expertise in men's cuts, fades, beard trims, and styling. Experience with diverse hair types and current trends required. We offer commission-based pay, flexible scheduling, and training in premium men's grooming products and services."
      },
      {
        id: "hair-7",
        title: "Creative Hair Director",
        description: "High-end salon looking for Creative Hair Director to lead our styling team. Must have 7+ years experience, advanced training certifications, and demonstrated leadership ability. Responsibilities include training staff, maintaining service standards, and contributing to salon's creative direction. Exceptional compensation package for the right candidate."
      },
      {
        id: "hair-8",
        title: "Hair Stylist with Housing",
        description: "Family-owned salon seeking reliable Hair Stylists. We offer FREE HOUSING and stable weekly pay. Experience in haircuts, coloring, and styling required. Friendly work environment with established customer base. Great opportunity for stylists looking to relocate. Housing is conveniently located near salon and shopping centers."
      },
      {
        id: "hair-9",
        title: "Full Service Hair Stylist",
        description: "Busy full-service salon seeking experienced Hair Stylists. Must be proficient in women's and men's cuts, color services, highlights, balayage, blowouts, and special occasion styling. We offer competitive commission rates, product bonuses, and continued education opportunities. Join our collaborative team environment!"
      },
      {
        id: "hair-10",
        title: "Part-Time Hair Stylist",
        description: "Established salon seeking part-time Hair Stylist for evenings and weekends. Perfect for stylists looking for supplemental income or flexible hours. Must have experience with cuts, basic color, and styling. Commission-based pay with opportunity for permanent position. Friendly team and supportive management."
      }
    ]
  },
  {
    industry: "lashes",
    templates: [
      {
        id: "lashes-1",
        title: "Experienced Lash Technician",
        description: "We are seeking a skilled Lash Technician with at least 1 year of experience in classic and volume lash extensions. Must be certified and demonstrate excellent attention to detail. Our upscale salon offers competitive commission rates, flexible scheduling, and a loyal client base."
      },
      {
        id: "lashes-2",
        title: "Lash Artist - Full or Part Time",
        description: "Growing lash studio looking for certified Lash Artists for full or part-time positions. Experience with classic, hybrid, and volume sets required. We provide a clean, modern workspace, booking management, and marketing support. Commission-based compensation with retail bonus opportunities."
      },
      {
        id: "lashes-3",
        title: "Senior Lash Artist",
        description: "Luxury lash studio seeking Senior Lash Artist with 3+ years of experience in the industry. Must excel in classic, volume, mega volume, and lash lifts. Knowledge of lash trainings and ability to mentor junior staff is a plus. High-end clientele and exceptional earning potential."
      },
      {
        id: "lashes-4",
        title: "Lash Tech & Brow Specialist",
        description: "Boutique beauty studio hiring dual-certified Lash and Brow Specialist. Must be proficient in lash extensions, lash lifts, brow lamination, brow tinting, and shaping. Cross-trained professionals will earn higher commission rates. Established clientele and elegant workspace in prime location."
      },
      {
        id: "lashes-5",
        title: "Entry Level Lash Tech",
        description: "We're seeking newly certified Lash Technicians eager to grow their skills. Recent graduates welcome! We provide ongoing training and mentorship in classic lash applications with opportunity to advance to volume techniques. Perfect position to launch your lash career with supportive team."
      },
      {
        id: "lashes-6",
        title: "Lash Studio Manager",
        description: "Established lash studio seeking experienced Manager to oversee daily operations. Responsibilities include staff management, scheduling, inventory control, and ensuring exceptional customer service. Must have lash certification and management experience. Competitive salary plus commission on services performed."
      },
      {
        id: "lashes-7",
        title: "Lash Artist with Housing",
        description: "Family-owned beauty studio offering FREE HOUSING for qualified Lash Artists. Must be certified and experienced in classic and volume lash extensions. We provide stable weekly pay and friendly work environment. Great opportunity for lash artists looking to relocate. Housing located near studio and amenities."
      },
      {
        id: "lashes-8",
        title: "Mobile Lash Technician",
        description: "Luxury mobile lash service seeking experienced Lash Technicians for in-home appointments. Must have reliable transportation, portable lash kit, and 2+ years experience with excellent reviews. We provide booking, payment processing, and premium client base. Higher-than-average commission rates for quality work."
      },
      {
        id: "lashes-9",
        title: "Part-Time Evening Lash Artist",
        description: "Busy lash studio seeking Part-Time Evening Lash Artist for weekday evenings and occasional weekends. Perfect for lash techs looking for supplemental income. Must be certified in classic and volume techniques. Commission-based pay with flexible scheduling and established client base."
      },
      {
        id: "lashes-10",
        title: "Lash Artist with Growth Potential",
        description: "Expanding lash studio chain seeking talented Lash Artists for newest location. Experience with classic and volume sets required. We offer paid training on newest techniques, guaranteed base salary plus commission, and clear path to leadership roles. Join our team and grow with our company!"
      }
    ]
  },
  {
    industry: "barber",
    templates: [
      {
        id: "barber-1",
        title: "Experienced Barber",
        description: "Modern barbershop seeking skilled Barbers with 2+ years experience. Must excel in fades, tapers, beard grooming, and traditional cuts. Knowledge of current men's styling trends required. We offer commission-based pay, flexible scheduling, and a collaborative team environment."
      },
      {
        id: "barber-2",
        title: "Master Barber",
        description: "Upscale barbershop looking for Master Barber with 5+ years experience. Expertise required in precision fades, razor work, beard sculpting, and hot towel shaves. Strong client communication and ability to deliver consistent, high-quality service essential. Top commission rates for the right candidate."
      },
      {
        id: "barber-3",
        title: "Barber Chair Rental",
        description: "Established barbershop has chair rental opportunities available for licensed barbers with existing clientele. Our shop offers prime location, modern equipment, free WiFi, complimentary beverages for clients, and social media exposure. Flexible rental terms with weekly or monthly options."
      },
      {
        id: "barber-4",
        title: "Apprentice Barber",
        description: "Busy barbershop seeking motivated Apprentice Barber ready to learn and grow. We offer paid training under experienced master barbers, guaranteed hourly wage during training period, and opportunity to build your clientele. Perfect for recently licensed barbers looking to refine their craft."
      },
      {
        id: "barber-5",
        title: "Barbershop Manager",
        description: "Growing barbershop chain seeking experienced Barbershop Manager. Responsibilities include staff supervision, scheduling, inventory management, and maintaining exceptional service standards. Must have barber license and previous management experience. Competitive salary plus commission on services."
      },
      {
        id: "barber-6",
        title: "Female Barber Specialist",
        description: "Progressive barbershop seeking Female Barber skilled in men's cuts, fades, and grooming services. We value diversity in our team and clientele. Must have barber license and portfolio demonstrating technical precision. Commission-based compensation with guaranteed minimum during initial period."
      },
      {
        id: "barber-7",
        title: "Barber with Housing Provided",
        description: "Family-owned barbershop offering FREE HOUSING for qualified Barbers. Must be licensed with experience in current men's cutting techniques. We provide stable weekly pay and friendly work environment. Great opportunity for barbers looking to relocate. Housing located close to shop and amenities."
      },
      {
        id: "barber-8",
        title: "Part-Time Weekend Barber",
        description: "Busy barbershop seeking Part-Time Weekend Barber for Friday-Sunday shifts. Perfect for barbers looking for supplemental income or flexible schedule. Must be experienced in all standard barbering services. Commission-based pay with opportunity for permanent position."
      },
      {
        id: "barber-9",
        title: "Barber/Stylist Combo",
        description: "Full-service salon and barbershop seeking versatile professionals skilled in both men's and women's hair services. Must be proficient in barbering techniques (fades, tapers, beard work) and styling services. Dual-licensed professionals preferred. Higher commission rates for cross-trained stylists."
      },
      {
        id: "barber-10",
        title: "Celebrity Barber",
        description: "High-end barbershop catering to professional athletes and executives seeking experienced Barber with exceptional skills. Must have 7+ years experience, outstanding portfolio, and ability to provide VIP service. Expertise in precision fades, beard sculpting, and hair design required. Top compensation for elite barber."
      }
    ]
  },
  {
    industry: "skincare",
    templates: [
      {
        id: "skincare-1",
        title: "Licensed Esthetician",
        description: "Upscale spa seeking Licensed Esthetician with 2+ years experience in facials, chemical peels, and customized skin treatments. Knowledge of premium skincare lines required. We offer competitive commission, product bonuses, and continuing education opportunities. Join our team of skin care professionals!"
      },
      {
        id: "skincare-2",
        title: "Medical Esthetician",
        description: "Medical spa seeking experienced Medical Esthetician to perform advanced skincare treatments. Must be licensed with experience in microdermabrasion, chemical peels, laser treatments, and medical-grade facials. Knowledge of pre/post-procedure protocols essential. Competitive salary plus commission structure."
      },
      {
        id: "skincare-3",
        title: "Esthetician - Waxing Specialist",
        description: "Busy waxing studio seeking Licensed Esthetician with expertise in full-body waxing services including Brazilian waxing. Must be efficient, detail-oriented, and comfortable with intimate waxing procedures. We offer guaranteed hourly rate plus commission and tips. Full and part-time positions available."
      },
      {
        id: "skincare-4",
        title: "Spa Manager/Esthetician",
        description: "Luxury day spa seeking experienced Spa Manager with esthetician license. Responsibilities include staff management, scheduling, inventory control, and performing skincare services. Must have 3+ years of spa management experience. Competitive salary plus service and retail commissions."
      },
      {
        id: "skincare-5",
        title: "Entry Level Esthetician",
        description: "Established spa seeking newly licensed Estheticians eager to grow their skills. We provide comprehensive training program, guaranteed base pay during training period, and opportunity to build clientele. Perfect for recent graduates looking to launch their esthetics career with supportive team."
      },
      {
        id: "skincare-6",
        title: "Esthetician/Makeup Artist",
        description: "Full-service beauty studio seeking dual-skilled professional with expertise in skincare and makeup application. Must be licensed esthetician with makeup artistry experience for special events, bridal, and photoshoots. Higher commission rates for professionals with dual specialties."
      },
      {
        id: "skincare-7",
        title: "Esthetician with Housing",
        description: "Family-owned spa offering FREE HOUSING for qualified Estheticians. Must be licensed with experience in facials, waxing, and body treatments. We provide stable weekly pay and friendly work environment. Great opportunity for skincare professionals looking to relocate. Housing near spa and amenities."
      },
      {
        id: "skincare-8",
        title: "Part-Time Evening Esthetician",
        description: "Busy medspa seeking Part-Time Evening Esthetician for weekday evenings and occasional weekends. Perfect for licensed professionals looking for supplemental income. Experience with chemical peels and microdermabrasion preferred. Commission-based pay with established client base."
      },
      {
        id: "skincare-9",
        title: "Holistic Esthetician",
        description: "Wellness-focused spa seeking Holistic Esthetician with knowledge of natural skincare, facial massage techniques, and non-invasive anti-aging treatments. Must be licensed with experience in organic product lines. We emphasize whole-body wellness approach to skincare. Commission-based compensation with retail incentives."
      },
      {
        id: "skincare-10",
        title: "Mobile Esthetician",
        description: "Luxury mobile spa service seeking experienced Estheticians for in-home appointments. Must have reliable transportation, portable equipment, and 2+ years experience with excellent reviews. We provide booking, payment processing, and premium client base. Higher-than-average commission rates."
      }
    ]
  },
  {
    industry: "microblading",
    templates: [
      {
        id: "microblading-1",
        title: "Certified Microblading Artist",
        description: "Upscale beauty studio seeking experienced Microblading Artist with certification and portfolio demonstrating exceptional technique. Must have 1+ years experience and knowledge of color theory, facial morphology, and proper sterilization procedures. Commission-based compensation with high earning potential."
      },
      {
        id: "microblading-2",
        title: "Permanent Makeup Artist",
        description: "Established medical spa looking for skilled Permanent Makeup Artist proficient in microblading, powder brows, lip blush, and eyeliner. Must have certification and minimum 2 years experience. Portfolio review required. We offer competitive commission rates and a luxury workspace with high-end clientele."
      },
      {
        id: "microblading-3",
        title: "PMU Artist - Booth Rental",
        description: "Premium beauty studio has booth rental opportunity for established Permanent Makeup Artist with existing clientele. Our space offers private treatment room, sterilization equipment, comfortable waiting area, and marketing support. Flexible rental terms for the right professional."
      },
      {
        id: "microblading-4",
        title: "Brow and Lash Specialist",
        description: "Full-service beauty bar seeking dual-certified professional experienced in microblading/powder brows AND lash extensions. Must have certification in both specialties and strong portfolio. Higher commission rates for artists with combined skill set. Established clientele and elegant workspace."
      },
      {
        id: "microblading-5",
        title: "Apprentice PMU Artist",
        description: "Busy permanent makeup studio seeking Apprentice PMU Artist to train under master artists. Must have esthetics or cosmetology license and demonstrate natural artistic ability. Paid training program with opportunity to advance to independent artist position. Perfect for beauty professionals looking to specialize."
      },
      {
        id: "microblading-6",
        title: "Microblading Studio Manager",
        description: "Growing permanent makeup studio seeking experienced Manager with PMU certification. Responsibilities include staff supervision, scheduling, inventory management, and maintaining exceptional service standards. Must have microblading experience and previous management experience. Competitive salary plus commission."
      },
      {
        id: "microblading-7",
        title: "PMU Artist with Housing",
        description: "Established PMU studio offering FREE HOUSING for qualified Permanent Makeup Artist. Must be certified with experience in microblading and powder brows. We provide stable pay structure and supportive work environment. Excellent opportunity for artists looking to relocate. Housing near studio and amenities."
      },
      {
        id: "microblading-8",
        title: "Part-Time Microblading Artist",
        description: "Luxury spa seeking Part-Time Microblading Artist for 2-3 days per week. Perfect for PMU artists looking for supplemental income with flexible schedule. Must be certified with minimum 1 year experience and strong portfolio. Commission-based pay with established client base."
      },
      {
        id: "microblading-9",
        title: "Microblading and Tattoo Removal Specialist",
        description: "Medical spa seeking dual-skilled professional with expertise in both microblading application AND correction/removal of botched microblading/permanent makeup. Experience with laser or saline removal required. Higher compensation for technicians with these specialized skills."
      },
      {
        id: "microblading-10",
        title: "Advanced PMU Artist - 3D Techniques",
        description: "High-end permanent makeup studio seeking advanced PMU Artist specialized in 3D techniques, scar camouflage, and areola restoration. Must have 3+ years experience and advanced certifications. Portfolio must demonstrate mastery of realistic hairstrokes and restorative work. Premium compensation for specialized skills."
      }
    ]
  },
  {
    industry: "makeup",
    templates: [
      {
        id: "makeup-1",
        title: "Professional Makeup Artist",
        description: "Busy beauty studio seeking talented Makeup Artist with experience in bridal, special event, and photoshoot makeup. Must have professional kit with high-quality products and portfolio demonstrating versatile makeup styles. Commission-based pay structure with booking bonuses."
      },
      {
        id: "makeup-2",
        title: "Senior Makeup Artist/Instructor",
        description: "Prestigious makeup academy looking for Senior Makeup Artist to perform client services and teach classes. Must have 5+ years professional experience and teaching ability. Knowledge of current trends, diverse skin tones, and photography makeup required. Competitive salary plus class bonuses."
      },
      {
        id: "makeup-3",
        title: "Bridal Makeup Specialist",
        description: "Established bridal beauty company seeking experienced Makeup Artist specialized in wedding services. Must excel in long-lasting makeup application, false lash application, and creating timeless bridal looks. Experience with diverse skin tones and lighting conditions essential. Commission plus gratuity for on-location services."
      },
      {
        id: "makeup-4",
        title: "Makeup Artist/Beauty Advisor",
        description: "Luxury cosmetics retailer seeking professional Makeup Artist to perform application services and product consultations. Must have expertise in color matching, skincare knowledge, and ability to build client relationships. Base hourly wage plus commission on services and product sales."
      },
      {
        id: "makeup-5",
        title: "Special FX Makeup Artist",
        description: "Entertainment production company seeking Special FX Makeup Artist with experience in prosthetics, aging techniques, and character transformation. Must have portfolio demonstrating creative and technical skills. Project-based compensation with potential for ongoing relationship."
      },
      {
        id: "makeup-6",
        title: "Makeup Artist/Esthetician",
        description: "Full-service spa seeking dual-licensed professional skilled in both makeup artistry and esthetics services. Must be capable of performing facials, skin treatments, and makeup application for special events. Higher commission rates for professionals with dual specialties."
      },
      {
        id: "makeup-7",
        title: "Freelance Makeup Artist",
        description: "Beauty agency seeking to expand our team of freelance Makeup Artists for weddings, photoshoots, and special events. Must have reliable transportation, professional kit, and flexible availability including weekends. Commission-based pay structure with travel fees and gratuities."
      },
      {
        id: "makeup-8",
        title: "Makeup Artist with Social Media Skills",
        description: "Modern beauty studio seeking Makeup Artist with strong social media presence and content creation abilities. Must be talented in application techniques AND skilled in creating engaging beauty content. We offer commission on services plus bonus structure for content that drives business."
      },
      {
        id: "makeup-9",
        title: "Part-Time Weekend Makeup Artist",
        description: "Busy beauty bar seeking Part-Time Makeup Artist for weekend appointments focusing on special events and bridal parties. Must have experience with false lash application and long-lasting makeup techniques. Commission-based pay with established clientele."
      },
      {
        id: "makeup-10",
        title: "Celebrity Makeup Artist",
        description: "High-profile beauty agency seeking experienced Makeup Artist for celebrity and executive clients. Must have 5+ years professional experience, exceptional portfolio, and ability to work under pressure. Expertise in HD-ready makeup, diverse skin tones, and current trends essential. Premium compensation for elite artists."
      }
    ]
  },
  {
    industry: "other",
    templates: [
      {
        id: "other-1",
        title: "Experienced Beauty Professional",
        description: "Growing salon seeking experienced Beauty Professional to join our team. We're looking for talented individuals with a proven track record in the beauty industry. Must have excellent customer service skills and ability to build client relationships. Commission-based compensation with opportunity for growth."
      },
      {
        id: "other-2",
        title: "Salon Manager",
        description: "Established salon seeking experienced Salon Manager to oversee daily operations. Responsibilities include staff management, scheduling, inventory control, and ensuring exceptional customer service. Must have beauty industry background and previous management experience. Competitive salary plus service and retail incentives."
      },
      {
        id: "other-3",
        title: "Booth Rental Opportunity",
        description: "Modern, well-appointed salon has booth rental opportunities for established beauty professionals with existing clientele. Our space offers prime location, upscale atmosphere, free WiFi, retail commission opportunities, and marketing support. Flexible rental terms with weekly or monthly options."
      },
      {
        id: "other-4",
        title: "Beauty School Instructor",
        description: "Accredited beauty school seeking licensed instructor with industry experience to teach practical and theoretical classes. Must have excellent communication skills and passion for education. Knowledge of state board requirements and curriculum development preferred. Full-time position with benefits."
      },
      {
        id: "other-5",
        title: "Salon Receptionist/Coordinator",
        description: "Busy salon seeking friendly, organized Salon Coordinator to manage front desk operations. Responsibilities include client scheduling, retail sales, check-in/check-out process, and maintaining organized salon environment. Must have excellent customer service skills and multitasking ability. Hourly wage plus retail commission."
      },
      {
        id: "other-6",
        title: "Beauty Supply Sales Representative",
        description: "Leading beauty supply distributor seeking Sales Representative to service salon accounts. Must have beauty industry knowledge, reliable transportation, and strong interpersonal skills. Responsibilities include account management, product education, and meeting sales targets. Base salary plus commission structure."
      },
      {
        id: "other-7",
        title: "Beauty Professional with Housing",
        description: "Family-owned salon offering FREE HOUSING for qualified Beauty Professionals. We provide stable weekly pay and friendly work environment. Great opportunity for beauty specialists looking to relocate. Housing located near salon and amenities. Join our team and enjoy a supportive work culture!"
      },
      {
        id: "other-8",
        title: "Salon Suite Owner Opportunity",
        description: "Upscale salon suite complex seeking beauty professionals ready for business ownership without traditional overhead. We offer private, fully-equipped luxury suites with 24/7 access, utilities included, free WiFi, security system, and shared amenities. Perfect for established professionals ready for independence."
      },
      {
        id: "other-9",
        title: "Massage Therapist",
        description: "Wellness-focused spa seeking Licensed Massage Therapist with expertise in Swedish, deep tissue, and therapeutic massage techniques. Must have current license and minimum 1 year experience. We offer dedicated treatment rooms, booking management, and laundry service. Commission-based pay plus gratuities."
      },
      {
        id: "other-10",
        title: "Beauty Brand Educator",
        description: "Premium beauty brand seeking experienced Educator to train salon professionals on product lines and techniques. Must have beauty industry background, teaching ability, and willingness to travel regionally. Knowledge of adult learning principles and presentation skills required. Salary plus commission and travel expenses."
      }
    ]
  }
];
