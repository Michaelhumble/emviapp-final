import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Briefcase, ArrowRight, Home } from 'lucide-react';
import ProgrammaticLander from './ProgrammaticLander';
import { 
  parseCity, 
  parseRole, 
  getSuggestedAlternatives, 
  trackSeoLanderView 
} from '@/lib/seo/slug-utils';

const ProgrammaticJobsLander: React.FC = () => {
  const { citySlug, roleSlug } = useParams<{
    citySlug: string;
    roleSlug: string;
  }>();

  const city = citySlug ? parseCity(citySlug) : null;
  const role = roleSlug ? parseRole(roleSlug) : null;

  // Track valid page views for analytics
  useEffect(() => {
    if (city && role && citySlug && roleSlug) {
      trackSeoLanderView('jobs', citySlug, roleSlug);
    }
  }, [city, role, citySlug, roleSlug]);

  // If both city and role are valid, render the full lander
  if (city && role && citySlug && roleSlug) {
    return (
      <ProgrammaticLander 
        roleSlug={roleSlug}
        citySlug={citySlug}
        pageType="jobs"
      />
    );
  }

  // Invalid slugs - render 404-safe fallback
  const suggestions = getSuggestedAlternatives('jobs');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="text-center">
          <CardHeader className="pb-4">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <MapPin className="h-8 w-8 text-gray-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              Page Not Found
            </CardTitle>
            <p className="text-gray-600 max-w-md mx-auto">
              We couldn't find the specific job listing you're looking for. 
              The location or role might not be available.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                size="lg"
                onClick={() => window.location.href = '/jobs'}
                className="flex items-center gap-2"
              >
                <Briefcase className="h-4 w-4" />
                Browse All Jobs
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
                  Popular Job Searches
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
                  onClick={() => window.location.href = '/jobs'}
                >
                  job search
                </button>
                {' '}or{' '}
                <button 
                  className="text-blue-600 hover:underline"
                  onClick={() => window.location.href = '/auth/signup'}
                >
                  create a free account
                </button>
                {' '}to get personalized recommendations.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgrammaticJobsLander;