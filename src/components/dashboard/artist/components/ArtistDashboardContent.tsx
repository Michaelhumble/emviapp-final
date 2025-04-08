
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Image, Settings, Users, Star } from "lucide-react";

export interface ArtistDashboardContentProps {
  artistData: any;
}

const ArtistDashboardContent = ({ artistData }: ArtistDashboardContentProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <h2 className="text-2xl font-semibold mb-4">Welcome, {artistData?.full_name || 'Artist'}</h2>
          <p className="text-gray-600">
            This is your artist dashboard where you can manage your profile, services, and bookings.
          </p>
        </div>
        
        <div className="col-span-2">
          <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-medium mb-2">Your Artist Profile</h3>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                {artistData?.avatar_url ? (
                  <img 
                    src={artistData.avatar_url} 
                    alt={artistData.full_name} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-purple-600 text-xl font-semibold">
                    {artistData?.full_name?.[0] || 'A'}
                  </span>
                )}
              </div>
              <div>
                <h4 className="font-medium">{artistData?.full_name}</h4>
                <p className="text-sm text-gray-500">{artistData?.specialty || 'Nail Artist'}</p>
                <p className="text-sm text-gray-500">{artistData?.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions for Artists */}
      <Card>
        <CardHeader>
          <CardTitle className="text-purple-700">Artist Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="flex flex-col h-24 p-2 items-center justify-center gap-1">
              <CalendarDays className="h-6 w-6 text-purple-500" />
              <span className="text-xs text-center">Manage Bookings</span>
            </Button>
            
            <Button variant="outline" className="flex flex-col h-24 p-2 items-center justify-center gap-1">
              <Image className="h-6 w-6 text-purple-500" />
              <span className="text-xs text-center">Update Portfolio</span>
            </Button>
            
            <Button variant="outline" className="flex flex-col h-24 p-2 items-center justify-center gap-1">
              <Star className="h-6 w-6 text-purple-500" />
              <span className="text-xs text-center">View Reviews</span>
            </Button>
            
            <Button variant="outline" className="flex flex-col h-24 p-2 items-center justify-center gap-1">
              <Settings className="h-6 w-6 text-purple-500" />
              <span className="text-xs text-center">Artist Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Artist-specific Performance Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-purple-700">Your Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-purple-700">Profile Views</h3>
              <p className="text-2xl font-bold mt-1">{artistData?.profile_views || 142}</p>
              <p className="text-xs text-purple-600 mt-1">+12% this week</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-purple-700">Bookings</h3>
              <p className="text-2xl font-bold mt-1">23</p>
              <p className="text-xs text-purple-600 mt-1">+3 new this week</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-purple-700">Rating</h3>
              <p className="text-2xl font-bold mt-1">4.8</p>
              <p className="text-xs text-purple-600 mt-1">Based on 56 reviews</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArtistDashboardContent;
