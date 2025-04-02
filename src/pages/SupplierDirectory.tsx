
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Package, Star, Mail, ExternalLink, Filter, Search, Tag } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

// Mock data for suppliers
const suppliers = [
  {
    id: 1,
    name: "NailPro Supply Company",
    description: {
      vi: "Nhà cung cấp bàn ghế, thiết bị và dụng cụ nail chất lượng cao. Giao hàng toàn quốc.",
      en: "Provider of high-quality nail chairs, equipment and tools. Nationwide shipping available."
    },
    categories: ["Equipment", "Furniture", "Tools"],
    location: "Los Angeles, CA",
    phone: "(213) 555-1234",
    email: "info@nailprosupply.com",
    website: "www.nailprosupply.com",
    rating: 4.8,
    reviewCount: 246,
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473",
    featured: true,
    aiRecommended: true
  },
  {
    id: 2,
    name: "Beauty World Distribution",
    description: {
      vi: "Chuyên sỉ lẻ các sản phẩm làm móng, sơn gel, acrylic với giá cạnh tranh. Giảm giá cho đơn hàng lớn.",
      en: "Wholesale and retail nail products, gel polish, acrylic at competitive prices. Discounts for large orders."
    },
    categories: ["Polish", "Gel", "Acrylic"],
    location: "Houston, TX",
    phone: "(832) 555-7890",
    email: "sales@beautyworlddist.com",
    website: "www.beautyworlddist.com",
    rating: 4.5,
    reviewCount: 189,
    image: "https://images.unsplash.com/photo-1598453572762-8324da9c3300",
    featured: false,
    aiRecommended: true
  },
  {
    id: 3,
    name: "Spa Chair Experts",
    description: {
      vi: "Chuyên ghế spa pedicure cao cấp, bảo hành 2 năm, dịch vụ sửa chữa tận nơi. Nhiều mẫu mã đa dạng.",
      en: "Premium pedicure spa chairs, 2-year warranty, on-site repair service. Wide variety of models available."
    },
    categories: ["Furniture", "Equipment"],
    location: "Atlanta, GA",
    phone: "(404) 555-3456",
    email: "support@spachaireexperts.com",
    website: "www.spachairexperts.com",
    rating: 4.7,
    reviewCount: 172,
    image: "https://images.unsplash.com/photo-1613966802194-d46a163af70c",
    featured: true,
    aiRecommended: false
  },
  {
    id: 4,
    name: "Organic Care Products",
    description: {
      vi: "Sản phẩm chăm sóc da hữu cơ, không hóa chất độc hại. Phù hợp cho spa và tiệm nail cao cấp.",
      en: "Organic skincare products, free from harmful chemicals. Perfect for spas and high-end nail salons."
    },
    categories: ["Skincare", "Organic"],
    location: "Portland, OR",
    phone: "(503) 555-8765",
    email: "contact@organiccare.com",
    website: "www.organiccare.com",
    rating: 4.9,
    reviewCount: 215,
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4abbd90",
    featured: false,
    aiRecommended: true
  },
  {
    id: 5,
    name: "Nail Tech Tools",
    description: {
      vi: "Cung cấp dụng cụ chuyên nghiệp cho thợ nail. Chất lượng Đức, giá hợp lý, giao hàng nhanh.",
      en: "Professional tools for nail technicians. German quality, reasonable prices, fast shipping."
    },
    categories: ["Tools", "Equipment"],
    location: "Chicago, IL",
    phone: "(312) 555-9012",
    email: "orders@nailtechtools.com",
    website: "www.nailtechtools.com",
    rating: 4.6,
    reviewCount: 143,
    image: "https://images.unsplash.com/photo-1636108840454-8fbe394c7575",
    featured: false,
    aiRecommended: false
  },
  {
    id: 6,
    name: "Salon Software Solutions",
    description: {
      vi: "Phần mềm quản lý tiệm nail, đặt lịch online, quản lý khách hàng, nhân viên và hàng tồn kho.",
      en: "Nail salon management software, online booking, customer, staff, and inventory management."
    },
    categories: ["Software", "Technology"],
    location: "San Francisco, CA",
    phone: "(415) 555-2468",
    email: "info@salonsoftware.com",
    website: "www.salonsoftware.com",
    rating: 4.4,
    reviewCount: 98,
    image: "https://images.unsplash.com/photo-1555421689-3f034debb7a6",
    featured: true,
    aiRecommended: true
  }
];

