import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { Bell, User, LogOut, Menu, X, Settings, HelpCircle, CreditCard, Users, MessageCircle, MoreVertical } from 'lucide-react';
import { 
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import CustomerFomoInviteBanner from '@/components/customer/CustomerFomoInviteBanner';

interface MobileMenuProps {
  onClose?: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onClose }) => {
  const { user, userProfile, userRole, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
      if (onClose) onClose();
      navigate('/');
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error signing out",
        description: "There was a problem signing you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const navigate = useNavigate();

  const handleEditProfile = () => {
    if (typeof onClose === 'function') onClose();
    setTimeout(() => navigate('/profile/edit'), 250); // Change this route if needed
  };

  const menuItems = [
    {
      label: 'Notifications',
      icon: Bell,
      href: '/notifications',
    },
    {
      label: 'Settings',
      icon: Settings,
      href: '/settings',
    },
    {
      label: 'Help & Support',
      icon: HelpCircle,
      href: '/support',
    },
  ];

  const artistMenuItems = [
    {
      label: 'My Clients',
      icon: Users,
      href: '/dashboard/clients',
    },
    {
      label: 'Appointments',
      icon: MessageCircle,
      href: '/dashboard/appointments',
    },
    {
      label: 'Credits',
      icon: CreditCard,
      href: '/dashboard/credits',
    },
  ];

  const salonMenuItems = [
    {
      label: 'Manage Artists',
      icon: Users,
      href: '/dashboard/artists',
    },
    {
      label: 'Bookings',
      icon: MessageCircle,
      href: '/dashboard/bookings',
    },
    {
      label: 'Billing',
      icon: CreditCard,
      href: '/dashboard/billing',
    },
  ];

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[85vh]">
        <DrawerHeader className="text-left">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-lg font-semibold">Menu</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="sm">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        
        <div className="p-4 overflow-y-auto">
          {/* Customer FOMO Invite Banner - Only for customers */}
          {userRole === 'customer' && (
            <CustomerFomoInviteBanner
              referralLink="https://emvi.app/invite/your-code"
              credits={1200}
              progress={65}
            />
          )}

          {user ? (
            <>
              {/* Profile Section */}
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg mb-4">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{userProfile?.full_name || 'User'}</p>
                  <p className="text-xs text-gray-500 capitalize">{userRole || 'Member'}</p>
                </div>
              </div>

              {/* Customer-specific profile actions */}
              {userRole === 'customer' && (
                <div className="mb-4">
                  <button
                    onClick={handleEditProfile}
                    className="w-full py-2 px-4 mt-2 rounded-xl bg-gradient-to-r from-[#9A7B69] to-[#F6F6F7] text-[#1A1A1A] font-bold shadow-lg hover:scale-105 transition"
                  >
                    Edit Profile
                  </button>
                </div>
              )}

              {/* Navigation Items */}
              <div className="space-y-2 mb-4">
                {menuItems.map((item) => (
                  <Link 
                    key={item.label} 
                    to={item.href} 
                    className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    onClick={handleClose}
                  >
                    <item.icon className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* Role-Specific Sections */}
              {(userRole === 'artist' || userRole === 'nail technician/artist') && (
                <div className="space-y-2 mb-4">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">Artist Tools</h4>
                  {artistMenuItems.map((item) => (
                    <Link 
                      key={item.label} 
                      to={item.href} 
                      className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                      onClick={handleClose}
                    >
                      <item.icon className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}

              {(userRole === 'salon' || userRole === 'owner') && (
                <div className="space-y-2 mb-4">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">Salon Management</h4>
                  {salonMenuItems.map((item) => (
                    <Link 
                      key={item.label} 
                      to={item.href} 
                      className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                      onClick={handleClose}
                    >
                      <item.icon className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Sign Out Button */}
              <Button 
                variant="ghost" 
                className="w-full justify-start py-2 px-3 hover:bg-gray-100 rounded-lg"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-2 text-gray-600" />
                Sign Out
              </Button>
            </>
          ) : (
            <div className="space-y-3">
              <Link 
                to="/auth?mode=signin" 
                className="block w-full text-center py-2 px-4 bg-purple-600 text-white rounded-lg font-medium"
                onClick={handleClose}
              >
                Sign In
              </Link>
              <Link 
                to="/auth?mode=signup" 
                className="block w-full text-center py-2 px-4 border border-purple-600 text-purple-600 rounded-lg font-medium"
                onClick={handleClose}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
