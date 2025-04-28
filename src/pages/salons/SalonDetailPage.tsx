
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { 
  MapPin, 
  DollarSign, 
  Check, 
  ArrowLeft, 
  Phone, 
  Mail,
  Globe,
  ChevronLeft, 
  ChevronRight,
  MessageSquare 
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { salonListings } from '@/data/salonData';
import { useAuth } from '@/context/auth';
import AuthAction from '@/components/common/AuthAction';
import MapContainer from '@/components/map/MapContainer';

const SalonDetailPage = () => {
  const { id } = useParams();
  const salon = salonListings.find(s => s.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { isSignedIn } = useAuth();
  const { toast } = useToast();

  const handleContactSeller = async () => {
    // This would be replaced with actual functionality to contact the seller
    toast({
      title: "Contact request sent",
      description: "The salon owner will get back to you shortly."
    });
    return true;
  };

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

  // For demo purposes, let's create some mock data that might not be in all salon listings
  const salonFeatures = salon.features || [
    "Turnkey Business", 
    "Parking Available", 
    "Loyal Client Base", 
    "Equipment Included", 
    "Great Location"
  ];
  
  const salonPhotos = salon.photos || [
    salon.imageUrl, 
    "https://images.unsplash.com/photo-1560066984-138dadb4c035",
    "https://images.unsplash.com/photo-1600948836101-f9ffda59d250",
    "https://images.unsplash.com/photo-1633681926022-84c23e8cb3d6"
  ];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === salonPhotos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? salonPhotos.length - 1 : prevIndex - 1
    );
  };

  // Mock map coordinates - in a real app, we'd get these from the salon data
  const mapCoordinates = salon.latitude && salon.longitude 
    ? { lat: salon.latitude, lng: salon.longitude }
    : { lat: 34.0522, lng: -118.2437 }; // Default to LA

  return (
    <Layout>
      <Helmet>
        <title>{salon.name} | Premium Salon for Sale | EmviApp</title>
        <meta name="description" content={`${salon.name} in ${salon.location} - ${salon.description.substring(0, 150)}...`} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            to="/salons" 
            className="text-purple-600 hover:text-purple-800 flex items-center gap-1 font-medium"
          >
            <ArrowLeft className="h-4 w-4" /> 
            Back to All Salon Listings
          </Link>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Photos & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photo Gallery */}
            <div className="rounded-xl overflow-hidden bg-gray-100 relative">
              <div className="aspect-video relative">
                <img 
                  src={salonPhotos[currentImageIndex]} 
                  alt={`${salon.name} - Photo ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Image navigation arrows */}
                <button 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              
              {/* Image counter */}
              <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {salonPhotos.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {salonPhotos.map((photo, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 h-16 w-16 rounded overflow-hidden ${index === currentImageIndex ? 'ring-2 ring-purple-500' : ''}`}
                >
                  <img 
                    src={photo} 
                    alt={`${salon.name} thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Salon description */}
            <div>
              <h2 className="text-xl font-semibold mb-4">About This Salon</h2>
              <p className="text-gray-700 whitespace-pre-line mb-6">
                {salon.description}
              </p>
              
              {/* Features */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Salon Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
                  {salonFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <span className="bg-green-100 p-1 rounded-full mr-2">
                        <Check className="h-4 w-4 text-green-600" />
                      </span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Location Map */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Location</h3>
                <div className="h-[300px] rounded-lg overflow-hidden">
                  <MapContainer
                    center={mapCoordinates}
                    zoom={14}
                    height="300px"
                    width="100%"
                    title={`${salon.name} in ${salon.location}`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Summary & Contact */}
          <div className="space-y-6">
            {/* Price & Summary Card */}
            <Card className="border shadow-sm overflow-hidden">
              <div className="bg-purple-50 p-6 border-b">
                <h1 className="font-playfair text-2xl font-semibold mb-2">{salon.name}</h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{salon.location}</span>
                </div>
                <div className="flex items-center font-semibold text-2xl text-purple-800">
                  <DollarSign className="h-5 w-5" />
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0,
                  }).format(salon.price)}
                </div>
                
                {salon.featured && (
                  <Badge className="mt-3 bg-amber-500 hover:bg-amber-600">Featured Listing</Badge>
                )}
              </div>
              
              <CardContent className="p-6">
                {/* Quick Facts */}
                <div className="space-y-4 mb-6">
                  {salon.established && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Established</span>
                      <span className="font-medium">{salon.established}</span>
                    </div>
                  )}
                  {salon.teamSize && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Team Size</span>
                      <span className="font-medium">{salon.teamSize} employees</span>
                    </div>
                  )}
                </div>
                
                <Separator className="my-6" />
                
                {/* Contact Information */}
                <div>
                  <h3 className="font-medium mb-4">Contact Information</h3>
                  
                  {isSignedIn ? (
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-3 text-gray-500" />
                        <span>{salon.phone || "(555) 123-4567"}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-3 text-gray-500" />
                        <span>{salon.email || "contact@salonsale.com"}</span>
                      </div>
                      {salon.website && (
                        <div className="flex items-center">
                          <Globe className="h-4 w-4 mr-3 text-gray-500" />
                          <a 
                            href={salon.website.startsWith('http') ? salon.website : `https://${salon.website}`}
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-purple-600 hover:underline"
                          >
                            {salon.website}
                          </a>
                        </div>
                      )}
                      
                      {/* Contact Button */}
                      <div className="pt-4">
                        <Button 
                          className="w-full" 
                          onClick={handleContactSeller}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contact Seller
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center mb-4">
                        <p className="text-gray-600">
                          Sign in to view contact details for this salon.
                        </p>
                      </div>
                      <AuthAction 
                        onAction={handleContactSeller}
                        customTitle="Sign in to contact the seller"
                      >
                        <Button variant="default" className="w-full">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contact Seller
                        </Button>
                      </AuthAction>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SalonDetailPage;
