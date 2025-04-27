
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const Error404: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="mb-8">The page you're looking for doesn't exist.</p>
        <Link to="/" className="text-primary hover:underline">
          Go back to homepage
        </Link>
      </div>
    </Layout>
  );
};

export default Error404;
