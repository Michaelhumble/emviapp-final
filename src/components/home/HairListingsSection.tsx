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
import { hairSalonImages, cardDestinations } from '@/utils/beautyExchangeImages';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

const HairListingsSection: React.FC = () => {
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
        <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-6">
          Hair Listings — Premium Spaces
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {hairSalonImages.map((imageSrc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="h-full"
            >
              <AuthAction
                onAction={handleCardClick(cardDestinations.hair[index].path)}
                redirectPath={cardDestinations.hair[index].path}
                customTitle="Sign in to view job details"
                fallbackContent={
                  <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                      <ImageWithFallback 
                        src={imageSrc} 
                        alt={`Luxury Hair Salon ${index + 1}`} 
                        className="w-full h-full object-cover"
                        category="hair"
                      />
                    </div>
                    
                    <CardContent className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold font-playfair line-clamp-2 mb-1">
                        Luxury Hair Studio {index + 1}
                      </h3>
                      
                      <p className="text-sm text-gray-500 mb-2 font-inter">
                        Premium hair salon space
                      </p>
                      
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow font-inter">
                        Elegant salon space with high-end finishes, crystal chandeliers, and luxurious styling chairs.
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                        <Badge className="bg-white text-black hover:bg-white rounded-full border border-amber-300">
                          Exclusive
                        </Badge>

                        <Button size="sm" variant="outline" className="gap-1">
                          <Eye className="h-3.5 w-3.5" /> View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                }
                authenticatedContent={
                  <ValidatedLink 
                    to={cardDestinations.hair[index].path}
                    listingId={cardDestinations.hair[index].id}
                    listingType={cardDestinations.hair[index].type as "salon" | "job"}
                    className="no-underline block h-full"
                  >
                    <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                        <ImageWithFallback 
                          src={imageSrc} 
                          alt={`Luxury Hair Salon ${index + 1}`} 
                          className="w-full h-full object-cover"
                          category="hair"
                        />
                      </div>
                      
                      <CardContent className="p-5 flex flex-col flex-grow">
                        <h3 className="text-lg font-bold font-playfair line-clamp-2 mb-1">
                          Luxury Hair Studio {index + 1}
                        </h3>
                        
                        <p className="text-sm text-gray-500 mb-2 font-inter">
                          Premium hair salon space
                        </p>
                        
                        <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow font-inter">
                          Elegant salon space with high-end finishes, crystal chandeliers, and luxurious styling chairs.
                        </p>
                        
                        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                          <Badge className="bg-white text-black hover:bg-white rounded-full border border-amber-300">
                            Exclusive
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

export default HairListingsSection;
