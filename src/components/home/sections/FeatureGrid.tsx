
import React from "react";
import { motion } from "framer-motion";
import FeatureCard, { FeatureCardProps } from "../cards/FeatureCard";

interface FeatureGridProps {
  features: Omit<FeatureCardProps, 'className'>[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const FeatureGrid: React.FC<FeatureGridProps> = ({ features }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </motion.div>
  );
};

export default FeatureGrid;
