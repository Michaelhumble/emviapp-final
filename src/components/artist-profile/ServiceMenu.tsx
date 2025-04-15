
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Clock, DollarSign, Info, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number; // in minutes
  category?: string;
  popular?: boolean;
}

interface ServiceMenuProps {
  services: Service[];
  onBookService: (serviceId: string) => void;
}

const ServiceMenu: React.FC<ServiceMenuProps> = ({ 
  services = [], 
  onBookService 
}) => {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Get unique categories
  const categories = Array.from(new Set(services.map(service => service.category || 'Other')));
  
  // Filter services by selected category
  const filteredServices = selectedCategory 
    ? services.filter(service => (service.category || 'Other') === selectedCategory)
    : services;
  
  const toggleServiceExpand = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };
  
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins ? `${hours} hr ${mins} min` : `${hours} hr`;
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-serif font-semibold flex items-center">
          <DollarSign className="mr-2 h-5 w-5 text-purple-500" />
          Service Menu
        </h2>
        
        {categories.length > 1 && (
          <div className="flex overflow-x-auto gap-2 py-1">
            <Button 
              variant="ghost" 
              size="sm"
              className={!selectedCategory ? "bg-purple-100 text-purple-800" : ""}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            
            {categories.map(category => (
              <Button
                key={category}
                variant="ghost"
                size="sm"
                className={selectedCategory === category ? "bg-purple-100 text-purple-800" : ""}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        )}
      </div>
      
      <AnimatePresence>
        {filteredServices.length > 0 ? (
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="overflow-hidden border-gray-100 hover:shadow-sm transition-shadow">
                  <Collapsible
                    open={expandedService === service.id}
                    onOpenChange={() => toggleServiceExpand(service.id)}
                  >
                    <div className="p-4 flex justify-between items-center">
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium text-gray-900">{service.name}</h3>
                          {service.popular && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                              Popular
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>{formatDuration(service.duration)}</span>
                          
                          <span className="mx-2">•</span>
                          
                          <CollapsibleTrigger asChild>
                            <button className="flex items-center text-purple-600 hover:text-purple-800">
                              <Info className="h-3.5 w-3.5 mr-1" />
                              <span>Details</span>
                              {expandedService === service.id ? (
                                <ChevronUp className="h-3.5 w-3.5 ml-1" />
                              ) : (
                                <ChevronDown className="h-3.5 w-3.5 ml-1" />
                              )}
                            </button>
                          </CollapsibleTrigger>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-bold text-lg">{formatPrice(service.price)}</div>
                        <Button
                          size="sm"
                          className="mt-1"
                          onClick={() => onBookService(service.id)}
                        >
                          <Calendar className="h-3.5 w-3.5 mr-1.5" /> Book
                        </Button>
                      </div>
                    </div>
                    
                    <CollapsibleContent>
                      <Separator />
                      <div className="p-4 bg-gray-50">
                        <p className="text-sm text-gray-600">
                          {service.description || "No description available for this service."}
                        </p>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <Card className="p-6 text-center">
            <DollarSign className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p className="text-gray-500">No services available for this category</p>
          </Card>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceMenu;
