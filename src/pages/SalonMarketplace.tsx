import { useState } from "react";
import { Search, Frown, Star } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SalonCard } from "@/components/marketplace/SalonCard";
import { SalonDetailsDialog } from "@/components/marketplace/SalonDetailsDialog";
import { SalonFilter } from "@/components/marketplace/SalonFilter";
import { Salon, salons } from "@/components/marketplace/mockData";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/context/auth";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

const SalonMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useAuth();

  // Use the salon data with original images preserved - DON'T MODIFY IMAGES
  const enhancedSalons = salons;

  const filteredSalons = enhancedSalons.filter(salon => {
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

  const viewSalonDetails = (salon: Salon) => {
    // Pass the salon with original image intact
    setSelectedSalon(salon);
    setIsDialogOpen(true);
  };

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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif font-bold mb-2 text-center">Salon Marketplace</h1>
        <p className="text-center text-gray-600 mb-8">Browse salons for sale across the country</p>
        
        {/* Luxury Hero Banner with Text Overlay */}
        <div className="relative w-full mb-10 overflow-hidden rounded-lg">
          <ImageWithFallback
            src="/lovable-uploads/98f473d0-0359-4114-9bcc-c9aea3c6fcf6.png"
            alt="Luxury beauty salon entrance with FOR SALE sign"
            className="w-full h-auto object-cover"
            priority={true}
          />
          {/* Text Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-playfair text-[#FAFAFA] mb-2 drop-shadow-sm">
              List Your Salon with Confidence
            </h2>
            <p className="text-xl md:text-2xl font-playfair font-normal text-[#FAFAFA] drop-shadow-sm">
              Đăng Tin Bán Tiệm với Sự Tự Tin
            </p>
          </div>
        </div>
        
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
