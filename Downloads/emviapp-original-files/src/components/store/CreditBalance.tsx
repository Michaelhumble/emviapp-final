
import React from "react";
import { Sparkles } from "lucide-react";

interface CreditBalanceProps {
  credits: number;
  loading: boolean;
}

const CreditBalance: React.FC<CreditBalanceProps> = ({ credits, loading }) => {
  return (
    <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 p-8 md:p-10 rounded-2xl mb-12 text-center shadow-2xl border border-purple-500/20 transform transition-all hover:shadow-purple-900/10 hover:border-purple-500/30">
      <div className="mb-3 flex justify-center">
        <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center">
          <Sparkles size={30} className="text-purple-300" />
        </div>
      </div>
      <p className="text-lg text-gray-300 mb-2">Your Credit Balance</p>
      {loading ? (
        <div className="animate-pulse h-12 bg-white/10 rounded-xl w-32 mx-auto mt-2"></div>
      ) : (
        <h2 className="text-5xl md:text-6xl font-medium text-white bg-gradient-to-r from-purple-200 to-indigo-200 bg-clip-text text-transparent">{credits} Credits</h2>
      )}
      <p className="text-gray-400 mt-4 text-sm max-w-md mx-auto">
        Use your credits to unlock special features and enhance your Emvi experience
      </p>
    </div>
  );
};

export default CreditBalance;
