
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import PostYourSalonButton from "@/components/buttons/PostYourSalonButton";

const CtaSection = () => {
  return (
    <section className="bg-primary/5 py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">Start Hiring with EmviApp</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of salon owners who trust EmviApp to find, vet, and hire the best beauty professionals in the industry.
          </p>
          <PostYourSalonButton 
            size="lg" 
            className="font-medium px-8 py-6 text-base hover:scale-105 transition-transform"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
