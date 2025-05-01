
interface JobPosting {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: string;
  experience?: string;
  featured?: boolean;
  deadline?: string;
  posted?: string;
  image?: string;
  price?: string;
}

const jobsData: JobPosting[] = [
  {
    id: 1,
    title: "Senior Nail Technician",
    company: "Luxury Nail Spa",
    location: "Los Angeles, CA",
    salary: "$25-35/hr + tips",
    description: "We are seeking an experienced nail technician with at least 3 years of experience in acrylic, gel, and nail art. Must have a valid license and excellent customer service skills.",
    featured: true,
    image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: "$25-35/hr"
  },
  {
    id: 2,
    title: "Booth Rental Available",
    company: "Elite Beauty Salon",
    location: "San Francisco, CA",
    description: "Prime booth rental available in upscale salon. High foot traffic location with established clientele. All utilities included. Perfect for licensed nail technicians with existing clients.",
    price: "$200/week",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Nail Salon Manager",
    company: "Glossy Nails",
    location: "New York, NY",
    salary: "$55,000-65,000/year",
    description: "Seeking an experienced salon manager to oversee daily operations, staff scheduling, inventory management, and ensure excellent customer service. Must have previous salon management experience.",
    featured: true,
    image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Part-Time Nail Artist",
    company: "Trendy Nails & Spa",
    location: "Chicago, IL",
    salary: "$20-25/hr + tips",
    description: "Looking for a creative nail artist for weekend shifts. Expertise in nail art, gel manicures, and pedicures required. Great opportunity for building clientele.",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Nail Salon For Sale",
    company: "Established Nail Salon",
    location: "Miami, FL",
    description: "Profitable nail salon for sale in prime Miami location. Established for 10+ years with loyal clientele. 6 manicure stations, 5 pedicure chairs. Seller retiring. Great opportunity for new owner.",
    price: "$120,000",
    featured: true,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Lash Technician Wanted",
    company: "Glam Beauty Bar",
    location: "Austin, TX",
    salary: "$22-30/hr + commission",
    description: "Seeking licensed lash technician for full or part-time position. Experience with classic and volume lashes required. Growing salon with excellent team environment.",
    image: "https://images.unsplash.com/photo-1595475039782-85347d92312c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

export default jobsData;
