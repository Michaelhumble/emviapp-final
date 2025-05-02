
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { ArrowRight } from "lucide-react";

const BilingualExperienceSection: React.FC = () => {
  const { t, toggleLanguage, isVietnamese } = useTranslation();

  return (
    <section className="py-16 md:py-24 overflow-hidden relative">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-70 z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-20 -z-10 transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-20 -z-10 transform -translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* English Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-medium text-gray-800 leading-tight">
              Let's Experience EmviApp Together
            </h2>
            <p className="text-xl md:text-2xl font-light text-gray-700">
              Built With Love for the Beauty Community
            </p>
          </motion.div>
          
          {/* Vietnamese Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-medium text-gray-700 leading-tight">
              Cùng Trải Nghiệm EmviApp
            </h2>
            <p className="text-xl md:text-2xl font-light text-gray-600">
              Nơi Kết Nối Cộng Đồng Làm Đẹp Với Tình Thương
            </p>
          </motion.div>
          
          {/* Call To Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="pt-6"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/sign-up">
                <Button 
                  size="lg" 
                  className="bg-emvi-accent hover:bg-emvi-accent/90 transform hover:scale-[1.02] transition-all duration-200 group"
                >
                  {isVietnamese ? "Đăng Ký Ngay" : "Sign Up Now"}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline"
                onClick={toggleLanguage}
                className="border-emvi-accent/30 text-gray-700 hover:bg-emvi-accent/10"
              >
                {isVietnamese ? "Switch to English" : "Chuyển sang Tiếng Việt"}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BilingualExperienceSection;
