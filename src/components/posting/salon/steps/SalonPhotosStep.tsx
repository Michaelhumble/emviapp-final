
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "../salonFormSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";

interface SalonPhotosStepProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonPhotosStep = ({ form }: SalonPhotosStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Salon Photos
        </h3>
        <p className="text-gray-600">
          Add photos to showcase your salon (optional but recommended)
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Photos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              Upload salon photos
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Add photos of your salon interior, exterior, and equipment
            </p>
            <p className="text-xs text-gray-500">
              Photo upload functionality will be implemented in the next phase
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonPhotosStep;
