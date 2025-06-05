
import React from "react";
import Logo from "@/components/ui/Logo";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  // Replace with real user data when wiring up!
  const user = {
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Beauty Lover",
    email: "customer@email.com",
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/30 backdrop-blur">
      <aside className="relative w-[85vw] max-w-[400px] h-full bg-white rounded-l-3xl flex flex-col items-center p-6 shadow-2xl">
        <div className="flex flex-col items-center mb-6">
          <Logo className="w-14 h-14 mb-2" />
          <img src={user.avatar} alt="Avatar" className="w-16 h-16 rounded-full border-2 border-purple-200 mb-2" />
          <div className="text-lg font-semibold">{user.name}</div>
          <div className="text-sm text-gray-400 mb-1">{user.email}</div>
        </div>
        <nav className="flex-1 flex flex-col gap-4 w-full">
          <button className="w-full py-3 rounded-xl bg-purple-50 font-semibold text-purple-700 shadow-sm">Home</button>
          <button className="w-full py-3 rounded-xl bg-purple-50 font-semibold text-purple-700 shadow-sm">Jobs</button>
          <button className="w-full py-3 rounded-xl bg-purple-50 font-semibold text-purple-700 shadow-sm">Artists</button>
        </nav>
        <button className="mt-8 w-full py-3 rounded-xl bg-purple-600 text-white font-bold shadow-lg hover:bg-purple-700 transition">Sign Out</button>
      </aside>
      <div className="flex-1" onClick={onClose} />
    </div>
  );
};

export default MobileMenu;
