
import { motion } from "framer-motion";

const StatsSection = () => {
  return (
    <section className="bg-white py-12 border-y border-gray-100">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {[
            { label: "Beauty Professionals", value: "15,000+" },
            { label: "Active Job Listings", value: "2,500+" },
            { label: "Business Opportunities", value: "3,800+" },
            { label: "Hiring Success Rate", value: "92%" },
          ].map((stat, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-2xl md:text-3xl font-serif font-bold text-primary mb-1">
                {stat.value}
              </span>
              <span className="text-sm text-gray-500">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
