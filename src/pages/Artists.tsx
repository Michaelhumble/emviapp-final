
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Check } from "lucide-react";

const Artists = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-[#FDFDFD] py-16 md:py-24">
        <motion.div 
          className="container mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold font-serif tracking-wide mb-6">You Focus on the Art. We'll Handle the Rest.</h1>
            <p className="text-lg text-gray-600 mb-8 font-sans leading-relaxed">
              Build your client base, manage your schedule, and grow your career with the platform designed for beauty professionals.
            </p>
            <Link to="/auth/signup">
              <Button size="lg" className="font-medium px-8">
                Create Artist Profile
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* AI Job Matches Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-8 text-center">AI Job Matches & Booth Rentals</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Full-time Nail Tech", location: "Diamond Nails, San Francisco", salary: "$65,000 - $85,000/year" },
                { title: "Booth Rental Available", location: "Glam Studio, Los Angeles", price: "$250/week, flexible hours" },
                { title: "Part-time Nail Artist", location: "Polish Perfect, New York", salary: "$30-45/hour + tips" }
              ].map((item, index) => (
                <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative h-36 bg-gray-100">
                    <Skeleton className="h-full w-full" />
                    <div className="absolute top-3 right-3 bg-primary text-white text-xs py-1 px-3 rounded-full">
                      New Opportunity
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{item.location}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary">{item.salary || item.price}</span>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Button variant="outline" className="mx-auto">
                View All Opportunities
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Build Your Profile Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="md:w-1/2 order-2 md:order-1">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-6">Build Your Public Profile + Portfolio</h2>
              <p className="text-lg text-gray-600 mb-6">
                Showcase your work, highlight your skills, and attract your ideal clients. Our AI-powered platform matches you with clients who love your style.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Upload unlimited portfolio images",
                  "Highlight your specialties and services",
                  "Set your rates and availability",
                  "Receive direct booking requests"
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg">Create Your Portfolio</Button>
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <div className="relative rounded-lg overflow-hidden h-72 md:h-96 shadow-xl">
                <Skeleton className="h-full w-full" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent mix-blend-overlay" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-8 text-center">Success Stories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <Card key={item} className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative h-56">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 mr-3">
                        <Skeleton className="h-full w-full" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Sarah Johnson</h3>
                        <p className="text-xs text-gray-500">Nail Artist, 5 years on EmviApp</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 italic mb-4">
                      "EmviApp transformed my career. I've doubled my client base and increased my income by 40% in just one year."
                    </p>
                    <Button variant="ghost" size="sm" className="text-primary">
                      Read Full Story →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
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
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">Join EmviApp — the Platform Made for Artists</h2>
            <p className="text-lg text-gray-600 mb-8">
              Take control of your career, connect with clients who value your work, and become part of a supportive community of beauty professionals.
            </p>
            <Link to="/auth/signup">
              <Button size="lg" className="font-medium px-8">
                Get Started Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Artists;
