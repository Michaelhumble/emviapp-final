
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Users, Building2, Phone, Mail, User, Image } from "lucide-react";

interface SalonPreviewStepProps {
  form: UseFormReturn<SalonFormValues>;
  photoUploads?: File[];
}

export const SalonPreviewStep = ({ form, photoUploads = [] }: SalonPreviewStepProps) => {
  const values = form.getValues();

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Preview Your Listing
        </h3>
        <p className="text-gray-600">
          Review your salon listing before publishing
        </p>
      </div>

      <Card className="border-2 border-purple-100 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
          <CardTitle className="text-xl text-gray-900">{values.salonName}</CardTitle>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{values.address}, {values.city}, {values.state}</span>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Photos Section */}
          {photoUploads.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Image className="h-4 w-4" />
                Photos ({photoUploads.length})
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {photoUploads.map((photo, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(photo)}
                    alt={`Salon photo ${index + 1}`}
                    className="w-full h-24 object-cover rounded-md border"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-semibold text-lg">{values.askingPrice}</p>
                <p className="text-sm text-gray-600">Asking Price</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-semibold text-lg">{values.numberOfStaff || 'N/A'}</p>
                <p className="text-sm text-gray-600">Staff Members</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-purple-600" />
              <div>
                <p className="font-semibold text-lg">{values.monthlyRent || 'N/A'}</p>
                <p className="text-sm text-gray-600">Monthly Rent</p>
              </div>
            </div>
          </div>

          {values.englishDescription && (
            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-gray-700">{values.englishDescription}</p>
            </div>
          )}

          {values.vietnameseDescription && (
            <div>
              <h4 className="font-semibold mb-2">Mô tả (Vietnamese)</h4>
              <p className="text-gray-700">{values.vietnameseDescription}</p>
            </div>
          )}

          <div>
            <h4 className="font-semibold mb-3">Contact Information</h4>
            <div className="space-y-2">
              {values.contactName && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-600" />
                  <span>{values.contactName}</span>
                </div>
              )}
              {values.contactEmail && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-600" />
                  <span>{values.contactEmail}</span>
                </div>
              )}
              {values.contactPhone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-600" />
                  <span>{values.contactPhone}</span>
                </div>
              )}
              {!values.contactName && !values.contactEmail && !values.contactPhone && (
                <p className="text-gray-500 italic">No contact information provided</p>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Features</h4>
            <div className="flex flex-wrap gap-2">
              {values.willTrain && <Badge variant="secondary">Will Train</Badge>}
              {values.hasHousing && <Badge variant="secondary">Housing Available</Badge>}
              {values.hasParking && <Badge variant="secondary">Parking</Badge>}
              {values.equipmentIncluded && <Badge variant="secondary">Equipment Included</Badge>}
              {values.leaseTransferable && <Badge variant="secondary">Lease Transferable</Badge>}
              {values.sellerFinancing && <Badge variant="secondary">Seller Financing</Badge>}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonPreviewStep;
