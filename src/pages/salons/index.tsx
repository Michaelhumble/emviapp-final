
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import SalonCard from "@/components/salons/SalonCard";
import SalonFilter from "@/components/salons/SalonFilter";
import FeaturedSalons from "@/components/salons/FeaturedSalons";
import EmptyState from "@/components/salons/EmptyState";
import LoadingState from "@/components/salons/LoadingState";
import { Plus } from "lucide-react";
import { useSalonsData } from "@/hooks/useSalonsData";

const SalonsPage = () => {
  const navigate = useNavigate();
  const { 
    salons, 
    loading, 
    error, 
    filters, 
    updateFilters, 
    resetFilters,
    featuredSalons 
  } = useSalonsData();

  useEffect(() => {
    document.title = "Salon Directory | EmviApp";
  }, []);

  const handleListSalon = () => {
    // Navigate to the salon listing form page (to be implemented)
    navigate('/salons/list');
  };

  return (
    <Layout>
      <Helmet>
        <title>Salon Directory | Find or List Nail Salons | EmviApp</title>
        <meta 
          name="description" 
          content="Browse our comprehensive directory of nail salons. Find the perfect salon near you or list your own salon for potential clients and staff to discover." 
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-2">
                Salon Directory
              </h1>
              <p className="text-gray-600">
                Find the perfect salon near you or list your own salon for potential clients and staff.
              </p>
            </div>
            
            <Button 
              onClick={handleListSalon}
              className="mt-4 md:mt-0 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              List Your Salon
            </Button>
          </div>
          
          {/* Featured salons */}
          {!loading && featuredSalons.length > 0 && (
            <FeaturedSalons featuredSalons={featuredSalons} />
          )}
          
          {/* Search and filters */}
          <SalonFilter 
            filters={filters} 
            updateFilters={updateFilters} 
            resetFilters={resetFilters} 
          />
          
          {/* Banner/CTA section */}
          <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg p-6 mb-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="font-playfair text-xl font-semibold mb-2">Sell your salon or advertise booth rentals</h3>
                <p className="text-gray-700 max-w-xl">
                  Reach thousands of potential buyers and renters by listing your salon for sale or advertising available booth rentals.
                </p>
              </div>
              <Button 
                onClick={handleListSalon}
                size="lg"
                className="whitespace-nowrap"
              >
                Get Started
              </Button>
            </div>
          </div>
          
          {/* Main grid of salons */}
          <h2 className="font-playfair text-2xl font-semibold mb-6">All Salons</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {loading ? (
              <LoadingState count={6} />
            ) : error ? (
              <div className="col-span-full text-center py-10">
                <p className="text-red-500 mb-2">Failed to load salons</p>
                <Button onClick={() => window.location.reload()}>
                  Retry
                </Button>
              </div>
            ) : salons.length > 0 ? (
              salons.map((salon, index) => (
                <SalonCard 
                  key={salon.id} 
                  salon={salon} 
                  index={index} 
                />
              ))
            ) : (
              <EmptyState resetFilters={resetFilters} />
            )}
          </div>
          
          {/* Bottom CTA */}
          <div className="text-center mb-12">
            <Link to="/sign-up">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-primary hover:bg-primary/10"
              >
                Create an Account to List Your Salon
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mt-2">
              Free listings available for a limited time
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SalonsPage;
