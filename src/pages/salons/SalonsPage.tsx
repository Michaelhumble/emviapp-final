
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, DollarSign, Clock, Filter, Home, Calendar, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { debugRoutes } from "@/utils/routeDebugger";
import { differenceInDays } from 'date-fns';

const SalonsPage = () => {
  const { userProfile } = useAuth();
  const [salons, setSalons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    document.title = "Salon Directory | EmviApp";
    console.log("SalonsPage component loaded");
    debugRoutes(); // Log the current route for debugging
    fetchSalons();
  }, []);
  
  const fetchSalons = async () => {
    try {
      setLoading(true);
      console.log("Fetching salons...");
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'salon')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error("Error fetching salons:", error);
        toast.error("Failed to load salons");
        throw error;
      }
      
      console.log("Salons fetched:", data?.length || 0);
      setSalons(data || []);
    } catch (error) {
      console.error("Error in fetchSalons:", error);
      toast.error("There was a problem loading salons");
    } finally {
      setLoading(false);
    }
  };
  
  const filteredSalons = salons.filter(salon => {
    // Filter by search term
    const matchesSearch = 
      salon.salon_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      salon.location?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by tab
    if (activeTab === "featured" && !salon.is_featured) {
      return false;
    }
    
    if (activeTab === "forSale" && !salon.for_sale) {
      return false;
    }
    
    return matchesSearch;
  });

  const renderSalonCard = (salon: any) => {
    const createdDate = new Date(salon.created_at);
    const daysAgo = differenceInDays(new Date(), createdDate);
    
    return (
      <Card key={salon.id} className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="h-48 bg-gray-100 relative">
          {salon.avatar_url ? (
            <img 
              src={salon.avatar_url} 
              alt={salon.salon_name || "Salon"} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-400 text-lg">{salon.salon_name || "Salon"}</span>
            </div>
          )}
          
          {salon.asking_price && (
            <div className="absolute left-4 bottom-4">
              <Badge className="bg-purple-600 text-white text-lg py-1 px-3 rounded-md">
                ${parseInt(salon.asking_price).toLocaleString()}
              </Badge>
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="text-xl font-bold mb-1">{salon.salon_name || salon.full_name}</h3>
          
          {salon.location && (
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="text-sm">{salon.location}</span>
            </div>
          )}
          
          {salon.monthly_rent && (
            <div className="flex items-center text-gray-600 mb-1">
              <DollarSign className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="text-sm">Rent: ${salon.monthly_rent}/month</span>
            </div>
          )}
          
          {salon.created_at && (
            <div className="flex items-center text-gray-600 mb-1">
              <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="text-sm">{daysAgo} days ago</span>
            </div>
          )}
          
          {salon.vietnamese_description && (
            <p className="text-sm mt-3 italic text-gray-700">{salon.vietnamese_description}</p>
          )}
          
          {salon.description && (
            <p className="text-sm mt-1 text-gray-600 line-clamp-2">{salon.description}</p>
          )}
          
          <div className="flex flex-wrap gap-1 mt-4">
            {salon.salon_features?.map((feature: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            
            {salon.has_housing && (
              <Badge variant="outline" className="bg-green-50 text-green-800 text-xs">
                <Home className="h-3 w-3 mr-1" /> Housing
              </Badge>
            )}
          </div>
          
          <Button className="w-full mt-4" size="sm">
            View Details
          </Button>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-serif font-bold mb-2">Salon Directory</h1>
          <p className="text-gray-600 mb-6">Find the perfect salon near you or list your own salon for potential clients and staff to discover.</p>
          
          {/* Search and Filters */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-4 mb-6">
            <div className="flex gap-4 mb-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by salon name, location, or features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button 
                variant="default" 
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
            </div>
            
            {showFilters && (
              <div className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Advanced Filters</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">Location</label>
                    <select className="w-full border border-gray-300 rounded-md p-2">
                      <option value="all">All Locations</option>
                      <option value="new-york">New York, NY</option>
                      <option value="los-angeles">Los Angeles, CA</option>
                      <option value="chicago">Chicago, IL</option>
                      <option value="houston">Houston, TX</option>
                      <option value="denver">Denver, CO</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">Price Range</label>
                    <div className="flex items-center justify-between">
                      <span className="text-xs">$0</span>
                      <div className="h-2 bg-purple-200 flex-grow mx-2 rounded-full">
                        <div className="h-full w-1/2 bg-purple-600 rounded-full"></div>
                      </div>
                      <span className="text-xs">$500,000</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="has-housing" className="h-4 w-4" />
                    <label htmlFor="has-housing" className="text-sm">Has Housing</label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="show-expired" className="h-4 w-4" />
                    <label htmlFor="show-expired" className="text-sm">Show Expired</label>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">Reset Filters</Button>
                </div>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {["7 Years Established", "High Traffic Area", "Parking Available", "All Equipment Included", 
                "Denver, CO", "Premium Equipment", "Social Media Following", "Recently Renovated"].map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => setSearchQuery(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Salon Categories */}
          <Tabs defaultValue="all" className="mb-6" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Salons</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="forSale">For Sale</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Salons Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="h-48 bg-gray-100 animate-pulse"></div>
                  <CardContent className="p-4">
                    <div className="h-6 bg-gray-100 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-100 rounded animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-100 rounded animate-pulse w-1/2 mb-4"></div>
                    <div className="h-8 bg-gray-100 rounded animate-pulse mt-4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredSalons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {filteredSalons.map(renderSalonCard)}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-lg mb-12">
              <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">No salons found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any salons matching your search criteria.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
          
          {/* Salon Promotion Banner */}
          <div className="bg-blue-50 rounded-lg p-8 text-center mb-12">
            <h2 className="text-2xl font-bold mb-2">List Your Salon on EmviApp</h2>
            <p className="text-gray-700 mb-4">
              Reach thousands of potential clients and talented nail technicians looking for their next opportunity.
            </p>
            <Link to="/salons/list">
              <Button className="bg-purple-600 hover:bg-purple-700">
                List Your Salon
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SalonsPage;
