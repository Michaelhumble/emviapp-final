
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Palette, Crown, Lock, Sparkles } from "lucide-react";

const CustomizeProfileCard: React.FC = () => {
  return (
    <Card className="bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200 relative overflow-hidden">
      <div className="absolute top-2 right-2">
        <Badge className="bg-amber-100 text-amber-700">
          <Crown className="h-3 w-3 mr-1" />
          VIP Coming Soon
        </Badge>
      </div>
      
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-violet-600" />
          Customize Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="relative bg-white/50 rounded-lg p-3 text-center">
              <Lock className="h-4 w-4 text-gray-400 absolute top-2 right-2" />
              <div className="h-8 w-8 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full mx-auto mb-2"></div>
              <div className="text-xs text-gray-600">Cover Photo</div>
            </div>
            
            <div className="relative bg-white/50 rounded-lg p-3 text-center">
              <Lock className="h-4 w-4 text-gray-400 absolute top-2 right-2" />
              <div className="h-8 w-8 bg-gradient-to-r from-blue-300 to-teal-300 rounded-full mx-auto mb-2"></div>
              <div className="text-xs text-gray-600">Theme Color</div>
            </div>
            
            <div className="relative bg-white/50 rounded-lg p-3 text-center">
              <Lock className="h-4 w-4 text-gray-400 absolute top-2 right-2" />
              <div className="h-8 w-8 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full mx-auto mb-2"></div>
              <div className="text-xs text-gray-600">Badge Style</div>
            </div>
            
            <div className="relative bg-white/50 rounded-lg p-3 text-center">
              <Lock className="h-4 w-4 text-gray-400 absolute top-2 right-2" />
              <Sparkles className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-xs text-gray-600">Effects</div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">
              Unlock premium customization options with VIP access!
            </p>
            <Button variant="outline" disabled className="w-full">
              <Crown className="h-4 w-4 mr-2" />
              Join VIP Waitlist
            </Button>
          </div>
          
          <div className="text-xs text-center text-violet-600">
            🚀 VIP members get exclusive themes, effects, and personalization options
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomizeProfileCard;
