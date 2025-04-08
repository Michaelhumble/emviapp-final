
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import StripeCheckout from "@/components/payments/StripeCheckout";
import { motion } from "framer-motion";
import { getPlansForRole } from "@/context/subscription";
import { useSubscription } from '@/context/subscription';
import { SubscriptionPlan } from '@/context/subscription/types';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const Checkout = () => {
  const { user, userRole } = useAuth();
  const { currentPlan, upgradeSubscription } = useSubscription();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [processing, setProcessing] = useState(false);

  // Get role-specific plans
  const plans = getPlansForRole(userRole || undefined);
  
  // Set default selected plan to Pro (or current if exists)
  useEffect(() => {
    const defaultPlan = currentPlan?.id !== 'free' 
      ? currentPlan 
      : plans.find(p => p.recommended) || plans[1];
    
    setSelectedPlan(defaultPlan);
    
    // Check if a specific plan was requested via URL query param
    const params = new URLSearchParams(location.search);
    const planId = params.get('plan');
    if (planId) {
      const plan = plans.find(p => p.id === planId);
      if (plan) {
        setSelectedPlan(plan);
      }
    }
  }, [currentPlan, plans, location.search]);

  // Redirect non-artists/freelancers back to their dashboard
  useEffect(() => {
    if (user && !userRole) {
      navigate('/dashboard/customer');
    }
  }, [user, userRole, navigate]);

  if (!user) {
    // Use navigate for programmatic navigation
    navigate("/auth/signin", { replace: true });
    return null;
  }

  if (!selectedPlan) {
    return null;
  }

  const handleSuccess = async () => {
    setProcessing(true);
    try {
      if (selectedPlan) {
        await upgradeSubscription(selectedPlan);
      }
      setTimeout(() => {
        setProcessing(false);
        navigate("/profile");
      }, 1000);
    } catch (error) {
      setProcessing(false);
      console.error("Subscription error:", error);
    }
  };

  const isPlanSelected = (plan: SubscriptionPlan) => selectedPlan?.id === plan.id;
  const isCurrentPlan = (plan: SubscriptionPlan) => currentPlan?.id === plan.id;

  const planContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const planItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">Choose Your Plan</h1>
            <p className="text-gray-600 mb-2">Select the plan that fits your needs as a {userRole || 'professional'}.</p>
            {currentPlan && currentPlan.id !== 'free' && (
              <div className="inline-flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Currently on {currentPlan.name} Plan
              </div>
            )}
          </motion.div>
          
          <motion.div 
            variants={planContainerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {plans.filter(plan => plan.id !== 'free').map((plan) => (
              <motion.div 
                key={plan.id}
                variants={planItemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card 
                  className={`${
                    isPlanSelected(plan)
                      ? 'border-primary ring-2 ring-primary/20'
                      : ''
                  } ${
                    plan.recommended
                      ? 'relative'
                      : ''
                  } h-full flex flex-col justify-between`}
                >
                  {plan.recommended && (
                    <div className="absolute top-0 right-0 bg-primary text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg">
                      Recommended
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>
                      <span className="text-3xl font-bold">${plan.price}</span>
                      <span className="text-gray-500">/month</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant={isPlanSelected(plan) ? "default" : "outline"}
                      className="w-full"
                      onClick={() => setSelectedPlan(plan)}
                      disabled={isCurrentPlan(plan)}
                    >
                      {isCurrentPlan(plan) ? "Current Plan" : isPlanSelected(plan) ? "Selected" : "Select Plan"}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          {selectedPlan && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 max-w-md mx-auto"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  {isCurrentPlan(selectedPlan) && (
                    <CardDescription className="flex items-center text-amber-600">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      This is your current plan
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>{selectedPlan.name} Plan</span>
                      <span>${selectedPlan.price}/month</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between font-bold">
                      <span>Total</span>
                      <span>${selectedPlan.price}/month</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  {isCurrentPlan(selectedPlan) ? (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate(-1)}
                    >
                      Go Back
                    </Button>
                  ) : (
                    <StripeCheckout
                      amount={selectedPlan.price * 100}
                      productName={`${selectedPlan.name} Plan Subscription`}
                      buttonText={processing ? "Processing..." : `Subscribe to ${selectedPlan.name} Plan`}
                      onSuccess={handleSuccess}
                    />
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
