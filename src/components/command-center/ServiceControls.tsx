
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, CheckCircle, Loader2 } from "lucide-react";

const ServiceControls = () => {
  // This is a placeholder for the actual service controls
  // Implement actual functionality when needed
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Service Controls</CardTitle>
        <CardDescription>
          Manage platform services and API endpoints
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          {["Authentication API", "Storage Service", "Notification Service", "Search API"].map(
            (service) => (
              <div 
                key={service}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <div className="flex items-center">
                    <span className="font-medium">{service}</span>
                    <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Last check: 2 mins ago</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <ArrowUpDown className="h-4 w-4 mr-1" />
                    Restart
                  </Button>
                  <Switch defaultChecked />
                </div>
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceControls;
