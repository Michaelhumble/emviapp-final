
import React from 'react';
import { Salon } from '@/types/salon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scissors } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

interface SalonServicesSectionProps {
  salon: Salon;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const SalonServicesSection: React.FC<SalonServicesSectionProps> = ({ 
  salon, 
  selectedCategory, 
  onCategoryChange 
}) => {
  // Group services into categories (in a real app, this would come from the API)
  const serviceCategories = {
    'Popular': ['Gel Manicure', 'Regular Pedicure', 'Full Set Acrylics'],
    'Manicures': ['Regular Manicure', 'Gel Manicure', 'Gel Polish Change', 'Regular Polish Change'],
    'Pedicures': ['Regular Pedicure', 'Deluxe Pedicure', 'Gel Pedicure', 'Spa Pedicure'],
    'Nail Enhancements': ['Full Set Acrylics', 'Fill-In Acrylics', 'Dip Powder', 'Nail Designs']
  };
  
  // Sort services alphabetically within each category
  Object.keys(serviceCategories).forEach(category => {
    serviceCategories[category] = serviceCategories[category].sort();
  });
  
  return (
    <section className="max-w-4xl mx-auto">
      <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
        <CardHeader className="pb-2 border-b border-gray-50">
          <CardTitle className="flex items-center text-xl font-serif">
            <Scissors className="h-5 w-5 mr-2 text-purple-600" />
            Services & Pricing
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-6">
          <Tabs 
            defaultValue="Popular" 
            value={selectedCategory || 'Popular'} 
            onValueChange={onCategoryChange}
            className="w-full"
          >
            <TabsList className="mb-6 flex flex-wrap gap-2">
              {Object.keys(serviceCategories).map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="px-4 py-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {Object.entries(serviceCategories).map(([category, services]) => (
              <TabsContent 
                key={category} 
                value={category}
                className="mt-0"
              >
                <div className="space-y-4">
                  {services.map((service, index) => (
                    <motion.div 
                      key={`${category}-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex justify-between py-2 border-b border-gray-100 last:border-0"
                    >
                      <div>
                        <h3 className="font-medium">{service}</h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {service === 'Gel Manicure' 
                            ? 'Includes nail shaping, cuticle care, and gel polish application' 
                            : service === 'Deluxe Pedicure' 
                            ? 'Includes exfoliation, massage, mask, and polish' 
                            : 'Standard service with our premium products'}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-medium text-purple-700">
                          ${Math.floor(Math.random() * 30) + 30}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          {Math.floor(Math.random() * 30) + 15} min
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="mt-8 text-sm text-gray-500 bg-gray-50 p-3 rounded-md">
            * Prices may vary depending on length, design complexity, and additional services requested.
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default SalonServicesSection;
