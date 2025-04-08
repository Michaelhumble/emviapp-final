
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scissors, Plus, DollarSign, Clock } from "lucide-react";
import { UserProfile } from "@/context/auth/types";
import { toast } from "sonner";

interface ArtistServicesSectionProps {
  profileData?: UserProfile;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
}

const ArtistServicesSection = ({ profileData }: ArtistServicesSectionProps) => {
  // Sample services - in a real app these would come from the database
  const services: Service[] = [
    {
      id: '1',
      name: 'Basic Manicure',
      description: 'Nail shaping, cuticle care, hand massage, and polish.',
      price: '$35',
      duration: '30 min'
    },
    {
      id: '2',
      name: 'Gel Polish Application',
      description: 'Long-lasting gel polish application with curing.',
      price: '$45',
      duration: '45 min'
    },
    {
      id: '3',
      name: 'Full Set Acrylic',
      description: 'Full set of acrylic nails with polish or gel color.',
      price: '$65',
      duration: '60 min'
    },
    {
      id: '4',
      name: 'Nail Art Design',
      description: 'Custom nail art designs per nail.',
      price: '$15+',
      duration: '15+ min'
    }
  ];
  
  const handleAddService = () => {
    toast.info("Service creation feature coming soon!");
  };
  
  return (
    <Card className="border-purple-100 overflow-hidden">
      <CardHeader className="bg-purple-50/50 border-b border-purple-100 pb-4 flex flex-row items-center justify-between">
        <CardTitle className="text-xl flex items-center text-purple-900">
          <Scissors className="h-5 w-5 mr-2 text-purple-600" />
          Services
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleAddService}
          className="border-purple-200 text-purple-800 hover:bg-purple-50"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Service
        </Button>
      </CardHeader>
      
      <CardContent className="p-6">
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <div 
                key={service.id} 
                className="border border-purple-100 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{service.name}</h4>
                  <span className="text-purple-700 font-semibold">{service.price}</span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  {service.duration}
                </div>
              </div>
            ))}
            
            <div className="border border-dashed border-purple-200 rounded-lg flex items-center justify-center hover:bg-purple-50/50 transition-colors cursor-pointer" onClick={handleAddService}>
              <div className="p-8 text-center">
                <div className="mx-auto bg-purple-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-3">
                  <Plus className="h-6 w-6 text-purple-600" />
                </div>
                <p className="text-sm text-purple-700">Add New Service</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="bg-purple-100 rounded-full p-4 mb-4">
              <Scissors className="h-8 w-8 text-purple-500" />
            </div>
            <h3 className="text-lg font-medium mb-2">Add your services</h3>
            <p className="text-gray-500 mb-6 max-w-md">
              List the services you offer, including prices and descriptions, so clients know what to expect.
            </p>
            <Button 
              onClick={handleAddService}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Service
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ArtistServicesSection;
