
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Artists = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div 
          className="flex flex-col items-center text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold font-serif tracking-wide mb-6">Welcome, Artist!</h1>
          <p className="text-lg text-gray-600 mb-8 font-sans leading-relaxed">
            Set up your professional profile and showcase your portfolio to attract new clients.
            Connect with salons looking for talented artists like you and find opportunities that match your skills.
          </p>
          <Link to="/profile">
            <Button size="lg" className="font-medium px-8">
              Set Up Your Profile
            </Button>
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Artists;
