
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth";
import { UserRole } from "@/context/auth/types";
import DashboardRouteProtection from "@/components/dashboard/DashboardRouteProtection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, ChevronRight, Gift, Heart, Search, Sparkles, Star, Ticket, MapPin, TrendingUp } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const CustomerDashboardPage = () => {
  const { userProfile } = useAuth();
  const navigate = useNavigate();
  
  // Set page title
  useEffect(() => {
    document.title = "Customer Dashboard | EmviApp";
  }, []);
  
  // Define allowed roles for this dashboard - strictly enforce customer roles only
  const allowedRoles: UserRole[] = ['customer'];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };
  
  // Sample data - in a real app, this would come from an API
  const serviceCategories = [
    { icon: "💅", name: "Nail Art", count: 24 },
    { icon: "💇‍♀️", name: "Hair Styling", count: 18 },
    { icon: "✨", name: "Facials", count: 12 },
    { icon: "💆‍♀️", name: "Massage", count: 9 },
    { icon: "💋", name: "Makeup", count: 15 },
    { icon: "🦶", name: "Pedicure", count: 11 },
  ];
  
  const favoriteArtists = [
    { id: "a1", name: "Jessica W.", avatar: null, specialty: "Nail Artist" },
    { id: "a2", name: "Michael T.", avatar: null, specialty: "Hair Stylist" },
    { id: "a3", name: "Emma L.", avatar: null, specialty: "Makeup Artist" },
  ];
  
  const upcomingAppointment = {
    date: "April 15, 2025",
    time: "2:00 PM",
    service: "Gel Manicure",
    artist: "Jessica W.",
    location: "Glamour Salon"
  };
  
  const specialOffers = [
    { id: "o1", title: "20% Off First Visit", salon: "Serenity Spa", validUntil: "Apr 30", distance: "1.2 miles" },
    { id: "o2", title: "Free Hair Consultation", salon: "Style Studio", validUntil: "May 5", distance: "0.8 miles" },
  ];
  
  return (
    <Layout>
      <motion.div 
        className="min-h-screen bg-gradient-to-b from-white via-pink-50 to-rose-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <DashboardRouteProtection allowedRoles={allowedRoles} dashboardType="Customer">
          <div className="container px-4 mx-auto py-8">
            {/* Breadcrumb */}
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Customer</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            {/* Welcome Banner */}
            <motion.div 
              className="relative mb-8 overflow-hidden rounded-xl shadow-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 opacity-90"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_50%,rgba(255,255,255,0.15),transparent_60%)]"></div>
              <motion.div 
                className="absolute -right-10 -bottom-16 w-48 h-48 rounded-full bg-white/10 backdrop-blur-md"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.7, 0.5] 
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
              <div className="relative p-6 md:p-8 z-10">
                <h1 className="text-2xl md:text-3xl font-playfair text-white mb-2">
                  Welcome back, {userProfile?.full_name?.split(' ')[0] || 'Beauty Enthusiast'} 💖
                </h1>
                <p className="text-white/90 max-w-lg">
                  Explore new services, discover trending styles, and book your next beauty experience.
                </p>
                <motion.div 
                  className="mt-4 inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Sparkles className="h-3.5 w-3.5 mr-2 text-amber-200" />
                  <span>Personalized recommendations ready for you</span>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Main Dashboard Content */}
            <motion.div
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Discover New Services Section */}
              <motion.section variants={itemVariants}>
                <Card className="overflow-hidden border-0 shadow-md bg-white/70 backdrop-blur-sm">
                  <CardHeader className="pb-2 border-b bg-gradient-to-r from-pink-50 to-rose-50">
                    <CardTitle className="font-playfair flex items-center text-xl">
                      <Search className="h-5 w-5 text-pink-500 mr-2" />
                      Discover New Services
                    </CardTitle>
                    <CardDescription>
                      Explore trending beauty services near you
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Service Categories Carousel */}
                      <div className="flex overflow-x-auto pb-2 -mx-2 px-2 space-x-3 scrollbar-hide">
                        {serviceCategories.map((category, index) => (
                          <div 
                            key={index}
                            className="flex-shrink-0 w-32 md:w-40 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div className="p-4 text-center">
                              <div className="text-3xl mb-2">{category.icon}</div>
                              <h3 className="font-medium text-gray-800">{category.name}</h3>
                              <p className="text-xs text-gray-500">{category.count} nearby</p>
                              <Button variant="ghost" size="sm" className="mt-2 w-full text-xs" asChild>
                                <Link to={`/explore/${category.name.toLowerCase().replace(' ', '-')}`}>
                                  Explore <ChevronRight className="h-3 w-3" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <p className="text-sm text-gray-500">
                          <TrendingUp className="h-4 w-4 inline mr-1 text-pink-500" /> 
                          Nail Art and Facials are trending in your area
                        </p>
                        <Button variant="outline" size="sm" asChild>
                          <Link to="/explore">View All Services</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.section>
              
              {/* Favorites and Appointments Section */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Favorites Section */}
                <Card className="overflow-hidden border-0 shadow-md bg-white/70 backdrop-blur-sm">
                  <CardHeader className="pb-2 border-b">
                    <CardTitle className="font-playfair flex items-center text-lg">
                      <Heart className="h-5 w-5 text-pink-500 mr-2" />
                      Your Favorites
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5">
                    <div className="space-y-4">
                      {favoriteArtists.map((artist) => (
                        <div key={artist.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 hover:shadow-sm transition-shadow">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={artist.avatar || undefined} alt={artist.name} />
                              <AvatarFallback className="bg-gradient-to-br from-pink-200 to-rose-300 text-rose-700">
                                {artist.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{artist.name}</h3>
                              <p className="text-xs text-gray-500">{artist.specialty}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/artist/${artist.id}`}>
                              <span className="sr-only">View profile</span>
                              <ChevronRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      ))}
                      
                      <div className="flex items-center justify-between pt-2">
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <Link to="/favorites">Manage Favorites</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Appointments Section */}
                <Card className="overflow-hidden border-0 shadow-md bg-white/70 backdrop-blur-sm">
                  <CardHeader className="pb-2 border-b">
                    <CardTitle className="font-playfair flex items-center text-lg">
                      <CalendarDays className="h-5 w-5 text-pink-500 mr-2" />
                      Your Appointments
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5">
                    {upcomingAppointment ? (
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg border border-gray-100 p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-gray-800">Upcoming Appointment</h3>
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Confirmed</span>
                          </div>
                          <div className="space-y-2 text-sm">
                            <p className="flex items-center text-gray-600">
                              <CalendarDays className="h-4 w-4 mr-2 text-gray-400" />
                              {upcomingAppointment.date} at {upcomingAppointment.time}
                            </p>
                            <p className="flex items-center text-gray-600">
                              <Sparkles className="h-4 w-4 mr-2 text-gray-400" />
                              {upcomingAppointment.service} with {upcomingAppointment.artist}
                            </p>
                            <p className="flex items-center text-gray-600">
                              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                              {upcomingAppointment.location}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600" asChild>
                            <Link to="/appointments/book">
                              Book Another
                            </Link>
                          </Button>
                          <Button variant="outline" className="flex-1" asChild>
                            <Link to="/appointments">
                              View All
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6 space-y-4">
                        <div className="mx-auto h-16 w-16 rounded-full bg-pink-100 flex items-center justify-center">
                          <CalendarDays className="h-8 w-8 text-pink-500" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800 mb-1">Schedule something beautiful</h3>
                          <p className="text-sm text-gray-500 mb-4">Book your next beauty appointment</p>
                          <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600" asChild>
                            <Link to="/appointments/book">
                              Book Now
                            </Link>
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Referral Rewards and Special Offers */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Referral Rewards */}
                <Card className="overflow-hidden border-0 shadow-md bg-white/70 backdrop-blur-sm">
                  <CardHeader className="pb-2 border-b">
                    <CardTitle className="font-playfair flex items-center text-lg">
                      <Gift className="h-5 w-5 text-pink-500 mr-2" />
                      Referral Rewards
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5">
                    <div className="space-y-4">
                      <div className="text-center p-2">
                        <p className="text-sm text-gray-500 mb-3">Invite 3 friends and get 1 free treatment</p>
                        <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                          <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full" style={{ width: '33%' }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>1/3 invites</span>
                          <span>Free treatment</span>
                        </div>
                      </div>
                      
                      <div className="bg-pink-50 rounded-lg p-4 border border-pink-100">
                        <h4 className="font-medium flex items-center mb-2">
                          <Star className="h-4 w-4 text-amber-500 mr-1" />
                          Your referral code
                        </h4>
                        <div className="flex">
                          <div className="flex-1 bg-white border border-gray-200 rounded-l-md px-3 py-2 text-center font-medium">
                            BEAUTYAPP2025
                          </div>
                          <Button variant="secondary" className="rounded-l-none">
                            Copy
                          </Button>
                        </div>
                      </div>
                      
                      <Button className="w-full" variant="outline">
                        Share with Friends
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Special Offers */}
                <Card className="overflow-hidden border-0 shadow-md bg-white/70 backdrop-blur-sm">
                  <CardHeader className="pb-2 border-b">
                    <CardTitle className="font-playfair flex items-center text-lg">
                      <Ticket className="h-5 w-5 text-pink-500 mr-2" />
                      Special Offers Near You
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5">
                    <div className="space-y-3">
                      {specialOffers.map((offer) => (
                        <div key={offer.id} className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-sm transition-shadow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-gray-800">{offer.title}</h3>
                              <p className="text-sm text-gray-600">{offer.salon}</p>
                              <div className="flex items-center mt-1 text-xs text-gray-500">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span>{offer.distance}</span>
                                <span className="mx-2">•</span>
                                <span>Valid until {offer.validUntil}</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
                              <Heart className="h-4 w-4" />
                              <span className="sr-only">Save offer</span>
                            </Button>
                          </div>
                          <div className="mt-3">
                            <Button variant="outline" size="sm" className="w-full" asChild>
                              <Link to={`/offers/${offer.id}`}>
                                View Details
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      <Button className="w-full" variant="outline" asChild>
                        <Link to="/offers">
                          View All Offers
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Trending Beauty Tips Banner */}
              <motion.section variants={itemVariants}>
                <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-r from-purple-100 to-pink-100">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div>
                        <h3 className="font-playfair text-lg font-medium text-gray-800 mb-2 flex items-center">
                          <TrendingUp className="h-5 w-5 text-purple-500 mr-2" />
                          Trending Beauty Tips
                        </h3>
                        <p className="text-gray-600 max-w-lg">
                          Discover the latest beauty trends, tips, and expert advice from professionals
                        </p>
                      </div>
                      <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white" asChild>
                        <Link to="/tips">
                          Explore Beauty Tips
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.section>
            </motion.div>
          </div>
        </DashboardRouteProtection>
      </motion.div>
    </Layout>
  );
};

export default CustomerDashboardPage;
