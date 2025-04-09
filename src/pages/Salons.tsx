
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import SalonCard from "@/components/salons/SalonCard";
import SalonFilter from "@/components/salons/SalonFilter";
import SalonPromotion from "@/components/salons/SalonPromotion";
import SalonsEmptyState from "@/components/salons/SalonsEmptyState";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Briefcase, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import useSalonsData from "@/hooks/useSalonsData";

const Salons = () => {
  const { 
    salons, 
    loading, 
    error, 
    filters, 
    searchTerm, 
    updateFilters, 
    setSearchTerm, 
    resetFilters,
    featuredSalons,
    suggestedKeywords
  } = useSalonsData();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleViewDetails = (salon: any) => {
    console.log("View details for:", salon);
    // Later this will navigate to the salon detail page
    // history.push(`/salons/${salon.id}`)
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-pink-50/50 via-white to-white">
        <div className="container mx-auto px-4 pt-8 pb-12">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-3">Salon Directory</h1>
            <p className="text-gray-600 text-lg">
              Find the perfect salon near you or list your own salon for potential clients and staff to discover.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by salon name, location, or features"
                className="pl-10 py-6 text-lg w-full shadow-sm"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {/* Filter Tags */}
          <div className="max-w-5xl mx-auto mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestedKeywords.slice(0, 8).map((keyword) => (
                <Badge 
                  key={keyword}
                  variant="outline" 
                  className={`rounded-full cursor-pointer bg-white hover:bg-gray-50 py-1.5 px-3 border`}
                  onClick={() => setSearchTerm(keyword)}
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Left Sidebar - Filters */}
              <div className="col-span-1">
                <SalonFilter 
                  filters={filters} 
                  updateFilters={updateFilters} 
                  resetFilters={resetFilters}
                />
              </div>

              {/* Right Content - Tabs and Salon Cards */}
              <div className="col-span-1 lg:col-span-3">
                <Tabs defaultValue="all">
                  <TabsList className="mb-6 w-full md:w-auto">
                    <TabsTrigger value="all" className="flex-1 md:flex-none">
                      <Briefcase className="h-4 w-4 mr-2" /> All Salons
                    </TabsTrigger>
                    <TabsTrigger value="featured" className="flex-1 md:flex-none">
                      <MapPin className="h-4 w-4 mr-2" /> Featured
                    </TabsTrigger>
                    <TabsTrigger value="for-sale" className="flex-1 md:flex-none">
                      <MapPin className="h-4 w-4 mr-2" /> For Sale
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="all">
                    {loading ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, index) => (
                          <div 
                            key={index} 
                            className="animate-pulse bg-gray-100 rounded-lg h-64"
                          ></div>
                        ))}
                      </div>
                    ) : error ? (
                      <div className="text-center py-10">
                        <p className="text-red-500">Error loading salons. Please try again.</p>
                      </div>
                    ) : salons.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {salons.map((salon, index) => (
                          <SalonCard 
                            key={salon.id || index} 
                            salon={salon} 
                            onViewDetails={handleViewDetails}
                          />
                        ))}
                      </div>
                    ) : (
                      <SalonsEmptyState resetFilters={resetFilters} />
                    )}
                  </TabsContent>

                  <TabsContent value="featured">
                    {loading ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 3 }).map((_, index) => (
                          <div 
                            key={index} 
                            className="animate-pulse bg-gray-100 rounded-lg h-64"
                          ></div>
                        ))}
                      </div>
                    ) : featuredSalons.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredSalons.map((salon, index) => (
                          <SalonCard 
                            key={salon.id || index} 
                            salon={salon} 
                            onViewDetails={handleViewDetails}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-500">No featured salons at the moment.</p>
                        <Button variant="outline" className="mt-4">See All Salons</Button>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="for-sale">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {salons
                        .filter(salon => salon.for_sale === true)
                        .map((salon, index) => (
                          <SalonCard 
                            key={salon.id || index} 
                            salon={salon} 
                            onViewDetails={handleViewDetails}
                          />
                        ))}
                    </div>
                    {salons.filter(salon => salon.for_sale === true).length === 0 && (
                      <div className="text-center py-12">
                        <p className="text-gray-500">No salons for sale at the moment.</p>
                        <Button variant="outline" className="mt-4">See All Salons</Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          {/* Promotion Banner */}
          <div className="mt-16">
            <SalonPromotion />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Salons;
