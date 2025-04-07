
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sparkles, Plus, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const SalonCreditStatus = () => {
  // Mock data - in a real app, this would come from an API
  const [credits, setCredits] = useState(35);
  const [isBoosted, setIsBoosted] = useState(true);
  const boostExpiresIn = "5 days";
  
  return (
    <Card className="border-amber-100">
      <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-t-lg">
        <CardTitle className="text-lg flex items-center">
          <Sparkles className="h-5 w-5 text-amber-500 mr-2" />
          Credits & Visibility Boost
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-gray-700 font-medium">Current Balance</p>
            <p className="text-2xl font-bold flex items-center">
              {credits} Credits
              <Award className="h-4 w-4 text-amber-400 ml-1" />
            </p>
          </div>
          <Button className="bg-amber-500 hover:bg-amber-600" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Top Up
          </Button>
        </div>
        
        <div className={isBoosted ? "bg-blue-50 p-3 rounded-lg" : "bg-gray-50 p-3 rounded-lg"}>
          <div className="flex items-center">
            {isBoosted && (
              <div className="relative mr-3">
                <div className="h-4 w-4 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="absolute -inset-1 bg-blue-200 rounded-full opacity-30 animate-ping"></div>
              </div>
            )}
            <div>
              {isBoosted ? (
                <p className="text-blue-700 font-medium">
                  Your profile is boosted! <span className="text-sm font-normal">Expires in {boostExpiresIn}</span>
                </p>
              ) : (
                <p className="text-gray-700">
                  Your profile is not boosted. Use credits to increase visibility!
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <Button variant="outline" size="sm" className="w-full border-amber-200 text-amber-700 hover:bg-amber-50">
            Redeem Credits
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonCreditStatus;
