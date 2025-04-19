
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";

const CallToAction = () => {
  const { user } = useAuth();

  return (
    <div className="bg-primary/5 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Join the Beauty Industry Platform?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Start your journey today and connect with the best in the beauty industry.
        </p>
        <div className="flex gap-4 justify-center">
          {!user ? (
            <>
              <Link to="/auth/signup">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="lg">
                  View Pricing
                </Button>
              </Link>
            </>
          ) : (
            <Link to="/dashboard">
              <Button size="lg">Go to Dashboard</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
