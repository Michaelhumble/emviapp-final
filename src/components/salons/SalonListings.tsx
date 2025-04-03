
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, Phone, DollarSign, Users, Building, 
  Star, Calendar, Home, Ruler, Sparkles, Info, Check 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Job } from "@/types/job";
import SalonDetailModal from "./SalonDetailModal";

interface SalonListingsProps {
  salonsForSale: Job[];
}

export const SalonListings = ({ salonsForSale }: SalonListingsProps) => {
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [sizeRange, setSizeRange] = useState<[number, number]>([0, 5000]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedSalon, setSelectedSalon] = useState<Job | null>(null);

  // Check if a salon is expired (for demo purposes, using random)
  const isExpired = (salon: Job) => {
    // In a real application, this would check the creation date against current date
    if (salon.id === "104") return true; // Make one of the salons expired for demonstration
    return false;
  };

  // Filter salons based on selected criteria
  const filteredSalons = salonsForSale.filter(salon => {
    const matchesLocation = locationFilter === "" || 
      salon.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    const priceValue = parseFloat(salon.asking_price?.replace(/[^0-9.-]+/g, "") || "0");
    const matchesPrice = priceValue >= priceRange[0] && priceValue <= priceRange[1];
    
    const sizeValue = parseFloat(salon.square_feet?.replace(/[^0-9.-]+/g, "") || "0");
    const matchesSize = sizeValue >= sizeRange[0] && sizeValue <= sizeRange[1];
    
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "active" && !isExpired(salon)) ||
      (statusFilter === "expired" && isExpired(salon));
    
    return matchesLocation && matchesPrice && matchesSize && matchesStatus;
  });
  
  const handleViewDetails = (salon: Job) => {
    setSelectedSalon(salon);
  };
  
  const handleCloseModal = () => {
    setSelectedSalon(null);
  };

  return (
    <div className="space-y-6">
      {/* Smart filters section */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium mb-4">Smart Filters</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-sm text-gray-600 block mb-1">Location</label>
            <Input 
              placeholder="Any location..." 
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="text-sm text-gray-600 block mb-1">Price Range</label>
            <div className="flex items-center gap-2">
              <span className="text-xs">${priceRange[0].toLocaleString()}</span>
              <Slider 
                defaultValue={[0, 500000]} 
                max={500000} 
                step={10000}
                onValueChange={(value) => setPriceRange([value[0], value[1]])}
                className="flex-1" 
              />
              <span className="text-xs">${priceRange[1].toLocaleString()}</span>
            </div>
          </div>
          
          <div>
            <label className="text-sm text-gray-600 block mb-1">Size (sqft)</label>
            <div className="flex items-center gap-2">
              <span className="text-xs">{sizeRange[0]}</span>
              <Slider 
                defaultValue={[0, 5000]} 
                max={5000} 
                step={100}
                onValueChange={(value) => setSizeRange([value[0], value[1]])}
                className="flex-1" 
              />
              <span className="text-xs">{sizeRange[1]}</span>
            </div>
          </div>
          
          <div>
            <label className="text-sm text-gray-600 block mb-1">Status</label>
            <Select 
              value={statusFilter} 
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Pricing info card */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl shadow-sm border border-blue-100 text-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="flex items-center">
            <Badge variant="outline" className="bg-white text-gray-800 font-normal text-sm py-1.5">
              Standard Listing: $20
            </Badge>
          </div>
          <div className="flex items-center">
            <Badge variant="outline" className="bg-white text-gray-800 font-normal text-sm py-1.5">
              Nationwide Boost: +$10
            </Badge>
          </div>
          <Button variant="default" className="bg-gradient-to-r from-purple-600 to-blue-600">
            Post Your Salon For Sale
          </Button>
        </div>
      </div>
      
      {/* Salon listings grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredSalons.length > 0 ? (
          filteredSalons.map((salon) => {
            const expired = isExpired(salon);
            
            return (
              <motion.div
                key={salon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: (parseInt(salon.id) - 100) * 0.1 }}
              >
                <Card className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full ${expired ? 'border-orange-200' : ''}`}>
                  {expired && (
                    <div className="bg-orange-50 border-b border-orange-200 p-3 text-center">
                      <p className="text-orange-800 text-sm">
                        Tin đã hết hạn – Vui lòng đăng lại để tiếp tục tiếp cận khách hàng mới.
                      </p>
                    </div>
                  )}
                  
                  <div 
                    className="h-56 bg-center bg-cover relative" 
                    style={{ backgroundImage: `url(${salon.image || ''})` }}
                  >
                    <div className="absolute inset-0 bg-black/30 flex items-end">
                      <div className="p-4 w-full flex justify-between items-end">
                        <Badge className="bg-primary/90 hover:bg-primary text-white text-lg py-1 px-3">
                          {salon.asking_price}
                        </Badge>
                        
                        {salon.emvi_ai_boosted && (
                          <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                            <Sparkles className="h-3.5 w-3.5 mr-1" />
                            Được EmviAI quảng bá toàn quốc
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-5">
                    <div className="mb-3">
                      <h3 className="font-bold text-lg font-serif">{salon.company}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{salon.location}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center text-sm">
                        <Building className="w-4 h-4 mr-2 text-gray-500" />
                        <span>Rent: {salon.monthly_rent}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="w-4 h-4 mr-2 text-gray-500" />
                        <span>{salon.number_of_stations} Stations</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                        <span>Rev: {salon.revenue}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Ruler className="w-4 h-4 mr-2 text-gray-500" />
                        <span>{salon.square_feet} sqft</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {salon.salon_features?.map((feature, index) => (
                        <Badge key={index} variant="outline" className="bg-purple-50">
                          {feature}
                        </Badge>
                      ))}
                      
                      {salon.has_housing && (
                        <Badge variant="outline" className="bg-green-50 text-green-800">
                          <Home className="w-3 h-3 mr-1" />
                          Chỗ ở
                        </Badge>
                      )}
                      
                      {salon.owner_will_train && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-800">
                          <Check className="w-3 h-3 mr-1" />
                          Training
                        </Badge>
                      )}
                    </div>
                    
                    <div className="mt-3 mb-4 text-sm border-l-2 border-primary pl-3 italic">
                      <p className="mb-1">{salon.vietnamese_description}</p>
                      <p className="text-gray-600">{salon.description}</p>
                    </div>
                    
                    <div className="mt-3 mb-2 text-sm">
                      <div className="flex items-center text-gray-700">
                        <Info className="w-4 h-4 mr-2 text-gray-500" />
                        <span>Lý do bán: {salon.reason_for_selling}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-4">
                      {!expired ? (
                        <>
                          <Button variant="outline" className="gap-1">
                            <Phone className="h-4 w-4" />
                            {salon.contact_info?.phone}
                          </Button>
                          <Button onClick={() => handleViewDetails(salon)}>
                            View Details
                          </Button>
                        </>
                      ) : (
                        <div className="w-full">
                          <Button className="w-full" variant="outline">
                            Contact for more information
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-xs text-center text-gray-500 mt-4 pt-2 border-t">
                      Want your ad seen nationwide? 
                      <Button variant="link" className="text-xs p-0 h-auto ml-1">Boost Ad</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })
        ) : (
          <div className="col-span-2 py-8 text-center">
            <p className="text-gray-500">No salons match your filters. Try adjusting your criteria.</p>
          </div>
        )}
      </div>
      
      {/* Salon detail modal */}
      <SalonDetailModal
        salon={selectedSalon}
        isOpen={!!selectedSalon}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default SalonListings;
