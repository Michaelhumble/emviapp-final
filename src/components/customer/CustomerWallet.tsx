import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/auth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BadgeDollarSign, Award, Star, Gift, FileText, Plus, Minus } from "lucide-react";
import { toast } from "sonner";
import AnimatedNumber from "./AnimatedNumber";
import WalletConfetti from "./WalletConfetti";
import { supabase } from "@/integrations/supabase/client";

const DUMMY_TRANSACTIONS = [
  {
    id: "tx1",
    date: "2025-04-20",
    type: "Referral",
    amount: 10,
    icon: <Gift className="h-4 w-4 text-amber-400" />,
  },
  {
    id: "tx2",
    date: "2025-04-18",
    type: "Promo Code",
    amount: 5,
    icon: <BadgeDollarSign className="h-4 w-4 text-primary" />,
  },
  {
    id: "tx3",
    date: "2025-04-15",
    type: "Review Bonus",
    amount: 5,
    icon: <Star className="h-4 w-4 text-pink-500" />,
  },
  {
    id: "tx4",
    date: "2025-04-12",
    type: "Booking Reward",
    amount: 3,
    icon: <Award className="h-4 w-4 text-green-500" />,
  },
  {
    id: "tx5",
    date: "2025-04-10",
    type: "Booking Spent",
    amount: -8,
    icon: <Minus className="h-4 w-4 text-red-400" />,
  },
];

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

const earnMoreTips = [
  {
    label: "Leave a review",
    credits: 5,
    btn: "Leave Review",
    icon: <Star className="h-4 w-4 mr-1 text-pink-400" />,
    onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
  },
  {
    label: "Invite a friend",
    credits: 10,
    btn: "Invite",
    icon: <Gift className="h-4 w-4 mr-1 text-amber-400" />,
    onClick: () => window.location.href = "/dashboard/customer",
  },
  {
    label: "Complete your profile",
    credits: 5,
    btn: "Complete",
    icon: <FileText className="h-4 w-4 mr-1 text-primary" />,
    onClick: () => window.location.href = "/profile/edit",
  },
];

function isMilestone(newVal: number, oldVal: number) {
  if (newVal - oldVal >= 5) return true;
  const roundNumbers = [10, 20, 50, 100, 200, 500, 1000];
  for (let i = 0; i < roundNumbers.length; i++) {
    if ((oldVal < roundNumbers[i] && newVal >= roundNumbers[i])) return true;
  }
  return false;
}

function formatCreditHistoryItem(item: any) {
  return {
    id: item.id,
    value: item.value,
    description:
      item.action_type === "review"
        ? "Review Bonus"
        : item.action_type === "referral"
        ? "Referral Bonus"
        : item.action_type === "purchase"
        ? "Purchased Credits"
        : item.action_type === "deduction" || item.value < 0
        ? "Credits Spent"
        : item.description || "Other",
    date: item.created_at,
  };
}

