
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, DollarSign, Eye, Lock } from 'lucide-react';
import { useAuth } from '@/context/auth';
import AuthAction from '@/components/common/AuthAction';

const vietnameseNailJobs = [
  {
    id: "vn-job-1",
    title: "Tìm Thợ Nails – Great Falls, MT",
    description: "Magic Nails cần thợ biết làm bột và tay chân nước.",
    location: "Great Falls, MT",
    phone: "(406) 770-3070",
    salary: "$1,200–$1,500/tuần",
    image: "/lovable-uploads/94ea5644-26ac-4862-a6fc-b5b4c5c1fbb5.png"
  },
  {
    id: "vn-job-2",
    title: "Tìm Thợ Nails – Clawson, MI",
    description: "Cần thợ nail có kinh nghiệm làm bột, dip và gel-x. Không cần giỏi design, chỉ cần tay nghề tốt.",
    location: "Clawson, MI 48017",
    details: "Khách chủ yếu là Mỹ trắng, lịch sự, tip hậu.",
    phone: "(248) 403-6472 | (248) 525-9911",
    salary: "$1,200–$1,800/tuần",
    image: "/lovable-uploads/c288ca24-3a79-470f-8bc8-c3abf5371fc1.png"
  },
  {
    id: "vn-job-3",
    title: "Tìm Thợ Nails – Humble, TX (Milano Nail Spa)",
    description: "Tiệm lớn nhất khu 77346. Tuyển thợ bột chuyên design >$2,000/tuần.",
    details: "Receptionist $150/ngày, 60 người đang làm.",
    location: "6947 FM 1960 Rd E, Humble, TX",
    phone: "(346) 398-6868 (gặp Nhi)",
    salary: ">$2,000/tuần",
    image: "/lovable-uploads/9a7898e7-739c-4a79-8705-70090e25c10b.png"
  },
  {
    id: "vn-job-4",
    title: "Tìm Thợ Nails – South Lake Tahoe, CA",
    description: "Cần đồng đội làm CTN hoặc everything. Tip cao.",
    details: "Ưu tiên biết tiếng Anh, khỏe mạnh.",
    location: "South Lake Tahoe, CA",
    phone: "(916) 802-1922",
    salary: "$1,600–$2,500+/tuần + Tip $3,000+/tháng",
    image: "/lovable-uploads/89ef4a43-b461-47fc-8b2d-97b07318a891.png"
  },
  {
    id: "vn-job-5",
    title: "Tìm Thợ Nails – Killeen, TX",
    description: "Tiệm lớn, khách đông, làm giá cao, tip nhiều.",
    location: "Killeen, TX",
    phone: "(512) 540-6173 | (806) 777-0526 (Johnny / Hannah)",
    salary: "$1,500+/tuần chưa kể tip",
    image: "/lovable-uploads/f7a3749b-6384-4899-a706-0aeb8685f51b.png"
  }
];

const vietnameseSalons = [
  {
    id: "vn-salon-1",
    title: "Sang Tiệm Nail – Arlington TX",
    description: "Bao khách, chủ đi định cư, thu nhập tốt",
    location: "Arlington, TX",
    phone: "(817) 111-1111",
    image: "/lovable-uploads/79cf9064-5740-4752-9ad6-9b7e9b4db31e.png"
  },
  {
    id: "vn-salon-2",
    title: "Bán Tiệm Nail – Garland TX",
    description: "Giá mềm, bao đồ nghề, sẵn khách",
    location: "Garland, TX",
    phone: "(972) 222-2222",
    image: "/lovable-uploads/94ea5644-26ac-4862-a6fc-b5b4c5c1fbb5.png"
  },
  {
    id: "vn-salon-3",
    title: "Tiệm Sang Gấp – Grand Prairie",
    description: "Vào làm ngay, tiệm sạch, khu ổn định",
    location: "Grand Prairie, TX",
    phone: "(682) 333-3333",
    image: "/lovable-uploads/c288ca24-3a79-470f-8bc8-c3abf5371fc1.png"
  },
  {
    id: "vn-salon-4",
    title: "Sang Tiệm Ở Plano – Bao Đẹp",
    description: "Chủ cần chuyển tiểu bang, tiệm 4 bàn, 6 ghế",
    location: "Plano, TX",
    phone: "(469) 444-4444",
    image: "/lovable-uploads/9a7898e7-739c-4a79-8705-70090e25c10b.png"
  },
  {
    id: "vn-salon-5",
    title: "Tiệm Gần Downtown Houston – Sang Lại",
    description: "Giá tốt, decor đẹp, đầy đủ dụng cụ",
    location: "Houston, TX",
    phone: "(832) 555-5555",
    image: "/lovable-uploads/89ef4a43-b461-47fc-8b2d-97b07318a891.png"
  }
];

