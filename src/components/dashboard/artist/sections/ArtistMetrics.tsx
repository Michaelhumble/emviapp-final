
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Star } from "lucide-react";
import { useArtistData } from '../context/ArtistDataContext';

const ArtistMetrics = () => {
  const { bookingCount, reviewCount, averageRating } = useArtistData();
  
  // Define metrics with icons and values
  const metrics = [
    {
      title: "Total Bookings",
      value: bookingCount.toString(),
      icon: <Calendar className="h-5 w-5 text-blue-600" />,
      change: "+12% from last month",
      color: "bg-blue-50 border-blue-100"
    },
    {
      title: "Active Clients",
      value: "32",
      icon: <Users className="h-5 w-5 text-purple-600" />,
      change: "+4 new clients",
      color: "bg-purple-50 border-purple-100"
    },
    {
      title: "Average Rating",
      value: averageRating.toString(),
      icon: <Star className="h-5 w-5 text-amber-600" />,
      change: `from ${reviewCount} reviews`,
      color: "bg-amber-50 border-amber-100"
    }
  ];

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-gray-900">
          Performance Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <div 
              key={metric.title} 
              className={`${metric.color} rounded-lg p-4 border transition-all duration-200 hover:shadow-md`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600">{metric.title}</p>
                  <h3 className="text-2xl font-semibold mt-1">{metric.value}</h3>
                  <p className="text-xs text-gray-500 mt-1">{metric.change}</p>
                </div>
                <div className="p-2 rounded-full bg-white/80">
                  {metric.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistMetrics;
