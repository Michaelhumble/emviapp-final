import { motion } from "framer-motion";

const FounderMessage = () => {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="text-lg md:text-xl italic text-gray-700 mb-4">
            "EmviApp isn't just a platform; it's a movement towards empowering beauty professionals and salon owners alike. We're here to redefine success, together."
          </blockquote>
          <div className="text-gray-500 font-medium">
            - Anh Nguyen, Founder of EmviApp
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderMessage;
