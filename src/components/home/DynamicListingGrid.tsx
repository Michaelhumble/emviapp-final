
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Define the listing item type
interface ListingItem {
  id: string;
  name: string;
  location: string;
  status: string;
  imageSrc: string;
  category: 'salons' | 'booths' | 'artists' | 'sales' | 'spa' | 'hair';
  url: string;
}

// Sample data for listings
const listings: ListingItem[] = [
  // Nail Industry - Vietnamese names
  { 
    id: "n1", 
    name: "Mai's Nail Art Studio", 
    location: "Westminster, CA", 
    status: "Hiring Now", 
    imageSrc: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "salons", 
    url: "/salons/1" 
  },
  { 
    id: "n2", 
    name: "Trang's Nail & Spa", 
    location: "Garden Grove, CA", 
    status: "Two Booths Available", 
    imageSrc: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "booths", 
    url: "/booths/1" 
  },
  { 
    id: "n3", 
    name: "Thanh Nail Studio", 
    location: "San Jose, CA", 
    status: "Owner Retiring", 
    imageSrc: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "sales", 
    url: "/salon-sales/1" 
  },
  { 
    id: "n4", 
    name: "Huong Nguyen", 
    location: "Houston, TX", 
    status: "Available Today", 
    imageSrc: "https://images.unsplash.com/photo-1610992015732-2449b76025bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "artists", 
    url: "/artists/1" 
  },
  { 
    id: "n5", 
    name: "Luxe Nails by Lin", 
    location: "Atlanta, GA", 
    status: "Taking New Clients", 
    imageSrc: "https://images.unsplash.com/photo-1607779097040-28d2024f27bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "artists", 
    url: "/artists/2" 
  },
  { 
    id: "n6", 
    name: "Kim's Diamond Nails", 
    location: "Seattle, WA", 
    status: "Hiring Full-Time", 
    imageSrc: "https://images.unsplash.com/photo-1631214528203-b6e20b68efa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "salons", 
    url: "/salons/2" 
  },
  { 
    id: "n7", 
    name: "Viet Nails & Spa", 
    location: "Orlando, FL", 
    status: "Hiring Experienced Techs", 
    imageSrc: "https://images.unsplash.com/photo-1600428853876-fb5a850b444f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "salons", 
    url: "/salons/3" 
  },
  { 
    id: "n8", 
    name: "Quynh's Luxury Nails", 
    location: "Philadelphia, PA", 
    status: "For Sale - Great Location", 
    imageSrc: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "sales", 
    url: "/salon-sales/2" 
  },
  { 
    id: "n9", 
    name: "Linh's Nail Bar", 
    location: "Charlotte, NC", 
    status: "Booths Available", 
    imageSrc: "https://images.unsplash.com/photo-1617400877064-78abfcc3dc12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "booths", 
    url: "/booths/2" 
  },
  { 
    id: "n10", 
    name: "Van's Nails & Beauty", 
    location: "Chicago, IL", 
    status: "4 Positions Open", 
    imageSrc: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "salons", 
    url: "/salons/4" 
  },
  
  // Hair Stylists
  { 
    id: "h1", 
    name: "Michael Wilson", 
    location: "Los Angeles, CA", 
    status: "Taking New Clients", 
    imageSrc: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "hair", 
    url: "/artists/3" 
  },
  { 
    id: "h2", 
    name: "Curls & Waves Salon", 
    location: "Miami, FL", 
    status: "Hiring Stylists", 
    imageSrc: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "salons", 
    url: "/salons/5" 
  },
  
  // Spa Technicians
  { 
    id: "s1", 
    name: "Serene Day Spa", 
    location: "Denver, CO", 
    status: "Massage Therapist Needed", 
    imageSrc: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "spa", 
    url: "/salons/6" 
  },
  { 
    id: "s2", 
    name: "Harmony Wellness", 
    location: "Scottsdale, AZ", 
    status: "For Sale - Established", 
    imageSrc: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "sales", 
    url: "/salon-sales/3" 
  },
  
  // Lash/Brow
  { 
    id: "l1", 
    name: "Amanda's Lash Studio", 
    location: "Nashville, TN", 
    status: "Booth Rental Available", 
    imageSrc: "https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "booths", 
    url: "/booths/3" 
  }
];

