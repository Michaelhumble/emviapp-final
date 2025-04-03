
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import StripeCheckout from "@/components/payments/StripeCheckout";

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 9.99,
    features: [
      "Create a professional profile",
      "Browse salon listings",
      "Apply for jobs",
      "Basic messaging"
    ]
  },
  {
    id: "pro",
    name: "Professional",
    price: 19.99,
    features: [
      "Everything in Basic",
      "Featured profile listing",
      "Priority job applications",
      "Advanced messaging",
      "Client management tools"
    ],
    recommended: true
  },
  {
    id: "premium",
    name: "Premium",
    price: 29.99,
    features: [
      "Everything in Professional",
      "Verified profile badge",
      "Marketing toolkit",
      "Analytics dashboard",
      "Email notifications",
      "Priority support"
    ]
  }
];

const Checkout = () => {
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(plans[1]);

  // Check if user should see pricing plans based on role
  // Only Artist and Freelancer roles should see the pricing plans
  const shouldShowPricingPlans = userRole === 'artist' || userRole === 'freelancer';

  // Redirect users who don't need to see plans to their dashboard
  useEffect(() => {
    if (user && !shouldShowPricingPlans) {
      // Determine which dashboard to redirect to
      let dashboardPath = '/dashboard/customer'; // Default
      
      switch(userRole) {
        case 'salon':
          dashboardPath = '/dashboard/owner';
          break;
        case 'vendor':
          dashboardPath = '/dashboard/supplier';
          break;
        case 'other':
          dashboardPath = '/dashboard/other';
          break;
        case 'customer':
        default:
          dashboardPath = '/dashboard/customer';
          break;
      }
      
      navigate(dashboardPath);
    }
  }, [user, userRole, shouldShowPricingPlans, navigate]);

  // Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to="/auth/signin" replace />;
  }

  // Render nothing while redirecting non-eligible users
  if (!shouldShowPricingPlans) {
    return null;
  }

  const handleSuccess = () => {
    // In a real implementation, this would redirect to a success page
    // or update the user's subscription status
    setTimeout(() => {
      navigate("/profile");
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Choose Your Plan</h1>
          <p className="text-gray-600 mb-8">Select the plan that fits your needs.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`${
                  selectedPlan.id === plan.id
                    ? 'border-primary ring-2 ring-primary/20'
                    : ''
                } ${
                  plan.recommended
                    ? 'relative'
                    : ''
                }`}
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
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <svg className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant={selectedPlan.id === plan.id ? "default" : "outline"}
                    className="w-full"
                    onClick={() => setSelectedPlan(plan)}
                  >
                    {selectedPlan.id === plan.id ? "Selected" : "Select Plan"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
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
                <StripeCheckout
                  amount={selectedPlan.price * 100}
                  productName={`${selectedPlan.name} Plan Subscription`}
                  buttonText={`Subscribe to ${selectedPlan.name} Plan`}
                  onSuccess={handleSuccess}
                />
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
