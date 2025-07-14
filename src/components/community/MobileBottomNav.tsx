import React from 'react';
import { Plus, Camera, Search, Home, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';

const MobileBottomNav = () => {
  const { user } = useAuth();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-purple-100 lg:hidden">
      <div className="flex items-center justify-around py-2">
        {/* Home */}
        <Button variant="ghost" size="sm" className="flex-col h-auto py-2">
          <Home className="h-5 w-5 mb-1" />
          <span className="text-xs">Home</span>
        </Button>

        {/* Search */}
        <Button variant="ghost" size="sm" className="flex-col h-auto py-2">
          <Search className="h-5 w-5 mb-1" />
          <span className="text-xs">Discover</span>
        </Button>

        {/* Post - Center Button */}
        <Button 
          size="sm" 
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full w-14 h-14 p-0"
        >
          <Plus className="h-6 w-6" />
        </Button>

        {/* Camera */}
        <Button variant="ghost" size="sm" className="flex-col h-auto py-2">
          <Camera className="h-5 w-5 mb-1" />
          <span className="text-xs">Stories</span>
        </Button>

        {/* Profile */}
        <Button variant="ghost" size="sm" className="flex-col h-auto py-2">
          {user ? (
            <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold mb-1">
              {user.email?.charAt(0).toUpperCase()}
            </div>
          ) : (
            <User className="h-5 w-5 mb-1" />
          )}
          <span className="text-xs">Profile</span>
        </Button>
      </div>
    </div>
  );
};

export default MobileBottomNav;