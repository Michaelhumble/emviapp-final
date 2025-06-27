
import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { useSubscription } from "@/context/subscription";
import { useAuthModal } from "@/context/auth/AuthModalProvider";
import { Link } from "react-router-dom";

const CallToAction = () => {
  const { user } = useAuth();
  const { hasActiveSubscription } = useSubscription();
  const { openModal } = useAuthModal();

  return (
    <div className="bg-primary/5 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Join the Beauty Industry Platform?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Start your journey today and connect with the best in the beauty industry.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          {!user ? (
            <>
              <Button 
                size="lg" 
                onClick={() => openModal('signup')}
              >
                Get Started
              </Button>
              <Link to="/salons">
                <Button size="lg" variant="outline">Browse Services</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard">
                <Button size="lg">Go to Dashboard</Button>
              </Link>
              
              {!hasActiveSubscription && (
                <Link to="/pricing">
                  <Button size="lg" variant="outline">View Premium Features</Button>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
