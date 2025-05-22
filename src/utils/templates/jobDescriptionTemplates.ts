
// Define TypeScript interfaces for our templates
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

// Create static templates for each industry
export const jobDescriptionTemplates: IndustryTemplates[] = [
  {
    industry: 'nails',
    templates: [
      {
        id: 'nails-1',
        title: 'Professional Nail Technician',
        description: `We're seeking experienced Nail Technicians to join our upscale salon. The ideal candidate has 2+ years of experience in manicures, pedicures, gel, and acrylic services. Must maintain a clean workspace and provide exceptional customer service. Full-time position with competitive commission and tips that can average $1000-$1500 weekly. Housing available for qualified candidates.`,
        vietnameseDescription: `Chúng tôi đang tìm kiếm Kỹ Thuật Viên Làm Móng có kinh nghiệm để tham gia vào tiệm salon cao cấp của chúng tôi. Ứng viên lý tưởng có 2+ năm kinh nghiệm về dịch vụ làm móng tay, móng chân, gel và acrylic. Phải duy trì không gian làm việc sạch sẽ và cung cấp dịch vụ khách hàng xuất sắc. Vị trí toàn thời gian với hoa hồng cạnh tranh và tiền boa trung bình từ $1000-$1500 mỗi tuần. Có nhà ở cho ứng viên đủ điều kiện.`
      },
      {
        id: 'nails-2',
        title: 'Nail Artist - Full Service',
        description: `Join our team of skilled nail artists! We're looking for professionals with experience in acrylic, gel, dip powder, and nail art. Must be detail-oriented and passionate about creating beautiful nails. Responsibilities include providing excellent customer service, maintaining cleanliness, and staying updated on latest trends. We offer competitive compensation, flexible schedules, and a fun team environment. Weekly pay available and housing provided for qualified candidates.`,
        vietnameseDescription: `Tham gia đội ngũ nghệ sĩ làm móng tài năng của chúng tôi! Chúng tôi đang tìm kiếm các chuyên gia có kinh nghiệm về acrylic, gel, bột nhúng và nghệ thuật móng. Phải chú ý đến chi tiết và đam mê tạo ra những bộ móng đẹp. Trách nhiệm bao gồm cung cấp dịch vụ khách hàng xuất sắc, duy trì sạch sẽ và cập nhật các xu hướng mới nhất. Chúng tôi cung cấp mức lương cạnh tranh, lịch làm việc linh hoạt và môi trường làm việc vui vẻ. Có trả lương hàng tuần và cung cấp nhà ở cho ứng viên đủ điều kiện.`
      }
    ]
  },
  {
    industry: 'hair',
    templates: [
      {
        id: 'hair-1',
        title: 'Professional Hairstylist',
        description: `Seeking talented Hairstylists to join our growing team! The ideal candidate has experience in cutting, coloring, and styling for a diverse clientele. Must excel in customer service and stay current with industry trends. We offer competitive commission, flexible scheduling, and ongoing education opportunities. Join our supportive team and grow your career in a positive salon environment.`
      }
    ]
  },
  {
    industry: 'lashes',
    templates: [
      {
        id: 'lashes-1',
        title: 'Experienced Lash Technician',
        description: `Now hiring skilled Lash Technicians! We're looking for detail-oriented professionals experienced in classic and volume lash extensions. The right candidate will have excellent hand-eye coordination, patience, and a passion for creating beautiful, custom lash looks. Must maintain strict hygiene standards and provide exceptional client care. Competitive compensation with great earning potential in our busy, upscale salon.`
      }
    ]
  },
  {
    industry: 'barber',
    templates: [
      {
        id: 'barber-1',
        title: 'Professional Barber',
        description: `Join our modern barbershop team! We're looking for skilled barbers with experience in classic cuts, modern styles, beard trims, and straight razor shaves. The ideal candidate has excellent customer service skills, can maintain a clean workspace, and enjoys working in a team environment. Strong clientele following is a plus but not required. We offer competitive commission structure, flexible hours, and a friendly atmosphere.`
      }
    ]
  },
  {
    industry: 'skincare',
    templates: [
      {
        id: 'skincare-1',
        title: 'Licensed Esthetician',
        description: `Seeking a licensed Esthetician to join our wellness spa! The ideal candidate should be knowledgeable in various facial treatments, chemical peels, microdermabrasion, and have excellent product knowledge. Must be passionate about skincare and helping clients achieve their skin goals. Responsibilities include performing treatments, recommending home care regimens, and maintaining a clean treatment room. We offer competitive pay, flexible scheduling, and a supportive team environment.`
      }
    ]
  },
  {
    industry: 'microblading',
    templates: [
      {
        id: 'microblading-1',
        title: 'Microblading Artist',
        description: `We're looking for a talented Microblading Artist to join our permanent makeup studio. The ideal candidate should be certified in microblading with a portfolio demonstrating precision, attention to detail, and understanding of facial symmetry. Experience with powder brows, ombré brows, and color theory is a plus. Must follow strict hygiene protocols and provide exceptional client consultations. Join our team to grow your career in a supportive environment with competitive compensation.`
      }
    ]
  },
  {
    industry: 'makeup',
    templates: [
      {
        id: 'makeup-1',
        title: 'Professional Makeup Artist',
        description: `Seeking a creative Makeup Artist to join our beauty team! The ideal candidate has experience with various makeup techniques and can create looks for different occasions including bridal, special events, and everyday glam. Should be knowledgeable about different skin types, color theory, and current trends. Strong communication skills and ability to understand client preferences are essential. We offer competitive compensation and opportunities to work with a diverse clientele.`
      }
    ]
  },
  {
    industry: 'other',
    templates: [
      {
        id: 'other-1',
        title: 'Beauty Professional',
        description: `Join our thriving beauty salon! We're seeking dedicated professionals who are passionate about their craft and providing exceptional customer service. The ideal candidate is reliable, team-oriented, and committed to their professional growth. We offer competitive compensation, flexible scheduling options, and a positive work environment. Experience in the beauty industry required. Come grow with our supportive team!`
      }
    ]
  }
];
