
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
  
  const handleCardClick = (destinationPath: string) => {
    return async () => {
      return true; // Return true to allow navigation after auth
    };
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col text-center items-center justify-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-2">
            Makeup Artist Listings — Preview Spaces
          </h2>
          <p className="text-gray-600">
            Discover premium makeup artists and services. Listings opening soon.
          </p>
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
                customTitle="Sign in to view makeup artist details"
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
                        Makeup Studio {index + 1}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        Premium makeup services
                      </p>
                      
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                        Professional makeup studio specializing in bridal, editorial, and special event makeup.
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                        <Badge className="bg-amber-500 hover:bg-amber-600 text-white font-medium">
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
                      </div>
                      
                      <CardContent className="p-5 flex flex-col flex-grow">
                        <h3 className="text-lg font-semibold mb-1">
                          Makeup Studio {index + 1}
                        </h3>
                        
                        <p className="text-sm text-gray-600 mb-2">
                          Premium makeup services
                        </p>
                        
                        <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                          Professional makeup studio specializing in bridal, editorial, and special event makeup.
                        </p>
                        
                        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                          <Badge className="bg-amber-500 hover:bg-amber-600 text-white font-medium">
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

export default MakeupListingsSection;
