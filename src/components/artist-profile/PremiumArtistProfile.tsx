
import { useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { UserProfile } from "@/context/auth/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Share2, Calendar, Grid, MessageSquare, Star, Info, ChevronDown, Mail, Phone, Instagram, Globe } from "lucide-react";

interface PremiumArtistProfileProps {
  userProfile: UserProfile;
}

const PremiumArtistProfile = ({ userProfile }: PremiumArtistProfileProps) => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("portfolio");
  const [showMore, setShowMore] = useState(false);
  
  // Mock data for the profile
  const portfolioImages = [
    "https://placehold.co/600x400/F8F0FF/A076F9?text=Nail+Art+1",
    "https://placehold.co/600x400/F8F0FF/A076F9?text=Nail+Art+2",
    "https://placehold.co/600x400/F8F0FF/A076F9?text=Nail+Art+3",
    "https://placehold.co/600x400/F8F0FF/A076F9?text=Nail+Art+4",
    "https://placehold.co/600x400/F8F0FF/A076F9?text=Nail+Art+5",
    "https://placehold.co/600x400/F8F0FF/A076F9?text=Nail+Art+6",
  ];
  
  const services = [
    { id: 1, name: "Manicure", price: 30, duration: "45 min" },
    { id: 2, name: "Pedicure", price: 40, duration: "60 min" },
    { id: 3, name: "Gel Nails", price: 50, duration: "75 min" },
    { id: 4, name: "Nail Art", price: 20, duration: "30 min" },
  ];
  
  const reviews = [
    { id: 1, name: "Sarah M.", rating: 5, text: "Amazing work! Loved my nails and the service was top-notch." },
    { id: 2, name: "Jessica W.", rating: 4, text: "Great attention to detail and very professional." },
    { id: 3, name: "Michael B.", rating: 5, text: "Excellent service and very friendly. Will come back!" },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section with Cover Image and Profile */}
      <div className="relative">
        <div className="h-40 sm:h-60 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        <div className="container mx-auto px-4">
          <div className="relative -mt-20 bg-white rounded-t-xl shadow-sm">
            <div className="flex flex-col md:flex-row p-6">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative">
                    <img 
                      src={userProfile.avatar_url || "https://placehold.co/150x150/F8F0FF/A076F9?text=Profile"} 
                      alt={userProfile.full_name} 
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md"
                    />
                    <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
                  </div>
                </motion.div>
              </div>
              
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <motion.h1 
                      className="text-2xl md:text-3xl font-bold text-gray-900"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      {userProfile.full_name}
                    </motion.h1>
                    <motion.p 
                      className="text-gray-500"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {userProfile.specialty || "Nail Artist / Technician"}
                    </motion.p>
                    
                    <motion.div 
                      className="flex items-center mt-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">5.0 (24 reviews)</span>
                    </motion.div>
                  </div>
                  
                  {!isMobile && (
                    <motion.div 
                      className="flex space-x-3 mt-4 md:mt-0"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                      <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700">
                        <Calendar className="h-4 w-4 mr-1" />
                        Book Now
                      </Button>
                    </motion.div>
                  )}
                </div>
                
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <p className="text-gray-700">
                    {userProfile.bio || "Passionate nail artist with expertise in gel, acrylics, and nail art. I love creating beautiful, unique designs tailored to each client's style."}
                  </p>
                  {showMore && (
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h3 className="font-medium text-gray-900">Contact Information</h3>
                          <div className="space-y-1">
                            {userProfile.email && (
                              <div className="flex items-center text-sm text-gray-600">
                                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                <span>{userProfile.email}</span>
                              </div>
                            )}
                            {userProfile.phone && (
                              <div className="flex items-center text-sm text-gray-600">
                                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                <span>{userProfile.phone}</span>
                              </div>
                            )}
                            {userProfile.instagram && (
                              <div className="flex items-center text-sm text-gray-600">
                                <Instagram className="h-4 w-4 mr-2 text-gray-400" />
                                <span>@{userProfile.instagram}</span>
                              </div>
                            )}
                            {userProfile.website && (
                              <div className="flex items-center text-sm text-gray-600">
                                <Globe className="h-4 w-4 mr-2 text-gray-400" />
                                <span>{userProfile.website}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="font-medium text-gray-900">Skills & Experience</h3>
                          <div className="flex flex-wrap gap-2">
                            {(userProfile.skills || ["Gel Nails", "Acrylics", "Nail Art", "Manicure", "Pedicure"]).map(skill => (
                              <span key={skill} className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full">
                                {skill}
                              </span>
                            ))}
                          </div>
                          <p className="text-sm text-gray-600 mt-2">
                            {userProfile.years_experience ? `${userProfile.years_experience} years` : "5+ years"} of experience
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <button 
                    onClick={() => setShowMore(!showMore)} 
                    className="mt-2 text-sm text-purple-600 flex items-center"
                  >
                    {showMore ? "Show less" : "Show more"}
                    <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${showMore ? 'rotate-180' : ''}`} />
                  </button>
                </motion.div>
                
                {isMobile && (
                  <motion.div 
                    className="flex space-x-2 mt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                    <Button size="sm" className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700">
                      <Calendar className="h-4 w-4 mr-1" />
                      Book Now
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
            
            <Tabs defaultValue="portfolio" value={activeTab} onValueChange={setActiveTab} className="mt-2">
              <TabsList className="w-full flex justify-start px-4 bg-transparent border-b border-gray-200 rounded-none h-auto">
                <TabsTrigger 
                  value="portfolio" 
                  className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-purple-600 data-[state=active]:text-purple-600 data-[state=active]:shadow-none rounded-none"
                >
                  <Grid className="h-4 w-4 mr-2" />
                  Portfolio
                </TabsTrigger>
                <TabsTrigger 
                  value="services" 
                  className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-purple-600 data-[state=active]:text-purple-600 data-[state=active]:shadow-none rounded-none"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Services
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews" 
                  className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-purple-600 data-[state=active]:text-purple-600 data-[state=active]:shadow-none rounded-none"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Reviews
                </TabsTrigger>
                <TabsTrigger 
                  value="about" 
                  className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-purple-600 data-[state=active]:text-purple-600 data-[state=active]:shadow-none rounded-none"
                >
                  <Info className="h-4 w-4 mr-2" />
                  About
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="portfolio" className="p-4 sm:p-6 min-h-[300px]">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {portfolioImages.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="aspect-square relative rounded-lg overflow-hidden group"
                    >
                      <img 
                        src={image} 
                        alt={`Portfolio ${index + 1}`} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-300">
                        <Button 
                          variant="secondary" 
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100"
                        >
                          View
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="services" className="p-4 sm:p-6 min-h-[300px]">
                <div className="space-y-4">
                  {services.map((service) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * service.id }}
                      className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex justify-between items-center hover:border-purple-200 transition-colors"
                    >
                      <div>
                        <h3 className="font-medium text-gray-900">{service.name}</h3>
                        <div className="text-sm text-gray-500">{service.duration}</div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-lg font-medium text-purple-600 mr-4">${service.price}</div>
                        <Button size="sm" className="bg-purple-50 text-purple-700 hover:bg-purple-100">
                          Book
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="p-4 sm:p-6 min-h-[300px]">
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * review.id }}
                      className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900">{review.name}</h3>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{review.text}</p>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="about" className="p-4 sm:p-6 min-h-[300px]">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">About Me</h3>
                    <p className="text-gray-600">
                      {userProfile.bio || 
                       `I'm a professional nail artist with a passion for creating beautiful, unique designs tailored to each client's style and personality. With years of experience in the industry, I specialize in gel nails, acrylics, and intricate nail art.
                       
                       My goal is to provide a relaxing, enjoyable experience while delivering high-quality results that make my clients feel confident and beautiful. I stay updated on the latest trends and techniques to offer innovative services.
                       
                       I look forward to working with you and bringing your nail vision to life!`}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Specialties</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-purple-50 rounded-lg p-4">
                        <h4 className="font-medium text-purple-800 mb-2">Nail Art</h4>
                        <p className="text-sm text-gray-600">
                          Custom designs, hand-painted details, rhinestones, and more.
                        </p>
                      </div>
                      <div className="bg-pink-50 rounded-lg p-4">
                        <h4 className="font-medium text-pink-800 mb-2">Gel Extensions</h4>
                        <p className="text-sm text-gray-600">
                          Durable, lightweight extensions with a natural look and feel.
                        </p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-medium text-blue-800 mb-2">Acrylic Nails</h4>
                        <p className="text-sm text-gray-600">
                          Strong, versatile acrylics for a variety of shapes and styles.
                        </p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="font-medium text-green-800 mb-2">Manicures & Pedicures</h4>
                        <p className="text-sm text-gray-600">
                          Relaxing treatments that nourish and beautify natural nails.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      {/* Mobile Booking Button */}
      {isMobile && (
        <motion.div 
          className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg z-10"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
        >
          <Button className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <Calendar className="h-4 w-4 mr-2" />
            Book Appointment
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default PremiumArtistProfile;
