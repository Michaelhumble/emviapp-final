
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/context/subscription";
import { useNavigate } from "react-router-dom";
import { Crown, CheckCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const SubscriptionManagement = () => {
  const { currentPlan, hasActiveSubscription, cancelSubscription } = useSubscription();
  const navigate = useNavigate();
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  
  if (!currentPlan) return null;
  
  const handleUpgrade = () => {
    navigate("/checkout");
  };
  
  const handleCancelSubscription = async () => {
    await cancelSubscription();
    setCancelDialogOpen(false);
  };
  
  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          {hasActiveSubscription ? (
            <Crown className="h-5 w-5 mr-2 text-primary" />
          ) : (
            <AlertCircle className="h-5 w-5 mr-2 text-gray-400" />
          )}
          Subscription Management
        </CardTitle>
        <CardDescription>
          {hasActiveSubscription 
            ? `You're currently on the ${currentPlan.name} plan`
            : "You're currently on the free plan"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {hasActiveSubscription ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{currentPlan.name} Plan</p>
                <p className="text-sm text-muted-foreground">
                  ${currentPlan.price}/month
                </p>
              </div>
              <div className="flex items-center text-sm text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                Active
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Plan benefits:</p>
              <ul className="space-y-1">
                {currentPlan.features.map((feature, i) => (
                  <li key={i} className="text-sm flex">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {currentPlan.tier !== "premium" && (
              <Alert className="bg-primary/5 border-primary/20">
                <AlertDescription className="text-sm">
                  Upgrade to Premium for additional features and priority support.
                </AlertDescription>
              </Alert>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <Alert variant="destructive" className="bg-destructive/10">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Your access is limited with the free plan
              </AlertDescription>
            </Alert>
            
            <p className="text-sm">
              Subscribe to a paid plan to unlock all features and get the most out of EmviApp.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button 
          onClick={handleUpgrade}
          className="w-full" 
          variant={hasActiveSubscription ? "outline" : "default"}
        >
          {hasActiveSubscription 
            ? currentPlan.tier !== "premium" 
              ? "Upgrade to Premium" 
              : "Change Plan"
            : "Subscribe Now"
          }
        </Button>
        
        {hasActiveSubscription && (
          <Button
            variant="ghost"
            className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => setCancelDialogOpen(true)}
          >
            Cancel Subscription
          </Button>
        )}
      </CardFooter>
      
      {/* Cancellation Confirmation Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Subscription?</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your {currentPlan?.name} subscription? You'll lose access to premium features.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Alert variant="destructive" className="bg-destructive/10">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Your access will continue until the end of the current billing period.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              Keep Subscription
            </Button>
            <Button variant="destructive" onClick={handleCancelSubscription}>
              Cancel Subscription
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default SubscriptionManagement;
