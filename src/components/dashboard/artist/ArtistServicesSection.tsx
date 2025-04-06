
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash, DollarSign, Clock, Gem } from "lucide-react";
import { motion } from "framer-motion";

// Mock service data
const initialServices = [
  {
    id: 1,
    name: "Full Set - Acrylic",
    price: 65,
    duration: 75,
    description: "Complete acrylic set with your choice of shape and length.",
    isPremium: false
  },
  {
    id: 2,
    name: "Gel Polish Manicure",
    price: 45,
    duration: 45,
    description: "Gel polish application with proper nail preparation for maximum durability.",
    isPremium: false
  },
  {
    id: 3,
    name: "Luxury Nail Art Design",
    price: 85,
    duration: 90,
    description: "Custom nail art designs with premium materials and techniques.",
    isPremium: true
  }
];

const ArtistServicesSection = () => {
  const [services, setServices] = useState(initialServices);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-serif">Services & Pricing</CardTitle>
          <CardDescription>Manage the services you offer to clients</CardDescription>
        </div>
        <Button>
          <Plus className="mr-1 h-4 w-4" />
          Add Service
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              className="bg-white rounded-lg border p-4 transition-all hover:shadow-md relative group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium text-gray-900">
                      {service.name}
                    </h3>
                    {service.isPremium && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                        <Gem className="h-3 w-3 mr-1" />
                        Premium
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                  
                  <div className="flex items-center mt-2 space-x-4">
                    <div className="flex items-center text-sm">
                      <DollarSign className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="font-medium">${service.price}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 text-gray-500 mr-1" />
                      <span>{service.duration} min</span>
                    </div>
                  </div>
                </div>
                
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Add new service card */}
          <motion.div 
            className="rounded-lg border-2 border-dashed p-4 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: services.length * 0.1 }}
          >
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 mx-auto flex items-center justify-center mb-2">
                <Plus className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">Add New Service</p>
              <p className="text-xs text-gray-500 mt-1">Define service details and pricing</p>
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistServicesSection;
