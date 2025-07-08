
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, UsersRound } from "lucide-react";
import { useAuth } from "@/context/auth";

const JobPostCTA = () => {
  const { isSignedIn } = useAuth();
  
  return (
    <div className="mb-8">
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="font-playfair text-xl font-bold mb-2 flex items-center text-gray-900">
                <PlusCircle className="mr-2 h-5 w-5 text-[#8B5CF6]" /> 
                Post a Job Opening
              </h3>
              <p className="text-gray-600 max-w-md font-inter">
                Share your job opportunity with thousands of qualified beauty professionals.
              </p>
              
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center text-sm text-[#8B5CF6] font-inter font-medium">
                  <UsersRound className="h-4 w-4 mr-1" />
                  <span>Reach 15,000+ professionals</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              {isSignedIn ? (
                <Link to="/post-job">
                  <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-inter font-semibold rounded-xl px-6 py-3">
                    Post a Job
                  </Button>
                </Link>
              ) : (
                <Link to="/auth/signin?redirect=/post-job">
                  <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-inter font-semibold rounded-xl px-6 py-3">
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
