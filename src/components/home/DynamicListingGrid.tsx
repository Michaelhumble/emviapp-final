
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Define the listing item type
interface ListingItem {
  id: string;
  name: string;
  location: string;
  status: string;
  imageSrc: string;
  category: 'salons' | 'booths' | 'artists' | 'sales' | 'spa' | 'hair' | 'restaurant' | 'tattoo' | 'boba' | 'barber' | 'cafe' | 'wax' | 'misc';
  url: string;
}

// Sample data for listings
const listings: ListingItem[] = [
  // Nail Industry - Vietnamese names
  { 
    id: "n1", 
    name: "Kim's Nail & Spa", 
    location: "Westminster, CA", 
    status: "Hiring 2 techs now", 
    imageSrc: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "salons", 
    url: "/salons/1" 
  },
  { 
    id: "n2", 
    name: "Amy Nguyen", 
    location: "Garden Grove, CA", 
    status: "Classic Gel Expert - Book now", 
    imageSrc: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "artists", 
    url: "/artists/1" 
  },
  { 
    id: "n3", 
    name: "Anh Salon", 
    location: "San Diego, CA", 
    status: "Booth available", 
    imageSrc: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "booths", 
    url: "/booths/1" 
  },
  { 
    id: "n4", 
    name: "Modern Nails", 
    location: "Atlanta, GA", 
    status: "Salon for sale: retiring soon", 
    imageSrc: "https://images.unsplash.com/photo-1610992015732-2449b76025bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "sales", 
    url: "/salon-sales/1" 
  },
  { 
    id: "n5", 
    name: "J. Lee", 
    location: "Houston, TX", 
    status: "Brow + Lash Specialist - New client openings", 
    imageSrc: "https://images.unsplash.com/photo-1607779097040-28d2024f27bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "artists", 
    url: "/artists/2" 
  },
  { 
    id: "n6", 
    name: "Luxe Polish", 
    location: "Houston, TX", 
    status: "Hiring part-time artist", 
    imageSrc: "https://images.unsplash.com/photo-1631214528203-b6e20b68efa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "salons", 
    url: "/salons/2" 
  },
  { 
    id: "n7", 
    name: "Sassy Nails", 
    location: "Boston, MA", 
    status: "1 private booth left", 
    imageSrc: "https://images.unsplash.com/photo-1600428853876-fb5a850b444f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "booths", 
    url: "/booths/2" 
  },
  { 
    id: "n8", 
    name: "Vera's Beauty Bar", 
    location: "Phoenix, AZ", 
    status: "Selling full package deal", 
    imageSrc: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "sales", 
    url: "/salon-sales/2" 
  },
  { 
    id: "n9", 
    name: "Nail Garden", 
    location: "Seattle, WA", 
    status: "Booth for rent", 
    imageSrc: "https://images.unsplash.com/photo-1617400877064-78abfcc3dc12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "booths", 
    url: "/booths/3" 
  },
  { 
    id: "n10", 
    name: "Trang's Studio", 
    location: "Orlando, FL", 
    status: "Accepting new clients", 
    imageSrc: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "artists", 
    url: "/artists/3" 
  },
  
  // Additional diverse industries
  { 
    id: "r1", 
    name: "Pho 88", 
    location: "San Jose, CA", 
    status: "Restaurant for sale", 
    imageSrc: "https://images.unsplash.com/photo-1583032015879-e5022cb87c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "restaurant", 
    url: "/salon-sales/3" 
  },
  { 
    id: "r2", 
    name: "Tea+ Boba", 
    location: "Dallas, TX", 
    status: "Hiring baristas", 
    imageSrc: "https://images.unsplash.com/photo-1525803377221-4f6ccdaa5133?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "boba", 
    url: "/jobs/1" 
  },
  { 
    id: "r3", 
    name: "The Rice Bowl", 
    location: "Garden Grove, CA", 
    status: "Server wanted", 
    imageSrc: "https://images.unsplash.com/photo-1553443175-15c04efd19ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "restaurant", 
    url: "/jobs/2" 
  },
  { 
    id: "r4", 
    name: "Ink House Tattoo", 
    location: "Denver, CO", 
    status: "Booth for rent", 
    imageSrc: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "tattoo", 
    url: "/booths/4" 
  },
  { 
    id: "r5", 
    name: "Fresh Cut Barbers", 
    location: "Chicago, IL", 
    status: "Full-time barber opening", 
    imageSrc: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "barber", 
    url: "/jobs/3" 
  },
  { 
    id: "r6", 
    name: "Brewed Awakenings Café", 
    location: "Seattle, WA", 
    status: "Barista needed", 
    imageSrc: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "cafe", 
    url: "/jobs/4" 
  },
  { 
    id: "r7", 
    name: "Taco King", 
    location: "Houston, TX", 
    status: "Family business for sale", 
    imageSrc: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "restaurant", 
    url: "/salon-sales/4" 
  },
  { 
    id: "r8", 
    name: "CleanFade Studio", 
    location: "Brooklyn, NY", 
    status: "Chair open now", 
    imageSrc: "https://images.unsplash.com/photo-1622288432207-901328f66ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "barber", 
    url: "/booths/5" 
  },
  { 
    id: "r9", 
    name: "Bubble & Bean", 
    location: "Westminster, CA", 
    status: "Manager wanted", 
    imageSrc: "https://images.unsplash.com/photo-1551030173-122aabc4489c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "cafe", 
    url: "/jobs/5" 
  },
  { 
    id: "r10", 
    name: "Tattoo & Glow", 
    location: "Miami, FL", 
    status: "Studio for sale", 
    imageSrc: "https://images.unsplash.com/photo-1581467655410-0c2bf55d9d6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "tattoo", 
    url: "/salon-sales/5" 
  },
  { 
    id: "r11", 
    name: "Golden Rolls Sushi", 
    location: "Anaheim, CA", 
    status: "Kitchen staff hiring", 
    imageSrc: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "restaurant", 
    url: "/jobs/6" 
  },
  { 
    id: "r12", 
    name: "Style & Snip", 
    location: "Portland, OR", 
    status: "Hair stylist booth open", 
    imageSrc: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "hair", 
    url: "/booths/6" 
  },
  { 
    id: "r13", 
    name: "Bao Bakery", 
    location: "Westminster, CA", 
    status: "Part-time counter staff", 
    imageSrc: "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "misc", 
    url: "/jobs/7" 
  },
  { 
    id: "r14", 
    name: "Milk + Honey Wax Studio", 
    location: "Austin, TX", 
    status: "Wax tech needed", 
    imageSrc: "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "wax", 
    url: "/jobs/8" 
  },
  { 
    id: "r15", 
    name: "Cozy Nails & Spa", 
    location: "Tampa, FL", 
    status: "Salon for lease", 
    imageSrc: "https://images.unsplash.com/photo-1604902396830-ded84a7452be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "sales", 
    url: "/salon-sales/6" 
  },
  { 
    id: "r16", 
    name: "Zebra Thai Kitchen", 
    location: "Orange County, CA", 
    status: "Front staff wanted", 
    imageSrc: "https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "restaurant", 
    url: "/jobs/9" 
  },
  { 
    id: "r17", 
    name: "Modest Cuts", 
    location: "Sacramento, CA", 
    status: "Shop for sale", 
    imageSrc: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "barber", 
    url: "/salon-sales/7" 
  },
  { 
    id: "r18", 
    name: "Bloom Beauty Lounge", 
    location: "San Diego, CA", 
    status: "Selling turnkey salon", 
    imageSrc: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "sales", 
    url: "/salon-sales/8" 
  },
  { 
    id: "r19", 
    name: "Sip & Chat Boba", 
    location: "Fresno, CA", 
    status: "Cashier + prep crew hiring", 
    imageSrc: "https://images.unsplash.com/photo-1558857563-c0c6ee0854fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "boba", 
    url: "/jobs/10" 
  },
  { 
    id: "r20", 
    name: "Ramen Republic", 
    location: "San Francisco, CA", 
    status: "Booths available", 
    imageSrc: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    category: "restaurant", 
    url: "/booths/7" 
  },
];

