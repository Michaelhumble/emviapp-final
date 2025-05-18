
import { JobFormValues, IndustryType } from "./jobFormSchema";

// Template card definitions - what shows in the UI
export const templateCards = [
  {
    id: "nails",
    emoji: "💅",
    title: "Nail Tech Dream Team",
    subtitle: "Find your top talent in days",
    slogan: "Thousands of skilled techs looking for work!",
    bgColor: "bg-gradient-to-br from-rose-50 to-pink-50"
  },
  {
    id: "hair",
    emoji: "💇‍♀️",
    title: "Hair Stylist Superstar",
    subtitle: "Bring fresh talent to your salon",
    slogan: "Connect with creative stylists today!",
    bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50"
  },
  {
    id: "lashes",
    emoji: "👁️",
    title: "Lash Artist Needed",
    subtitle: "Grow your beauty business",
    slogan: "Find detail-oriented lash pros!",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-50"
  },
  {
    id: "massage",
    emoji: "🧖‍♀️",
    title: "Massage Therapist",
    subtitle: "Add wellness to your services",
    slogan: "Licensed therapists ready to join!",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-50"
  },
  {
    id: "barber",
    emoji: "✂️",
    title: "Barber Pro Wanted",
    subtitle: "Classic cuts, modern style",
    slogan: "Find skilled barbers in your area!",
    bgColor: "bg-gradient-to-br from-amber-50 to-yellow-50"
  },
  {
    id: "makeup",
    emoji: "💄",
    title: "Makeup Artist Position",
    subtitle: "Beauty transformations daily",
    slogan: "Connect with creative MUAs now!",
    bgColor: "bg-gradient-to-br from-fuchsia-50 to-pink-50"
  },
  {
    id: "brows",
    emoji: "🧿",
    title: "Brow Artist Position",
    subtitle: "Shape perfect arches",
    slogan: "Expert brow specialists available!",
    bgColor: "bg-gradient-to-br from-orange-50 to-amber-50"
  },
  {
    id: "skincare",
    emoji: "🧴",
    title: "Esthetician Wanted",
    subtitle: "Help clients glow up",
    slogan: "Licensed skin experts waiting!",
    bgColor: "bg-gradient-to-br from-teal-50 to-cyan-50"
  },
  {
    id: "tattoo",
    emoji: "🎨",
    title: "Tattoo Artist Position",
    subtitle: "Join our creative studio",
    slogan: "Find talented artists today!",
    bgColor: "bg-gradient-to-br from-slate-50 to-zinc-50"
  },
  {
    id: "custom",
    emoji: "✏️",
    title: "Create Custom Job",
    subtitle: "Start from scratch",
    slogan: "Design your perfect listing!",
    bgColor: "bg-gradient-to-br from-gray-50 to-slate-50"
  }
];

