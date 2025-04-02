
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, DollarSign, Users, Building, Star, Calendar } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Hiring salons data (jobs)
const hiringSalons = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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

// Salons for sale data
const salonsForSale = [
  {
    id: 101,
    name: "Elite Nails & Spa",
    location: "Orlando, FL",
    price: "$120,000",
    rent: "$3,500/month",
    staff: 6,
    revenue: "$28,000/month",
    features: ["10 Years Established", "High Traffic Area", "Full Equipment"],
    description: {
      vi: "Tiệm rộng 1800sf, 6 ghế nail, 6 ghế spa pedicure. Tiệm đông khách, khu Mỹ trắng, income cao.",
      en: "1800sf salon, 6 nail stations, 6 spa pedicure chairs. Busy salon in upscale area with high income."
    },
    phone: "(407) 555-6789",
    image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bmFpbCUyMHNhbG9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: 102,
    name: "Golden Nails",
    location: "San Diego, CA",
    price: "$180,000",
    rent: "$4,200/month",
    staff: 8,
    revenue: "$35,000/month",
    features: ["Prime Location", "Owner Will Train", "Loyal Customers"],
    description: {
      vi: "Tiệm đẹp khu Mỹ trắng, income ổn định. Chủ bán vì về hưu, sẽ training lại cho chủ mới.",
      en: "Beautiful salon in upscale area with stable income. Owner selling due to retirement, will train new owner."
    },
    phone: "(619) 555-7890",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmFpbCUyMHNhbG9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: 103,
    name: "Serenity Nails & Spa",
    location: "Chicago, IL",
    price: "$95,000",
    rent: "$3,800/month",
    staff: 5,
    revenue: "$22,000/month",
    features: ["New Equipment", "Near Shopping Center", "Parking Available"],
    description: {
      vi: "Tiệm vị trí đắc địa, gần trung tâm mua sắm lớn. Mới trang bị lại toàn bộ thiết bị.",
      en: "Salon in ideal location near major shopping center. Recently upgraded all equipment."
    },
    phone: "(312) 555-8901",
    image: "https://images.unsplash.com/photo-1604654894611-6973b376cbde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG5haWwlMjBzYWxvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
  },
  {
    id: 104,
    name: "Bliss Nails",
    location: "Seattle, WA",
    price: "$155,000",
    rent: "$4,500/month",
    staff: 7,
    revenue: "$32,000/month",
    features: ["Established 12 Years", "Owner Retiring", "High-End Clientele"],
    description: {
      vi: "Tiệm cao cấp đã hoạt động 12 năm, khách hàng ổn định. Chủ bán vì về hưu.",
      en: "Upscale salon established for 12 years with stable clientele. Owner selling due to retirement."
    },
    phone: "(206) 555-9012",
    image: "https://images.unsplash.com/photo-1610384104075-e05c8cf200c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fG5haWwlMjBzYWxvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
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
                      transition={{ duration: 0.3, delay: salon.id * 0.1 }}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {salonsForSale.map((salon) => (
                    <motion.div
                      key={salon.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: (salon.id - 100) * 0.1 }}
                    >
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                        <div 
                          className="h-56 bg-center bg-cover relative" 
                          style={{ backgroundImage: `url(${salon.image})` }}
                        >
                          <div className="absolute inset-0 bg-black/30 flex items-end">
                            <div className="p-4 w-full">
                              <Badge className="bg-primary/90 hover:bg-primary text-white text-lg py-1 px-3">
                                {salon.price}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <CardContent className="p-5">
                          <div className="mb-3">
                            <h3 className="font-bold text-lg">{salon.name}</h3>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>{salon.location}</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="flex items-center text-sm">
                              <Building className="w-4 h-4 mr-2 text-gray-500" />
                              <span>Rent: {salon.rent}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Users className="w-4 h-4 mr-2 text-gray-500" />
                              <span>{salon.staff} Staff</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                              <span>Rev: {salon.revenue}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                              <span>Available Now</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {salon.features.map((feature, index) => (
                              <Badge key={index} variant="outline" className="bg-purple-50">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="mt-3 mb-4 text-sm border-l-2 border-primary pl-3 italic">
                            <p className="mb-1">{salon.description.vi}</p>
                            <p className="text-gray-600">{salon.description.en}</p>
                          </div>
                          
                          <div className="flex justify-between mt-4">
                            <Button variant="outline" className="gap-1">
                              <Phone className="h-4 w-4" />
                              {salon.phone}
                            </Button>
                            <Button>
                              View Details
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
            </Tabs>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Salons;
