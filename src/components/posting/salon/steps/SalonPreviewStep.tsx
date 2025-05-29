
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, DollarSign, Users } from "lucide-react";

interface SalonPreviewStepProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonPreviewStep = ({ form }: SalonPreviewStepProps) => {
  const formData = form.getValues();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Preview Your Listing
        </h3>
        <p className="text-gray-600">
          Review your salon listing before proceeding to payment
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{formData.salonName}</CardTitle>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{formData.address}, {formData.city}, {formData.state} {formData.zipCode}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                Pricing Information
              </h4>
              <div className="space-y-2">
                <p><span className="font-medium">Asking Price:</span> {formData.askingPrice}</p>
                {formData.monthlyRent && (
                  <p><span className="font-medium">Monthly Rent:</span> {formData.monthlyRent}</p>
                )}
                {formData.numberOfStaff && (
                  <p className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span className="font-medium">Staff:</span> {formData.numberOfStaff}
                  </p>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Contact Information</h4>
              <div className="space-y-2">
                <p><span className="font-medium">Contact:</span> {formData.contactName}</p>
                <p className="flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  {formData.contactEmail}
                </p>
                <p className="flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  {formData.contactPhone}
                </p>
              </div>
            </div>
          </div>

          {formData.englishDescription && (
            <div>
              <h4 className="font-semibold mb-3">Description</h4>
              <p className="text-gray-700">{formData.englishDescription}</p>
            </div>
          )}

          {formData.vietnameseDescription && (
            <div>
              <h4 className="font-semibold mb-3">Mô tả (Vietnamese)</h4>
              <p className="text-gray-700">{formData.vietnameseDescription}</p>
            </div>
          )}

          <div>
            <h4 className="font-semibold mb-3">Features & Benefits</h4>
            <div className="flex flex-wrap gap-2">
              {formData.willTrain && <Badge variant="secondary">Will Train</Badge>}
              {formData.hasHousing && <Badge variant="secondary">Housing Available</Badge>}
              {formData.hasParking && <Badge variant="secondary">Parking</Badge>}
              {formData.equipmentIncluded && <Badge variant="secondary">Equipment Included</Badge>}
              {formData.leaseTransferable && <Badge variant="secondary">Lease Transferable</Badge>}
              {formData.sellerFinancing && <Badge variant="secondary">Seller Financing</Badge>}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonPreviewStep;
