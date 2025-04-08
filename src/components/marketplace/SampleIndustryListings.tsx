
import { motion } from "framer-motion";
import IndustryTabs from "./industry-listings/IndustryTabs";

const SampleIndustryListings = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-2">
            Sample Industry Listings
          </h2>
          <p className="text-gray-600">
            Browse example listings across various industries. These are sample listings for demonstration purposes only.
          </p>
        </div>
        
        <IndustryTabs />
      </div>
    </div>
  );
};

export default SampleIndustryListings;
