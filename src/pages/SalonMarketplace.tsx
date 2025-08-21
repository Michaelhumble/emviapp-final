import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Search, Frown, Star } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SalonCard } from "@/components/marketplace/SalonCard";
import { SalonDetailsDialog } from "@/components/marketplace/SalonDetailsDialog";
import { SalonFilter } from "@/components/marketplace/SalonFilter";
import { Salon, salons } from "@/components/marketplace/mockData";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/context/auth";

const SalonMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    console.log('SalonMarketplace page rendered - no banner');
  }, []);

  // Use salon data with all original images preserved
  const filteredSalons = salons.filter(salon => {
    const matchesSearch = 
      salon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salon.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salon.description.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salon.description.vi.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = locationFilter === 'all' || 
      salon.location.toLowerCase().includes(locationFilter.toLowerCase());

    let matchesPrice = true;
    if (priceFilter === 'under100k') {
      matchesPrice = salon.price < 100000;
    } else if (priceFilter === '100k-200k') {
      matchesPrice = salon.price >= 100000 && salon.price <= 200000;
    } else if (priceFilter === 'over200k') {
      matchesPrice = salon.price > 200000;
    }

    return matchesSearch && matchesLocation && matchesPrice;
  });

  // Put featured salons at the top
  const sortedSalons = [...filteredSalons].sort((a, b) => {
    if (a.featured === b.featured) return 0;
    return a.featured ? -1 : 1;
  });

  // Component for displaying no results message
  const NoResults = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-gray-100 p-4 rounded-full mb-4">
        <Search className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium mb-2">No salons found</h3>
      <p className="text-gray-500 text-center mb-6">
        Try adjusting your filters or search terms
      </p>
      <div className="flex gap-4">
        <button 
          onClick={() => {
            setSearchTerm("");
            setLocationFilter("all");
            setPriceFilter("all");
          }}
          className="text-sm text-primary hover:underline"
        >
          Clear all filters
        </button>
      </div>
    </div>
  );

  // Helper function to render salon grid
  const renderSalonGrid = (salons: Salon[]) => {
    if (salons.length === 0) {
      return <NoResults />;
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {salons.map((salon) => (
          <SalonCard 
            key={salon.id} 
            salon={salon} 
            viewDetails={() => viewSalonDetails(salon)} 
          />
        ))}
      </div>
    );
  };

  // Function to view salon details
  const viewSalonDetails = (salon: Salon) => {
    // Pass the salon with original image intact - never modify it
    setSelectedSalon(salon);
    setIsDialogOpen(true);
  };

  return (
    <Layout>
      <Helmet>
        <title>Premium Salon Marketplace - Established Beauty Businesses for Sale | EmviApp</title>
        <meta name="description" content="Browse verified salon businesses with khách sang clientele and tip cao potential. Established beauty businesses with proven financials and loyal customer bases." />
        <link rel="canonical" href="https://www.emvi.app/salons" />
      </Helmet>

      {/* SEO Meta */}
      <div style={{ display: 'none' }}>
        <script type="application/ld+json">
          {JSON.stringify([{
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "EmviApp Salon Marketplace",
            "description": "Premium salon marketplace featuring established beauty businesses for sale across the United States.",
            "url": "https://www.emvi.app/salons",
            "industry": "Beauty and Personal Care",
            "areaServed": "US",
            "offers": {
              "@type": "Offer",
              "description": "Salon businesses for sale with verified financials and established clientele"
            }
          }, {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How are salon businesses verified on EmviApp?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Every salon listing undergoes thorough verification including financial records review, license verification, and operational assessment to ensure legitimate investment opportunities."
                }
              },
              {
                "@type": "Question",
                "name": "What information is provided about each salon for sale?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Listings include detailed financial history, client retention rates, revenue streams, equipment inventory, lease terms, and growth potential analysis for informed decision-making."
                }
              },
              {
                "@type": "Question",
                "name": "Can I finance a salon purchase through EmviApp?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "While we don't provide direct financing, we connect buyers with trusted lenders specializing in beauty business acquisitions and offer guidance on SBA loans and other financing options."
                }
              },
              {
                "@type": "Question",
                "name": "What support is available after purchasing a salon?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our platform provides ongoing support including staff recruitment assistance, business optimization resources, and connections to industry suppliers and marketing specialists."
                }
              }
            ]
          }])}
        </script>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* SEO Intro Content */}
        <section className="mb-12">
          <h1 className="text-4xl font-serif font-bold mb-4 text-center">Premium Salon Marketplace - Established Beauty Businesses</h1>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">Discover Profitable Salon Opportunities with Khách Sang Clientele</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="text-center mb-6">Browse verified salon businesses for sale across the country, each offering established revenue streams and loyal customer bases.</p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="mb-4">
                    EmviApp's salon marketplace connects serious buyers with premium beauty businesses that have proven track records of success. Every listing features detailed financial information, including revenue history, client retention rates, and growth potential analysis. Our curated selection ensures you're investing in salons with genuine khách sang clientele and sustainable business models.
                  </p>
                  <p className="mb-4">
                    From established nail studios generating consistent tip cao income to full-service salons with diversified revenue streams, our marketplace offers opportunities across all beauty sectors. Each business has been thoroughly vetted, with verified financial records and transparent operational metrics.
                  </p>
                </div>
                <div>
                  <p className="mb-4">
                    Whether you're an experienced salon owner looking to expand your portfolio or a skilled beauty professional ready to transition into business ownership, EmviApp provides the tools and insights needed to make informed investment decisions. Our platform includes detailed market analysis, competitive positioning data, and growth projections for each listed property.
                  </p>
                  <p className="mb-4">
                    Connect with <a href="/jobs" className="text-primary underline">top beauty professionals</a> to staff your new location, or explore our <a href="/artists" className="text-primary underline">network of skilled artists</a> for partnership opportunities. Building the right team is crucial for continued success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">Salon Investment FAQs</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3">How are salon businesses verified on EmviApp?</h3>
                <p className="text-gray-700">Every salon listing undergoes thorough verification including financial records review, license verification, and operational assessment to ensure legitimate investment opportunities.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3">What information is provided about each salon for sale?</h3>
                <p className="text-gray-700">Listings include detailed financial history, client retention rates, revenue streams, equipment inventory, lease terms, and growth potential analysis for informed decision-making.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3">Can I finance a salon purchase through EmviApp?</h3>
                <p className="text-gray-700">While we don't provide direct financing, we connect buyers with trusted lenders specializing in beauty business acquisitions and offer guidance on SBA loans and other financing options.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3">What support is available after purchasing a salon?</h3>
                <p className="text-gray-700">Our platform provides ongoing support including staff recruitment assistance, business optimization resources, and connections to industry suppliers and marketing specialists.</p>
              </div>
            </div>
          </div>
        </section>
        
        <SalonFilter
          searchTerm={searchTerm}
          locationFilter={locationFilter}
          priceFilter={priceFilter}
          setSearchTerm={setSearchTerm}
          setLocationFilter={setLocationFilter}
          setPriceFilter={setPriceFilter}
        />

        {filteredSalons.length === 0 && searchTerm.length > 0 && (
          <Alert className="mb-6">
            <AlertDescription className="flex items-center gap-2">
              <Frown className="h-4 w-4" />
              No results found for "{searchTerm}". Try different keywords or clear filters.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Salons</TabsTrigger>
            <TabsTrigger value="featured" className="flex items-center">
              <Star className="h-3 w-3 mr-1 text-amber-500" /> Featured
            </TabsTrigger>
            <TabsTrigger value="recent">Recently Added</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-0">
            {renderSalonGrid(sortedSalons)}
          </TabsContent>
          <TabsContent value="featured" className="mt-0">
            {renderSalonGrid(sortedSalons.filter(salon => salon.featured))}
          </TabsContent>
          <TabsContent value="recent" className="mt-0">
            {renderSalonGrid(sortedSalons.slice(0, 3))}
          </TabsContent>
        </Tabs>
        
        <SalonDetailsDialog 
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          salon={selectedSalon}
        />
      </div>
    </Layout>
  );
};

export default SalonMarketplace;
