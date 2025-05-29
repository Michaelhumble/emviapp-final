
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  MapPin, 
  DollarSign, 
  Users, 
  Camera, 
  CheckCircle, 
  Star, 
  TrendingUp,
  Award,
  Eye,
  Target
} from "lucide-react";

interface SalonReviewStepProps {
  form: UseFormReturn<SalonFormValues>;
  photoUploads: File[];
}

export const SalonReviewStep = ({ form, photoUploads }: SalonReviewStepProps) => {
  const formData = form.watch();

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4 pb-8 border-b border-purple-100">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-blue-500 text-white shadow-lg">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-playfair font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Review Your Listing
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Your salon listing is ready to go live! Review all details below to ensure maximum buyer appeal.
          <span className="block text-green-600 font-medium mt-2">🚀 You're about to reach 1,000+ qualified buyers!</span>
        </p>
      </div>

      {/* Success Metrics Banner */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="flex items-center justify-center gap-3">
            <Eye className="w-6 h-6 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-green-700">1,000+</div>
              <div className="text-sm text-green-600">Monthly Viewers</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Target className="w-6 h-6 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-blue-700">85%</div>
              <div className="text-sm text-blue-600">Serious Buyers</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Award className="w-6 h-6 text-purple-600" />
            <div>
              <div className="text-2xl font-bold text-purple-700">30 Days</div>
              <div className="text-sm text-purple-600">Average Sale Time</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Salon Identity Card */}
        <Card className="border-2 border-purple-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
            <CardTitle className="flex items-center gap-3 text-purple-700">
              <Building className="w-6 h-6" />
              Salon Identity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">Salon Name:</span>
                <span className="text-lg font-semibold text-purple-600">{formData.salonName || "Not specified"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">Business Type:</span>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  {formData.businessType || "Not specified"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">Industry:</span>
                <span className="text-purple-600">{formData.beautyIndustry || "Nails"}</span>
              </div>
              {formData.establishedYear && (
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Established:</span>
                  <span className="text-purple-600">{formData.establishedYear}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Location Card */}
        <Card className="border-2 border-blue-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardTitle className="flex items-center gap-3 text-blue-700">
              <MapPin className="w-6 h-6" />
              Location Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-700 block">Address:</span>
                <p className="text-blue-600 mt-1">
                  {formData.hideExactAddress 
                    ? `${formData.city}, ${formData.state} (Exact address hidden for privacy)`
                    : `${formData.address || ""}, ${formData.city || ""}, ${formData.state || ""} ${formData.zipCode || ""}`
                  }
                </p>
              </div>
              {formData.neighborhood && (
                <div>
                  <span className="font-medium text-gray-700 block">Neighborhood:</span>
                  <span className="text-blue-600">{formData.neighborhood}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Financial Information Card */}
        <Card className="border-2 border-green-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
            <CardTitle className="flex items-center gap-3 text-green-700">
              <DollarSign className="w-6 h-6" />
              Financial Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">Asking Price:</span>
                <span className="text-2xl font-bold text-green-600">{formData.askingPrice || "Not specified"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">Monthly Rent:</span>
                <span className="text-lg text-green-600">{formData.monthlyRent || "Not specified"}</span>
              </div>
              {formData.monthlyProfit && (
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="font-medium text-gray-700 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    Monthly Profit:
                  </span>
                  <span className="text-lg font-semibold text-green-600">{formData.monthlyProfit}</span>
                </div>
              )}
              {formData.monthlyRevenue && (
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Monthly Revenue:</span>
                  <span className="text-green-600">{formData.monthlyRevenue}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Business Metrics Card */}
        <Card className="border-2 border-orange-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
            <CardTitle className="flex items-center gap-3 text-orange-700">
              <Users className="w-6 h-6" />
              Business Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-3">
              {formData.employeeCount && (
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Employees:</span>
                  <Badge variant="outline" className="border-orange-300 text-orange-700">
                    {formData.employeeCount}
                  </Badge>
                </div>
              )}
              {formData.numberOfTables && (
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Manicure Tables:</span>
                  <span className="text-orange-600">{formData.numberOfTables}</span>
                </div>
              )}
              {formData.numberOfChairs && (
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Pedicure Chairs:</span>
                  <span className="text-orange-600">{formData.numberOfChairs}</span>
                </div>
              )}
              {formData.squareFeet && (
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Square Footage:</span>
                  <span className="text-orange-600">{formData.squareFeet}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Premium Features Section */}
      <Card className="border-2 border-purple-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
          <CardTitle className="flex items-center gap-3 text-purple-700">
            <Star className="w-6 h-6" />
            Premium Features & Amenities
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {formData.willTrain && (
              <Badge variant="secondary" className="bg-green-100 text-green-700 p-3 justify-center">
                🎓 Training Included
              </Badge>
            )}
            {formData.hasHousing && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 p-3 justify-center">
                🏠 Housing Available
              </Badge>
            )}
            {formData.hasWaxRoom && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-700 p-3 justify-center">
                💆‍♀️ Wax Room
              </Badge>
            )}
            {formData.hasDiningRoom && (
              <Badge variant="secondary" className="bg-orange-100 text-orange-700 p-3 justify-center">
                🍽️ Dining Area
              </Badge>
            )}
            {formData.hasLaundry && (
              <Badge variant="secondary" className="bg-cyan-100 text-cyan-700 p-3 justify-center">
                🧺 Laundry
              </Badge>
            )}
            {formData.hasParking && (
              <Badge variant="secondary" className="bg-gray-100 text-gray-700 p-3 justify-center">
                🚗 Parking
              </Badge>
            )}
          </div>
          {![formData.willTrain, formData.hasHousing, formData.hasWaxRoom, formData.hasDiningRoom, formData.hasLaundry, formData.hasParking].some(Boolean) && (
            <p className="text-gray-500 text-center py-4">No premium features selected</p>
          )}
        </CardContent>
      </Card>

      {/* Photos Section */}
      <Card className="border-2 border-indigo-100 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardTitle className="flex items-center gap-3 text-indigo-700">
            <Camera className="w-6 h-6" />
            Photos ({photoUploads.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {photoUploads.length > 0 ? (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {photoUploads.slice(0, 4).map((file, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden border-2 border-indigo-200">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Salon photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              {photoUploads.length > 4 && (
                <p className="text-indigo-600 text-center">
                  +{photoUploads.length - 4} more photos
                </p>
              )}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <p className="text-green-700 font-medium">✨ Great choice!</p>
                <p className="text-green-600 text-sm">Listings with 5+ photos get 3x more buyer inquiries</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No photos uploaded</p>
              <p className="text-sm text-gray-400 mt-1">Add photos to increase buyer interest by 300%!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Descriptions Section */}
      {(formData.englishDescription || formData.vietnameseDescription || formData.reasonForSelling) && (
        <Card className="border-2 border-pink-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
            <CardTitle className="text-pink-700">Descriptions & Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            {formData.englishDescription && (
              <div>
                <h4 className="font-medium text-gray-700 mb-2">English Description:</h4>
                <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{formData.englishDescription}</p>
              </div>
            )}
            {formData.vietnameseDescription && (
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Vietnamese Description:</h4>
                <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{formData.vietnameseDescription}</p>
              </div>
            )}
            {formData.reasonForSelling && (
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Reason for Selling:</h4>
                <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{formData.reasonForSelling}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Call to Action Footer */}
      <div className="text-center p-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-xl">
        <h3 className="text-2xl font-bold mb-2">🎉 Your Listing Looks Amazing!</h3>
        <p className="text-lg opacity-90 mb-4">
          Ready to connect with serious buyers who are actively searching for salons like yours?
        </p>
        <div className="bg-white/20 rounded-lg p-4 inline-block">
          <p className="text-sm font-medium">
            ⚡ Premium listings get contacted within 48 hours on average
          </p>
        </div>
      </div>
    </div>
  );
};
