
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, MessageSquare, Users } from "lucide-react";
import { EnhancedSalonFormValues } from "../enhancedSalonFormSchema";

interface SalonAboutSectionProps {
  form: UseFormReturn<EnhancedSalonFormValues>;
}

const SalonAboutSection = ({ form }: SalonAboutSectionProps) => {
  return (
    <div className="space-y-8">
      <FormField
        control={form.control}
        name="salonStory"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Your Salon's Story *
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tell buyers what makes your salon special... Share your journey, loyal customer base, unique services, community impact, awards, or memorable moments. What would you want to know if you were buying this salon?"
                className="min-h-32 border-2 focus:border-purple-500"
                {...field}
              />
            </FormControl>
            <p className="text-sm text-gray-600">This is your chance to connect emotionally with potential buyers</p>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="ownerMessage"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              Personal Message from Owner (Optional)
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="A personal note to potential buyers... Why you built this salon, what it means to you, what kind of buyer would be perfect to continue your legacy..."
                className="min-h-24 border-2 focus:border-purple-500"
                {...field}
              />
            </FormControl>
            <p className="text-sm text-gray-600">Personal touch that builds trust and connection</p>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="reasonForSelling"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-500" />
              Reason for Selling (Optional)
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-12 border-2 focus:border-purple-500">
                  <SelectValue placeholder="Select reason (helps buyers understand)" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="retirement">Retirement</SelectItem>
                <SelectItem value="relocation">Relocation/Moving</SelectItem>
                <SelectItem value="expansion">Expanding to larger location</SelectItem>
                <SelectItem value="family">Family reasons</SelectItem>
                <SelectItem value="health">Health reasons</SelectItem>
                <SelectItem value="investment">Investment opportunity elsewhere</SelectItem>
                <SelectItem value="partnership">Partnership dissolution</SelectItem>
                <SelectItem value="other">Other personal reasons</SelectItem>
                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-600">Transparency builds buyer confidence</p>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Inspiration Section */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
        <h3 className="font-semibold text-purple-800 mb-3">💡 What Makes Great Salon Stories?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-purple-700 mb-2">Emotional Connection:</h4>
            <ul className="text-purple-600 space-y-1">
              <li>• Your "why" for starting this salon</li>
              <li>• Heartwarming customer stories</li>
              <li>• Community involvement</li>
              <li>• Team achievements</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-purple-700 mb-2">Business Highlights:</h4>
            <ul className="text-purple-600 space-y-1">
              <li>• Years of successful operation</li>
              <li>• Awards or recognition</li>
              <li>• Unique services or specialties</li>
              <li>• Growth milestones</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonAboutSection;