// Full job template content
export const jobTemplates: Record<IndustryType | 'custom', JobFormValues> = {
  nails: {
    title: "Experienced Nail Technician - $1,200-1,800/Week",
    description: `We are looking for an experienced nail technician to join our team at our upscale salon. 

The ideal candidate has at least 2 years of experience with acrylic, gel, and dip powder applications. Must be skilled in nail art and have excellent customer service skills.

What we offer:
- Weekly pay of $1,200-$1,800 depending on experience
- Flexible schedule (full-time and part-time positions available)
- Modern, clean working environment
- Product supplied by salon
- Loyal customer base
- Growth opportunities

Requirements:
- Valid nail technician license
- Experience with acrylics, gel, and dip powder
- Nail art skills
- Friendly, professional attitude
- Reliable transportation

Join our growing team in a positive work environment with great earning potential!`,
    vietnameseDescription: `Chúng tôi đang tìm kiếm một kỹ thuật viên làm móng có kinh nghiệm để tham gia vào đội ngũ của chúng tôi tại salon cao cấp của chúng tôi.

Ứng viên lý tưởng có ít nhất 2 năm kinh nghiệm với các ứng dụng acrylic, gel và bột nhúng. Phải có kỹ năng vẽ móng và kỹ năng phục vụ khách hàng tốt.

Chúng tôi cung cấp:
- Lương hàng tuần từ $1,200-$1,800 tùy thuộc vào kinh nghiệm
- Lịch trình linh hoạt (có vị trí toàn thời gian và bán thời gian)
- Môi trường làm việc hiện đại, sạch sẽ
- Sản phẩm được cung cấp bởi salon
- Cơ sở khách hàng trung thành
- Cơ hội phát triển

Yêu cầu:
- Giấy phép kỹ thuật viên làm móng hợp lệ
- Kinh nghiệm với acrylics, gel và bột nhúng
- Kỹ năng vẽ móng
- Thái độ thân thiện, chuyên nghiệp
- Phương tiện di chuyển đáng tin cậy

Tham gia vào đội ngũ đang phát triển của chúng tôi trong môi trường làm việc tích cực với tiềm năng thu nhập tuyệt vời!`,
    location: "Atlanta, GA",
    compensation_details: "Avg tips $300-500/week + customer retention bonus",
    salary_range: "$1,200-$1,800/week",
    jobType: "full-time",
    experience_level: "experienced",
    contactEmail: "info@yourbeautysalon.com",
    requirements: [
      "Valid nail technician license required",
      "2+ years professional experience preferred",
      "Acrylic, Gel, and Dip Powder skills required",
      "Nail art experience strongly desired",
      "Customer service skills essential"
    ],
    specialties: [
      "Acrylic Nails",
      "Gel Extensions",
      "Dip Powder",
      "Nail Art",
      "Pedicure"
    ]
  },
  hair: {
    title: "Hair Stylist - $1,000-1,500/Week + Tips",
    description: `Join our team of passionate hair stylists at our busy, modern salon! We're looking for a talented hair stylist with creativity and excellent client relationship skills.

What you'll do:
• Provide top quality cuts, color, and style services
• Build your own client base with our marketing support
• Work in a collaborative, supportive team environment
• Learn and grow with ongoing education opportunities

What we offer:
• Competitive pay structure: $1,000-$1,500/week (plus great tips)
• Flexible scheduling
• Health benefits for full-time stylists
• Paid education and training
• Modern salon with premium product lines
• Front desk support for bookings

If you love making clients look and feel amazing and want to work in a positive environment, we'd love to meet you!`,
    location: "Chicago, IL",
    compensation_details: "Commission + Tips, product bonuses, education allowance",
    salary_range: "$1,000-$1,500/week",
    jobType: "full-time",
    experience_level: "intermediate",
    contactEmail: "careers@modernhairsalon.com",
    requirements: [
      "Current Cosmetology license",
      "1+ year salon experience", 
      "Strong color and cutting skills", 
      "Friendly, positive attitude", 
      "Willingness to learn"
    ],
    specialties: [
      "Haircuts", 
      "Color", 
      "Balayage",
      "Extensions", 
      "Men's Styling"
    ]
  },
  lashes: {
    title: "Lash Artist/Technician - $70k+/Year Potential",
    description: `Do you have a passion for creating beautiful lash sets? Join our luxury lash studio!

We're seeking an experienced, licensed lash artist to join our growing team. Our ideal candidate has exceptional attention to detail and can deliver premium classic and volume lash services.

What we offer:
- Base pay + commission structure with $70k+ annual potential
- Flexible schedule (full-time or part-time)
- Relaxing, upscale work environment
- All supplies and equipment provided
- Established client base
- Growth into training and management possible

Responsibilities:
- Perform classic and volume lash extensions
- Lash lifts and tints
- Maintain strict safety and hygiene standards
- Provide exceptional customer service
- Assist with retention and client rebooking

If you're ready to advance your lash career in a supportive, professional environment, apply today!`,
    location: "Los Angeles, CA",
    compensation_details: "Commission structure with $70k+ annual potential",
    salary_range: "$25-35/hour + commission",
    jobType: "full-time",
    experience_level: "experienced",
    contactEmail: "hiring@luxlashstudio.com",
    requirements: [
      "Cosmetology or Esthetician license", 
      "Lash certification", 
      "1+ year experience with lash extensions", 
      "Portfolio of work", 
      "Weekend availability"
    ],
    specialties: [
      "Classic Lashes", 
      "Volume Lashes", 
      "Mega Volume", 
      "Lash Lifts", 
      "Tinting"
    ]
  },
  massage: {
    title: "Licensed Massage Therapist - $50-70/hr + Tips",
    description: `We're expanding our wellness center and seeking licensed massage therapists to join our team.

Our ideal candidate is passionate about healing, values client comfort, and can provide a variety of massage techniques tailored to individual client needs.

What we offer:
- Competitive pay: $50-70 per hour + generous tips
- Flexible scheduling (part-time or full-time available)
- Beautiful, peaceful treatment rooms
- All linens, oils, and equipment provided
- Established clientele and booking system
- Front desk support for booking and payment
- Opportunity for growth and specialization

Responsibilities:
- Provide professional massage services (Swedish, deep tissue, sports)
- Maintain accurate client records
- Ensure clean, prepared treatment rooms
- Collaborate with other wellness practitioners
- Maintain appropriate professional certifications

If you're ready to work in a supportive environment focused on wellness and client care, we'd love to hear from you!`,
    location: "Denver, CO",
    compensation_details: "Average tips $15-25 per session, retail commission available",
    salary_range: "$50-70/hour",
    jobType: "part-time",
    experience_level: "intermediate",
    contactEmail: "jobs@serenewellnessspa.com",
    requirements: [
      "Current massage therapy license",
      "Minimum 500 hours certified training", 
      "Liability insurance", 
      "Experience in spa or wellness setting", 
      "Knowledge of multiple massage modalities"
    ],
    specialties: [
      "Swedish Massage", 
      "Deep Tissue", 
      "Sports Massage", 
      "Hot Stone", 
      "Prenatal"
    ]
  },
  brows: {
    title: "Eyebrow Specialist - Up to $65k/Year",
    description: `Join our premium brow bar as an Eyebrow Specialist/Technician!

We're looking for a talented brow artist to provide exceptional threading, waxing, lamination, and tinting services to our discerning clientele. The ideal candidate has a steady hand, excellent aesthetic judgment, and a friendly, professional demeanor.

What we offer:
- Base pay + commission structure (up to $65k/year potential)
- Flexible scheduling
- Modern, Instagram-worthy studio space
- All tools and products provided
- Established clientele
- Paid training in new techniques
- Career growth opportunities

Responsibilities:
- Perform precision threading and waxing services
- Brow lamination and tinting
- Brow mapping and shaping consultations
- Maintain clean workstation and safety protocols
- Recommend appropriate retail products

If you're passionate about creating perfect arches and want to work in a positive environment with growth potential, apply today!`,
    location: "Miami, FL",
    compensation_details: "Includes commission on retail product sales",
    salary_range: "$45k-65k/year",
    jobType: "full-time",
    experience_level: "experienced",
    contactEmail: "careers@archperfection.com",
    requirements: [
      "Current esthetician license", 
      "Minimum 1 year experience in brow services", 
      "Threading certification preferred", 
      "Excellent attention to detail", 
      "Customer service skills"
    ],
    specialties: [
      "Threading", 
      "Waxing", 
      "Brow Lamination", 
      "Tinting", 
      "Brow Mapping"
    ]
  },
  skincare: {
    title: "Licensed Esthetician - $40-60/hr + Commission",
    description: `We are seeking a passionate, licensed Esthetician to join our upscale skincare studio.

The ideal candidate has excellent skincare knowledge, loves helping clients achieve their skin goals, and stays current with industry advancements and techniques.

What we offer:
- Competitive pay structure: $40-60/hour + commission
- Flexible schedule options
- Beautiful, modern treatment rooms
- High-end product lines
- Established client base
- Continued education allowance
- Growth opportunities within the company

Responsibilities:
- Provide customized facial treatments
- Perform chemical peels and advanced skin procedures
- Recommend appropriate home care regimens
- Maintain detailed client records
- Ensure treatment room cleanliness and preparation
- Meet retail sales goals

If you're passionate about skincare, have a warm personality, and want to work with a supportive team in a luxury environment, we'd love to meet you!`,
    location: "Seattle, WA",
    compensation_details: "Retail commission, treatment upgrades, monthly bonus potential",
    salary_range: "$40-60/hour + commission",
    jobType: "full-time",
    experience_level: "intermediate",
    contactEmail: "hiring@glowskincare.com",
    requirements: [
      "Current esthetician license", 
      "2+ years experience in spa or medical setting", 
      "Knowledge of advanced skin treatments", 
      "Excellent customer service skills", 
      "Availability on weekends"
    ],
    specialties: [
      "Custom Facials", 
      "Chemical Peels", 
      "Microdermabrasion", 
      "LED Therapy", 
      "Extraction Techniques"
    ]
  },
  tattoo: {
    title: "Tattoo Artist - 70/30 Split + Walk-Ins",
    description: `Established tattoo studio seeking talented artist to join our creative team!

We're looking for a passionate tattoo artist with a strong portfolio, excellent drawing skills, and a professional attitude. We provide a clean, modern studio environment with high visibility and regular client flow.

What we offer:
- 70/30 split (70% to artist)
- Guaranteed walk-ins
- Private station setup
- Social media promotion of your work
- Supportive, drama-free environment
- Flexible scheduling
- Regular shop events and guest spots

Requirements:
- Professional tattoo experience (2+ years preferred)
- Strong portfolio showing range and technical skill
- Reliable and punctual
- Health and safety certified
- Good communication skills with clients
- Digital design capabilities a plus

If you're looking to build your clientele in a respectful, artistic environment, we'd love to see your work!`,
    location: "Austin, TX",
    compensation_details: "70/30 commission split, walk-ins provided",
    salary_range: "$60k-100k/year potential",
    jobType: "full-time",
    experience_level: "experienced",
    contactEmail: "artists@inksoulstudio.com",
    requirements: [
      "2+ years professional tattoo experience", 
      "Strong portfolio", 
      "Blood-borne pathogen certification", 
      "Reliable transportation", 
      "Digital design skills preferred"
    ],
    specialties: [
      "American Traditional", 
      "Neo-Traditional", 
      "Realism", 
      "Black and Grey", 
      "Custom Designs"
    ]
  },
  barber: {
    title: "Skilled Barber - $1,500-2,000/Week Potential",
    description: `Join our growing modern barbershop! We're seeking a talented, licensed barber with excellent fading and scissor skills.

The ideal candidate has strong technical abilities, friendly client interaction, and takes pride in their craft. Our shop has a steady stream of clients and a great atmosphere.

What we offer:
- Commission-based pay with $1,500-2,000/week potential
- Flexible scheduling
- Modern, well-equipped stations
- Established clientele + walk-in traffic
- Premium product line available
- Social media promotion
- Supportive team environment

Responsibilities:
- Precision haircuts and fades
- Beard trims and shaves
- Line-ups and designs
- Basic color services
- Maintaining clean, organized workstation
- Building client relationships

If you have a passion for barbering, excellent technical skills, and want to grow your career, we want to meet you!`,
    location: "Houston, TX",
    compensation_details: "Commission structure + tips ($1,500-2,000/week potential)",
    salary_range: "$70-100k/year potential",
    jobType: "full-time",
    experience_level: "experienced",
    contactEmail: "careers@moderncutsbarber.com",
    requirements: [
      "Valid barber license",
      "2+ years professional experience",
      "Strong fading and scissor skills",
      "Reliable and punctual",
      "Weekend availability"
    ],
    specialties: [
      "Skin Fades",
      "Scissor Cuts",
      "Beard Grooming",
      "Hot Towel Shaves",
      "Line-ups & Designs"
    ]
  },
  makeup: {
    title: "Freelance Makeup Artist - $55-75/hr + Tips",
    description: `Looking for a talented Makeup Artist to join our luxury beauty studio!

We're seeking a creative, skilled MUA with expertise in various makeup techniques and styles. The ideal candidate has excellent people skills, can work efficiently, and creates flawless makeup applications for all skin types and tones.

What we offer:
- Competitive pay: $55-75/hour plus tips
- Flexible scheduling (great for portfolio building)
- Luxurious studio environment
- High-end makeup and tools provided
- Wedding and event bookings
- Social media exposure
- Networking opportunities with photographers and stylists

Responsibilities:
- Bridal and special occasion makeup
- Natural and glamour looks
- Color matching and customization
- Maintain strict hygiene standards
- Client consultations
- Some retail sales of recommended products

If you're passionate about makeup artistry and ready to work with a premium clientele in a supportive environment, we'd love to see your portfolio!`,
    location: "New York, NY",
    compensation_details: "Special event bonuses, retail commission available",
    salary_range: "$55-75/hour + tips",
    jobType: "part-time",
    experience_level: "experienced",
    contactEmail: "artists@glamstudio.com",
    requirements: [
      "Completed makeup artistry training/certification",
      "Professional portfolio",
      "2+ years experience",
      "Knowledge of various makeup techniques",
      "Experience with diverse skin tones and types"
    ],
    specialties: [
      "Bridal Makeup",
      "Special Occasion",
      "Natural Glam",
      "Editorial",
      "Airbrush Application"
    ]
  },
  custom: {
    title: "",
    description: "",
    location: "",
    compensation_details: "",
    salary_range: "",
    jobType: "full-time",
    experience_level: "experienced",
    contactEmail: "",
    requirements: [],
    specialties: []
  }
};
