
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import UpcomingAppointmentList from "../UpcomingAppointmentList";
import ServicesList from "../ServicesList";

// Format helpers
function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function formatTime(timeStr: string) {
  if (!timeStr) return "";
  return timeStr;
}

// Types
interface BookingStats {
  upcoming: number;
  completed: number;
  clients: number;
  revenue: number;
}

const OverviewTab = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [stats, setStats] = useState<BookingStats>({
    upcoming: 0,
    completed: 0,
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
        if (!user?.id) return;

        // Bookings assigned to this freelancer
        const { data: bData, error: bErr } = await supabase
          .from("bookings")
          .select(
            `id, created_at, date_requested, time_requested, status, note, service_id, 
            sender:sender_id(id, full_name, avatar_url),
            service:service_id(id, title, price)`
          )
          .eq("recipient_id", user.id)
          .order("date_requested", { ascending: true });
        
        if (bErr) throw bErr;
        
        // Services created by this freelancer
        const { data: sData, error: sErr } = await supabase
          .from("services")
          .select("*")
          .eq("user_id", user.id);
        
        if (sErr) throw sErr;

        // Calculate stats
        const upcomingBookings = bData?.filter(b => b.status !== "completed" && b.status !== "cancelled") || [];
        const completed = bData?.filter(b => b.status === "completed" && b.service && b.service.price) || [];
        const clientIds = new Set(bData?.map(b => b.sender?.id).filter(Boolean));
        const revenue = completed.reduce((acc, curr) => acc + (curr.service?.price || 0), 0);

        if (!cancelled) {
          setBookings(bData || []);
          setServices(sData || []);
          setStats({
            upcoming: upcomingBookings.length,
            completed: completed.length,
            clients: clientIds.size,
            revenue
          });
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    
    loadData();
    
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  return (
    <div className="space-y-6">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="shadow-sm border border-amber-100 bg-white">
          <CardContent className="flex flex-col items-center py-5">
            <Calendar className="h-7 w-7 text-amber-600 mb-2" />
            <p className="text-2xl font-bold">{loading ? <Skeleton className="h-6 w-12" /> : stats.upcoming}</p>
            <p className="text-xs text-muted-foreground">Upcoming</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border border-amber-100 bg-white">
          <CardContent className="flex flex-col items-center py-5">
            <Clock className="h-7 w-7 text-amber-600 mb-2" />
            <p className="text-2xl font-bold">{loading ? <Skeleton className="h-6 w-12" /> : stats.completed}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border border-amber-100 bg-white">
          <CardContent className="flex flex-col items-center py-5">
            <Users className="h-7 w-7 text-amber-600 mb-2" />
            <p className="text-2xl font-bold">{loading ? <Skeleton className="h-6 w-12" /> : stats.clients}</p>
            <p className="text-xs text-muted-foreground">Clients</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border border-amber-100 bg-white">
          <CardContent className="flex flex-col items-center py-5">
            <DollarSign className="h-7 w-7 text-amber-600 mb-2" />
            <p className="text-2xl font-bold">{loading ? <Skeleton className="h-6 w-12" /> : `$${stats.revenue}`}</p>
            <p className="text-xs text-muted-foreground">Revenue</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <Card className="shadow-sm border border-amber-100 bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <UpcomingAppointmentList 
              bookings={bookings.filter(b => b.status !== "completed" && b.status !== "cancelled")}
              loading={loading}
              limit={3}
            />
            {!loading && bookings.filter(b => b.status !== "completed" && b.status !== "cancelled").length > 0 && (
              <div className="pt-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/bookings")}
                >
                  View All Bookings
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Services */}
        <Card className="shadow-sm border border-amber-100 bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Your Services</CardTitle>
          </CardHeader>
          <CardContent>
            <ServicesList
              services={services}
              loading={loading}
              limit={3}
            />
            <div className="pt-4">
              <Button
                variant={services.length > 0 ? "outline" : "default"}
                className="w-full"
                onClick={() => navigate("/services/setup")}
              >
                {services.length > 0 ? "Manage Services" : "Add Your First Service"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Availability (Link) */}
      <Card className="shadow-sm border border-amber-100 bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Availability Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Set your working hours and block off time when you're unavailable to ensure your booking calendar stays organized.
          </p>
          <Button
            className="w-full sm:w-auto"
            onClick={() => navigate("/availability")}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Manage Availability
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
