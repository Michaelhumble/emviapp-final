
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, TrendingUp, Zap, CheckCircle } from "lucide-react";

interface SmartAdOptionsProps {
  postType: 'job' | 'salon' | 'booth' | 'supply';
  isFirstPost?: boolean;
  hasReferrals?: boolean;
  onNationwideChange?: (checked: boolean) => void;
  onFastSaleChange?: (checked: boolean) => void;
  onShowAtTopChange?: (checked: boolean) => void;
  onBundleWithJobChange?: (checked: boolean) => void;
}

const SmartAdOptions = ({
  postType,
  isFirstPost = false,
  hasReferrals = false,
  onNationwideChange,
  onFastSaleChange,
  onShowAtTopChange,
  onBundleWithJobChange
}: SmartAdOptionsProps) => {
  const [nationwide, setNationwide] = useState(false);
  const [fastSale, setFastSale] = useState(false);
  const [showAtTop, setShowAtTop] = useState(false);
  const [bundleWithJob, setBundleWithJob] = useState(false);
  
  const handleNationwideChange = (checked: boolean) => {
    setNationwide(checked);
    if (onNationwideChange) onNationwideChange(checked);
  };
  
  const handleFastSaleChange = (checked: boolean) => {
    setFastSale(checked);
    if (onFastSaleChange) onFastSaleChange(checked);
    
    // If enabling Fast Sale Package, disable nationwide (as it's included)
    if (checked) {
      setNationwide(false);
      if (onNationwideChange) onNationwideChange(false);
    }
  };
  
  const handleShowAtTopChange = (checked: boolean) => {
    setShowAtTop(checked);
    if (onShowAtTopChange) onShowAtTopChange(checked);
  };
  
  const handleBundleWithJobChange = (checked: boolean) => {
    setBundleWithJob(checked);
    if (onBundleWithJobChange) onBundleWithJobChange(checked);
  };
  
  const getNationwidePrice = () => {
    switch (postType) {
      case 'job': return '+$5';
      case 'salon': return '+$10';
      case 'booth': return '+$10';
      case 'supply': return '+$5';
      default: return '';
    }
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Smart Ad Options</h3>
      
      {/* Nationwide Visibility Option */}
      <Card className={`transition-all ${fastSale ? 'opacity-50' : ''}`}>
        <CardContent className="p-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Nationwide Visibility</p>
              <p className="text-sm text-gray-500">Get seen across all states</p>
              {isFirstPost && (
                <Badge variant="outline" className="mt-1 bg-blue-50 text-blue-700 border-blue-200">
                  Special First Post Deal
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">{getNationwidePrice()}</p>
            <Switch 
              checked={nationwide} 
              onCheckedChange={handleNationwideChange}
              disabled={fastSale} // Disable if Fast Sale is selected
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Post Type Specific Options */}
      {postType === 'salon' && (
        <Card className="border-yellow-200 bg-gradient-to-r from-white to-yellow-50">
          <CardContent className="p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Fast Sale Package</p>
                <p className="text-sm text-gray-500">Premium placement + 30-day featured pin</p>
                <Badge variant="outline" className="mt-1 bg-yellow-50 text-yellow-700 border-yellow-200">
                  Includes Nationwide
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">$50</p>
              <Switch 
                checked={fastSale} 
                onCheckedChange={handleFastSaleChange}
              />
            </div>
          </CardContent>
        </Card>
      )}
      
      {postType === 'booth' && (
        <>
          <Card>
            <CardContent className="p-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Show at Top of Results</p>
                  <p className="text-sm text-gray-500">Higher visibility in search results</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">+$10</p>
                <Switch 
                  checked={showAtTop} 
                  onCheckedChange={handleShowAtTopChange}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Bundle with Job Post</p>
                  <p className="text-sm text-gray-500">Post a job along with your booth rental</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">+$10</p>
                <Switch 
                  checked={bundleWithJob} 
                  onCheckedChange={handleBundleWithJobChange}
                />
              </div>
            </CardContent>
          </Card>
        </>
      )}
      
      {/* Special offer for job posts based on referrals */}
      {postType === 'job' && hasReferrals && !isFirstPost && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
            <p>Special pricing applied: $5 instead of $20 (Thanks for your referrals!)</p>
          </div>
        </div>
      )}
      
      {/* First post discount message */}
      {isFirstPost && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
            <p>First post advantage: Your local post is FREE with card on file!</p>
          </div>
        </div>
      )}
      
      {/* EmviSEO promotion */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-700">
        <p className="font-medium mb-1">Included with your post:</p>
        <ul className="space-y-1">
          <li className="flex items-center">
            <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
            <span>EmviSEO™ — Optimized for Google visibility</span>
          </li>
          <li className="flex items-center">
            <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
            <span>EmviAgent™ — Auto-reply when you're offline</span>
          </li>
          <li className="flex items-center">
            <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
            <span>EmviReminder™ — Expiration & view spike alerts</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SmartAdOptions;
