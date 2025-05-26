
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Building2, 
  DollarSign, 
  Camera, 
  Edit, 
  Eye, 
  Star,
  Calendar,
  Globe,
  Shield
} from "lucide-react";
import { SalonFormValues } from "./salonFormSchema";

interface SalonReviewSectionProps {
  form: UseFormReturn<SalonFormValues>;
  onEdit: (step: number) => void;
  confirmed: boolean;
  setConfirmed: (confirmed: boolean) => void;
}

export const SalonReviewSection = ({ 
  form, 
  onEdit, 
  confirmed, 
  setConfirmed 
}: SalonReviewSectionProps) => {
  const formData = form.getValues();

  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numPrice);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 mb-4">
          <Eye className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-playfair font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Review & Confirm
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Please review all your listing details carefully before publishing
        </p>
      </div>

      <div className="space-y-6">
        {/* Salon Identity Section */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="flex items-center gap-2 text-xl font-playfair">
              <Building2 className="w-5 h-5 text-purple-600" />
              Salon Identity
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(1)}
              className="flex items-center gap-1"
            >
              <Edit className="w-4 h-4" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Salon Name</label>
                <p className="text-lg font-semibold text-gray-900">{formData.salonName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Business Type</label>
                <Badge variant="secondary" className="mt-1">{formData.businessType}</Badge>
              </div>
              {formData.establishedYear && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Established</label>
                  <p className="flex items-center gap-1 text-gray-900">
                    <Calendar className="w-4 h-4" />
                    {formData.establishedYear}
                  </p>
                </div>
              )}
              {formData.logo && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Logo</label>
                  <div className="mt-1 w-16 h-16 rounded-lg border overflow-hidden bg-gray-100">
                    <img 
                      src={URL.createObjectURL(formData.logo)} 
                      alt="Logo preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Location Section */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="flex items-center gap-2 text-xl font-playfair">
              <MapPin className="w-5 h-5 text-blue-600" />
              Location
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(2)}
              className="flex items-center gap-1"
            >
              <Edit className="w-4 h-4" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Address</label>
                <p className="text-gray-900">{formData.address}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">City</label>
                <p className="text-gray-900">{formData.city}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">State</label>
                <p className="text-gray-900">{formData.state}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">ZIP Code</label>
                <p className="text-gray-900">{formData.zipCode}</p>
              </div>
              {formData.neighborhood && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Neighborhood</label>
                  <p className="text-gray-900">{formData.neighborhood}</p>
                </div>
              )}
              {formData.hideAddressFromPublic && (
                <div className="md:col-span-2">
                  <Badge variant="outline" className="flex items-center gap-1 w-fit">
                    <Shield className="w-3 h-3" />
                    Address will be hidden from public
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Description Section */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="flex items-center gap-2 text-xl font-playfair">
              <DollarSign className="w-5 h-5 text-green-600" />
              Description & Pricing
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(3)}
              className="flex items-center gap-1"
            >
              <Edit className="w-4 h-4" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Asking Price</label>
              <p className="text-2xl font-bold text-green-600">
                {formatPrice(formData.askingPrice)}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Description</label>
              <p className="text-gray-900 leading-relaxed bg-gray-50 rounded-lg p-3">
                {formData.salonDescription}
              </p>
            </div>
            {formData.reasonForSelling && (
              <div>
                <label className="text-sm font-medium text-gray-700">Reason for Selling</label>
                <p className="text-gray-900 leading-relaxed bg-gray-50 rounded-lg p-3">
                  {formData.reasonForSelling}
                </p>
              </div>
            )}
            {formData.virtualTourUrl && (
              <div>
                <label className="text-sm font-medium text-gray-700">Virtual Tour</label>
                <a 
                  href={formData.virtualTourUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700 underline"
                >
                  <Globe className="w-4 h-4" />
                  View Virtual Tour
                </a>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Photos Section */}
        <Card className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="flex items-center gap-2 text-xl font-playfair">
              <Camera className="w-5 h-5 text-pink-600" />
              Photos ({formData.photos?.length || 0})
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(4)}
              className="flex items-center gap-1"
            >
              <Edit className="w-4 h-4" />
              Edit
            </Button>
          </CardHeader>
          <CardContent>
            {formData.photos && formData.photos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-lg border overflow-hidden bg-gray-100">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {index === formData.coverPhotoIndex && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-yellow-500 text-yellow-900 flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" />
                          Cover
                        </Badge>
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="secondary" className="text-xs">
                        {index + 1}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No photos uploaded</p>
            )}
          </CardContent>
        </Card>

        {/* Confirmation Section */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 shadow-xl">
          <CardContent className="p-6">
            <FormField
              control={form.control}
              name="salonName" // Using dummy field name for the checkbox
              render={() => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={confirmed}
                      onCheckedChange={setConfirmed}
                      className="mt-1"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <label className="text-sm font-medium leading-relaxed cursor-pointer">
                      I confirm that all information provided is accurate and complete. 
                      I understand that this listing will be publicly visible and agree 
                      to EmviApp's terms of service.
                    </label>
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
