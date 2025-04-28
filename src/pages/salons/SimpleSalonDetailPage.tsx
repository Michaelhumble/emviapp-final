
import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { salonListings } from '@/data/salonData';
import { vietnameseSalonListings } from '@/data/vietnameseSalonListings';
import { useAuth } from '@/context/auth';

const SimpleSalonDetailPage = () => {
  const { id } = useParams();
  const { isSignedIn } = useAuth();
  const location = useLocation();
  
  // First check Vietnamese listings, then regular listings
  const salon = vietnameseSalonListings.find(s => s.id === id) || 
               salonListings.find(s => s.id === id);

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

  // Use Vietnamese content when available
  const title = salon.vietnamese_title || salon.name;
  const description = salon.vietnamese_description || salon.description;
  const isVietnamese = salon.is_vietnamese_listing;
  const backToListingsText = isVietnamese ? "← Trở lại danh sách" : "← Back to Listings";

  return (
    <Layout>
      <Helmet>
        <title>{title} | EmviApp</title>
        <meta name="description" content={description} />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Link to="/salons" className="text-purple-600 hover:text-purple-700 mb-6 inline-block">
            {backToListingsText}
          </Link>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            {/* Hero image */}
            <div 
              className="h-64 bg-cover bg-center"
              style={{ backgroundImage: `url(${salon.imageUrl})` }}
            />
            
            {/* Content */}
            <div className="p-6">
              {isVietnamese && (
                <div className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  🇻🇳 Vietnamese Listing
                </div>
              )}
              
              <h1 className="font-playfair text-3xl font-bold mb-2">{title}</h1>
              <p className="text-gray-600 mb-4">{salon.location}</p>
              
              <div className="flex items-center mb-6">
                <p className="text-2xl font-semibold text-gray-800">
                  {salon.price === 0 ? "Giá thương lượng" : new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0,
                  }).format(salon.price)}
                </p>
                {salon.income_range && (
                  <span className="ml-3 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Income: {salon.income_range}
                  </span>
                )}
              </div>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-line">{description}</p>
              </div>
              
              {/* Features */}
              {salon.features && salon.features.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-semibold text-lg mb-3">
                    {isVietnamese ? "Thông tin chi tiết" : "Features"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {salon.features.map((feature, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 rounded-full px-3 py-1 text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Contact info */}
              <div className="mt-8 pt-6 border-t">
                <h3 className="font-semibold text-lg mb-3">
                  {isVietnamese ? "Liên hệ" : "Contact Information"}
                </h3>
                
                {isSignedIn && salon.contact_info ? (
                  <div className="bg-white p-4 rounded-lg border">
                    {salon.contact_info.owner_name && (
                      <p className="mb-2">
                        <span className="text-gray-500 mr-2">
                          {isVietnamese ? "Người bán:" : "Owner:"}
                        </span>
                        {salon.contact_info.owner_name}
                      </p>
                    )}
                    {salon.contact_info.phone && (
                      <p className="mb-2">
                        <span className="text-gray-500 mr-2">
                          {isVietnamese ? "Điện thoại:" : "Phone:"}
                        </span>
                        <a href={`tel:${salon.contact_info.phone}`} className="text-purple-600 hover:text-purple-800">
                          {salon.contact_info.phone}
                        </a>
                      </p>
                    )}
                    {salon.contact_info.email && (
                      <p className="mb-2">
                        <span className="text-gray-500 mr-2">Email:</span>
                        <a href={`mailto:${salon.contact_info.email}`} className="text-purple-600 hover:text-purple-800">
                          {salon.contact_info.email}
                        </a>
                      </p>
                    )}
                    {salon.contact_info.zalo && (
                      <p>
                        <span className="text-gray-500 mr-2">Zalo:</span>
                        {salon.contact_info.zalo}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-500 text-sm mb-2">
                      {isVietnamese ? "Vui lòng đăng nhập để xem thông tin liên hệ" : "Please sign in to see contact details"}
                    </p>
                    <Link to={`/sign-in?redirect=${encodeURIComponent(location.pathname)}`}>
                      <Button size="sm">
                        {isVietnamese ? "Đăng nhập" : "Sign In"}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SimpleSalonDetailPage;
