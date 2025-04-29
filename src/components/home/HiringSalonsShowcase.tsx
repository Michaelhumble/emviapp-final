
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Building } from "lucide-react";
import { useAuth } from "@/context/auth";
import { v4 as uuidv4 } from "uuid";
import ValidatedSalonCard from "../salons/ValidatedSalonCard";

// Enhanced salon data with verified images and IDs
const hiringSalons = [
  {
    id: "salon-1",
    name: "Salon Envy",
    location: "Atlanta, GA",
    rating: "4.9",
    isNail: true,
    isHiring: true,
    specialty: "Full Service Salon",
    image: "/lovable-uploads/2951176b-68c9-45d6-8bc5-20513e72d0a3.png", // Luxury makeup salon with black chairs
    price: 0, // Added missing price field
    description: "Luxury makeup salon with premium services", // Added missing description
    imageUrl: "/lovable-uploads/2951176b-68c9-45d6-8bc5-20513e72d0a3.png" // Added missing imageUrl
  },
  {
    id: "salon-2",
    name: "Luxe Beauty Bar",
    location: "Los Angeles, CA",
    rating: "4.8",
    isNail: true,
    isHiring: true,
    specialty: "Nail Spa",
    image: "", // Will use fallback image
    price: 0, // Added missing price field
    description: "Premium nail spa with top-tier services", // Added missing description
    imageUrl: "" // Added missing imageUrl
  },
  {
    id: "salon-3",
    name: "The Nail Boutique",
    location: "New York, NY",
    rating: "5.0",
    isNail: true,
    isHiring: true,
    specialty: "Nail Art Studio",
    image: "/lovable-uploads/c540558f-09db-483f-b844-bacb8824f789.png", // Gold-accented luxury spa
    price: 0, // Added missing price field
    description: "Specializing in custom nail art and designs", // Added missing description
    imageUrl: "/lovable-uploads/c540558f-09db-483f-b844-bacb8824f789.png" // Added missing imageUrl
  }
];

// Verify each salon has a valid ID
const validatedSalons = hiringSalons.map(salon => {
  if (!salon.id || salon.id === 'null' || salon.id === 'undefined') {
    return {
      ...salon,
      id: `salon-${uuidv4().slice(0, 8)}`
    };
  }
  return salon;
});

// Convert to Salon type
const salonListings = validatedSalons.map(salon => ({
  id: salon.id,
  name: salon.name,
  location: salon.location,
  image: salon.image,
  imageUrl: salon.imageUrl, // Ensure imageUrl is included
  description: salon.description, // Ensure description is included
  price: 0, // Ensure price is included as a number
  rating: parseFloat(salon.rating),
  isHiring: salon.isHiring,
  specialty: salon.specialty,
  featured: false // Add featured property
}));

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

const HiringSalonsShowcase = () => {
  const { isSignedIn } = useAuth();
  
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nail & Beauty Salons Hiring Now</h2>
          <p className="text-lg text-gray-600">
            Connect with top salons looking for talented beauty professionals like you
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {salonListings.map((salon) => (
            <motion.div key={salon.id} variants={item}>
              <ValidatedSalonCard salon={salon} listingType="salon" />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-14 text-center">
          <Link to="/salons">
            <Button size="lg" variant="outline" className="font-medium">
              <Building className="mr-2 h-4 w-4" />
              Explore All Salons
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HiringSalonsShowcase;
