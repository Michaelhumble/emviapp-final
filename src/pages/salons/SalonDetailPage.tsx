
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { MapPin, Phone, Mail, ChevronLeft, ChevronRight, ArrowLeft, MessageSquare, Star } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from '@/context/auth';
import { salonListings } from '@/data/salonData'; // Import mock data
import { Salon } from '@/types/salon';

const SalonDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [salon, setSalon] = useState<Salon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    // Simulate API call with timeout
    setLoading(true);
    setTimeout(() => {
      try {
        const foundSalon = salonListings.find(s => s.id === id);
        if (foundSalon) {
          setSalon(foundSalon);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }, 800);
  }, [id]);

  // Format price as currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Handle image navigation
  const nextImage = () => {
    if (!salon) return;
    const images = salon.photos || [salon.imageUrl];
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  
  const prevImage = () => {
    if (!salon) return;
    const images = salon.photos || [salon.imageUrl];
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Display features as badges
  const renderFeatures = (features: string[] | undefined) => {
    if (!features || features.length === 0) {
      return <p className="text-gray-500">No features listed</p>;
    }
    
    return (
      <div className="flex flex-wrap gap-2">
        {features.map((feature, index) => (
          <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
            {feature}
          </Badge>
        ))}
      </div>
    );
  };

  // Contact seller handler
  const handleContactSeller = () => {
    if (!user) {
      navigate('/auth/signin', { state: { redirect: `/salons/${id}` } });
      return;
    }
    
    // For now, just use mailto
    if (salon?.email) {
      window.location.href = `mailto:${salon.email}?subject=Inquiry about ${salon.name}`;
    }
  };

  // Handle loading state
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="mb-6">
            <Skeleton className="h-8 w-32" />
          </div>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <Skeleton className="h-96 w-full" />
            <div className="p-6">
              <Skeleton className="h-10 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/2 mb-4" />
              <Skeleton className="h-8 w-1/4 mb-6" />
              <Skeleton className="h-32 w-full mb-6" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-1 md:col-span-2">
                  <Skeleton className="h-6 w-32 mb-3" />
                  <Skeleton className="h-24 w-full mb-6" />
                  
                  <Skeleton className="h-6 w-32 mb-3" />
                  <div className="flex flex-wrap gap-2 mb-6">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Skeleton key={i} className="h-8 w-24" />
                    ))}
                  </div>
                </div>
                
                <div>
                  <Skeleton className="h-64 w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Handle error state
  if (error || !salon) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="max-w-lg mx-auto">
            <h1 className="font-playfair text-3xl font-bold mb-4">Salon Not Found</h1>
            <p className="text-gray-600 mb-8">
              We couldn't find the salon you're looking for. It may have been removed or the URL might be incorrect.
            </p>
            <Link to="/salons">
              <Button>Return to Salon Listings</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Mock salon features if not available
  const salonFeatures = salon.features || [
    "Turnkey Business", 
    "Parking Available", 
    "Loyal Client Base",
    "Prime Location",
    "Recently Renovated"
  ];

  // Get images (use photos array or fallback to single image)
  const images = salon.photos || [salon.imageUrl];
  const currentImage = images[currentImageIndex];

  return (
    <Layout>
      <Helmet>
        <title>{salon.name} | EmviApp Salon Marketplace</title>
        <meta name="description" content={`${salon.name} - ${salon.description?.substring(0, 160)}`} />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link to="/salons" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Salon Listings
        </Link>
        
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border">
          {/* Image Gallery */}
          <div className="relative h-96">
            <img 
              src={currentImage} 
              alt={salon.name} 
              className="w-full h-full object-cover"
            />
            
            {images.length > 1 && (
              <>
                <button 
                  onClick={prevImage} 
                  className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 p-2 rounded-full text-gray-800 hover:bg-white transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button 
                  onClick={nextImage} 
                  className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 p-2 rounded-full text-gray-800 hover:bg-white transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute bottom-4 right-4 bg-black/60 px-3 py-1 rounded-full text-white text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
            
            {/* Featured Badge */}
            {salon.featured && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-amber-500 text-white border-amber-500 px-3 py-1">
                  <Star className="h-3 w-3 mr-1 fill-white" /> Featured
                </Badge>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap justify-between items-start mb-6">
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">{salon.name}</h1>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span>{salon.location}</span>
                </div>
              </div>
              <div className="mt-2 md:mt-0">
                <div className="text-2xl md:text-3xl font-semibold text-purple-800">
                  {formatPrice(salon.price)}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-1 md:col-span-2">
                {/* Description */}
                <section className="mb-8">
                  <h2 className="font-serif text-xl font-semibold mb-3">Description</h2>
                  <div className="prose max-w-none text-gray-700">
                    <p>{salon.description}</p>
                  </div>
                </section>
                
                {/* Features */}
                <section className="mb-8">
                  <h2 className="font-serif text-xl font-semibold mb-3">Salon Features</h2>
                  {renderFeatures(salonFeatures)}
                </section>
              </div>
              
              {/* Sidebar */}
              <div className="col-span-1">
                {/* Contact Card */}
                <Card className="p-5 mb-6 bg-gradient-to-br from-purple-50 to-white">
                  <h3 className="font-serif text-lg font-semibold mb-4">Contact Information</h3>
                  
                  {user ? (
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-3 text-purple-600" />
                        <span>{salon.phone || "(555) 123-4567"}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-3 text-purple-600" />
                        <span>{salon.email || "contact@" + salon.name.toLowerCase().replace(/\s+/g, '') + ".com"}</span>
                      </div>
                      <Button 
                        onClick={handleContactSeller}
                        className="w-full mt-2 bg-gradient-to-r from-purple-600 to-purple-800"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contact Seller
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-600 mb-4">Sign in to view contact details</p>
                      <Link to="/auth/signin">
                        <Button variant="outline" className="w-full">
                          Sign In
                        </Button>
                      </Link>
                    </div>
                  )}
                </Card>
                
                {/* Google Map (mock) */}
                <Card className="overflow-hidden">
                  <div className="aspect-video bg-gray-200 flex items-center justify-center">
                    <div className="text-center p-4">
                      <MapPin className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-600">
                        Map view for {salon.location}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SalonDetailPage;
