
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SalonFormValues } from "./salonFormSchema";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, MessageSquare, Facebook, MessageCircle } from "lucide-react";

interface SalonContactSectionProps {
  form: UseFormReturn<SalonFormValues>;
}

export const SalonContactSection = ({ form }: SalonContactSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Contact Information / Thông tin liên hệ
        </h3>
        <p className="text-gray-600">
          How should interested buyers contact you? / Người mua quan tâm nên liên hệ với bạn như thế nào?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="contactName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium flex items-center gap-2">
                <User className="h-4 w-4 text-purple-600" />
                Contact Name / Tên người liên hệ *
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="John Smith / Anh John"
                  className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium flex items-center gap-2">
                <Mail className="h-4 w-4 text-purple-600" />
                Email Address / Địa chỉ email *
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium flex items-center gap-2">
                <Phone className="h-4 w-4 text-purple-600" />
                Phone Number / Số điện thoại *
              </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="(555) 123-4567"
                  className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactFacebook"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium flex items-center gap-2">
                <Facebook className="h-4 w-4 text-blue-600" />
                Facebook / Facebook
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="facebook.com/yoursalon"
                  className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactZalo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-blue-600" />
                Zalo / Zalo
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Zalo ID or phone number / ID Zalo hoặc số điện thoại"
                  className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-purple-600" />
                Additional Notes / Ghi chú thêm
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Best time to call, preferred contact method, etc. / Thời gian tốt nhất để gọi, phương thức liên hệ ưa thích, v.v."
                  className="h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
