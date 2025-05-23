
import React from "react";
import { Helmet } from "react-helmet";
import JobPostingWizard from "@/components/posting/job/JobPostingWizard";
import { useAuth } from "@/context/auth";

const PostJobPage = () => {
  const { user } = useAuth();

  return (
    <>
      <Helmet>
        <title>Post a Job | EmviApp</title>
        <meta name="description" content="Post a job on EmviApp to find skilled professionals for your salon." />
      </Helmet>

      <main>
        {user ? (
          <JobPostingWizard />
        ) : (
          <div className="container max-w-4xl py-16 text-center">
            <h1 className="text-2xl font-bold mb-4">Sign In Required</h1>
            <p className="mb-8">Please sign in to post a job listing.</p>
            <a href="/login" className="inline-block bg-primary text-white px-6 py-2 rounded-md">
              Sign In
            </a>
          </div>
        )}
      </main>
    </>
  );
};

export default PostJobPage;
