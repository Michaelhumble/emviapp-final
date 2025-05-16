
import React from "react";
import { useAuth } from "@/context/auth";
import { Sparkles } from "lucide-react";
import Logo from "@/components/ui/Logo";

const CustomerWelcomeHeader: React.FC = () => {
  const { userProfile } = useAuth();
  const userName = userProfile?.full_name?.split(' ')[0] || 'Beautiful';
  
  return (
    <div className="mb-8">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-2 text-gray-800 flex items-center">
        Hello {userName} — Your Beauty Plans Are Here <Sparkles className="ml-2 h-5 w-5 text-amber-400" />
      </h1>
      <p className="text-gray-600 max-w-3xl">
        Track your appointments, rewards, and favorite pros — all in one calming space.
      </p>
    </div>
  );
};

export default CustomerWelcomeHeader;
