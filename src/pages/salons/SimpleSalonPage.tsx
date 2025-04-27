
import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import salonData from '@/data/salonData';
import { Button } from '@/components/ui/button';

/**
 * A simplified Salon Page without complex filtering or unstable components
 */
const SimpleSalonPage: React.FC = () => {
  const featuredSalons = salonData?.filter(salon => salon.is_featured) || [];

  return (
    <Layout>
      <Helmet>
        <title>Salons | EmviApp</title>
        <meta 
          name="description" 
          content="Browse our comprehensive directory of nail salons."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
              Salon Directory
            </h1>
            <p className="text-gray-600 mb-6">
              Find the perfect salon near you or list your own salon for potential clients and staff to discover.
            </p>
          </div>
          
          {featuredSalons.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Featured Salons</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {featuredSalons.map(salon => (
                  <Card key={salon.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{salon.company || 'Unnamed Salon'}</h3>
                      <p className="text-sm text-gray-500">{salon.location}</p>
                      <p className="text-sm mt-2 line-clamp-2">{salon.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {salonData?.length > 0 ? (
              salonData.map(salon => (
                <Card key={salon.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{salon.company || 'Unnamed Salon'}</h3>
                    <p className="text-sm text-gray-500">{salon.location}</p>
                    <p className="text-sm mt-2 line-clamp-2">{salon.description}</p>
                    <div className="mt-4">
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500">No salons available at this time.</p>
              </div>
            )}
          </div>
          
          {/* Component version tag */}
          <div className="text-xs text-center text-gray-400 mt-8">
            SimpleSalonPage v1.0 - Minimal implementation for stability.
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SimpleSalonPage;
