import { ReactNode } from "react";
import { toast } from "react-hot-toast";
import { supabase } from "../../lib/supabaseClient";
import { ShoppingCart } from "lucide-react";

export interface StoreItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: ReactNode;
  type: string;
  duration?: number; // in days, if applicable
  credits: number;
  purchasing: string | null;
  userId?: string;
  onPurchaseComplete: (newBalance: number) => void;
}

const StoreItem = ({ 
  id, 
  name, 
  description, 
  price, 
  icon, 
  type, 
  duration, 
  credits, 
  purchasing, 
  userId,
  onPurchaseComplete,
}: StoreItemProps) => {
  
  const handlePurchase = async () => {
    if (!userId) {
      toast.error("Please sign in to make purchases", {
        style: {
          background: "#1e293b",
          color: "#fff",
          border: "1px solid rgba(252, 165, 165, 0.2)",
        },
        icon: '🔒',
      });
      return;
    }
    
    // Check if user has enough credits
    if (credits < price) {
      toast.error("Not enough credits for this purchase", {
        style: {
          background: "#7f1d1d",
          color: "#fff",
          border: "1px solid rgba(252, 165, 165, 0.2)",
        },
        icon: '❌',
      });
      return;
    }

    try {
      // Process the purchase
      const newCreditBalance = credits - price;
      
      // Update user credits in Supabase
      const { error } = await supabase
        .from("profiles")
        .update({
          credits: newCreditBalance,
          updated_at: new Date().toISOString()
        })
        .eq("id", userId);

      if (error) throw error;
      
      // Update local state via callback
      onPurchaseComplete(newCreditBalance);
      
      // Show success message based on item type
      switch (type) {
        case "boost":
          toast.success(`Your profile is now boosted for ${duration} days!`, {
            style: {
              background: "#064e3b",
              color: "#fff",
              border: "1px solid rgba(110, 231, 183, 0.2)",
            },
            icon: '⭐',
          });
          break;
        case "banner":
          toast.success("Custom banner unlocked! Check your profile settings.", {
            style: {
              background: "#064e3b",
              color: "#fff",
              border: "1px solid rgba(110, 231, 183, 0.2)",
            },
            icon: '✨',
          });
          break;
        case "surprise":
          // Random messages for surprise box
          const surprises = [
            "You've received a special business connection request!",
            "Unlocked: Premium content access for 7 days!",
            "You've been featured in the monthly newsletter!",
            "Special discount code for EmviApp premium sent to your email!"
          ];
          const randomMessage = surprises[Math.floor(Math.random() * surprises.length)];
          toast.success(randomMessage, {
            style: {
              background: "#064e3b",
              color: "#fff",
              border: "1px solid rgba(110, 231, 183, 0.2)",
            },
            icon: '🎁',
          });
          break;
        case "early_access":
          toast.success("You're now recognized as an Early Adopter!", {
            style: {
              background: "#064e3b",
              color: "#fff",
              border: "1px solid rgba(110, 231, 183, 0.2)",
            },
            icon: '🚀',
          });
          break;
        case "tips":
          toast.success("Marketing tips unlocked! Check your resources section.", {
            style: {
              background: "#064e3b",
              color: "#fff",
              border: "1px solid rgba(110, 231, 183, 0.2)",
            },
            icon: '💡',
          });
          break;
        default:
          toast.success("Purchase successful!", {
            style: {
              background: "#064e3b",
              color: "#fff",
              border: "1px solid rgba(110, 231, 183, 0.2)",
            },
            icon: '✅',
          });
      }
    } catch (error) {
      console.error("Purchase error:", error);
      toast.error("Purchase failed. Please try again.", {
        style: {
          background: "#7f1d1d",
          color: "#fff",
          border: "1px solid rgba(252, 165, 165, 0.2)",
        },
        icon: '❌',
      });
    }
  };

  return (
    <div className="border border-white/5 rounded-2xl overflow-hidden shadow-xl flex flex-col bg-gradient-to-b from-gray-800/80 to-gray-900/90 hover-scale">
      <div className="p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="bg-gray-800/80 p-4 rounded-xl border border-white/5 shadow-lg">
            {icon}
          </div>
          <div className="bg-purple-500/20 text-purple-200 px-4 py-2 rounded-xl text-sm font-medium border border-purple-500/30">
            {price} credits
          </div>
        </div>
        <h3 className="text-xl font-medium mb-3 text-white">{name}</h3>
        <p className="text-gray-300 mb-6">{description}</p>
      </div>
      <div className="mt-auto p-6 pt-0">
        <button
          onClick={handlePurchase}
          disabled={purchasing === id || credits < price}
          className={`w-full py-3 px-4 rounded-xl transition-all ${
            credits < price
              ? "bg-gray-700/50 text-gray-400 cursor-not-allowed border border-gray-600/50"
              : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white hover:shadow-lg hover:shadow-purple-900/20"
          } ${purchasing === id ? "opacity-70" : "opacity-100"} font-medium flex items-center justify-center`}
        >
          {purchasing === id ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          ) : credits < price ? null : (
            <ShoppingCart size={18} className="mr-2" />
          )}
          {purchasing === id ? "Processing..." : credits < price ? "Insufficient Credits" : "Purchase Now"}
        </button>
      </div>
    </div>
  );
};

export default StoreItem;
