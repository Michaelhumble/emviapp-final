
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useAuth } from '@/context/auth';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { CustomerProfileHeader } from '@/components/customer/CustomerProfileHeader';
import { CustomerFomoInviteBanner } from '@/components/customer/CustomerFomoInviteBanner';
import { CustomerRewardsTracker } from '@/components/customer/CustomerRewardsTracker';
import {
  Home,
  Calendar,
  Heart,
  MessageCircle,
  Search,
  Gift,
  Coins,
  Users,
  HelpCircle,
  LogOut,
  Settings,
  User,
  Briefcase,
  MapPin,
  Star,
  Building,
  Package,
  Camera,
  CreditCard,
  BarChart3,
  PlusCircle,
} from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { userRole, signOut } = useAuth();
  const navigate = useNavigate();

  const handleNavigateAndClose = (path: string) => {
    onClose();
    navigate(path);
  };

  const handleSignOutClick = async () => {
    onClose();
    await signOut();
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[85vh] p-0">
        <DrawerHeader className="pb-0">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-lg font-semibold">Menu</DrawerTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DrawerHeader>

        {userRole === 'customer' && (
          <div className="flex flex-col h-full bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
            <CustomerProfileHeader />
            
            <div className="flex-1 overflow-y-auto">
              <CustomerFomoInviteBanner />
              <CustomerRewardsTracker />
              
              <div className="px-4 space-y-1">
                {[
                  { name: 'Home', icon: Home, to: '/dashboard', badge: '2' },
                  { name: 'Book Now', icon: Calendar, to: '/explore/artists', badge: 'Hot!' },
                  { name: 'Favorites', icon: Heart, to: '/dashboard/favorites', badge: '5' },
                  { name: 'Messages', icon: MessageCircle, to: '/messages', badge: '3' },
                  { name: 'Explore', icon: Search, to: '/explore', badge: 'New' },
                  { name: 'Invite Friends', icon: Gift, to: '/referrals', badge: '2x' },
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigateAndClose(item.to)}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/30 hover:bg-white/80 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 group-hover:from-purple-200 group-hover:to-pink-200 transition-all">
                        <item.icon className="h-5 w-5 text-purple-600" />
                      </div>
                      <span className="font-medium text-gray-800">{item.name}</span>
                    </div>
                    {item.badge && (
                      <div className="bg-gradient-to-r from-red-400 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                        {item.badge}
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="mx-4 mt-4 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <Coins className="h-5 w-5 text-amber-600" />
                  <span className="font-bold text-amber-800">Credit Wallet</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-amber-600">125</span>
                  <button className="text-xs text-amber-600 hover:text-amber-800 font-medium">
                    View History →
                  </button>
                </div>
              </div>

              <div className="px-4 mt-6 space-y-1">
                {[
                  { name: 'Edit Profile', icon: User, to: '/profile/edit' },
                  { name: 'Community', icon: Users, to: '/community' },
                  { name: 'Support & Help', icon: HelpCircle, to: '/support' },
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigateAndClose(item.to)}
                    className="w-full flex items-center gap-3 p-3 text-gray-600 hover:text-purple-600 hover:bg-white/50 rounded-lg transition-all"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-4 border-t border-purple-200/30">
              <div className="text-center mb-4">
                <p className="text-sm text-purple-600 font-medium mb-1">
                  "Your beauty journey starts with self-love! 💖"
                </p>
                <p className="text-xs text-gray-500 italic">
                  Inspired by Sunshine ☀️
                </p>
              </div>
              
              <button
                onClick={handleSignOutClick}
                className="w-full flex items-center justify-center gap-2 p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {userRole === 'artist' && (
          <div className="flex flex-col h-full bg-gradient-to-br from-purple-50 to-indigo-50">
            <div className="p-4 border-b border-purple-200">
              <h2 className="text-lg font-bold text-purple-800">Artist Dashboard</h2>
              <p className="text-sm text-purple-600">Manage your artistic journey</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {[
                { name: 'Dashboard', icon: Home, to: '/dashboard' },
                { name: 'My Bookings', icon: Calendar, to: '/dashboard/bookings' },
                { name: 'Portfolio', icon: Camera, to: '/dashboard/portfolio' },
                { name: 'Messages', icon: MessageCircle, to: '/messages' },
                { name: 'Earnings', icon: CreditCard, to: '/dashboard/earnings' },
                { name: 'Services', icon: Briefcase, to: '/dashboard/services' },
                { name: 'Edit Profile', icon: User, to: '/profile/edit' },
                { name: 'Settings', icon: Settings, to: '/settings' },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigateAndClose(item.to)}
                  className="w-full flex items-center gap-3 p-3 text-gray-700 hover:text-purple-700 hover:bg-purple-100 rounded-lg transition-all"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </div>
            
            <div className="p-4 border-t border-purple-200">
              <button
                onClick={handleSignOutClick}
                className="w-full flex items-center justify-center gap-2 p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {(userRole === 'salon' || userRole === 'owner') && (
          <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="p-4 border-b border-blue-200">
              <h2 className="text-lg font-bold text-blue-800">Salon Management</h2>
              <p className="text-sm text-blue-600">Manage your salon operations</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {[
                { name: 'Dashboard', icon: Home, to: '/dashboard' },
                { name: 'Bookings', icon: Calendar, to: '/dashboard/bookings' },
                { name: 'Team', icon: Users, to: '/dashboard/team' },
                { name: 'Services', icon: Briefcase, to: '/dashboard/services' },
                { name: 'Analytics', icon: BarChart3, to: '/dashboard/analytics' },
                { name: 'Messages', icon: MessageCircle, to: '/messages' },
                { name: 'Post Job', icon: PlusCircle, to: '/jobs/post' },
                { name: 'Edit Profile', icon: User, to: '/profile/edit' },
                { name: 'Settings', icon: Settings, to: '/settings' },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigateAndClose(item.to)}
                  className="w-full flex items-center gap-3 p-3 text-gray-700 hover:text-blue-700 hover:bg-blue-100 rounded-lg transition-all"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </div>
            
            <div className="p-4 border-t border-blue-200">
              <button
                onClick={handleSignOutClick}
                className="w-full flex items-center justify-center gap-2 p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {(userRole === 'supplier' || userRole === 'vendor' || userRole === 'beauty supplier') && (
          <div className="flex flex-col h-full bg-gradient-to-br from-emerald-50 to-teal-50">
            <div className="p-4 border-b border-emerald-200">
              <h2 className="text-lg font-bold text-emerald-800">Supplier Portal</h2>
              <p className="text-sm text-emerald-600">Manage your products & orders</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {[
                { name: 'Dashboard', icon: Home, to: '/dashboard' },
                { name: 'Products', icon: Package, to: '/dashboard/products' },
                { name: 'Orders', icon: Briefcase, to: '/dashboard/orders' },
                { name: 'Inventory', icon: BarChart3, to: '/dashboard/inventory' },
                { name: 'Messages', icon: MessageCircle, to: '/messages' },
                { name: 'Edit Profile', icon: User, to: '/profile/edit' },
                { name: 'Settings', icon: Settings, to: '/settings' },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigateAndClose(item.to)}
                  className="w-full flex items-center gap-3 p-3 text-gray-700 hover:text-emerald-700 hover:bg-emerald-100 rounded-lg transition-all"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </div>
            
            <div className="p-4 border-t border-emerald-200">
              <button
                onClick={handleSignOutClick}
                className="w-full flex items-center justify-center gap-2 p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {userRole === 'freelancer' && (
          <div className="flex flex-col h-full bg-gradient-to-br from-amber-50 to-yellow-50">
            <div className="p-4 border-b border-amber-200">
              <h2 className="text-lg font-bold text-amber-800">Freelancer Hub</h2>
              <p className="text-sm text-amber-600">Manage your freelance business</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {[
                { name: 'Dashboard', icon: Home, to: '/dashboard' },
                { name: 'My Gigs', icon: Briefcase, to: '/dashboard/gigs' },
                { name: 'Bookings', icon: Calendar, to: '/dashboard/bookings' },
                { name: 'Portfolio', icon: Camera, to: '/dashboard/portfolio' },
                { name: 'Earnings', icon: CreditCard, to: '/dashboard/earnings' },
                { name: 'Messages', icon: MessageCircle, to: '/messages' },
                { name: 'Edit Profile', icon: User, to: '/profile/edit' },
                { name: 'Settings', icon: Settings, to: '/settings' },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigateAndClose(item.to)}
                  className="w-full flex items-center gap-3 p-3 text-gray-700 hover:text-amber-700 hover:bg-amber-100 rounded-lg transition-all"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </div>
            
            <div className="p-4 border-t border-amber-200">
              <button
                onClick={handleSignOutClick}
                className="w-full flex items-center justify-center gap-2 p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {!userRole && (
          <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 to-slate-50">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-800">Menu</h2>
              <p className="text-sm text-gray-600">Navigate your account</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {[
                { name: 'Home', icon: Home, to: '/' },
                { name: 'Explore', icon: Search, to: '/explore' },
                { name: 'Edit Profile', icon: User, to: '/profile/edit' },
                { name: 'Settings', icon: Settings, to: '/settings' },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigateAndClose(item.to)}
                  className="w-full flex items-center gap-3 p-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={handleSignOutClick}
                className="w-full flex items-center justify-center gap-2 p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};
