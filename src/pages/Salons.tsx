
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Building, Phone, Users, DollarSign, Info, MapPin, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for salons - would come from API in production
const salonListings = [
  {
    id: 1,
    name: "Elegant Nails & Spa",
    nameVn: "Tiệm Nail Elegant",
    location: "New York, NY",
    revenue: "$350K/year",
    rent: "$5,000/month",
    staffCount: 8,
    contactName: "Sarah Johnson",
    phone: "(212) 555-9876",
    price: "$250,000",
    description: "Well-established nail salon with loyal customer base. 8 manicure stations, 6 pedicure chairs, all modern equipment. Great location with high foot traffic.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e",
    forSale: true,
    forRent: false,
    hiring: true,
  },
  {
    id: 2,
    name: "Modern Beauty Lounge",
    nameVn: "Tiệm Modern Beauty",
    location: "Los Angeles, CA",
    revenue: "$280K/year",
    rent: "$4,200/month",
    staffCount: 6,
    contactName: "Michael Chen",
    phone: "(310) 555-3421",
    price: "$180,000",
    description: "Contemporary salon in upscale shopping district. Recently remodeled with premium fixtures and equipment. Excellent opportunity for booth rental.",
    image: "https://images.unsplash.com/photo-1470259078422-826894b933aa",
    forSale: false,
    forRent: true,
    hiring: true,
  },
  {
    id: 3,
    name: "Luxe Hair Studio",
    nameVn: "Tiệm Luxe Hair",
    location: "Miami, FL",
    revenue: "$420K/year",
    rent: "$6,500/month",
    staffCount: 10,
    contactName: "Jessica Rodriguez",
    phone: "(305) 555-7890",
    price: "$320,000",
    description: "Premium hair salon with established clientele. Fully equipped with top-of-the-line stations and products. Owner retiring after 15 years of successful operation.",
    image: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6",
    forSale: true,
    forRent: false,
    hiring: false,
  },
  {
    id: 4,
    name: "Serenity Day Spa",
    nameVn: "Tiệm Spa Serenity",
    location: "Chicago, IL",
    revenue: "$310K/year",
    rent: "$4,800/month",
    staffCount: 7,
    contactName: "David Kim",
    phone: "(312) 555-6543",
    price: "$230,000",
    description: "Full-service day spa with massage rooms, facial rooms, and nail services. Established for 8 years with consistent growth. Great opportunity for expansion.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef",
    forSale: false,
    forRent: true,
    hiring: false,
  },
  {
    id: 5,
    name: "Chic Style Salon",
    nameVn: "Tiệm Chic Style",
    location: "Austin, TX",
    revenue: "$250K/year",
    rent: "$3,800/month",
    staffCount: 5,
    contactName: "Amanda Taylor",
    price: "$140,000",
    phone: "(512) 555-2109",
    description: "Hip, trendy salon in downtown Austin. Looking for experienced stylists to join our team. Booth rental available with flexible terms.",
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f",
    forSale: false,
    forRent: true,
    hiring: true,
  },
  {
    id: 6,
    name: "Glamour & Grace",
    nameVn: "Tiệm Glamour & Grace",
    location: "Seattle, WA",
    revenue: "$380K/year",
    rent: "$5,200/month",
    staffCount: 9,
    contactName: "Robert Williams",
    phone: "(206) 555-8765",
    price: "$295,000",
    description: "Award-winning salon with prime downtown location. Owner selling due to relocation. Turnkey operation with established clientele and expert staff willing to stay.",
    image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250",
    forSale: true,
    forRent: false,
    hiring: false,
  },
  {
    id: 7,
    name: "Prestige Nails & Spa",
    nameVn: "Tiệm Prestige Nails",
    location: "San Francisco, CA",
    revenue: "$400K/year",
    rent: "$6,800/month",
    staffCount: 12,
    contactName: "Linda Wang",
    phone: "(415) 555-4321",
    price: "$350,000",
    description: "Upscale nail salon in premium location with 10+ years of operation. Includes 10 manicure stations, 8 pedicure chairs, and 2 private treatment rooms.",
    image: "https://images.unsplash.com/photo-1595446402689-71e41e575e50",
    forSale: true,
    forRent: false,
    hiring: true,
  },
  {
    id: 8,
    name: "Rose Nail Salon",
    nameVn: "Tiệm Nail Rose",
    location: "Denver, CO",
    revenue: "$280K/year",
    rent: "$4,000/month",
    staffCount: 6,
    contactName: "John Nguyen",
    phone: "(720) 555-9876",
    price: "$175,000",
    description: "Established nail salon with loyal clientele. Great opportunity for new owner. All equipment and inventory included in sale price.",
    image: "https://images.unsplash.com/photo-1580087061158-4402f2075b6d",
    forSale: true,
    forRent: false,
    hiring: false,
  },
];

