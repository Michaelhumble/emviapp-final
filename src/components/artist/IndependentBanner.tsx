
import { BadgeCheck } from "lucide-react";

const IndependentBanner = () => (
  <div className="flex items-center gap-2 px-4 py-2 mb-3 rounded-lg bg-gradient-to-r from-vivid-purple/10 to-purple-50 border border-vivid-purple shadow-sm">
    <BadgeCheck className="text-vivid-purple w-5 h-5" />
    <span className="text-sm font-medium text-vivid-purple">
      You are working independently — POS and earnings features unlocked!
    </span>
  </div>
);

export default IndependentBanner;
