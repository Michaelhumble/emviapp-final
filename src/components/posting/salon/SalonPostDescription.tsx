
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "./salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FileText, Globe, Link, MessageSquare, Lightbulb, TrendingUp } from "lucide-react";

interface SalonPostDescriptionProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonPostDescription = ({ form }: SalonPostDescriptionProps) => {
  return (
    <div className="space-y-10">
      <div className="text-center space-y-4 relative">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-full p-3">
            <FileText className="h-6 w-6 text-purple-600" />
          </div>
        </div>
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 bg-clip-text text-transparent pt-8">
          Tell Your Salon's Success Story
        </h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Paint the perfect picture for potential buyers. Great descriptions lead to 
          <span className="font-semibold text-green-600"> 40% more inquiries</span> and faster sales
        </p>
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200 max-w-lg mx-auto">
          <div className="flex items-center space-x-2 text-amber-700">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">Average: 2-3 offers within first week</span>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <FormField
          control={form.control}
          name="englishDescription"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-base font-semibold flex items-center gap-3 text-gray-800">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-2">
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <div>English Description / Mô tả bằng tiếng Anh</div>
                  <div className="text-xs text-gray-500 font-normal">Reach the widest audience of qualified buyers</div>
                </div>
                <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                  High Impact
                </div>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Textarea
                    placeholder="Transform this opportunity into your success story! Describe your thriving salon's unique atmosphere, loyal clientele, prime location advantages, and why this is the perfect turnkey business for the next owner. Highlight your competitive edge, growth potential, and what makes walking into your salon feel special..."
                    className="min-h-[140px] border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 text-base leading-relaxed placeholder:text-gray-400 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-purple-300 resize-none"
                    {...field}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {field.value?.length || 0}/1000 characters
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vietnameseDescription"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-base font-semibold flex items-center gap-3 text-gray-800">
                <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-lg p-2">
                  <Globe className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <div>Vietnamese Description / Mô tả bằng tiếng Việt</div>
                  <div className="text-xs text-gray-500 font-normal">Connect with Vietnamese-speaking buyers in your community</div>
                </div>
                <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                  Community Focus
                </div>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Textarea
                    placeholder="Hãy kể câu chuyện thành công của tiệm nail! Mô tả không gian độc đáo, khách hàng thân thiết, vị trí đắc địa, và tại sao đây là cơ hội kinh doanh hoàn hảo. Nêu bật những ưu thế cạnh tranh, tiềm năng phát triển, và điều gì khiến tiệm của bạn trở nên đặc biệt..."
                    className="min-h-[140px] border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 text-base leading-relaxed placeholder:text-gray-400 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-purple-300 resize-none"
                    {...field}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {field.value?.length || 0}/1000 ký tự
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="otherNotes"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel className="text-base font-semibold flex items-center gap-3 text-gray-800">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg p-2">
                    <MessageSquare className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div>Additional Highlights / Ghi chú thêm</div>
                    <div className="text-xs text-gray-500 font-normal">Special features, awards, or unique selling points</div>
                  </div>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Award-winning salon • Celebrity clientele • Featured in local media • Exclusive partnerships • Training programs included • Expansion opportunities..."
                    className="min-h-[120px] border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 text-base leading-relaxed placeholder:text-gray-400 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-purple-300"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="virtualTourUrl"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel className="text-base font-semibold flex items-center gap-3 text-gray-800">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-2">
                    <Link className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div>Virtual Tour URL / Tham quan ảo</div>
                    <div className="text-xs text-gray-500 font-normal">360° tours get 5x more engagement</div>
                  </div>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://virtualtour.example.com/your-salon"
                    type="url"
                    className="h-12 border-2 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 text-base placeholder:text-gray-400 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-purple-300"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2 mt-1">
            <Lightbulb className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Writing Tips from Top-Performing Listings</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
                <span><strong>Start with emotion:</strong> "Step into a salon where dreams become reality..."</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                <span><strong>Include numbers:</strong> "500+ loyal clients, 15% annual growth, $50K monthly revenue"</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                <span><strong>Paint the future:</strong> "Imagine owning this turnkey success story..."</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
