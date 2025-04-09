
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, ChevronRight, Gift, Heart, MapPin, Search, Sparkles, Star, Ticket, TrendingUp } from "lucide-react";

// Custom hook for customer data
const useCustomerData = () => {
  // This would normally fetch customer-specific data
  // For now we're using mock data
  return {
    favoriteArtists: [
      { id: "a1", name: "Jessica W.", avatar: null, specialty: "Nail Artist" },
      { id: "a2", name: "Michael T.", avatar: null, specialty: "Hair Stylist" },
      { id: "a3", name: "Emma L.", avatar: null, specialty: "Makeup Artist" },
    ],
    upcomingAppointment: {
      date: "April 15, 2025",
      time: "2:00 PM",
      service: "Gel Manicure",
      artist: "Jessica W.",
      location: "Glamour Salon"
    },
    specialOffers: [
      { id: "o1", title: "20% Off First Visit", salon: "Serenity Spa", validUntil: "Apr 30", distance: "1.2 miles" },
      { id: "o2", title: "Free Hair Consultation", salon: "Style Studio", validUntil: "May 5", distance: "0.8 miles" },
    ],
    serviceCategories: [
      { icon: "💅", name: "Nail Art", count: 24 },
      { icon: "💇‍♀️", name: "Hair Styling", count: 18 },
      { icon: "✨", name: "Facials", count: 12 },
      { icon: "💆‍♀️", name: "Massage", count: 9 },
      { icon: "💋", name: "Makeup", count: 15 },
      { icon: "🦶", name: "Pedicure", count: 11 },
    ]
  };
};

const CustomerDashboard = () => {
  // Use the isolated customer data hook
  const { favoriteArtists, upcomingAppointment, specialOffers, serviceCategories } = useCustomerData();
  
  // Animation variants for staggered animations
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
  
  return (
    <div className="space-y-8">
      {/* Discover New Services Section */}
      <Card className="overflow-hidden border-0 shadow-md bg-white/70 backdrop-blur-sm">
        <CardHeader className="pb-2 border-b bg-gradient-to-r from-pink-50 to-rose-50">
          <CardTitle className="font-serif flex items-center text-xl">
            <Search className="h-5 w-5 text-pink-500 mr-2" />
            Discover New Services
          </CardTitle>
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
      
      {/* Favorites and Appointments Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Favorites Section */}
        <Card className="overflow-hidden border-0 shadow-md bg-white/70 backdrop-blur-sm">
          <CardHeader className="pb-2 border-b">
            <CardTitle className="font-serif flex items-center text-lg">
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
            <CardTitle className="font-serif flex items-center text-lg">
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
      </div>
      
      {/* Special Offers Section */}
      <Card className="overflow-hidden border-0 shadow-md bg-white/70 backdrop-blur-sm">
        <CardHeader className="pb-2 border-b">
          <CardTitle className="font-serif flex items-center text-lg">
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
      
      {/* Trending Beauty Tips Banner */}
      <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-r from-purple-100 to-pink-100">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-lg font-medium text-gray-800 mb-2 flex items-center">
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
    </div>
  );
};

export default CustomerDashboard;
