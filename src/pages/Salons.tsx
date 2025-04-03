
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, DollarSign, Users, Building, Star, Calendar } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import SalonListings from "@/components/salons/SalonListings";
import { Job } from "@/types/job";

// Hiring salons data (jobs)
const hiringSalons = [
  {
    id: "1",
    name: "Luxury Nails & Spa",
    location: "Houston, TX",
    jobTitle: {
      vi: "Cần thợ gấp",
      en: "Nail Tech Needed ASAP"
    },
    salary: "$800-1200/week",
    features: ["Weekly Pay", "Tips", "Bao Lương Nếu Cần"],
    phone: "(713) 555-1234",
    image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG5haWwlMjBzYWxvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: "2",
    name: "Diamond Nails",
    location: "Dallas, TX",
    jobTitle: {
      vi: "Tuyển thợ bột",
      en: "Seeking Powder Specialist"
    },
    salary: "$1000-1500/week",
    features: ["Full-Time", "Tips"],
    phone: "(214) 555-2345",
    image: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG5haWwlMjBzYWxvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: "3",
    name: "Queen Nails",
    location: "San Jose, CA",
    jobTitle: {
      vi: "Cần thợ nail",
      en: "Nail Technician Position"
    },
    salary: "Call for salary",
    features: ["Weekly Pay", "Bao Lương Nếu Cần"],
    phone: "(408) 555-3456",
    image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5haWwlMjBzYWxvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: "4",
    name: "Crystal Spa & Nails",
    location: "Atlanta, GA",
    jobTitle: {
      vi: "Tuyển thợ có kinh nghiệm",
      en: "Experienced Nail Tech Wanted"
    },
    salary: "$900-1400/week",
    features: ["Full-Time", "Tips"],
    phone: "(404) 555-4567",
    image: "https://images.unsplash.com/photo-1613966802194-d46a163af70c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fG5haWwlMjBzYWxvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
  }
];

// Enhanced salons for sale data
const salonsForSale: Job[] = [
  {
    id: "101",
    created_at: new Date().toISOString(),
    title: "Salon for Sale",
    company: "Elite Nails & Spa",
    location: "Orlando, FL",
    user_id: "sample-user-1",
    asking_price: "$120,000",
    monthly_rent: "$3,500/month",
    number_of_stations: 6,
    number_of_chairs: 8,
    square_feet: "1,800",
    revenue: "$28,000/month",
    salon_features: ["10 Years Established", "High Traffic Area", "Full Equipment"],
    vietnamese_description: "Tiệm rộng 1800sf, 6 ghế nail, 6 ghế spa pedicure. Tiệm đông khách, khu Mỹ trắng, income cao.",
    description: "1800sf salon, 6 nail stations, 6 spa pedicure chairs. Busy salon in upscale area with high income.",
    contact_info: {
      phone: "(407) 555-6789",
      email: "contact@elitespa.com"
    },
    has_housing: true,
    has_wax_room: true,
    has_dining_room: true,
    has_laundry: true,
    owner_will_train: true,
    reason_for_selling: "Về hưu / Retirement",
    image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bmFpbCUyMHNhbG9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    emvi_ai_boosted: true
  },
  {
    id: "102",
    created_at: new Date().toISOString(),
    title: "Salon for Sale",
    company: "Golden Nails",
    location: "San Diego, CA",
    user_id: "sample-user-2",
    asking_price: "$180,000",
    monthly_rent: "$4,200/month",
    number_of_stations: 8,
    number_of_chairs: 10,
    square_feet: "2,200",
    revenue: "$35,000/month",
    salon_features: ["Prime Location", "Owner Will Train", "Loyal Customers"],
    vietnamese_description: "Tiệm đẹp khu Mỹ trắng, income ổn định. Chủ bán vì về hưu, sẽ training lại cho chủ mới.",
    description: "Beautiful salon in upscale area with stable income. Owner selling due to retirement, will train new owner.",
    contact_info: {
      phone: "(619) 555-7890",
      email: "info@goldennails.com"
    },
    has_housing: false,
    has_wax_room: true,
    has_dining_room: true,
    has_laundry: false,
    owner_will_train: true,
    reason_for_selling: "Chuyển tiểu bang / Moving",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmFpbCUyMHNhbG9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: "103",
    created_at: new Date().toISOString(),
    title: "Salon for Sale",
    company: "Serenity Nails & Spa",
    location: "Chicago, IL",
    user_id: "sample-user-3",
    asking_price: "$95,000",
    monthly_rent: "$3,800/month",
    number_of_stations: 5,
    number_of_chairs: 6,
    square_feet: "1,500",
    revenue: "$22,000/month",
    salon_features: ["New Equipment", "Near Shopping Center", "Parking Available"],
    vietnamese_description: "Tiệm vị trí đắc địa, gần trung tâm mua sắm lớn. Mới trang bị lại toàn bộ thiết bị.",
    description: "Salon in ideal location near major shopping center. Recently upgraded all equipment.",
    contact_info: {
      phone: "(312) 555-8901",
      email: "hello@serenitynails.com"
    },
    has_housing: true,
    has_wax_room: false,
    has_dining_room: false,
    has_laundry: true,
    owner_will_train: false,
    reason_for_selling: "Đổi ngành / Career change",
    image: "https://images.unsplash.com/photo-1604654894611-6973b376cbde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG5haWwlMjBzYWxvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: "104",
    created_at: new Date().toISOString(),
    title: "Salon for Sale",
    company: "Bliss Nails",
    location: "Seattle, WA",
    user_id: "sample-user-4",
    asking_price: "$155,000",
    monthly_rent: "$4,500/month",
    number_of_stations: 7,
    number_of_chairs: 9,
    square_feet: "1,900",
    revenue: "$32,000/month",
    salon_features: ["Established 12 Years", "Owner Retiring", "High-End Clientele"],
    vietnamese_description: "Tiệm cao cấp đã hoạt động 12 năm, khách hàng ổn định. Chủ bán vì về hưu.",
    description: "Upscale salon established for 12 years with stable clientele. Owner selling due to retirement.",
    contact_info: {
      phone: "(206) 555-9012",
      email: "info@blissnails.com"
    },
    has_housing: false,
    has_wax_room: true,
    has_dining_room: true,
    has_laundry: true,
    owner_will_train: true,
    reason_for_selling: "Về hưu / Retirement",
    image: "https://images.unsplash.com/photo-1610384104075-e05c8cf200c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fG5haWwlMjBzYWxvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: "105",
    created_at: new Date().toISOString(),
    title: "Salon for Sale",
    company: "Pearl Beauty & Nail Spa",
    location: "Miami, FL",
    user_id: "sample-user-5",
    asking_price: "$210,000",
    monthly_rent: "$5,200/month",
    number_of_stations: 10,
    number_of_chairs: 12,
    square_feet: "2,500",
    revenue: "$42,000/month",
    salon_features: ["Beach Location", "Luxury Clientele", "Full Service Spa"],
    vietnamese_description: "Tiệm spa cao cấp gần bãi biển, khách hàng giàu có. Đầy đủ dịch vụ spa.",
    description: "Luxury full-service spa near the beach with high-end clientele. Complete spa services available.",
    contact_info: {
      phone: "(305) 555-1234",
      email: "contact@pearlbeautyspa.com"
    },
    has_housing: false,
    has_wax_room: true,
    has_dining_room: true,
    has_laundry: true,
    owner_will_train: true,
    reason_for_selling: "Mở thêm chi nhánh mới / Opening new locations",
    image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5haWwlMjBzYWxvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    emvi_ai_boosted: true
  }
];

