
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const ProfileNotFound: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-lg mx-auto">
        <CardContent className="pt-6 text-center py-12">
          <User className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Artist Not Found</h1>
          <p className="text-gray-500 mb-6">
            The artist profile you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button>Return to Homepage</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileNotFound;
