
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const EmotionalTrust = () => {
  return (
    <section className="bg-[#FDFDFD] py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">You Hustle with Heart. We Power That Hustle.</h2>
          <p className="text-lg text-gray-600 mb-8">
            Everything about EmviApp was built for people like you. We don't just connect — we care.
          </p>
          <Link to="/sign-up">
            <Button size="lg" className="font-medium px-8 py-6 text-base">
              Get Started — Free Forever
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default EmotionalTrust;
