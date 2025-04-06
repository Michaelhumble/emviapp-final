
import { Search, Filter, LineChart } from "lucide-react";
import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";

const FeaturesSection = () => {
  const features = [
    {
      icon: Search,
      title: "Instant Job Listings",
      description: "Create detailed job listings in minutes and reach thousands of qualified beauty professionals."
    },
    {
      icon: Filter,
      title: "Artist Filtering",
      description: "Find the perfect candidate using advanced filters for skills, location, experience, and availability."
    },
    {
      icon: LineChart,
      title: "AI Recommendations",
      description: "Our AI analyzes thousands of profiles to find candidates that best match your salon's needs."
    }
  ];

  return (
    <section className="bg-[#FDFDFD] py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-3">How EmviApp Helps You</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform helps salon owners build the perfect team with ease.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