const DynamicListingGrid = () => {
  const [language, setLanguage] = useState<"en" | "vi">("en");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  const filteredListings = activeCategory === "all" 
    ? listings 
    : listings.filter(listing => {
        switch(activeCategory) {
          case "salons":
            return listing.category === "salons";
          case "booths":
            return listing.category === "booths";
          case "artists":
            return listing.category === "artists";
          case "sales":
            return listing.category === "sales";
          case "spa":
            return listing.category === "spa";
          case "hair":
            return listing.category === "hair";
          default:
            return true;
        }
      });

  return (
    <section className="py-16 bg-[#FDFDFD]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Tabs 
            defaultValue="en" 
            value={language} 
            onValueChange={(value) => setLanguage(value as "en" | "vi")}
            className="w-full"
          >
            <TabsList className="mx-auto mb-6">
              <TabsTrigger value="en">English</TabsTrigger>
              <TabsTrigger value="vi">Tiếng Việt</TabsTrigger>
            </TabsList>
            
            <TabsContent value="en">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                What Are You Looking For Today?
              </h2>
            </TabsContent>
            
            <TabsContent value="vi">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Bạn đang tìm gì hôm nay?
              </h2>
            </TabsContent>
          </Tabs>
          
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <Button
              variant={activeCategory === "all" ? "default" : "outline"}
              onClick={() => setActiveCategory("all")}
              className="rounded-full"
            >
              All
            </Button>
            <Button
              variant={activeCategory === "salons" ? "default" : "outline"}
              onClick={() => setActiveCategory("salons")}
              className="rounded-full"
            >
              🔥 Salons Hiring
            </Button>
            <Button
              variant={activeCategory === "booths" ? "default" : "outline"}
              onClick={() => setActiveCategory("booths")}
              className="rounded-full"
            >
              🪑 Booths Available
            </Button>
            <Button
              variant={activeCategory === "artists" ? "default" : "outline"}
              onClick={() => setActiveCategory("artists")}
              className="rounded-full"
            >
              🎨 Artists to Book
            </Button>
            <Button
              variant={activeCategory === "sales" ? "default" : "outline"}
              onClick={() => setActiveCategory("sales")}
              className="rounded-full"
            >
              🏪 Salons for Sale
            </Button>
            <Button
              variant={activeCategory === "spa" ? "default" : "outline"}
              onClick={() => setActiveCategory("spa")}
              className="rounded-full"
            >
              🧖‍♀️ Spa Technicians
            </Button>
            <Button
              variant={activeCategory === "hair" ? "default" : "outline"}
              onClick={() => setActiveCategory("hair")}
              className="rounded-full"
            >
              💇‍♀️ Hair Stylists
            </Button>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredListings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <div className="h-48 bg-gray-200 relative">
                  <img 
                    src={listing.imageSrc} 
                    alt={listing.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-xs py-1 px-2 rounded-full">
                    {listing.status}
                  </div>
                </div>
                <CardContent className="p-4 flex-grow flex flex-col">
                  <h3 className="font-semibold text-lg mb-1">{listing.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{listing.location}</p>
                  <div className="mt-auto">
                    <Link to={listing.url}>
                      <Button variant="outline" size="sm" className="w-full">
                        {language === "en" ? "View Listing" : "Xem Chi Tiết"}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <Link to="/salons">
            <Button variant="outline" className="min-w-[200px]">
              {language === "en" ? "See All Salons Hiring" : "Xem Tất Cả Tiệm Đang Tuyển"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/booths">
            <Button variant="outline" className="min-w-[200px]">
              {language === "en" ? "View All Booths" : "Xem Tất Cả Booths"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/artists">
            <Button variant="outline" className="min-w-[200px]">
              {language === "en" ? "Explore All Artists" : "Xem Tất Cả Nghệ Sĩ"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/salon-sales">
            <Button variant="outline" className="min-w-[200px]">
              {language === "en" ? "Browse Salons For Sale" : "Xem Tiệm Đang Bán"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DynamicListingGrid;
