
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight tracking-tight">Featured Beauty Salons</h2>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-primary">
            Discover exceptional salons with opportunities for talented beauty professionals
          </p>
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
