
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const PortfolioSection = () => {
  const features = [
    "Upload unlimited portfolio images",
    "Highlight your specialties and services",
    "Set your rates and availability",
    "Receive direct booking requests"
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="md:w-1/2 order-2 md:order-1">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-6">Build Your Public Profile + Portfolio</h2>
            <p className="text-lg text-gray-600 mb-6">
              Showcase your work, highlight your skills, and attract your ideal clients. Our AI-powered platform matches you with clients who love your style.
            </p>
            <ul className="space-y-4 mb-8">
              {features.map((item, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button size="lg" className="hover:scale-105 transition-transform">Create Your Portfolio</Button>
          </div>
          <div className="md:w-1/2 order-1 md:order-2">
            <div className="relative rounded-lg overflow-hidden h-72 md:h-96 shadow-xl">
              <Skeleton className="h-full w-full" />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent mix-blend-overlay" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
