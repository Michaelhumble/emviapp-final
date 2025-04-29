
import React from "react";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";
import SalonsForSale from "@/components/home/SalonsForSale";
import JobsHighlight from "@/components/home/JobsHighlight";
import FreelancersHighlight from "@/components/home/FreelancersHighlight";
import ArtistCallout from "@/components/home/ArtistCallout";
import TrustFirstPanel from "@/components/home/TrustFirstPanel";
import { Helmet } from "react-helmet";
import AIPowerhouse from "@/components/home/AIPowerhouse";
import MissingPieceSection from "@/components/home/missing-piece";
import OpportunitiesSection from "@/components/home/opportunities/OpportunitiesSection";
import { useEffect } from "react";

const HomePage: React.FC = () => {
  useEffect(() => {
    console.log("HomePage rendered");
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>EmviApp - Beauty Industry Connection Platform</title>
        <meta
          name="description"
          content="EmviApp connects beauty professionals with salon owners. Find jobs, hire talent, buy or sell salons, and grow your beauty business."
        />
      </Helmet>
      
      {/* Removed the PremiumSalonBanner from homepage */}
      
      <Hero />
      <TrustFirstPanel />
      <OpportunitiesSection />
      <MissingPieceSection />
      <Features />
      <SalonsForSale />
      <JobsHighlight />
      <FreelancersHighlight />
      <AIPowerhouse />
      <ArtistCallout />
      <Testimonials />
      <CallToAction />
    </Layout>
  );
};

export default HomePage;
