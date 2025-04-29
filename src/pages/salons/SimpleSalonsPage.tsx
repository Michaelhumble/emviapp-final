
import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { vietnameseSalonListings } from '@/data/vietnameseSalonListings';
import { salonListings } from '@/data/salonData';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import ValidatedSalonCard from '@/components/salons/ValidatedSalonCard';

/**
 * Main Salon Listings Page Component
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
          {/* Luxury Hero Banner with Text Overlay */}
          <div className="relative w-full mb-10 overflow-hidden rounded-lg">
            <ImageWithFallback
              src="/lovable-uploads/98f473d0-0359-4114-9bcc-c9aea3c6fcf6.png"
              alt="Luxury beauty salon entrance with FOR SALE sign"
              className="w-full h-auto object-cover"
            />
            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-playfair text-[#FAFAFA] mb-2 drop-shadow-sm">
                List Your Salon with Confidence
              </h1>
              <p className="text-xl md:text-2xl font-playfair font-normal text-[#FAFAFA] drop-shadow-sm">
                Đăng Tin Bán Tiệm với Sự Tự Tin
              </p>
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
                  <ValidatedSalonCard key={salon.id} salon={salon} listingType="salon" />
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
              <ValidatedSalonCard key={salon.id} salon={salon} listingType="salon" />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SimpleSalonsPage;
