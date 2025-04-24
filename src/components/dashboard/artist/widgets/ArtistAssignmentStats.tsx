
import { Card } from "@/components/ui/card";
import { useArtistAssignmentStats } from "./useArtistAssignmentStats";
import { Calendar, Clock, DollarSign, Users, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

function StatCard({ icon: Icon, label, value, color }: { icon: any, label: string, value: React.ReactNode, color: string }) {
  return (
    <Card className="rounded-xl border shadow-sm px-2 py-4 flex flex-col items-center bg-white transition">
      <Icon className={`h-7 w-7 mb-1 ${color}`} />
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </Card>
  );
}

export default function ArtistAssignmentStats() {
  const {
    loading,
    thisMonthBookings,
    completed,
    canceled,
    pending,
    totalHours,
    estimatedTips,
    servicesPerformed,
    mostPopularService,
  } = useArtistAssignmentStats();

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Card key={idx} className="p-4">
            <Skeleton className="h-7 w-24 bg-muted-foreground/20" />
            <Skeleton className="h-5 w-12 mt-2 bg-muted-foreground/10" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <section aria-label="Artist Assignment Stats" className="mb-7">
      <h2 className="text-2xl font-bold font-serif mb-3 ml-1 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-indigo-500" />
        Your Month So Far
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard icon={Calendar} label="Bookings" value={thisMonthBookings} color="text-purple-600" />
        <StatCard icon={Clock} label="Hours Worked" value={totalHours} color="text-amber-600" />
        <StatCard icon={DollarSign} label="Est. Tips" value={`$${estimatedTips}`} color="text-green-600" />
        <StatCard icon={Users} label="Services Done" value={servicesPerformed} color="text-blue-600" />
        <StatCard
          icon={TrendingUp}
          label="Popular"
          value={mostPopularService?.title ? (
            <span className="block max-w-[90px] truncate">{mostPopularService.title}</span>
          ) : (
            <span className="text-xs text-muted-foreground">—</span>
          )}
          color="text-pink-600"
        />
      </div>
      <div className="flex flex-wrap gap-2 mt-3 text-xs text-muted-foreground">
        <span>Completed: <span className="font-semibold text-green-600">{completed}</span></span>
        <span>Pending: <span className="font-semibold text-yellow-600">{pending}</span></span>
        <span>Canceled: <span className="font-semibold text-rose-600">{canceled}</span></span>
      </div>
      {thisMonthBookings === 0 && (
        <Card className="mt-6 animate-fade-in text-center py-8">
          <div className="flex flex-col items-center justify-center py-2 px-6">
            <TrendingUp className="h-10 w-10 text-indigo-300 opacity-70 mb-2" />
            <div className="text-lg font-bold mb-1">Start accepting appointments to see your progress!</div>
            <div className="text-xs text-gray-500">
              As you get bookings, you’ll see your stats, estimated hours, and trends here.
            </div>
          </div>
        </Card>
      )}
    </section>
  );
}
