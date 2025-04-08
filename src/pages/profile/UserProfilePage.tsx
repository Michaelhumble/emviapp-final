
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import UserProfile from "@/components/profile/UserProfile";
import { useAuth } from "@/context/auth";
import { Navigate } from "react-router-dom";

const UserProfilePage = () => {
  const { user, loading } = useAuth();
  
  useEffect(() => {
    document.title = "Your Profile | EmviApp";
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
        </div>
      </Layout>
    );
  }

  if (!user && !loading) {
    return <Navigate to="/auth/signin" replace />;
  }

  return (
    <Layout>
      <UserProfile />
    </Layout>
  );
};

export default UserProfilePage;
