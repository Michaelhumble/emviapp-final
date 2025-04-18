
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, TrendingUp, Users, Calendar, Eye, BarChart, ActivitySquare } from "lucide-react";
import { BookingsPerWeekChart } from "./charts/BookingsPerWeekChart";
import { ProfileViewsChart } from "./charts/ProfileViewsChart";
import { RepeatClientRateCard } from "./cards/RepeatClientRateCard";
import { TeamMemberStats } from "./cards/TeamMemberStats";
import { TopServicesChart } from "./charts/TopServicesChart";

const SalonAnalyticsTab: React.FC = () => {
  const [timeRange, setTimeRange] = useState<"30days" | "60days" | "90days">("30days");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold flex items-center">
          <BarChart3 className="h-6 w-6 mr-2 text-purple-600" />
          Salon Analytics
        </h2>
        
        <Select value={timeRange} onValueChange={(value: any) => setTimeRange(value)}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="60days">Last 60 Days</SelectItem>
            <SelectItem value="90days">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bookings Per Week Chart */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-purple-600" />
              Bookings Per Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BookingsPerWeekChart timeRange={timeRange} />
          </CardContent>
        </Card>

        {/* Profile Views Chart */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Eye className="h-5 w-5 mr-2 text-purple-600" />
              Profile Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ProfileViewsChart timeRange={timeRange} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Repeat Client Rate Card */}
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
              Repeat Client Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RepeatClientRateCard timeRange={timeRange} />
          </CardContent>
        </Card>

        {/* Top Services Chart */}
        <Card className="shadow-sm hover:shadow-md transition-shadow lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BarChart className="h-5 w-5 mr-2 text-purple-600" />
              Top Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TopServicesChart timeRange={timeRange} />
          </CardContent>
        </Card>
      </div>

      {/* Team Member Stats */}
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Users className="h-5 w-5 mr-2 text-purple-600" />
            Team Member Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TeamMemberStats timeRange={timeRange} />
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonAnalyticsTab;
