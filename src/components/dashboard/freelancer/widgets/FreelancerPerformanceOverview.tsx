
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {metrics.map((_, i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-8 w-20 bg-muted-foreground/20" />
            <Skeleton className="h-5 w-12 mt-2 bg-muted-foreground/10" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <section className="mb-8 rounded-lg">
      <h2 className="text-xl font-bold mb-2 text-purple-800">Performance Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((card, idx) => (
          <Card
            key={card.label}
            className="rounded-xl border border-purple-100 bg-purple-50/70 shadow-sm flex flex-col items-center py-6 gap-1"
          >
            <card.icon className={`h-8 w-8 mb-1 ${card.color}`} />
            <p className="text-2xl font-bold">{card.value}</p>
            <p className="text-sm text-gray-600">{card.label}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
