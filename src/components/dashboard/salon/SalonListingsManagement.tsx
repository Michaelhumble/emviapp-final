
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const SalonListingsManagement: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Salon Listings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-4">
            Manage your salon listings and featured posts.
          </p>
          <Button className="flex items-center">
            <Plus className="mr-2 h-4 w-4" /> Create New Listing
          </Button>
        </div>
        
        <div className="text-center py-6 text-gray-500">
          No active listings found.
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonListingsManagement;
