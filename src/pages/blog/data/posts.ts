export type QA = { q: string; a: string };
export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  modifiedAt: string;
  language: 'en' | 'vi';
  roleLink?: { role: 'nails'|'hair'|'barber'|'makeup'|'massage'|'tattoo'; cityState: string };
  faq?: QA[];
  body: string[]; // paragraphs
};

const today = new Date().toISOString();

export const posts: BlogPost[] = [
  {
    slug: 'example-article-slug',
    title: 'How to Choose the Right Nail Artist in Los Angeles, CA',
    description: 'A quick guide to finding a reliable, talented nail artist in Los Angeles with the right portfolio and hygiene standards.',
    image: '/placeholder.svg',
    publishedAt: today,
    modifiedAt: today,
    language: 'en',
    roleLink: { role: 'nails', cityState: 'los-angeles-ca' },
    faq: [
      { q: 'What certifications should a nail artist have?', a: 'Look for state licensing and sanitation training specific to California.' },
      { q: 'How far in advance should I book?', a: 'For weekends and events, book 1–2 weeks ahead; same-week slots fill quickly.' },
      { q: 'Are mobile services available?', a: 'Many LA artists offer travel-on-demand with a small fee. Always confirm before booking.' }
    ],
    body: [
      'Los Angeles has thousands of talented nail artists, so start by reviewing portfolios and client reviews. Focus on cleanliness, consistency, and the service types you need—from gels to intricate hand-painted designs. Pricing tends to reflect experience and demand, and top artists fill up fast for weekends and events. Use EmviApp to explore work samples, availability, and specialties so you can compare quickly and book with confidence.',
      'If you are hiring inside a salon, clarify shift needs and sanitation standards. Independent artists may provide mobile services within LA neighborhoods. Align your budget and timeline early, and message professionals with your inspiration photos to get accurate quotes and scheduling options.'
    ]
  },
  {
    slug: 'nail-salon-marketing-ideas-2025',
    title: 'Nail Salon Marketing Ideas for 2025',
    description: 'Actionable salon marketing ideas: local SEO, partnerships, retention, and high-performing content formats.',
    image: '/placeholder.svg',
    publishedAt: today,
    modifiedAt: today,
    language: 'en',
    roleLink: { role: 'nails', cityState: 'new-york-ny' },
    body: [
      'Winning in 2025 requires clear positioning, consistent content, and measurable local SEO. Feature before-and-after reels, client stories, and educational tips to build trust. Use seasonal offers sparingly and track ROI by channel.',
      'Collaborate with nearby boutiques and wedding planners. Make booking frictionless, and keep service pages current. Loyalty benefits and referral rewards compound over time and reduce reliance on discounts.'
    ]
  },
  {
    slug: 'vi-lam-the-nao-de-tim-tho-cat-toc-gioi-tai-houston',
    title: 'VI: Làm thế nào để tìm thợ cắt tóc giỏi tại Houston, TX',
    description: 'Gợi ý nhanh để chọn thợ cắt tóc uy tín tại Houston: xem portfolio, đánh giá và vệ sinh.',
    image: '/placeholder.svg',
    publishedAt: today,
    modifiedAt: today,
    language: 'vi',
    roleLink: { role: 'hair', cityState: 'houston-tx' },
    body: [
      'Để chọn thợ cắt tóc giỏi, bạn nên xem kỹ hình ảnh trước–sau, đánh giá khách hàng và tay nghề với kiểu tóc bạn muốn. Đặt lịch sớm cho cuối tuần và dịp cao điểm.',
      'Giá phụ thuộc kinh nghiệm và nhu cầu. Nên trao đổi trước về mong muốn, ảnh mẫu và tình trạng tóc để có báo giá và thời gian phù hợp.'
    ]
  },
  {
    slug: 'barber-fade-trends-2025',
    title: 'Barber Fade Trends in 2025',
    description: 'The freshest fade trends, taper techniques, and how to brief your barber effectively.',
    image: '/placeholder.svg',
    publishedAt: today,
    modifiedAt: today,
    language: 'en',
    roleLink: { role: 'barber', cityState: 'chicago-il' },
    body: [
      'From low tapers to textured tops, 2025 fades emphasize shape and finish. Bring reference photos and discuss maintenance to choose a cut that fits your routine and workplace.',
      'Ask about clipper guard numbers and styling product recommendations so you can recreate the look between visits.'
    ]
  },
  {
    slug: 'makeup-for-summer-events-san-diego',
    title: 'Makeup for Summer Events in San Diego, CA',
    description: 'Heat-proof makeup tips for weddings and outdoor parties along the coast.',
    image: '/placeholder.svg',
    publishedAt: today,
    modifiedAt: today,
    language: 'en',
    roleLink: { role: 'makeup', cityState: 'san-diego-ca' },
    body: [
      ' coastal humidity calls for lightweight, long-wear formulas. Trial runs help lock down shade and finish. Ask artists about touch-up kits and timeline planning on event day.',
      'Consider SPF layering and flash-friendly powders for photography. Book early for peak weekends.'
    ]
  },
  {
    slug: 'massage-recovery-tips-athletes-phoenix',
    title: 'Massage Recovery Tips for Athletes in Phoenix, AZ',
    description: 'Best practices for sports massage scheduling, hydration, and recovery for desert conditions.',
    image: '/placeholder.svg',
    publishedAt: today,
    modifiedAt: today,
    language: 'en',
    roleLink: { role: 'massage', cityState: 'phoenix-az' },
    body: [
      'Plan sessions around training cycles and races. Hydration and post-session mobility are essential in hot, dry weather. Communicate any injuries and goals to your therapist.',
      'Consistency over intensity leads to better long-term results. Track how you feel 24–48 hours after sessions to optimize frequency.'
    ]
  },
  {
    slug: 'vi-bi-quyet-noi-mi-dep-ben-tai-seattle',
    title: 'VI: Bí quyết nối mi đẹp bền tại Seattle, WA',
    description: 'Chọn kích cỡ mi, vệ sinh và kỹ thuật phù hợp để giữ bộ mi bền lâu.',
    image: '/placeholder.svg',
    publishedAt: today,
    modifiedAt: today,
    language: 'vi',
    roleLink: { role: 'makeup', cityState: 'seattle-wa' },
    body: [
      'Để giữ mi bền, bạn cần vệ sinh nhẹ nhàng, tránh dầu và chải mi mỗi ngày. Hãy hỏi kỹ thuật viên về kích cỡ, độ cong và độ dày phù hợp.',
      'Đặt lịch dặm định kỳ 2–3 tuần để giữ form đẹp và an toàn cho lông mi thật.'
    ]
  },
  {
    slug: 'tattoo-aftercare-guide-denver',
    title: 'Tattoo Aftercare Guide in Denver, CO',
    description: 'A clear aftercare plan for high-altitude climates: hydration, lotion, and sun protection.',
    image: '/placeholder.svg',
    publishedAt: today,
    modifiedAt: today,
    language: 'en',
    roleLink: { role: 'tattoo', cityState: 'denver-co' },
    body: [
      'Follow your artist’s aftercare precisely—clean hands, gentle wash, pat dry, then thin layers of recommended ointment. Avoid direct sun until fully healed.',
      'In Denver’s climate, moisturizer matters. Keep tattoos covered outdoors and continue SPF once healed.'
    ]
  },
  {
    slug: 'salon-team-onboarding-checklist',
    title: 'Salon Team Onboarding Checklist',
    description: 'A simple process for training, culture, and performance in growing salons.',
    image: '/placeholder.svg',
    publishedAt: today,
    modifiedAt: today,
    language: 'en',
    roleLink: { role: 'hair', cityState: 'new-york-ny' },
    body: [
      'Codify expectations early: service standards, safety, and communication. Use checklists to speed up training without sacrificing quality.',
      'Create a shared calendar, feedback loops, and lightweight documentation. Recognition programs improve retention and morale.'
    ]
  },
  {
    slug: 'pricing-your-services-with-confidence',
    title: 'Pricing Your Beauty Services with Confidence',
    description: 'How to set prices that reflect value, market conditions, and profitability.',
    image: '/placeholder.svg',
    publishedAt: today,
    modifiedAt: today,
    language: 'en',
    roleLink: { role: 'barber', cityState: 'boston-ma' },
    body: [
      'Audit time, materials, and expertise. Price lists should be clear and regularly updated. Communicate increases with context and lead time.',
      'Use tiered options to serve different budgets while maintaining margins. Track utilization to identify hidden demand.'
    ]
  },
  {
    slug: 'vi-toi-uu-lich-hen-trong-salon',
    title: 'VI: Tối ưu lịch hẹn trong salon',
    description: 'Quản lý lịch hiệu quả giúp tăng doanh thu và trải nghiệm khách hàng.',
    image: '/placeholder.svg',
    publishedAt: today,
    modifiedAt: today,
    language: 'vi',
    roleLink: { role: 'massage', cityState: 'san-jose-ca' },
    body: [
      'Sắp xếp ca linh hoạt, giảm thời gian trống, và sử dụng nhắc hẹn tự động. Theo dõi số liệu để điều chỉnh nhân sự vào giờ cao điểm.',
      'Rõ ràng về chính sách hủy và đặt cọc để hạn chế no-show, bảo vệ thời gian của đội ngũ.'
    ]
  },
  {
    slug: 'content-ideas-for-beauty-creators',
    title: 'Content Ideas for Beauty Creators',
    description: 'A tactical list of content formats that convert followers to bookings.',
    image: '/placeholder.svg',
    publishedAt: today,
    modifiedAt: today,
    language: 'en',
    roleLink: { role: 'makeup', cityState: 'san-francisco-ca' },
    body: [
      'Short reels, tutorials, and Q&A carousels earn saves and shares. Showcase transformations and educate on maintenance for your niche.',
      'Batch-shoot once per week and reuse clips across platforms. Clear CTAs drive more consultations and bookings.'
    ]
  },
  {
    slug: 'client-retention-blueprint',
    title: 'The Client Retention Blueprint',
    description: 'Simple retention mechanics: consistent follow-ups, benefits, and value-add service moments.',
    image: '/placeholder.svg',
    publishedAt: today,
    modifiedAt: today,
    language: 'en',
    roleLink: { role: 'nails', cityState: 'philadelphia-pa' },
    body: [
      'Retention compounds revenue. Set reminders for check-ins, offer a small perk at certain milestones, and keep notes on preferences to personalize each visit.',
      'Make rebooking easy with clear availability and SMS confirmations. Surprise-and-delight keeps your chair full.'
    ]
  }
];

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}
