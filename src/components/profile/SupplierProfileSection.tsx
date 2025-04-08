
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart2, Globe, Grid, ShoppingBag } from "lucide-react";
import { useAuth } from "@/context/auth";
import { Link } from "react-router-dom";
import { getRoleTheme } from "./utils/themeHelpers";

const SupplierProfileSection = () => {
  const { userRole } = useAuth();
  const theme = getRoleTheme(userRole);
  
  // Mock supplier data
  const productCount = 24;
  const profileViews = 156;
  
  return (
    <div className="space-y-6">
      <Card className={`overflow-hidden ${theme.borderColor} shadow-sm hover-scale`}>
        <CardHeader className={`bg-gradient-to-r ${theme.lightBg} pb-2`}>
          <CardTitle className={`font-serif text-xl flex items-center ${theme.textColor}`}>
            <Grid className={`h-5 w-5 ${theme.iconColor} mr-2`} />
            Product Gallery
          </CardTitle>
          <CardDescription>Showcase your beauty products and supplies</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-gray-400" />
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-3">
            <Button asChild className={theme.accentColor}>
              <Link to="/products/manage">Manage Products</Link>
            </Button>
            <Button variant="outline" asChild className={theme.hoverColor}>
              <Link to="/products/add">Add New Product</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className={`${theme.borderColor} shadow-sm hover-scale`}>
          <CardHeader className="pb-2">
            <CardTitle className={`font-serif text-lg flex items-center ${theme.textColor}`}>
              <ShoppingBag className={`h-5 w-5 ${theme.iconColor} mr-2`} />
              Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-2">
              <p className="text-3xl font-bold text-gray-800 mb-1">{productCount}</p>
              <p className="text-gray-500 text-sm">Active products</p>
              <Button variant="outline" size="sm" className={`mt-3 ${theme.hoverColor}`} asChild>
                <Link to="/products/analytics">View Product Performance</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className={`${theme.borderColor} shadow-sm hover-scale`}>
          <CardHeader className="pb-2">
            <CardTitle className={`font-serif text-lg flex items-center ${theme.textColor}`}>
              <BarChart2 className={`h-5 w-5 ${theme.iconColor} mr-2`} />
              Traffic Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-2">
              <p className="text-3xl font-bold text-gray-800 mb-1">{profileViews}</p>
              <p className="text-gray-500 text-sm">Profile views this month</p>
              <Button variant="outline" size="sm" className={`mt-3 ${theme.hoverColor}`} asChild>
                <Link to="/analytics/traffic">View Detailed Analytics</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className={`${theme.borderColor} shadow-sm bg-gradient-to-r ${theme.lightBg}`}>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className={`font-serif text-lg text-gray-800 flex items-center ${theme.textColor}`}>
                <Globe className={`h-5 w-5 ${theme.iconColor} mr-2`} />
                Expand Your Reach
              </h3>
              <p className="text-gray-600 max-w-md">
                Promote your products to salons and beauty professionals nationwide
              </p>
            </div>
            <Button className={theme.accentColor}>
              Promote to Salons Nationwide
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierProfileSection;
