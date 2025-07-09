
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, BadgeCheck, Sparkles, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import ImageWithFallback from "@/components/ui/ImageWithFallback";

// Define listing item type
interface ListingItem {
  id: string;
  name: string;
  location: string;
  status: string;
  imageSrc: string;
  fallbackImageSrc: string;
  category: string;
  url: string;
  tags?: string[];
}

// Organized realistic sample listings by category
const sampleListings: Record<string, ListingItem[]> = {
  salons: [
    {
      id: "salon-1",
      name: "Luxury Nails OC",
      location: "Orange County, CA",
      status: "Hiring 2 nail techs",
      imageSrc: "",
      fallbackImageSrc: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=2070&auto=format&fit=crop",
      category: "salons",
      url: "/salons/luxury-nails",
      tags: ["Nail Salon", "Hiring"]
    },
    {
      id: "salon-2",
      name: "Serene Day Spa",
      location: "San Diego, CA",
      status: "Seeking full-time aesthetician",
      imageSrc: "",
      fallbackImageSrc: "https://images.unsplash.com/photo-1516190950-4daeec8f1669?q=80&w=1740&auto=format&fit=crop",
      category: "salons",
      url: "/salons/serene-spa",
      tags: ["Spa", "Hiring"]
    },
    {
      id: "salon-3",
      name: "Glam Hair Studio",
      location: "Houston, TX",
      status: "Now hiring stylists",
      imageSrc: "",
      fallbackImageSrc: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1744&auto=format&fit=crop",
      category: "salons",
      url: "/salons/glam-hair",
      tags: ["Hair Salon", "Hiring"]
    },
    {
      id: "salon-4",
      name: "Perfect Polish Nail Bar",
      location: "Atlanta, GA",
      status: "Nail artists wanted",
      imageSrc: "",
      fallbackImageSrc: "https://images.unsplash.com/photo-1607006483224-85e1df4a492b?q=80&w=1664&auto=format&fit=crop",
      category: "salons",
      url: "/salons/perfect-polish",
      tags: ["Nail Salon", "Hiring"]
    }
  ],
  booths: [
    {
      id: "booth-1",
      name: "Bella Salon Studios",
      location: "Miami, FL",
      status: "2 luxury booths available",
      imageSrc: "",
      fallbackImageSrc: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=1770&auto=format&fit=crop",
      category: "booths",
      url: "/booths/bella-studios",
      tags: ["Private Booth", "Luxury"]
    },
    {
      id: "booth-2",
      name: "Modern Hair Collective",
      location: "Seattle, WA",
      status: "1 chair available now",
      imageSrc: "",
      fallbackImageSrc: "https://images.unsplash.com/photo-1633681926022-84c23e8cb3d6?q=80&w=1760&auto=format&fit=crop",
      category: "booths",
      url: "/booths/modern-hair",
      tags: ["Chair Rental", "Hair"]
    },
    {
      id: "booth-3",
      name: "Polished Nail Studio",
      location: "Chicago, IL",
      status: "Premium nail station for rent",
      imageSrc: "",
      fallbackImageSrc: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1770&auto=format&fit=crop",
      category: "booths",
      url: "/booths/polished-studio",
      tags: ["Nail Station", "Premium"]
    }
  ],
  artists: [
    {
      id: "artist-1",
      name: "Jennifer Kim",
      location: "Los Angeles, CA",
      status: "Nail Art Specialist",
      imageSrc: "",
      fallbackImageSrc: "https://images.unsplash.com/photo-1588177471835-13d03fd863eb?q=80&w=1936&auto=format&fit=crop",
      category: "artists",
      url: "/artists/jennifer-kim",
      tags: ["Nail Art", "Gel"]
    },
    {
      id: "artist-2",
      name: "Michael Chen",
      location: "New York, NY",
      status: "Hair & Color Expert",
      imageSrc: "",
      fallbackImageSrc: "https://images.unsplash.com/photo-1634302087918-a7eb55a88ebf?q=80&w=1740&auto=format&fit=crop",
      category: "artists",
      url: "/artists/michael-chen",
      tags: ["Hair", "Color"]
    },
    {
      id: "artist-3",
      name: "Sophia Rodriguez",
      location: "Dallas, TX",
      status: "Lash & Brow Specialist",
      imageSrc: "",
      fallbackImageSrc: "https://images.unsplash.com/photo-1526045004613-7ab7f6a15bd6?q=80&w=1770&auto=format&fit=crop",
      category: "artists",
      url: "/artists/sophia-rodriguez",
      tags: ["Lash", "Brow"]
    },
    {
      id: "artist-4",
      name: "David Wang",
      location: "San Francisco, CA",
      status: "Massage Therapist",
      imageSrc: "",
      fallbackImageSrc: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1770&auto=format&fit=crop",
      category: "artists",
      url: "/artists/david-wang",
      tags: ["Massage", "Spa"]
    }
  ],
  sales: [
    {
      id: "sale-1",
      name: "Elegant Nails & Spa",
      location: "Boston, MA",
      status: "Profitable salon for sale",
      imageSrc: "",
      fallbackImageSrc: "https://images.unsplash.com/photo-1613843351058-1dd06fccdc6a?q=80&w=1770&auto=format&fit=crop",
      category: "sales",
      url: "/salon-sales/elegant-nails",
      tags: ["For Sale", "Nail Salon"]
    },
    {
      id: "sale-2",
      name: "Upscale Hair Boutique",
      location: "Nashville, TN",
      status: "Owner retiring, priced to sell",
      imageSrc: "",
      fallbackImageSrc: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=1935&auto=format&fit=crop",
      category: "sales",
      url: "/salon-sales/upscale-hair",
      tags: ["For Sale", "Hair Salon"]
    },
    {
      id: "sale-3",
      name: "Golden Touch Day Spa",
      location: "Phoenix, AZ",
      status: "Established spa with loyal clients",
      imageSrc: "",
      fallbackImageSrc: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1770&auto=format&fit=crop",
      category: "sales",
      url: "/salon-sales/golden-touch",
      tags: ["For Sale", "Day Spa"]
    }
  ],
  restaurants: [
    {
      id: "rest-1",
      name: "Saigon Bistro",
      location: "Westminster, CA",
      status: "Vietnamese restaurant for sale",
      imageSrc: "",
      fallbackImageSrc: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1772&auto=format&fit=crop",
      category: "restaurant",
      url: "/salon-sales/saigon-bistro",
      tags: ["For Sale", "Restaurant"]
    },
    {
      id: "rest-2",
      name: "Boba King",
      location: "Garden Grove, CA",
      status: "Hiring baristas & managers",
      imageSrc: "",
      fallbackImageSrc: "https://images.unsplash.com/photo-1558857563-b371033873b8?q=80&w=1770&auto=format&fit=crop",
      category: "boba",
      url: "/jobs/boba-king",
      tags: ["Boba", "Hiring"]
    },
    {
      id: "rest-3",
      name: "Pho Express",
      location: "San Jose, CA",
      status: "Family business for lease",
      imageSrc: "",
      fallbackImageSrc: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=1770&auto=format&fit=crop",
      category: "restaurant",
      url: "/salon-sales/pho-express",
      tags: ["For Lease", "Restaurant"]
    }
  ],
  barbers: [
    {
      id: "barber-1",
      name: "Classic Cuts Barber Shop",
      location: "Chicago, IL",
      status: "Seeking experienced barbers",
      imageSrc: "",
      fallbackImageSrc: "https://images.unsplash.com/photo-1588177571017-aa0c4cf6de8e?q=80&w=1742&auto=format&fit=crop",
      category: "barber",
      url: "/jobs/classic-cuts",
      tags: ["Barber", "Hiring"]
    },
    {
      id: "barber-2",
      name: "Fades & Shaves",
      location: "Philadelphia, PA",
      status: "Barber shop for sale",
      imageSrc: "",
      fallbackImageSrc: "https://images.unsplash.com/photo-1587909209111-5097ee578ec3?q=80&w=1770&auto=format&fit=crop",
      category: "barber",
      url: "/salon-sales/fades-shaves",
      tags: ["For Sale", "Barber"]
    },
    {
      id: "barber-3",
      name: "Gentlemen's Quarters",
      location: "Denver, CO",
      status: "Premium chair rental available",
      imageSrc: "",
      fallbackImageSrc: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1770&auto=format&fit=crop",
      category: "barber",
      url: "/booths/gentlemens-quarters",
      tags: ["Chair Rental", "Barber"]
    }
  ],
  tattoo: [
    {
      id: "tattoo-1",
      name: "Inkwell Studio",
      location: "Austin, TX",
      status: "Artist positions available",
      imageSrc: "",
      fallbackImageSrc: "https://images.unsplash.com/photo-1565058379802-bbe93b823361?q=80&w=1887&auto=format&fit=crop",
      category: "tattoo",
      url: "/jobs/inkwell",
      tags: ["Tattoo", "Hiring"]
    },
    {
      id: "tattoo-2",
      name: "Artistic Ink",
      location: "Portland, OR",
      status: "Booth rental for tattoo artists",
      imageSrc: "",
      fallbackImageSrc: "https://images.unsplash.com/photo-1612215327100-60fc5c4d7938?q=80&w=1770&auto=format&fit=crop",
      category: "tattoo",
      url: "/booths/artistic-ink",
      tags: ["Booth Rental", "Tattoo"]
    },
    {
      id: "tattoo-3",
      name: "Elite Tattoo Parlor",
      location: "Las Vegas, NV",
      status: "Established shop for sale",
      imageSrc: "",
      fallbackImageSrc: "https://images.unsplash.com/photo-1581467655410-0c2bf55d9d6c?q=80&w=1740&auto=format&fit=crop",
      category: "tattoo",
      url: "/salon-sales/elite-tattoo",
      tags: ["For Sale", "Tattoo"]
    }
  ]
};

