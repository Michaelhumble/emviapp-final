
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";
import ArtistPortfolio from "../ArtistPortfolio";

const PortfolioTab = () => {
  return (
    <div className="space-y-6">
      <ArtistPortfolio />
      <div className="flex justify-center mt-6">
        <Link to="/dashboard/artist/portfolio">
          <Button 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            <Image className="h-4 w-4 mr-2" />
            Manage Portfolio
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PortfolioTab;
