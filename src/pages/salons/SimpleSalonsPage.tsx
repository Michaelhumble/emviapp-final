
import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { vietnameseSalonListings } from '@/data/vietnameseSalonListings';
import { salonListings } from '@/data/salonData';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import ValidatedSalonCard from '@/components/salons/ValidatedSalonCard';
import SalonListings from '@/components/salons/SalonListings';
import { Job } from '@/types/job';
import { ArrowRight } from 'lucide-react';
import jobsData from '@/data/jobsData';

/**
 * Main Salon Listings Page Component with all sections restored
 */
const SimpleSalonsPage = () => {
  const regularListings = salonListings.filter(salon => !salon.is_vietnamese_listing);
  // Convert job listings to the expected format for SalonListings component
  const jobListingsForSalons: Job[] = jobsData.map(job => ({
    id: job.id.toString(),
    title: job.title,
    company: job.company,
    location: job.location,
    description: job.description,
    image: job.image,
    price: job.salary || job.price || '0',
    created_at: new Date().toISOString(),
    is_featured: job.featured || false
  }));

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
          
          {/* Premium Listings Section - KEPT at the top as requested */}
          <div className="mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-3">
              Premium Salon Listings
            </h2>
            <p className="text-gray-600 max-w-2xl mb-8">
              Browse our curated selection of premium salons for sale. Each listing represents 
              a unique opportunity in the beauty industry.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularListings.map((salon) => (
                <ValidatedSalonCard key={salon.id} salon={salon} listingType="salon" />
              ))}
            </div>
          </div>
          
          {/* RESTORED: Vietnamese Community Listings Section */}
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
            
            <div className="mt-8 text-center">
              <Link to="/vietnamese-salon-listings">
                <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                  Xem Tất Cả Tin Đăng <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          
          {/* RESTORED: General Salon Listings & Jobs */}
          <div className="mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-3">
              U.S. Salons & Booths For Sale
            </h2>
            <p className="text-gray-600 max-w-2xl mb-8">
              Browse current salon and booth rental listings across the United States.
              Contact owners directly to inquire about these business opportunities.
            </p>
            
            <SalonListings salonsForSale={jobListingsForSalons} />
            
            <div className="mt-8 text-center">
              <Link to="/marketplace">
                <Button>
                  View All Listings <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          
          {/* RESTORED: Nail Jobs Section */}
          <div className="mb-16 bg-gray-50 p-8 rounded-xl">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-3">
              Nail Technician & Beauty Jobs
            </h2>
            <p className="text-gray-600 mb-8">
              Find employment opportunities at top nail salons and beauty establishments.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {jobsData.slice(0, 3).map((job) => (
                <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  <div className="aspect-video bg-gray-100 relative">
                    <ImageWithFallback
                      src={job.image}
                      alt={job.title}
                      className="w-full h-full object-cover"
                    />
                    {job.featured && (
                      <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    <p className="text-gray-500 mb-3">{job.company} • {job.location}</p>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                    <Link to={`/jobs/${job.id}`} className="text-primary font-medium hover:underline inline-flex items-center">
                      View Position <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Link to="/jobs">
                <Button variant="outline">
                  Browse All Jobs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SimpleSalonsPage;
