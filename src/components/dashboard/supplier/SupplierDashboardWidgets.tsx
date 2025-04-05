
import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Package, Store, ShoppingBag, TrendingUp, Globe, Tag, Megaphone, BarChart, Truck } from "lucide-react";
import AffiliateReferralCard from "@/components/dashboard/common/AffiliateReferralCard";
import { Progress } from "@/components/ui/progress";

const SupplierDashboardWidgets = () => {
  const { userProfile } = useAuth();
  
  // Mock statistics - would be fetched from backend in a real implementation
  const profileViews = 42;
  const potentialReach = 189;
  const isPremium = false;
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif">Supplier Dashboard</h2>
      
      {/* Promotion Banner */}
      <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-100">
        <CardContent className="py-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Megaphone className="h-6 w-6 text-emerald-500" />
                <h3 className="text-lg font-medium text-emerald-800">Boost Your Product Sales!</h3>
              </div>
              <p className="text-emerald-700 text-sm">
                Suppliers who create product promotions see an average 47% increase in salon interest. 
                Feature your best products today!
              </p>
            </div>
            <div className="flex items-end">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white" asChild>
                <Link to="/promotions/create">Create Promotion</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Visibility Stats Card */}
      <Card className="bg-white border">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            Product Visibility
          </CardTitle>
          <CardDescription>How your products are performing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Profile Views</span>
                <span className="text-sm font-medium">{profileViews}</span>
              </div>
              <Progress value={profileViews > 100 ? 100 : profileViews} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Salon Reach</span>
                <span className="text-sm font-medium">{potentialReach}</span>
              </div>
              <Progress value={potentialReach > 300 ? 100 : (potentialReach / 3)} className="h-2" />
            </div>
            
            {!isPremium && (
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-3 rounded-lg mt-2 border border-emerald-100">
                <div className="flex items-start gap-2">
                  <Globe className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-emerald-800">
                      Expand Your Product Reach
                    </p>
                    <p className="text-xs text-emerald-700 mt-1">
                      Your products could be shown to {potentialReach * 4}+ salons with a Premium Supplier account.
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="mt-2 bg-white border-emerald-200 text-emerald-800 hover:bg-emerald-50 w-full" asChild>
                  <Link to="/supplier/upgrade">
                    <Tag className="h-4 w-4 mr-1 text-emerald-500" /> 
                    Upgrade to Premium — $35/mo
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Product Listings Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Package className="h-5 w-5 text-emerald-500" />
              Products
            </CardTitle>
            <CardDescription>Manage your product listings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Add, edit or update your supply products and inventory.
            </p>
            <Button className="w-full" asChild>
              <Link to="/supplier/products">Manage Products</Link>
            </Button>
          </CardContent>
        </Card>
        
        {/* Create Promotion Card */}
        <Card className="border-emerald-200">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Tag className="h-5 w-5 text-emerald-600" />
              New Promotion
            </CardTitle>
            <CardDescription className="text-emerald-800">
              Reach more salons!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Create special product promotions or wholesale discounts for salons.
            </p>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700" asChild>
              <Link to="/promotions/create">Create Promotion</Link>
            </Button>
          </CardContent>
        </Card>
        
        {/* Affiliate Referral Card */}
        <AffiliateReferralCard />
      </div>
      
      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Salon Connections Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Store className="h-5 w-5 text-emerald-500" />
              Salon Connections
            </CardTitle>
            <CardDescription>Build your network</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Connect with salons interested in your products and build relationships.
            </p>
            <Button className="w-full" asChild>
              <Link to="/supplier/connections">View Connections</Link>
            </Button>
          </CardContent>
        </Card>
        
        {/* Analytics Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart className="h-5 w-5 text-emerald-500" />
              Sales Analytics
            </CardTitle>
            <CardDescription>
              Track your product performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              View detailed analytics on your product performance and sales trends.
            </p>
            <Button className="w-full" asChild>
              <Link to="/supplier/analytics">View Analytics</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupplierDashboardWidgets;
