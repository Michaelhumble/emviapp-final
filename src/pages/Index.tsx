
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import FeaturedSalons from "@/components/home/FeaturedSalons";
import JobsHighlight from "@/components/home/JobsHighlight";
import ArtistCallout from "@/components/home/ArtistCallout";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";
import CustomerDashboard from "@/components/customer/CustomerDashboard";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { user } = useAuth();
  
  return (
    <Layout>
      <Hero />
      {user && user.email ? <CustomerDashboard /> : null}
      <FeaturedSalons />
      <JobsHighlight />
      <CustomerDashboard />
      <ArtistCallout />
      <Testimonials />
      <CallToAction />
    </Layout>
  );
};

export default Index;
