import { Job } from "@/types/job";

// Sample job data for development and preview mode
export const mockJobs: Job[] = [
  {
    id: "job-1",
    title: "Thợ Bột và Dip Full Time",
    company: "Tiệm Nail",
    location: "Kansas City North",
    created_at: new Date().toISOString(),
    description: "Tiệm mình ở Kansas City North đang cần tìm thợ Bột và Dip full time. Luôn đảm bảo income nên cần tìm thợ làm lâu dài, chuyên nghiệp, tận tâm với công việc.",
    imageUrl: "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png",
    image: "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png",
    type: 'job',
    is_vietnamese_listing: true,
    vietnamese_description: "Tiệm mình ở Kansas City North đang cần tìm thợ Bột và Dip full time. Luôn đảm bảo income nên cần tìm thợ làm lâu dài, chuyên nghiệp, tận tâm với công việc.",
    employment_type: "Full-Time",
    is_featured: true,
    status: "active",
    expires_at: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    weekly_pay: true,
    owner_will_train: false,
    has_housing: true,
    specialties: ["Nail Technician", "Dip Powder"]
  },
  {
    id: "job-2",
    title: "Thợ Chân Tay Nước",
    company: "Cosmo Nails",
    location: "Overland Park",
    created_at: new Date().toISOString(),
    description: "Tiệm Cosmo Nails ở Overland Park cần tìm thợ chân tay nước biết làm dip càng tốt. Chủ trẻ dễ nói chuyện, thợ dễ thương hoà đồng thân thiện.",
    imageUrl: "/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png",
    image: "/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png",
    type: 'job',
    is_vietnamese_listing: true,
    vietnamese_description: "Tiệm Cosmo Nails ở Overland Park cần tìm thợ chân tay nước biết làm dip càng tốt. Chủ trẻ dễ nói chuyện, thợ dễ thương hoà đồng thân thiện.",
    employment_type: "Full-Time",
    status: "active",
    expires_at: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    weekly_pay: true,
    owner_will_train: true,
    specialties: ["Nail Technician", "Manicure", "Pedicure"]
  },
  {
    id: "job-3",
    title: "Thợ Nail Everything hoặc Chân Tay Nước",
    company: "Bellagio Nail & Day Spa",
    location: "Pensacola, FL",
    created_at: new Date().toISOString(),
    description: "Tiệm đang cần thợ làm everything hoặc chân tay nước, biết vẽ càng tốt. Income cao, bao lương or ăn chia tuỳ theo tay nghề.",
    imageUrl: "/lovable-uploads/5a1ba245-85f7-4036-95f9-0e08ada34602.png",
    image: "/lovable-uploads/5a1ba245-85f7-4036-95f9-0e08ada34602.png",
    type: 'job',
    is_vietnamese_listing: true,
    vietnamese_description: "Tiệm đang cần thợ làm everything hoặc chân tay nước, biết vẽ càng tốt. Income cao, bao lương or ăn chia tuỳ theo tay nghề.",
    employment_type: "Full-Time",
    status: "active",
    expires_at: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    weekly_pay: false,
    has_housing: false,
    specialties: ["Nail Art", "Manicure", "Pedicure", "Full Service"]
  },
  {
    id: "job-4",
    title: "Experienced Hair Stylist",
    company: "Lux Hair Studio",
    location: "Denver, CO",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Looking for an experienced hair stylist to join our growing team. Must have at least 2 years of experience and a portfolio of work. Commission-based position with booth rental options available.",
    imageUrl: "/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png",
    image: "/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png",
    type: 'job',
    is_vietnamese_listing: false,
    employment_type: "Full-Time",
    status: "active",
    expires_at: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ["Hair Styling", "Color", "Cutting"],
    compensation_type: "commission",
    experience_level: "Senior"
  },
  {
    id: "job-5",
    title: "Nail Salon Manager",
    company: "Elite Nails",
    location: "Chicago, IL",
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Seeking a salon manager with experience in both nail techniques and staff management. Must be organized, professional, and able to handle daily operations.",
    imageUrl: "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png", 
    image: "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png",
    type: 'job',
    is_vietnamese_listing: false,
    employment_type: "Full-Time",
    is_featured: true,
    status: "active",
    expires_at: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
    specialties: ["Management", "Nail Technician", "Customer Service"],
    salary_range: "$50,000-$60,000 salary",
    compensation_type: "salary",
    experience_level: "Senior"
  },
  {
    id: "job-6",
    title: "Entry Level Nail Technician",
    company: "Learn & Grow Salon",
    location: "Austin, TX",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Great opportunity for new nail technicians! We provide training and mentorship. Must have a positive attitude and willingness to learn.",
    imageUrl: "/lovable-uploads/5a1ba245-85f7-4036-95f9-0e08ada34602.png",
    image: "/lovable-uploads/5a1ba245-85f7-4036-95f9-0e08ada34602.png",
    type: 'job',
    is_vietnamese_listing: false,
    employment_type: "Part-Time",
    status: "active",
    expires_at: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
    owner_will_train: true,
    specialties: ["Nail Technician", "Entry Level"],
    experience_level: "Junior"
  },
  {
    id: "job-7",
    title: "Expired Job Posting", 
    company: "Old Salon",
    location: "Miami, FL",
    created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), 
    description: "This is an expired job posting for testing purposes.",
    imageUrl: "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png",
    image: "/lovable-uploads/bb5c8292-c127-4fd2-9663-c65d596b135d.png", 
    type: 'job',
    is_vietnamese_listing: false,
    employment_type: "Full-Time",
    status: "expired", 
    expires_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() // Expired 15 days ago
  }
];

// Filter salons for sale from the sample jobs data
export const salonsForSaleJobs = mockJobs.filter(job => job.for_sale === true);

// This is a utility to ensure we always have enough salon for sale listings
export const ensureSalonsForSale = (count: number = 20) => {
  // If we already have enough, return them
  if (salonsForSaleJobs.length >= count) {
    return salonsForSaleJobs.slice(0, count);
  }
  
  // Otherwise, create more listings by duplicating existing ones with different IDs
  const additional: Job[] = [];
  let currentId = 200; // Start IDs from a higher number to avoid conflicts
  
  for (let i = 0; i < count - salonsForSaleJobs.length; i++) {
    const templateIndex = i % salonsForSaleJobs.length;
    const template = salonsForSaleJobs[templateIndex];
    
    if (template) {
      additional.push({
        ...template,
        id: String(currentId++),
        company: `${template.company} ${i + 1}`,
        location: template.location?.includes('Denver') ? 
          template.location.replace('Denver', ['Boulder', 'Colorado Springs', 'Fort Collins'][i % 3]) : 
          template.location,
        created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
      });
    }
  }
  
  return [...salonsForSaleJobs, ...additional];
};
