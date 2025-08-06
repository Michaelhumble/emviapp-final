
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { useSubscription } from "@/context/subscription";
import PremiumFeatureGate from "@/components/upgrade/PremiumFeatureGate";

const CallToAction = () => {
  const { user } = useAuth();
  const { hasActiveSubscription } = useSubscription();

  return (
    <div className="bg-primary/5 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight tracking-tight">
          Ready to Join the Beauty Industry Platform?
        </h2>
        <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed font-primary">
          Start your journey today and connect with the best in the beauty industry.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          {!user ? (
            <>
              <Link to="/auth/signup">
                <Button size="lg">Get Started</Button>
              </Link>
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
