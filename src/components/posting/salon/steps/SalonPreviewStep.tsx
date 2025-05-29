
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Users, Building2, Phone, Mail, User, Image, Star, Sparkles, TrendingUp, Award } from "lucide-react";

interface SalonPreviewStepProps {
  form: UseFormReturn<SalonFormValues>;
  photoUploads?: File[];
}

export const SalonPreviewStep = ({ form, photoUploads = [] }: SalonPreviewStepProps) => {
  const values = form.getValues();

  return (
    <div className="space-y-10">
      <div className="text-center space-y-4 relative">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-full p-3">
            <Star className="h-6 w-6 text-purple-600" />
          </div>
        </div>
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 bg-clip-text text-transparent pt-8">
          Your Premium Listing Preview
        </h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          This is how your salon will appear to thousands of qualified buyers. Looking incredible!
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm">
          <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">
            <Award className="h-3 w-3" />
            <span className="font-medium">Premium Quality</span>
          </div>
          <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
            <TrendingUp className="h-3 w-3" />
            <span className="font-medium">High Conversion Rate</span>
          </div>
        </div>
      </div>

      <Card className="border-2 border-purple-200 shadow-2xl bg-white overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-2xl font-bold">{values.salonName}</CardTitle>
                <div className="flex items-center gap-2 text-purple-100">
                  <MapPin className="h-4 w-4" />
                  <span className="text-lg">{values.address}, {values.city}, {values.state}</span>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                <div className="text-white/90 text-sm font-medium">PREMIUM LISTING</div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full -mr-16 -mt-16"></div>
        </CardHeader>
        
        <CardContent className="p-8 space-y-8">
          {/* Photos Section */}
          {photoUploads.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-semibold text-xl mb-4 flex items-center gap-2">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-2">
                  <Image className="h-4 w-4 text-white" />
                </div>
                Stunning Gallery ({photoUploads.length} photos)
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {photoUploads.slice(0, 4).map((photo, index) => (
                  <div key={index} className="relative group overflow-hidden rounded-xl">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Salon photo ${index + 1}`}
                      className="w-full h-32 object-cover transition-all duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  </div>
                ))}
              </div>
              {photoUploads.length > 4 && (
                <p className="text-center text-gray-500 text-sm">
                  +{photoUploads.length - 4} more stunning photos in full listing
                </p>
              )}
            </div>
          )}

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-green-500 rounded-lg p-2">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-2xl text-green-700">{values.askingPrice}</p>
                  <p className="text-sm text-green-600 font-medium">Asking Price</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-500 rounded-lg p-2">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-2xl text-blue-700">{values.numberOfStaff || 'N/A'}</p>
                  <p className="text-sm text-blue-600 font-medium">Staff Members</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-purple-500 rounded-lg p-2">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-2xl text-purple-700">{values.monthlyRent || 'N/A'}</p>
                  <p className="text-sm text-purple-600 font-medium">Monthly Rent</p>
                </div>
              </div>
            </div>
          </div>

          {/* Descriptions */}
          {(values.englishDescription || values.vietnameseDescription) && (
            <div className="space-y-6">
              {values.englishDescription && (
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-500" />
                    Why This Salon is Special
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-base">{values.englishDescription}</p>
                </div>
              )}

              {values.vietnameseDescription && (
                <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border border-red-200">
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-red-500" />
                    Mô tả tiếng Việt
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-base">{values.vietnameseDescription}</p>
                </div>
              )}
            </div>
          )}

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
            <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <div className="bg-indigo-500 rounded-lg p-2">
                <User className="h-4 w-4 text-white" />
              </div>
              Contact the Owner
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {values.contactName && (
                <div className="flex items-center gap-3 bg-white rounded-lg p-3">
                  <User className="h-4 w-4 text-gray-600" />
                  <span className="font-medium">{values.contactName}</span>
                </div>
              )}
              {values.contactEmail && (
                <div className="flex items-center gap-3 bg-white rounded-lg p-3">
                  <Mail className="h-4 w-4 text-gray-600" />
                  <span className="font-medium">{values.contactEmail}</span>
                </div>
              )}
              {values.contactPhone && (
                <div className="flex items-center gap-3 bg-white rounded-lg p-3">
                  <Phone className="h-4 w-4 text-gray-600" />
                  <span className="font-medium">{values.contactPhone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" />
              Premium Features & Amenities
            </h4>
            <div className="flex flex-wrap gap-3">
              {values.willTrain && <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-3 py-1">✨ Will Train Staff</Badge>}
              {values.hasHousing && <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1">🏠 Housing Available</Badge>}
              {values.hasParking && <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 px-3 py-1">🚗 Parking Included</Badge>}
              {values.equipmentIncluded && <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 px-3 py-1">🛠️ Equipment Included</Badge>}
              {values.leaseTransferable && <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-200 px-3 py-1">📋 Lease Transferable</Badge>}
              {values.sellerFinancing && <Badge className="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1">💰 Seller Financing</Badge>}
              {!values.willTrain && !values.hasHousing && !values.hasParking && !values.equipmentIncluded && !values.leaseTransferable && !values.sellerFinancing && (
                <p className="text-gray-500 italic">Contact owner for additional features and amenities</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 rounded-2xl p-6 border border-emerald-200">
        <div className="flex items-center space-x-3 mb-3">
          <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-full p-2">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          <h4 className="font-semibold text-gray-800">🎉 Congratulations! Your Listing Looks Amazing</h4>
        </div>
        <p className="text-gray-600 leading-relaxed">
          You've created a <span className="font-semibold text-emerald-600">premium, professional listing</span> that will attract serious buyers. 
          Research shows that listings like yours typically receive their <span className="font-bold text-green-600">first inquiry within 24-48 hours</span> 
          and sell <span className="font-bold text-green-600">67% faster</span> than average listings.
        </p>
      </div>
    </div>
  );
};

export default SalonPreviewStep;
