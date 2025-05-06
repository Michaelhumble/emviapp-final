
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
import { makeupStudioImages, cardDestinations } from '@/utils/beautyExchangeImages';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

const MakeupListingsSection: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSession();
  
  // Vietnamese nail job listing content
  const vietnameseJobListings = [
    {
      title: "Tìm Thợ Nails Tất Cả – Great Falls, MT",
      salary: "$1,200–$1,500/tuần",
      description: "Magic Nails cần thợ biết làm bột và tay chân nước. Great Falls, MT. (406) 770-3070"
    },
    {
      title: "Tuyển Thợ Nail – Clawson, MI",
      salary: "$1,200–$1,800/tuần",
      description: "Tiệm nhỏ, khu Mỹ trắng, tip hậu. Cần thợ làm bột, dip, gel-x. (248) 403-6472"
    },
    {
      title: "Thợ Nail Design – Humble, TX (Milano Nail Spa)",
      salary: ">$2,000/tuần",
      description: "Tiệm lớn nhất khu vực, tuyển thợ bột design. Receptionist $150/ngày. (346) 398-6868"
    },
    {
      title: "Tuyển Thợ Nail – South Lake Tahoe, CA",
      salary: "$1,600–$2,500+/tuần",
      description: "Tiệm dễ thương, khách du lịch chịu chi. Ưu tiên biết tiếng Anh. (916) 802-1922"
    },
    {
      title: "Cần Thợ Nail – Killeen, TX",
      salary: "$1,500+/tuần",
      description: "Tiệm lớn, giá cao, tip tốt. Gặp Johnny/Hannah: (512) 540-6173"
    }
  ];
  
  const handleCardClick = (destinationPath: string) => {
    return async () => {
      return true; // Return true to allow navigation after auth
    };
  };

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-gray-900">
            Premium Makeup Spaces
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {makeupStudioImages.map((imageSrc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="h-full"
            >
              <AuthAction
                onAction={handleCardClick(cardDestinations.makeup[index].path)}
                redirectPath={cardDestinations.makeup[index].path}
                customTitle="Sign in to view listing details"
                fallbackContent={
                  <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                      <ImageWithFallback 
                        src={imageSrc} 
                        alt={`Makeup Studio ${index + 1}`} 
                        className="w-full h-full object-cover"
                        category="makeup"
                      />
                    </div>
                    
                    <CardContent className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold mb-1">
                        {vietnameseJobListings[index].title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 font-bold mb-2">
                        💰 {vietnameseJobListings[index].salary}
                      </p>
                      
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                        {vietnameseJobListings[index].description}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                        <Badge className="bg-white text-black hover:bg-white rounded-full border border-amber-300">
                          Nail
                        </Badge>

                        <Button size="sm" variant="outline" className="gap-1">
                          <Eye className="h-3.5 w-3.5" /> Xem Chi Tiết
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                }
                authenticatedContent={
                  <ValidatedLink 
                    to={cardDestinations.makeup[index].path}
                    listingId={cardDestinations.makeup[index].id}
                    listingType={cardDestinations.makeup[index].type as "salon" | "job"}
                    className="no-underline block h-full"
                  >
                    <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                        <ImageWithFallback 
                          src={imageSrc} 
                          alt={`Makeup Studio ${index + 1}`} 
                          className="w-full h-full object-cover"
                          category="makeup"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-pink-500 text-white hover:bg-pink-600 rounded-full text-xs">
                            ★ FEATURED
                          </Badge>
                        </div>
                      </div>
                      
                      <CardContent className="p-5 flex flex-col flex-grow">
                        <h3 className="text-lg font-semibold mb-1">
                          {vietnameseJobListings[index].title}
                        </h3>
                        
                        <p className="text-sm text-gray-600 font-bold mb-2">
                          💰 {vietnameseJobListings[index].salary}
                        </p>
                        
                        <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                          {vietnameseJobListings[index].description}
                        </p>
                        
                        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                          <Badge className="bg-white text-black hover:bg-white rounded-full border border-amber-300">
                            Nail
                          </Badge>

                          <Button size="sm" variant="outline" className="gap-1">
                            <Eye className="h-3.5 w-3.5" /> Xem Chi Tiết
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

export default MakeupListingsSection;
