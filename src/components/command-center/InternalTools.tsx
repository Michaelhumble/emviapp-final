
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceControls from "./ServiceControls";
import FeatureFlags from "./FeatureFlags";
import WaitlistManager from "./WaitlistManager";

const InternalTools = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Internal Tools</CardTitle>
        <CardDescription>
          Founder tools and controls for EmviApp's platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="waitlist" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="waitlist">Beta Access</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="features">Feature Flags</TabsTrigger>
          </TabsList>
          
          <TabsContent value="waitlist" className="space-y-4">
            <WaitlistManager />
          </TabsContent>
          
          <TabsContent value="services" className="space-y-4">
            <ServiceControls />
          </TabsContent>
          
          <TabsContent value="features" className="space-y-4">
            <FeatureFlags />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InternalTools;
