
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Phone, Instagram, Globe } from "lucide-react";

const SalonsPage = () => {
  const { userProfile } = useAuth();
  const [salons, setSalons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    document.title = "Browse Salons | EmviApp";
    fetchSalons();
  }, []);
  
  const fetchSalons = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'salon')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setSalons(data || []);
    } catch (error) {
      console.error("Error fetching salons:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const filteredSalons = salons.filter(salon => 
    salon.salon_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    salon.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Find Salons</h1>
          <p className="text-gray-600 mb-6">Browse and connect with salons in your area</p>
          
          {/* Search */}
          <div className="relative mb-8">
            <Input
              type="text"
              placeholder="Search by salon name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
          
          {/* Salons Grid */}
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin h-8 w-8 border-2 border-primary rounded-full border-t-transparent"></div>
            </div>
          ) : filteredSalons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSalons.map((salon) => (
                <Card key={salon.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                    {salon.avatar_url ? (
                      <img 
                        src={salon.avatar_url} 
                        alt={salon.salon_name || "Salon"} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400 text-xl font-medium">
                        {salon.salon_name || "Salon"}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{salon.salon_name || salon.full_name}</h2>
                    
                    {salon.location && (
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">{salon.location}</span>
                      </div>
                    )}
                    
                    {salon.phone && (
                      <div className="flex items-center text-gray-600 mb-2">
                        <Phone className="h-4 w-4 mr-2" />
                        <span className="text-sm">{salon.phone}</span>
                      </div>
                    )}
                    
                    <div className="flex mt-4 space-x-2">
                      {salon.instagram && (
                        <a 
                          href={`https://instagram.com/${salon.instagram.replace('@', '')}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-pink-500 hover:text-pink-600"
                        >
                          <Instagram className="h-5 w-5" />
                        </a>
                      )}
                      
                      {salon.website && (
                        <a 
                          href={salon.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-600"
                        >
                          <Globe className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                    
                    <div className="mt-4">
                      <Button variant="outline" className="w-full">
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No salons found matching "{searchQuery}"</p>
              <Button 
                variant="link" 
                onClick={() => setSearchQuery("")}
                className="mt-2"
              >
                Clear search
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SalonsPage;
