
import React from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Share2, Eye, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SalonListingSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Helmet>
        <title>Listing Published Successfully | EmviApp</title>
        <meta 
          name="description" 
          content="Your salon listing has been published successfully on EmviApp."
        />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container max-w-2xl mx-auto py-16 px-4">
          <div className="text-center mb-8">
            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-4">
              🎉 Listing Published Successfully!
            </h1>
            <p className="text-lg text-gray-600">
              Your salon listing is now live and visible to potential buyers
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What happens next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Eye className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Your listing is live</p>
                  <p className="text-sm text-gray-600">
                    Qualified buyers can now view your salon details and contact you
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="font-medium">Buyer inquiries</p>
                  <p className="text-sm text-gray-600">
                    You'll receive email notifications when buyers express interest
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Share2 className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="font-medium">Promoted listing</p>
                  <p className="text-sm text-gray-600">
                    Your listing will be featured to buyers in your area for 60 days
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Button 
              onClick={() => navigate("/dashboard")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Go to Dashboard
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate("/salons")}
            >
              View All Salons
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Need help? Contact our support team at{" "}
              <a href="mailto:support@emviapp.com" className="text-purple-600 hover:underline">
                support@emviapp.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SalonListingSuccessPage;
