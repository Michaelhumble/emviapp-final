
import React from "react";
import { motion } from "framer-motion";
import { Check, Heart, Shield, Zap } from "lucide-react";

const EmpathySection = () => {
  const struggles = [
    {
      icon: <Check className="h-6 w-6" />,
      title: "Real, paying clients—no more wasted time",
      description: "Connect with customers who value your artistry and pay what you're worth"
    },
    {
      icon: <Check className="h-6 w-6" />,
      title: "Get discovered faster, get paid instantly",
      description: "Our platform promotes your work to the right audience automatically"
    },
    {
      icon: <Check className="h-6 w-6" />,
      title: "Your art, your brand—finally respected",
      description: "Professional profiles that showcase your talent and build your reputation"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
            We Know the Struggle—
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Here's How We Change the Game
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every challenge you face inspired a feature we built. This is your platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Animated checklist */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {struggles.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 rounded-full shadow-lg">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: Customer reassurance */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-8 rounded-3xl shadow-2xl"
          >
            <div className="text-center space-y-6">
              <div className="bg-white/20 backdrop-blur-md p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                <Heart className="h-10 w-10" />
              </div>
              
              <h3 className="text-3xl font-playfair font-bold">
                For Our Customers
              </h3>
              
              <p className="text-xl text-purple-100">
                We invest in artists—so you always get the very best.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl">
                  <Shield className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm font-semibold">Verified Artists</p>
                </div>
                <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl">
                  <Zap className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm font-semibold">Instant Booking</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EmpathySection;