// Job listings imported from the Jobs page data
const jobListings = [
  {
    id: 1,
    title: "Senior Nail Technician",
    titleVn: "Cần thợ gấp",
    salon: "Glamour Nail & Spa",
    location: "New York, NY",
    salary: "$25-35/hr + tips",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371",
    phone: "(212) 555-1234",
    urgentLabel: "Weekly Pay",
  },
  {
    id: 2,
    title: "Hair Stylist",
    titleVn: "Thợ làm tóc",
    salon: "Chic Styles",
    location: "Los Angeles, CA",
    salary: "$30-40/hr + tips",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035",
    phone: "(310) 555-6789",
    urgentLabel: "Bao Luong Neu Can",
  },
  {
    id: 3,
    title: "Nail Technician",
    titleVn: "Cần thợ nail",
    salon: "Luxe Nails",
    location: "Houston, TX",
    salary: "$25-32/hr + tips",
    image: "https://images.unsplash.com/photo-1610992003924-38fb62a3e5c0",
    phone: "(713) 555-4321",
    urgentLabel: "Tips",
  },
  {
    id: 4,
    title: "Nail Tech ASAP Needed",
    titleVn: "Cần thợ gấp",
    salon: "Elegant Touch",
    location: "Atlanta, GA",
    salary: "$28-35/hr guaranteed",
    image: "https://images.unsplash.com/photo-1607779097040-813cc5d5c9f5",
    phone: "(404) 555-8765",
    urgentLabel: "Bao Luong Neu Can",
  }
];

