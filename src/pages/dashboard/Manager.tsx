
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/auth";
import ManagerGreetingHeader from "@/components/dashboard/salon/manager/ManagerGreetingHeader";
import TeamOverviewCard from "@/components/dashboard/salon/manager/TeamOverviewCard";
import BookingsOverviewCard from "@/components/dashboard/salon/manager/BookingsOverviewCard";
import InternalNotesCard from "@/components/dashboard/salon/manager/InternalNotesCard";
import QuickToolsCard from "@/components/dashboard/salon/manager/QuickToolsCard";

// Responsive grid: 2-col on md+, stacked on mobile
export default function ManagerDashboard() {
  const { userProfile } = useAuth();

  return (
    <Layout>
      <div className="container max-w-5xl mx-auto px-2 py-8">
        <ManagerGreetingHeader userProfile={userProfile} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BookingsOverviewCard />
          <TeamOverviewCard />
          <QuickToolsCard />
          <InternalNotesCard />
        </div>
      </div>
    </Layout>
  );
}
