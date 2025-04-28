
import React, { useState, useEffect } from 'react';
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
import { cn } from "@/lib/utils";
import SalonDetailModal from "@/components/salons/SalonDetailModal";
import { Job } from "@/types/job";
import SalonListingCta from "@/components/salons/SalonListingCta";
import WhySellSection from "@/components/salons/WhySellSection";
import FeaturedListingsSection from "@/components/salons/FeaturedListingsSection";

const SalonsFinal: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedSalon, setSelectedSalon] = useState<Job | null>(null);
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

  // Get featured salons
  const getFeaturedSalons = () => {
    // Use explicit featured salons or mark some as featured
    if (featuredSalons && featuredSalons.length > 0) {
      return featuredSalons;
    }
    
    // If no featured salons, use the first 3 salons with images as featured
    return salons
      .filter(salon => salon.image)
      .slice(0, 3)
      .map(salon => ({ ...salon, is_featured: true }));
  };

  // Handle salon details view
  const handleViewSalonDetails = (salon: Job) => {
    setSelectedSalon(salon);
  };

  const handleCloseModal = () => {
    setSelectedSalon(null);
  };

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
        <title>Premium Salon Marketplace | EmviApp</title>
        <meta 
          name="description" 
          content="Browse our curated selection of premium nail salons for sale. Find your next business opportunity or list your salon on EmviApp's exclusive marketplace." 
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-3">
              Salon Marketplace
            </h1>
            <p className="text-gray-600 max-w-2xl">
              Browse premium salon listings or sell your beauty business to qualified buyers. 
              EmviApp connects beauty professionals with their next opportunity.
            </p>
          </div>

          {/* Featured Listings Section */}
          {!loading && <FeaturedListingsSection 
            featuredListings={getFeaturedSalons()} 
            onViewDetails={handleViewSalonDetails} 
          />}

          {/* Salon Listing CTA */}
          <SalonListingCta />
          
          {/* Why Sell Section */}
          <WhySellSection />
          
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
                  <h2 className="font-playfair text-2xl font-semibold mb-2">
                    Browse Salon Listings
                  </h2>
                  <p className="text-gray-600">
                    Find the perfect salon opportunity
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
                          <SalonCard 
                            salon={salon}
                            isExpired={salon.status === "expired"}
                            onViewDetails={() => handleViewSalonDetails(salon)}
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
          
          {/* Salon Detail Modal */}
          {selectedSalon && (
            <SalonDetailModal
              salon={selectedSalon}
              isOpen={!!selectedSalon}
              onClose={handleCloseModal}
            />
          )}
          
          {/* Component version tag */}
          <div className="text-xs text-center text-gray-400 mt-8">
            SalonsPage_FINAL v2.0 - Premium Marketplace
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SalonsFinal;
