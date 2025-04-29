
import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { vietnameseSalonListings } from '@/data/vietnameseSalonListings';
import SimpleSalonCard from '@/components/salons/SimpleSalonCard';
import { salonListings } from '@/data/salonData';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

/**
 * Main Salon Listings Page Component
 * IMPORTANT: This component is locked as part of the salon listings stabilization.
 * Do not modify the Vietnamese content or layout without explicit request.
 */
const SimpleSalonsPage = () => {
  const regularListings = salonListings.filter(salon => !salon.is_vietnamese_listing);

  return (
    <Layout>
      <Helmet>
        <title>Tiệm Nail Đang Bán | EmviApp</title>
        <meta 
          name="description" 
          content="Danh sách các tiệm nail hiện đang bán. Tìm cơ hội kinh doanh mới với EmviApp." 
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Luxury Hero Banner - Image Removed */}
          <div className="relative w-full mb-10 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center" style={{ aspectRatio: '1920/1080' }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-center px-4 space-y-8">
                <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-gray-800 font-medium tracking-wide">
                  List Your Salon
                </h1>
                <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-gray-700 font-medium tracking-wide">
                  With Confidence
                </h2>
                <div className="pt-8">
                  <Link to="/salon-listing">
                    <Button 
                      className="bg-transparent hover:bg-transparent/10 text-gray-800 border border-gray-500 rounded-full px-10 py-6 text-lg font-medium transition-all"
                    >
                      List Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Vietnamese Community Listings Section */}
          <div className="mb-16 bg-gradient-to-r from-purple-50 to-white p-8 rounded-xl border border-purple-200 shadow-sm">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-3 flex items-center gap-2 text-purple-800">
              <span>💅</span>
              <span>Tin Rao Vặt Tiệm Nail - Cộng Đồng Người Việt</span>
            </h2>
            <p className="text-gray-600 mb-6 text-lg">Danh sách các tiệm nail hiện đang bán, được cập nhật thường xuyên.</p>
            
            {vietnameseSalonListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {vietnameseSalonListings.map((salon) => (
                  <SimpleSalonCard key={salon.id} salon={salon} />
                ))}
              </div>
            ) : (
              <div className="bg-purple-50 p-6 rounded-lg text-center">
                <p className="text-purple-700">Chưa có tin đăng nào. Vui lòng quay lại sau.</p>
              </div>
            )}
          </div>

          {/* Regular Listings Section */}
          <div className="mt-16 mb-10">
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

export default SimpleSalonsPage;