const Salons = () => {
  const [filters, setFilters] = useState({
    forSale: false,
    forRent: false,
    hiring: false,
  });
  
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };
  
  const filteredSalons = filters.forSale || filters.forRent || filters.hiring
    ? salonListings.filter(salon => 
        (filters.forSale && salon.forSale) || 
        (filters.forRent && salon.forRent) || 
        (filters.hiring && salon.hiring)
      )
    : salonListings;
  
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

  const getStatusBadges = (salon) => {
    const badges = [];
    if (salon.forSale) 
      badges.push({ text: "For Sale", color: "bg-blue-100 text-blue-800" });
    if (salon.forRent) 
      badges.push({ text: "For Rent", color: "bg-green-100 text-green-800" });
    if (salon.hiring) 
      badges.push({ text: "Hiring", color: "bg-purple-100 text-purple-800" });
    return badges;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Beauty Salon Opportunities</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto font-sans">
            Discover salons for sale, rent, or with hiring opportunities. Connect directly with salon owners and find your perfect match.
          </p>

          <Tabs defaultValue="all" className="w-full max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="all">All Listings</TabsTrigger>
              <TabsTrigger value="hiring">Hiring Now</TabsTrigger>
              <TabsTrigger value="forsale">Salons For Sale</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  variant={filters.forSale ? "default" : "outline"} 
                  onClick={() => handleFilterChange("forSale", !filters.forSale)}
                  className="min-w-[120px]"
                >
                  For Sale
                </Button>
                <Button 
                  variant={filters.forRent ? "default" : "outline"} 
                  onClick={() => handleFilterChange("forRent", !filters.forRent)}
                  className="min-w-[120px]"
                >
                  For Rent
                </Button>
                <Button 
                  variant={filters.hiring ? "default" : "outline"} 
                  onClick={() => handleFilterChange("hiring", !filters.hiring)}
                  className="min-w-[120px]"
                >
                  Hiring
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="hiring">
              {/* Hiring section displays job listings */}
              <div className="mb-8">
                <motion.div 
                  className="text-center mb-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl font-serif font-bold mb-3">Nail Salons Hiring Now</h2>
                  <p className="text-gray-600">
                    Connect with salon owners looking for talented professionals
                  </p>
                </motion.div>
                
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {jobListings.map((job) => (
                    <motion.div key={job.id} variants={item}>
                      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                        <div className="relative h-40 overflow-hidden rounded-t-lg">
                          <img 
                            src={job.image} 
                            alt={job.salon} 
                            className="w-full h-full object-cover"
                          />
                          {job.urgentLabel && (
                            <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                              {job.urgentLabel}
                            </div>
                          )}
                        </div>
                        <CardHeader className="pb-2">
                          <div className="space-y-1">
                            <h3 className="text-lg font-serif font-semibold">{job.title}</h3>
                            <p className="text-xs text-gray-600 italic">{job.titleVn}</p>
                          </div>
                          <p className="text-gray-700 font-medium text-sm">{job.salon}</p>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="h-3 w-3 mr-1" /> 
                            <span className="text-xs">{job.location}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <DollarSign className="h-3 w-3 mr-1" /> 
                            <span className="text-xs">{job.salary}</span>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-center pt-0">
                          <Link to="/jobs">
                            <Button size="sm">View Job</Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
                
                <div className="text-center mt-8">
                  <Link to="/jobs">
                    <Button variant="outline">View All Jobs</Button>
                  </Link>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="forsale">
              <motion.div 
                className="text-center mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-serif font-bold mb-3">Salon Nails Cần Bán — Cơ Hội Đầu Tư Tốt Nhất</h2>
                <p className="text-gray-600">
                  Giá từ $80,000 đến $300,000 — chọn vị trí đẹp, tiệm có thợ, và thu nhập cao.
                </p>
              </motion.div>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {salonListings.filter(salon => salon.forSale).map((salon) => (
                  <motion.div key={salon.id} variants={item}>
                    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <div className="relative h-48">
                        <img 
                          src={salon.image} 
                          alt={salon.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                          <div className="text-white font-bold text-lg">{salon.price}</div>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-serif font-semibold">{salon.name}</h3>
                            <p className="text-sm text-gray-600 italic">{salon.nameVn}</p>
                          </div>
                          <HoverCard>
                            <HoverCardTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Info className="h-4 w-4" />
                              </Button>
                            </HoverCardTrigger>
                            <HoverCardContent side="top">
                              <p className="text-sm">{salon.description}</p>
                            </HoverCardContent>
                          </HoverCard>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" /> 
                          <span className="text-sm">{salon.location}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-600">
                            <DollarSign className="h-4 w-4 mr-1" /> 
                            <span className="text-sm">Revenue: {salon.revenue}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Building className="h-4 w-4 mr-1" /> 
                            <span className="text-sm">Rent: {salon.rent}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Users className="h-4 w-4 mr-1" /> 
                            <span className="text-sm">Staff: {salon.staffCount} professionals</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="grid grid-cols-2 gap-2">
                        <Button className="w-full">View Listing</Button>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full">Contact</Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="space-y-3">
                              <h4 className="font-medium">{salon.contactName}</h4>
                              <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-2" />
                                <span>{salon.phone}</span>
                              </div>
                              <div className="flex gap-2 mt-2">
                                <Button size="sm" className="flex-1">
                                  <Phone className="h-3 w-3 mr-1" /> Call
                                </Button>
                                <Button size="sm" variant="outline" className="flex-1">
                                  <MessageSquare className="h-3 w-3 mr-1" /> Chat
                                </Button>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                        <div className="col-span-2 mt-2 pt-2 border-t text-center">
                          <p className="text-xs text-gray-500">Want your ad seen nationwide? 
                            <Button variant="link" className="text-xs p-0 h-auto" disabled>
                              Boost your listing
                            </Button>
                          </p>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
        
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Beauty Professionals", value: "+15,000" },
            { label: "Active Job Listings", value: "+2,500" },
            { label: "Business Opportunities", value: "+3,800" },
            { label: "Hiring Success Rate", value: "92%" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-4 rounded-lg shadow-sm text-center"
            >
              <p className="text-2xl font-serif font-bold">{stat.value}</p>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Main Salon Listings (when not in a specific tab) */}
        {/* Only show when on the "all" tab */}
        <Tabs.Content value="all">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredSalons.map((salon) => (
              <motion.div key={salon.id} variants={item}>
                <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48">
                    <img 
                      src={salon.image} 
                      alt={salon.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 flex flex-wrap gap-2 p-3">
                      {getStatusBadges(salon).map((badge, index) => (
                        <span 
                          key={index} 
                          className={`${badge.color} text-xs font-medium px-2 py-1 rounded-full`}
                        >
                          {badge.text}
                        </span>
                      ))}
                    </div>
                    {salon.forSale && (
                      <div className="absolute top-0 left-0 bg-blue-600 text-white py-1 px-3 rounded-br-lg font-bold">
                        {salon.price}
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-serif font-semibold">{salon.name}</h3>
                        <p className="text-sm text-gray-600 italic">{salon.nameVn}</p>
                      </div>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Info className="h-4 w-4" />
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent side="top">
                          <p className="text-sm">{salon.description}</p>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" /> 
                      <span className="text-sm">{salon.location}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="h-4 w-4 mr-1" /> 
                        <span className="text-sm">Revenue: {salon.revenue}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Building className="h-4 w-4 mr-1" /> 
                        <span className="text-sm">Rent: {salon.rent}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-1" /> 
                        <span className="text-sm">Staff: {salon.staffCount} professionals</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="grid grid-cols-2 gap-2">
                    <Button className="w-full">View Listing</Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full">Contact</Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="space-y-3">
                          <h4 className="font-medium">{salon.contactName}</h4>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            <span>{salon.phone}</span>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Button size="sm" className="flex-1">
                              <Phone className="h-3 w-3 mr-1" /> Call
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              <MessageSquare className="h-3 w-3 mr-1" /> Chat
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <div className="col-span-2 mt-2 pt-2 border-t text-center">
                      <p className="text-xs text-gray-500">Want your ad seen nationwide? 
                        <Button variant="link" className="text-xs p-0 h-auto" disabled>
                          Boost your listing
                        </Button>
                      </p>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Tabs.Content>
        
        {/* Empty state */}
        {filteredSalons.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No salons match your filters</h3>
            <p className="text-gray-600">Try adjusting your filter criteria</p>
            <Button 
              className="mt-4" 
              onClick={() => setFilters({
                forSale: false,
                forRent: false,
                hiring: false,
              })}
            >
              Reset Filters
            </Button>
          </div>
        )}
        
        {/* Call to action */}
        <motion.div 
          className="mt-16 bg-white rounded-lg shadow-md p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Own a Salon or Have Space to Rent?</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            List your salon on EmviApp and connect with thousands of beauty professionals looking for opportunities.
          </p>
          <Link to="/profile">
            <Button size="lg" className="font-medium px-8">
              List Your Salon
            </Button>
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Salons;
