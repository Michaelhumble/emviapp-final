
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Store, Building, MapPin } from "lucide-react";

const PostingIndex = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-playfair font-bold mb-3 text-[#1A1A1A]">Post Management</h1>
            <p className="text-[#555555] text-lg font-inter">
              Create job posts, advertise your salon for sale, or list booth rentals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow border-[#9A7B69]/20">
              <CardHeader className="pb-3">
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="font-playfair text-[#1A1A1A]">Job Post</CardTitle>
                <CardDescription className="font-inter text-[#555555]">Create job listings for artists</CardDescription>
              </CardHeader>
              <CardContent className="text-sm font-inter">
                <p className="text-[#555555]">Reach qualified candidates looking for positions in salons.</p>
                <div className="mt-4 text-sm font-medium">
                  <div className="flex justify-between py-1">
                    <span className="text-[#555555]">First post:</span>
                    <span className="text-green-600 font-semibold">FREE</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#555555]">Additional posts:</span>
                    <span className="text-[#1A1A1A]">$20/mo</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#555555]">With referral:</span>
                    <span className="text-[#9A7B69] font-semibold">$5/mo</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-gradient-to-r from-[#9A7B69] to-[#B8956A] hover:from-[#8A6B59] hover:to-[#A8855A] text-white shadow-md hover:shadow-lg transition-all duration-300 font-playfair font-semibold border border-[#8A6B59]/20" 
                  onClick={() => navigate("/posting/job")}
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  Post a Job
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow border-[#9A7B69]/20">
              <CardHeader className="pb-3">
                <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  <Store className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle className="font-playfair text-[#1A1A1A]">Salon For Sale</CardTitle>
                <CardDescription className="font-inter text-[#555555]">List your salon for potential buyers</CardDescription>
              </CardHeader>
              <CardContent className="text-sm font-inter">
                <p className="text-[#555555]">Create a professional listing to attract salon buyers.</p>
                <div className="mt-4 text-sm font-medium">
                  <div className="flex justify-between py-1">
                    <span className="text-[#555555]">Base price:</span>
                    <span className="text-[#1A1A1A]">$20/mo</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#555555]">Nationwide:</span>
                    <span className="text-[#1A1A1A]">+$10/mo</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#555555]">Fast Sale Package:</span>
                    <span className="text-[#9A7B69] font-semibold">$50/mo</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-gradient-to-r from-[#9A7B69] to-[#B8956A] hover:from-[#8A6B59] hover:to-[#A8855A] text-white shadow-md hover:shadow-lg transition-all duration-300 font-playfair font-semibold border border-[#8A6B59]/20" 
                  onClick={() => navigate("/posting/salon")}
                >
                  <Store className="mr-2 h-4 w-4" />
                  List Salon For Sale
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow border-[#9A7B69]/20">
              <CardHeader className="pb-3">
                <div className="bg-gradient-to-br from-green-100 to-green-50 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  <Building className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="font-playfair text-[#1A1A1A]">Booth Rental</CardTitle>
                <CardDescription className="font-inter text-[#555555]">Advertise available booth rentals</CardDescription>
              </CardHeader>
              <CardContent className="text-sm font-inter">
                <p className="text-[#555555]">Find artists to rent available booths in your salon.</p>
                <div className="mt-4 text-sm font-medium">
                  <div className="flex justify-between py-1">
                    <span className="text-[#555555]">Base price:</span>
                    <span className="text-[#1A1A1A]">$15/mo</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#555555]">Nationwide:</span>
                    <span className="text-[#1A1A1A]">+$10/mo</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#555555]">Bundle with job:</span>
                    <span className="text-[#9A7B69] font-semibold">$25 total</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-gradient-to-r from-[#9A7B69] to-[#B8956A] hover:from-[#8A6B59] hover:to-[#A8855A] text-white shadow-md hover:shadow-lg transition-all duration-300 font-playfair font-semibold border border-[#8A6B59]/20" 
                  onClick={() => navigate("/posting/booth")}
                >
                  <Building className="mr-2 h-4 w-4" />
                  Post Booth Rental
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-12 bg-gradient-to-br from-[#F6F6F7] to-blue-50 border border-blue-100 rounded-lg p-6 text-center">
            <h3 className="text-xl font-playfair font-semibold mb-2 text-[#1A1A1A]">Need Help With Your Listing?</h3>
            <p className="text-[#555555] mb-4 font-inter">
              Our team can assist you with crafting the perfect post to attract the right candidates.
            </p>
            <Button variant="outline" className="border-[#9A7B69]/30 text-[#9A7B69] hover:bg-[#9A7B69]/5 font-playfair font-semibold">Contact Support</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PostingIndex;
