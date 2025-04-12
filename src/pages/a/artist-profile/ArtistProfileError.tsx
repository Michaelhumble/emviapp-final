
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ArtistProfileErrorProps {
  errorMessage: string;
}

const ArtistProfileError: React.FC<ArtistProfileErrorProps> = ({ errorMessage }) => {
  const navigate = useNavigate();
  
  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <Card className="text-center py-12">
        <CardContent>
          <h2 className="text-2xl font-semibold mb-2">Artist Not Found</h2>
          <p className="text-muted-foreground mb-6">
            {errorMessage || "The artist profile you're looking for doesn't exist or has been removed."}
          </p>
          <Button 
            onClick={() => navigate('/artists')}
            className="text-primary hover:underline"
          >
            Browse all artists
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArtistProfileError;