const DynamicListingGrid = () => {
  const [language, setLanguage] = useState<"en" | "vi">("en");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  // Listen for language change event
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      if (event.detail && event.detail.language) {
        setLanguage(event.detail.language);
      }
    };
    
    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    // Get initial language preference
    const storedLanguage = localStorage.getItem('emvi_language_preference');
    if (storedLanguage === 'vi' || storedLanguage === 'en') {
      setLanguage(storedLanguage as "en" | "vi");
    }
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);
  
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
          case "restaurant":
            return listing.category === "restaurant";
          case "tattoo":
            return listing.category === "tattoo";
          case "boba":
            return listing.category === "boba";
          case "barber":
            return listing.category === "barber";
          case "cafe":
            return listing.category === "cafe";
          case "wax":
            return listing.category === "wax";
          case "food":
            return listing.category === "restaurant" || 
                  listing.category === "boba" || 
                  listing.category === "cafe";
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
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            {language === "en" ? "What Are You Looking For Today?" : "Bạn đang tìm gì hôm nay?"}
          </h2>
          
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
              variant={activeCategory === "food" ? "default" : "outline"}
              onClick={() => setActiveCategory("food")}
              className="rounded-full"
            >
              🍜 Restaurants
            </Button>
            <Button
              variant={activeCategory === "barber" ? "default" : "outline"}
              onClick={() => setActiveCategory("barber")}
              className="rounded-full"
            >
              💇‍♂️ Barber Shops
            </Button>
            <Button
              variant={activeCategory === "tattoo" ? "default" : "outline"}
              onClick={() => setActiveCategory("tattoo")}
              className="rounded-full"
            >
              🎨 Tattoo Studios
            </Button>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredListings.slice(0, 30).map((listing, index) => (
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
