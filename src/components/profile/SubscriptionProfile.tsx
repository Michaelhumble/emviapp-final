
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubscriptionManagement, AffiliateSection } from "@/components/subscription";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSubscription } from "@/context/subscription";
import { useAuth } from "@/context/auth";
import { PlanFeatureList } from "@/components/subscription";
import { Crown, Star, Gift } from "lucide-react";
import { getPlansForRole } from "@/context/subscription";

const SubscriptionProfile = () => {
  const { currentPlan, hasActiveSubscription } = useSubscription();
  const { userRole } = useAuth();
  
  // Get all plans for this role
  const allPlans = getPlansForRole(userRole || undefined);
  
  // Find current and premium plans
  const freePlan = allPlans.find(p => p.id === 'free') || allPlans[0];
  const premiumPlan = allPlans.find(p => p.id === 'premium') || allPlans[3];
  
  // Current features are from the current plan
  const currentFeatures = currentPlan?.features || freePlan.features;
  
  // Premium features are those in premium plan but not in current plan
  const premiumFeatures = hasActiveSubscription && currentPlan?.tier !== 'premium'
    ? premiumPlan.features.filter(f => !currentFeatures.includes(f))
    : premiumPlan.features;
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Subscriptions & Benefits</h2>
      
      <Tabs defaultValue="subscription" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="subscription" className="flex items-center justify-center">
            <Crown className="h-4 w-4 mr-2" />
            <span>Subscription</span>
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center justify-center">
            <Star className="h-4 w-4 mr-2" />
            <span>Features</span>
          </TabsTrigger>
          <TabsTrigger value="affiliate" className="flex items-center justify-center">
            <Gift className="h-4 w-4 mr-2" />
            <span>Affiliate</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="subscription" className="space-y-4">
          <SubscriptionManagement />
        </TabsContent>
        
        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Plan Benefits</CardTitle>
              <CardDescription>
                {hasActiveSubscription 
                  ? "Features available with your current subscription" 
                  : "Upgrade to access premium features"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PlanFeatureList 
                features={currentFeatures} 
                premiumFeatures={premiumFeatures} 
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="affiliate" className="space-y-4">
          <AffiliateSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubscriptionProfile;
