
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const ArtistCallout = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/20 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src="https://images.unsplash.com/photo-1519014816548-bf5fe059798b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Nail artist at work"
              className="rounded-lg shadow-xl"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Behind Every Set of Nails is a Hustle</h2>
            <p className="text-lg text-gray-600 mb-8">
              You don't have to hustle alone. EmviApp is here to support you with consistent clients, 
              fair compensation, and career growth opportunities.
            </p>
            <Link to="/auth/signup">
              <Button size="lg" className="font-medium px-8">
                Join as an Artist
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ArtistCallout;
