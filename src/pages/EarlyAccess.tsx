
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, ChevronLeft } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const EarlyAccess: React.FC = () => {
  const { t } = useTranslation();
  
  // Refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null);
  const socialProofRef = useRef<HTMLDivElement>(null);
  const urgencyRef = useRef<HTMLDivElement>(null);

  // Scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe elements for scroll animation
    [heroRef, socialProofRef, urgencyRef].forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    // Cleanup
    return () => {
      [heroRef, socialProofRef, urgencyRef].forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="py-24 px-4 max-w-5xl mx-auto text-center">
        <div ref={heroRef} className="opacity-0 transition-opacity duration-1000">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
              You're Not Just Early — You're Essential.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 font-light max-w-3xl mx-auto">
              Unlock VIP Access to The Beauty Industry's Future.
            </p>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg py-6 px-8 rounded-md hover:opacity-90 transition-all duration-300 shadow-md group">
              Claim My VIP Access
              <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="mt-6 text-gray-500 font-light">
              Support EmviApp's mission — pay what feels right after you join.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
        <div ref={socialProofRef} className="max-w-4xl mx-auto text-center opacity-0 transition-all duration-1000">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            <h3 className="text-2xl font-playfair mb-8 text-gray-800">
              Join 1,200+ beauty professionals shaping the future.
            </h3>
            <div className="flex justify-center space-x-2 mb-8 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-200 to-indigo-100 border border-white shadow-sm"
                />
              ))}
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-medium">
                +1K
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
              {["Hairstylist", "Salon Owner", "Nail Artist", "Makeup Artist", "Esthetician"].map(
                (role, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full bg-white shadow-sm text-gray-700 text-sm"
                  >
                    {role}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-20 px-4">
        <div ref={urgencyRef} className="max-w-4xl mx-auto text-center opacity-0 transition-all duration-1000">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
            className="p-8 md:p-12 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-100"
          >
            <div className="inline-block mb-6 px-4 py-2 rounded-full bg-purple-100 text-purple-800 text-sm font-medium">
              Limited Availability
            </div>
            <h3 className="text-2xl md:text-3xl font-playfair mb-6 text-gray-900">
              Early Access spots are limited — secure yours before public launch.
            </h3>
            <div className="mb-8 bg-white rounded-full h-3 max-w-sm mx-auto overflow-hidden shadow-inner">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full w-[65%] rounded-full" />
            </div>
            <p className="text-lg text-gray-600 font-light mb-8">
              87 VIP spots left this month
            </p>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-6 px-10 rounded-md hover:opacity-90 transition-all duration-300 shadow-md">
              Secure My Early Access
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Teaser */}
      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100"
          >
            <h4 className="text-xl font-playfair mb-1 text-gray-900">
              {t({
                english: "Coming Soon: The Smartest Way to Keep Your Clients",
                vietnamese: "Sắp Ra Mắt: Cách Thông Minh Nhất để Giữ Chân Khách Hàng của Bạn"
              })}
            </h4>
            <p className="text-gray-600 text-sm">
              {t({
                english: "Our AI-driven client retention system is in final testing",
                vietnamese: "Hệ thống giữ chân khách hàng dựa trên AI của chúng tôi đang trong giai đoạn thử nghiệm cuối cùng"
              })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Return to Homepage Button */}
      <div className="pb-16 text-center">
        <Link to="/">
          <Button variant="ghost" className="text-gray-600 hover:text-gray-900 font-playfair flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            {t({
              english: "Return to EmviApp Homepage",
              vietnamese: "Quay lại Trang chủ EmviApp"
            })}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EarlyAccess;
