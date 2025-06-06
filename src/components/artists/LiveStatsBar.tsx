
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, DollarSign, TrendingUp, Star } from "lucide-react";

const LiveStatsBar = () => {
  const [artists, setArtists] = useState(3712);
  const [earnings, setEarnings] = useState(86000);
  const [successRate, setSuccessRate] = useState(94);

  useEffect(() => {
    // Simulate live updates
    const interval = setInterval(() => {
      setArtists(prev => prev + Math.floor(Math.random() * 3));
      if (Math.random() > 0.7) {
        setEarnings(prev => prev + Math.floor(Math.random() * 500));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: <Users className="h-5 w-5" />,
      value: artists.toLocaleString(),
      label: "artists joined",
      color: "text-blue-600"
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      value: `$${earnings.toLocaleString()}`,
      label: "paid to artists this month",
      color: "text-green-600"
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      value: `${successRate}%`,
      label: "get booked in 7 days",
      color: "text-purple-600"
    }
  ];

  return (
    <section className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-center justify-center space-x-3 text-white"
            >
              <div className={`${stat.color} bg-white/10 p-2 rounded-full`}>
                {stat.icon}
              </div>
              <div className="text-center md:text-left">
                <motion.div 
                  className="text-2xl md:text-3xl font-bold"
                  key={stat.value}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Customer and Artist messaging */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-white/20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">For Customers</span>
            </div>
            <p className="text-white text-lg">
              Every artist on EmviApp is handpicked, reviewed, and rewarded for excellence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <Users className="h-5 w-5 text-purple-400" />
              <span className="text-purple-400 font-semibold">For Artists</span>
            </div>
            <p className="text-white text-lg">
              Want your photo here? Join and unlock exclusive perks + VIP status!
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveStatsBar;
