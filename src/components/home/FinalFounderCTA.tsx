
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FinalFounderCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-violet-50 to-white">
      <motion.div 
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Ready to Transform Your Beauty Career?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of artists, salon owners, and beauty enthusiasts who've found success with EmviApp.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth/signup">
              <Button size="lg" className="font-medium px-6">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/salons">
              <Button size="lg" variant="outline" className="font-medium">
                Explore Services
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FinalFounderCTA;
