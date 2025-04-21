
import { ProfileCompletionProvider } from "@/context/profile/ProfileCompletionProvider";
import DashboardPage from "./Dashboard";
import CreditRedemptionPage from "./CreditRedemptionPage";

// Wrapped exports with the Provider
const WrappedDashboardPage = () => (
  <ProfileCompletionProvider>
    <DashboardPage />
  </ProfileCompletionProvider>
);

const WrappedCreditRedemptionPage = () => (
  <ProfileCompletionProvider>
    <CreditRedemptionPage />
  </ProfileCompletionProvider>
);

export { WrappedCreditRedemptionPage as CreditRedemptionPage };
export default WrappedDashboardPage;
