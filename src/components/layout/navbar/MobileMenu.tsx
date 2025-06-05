
import React from "react";
import Logo from "@/components/ui/Logo";

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
        <div className="mb-4 w-full rounded-2xl bg-yellow-50 border border-yellow-200 text-yellow-700 text-center px-4 py-2 shadow-sm font-semibold text-base">
          🏆 Invite friends for <b className="text-yellow-800">DOUBLE</b> rewards! 🚀
        </div>
        
        {/* Logo and Profile */}
        <div className="flex flex-col items-center mb-2">
          <Logo className="w-14 h-14 mb-2" />
          <img src={user.avatar} alt="Avatar" className="w-16 h-16 rounded-full border-2 border-purple-200 mb-2" />
          <div className="text-lg font-semibold">{user.name}</div>
          <div className="text-sm text-gray-400 mb-2">{user.email}</div>
        </div>
        
        {/* Credits/Rewards */}
        <div className="mb-6 w-full flex flex-col items-center bg-gradient-to-r from-purple-50 to-white border border-purple-100 rounded-xl shadow p-3">
          <span className="text-xs font-semibold text-purple-700">
            Credits: <span className="font-bold text-purple-800">{user.credits}</span>
          </span>
          <div className="w-full bg-purple-100 rounded-lg h-2 mt-1 mb-1">
            <div className="bg-gradient-to-r from-purple-400 to-pink-300 h-2 rounded-lg" style={{ width: user.nextReward }}></div>
          </div>
          <span className="text-xs text-purple-400">{user.nextReward} to next reward!</span>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-3 w-full">
          <button className="w-full py-3 rounded-2xl bg-white/70 backdrop-blur shadow-lg font-semibold text-purple-700 border border-purple-100 hover:bg-purple-50 transition">Home</button>
          <button className="w-full py-3 rounded-2xl bg-white/70 backdrop-blur shadow-lg font-semibold text-purple-700 border border-purple-100 hover:bg-purple-50 transition">Jobs</button>
          <button className="w-full py-3 rounded-2xl bg-white/70 backdrop-blur shadow-lg font-semibold text-purple-700 border border-purple-100 hover:bg-purple-50 transition">Artists</button>
          <button className="w-full py-3 rounded-2xl bg-white/70 backdrop-blur shadow-lg font-semibold text-purple-700 border border-purple-100 hover:bg-purple-50 transition">Salons</button>
          <button className="w-full py-3 rounded-2xl bg-white/70 backdrop-blur shadow-lg font-semibold text-purple-700 border border-purple-100 hover:bg-purple-50 transition">Community</button>
        </nav>
        
        <button className="mt-8 w-full py-3 rounded-xl bg-purple-600 text-white font-bold shadow-lg hover:bg-purple-700 transition">
          Sign Out
        </button>
      </aside>
      <div className="flex-1" onClick={onClose} />
    </div>
  );
};

export default MobileMenu;
