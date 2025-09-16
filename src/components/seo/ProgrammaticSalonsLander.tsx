import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Scissors, ArrowRight, Home } from 'lucide-react';
import ProgrammaticLander from './ProgrammaticLander';
import { 
  parseCity, 
  parseRole, 
  getSuggestedAlternatives, 
  trackSeoLanderView 
} from '@/lib/seo/slug-utils';

const ProgrammaticSalonsLander: React.FC = () => {
  const { citySlug, serviceSlug } = useParams<{
    citySlug: string;
    serviceSlug: string;
  }>();

  const city = citySlug ? parseCity(citySlug) : null;
  const service = serviceSlug ? parseRole(serviceSlug) : null;

  // Track valid page views for analytics
  useEffect(() => {
    if (city && service && citySlug && serviceSlug) {
      trackSeoLanderView('salons', citySlug, serviceSlug);
    }
  }, [city, service, citySlug, serviceSlug]);

  // If both city and service are valid, render the full lander
  if (city && service && citySlug && serviceSlug) {
    return (
      <ProgrammaticLander 
        roleSlug={serviceSlug}
        citySlug={citySlug}
        pageType="salons"
      />
    );
  }

  // Invalid slugs - render 404-safe fallback
  const suggestions = getSuggestedAlternatives('salons');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="text-center">
          <CardHeader className="pb-4">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Scissors className="h-8 w-8 text-gray-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              Page Not Found
            </CardTitle>
            <p className="text-gray-600 max-w-md mx-auto">
              We couldn't find the specific salon services you're looking for. 
              The location or service might not be available.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                size="lg"
                onClick={() => window.location.href = '/salons'}
                className="flex items-center gap-2"
              >
                <Scissors className="h-4 w-4" />
                Browse All Salons
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Back to Home
              </Button>
            </div>

            {/* Suggested Alternatives */}
            {suggestions.length > 0 && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Popular Salon Services
                </h3>
                <div className="grid md:grid-cols-3 gap-3">
                  {suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="h-auto p-4 text-left flex-col items-start"
                      onClick={() => window.location.href = suggestion.url}
                    >
                      <div className="font-medium text-sm">
                        {suggestion.role.label}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {suggestion.city.city}, {suggestion.city.state}
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Help */}
            <div className="text-sm text-gray-500 border-t pt-4">
              <p>
                Looking for something specific? Try our{' '}
                <button 
                  className="text-blue-600 hover:underline"
                  onClick={() => window.location.href = '/salons'}
                >
                  salon directory
                </button>
                {' '}or{' '}
                <button 
                  className="text-blue-600 hover:underline"
                  onClick={() => window.location.href = '/auth/signup'}
                >
                  create a free account
                </button>
                {' '}to find salons near you.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgrammaticSalonsLander;