
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

const NailListingsSection: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSession();
  
  const handleCardClick = (destinationPath: string) => {
    return async () => {
      return true; // Return true to allow navigation after auth
    };
  };

  const nailCardData = [
    {
      title: "Tìm Thợ Nails Magic Nails– Great Falls, MT",
      salary: "$1,200–$1,500/tuần",
      description: "Magic Nails cần thợ biết làm bột và tay chân nước.",
      location: "Great Falls, MT"
    },
    {
      title: "Tuyển Thợ Nail – Clawson, MI",
      salary: "$1,200–$1,800/tuần",
      description: "Tiệm nhỏ, khu Mỹ trắng, tip hậu. Cần thợ làm bột, dip, gel-x.",
      location: "Clawson, MI"
    },
    {
      title: "Thợ Nail Design – Humble, TX (Milano Nail Spa)",
      salary: ">$2,000/tuần",
      description: "Tiệm lớn nhất khu vực, tuyển thợ bột design. Receptionist $150/ngày.",
      location: "Humble, TX"
    },
    {
      title: "Tuyển Thợ Nail – South Lake Tahoe, CA",
      salary: "$1,600–$2,500+/tuần",
      description: "Tiệm dễ thương, khách du lịch chịu chi. Ưu tiên biết tiếng Anh.",
      location: "South Lake Tahoe, CA"
    },
    {
      title: "Cần Thợ Nail – Killeen, TX",
      salary: "$1,500+/tuần",
      description: "Tiệm lớn, giá cao, tip tốt. Gặp Johnny/Hannah.",
      location: "Killeen, TX"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col text-center items-center justify-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-2">
            Tin Tuyển Dụng Mới Nhất
          </h2>
          <p className="text-gray-600">
            Browse our curated selection of job opportunities
          </p>
        </div>
        
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
                customTitle="Sign in to view job details"
                fallbackContent={
                  <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                      <ImageWithFallback 
                        src={imageSrc} 
                        alt={`Nail Salon ${index + 1}`} 
                        className="w-full h-full object-cover"
                        category="nail"
                      />
                      <Badge className="absolute top-2 left-2 bg-orange-400 hover:bg-orange-500 text-white">
                        ★ FEATURED
                      </Badge>
                    </div>
                    
                    <CardContent className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold mb-1">
                        {nailCardData[index].title}
                      </h3>
                      
                      <p className="text-sm font-bold text-gray-800 mb-2">
                        💰 {nailCardData[index].salary}
                      </p>
                      
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                        {nailCardData[index].description}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">📍{nailCardData[index].location}</span>
                          <span className="text-xs text-gray-500">🔒 Sign in to view contact info</span>
                        </div>

                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="gap-1 bg-[#9B51E0] text-white hover:bg-[#8A46C7]"
                        >
                          Xem Chi Tiết
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
                          alt={`Nail Salon ${index + 1}`} 
                          className="w-full h-full object-cover"
                          category="nail"
                        />
                        <Badge className="absolute top-2 left-2 bg-orange-400 hover:bg-orange-500 text-white">
                          ★ FEATURED
                        </Badge>
                      </div>
                      
                      <CardContent className="p-5 flex flex-col flex-grow">
                        <h3 className="text-lg font-semibold mb-1">
                          {nailCardData[index].title}
                        </h3>
                        
                        <p className="text-sm font-bold text-gray-800 mb-2">
                          💰 {nailCardData[index].salary}
                        </p>
                        
                        <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                          {nailCardData[index].description}
                        </p>
                        
                        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500">📍{nailCardData[index].location}</span>
                            <span className="text-xs text-gray-500">🔒 Sign in to view contact info</span>
                          </div>

                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="gap-1 bg-[#9B51E0] text-white hover:bg-[#8A46C7]"
                          >
                            Xem Chi Tiết
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
