
import DashboardRedirect from "@/components/dashboard/redirect/DashboardRedirect";

/**
 * Dashboard component that handles user redirection based on role
 * It's now just a wrapper around the DashboardRedirect component
 */
const Dashboard = () => {
  return <DashboardRedirect />;
};

export default Dashboard;
