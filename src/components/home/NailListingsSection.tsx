
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

  // Vietnamese featured nail job listings
  const vietnameseNailJobs = [
    {
      id: 'vn-nail-001',
      title: 'Cần Thợ Biết Làm Bột, Bao Lương $1500/tuần',
      description: 'Tiệm Mỹ ở Chicago đang cần gấp thợ làm bột, chân tay nước. Làm full-time, khách đông, chủ dễ chịu.',
      price: '$1500/tuần',
      path: '/jobs/vn-nail-001',
      type: 'job'
    },
    {
      id: 'vn-nail-002',
      title: 'Cần Thợ Full Set Giỏi – Lương Cao',
      description: 'Khu LA, tiệm làm việc chuyên nghiệp, cần thợ giỏi làm full set, dip, gel. Lương từ $1,800 – $2,200/tuần.',
      price: '$1,800 – $2,200/tuần',
      path: '/jobs/vn-nail-002',
      type: 'job'
    },
    {
      id: 'vn-nail-003',
      title: 'Cần Gấp Thợ Có Kinh Nghiệm Làm Chân Tay Nước',
      description: 'Tiệm vùng Houston, cần 1 thợ chân tay nước có tay nghề, làm part-time hoặc full-time, lương tốt.',
      price: 'Lương tốt',
      path: '/jobs/vn-nail-003',
      type: 'job'
    },
    {
      id: 'vn-nail-004',
      title: 'Tìm Người Làm Nail Ở Vùng New Jersey',
      description: 'Bao lương $1,600/tuần, tip cao, khách ổn định. Ưu tiên biết làm bột và design đơn giản.',
      price: '$1,600/tuần',
      path: '/jobs/vn-nail-004',
      type: 'job'
    },
    {
      id: 'vn-nail-005',
      title: 'Tiệm Tại Orlando Cần Thợ Làm Dip Powder',
      description: 'Không cần quá giỏi, có training. Lương theo tay nghề. Làm trong mall, khách đi lại đông.',
      price: 'Theo tay nghề',
      path: '/jobs/vn-nail-005',
      type: 'job'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col text-center items-center justify-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-2">
            Nail Listings — Preview Spaces
          </h2>
          <p className="text-gray-600">
            Explore premium nail salon jobs and spaces. Listings opening soon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {vietnameseNailJobs.map((job, index) => (
            <motion.div
              key={`vn-job-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="h-full"
            >
              <AuthAction
                onAction={handleCardClick(job.path)}
                redirectPath={job.path}
                customTitle="Sign in to view listing details"
                fallbackContent={
                  <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                      <ImageWithFallback 
                        src={nailSalonImages[index % nailSalonImages.length]} 
                        alt={`Nail Job ${index + 1}`} 
                        className="w-full h-full object-cover"
                        category="nail"
                      />
                      <Badge className="absolute top-2 left-2 bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200">
                        ★ FEATURED
                      </Badge>
                    </div>
                    
                    <CardContent className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold mb-1">
                        {job.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        {job.price}
                      </p>
                      
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                        {job.description}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                        <Badge className="bg-white text-black hover:bg-white rounded-full">
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
                    to={job.path}
                    className="no-underline block h-full"
                    listingId={job.id}
                    listingType={job.type as "salon" | "job"}
                  >
                    <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                        <ImageWithFallback 
                          src={nailSalonImages[index % nailSalonImages.length]} 
                          alt={`Nail Job ${index + 1}`} 
                          className="w-full h-full object-cover"
                          category="nail"
                        />
                        <Badge className="absolute top-2 left-2 bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200">
                          ★ FEATURED
                        </Badge>
                      </div>
                      
                      <CardContent className="p-5 flex flex-col flex-grow">
                        <h3 className="text-lg font-semibold mb-1">
                          {job.title}
                        </h3>
                        
                        <p className="text-sm text-gray-600 mb-2">
                          {job.price}
                        </p>
                        
                        <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                          {job.description}
                        </p>
                        
                        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                          <Badge className="bg-white text-black hover:bg-white rounded-full">
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
                    className="no-underline block h-full"
                    listingId={cardDestinations.nail[index].id}
                    listingType={cardDestinations.nail[index].type as "salon" | "job"}
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
