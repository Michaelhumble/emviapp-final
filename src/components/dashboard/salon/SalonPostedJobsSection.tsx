
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

const SalonPostedJobsSection = () => {
  return (
    <Card className="border-blue-100">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center">
          <Briefcase className="h-5 w-5 text-blue-500 mr-2" />
          Posted Jobs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="py-8 text-center">
          <p className="text-muted-foreground">
            Jobs management functionality is coming soon.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonPostedJobsSection;
