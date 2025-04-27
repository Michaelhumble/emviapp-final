
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SalonCard from "@/components/salons/SalonCard";
import SalonFilter from "@/components/salons/SalonFilter";
import SalonsEmptyState from "@/components/salons/SalonsEmptyState";
import SalonsLoadingState from "@/components/salons/SalonsLoadingState";
import FeaturedSalonsSection from "@/components/salons/FeaturedSalonsSection";
import SalonPromotion from "@/components/salons/SalonPromotion";
import { useSalonsData, SalonFilters } from '@/hooks/useSalonsData';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Job } from '@/types/job';

// This is the locked, final version of the Salons Page
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
    document.title = "Salon Directory | EmviApp";
    
    // Log page view for analytics
    console.log("SalonsFinal page loaded");
  }, []);
  
  // Apply tab filtering to salons
  const filteredSalons = salons.filter(salon => {
    if (activeTab === "featured" && !salon.is_featured) {
      return false;
    }
    
    if (activeTab === "forSale" && salon.status !== "active") {
      return false;
    }
    
    return true;
  });
  
  // Helper function to determine if a salon is expired based on status
  const isExpired = (salon: any) => {
    return salon.status === "expired";
  };
  
  // Update this function to navigate to the salon detail page
  const handleViewSalonDetails = (salon: Job) => {
    console.log("Navigating to salon details:", salon.id);
    navigate(`/salons/${salon.id}`);
  };

  // The component now receives the correct filter props
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
        <title>Salon Directory | Find or List Nail Salons | EmviApp</title>
        <meta 
          name="description" 
          content="Browse our comprehensive directory of nail salons. Find the perfect salon near you or list your own salon for potential clients and staff to discover." 
        />
        <meta name="keywords" content="salon directory, nail salon, beauty salon, sell salon, buy salon, salon for sale" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
              Salon Directory
            </h1>
            <p className="text-gray-600 mb-6">
              Find the perfect salon near you or list your own salon for potential clients and staff to discover.
            </p>
            
            {/* Featured Salons Section */}
            {featuredSalons.length > 0 && (
              <FeaturedSalonsSection 
                featuredSalons={featuredSalons} 
                onViewDetails={handleViewSalonDetails} 
              />
            )}
            
            {/* Search and Filter System */}
            <SalonFilter 
              {...salonFilterProps}
            />
            
            {/* Promotion Banner */}
            <SalonPromotion />
          </div>
          
          {/* Tab Navigation */}
          <Tabs 
            defaultValue="all" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="mb-6"
          >
            <div className="sticky top-16 z-10 bg-white pb-2 border-b">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Salons</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="forSale">For Sale</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value={activeTab} className="mt-0">
              {/* Salon Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {loading ? (
                  <SalonsLoadingState count={6} />
                ) : filteredSalons.length > 0 ? (
                  filteredSalons.map((salon, index) => (
                    <SalonCard 
                      key={salon.id} 
                      salon={salon} 
                      index={index} 
                      isExpired={isExpired(salon)} 
                      onViewDetails={() => handleViewSalonDetails(salon)} 
                    />
                  ))
                ) : (
                  <SalonsEmptyState resetFilters={resetFilters} />
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Bottom CTA */}
          <div className="text-center mb-8">
            <Link to="/salons/list">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                List Your Salon
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mt-2">
              Reach thousands of potential clients and staff
            </p>
          </div>
          
          {/* Component version tag - Do not modify without approval */}
          <div className="text-xs text-center text-gray-400 mt-8">
            SalonsPage_FINAL v1.0 - Locked for stability. Contact administrator for changes.
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SalonsFinal;
