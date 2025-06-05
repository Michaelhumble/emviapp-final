
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Star, Heart, Gift, Users, Search, HelpCircle, MessageCircle } from "lucide-react";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

const referralLink = "https://emvi.app/invite/your-code"; // Replace with dynamic value if available

export default function MobileMenu({ isOpen, onClose }) {
  const { user, signOut, userProfile, userRole } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  if (!isOpen || userRole !== "customer") return null;

  const handleEditProfile = () => {
    onClose();
    setTimeout(() => navigate("/profile/edit"), 250);
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside className="fixed inset-0 z-50 bg-black/30 flex justify-end md:hidden">
      <nav className="w-[90vw] max-w-xs bg-white rounded-l-2xl shadow-2xl flex flex-col h-full overflow-y-auto pb-6 relative">
        {/* Sticky Profile Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-br from-[#F6F6F7] to-[#9A7B69]/20 px-5 pt-6 pb-4 border-b border-[#F6F6F7]">
          <div className="flex items-center gap-3">
            <img
              src={userProfile?.avatar_url || "/img/default-avatar.png"}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover border border-[#9A7B69]/40 shadow"
            />
            <div className="flex-1">
              <div className="font-semibold text-lg text-[#1A1A1A]">
                {userProfile?.full_name || "Beauty Lover"}
              </div>
              <div className="flex items-center gap-1 text-xs text-[#9A7B69] font-semibold">
                Credits: <span className="ml-1 text-[#9A7B69]">{userProfile?.credits || "0"}</span>
                <Star size={14} className="ml-1" />
              </div>
            </div>
          </div>
          <div className="mt-2 flex gap-2">
            <button
              onClick={handleEditProfile}
              className="px-3 py-1 rounded-lg bg-[#9A7B69]/10 text-[#9A7B69] text-xs font-medium border border-[#9A7B69]/40 hover:bg-[#9A7B69]/20 transition"
            >
              Edit Profile
            </button>
            <button
              onClick={handleCopyReferral}
              className="px-3 py-1 rounded-lg bg-[#9A7B69] text-white text-xs font-medium hover:bg-[#7a614f] transition"
            >
              {copied ? "Copied!" : "Invite Friends"}
            </button>
          </div>
        </div>

        {/* FOMO/Rewards Banner */}
        <div className="m-4 mt-3 p-3 bg-gradient-to-tr from-[#FFF7E6] to-[#F6F6F7] rounded-xl shadow flex flex-col items-center border border-[#9A7B69]/30">
          <div className="text-xs font-bold text-[#9A7B69] uppercase tracking-wide">
            🎉 Limited-Time DOUBLE Rewards!
          </div>
          <div className="w-full mt-2 h-2 rounded-full bg-[#F6F6F7]">
            <div className="h-2 rounded-full bg-[#9A7B69] transition-all duration-1000" style={{ width: "65%" }} />
          </div>
          <div className="mt-2 text-xs text-[#9A7B69]/80 text-center">
            Invite friends today – <span className="font-semibold">2X credits</span> for the next 72 hours!
          </div>
        </div>

        {/* Main Navigation */}
        <ul className="flex flex-col gap-2 px-4 mt-2">
          <li>
            <button
              onClick={() => { onClose(); navigate("/dashboard/customer"); }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#F6F6F7] transition font-medium"
            >
              <Users size={20} className="text-[#9A7B69]" />
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => { onClose(); navigate("/artists"); }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#F6F6F7] transition font-medium"
            >
              <Search size={20} className="text-[#9A7B69]" />
              Browse Artists
            </button>
          </li>
          <li>
            <button
              onClick={() => { onClose(); navigate("/salons"); }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#F6F6F7] transition font-medium"
            >
              <Gift size={20} className="text-[#9A7B69]" />
              Browse Salons
            </button>
          </li>
          <li>
            <button
              onClick={() => { onClose(); navigate("/favorites"); }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#F6F6F7] transition font-medium"
            >
              <Heart size={20} className="text-[#9A7B69]" />
              Favorites
            </button>
          </li>
          <li>
            <button
              onClick={() => { onClose(); navigate("/messages"); }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#F6F6F7] transition font-medium"
            >
              <MessageCircle size={20} className="text-[#9A7B69]" />
              Messages
            </button>
          </li>
          <li>
            <button
              onClick={() => { onClose(); navigate("/community"); }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#F6F6F7] transition font-medium"
            >
              <Users size={20} className="text-[#9A7B69]" />
              Community
            </button>
          </li>
          <li>
            <button
              onClick={() => { onClose(); navigate("/support"); }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#F6F6F7] transition font-medium"
            >
              <HelpCircle size={20} className="text-[#9A7B69]" />
              Support & Feedback
            </button>
          </li>
        </ul>

        {/* Sign Out & Footer */}
        <div className="mt-auto px-4 pt-6">
          <button
            onClick={() => { onClose(); signOut(); }}
            className="w-full flex items-center gap-2 justify-center text-[#E76F51] border border-[#E76F51]/20 px-3 py-2 rounded-xl bg-[#F6F6F7] font-semibold hover:bg-[#fff6f4] transition"
          >
            <LogOut size={20} /> Sign Out
          </button>
          <div className="mt-4 text-xs text-center text-[#9A7B69] font-medium">
            Inspired by Sunshine ☀️<br />
            <span className="text-[#1A1A1A]/60 font-normal">All core features are free. Invite friends to unlock more.</span>
          </div>
        </div>
      </nav>
    </aside>
  );
}
