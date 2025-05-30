import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Container } from "@/components/ui/container";
import { Job } from "@/types/job";
import { JobDetailModal } from "@/components/jobs/JobDetailModal";
import SalonImageBanner from "@/components/salons/SalonImageBanner";
import DatabaseSalonListingsSection from "@/components/salons/DatabaseSalonListingsSection";

const SalonsFinal: React.FC = () => {
  const [selectedSalon, setSelectedSalon] = useState<Job | null>(null);

  // EXISTING STATIC/PROTECTED SALON DATA - PRESERVED 100%
  const salonsForSale: Job[] = [
    {
      id: "101",
      title: "Established Nail Salon in Westminster, CA",
      company: "Westminster Nails & Spa",
      location: "Westminster, CA",
      description: "Profitable nail salon in prime location. Established clientele, modern equipment. Perfect investment opportunity.",
      price: "$85,000",
      square_feet: "1,200 sq ft",
      created_at: new Date("2024-01-15").toISOString(),
      salary_range: "$85,000",
      employment_type: "Business Sale",
      contact_info: {
        phone: "(714) 555-0123",
        email: "contact@westminsternails.com"
      },
      image: "/lovable-uploads/7af46f7a-c8f1-497f-a8e6-271856b882eb.png"
    },
    {
      id: "102", 
      title: "Luxury Salon & Spa in Beverly Hills",
      company: "Beverly Hills Beauty Lounge",
      location: "Beverly Hills, CA",
      description: "High-end salon and spa serving celebrity clientele. Premium location on Rodeo Drive with established reputation.",
      price: "$450,000",
      square_feet: "2,800 sq ft",
      created_at: new Date("2024-01-10").toISOString(),
      salary_range: "$450,000",
      employment_type: "Business Sale",
      contact_info: {
        phone: "(310) 555-0456",
        email: "info@bhbeautylounge.com"
      },
      image: "/lovable-uploads/b8dd2904-7dc6-412d-89be-c962ca4ae5f8.png"
    },
    {
      id: "103",
      title: "Hair Salon with Loyal Customers",
      company: "Scissors & Style",
      location: "San Jose, CA", 
      description: "Established hair salon with 15+ years of loyal customers. Great opportunity for experienced stylist to take over.",
      price: "$65,000",
      square_feet: "900 sq ft",
      created_at: new Date("2024-01-08").toISOString(),
      salary_range: "$65,000",
      employment_type: "Business Sale",
      contact_info: {
        phone: "(408) 555-0789",
        email: "sales@scissorsandstyle.com"
      },
      image: "/lovable-uploads/d98977ed-9565-4629-b2e7-fc4cf3f93a7f.png"
    },
    {
      id: "104",
      title: "Modern Barbershop in Downtown LA",
      company: "Metro Cuts Barbershop",
      location: "Los Angeles, CA",
      description: "Trendy barbershop in busy downtown location. Modern fixtures, great foot traffic, established customer base.",
      price: "$95,000",
      square_feet: "1,100 sq ft", 
      created_at: new Date("2024-01-05").toISOString(),
      salary_range: "$95,000",
      employment_type: "Business Sale",
      contact_info: {
        phone: "(213) 555-0321",
        email: "info@metrocuts.com"
      },
      image: "/lovable-uploads/fa1b4f95-ebc9-452c-a18b-9d4e78db84bb.png"
    },
    {
      id: "105",
      title: "Full-Service Beauty Salon",
      company: "Glamour Palace",
      location: "Orange County, CA",
      description: "Complete beauty destination offering hair, nails, skincare, and spa services. Turn-key operation ready for new owner.",
      price: "$175,000",
      square_feet: "2,000 sq ft",
      created_at: new Date("2024-01-03").toISOString(),
      salary_range: "$175,000", 
      employment_type: "Business Sale",
      contact_info: {
        phone: "(714) 555-0654",
        email: "contact@glamourpalace.com"
      },
      image: "/lovable-uploads/5a1ba245-85f7-4036-95f9-0e08ada34602.png"
    },
    {
      id: "106",
      title: "Boutique Spa & Wellness Center",
      company: "Serenity Spa",
      location: "Malibu, CA",
      description: "Peaceful spa retreat offering massage, facials, and wellness treatments. Established clientele in upscale area.",
      price: "$225,000",
      square_feet: "1,800 sq ft",
      created_at: new Date("2024-01-01").toISOString(),
      salary_range: "$225,000",
      employment_type: "Business Sale", 
      contact_info: {
        phone: "(310) 555-0987",
        email: "hello@serenityspa.com"
      },
      image: "/lovable-uploads/362c9477-1040-49d9-a35a-639dc7d4d856.png"
    }
  ];

  const handleViewDetails = (salon: Job) => {
    setSelectedSalon(salon);
  };

  const handleCloseModal = () => {
    setSelectedSalon(null);
  };

  return (
    <>
      <Helmet>
        <title>Salons for Sale | EmviApp</title>
        <meta 
          name="description" 
          content="Browse salon businesses for sale. Find profitable nail salons, hair salons, spas and beauty businesses for purchase."
        />
      </Helmet>

      <Container className="py-8 max-w-7xl">
        {/* Hero Banner */}
        <SalonImageBanner />
        
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Salons for Sale</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover profitable beauty business opportunities. Browse established salons, 
            spas, and beauty centers ready for new ownership.
          </p>
        </div>

        {/* EXISTING STATIC SALON LISTINGS - PRESERVED 100% */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {salonsForSale.map((salon) => (
            <div key={salon.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gray-100">
                <img
                  src={salon.image || '/placeholder.svg'}
                  alt={salon.company}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{salon.company}</h3>
                <p className="text-gray-600 mb-3 flex items-center">
                  📍 {salon.location}
                </p>
                <p className="text-gray-700 mb-4 line-clamp-3">{salon.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-green-600">{salon.price}</span>
                  <span className="text-sm text-gray-500">{salon.square_feet}</span>
                </div>
                <button
                  onClick={() => handleViewDetails(salon)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* NEW: DATABASE SALON LISTINGS SECTION - ADDED BELOW ALL STATIC CONTENT */}
        <DatabaseSalonListingsSection onViewDetails={handleViewDetails} />
        
        {/* Salon Detail Modal */}
        {selectedSalon && (
          <JobDetailModal
            job={selectedSalon}
            isOpen={!!selectedSalon}
            onClose={handleCloseModal}
          />
        )}
      </Container>
    </>
  );
};

export default SalonsFinal;
