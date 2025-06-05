import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, User, LogOut, Briefcase, Building2, Plus } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { CustomerProfileHeader } from '@/components/customer/CustomerProfileHeader';
import { CustomerFomoInviteBanner } from '@/components/customer/CustomerFomoInviteBanner';
import { CustomerRewardsTracker } from '@/components/customer/CustomerRewardsTracker';

export const MobileMenu = () => {
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleSignOut = () => {
    setIsOpen(false);
    signOut();
  };

  if (!user) return null;

  const userRole = userProfile?.role;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 p-0">
        <div className="flex flex-col h-full">
          {/* Customer Profile Section */}
          {userRole === 'customer' && (
            <div className="flex-1 overflow-y-auto">
              <CustomerProfileHeader />
              <CustomerRewardsTracker />
              <CustomerFomoInviteBanner />
              
              <div className="p-4 space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleNavigation('/profile/edit')}
                >
                  <User className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </div>
          )}

          {/* Artist Menu */}
          {userRole === 'artist' && (
            <div className="flex-1 p-4 space-y-3">
              <div className="pb-4 border-b">
                <h3 className="font-semibold text-lg">Artist Dashboard</h3>
                <p className="text-sm text-gray-600">Welcome back!</p>
              </div>
              
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleNavigation('/dashboard/artist')}
              >
                Dashboard
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleNavigation('/profile/edit')}
              >
                <User className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          )}

          {/* Salon Owner Menu */}
          {(userRole === 'salon_owner' || userRole === 'salon') && (
            <div className="flex-1 p-4 space-y-3">
              <div className="pb-4 border-b">
                <h3 className="font-semibold text-lg">Salon Dashboard</h3>
                <p className="text-sm text-gray-600">Manage your salon</p>
              </div>
              
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleNavigation('/dashboard/salon')}
              >
                Dashboard
              </Button>

              {/* Posting Actions for Salon Owners */}
              <div className="space-y-2">
                <Button
                  variant="default"
                  className="w-full justify-start bg-purple-600 hover:bg-purple-700"
                  onClick={() => handleNavigation('/posting/job')}
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  Post a Job
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start border-purple-200 text-purple-700 hover:bg-purple-50"
                  onClick={() => handleNavigation('/posting/salon')}
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  Post a Salon
                </Button>
              </div>
              
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleNavigation('/profile/edit')}
              >
                <User className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          )}

          {/* Other Roles Menu */}
          {userRole && !['customer', 'artist', 'salon_owner', 'salon'].includes(userRole) && (
            <div className="flex-1 p-4 space-y-3">
              <div className="pb-4 border-b">
                <h3 className="font-semibold text-lg">Dashboard</h3>
                <p className="text-sm text-gray-600">Welcome back!</p>
              </div>
              
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleNavigation('/dashboard')}
              >
                Dashboard
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleNavigation('/profile/edit')}
              >
                <User className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          )}

          {/* Sign Out Button */}
          <div className="p-4 border-t">
            <Button
              variant="outline"
              className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
