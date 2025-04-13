
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UserX } from "lucide-react";

const ArtistProfileError: React.FC = () => {
  return (
    <div className="container max-w-3xl mx-auto py-12 px-4">
      <Card className="text-center py-12">
        <CardContent>
          <div className="flex flex-col items-center">
            <UserX className="h-16 w-16 text-muted-foreground mb-4" />
            <h1 className="text-2xl font-semibold mb-2">Artist Not Found</h1>
            <p className="text-muted-foreground mb-6">
              Sorry, we couldn't find the artist you're looking for. They may have changed their username or 
              their profile is no longer available.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" asChild>
                <Link to="/explore/artists">Explore Artists</Link>
              </Button>
              <Button asChild>
                <Link to="/">Go Home</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArtistProfileError;
