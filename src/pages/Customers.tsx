
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, Calendar, Search, Star } from "lucide-react";

const Customers = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-[#FDFDFD] py-20 md:py-28">
        <motion.div 
          className="container mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold font-serif tracking-wide mb-6">Your Beauty Journey. Simplified with AI.</h1>
            <p className="text-lg text-gray-600 mb-10 font-sans leading-relaxed">
              Instantly discover salons, deals, and services you'll love — without the search.
            </p>
            <Link to="/auth/signup">
              <Button size="lg" className="font-medium px-8 py-6 text-base">
                Explore Nearby Offers
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {[
              { label: "Beauty Professionals", value: "15,000+" },
              { label: "Active Job Listings", value: "2,500+" },
              { label: "Business Opportunities", value: "3,800+" },
              { label: "Hiring Success Rate", value: "92%" },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-2xl md:text-3xl font-serif font-bold text-primary mb-1">
                  {stat.value}
                </span>
                <span className="text-sm text-gray-500">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="bg-[#FDFDFD] py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-3">How EmviApp Helps You</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform makes finding the perfect beauty experience effortless and enjoyable.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="h-10 w-10 text-primary" />,
                title: "Personalized Recommendations",
                description: "Our AI analyzes your preferences, past bookings, and style to suggest salons and services you'll love."
              },
              {
                icon: <Calendar className="h-10 w-10 text-primary" />,
                title: "Real-time Salon Deals",
                description: "Get notified about flash deals, openings, and special offers from top-rated salons in your area."
              },
              {
                icon: <Star className="h-10 w-10 text-primary" />,
                title: "Verified Artist Reviews",
                description: "Read honest reviews from verified customers to ensure you're booking with confidence."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="transition-all hover:shadow-lg h-full flex flex-col">
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-center mb-5">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Salon Deals Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-3">Weekly Salon Deals Near You</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover limited-time offers and special promotions from top salons in your area.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: item * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative h-48 bg-gray-100">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                    <Skeleton className="h-full w-full" />
                    <div className="absolute bottom-3 left-3 bg-primary text-white text-sm py-1 px-3 rounded-full">
                      30% OFF
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-lg mb-2">Salon Name {item}</h3>
                    <p className="text-sm text-gray-600 mb-3">Professional nail care with premium products</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">4.8 ★★★★★</span>
                      <span className="text-sm text-gray-500">2.3 miles away</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI-Matched Artists Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-3">AI-Matched Artists Based on Your Style & Budget</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI suggests beauty professionals who match your preferences, style, and price range.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: item * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-white rounded-lg overflow-hidden shadow transition-all hover:shadow-md h-full">
                  <div className="relative h-48">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">Artist Name</h3>
                    <p className="text-sm text-gray-500 mb-2">Nail Specialist</p>
                    <div className="flex items-center text-sm">
                      <span className="text-amber-500 mr-1">4.9 ★★★★★</span>
                      <span className="text-gray-500">(120 reviews)</span>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-primary font-medium">$45+</span>
                      <Button variant="outline" size="sm">View Profile</Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beauty Tips & Tutorials Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-3">Beauty Tips & Tutorials</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Expert advice, tutorials, and inspiration from top beauty professionals.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "10 Nail Care Tips for Healthy, Strong Nails", category: "Nail Care" },
              { title: "Summer 2023 Nail Art Trends You Need to Try", category: "Trends" },
              { title: "How to Make Your Manicure Last Longer", category: "Guides" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden transition-all hover:shadow-lg h-full flex flex-col">
                  <div className="relative aspect-video">
                    <Skeleton className="h-full w-full" />
                    <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm text-xs font-medium py-1 px-2 rounded">
                      {item.category}
                    </div>
                  </div>
                  <CardContent className="p-5 flex-grow flex flex-col">
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">Learn the best practices and techniques from industry experts.</p>
                    <Button variant="ghost" size="sm" className="text-primary mt-auto self-start">
                      Read More →
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">Create a Free Account to Unlock Member Offers</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of beauty enthusiasts and enjoy exclusive deals, personalized recommendations, and more.
            </p>
            <Link to="/auth/signup">
              <Button size="lg" className="font-medium px-8 py-6 text-base hover:scale-105 transition-transform">
                Sign Up Now — It's Free
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Customers;
