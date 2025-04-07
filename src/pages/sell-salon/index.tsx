
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus, Store, MapPin, DollarSign, Building, Loader2 } from "lucide-react";
import { SalonSale } from "@/types/salonSale";
import { fetchSalonSales, formatCurrency } from "@/utils/salonSales";
import SalonListingDetail from "@/components/sell-salon/SalonListingDetail";

const SalonSalesPage = () => {
  const navigate = useNavigate();
  const [salonSales, setSalonSales] = useState<SalonSale[]>([]);
  const [filteredSales, setFilteredSales] = useState<SalonSale[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSalon, setSelectedSalon] = useState<SalonSale | null>(null);

  useEffect(() => {
    const loadSalonSales = async () => {
      setIsLoading(true);
      try {
        const data = await fetchSalonSales();
        setSalonSales(data);
        setFilteredSales(data);
      } catch (error) {
        console.error("Error loading salon sales:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSalonSales();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredSales(salonSales);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = salonSales.filter(
      (salon) =>
        salon.salon_name.toLowerCase().includes(term) ||
        salon.city.toLowerCase().includes(term) ||
        salon.state.toLowerCase().includes(term) ||
        salon.business_type?.toLowerCase().includes(term)
    );
    setFilteredSales(filtered);
  }, [searchTerm, salonSales]);

  const handleViewDetails = (salon: SalonSale) => {
    setSelectedSalon(salon);
  };

  const getBusinessTypeIcon = (type?: string) => {
    switch (type) {
      case "Nails":
        return <Store className="h-4 w-4" />;
      case "Hair":
        return <Store className="h-4 w-4" />;
      case "Spa":
        return <Building className="h-4 w-4" />;
      case "Barbershop":
        return <Store className="h-4 w-4" />;
      default:
        return <Store className="h-4 w-4" />;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif mb-2">Salons For Sale</h1>
            <p className="text-gray-600">
              Find the perfect salon opportunity for your next business venture
            </p>
          </div>
          <Button 
            className="mt-4 md:mt-0" 
            onClick={() => navigate("/sell-salon/new")}
          >
            <Plus className="mr-2 h-4 w-4" /> List Your Salon
          </Button>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by location, salon name, or business type..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredSales.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Store className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-medium mb-2">No Salon Listings Found</h2>
            <p className="text-gray-600 mb-6">
              There are currently no salon listings that match your search criteria.
            </p>
            <Button onClick={() => navigate("/sell-salon/new")}>
              List Your Salon
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSales.map((salon) => (
              <Card 
                key={salon.id} 
                className={`overflow-hidden transition-shadow hover:shadow-md ${
                  salon.is_urgent ? "border-amber-400" : ""
                }`}
              >
                <div className="aspect-video bg-gray-200 relative">
                  {salon.is_urgent && (
                    <div className="absolute top-2 right-2 bg-amber-400 text-white py-1 px-2 rounded-md text-xs font-medium">
                      Urgent
                    </div>
                  )}
                  <img
                    src="https://placehold.co/600x400/e2e8f0/64748b?text=Salon+Image"
                    alt={salon.salon_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold mb-2 truncate">
                    {salon.salon_name}
                  </h3>
                  <div className="flex items-center text-gray-500 mb-1">
                    <MapPin className="h-4 w-4 mr-1 shrink-0" />
                    <span className="text-sm truncate">
                      {salon.city}, {salon.state}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-500 mb-3">
                    {getBusinessTypeIcon(salon.business_type)}
                    <span className="text-sm ml-1">{salon.business_type || 'Salon'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-primary font-semibold">
                      <DollarSign className="h-4 w-4 shrink-0" />
                      {formatCurrency(salon.asking_price)}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails(salon)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {selectedSalon && (
        <SalonListingDetail
          salon={selectedSalon}
          onClose={() => setSelectedSalon(null)}
        />
      )}
    </Layout>
  );
};

export default SalonSalesPage;
