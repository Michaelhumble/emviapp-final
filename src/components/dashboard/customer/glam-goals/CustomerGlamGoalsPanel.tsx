
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, Gift, Sparkles } from "lucide-react";

// Demo data: Replace with backend-sourced goal status & progress later!
const glamGoals = [
  {
    id: "profile",
    title: "Complete your profile",
    icon: <Sparkles className="h-5 w-5 text-violet-500" />,
    progress: 100, // 100 for demo: completed
    reward: "+5 credits",
    gradient: "bg-gradient-to-r from-violet-200 via-violet-100 to-pink-100",
    status: "Completed",
  },
  {
    id: "invite",
    title: "Invite 3 friends",
    icon: <Gift className="h-5 w-5 text-pink-500" />,
    progress: 66, // 2 out of 3, demo
    reward: "+10 credits",
    gradient: "bg-gradient-to-r from-pink-100 via-pink-50 to-yellow-100",
    status: "In Progress",
  },
  {
    id: "bookings",
    title: "Book 2 different services",
    icon: <Sparkles className="h-5 w-5 text-yellow-500" />,
    progress: 0, // not started
    reward: "+10 credits",
    gradient: "bg-gradient-to-r from-yellow-50 via-pink-50 to-violet-100",
    status: "Not Started",
  },
  {
    id: "review",
    title: "Leave a review",
    icon: <Check className="h-5 w-5 text-green-500" />,
    progress: 100, // completed
    reward: "+5 credits",
    gradient: "bg-gradient-to-r from-green-50 via-violet-50 to-pink-100",
    status: "Completed",
  },
];

const getStatusText = (progress: number) => {
  if (progress === 0) return "Not Started";
  if (progress < 100) return "In Progress";
  return "Completed";
};

// Card border and shadow, animated fill, icon, check on completed, beautiful gradients!
const CustomerGlamGoalsPanel: React.FC = () => (
  <section className="mb-8 md:mb-12">
    <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2" style={{ fontSize: 'clamp(1.125rem, 4vw, 1.5rem)' }}>
      <span className="text-lg">🎯</span>
      Your Glam Goals
    </h2>
    <div
      className="
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5
        [&>*]:animate-fade-in
        "
    >
      {glamGoals.map((goal, idx) => (
        <Card
          key={goal.id}
          className={`overflow-hidden border-0 relative shadow-xl group p-0 ${goal.gradient}`}
          style={{ animationDelay: `${idx * 75}ms` }}
        >
          <CardContent className="p-5 min-h-[170px] flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span>{goal.icon}</span>
              <span className="font-semibold text-base">{goal.title}</span>
              {goal.progress === 100 && (
                <Check className="h-5 w-5 ml-2 text-green-600 bg-green-100 rounded-full p-0.5 animate-fade-in" />
              )}
            </div>
            <div className="flex-1">
              <Progress
                value={goal.progress}
                className={`h-2 rounded-full transition-all`}
                indicatorClassName={
                  goal.progress === 100
                    ? "bg-green-400"
                    : goal.id === "invite"
                    ? "bg-pink-400"
                    : goal.id === "bookings"
                    ? "bg-yellow-400"
                    : "bg-violet-400"
                }
              />
              <div className="flex justify-between items-center mt-2 text-xs sm:text-sm">
                <span className={goal.progress === 100 ? "text-green-600 font-semibold" : "text-gray-700"}>
                  {getStatusText(goal.progress)}
                </span>
                <span className="text-violet-700 font-bold flex items-center gap-1">
                  <Gift className="h-4 w-4" /> {goal.reward}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
    <div className="mt-3 text-xs text-gray-500 text-center">Complete goals to earn credits and badges ✨</div>
  </section>
);

export default CustomerGlamGoalsPanel;
