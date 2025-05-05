
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import AuthAction from '@/components/common/AuthAction';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/context/auth/hooks/useSession';
import ValidatedLink from '@/components/common/ValidatedLink';

// Define barber shop images - these will be replaced with real images when available
const barberShopImages = [
  "/lovable-uploads/072ab653-428c-4ec9-bd87-1bd6658d82de.png",
  "/lovable-uploads/60aae990-d617-435c-8c05-79cc9276b6ba.png",
  "/lovable-uploads/3016e425-432a-49f0-b106-be927292873e.png",
  "/lovable-uploads/43b9da9d-d4a5-419c-93c9-c724e3983b19.png",
  "/lovable-uploads/74b3ba02-2378-41d7-8cb5-023145e94700.png"
];

// Define destinations for each card
const cardDestinations = [
  { id: "barber-1", type: "salon", path: "/salons/barber-1" },
  { id: "barber-2", type: "job", path: "/jobs/barber-2" },
  { id: "barber-3", type: "salon", path: "/salons/barber-3" },
  { id: "barber-4", type: "job", path: "/jobs/barber-4" },
  { id: "barber-5", type: "salon", path: "/salons/barber-5" }
];

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
          <p className="text-lg font-inter text-gray-600 max-w-3xl mx-auto">
            Discover premium barber shops and studio spaces. Connect with elite barbering environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="h-full"
            >
              <AuthAction
                onAction={handleCardClick(cardDestinations[index].path)}
                redirectPath={cardDestinations[index].path}
                customTitle="Sign in to view barber shop details"
                fallbackContent={
                  <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                      {barberShopImages[index] ? (
                        <img 
                          src={barberShopImages[index]} 
                          alt={`Barber Studio ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center w-full h-full text-gray-400">
                          <span>Image coming soon</span>
                        </div>
                      )}
                    </div>
                    
                    <CardContent className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold font-playfair line-clamp-2 mb-1">
                        Barber Studio {index + 1}
                      </h3>
                      
                      <p className="text-sm text-gray-500 mb-2 font-inter">
                        Premium barber shop space
                      </p>
                      
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow font-inter">
                        Modern barber studio with high-end chairs, premium styling stations, and classic atmosphere.
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                        <Badge className="bg-amber-500 text-white hover:bg-amber-600 rounded-full">
                          Coming Soon
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
                    to={cardDestinations[index].path}
                    listingId={cardDestinations[index].id}
                    listingType={cardDestinations[index].type as "salon" | "job"}
                    className="no-underline block h-full"
                  >
                    <Card className="overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <div className="relative aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                        {barberShopImages[index] ? (
                          <img 
                            src={barberShopImages[index]} 
                            alt={`Barber Studio ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center w-full h-full text-gray-400">
                            <span>Image coming soon</span>
                          </div>
                        )}
                      </div>
                      
                      <CardContent className="p-5 flex flex-col flex-grow">
                        <h3 className="text-lg font-bold font-playfair line-clamp-2 mb-1">
                          Barber Studio {index + 1}
                        </h3>
                        
                        <p className="text-sm text-gray-500 mb-2 font-inter">
                          Premium barber shop space
                        </p>
                        
                        <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow font-inter">
                          Modern barber studio with high-end chairs, premium styling stations, and classic atmosphere.
                        </p>
                        
                        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                          <Badge className="bg-amber-500 text-white hover:bg-amber-600 rounded-full">
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

export default BarberPremiumListingsSection;
