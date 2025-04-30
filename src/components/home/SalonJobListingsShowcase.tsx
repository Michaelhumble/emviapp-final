
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Building } from 'lucide-react';
import OpportunityCard from './opportunities/OpportunityCard';
import { Job } from '@/types/job';
import AuthAction from '@/components/common/AuthAction';

export const salonListings: Job[] = [
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
    title: "CẦN THỢ NAIL",
    company: "Jacksonville Nails & Spa",
    location: "Jacksonville, FL",
    description: "Full-time + part-time. Bao lương, ăn chia.",
    contact_info: {
      owner_name: "Sương",
      phone: "904-338-8648"
    },
    created_at: new Date().toISOString()
  },
  {
    id: "5",
    title: "HIRING NAIL TECH",
    company: "Highlands Ranch Nail Spa",
    location: "Highlands Ranch, CO",
    description: "Part-time, ưu tiên thợ bột & dip.",
    vietnamese_description: "Part-time, ưu tiên thợ bột & dip.",
    contact_info: {
      owner_name: "Mary",
      phone: "(303) 683-5083"
    },
    specialties: ["Powder", "Dip"],
    created_at: new Date().toISOString()
  },
  {
    id: "6",
    title: "TIỆM NAIL CẦN BÁN",
    company: "Fresno Beauty Salon",
    location: "Fresno, CA",
    description: "20 bàn, 20 ghế, khu đông đúc. Income ổn định $70K/tháng.",
    vietnamese_description: "20 bàn, 20 ghế, khu đông đúc. Income ổn định $70K/tháng.",
    for_sale: true,
    asking_price: "$450,000",
    contact_info: {
      owner_name: "Jen",
      phone: "(408) 614-9332"
    },
    created_at: new Date().toISOString()
  },
  {
    id: "7",
    title: "CẦN THỢ NAIL GẤP",
    company: "Silver Spring Nails",
    location: "Silver Spring, MD",
    description: "Khách Mỹ, tip cao. Cần thợ bột, dip, tay chân nước.",
    specialties: ["Powder", "Dip", "Manicure", "Pedicure"],
    contact_info: {
      phone: "980-267-5013"
    },
    created_at: new Date().toISOString()
  },
  {
    id: "8",
    title: "TIỆM NAIL BAO LƯƠNG",
    company: "Wheeling Nail Spa",
    location: "Wheeling, WV",
    description: "Lương $7,000 - $12,000/tháng tùy tay nghề. Có chỗ ở miễn phí.",
    has_housing: true,
    contact_info: {
      owner_name: "Hương",
      phone: "(916) 402-0100"
    },
    created_at: new Date().toISOString()
  },
  {
    id: "9",
    title: "CẦN THỢ NAIL",
    company: "Fontana Nails",
    location: "Fontana, CA",
    description: "Tiệm plaza lớn, cần thợ everything. Chia 6/4 hoặc bao lương $1,200-$1,500/tuần.",
    weekly_pay: true,
    contact_info: {
      owner_name: "Henry",
      phone: "(909) 997-9953"
    },
    created_at: new Date().toISOString()
  },
  {
    id: "10",
    title: "NAIL SALON FOR SALE",
    company: "Daniel Island Nails",
    location: "Daniel Island, SC",
    description: "10 bàn, 10 ghế, khu Mỹ trắng 100%.",
    for_sale: true,
    contact_info: {
      owner_name: "John",
      phone: "(803) 447-9999"
    },
    created_at: new Date().toISOString()
  },
  {
    id: "11",
    title: "CẦN THỢ Ở TAMPA",
    company: "Tampa Nails & Spa",
    location: "Tampa, FL",
    description: "Cần thợ giỏi + người dọn dẹp cả ngày.",
    contact_info: {
      owner_name: "Định",
      phone: "(408) 590-7500"
    },
    created_at: new Date().toISOString()
  },
  {
    id: "12",
    title: "CẦN THỢ NAIL",
    company: "Ontario Nail Bar",
    location: "Ontario, CA",
    description: "Khu shopping lớn. Giá nail cao, tip hậu. Chia 6/4 hoặc bao lương $1,400/tuần.",
    weekly_pay: true,
    contact_info: {
      phone: "(909) 997-9953"
    },
    created_at: new Date().toISOString()
  },
  {
    id: "13",
    title: "CẦN THỢ BỘT + DIP",
    company: "Charlotte Nails",
    location: "Charlotte, NC",
    description: "Thu nhập ổn định. Môi trường vui vẻ, sạch sẽ.",
    specialties: ["Powder", "Dip"],
    contact_info: {
      phone: "980-267-5013"
    },
    created_at: new Date().toISOString()
  },
  {
    id: "14",
    title: "CẦN SANG TIỆM NAIL",
    company: "Kennesaw Nail Spa",
    location: "Kennesaw, GA",
    description: "10 ghế, 10 bàn. Income $28K/tháng.",
    for_sale: true,
    contact_info: {},
    created_at: new Date().toISOString()
  },
  {
    id: "15",
    title: "LUXE NAIL BAR HIRING",
    company: "Luxe Nail Bar",
    location: "San Antonio, TX",
    description: "Cần thợ everything hoặc tay chân nước. Giá cao, tip nhiều.",
    contact_info: {
      owner_name: "Phillip",
      phone: "(412) 251-1778"
    },
    created_at: new Date().toISOString()
  }
];

const SalonJobListingsShowcase = () => {
  const navigate = useNavigate();

  const handleViewDetails = async (job: Job): Promise<boolean> => {
    // Always navigate to the specific opportunity detail page using the job's ID
    navigate(`/opportunities/${job.id}`);
    return true;
  };

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
          {salonListings.slice(0, 6).map((listing, index) => (
            <AuthAction
              key={listing.id}
              onAction={() => handleViewDetails(listing)}
              redirectPath={`/opportunities/${listing.id}`}
            >
              <OpportunityCard 
                listing={listing}
                index={index}
              />
            </AuthAction>
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
