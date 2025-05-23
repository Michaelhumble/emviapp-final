
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

const PostSuccessPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const isFreePost = params.get('free') === 'true';
  const paymentLogId = params.get('payment_log_id');

  // Trigger confetti effect when the page loads
  useEffect(() => {
    const triggerConfetti = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    };
    
    triggerConfetti();
    
    // Clean up the confetti instance
    return () => {
      confetti.reset();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Job Posted Successfully | EmviApp</title>
        <meta name="description" content="Your job has been successfully posted on EmviApp." />
      </Helmet>

      <div className="container max-w-2xl py-16">
        <Card className="border-green-100 shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Job Posted Successfully!</CardTitle>
            <CardDescription className="text-base">
              Your job listing is now live on EmviApp
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4 pb-6">
            <p className="text-center text-muted-foreground">
              {isFreePost
                ? "Your free job post has been published. You can view and manage it from your dashboard."
                : "Your payment has been processed and your job post is now published. You can view and manage it from your dashboard."}
            </p>
            
            {paymentLogId && (
              <p className="text-xs text-center text-muted-foreground">
                Reference ID: {paymentLogId}
              </p>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-3">
            <Button asChild size="lg" className="w-full">
              <Link to="/dashboard">
                Go to Dashboard
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link to="/jobs">
                <span>View All Jobs</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default PostSuccessPage;
