
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/context/auth';
import { useTranslation } from '@/hooks/useTranslation';
import { toast } from 'sonner';
import { 
  Menu, 
  X, 
  Plus, 
  Building, 
  UserPlus, 
  ArrowRight,
  Home,
  Users,
  Briefcase,
  MessageSquare,
  LayoutDashboard,
  Info,
  Mail,
  LogOut,
  Globe
} from 'lucide-react';
import PostYourSalonButton from '@/components/buttons/PostYourSalonButton';
import EmviLogo from '@/components/branding/EmviLogo';
import LanguageToggle from '@/components/layout/LanguageToggle';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    toast.success("You've been signed out successfully");
    setIsOpen(false);
  };

  const handlePostJob = () => {
    if (user) {
      navigate("/post-job");
    } else {
      navigate("/sign-in");
    }
    setIsOpen(false);
  };

  const handleSignUp = () => {
    navigate("/sign-up");
    setIsOpen(false);
  };

  const handleSignIn = () => {
    navigate("/sign-in");
    setIsOpen(false);
  };

  const exploreLinks = [
    { path: '/', title: 'Home', vietnameseTitle: 'Trang chủ', icon: Home },
    { path: '/artists', title: 'Artists', vietnameseTitle: 'Thợ làm móng', icon: Users },
    { path: '/salons', title: 'Salons', vietnameseTitle: 'Tiệm làm móng', icon: Building },
    { path: '/jobs', title: 'Jobs', vietnameseTitle: 'Việc làm', icon: Briefcase },
    { path: '/community', title: 'Community', vietnameseTitle: 'Cộng đồng', icon: MessageSquare },
  ];

  if (user) {
    exploreLinks.push({ path: '/dashboard', title: 'Dashboard', vietnameseTitle: 'Bảng điều khiển', icon: LayoutDashboard });
  }

  const companyLinks = [
    { path: '/about', title: 'About', vietnameseTitle: 'Giới thiệu', icon: Info },
    { path: '/contact', title: 'Contact', vietnameseTitle: 'Liên hệ', icon: Mail },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-80 p-0 bg-white">
        <div className="flex flex-col h-full">
          {/* Header with Logo and Close */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center">
              <EmviLogo size="medium" showText={true} />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Hero Zone */}
            <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-b border-gray-100">
              <div className="space-y-3">
                <Button
                  onClick={handlePostJob}
                  className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-base"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  {t("Post a Job for Free")}
                </Button>
                
                <PostYourSalonButton 
                  variant="outline"
                  className="w-full h-12 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold text-base"
                  onClose={() => setIsOpen(false)}
                />
                
                {!user && (
                  <>
                    <Button
                      onClick={handleSignUp}
                      className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold text-base"
                    >
                      <UserPlus className="h-5 w-5 mr-2" />
                      {t("Sign Up")}
                    </Button>
                    
                    <Button
                      onClick={handleSignIn}
                      variant="outline"
                      className="w-full h-12 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold text-base"
                    >
                      <ArrowRight className="h-5 w-5 mr-2" />
                      {t("Sign In")}
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="p-6 space-y-6">
              {/* Explore Section */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  {t("EXPLORE")}
                </h3>
                <div className="space-y-1">
                  {exploreLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.path;
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center py-3 px-3 rounded-lg transition-colors ${
                          isActive 
                            ? 'bg-purple-50 text-purple-700 font-medium' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                        <span className="text-base">
                          {t({
                            english: link.title,
                            vietnamese: link.vietnameseTitle || link.title
                          })}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Company Section */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  {t("COMPANY")}
                </h3>
                <div className="space-y-1">
                  {companyLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.path;
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center py-3 px-3 rounded-lg transition-colors ${
                          isActive 
                            ? 'bg-purple-50 text-purple-700 font-medium' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                        <span className="text-base">
                          {t({
                            english: link.title,
                            vietnamese: link.vietnameseTitle || link.title
                          })}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Sign Out for authenticated users */}
              {user && (
                <>
                  <div className="border-t border-gray-200 pt-4">
                    <Button
                      onClick={handleSignOut}
                      variant="outline"
                      className="w-full h-12 border-2 border-red-200 text-red-600 hover:bg-red-50 font-medium text-base"
                    >
                      <LogOut className="h-5 w-5 mr-3" />
                      {t("Sign Out")}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 p-6 space-y-4">
            <div className="flex items-center justify-center">
              <div className="flex items-center bg-gray-50 rounded-full px-4 py-2">
                <Globe className="h-4 w-4 mr-2 text-gray-600" />
                <LanguageToggle minimal={true} />
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-500 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent font-medium">
                Inspired by Sunshine ☀️
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
