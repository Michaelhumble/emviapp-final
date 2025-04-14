
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ArtistEarningsCard from "./earnings/ArtistEarningsCard";
import { useArtistData } from "./context/ArtistDataContext";

const ArtistDashboard = () => {
  const { loading } = useArtistData();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Overview</CardTitle>
          <CardDescription>Welcome to your artist dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          
          <p>View and manage your bookings, services, and profile</p>
        </CardContent>
      </Card>
      
      
      <ArtistEarningsCard />
    </div>
  );
};

export default ArtistDashboard;
