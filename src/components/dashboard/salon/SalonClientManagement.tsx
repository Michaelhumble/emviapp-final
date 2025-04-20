
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

const SalonClientManagement = () => {
  return (
    <Card className="border-blue-100">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center">
          <Users className="h-5 w-5 text-blue-500 mr-2" />
          Client Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="py-8 text-center">
          <p className="text-muted-foreground">
            Client management functionality is coming soon.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonClientManagement;
