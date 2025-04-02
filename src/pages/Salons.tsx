
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
import { motion } from "framer-motion";
import { Building, Phone, Users, DollarSign, Info, MapPin, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for salons - would come from API in production
const salonListings = [
  {
    id: 1,
    name: "Elegant Nails & Spa",
    location: "New York, NY",
    revenue: "$350K/year",
    rent: "$5,000/month",
    staffCount: 8,
    contactName: "Sarah Johnson",
    phone: "(212) 555-9876",
    description: "Well-established nail salon with loyal customer base. 8 manicure stations, 6 pedicure chairs, all modern equipment. Great location with high foot traffic.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e",
    forSale: true,
    forRent: false,
    hiring: true,
  },
  {
    id: 2,
    name: "Modern Beauty Lounge",
    location: "Los Angeles, CA",
    revenue: "$280K/year",
    rent: "$4,200/month",
    staffCount: 6,
    contactName: "Michael Chen",
    phone: "(310) 555-3421",
    description: "Contemporary salon in upscale shopping district. Recently remodeled with premium fixtures and equipment. Excellent opportunity for booth rental.",
    image: "https://images.unsplash.com/photo-1470259078422-826894b933aa",
    forSale: false,
    forRent: true,
    hiring: true,
  },
  {
    id: 3,
    name: "Luxe Hair Studio",
    location: "Miami, FL",
    revenue: "$420K/year",
    rent: "$6,500/month",
    staffCount: 10,
    contactName: "Jessica Rodriguez",
    phone: "(305) 555-7890",
    description: "Premium hair salon with established clientele. Fully equipped with top-of-the-line stations and products. Owner retiring after 15 years of successful operation.",
    image: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6",
    forSale: true,
    forRent: false,
    hiring: false,
  },
  {
    id: 4,
    name: "Serenity Day Spa",
    location: "Chicago, IL",
    revenue: "$310K/year",
    rent: "$4,800/month",
    staffCount: 7,
    contactName: "David Kim",
    phone: "(312) 555-6543",
    description: "Full-service day spa with massage rooms, facial rooms, and nail services. Established for 8 years with consistent growth. Great opportunity for expansion.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef",
    forSale: false,
    forRent: true,
    hiring: false,
  },
  {
    id: 5,
    name: "Chic Style Salon",
    location: "Austin, TX",
    revenue: "$250K/year",
    rent: "$3,800/month",
    staffCount: 5,
    contactName: "Amanda Taylor",
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
    location: "Seattle, WA",
    revenue: "$380K/year",
    rent: "$5,200/month",
    staffCount: 9,
    contactName: "Robert Williams",
    phone: "(206) 555-8765",
    description: "Award-winning salon with prime downtown location. Owner selling due to relocation. Turnkey operation with established clientele and expert staff willing to stay.",
    image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250",
    forSale: true,
    forRent: false,
    hiring: false,
  },
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
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
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
        
        {/* Salon Listings */}
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
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-serif font-semibold">{salon.name}</h3>
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
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
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
