
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const JobMatchesSection = () => {
  const jobMatches = [
    { title: "Full-time Nail Tech", location: "Diamond Nails, San Francisco", salary: "$65,000 - $85,000/year" },
    { title: "Booth Rental Available", location: "Glam Studio, Los Angeles", price: "$250/week, flexible hours" },
    { title: "Part-time Nail Artist", location: "Polish Perfect, New York", salary: "$30-45/hour + tips" }
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-3">AI Job Matches & Booth Rentals</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover jobs and rental opportunities that match your career goals and lifestyle.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobMatches.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden transition-all hover:shadow-lg h-full">
                <div className="relative h-36 bg-gray-100">
                  <Skeleton className="h-full w-full" />
                  <div className="absolute top-3 right-3 bg-primary text-white text-xs py-1 px-3 rounded-full">
                    New Opportunity
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{item.location}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">{item.salary || item.price}</span>
                    <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button variant="outline" className="mx-auto hover:bg-primary/5">
            View All Opportunities
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JobMatchesSection;
