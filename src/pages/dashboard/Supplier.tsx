
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, BarChart3, Megaphone, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SupplierDashboard = () => {
  const { user } = useAuth();
  const firstName = user?.email?.split('@')[0] || 'there';
  
  useEffect(() => {
    document.title = "Vendor Dashboard | EmviApp";
  }, []);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      <div className="container px-4 mx-auto py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-serif mb-4">
              Hi {firstName}! Ready to sell smarter? 💅
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every salon needs great tools — make sure they see yours.
            </p>
          </div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <motion.div variants={item}>
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xl">List Your Products</CardTitle>
                  <Package className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">Add your beauty products to our catalog</CardDescription>
                  <Link to="/product-promotions">
                    <Button variant="default" className="w-full">
                      Add Products
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xl">See Seller Insights</CardTitle>
                  <BarChart3 className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">Analytics for your product listings</CardDescription>
                  <Button variant="default" className="w-full">
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xl">Promote with Ads</CardTitle>
                  <Megaphone className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">Boost visibility of your products</CardDescription>
                  <Link to="/supplier-directory">
                    <Button variant="default" className="w-full">
                      Create Promotion
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-medium mb-2">Complete Your Supplier Profile</h3>
                <p className="text-muted-foreground">Help salons and artists discover your business</p>
              </div>
              <Link to="/profile/supplier/setup">
                <Button variant="outline" className="min-w-[140px]">
                  <ShoppingBag className="mr-2 h-4 w-4" /> Update Profile
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default SupplierDashboard;
