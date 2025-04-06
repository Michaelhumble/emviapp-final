
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PostJob from "@/pages/PostJob";
import { useAuth } from "@/context/auth";

const CreateJobPage = () => {
  const { userProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Create Job Listing | EmviApp";
    
    // Redirect if not logged in
    if (!userProfile) {
      navigate("/auth/signin");
    }
  }, [userProfile, navigate]);

  return (
    <Layout>
      <PostJob />
    </Layout>
  );
};

export default CreateJobPage;
