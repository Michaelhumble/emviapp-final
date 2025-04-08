
import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, DollarSign, Star, Heart, Share2, Tag, Info, Calendar, ArrowRight, ShoppingCart } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

// Mock data for beauty products
const products = [
  {
    id: 1,
    name: "Pro Collagen Mask Set",
    nameVi: "Bộ mặt nạ Collagen cao cấp",
    brand: "BeautyGlow",
    description: {
      vi: "Mặt nạ collagen cao cấp giúp da săn chắc, giảm nếp nhăn và trẻ hóa làn da. Phù hợp cho mọi loại da.",
      en: "Premium collagen mask that helps firm skin, reduce wrinkles and rejuvenate. Suitable for all skin types."
    },
    categories: ["Skincare", "Masks", "Anti-aging"],
    price: 45.99,
    salePrice: 39.99,
    rating: 4.8,
    reviewCount: 126,
    images: [
      "https://images.unsplash.com/photo-1570194065650-d99fb4abbd90",
      "https://images.unsplash.com/photo-1598662972243-abe0eb754fde"
    ],
    featured: true,
    aiGenerated: true,
    aiContent: "This collagen mask set delivers visible results in just 2 weeks with regular use. The formula combines marine collagen with peptides and vitamin C for maximum skin rejuvenation.",
    stockStatus: "In Stock",
    minOrder: 3,
    discountTiers: [
      { quantity: 5, discount: "5%" },
      { quantity: 10, discount: "10%" },
      { quantity: 20, discount: "15%" }
    ]
  },
  {
    id: 2,
    name: "Luxury Nail Polish Set",
    nameVi: "Bộ sơn móng tay cao cấp",
    brand: "NailArt Pro",
    description: {
      vi: "Bộ sơn móng tay 12 màu cao cấp, không chứa độc tố, độ bền cao. Bao gồm các màu phổ biến nhất hiện nay.",
      en: "Set of 12 premium nail polishes, toxin-free with high durability. Includes today's most popular colors."
    },
    categories: ["Nail Care", "Polish", "Sets"],
    price: 32.99,
    salePrice: null,
    rating: 4.5,
    reviewCount: 89,
    images: [
      "https://images.unsplash.com/photo-1632345031435-8727f6897d53",
      "https://images.unsplash.com/photo-1595086516843-2b5c0a58d630"
    ],
    featured: false,
    aiGenerated: true,
    aiContent: "This luxury nail polish set features a breakthrough formula that lasts up to 10 days without chipping. The precision brush ensures smooth, even application every time.",
    stockStatus: "Low Stock",
    minOrder: 1,
    discountTiers: [
      { quantity: 3, discount: "5%" },
      { quantity: 5, discount: "10%" }
    ]
  },
  {
    id: 3,
    name: "Organic Cuticle Oil Pen",
    nameVi: "Bút dầu dưỡng móng hữu cơ",
    brand: "NaturalCare",
    description: {
      vi: "Dầu dưỡng móng hữu cơ dạng bút, dễ sử dụng, nuôi dưỡng móng và làm mềm da quanh móng. Thành phần tự nhiên 100%.",
      en: "Organic cuticle oil in pen form, easy to use, nourishes nails and softens skin around nails. 100% natural ingredients."
    },
    categories: ["Nail Care", "Organic", "Treatments"],
    price: 12.99,
    salePrice: 9.99,
    rating: 4.9,
    reviewCount: 216,
    images: [
      "https://images.unsplash.com/photo-1571290274554-6a2eaa771e5f",
      "https://images.unsplash.com/photo-1608376868250-83ab83f08f67"
    ],
    featured: true,
    aiGenerated: false,
    aiContent: "",
    stockStatus: "In Stock",
    minOrder: 2,
    discountTiers: [
      { quantity: 5, discount: "8%" },
      { quantity: 10, discount: "15%" }
    ]
  },
  {
    id: 4,
    name: "Advanced Foot Spa Machine",
    nameVi: "Máy ngâm chân cao cấp",
    brand: "SpaRelax",
    description: {
      vi: "Máy ngâm và massage chân cao cấp với nhiều chế độ, giúp thư giãn, giảm đau nhức và cải thiện tuần hoàn máu. Lý tưởng cho tiệm nail.",
      en: "Premium foot spa and massage machine with multiple modes, helps relax, reduce pain and improve blood circulation. Ideal for nail salons."
    },
    categories: ["Equipment", "Foot Care", "Spa"],
    price: 129.99,
    salePrice: 99.99,
    rating: 4.6,
    reviewCount: 74,
    images: [
      "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8",
      "https://images.unsplash.com/photo-1561049501-e1f96bdd98fd"
    ],
    featured: false,
    aiGenerated: true,
    aiContent: "The Advanced Foot Spa features infrared heat therapy and magnetic stimulation points to enhance the spa experience and promote better foot health. Perfect for salon use or retail to clients for home care.",
    stockStatus: "In Stock",
    minOrder: 1,
    discountTiers: [
      { quantity: 2, discount: "5%" },
      { quantity: 3, discount: "10%" }
    ]
  },
  {
    id: 5,
    name: "Professional Gel Nail Kit",
    nameVi: "Bộ sơn gel chuyên nghiệp",
    brand: "ProNails",
    description: {
      vi: "Bộ sơn gel chuyên nghiệp đầy đủ với đèn UV, lớp nền, lớp phủ và 6 màu phổ biến. Dành cho salon và sử dụng tại nhà.",
      en: "Complete professional gel nail kit with UV lamp, base coat, top coat, and 6 popular colors. For salon and home use."
    },
    categories: ["Nail Care", "Gel", "Kits"],
    price: 89.99,
    salePrice: 79.99,
    rating: 4.7,
    reviewCount: 103,
    images: [
      "https://images.unsplash.com/photo-1604654894611-6973b376cbde",
      "https://images.unsplash.com/photo-1610992003924-38fb62a3e5c0"
    ],
    featured: true,
    aiGenerated: true,
    aiContent: "Our Professional Gel Nail Kit delivers salon-quality results that last up to 3 weeks without chipping or fading. The included LED lamp cures in just 30 seconds, making application quick and convenient.",
    stockStatus: "In Stock",
    minOrder: 1,
    discountTiers: [
      { quantity: 2, discount: "8%" },
      { quantity: 5, discount: "15%" }
    ]
  },
  {
    id: 6,
    name: "Vitamin E Hand Cream",
    nameVi: "Kem dưỡng tay Vitamin E",
    brand: "SoftHands",
    description: {
      vi: "Kem dưỡng tay giàu Vitamin E, nuôi dưỡng và bảo vệ da tay, không nhờn rít. Hương thơm nhẹ nhàng, thấm nhanh.",
      en: "Vitamin E-rich hand cream that nourishes and protects hands without feeling greasy. Light fragrance, quick absorption."
    },
    categories: ["Skincare", "Hand Care"],
    price: 18.99,
    salePrice: null,
    rating: 4.4,
    reviewCount: 156,
    images: [
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc",
      "https://images.unsplash.com/photo-1626783416763-67a92e5e7388"
    ],
    featured: false,
    aiGenerated: false,
    aiContent: "",
    stockStatus: "In Stock",
    minOrder: 3,
    discountTiers: [
      { quantity: 6, discount: "5%" },
      { quantity: 12, discount: "12%" },
      { quantity: 24, discount: "20%" }
    ]
  }
];

