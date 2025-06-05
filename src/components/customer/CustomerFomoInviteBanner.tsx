
import React, { useState } from 'react';
import { Copy, Gift, Timer, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';

export const CustomerFomoInviteBanner = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  
  // Generate a referral link based on user ID
  const referralLink = `https://emviapp.com/invite/${user?.id?.substring(0, 8)}`;
  
  // Mock data for demonstration
  const currentRewards = 125;
  const nextReward = 250;
  const progress = (currentRewards / nextReward) * 100;
  const hoursLeft = 18;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success('🎉 Invite link copied! Share with friends!');
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 border border-purple-200/50 rounded-2xl p-4 mx-4 mb-4 backdrop-blur-sm shadow-lg">
      {/* Header with timer */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-pink-500 animate-bounce" />
          <span className="font-bold text-purple-800 text-sm">Double Rewards Event!</span>
        </div>
        <div className="flex items-center gap-1 bg-orange-100 px-2 py-1 rounded-full">
          <Timer className="h-3 w-3 text-orange-600" />
          <span className="text-xs font-medium text-orange-700">{hoursLeft}h left</span>
        </div>
      </div>
      
      {/* Progress Section */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Your Progress</span>
          <span>{currentRewards}/{nextReward} credits</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full"></div>
          </div>
        </div>
        <p className="text-xs text-purple-600 mt-1 font-medium">
          {nextReward - currentRewards} more credits to unlock Premium perks! ✨
        </p>
      </div>
      
      {/* CTA Section */}
      <p className="text-sm text-gray-700 mb-3 leading-relaxed">
        Invite friends & earn <span className="font-bold text-purple-600">2x credits</span> this weekend! 
        Help grow our beauty community 💕
      </p>
      
      <div className="flex items-center gap-2">
        <div className="bg-white/70 border border-gray-200 rounded-lg px-3 py-2 text-xs flex-1 truncate backdrop-blur-sm">
          {referralLink}
        </div>
        <Button 
          size="sm" 
          onClick={handleCopy}
          className={`flex items-center gap-1 transition-all ${
            copied 
              ? 'bg-green-500 hover:bg-green-600 scale-105' 
              : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
          }`}
        >
          {copied ? (
            <>
              <Sparkles className="h-3 w-3" />
              <span className="text-xs">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span className="text-xs">Share</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
