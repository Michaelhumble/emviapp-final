
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Heart, Calendar, Sparkles } from "lucide-react";

const CommunityImpactCard: React.FC = () => {
  // Mock data - replace with real data from context/API
  const impactData = {
    friendsInvited: 5,
    artistsHelped: 3,
    bookingsCompleted: 8,
    reviewsLeft: 4
  };

  return (
    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-emerald-600" />
          Community Impact
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-pink-100 rounded-full mx-auto mb-2">
              <Users className="h-6 w-6 text-pink-600" />
            </div>
            <div className="text-xl font-bold text-gray-800">{impactData.friendsInvited}</div>
            <div className="text-sm text-gray-600">Friends Invited</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2">
              <Sparkles className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-xl font-bold text-gray-800">{impactData.artistsHelped}</div>
            <div className="text-sm text-gray-600">Artists Supported</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-xl font-bold text-gray-800">{impactData.bookingsCompleted}</div>
            <div className="text-sm text-gray-600">Bookings Complete</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mx-auto mb-2">
              <Heart className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-xl font-bold text-gray-800">{impactData.reviewsLeft}</div>
            <div className="text-sm text-gray-600">Reviews Left</div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-emerald-700 font-medium">
            🌟 You're making the beauty community stronger!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityImpactCard;
