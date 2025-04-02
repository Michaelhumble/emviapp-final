
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Store, BarChart3, Truck } from "lucide-react";
import { motion } from "framer-motion";

const SupplierDashboard = () => {
  const { user } = useAuth();
  const firstName = user?.email?.split('@')[0] || 'there';
  
  useEffect(() => {
    document.title = "Supplier Dashboard | EmviApp";
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
              Hi {firstName}! Let's help you get the most out of EmviApp as a Supplier 💅
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connect with salons, promote your products, and grow your distribution network.
            </p>
          </div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <motion.div variants={item}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xl">Products Catalog</CardTitle>
                  <Package className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">Manage your beauty product listings</CardDescription>
                  <div className="text-center py-8 border border-dashed rounded-md">
                    <p className="text-muted-foreground">Start adding your products</p>
                    <Button variant="secondary" className="mt-2">Create Product Listings</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xl">Salon Directory</CardTitle>
                  <Store className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">Connect with potential business clients</CardDescription>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-md">
                      <p className="font-medium">Luxe Beauty Salon</p>
                      <p className="text-sm text-muted-foreground mb-2">Interested in haircare products</p>
                      <Button size="sm" variant="outline">View Profile</Button>
                    </div>
                    <div className="p-3 border rounded-md">
                      <p className="font-medium">Glamour Studio</p>
                      <p className="text-sm text-muted-foreground mb-2">Looking for nail care supplies</p>
                      <Button size="sm" variant="outline">View Profile</Button>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full">Browse All Salons</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xl">Sales Analytics</CardTitle>
                  <BarChart3 className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">Track your business performance</CardDescription>
                  <div className="space-y-2">
                    <p className="text-sm">• Product popularity insights</p>
                    <p className="text-sm">• Regional sales distribution</p>
                    <p className="text-sm">• Customer acquisition metrics</p>
                    <Button variant="ghost" size="sm" className="mt-2 w-full justify-start">
                      View Sales Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={item}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xl">Order Management</CardTitle>
                  <Truck className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">Track and fulfill your orders</CardDescription>
                  <div className="text-center py-8 border border-dashed rounded-md">
                    <p className="text-muted-foreground">No active orders</p>
                    <Button variant="secondary" className="mt-2">Setup Order System</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default SupplierDashboard;