const NailListingsSection: React.FC = () => {
  const { isSignedIn } = useAuth();
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Vietnamese Nail Jobs Row */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-playfair font-bold text-center mb-2">
              Vietnamese Nail Jobs
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
              Cơ hội việc làm cho thợ nail người Việt
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {vietnameseNailJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="relative aspect-video bg-gray-100">
                    <img
                      src={job.image}
                      alt={job.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-100 rounded-full">
                        Nail Job
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                      {job.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {job.description}
                    </p>

                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      <span>{job.location}</span>
                    </div>

                    {isSignedIn ? (
                      <>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <Phone className="h-4 w-4 mr-1 text-gray-400" />
                          <span>{job.phone}</span>
                        </div>

                        <div className="flex items-center text-sm text-green-600 font-medium mb-4">
                          <DollarSign className="h-4 w-4 mr-1" />
                          <span>{job.salary}</span>
                        </div>

                        {job.details && (
                          <p className="text-sm text-gray-600 italic mb-4">
                            {job.details}
                          </p>
                        )}
                      </>
                    ) : (
                      <div className="flex items-center text-sm text-pink-600 mb-4">
                        <Lock className="h-4 w-4 mr-1" />
                        <span>Đăng nhập để xem thông tin liên hệ</span>
                      </div>
                    )}

                    <div className="mt-auto pt-2">
                      <AuthAction
                        onAction={() => true}
                        redirectPath={`/jobs`}
                        customTitle="Đăng nhập để xem chi tiết"
                        creditMessage="Tạo tài khoản miễn phí để xem thông tin liên hệ."
                      >
                        <Link to="/jobs">
                          <Button variant="default" className="w-full flex items-center justify-center gap-1">
                            <Eye className="h-4 w-4" />
                            Xem Chi Tiết
                          </Button>
                        </Link>
                      </AuthAction>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to="/jobs">
              <Button variant="outline" size="lg">
                Xem Tất Cả Việc Làm Nail
              </Button>
            </Link>
          </div>
        </div>

        {/* Vietnamese Salons for Sale Row */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-playfair font-bold text-center mb-2">
              Vietnamese Nail Salons For Sale
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
              Các cơ hội mua tiệm nail đang được rao bán
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {vietnameseSalons.map((salon, index) => (
              <motion.div
                key={salon.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="relative aspect-video bg-gray-100">
                    <img
                      src={salon.image}
                      alt={salon.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 rounded-full">
                        Nail Salon
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                      {salon.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {salon.description}
                    </p>

                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      <span>{salon.location}</span>
                    </div>

                    {isSignedIn ? (
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <Phone className="h-4 w-4 mr-1 text-gray-400" />
                        <span>{salon.phone}</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-sm text-pink-600 mb-4">
                        <Lock className="h-4 w-4 mr-1" />
                        <span>Đăng nhập để xem thông tin liên hệ</span>
                      </div>
                    )}

                    <div className="mt-auto pt-2">
                      <AuthAction
                        onAction={() => true}
                        redirectPath={`/salons`}
                        customTitle="Đăng nhập để xem chi tiết"
                        creditMessage="Tạo tài khoản miễn phí để xem thông tin liên hệ."
                      >
                        <Link to="/salons">
                          <Button variant="default" className="w-full flex items-center justify-center gap-1">
                            <Eye className="h-4 w-4" />
                            Xem Chi Tiết
                          </Button>
                        </Link>
                      </AuthAction>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to="/salons">
              <Button variant="outline" size="lg">
                Xem Tất Cả Tiệm Nail Đang Bán
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NailListingsSection;
