
import { Plus, Users, Store, Percent } from "lucide-react";
import { Link } from "react-router-dom";
import SalonFeatureCard from "./SalonFeatureCard";
import AffiliateReferralCard from "@/components/dashboard/common/AffiliateReferralCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const SalonFeatureCardsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Post Jobs Card */}
      <SalonFeatureCard
        title="Post Jobs"
        description="Find artists for your salon"
        icon={Plus}
        buttonText="Post a Job"
        buttonLink="/post/job"
      />
      
      {/* Create Promotions Card */}
      <Card className="border-green-200">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Percent className="h-5 w-5 text-green-600" />
            Special Offers
          </CardTitle>
          <CardDescription className="text-green-800">
            Attract new customers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Create special discounts and promotions to bring in new clients.
          </p>
          <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
            <Link to="/offers/create">Create Offer</Link>
          </Button>
        </CardContent>
      </Card>
      
      {/* Affiliate Referral Card */}
      <AffiliateReferralCard />
    </div>
  );
};

export default SalonFeatureCardsGrid;
