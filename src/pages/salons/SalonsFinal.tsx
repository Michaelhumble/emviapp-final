
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SalonCard from "@/components/salons/SalonCard";
import { SalonFilterDrawer } from "@/components/salons/SalonFilterDrawer";
import SalonFilter from "@/components/salons/SalonFilter";
import SalonsEmptyState from "@/components/salons/SalonsEmptyState";
import SalonsLoadingState from "@/components/salons/SalonsLoadingState";
import { useSalonsData } from '@/hooks/useSalonsData';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PremiumBadge } from '@/components/salons/PremiumBadge';

const SalonsFinal: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  
  const { 
    salons, 
    loading, 
    error, 
    filters, 
    searchTerm, 
    setSearchTerm, 
    updateFilters, 
    resetFilters,
    featuredSalons,
    suggestedKeywords 
  } = useSalonsData();

  useEffect(() => {
    console.log("Salons page mounted with filters:", filters);
    console.log("Active tab:", activeTab);
  }, [filters, activeTab]);

  // Filter salons based on active tab
  const filteredSalons = salons.filter(salon => {
    if (activeTab === "featured" && !salon.is_featured) {
      return false;
    }
    return true;
  });

  if (error) {
    console.error("Error loading salons:", error);
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error Loading Salons</AlertTitle>
            <AlertDescription>
              We're having trouble loading the salon listings. Please try refreshing the page or come back later.
            </AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  const salonFilterProps = {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilters,
    resetFilters,
    suggestedKeywords
  };

  return (
    <Layout>
      <Helmet>
        <title>Premium Salon Directory | EmviApp</title>
        <meta 
          name="description" 
          content="Browse our curated selection of premium nail salons. Find the perfect salon near you or list your own salon." 
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24">
                <SalonFilter {...salonFilterProps} />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
                    Salon Directory
                  </h1>
                  <p className="text-gray-600">
                    Find the perfect salon near you
                  </p>
                </div>
                
                {/* Mobile Filter Drawer */}
                <SalonFilterDrawer {...salonFilterProps} />
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList>
                  <TabsTrigger value="all">All Salons</TabsTrigger>
                  <TabsTrigger value="featured">Featured</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-6">
                  {loading ? (
                    <SalonsLoadingState count={6} />
                  ) : filteredSalons.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredSalons.map((salon) => (
                        <div 
                          key={salon.id}
                          className={cn(
                            "transition-all duration-300",
                            salon.is_featured && "ring-1 ring-purple-200 rounded-lg shadow-lg"
                          )}
                        >
                          {salon.is_featured && (
                            <div className="flex justify-end p-2">
                              <PremiumBadge />
                            </div>
                          )}
                          <SalonCard 
                            salon={salon}
                            onView={() => navigate(`/salons/${salon.id}`)}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <SalonsEmptyState resetFilters={resetFilters} />
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Component version tag */}
          <div className="text-xs text-center text-gray-400 mt-8">
            SalonsPage_FINAL v1.0 - Locked for stability
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SalonsFinal;