const CustomerWallet: React.FC = () => {
  const { userProfile, userRole } = useAuth();

  const [showConfetti, setShowConfetti] = useState(false);
  const [balance, setBalance] = useState<number>(userProfile?.credits ?? 0);
  const prevBalanceRef = useRef<number>(userProfile?.credits ?? 0);

  const [loadingHistory, setLoadingHistory] = useState(true);
  const [history, setHistory] = useState<any[]>([]);

  const fetchCreditHistory = async (userId: string) => {
    setLoadingHistory(true);
    const { data, error } = await supabase
      .from("customer_credits")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(8);
    if (!error && data) {
      setHistory(data.map(formatCreditHistoryItem));
    } else {
      setHistory([]);
    }
    setLoadingHistory(false);
  };

  useEffect(() => {
    if (userProfile?.id) {
      fetchCreditHistory(userProfile.id);
    }
  }, [userProfile?.id, userProfile?.credits]);

  useEffect(() => {
    if (typeof userProfile?.credits === "number") {
      if (userProfile.credits !== prevBalanceRef.current) {
        if (isMilestone(userProfile.credits, prevBalanceRef.current)) {
          setShowConfetti(true);
          if ((userProfile.credits - prevBalanceRef.current) > 0) {
            toast.success(`You just earned ${userProfile.credits - prevBalanceRef.current} credits! 🎉`);
          }
          [10, 20, 50, 100, 200, 500, 1000].forEach((milestone) => {
            if (prevBalanceRef.current < milestone && userProfile.credits >= milestone) {
              toast.success(`Congrats — you reached ${milestone} credits!`);
            }
          });
        }
        setBalance(userProfile.credits);
        prevBalanceRef.current = userProfile.credits;
      }
    }
  }, [userProfile?.credits]);

  if (userRole !== "customer") return null;

  return (
    <div className="relative max-w-full w-full">
      {showConfetti && (
        <WalletConfetti
          trigger={showConfetti}
          onDone={() => setShowConfetti(false)}
        />
      )}
      <Card className="mb-6 w-full max-w-xl mx-auto shadow-sm rounded-xl border-gray-100">
        <CardHeader className="px-4 pt-4 pb-2 flex items-center gap-2">
          <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
            <BadgeDollarSign className="h-5 w-5 text-primary" />
            <span>Your Wallet</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-3 px-4">
          <div className="flex items-center justify-between mb-4 mt-2 flex-wrap">
            <div className="text-base md:text-lg font-medium text-gray-700">Current Balance:</div>
            <div className="flex items-center gap-1 min-h-[44px]">
              <AnimatedNumber value={balance} duration={900} bounce />
              <span className="text-base text-gray-600">credits</span>
            </div>
          </div>
          <hr className="my-3 border-gray-200" />
          <div>
            <div className="font-semibold mb-2 text-base md:text-lg">Credit History</div>
            <div className="space-y-1 mb-2">
              {loadingHistory ? (
                <div className="p-4 text-sm text-muted-foreground text-center">
                  Loading credit history...
                </div>
              ) : history.length === 0 ? (
                <div className="p-4 rounded bg-gray-50 text-gray-400 text-sm text-center">
                  You haven't earned or used any credits yet.
                </div>
              ) : (
                history.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between px-3 py-2 rounded-md bg-white shadow-sm border border-gray-50 mb-1"
                  >
                    <div>
                      <span
                        className={
                          "font-semibold mr-2 " +
                          (item.value > 0 ? "text-green-600" : "text-red-500")
                        }
                      >
                        {item.value > 0 ? "+" : ""}
                        {item.value}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 ml-3">
                      {formatDate(item.date)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
          <hr className="my-4 border-gray-200" />
          <div>
            <div className="font-semibold mb-2 text-base md:text-lg">Recent Transactions</div>
            <div className="space-y-2">
              {DUMMY_TRANSACTIONS.slice(0, 5).map(tx => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-2 rounded bg-gray-50"
                  style={{ minHeight: 44 }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span>{tx.icon}</span>
                    <span className="text-sm truncate">{tx.type}</span>
                    <span className="text-xs text-gray-400 ml-2">{formatDate(tx.date)}</span>
                  </div>
                  <span
                    className={
                      "text-sm font-semibold " +
                      (tx.amount > 0
                        ? "text-green-600"
                        : "text-red-500")
                    }
                  >
                    {tx.amount > 0 ? "+" : ""}
                    {tx.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <hr className="my-4 border-gray-200" />
          <div>
            <div className="font-semibold mb-2 text-base md:text-lg">Earn More Credits</div>
            <div className="flex flex-col gap-3">
              {earnMoreTips.map((tip, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 rounded-lg bg-pink-50 border border-pink-100"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {tip.icon}
                    <span className="text-sm truncate font-medium">{tip.label}</span>
                    <span className="ml-1 text-xs font-bold text-green-600">
                      +{tip.credits}
                    </span>
                  </div>
                  <button
                    className="bg-primary text-white rounded-lg px-4 py-2 text-xs font-medium min-h-[44px] w-full sm:w-auto mt-2 sm:mt-0 hover:bg-primary/80 transition shadow focus:outline-none"
                    onClick={tip.onClick}
                    tabIndex={0}
                    style={{ minWidth: 110 }}
                  >
                    {tip.btn}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerWallet;
