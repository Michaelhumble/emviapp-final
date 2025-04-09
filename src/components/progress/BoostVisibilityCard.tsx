
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Star, Zap, ShoppingCart } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { toTranslatableText } from './TranslationHelper';

// This will update the BoostVisibilityCard component to fix t() usage
const BoostVisibilityCard = () => {
  const { t } = useTranslation();
  
  return (
    <Card className="border-blue-100 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center text-blue-700">
          <TrendingUp className="mr-2 h-5 w-5 text-blue-500" />
          {t(toTranslatableText("Boost Your Visibility"))}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">
          {t(toTranslatableText("Stand out from the crowd and get more clients with these promotional options."))}
        </p>
        
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-100">
            <div className="flex items-start">
              <Star className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-blue-800">
                  {t(toTranslatableText("Featured Artist Spot"))}
                </h3>
                <p className="text-xs text-blue-700 mb-2">
                  {t(toTranslatableText("Appear on the homepage and get 5x more profile views"))}
                </p>
                <Button size="sm" variant="outline" className="bg-white border-blue-200 text-blue-700 hover:bg-blue-50">
                  {t(toTranslatableText("Apply Now"))}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-3 rounded-lg border border-amber-100">
            <div className="flex items-start">
              <Zap className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-amber-800">
                  {t(toTranslatableText("Verified Badge"))}
                </h3>
                <p className="text-xs text-amber-700 mb-2">
                  {t(toTranslatableText("Gain client trust with our quality verification"))}
                </p>
                <Button size="sm" variant="outline" className="bg-white border-amber-200 text-amber-700 hover:bg-amber-50">
                  {t(toTranslatableText("Get Verified"))}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg border border-purple-100">
            <div className="flex items-start">
              <ShoppingCart className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-purple-800">
                  {t(toTranslatableText("Special Offer Bundle"))}
                </h3>
                <p className="text-xs text-purple-700 mb-2">
                  {t(toTranslatableText("Get featured, verified badge, and priority support together"))}
                </p>
                <div className="flex items-center mb-2">
                  <span className="text-xs line-through text-gray-500 mr-2">$29.99</span>
                  <span className="text-sm font-bold text-purple-700">$19.99</span>
                </div>
                <Button size="sm" variant="outline" className="bg-white border-purple-200 text-purple-700 hover:bg-purple-50">
                  {t(toTranslatableText("Get The Bundle"))}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoostVisibilityCard;
