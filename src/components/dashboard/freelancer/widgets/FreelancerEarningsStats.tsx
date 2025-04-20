
import { Card } from "@/components/ui/card";
import { Calendar, DollarSign, Users, Briefcase } from "lucide-react";
import { useFreelancerEarningsStats } from "./useFreelancerEarningsStats";
import { Skeleton } from "@/components/ui/skeleton";

export default function FreelancerEarningsStats() {
  const {
    totalBookings,
    estimatedEarnings,
    newClients,
    totalServices,
    loading,
  } = useFreelancerEarningsStats();

  // Metric card config
  const metricCards = [
    {
      label: "Bookings",
      value: totalBookings,
      icon: Calendar,
      color: "text-amber-600",
    },
    {
      label: "Earnings (est.)",
      value: `$${estimatedEarnings}`,
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      label: "New Clients",
      value: newClients,
      icon: Users,
      color: "text-blue-600",
    },
    {
      label: "Services",
      value: totalServices,
      icon: Briefcase,
      color: "text-purple-600",
    },
  ];

  // Empty state logic
  const isEmpty =
    !loading &&
    totalBookings === 0 &&
    estimatedEarnings === 0 &&
    newClients === 0 &&
    totalServices === 0;

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[0, 1, 2, 3].map((_, i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-7 w-24 bg-muted-foreground/20" />
            <Skeleton className="h-5 w-12 mt-2 bg-muted-foreground/10" />
          </Card>
        ))}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <Card className="mb-6 animate-fade-in text-center py-10">
        <div className="flex flex-col items-center justify-center py-6 sm:py-8 px-6">
          <Calendar className="h-10 w-10 text-amber-300 opacity-70 mb-2" />
          <div className="text-xl font-bold mb-1">Start booking clients to see your growth!</div>
          <div className="text-sm text-gray-500">
            Once you get bookings, you’ll see your progress, estimated earnings, and more here.
          </div>
        </div>
      </Card>
    );
  }

  return (
    <section aria-label="Performance Overview" className="mb-7">
      <h2 className="text-2xl font-bold font-serif mb-3 ml-1 flex items-center gap-2">
        <DollarSign className="h-5 w-5 text-green-500" />
        Your Earnings This Month
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metricCards.map((card, idx) => (
          <Card
            key={card.label}
            className="rounded-xl shadow-sm border border-primary/10 bg-white animate-fade-in"
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            <div className="flex flex-col items-center py-5 px-2">
              <card.icon className={`h-7 w-7 mb-1 ${card.color}`} />
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-xs text-muted-foreground">{card.label}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
