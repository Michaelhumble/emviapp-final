
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Star,
  Settings,
  Plus,
  Eye,
  BarChart3
} from 'lucide-react';

// Mock data for the dashboard
const mockSalonData = {
  name: "Beautiful Nails LA",
  address: "123 Beverly Hills Blvd, Los Angeles, CA 90210",
  status: "Open Now",
  todayBookings: 8,
  activeStaff: 5,
  weeklyEarnings: 2450,
  monthlyEarnings: 8920,
  profileViews: 156,
  conversionRate: 68
};

const mockBookings = [
  { id: 1, client: "Sarah M.", service: "Gel Manicure", time: "10:00 AM", staff: "Jenny" },
  { id: 2, client: "Maria L.", service: "Pedicure", time: "11:30 AM", staff: "Lisa" },
  { id: 3, client: "Emma K.", service: "Nail Art", time: "2:00 PM", staff: "Jenny" },
  { id: 4, client: "Ana R.", service: "French Tips", time: "3:30 PM", staff: "Sofia" }
];

const mockReviews = [
  { id: 1, author: "Sarah M.", rating: 5, comment: "Amazing service as always! Love my nails.", date: "2 days ago" },
  { id: 2, author: "Jessica L.", rating: 4, comment: "Great experience, very professional staff.", date: "4 days ago" }
];

const SalonDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    console.log("RENDERING SalonDashboard.tsx");
    document.title = "Salon Dashboard | EmviApp";
  }, []);

  return (
    <Layout>
      <div style={{ backgroundColor: '#007BFF', color: '#FFF', padding: '10px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold', width: '100%' }}>
        RENDERING SalonDashboard.tsx
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="space-y-4">
              {/* Profile Completion */}
              <Card className="border-muted shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Profile Completion</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Profile Completion</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Missing information:</p>
                    <ul className="text-sm text-gray-600 space-y-1 pl-5 list-disc">
                      <li>Business hours</li>
                      <li>Service pricing</li>
                    </ul>
                    <Button variant="link" className="px-0 h-auto text-purple-600" size="sm">
                      Complete Profile →
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Salon Info */}
              <Card className="border-muted shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-playfair">
                    {mockSalonData.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground font-inter">
                    {mockSalonData.address}
                  </p>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 mt-2">
                    {mockSalonData.status}
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger 
                  value="overview" 
                  className="font-inter data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="calendar" 
                  className="font-inter data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600"
                >
                  Booking Calendar
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="font-inter data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600"
                >
                  Settings
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 flex items-start space-x-3">
                      <div className="bg-purple-50 p-2 rounded-full">
                        <BarChart3 className="h-5 w-5 text-purple-500" />
                      </div>
                      <div>
                        <p className="text-xl font-bold">{mockSalonData.todayBookings}</p>
                        <p className="text-xs text-gray-500">Today's Bookings</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 flex items-start space-x-3">
                      <div className="bg-purple-50 p-2 rounded-full">
                        <Eye className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-xl font-bold">{mockSalonData.profileViews}</p>
                        <p className="text-xs text-gray-500">Profile Views</p>
                        <p className="text-xs text-emerald-600">+12% this week</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 flex items-start space-x-3">
                      <div className="bg-purple-50 p-2 rounded-full">
                        <Users className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-xl font-bold">{mockSalonData.activeStaff}</p>
                        <p className="text-xs text-gray-500">Active Staff</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 flex items-start space-x-3">
                      <div className="bg-purple-50 p-2 rounded-full">
                        <DollarSign className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-xl font-bold">${mockSalonData.weeklyEarnings}</p>
                        <p className="text-xs text-gray-500">Weekly Earnings</p>
                        <p className="text-xs text-emerald-600">+5% from last week</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Today's Bookings */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Today's Bookings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {mockBookings.map((booking) => (
                          <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">{booking.client}</p>
                              <p className="text-sm text-gray-600">{booking.service}</p>
                              <p className="text-xs text-gray-400">{booking.time}</p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {booking.staff}
                            </Badge>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full mt-4" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Booking
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Recent Reviews */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5" />
                        Recent Reviews
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockReviews.map((review) => (
                          <div key={review.id} className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{review.author}</span>
                              <div className="flex items-center">
                                {Array.from({ length: review.rating }).map((_, i) => (
                                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">{review.comment}</p>
                            <p className="text-xs text-gray-400 mt-2">{review.date}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button className="h-16 flex-col space-y-2">
                        <Plus className="h-5 w-5" />
                        <span>Post a Job</span>
                      </Button>
                      <Button variant="outline" className="h-16 flex-col space-y-2">
                        <Users className="h-5 w-5" />
                        <span>Manage Staff</span>
                      </Button>
                      <Button variant="outline" className="h-16 flex-col space-y-2">
                        <TrendingUp className="h-5 w-5" />
                        <span>View Analytics</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="calendar" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Booking Calendar
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Calendar className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium mb-2">Calendar View Coming Soon</h3>
                      <p className="text-gray-500 mb-4">
                        Manage all your salon appointments in one place
                      </p>
                      <Button>
                        Set Up Calendar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Salon Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Business Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Salon Name
                            </label>
                            <input 
                              type="text" 
                              defaultValue={mockSalonData.name}
                              className="w-full p-2 border border-gray-300 rounded-md"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Phone
                            </label>
                            <input 
                              type="tel" 
                              placeholder="(555) 123-4567"
                              className="w-full p-2 border border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Business Hours</h3>
                        <div className="space-y-2">
                          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                            <div key={day} className="flex items-center gap-4">
                              <div className="w-20 text-sm">{day}</div>
                              <input type="time" defaultValue="09:00" className="p-1 border rounded" />
                              <span>to</span>
                              <input type="time" defaultValue="18:00" className="p-1 border rounded" />
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Button className="w-full md:w-auto">
                        Save Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SalonDashboard;
