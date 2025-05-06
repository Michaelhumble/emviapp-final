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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {/* First card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0 }}
            className="h-full"
          >
            <AuthAction
              onAction={handleCardClick(cardDestinations.nail[0].path)}
              redirectPath={cardDestinations.nail[0].path}
              customTitle="Sign in to view listing details"
              fallbackContent={
                <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                    <ImageWithFallback 
                      src={nailSalonImages[0]} 
                      alt="Nail Studio 1" 
                      className="w-full h-full object-cover"
                      category="nail"
                    />
                    <Badge className="absolute top-2 right-2 bg-amber-500 text-white hover:bg-amber-600">
                      ★ FEATURED
                    </Badge>
                  </div>
                  
                  <CardContent className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold mb-1">
                      Tìm Thợ Nails Magic Nails– Great Falls, MT
                    </h3>
                    
                    <p className="text-sm font-bold text-gray-800 mb-2">
                      💰 $1,200–$1,500/tuần
                    </p>
                    
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                      Magic Nails cần thợ biết làm bột và tay chân nước.
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-600">📍Great Falls, MT</span>
                        <span className="text-sm text-gray-500">🔒 Sign in to view contact info</span>
                      </div>

                      <Button size="sm" variant="outline" className="gap-1 bg-gradient-to-r from-pink-400 to-pink-600 text-white hover:from-pink-500 hover:to-pink-700 border-0">
                        Xem Chi Tiết
                      </Button>
                    </div>
                    <Badge className="mt-2 w-fit bg-white text-black hover:bg-white border border-gray-200">
                      Nail
                    </Badge>
                  </CardContent>
                </Card>
              }
              authenticatedContent={
                <ValidatedLink 
                  to={cardDestinations.nail[0].path}
                  listingId={cardDestinations.nail[0].id}
                  listingType={cardDestinations.nail[0].type as "salon" | "job"}
                  className="no-underline block h-full"
                >
                  <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                      <ImageWithFallback 
                        src={nailSalonImages[0]} 
                        alt="Nail Studio 1" 
                        className="w-full h-full object-cover"
                        category="nail"
                      />
                      <Badge className="absolute top-2 right-2 bg-amber-500 text-white hover:bg-amber-600">
                        ★ FEATURED
                      </Badge>
                    </div>
                    
                    <CardContent className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold mb-1">
                        Tìm Thợ Nails Magic Nails– Great Falls, MT
                      </h3>
                      
                      <p className="text-sm font-bold text-gray-800 mb-2">
                        💰 $1,200–$1,500/tuần
                      </p>
                      
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                        Magic Nails cần thợ biết làm bột và tay chân nước.
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-600">📍Great Falls, MT</span>
                          <span className="text-sm text-gray-500">🔒 Sign in to view contact info</span>
                        </div>

                        <Button size="sm" variant="outline" className="gap-1 bg-gradient-to-r from-pink-400 to-pink-600 text-white hover:from-pink-500 hover:to-pink-700 border-0">
                          Xem Chi Tiết
                        </Button>
                      </div>
                      <Badge className="mt-2 w-fit bg-white text-black hover:bg-white border border-gray-200">
                        Nail
                      </Badge>
                    </CardContent>
                  </Card>
                </ValidatedLink>
              }
            />
          </motion.div>

          {/* Second card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="h-full"
          >
            <AuthAction
              onAction={handleCardClick(cardDestinations.nail[1].path)}
              redirectPath={cardDestinations.nail[1].path}
              customTitle="Sign in to view listing details"
              fallbackContent={
                <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                    <ImageWithFallback 
                      src={nailSalonImages[1]} 
                      alt="Nail Studio 2" 
                      className="w-full h-full object-cover"
                      category="nail"
                    />
                    <Badge className="absolute top-2 right-2 bg-amber-500 text-white hover:bg-amber-600">
                      ★ FEATURED
                    </Badge>
                  </div>
                  
                  <CardContent className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold mb-1">
                      Tuyển Thợ Nail – Clawson, MI
                    </h3>
                    
                    <p className="text-sm font-bold text-gray-800 mb-2">
                      💰 $1,200–$1,800/tuần
                    </p>
                    
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                      Tiệm nhỏ, khu Mỹ trắng, tip hậu. Cần thợ làm bột, dip, gel-x.
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-600">📍Clawson, MI</span>
                        <span className="text-sm text-gray-500">🔒 Sign in to view contact info</span>
                      </div>

                      <Button size="sm" variant="outline" className="gap-1 bg-gradient-to-r from-pink-400 to-pink-600 text-white hover:from-pink-500 hover:to-pink-700 border-0">
                        Xem Chi Tiết
                      </Button>
                    </div>
                    <Badge className="mt-2 w-fit bg-white text-black hover:bg-white border border-gray-200">
                      Nail
                    </Badge>
                  </CardContent>
                </Card>
              }
              authenticatedContent={
                <ValidatedLink 
                  to={cardDestinations.nail[1].path}
                  listingId={cardDestinations.nail[1].id}
                  listingType={cardDestinations.nail[1].type as "salon" | "job"}
                  className="no-underline block h-full"
                >
                  <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                      <ImageWithFallback 
                        src={nailSalonImages[1]} 
                        alt="Nail Studio 2" 
                        className="w-full h-full object-cover"
                        category="nail"
                      />
                      <Badge className="absolute top-2 right-2 bg-amber-500 text-white hover:bg-amber-600">
                        ★ FEATURED
                      </Badge>
                    </div>
                    
                    <CardContent className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold mb-1">
                        Tuyển Thợ Nail – Clawson, MI
                      </h3>
                      
                      <p className="text-sm font-bold text-gray-800 mb-2">
                        💰 $1,200–$1,800/tuần
                      </p>
                      
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                        Tiệm nhỏ, khu Mỹ trắng, tip hậu. Cần thợ làm bột, dip, gel-x.
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-600">📍Clawson, MI</span>
                          <span className="text-sm text-gray-500">🔒 Sign in to view contact info</span>
                        </div>

                        <Button size="sm" variant="outline" className="gap-1 bg-gradient-to-r from-pink-400 to-pink-600 text-white hover:from-pink-500 hover:to-pink-700 border-0">
                          Xem Chi Tiết
                        </Button>
                      </div>
                      <Badge className="mt-2 w-fit bg-white text-black hover:bg-white border border-gray-200">
                        Nail
                      </Badge>
                    </CardContent>
                  </Card>
                </ValidatedLink>
              }
            />
          </motion.div>

          {/* Third card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="h-full"
          >
            <AuthAction
              onAction={handleCardClick(cardDestinations.nail[2].path)}
              redirectPath={cardDestinations.nail[2].path}
              customTitle="Sign in to view listing details"
              fallbackContent={
                <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                    <ImageWithFallback 
                      src={nailSalonImages[2]} 
                      alt="Nail Studio 3" 
                      className="w-full h-full object-cover"
                      category="nail"
                    />
                    <Badge className="absolute top-2 right-2 bg-amber-500 text-white hover:bg-amber-600">
                      ★ FEATURED
                    </Badge>
                  </div>
                  
                  <CardContent className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold mb-1">
                      Thợ Nail Design – Humble, TX (Milano Nail Spa)
                    </h3>
                    
                    <p className="text-sm font-bold text-gray-800 mb-2">
                      💰 >$2,000/tuần
                    </p>
                    
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                      Tiệm lớn nhất khu vực, tuyển thợ bột design. Receptionist $150/ngày.
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-600">📍Humble, TX</span>
                        <span className="text-sm text-gray-500">🔒 Sign in to view contact info</span>
                      </div>

                      <Button size="sm" variant="outline" className="gap-1 bg-gradient-to-r from-pink-400 to-pink-600 text-white hover:from-pink-500 hover:to-pink-700 border-0">
                        Xem Chi Tiết
                      </Button>
                    </div>
                    <Badge className="mt-2 w-fit bg-white text-black hover:bg-white border border-gray-200">
                      Nail
                    </Badge>
                  </CardContent>
                </Card>
              }
              authenticatedContent={
                <ValidatedLink 
                  to={cardDestinations.nail[2].path}
                  listingId={cardDestinations.nail[2].id}
                  listingType={cardDestinations.nail[2].type as "salon" | "job"}
                  className="no-underline block h-full"
                >
                  <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                      <ImageWithFallback 
                        src={nailSalonImages[2]} 
                        alt="Nail Studio 3" 
                        className="w-full h-full object-cover"
                        category="nail"
                      />
                      <Badge className="absolute top-2 right-2 bg-amber-500 text-white hover:bg-amber-600">
                        ★ FEATURED
                      </Badge>
                    </div>
                    
                    <CardContent className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold mb-1">
                        Thợ Nail Design – Humble, TX (Milano Nail Spa)
                      </h3>
                      
                      <p className="text-sm font-bold text-gray-800 mb-2">
                        💰 >$2,000/tuần
                      </p>
                      
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                        Tiệm lớn nhất khu vực, tuyển thợ bột design. Receptionist $150/ngày.
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-600">📍Humble, TX</span>
                          <span className="text-sm text-gray-500">🔒 Sign in to view contact info</span>
                        </div>

                        <Button size="sm" variant="outline" className="gap-1 bg-gradient-to-r from-pink-400 to-pink-600 text-white hover:from-pink-500 hover:to-pink-700 border-0">
                          Xem Chi Tiết
                        </Button>
                      </div>
                      <Badge className="mt-2 w-fit bg-white text-black hover:bg-white border border-gray-200">
                        Nail
                      </Badge>
                    </CardContent>
                  </Card>
                </ValidatedLink>
              }
            />
          </motion.div>

          {/* Fourth card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="h-full"
          >
            <AuthAction
              onAction={handleCardClick(cardDestinations.nail[3].path)}
              redirectPath={cardDestinations.nail[3].path}
              customTitle="Sign in to view listing details"
              fallbackContent={
                <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                    <ImageWithFallback 
                      src={nailSalonImages[3]} 
                      alt="Nail Studio 4" 
                      className="w-full h-full object-cover"
                      category="nail"
                    />
                    <Badge className="absolute top-2 right-2 bg-amber-500 text-white hover:bg-amber-600">
                      ★ FEATURED
                    </Badge>
                  </div>
                  
                  <CardContent className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold mb-1">
                      Tuyển Thợ Nail – South Lake Tahoe, CA
                    </h3>
                    
                    <p className="text-sm font-bold text-gray-800 mb-2">
                      💰 $1,600–$2,500+/tuần
                    </p>
                    
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                      Tiệm dễ thương, khách du lịch chịu chi. Ưu tiên biết tiếng Anh.
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-600">📍South Lake Tahoe, CA</span>
                        <span className="text-sm text-gray-500">🔒 Sign in to view contact info</span>
                      </div>

                      <Button size="sm" variant="outline" className="gap-1 bg-gradient-to-r from-pink-400 to-pink-600 text-white hover:from-pink-500 hover:to-pink-700 border-0">
                        Xem Chi Tiết
                      </Button>
                    </div>
                    <Badge className="mt-2 w-fit bg-white text-black hover:bg-white border border-gray-200">
                      Nail
                    </Badge>
                  </CardContent>
                </Card>
              }
              authenticatedContent={
                <ValidatedLink 
                  to={cardDestinations.nail[3].path}
                  listingId={cardDestinations.nail[3].id}
                  listingType={cardDestinations.nail[3].type as "salon" | "job"}
                  className="no-underline block h-full"
                >
                  <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                      <ImageWithFallback 
                        src={nailSalonImages[3]} 
                        alt="Nail Studio 4" 
                        className="w-full h-full object-cover"
                        category="nail"
                      />
                      <Badge className="absolute top-2 right-2 bg-amber-500 text-white hover:bg-amber-600">
                        ★ FEATURED
                      </Badge>
                    </div>
                    
                    <CardContent className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold mb-1">
                        Tuyển Thợ Nail – South Lake Tahoe, CA
                      </h3>
                      
                      <p className="text-sm font-bold text-gray-800 mb-2">
                        💰 $1,600–$2,500+/tuần
                      </p>
                      
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                        Tiệm dễ thương, khách du lịch chịu chi. Ưu tiên biết tiếng Anh.
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-600">📍South Lake Tahoe, CA</span>
                          <span className="text-sm text-gray-500">🔒 Sign in to view contact info</span>
                        </div>

                        <Button size="sm" variant="outline" className="gap-1 bg-gradient-to-r from-pink-400 to-pink-600 text-white hover:from-pink-500 hover:to-pink-700 border-0">
                          Xem Chi Tiết
                        </Button>
                      </div>
                      <Badge className="mt-2 w-fit bg-white text-black hover:bg-white border border-gray-200">
                        Nail
                      </Badge>
                    </CardContent>
                  </Card>
                </ValidatedLink>
              }
            />
          </motion.div>

          {/* Fifth card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="h-full"
          >
            <AuthAction
              onAction={handleCardClick(cardDestinations.nail[4].path)}
              redirectPath={cardDestinations.nail[4].path}
              customTitle="Sign in to view listing details"
              fallbackContent={
                <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                    <ImageWithFallback 
                      src={nailSalonImages[4]} 
                      alt="Nail Studio 5" 
                      className="w-full h-full object-cover"
                      category="nail"
                    />
                    <Badge className="absolute top-2 right-2 bg-amber-500 text-white hover:bg-amber-600">
                      ★ FEATURED
                    </Badge>
                  </div>
                  
                  <CardContent className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold mb-1">
                      Cần Thợ Nail – Killeen, TX
                    </h3>
                    
                    <p className="text-sm font-bold text-gray-800 mb-2">
                      💰 $1,500+/tuần
                    </p>
                    
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                      Tiệm lớn, giá cao, tip tốt. Gặp Johnny/Hannah.
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-600">📍Killeen, TX</span>
                        <span className="text-sm text-gray-500">🔒 Sign in to view contact info</span>
                      </div>

                      <Button size="sm" variant="outline" className="gap-1 bg-gradient-to-r from-pink-400 to-pink-600 text-white hover:from-pink-500 hover:to-pink-700 border-0">
                        Xem Chi Tiết
                      </Button>
                    </div>
                    <Badge className="mt-2 w-fit bg-white text-black hover:bg-white border border-gray-200">
                      Nail
                    </Badge>
                  </CardContent>
                </Card>
              }
              authenticatedContent={
                <ValidatedLink 
                  to={cardDestinations.nail[4].path}
                  listingId={cardDestinations.nail[4].id}
                  listingType={cardDestinations.nail[4].type as "salon" | "job"}
                  className="no-underline block h-full"
                >
                  <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                      <ImageWithFallback 
                        src={nailSalonImages[4]} 
                        alt="Nail Studio 5" 
                        className="w-full h-full object-cover"
                        category="nail"
                      />
                      <Badge className="absolute top-2 right-2 bg-amber-500 text-white hover:bg-amber-600">
                        ★ FEATURED
                      </Badge>
                    </div>
                    
                    <CardContent className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold mb-1">
                        Cần Thợ Nail – Killeen, TX
                      </h3>
                      
                      <p className="text-sm font-bold text-gray-800 mb-2">
                        💰 $1,500+/tuần
                      </p>
                      
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                        Tiệm lớn, giá cao, tip tốt. Gặp Johnny/Hannah.
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-600">📍Killeen, TX</span>
                          <span className="text-sm text-gray-500">🔒 Sign in to view contact info</span>
                        </div>

                        <Button size="sm" variant="outline" className="gap-1 bg-gradient-to-r from-pink-400 to-pink-600 text-white hover:from-pink-500 hover:to-pink-700 border-0">
                          Xem Chi Tiết
                        </Button>
                      </div>
                      <Badge className="mt-2 w-fit bg-white text-black hover:bg-white border border-gray-200">
                        Nail
                      </Badge>
                    </CardContent>
                  </Card>
                </ValidatedLink>
              }
            />
          </motion.div>

          {/* Keep the rest of the nailSalonImages starting from index 5 (the second row) unchanged */}
          {nailSalonImages.slice(5).map((imageSrc, index) => {
            const actualIndex = index + 5; // Adjust index to account for the first 5 cards
            return (
              <motion.div
                key={actualIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: actualIndex * 0.1 }}
                className="h-full"
              >
                <AuthAction
                  onAction={handleCardClick(cardDestinations.nail[actualIndex].path)}
                  redirectPath={cardDestinations.nail[actualIndex].path}
                  customTitle="Sign in to view listing details"
                  fallbackContent={
                    <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                        <ImageWithFallback 
                          src={imageSrc} 
                          alt={`Nail Studio ${actualIndex + 1}`} 
                          className="w-full h-full object-cover"
                          category="nail"
                        />
                      </div>
                      
                      <CardContent className="p-5 flex flex-col flex-grow">
                        <h3 className="text-lg font-semibold mb-1">
                          Nail Studio {actualIndex + 1}
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
                      to={cardDestinations.nail[actualIndex].path}
                      listingId={cardDestinations.nail[actualIndex].id}
                      listingType={cardDestinations.nail[actualIndex].type as "salon" | "job"}
                      className="no-underline block h-full"
                    >
                      <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                          <ImageWithFallback 
                            src={imageSrc} 
                            alt={`Nail Studio ${actualIndex + 1}`} 
                            className="w-full h-full object-cover"
                            category="nail"
                          />
                        </div>
                        
                        <CardContent className="p-5 flex flex-col flex-grow">
                          <h3 className="text-lg font-semibold mb-1">
                            Nail Studio {actualIndex + 1}
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NailListingsSection;
