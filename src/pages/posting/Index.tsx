
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Store, ChairOffice } from "lucide-react";

const PostingIndex = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold mb-3">Post Management</h1>
            <p className="text-gray-600 text-lg">
              Create job posts, advertise your salon for sale, or list booth rentals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Job Post</CardTitle>
                <CardDescription>Create job listings for artists</CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <p>Reach qualified candidates looking for positions in salons.</p>
                <div className="mt-4 text-sm font-medium">
                  <div className="flex justify-between py-1">
                    <span>First post:</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Additional posts:</span>
                    <span>$20/mo</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>With referral:</span>
                    <span>$5/mo</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => navigate("/posting/job")}
                >
                  Post a Job
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  <Store className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle>Salon For Sale</CardTitle>
                <CardDescription>List your salon for potential buyers</CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <p>Create a professional listing to attract salon buyers.</p>
                <div className="mt-4 text-sm font-medium">
                  <div className="flex justify-between py-1">
                    <span>Base price:</span>
                    <span>$20/mo</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Nationwide:</span>
                    <span>+$10/mo</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Fast Sale Package:</span>
                    <span>$50/mo</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => navigate("/posting/salon")}
                >
                  List Salon For Sale
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  <ChairOffice className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Booth Rental</CardTitle>
                <CardDescription>Advertise available booth rentals</CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <p>Find artists to rent available booths in your salon.</p>
                <div className="mt-4 text-sm font-medium">
                  <div className="flex justify-between py-1">
                    <span>Base price:</span>
                    <span>$15/mo</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Nationwide:</span>
                    <span>+$10/mo</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Bundle with job:</span>
                    <span>$25 total</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => navigate("/posting/booth")}
                >
                  Post Booth Rental
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-12 bg-blue-50 border border-blue-100 rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Need Help With Your Listing?</h3>
            <p className="text-gray-600 mb-4">
              Our team can assist you with crafting the perfect post to attract the right candidates.
            </p>
            <Button variant="outline">Contact Support</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PostingIndex;
