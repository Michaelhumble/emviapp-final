
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { salonListings, vietnameseSalonListings } from '@/data/salonData';
import { Plus, Search, Filter } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import ListingsGrid from '@/components/listings/ListingsGrid';
import { Salon } from '@/types/salon';
import { Job } from '@/types/job';
import { GradientBackground } from '@/components/ui/gradient-background';

// Filter options
const locationOptions = ["All Locations", "California", "Texas", "Florida", "New York", "Illinois", "Washington"];
const priceOptions = ["All Prices", "Under $100K", "$100K-$200K", "$200K-$500K", "Over $500K"];
const typeOptions = ["All Types", "Nail Salon", "Hair Salon", "Barbershop", "Spa", "Lash Studio"];

// Function to transform data if needed
const transformListing = (listing: any): Job | Salon => {
  // Ensure image URLs are properly set
  if (!listing.imageUrl && listing.image) {
    listing.imageUrl = listing.image;
  }
  
  // Ensure consistent type information
  if (!listing.type) {
    listing.type = 'salon';
  }
  
  return listing;
};

const SalonsPage = () => {
  // State for filters
  const [locationFilter, setLocationFilter] = useState<string>("All Locations");
  const [priceFilter, setPriceFilter] = useState<string>("All Prices");
  const [typeFilter, setTypeFilter] = useState<string>("All Types");
  const [loading, setLoading] = useState<boolean>(true);
  
  // Combined listings
  const [allListings, setAllListings] = useState<Array<Job | Salon>>([]);
  const [filteredListings, setFilteredListings] = useState<Array<Job | Salon>>([]);
  
  // Initialize listings
  useEffect(() => {
    // Simulate API delay for realistic loading effect
    const timer = setTimeout(() => {
      // Transform and combine all listings
      const transformed = [
        ...salonListings.map(transformListing),
        ...vietnameseSalonListings.map(transformListing)
      ];
      
      setAllListings(transformed);
      setFilteredListings(transformed);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter listings when filters change
  useEffect(() => {
    const filtered = allListings.filter(listing => {
      // Location filter
      if (locationFilter !== "All Locations") {
        const location = 'location' in listing ? listing.location : '';
        if (!location.includes(locationFilter)) {
          return false;
        }
      }
      
      // Price filter
      if (priceFilter !== "All Prices") {
        const price = 
          'price' in listing && listing.price ? 
            (typeof listing.price === 'string' ? parseFloat(listing.price.replace(/[^0-9.-]+/g, '')) : listing.price) : 
          'asking_price' in listing && listing.asking_price ?
            (typeof listing.asking_price === 'string' ? parseFloat(listing.asking_price.replace(/[^0-9.-]+/g, '')) : listing.asking_price) :
            0;
        
        if (priceFilter === "Under $100K" && price >= 100000) return false;
        if (priceFilter === "$100K-$200K" && (price < 100000 || price > 200000)) return false;
        if (priceFilter === "$200K-$500K" && (price < 200000 || price > 500000)) return false;
        if (priceFilter === "Over $500K" && price <= 500000) return false;
      }
      
      // Type filter
      if (typeFilter !== "All Types") {
        const businessType = 
          'salon_type' in listing ? listing.salon_type : 
          'business_type' in listing ? listing.business_type : 
          '';
        
        if (!businessType.toLowerCase().includes(typeFilter.toLowerCase().replace(" salon", "").replace("shop", ""))) {
          return false;
        }
      }
      
      return true;
    });
    
    setFilteredListings(filtered);
  }, [locationFilter, priceFilter, typeFilter, allListings]);

  return (
    <Layout>
      <Helmet>
        <title>Premium Salon Listings | EmviApp</title>
        <meta 
          name="description" 
          content="Browse our curated selection of premium salons for sale. Find your next business opportunity with EmviApp." 
        />
      </Helmet>

      {/* Hero banner section */}
      <div className="w-full relative overflow-hidden" style={{ maxHeight: '500px' }}>
        <img 
          src="/lovable-uploads/79cf9064-5740-4752-9ad6-9b7e9b4db31e.png" 
          alt="Luxury salon interior" 
          className="w-full h-auto object-cover"
        />
        
        {/* Dark gradient overlay */}
        <div 
          className="absolute inset-0" 
          style={{ background: 'linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35))' }} 
        />
        
        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-white mb-3">
            Premium Salons for Sale — Ready to Own
          </h1>
          <p className="text-white text-lg md:text-xl mb-8 max-w-2xl opacity-90">
            Discover, list, and buy high-end beauty businesses with EmviApp
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/sell-salon">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
              >
                <Plus className="w-5 h-5 mr-1" /> Post Your Salon
              </Button>
            </Link>
            <Link to="#listings">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white bg-transparent hover:bg-white/10"
              >
                <Search className="w-5 h-5 mr-1" /> Browse Listings
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12" id="listings">
        <div className="max-w-7xl mx-auto">
          {/* Filters section */}
          <GradientBackground variant="default" className="p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <h2 className="text-lg font-medium">Filter Listings</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {locationOptions.map(option => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                
                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {priceOptions.map(option => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Business Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {typeOptions.map(option => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <Button variant="outline" onClick={() => {
                setLocationFilter("All Locations");
                setPriceFilter("All Prices");
                setTypeFilter("All Types");
              }}>
                Reset Filters
              </Button>
            </div>
          </GradientBackground>

          {/* Premium Listings Section */}
          <div className="mb-16">
            <h2 className="font-playfair text-3xl font-bold mb-6">
              Premium Salon Listings
            </h2>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-[400px] bg-gray-100 animate-pulse rounded-lg"></div>
                ))}
              </div>
            ) : (
              <ListingsGrid listings={filteredListings} />
            )}
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="font-playfair text-2xl font-semibold mb-4">
              Have a salon you want to sell?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              List your salon with EmviApp to reach thousands of potential buyers in the beauty industry.
            </p>
            <Link to="/sell-salon">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800">
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
