
import React from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { PortfolioManager } from "@/components/dashboard/artist/portfolio/PortfolioManager";
import { Helmet } from "react-helmet-async";

const PortfolioManagerPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Portfolio Manager | EmviApp</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 py-8"
      >
        <PortfolioManager />
      </motion.div>
    </Layout>
  );
};

export default PortfolioManagerPage;
