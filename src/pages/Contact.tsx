
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Lightbulb, Bug, Brain, Star, Heart, HelpCircle, SendHorizonal } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

// Message category types
type MessageCategory = 
  | "feature"
  | "bug"
  | "investor"
  | "review"
  | "general"
  | "other";

// Schema for form validation
const contactFormSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  category: z.string().min(1, { message: "Please select a category" }),
  message: z.string().min(3, { message: "Message must be at least 3 characters" }),
  tone: z.string().optional(),
  featured: z.boolean().default(false),
});

// Form values type
type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<MessageCategory | null>(null);
  
  // Initialize the form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      category: "",
      message: "",
      tone: "casual",
      featured: false,
    },
  });

  // Get the category icon based on selection
  const getCategoryIcon = (category: MessageCategory) => {
    switch (category) {
      case "feature":
        return <Lightbulb className="h-5 w-5" />;
      case "bug":
        return <Bug className="h-5 w-5" />;
      case "investor":
        return <Brain className="h-5 w-5" />;
      case "review":
        return <Star className="h-5 w-5" />;
      case "general":
        return <Heart className="h-5 w-5" />;
      case "other":
        return <HelpCircle className="h-5 w-5" />;
      default:
        return null;
    }
  };

  // Handle form submission
  const onSubmit = (values: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Simulate sending the message to the backend
    setTimeout(() => {
      console.log("Form submitted:", values);
      
      // Show thank you dialog
      setShowThankYou(true);
      setIsSubmitting(false);
      
      // Reset the form
      form.reset();
      setSelectedCategory(null);
    }, 1500);
  };

  // Select a category
  const handleCategorySelect = (category: MessageCategory) => {
    setSelectedCategory(category);
    form.setValue("category", category);
  };

  // Close the thank you dialog
  const handleCloseThankYou = () => {
    setShowThankYou(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent mb-4">
            {t("We Read Everything. This Is Your Moment.", "Chúng Tôi Đọc Tất Cả. Đây Là Khoảnh Khắc Của Bạn.")}
          </h1>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-700 mb-6">
              {t(
                "Every message goes straight to our founding team. We're building EmviApp with you—your voice matters, whether you're an artist, salon owner, customer, or potential partner.",
                "Mỗi tin nhắn sẽ được gửi trực tiếp đến đội ngũ sáng lập của chúng tôi. Chúng tôi đang xây dựng EmviApp cùng với bạn—tiếng nói của bạn rất quan trọng, dù bạn là một nghệ sĩ, chủ salon, khách hàng hay đối tác tiềm năng."
              )}
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {t("What's on your mind?", "Bạn đang nghĩ gì?")}
            </h2>
            <p className="text-gray-600">
              {t(
                "Choose a category that best describes your message.",
                "Chọn danh mục mô tả tốt nhất tin nhắn của bạn."
              )}
            </p>
          </div>

          {/* Category Selection */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
            {[
              { id: "feature", label: t("I have a feature idea 💡", "Tôi có một ý tưởng tính năng 💡"), icon: <Lightbulb className="h-5 w-5" /> },
              { id: "bug", label: t("I want to report a bug 🐞", "Tôi muốn báo cáo lỗi 🐞"), icon: <Bug className="h-5 w-5" /> },
              { id: "investor", label: t("I'm an investor 🧠", "Tôi là nhà đầu tư 🧠"), icon: <Brain className="h-5 w-5" /> },
              { id: "review", label: t("I want to leave a review ⭐️", "Tôi muốn để lại đánh giá ⭐️"), icon: <Star className="h-5 w-5" /> },
              { id: "general", label: t("I just want to say something ❤️", "Tôi chỉ muốn nói điều gì đó ❤️"), icon: <Heart className="h-5 w-5" /> },
              { id: "other", label: t("Other...", "Khác..."), icon: <HelpCircle className="h-5 w-5" /> },
            ].map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`flex flex-col items-center justify-center h-24 gap-2 text-sm transition-all ${
                  selectedCategory === category.id 
                    ? "border-2 border-purple-500 bg-purple-50 text-purple-700" 
                    : "hover:bg-purple-50 hover:border-purple-300"
                }`}
                onClick={() => handleCategorySelect(category.id as MessageCategory)}
              >
                <div className={`p-2 rounded-full ${selectedCategory === category.id ? "bg-purple-100" : "bg-gray-100"}`}>
                  {category.icon}
                </div>
                <span className="text-center">{category.label}</span>
              </Button>
            ))}
          </div>

          {/* Contact Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Name (optional)", "Tên (không bắt buộc)")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("Your name", "Tên của bạn")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {selectedCategory === "investor" 
                          ? t("Email (required)", "Email (bắt buộc)") 
                          : t("Email (optional)", "Email (không bắt buộc)")}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={t("your@email.com", "email@của.bạn")} 
                          type="email" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Message tone", "Tông giọng")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("Select tone", "Chọn tông giọng")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="casual">{t("Casual", "Thân mật")}</SelectItem>
                        <SelectItem value="excited">{t("Excited", "Phấn khích")}</SelectItem>
                        <SelectItem value="serious">{t("Serious", "Nghiêm túc")}</SelectItem>
                        <SelectItem value="urgent">{t("Urgent", "Khẩn cấp")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Your message", "Tin nhắn của bạn")}</FormLabel>
                    <FormControl>
                      <textarea
                        className="flex h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder={t("Tell us what you're thinking...", "Hãy cho chúng tôi biết bạn đang nghĩ gì...")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <input
                        type="checkbox"
                        className="h-4 w-4 mt-1"
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        {t("I want my review or idea featured on the homepage!", "Tôi muốn đánh giá hoặc ý tưởng của mình được hiển thị trên trang chủ!")}
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full md:w-auto h-12 px-10 text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span>{t("Sending...", "Đang gửi...")}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <SendHorizonal className="h-5 w-5" />
                    <span>{t("Send Message", "Gửi Tin Nhắn")}</span>
                  </div>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>

      {/* Thank You Dialog */}
      <Dialog open={showThankYou} onOpenChange={handleCloseThankYou}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="text-center p-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {t("Thank you for reaching out!", "Cảm ơn bạn đã liên hệ!")}
              </h2>
              <p className="text-gray-600">
                {t(
                  "We might not reply to every message, but we feel every one. Your voice is now part of EmviApp's story.",
                  "Chúng tôi có thể không trả lời mọi tin nhắn, nhưng chúng tôi cảm nhận được tất cả. Tiếng nói của bạn giờ đây là một phần trong câu chuyện của EmviApp."
                )}
              </p>
            </div>
          </DialogHeader>
          <div className="flex justify-center">
            <Button onClick={handleCloseThankYou}>
              {t("Close", "Đóng")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Contact;
