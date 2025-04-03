
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SalonCard } from "@/components/marketplace/SalonCard";
import { SalonDetailsDialog } from "@/components/marketplace/SalonDetailsDialog";
import { SalonFilter } from "@/components/marketplace/SalonFilter";
import { Salon, salons } from "@/components/marketplace/mockData";

const SalonMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const viewSalonDetails = (salon: Salon) => {
    setSelectedSalon(salon);
    setIsDialogOpen(true);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif font-bold mb-2 text-center">Salon Marketplace</h1>
        <p className="text-center text-gray-600 mb-8">Browse salons for sale across the country</p>
        
        <SalonFilter
          searchTerm={searchTerm}
          locationFilter={locationFilter}
          priceFilter={priceFilter}
          setSearchTerm={setSearchTerm}
          setLocationFilter={setLocationFilter}
          setPriceFilter={setPriceFilter}
        />

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Salons</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="recent">Recently Added</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSalons.map((salon) => (
                <SalonCard 
                  key={salon.id} 
                  salon={salon} 
                  viewDetails={() => viewSalonDetails(salon)} 
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="featured" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSalons
                .filter(salon => salon.featured)
                .map((salon) => (
                  <SalonCard 
                    key={salon.id} 
                    salon={salon} 
                    viewDetails={() => viewSalonDetails(salon)} 
                  />
                ))
              }
            </div>
          </TabsContent>
          <TabsContent value="recent" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSalons
                .slice(0, 3)
                .map((salon) => (
                  <SalonCard 
                    key={salon.id} 
                    salon={salon} 
                    viewDetails={() => viewSalonDetails(salon)} 
                  />
                ))
              }
            </div>
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
