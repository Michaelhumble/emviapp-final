
import React from "react";
import Logo from "@/components/ui/Logo";
import { Home, Briefcase, Users, Scissors, MessageCircle, Heart } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  // Mock user and credits data
  const user = {
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Beauty Lover",
    email: "customer@email.com",
    credits: 1200,
    nextReward: "65%",
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/30 backdrop-blur">
      <aside className="relative w-[85vw] max-w-[400px] h-full bg-white rounded-l-3xl flex flex-col p-6 shadow-2xl">
        {/* FOMO Banner */}
        <div className="mb-4 w-full rounded-2xl bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 text-yellow-700 text-center px-4 py-3 shadow-sm font-semibold text-sm">
          🏆 Invite friends for <b className="text-yellow-800">DOUBLE</b> rewards! 🚀
        </div>
        
        {/* Logo and Profile */}
        <div className="flex flex-col items-center mb-4">
          <Logo className="w-16 h-16 mb-3" />
          <img src={user.avatar} alt="Avatar" className="w-20 h-20 rounded-full border-3 border-purple-200 mb-3 shadow-lg" />
          <div className="text-xl font-semibold text-gray-800">{user.name}</div>
          <div className="text-sm text-gray-500 mb-3">{user.email}</div>
        </div>
        
        {/* Credits/Rewards */}
        <div className="mb-6 w-full flex flex-col items-center bg-gradient-to-r from-purple-50 via-blue-50 to-purple-50 border border-purple-200 rounded-2xl shadow-lg p-4">
          <span className="text-sm font-semibold text-purple-700 mb-2">
            Credits: <span className="font-bold text-purple-800">{user.credits}</span>
          </span>
          <div className="w-full bg-purple-100 rounded-full h-3 mb-2 shadow-inner">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-400 h-3 rounded-full shadow-sm transition-all duration-300" 
              style={{ width: user.nextReward }}
            ></div>
          </div>
          <span className="text-xs text-purple-500 font-medium">{user.nextReward} to next reward!</span>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-4 w-full">
          <button className="w-full py-4 px-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg font-semibold text-purple-700 border border-purple-100 hover:bg-purple-50 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3">
            <Home className="h-5 w-5" />
            Home
          </button>
          <button className="w-full py-4 px-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg font-semibold text-purple-700 border border-purple-100 hover:bg-purple-50 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3">
            <Briefcase className="h-5 w-5" />
            Jobs
          </button>
          <button className="w-full py-4 px-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg font-semibold text-purple-700 border border-purple-100 hover:bg-purple-50 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3">
            <Scissors className="h-5 w-5" />
            Artists
          </button>
          <button className="w-full py-4 px-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg font-semibold text-purple-700 border border-purple-100 hover:bg-purple-50 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3">
            <Heart className="h-5 w-5" />
            Salons
          </button>
          <button className="w-full py-4 px-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg font-semibold text-purple-700 border border-purple-100 hover:bg-purple-50 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3">
            <Users className="h-5 w-5" />
            Community
          </button>
        </nav>
        
        <button className="mt-6 w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold shadow-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-[1.02]">
          Sign Out
        </button>
      </aside>
      <div className="flex-1" onClick={onClose} />
    </div>
  );
};

export default MobileMenu;
