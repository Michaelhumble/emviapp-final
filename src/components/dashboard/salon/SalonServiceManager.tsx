
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors } from "lucide-react";

const SalonServiceManager = () => {
  return (
    <Card className="border-blue-100">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center">
          <Scissors className="h-5 w-5 text-blue-500 mr-2" />
          Service Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="py-8 text-center">
          <p className="text-muted-foreground">
            Service management functionality is coming soon.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonServiceManager;
