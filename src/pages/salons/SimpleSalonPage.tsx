
import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import SimpleSalonCard from '@/components/salons/SimpleSalonCard';
import { salonListings } from '@/data/salonData';

const SimpleSalonPage = () => {
  const vietnameseListings = salonListings.filter(salon => salon.is_vietnamese_listing);
  const regularListings = salonListings.filter(salon => !salon.is_vietnamese_listing);

  return (
    <Layout>
      <Helmet>
        <title>Premium Salon Listings | EmviApp</title>
        <meta 
          name="description" 
          content="Browse our curated selection of premium salons for sale. Find your next business opportunity with EmviApp." 
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Vietnamese Community Listings Section */}
          {vietnameseListings.length > 0 && (
            <div className="mb-16">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-3 text-purple-800">
                💅 Tin Rao Vặt Tiệm Nail - Cộng Đồng Người Việt
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {vietnameseListings.map((salon) => (
                  <SimpleSalonCard key={salon.id} salon={salon} />
                ))}
              </div>
            </div>
          )}

          {/* Regular Listings Section */}
          <div className="mb-10">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-3">
              Premium Salon Listings
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Browse our curated selection of premium salons for sale. Each listing represents 
              a unique opportunity in the beauty industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularListings.map((salon) => (
              <SimpleSalonCard key={salon.id} salon={salon} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SimpleSalonPage;
