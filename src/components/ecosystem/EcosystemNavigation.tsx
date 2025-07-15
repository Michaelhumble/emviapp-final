import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Scissors, 
  Store, 
  Briefcase, 
  Users, 
  Crown,
  MessageSquare,
  Star,
  TrendingUp,
  Calendar,
  Award,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const EcosystemNavigation = () => {
  const { user, userRole } = useAuth();
  const location = useLocation();

  // Smart navigation based on user role and current context
  const getSmartNavItems = () => {
    const baseItems = [
      { icon: Home, path: '/community', label: 'Community', priority: 1 },
      { icon: Briefcase, path: '/jobs', label: 'Jobs', priority: 2 },
      { icon: Store, path: '/salons', label: 'Salons', priority: 3 },
      { icon: Scissors, path: '/artists', label: 'Artists', priority: 4 }
    ];

    if (!user) return baseItems;

    // Role-specific high-priority items
    const roleItems = {
      customer: [
        { icon: Calendar, path: '/my-bookings', label: 'My Bookings', priority: 0.5 },
        { icon: Star, path: '/profile', label: 'My Profile', priority: 5 }
      ],
      artist: [
        { icon: TrendingUp, path: '/dashboard/artist', label: 'Dashboard', priority: 0.5 },
        { icon: Calendar, path: '/dashboard/artist/booking-calendar', label: 'Calendar', priority: 1.5 },
        { icon: Star, path: '/profile', label: 'Portfolio', priority: 5 }
      ],
      owner: [
        { icon: TrendingUp, path: '/dashboard/owner', label: 'Dashboard', priority: 0.5 },
        { icon: Users, path: '/dashboard/owner/team', label: 'Team', priority: 1.5 },
        { icon: Award, path: '/dashboard/owner/analytics', label: 'Analytics', priority: 2.5 }
      ],
      manager: [
        { icon: TrendingUp, path: '/dashboard/manager', label: 'Dashboard', priority: 0.5 },
        { icon: Users, path: '/dashboard/manager/staff', label: 'Staff', priority: 1.5 }
      ]
    };

    const userItems = roleItems[userRole as keyof typeof roleItems] || [];
    return [...userItems, ...baseItems].sort((a, b) => a.priority - b.priority);
  };

  const navItems = getSmartNavItems();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex items-center space-x-1">
      {navItems.slice(0, 5).map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            isActive(item.path)
              ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 shadow-sm"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          )}
        >
          <item.icon className="h-4 w-4" />
          <span className="hidden md:block">{item.label}</span>
        </Link>
      ))}
      
      {/* VIP Upgrade CTA - Always visible */}
      {user && (
        <Link to="/pricing">
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-lg"
          >
            <Crown className="h-4 w-4 mr-1" />
            <span className="hidden md:block">VIP</span>
          </Button>
        </Link>
      )}
    </div>
  );
};

export default EcosystemNavigation;