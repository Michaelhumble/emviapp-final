
import { useAuth } from "@/context/auth";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Calendar, List, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

// Simple helpers
function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
function formatTime(timeStr: string) {
  if (!timeStr) return "";
  return timeStr;
}

// Component
const FreelancerDashboardOverview = () => {
  const { user, userProfile } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [stats, setStats] = useState({
    upcoming: 0,
    clients: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    async function loadData() {
      setLoading(true);
      try {
        // Bookings assigned to this freelancer
        const { data: bData, error: bErr } = await supabase
          .from("bookings")
          .select(
            `id, created_at, date_requested, time_requested, status, note, service_id, recipient_id, service:service_id(id, title, price)`
          )
          .eq("recipient_id", user?.id || "")
          .order("date_requested", { ascending: true });
        if (bErr) throw bErr;
        // Services created by this freelancer
        const { data: sData, error: sErr } = await supabase
          .from("services")
          .select("*")
          .eq("user_id", user?.id || "");
        if (sErr) throw sErr;

        // Stats
        const upcomingBookings = bData?.filter(b => b.status !== "completed" && b.status !== "cancelled") || [];
        // Estimate revenue (sum of prices for completed bookings)
        const completed = bData?.filter(b => b.status === "completed" && b.service && b.service.price) || [];
        const clientIds = new Set(bData?.map(b => b.recipient_id).filter(Boolean));
        const revenue = completed.reduce((acc, curr) => acc + (curr.service?.price || 0), 0);

        if (!cancelled) {
          setBookings(bData || []);
          setServices(sData || []);
          setStats({
            upcoming: upcomingBookings.length,
            clients: clientIds.size,
            revenue
          });
        }
      } catch (err) {
        // fallback to empty
        if (!cancelled) {
          setBookings([]);
          setServices([]);
          setStats({ upcoming: 0, clients: 0, revenue: 0 });
        }
      }
      setLoading(false);
    }
    if (user?.id) loadData();
    else setLoading(false);
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  // Greet
  const username = userProfile?.full_name?.split(" ")[0] || "Freelancer";

  // Responsive
  return (
    <div className="w-full mx-auto max-w-3xl flex flex-col gap-6 pb-8">
      {/* Greeting */}
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-primary flex items-center gap-2">
          Welcome back, {username} <span>👋</span>
        </h1>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-4">
        <Card className="rounded-xl shadow-sm border border-primary/10 bg-white">
          <CardContent className="flex flex-col items-center py-5">
            <Calendar className="h-7 w-7 text-primary mb-2" />
            <p className="text-2xl font-bold">{loading ? <Skeleton className="h-6 w-12" /> : stats.upcoming}</p>
            <p className="text-xs text-muted-foreground">Upcoming</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm border border-primary/10 bg-white">
          <CardContent className="flex flex-col items-center py-5">
            <List className="h-7 w-7 text-primary mb-2" />
            <p className="text-2xl font-bold">{loading ? <Skeleton className="h-6 w-12" /> : bookings.filter(b => b.status === "completed").length}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm border border-primary/10 bg-white">
          <CardContent className="flex flex-col items-center py-5">
            <Users className="h-7 w-7 text-primary mb-2" />
            <p className="text-2xl font-bold">{loading ? <Skeleton className="h-6 w-12" /> : stats.clients}</p>
            <p className="text-xs text-muted-foreground">Clients</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm border border-primary/10 bg-white">
          <CardContent className="flex flex-col items-center py-5">
            <Clock className="h-7 w-7 text-primary mb-2" />
            <p className="text-2xl font-bold">{loading ? <Skeleton className="h-6 w-12" /> : `$${stats.revenue}`}</p>
            <p className="text-xs text-muted-foreground">Revenue</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Appointments */}
      <div className="px-4">
        <Card className="rounded-2xl mb-5">
          <CardHeader className="pb-2">
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full rounded-md" />)}
              </div>
            ) : (
              <>
                {bookings.filter(b => b.status !== "completed" && b.status !== "cancelled").length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    No upcoming appointments yet.
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {bookings.filter(b => b.status !== "completed" && b.status !== "cancelled")
                      .slice(0, 3)
                      .map((b, idx) => (
                        <Card key={b.id || idx} className="border-0 shadow bg-slate-50/70 rounded-lg">
                          <CardContent className="flex flex-col gap-1 py-3 px-2">
                            <div className="font-semibold">{b.service?.title || "Service"}</div>
                            <div className="text-xs text-muted-foreground">{formatDate(b.date_requested)} {formatTime(b.time_requested)}</div>
                            <div className="text-xs">Status: {b.status}</div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                )}
              </>
            )}
            <div className="pt-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/freelancer/bookings")}
              >
                View All Bookings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services */}
      <div className="px-4">
        <Card className="rounded-2xl mb-5">
          <CardHeader className="pb-2">
            <CardTitle>Your Services</CardTitle>
            <CardDescription>Manage and showcase what you offer</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                {[1, 2].map(i => <Skeleton key={i} className="h-10 w-full rounded" />)}
              </div>
            ) : (
              <>
                {services.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    No services listed. Add your offerings!
                    <div className="mt-4">
                      <Button
                        size="sm"
                        className="bg-primary text-white"
                        onClick={() => navigate("/services/setup")}
                      >
                        Add Service
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {services.slice(0, 3).map(s => (
                      <Card key={s.id} className="border-0 shadow bg-slate-50/50">
                        <CardContent className="py-2 px-2 flex flex-col">
                          <span className="font-medium">{s.title}</span>
                          <span className="text-xs text-muted-foreground">{s.description}</span>
                          <span className="text-sm text-primary">${s.price}</span>
                        </CardContent>
                      </Card>
                    ))}
                    <div className="pt-3">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => navigate("/services/setup")}
                      >
                        Manage All Services
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Availability (Link) */}
      <div className="px-4">
        <Card className="rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle>Availability Calendar</CardTitle>
            <CardDescription>Keep clients up to date with your open slots</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => navigate("/availability")}
            >
              Go to Calendar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FreelancerDashboardOverview;
