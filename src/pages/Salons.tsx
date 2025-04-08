
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Search, Filter, MapPin, DollarSign, Home, Calendar, Star, Sparkles } from "lucide-react";
import { differenceInDays } from 'date-fns';
import { Job } from "@/types/job";
import { useSalonsData } from "@/hooks/useSalonsData";
import SalonDetailModal from '@/components/salons/SalonDetailModal';
import FeaturedSalonsSection from '@/components/salons/FeaturedSalonsSection';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const Salons = () => {
  const { 
    salons, 
    loading, 
    error, 
    filters, 
    searchTerm, 
    updateFilters, 
    updateSearchTerm, 
    fetchSalons,
    featuredSalons,
    suggestedKeywords
  } = useSalonsData();
  
  const [activeTab, setActiveTab] = useState("all");
  const [selectedSalon, setSelectedSalon] = useState<Job | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [locationFilter, setLocationFilter] = useState<string>("all");

  useEffect(() => {
    document.title = "Salon Directory | EmviApp";
    console.log("Salons page loaded successfully");
  }, []);
  
  // Apply tab filtering to salons
  const filteredSalons = salons.filter(salon => {
    if (activeTab === "featured" && !salon.is_featured) {
      return false;
    }
    
    if (activeTab === "forsale" && salon.status !== "active") {
      return false;
    }
    
    return true;
  });
  
  const handleViewSalonDetails = (salon: Job) => {
    setSelectedSalon(salon);
  };
  
  const isExpired = (salon: Job): boolean => {
    if (salon.status === 'expired') return true;
    
    const createdDate = new Date(salon.created_at);
    const now = new Date();
    return differenceInDays(now, createdDate) >= 30;
  };
  
  // Handle price range changes
  const handlePriceRangeChange = (value: [number, number]) => {
    setPriceRange(value);
    updateFilters({ priceRange: value });
  };
  
  // Handle location filter changes
  const handleLocationChange = (value: string) => {
    setLocationFilter(value);
    updateFilters({ location: value });
  };
  
  // Reset all filters
  const resetFilters = () => {
    updateSearchTerm("");
    setPriceRange([0, 500000]);
    setLocationFilter("all");
    updateFilters({
      featured: false,
      showExpired: false,
      hasHousing: false,
      industry: 'all',
      priceRange: [0, 500000],
      squareFeet: [0, 5000]
    });
  };

  // Locations for dropdown
  const locations = [
    "All Locations",
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Houston, TX",
    "Philadelphia, PA",
    "Phoenix, AZ",
    "San Antonio, TX",
    "San Diego, CA",
    "Dallas, TX",
    "San Jose, CA"
  ];

  return (
    <Layout>
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
            
            {/* Search and filter section */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-4 mb-6">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by salon name, location, or features..."
                      value={searchTerm}
                      onChange={(e) => updateSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button 
                    className="md:w-auto"
                    onClick={() => document.getElementById('filterAccordion')?.click()}
                  >
                    <Filter className="h-4 w-4 mr-2" /> Filter
                  </Button>
                </div>
                
                {/* Advanced filters - accordion style */}
                <div className="border rounded-lg p-4">
                  <div 
                    id="filterAccordion"
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => {
                      const content = document.getElementById('filterContent');
                      if (content) {
                        content.style.display = content.style.display === 'none' ? 'block' : 'none';
                      }
                    }}
                  >
                    <h3 className="font-medium">Advanced Filters</h3>
                    <Filter className="h-4 w-4" />
                  </div>
                  
                  <div id="filterContent" className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm text-gray-600">Location</label>
                        <Select 
                          value={locationFilter} 
                          onValueChange={handleLocationChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            {locations.map(location => (
                              <SelectItem 
                                key={location} 
                                value={location === "All Locations" ? "all" : location}
                              >
                                {location}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm text-gray-600">Price Range</label>
                        <div className="flex items-center gap-2">
                          <span className="text-xs">${priceRange[0].toLocaleString()}</span>
                          <Slider 
                            defaultValue={[0, 500000]} 
                            max={500000} 
                            step={10000} 
                            value={priceRange}
                            onValueChange={(value) => handlePriceRangeChange([value[0], value[1]])}
                            className="flex-1"
                          />
                          <span className="text-xs">${priceRange[1].toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between space-x-2">
                        <span className="text-sm text-gray-600">Has Housing</span>
                        <input 
                          type="checkbox" 
                          checked={filters.hasHousing || false}
                          onChange={(e) => updateFilters({ hasHousing: e.target.checked })}
                          className="h-4 w-4"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between space-x-2">
                        <span className="text-sm text-gray-600">Show Expired</span>
                        <input 
                          type="checkbox" 
                          checked={filters.showExpired || false}
                          onChange={(e) => updateFilters({ showExpired: e.target.checked })}
                          className="h-4 w-4"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={resetFilters}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Suggested keywords */}
                <div className="flex flex-wrap gap-2">
                  {suggestedKeywords.slice(0, 8).map((keyword) => (
                    <Badge 
                      key={keyword} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => updateSearchTerm(keyword)}
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Featured promotion banner */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-sm border border-blue-100 text-center mb-8">
              <h3 className="font-semibold text-lg mb-2">List Your Salon on EmviApp</h3>
              <p className="text-gray-700 mb-4">
                Reach thousands of potential clients and talented nail technicians looking for their next opportunity.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <Badge variant="outline" className="bg-white text-gray-800 font-normal text-sm py-1.5 px-4">
                  Standard Listing: $49
                </Badge>
                <Badge variant="outline" className="bg-white text-gray-800 font-normal text-sm py-1.5 px-4">
                  Featured Listing: $99
                </Badge>
                <Link to="/salons/list">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                    List Your Salon
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Tabs for different salon categories */}
          <Tabs defaultValue="all" className="mb-6" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Salons</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="forsale">For Sale</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Salon listings grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {loading ? (
              // Loading state
              Array(6).fill(0).map((_, i) => (
                <Card key={i} className="overflow-hidden border border-gray-100">
                  <CardContent className="p-0">
                    <div className="h-48 bg-gray-100 animate-pulse" />
                    <div className="p-5 space-y-3">
                      <div className="h-5 bg-gray-100 rounded animate-pulse" />
                      <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
                      <div className="h-4 bg-gray-100 rounded animate-pulse" />
                      <div className="h-4 bg-gray-100 rounded animate-pulse w-1/2" />
                      <div className="h-8 bg-gray-100 rounded animate-pulse mt-4" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : filteredSalons.length > 0 ? (
              filteredSalons.map((salon) => {
                const expired = isExpired(salon);
                
                return (
                  <Card key={salon.id} className={`overflow-hidden transition-all hover:shadow-lg border ${expired ? 'border-orange-200 bg-orange-50/30' : 'border-gray-100'}`}>
                    <CardContent className="p-0">
                      {expired && (
                        <div className="bg-orange-100 border-b border-orange-200 p-2 text-center">
                          <p className="text-orange-800 text-xs font-medium">
                            This listing has expired
                          </p>
                        </div>
                      )}
                      
                      <div 
                        className="h-48 bg-center bg-cover relative" 
                        style={{ 
                          backgroundImage: salon.image ? 
                            `url(${salon.image})` : 
                            'url(https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=800&q=60)'
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                          <div className="p-4 text-white flex justify-between w-full items-end">
                            <Badge className="bg-primary hover:bg-primary">
                              {salon.asking_price}
                            </Badge>
                            
                            {salon.is_featured && (
                              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                                <Sparkles className="h-3.5 w-3.5 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-5">
                        <h3 className="font-semibold text-lg mb-1">{salon.company}</h3>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <MapPin className="h-3.5 w-3.5 mr-1" /> {salon.location}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                          <div className="flex items-center text-gray-600">
                            <DollarSign className="h-3.5 w-3.5 mr-1" /> 
                            Rent: {salon.monthly_rent}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            {differenceInDays(new Date(), new Date(salon.created_at))} days ago
                          </div>
                        </div>
                        
                        {salon.vietnamese_description && (
                          <p className="text-sm text-gray-600 italic mb-2 line-clamp-2">
                            {salon.vietnamese_description}
                          </p>
                        )}
                        
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {salon.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-4">
                          {salon.has_housing && (
                            <Badge variant="outline" className="bg-green-50 text-green-800 text-xs">
                              <Home className="h-3 w-3 mr-1" /> Housing
                            </Badge>
                          )}
                          {salon.salon_features?.slice(0, 2).map((feature, i) => (
                            <Badge key={i} variant="outline" className="bg-blue-50 text-blue-800 text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        
                        <Button 
                          size="sm" 
                          variant="default" 
                          className="w-full"
                          onClick={() => handleViewSalonDetails(salon)}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-1 md:col-span-3 py-12 text-center">
                <div className="bg-gray-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-7 w-7 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No salons found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any salons matching your search criteria.
                </p>
                <Button variant="outline" onClick={resetFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
          
          {/* Bottom CTA */}
          <div className="text-center">
            <Link to="/salons/list">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                List Your Salon
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mt-2">
              Reach thousands of potential clients and staff
            </p>
          </div>
        </div>
      </div>
      
      {/* Salon details modal */}
      {selectedSalon && (
        <SalonDetailModal
          salon={selectedSalon}
          isOpen={!!selectedSalon}
          onClose={() => setSelectedSalon(null)}
        />
      )}
    </Layout>
  );
};

export default Salons;
