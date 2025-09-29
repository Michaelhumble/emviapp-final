import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Building2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Job } from '@/types/job';
import { supabase } from '@/integrations/supabase/client';

interface RelatedSalonsProps {
  currentSalon: Job;
  limit?: number;
}

const RelatedSalons: React.FC<RelatedSalonsProps> = ({ currentSalon, limit = 4 }) => {
  const [relatedSalons, setRelatedSalons] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRelatedSalons = async () => {
      try {
        const city = currentSalon.location?.split(',')[0]?.trim();
        
        const query = supabase
          .from('jobs')
          .select('*')
          .eq('status', 'active')
          .eq('category', 'salon-for-sale')
          .neq('id', currentSalon.id)
          .order('created_at', { ascending: false })
          .limit(limit);

        // Filter by location if available
        if (city) {
          query.ilike('location', `%${city}%`);
        }

        const { data, error } = await query;
        
        if (error) throw error;
        setRelatedSalons((data || []) as Job[]);
      } catch (error) {
        console.error('Failed to load related salons:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRelatedSalons();
  }, [currentSalon.id, currentSalon.location, limit]);

  if (loading) {
    return (
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Related Salon Opportunities</h2>
            <p className="text-muted-foreground">Explore more salons in your area</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded mb-4 w-3/4"></div>
                  <div className="h-16 bg-muted rounded mb-4"></div>
                  <div className="h-8 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (relatedSalons.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Related Salon Opportunities</h2>
          <p className="text-muted-foreground">Explore more salons in your area</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedSalons.map((salon) => (
            <Card key={salon.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {salon.title}
                </h3>
                
                {salon.location && (
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="line-clamp-1">{salon.location}</span>
                  </div>
                )}
                
                {salon.compensation_details && (
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Building2 className="h-4 w-4 mr-1" />
                    <span className="line-clamp-1">{salon.compensation_details}</span>
                  </div>
                )}
                
                {salon.description && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {salon.description}
                  </p>
                )}
                
                <Button asChild className="w-full">
                  <Link to={`/salons/${salon.id}`}>
                    View Salon
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {relatedSalons.length >= limit && (
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/salons">View All Salons</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RelatedSalons;