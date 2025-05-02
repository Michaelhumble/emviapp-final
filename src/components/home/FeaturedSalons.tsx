
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { getFeaturedSalons } from "@/utils/featuredContent";
import { useEffect, useState } from "react";
import { Salon } from "@/types/salon";
import ValidatedSalonCard from "@/components/salons/ValidatedSalonCard";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const FeaturedSalons = () => {
  const [salons, setSalons] = useState<Salon[]>([]);
  
  useEffect(() => {
    // Get featured salons while preserving ALL original image URLs
    const featuredSalons = getFeaturedSalons(3);
    
    // Ensure we preserve all original image URLs
    setSalons(featuredSalons);
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Beauty Salons</h2>
          <p className="text-lg text-gray-600">
            Discover exceptional salons with opportunities for talented beauty professionals
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {salons.map((salon) => (
            <motion.div key={salon.id} variants={item}>
              <Link to={`/salons/${salon.id}`} className="block h-full">
                <ValidatedSalonCard salon={salon} listingType="salon" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-14 text-center">
          <Link to="/salons">
            <Button size="lg" variant="outline" className="font-medium">
              Explore All Salons
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedSalons;
