
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ArtistPortfolioGallery from "./ArtistPortfolioGallery";
import { useAuth } from "@/context/auth";

const ArtistPortfolioSection = () => {
  const { userRole } = useAuth();
  
  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-serif">My Portfolio</CardTitle>
          <CardDescription>
            Showcase your best work to attract and impress clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ArtistPortfolioGallery />
        </CardContent>
      </Card>
    </div>
  );
};

export default ArtistPortfolioSection;
