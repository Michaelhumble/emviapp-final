
import React from 'react';
import { Crown, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/auth';

export const CustomerProfileHeader = () => {
  const { user, userProfile } = useAuth();
  
  // Mock data for demonstration
  const credits = 125;
  const tier = 'Silver';
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'Gold':
      case 'Platinum':
        return <Crown className="h-4 w-4 text-yellow-500" />;
      default:
        return <Sparkles className="h-4 w-4 text-purple-500" />;
    }
  };
  
  return (
    <div className="sticky top-0 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 border-b border-purple-200/30 p-4 backdrop-blur-md shadow-sm">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative">
          <Avatar className="h-14 w-14 ring-2 ring-purple-200 shadow-lg">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
            <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white font-bold">
              {userProfile?.full_name ? getInitials(userProfile.full_name) : 'ME'}
            </AvatarFallback>
          </Avatar>
          
          {/* Tier badge on avatar */}
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-lg">
            {getTierIcon(tier)}
          </div>
        </div>
        
        {/* User info */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-gray-800 text-lg">
              {userProfile?.full_name?.split(' ')[0] || 'Beauty Lover'}
            </h2>
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-2 py-0.5 rounded-full">
              <span className="text-xs font-medium text-purple-700">{tier}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mt-1">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">{credits} credits</span>
            </div>
            <div className="text-xs text-gray-500">•</div>
            <div className="text-xs text-green-600 font-medium">Active today ✨</div>
          </div>
        </div>
      </div>
    </div>
  );
};