// Get all listings for the "All" category
const getAllListings = (): ListingItem[] => {
  return Object.values(sampleListings).flat();
};

const DynamicListingGrid = () => {
  const [language, setLanguage] = useState<"en" | "vi">("en");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [filteredListings, setFilteredListings] = useState<ListingItem[]>([]);
  
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
  
  // Update filtered listings when category changes
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredListings(getAllListings().slice(0, 12));
    } else if (activeCategory === "food") {
      setFilteredListings([
        ...sampleListings.restaurants
      ]);
    } else if (sampleListings[activeCategory]) {
      setFilteredListings(sampleListings[activeCategory]);
    } else {
      setFilteredListings([]);
    }
  }, [activeCategory]);

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
              className="rounded-full font-inter font-medium"
            >
              <Sparkles className="w-4 h-4 mr-1" />
              Salons Hiring
            </Button>
            <Button
              variant={activeCategory === "booths" ? "default" : "outline"}
              onClick={() => setActiveCategory("booths")}
              className="rounded-full font-inter font-medium"
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Booths Available
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
              variant={activeCategory === "barbers" ? "default" : "outline"}
              onClick={() => setActiveCategory("barbers")}
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
        
        {filteredListings.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No listings found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredListings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col border border-gray-200">
                  <div className="h-48 bg-gray-100 relative overflow-hidden">
                    <ImageWithFallback 
                      src={listing.imageSrc} 
                      alt={listing.name} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      fallbackImage={listing.fallbackImageSrc}
                      businessName={listing.name}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-1/3" />
                  </div>
                  <CardContent className="p-4 flex-grow flex flex-col">
                    <div className="space-y-2 mb-auto">
                      <h3 className="font-semibold text-lg mb-1">{listing.name}</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                        <span>{listing.location}</span>
                      </div>
                      <p className="text-sm text-gray-700 font-medium flex items-center">
                        <BadgeCheck className="h-3.5 w-3.5 mr-1 text-primary" />
                        {listing.status}
                      </p>
                    </div>
                    
                    {listing.tags && listing.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3 mb-3">
                        {listing.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs bg-primary/5 border-primary/10">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <div className="mt-auto pt-3">
                      <Link to={listing.url}>
                        <Button variant="outline" size="sm" className="w-full">
                          {language === "en" ? "View Details" : "Xem Chi Tiết"}
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
        
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <Link to="/salons">
            <Button variant="outline" className="min-w-[200px]">
              {language === "en" ? "See All Salons" : "Xem Tất Cả Tiệm"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/booths">
            <Button variant="outline" className="min-w-[200px]">
              {language === "en" ? "View All Booths" : "Xem Tất Cả Booths"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/jobs">
            <Button variant="outline" className="min-w-[200px]">
              {language === "en" ? "Browse All Jobs" : "Xem Tất Cả Việc Làm"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DynamicListingGrid;
