
import Layout from "@/components/layout/Layout";
import { ManagerProfileSetup } from "@/components/manager/ManagerProfileSetup";

const ManagerSetup = () => {
  return (
    <Layout>
      <div className="container max-w-3xl py-10 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Complete Your Manager Profile</h1>
          <p className="text-muted-foreground">Set up your profile to manage your salon effectively</p>
        </div>
        
        <ManagerProfileSetup />
      </div>
    </Layout>
  );
};

export default ManagerSetup;
