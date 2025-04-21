
import FreelancerDashboardLayout from "@/components/dashboard/freelancer/FreelancerDashboardLayout";
import FreelancerPerformanceOverview from "@/components/dashboard/freelancer/widgets/FreelancerPerformanceOverview";
import FreelancerServicesManagement from "@/components/dashboard/freelancer/widgets/FreelancerServicesManagement";
import FreelancerShareProfile from "@/components/dashboard/freelancer/widgets/FreelancerShareProfile";
import FreelancerAvailabilityEditor from "@/components/dashboard/freelancer/widgets/FreelancerAvailabilityEditor";
import FreelancerClientMessages from "@/components/dashboard/freelancer/widgets/FreelancerClientMessages";

export default function FreelancerDashboard() {
  return (
    <FreelancerDashboardLayout>
      <FreelancerPerformanceOverview />
      <FreelancerServicesManagement />
      <FreelancerShareProfile />
      {/* Optional sections below. Can be moved/removed as needed */}
      <FreelancerAvailabilityEditor />
      <FreelancerClientMessages />
    </FreelancerDashboardLayout>
  );
}
