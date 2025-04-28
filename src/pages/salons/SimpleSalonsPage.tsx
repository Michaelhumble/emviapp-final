
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import SalonCard from '@/components/salons/SalonCard';
import { salonListings } from '@/data/salonData';
import SalonListingCta from '@/components/salons/SalonListingCta';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';

const SimpleSalonsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState<string | null>(null);

  // Filter salons based on search term and price filter
  const filteredSalons = salonListings.filter(salon => {
    // Search filter
    const matchesSearch = searchTerm === '' || 
      salon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salon.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salon.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Price filter
    let matchesPrice = true;
    if (priceFilter === 'under200k') {
      matchesPrice = salon.price < 200000;
    } else if (priceFilter === '200k-500k') {
      matchesPrice = salon.price >= 200000 && salon.price <= 500000;
    } else if (priceFilter === 'over500k') {
      matchesPrice = salon.price > 500000;
    }
    
    return matchesSearch && matchesPrice;
  });

  // Sort to show featured listings first
  const sortedSalons = [...filteredSalons].sort((a, b) => {
    if (a.featured === b.featured) return 0;
    return a.featured ? -1 : 1;
  });

  // Handler for View Details button
  const handleViewSalon = (salonId: string) => {
    navigate(`/salons/${salonId}`);
  };

  return (
    <Layout>
      <Helmet>
        <title>Premium Salon Listings | EmviApp</title>
        <meta 
          name="description" 
          content="Browse our curated selection of premium salons for sale. Find your next business opportunity with EmviApp." 
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-3">
              Premium Salon Listings
            </h1>
            <p className="text-gray-600 max-w-2xl">
              Browse our curated selection of premium salons for sale. Each listing represents 
              a unique opportunity in the beauty industry.
            </p>
          </div>

          <SalonListingCta />
          
          {/* Search and Filter */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, location, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={priceFilter === null ? "secondary" : "outline"} 
                onClick={() => setPriceFilter(null)}
                size="sm"
                className="rounded-full"
              >
                All Prices
              </Button>
              <Button 
                variant={priceFilter === 'under200k' ? "secondary" : "outline"} 
                onClick={() => setPriceFilter('under200k')}
                size="sm"
                className="rounded-full"
              >
                Under $200K
              </Button>
              <Button 
                variant={priceFilter === '200k-500k' ? "secondary" : "outline"} 
                onClick={() => setPriceFilter('200k-500k')}
                size="sm"
                className="rounded-full"
              >
                $200K-$500K
              </Button>
              <Button 
                variant={priceFilter === 'over500k' ? "secondary" : "outline"} 
                onClick={() => setPriceFilter('over500k')}
                size="sm"
                className="rounded-full"
              >
                Over $500K
              </Button>
              
              {(searchTerm || priceFilter) && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setPriceFilter(null);
                  }}
                  size="sm"
                  className="rounded-full ml-1"
                >
                  <X className="h-4 w-4 mr-1" /> Clear
                </Button>
              )}
            </div>
          </div>

          {sortedSalons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedSalons.map((salon) => (
                <SalonCard 
                  key={salon.id} 
                  salon={salon} 
                  onViewDetails={() => handleViewSalon(salon.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-2">No salons found matching your criteria.</p>
              <p className="text-gray-500">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SimpleSalonsPage;
