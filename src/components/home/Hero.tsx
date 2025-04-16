import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="py-12 md:py-16 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Let's Experience EmviApp Together
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Find your dream salon, booth, or talented artist.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/salons">
              <Button size="lg" className="px-8 font-medium">
                Find a Salon
              </Button>
            </Link>
            <Link to="/jobs">
              <Button size="lg" variant="outline" className="px-8 font-medium">
                Find a Job
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
