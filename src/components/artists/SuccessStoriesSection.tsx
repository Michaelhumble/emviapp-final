
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const SuccessStoriesSection = () => {
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
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-3">Success Stories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from artists who transformed their careers using EmviApp.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden transition-all hover:shadow-lg h-full">
                <div className="relative h-56">
                  <Skeleton className="h-full w-full" />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 mr-3">
                      <Skeleton className="h-full w-full" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Sarah Johnson</h3>
                      <p className="text-xs text-gray-500">Nail Artist, 5 years on EmviApp</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 italic mb-4">
                    "EmviApp transformed my career. I've doubled my client base and increased my income by 40% in just one year."
                  </p>
                  <Button variant="ghost" size="sm" className="text-primary hover:scale-105 transition-transform">
                    Read Full Story →
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
