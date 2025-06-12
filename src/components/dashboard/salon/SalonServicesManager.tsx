
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, DollarSign, Clock } from "lucide-react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SalonService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_min: number;
  image_url?: string;
  created_at: string;
}

const SalonServicesManager = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<SalonService[]>([]);
  const [loading, setLoading] = useState(true);

  console.log('🟪 SalonServicesManager component loaded');

  useEffect(() => {
    fetchServices();
  }, [user]);

  const fetchServices = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      // First try salon_services table
      const { data: salonServices, error: salonError } = await supabase
        .from('salon_services')
        .select('*')
        .eq('salon_id', user.id)
        .order('created_at', { ascending: false });

      if (!salonError && salonServices && salonServices.length > 0) {
        setServices(salonServices);
      } else {
        // Fallback to services table
        const { data: userServices, error: userError } = await supabase
          .from('services')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (userError) throw userError;
        
        // Transform user services to match salon services structure
        const transformedServices = userServices?.map(service => ({
          id: service.id,
          name: service.title,
          description: service.description || '',
          price: Number(service.price),
          duration_min: service.duration_minutes,
          image_url: service.image_url,
          created_at: service.created_at
        })) || [];
        
        setServices(transformedServices);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const remainingMin = minutes % 60;
    return remainingMin > 0 ? `${hours}h ${remainingMin}min` : `${hours}h`;
  };

  return (
    <Card className="border-amber-100">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-xl font-serif flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-amber-500" />
            Service Management
          </CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Manage your salon's services and pricing
          </p>
        </div>
        <Button className="bg-amber-600 hover:bg-amber-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </CardHeader>
      
      <CardContent>
        {loading ? (
          <div className="text-center py-8">
            <DollarSign className="h-8 w-8 animate-pulse mx-auto mb-2 text-amber-500" />
            <p>Loading services...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-amber-200 rounded-lg">
            <DollarSign className="h-12 w-12 text-amber-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services yet</h3>
            <p className="text-gray-500 mb-4">Add your first service to start taking bookings</p>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Service
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <div key={service.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                {service.image_url && (
                  <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 overflow-hidden">
                    <img 
                      src={service.image_url} 
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 line-clamp-1">{service.name}</h4>
                  
                  {service.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center text-amber-600">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span className="font-semibold">{formatPrice(service.price)}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{formatDuration(service.duration_min)}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Add new service card */}
            <div className="border-2 border-dashed border-amber-200 rounded-lg p-4 flex flex-col items-center justify-center min-h-[200px] hover:border-amber-300 transition-colors cursor-pointer">
              <Plus className="h-8 w-8 text-amber-400 mb-2" />
              <span className="text-amber-600 font-medium">Add New Service</span>
            </div>
          </div>
        )}
        
        {/* Debug marker */}
        <div className="mt-4 text-xs text-amber-500 border-t pt-2">
          🟪 Services Manager Component | Services Loaded: {services.length} | Source: {services.length > 0 ? 'Database' : 'Empty'}
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonServicesManager;
