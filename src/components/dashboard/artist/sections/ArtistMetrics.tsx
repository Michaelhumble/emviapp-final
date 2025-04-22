
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Star } from "lucide-react";
import { motion } from "framer-motion";

const ArtistMetrics = () => {
  // Mock data
  const metrics = [
    {
      title: "Total Bookings",
      value: "58",
      icon: <Calendar className="h-5 w-5 text-blue-600" />,
      change: "+12% from last month",
      color: "blue"
    },
    {
      title: "Active Clients",
      value: "32",
      icon: <Users className="h-5 w-5 text-purple-600" />,
      change: "+4 new clients",
      color: "purple"
    },
    {
      title: "Average Rating",
      value: "4.9",
      icon: <Star className="h-5 w-5 text-amber-600" />,
      change: "from 24 reviews",
      color: "amber"
    }
  ];

  return (
    <Card className="border-gray-100 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium text-gray-900">
          Performance Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <div 
              key={metric.title} 
              className={`bg-${metric.color}-50 rounded-lg p-4 border border-${metric.color}-100`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-600">{metric.title}</p>
                  <h3 className="text-2xl font-semibold mt-1">{metric.value}</h3>
                  <p className="text-xs text-gray-500 mt-1">{metric.change}</p>
                </div>
                <div className={`p-2 rounded-full bg-${metric.color}-100 text-${metric.color}-600`}>
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
