
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
import { eyebrowLashImages, cardDestinations } from '@/utils/beautyExchangeImages';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

const EyebrowLashListingsSection = () => {
  const navigate = useNavigate();
  const { user } = useSession();
  
  const handleCardClick = (destinationPath: string) => {
    return async () => {
      return true; // Return true to allow navigation after auth
    };
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col text-center items-center justify-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-2">
            Eyebrow & Lash Listings — Preview Spaces
          </h2>
          <p className="text-gray-600">
            Explore premium brow shaping and lash extension studios. Listings opening soon.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {eyebrowLashImages.map((imageSrc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <AuthAction
                onAction={handleCardClick(cardDestinations.eyebrowlash[index].path)}
                redirectPath={cardDestinations.eyebrowlash[index].path}
                customTitle="Sign in to view listing details"
                fallbackContent={
                  <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="relative aspect-video bg-gray-100">
                      <ImageWithFallback 
                        src={imageSrc} 
                        alt={`Eyebrow & Lash Studio ${index + 1}`} 
                        className="w-full h-full object-cover"
                        category="lash"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                        <div className="absolute bottom-3 left-3">
                          <Badge className="bg-white text-black hover:bg-white rounded-full">
                            Premium
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold font-playfair line-clamp-2 mb-1">
                        Premium Eyebrow & Lash Listing {index + 1}
                      </h3>
                      
                      <p className="text-sm text-gray-500 mb-2">
                        Specialized brow and lash services
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                        <span className="text-xs text-gray-400">
                          Featured
                        </span>

                        <Button size="sm" variant="outline" className="gap-1">
                          <Eye className="h-3.5 w-3.5" /> View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                }
                authenticatedContent={
                  <ValidatedLink 
                    to={cardDestinations.eyebrowlash[index].path}
                    listingId={cardDestinations.eyebrowlash[index].id}
                    listingType={cardDestinations.eyebrowlash[index].type as "salon" | "job"}
                    className="no-underline block h-full"
                  >
                    <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <div className="relative aspect-video bg-gray-100">
                        <ImageWithFallback 
                          src={imageSrc} 
                          alt={`Eyebrow & Lash Studio ${index + 1}`} 
                          className="w-full h-full object-cover"
                          category="lash"
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                          <div className="absolute bottom-3 left-3">
                            <Badge className="bg-white text-black hover:bg-white rounded-full">
                              Premium
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <CardContent className="p-5 flex flex-col flex-grow">
                        <h3 className="text-lg font-bold font-playfair line-clamp-2 mb-1">
                          Premium Eyebrow & Lash Listing {index + 1}
                        </h3>
                        
                        <p className="text-sm text-gray-500 mb-2">
                          Specialized brow and lash services
                        </p>
                        
                        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                          <span className="text-xs text-gray-400">
                            Featured
                          </span>

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

export default EyebrowLashListingsSection;
