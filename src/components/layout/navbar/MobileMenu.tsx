import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu, X, Heart, User, MessageCircle, HelpCircle } from "lucide-react";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

const CustomerFomoInviteBanner = ({
  referralLink = "https://emvi.app/invite/your-code", // Replace with your actual referral variable
  credits = 1200, // Replace with your actual credits variable
  progress = 65, // Replace with your actual percent to next reward
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#9A7B69] to-[#F6F6F7] p-4 mb-4 shadow-xl flex flex-col gap-2">
      <div className="font-bold text-lg text-[#1A1A1A] mb-1">
        Invite Friends & Earn Credits
      </div>
      <div className="flex items-center bg-white/70 rounded-lg px-2 py-1 text-xs">
        <span className="truncate">{referralLink}</span>
        <button
          onClick={handleCopy}
          className="ml-2 px-2 py-1 rounded bg-[#9A7B69] text-white font-semibold text-xs hover:bg-[#7c5e48] transition"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="text-indigo-700 font-bold text-sm">
          Credits: <span className="font-extrabold text-lg">{credits}</span>
        </div>
        <div className="text-xs text-gray-500">
          {progress}% to next reward
        </div>
      </div>
      <div className="w-full h-2 bg-indigo-100 rounded mt-1 mb-1 overflow-hidden">
        <div
          className="h-2 rounded bg-gradient-to-r from-indigo-400 to-purple-400 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="text-xs font-medium text-rose-600 mt-1">
        Limited-Time DOUBLE Rewards! Invite now before it's gone.
      </div>
    </div>
  );
};

interface MobileMenuProps {
  onClose?: () => void;
}

const MobileMenu = ({ onClose }: MobileMenuProps) => {
  const { user, userRole, signOut } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      handleClose();
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  const handleEditProfile = () => {
    if (typeof onClose === 'function') onClose();
    navigate("/profile/edit");
  };

  const renderCustomerMenu = () => (
    <div className="space-y-4">
      {/* CUSTOMER FOMO INVITE BANNER - at the very top */}
      <CustomerFomoInviteBanner />
      
      {/* EMOTIONAL CUSTOMER CTAs */}
      <div className="space-y-3">
        <Link 
          to="/artists" 
          onClick={handleClose}
          className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 hover:shadow-md transition"
        >
          <Heart className="h-5 w-5 text-purple-600" />
          <span className="font-semibold text-purple-800">Browse Artists</span>
          <Badge className="ml-auto bg-purple-100 text-purple-700">Find Your Perfect Match!</Badge>
        </Link>
        
        <Link 
          to="/salons" 
          onClick={handleClose}
          className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 hover:shadow-md transition"
        >
          <span className="text-blue-600 font-bold text-lg">💎</span>
          <span className="font-semibold text-blue-800">Browse Salons</span>
          <Badge className="ml-auto bg-blue-100 text-blue-700">Premium Beauty!</Badge>
        </Link>
        
        <Link 
          to="/favorites" 
          onClick={handleClose}
          className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200 hover:shadow-md transition"
        >
          <Heart className="h-5 w-5 text-rose-600" />
          <span className="font-semibold text-rose-800">Favorites</span>
          <Badge className="ml-auto bg-rose-100 text-rose-700">Your Wishlist ❤️</Badge>
        </Link>
        
        <button
          onClick={handleEditProfile}
          className="w-full py-2 px-4 mt-2 rounded-xl bg-gradient-to-r from-[#9A7B69] to-[#F6F6F7] text-[#1A1A1A] font-bold shadow-lg hover:scale-105 transition"
        >
          Edit Profile
        </button>
        
        <Link 
          to="/support" 
          onClick={handleClose}
          className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 hover:shadow-md transition"
        >
          <HelpCircle className="h-5 w-5 text-green-600" />
          <span className="font-semibold text-green-800">Support & Feedback</span>
          <Badge className="ml-auto bg-green-100 text-green-700">We're Here for You!</Badge>
        </Link>
      </div>
    </div>
  );

  const renderArtistMenu = () => (
    <div className="space-y-4">
      <Link 
        to="/dashboard/artist" 
        onClick={handleClose}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
      >
        <span>📊</span>
        <span className="font-medium">Dashboard</span>
      </Link>
      <Link 
        to="/post-job" 
        onClick={handleClose}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
      >
        <span>💼</span>
        <span className="font-medium">Post a Job</span>
      </Link>
      <Link 
        to="/profile/edit" 
        onClick={handleClose}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
      >
        <User className="h-5 w-5" />
        <span className="font-medium">Edit Profile</span>
      </Link>
      <Link 
        to="/messages" 
        onClick={handleClose}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="font-medium">Messages</span>
      </Link>
    </div>
  );

  const renderSalonMenu = () => (
    <div className="space-y-4">
      <Link 
        to="/dashboard/salon" 
        onClick={handleClose}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
      >
        <span>📊</span>
        <span className="font-medium">Dashboard</span>
      </Link>
      <Link 
        to="/post-job" 
        onClick={handleClose}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
      >
        <span>💼</span>
        <span className="font-medium">Post a Job</span>
      </Link>
      <Link 
        to="/post-salon" 
        onClick={handleClose}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
      >
        <span>🏢</span>
        <span className="font-medium">Post a Salon</span>
      </Link>
      <Link 
        to="/profile/edit" 
        onClick={handleClose}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
      >
        <User className="h-5 w-5" />
        <span className="font-medium">Edit Profile</span>
      </Link>
      <Link 
        to="/messages" 
        onClick={handleClose}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="font-medium">Messages</span>
      </Link>
    </div>
  );

  const renderOtherMenu = () => (
    <div className="space-y-4">
      <Link 
        to="/post-job" 
        onClick={handleClose}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
      >
        <span>💼</span>
        <span className="font-medium">Post a Job</span>
      </Link>
      <Link 
        to="/post-salon" 
        onClick={handleClose}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
      >
        <span>🏢</span>
        <span className="font-medium">Post a Salon</span>
      </Link>
      <Link 
        to="/profile/edit" 
        onClick={handleClose}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
      >
        <User className="h-5 w-5" />
        <span className="font-medium">Edit Profile</span>
      </Link>
    </div>
  );

  const renderMenuContent = () => {
    if (!user) {
      return (
        <div className="space-y-4">
          <Link 
            to="/auth/signin" 
            onClick={handleClose}
            className="block w-full text-center py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Sign In
          </Link>
          <Link 
            to="/auth/signup" 
            onClick={handleClose}
            className="block w-full text-center py-3 px-4 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
          >
            Sign Up
          </Link>
        </div>
      );
    }

    switch (userRole) {
      case 'customer':
        return renderCustomerMenu();
      case 'artist':
      case 'nail technician/artist':
        return renderArtistMenu();
      case 'salon':
      case 'owner':
        return renderSalonMenu();
      default:
        return renderOtherMenu();
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="px-4 pb-8">
        <DrawerHeader className="flex items-center justify-between px-0">
          <DrawerTitle>Menu</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-6 w-6" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        
        <div className="space-y-6">
          {renderMenuContent()}
          
          {user && (
            <div className="pt-4 border-t border-gray-200">
              <Button 
                variant="ghost" 
                onClick={handleSignOut}
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
