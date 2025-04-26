
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Building } from 'lucide-react';
import OpportunityCard from './opportunities/OpportunityCard';
import { Job } from '@/types/job';

const salonListings: Job[] = [
  {
    id: "1",
    title: "CẦN GẤP THỢ NAIL",
    company: "Grand Prairie Nails & Spa",
    location: "Grand Prairie, TX",
    description: "Tiệm đông khách, cần thợ everything, full-time. Lương $1,500/tuần + tip cao.",
    vietnamese_description: "Tiệm đông khách, cần thợ everything, full-time. Lương $1,500/tuần + tip cao. Có chỗ ở cho thợ.",
    contact_info: {
      phone: "469-875-2554"
    },
    weekly_pay: true,
    has_housing: true,
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    title: "TIỆM NAIL CẦN SANG GẤP",
    company: "Beauty Salon Mannheim",
    location: "Mannheim, Germany",
    description: "5 bàn tay, 2 ghế chân, 1 phòng nối mi. Tiệm 6 năm, khách ổn định. Giá thuê rẻ, khu trung tâm.",
    vietnamese_description: "5 bàn tay, 2 ghế chân, 1 phòng nối mi. Tiệm 6 năm, khách ổn định. Giá thuê rẻ, khu trung tâm. Vì sức khỏe cần sang lại gấp.",
    for_sale: true,
    contact_info: {
      phone: "0176 4727 2513"
    },
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    title: "NEED 2 POWDER TECHS",
    company: "Luxury Nails NC",
    location: "Charlotte, NC",
    description: "$1,800 / 6 days. Free housing provided. Busy salon.",
    weekly_pay: true,
    has_housing: true,
    contact_info: {
      phone: "657-456-4975"
    },
    specialties: ["Powder", "Acrylic"],
    created_at: new Date().toISOString()
  },
  {
    id: "4",
    title: "BOOTH RENTAL AVAILABLE",
    company: "Elite Beauty Studio",
    location: "Los Angeles, CA",
    description: "Premium booth space in upscale salon. High-end clientele, flexible schedule. Great location.",
    specialties: ["Hair", "Nails", "Spa"],
    monthly_rent: "$800",
    created_at: new Date().toISOString()
  },
  {
    id: "5",
    title: "EXPERIENCED NAIL TECHS",
    company: "VIP Nails & Spa",
    location: "Houston, TX",
    description: "Looking for experienced nail technicians. $1,200-1,600/week + tips. Housing available.",
    vietnamese_description: "Cần thợ nail có kinh nghiệm. Lương $1,200-1,600/tuần + tips. Có chỗ ở.",
    has_housing: true,
    weekly_pay: true,
    contact_info: {
      phone: "832-555-0123"
    },
    created_at: new Date().toISOString()
  },
  {
    id: "6",
    title: "LUXURY SPA FOR SALE",
    company: "Serenity Day Spa",
    location: "Miami Beach, FL",
    description: "Established luxury day spa in prime location. 10 treatment rooms, steady clientele. Owner retiring.",
    for_sale: true,
    asking_price: "$380,000",
    square_feet: "2,800",
    created_at: new Date().toISOString()
  },
  {
    id: "7",
    title: "HAIR SALON MANAGER",
    company: "Scissors & Style",
    location: "Seattle, WA",
    description: "Seeking experienced salon manager. Full benefits, competitive salary, growth opportunity.",
    salary_range: "$65,000 - $80,000",
    benefits: ["Health Insurance", "401k", "Paid Time Off"],
    created_at: new Date().toISOString()
  },
  {
    id: "8",
    title: "BEAUTY SUPPLY STORE",
    company: "Beauty Essentials",
    location: "Atlanta, GA",
    description: "Profitable beauty supply store for sale. Prime location, loyal customer base. Includes inventory.",
    for_sale: true,
    asking_price: "$175,000",
    created_at: new Date().toISOString()
  },
  {
    id: "9",
    title: "NAIL SALON FOR SALE",
    company: "Five Star Nails",
    location: "San Diego, CA",
    description: "8 stations, 6 pedicure chairs. Established 12 years. Great location, loyal clientele.",
    vietnamese_description: "8 bàn, 6 ghế pedichaire. Tiệm 12 năm, khu tốt, khách quen đông.",
    for_sale: true,
    asking_price: "$220,000",
    created_at: new Date().toISOString()
  }
];

const SalonJobListingsShowcase = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nail & Beauty Salons Hiring Now</h2>
          <p className="text-lg text-gray-600">
            Connect with top salons looking for talented beauty professionals like you
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {salonListings.map((listing, index) => (
            <OpportunityCard 
              key={listing.id} 
              listing={listing}
              index={index}
            />
          ))}
        </motion.div>

        <div className="text-center">
          <Link to="/jobs">
            <Button variant="outline" size="lg" className="font-medium">
              <Building className="mr-2 h-4 w-4" />
              Browse All Opportunities
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SalonJobListingsShowcase;
