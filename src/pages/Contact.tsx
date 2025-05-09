
import React, { useState } from 'react';
import { Mail, Bulb, Bug, Brain, Star, Heart, User } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';

type MessageCategory = 'feature' | 'bug' | 'investor' | 'review' | 'message' | 'other';

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
  category: MessageCategory;
  tone: string;
  featureOnHomepage: boolean;
}

const Contact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<MessageCategory>('message');
  
  const form = useForm<ContactFormValues>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
      category: 'message',
      tone: 'casual',
      featureOnHomepage: false,
    }
  });

  const handleCategorySelect = (category: MessageCategory) => {
    setSelectedCategory(category);
    form.setValue('category', category);
  };
  
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Auto-tag keywords for AI sorting (would be implemented in backend)
    const keywords = extractKeywords(data.message);
    console.log('Extracted keywords:', keywords);
    
    try {
      // This would be an API call in production
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowThankYou(true);
      form.reset();
    } catch (error) {
      toast({
        title: t("Something went wrong", "Có lỗi xảy ra"),
        description: t("Please try again later", "Vui lòng thử lại sau"),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Simple keyword extraction - would be more sophisticated in production
  const extractKeywords = (text: string) => {
    const commonKeywords = ['feature', 'idea', 'bug', 'invest', 'review', 'suggestion', 'improve'];
    return commonKeywords.filter(keyword => text.toLowerCase().includes(keyword));
  };

  const getCategoryIcon = (category: MessageCategory) => {
    switch (category) {
      case 'feature': return <Bulb size={20} />;
      case 'bug': return <Bug size={20} />;
      case 'investor': return <Brain size={20} />;
      case 'review': return <Star size={20} />;
      case 'message': return <Heart size={20} />;
      case 'other': return <Mail size={20} />;
      default: return <Mail size={20} />;
    }
  };

  const isEmailRequired = selectedCategory === 'investor';

  return (
    <Layout>
      <div className="relative py-12 md:py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Decorative elements */}
          <div className="absolute top-24 left-10 w-20 h-20 bg-purple-100 rounded-full opacity-20 -z-10" />
          <div className="absolute bottom-24 right-10 w-32 h-32 bg-pink-100 rounded-full opacity-30 -z-10" />
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              {t("Your Voice Shapes Our Future", "Tiếng Nói Của Bạn Định Hình Tương Lai Chúng Ta")}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
              {t(
                "Every message goes straight to our founding team. We're building EmviApp with you—and for you. Your thoughts matter deeply to us.",
                "Mỗi tin nhắn đều được gửi trực tiếp đến đội ngũ sáng lập. Chúng tôi đang xây dựng EmviApp với bạn và cho bạn. Ý kiến của bạn rất quan trọng đối với chúng tôi."
              )}
            </p>
          </motion.div>
          
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-10 relative overflow-hidden">
            {/* Subtle gradient overlay */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400"></div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Category selection */}
                <div className="space-y-4">
                  <h2 className="text-xl font-medium text-gray-800">
                    {t("What would you like to share?", "Bạn muốn chia sẻ điều gì?")}
                  </h2>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { id: 'feature', label: t("I have a feature idea", "Tôi có ý tưởng tính năng"), icon: <Bulb size={20} /> },
                      { id: 'bug', label: t("I want to report a bug", "Tôi muốn báo lỗi"), icon: <Bug size={20} /> },
                      { id: 'investor', label: t("I'm an investor", "Tôi là nhà đầu tư"), icon: <Brain size={20} /> },
                      { id: 'review', label: t("I want to leave a review", "Tôi muốn để lại đánh giá"), icon: <Star size={20} /> },
                      { id: 'message', label: t("I just want to say something", "Tôi chỉ muốn nói điều gì đó"), icon: <Heart size={20} /> },
                      { id: 'other', label: t("Other...", "Khác..."), icon: <Mail size={20} /> },
                    ].map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => handleCategorySelect(category.id as MessageCategory)}
                        className={`flex items-center justify-center gap-2 p-3 rounded-lg border border-gray-200 text-sm font-medium transition-all hover:border-purple-400 hover:bg-purple-50 ${
                          selectedCategory === category.id 
                            ? 'bg-purple-50 border-purple-400 text-purple-700' 
                            : 'bg-white text-gray-600'
                        }`}
                      >
                        {category.icon}
                        <span>{category.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center space-x-2 mb-1.5">
                          <User size={16} className="text-gray-400" />
                          <Label htmlFor="name" className="text-gray-700">
                            {t("Your name", "Tên của bạn")} {t("(optional)", "(tùy chọn)")}
                          </Label>
                        </div>
                        <FormControl>
                          <Input
                            id="name"
                            placeholder={t("How should we call you?", "Chúng tôi nên gọi bạn thế nào?")}
                            {...field}
                            className="bg-gray-50 border-gray-200 focus:bg-white"
                          />
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
                        <div className="flex items-center space-x-2 mb-1.5">
                          <Mail size={16} className="text-gray-400" />
                          <Label htmlFor="email" className="text-gray-700">
                            {t("Your email", "Email của bạn")} 
                            {isEmailRequired ? '' : t(" (optional)", " (tùy chọn)")}
                          </Label>
                        </div>
                        <FormControl>
                          <Input
                            id="email"
                            type="email"
                            placeholder={t("For us to get back to you", "Để chúng tôi có thể liên hệ lại")}
                            required={isEmailRequired}
                            {...field}
                            className="bg-gray-50 border-gray-200 focus:bg-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center space-x-2 mb-1.5">
                        {getCategoryIcon(selectedCategory)}
                        <Label htmlFor="message" className="text-gray-700">
                          {t("Your message", "Tin nhắn của bạn")}
                        </Label>
                      </div>
                      <FormControl>
                        <Textarea
                          id="message"
                          required
                          placeholder={t("What's on your mind? We're here to listen.", "Bạn đang nghĩ gì? Chúng tôi đang lắng nghe.")}
                          className="min-h-[150px] bg-gray-50 border-gray-200 focus:bg-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message tone */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="tone"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <Label className="text-gray-700">
                          {t("How are you feeling?", "Bạn đang cảm thấy thế nào?")}
                        </Label>
                        <FormControl>
                          <RadioGroup 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            className="flex flex-wrap gap-2 mt-2"
                          >
                            {[
                              { value: 'excited', label: '😄 ' + t("Excited", "Phấn khích") },
                              { value: 'curious', label: '🤔 ' + t("Curious", "Tò mò") },
                              { value: 'casual', label: '😊 ' + t("Casual", "Bình thường") },
                              { value: 'serious', label: '🧐 ' + t("Serious", "Nghiêm túc") },
                              { value: 'concerned', label: '😟 ' + t("Concerned", "Lo lắng") },
                            ].map((tone) => (
                              <div key={tone.value} className="flex items-center">
                                <RadioGroupItem
                                  value={tone.value}
                                  id={`tone-${tone.value}`}
                                  className="peer sr-only"
                                />
                                <Label
                                  htmlFor={`tone-${tone.value}`}
                                  className="flex px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium peer-data-[state=checked]:bg-purple-50 peer-data-[state=checked]:border-purple-300 peer-data-[state=checked]:text-purple-700 cursor-pointer transition-all duration-200 hover:bg-gray-50"
                                >
                                  {tone.label}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Feature on homepage checkbox */}
                <FormField
                  control={form.control}
                  name="featureOnHomepage"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="featureOnHomepage"
                        />
                      </FormControl>
                      <Label
                        htmlFor="featureOnHomepage"
                        className="text-sm font-normal text-gray-600"
                      >
                        {t(
                          "I'd like my message to be considered for featuring on the homepage",
                          "Tôi muốn tin nhắn của mình được xem xét để hiển thị trên trang chủ"
                        )}
                      </Label>
                    </FormItem>
                  )}
                />
                
                {/* Submit button */}
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-8 py-6 h-auto bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-base"
                  >
                    {isSubmitting ? (
                      <span>{t("Sending...", "Đang gửi...")}</span>
                    ) : (
                      <span className="flex items-center gap-2">
                        {t("Send Message", "Gửi Tin Nhắn")} 
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          
          {/* Additional info */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              {t(
                "Questions about how we handle your information? See our Privacy Policy.",
                "Câu hỏi về cách chúng tôi xử lý thông tin của bạn? Xem Chính sách Quyền riêng tư của chúng tôi."
              )}
            </p>
          </div>
        </div>

        {/* Thank you dialog */}
        <Dialog open={showThankYou} onOpenChange={setShowThankYou}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-playfair">
                {t("Thank You", "Cảm Ơn Bạn")}
              </DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-purple-100 p-3">
                  <Heart className="h-6 w-6 text-purple-500" />
                </div>
              </div>
              <p className="text-center px-6">
                {t(
                  "We might not reply to every message, but we feel every one. Your voice is now part of EmviApp's story.",
                  "Chúng tôi có thể không trả lời mọi tin nhắn, nhưng chúng tôi cảm nhận được tất cả. Tiếng nói của bạn giờ đây đã trở thành một phần trong câu chuyện của EmviApp."
                )}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Contact;
