
import React from "react";
import Layout from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import ArtistPortfolioManager from "@/components/dashboard/artist/portfolio/ArtistPortfolioManager";
import PortfolioHero from "@/components/dashboard/artist/portfolio/PortfolioHero";

const PortfolioManagerPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Portfolio Manager | EmviApp</title>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <PortfolioHero artistName="Artist" />
        <ArtistPortfolioManager />
      </div>
    </Layout>
  );
};

export default PortfolioManagerPage;
