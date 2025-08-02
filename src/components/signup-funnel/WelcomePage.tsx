import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useFunnelTranslation } from '@/hooks/useFunnelTranslation';
import confetti from 'canvas-confetti';

const WelcomePage: React.FC = () => {
  const { t, isVietnamese } = useFunnelTranslation();

  useEffect(() => {
    // Trigger confetti celebration
    const timer = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {isVietnamese 
            ? "Chào mừng đến với EmviApp! | Thành công"
            : "Welcome to EmviApp! | Success"
          }
        </title>
        <meta 
          name="description" 
          content={isVietnamese 
            ? "Chào mừng bạn đến với cộng đồng thợ nail chuyên nghiệp EmviApp"
            : "Welcome to the EmviApp professional beauty community"
          } 
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl w-full"
        >
          {/* Success Animation */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", duration: 0.8 }}
              className="inline-block relative"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 w-24 h-24 bg-green-400/30 rounded-full mx-auto"
              />
            </motion.div>
          </div>

          {/* Welcome Content */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif"
            >
              {t.welcome.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              {t.welcome.subtitle}
            </motion.p>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                {isVietnamese ? "Các bước tiếp theo:" : "Next Steps:"}
              </h3>
              <div className="space-y-3">
                {t.welcome.nextSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-3 text-left"
                  >
                    <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{step}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Link to="/dashboard">
                <Button className="w-full h-16 text-xl font-semibold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white border-0 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-[1.02] group">
                  <span className="mr-2">{t.welcome.ctaButton}</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            {/* Additional Support */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="mt-8 pt-6 border-t border-gray-100"
            >
              <p className="text-sm text-gray-500 mb-4">
                {isVietnamese 
                  ? "Cần hỗ trợ? Đội ngũ của chúng tôi luôn sẵn sàng giúp đỡ!"
                  : "Need help? Our team is here to support you!"
                }
              </p>
              <div className="flex justify-center gap-4">
                <Link 
                  to="/support" 
                  className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                >
                  {isVietnamese ? "Hỗ trợ" : "Support"}
                </Link>
                <span className="text-gray-300">•</span>
                <Link 
                  to="/guide" 
                  className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                >
                  {isVietnamese ? "Hướng dẫn" : "Getting Started Guide"}
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default WelcomePage;