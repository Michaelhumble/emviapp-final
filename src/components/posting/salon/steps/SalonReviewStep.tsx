
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SalonFormValues } from '../salonFormSchema';
import { Building2, MapPin, DollarSign, Users, FileText, Camera, Crown, Zap, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SalonReviewStepProps {
  form: UseFormReturn<SalonFormValues>;
  photoUploads: File[];
}

export const SalonReviewStep: React.FC<SalonReviewStepProps> = ({ form, photoUploads }) => {
  const formData = form.getValues();

  const formatCurrency = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return isNaN(num) ? '$0' : `$${num.toLocaleString()}`;
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 border-0 shadow-xl">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
              <Crown className="h-10 w-10 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-playfair font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text text-transparent mb-4">
            Your Salon Listing Preview
          </h2>
          <p className="text-gray-600 text-xl leading-relaxed max-w-3xl mx-auto mb-6">
            This is how your salon will appear to thousands of qualified investors and buyers
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-sm text-purple-600 bg-purple-100 px-4 py-2 rounded-full">
              <TrendingUp className="h-4 w-4" />
              <span className="font-medium">Premium listings get 10x more views</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-pink-600 bg-pink-100 px-4 py-2 rounded-full">
              <Zap className="h-4 w-4" />
              <span className="font-medium">Average sale time: 30-60 days</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Listing Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3">
                <Building2 className="h-6 w-6" />
                {formData.salonName || 'Your Salon Name'}
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  {formData.businessType || 'Business Type'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-gray-600">
                        {formData.hideExactAddress 
                          ? `${formData.city || 'City'}, ${formData.state || 'State'}`
                          : `${formData.address || 'Address'}, ${formData.city || 'City'}, ${formData.state || 'State'}`
                        }
                      </p>
                      {formData.neighborhood && (
                        <p className="text-sm text-gray-500">{formData.neighborhood}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Asking Price</p>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(formData.askingPrice || 0)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {formData.monthlyRevenue && (
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="font-medium">Monthly Revenue</p>
                        <p className="text-lg font-semibold text-purple-600">
                          {formatCurrency(formData.monthlyRevenue)}
                        </p>
                      </div>
                    </div>
                  )}

                  {formData.employeeCount && (
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="font-medium">Team Size</p>
                        <p className="text-lg font-semibold text-orange-600">
                          {formData.employeeCount} employees
                        </p>
                      </div>
                    </div>
                  )}

                  {formData.establishedYear && (
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="border-blue-200 text-blue-600">
                        Established {formData.establishedYear}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          {formData.englishDescription && (
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-500" />
                  Business Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {formData.englishDescription}
                </p>
                {formData.vietnameseDescription && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {formData.vietnameseDescription}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Reason for Selling */}
          {formData.reasonForSelling && (
            <Card className="shadow-lg border-0 bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-blue-800 mb-2">Why This Opportunity is Available</h3>
                <p className="text-blue-700 leading-relaxed">
                  {formData.reasonForSelling}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Photos */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-green-500" />
                Photos ({photoUploads.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {photoUploads.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {photoUploads.slice(0, 4).map((photo, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Salon photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {photoUploads.length > 4 && (
                    <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-500 font-medium">
                        +{photoUploads.length - 4} more
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No photos uploaded</p>
                  <p className="text-sm">Photos increase interest by 500%!</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Financial Snapshot */}
          {(formData.monthlyRevenue || formData.monthlyProfit) && (
            <Card className="shadow-lg border-0 bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Financial Snapshot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {formData.monthlyRevenue && (
                  <div className="flex justify-between">
                    <span className="text-green-700">Monthly Revenue:</span>
                    <span className="font-semibold text-green-800">
                      {formatCurrency(formData.monthlyRevenue)}
                    </span>
                  </div>
                )}
                {formData.monthlyProfit && (
                  <div className="flex justify-between">
                    <span className="text-green-700">Monthly Profit:</span>
                    <span className="font-semibold text-green-800">
                      {formatCurrency(formData.monthlyProfit)}
                    </span>
                  </div>
                )}
                {formData.monthlyRevenue && formData.monthlyProfit && (
                  <div className="pt-2 border-t border-green-200">
                    <div className="flex justify-between">
                      <span className="text-green-700">Profit Margin:</span>
                      <span className="font-semibold text-green-800">
                        {Math.round((parseFloat(formData.monthlyProfit) / parseFloat(formData.monthlyRevenue)) * 100)}%
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Call to Action */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            <CardContent className="p-6 text-center">
              <Crown className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">Premium Listing Benefits</h3>
              <ul className="text-sm space-y-1 text-purple-100">
                <li>• Featured placement in search results</li>
                <li>• Professional listing badge</li>
                <li>• Priority in buyer notifications</li>
                <li>• Enhanced contact form</li>
                <li>• Detailed analytics dashboard</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Final CTA */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              Ready to Connect with Serious Buyers?
            </h3>
            <p className="text-green-700 text-lg mb-6">
              Your salon listing will be live within minutes and visible to over 5,000 active investors looking for beauty businesses just like yours.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/50 p-4 rounded-lg">
                <div className="font-semibold text-green-800">Instant Visibility</div>
                <div className="text-green-600">Seen by qualified buyers immediately</div>
              </div>
              <div className="bg-white/50 p-4 rounded-lg">
                <div className="font-semibold text-green-800">Professional Support</div>
                <div className="text-green-600">Dedicated team helps through sale</div>
              </div>
              <div className="bg-white/50 p-4 rounded-lg">
                <div className="font-semibold text-green-800">Secure Process</div>
                <div className="text-green-600">Protected contact & verified buyers</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
