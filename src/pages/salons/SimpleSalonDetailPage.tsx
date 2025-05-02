
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  MapPin, Phone, Mail, Calendar, Users, DollarSign, 
  Building, TrendingUp, SquareDot, Globe, Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { fetchSalonById } from '@/utils/salonFetcher';
import { Job } from '@/types/job';

// Define interface for URL parameters
interface SalonDetailPageParams {
  id: string;
  [key: string]: string; // Index signature for type constraint
}

const SimpleSalonDetailPage = () => {
  const { id } = useParams<SalonDetailPageParams>();
  const [salon, setSalon] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    const loadSalon = async () => {
      if (!id) {
        setError(true);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const result = await fetchSalonById(id);
        
        if (result.error || !result.salon) {
          setError(true);
        } else {
          setSalon(result.salon);
        }
      } catch (err) {
        console.error("Error loading salon:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    loadSalon();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto py-20">
        <div className="flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-gray-600">Loading salon details...</p>
        </div>
      </div>
    );
  }

  if (error || !salon) {
    return (
      <div className="container mx-auto py-20">
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Salon Not Found</h2>
            <p className="text-gray-500 mb-6">Sorry, we couldn't find the salon you were looking for.</p>
            <Button asChild>
              <a href="/salons">Browse Other Salons</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg overflow-hidden shadow-md">
        {/* Hero Section */}
        <div className="relative h-64 bg-gradient-to-r from-blue-600 to-indigo-600">
          {salon.imageUrl && (
            <img 
              src={salon.imageUrl} 
              alt={salon.name || salon.title} 
              className="w-full h-full object-cover opacity-70"
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-8">
            <Badge variant="secondary" className="w-fit mb-3">
              {salon.salon_type || 'Nail Salon'}
            </Badge>
            <h1 className="text-3xl font-bold text-white mb-2">
              {salon.name || salon.title}
            </h1>
            <div className="flex items-center text-white">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{salon.location}</span>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Quick Facts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                  Pricing
                </h3>
                <div className="mt-2">
                  <p className="text-2xl font-bold text-green-600">${salon.price || salon.asking_price || 'Contact'}</p>
                  <p className="text-sm text-gray-500">Asking Price</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                  Revenue
                </h3>
                <div className="mt-2">
                  <p className="text-2xl font-bold text-blue-600">
                    ${salon.monthly_revenue || salon.revenue || salon.yearly_revenue || "N/A"}
                    <span className="text-sm font-normal ml-1">{salon.monthly_revenue ? '/mo' : salon.yearly_revenue ? '/yr' : ''}</span>
                  </p>
                  <p className="text-sm text-gray-500">Average Monthly Revenue</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                  Established
                </h3>
                <div className="mt-2">
                  <p className="text-2xl font-bold text-purple-600">
                    {salon.established || "N/A"}
                  </p>
                  <p className="text-sm text-gray-500">Years in Business</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Tabs */}
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">About This Salon</h2>
                  <p className="text-gray-700">{salon.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Location Details</h3>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-gray-700">{salon.location}</p>
                      <p className="text-gray-500 text-sm">
                        High-traffic area with excellent visibility.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Business Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-gray-700">4-8 staff</p>
                        <p className="text-gray-500 text-sm">Current staffing</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Building className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-gray-700">${salon.monthly_rent || "Contact"}</p>
                        <p className="text-gray-500 text-sm">Monthly rent</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <SquareDot className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-gray-700">{salon.square_feet || "Contact"} sq ft</p>
                        <p className="text-gray-500 text-sm">Space</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-gray-700">
                          {salon.website ? (
                            <a href={salon.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {salon.website.replace('https://', '').replace('http://', '')}
                            </a>
                          ) : "No website provided"}
                        </p>
                        <p className="text-gray-500 text-sm">Online presence</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="features">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Salon Features</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {(salon.features || salon.salon_features || []).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-green-600" />
                        <span>{feature}</span>
                      </div>
                    ))}
                    {(!salon.features && !salon.salon_features) && (
                      <div className="col-span-full text-gray-500">
                        No specific features listed.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="contact">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
                  <div className="space-y-4">
                    {salon.contact_info?.owner_name && (
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-gray-700">{salon.contact_info.owner_name}</p>
                          <p className="text-gray-500 text-sm">Owner/Contact</p>
                        </div>
                      </div>
                    )}
                    
                    {salon.contact_info?.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-gray-700">{salon.contact_info.phone}</p>
                          <p className="text-gray-500 text-sm">Call for details</p>
                        </div>
                      </div>
                    )}
                    
                    {salon.contact_info?.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-gray-700">{salon.contact_info.email}</p>
                          <p className="text-gray-500 text-sm">Email for inquiries</p>
                        </div>
                      </div>
                    )}
                    
                    {(!salon.contact_info?.owner_name && !salon.contact_info?.phone && !salon.contact_info?.email) && (
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <p className="text-center text-gray-500">Contact information is hidden. Request details below.</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button className="w-full">Request Information</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SimpleSalonDetailPage;
