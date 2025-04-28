
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { salonListings } from '@/data/salonData';

const SimpleSalonDetailPage = () => {
  const { id } = useParams();
  const salon = salonListings.find(s => s.id === id);

  if (!salon) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="font-playfair text-2xl font-bold mb-4">Salon Not Found</h1>
          <Link to="/salons">
            <Button>Return to Listings</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>{salon.name} | EmviApp</title>
        <meta name="description" content={salon.description} />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Link to="/salons" className="text-purple-600 hover:text-purple-700 mb-6 inline-block">
            ← Back to Listings
          </Link>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div 
              className="h-64 bg-cover bg-center"
              style={{ backgroundImage: `url(${salon.imageUrl})` }}
            />
            
            <div className="p-6">
              <h1 className="font-playfair text-3xl font-bold mb-2">{salon.name}</h1>
              <p className="text-gray-600 mb-4">{salon.location}</p>
              <p className="text-2xl font-semibold text-gray-800 mb-6">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                }).format(salon.price)}
              </p>
              <p className="text-gray-700">{salon.description}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SimpleSalonDetailPage;
