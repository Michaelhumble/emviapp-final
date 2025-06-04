
import React from "react";
import { useAuth } from "@/context/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { User, Coins } from "lucide-react";

const CustomerProfileSummary = () => {
  const { userProfile } = useAuth();
  
  // Mock data for demo - would be real in production
  const credits = userProfile?.credits || 145;
  const bookingsThisMonth = 3;
  const bookingGoal = 5;
  const progressPercentage = (bookingsThisMonth / bookingGoal) * 100;

  return (
    <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50">
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={userProfile?.avatar_url} />
          <AvatarFallback>
            <User className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">
              {userProfile?.full_name || 'Beauty Lover'}
            </span>
            <Badge variant="secondary" className="text-xs">VIP</Badge>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Coins className="h-3 w-3" />
            <span>{credits} credits</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-600">
          <span>Beauty Goals Progress</span>
          <span>{bookingsThisMonth}/{bookingGoal} appointments</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>
    </div>
  );
};

export default CustomerProfileSummary;
