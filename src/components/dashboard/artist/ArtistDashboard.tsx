
import React from "react";
import PremiumArtistDashboard from "./PremiumArtistDashboard";
import { useAuth } from "@/context/auth";

const ArtistDashboard = () => {
  const { user, userRole } = useAuth();
  
  // GIANT DEBUG BANNER AND CONSOLE LOG
  console.log('🚨 RENDERING DASHBOARD FOR ROLE:', userRole, '— USING FILE: ArtistDashboard.tsx (src/components/dashboard/artist/ArtistDashboard.tsx)');

  return (
    <div>
      {/* GIANT DEBUG BANNER */}
      <div className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-8 px-6 text-center shadow-xl">
        <h1 className="text-4xl font-black mb-2">🎨 ARTIST DASHBOARD LOADED</h1>
        <p className="text-xl font-bold">FILE: ArtistDashboard.tsx</p>
        <p className="text-lg">PATH: src/components/dashboard/artist/ArtistDashboard.tsx</p>
        <p className="text-lg">USER ROLE: {userRole} | USER: {user?.email}</p>
      </div>
      
      <PremiumArtistDashboard />
    </div>
  );
};

export default ArtistDashboard;
