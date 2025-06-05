
import React from 'react';
import { Coins, Star, TrendingUp } from 'lucide-react';

export const CustomerRewardsTracker = () => {
  // Mock data for demonstration
  const credits = 125;
  const tier = 'Silver';
  const nextTierCredits = 250;
  const progress = (credits / nextTierCredits) * 100;
  
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Bronze': return 'from-amber-400 to-orange-500';
      case 'Silver': return 'from-gray-400 to-slate-500';
      case 'Gold': return 'from-yellow-400 to-amber-500';
      case 'Platinum': return 'from-purple-400 to-indigo-500';
      default: return 'from-gray-400 to-slate-500';
    }
  };
  
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200/50 rounded-2xl p-4 mx-4 mb-4 backdrop-blur-sm shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="bg-white/70 p-2 rounded-full backdrop-blur-sm">
            <Coins className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-sm">Your Rewards</h3>
            <p className="text-xs text-gray-600">Keep collecting! 🎯</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-indigo-600">{credits}</div>
          <div className="text-xs text-gray-500">credits</div>
        </div>
      </div>
      
      {/* Tier Badge */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`bg-gradient-to-r ${getTierColor(tier)} p-1 rounded-lg shadow-sm`}>
            <Star className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">{tier} Member</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-green-600">
          <TrendingUp className="h-3 w-3" />
          <span>+15 this week</span>
        </div>
      </div>
      
      {/* Progress to next tier */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-600">
          <span>Progress to Gold</span>
          <span>{credits}/{nextTierCredits}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full"></div>
          </div>
        </div>
        <p className="text-xs text-indigo-600 font-medium">
          {nextTierCredits - credits} credits to Gold tier! 🏆
        </p>
      </div>
    </div>
  );
};
