
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

interface ServiceItem {
  id: string;
  name: string;
  price: string;
  duration: string;
  description?: string;
}

const ArtistServicesGrid = () => {
  // Sample services - would come from API/database in production
  const [services, setServices] = useState<ServiceItem[]>([
    {
      id: "1",
      name: "Basic Manicure",
      price: "$35",
      duration: "30 min",
      description: "Nail shaping, cuticle care, hand massage, and polish."
    },
    {
      id: "2",
      name: "Gel Polish Application",
      price: "$45",
      duration: "45 min",
      description: "Long-lasting gel polish application with curing."
    },
    {
      id: "3",
      name: "Full Set Acrylic",
      price: "$65",
      duration: "60 min",
      description: "Full set of acrylic nails with polish or gel color."
    },
    {
      id: "4",
      name: "Nail Art Design",
      price: "$15+",
      duration: "15+ min",
      description: "Custom nail art designs per nail."
    }
  ]);
  
  const handleAddService = () => {
    // In production, this would open a service form
    toast.info("Service creation feature coming soon!");
  };
  
  return (
    <section className="mb-8" id="services">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-serif font-semibold">Services</h2>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={handleAddService}
        >
          <PlusCircle className="h-4 w-4" />
          Add Service
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <Card key={service.id} className="hover:shadow-sm transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{service.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-purple-600">{service.price}</p>
                  <p className="text-xs text-gray-500">{service.duration}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Card className="border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
          <CardContent className="p-0">
            <Button 
              variant="ghost" 
              className="h-full w-full p-6 flex flex-col items-center justify-center"
              onClick={handleAddService}
            >
              <PlusCircle className="h-6 w-6 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">Add New Service</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ArtistServicesGrid;
