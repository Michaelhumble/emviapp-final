
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from "recharts";
import { EarningsData } from "../types/ArtistDashboardTypes";
import StatCard from "./StatCard";
import { ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp, BarChart3, PieChart as PieChartIcon, HelpCircle, Calendar } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface EarningsSectionProps {
  earningsData: EarningsData;
  isLoading: boolean;
}

const EarningsSection = ({ earningsData, isLoading }: EarningsSectionProps) => {
  const [chartView, setChartView] = useState<"monthly" | "services">("monthly");
  
  // Calculate percentage change from previous period
  const calculatePercentChange = (current: number, previous: number) => {
    if (previous === 0) return 100;
    return ((current - previous) / previous) * 100;
  };
  
  // Get current month's earnings
  const currentMonthEarnings = earningsData?.monthly_earnings?.length > 0
    ? earningsData.monthly_earnings[earningsData.monthly_earnings.length - 1].amount
    : 0;
  
  // Get previous month's earnings
  const previousMonthEarnings = earningsData?.monthly_earnings?.length > 1
    ? earningsData.monthly_earnings[earningsData.monthly_earnings.length - 2].amount
    : 0;
  
  // Calculate percentage change
  const percentChange = calculatePercentChange(currentMonthEarnings, previousMonthEarnings);
  const isPositive = percentChange >= 0;
  
  // Create service breakdown for donut chart
  const serviceBreakdown = [
    { name: "Gel Manicure", value: 2100, color: "#8884d8" },
    { name: "Acrylic Full Set", value: 1800, color: "#83a6ed" },
    { name: "Dip Powder", value: 1400, color: "#8dd1e1" },
    { name: "Nail Art", value: 1200, color: "#82ca9d" },
    { name: "Pedicure", value: 900, color: "#ffc658" }
  ];
  
  // Calculate total service value
  const totalServiceValue = serviceBreakdown.reduce((sum, item) => sum + item.value, 0);
  
  // COLORS
  const CHART_PRIMARY = "#9b87f5";
  const CHART_SUCCESS = "#10b981";
  const CHART_WARNING = "#f59e0b";
  const CHART_DANGER = "#ea384c";
  
  return (
    <Card className="shadow-sm border-purple-100">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-serif flex items-center">
            <DollarSign className="h-5 w-5 text-purple-500 mr-2" />
            Earnings Dashboard
          </CardTitle>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>Track your earnings, analyze revenue by service, and view month-over-month performance.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-8">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <div className="bg-white rounded-lg border border-purple-100 p-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground/50 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Your total lifetime earnings from all bookings</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <h3 className="text-sm font-medium text-muted-foreground flex items-center">
              <TrendingUp className="h-4 w-4 mr-1 text-purple-500" />
              Total Earnings
            </h3>
            <div className="mt-2 flex items-end">
              <span className="text-2xl font-bold">${earningsData?.total_earnings?.toLocaleString() || '0'}</span>
              <span className="text-xs ml-1 mb-1 text-muted-foreground">lifetime</span>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">Lifetime earnings across all services</div>
          </div>
          
          <div className="bg-white rounded-lg border border-purple-100 p-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground/50 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Earnings from the current month</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <h3 className="text-sm font-medium text-muted-foreground flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-green-500" />
              This Month
            </h3>
            <div className="mt-2 flex items-end">
              <span className="text-2xl font-bold">${currentMonthEarnings?.toLocaleString() || '0'}</span>
              <Badge className={`ml-2 mb-1 ${isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {isPositive ? <ArrowUpRight className="h-3 w-3 inline mr-1" /> : <ArrowDownRight className="h-3 w-3 inline mr-1" />}
                {Math.abs(percentChange).toFixed(1)}%
              </Badge>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              {isPositive ? 'Up' : 'Down'} from last month (${previousMonthEarnings})
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-purple-100 p-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground/50 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Amount waiting to be paid out to your account</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <h3 className="text-sm font-medium text-muted-foreground flex items-center">
              <DollarSign className="h-4 w-4 mr-1 text-amber-500" />
              Pending Payout
            </h3>
            <div className="mt-2 flex items-end">
              <span className="text-2xl font-bold">${earningsData?.pending_payouts?.toLocaleString() || '0'}</span>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">Expected in 2-3 business days</div>
          </div>
        </div>
        
        <div className="rounded-lg border border-purple-100 p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-medium">Performance Analytics</h4>
            <Tabs value={chartView} onValueChange={(v) => setChartView(v as "monthly" | "services")}>
              <TabsList className="h-8">
                <TabsTrigger value="monthly" className="text-xs h-7 px-3">
                  <BarChart3 className="h-3.5 w-3.5 mr-1" />
                  Monthly
                </TabsTrigger>
                <TabsTrigger value="services" className="text-xs h-7 px-3">
                  <PieChartIcon className="h-3.5 w-3.5 mr-1" />
                  By Service
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <TabsContent value="monthly" className="mt-0">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={earningsData?.monthly_earnings || []}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    tickLine={false}
                    axisLine={false}
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    tickFormatter={(value) => `$${value}`} 
                    width={60}
                    tickLine={false}
                    axisLine={false}
                    style={{ fontSize: '12px' }}
                  />
                  <RechartsTooltip
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
                    labelFormatter={(label) => `Month: ${label}`}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke={CHART_PRIMARY}
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2, fill: 'white' }}
                    activeDot={{ r: 6, fill: CHART_PRIMARY }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="services" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={serviceBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      labelLine={false}
                    >
                      {serviceBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex flex-col justify-center">
                <h5 className="text-sm font-medium mb-3">Service Breakdown</h5>
                <div className="space-y-3">
                  {serviceBreakdown.map((service, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: service.color }}></div>
                      <div className="flex-1 text-sm">{service.name}</div>
                      <div className="text-sm font-medium">${service.value}</div>
                      <div className="text-xs text-muted-foreground ml-2">
                        {((service.value / totalServiceValue) * 100).toFixed(0)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarningsSection;
