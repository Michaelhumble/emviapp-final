
import { useState, useEffect } from "react";
import { Plus, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ArtistServiceCard from "./ArtistServiceCard";
import ArtistServiceForm from "./ArtistServiceForm";

interface Service {
  id: string;
  title: string;
  description: string | null;
  price: number;
  duration_minutes: number;
  is_visible: boolean;
}

const ArtistServices = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  // Fetch services from Supabase
  const fetchServices = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });
      
      if (error) throw error;
      
      setServices(data as Service[] || []);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to load services. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Load services on component mount
  useEffect(() => {
    fetchServices();
  }, [user]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="text-xl font-serif">Services Offered</CardTitle>
          <CardDescription>Manage the services you offer to clients</CardDescription>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="mr-1 h-4 w-4" />
          Add Service
        </Button>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          // Loading state
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((n) => (
              <Card key={n} className="h-[140px] animate-pulse bg-gray-100">
                <CardContent className="p-4"></CardContent>
              </Card>
            ))}
          </div>
        ) : services.length > 0 ? (
          // Services grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArtistServiceCard 
                    service={service} 
                    onServiceUpdated={fetchServices} 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Add service card */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-dashed border-2 border-gray-300 bg-gray-50 hover:bg-gray-100 h-full">
                <CardContent className="p-0">
                  <Button 
                    variant="ghost" 
                    className="h-full w-full py-10 flex flex-col items-center justify-center"
                    onClick={() => setShowAddForm(true)}
                  >
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                      <Plus className="h-5 w-5 text-purple-600" />
                    </div>
                    <span className="text-gray-600 font-medium">Add New Service</span>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        ) : (
          // Empty state
          <Card className="bg-gray-50 border-dashed border-2 border-gray-200">
            <CardContent className="py-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Services Added Yet</h3>
              <p className="text-gray-500 mb-4 max-w-md">
                Add your services so clients know what you offer, including prices and estimated time.
              </p>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="mr-1 h-4 w-4" />
                Add Your First Service
              </Button>
            </CardContent>
          </Card>
        )}
      </CardContent>

      {/* Add Service Form Modal */}
      {showAddForm && (
        <ArtistServiceForm
          isOpen={showAddForm}
          onClose={() => setShowAddForm(false)}
          onServiceSaved={fetchServices}
        />
      )}
    </Card>
  );
};

export default ArtistServices;
