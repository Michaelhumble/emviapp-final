
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Customers = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div 
          className="flex flex-col items-center text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold font-serif tracking-wide mb-6">Welcome, Beauty Client!</h1>
          <p className="text-lg text-gray-600 mb-8 font-sans leading-relaxed">
            Discover top-rated beauty professionals in your area and book appointments with ease. 
            Get personalized recommendations based on your preferences and past services.
          </p>
          <Link to="/profile">
            <Button size="lg" className="font-medium px-8">
              View Your Profile
            </Button>
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Customers;
