
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";

interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  environment: "production" | "staging" | "development" | "all";
}

const FeatureFlags = () => {
  // This is a placeholder with demo feature flags
  // Implement actual functionality when needed
  const featureFlags: FeatureFlag[] = [
    {
      id: "new-booking-flow",
      name: "New Booking Flow",
      description: "Enable the redesigned booking experience",
      enabled: true,
      environment: "development"
    },
    {
      id: "ai-recommendations",
      name: "AI Recommendations",
      description: "Show AI-powered service recommendations",
      enabled: false,
      environment: "staging"
    },
    {
      id: "chat-support",
      name: "In-app Chat Support",
      description: "Enable in-app chat support for all users",
      enabled: false,
      environment: "all"
    },
    {
      id: "public-profiles",
      name: "Public Profiles",
      description: "Allow public access to artist profiles",
      enabled: true,
      environment: "production"
    }
  ];

  const getEnvironmentColor = (env: string) => {
    switch (env) {
      case "production": return "bg-red-100 text-red-800 hover:bg-red-100";
      case "staging": return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      case "development": return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      default: return "bg-green-100 text-green-800 hover:bg-green-100";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Feature Flags</CardTitle>
        <CardDescription>
          Toggle features across different environments
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          {featureFlags.map((flag) => (
            <div 
              key={flag.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="space-y-1">
                <div className="flex items-center">
                  <span className="font-medium">{flag.name}</span>
                  <Badge className={`ml-2 ${getEnvironmentColor(flag.environment)}`}>
                    {flag.environment}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground flex items-center">
                  <Info className="h-3 w-3 mr-1 text-muted-foreground opacity-70" />
                  {flag.description}
                </p>
              </div>
              <Switch defaultChecked={flag.enabled} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureFlags;
