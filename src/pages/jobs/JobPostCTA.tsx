
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Sparkles } from "lucide-react";
import { useAuth } from "@/context/auth";

const JobPostCTA = () => {
  const { isSignedIn } = useAuth();
  
  return (
    <div className="mb-8">
      <Card className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 border-purple-100 overflow-hidden shadow-lg">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <Heart className="text-red-500 mr-2 h-6 w-6" />
                <Sparkles className="text-yellow-500 mr-2 h-6 w-6" />
                <Users className="text-blue-500 h-6 w-6" />
              </div>
              
              <h3 className="font-playfair text-2xl md:text-3xl font-bold mb-3 text-gray-900">
                Find Your Perfect Team Member
              </h3>
              
              <p className="text-gray-600 max-w-md font-inter text-lg leading-relaxed">
                Connect with passionate beauty professionals who share your vision. 
                Build meaningful relationships that grow your business and create lasting success together.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                <div className="flex items-center text-sm text-purple-600 font-inter font-medium">
                  <Users className="h-4 w-4 mr-2" />
                  <span>Reach 15,000+ qualified professionals</span>
                </div>
                <div className="flex items-center text-sm text-green-700 font-inter font-medium">
                  <Sparkles className="h-4 w-4 mr-2" />
                  <span>Trusted by successful salon owners</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-center mb-4">
                <div className="text-sm text-gray-500 font-inter mb-1">Start building your team</div>
                <div className="text-2xl font-bold text-purple-600 font-playfair">Today</div>
              </div>
              
              {isSignedIn ? (
                <Link to="/post-job-free">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-inter font-semibold rounded-xl px-8 py-4 text-lg shadow-lg transform hover:scale-105 transition-all">
                    Post Your Opportunity
                  </Button>
                </Link>
              ) : (
                <Link to="/auth/signin?redirect=/post-job-free">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-inter font-semibold rounded-xl px-8 py-4 text-lg shadow-lg transform hover:scale-105 transition-all">
                    Get Started
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
