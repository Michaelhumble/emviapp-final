
import React from 'react';
import { useAuth } from '@/context/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, TrendingUp, Users } from 'lucide-react';

const AIRecommendations = () => {
  const { userRole, userProfile } = useAuth();

  const getRecommendations = () => {
    switch (userRole) {
      case 'artist':
      case 'nail technician/artist':
        return [
          {
            title: "Boost Your Profile",
            description: "Complete your portfolio to attract more clients",
            action: "Add Photos",
            icon: <TrendingUp className="h-4 w-4" />
          }
        ];
      case 'salon':
      case 'owner':
        return [
          {
            title: "Hire Top Talent",
            description: "Post a job to find skilled artists",
            action: "Post Job",
            icon: <Users className="h-4 w-4" />
          }
        ];
      case 'supplier':
      case 'beauty supplier':
        return [
          {
            title: "Expand Your Reach",
            description: "Connect with more salons in your area",
            action: "View Salons",
            icon: <TrendingUp className="h-4 w-4" />
          }
        ];
      default:
        return [
          {
            title: "Explore EmviApp",
            description: "Discover what you can do with your account",
            action: "Get Started",
            icon: <Lightbulb className="h-4 w-4" />
          }
        ];
    }
  };

  const recommendations = getRecommendations();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="text-blue-500">
                {rec.icon}
              </div>
              <div>
                <h4 className="font-medium">{rec.title}</h4>
                <p className="text-sm text-gray-600">{rec.description}</p>
              </div>
            </div>
            <Button size="sm" variant="outline">
              {rec.action}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AIRecommendations;
