
import { GiftIcon, TrendingUp, Award } from "lucide-react";

export interface PerksSectionProps {
  profile: {
    credits?: number;
    badges?: Array<any>;
    status?: string;
  };
}

const PerksSection = ({ profile }: PerksSectionProps) => {
  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/30 border border-purple-500/20 p-6 md:p-8 rounded-2xl mb-8 shadow-xl transform transition-all hover:shadow-purple-900/10">
      <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
        <GiftIcon size={20} className="mr-2 text-purple-400" />
        Perks Just for You
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 border border-white/10 p-5 rounded-xl shadow-lg backdrop-blur-sm">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-lg font-medium text-purple-200">Credits</h4>
            <div className="h-10 w-10 rounded-full bg-purple-600/20 flex items-center justify-center">
              <TrendingUp size={20} className="text-purple-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{profile.credits || 0}</p>
          <p className="text-sm text-gray-400">
            Available to spend in the store
          </p>
        </div>
        
        <div className="bg-white/5 border border-white/10 p-5 rounded-xl shadow-lg backdrop-blur-sm">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-lg font-medium text-purple-200">Badges</h4>
            <div className="h-10 w-10 rounded-full bg-amber-600/20 flex items-center justify-center">
              <Award size={20} className="text-amber-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{profile.badges?.length || 0}</p>
          <p className="text-sm text-gray-400">
            Unlock more with your activity
          </p>
        </div>
        
        <div className="bg-white/5 border border-white/10 p-5 rounded-xl shadow-lg backdrop-blur-sm">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-lg font-medium text-purple-200">Status</h4>
            <div className="h-10 w-10 rounded-full bg-emerald-600/20 flex items-center justify-center">
              <Award size={20} className="text-emerald-400" />
            </div>
          </div>
          <p className="text-lg font-bold text-white mb-1">{profile.status || "New Member"}</p>
          <p className="text-sm text-gray-400">
            Continue engaging to level up
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerksSection;
