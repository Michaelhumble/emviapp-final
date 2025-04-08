
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth";
import { UserRole } from "@/context/auth/types";
import DashboardRouteProtection from "@/components/dashboard/DashboardRouteProtection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, Gift, Search, Sparkles, ArrowRight, Star, Users, Ticket } from "lucide-react";
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
  
  return (
    <Layout>
      <motion.div 
        className="min-h-screen bg-gradient-to-b from-white via-pink-50 to-pink-100/30"
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
              className="mb-8 bg-gradient-to-r from-pink-100 to-rose-100 rounded-xl p-6 shadow-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-2xl md:text-3xl font-serif">
                Welcome back, Beauty Enthusiast 💖
              </h1>
              <p className="text-gray-600 mt-2">
                Explore new services, manage your favorites, and discover special offers just for you.
              </p>
            </motion.div>
            
            {/* Customer Dashboard Content */}
            <div className="space-y-8">
              {/* Discover New Services Section */}
              <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="overflow-hidden border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 pb-2">
                    <CardTitle className="font-serif flex items-center text-xl">
                      <Search className="h-5 w-5 text-pink-500 mr-2" />
                      Discover New Services
                    </CardTitle>
                    <CardDescription>Find beauty professionals and services near you</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-white border border-gray-100">
                        <CardContent className="p-4 text-center">
                          <Users className="h-8 w-8 mx-auto text-purple-500 mb-2 mt-4" />
                          <h3 className="font-medium">Browse Artists</h3>
                          <Button variant="ghost" size="sm" className="mt-2" asChild>
                            <Link to="/explore/artists">
                              Explore <ArrowRight className="h-4 w-4 ml-1" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-white border border-gray-100">
                        <CardContent className="p-4 text-center">
                          <Sparkles className="h-8 w-8 mx-auto text-amber-500 mb-2 mt-4" />
                          <h3 className="font-medium">Salon Directory</h3>
                          <Button variant="ghost" size="sm" className="mt-2" asChild>
                            <Link to="/salons">
                              View Salons <ArrowRight className="h-4 w-4 ml-1" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-white border border-gray-100">
                        <CardContent className="p-4 text-center">
                          <Calendar className="h-8 w-8 mx-auto text-blue-500 mb-2 mt-4" />
                          <h3 className="font-medium">Book Appointment</h3>
                          <Button variant="ghost" size="sm" className="mt-2" asChild>
                            <Link to="/appointments/book">
                              Schedule <ArrowRight className="h-4 w-4 ml-1" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </motion.section>
              
              {/* Favorites Section */}
              <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-gray-100 shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="font-serif text-lg flex items-center">
                        <Heart className="h-5 w-5 text-pink-500 mr-2" />
                        Your Favorites
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between py-2">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-800 mb-1">3</p>
                            <p className="text-gray-500 text-sm">Favorite Artists</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-800 mb-1">2</p>
                            <p className="text-gray-500 text-sm">Favorite Salons</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <Link to="/favorites">Manage Favorites</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-gray-100 shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="font-serif text-lg flex items-center">
                        <Star className="h-5 w-5 text-amber-500 mr-2" />
                        Recent Reviews
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-2">
                        <p className="text-gray-600 mb-3">Share your experience and help others find great service</p>
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <Link to="/reviews/write">Write a Review</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.section>
              
              {/* Appointments Section */}
              <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="overflow-hidden border-gray-100 shadow-sm">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 pb-2">
                    <CardTitle className="font-serif text-xl flex items-center">
                      <Calendar className="h-5 w-5 text-purple-500 mr-2" />
                      Book Appointments
                    </CardTitle>
                    <CardDescription>Schedule your next beauty service</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Last appointment:</p>
                      <p className="font-medium">2 weeks ago</p>
                      <div className="mt-4 flex gap-2">
                        <Button asChild>
                          <Link to="/appointments/book">Book Next Appointment</Link>
                        </Button>
                        <Button variant="outline" asChild>
                          <Link to="/appointments/history">View History</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.section>
              
              {/* Referral and Special Offers */}
              <motion.section
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <Card className="border-gray-100 shadow-sm">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 pb-2">
                    <CardTitle className="font-serif text-lg flex items-center">
                      <Gift className="h-5 w-5 text-pink-500 mr-2" />
                      Referral Rewards
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-800 mb-1">5</p>
                        <p className="text-gray-500 text-sm mb-3">Friends Invited</p>
                        <div className="bg-gray-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-pink-400 h-full rounded-full" style={{ width: '50%' }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">5/10 to unlock next reward</p>
                      </div>
                      <Button className="w-full" variant="outline" asChild>
                        <Link to="/referrals">Invite Friends</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-gray-100 shadow-sm">
                  <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 pb-2">
                    <CardTitle className="font-serif text-lg flex items-center">
                      <Ticket className="h-5 w-5 text-amber-500 mr-2" />
                      Special Offers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-800 mb-1">150</p>
                        <p className="text-gray-500 text-sm mb-2">Beauty Points</p>
                        <p className="text-xs text-gray-500">Available to redeem for special offers</p>
                      </div>
                      <Button className="w-full" variant="outline" asChild>
                        <Link to="/offers">View Offers</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.section>
            </div>
          </div>
        </DashboardRouteProtection>
      </motion.div>
    </Layout>
  );
};

export default CustomerDashboardPage;
