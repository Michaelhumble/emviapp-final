import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import SalonCard from '@/components/salons/SalonCard';
import { fetchJobs } from '@/utils/jobs';
import SalonListingCta from '@/components/salons/SalonListingCta';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Job } from '@/types/job';

const ITEMS_PER_PAGE = 9;

const SimpleSalonsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState<string | null>(null);
  const [salons, setSalons] = useState<Job[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSalons = async () => {
      setLoading(true);
      try {
        const { jobs, totalPages } = await fetchJobs(currentPage, ITEMS_PER_PAGE);
        setSalons(jobs);
        setTotalPages(totalPages);
      } catch (error) {
        console.error('Error loading salons:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSalons();
  }, [currentPage]);

  // Filter salons based on search term and price filter
  const filteredSalons = salons.filter(salon => {
    const matchesSearch = !searchTerm || 
      salon.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salon.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salon.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesPrice = true;
    if (priceFilter === 'under200k') {
      matchesPrice = parseFloat(salon.price) < 200000;
    } else if (priceFilter === '200k-500k') {
      matchesPrice = parseFloat(salon.price) >= 200000 && parseFloat(salon.price) <= 500000;
    } else if (priceFilter === 'over500k') {
      matchesPrice = parseFloat(salon.price) > 500000;
    }
    
    return matchesSearch && matchesPrice;
  });

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
    window.scrollTo(0, 0);
  };

  const handleViewSalon = (salonId: string) => {
    navigate(`/salons/${salonId}`);
  };

  // Generate page numbers array for pagination
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

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

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <div key={index} className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : filteredSalons.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSalons.map((salon) => (
                  <SalonCard 
                    key={salon.id} 
                    salon={{
                      id: salon.id,
                      name: salon.title || '',
                      location: salon.location || '',
                      price: parseFloat(salon.price || '0'),
                      imageUrl: salon.image || '',
                      description: salon.description || ''
                    }}
                    onViewDetails={() => handleViewSalon(salon.id)}
                  />
                ))}
              </div>
              
              {totalPages > 1 && (
                <div className="mt-8">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => handlePageChange(currentPage - 1)}
                          className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                      
                      {pageNumbers.map((number) => (
                        <PaginationItem key={number}>
                          <PaginationLink
                            onClick={() => handlePageChange(number)}
                            isActive={currentPage === number}
                          >
                            {number}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => handlePageChange(currentPage + 1)}
                          className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
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
