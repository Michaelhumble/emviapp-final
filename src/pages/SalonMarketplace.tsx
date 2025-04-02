
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, DollarSign, Users, Building, Star, Calendar, Info, TrendingUp } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Salons for sale data
const salonsForSale = [
  {
    id: 101,
    name: "Elite Nails & Spa",
    location: "Orlando, FL",
    price: "$120,000",
    rent: "$3,500/month",
    staff: 6,
    revenue: "$28,000/month",
    features: ["10 Years Established", "High Traffic Area", "Full Equipment"],
    description: {
      vi: "Tiệm rộng 1800sf, 6 ghế nail, 6 ghế spa pedicure. Tiệm đông khách, khu Mỹ trắng, income cao.",
      en: "1800sf salon, 6 nail stations, 6 spa pedicure chairs. Busy salon in upscale area with high income."
    },
    phone: "(407) 555-6789",
    images: [
      "https://images.unsplash.com/photo-1600948836101-f9ffda59d250",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e",
      "https://images.unsplash.com/photo-1562322140-8baeececf3df"
    ],
    aiInsights: "Premium location with strong client base. Based on local market trends, asking price is 4.2x annual profit, which is in line with industry standards for established salons in high-traffic areas.",
    priceRating: "Fair Price"
  },
  {
    id: 102,
    name: "Golden Nails",
    location: "San Diego, CA",
    price: "$180,000",
    rent: "$4,200/month",
    staff: 8,
    revenue: "$35,000/month",
    features: ["Prime Location", "Owner Will Train", "Loyal Customers"],
    description: {
      vi: "Tiệm đẹp khu Mỹ trắng, income ổn định. Chủ bán vì về hưu, sẽ training lại cho chủ mới.",
      en: "Beautiful salon in upscale area with stable income. Owner selling due to retirement, will train new owner."
    },
    phone: "(619) 555-7890",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e", 
      "https://images.unsplash.com/photo-1633681926022-86ed4f80ca1d",
      "https://images.unsplash.com/photo-1571290274554-6a2eaa771e5f"
    ],
    aiInsights: "This salon is positioned in a premium market with excellent customer retention. Based on current growth and market dynamics, the price represents a potential 35% ROI within 3 years.",
    priceRating: "Great Value"
  },
  {
    id: 103,
    name: "Serenity Nails & Spa",
    location: "Chicago, IL",
    price: "$95,000",
    rent: "$3,800/month",
    staff: 5,
    revenue: "$22,000/month",
    features: ["New Equipment", "Near Shopping Center", "Parking Available"],
    description: {
      vi: "Tiệm vị trí đắc địa, gần trung tâm mua sắm lớn. Mới trang bị lại toàn bộ thiết bị.",
      en: "Salon in ideal location near major shopping center. Recently upgraded all equipment."
    },
    phone: "(312) 555-8901",
    images: [
      "https://images.unsplash.com/photo-1604654894611-6973b376cbde",
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702",
      "https://images.unsplash.com/photo-1632345031435-8727f6897d53"
    ],
    aiInsights: "Recent equipment upgrades add significant value. Location near a high-traffic shopping center ensures consistent customer flow. Monthly revenue shows 15% growth potential based on seasonal patterns.",
    priceRating: "Slightly High"
  },
  {
    id: 104,
    name: "Bliss Nails",
    location: "Seattle, WA",
    price: "$155,000",
    rent: "$4,500/month",
    staff: 7,
    revenue: "$32,000/month",
    features: ["Established 12 Years", "Owner Retiring", "High-End Clientele"],
    description: {
      vi: "Tiệm cao cấp đã hoạt động 12 năm, khách hàng ổn định. Chủ bán vì về hưu.",
      en: "Upscale salon established for 12 years with stable clientele. Owner selling due to retirement."
    },
    phone: "(206) 555-9012",
    images: [
      "https://images.unsplash.com/photo-1610384104075-e05c8cf200c3",
      "https://images.unsplash.com/photo-1604654894610-df63bc536371",
      "https://images.unsplash.com/photo-1613966802194-d46a163af70c"
    ],
    aiInsights: "Long-established salon with premium clientele. The client retention rate is exceptional at 85%, which is 20% above industry average. Monthly revenue is stable with minimal seasonal fluctuation.",
    priceRating: "Fair Price"
  }
];

