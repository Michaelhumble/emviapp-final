
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Store } from 'lucide-react';
import { motion } from 'framer-motion';
import AuthAction from '@/components/common/AuthAction';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

const salonSaleListings = [
  {
    id: 'v-sale-1',
    title: 'Bán tiệm nail ở Garland TX — Giá mềm, khách ổn định',
    description: 'Tiệm không còn người trông coi, cần sang lại gấp. Bao gồm đồ nghề, chỗ ở và danh sách khách quen.',
    imageIndex: 1
  },
  {
    id: 'v-sale-2',
    title: 'Sang tiệm nail Arlington TX — Bao khách, có chỗ ở',
    description: 'Tiệm có sẵn khách, cần người làm hoặc sang lại. Chủ đi định cư nước ngoài. Thu nhập tốt.',
    imageIndex: 2
  },
  {
    id: 'v-sale-3',
    title: 'Sang tiệm nail tại Houston, TX — Full set up, bao rẻ',
    description: 'Tiệm rộng rãi, décor đẹp, gần khu đông người Việt. Giá sang mềm cho người có thiện chí.',
    imageIndex: 3
  },
  {
    id: 'v-sale-4',
    title: 'Bán tiệm nail trong mall ở Dallas — Bao luôn khách & thợ',
    description: 'Tiệm nằm trong mall lớn, có lượng khách ổn định. Bao luôn đội thợ hiện tại nếu muốn giữ lại.',
    imageIndex: 4
  },
  {
    id: 'v-sale-5',
    title: 'Sang tiệm nail nhỏ gọn, đầy đủ đồ nghề — Grand Prairie, TX',
    description: 'Tiệm phù hợp cho người mới bắt đầu. Giá mềm, trang thiết bị đầy đủ, vào là làm ngay.',
    imageIndex: 5
  }
];

// List of existing nail salon images to cycle through
const salonImages = [
  '/lovable-uploads/4bc7eaab-8b8b-4b00-a4bb-6ea3b6deb483.png',
  '/lovable-uploads/fe0bd314-25aa-4296-bf38-80dddf69b992.png',
  '/lovable-uploads/1aa3efa7-8ea4-4815-91db-85a50b204ded.png',
  '/lovable-uploads/f575cfa2-98b5-4a1e-910c-acbc69a3736d.png',
  '/lovable-uploads/5af131ca-038f-40e6-892a-502d1e822395.png'
];

const VietnameseSalonSalesSection: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col text-center items-center justify-center mb-10">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-3">
            Sang Tiệm Nail - Featured
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {salonSaleListings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <ImageWithFallback
                    src={salonImages[index % salonImages.length]}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                    businessName="Nail Salon"
                  />
                  <Badge className="absolute top-3 left-3 bg-amber-100 text-amber-800 flex items-center gap-1">
                    <span className="text-amber-600">★</span> Featured
                  </Badge>
                </div>
                
                <CardContent className="p-5">
                  <h3 className="font-playfair font-semibold text-lg mb-2">{listing.title}</h3>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">Texas</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-3 font-inter mb-4">
                    {listing.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline" className="text-xs">Nail</Badge>
                    <Badge variant="outline" className="text-xs">Jobs</Badge>
                  </div>
                  
                  <AuthAction
                    onAction={() => true}
                    redirectPath="/jobs"
                    customTitle="Đăng ký để xem chi tiết"
                  >
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center justify-center gap-1"
                    >
                      <Store className="h-4 w-4" />
                      Xem Chi Tiết
                    </Button>
                  </AuthAction>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VietnameseSalonSalesSection;
