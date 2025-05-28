
import DashboardPage from "./Dashboard";
import { ProfileCompletionProvider } from "@/context/profile/ProfileCompletionProvider";

// Wrapped exports with the Provider
const WrappedDashboardPage = () => (
  <ProfileCompletionProvider>
    <DashboardPage />
  </ProfileCompletionProvider>
);

export default WrappedDashboardPage;
