
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { SquareDot, MapPin, Clock, DollarSign, Phone, Mail, Globe, Star } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Card } from '@/components/ui/card';
import { fetchSalonById } from '@/utils/salonFetcher';
import { determineSalonCategory } from '@/utils/salonImageFallbacks';
import { Job } from '@/types/job';

// Define params as a Record<string, string> to satisfy the constraint
interface SalonDetailPageParams {
  [key: string]: string; // This adds an index signature
  id: string;
}

const SimpleSalonDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<SalonDetailPageParams>();
  const [salon, setSalon] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadSalon = async () => {
      try {
        if (!id) {
          setError(true);
          setLoading(false);
          return;
        }

        const { salon: salonData, error: fetchError } = await fetchSalonById(id);
        
        if (fetchError || !salonData) {
          setError(true);
          setLoading(false);
          return;
        }

        setSalon(salonData);
        setLoading(false);
      } catch (err) {
        console.error('Error loading salon:', err);
        setError(true);
        setLoading(false);
      }
    };

    loadSalon();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-72 bg-gray-200 rounded-lg mb-6"></div>
            <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-40 bg-gray-200 rounded"></div>
              <div className="h-40 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !salon) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Salon Not Found</h1>
          <p className="mb-6">Sorry, we couldn't find the salon you're looking for.</p>
          <Button onClick={() => navigate('/salons')}>Browse Other Salons</Button>
        </div>
      </Layout>
    );
  }

  // Get salon category for appropriate image fallback
  const salonCategory = determineSalonCategory(
    salon.description || '',
    salon.title || salon.name || ''
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="aspect-[16/9] w-full overflow-hidden rounded-lg mb-6">
            <ImageWithFallback
              src={salon.image || ''}
              alt={salon.title || salon.name || 'Salon'}
              className="w-full h-full object-cover"
              businessName={salon.title || salon.name || 'Salon'}
              category={salonCategory}
              priority={true}
            />
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{salon.title || salon.name}</h1>
              <div className="flex items-center mt-2 text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{salon.location || 'Location not available'}</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="font-bold text-2xl text-primary">
                {typeof salon.price === 'number' || typeof salon.price === 'string' 
                  ? `$${Number(salon.price).toLocaleString()}`
                  : 'Contact for price'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Tabs Section */}
        <Tabs defaultValue="details" className="mb-10">
          <TabsList className="mb-6">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-6">
            {/* Description */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700">{salon.description || 'No description available.'}</p>
            </Card>
            
            {/* Specifications */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {salon.square_feet && (
                  <div className="flex items-center">
                    <SquareDot className="h-5 w-5 text-gray-400 mr-2" />
                    <span>
                      <strong>{Number(salon.square_feet).toLocaleString()}</strong> sq ft
                    </span>
                  </div>
                )}
                
                {salon.monthly_rent && (
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                    <span>
                      <strong>${Number(salon.monthly_rent).toLocaleString()}</strong> monthly rent
                    </span>
                  </div>
                )}
                
                {salon.monthly_revenue && (
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-green-500 mr-2" />
                    <span>
                      <strong>${typeof salon.monthly_revenue === 'string' ? salon.monthly_revenue : Number(salon.monthly_revenue).toLocaleString()}</strong> monthly revenue
                    </span>
                  </div>
                )}
                
                {salon.established && (
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <span>
                      Established <strong>{salon.established}</strong>
                    </span>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="features" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Features</h2>
              {salon.features && salon.features.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {salon.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Star className="h-4 w-4 text-amber-400 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No features listed for this salon.</p>
              )}
            </Card>
          </TabsContent>
          
          <TabsContent value="contact" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                {salon.contact_info?.phone && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-2" />
                    <span>{salon.contact_info.phone}</span>
                  </div>
                )}
                
                {salon.contact_info?.email && (
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-2" />
                    <span>{salon.contact_info.email}</span>
                  </div>
                )}
                
                {salon.website && (
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-gray-400 mr-2" />
                    <a href={salon.website} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                      {salon.website}
                    </a>
                  </div>
                )}
                
                {salon.contact_info?.owner_name && (
                  <div className="mt-4 p-3 bg-gray-50 rounded border border-gray-100">
                    <p className="text-sm text-gray-500">Owner/Manager</p>
                    <p className="font-medium">{salon.contact_info.owner_name}</p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <Button className="flex-1" onClick={() => window.history.back()}>
            Back
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => navigate('/salons')}>
            View All Salons
          </Button>
          <Button variant="default" className="flex-1" onClick={() => window.location.href = `mailto:${salon.contact_info?.email || 'info@emviapp.com'}?subject=Inquiry about ${salon.title || salon.name}`}>
            Contact Seller
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SimpleSalonDetailPage;