const Salons = () => {
  const [activeTab, setActiveTab] = useState("hiring");

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 bg-[#FDFDFD]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Tabs defaultValue="hiring" className="mb-12" onValueChange={setActiveTab}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <div>
                  <h1 className="text-3xl md:text-4xl font-serif mb-2">
                    {activeTab === "hiring" 
                      ? "Tiệm Đang Tuyển Thợ / Hiring Now"
                      : "Salon Nails Cần Bán / Salons For Sale"}
                  </h1>
                  <p className="text-gray-600">
                    {activeTab === "hiring"
                      ? "Tìm Việc Nail Lương Cao, Bao Lương Nếu Cần — Hơn 800+ tiệm đang cần thợ, đăng ký miễn phí."
                      : "Cơ Hội Đầu Tư Tốt Nhất — Giá từ $80,000 đến $300,000, chọn vị trí đẹp, tiệm có thợ, và thu nhập cao."}
                  </p>
                </div>
                
                <TabsList className="mt-4 sm:mt-0 bg-muted/30">
                  <TabsTrigger value="hiring" className="text-sm">Hiring Now</TabsTrigger>
                  <TabsTrigger value="forsale" className="text-sm">For Sale</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="hiring" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {hiringSalons.map((salon) => (
                    <motion.div
                      key={salon.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: Number(salon.id) * 0.1 }}
                    >
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                        <div 
                          className="h-48 bg-center bg-cover relative" 
                          style={{ backgroundImage: `url(${salon.image})` }}
                        >
                          <div className="absolute inset-0 bg-black/30"></div>
                        </div>
                        <CardContent className="p-5">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-bold text-lg line-clamp-1">{salon.name}</h3>
                            <Badge>{salon.salary}</Badge>
                          </div>
                          
                          <div className="mb-4">
                            <h4 className="text-primary font-medium">
                              {salon.jobTitle.vi} / {salon.jobTitle.en}
                            </h4>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>{salon.location}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {salon.features.map((feature, index) => (
                              <Badge key={index} variant="outline" className="bg-orange-50">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex justify-between mt-4">
                            <Button variant="outline" className="gap-1">
                              <Phone className="h-4 w-4" />
                              {salon.phone}
                            </Button>
                            <Button>
                              Message
                            </Button>
                          </div>
                          
                          <div className="text-xs text-center text-gray-500 mt-4 pt-2 border-t">
                            Want your ad seen nationwide? 
                            <Button variant="link" className="text-xs p-0 h-auto ml-1">Boost Ad</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-center mt-8">
                  <Button variant="outline" className="mr-2">Previous</Button>
                  <Button variant="outline">Next</Button>
                </div>
              </TabsContent>

              <TabsContent value="forsale" className="space-y-6">
                <SalonListings salonsForSale={salonsForSale} />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Salons;
