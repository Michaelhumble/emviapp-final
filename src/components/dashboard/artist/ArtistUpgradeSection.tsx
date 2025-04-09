
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Sparkles, Zap, Globe, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const ArtistUpgradeSection = () => {
  const handleUpgradeClick = () => {
    toast.info("Pro subscriptions coming soon! Check back later.");
  };
  
  return (
    <Card className="mb-6 border-primary/20">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-medium">Upgrade to Pro</CardTitle>
            <CardDescription>Boost your profile and business</CardDescription>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            <Sparkles className="h-3 w-3 mr-1" /> Recommended
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="grid gap-4">
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-sm">Featured Placement</h4>
              <p className="text-sm text-muted-foreground">Get priority placement in search results and explore pages</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-sm">Advanced Analytics</h4>
              <p className="text-sm text-muted-foreground">See who's viewing your profile and which services are most popular</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-sm">Custom Booking Page</h4>
              <p className="text-sm text-muted-foreground">Professional booking page to share with clients</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-sm">Remove EmviApp Branding</h4>
              <p className="text-sm text-muted-foreground">Present a fully professional image to your clients</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="flex flex-col items-center p-3 bg-primary/5 rounded-md">
            <Zap className="h-6 w-6 text-amber-500 mb-1" />
            <span className="text-sm font-medium">3x Visibility</span>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-primary/5 rounded-md">
            <Globe className="h-6 w-6 text-blue-500 mb-1" />
            <span className="text-sm font-medium">Custom Domain</span>
          </div>
          
          <div className="flex flex-col items-center p-3 bg-primary/5 rounded-md">
            <Users className="h-6 w-6 text-purple-500 mb-1" />
            <span className="text-sm font-medium">Client CRM</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col">
        <div className="flex items-center justify-between w-full mb-4">
          <div className="text-lg font-medium">$9.99 <span className="text-sm text-muted-foreground">/month</span></div>
          <div className="text-sm text-muted-foreground">or $99/year (save 18%)</div>
        </div>
        
        <Button className="w-full" onClick={handleUpgradeClick}>
          Upgrade Now <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
        
        <p className="text-xs text-center text-muted-foreground mt-3">
          30-day money-back guarantee. Cancel anytime.
        </p>
      </CardFooter>
    </Card>
  );
};

export default ArtistUpgradeSection;
