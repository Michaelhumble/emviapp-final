
import { IndustryType } from './jobFormSchema';

export type JobTemplate = {
  id: string;
  title: string;
  industry: IndustryType;
  location: string;
  summary: string;
  description: string[];
  vietnameseTitle?: string;
  vietnameseDescription?: string[];
  vietnameseSummary?: string;
  requirements: string[];
  vietnameseRequirements?: string[];
  salary_range: string;
  experience_level: 'entry' | 'intermediate' | 'experienced' | 'senior';
  employment_type: 'full-time' | 'part-time' | 'contract' | 'temporary' | 'commission';
  popularity: 'most-hired' | 'fastest-applicants' | 'trusted' | 'trending';
  specialties: string[];
  benefits: string[];
  vietnameseBenefits?: string[];
  trustSignals: string[];
  urgencyFactor: number; // 1-10 scale
  contactPreferences: string[];
};

export type JobTemplatesByIndustry = {
  [key in IndustryType]: JobTemplate[];
};

export const jobTemplatesByIndustry: JobTemplatesByIndustry = {
  'nails': [
    {
      id: 'nail-tech-full-time-1',
      title: 'Experienced Nail Technician - High Income + Tips',
      vietnameseTitle: 'Thợ Nail Có Kinh Nghiệm - Thu Nhập Cao + Tips',
      industry: 'nails',
      location: 'Dallas, TX',
      summary: 'Join our busy salon with guaranteed $1,100-1,400/week + tips. Housing available for out-of-state technicians.',
      vietnameseSummary: 'Tham gia tiệm salon đông khách với thu nhập đảm bảo $1,100-1,400/tuần + tips. Có nhà ở cho thợ từ tiểu bang khác.',
      description: [
        'Our busy salon is looking for experienced nail technicians to join our team immediately.',
        'We offer a guaranteed weekly income of $1,100-1,400 plus tips in a clean, modern salon environment.',
        'Housing assistance is available for qualified technicians relocating from other states.',
        'We have a large, loyal client base and consistent walk-in traffic ensuring you\'ll stay busy.'
      ],
      vietnameseDescription: [
        'Tiệm salon đông khách của chúng tôi đang tìm kiếm thợ nail có kinh nghiệm để tham gia ngay.',
        'Chúng tôi đảm bảo thu nhập hàng tuần từ $1,100-1,400 cộng với tips trong môi trường salon sạch sẽ, hiện đại.',
        'Có hỗ trợ chỗ ở cho thợ đủ tiêu chuẩn từ các tiểu bang khác.',
        'Chúng tôi có lượng khách hàng thân thiết lớn và lượng khách vãng lai đều đặn đảm bảo bạn sẽ luôn bận rộn.'
      ],
      requirements: ['2+ years experience', 'Acrylic and gel skills', 'Valid nail license', 'Good English communication'],
      vietnameseRequirements: ['2+ năm kinh nghiệm', 'Kỹ năng làm bột và gel', 'Bằng nail hợp lệ', 'Giao tiếp tiếng Anh tốt'],
      salary_range: '$1,100-1,400/week + tips',
      experience_level: 'experienced',
      employment_type: 'full-time',
      popularity: 'most-hired',
      specialties: ['Acrylic', 'Gel', 'Pedicure', 'Nail Art'],
      benefits: ['Weekly Pay', 'Housing Available', 'Busy Location', 'Modern Equipment'],
      vietnameseBenefits: ['Trả Lương Hàng Tuần', 'Có Chỗ Ở', 'Vị Trí Đông Khách', 'Thiết Bị Hiện Đại'],
      trustSignals: ['15 years in business', '4.8/5 rating on Google (180+ reviews)', 'Featured in local magazine'],
      urgencyFactor: 9,
      contactPreferences: ['Call/Text', 'Email', 'Zalo']
    },
    {
      id: 'nail-tech-commission-2',
      title: 'Nail Technician - High Commission (70/30)',
      vietnameseTitle: 'Thợ Nail - Hoa Hồng Cao (70/30)',
      industry: 'nails',
      location: 'Houston, TX',
      summary: 'Earn 70% commission in our luxury salon. All supplies provided. $1,200-1,800/week potential.',
      vietnameseSummary: 'Nhận 70% hoa hồng tại tiệm sang trọng của chúng tôi. Được cung cấp đầy đủ dụng cụ. Thu nhập tiềm năng $1,200-1,800/tuần.',
      description: [
        'Join our upscale nail salon and earn 70% commission with potential earnings of $1,200-1,800 per week.',
        'We provide all supplies and equipment in our luxury salon environment.',
        'Located in a high-end shopping center with consistent clientele and strong booking system.',
        'Opportunities for advancement and booth rental for top performers.'
      ],
      vietnameseDescription: [
        'Tham gia tiệm nail cao cấp của chúng tôi và nhận 70% hoa hồng với khả năng thu nhập $1,200-1,800 mỗi tuần.',
        'Chúng tôi cung cấp tất cả vật tư và thiết bị trong môi trường salon sang trọng.',
        'Tọa lạc trong trung tâm mua sắm cao cấp với khách hàng ổn định và hệ thống đặt lịch hiệu quả.',
        'Cơ hội thăng tiến và thuê booth cho những người làm việc xuất sắc.'
      ],
      requirements: ['1+ year experience', 'Professional appearance', 'Customer service focused', 'Valid nail license'],
      vietnameseRequirements: ['1+ năm kinh nghiệm', 'Ngoại hình chuyên nghiệp', 'Tập trung vào dịch vụ khách hàng', 'Bằng nail hợp lệ'],
      salary_range: '70% commission ($1,200-1,800/week potential)',
      experience_level: 'intermediate',
      employment_type: 'commission',
      popularity: 'fastest-applicants',
      specialties: ['Luxury Manicures', 'Gel-X', 'Premium Pedicures', 'Nail Art'],
      benefits: ['High Commission Rate', 'All Supplies Provided', 'Upscale Location', 'Growth Opportunities'],
      vietnameseBenefits: ['Tỷ Lệ Hoa Hồng Cao', 'Cung Cấp Đầy Đủ Vật Tư', 'Vị Trí Cao Cấp', 'Cơ Hội Phát Triển'],
      trustSignals: ['Established 2018', 'Featured in Houston Style Magazine', 'Owner is former TV personality'],
      urgencyFactor: 7,
      contactPreferences: ['Call', 'Email', 'Instagram DM']
    },
    {
      id: 'nail-tech-new-salon-3',
      title: 'Nail Technicians for Brand New Luxury Salon - $1,000 Signing Bonus',
      vietnameseTitle: 'Thợ Nail cho Tiệm Sang Trọng Mới Khai Trương - Thưởng Ký Hợp Đồng $1,000',
      industry: 'nails',
      location: 'Atlanta, GA',
      summary: 'New luxury salon opening next month. $1,000 signing bonus. Weekly pay guaranteed. Premium clientele.',
      vietnameseSummary: 'Tiệm sang trọng mới sẽ khai trương vào tháng tới. Thưởng ký hợp đồng $1,000. Đảm bảo lương hàng tuần. Khách hàng cao cấp.',
      description: [
        'Be part of our brand new luxury nail salon opening next month in upscale Buckhead neighborhood.',
        'We\'re offering a $1,000 signing bonus for experienced technicians who join our team before opening day.',
        'Guaranteed weekly pay ($1,100-1,600) plus tips in a modern, Instagram-worthy salon environment.',
        'State-of-the-art ventilation system, premium products, and focus on healthy nail techniques.'
      ],
      vietnameseDescription: [
        'Trở thành một phần của tiệm nail sang trọng mới của chúng tôi sẽ khai trương vào tháng tới tại khu phố cao cấp Buckhead.',
        'Chúng tôi đang cung cấp thưởng ký hợp đồng $1,000 cho thợ có kinh nghiệm tham gia đội ngũ của chúng tôi trước ngày khai trương.',
        'Đảm bảo lương hàng tuần ($1,100-1,600) cộng thêm tips trong môi trường salon hiện đại, xứng đáng với Instagram.',
        'Hệ thống thông gió hiện đại, sản phẩm cao cấp, và tập trung vào kỹ thuật làm móng lành mạnh.'
      ],
      requirements: ['2+ years experience', 'Full nail service skills', 'Professional demeanor', 'Valid nail license'],
      vietnameseRequirements: ['2+ năm kinh nghiệm', 'Kỹ năng dịch vụ nail đầy đủ', 'Phong thái chuyên nghiệp', 'Bằng nail hợp lệ'],
      salary_range: '$1,100-1,600/week + tips',
      experience_level: 'experienced',
      employment_type: 'full-time',
      popularity: 'trending',
      specialties: ['Luxury Services', 'Japanese Gel', 'Russian Manicure', 'Nail Art'],
      benefits: ['$1,000 Signing Bonus', 'Weekly Pay', 'Modern Salon', 'Premium Clientele'],
      vietnameseBenefits: ['Thưởng Ký Hợp Đồng $1,000', 'Lương Hàng Tuần', 'Salon Hiện Đại', 'Khách Hàng Cao Cấp'],
      trustSignals: ['Owner has 4 other successful locations', 'Featured in Nail Pro Magazine', 'Advanced training provided'],
      urgencyFactor: 10,
      contactPreferences: ['Call/Text', 'Email', 'Website Application']
    }
  ],
  'hair': [
    {
      id: 'hair-stylist-1',
      title: 'Top Hair Stylist - $1,500-2,200/week - Flexible Schedule',
      vietnameseTitle: 'Thợ Tóc Hàng Đầu - $1,500-2,200/tuần - Lịch Linh Hoạt',
      industry: 'hair',
      location: 'Los Angeles, CA',
      summary: 'Join our celebrity-visited salon in Beverly Hills. Earn $1,500-2,200/week with flexible scheduling and housing assistance.',
      vietnameseSummary: 'Tham gia tiệm salon được người nổi tiếng ghé thăm tại Beverly Hills. Thu nhập $1,500-2,200/tuần với lịch làm việc linh hoạt và hỗ trợ nhà ở.',
      description: [
        'Our Beverly Hills salon is seeking top hair stylists to join our elite team serving celebrity and high-end clientele.',
        'Earn $1,500-2,200 weekly with our guaranteed pay structure plus tips and retail commission.',
        'Enjoy flexible scheduling options and a collaborative team environment focused on creativity and excellence.',
        'Housing assistance available for qualified stylists relocating to Los Angeles.'
      ],
      vietnameseDescription: [
        'Salon Beverly Hills của chúng tôi đang tìm kiếm thợ tóc hàng đầu để tham gia vào đội ngũ ưu tú phục vụ người nổi tiếng và khách hàng cao cấp.',
        'Thu nhập $1,500-2,200 hàng tuần với cơ cấu lương đảm bảo của chúng tôi cộng thêm tips và hoa hồng bán lẻ.',
        'Tận hưởng các tùy chọn lịch làm việc linh hoạt và môi trường làm việc hợp tác tập trung vào sáng tạo và xuất sắc.',
        'Hỗ trợ nhà ở cho các thợ đủ điều kiện chuyển đến Los Angeles.'
      ],
      requirements: ['3+ years salon experience', 'Strong cutting and color skills', 'Professional portfolio', 'Valid cosmetology license'],
      vietnameseRequirements: ['3+ năm kinh nghiệm salon', 'Kỹ năng cắt và nhuộm mạnh', 'Portfolio chuyên nghiệp', 'Bằng thẩm mỹ hợp lệ'],
      salary_range: '$1,500-2,200/week + tips',
      experience_level: 'senior',
      employment_type: 'full-time',
      popularity: 'trusted',
      specialties: ['Precision Cutting', 'Color Correction', 'Extensions', 'Bridal Styling'],
      benefits: ['Flexible Schedule', 'Housing Assistance', 'Celebrity Clientele', 'Continuing Education'],
      vietnameseBenefits: ['Lịch Linh Hoạt', 'Hỗ Trợ Nhà Ở', 'Khách Hàng Nổi Tiếng', 'Đào Tạo Liên Tục'],
      trustSignals: ['Celebrity endorsed', 'Featured in Vogue', '4.9/5 stars on Yelp (200+ reviews)'],
      urgencyFactor: 8,
      contactPreferences: ['Call', 'Email', 'Portfolio Review']
    }
  ],
  'lashes': [
    {
      id: 'lash-tech-1',
      title: 'Lash Artist - $1,300-1,800/week - Training Available',
      vietnameseTitle: 'Nghệ Sĩ Mi - $1,300-1,800/tuần - Có Đào Tạo',
      industry: 'lashes',
      location: 'Miami, FL',
      summary: 'Popular lash studio in Miami Beach seeking skilled lash artists. $1,300-1,800/week potential. Advanced training program.',
      vietnameseSummary: 'Studio mi phổ biến tại Miami Beach đang tìm kiếm nghệ sĩ mi có kỹ năng. Thu nhập tiềm năng $1,300-1,800/tuần. Chương trình đào tạo nâng cao.',
      description: [
        'Join our high-end lash studio in the heart of Miami Beach serving a diverse, upscale clientele.',
        'Earn between $1,300-1,800 weekly through our competitive pay structure and generous gratuity system.',
        'Get access to our advanced training program to perfect your techniques in volume, mega volume, and specialized lash styles.',
        'Flexible scheduling available with full-time and part-time positions open.'
      ],
      vietnameseDescription: [
        'Tham gia studio mi cao cấp của chúng tôi tại trung tâm Miami Beach phục vụ khách hàng đa dạng, cao cấp.',
        'Thu nhập từ $1,300-1,800 hàng tuần thông qua cơ cấu lương cạnh tranh và hệ thống tiền boa hào phóng của chúng tôi.',
        'Được tiếp cận chương trình đào tạo nâng cao để hoàn thiện kỹ thuật volume, mega volume và các kiểu mi chuyên biệt.',
        'Có lịch làm việc linh hoạt với các vị trí toàn thời gian và bán thời gian.'
      ],
      requirements: ['Lash certification', '1+ year experience preferred', 'Portfolio of work', 'Excellent attention to detail'],
      vietnameseRequirements: ['Chứng nhận mi', 'Ưu tiên 1+ năm kinh nghiệm', 'Portfolio công việc', 'Chú ý đến chi tiết xuất sắc'],
      salary_range: '$1,300-1,800/week',
      experience_level: 'intermediate',
      employment_type: 'full-time',
      popularity: 'fastest-applicants',
      specialties: ['Classic Lashes', 'Volume', 'Mega Volume', 'Lash Lifts'],
      benefits: ['Advanced Training', 'Flexible Schedule', 'Product Discounts', 'Career Growth'],
      vietnameseBenefits: ['Đào Tạo Nâng Cao', 'Lịch Linh Hoạt', 'Giảm Giá Sản Phẩm', 'Phát Triển Nghề Nghiệp'],
      trustSignals: ['Miami\'s #1 rated lash studio', 'Certified trainers on staff', 'Celebrity clients'],
      urgencyFactor: 7,
      contactPreferences: ['Text', 'Instagram DM', 'Email']
    }
  ],
  'massage': [
    {
      id: 'massage-therapist-1',
      title: 'Licensed Massage Therapist - $1,400-2,000/week',
      vietnameseTitle: 'Chuyên Viên Massage Có Bằng - $1,400-2,000/tuần',
      industry: 'massage',
      location: 'Chicago, IL',
      summary: 'Upscale day spa seeking licensed massage therapists. $1,400-2,000/week including tips. Benefits package included.',
      vietnameseSummary: 'Spa cao cấp đang tìm kiếm chuyên viên massage có bằng. $1,400-2,000/tuần bao gồm tips. Gói phúc lợi đi kèm.',
      description: [
        'Our award-winning day spa in downtown Chicago is seeking licensed massage therapists to join our busy team.',
        'Earn $1,400-2,000 weekly including base pay, commission, and generous tips from our loyal clientele.',
        'Comprehensive benefits package including health insurance, PTO, and continuing education allowance.',
        'State-of-the-art facilities, premium products, and a supportive team environment.'
      ],
      vietnameseDescription: [
        'Spa đã đạt giải thưởng của chúng tôi ở trung tâm Chicago đang tìm kiếm chuyên viên massage có bằng để tham gia vào đội ngũ bận rộn của chúng tôi.',
        'Thu nhập $1,400-2,000 hàng tuần bao gồm lương cơ bản, hoa hồng và tips hào phóng từ khách hàng thân thiết.',
        'Gói phúc lợi toàn diện bao gồm bảo hiểm y tế, nghỉ phép có lương và trợ cấp đào tạo liên tục.',
        'Cơ sở vật chất hiện đại, sản phẩm cao cấp và môi trường làm việc hỗ trợ.'
      ],
      requirements: ['Valid massage license', '600+ hours training', 'Experience with various modalities', 'Customer service oriented'],
      vietnameseRequirements: ['Bằng massage hợp lệ', '600+ giờ đào tạo', 'Kinh nghiệm với nhiều phương pháp', 'Định hướng dịch vụ khách hàng'],
      salary_range: '$1,400-2,000/week',
      experience_level: 'experienced',
      employment_type: 'full-time',
      popularity: 'most-hired',
      specialties: ['Deep Tissue', 'Swedish', 'Hot Stone', 'Sports Massage'],
      benefits: ['Health Insurance', 'PTO', 'Education Allowance', 'Product Discounts'],
      vietnameseBenefits: ['Bảo Hiểm Y Tế', 'Nghỉ Phép Có Lương', 'Trợ Cấp Đào Tạo', 'Giảm Giá Sản Phẩm'],
      trustSignals: ['Winner of Chicago\'s Best Day Spa 2023', 'Featured on WGN Chicago', '4.8/5 stars (300+ Google reviews)'],
      urgencyFactor: 8,
      contactPreferences: ['Email', 'Call', 'Online Application']
    }
  ],
  'brows': [
    {
      id: 'brow-artist-1',
      title: 'Microblading & Brow Artist - $1,200-1,700/week',
      vietnameseTitle: 'Nghệ Sĩ Phun Xăm & Lông Mày - $1,200-1,700/tuần',
      industry: 'brows',
      location: 'New York, NY',
      summary: 'Manhattan boutique seeking skilled brow artists. $1,200-1,700/week. Specializing in microblading and ombré powder.',
      vietnameseSummary: 'Cửa hàng boutique Manhattan đang tìm kiếm nghệ sĩ lông mày có kỹ năng. $1,200-1,700/tuần. Chuyên về phun mày và ombré powder.',
      description: [
        'Our boutique brow studio in SoHo Manhattan seeks experienced brow artists with microblading and powder ombré expertise.',
        'Earn $1,200-1,700 weekly with guaranteed base pay plus percentage on services and retail.',
        'Premium location with high-end clientele and excellent walk-in traffic.',
        'Opportunities for advanced training in latest brow techniques and pigmentation methods.'
      ],
      vietnameseDescription: [
        'Studio lông mày boutique của chúng tôi tại SoHo Manhattan đang tìm kiếm nghệ sĩ lông mày có kinh nghiệm với chuyên môn về phun mày và ombré powder.',
        'Thu nhập $1,200-1,700 hàng tuần với lương cơ bản đảm bảo cộng thêm phần trăm trên dịch vụ và bán lẻ.',
        'Vị trí cao cấp với khách hàng cao cấp và lưu lượng khách vào cửa hàng tuyệt vời.',
        'Cơ hội đào tạo nâng cao về các kỹ thuật lông mày mới nhất và các phương pháp sắc tố.'
      ],
      requirements: ['Microblading certification', 'Portfolio of work', 'Blood Borne Pathogen certification', '1+ year experience'],
      vietnameseRequirements: ['Chứng nhận phun mày', 'Portfolio công việc', 'Chứng nhận Blood Borne Pathogen', '1+ năm kinh nghiệm'],
      salary_range: '$1,200-1,700/week',
      experience_level: 'experienced',
      employment_type: 'full-time',
      popularity: 'trending',
      specialties: ['Microblading', 'Ombré Powder', 'Tinting', 'Mapping'],
      benefits: ['Product Discounts', 'Advanced Training', 'Premium Location', 'Marketing Support'],
      vietnameseBenefits: ['Giảm Giá Sản Phẩm', 'Đào Tạo Nâng Cao', 'Vị Trí Cao Cấp', 'Hỗ Trợ Tiếp Thị'],
      trustSignals: ['As seen in Vogue', 'Celebrity clientele', 'Influencer partnerships'],
      urgencyFactor: 9,
      contactPreferences: ['Email', 'Portfolio Review', 'Instagram DM']
    }
  ],
  'skincare': [
    {
      id: 'esthetician-1',
      title: 'Licensed Esthetician - $1,200-1,800/week + Benefits',
      vietnameseTitle: 'Chuyên Viên Thẩm Mỹ Da Có Bằng - $1,200-1,800/tuần + Phúc Lợi',
      industry: 'skincare',
      location: 'Seattle, WA',
      summary: 'Medical spa seeking skilled estheticians. $1,200-1,800/week. Full benefits package. Advanced treatments training.',
      vietnameseSummary: 'Medical spa đang tìm kiếm chuyên viên thẩm mỹ da có kỹ năng. $1,200-1,800/tuần. Gói phúc lợi đầy đủ. Đào tạo điều trị nâng cao.',
      description: [
        'Our physician-owned medical spa in Seattle is looking for licensed estheticians to perform advanced skincare treatments.',
        'Competitive compensation ranging from $1,200-1,800 weekly with full benefits package including healthcare.',
        'Gain experience with medical-grade treatments including lasers, microneedling, chemical peels, and more.',
        'Continuing education and certification opportunities in newest treatment technologies.'
      ],
      vietnameseDescription: [
        'Medical spa thuộc sở hữu của bác sĩ tại Seattle đang tìm kiếm chuyên viên thẩm mỹ da có bằng để thực hiện các điều trị chăm sóc da nâng cao.',
        'Thù lao cạnh tranh từ $1,200-1,800 hàng tuần với gói phúc lợi đầy đủ bao gồm chăm sóc sức khỏe.',
        'Tích lũy kinh nghiệm với các điều trị cấp y tế bao gồm laser, lăn kim, peel hóa học và nhiều hơn nữa.',
        'Cơ hội đào tạo liên tục và chứng nhận trong các công nghệ điều trị mới nhất.'
      ],
      requirements: ['Esthetics license', '2+ years experience preferred', 'Medical spa experience a plus', 'Excellent customer service skills'],
      vietnameseRequirements: ['Bằng thẩm mỹ da', 'Ưu tiên 2+ năm kinh nghiệm', 'Kinh nghiệm medical spa là một lợi thế', 'Kỹ năng dịch vụ khách hàng xuất sắc'],
      salary_range: '$1,200-1,800/week',
      experience_level: 'experienced',
      employment_type: 'full-time',
      popularity: 'trusted',
      specialties: ['Medical-Grade Facials', 'Laser Treatments', 'Microneedling', 'Chemical Peels'],
      benefits: ['Healthcare', '401k', 'Paid Training', 'Product Allowance'],
      vietnameseBenefits: ['Chăm Sóc Sức Khỏe', '401k', 'Đào Tạo Có Lương', 'Trợ Cấp Sản Phẩm'],
      trustSignals: ['Physician-owned & supervised', 'State-of-the-art technology', 'Award-winning spa'],
      urgencyFactor: 7,
      contactPreferences: ['Email Resume', 'Call', 'In-Person Interview']
    }
  ],
  'tattoo': [
    {
      id: 'tattoo-artist-1',
      title: 'Experienced Tattoo Artist - 70/30 Split',
      vietnameseTitle: 'Nghệ Sĩ Xăm Có Kinh Nghiệm - Chia 70/30',
      industry: 'tattoo',
      location: 'Portland, OR',
      summary: 'Popular tattoo studio seeking skilled artists. 70/30 split. $1,500-2,500/week potential. Private booth available.',
      vietnameseSummary: 'Studio xăm phổ biến đang tìm kiếm nghệ sĩ có kỹ năng. Chia 70/30. Thu nhập tiềm năng $1,500-2,500/tuần. Có booth riêng.',
      description: [
        'Join our well-established tattoo studio in downtown Portland with a loyal client base and strong social media presence.',
        'Earn a 70/30 split with potential weekly earnings of $1,500-2,500 depending on your client book.',
        'Private booth setup in a clean, modern studio environment with excellent foot traffic and online booking system.',
        'Freedom to develop your own style and brand with marketing support from our studio.'
      ],
      vietnameseDescription: [
        'Tham gia studio xăm có uy tín của chúng tôi ở trung tâm Portland với khách hàng thân thiết và sự hiện diện mạnh trên mạng xã hội.',
        'Nhận chia 70/30 với thu nhập hàng tuần tiềm năng từ $1,500-2,500 tùy thuộc vào sổ khách hàng của bạn.',
        'Thiết lập booth riêng trong môi trường studio sạch sẽ, hiện đại với lưu lượng khách đi bộ tuyệt vời và hệ thống đặt lịch trực tuyến.',
        'Tự do phát triển phong cách và thương hiệu riêng với sự hỗ trợ tiếp thị từ studio của chúng tôi.'
      ],
      requirements: ['3+ years professional experience', 'Strong portfolio', 'Client-focused attitude', 'Social media presence'],
      vietnameseRequirements: ['3+ năm kinh nghiệm chuyên nghiệp', 'Portfolio mạnh', 'Thái độ lấy khách hàng làm trung tâm', 'Hiện diện trên mạng xã hội'],
      salary_range: '70/30 split ($1,500-2,500/week potential)',
      experience_level: 'experienced',
      employment_type: 'commission',
      popularity: 'most-hired',
      specialties: ['Traditional', 'Neo-Traditional', 'Japanese', 'Black & Gray'],
      benefits: ['Flexible Schedule', 'Private Booth', 'Marketing Support', 'Supply Discounts'],
      vietnameseBenefits: ['Lịch Linh Hoạt', 'Booth Riêng', 'Hỗ Trợ Tiếp Thị', 'Giảm Giá Vật Tư'],
      trustSignals: ['Featured in Inked Magazine', 'Award-winning artists on staff', '4.9/5 stars on Google (250+ reviews)'],
      urgencyFactor: 6,
      contactPreferences: ['Email Portfolio', 'Instagram DM', 'In-Person Interview']
    }
  ]
};
