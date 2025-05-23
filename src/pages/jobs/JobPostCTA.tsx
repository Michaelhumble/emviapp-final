
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, DollarSign, UsersRound } from "lucide-react";
import { useAuth } from "@/context/auth";

const JobPostCTA = () => {
  const { isSignedIn, userProfile } = useAuth();
  const referralCount = userProfile?.referral_count || 0;
  const totalJobPosts = 0; // In a real app, this would come from the user's profile
  
  // Calculate the pricing tier
  const getPriceInfo = () => {
    if (totalJobPosts === 0) {
      return {
        price: 5,
        label: "First post special pricing!"
      };
    } else if (totalJobPosts === 1) {
      return {
        price: 10,
        label: "Second post pricing"
      };
    } else {
      return {
        price: referralCount >= 1 ? 15 : 20,
        label: referralCount >= 1 ? "Referral discount applied!" : "Standard pricing"
      };
    }
  };
  
  const priceInfo = getPriceInfo();
  
  return (
    <div className="mb-8">
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <PlusCircle className="mr-2 h-5 w-5 text-purple-600" /> 
                Post a Job Opening
              </h3>
              <p className="text-gray-600 max-w-md">
                Share your job opportunity with thousands of qualified beauty professionals. 
                First-time posts start at just $5!
              </p>
              
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center text-sm text-purple-700">
                  <UsersRound className="h-4 w-4 mr-1" />
                  <span>Reach 15,000+ professionals</span>
                </div>
                <div className="flex items-center text-sm text-green-700">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span>From ${priceInfo.price}/post</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-center mb-3">
                <div className="text-sm text-gray-500">{priceInfo.label}</div>
                <div className="text-2xl font-bold text-purple-700">${priceInfo.price}</div>
              </div>
              
              {isSignedIn ? (
                <Link to="/post-job-billion">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Post a Job
                  </Button>
                </Link>
              ) : (
                <Link to="/auth/signin?redirect=/post-job-billion">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Sign In to Post
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobPostCTA;
