
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MapPin, DollarSign, Users, Calendar, Pulse, ArrowRight, Building, Star } from "lucide-react";

const SalonMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const salons = [
    {
      id: 1,
      name: "Paris Nails & Spa",
      location: "Houston, TX",
      price: 180000,
      monthlyRent: 3500,
      staff: 8,
      revenue: 25000,
      description: {
        vi: "Tiệm đẹp, khu tốt, khách sang. Đã hoạt động 5 năm, có khách quen ổn định. Chủ cần về Việt Nam nên muốn bán gấp.",
        en: "Beautiful salon in a great area with upscale clientele. Established for 5 years with a stable customer base. Owner needs to return to Vietnam, looking for quick sale."
      },
      willTrain: true,
      images: ["salon1.jpg", "salon2.jpg"],
      featured: true
    },
    {
      id: 2,
      name: "Diamond Nails",
      location: "Atlanta, GA",
      price: 120000,
      monthlyRent: 2800,
      staff: 6,
      revenue: 18000,
      description: {
        vi: "Tiệm rộng rãi, khu tốt, vị trí đẹp. Đã hoạt động 3 năm. Chủ muốn đổi ngành nên bán.",
        en: "Spacious salon in a good area, great location. Operating for 3 years. Owner looking to change industries."
      },
      willTrain: true,
      images: ["salon3.jpg", "salon4.jpg"],
      featured: false
    },
    {
      id: 3,
      name: "Luxury Nails & Spa",
      location: "Miami, FL",
      price: 250000,
      monthlyRent: 4200,
      staff: 12,
      revenue: 35000,
      description: {
        vi: "Tiệm cao cấp trong khu thượng lưu Miami. Được trang bị đầy đủ thiết bị hiện đại. Doanh thu cao và ổn định.",
        en: "Upscale salon in Miami's affluent area. Fully equipped with modern equipment. High and stable revenue."
      },
      willTrain: false,
      images: ["salon5.jpg", "salon6.jpg"],
      featured: true
    },
    {
      id: 4,
      name: "Golden Nails",
      location: "Los Angeles, CA",
      price: 200000,
      monthlyRent: 5000,
      staff: 10,
      revenue: 30000,
      description: {
        vi: "Tiệm trong trung tâm mua sắm sầm uất. Khách hàng ổn định, doanh thu cao. Chủ về hưu nên muốn bán.",
        en: "Salon in a busy shopping center. Stable clientele, high revenue. Owner retiring and looking to sell."
      },
      willTrain: true,
      images: ["salon7.jpg", "salon8.jpg"],
      featured: false
    },
    {
      id: 5,
      name: "Royal Nails",
      location: "Dallas, TX",
      price: 150000,
      monthlyRent: 3000,
      staff: 7,
      revenue: 22000,
      description: {
        vi: "Tiệm đẹp, khu dân cư cao cấp. Hoạt động 4 năm, có lượng khách hàng ổn định.",
        en: "Beautiful salon in an upscale residential area. Operating for 4 years with a stable customer base."
      },
      willTrain: true,
      images: ["salon9.jpg", "salon10.jpg"],
      featured: true
    },
    {
      id: 6,
      name: "Queen Nails",
      location: "Chicago, IL",
      price: 170000,
      monthlyRent: 3800,
      staff: 9,
      revenue: 27000,
      description: {
        vi: "Tiệm rộng rãi tại khu trung tâm Chicago. Thiết kế hiện đại, trang thiết bị mới.",
        en: "Spacious salon in downtown Chicago. Modern design with new equipment."
      },
      willTrain: false,
      images: ["salon11.jpg", "salon12.jpg"],
      featured: false
    }
  ];

  const filteredSalons = salons.filter(salon => {
    // Filter by search term
    const matchesSearch = 
      salon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salon.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salon.description.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salon.description.vi.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by location
    const matchesLocation = locationFilter === 'all' || 
      salon.location.toLowerCase().includes(locationFilter.toLowerCase());

    // Filter by price
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

  const viewSalonDetails = (salon) => {
    setSelectedSalon(salon);
    setIsDialogOpen(true);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  // AI price analysis (placeholder)
  const getPriceAnalysis = (salon) => {
    const marketAvg = 180000;
    const priceDiff = (salon.price - marketAvg) / marketAvg * 100;
    
    if (priceDiff < -10) {
      return {
        assessment: "Below market average",
        suggestion: "Potential good deal. Consider fast action.",
        color: "text-green-600"
      };
    } else if (priceDiff > 10) {
      return {
        assessment: "Above market average",
        suggestion: "Premium location or high-end clientele may justify price.",
        color: "text-orange-500"
      };
    } else {
      return {
        assessment: "At market average",
        suggestion: "Fair pricing for the area and business size.",
        color: "text-blue-500"
      };
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-serif font-bold mb-2 text-center">Salon Marketplace</h1>
        <p className="text-center text-gray-600 mb-8">Browse salons for sale across the country</p>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-grow">
            <Input
              placeholder="Search by name, location, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full md:w-48">
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="tx">Texas</SelectItem>
                <SelectItem value="ca">California</SelectItem>
                <SelectItem value="fl">Florida</SelectItem>
                <SelectItem value="ga">Georgia</SelectItem>
                <SelectItem value="il">Illinois</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-48">
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under100k">Under $100K</SelectItem>
                <SelectItem value="100k-200k">$100K - $200K</SelectItem>
                <SelectItem value="over200k">Over $200K</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs */}
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
                .slice(0, 3) // Just showing last 3 as "recent" for the demo
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
        
        {/* Salon Details Dialog */}
        <Dialog 
          open={isDialogOpen} 
          onOpenChange={setIsDialogOpen}
        >
          {selectedSalon && (
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-serif">{selectedSalon.name}</DialogTitle>
                <DialogDescription className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" /> {selectedSalon.location}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="aspect-video bg-gray-200 mb-4 rounded-md overflow-hidden">
                    <img 
                      src="/placeholder.svg" 
                      alt={selectedSalon.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-gray-200 aspect-square rounded-md"></div>
                    <div className="bg-gray-200 aspect-square rounded-md"></div>
                    <div className="bg-gray-200 aspect-square rounded-md"></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-xl font-serif mb-2">Details</h3>
                    <div className="grid grid-cols-2 gap-y-3">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2" /> Asking Price
                      </div>
                      <div className="font-semibold">{formatPrice(selectedSalon.price)}</div>
                      
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2" /> Monthly Rent
                      </div>
                      <div>{formatPrice(selectedSalon.monthlyRent)}</div>
                      
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" /> Staff
                      </div>
                      <div>{selectedSalon.staff} people</div>
                      
                      <div className="flex items-center">
                        <Pulse className="h-4 w-4 mr-2" /> Monthly Revenue
                      </div>
                      <div>{formatPrice(selectedSalon.revenue)}</div>
                      
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" /> Will Train
                      </div>
                      <div>{selectedSalon.willTrain ? "Yes" : "No"}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-xl font-serif mb-2">AI Price Analysis</h3>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className={`font-semibold ${getPriceAnalysis(selectedSalon).color}`}>
                        {getPriceAnalysis(selectedSalon).assessment}
                      </div>
                      <p className="text-sm text-gray-600">{getPriceAnalysis(selectedSalon).suggestion}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-xl font-serif">Description</h3>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="mb-2 text-gray-800">{selectedSalon.description.vi}</p>
                      <p className="text-gray-600">{selectedSalon.description.en}</p>
                    </div>
                  </div>
                  
                  <Button className="w-full">Contact Seller</Button>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </Layout>
  );
};

const SalonCard = ({ salon, viewDetails }) => {
  const priceAnalysis = (() => {
    const marketAvg = 180000;
    const priceDiff = (salon.price - marketAvg) / marketAvg * 100;
    
    if (priceDiff < -10) return { text: "Good Deal", color: "bg-green-100 text-green-800" };
    if (priceDiff > 10) return { text: "Premium", color: "bg-orange-100 text-orange-800" };
    return { text: "Fair Price", color: "bg-blue-100 text-blue-800" };
  })();

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        <div className="aspect-video bg-gray-200">
          <img 
            src="/placeholder.svg" 
            alt={salon.name} 
            className="w-full h-full object-cover"
          />
        </div>
        {salon.featured && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full flex items-center">
            <Star className="h-3 w-3 mr-1" /> Featured
          </div>
        )}
      </div>
      
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{salon.name}</h3>
          <span className="font-bold text-lg">{new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
          }).format(salon.price)}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3 text-sm">
          <MapPin className="h-3 w-3 mr-1" /> {salon.location}
        </div>
        
        <div className="grid grid-cols-2 gap-y-2 mb-4 text-sm">
          <div className="flex items-center">
            <Users className="h-3 w-3 mr-1 text-gray-500" /> {salon.staff} Staff
          </div>
          <div className="flex items-center">
            <Building className="h-3 w-3 mr-1 text-gray-500" /> ${salon.monthlyRent}/mo
          </div>
          <div className="flex items-center">
            <Pulse className="h-3 w-3 mr-1 text-gray-500" /> ${salon.revenue/1000}k Revenue
          </div>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1 text-gray-500" /> {salon.willTrain ? "Will Train" : "No Training"}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className={`text-xs px-2 py-1 rounded-full ${priceAnalysis.color}`}>
            {priceAnalysis.text}
          </span>
          <Button variant="outline" size="sm" onClick={viewDetails}>
            Details <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonMarketplace;
