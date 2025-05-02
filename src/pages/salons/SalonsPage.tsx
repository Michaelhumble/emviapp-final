
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchIcon, MapPinIcon, SliderIcon } from "lucide-react";
import { Salon } from "@/types/salon";
import ListingsGrid from "@/components/listings/ListingsGrid";
import { salonListings } from "@/components/home/SalonJobListingsShowcase";

const SalonsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSalons, setFilteredSalons] = useState<Salon[]>(salonListings);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Find Beauty Salons Near You | EmviApp";
  }, []);

  useEffect(() => {
    setLoading(true);
    // Simulating API request delay
    const timer = setTimeout(() => {
      filterSalons();
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm, activeTab]);

  const filterSalons = () => {
    let results = [...salonListings];

    // Filter by search term if provided
    if (searchTerm.trim()) {
      const searchTermLower = searchTerm.toLowerCase();
      results = results.filter(salon => {
        const name = typeof salon.name === 'string' ? salon.name.toLowerCase() : '';
        const location = typeof salon.location === 'string' ? salon.location.toLowerCase() : '';
        const description = typeof salon.description === 'string' ? salon.description.toLowerCase() : '';
        
        return (
          name.includes(searchTermLower) ||
          location.includes(searchTermLower) ||
          description.includes(searchTermLower)
        );
      });
    }

    // Filter by salon type if not "all"
    if (activeTab !== "all") {
      results = results.filter(salon => {
        const salonType = typeof salon.salon_type === 'string' ? 
          salon.salon_type.toLowerCase() : '';
        return salonType === activeTab;
      });
    }

    setFilteredSalons(results);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterSalons();
  };

  const salonCategories = [
    { id: "all", label: "All Salons" },
    { id: "nail", label: "Nail Salons" },
    { id: "hair", label: "Hair Salons" },
    { id: "barber", label: "Barbershops" },
    { id: "spa", label: "Spas" },
    { id: "eyelash", label: "Eyelash" },
  ];

  return (
    <Layout>
      <Container className="py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Find Your Perfect Salon</h1>
        <p className="text-gray-600 mb-8">
          Browse top-rated beauty salons and spas in your area
        </p>
        
        {/* Search and filters */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input 
                placeholder="Search by name, location, or services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">
              Search
            </Button>
          </form>
          
          {/* Category tabs */}
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full overflow-x-auto flex flex-nowrap justify-start mb-6">
              {salonCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="px-4 py-2 text-sm"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        {/* Quick filter buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button variant="outline" size="sm">
            <MapPinIcon className="mr-2 h-4 w-4" /> Near Me
          </Button>
          <Button variant="outline" size="sm">
            <SliderIcon className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>
        
        {/* Results */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Searching for salons...</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <h2 className="text-lg font-medium">
                {filteredSalons.length} Salons Found
              </h2>
            </div>
            
            <ListingsGrid 
              listings={filteredSalons}
              emptyMessage="No salons match your search criteria. Try adjusting your filters or search terms."
            />
          </>
        )}
      </Container>
    </Layout>
  );
};

export default SalonsPage;
