
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Users, Target, TrendingUp, MapPin, Sparkles } from "lucide-react";
import PremiumVisibilityUpgrade from "@/components/dashboard/salon/PremiumVisibilityUpgrade";

const VisibilityUpgrade = () => {
  const { userProfile } = useAuth();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  
  useEffect(() => {
    document.title = "Premium Visibility | EmviApp";
  }, []);
  
  // Mock data for salon owners
  const localReach = 243;
  const salonName = userProfile?.salon_name || "Your Salon";
  
  const handleUpgradeClick = () => {
    setShowUpgradeModal(true);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-serif mb-2">Premium Visibility</h1>
              <p className="text-gray-600">Boost your salon's visibility to attract more customers</p>
            </div>
            <Button className="mt-4 md:mt-0" onClick={handleUpgradeClick}>
              <Globe className="h-4 w-4 mr-2" />
              Activate Premium
            </Button>
          </div>
          
          {/* Premium Benefits Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Benefits of Premium Visibility</CardTitle>
              <CardDescription>
                Reach more customers and grow your business with premium features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Expanded Customer Reach</h3>
                    <p className="text-sm text-muted-foreground">
                      Show your offers to {localReach * 3}+ potential customers in your area.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Targeted Visibility</h3>
                    <p className="text-sm text-muted-foreground">
                      Reach customers who match your salon's style and services.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Premium Analytics</h3>
                    <p className="text-sm text-muted-foreground">
                      Get detailed insights about customer engagement with your profile.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Area Exclusivity</h3>
                    <p className="text-sm text-muted-foreground">
                      Secure a top position in your geographical area.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-100">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-amber-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-amber-800">Glow Beauty Salon success story</h3>
                    <p className="text-sm text-amber-700 mt-1">
                      "After upgrading to Premium Visibility, our monthly bookings increased by 35%. The customers we attract now are more aligned with our services."
                    </p>
                    <p className="text-sm text-amber-600 mt-2 italic">
                      — Lisa, Owner at Glow Beauty Salon
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Pricing Card */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
              <CardDescription>
                Affordable monthly subscription with no long-term commitment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg">
                <div>
                  <h3 className="text-xl font-bold">$25<span className="text-sm font-normal text-muted-foreground">/month</span></h3>
                  <p className="text-sm text-muted-foreground mt-1">Cancel anytime</p>
                </div>
                <Button className="mt-4 md:mt-0" onClick={handleUpgradeClick}>
                  Start Premium Plan
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mt-6">
                By subscribing, you'll be charged $25 monthly until you cancel. Your visibility benefits will remain active until the end of your current billing period.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <PremiumVisibilityUpgrade 
        localReach={localReach}
        openDialog={showUpgradeModal}
        onOpenChange={setShowUpgradeModal}
        salonName={salonName}
      />
    </Layout>
  );
};

export default VisibilityUpgrade;
