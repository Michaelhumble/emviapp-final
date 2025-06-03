
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Users, Gift, UserPlus } from "lucide-react";
import { toast } from "sonner";

const StickyInviteTracker: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [invitesSent, setInvitesSent] = useState(2);
  const [friendsJoined, setFriendsJoined] = useState(1);
  const [creditsEarned, setCreditsEarned] = useState(50);
  const lastScrollY = useRef(0);
  const hideTimeoutRef = useRef<NodeJS.Timeout>();
  
  // Auto-hide on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If scrolling down more than 10px, hide the widget
      if (currentScrollY > lastScrollY.current + 10 && isVisible && !isMinimized) {
        setIsMinimized(true);
        
        // Clear any existing timeout
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }
        
        // Show again after 3 seconds of no scrolling
        hideTimeoutRef.current = setTimeout(() => {
          setIsMinimized(false);
        }, 3000);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [isVisible, isMinimized]);

  const handleInviteFriend = () => {
    const newInvitesSent = invitesSent + 1;
    const newCredits = creditsEarned + 25;
    
    setInvitesSent(newInvitesSent);
    setCreditsEarned(newCredits);
    
    toast.success("Invite sent! +25 credits earned! 🎉");
    
    // Show widget if hidden due to new activity
    setIsMinimized(false);
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleReopen = () => {
    setIsVisible(true);
    setIsMinimized(false);
  };

  // Mini floating button when minimized or hidden
  if (!isVisible || isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={handleReopen}
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
          size="sm"
        >
          <Users className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  const progress = Math.min((friendsJoined / 5) * 100, 100);
  const nextMilestone = friendsJoined >= 5 ? 10 : 5;
  const creditsToEarn = friendsJoined >= 5 ? 200 : 100;

  return (
    <div className="fixed top-20 right-4 z-40 w-80 animate-slide-in-right">
      <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-pink-600" />
              Invite Progress
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0 hover:bg-pink-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Progress to {nextMilestone} friends</span>
              <span className="font-semibold text-purple-600">{friendsJoined}/{nextMilestone}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center bg-white/60 rounded-lg p-3">
              <div className="text-2xl font-bold text-pink-600">{invitesSent}</div>
              <div className="text-xs text-gray-600">Invites Sent</div>
            </div>
            <div className="text-center bg-white/60 rounded-lg p-3">
              <div className="text-2xl font-bold text-purple-600">{creditsEarned}</div>
              <div className="text-xs text-gray-600">Credits Earned</div>
            </div>
          </div>

          {/* Next Reward */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Gift className="h-4 w-4 text-amber-600" />
              <span className="font-medium text-amber-700">Next Reward</span>
            </div>
            <div className="text-sm text-amber-600">
              Invite {nextMilestone - friendsJoined} more friends for +{creditsToEarn} credits!
            </div>
          </div>

          {/* Action Button */}
          <Button 
            onClick={handleInviteFriend}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Invite a Friend (+25 Credits)
          </Button>

          <div className="text-center">
            <Badge className="bg-green-100 text-green-700">
              Free rewards • No payment required
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StickyInviteTracker;
