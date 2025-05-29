
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "./salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { PenTool, Globe, MessageSquare, Lightbulb } from "lucide-react";

interface SalonPostDescriptionProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonPostDescription = ({ form }: SalonPostDescriptionProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full">
          <PenTool className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-medium text-emerald-800">Step 3</span>
        </div>
        <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-3">Tell Your Story</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Craft compelling descriptions that showcase your salon's unique value and attract the right buyers
        </p>
      </div>

      <div className="space-y-8">
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">English Description</h3>
          </div>
          
          <FormField
            control={form.control}
            name="englishDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">Describe your salon in English</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your salon's unique features, prime location advantages, established clientele, equipment included, growth potential, and why this is an excellent investment opportunity..."
                    className="min-h-32 resize-y border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-900">Vietnamese Description</h3>
          </div>
          
          <FormField
            control={form.control}
            name="vietnameseDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">Mô tả tiệm của bạn bằng tiếng Việt</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Mô tả những điểm đặc biệt của tiệm, vị trí thuận lợi, khách hàng thân thiết, thiết bị đi kèm, tiềm năng phát triển và lý do đây là cơ hội đầu tư tuyệt vời..."
                    className="min-h-32 resize-y border-gray-200 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="p-6 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl border border-amber-100">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-5 h-5 text-amber-600" />
            <h3 className="font-semibold text-gray-900">Reason for Selling</h3>
          </div>
          
          <FormField
            control={form.control}
            name="reasonForSelling"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-gray-700">Why are you selling this business?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your honest reason for selling - retirement, relocation, focusing on other ventures, etc. Transparency builds trust with potential buyers."
                    className="resize-y border-gray-200 focus:border-amber-400 focus:ring-amber-400/20 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Writing Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-100">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <PenTool className="w-4 h-4 text-emerald-600" />
              Writing Tips
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Highlight unique selling points</li>
              <li>• Mention established customer base</li>
              <li>• Include equipment and fixtures</li>
              <li>• Describe growth opportunities</li>
            </ul>
          </div>

          <div className="p-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl border border-rose-100">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-rose-600" />
              Bilingual Advantage
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Providing descriptions in both languages significantly increases your reach and attracts more qualified buyers from diverse backgrounds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