const ProductPromotions = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const itemsPerPage = 6;

  const categories = [
    { id: "all", label: "All Products" },
    { id: "skincare", label: "Skincare" },
    { id: "nail-care", label: "Nail Care" },
    { id: "equipment", label: "Equipment" },
    { id: "organic", label: "Organic" }
  ];

  const openProductDetails = (product) => {
    setSelectedProduct(product);
    setSelectedImage(0);
    setQuantity(product.minOrder || 1);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };
  
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleQuantityChange = (value) => {
    if (selectedProduct) {
      const min = selectedProduct.minOrder || 1;
      setQuantity(Math.max(min, value));
    }
  };

  const getCurrentTierDiscount = () => {
    if (!selectedProduct || !selectedProduct.discountTiers || selectedProduct.discountTiers.length === 0) {
      return null;
    }

    // Find the highest applicable discount tier based on quantity
    let applicableDiscount = null;
    for (const tier of selectedProduct.discountTiers) {
      if (quantity >= tier.quantity) {
        applicableDiscount = tier.discount;
      }
    }

    return applicableDiscount;
  };

  const calculatePrice = () => {
    if (!selectedProduct) return 0;
    
    const basePrice = selectedProduct.salePrice || selectedProduct.price;
    const discount = getCurrentTierDiscount();
    
    if (!discount) return basePrice * quantity;
    
    // Remove % sign and convert to decimal
    const discountPercent = parseFloat(discount.replace('%', '')) / 100;
    return basePrice * quantity * (1 - discountPercent);
  };

  // Filter products based on category and search
  const filteredProducts = products.filter(product => {
    // Filter by category
    if (activeCategory !== "all") {
      const categoryMatch = product.categories.some(
        cat => cat.toLowerCase() === activeCategory.replace('-', ' ')
      );
      if (!categoryMatch) return false;
    }
    
    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.nameVi.toLowerCase().includes(searchLower) ||
        product.description.en.toLowerCase().includes(searchLower) ||
        product.description.vi.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower) ||
        product.categories.some(cat => cat.toLowerCase().includes(searchLower))
      );
    }
    
    return true;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "featured") {
      return a.featured === b.featured ? 0 : a.featured ? -1 : 1;
    } else if (sortBy === "priceAsc") {
      const priceA = a.salePrice || a.price;
      const priceB = b.salePrice || b.price;
      return priceA - priceB;
    } else if (sortBy === "priceDesc") {
      const priceA = a.salePrice || a.price;
      const priceB = b.salePrice || b.price;
      return priceB - priceA;
    } else if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return 0;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  
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
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Sản Phẩm Làm Đẹp Cao Cấp</h1>
          <p className="text-lg text-gray-600 mb-4 max-w-2xl mx-auto">
            Khám phá bộ sưu tập sản phẩm và dụng cụ làm đẹp chất lượng cao từ các thương hiệu hàng đầu.
          </p>
        </motion.div>

        {/* AI Marketing Banner */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 md:pr-6 mb-4 md:mb-0">
              <h2 className="text-2xl font-serif mb-2">AI-Powered Product Marketing</h2>
              <p className="text-gray-700 mb-4">
                Promote your beauty products with AI-generated content that highlights key benefits and appeals to your target audience. Our advanced system creates compelling product descriptions, social media posts, and marketing materials tailored to your brand.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Social Media Content</Badge>
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Product Descriptions</Badge>
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Email Marketing</Badge>
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Ad Copy</Badge>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut"
                }}
              >
                <div className="bg-white rounded-full p-6 shadow-lg">
                  <ShoppingBag className="h-16 w-16 text-purple-500" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Categories and Search */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            <Tabs 
              value={activeCategory} 
              onValueChange={handleCategoryChange}
              className="w-full md:w-auto"
            >
              <TabsList className="bg-muted/30 w-full md:w-auto overflow-x-auto">
                {categories.map(category => (
                  <TabsTrigger key={category.id} value={category.id} className="text-sm">
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="min-w-[200px]"
                />
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                  <SelectItem value="priceDesc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Best Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Product Grid */}
        {currentProducts.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {currentProducts.map((product) => (
              <motion.div key={product.id} variants={item}>
                <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <div 
                    className="relative h-60 bg-center bg-cover cursor-pointer"
                    style={{ backgroundImage: `url(${product.images[0]})` }}
                    onClick={() => openProductDetails(product)}
                  >
                    {product.salePrice && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Sale
                      </div>
                    )}
                    
                    {product.featured && (
                      <div className="absolute top-3 right-3 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Featured
                      </div>
                    )}
                    
                    <div className="absolute bottom-3 right-3">
                      <Button variant="secondary" size="icon" className="rounded-full bg-white/80 backdrop-blur-sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="flex-grow p-5">
                    <div className="mb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium line-clamp-1">{product.name}</h3>
                          <p className="text-sm text-gray-600 italic">{product.nameVi}</p>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{product.brand}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {product.categories.slice(0, 3).map((category, idx) => (
                        <Badge key={idx} variant="outline" className="bg-gray-50">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                      {product.description.en}
                    </p>
                    
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-baseline">
                        {product.salePrice ? (
                          <>
                            <span className="text-lg font-bold">${product.salePrice}</span>
                            <span className="text-sm text-gray-500 line-through ml-2">${product.price}</span>
                          </>
                        ) : (
                          <span className="text-lg font-bold">${product.price}</span>
                        )}
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${product.stockStatus === "In Stock" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}
                      >
                        {product.stockStatus}
                      </Badge>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-5 pt-3 border-t">
                    <Button 
                      onClick={() => openProductDetails(product)}
                      className="w-full"
                    >
                      View Product
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("all");
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
        
        {/* Sell Your Products Banner */}
        <div className="mt-12 bg-gradient-to-r from-primary/10 to-primary/20 rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-2xl font-serif mb-2">Bạn có sản phẩm muốn bán?</h3>
              <p className="text-gray-700 mb-4 md:mb-0 max-w-xl">
                Đăng ký để quảng bá sản phẩm của bạn đến hàng nghìn salon và thợ làm đẹp. Sử dụng công nghệ AI của chúng tôi để tự động tạo nội dung tiếp thị cho sản phẩm của bạn.
              </p>
            </div>
            <Button size="lg" className="whitespace-nowrap">
              Đăng ký bán hàng <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={closeProductDetails}>
        {selectedProduct && (
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif">
                {selectedProduct.name}
              </DialogTitle>
              <DialogDescription>
                <span className="italic">{selectedProduct.nameVi}</span>
                <span className="mx-2">•</span>
                <span className="font-medium">{selectedProduct.brand}</span>
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="relative h-80 rounded-md overflow-hidden mb-4">
                  <img 
                    src={selectedProduct.images[selectedImage]} 
                    alt={selectedProduct.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {selectedProduct.images.length > 1 && (
                  <div className="flex gap-2">
                    {selectedProduct.images.map((image, index) => (
                      <div
                        key={index}
                        className={`h-20 w-20 cursor-pointer rounded-md overflow-hidden border-2 ${
                          selectedImage === index ? 'border-primary' : 'border-transparent'
                        }`}
                        onClick={() => setSelectedImage(index)}
                      >
                        <img 
                          src={image}
                          alt={`Product preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6">
                  <h4 className="font-medium text-lg mb-2">Product Description</h4>
                  <p className="text-gray-600 italic mb-2">{selectedProduct.description.vi}</p>
                  <p className="text-gray-600">{selectedProduct.description.en}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedProduct.categories.map((category, idx) => (
                    <Badge key={idx} variant="outline" className="bg-gray-50">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center mb-1">
                        <div className="flex mr-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-5 w-5 ${i < Math.floor(selectedProduct.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                            />
                          ))}
                        </div>
                        <span className="text-gray-600">({selectedProduct.reviewCount} reviews)</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 mr-2 text-gray-500" />
                        <span className={`text-sm ${selectedProduct.stockStatus === "In Stock" ? "text-green-600" : "text-amber-600"}`}>
                          {selectedProduct.stockStatus}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      {selectedProduct.salePrice ? (
                        <>
                          <span className="text-xl font-bold text-primary">${selectedProduct.salePrice}</span>
                          <span className="text-sm text-gray-500 line-through">${selectedProduct.price}</span>
                        </>
                      ) : (
                        <span className="text-xl font-bold">${selectedProduct.price}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="border-t border-b py-4 my-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium">Quantity:</span>
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleQuantityChange(quantity - 1)}
                          disabled={quantity <= (selectedProduct.minOrder || 1)}
                        >-</Button>
                        <span className="w-12 text-center">{quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleQuantityChange(quantity + 1)}
                        >+</Button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-500 mb-1">
                      Minimum order: {selectedProduct.minOrder || 1} {selectedProduct.minOrder > 1 ? 'units' : 'unit'}
                    </p>
                    
                    <div className="text-sm text-gray-600 flex items-center">
                      <Info className="h-4 w-4 mr-1" />
                      <span>
                        {getCurrentTierDiscount() 
                          ? `Volume discount applied: ${getCurrentTierDiscount()} off`
                          : 'Buy more to unlock volume discounts'}
                      </span>
                    </div>
                    
                    {selectedProduct.discountTiers && selectedProduct.discountTiers.length > 0 && (
                      <div className="mt-3 bg-gray-50 rounded-md p-3">
                        <h5 className="text-sm font-medium mb-2">Volume Discounts:</h5>
                        <div className="space-y-1">
                          {selectedProduct.discountTiers.map((tier, idx) => (
                            <div 
                              key={idx} 
                              className={`flex justify-between text-sm ${quantity >= tier.quantity ? 'text-green-600 font-medium' : ''}`}
                            >
                              <span>Buy {tier.quantity}+ units</span>
                              <span>{tier.discount} off</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-lg font-bold mb-4">
                    <span>Total:</span>
                    <span>${calculatePrice().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button className="flex-1" size="lg">
                      <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                    </Button>
                    <Button variant="outline" size="lg" className="flex-1">
                      <Heart className="h-4 w-4 mr-2" /> Save
                    </Button>
                  </div>
                </div>
                
                {selectedProduct.aiGenerated && (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-5 mb-6">
                    <h4 className="flex items-center font-medium mb-2">
                      <Star className="h-5 w-5 mr-2 text-purple-600" />
                      AI Generated Marketing Content
                    </h4>
                    <p className="text-gray-700 italic">{selectedProduct.aiContent}</p>
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="mr-2">
                        <Share2 className="h-4 w-4 mr-2" /> Share Content
                      </Button>
                      <Button size="sm">
                        Generate More
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="bg-white rounded-lg shadow-sm p-5">
                  <h4 className="font-medium mb-3">Shipping Information</h4>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Processing Time:</span>
                      <span>1-2 business days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery:</span>
                      <span>3-5 business days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Free Shipping:</span>
                      <span>Orders over $100</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    For wholesale inquiries or bulk orders, please contact us directly via email.
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </Layout>
  );
};

export default ProductPromotions;
