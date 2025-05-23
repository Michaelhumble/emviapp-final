
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, ArrowRight } from "lucide-react";

const PostWaitlistPage = () => {
  return (
    <>
      <Helmet>
        <title>Diamond Tier Request | EmviApp</title>
        <meta name="description" content="Your Diamond tier request has been received by EmviApp." />
      </Helmet>

      <div className="container max-w-2xl py-16">
        <Card className="border-blue-100 shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center">
              <ClipboardCheck className="h-10 w-10 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Diamond Tier Request Received</CardTitle>
            <CardDescription className="text-base">
              Thank you for your interest in our Diamond tier
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4 pb-6">
            <p className="text-center text-muted-foreground">
              The Diamond tier requires special approval. Our team has received your request and will contact you shortly to discuss your needs and provide personalized service.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-md">
              <p className="text-sm text-center">
                Please check your email for further instructions or contact our support team if you have any questions.
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-3">
            <Button asChild size="lg" className="w-full">
              <Link to="/dashboard">
                Go to Dashboard
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link to="/contact">
                <span>Contact Support</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default PostWaitlistPage;
