
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Search, Filter, MapPin, DollarSign, Home, Calendar } from "lucide-react";
import { salonsForSaleJobs } from "@/utils/jobs/mockJobData";
import { differenceInDays } from 'date-fns';
import { Job } from "@/types/job";

const Salons = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedSalon, setSelectedSalon] = useState<Job | null>(null);

  useEffect(() => {
    document.title = "Salon Directory | EmviApp";
    console.log("Salons page loaded successfully");
  }, []);

  const filteredSalons = salonsForSaleJobs.filter(salon => {
    if (searchTerm && !salon.company?.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !salon.location?.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    if (activeTab === "featured" && !salon.is_featured) {
      return false;
    }
    
    if (activeTab === "forsale" && salon.status !== "active") {
      return false;
    }
    
    return true;
  });
  
  const isExpired = (salon: Job): boolean => {
    if (salon.status === 'expired') return true;
    
    const createdDate = new Date(salon.created_at);
    const now = new Date();
    return differenceInDays(now, createdDate) >= 30;
  };

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
            
            {/* Search and filter section */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by salon name or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button className="md:w-auto">
                  <Filter className="h-4 w-4 mr-2" /> Filter
                </Button>
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
            {filteredSalons.map((salon) => {
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
                        <div className="p-4 text-white">
                          <Badge className="bg-primary hover:bg-primary">
                            {salon.asking_price}
                          </Badge>
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
                      
                      <Button size="sm" variant="default" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            
            {filteredSalons.length === 0 && (
              <div className="col-span-1 md:col-span-3 py-12 text-center">
                <div className="bg-gray-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-7 w-7 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No salons found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any salons matching your search criteria.
                </p>
                <Button variant="outline" onClick={() => setSearchTerm("")}>
                  Clear Search
                </Button>
              </div>
            )}
          </div>
          
          {/* Bottom CTA */}
          <div className="text-center">
            <Link to="/salons/list">
              <Button>List Your Salon</Button>
            </Link>
            <p className="text-sm text-gray-500 mt-2">
              Reach thousands of potential clients and staff
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Salons;