// Available categories for filtering
const allCategories = ["Equipment", "Furniture", "Tools", "Polish", "Gel", "Acrylic", "Skincare", "Organic", "Software", "Technology"];

const SupplierDirectory = () => {
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const openSupplierDetails = (supplier) => {
    setSelectedSupplier(supplier);
  };

  const closeSupplierDetails = () => {
    setSelectedSupplier(null);
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
    setCurrentPage(1); // Reset page when filter changes
  };

  const toggleAllCategories = () => {
    setSelectedCategories(selectedCategories.length === allCategories.length ? [] : [...allCategories]);
    setCurrentPage(1);
  };
  
  // Filter suppliers based on search and categories
  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = 
      searchTerm === "" ||
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.description.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.description.vi.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategories = 
      selectedCategories.length === 0 || 
      supplier.categories.some(cat => selectedCategories.includes(cat));
    
    return matchesSearch && matchesCategories;
  });
  
  // Sort suppliers
  const sortedSuppliers = [...filteredSuppliers].sort((a, b) => {
    if (sortBy === "recommended") {
      if (a.aiRecommended && !b.aiRecommended) return -1;
      if (!a.aiRecommended && b.aiRecommended) return 1;
      return b.rating - a.rating;
    } else if (sortBy === "rating") {
      return b.rating - a.rating;
    } else if (sortBy === "featured") {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    }
    return 0;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedSuppliers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedSuppliers.length / itemsPerPage);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Nhà Cung Cấp Nail & Beauty</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Kết nối với hơn 200+ nhà cung cấp sản phẩm và dịch vụ chất lượng cho ngành nail và làm đẹp.
          </p>
        </motion.div>

        {/* Search and filters */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search suppliers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter size={16} />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </Button>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">AI Recommended</SelectItem>
                    <SelectItem value="rating">Highest Rating</SelectItem>
                    <SelectItem value="featured">Featured</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Expandable category filters */}
            {showFilters && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Filter by Category</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={toggleAllCategories}
                  >
                    {selectedCategories.length === allCategories.length ? "Deselect All" : "Select All"}
                  </Button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {allCategories.map((category) => (
                    <div
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`px-3 py-1.5 rounded-full text-sm cursor-pointer transition-colors ${
                        selectedCategories.includes(category)
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
        
        {/* AI Recommendation Banner */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 mb-8 flex items-center">
          <div className="bg-white/80 rounded-full p-3 mr-4">
            <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
          </div>
          <div>
            <h3 className="font-medium text-lg">AI-Powered Supplier Recommendations</h3>
            <p className="text-gray-700">Our AI analyzes your business needs and matches you with the most compatible suppliers based on your location, price range, and quality requirements.</p>
          </div>
        </div>

        {/* Suppliers listing */}
        {currentItems.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {currentItems.map((supplier) => (
              <motion.div key={supplier.id} variants={item}>
                <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={supplier.image} 
                      alt={supplier.name} 
                      className="w-full h-full object-cover"
                    />
                    {supplier.aiRecommended && (
                      <div className="absolute top-3 left-3 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                        <Star className="h-3 w-3 mr-1 fill-white" /> AI Recommended
                      </div>
                    )}
                    {supplier.featured && (
                      <div className="absolute top-3 right-3 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Featured
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="flex-grow p-5">
                    <div className="mb-3">
                      <h3 className="text-xl font-serif font-semibold">{supplier.name}</h3>
                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{supplier.location}</span>
                      </div>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(supplier.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">
                          {supplier.rating} ({supplier.reviewCount})
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {supplier.categories.map((category, idx) => (
                        <Badge key={idx} variant="outline" className="bg-indigo-50">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2 italic line-clamp-2">
                      {supplier.description.vi}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {supplier.description.en}
                    </p>
                  </CardContent>
                  
                  <CardFooter className="p-5 pt-2 flex-shrink-0 border-t">
                    <div className="w-full">
                      <Button 
                        onClick={() => openSupplierDetails(supplier)}
                        className="w-full"
                      >
                        View Supplier
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Package className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <h3 className="text-xl font-medium mb-2">No suppliers found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategories([]);
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => setCurrentPage(index + 1)}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
        
        {/* Add Your Business Banner */}
        <div className="mt-12 bg-gradient-to-r from-primary/10 to-primary/20 rounded-lg p-6 text-center">
          <h3 className="text-2xl font-serif mb-2">Là nhà cung cấp? Đăng ký miễn phí ngay!</h3>
          <p className="text-gray-700 mb-4 max-w-2xl mx-auto">
            Kết nối với hàng nghìn chủ tiệm nail và spa trên toàn quốc. Quảng bá doanh nghiệp của bạn và tăng doanh số bán hàng.
          </p>
          <Button size="lg">
            Đăng ký nhà cung cấp
          </Button>
        </div>
      </div>

      {/* Supplier Details Modal */}
      <Dialog open={!!selectedSupplier} onOpenChange={closeSupplierDetails}>
        {selectedSupplier && (
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif">
                {selectedSupplier.name}
              </DialogTitle>
              <DialogDescription className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{selectedSupplier.location}</span>
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img 
                  src={selectedSupplier.image} 
                  alt={selectedSupplier.name} 
                  className="w-full h-64 object-cover rounded-md mb-4"
                />
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">About</h4>
                    <p className="text-gray-600 italic mb-2">{selectedSupplier.description.vi}</p>
                    <p className="text-gray-600">{selectedSupplier.description.en}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSupplier.categories.map((category, idx) => (
                        <Badge key={idx} variant="outline" className="bg-indigo-50">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
                  <h4 className="font-medium mb-3">Contact Information</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 mr-3 text-gray-600" />
                      <span>{selectedSupplier.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 mr-3 text-gray-600" />
                      <span>{selectedSupplier.email}</span>
                    </div>
                    <div className="flex items-center">
                      <ExternalLink className="h-5 w-5 mr-3 text-gray-600" />
                      <span>{selectedSupplier.website}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-6">
                    <Button className="flex-1">
                      <Mail className="h-4 w-4 mr-2" /> Contact
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <ExternalLink className="h-4 w-4 mr-2" /> Visit Website
                    </Button>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Ratings & Reviews</h4>
                    <div className="flex items-center">
                      <div className="flex mr-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(selectedSupplier.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                          />
                        ))}
                      </div>
                      <span className="text-gray-600">{selectedSupplier.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm">Based on {selectedSupplier.reviewCount} reviews from verified buyers</p>
                  
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">5 stars</span>
                      <div className="flex-grow mx-4 bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: "70%" }}></div>
                      </div>
                      <span className="text-sm text-gray-600">70%</span>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">4 stars</span>
                      <div className="flex-grow mx-4 bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: "20%" }}></div>
                      </div>
                      <span className="text-sm text-gray-600">20%</span>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">3 stars</span>
                      <div className="flex-grow mx-4 bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: "7%" }}></div>
                      </div>
                      <span className="text-sm text-gray-600">7%</span>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">2 stars</span>
                      <div className="flex-grow mx-4 bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: "2%" }}></div>
                      </div>
                      <span className="text-sm text-gray-600">2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">1 star</span>
                      <div className="flex-grow mx-4 bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: "1%" }}></div>
                      </div>
                      <span className="text-sm text-gray-600">1%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg p-4 text-center">
                  <h4 className="font-medium mb-2">Interested in this supplier?</h4>
                  <p className="text-sm text-gray-600 mb-3">Connect with this supplier and receive exclusive offers and deals.</p>
                  <Button size="sm">Get Connected</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </Layout>
  );
};

export default SupplierDirectory;
