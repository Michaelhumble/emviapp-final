
import React from "react";
import { motion } from "framer-motion";
import { BriefcaseBusiness, BarChart3, Users } from "lucide-react";
import FeatureCard from "./FeatureCard";

const AIFeaturesSection = () => {
  const features = [
    {
      icon: <BriefcaseBusiness className="h-10 w-10 text-primary" />,
      title: "Smart Job Matching",
      description: "Our AI matches you with salon positions and clients that align with your style, skills, and career goals."
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Auto-Generated Profiles",
      description: "Create a stunning profile in minutes with our AI-powered tools that highlight your best work."
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      title: "Boosted Visibility",
      description: "Get discovered by more clients through our intelligent recommendation algorithm."
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
            Our AI-powered platform helps you build your career and connect with clients who value your talent.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <FeatureCard 
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIFeaturesSection;
