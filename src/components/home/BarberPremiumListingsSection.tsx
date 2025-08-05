
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import ValidatedLink from '@/components/common/ValidatedLink';
import AuthAction from '@/components/common/AuthAction';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/context/auth/hooks/useSession';

import { barberShopImages, cardDestinations } from '@/utils/beautyExchangeImages';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

// Define destinations for each card

const BarberPremiumListingsSection: React.FC = () => {
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
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-gray-900">
            Barber Shop Listings — Premium Spaces
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore luxury barber shop spaces and opportunities. Connect with premium establishments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {barberShopImages.map((imageSrc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="h-full"
            >
              <AuthAction
                onAction={handleCardClick(cardDestinations.barber[index].path)}
                redirectPath={cardDestinations.barber[index].path}
                customTitle="Sign in to view barber shop details"
                fallbackContent={
                  <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                      <ImageWithFallback 
                        src={imageSrc} 
                        alt={`Barber Shop ${index + 1}`} 
                        className="w-full h-full object-cover"
                        category="barber"
                      />
                      <Badge className="absolute top-2 left-2 bg-amber-500 text-white hover:bg-amber-600">
                        ★ PREMIUM
                      </Badge>
                    </div>
                    
                    <CardContent className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold mb-1">
                        Premium Barber Studio {index + 1}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        Premium barber shop space
                      </p>
                      
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                        Elegant barber shop with premium finishes and state-of-the-art equipment.
                      </p>
                      
                       <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                         <Badge className="bg-white text-black hover:bg-white rounded-full border border-amber-300">
                           Premium
                         </Badge>

                         <div className="flex flex-col gap-1 ml-auto">
                           <Button size="sm" variant="outline" className="gap-1 text-xs">
                             <Eye className="h-3.5 w-3.5" /> View Details
                           </Button>
                           <Link to="/barber">
                             <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs font-bold w-full">
                               🔥 Claim Your Spot in Barber
                             </Button>
                           </Link>
                         </div>
                       </div>
                    </CardContent>
                  </Card>
                }
                authenticatedContent={
                  <ValidatedLink 
                    to={cardDestinations.barber[index].path}
                    listingId={cardDestinations.barber[index].id}
                    listingType={cardDestinations.barber[index].type as "salon" | "job"}
                    className="no-underline block h-full"
                  >
                    <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                        <ImageWithFallback 
                          src={imageSrc} 
                          alt={`Barber Shop ${index + 1}`} 
                          className="w-full h-full object-cover"
                          category="barber"
                        />
                        <Badge className="absolute top-2 left-2 bg-amber-500 text-white hover:bg-amber-600">
                          ★ PREMIUM
                        </Badge>
                      </div>
                      
                      <CardContent className="p-5 flex flex-col flex-grow">
                        <h3 className="text-lg font-semibold mb-1">
                          Premium Barber Studio {index + 1}
                        </h3>
                        
                        <p className="text-sm text-gray-600 mb-2">
                          Premium barber shop space
                        </p>
                        
                        <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                          Elegant barber shop with premium finishes and state-of-the-art equipment.
                        </p>
                        
                         <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                           <Badge className="bg-white text-black hover:bg-white rounded-full border border-amber-300">
                             Premium
                           </Badge>

                           <div className="flex flex-col gap-1 ml-auto">
                             <Button size="sm" variant="outline" className="gap-1 text-xs">
                               <Eye className="h-3.5 w-3.5" /> View Details
                             </Button>
                             <Link to="/barber">
                               <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs font-bold w-full">
                                 🔥 Claim Your Spot in Barber
                               </Button>
                             </Link>
                           </div>
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

export default BarberPremiumListingsSection;
