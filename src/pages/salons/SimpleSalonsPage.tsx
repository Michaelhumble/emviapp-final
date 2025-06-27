
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Job } from '@/types/job';

const SimpleSalonsPage = () => {
  // Mock salon data
  const salonListings: Job[] = [
    {
      id: "salon-1",
      title: "Beautiful Nail Salon",
      company: "Golden Nails & Spa",
      location: "Houston, TX",
      description: "Established nail salon in busy shopping center.",
      image: "/salon-banner.png",
      price: "$120,000",
      created_at: new Date().toISOString(),
      is_featured: true,
      category: "Salon" // Added category
    },
    {
      id: "salon-2", 
      title: "Premium Salon & Spa",
      company: "Luxury Beauty Lounge",
      location: "Los Angeles, CA",
      description: "High-end salon and spa with established clientele.",
      image: "/salon-banner.png",
      price: "$250,000",
      created_at: new Date().toISOString(),
      is_featured: false,
      category: "Spa" // Added category
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Salons for Sale</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {salonListings.map((salon) => (
            <div key={salon.id} className="bg-white rounded-lg border shadow-sm overflow-hidden">
              {salon.image && (
                <img 
                  src={salon.image} 
                  alt={salon.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{salon.title}</h3>
                <p className="text-gray-600 mb-2">{salon.location}</p>
                <p className="text-gray-500 text-sm mb-4">{salon.description}</p>
                {salon.price && (
                  <p className="text-2xl font-bold text-green-600">{salon.price}</p>
                )}
                {salon.category && (
                  <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                    {salon.category}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SimpleSalonsPage;
