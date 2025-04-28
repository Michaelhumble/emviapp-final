
import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import SimpleSalonCard from '@/components/salons/SimpleSalonCard';
import { salonListings, vietnameseSalonListings } from '@/data/salonData';

const SimpleSalonPage = () => {
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
          <div className="mb-16 bg-gradient-to-r from-purple-50 to-white p-6 rounded-xl border border-purple-100">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-3 flex items-center gap-2">
              <span>💅</span>
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Tin Rao Vặt Tiệm Nail - Cộng Đồng Người Việt
              </span>
            </h2>
            <p className="text-gray-600 mb-6">Danh sách các tiệm nail hiện đang bán, được cập nhật thường xuyên.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {vietnameseSalonListings.map((salon) => (
                <SimpleSalonCard key={salon.id} salon={salon} />
              ))}
            </div>
          </div>

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
