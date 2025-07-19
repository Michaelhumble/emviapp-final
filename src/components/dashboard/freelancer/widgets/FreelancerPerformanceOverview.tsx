
import { DollarSign, Users, Calendar } from "lucide-react";
import { useFreelancerEarningsStats } from "./useFreelancerEarningsStats";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function FreelancerPerformanceOverview() {
  const {
    totalBookings,
    estimatedEarnings,
    newClients,
    loading,
  } = useFreelancerEarningsStats();

  const metrics = [
    {
      label: "Bookings (month)",
      value: totalBookings,
      icon: Calendar,
      color: "text-primary",
    },
    {
      label: "Earnings",
      value: `$${estimatedEarnings}`,
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      label: "New Clients",
      value: newClients,
      icon: Users,
      color: "text-blue-700",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {metrics.map((_, i) => (
          <Card key={i} className="p-4 sm:p-6">
            <Skeleton className="h-6 sm:h-8 w-16 sm:w-20 bg-muted-foreground/20 mx-auto" />
            <Skeleton className="h-4 sm:h-5 w-8 sm:w-12 mt-2 bg-muted-foreground/10 mx-auto" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <section className="mb-6 sm:mb-8 rounded-lg">
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-purple-800">Performance Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {metrics.map((card, idx) => (
          <Card
            key={card.label}
            className="rounded-xl border border-purple-100 bg-purple-50/70 shadow-sm flex flex-col items-center py-4 sm:py-6 gap-1 hover:shadow-md transition-shadow"
          >
            <card.icon className={`h-6 w-6 sm:h-8 sm:w-8 mb-1 ${card.color}`} />
            <p className="text-xl sm:text-2xl font-bold">{card.value}</p>
            <p className="text-xs sm:text-sm text-gray-600 text-center px-2">{card.label}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
