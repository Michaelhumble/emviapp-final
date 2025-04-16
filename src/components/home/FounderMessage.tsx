
import { motion } from "framer-motion";

const FounderMessage = () => {
  return (
    <section className="py-6 md:py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.blockquote 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-lg italic text-gray-700 mb-3"
          >
            "EmviApp is a movement to empower beauty professionals. We're redefining success — together."
          </motion.blockquote>
          <div className="text-gray-500 font-medium">
            — Michael Nguyen, Creator of EmviApp
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderMessage;
