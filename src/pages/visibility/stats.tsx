
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Users, Eye, MousePointerClick, Calendar, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

// Recharts components for the analytics
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const VisibilityStats = () => {
  const { userProfile } = useAuth();
  
  useEffect(() => {
    document.title = "Premium Visibility Stats | EmviApp";
  }, []);
  
  // Mock data for salon visibility
  const visibilityData = [
    { day: 'Mon', impressions: 45 },
    { day: 'Tue', impressions: 52 },
    { day: 'Wed', impressions: 49 },
    { day: 'Thu', impressions: 63 },
    { day: 'Fri', impressions: 71 },
    { day: 'Sat', impressions: 88 },
    { day: 'Sun', impressions: 65 }
  ];
  
  const today = new Date();
  const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'short' });
  const currentDayStats = visibilityData.find(d => d.day === dayOfWeek) || visibilityData[0];
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-serif mb-2">Premium Visibility Stats</h1>
              <p className="text-gray-600">Track your salon's visibility performance</p>
            </div>
            <p className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-full mt-4 md:mt-0 text-sm font-medium">
              <span className="inline-block h-2 w-2 bg-green-500 rounded-full"></span>
              Premium Visibility Active
            </p>
          </div>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Eye className="h-6 w-6 text-primary mb-2" />
                  <p className="text-2xl font-bold">{currentDayStats.impressions}</p>
                  <p className="text-xs text-muted-foreground">Today's Views</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Users className="h-6 w-6 text-primary mb-2" />
                  <p className="text-2xl font-bold">243</p>
                  <p className="text-xs text-muted-foreground">Local Reach</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <MousePointerClick className="h-6 w-6 text-primary mb-2" />
                  <p className="text-2xl font-bold">18</p>
                  <p className="text-xs text-muted-foreground">Profile Clicks</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Calendar className="h-6 w-6 text-primary mb-2" />
                  <p className="text-2xl font-bold">7</p>
                  <p className="text-xs text-muted-foreground">Days Remaining</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Visibility Chart */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Weekly Visibility</span>
                <Button variant="ghost" size="sm" className="h-8">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Detailed Reports
                </Button>
              </CardTitle>
              <CardDescription>
                How your salon's visibility has changed over the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={visibilityData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="day" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="impressions" 
                      stroke="#6366f1" 
                      fill="#6366f1"
                      fillOpacity={0.2} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Recommendation Card */}
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>
                Tips to increase your visibility and engagement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="text-blue-500 mt-0.5">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-blue-700">Post a special offer</h3>
                  <p className="text-sm text-blue-600">
                    Salons with special offers receive 2.5x more views and bookings.
                  </p>
                  <Button variant="link" className="p-0 h-auto text-blue-700" asChild>
                    <Link to="/offers/create">Create an offer →</Link>
                  </Button>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="text-purple-500 mt-0.5">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-purple-700">Update your portfolio</h3>
                  <p className="text-sm text-purple-600">
                    Add recent work samples to keep your profile fresh and engaging.
                  </p>
                  <Button variant="link" className="p-0 h-auto text-purple-700" asChild>
                    <Link to="/portfolio/edit">Update portfolio →</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default VisibilityStats;
