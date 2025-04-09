
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Calendar, DollarSign, Users, TrendingUp } from "lucide-react";
import { useState } from "react";

// Sample data - in a real application, this would come from the API
const earningsData = [
  { name: "Jan", earnings: 0 },
  { name: "Feb", earnings: 0 },
  { name: "Mar", earnings: 150 },
  { name: "Apr", earnings: 320 },
  { name: "May", earnings: 480 },
  { name: "Jun", earnings: 630 },
  { name: "Jul", earnings: 750 },
  { name: "Aug", earnings: 890 },
  { name: "Sep", earnings: 1050 },
  { name: "Oct", earnings: 1180 },
  { name: "Nov", earnings: 1320 },
  { name: "Dec", earnings: 0 },
];

const bookingsData = [
  { name: "Jan", bookings: 0 },
  { name: "Feb", bookings: 0 },
  { name: "Mar", bookings: 2 },
  { name: "Apr", bookings: 4 },
  { name: "May", bookings: 6 },
  { name: "Jun", bookings: 8 },
  { name: "Jul", bookings: 10 },
  { name: "Aug", bookings: 12 },
  { name: "Sep", bookings: 14 },
  { name: "Oct", bookings: 16 },
  { name: "Nov", bookings: 18 },
  { name: "Dec", bookings: 0 },
];

const serviceBreakdownData = [
  { name: "Acrylic Full Set", value: 35 },
  { name: "Gel Manicure", value: 25 },
  { name: "Pedicure", value: 20 },
  { name: "Nail Art", value: 15 },
  { name: "Other", value: 5 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c'];

const ArtistAnalytics = () => {
  const [timeRange, setTimeRange] = useState("year");
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle className="text-xl font-serif">Earnings & Analytics</CardTitle>
            <CardDescription>Track your performance and earnings over time</CardDescription>
          </div>
          <div className="flex">
            <Button variant="outline" size="sm" className="mr-2">
              <Calendar className="h-4 w-4 mr-2" />
              Custom Range
            </Button>
            <Button size="sm">
              <DollarSign className="h-4 w-4 mr-2" />
              Payout
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Earnings</p>
                  <h4 className="text-2xl font-bold">$1,320</h4>
                </div>
                <div className="bg-green-100 h-10 w-10 rounded-full flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="text-xs text-green-600 mt-2 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+12.5% from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Bookings</p>
                  <h4 className="text-2xl font-bold">18</h4>
                </div>
                <div className="bg-blue-100 h-10 w-10 rounded-full flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="text-xs text-blue-600 mt-2 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+8.3% from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Unique Clients</p>
                  <h4 className="text-2xl font-bold">9</h4>
                </div>
                <div className="bg-purple-100 h-10 w-10 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div className="text-xs text-purple-600 mt-2 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+4.2% from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Avg. Booking Value</p>
                  <h4 className="text-2xl font-bold">$73</h4>
                </div>
                <div className="bg-amber-100 h-10 w-10 rounded-full flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <div className="text-xs text-amber-600 mt-2 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+2.1% from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Time Range Filter */}
        <div className="flex justify-end mb-4">
          <Tabs value={timeRange} onValueChange={setTimeRange}>
            <TabsList>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Earnings Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={earningsData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`$${value}`, 'Earnings']}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <Bar dataKey="earnings" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Bookings Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={500}
                    height={300}
                    data={bookingsData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value}`, 'Bookings']}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <Line type="monotone" dataKey="bookings" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Service Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart width={400} height={400}>
                    <Pie
                      data={serviceBreakdownData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {serviceBreakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistAnalytics;
