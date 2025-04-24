
import React from "react";
import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import PortfolioManager from "@/components/dashboard/artist/portfolio/PortfolioManager";

const PortfolioManagerPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Portfolio Manager | EmviApp</title>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <PortfolioManager />
      </div>
    </Layout>
  );
};

export default PortfolioManagerPage;
