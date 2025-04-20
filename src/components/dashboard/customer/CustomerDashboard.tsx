
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Heart, Star, Users, Wallet, TrendingUp, Search } from "lucide-react";
import { useCustomerDashboard } from "@/hooks/useCustomerDashboard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/auth";
import CustomerBookingsSection from "./bookings/CustomerBookingsSection";
import FavoritesSection from "./favorites/FavoritesSection";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Helper: returns category emoji by optional text label
const getServiceEmoji = (title: string = "") => {
  const lower = title.toLowerCase();
  if (lower.includes("nail")) return "💅";
  if (lower.includes("hair")) return "💇";
  if (lower.includes("lip") || lower.includes("makeup")) return "💄";
  if (lower.includes("spa")) return "💆";
  if (lower.includes("brow")) return "👁️";
  if (lower.includes("wax")) return "🕯️";
  return "🎨";
};

const CustomerDashboard = () => {
  const { userProfile } = useAuth();
  const { bookings, upcomingBookings, previousBookings, favorites, loading } = useCustomerDashboard();
  const name = userProfile?.full_name?.split(" ")[0] || userProfile?.full_name || "there";
  const navigate = useNavigate();

  // Animations
  const fadeIn = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Responsive card grid
  const cardGridClass = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4";

  // Hero Greeting with Playfair and emotional subtext
  return (
    <div className="max-w-3xl mx-auto w-full pt-4 pb-16 px-2 sm:px-4 font-inter">
      {/* Hero Greeting */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="show"
        className="mb-8"
      >
        <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-pink-100 via-white to-violet-50 shadow-lg p-6 sm:p-8 flex flex-col items-start gap-3">
          <h1 className="text-2xl sm:text-3xl font-playfair font-bold text-rose-700 flex items-center mb-1">
            Hi {name} <span className="ml-2">👋</span>
          </h1>
          <p className="text-gray-700 text-base sm:text-lg mb-1 font-inter">
            We’re here to make beauty easier.
          </p>
          <div className="text-gray-500 text-sm font-inter">
            Track your bookings, connect with amazing artists, and discover trusted salons.
          </div>
        </div>
      </motion.div>

      {/* Stats Quick Overview */}
      <motion.div
        className={cardGridClass + " mb-8"}
        variants={fadeIn}
        initial="hidden"
        animate="show"
      >
        <Card className="bg-gradient-to-br from-pink-50 to-white rounded-2xl shadow-sm border-0 p-0 min-h-[110px] flex flex-col justify-center">
          <CardContent className="flex items-center gap-4 py-6">
            <div className="p-2 bg-rose-100 rounded-full">
              <Calendar className="h-5 w-5 text-rose-600" />
            </div>
            <div>
              <div className="text-xl font-bold font-playfair">{loading ? <Skeleton className="h-5 w-10" /> : upcomingBookings.length}</div>
              <div className="text-gray-500 text-sm font-inter">Upcoming</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-pink-50 to-white rounded-2xl shadow-sm border-0 p-0 min-h-[110px] flex flex-col justify-center">
          <CardContent className="flex items-center gap-4 py-6">
            <div className="p-2 bg-purple-100 rounded-full">
              <Heart className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <div className="text-xl font-bold font-playfair">{loading ? <Skeleton className="h-5 w-10" /> : favorites.length}</div>
              <div className="text-gray-500 text-sm font-inter">Favorites</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl shadow-sm border-0 p-0 min-h-[110px] flex flex-col justify-center">
          <CardContent className="flex items-center gap-4 py-6">
            <div className="p-2 bg-yellow-100 rounded-full">
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <div className="text-xl font-bold font-playfair">{loading ? <Skeleton className="h-5 w-10" /> : previousBookings.length}</div>
              <div className="text-gray-500 text-sm font-inter">Completed</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl shadow-sm border-0 p-0 min-h-[110px] flex flex-col justify-center">
          <CardContent className="flex items-center gap-4 py-6">
            <div className="p-2 bg-emerald-100 rounded-full">
              <Wallet className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-xl font-bold font-playfair">{loading ? <Skeleton className="h-5 w-10" /> : 150}</div>
              <div className="text-gray-500 text-sm font-inter">Loyalty Points</div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Mobile: Tabs navigation */}
      <div className="block md:hidden mb-8">
        <Tabs defaultValue="appointments" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4 rounded-xl bg-gray-50 border">
            <TabsTrigger value="appointments">Upcoming</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
          
          {/* Upcoming Bookings */}
          <TabsContent value="appointments" className="space-y-6">
            <motion.div variants={fadeIn} initial="hidden" animate="show">
              <h2 className="font-playfair text-xl text-rose-700 font-semibold mb-2 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-rose-500" />Your Next Appointments
              </h2>
              <div className="space-y-4">
                {loading ? (
                  <Skeleton className="h-24 w-full rounded-2xl" />
                ) : upcomingBookings.length > 0 ? (
                  upcomingBookings.slice(0, 3).map((booking) => (
                    <Card className="rounded-2xl shadow-md border-0 bg-gradient-to-br from-white to-pink-50" key={booking.id}>
                      <CardContent className="p-5 flex flex-col gap-2">
                        <div className="flex gap-2 items-center font-inter">
                          <span className="font-playfair text-lg">{getServiceEmoji(booking.service?.title)} </span>
                          <span className="font-medium">{booking.service?.title || "Booking"}</span>
                        </div>
                        <div className="text-sm text-gray-700 flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          {booking.artist?.full_name || "Salon/Artist"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {booking.date_requested} at {booking.time_requested}
                        </div>
                        <div className="flex mt-2 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="min-h-[44px] w-1/2"
                            onClick={() => navigate(`/bookings/${booking.id}`)}
                          >
                            View
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            className="min-h-[44px] w-1/2"
                            onClick={() => navigate(`/bookings/${booking.id}?action=reschedule`)}
                          >
                            Reschedule
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="rounded-2xl shadow-none border-0 bg-gradient-to-r from-pink-50 to-purple-50">
                    <CardContent className="p-5 text-center">
                      <div className="font-playfair text-xl text-rose-700 mb-3">You have no upcoming bookings.</div>
                      <Button
                        className="min-h-[44px] w-full"
                        onClick={() => navigate("/services")}
                      >
                        Ready to treat yourself?
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </motion.div>
          </TabsContent>

          {/* Booking History */}
          <TabsContent value="history" className="space-y-6">
            <motion.div variants={fadeIn} initial="hidden" animate="show">
              <h2 className="font-playfair text-xl text-yellow-900 font-semibold mb-2 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />Past Services
              </h2>
              <div className="space-y-3">
                {loading ? (
                  <Skeleton className="h-24 w-full rounded-2xl" />
                ) : previousBookings.length > 0 ? (
                  previousBookings.slice(0, 5).map((booking) => (
                    <Card className="rounded-xl bg-gradient-to-br from-white to-yellow-50 shadow" key={booking.id}>
                      <CardContent className="p-4 flex gap-3 items-center">
                        <div className="text-2xl">{getServiceEmoji(booking.service?.title)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold truncate">{booking.service?.title || "Service"}</div>
                          <div className="text-xs text-gray-600 truncate">{booking.artist?.full_name}</div>
                          <div className="text-xs text-gray-400">{booking.date_requested}</div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="min-h-[44px] text-xs"
                          onClick={() => navigate(`/bookings/${booking.id}`)}
                        >
                          View
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="rounded-xl shadow-none bg-gradient-to-r from-yellow-50 to-white">
                    <CardContent className="p-5 text-center text-gray-700">
                      <div className="text-lg font-playfair mb-2">No booking history yet. Start your beauty journey!</div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </motion.div>
          </TabsContent>

          {/* Favorites */}
          <TabsContent value="favorites" className="space-y-6">
            <motion.div variants={fadeIn} initial="hidden" animate="show">
              <h2 className="font-playfair text-xl text-purple-900 font-semibold mb-2 flex items-center gap-2">
                <Heart className="h-5 w-5 text-purple-500" />Your Favorite Places
              </h2>
              <FavoritesSection />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop: 2-column elegant grid */}
      <div className="hidden md:grid md:grid-cols-2 gap-8">
        {/* Left: Upcoming + History */}
        <div className="space-y-6">
          {/* Upcoming Appointments */}
          <motion.div variants={fadeIn} initial="hidden" animate="show">
            <Card className="rounded-3xl shadow-md border-0 bg-gradient-to-br from-white to-pink-50">
              <CardHeader className="pb-2">
                <CardTitle className="font-playfair text-xl flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-rose-600" />Upcoming Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-24 w-full rounded-2xl" />
                ) : upcomingBookings.length > 0 ? (
                  <div className="space-y-3">
                    {upcomingBookings.slice(0, 5).map((booking) => (
                      <Card className="rounded-xl shadow-sm border bg-white/90" key={booking.id}>
                        <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-3 font-inter">
                          <div className="flex items-center gap-2">
                            <span className="font-playfair text-lg">{getServiceEmoji(booking.service?.title)} </span>
                            <span className="font-medium">{booking.service?.title || "Booking"}</span>
                          </div>
                          <div className="flex-1 text-sm text-gray-700 flex items-center gap-2 min-w-0 truncate">
                            <Users className="h-4 w-4" />
                            {booking.artist?.full_name || "Salon/Artist"}
                          </div>
                          <div className="text-xs text-gray-500 flex-shrink-0">
                            {booking.date_requested} at {booking.time_requested}
                          </div>
                          <div className="flex gap-2 mt-2 sm:mt-0">
                            <Button
                              variant="outline"
                              size="sm"
                              className="min-h-[44px]"
                              onClick={() => navigate(`/bookings/${booking.id}`)}
                            >
                              View
                            </Button>
                            <Button
                              variant="default"
                              size="sm"
                              className="min-h-[44px]"
                              onClick={() => navigate(`/bookings/${booking.id}?action=reschedule`)}
                            >
                              Reschedule
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="p-5 text-center text-rose-700 font-playfair">
                    You have no upcoming bookings.<br />
                    <Button
                      className="min-h-[44px] mt-4"
                      onClick={() => navigate("/services")}
                    >
                      Ready to treat yourself?
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Booking History */}
          <motion.div variants={fadeIn} initial="hidden" animate="show">
            <Card className="rounded-3xl shadow border-0 bg-gradient-to-br from-white to-yellow-50">
              <CardHeader className="pb-2">
                <CardTitle className="font-playfair text-xl flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />Booking History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-24 w-full rounded-2xl" />
                ) : previousBookings.length > 0 ? (
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-2 scroll-smooth">
                    {previousBookings.slice(0, 10).map((booking) => (
                      <Card className="rounded-xl bg-gradient-to-br from-white to-yellow-50 shadow-none border-0" key={booking.id}>
                        <CardContent className="p-4 flex gap-3 items-center">
                          <div className="text-2xl">{getServiceEmoji(booking.service?.title)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold truncate">{booking.service?.title || "Service"}</div>
                            <div className="text-xs text-gray-600 truncate">{booking.artist?.full_name}</div>
                            <div className="text-xs text-gray-400">{booking.date_requested}</div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="min-h-[44px] text-xs"
                            onClick={() => navigate(`/bookings/${booking.id}`)}
                          >
                            View
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="p-5 text-center text-gray-700 font-playfair text-lg">
                    No booking history yet.<br />Start your beauty journey!
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right: Favorites & Explore */}
        <div className="space-y-6">
          {/* Favorites Section */}
          <motion.div variants={fadeIn} initial="hidden" animate="show">
            <Card className="rounded-3xl shadow-md border-0 bg-gradient-to-br from-white to-purple-50">
              <CardHeader className="pb-2">
                <CardTitle className="font-playfair text-xl flex items-center gap-2">
                  <Heart className="h-5 w-5 text-purple-500" />Your Favorite Artists & Salons
                </CardTitle>
                <CardDescription className="text-[15px] text-gray-500 mb-1">
                  Your most loved & trusted providers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FavoritesSection />
              </CardContent>
            </Card>
          </motion.div>

          {/* Explore / Suggestions Section */}
          <motion.div variants={fadeIn} initial="hidden" animate="show">
            <Card className="rounded-3xl shadow border-0 bg-gradient-to-br from-white to-pink-50">
              <CardHeader className="pb-2">
                <CardTitle className="font-playfair text-xl flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-pink-500" />Explore & Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-pink-100 to-yellow-50 rounded-lg p-4 mb-2 text-center font-medium text-rose-700 font-playfair text-lg shadow-sm">
                  Trending salons near you
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-white rounded-lg p-4 text-center font-inter text-gray-700">
                  Loved by customers like you
                </div>
                {/* Placeholder for future dynamic suggestions */}
                <Button
                  className="min-h-[44px] w-full mt-2"
                  variant="outline"
                  onClick={() => navigate("/explore/services")}
                >
                  <Search className="h-5 w-5 mr-2" /> View All Services
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;

