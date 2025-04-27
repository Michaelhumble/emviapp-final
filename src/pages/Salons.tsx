
import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { useSalonsData } from '@/hooks/useSalonsData';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const SalonsPage = () => {
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
    suggestedKeywords = [] // Provide default empty array
  } = useSalonsData();

  return (
    <Layout>
      <Helmet>
        <title>Salons | EmviApp</title>
        <meta 
          name="description" 
          content="Browse available nail salons"
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-serif font-bold mb-2">
            Salons
          </h1>
          <p className="text-gray-600 mb-8">
            Discover premium nail salons
          </p>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Skeleton key={item} className="h-64 rounded-md" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">Error loading salons. Please try again later.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {salons.map((salon) => (
                <div key={salon.id} className="border rounded-md p-4">
                  <h3 className="font-medium">{salon.name}</h3>
                  <p className="text-sm text-gray-600">{salon.location}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SalonsPage;
