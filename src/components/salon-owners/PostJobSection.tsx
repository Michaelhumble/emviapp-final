
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const PostJobSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="md:w-1/2">
            <div className="relative rounded-lg overflow-hidden h-72 md:h-96 shadow-xl">
              <img 
                src="/lovable-uploads/f3f2a5ae-65d9-4442-8842-1cb9e26cdb56.png"
                alt="Luxury salon interior"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent mix-blend-overlay" />
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-6">Post Your First Job For Free</h2>
            <p className="text-lg text-gray-600 mb-6">
              Create a detailed job listing with all your requirements and let our AI-powered matching system find the right candidates for you.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "Reach thousands of qualified professionals",
                "Set specific skill requirements and experience levels",
                "Review applicant portfolios and credentials",
                "Schedule interviews directly through the platform"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary font-bold mr-2">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button size="lg" className="hover:scale-105 transition-transform">Post a Job — It's Free</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PostJobSection;
