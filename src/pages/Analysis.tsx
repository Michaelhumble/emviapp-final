
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { Lock, TrendingUp, Clock } from "lucide-react";

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

const pieData = [
  { name: 'Haircuts', value: 35 },
  { name: 'Color', value: 25 },
  { name: 'Nails', value: 20 },
  { name: 'Spa', value: 15 },
  { name: 'Other', value: 5 },
];

const barData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 7000 },
  { month: 'May', revenue: 6000 },
  { month: 'Jun', revenue: 8000 },
];

const lineData = [
  { name: 'Week 1', clients: 10 },
  { name: 'Week 2', clients: 15 },
  { name: 'Week 3', clients: 13 },
  { name: 'Week 4', clients: 17 },
  { name: 'Week 5', clients: 20 },
  { name: 'Week 6', clients: 18 },
];

const Analysis = () => {
  const { user } = useAuth();
  const isLoggedIn = !!user;
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div 
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold font-serif tracking-wide mb-6">Beauty Industry Analysis</h1>
          <p className="text-lg text-gray-600 mb-8 font-sans leading-relaxed">
            Powerful analytics and insights to help you understand trends in the beauty industry.
          </p>
        </motion.div>

        <Tabs defaultValue="trends" className="w-full mb-12">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="trends">Market Trends</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="forecast">Forecast</TabsTrigger>
          </TabsList>

          <TabsContent value="trends">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" /> Service Popularity
                  </CardTitle>
                  <CardDescription>
                    Distribution of beauty services by demand
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    {isLoggedIn ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={90}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex items-center justify-center bg-gray-50 rounded-md">
                        <div className="text-center p-6">
                          <Lock className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                          <h3 className="font-medium text-gray-700 mb-2">Sign In to View Charts</h3>
                          <p className="text-sm text-gray-500 mb-4">
                            Create a free account to access all analytics features
                          </p>
                          <Link to="/auth/signup">
                            <Button>Sign Up For Free</Button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" /> Revenue Trends
                  </CardTitle>
                  <CardDescription>
                    Monthly revenue analysis for beauty services
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    {isLoggedIn ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData}>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="revenue" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex items-center justify-center bg-gray-50 rounded-md">
                        <div className="text-center p-6">
                          <Lock className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                          <h3 className="font-medium text-gray-700 mb-2">Sign In to View Charts</h3>
                          <p className="text-sm text-gray-500 mb-4">
                            Create a free account to access all analytics features
                          </p>
                          <Link to="/auth/signup">
                            <Button>Sign Up For Free</Button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Client Growth</CardTitle>
                <CardDescription>Weekly client acquisition trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  {isLoggedIn ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={lineData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="clients" stroke="#8884d8" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center bg-gray-50 rounded-md">
                      <div className="text-center p-6">
                        <Lock className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <h3 className="font-medium text-gray-700 mb-2">Sign In to View Charts</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Create a free account to access all analytics features
                        </p>
                        <Link to="/auth/signup">
                          <Button>Sign Up For Free</Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                {isLoggedIn && (
                  <Button variant="outline" className="w-full">Download Report</Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="forecast">
            <div className="mt-8 text-center">
              <Card>
                <CardHeader>
                  <CardTitle>Industry Forecast</CardTitle>
                  <CardDescription>
                    Future predictions for the beauty industry
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoggedIn ? (
                    <div className="text-center p-8">
                      <p className="mb-4 text-lg">Premium Feature</p>
                      <p className="text-gray-500 mb-6">
                        Unlock forecasting with a premium subscription to get ahead of industry trends.
                      </p>
                      <Button>Upgrade to Pro</Button>
                    </div>
                  ) : (
                    <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                      <div className="text-center p-6">
                        <Lock className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <h3 className="font-medium text-gray-700 mb-2">Sign In to Access Forecasting</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Create a free account to access basic analytics features
                        </p>
                        <Link to="/auth/signup">
                          <Button>Sign Up For Free</Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Analysis;
