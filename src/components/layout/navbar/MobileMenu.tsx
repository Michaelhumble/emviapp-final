
import React from "react";
import { Link } from "react-router-dom";
import { User, Star, Gift, LogOut, Heart, Home, Users, Scissors, Store, Briefcase, MessageCircle, HelpCircle } from "lucide-react";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { user, userProfile, signOut } = useAuth();

  if (!isOpen) return null;

  // FORCE CUSTOMER MENU FOR ALL USERS (TEST ONLY)
  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/30 backdrop-blur">
      <aside className="relative w-[85vw] max-w-[400px] h-full bg-white rounded-l-3xl flex flex-col overflow-y-auto shadow-2xl border-l-8 border-[#9A7B69]">
        {/* Sticky Profile Header */}
        <div className="sticky top-0 bg-gradient-to-br from-[#F6F6F7] to-[#fff] p-6 pb-3 flex flex-col items-center border-b border-[#ececec] z-10">
          <div className="w-16 h-16 rounded-full bg-[#eee] flex items-center justify-center shadow">
            <User className="w-10 h-10 text-[#9A7B69]" />
          </div>
          <div className="mt-2 font-semibold text-xl text-[#1A1A1A]">{userProfile?.full_name || "Beauty Lover"}</div>
          <div className="text-xs text-[#8A898C]">{user?.email || userProfile?.email}</div>
          <div className="mt-1 flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="font-bold text-[#9A7B69]">{userProfile?.credits || "0"}</span>
            <span className="text-xs text-[#555]">credits</span>
            <Gift className="w-4 h-4 text-[#9A7B69]" />
            <span className="font-medium text-[#555]">Tier:</span>
            <span className="font-bold text-[#9A7B69]">Bronze</span>
          </div>
        </div>

        {/* FOMO Referral Banner */}
        <div className="mx-4 my-4 bg-gradient-to-br from-[#f8e4ce] to-[#fff] rounded-xl p-3 shadow flex flex-col items-center border-2 border-[#9A7B69] animate-pulse">
          <div className="font-semibold text-[#9A7B69]">🎉 Limited-Time Double Rewards!</div>
          <div className="text-xs text-[#8A898C] mb-1 text-center">Invite friends now and earn bonus credits before this reward boost ends!</div>
          <Button
            className="w-full mt-2 bg-[#9A7B69] text-white font-semibold shadow hover:bg-[#bf9d8b]"
            onClick={() => {
              navigator.clipboard.writeText(`${window.location.origin}/invite/${userProfile?.referral_code || "my-ref"}`);
            }}
          >
            Invite Friends, Earn Free Rewards!
          </Button>
          <div className="mt-2 w-full h-2 bg-[#ececec] rounded overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#9A7B69] to-[#F6F6F7] transition-all"
              style={{ width: `${Math.min(100, (userProfile?.credits || 0) % 100)}%` }}
            ></div>
          </div>
          <div className="text-xs text-[#9A7B69] mt-1 text-center">
            {100 - ((userProfile?.credits || 0) % 100)} more credits to next tier!
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-1 px-4">
          <Link to="/dashboard/customer" className="rounded-xl px-3 py-3 flex items-center gap-3 font-semibold text-[#9A7B69] hover:bg-[#f9ede7]" onClick={onClose}>
            <Home className="w-5 h-5" /> Dashboard
          </Link>
          <Link to="/" className="rounded-xl px-3 py-3 flex items-center gap-3 font-medium text-[#1A1A1A] hover:bg-[#f5f5f5]" onClick={onClose}>
            <Home className="w-5 h-5" /> Home
          </Link>
          <Link to="/artists" className="rounded-xl px-3 py-3 flex items-center gap-3 font-medium text-[#1A1A1A] hover:bg-[#f5f5f5]" onClick={onClose}>
            <Users className="w-5 h-5" /> Browse Artists
          </Link>
          <Link to="/salons" className="rounded-xl px-3 py-3 flex items-center gap-3 font-medium text-[#1A1A1A] hover:bg-[#f5f5f5]" onClick={onClose}>
            <Scissors className="w-5 h-5" /> Browse Salons
          </Link>
          <Link to="/jobs" className="rounded-xl px-3 py-3 flex items-center gap-3 font-medium text-[#1A1A1A] hover:bg-[#f5f5f5]" onClick={onClose}>
            <Briefcase className="w-5 h-5" /> Jobs
          </Link>
          <Link to="/messages" className="rounded-xl px-3 py-3 flex items-center gap-3 font-medium text-[#1A1A1A] hover:bg-[#f5f5f5]" onClick={onClose}>
            <MessageCircle className="w-5 h-5" /> Messages
          </Link>
          <Link to="/favorites" className="rounded-xl px-3 py-3 flex items-center gap-3 font-medium text-[#1A1A1A] hover:bg-[#f5f5f5]" onClick={onClose}>
            <Heart className="w-5 h-5" /> Favorites
          </Link>
          <Link to="/about" className="rounded-xl px-3 py-3 flex items-center gap-3 font-medium text-[#1A1A1A] hover:bg-[#f5f5f5]" onClick={onClose}>
            <Star className="w-5 h-5" /> About
          </Link>
          <Link to="/contact" className="rounded-xl px-3 py-3 flex items-center gap-3 font-medium text-[#1A1A1A] hover:bg-[#f5f5f5]" onClick={onClose}>
            <HelpCircle className="w-5 h-5" /> Contact
          </Link>
        </nav>

        {/* Footer */}
        <div className="mt-2 border-t border-[#ececec] px-4 py-3 flex flex-col gap-3">
          <Button onClick={signOut} className="w-full bg-[#f55] text-white font-bold shadow rounded-xl hover:bg-[#c22]">
            <LogOut className="w-5 h-5 mr-2" /> Sign Out
          </Button>
          <div className="mt-3 flex items-center justify-center text-xs text-[#9A7B69] font-semibold opacity-70">
            Inspired by Sunshine ☀️
          </div>
        </div>
      </aside>
      <div className="flex-1" onClick={onClose} />
    </div>
  );
};

export default MobileMenu;