const SalonMarketplace = () => {
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [sortBy, setSortBy] = useState("default");
  const [priceFilter, setPriceFilter] = useState("all");

  const openSalonDetails = (salon) => {
    setSelectedSalon(salon);
    setSelectedImage(0);
  };

  const closeSalonDetails = () => {
    setSelectedSalon(null);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handlePriceFilterChange = (value) => {
    setPriceFilter(value);
  };

  // Apply sorting and filtering
  let displayedSalons = [...salonsForSale];
  
  // Apply price filtering
  if (priceFilter !== "all") {
    const minPrice = priceFilter === "under100k" ? 0 : priceFilter === "100k-150k" ? 100000 : 150000;
    const maxPrice = priceFilter === "under100k" ? 100000 : priceFilter === "100k-150k" ? 150000 : Number.MAX_SAFE_INTEGER;
    
    displayedSalons = displayedSalons.filter(salon => {
      const numericPrice = parseInt(salon.price.replace(/\D/g, ''));
      return numericPrice >= minPrice && numericPrice < maxPrice;
    });
  }
  
  // Apply sorting
  if (sortBy === "priceAsc") {
    displayedSalons.sort((a, b) => {
      const priceA = parseInt(a.price.replace(/\D/g, ''));
      const priceB = parseInt(b.price.replace(/\D/g, ''));
      return priceA - priceB;
    });
  } else if (sortBy === "priceDesc") {
    displayedSalons.sort((a, b) => {
      const priceA = parseInt(a.price.replace(/\D/g, ''));
      const priceB = parseInt(b.price.replace(/\D/g, ''));
      return priceB - priceA;
    });
  } else if (sortBy === "revenue") {
    displayedSalons.sort((a, b) => {
      const revenueA = parseInt(a.revenue.replace(/\D/g, ''));
      const revenueB = parseInt(b.revenue.replace(/\D/g, ''));
      return revenueB - revenueA;
    });
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 bg-[#FDFDFD]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-12">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <div>
                  <h1 className="text-3xl md:text-4xl font-serif mb-2">
                    Salon Nails Cần Bán — Cơ Hội Đầu Tư Tốt Nhất
                  </h1>
                  <p className="text-gray-600">
                    Giá từ $80,000 đến $300,000 — chọn vị trí đẹp, tiệm có thợ, và thu nhập cao.
                  </p>
                </div>
              </div>

              {/* AI Market Trend Analysis */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 mb-8">
                <div className="flex items-start">
                  <div className="rounded-full bg-purple-100 p-3 mr-4">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-serif mb-2">AI Market Analysis</h3>
                    <p className="text-gray-700 mb-3">Current market trends show salon businesses are selling for 3-5x annual profit. Prime locations in California and Florida command 10-15% premium over national average.</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white rounded-md p-3 shadow-sm">
                        <div className="text-sm text-gray-500">Avg. Sale Price</div>
                        <div className="text-lg font-bold">$138,500</div>
                      </div>
                      <div className="bg-white rounded-md p-3 shadow-sm">
                        <div className="text-sm text-gray-500">Avg. ROI Period</div>
                        <div className="text-lg font-bold">2.8 years</div>
                      </div>
                      <div className="bg-white rounded-md p-3 shadow-sm">
                        <div className="text-sm text-gray-500">Market Trend</div>
                        <div className="text-lg font-bold text-green-600">↑ 8.5%</div>
                      </div>
                      <div className="bg-white rounded-md p-3 shadow-sm">
                        <div className="text-sm text-gray-500">Hottest Market</div>
                        <div className="text-lg font-bold">South Florida</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <div>
                    <Select value={priceFilter} onValueChange={handlePriceFilterChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Price Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Prices</SelectItem>
                        <SelectItem value="under100k">Under $100K</SelectItem>
                        <SelectItem value="100k-150k">$100K - $150K</SelectItem>
                        <SelectItem value="over150k">Over $150K</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Featured</SelectItem>
                      <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                      <SelectItem value="priceDesc">Price: High to Low</SelectItem>
                      <SelectItem value="revenue">Revenue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {displayedSalons.map((salon) => (
                  <motion.div
                    key={salon.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: (salon.id - 100) * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                      <div 
                        className="h-56 bg-center bg-cover relative" 
                        style={{ backgroundImage: `url(${salon.images[0]})` }}
                      >
                        <div className="absolute inset-0 bg-black/30 flex items-end">
                          <div className="p-4 w-full flex justify-between items-end">
                            <Badge className="bg-primary/90 hover:bg-primary text-white text-lg py-1 px-3">
                              {salon.price}
                            </Badge>
                            <Badge className={`py-1 px-3 ${
                              salon.priceRating === "Great Value" 
                                ? "bg-green-500" 
                                : salon.priceRating === "Fair Price" 
                                ? "bg-blue-500"
                                : "bg-orange-500"
                            }`}>
                              {salon.priceRating}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <CardContent className="p-5">
                        <div className="mb-3">
                          <h3 className="font-bold text-lg">{salon.name}</h3>
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{salon.location}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="flex items-center text-sm">
                            <Building className="w-4 h-4 mr-2 text-gray-500" />
                            <span>Rent: {salon.rent}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Users className="w-4 h-4 mr-2 text-gray-500" />
                            <span>{salon.staff} Staff</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                            <span>Rev: {salon.revenue}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                            <span>Available Now</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {salon.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="bg-purple-50">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="mt-3 mb-4 text-sm border-l-2 border-primary pl-3 italic">
                          <p className="mb-1">{salon.description.vi}</p>
                          <p className="text-gray-600">{salon.description.en}</p>
                        </div>
                        
                        <div className="flex justify-between mt-4">
                          <Button variant="outline" className="gap-1">
                            <Phone className="h-4 w-4" />
                            {salon.phone}
                          </Button>
                          <Button onClick={() => openSalonDetails(salon)}>
                            View Details
                          </Button>
                        </div>
                        
                        <div className="text-xs text-center text-gray-500 mt-4 pt-2 border-t">
                          Want your ad seen nationwide? 
                          <Button variant="link" className="text-xs p-0 h-auto ml-1">Boost Ad</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              {displayedSalons.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <Info className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <h3 className="text-xl font-medium mb-2">No salons match your filter criteria</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters or check back later</p>
                  <Button 
                    onClick={() => {
                      setPriceFilter("all");
                      setSortBy("default");
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Salon Details Modal */}
      <Dialog open={!!selectedSalon} onOpenChange={closeSalonDetails} className="max-w-5xl">
        {selectedSalon && (
          <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif">
                {selectedSalon.name}
              </DialogTitle>
              <DialogDescription className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{selectedSalon.location}</span>
                <Badge className="ml-3">{selectedSalon.price}</Badge>
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="relative h-64 overflow-hidden rounded-md mb-3">
                  <img 
                    src={selectedSalon.images[selectedImage]} 
                    alt={selectedSalon.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {selectedSalon.images.map((image, index) => (
                    <div
                      key={index}
                      className={`h-20 cursor-pointer rounded-md overflow-hidden border-2 ${
                        selectedImage === index ? 'border-primary' : 'border-transparent'
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img 
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-lg mb-2">Business Details</h4>
                    <div className="grid grid-cols-2 gap-y-3">
                      <div className="flex items-center text-gray-700">
                        <Building className="h-4 w-4 mr-2" /> 
                        <span>Rent: {selectedSalon.rent}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Users className="h-4 w-4 mr-2" /> 
                        <span>{selectedSalon.staff} Staff</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <DollarSign className="h-4 w-4 mr-2" /> 
                        <span>Revenue: {selectedSalon.revenue}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Calendar className="h-4 w-4 mr-2" /> 
                        <span>Available Now</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-lg mb-2">Description</h4>
                    <p className="mb-2 italic">{selectedSalon.description.vi}</p>
                    <p className="text-gray-700">{selectedSalon.description.en}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-lg mb-2">Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSalon.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="bg-purple-50">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-5 mb-6">
                  <h4 className="font-medium text-lg flex items-center mb-3">
                    <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                    AI Business Valuation
                  </h4>
                  <p className="text-gray-700 mb-4">{selectedSalon.aiInsights}</p>
                  <div className="bg-white rounded-md p-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Price Rating:</span>
                      <span className={`font-bold ${
                        selectedSalon.priceRating === "Great Value" 
                          ? "text-green-600" 
                          : selectedSalon.priceRating === "Fair Price" 
                          ? "text-blue-600"
                          : "text-orange-600"
                      }`}>
                        {selectedSalon.priceRating}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Potential ROI:</span>
                      <span className="font-bold">25-35% annually</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Estimated Break-even:</span>
                      <span className="font-bold">~ 3 years</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium text-lg mb-3">Contact Information</h4>
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex items-center mb-3">
                      <Building className="h-5 w-5 mr-2 text-gray-600" />
                      <span className="font-medium">{selectedSalon.name}</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <Phone className="h-5 w-5 mr-2 text-gray-600" />
                      <span>{selectedSalon.phone}</span>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <Button className="flex-1">
                        <Phone className="h-4 w-4 mr-2" /> Call Now
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Request Details
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium text-lg mb-3">Location</h4>
                  <div className="bg-gray-200 h-[200px] rounded-md flex items-center justify-center">
                    <p className="text-gray-500">Map will be displayed here</p>
                  </div>
                </div>
                
                <div className="bg-primary/5 rounded-md p-4">
                  <h4 className="font-medium mb-2">Financing Available</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Qualified buyers may be eligible for SBA loans with rates as low as 6.5% and up to 10-year terms.
                  </p>
                  <Button variant="outline" size="sm">
                    Learn About Financing
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </Layout>
  );
};

export default SalonMarketplace;
