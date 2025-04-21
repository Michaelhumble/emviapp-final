
import React from "react";
import { useAuth } from "@/context/auth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BadgeDollarSign, Award, Star, Gift, FileText, Plus, Minus } from "lucide-react";

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
    onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }), // Placeholder
  },
  {
    label: "Invite a friend",
    credits: 10,
    btn: "Invite",
    icon: <Gift className="h-4 w-4 mr-1 text-amber-400" />,
    onClick: () => window.location.href = "/dashboard/customer", // Placeholder
  },
  {
    label: "Complete your profile",
    credits: 5,
    btn: "Complete",
    icon: <FileText className="h-4 w-4 mr-1 text-primary" />,
    onClick: () => window.location.href = "/profile/edit",
  },
];

const CustomerWallet: React.FC = () => {
  const { userProfile, userRole } = useAuth();

  if (userRole !== "customer") return null;

  const currentCredits = userProfile?.credits ?? 0;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
          <BadgeDollarSign className="h-5 w-5 text-primary" />
          Your Wallet
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Current Balance */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-base md:text-lg font-medium text-gray-700">Current Balance:</div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-green-600">{currentCredits}</span>
            <span className="text-base text-gray-600">credits</span>
          </div>
        </div>
        {/* Divider */}
        <hr className="my-3" />
        {/* Transaction History */}
        <div>
          <div className="font-semibold mb-2 text-base md:text-lg">Recent Transactions</div>
          <div className="space-y-2">
            {DUMMY_TRANSACTIONS.slice(0, 5).map(tx => (
              <div key={tx.id} className="flex items-center justify-between p-2 rounded bg-gray-50">
                <div className="flex items-center gap-2 min-w-0">
                  <span>{tx.icon}</span>
                  <span className="text-sm truncate">{tx.type}</span>
                  <span className="text-xs text-gray-400 ml-2">{formatDate(tx.date)}</span>
                </div>
                <span className={
                  "text-sm font-semibold " +
                  (tx.amount > 0
                    ? "text-green-600"
                    : "text-red-500")
                }>
                  {tx.amount > 0 ? "+" : ""}
                  {tx.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Divider */}
        <hr className="my-4" />
        {/* Earn More Tips */}
        <div>
          <div className="font-semibold mb-2 text-base md:text-lg">Earn More Credits</div>
          <div className="flex flex-col gap-3">
            {earnMoreTips.map((tip, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-pink-50 border border-pink-100"
              >
                <div className="flex items-center gap-2 min-w-0">
                  {tip.icon}
                  <span className="text-sm truncate font-medium">{tip.label}</span>
                  <span className="ml-1 text-xs font-bold text-green-600">
                    +{tip.credits}
                  </span>
                </div>
                <button
                  className="ml-2 bg-primary text-white rounded-lg px-3 py-1.5 text-xs font-medium min-h-[44px] hover:bg-primary/80 transition shadow"
                  onClick={tip.onClick}
                  tabIndex={0}
                  style={{ minWidth: 90 }}
                >
                  {tip.btn}
                </button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerWallet;
