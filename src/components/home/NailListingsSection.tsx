
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import ValidatedLink from '@/components/common/ValidatedLink';
import AuthAction from '@/components/common/AuthAction';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/context/auth/hooks/useSession';
import { nailSalonImages, cardDestinations } from '@/utils/beautyExchangeImages';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface VietnameseNailListing {
  id: string;
  title: string;
  description: string;
  isExpired?: boolean;
  imageSrc: string;
}

const NailListingsSection: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSession();
  
  const handleCardClick = (destinationPath: string) => {
    return async () => {
      return true; // Return true to allow navigation after auth
    };
  };

  // Featured Vietnamese nail listings with existing EmviApp images
  const vietnameseNailListings: VietnameseNailListing[] = [
    {
      id: "vn-nail-1",
      title: "Tuyển thợ nail biết làm everything 💅 tại Fort Worth, TX",
      description: "Tiệm lớn, đông khách, cần thợ full-time. Bao lương $1000/tuần + tip cao. Có chỗ ở riêng, chủ dễ thương.",
      imageSrc: "/lovable-uploads/17e65a2b-10a7-4b2a-a839-340a80da6903.png",
      isExpired: false
    },
    {
      id: "vn-nail-2",
      title: "Cần gấp thợ bột và chân tay nước – Houston",
      description: "Bao lương $1200/tuần, làm 6 ngày, có chỗ ở, tip hậu. Tiệm khách sang, chủ dễ thương, không drama.",
      imageSrc: "/lovable-uploads/0d50d1e2-4ac5-4520-8d66-dffc59da9302.png",
      isExpired: false
    },
    {
      id: "vn-nail-3",
      title: "Bán tiệm nail ở Garland TX — Giá mềm, khách ổn định",
      description: "Không còn người trông coi, cần sang lại gấp. Bao gồm đồ nghề, chỗ ở và danh sách khách hàng trung thành.",
      imageSrc: "/lovable-uploads/b4f26c5f-97b6-4a68-9acf-1b370937ef1a.png",
      isExpired: true
    },
    {
      id: "vn-nail-4",
      title: "Salon lớn ở Plano cần 2 thợ nữ làm đủ everything",
      description: "Môi trường chuyên nghiệp, khách sang, chủ dễ. Bao lương $1100 - $1300/tuần. Cần người ổn định.",
      imageSrc: "/lovable-uploads/323c0530-2a0b-45ee-9065-646dee476f89.png",
      isExpired: false
    },
    {
      id: "vn-nail-5",
      title: "Sang tiệm nail Arlington TX — Bao lương và tip cao",
      description: "Tiệm có sẵn khách, cần người làm hoặc sang lại. Chủ đi định cư nước ngoài. Thu nhập tốt.",
      imageSrc: "/lovable-uploads/a59ea036-184e-4057-b4ba-8a0f2ab2c365.png",
      isExpired: false
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col text-center items-center justify-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-2">
            Nail Listings — Tin Nail Mới
          </h2>
          <p className="text-gray-600">
            Explore premium nail salon jobs and spaces
          </p>
        </div>
        
        {/* Featured Vietnamese Nail Listings */}
        <div className="mb-12">
          <h3 className="text-lg font-medium text-amber-700 mb-6 flex items-center">
            <span className="inline-block w-1.5 h-4 bg-amber-500 mr-2"></span>
            Tin Tuyển Dụng Thợ Nail - Featured
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {vietnameseNailListings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="h-full"
              >
                <AuthAction
                  onAction={handleCardClick("/jobs")}
                  redirectPath="/jobs"
                  customTitle="Đăng nhập để xem chi tiết"
                  creditMessage="Tạo tài khoản miễn phí để xem thông tin liên hệ và chi tiết."
                >
                  <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                      <ImageWithFallback 
                        src={listing.imageSrc} 
                        alt={listing.title} 
                        className="w-full h-full object-cover"
                        category="nail"
                      />
                      
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-amber-500 text-white hover:bg-amber-600">
                          ★ Featured
                        </Badge>
                      </div>
                      
                      {listing.isExpired && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-gray-500 text-white">
                            Đã hết hạn
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <CardContent className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold mb-1 line-clamp-2">
                        {listing.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 line-clamp-3 font-inter mb-4 flex-grow">
                        {listing.description}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                        <Badge className="bg-white text-black hover:bg-white rounded-full">
                          Nail Jobs
                        </Badge>

                        <Button size="sm" variant="outline" className="gap-1">
                          <Eye className="h-3.5 w-3.5" /> Xem Chi Tiết
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </AuthAction>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Original Nail Studio Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {nailSalonImages.map((imageSrc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="h-full"
            >
              <AuthAction
                onAction={handleCardClick(cardDestinations.nail[index].path)}
                redirectPath={cardDestinations.nail[index].path}
                customTitle="Sign in to view listing details"
                fallbackContent={
                  <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                      <ImageWithFallback 
                        src={imageSrc} 
                        alt={`Nail Studio ${index + 1}`} 
                        className="w-full h-full object-cover"
                        category="nail"
                      />
                    </div>
                    
                    <CardContent className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold mb-1">
                        Nail Studio {index + 1}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        Listing opening soon
                      </p>
                      
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                        Premium nail salon listing coming soon...
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                        <Badge className="bg-white text-black hover:bg-white rounded-full">
                          Coming Soon
                        </Badge>

                        <Button size="sm" variant="outline" className="gap-1">
                          <Eye className="h-3.5 w-3.5" /> More Info
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                }
                authenticatedContent={
                  <ValidatedLink 
                    to={cardDestinations.nail[index].path}
                    listingId={cardDestinations.nail[index].id}
                    listingType={cardDestinations.nail[index].type as "salon" | "job"}
                    className="no-underline block h-full"
                  >
                    <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                        <ImageWithFallback 
                          src={imageSrc} 
                          alt={`Nail Studio ${index + 1}`} 
                          className="w-full h-full object-cover"
                          category="nail"
                        />
                      </div>
                      
                      <CardContent className="p-5 flex flex-col flex-grow">
                        <h3 className="text-lg font-semibold mb-1">
                          Nail Studio {index + 1}
                        </h3>
                        
                        <p className="text-sm text-gray-600 mb-2">
                          Listing opening soon
                        </p>
                        
                        <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                          Premium nail salon listing coming soon...
                        </p>
                        
                        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                          <Badge className="bg-white text-black hover:bg-white rounded-full">
                            Coming Soon
                          </Badge>

                          <Button size="sm" variant="outline" className="gap-1">
                            <Eye className="h-3.5 w-3.5" /> View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </ValidatedLink>
                }
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NailListingsSection;
