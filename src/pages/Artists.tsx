
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BriefcaseBusiness, BarChart3, Users, Check } from "lucide-react";

const Artists = () => {
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
            <h1 className="text-3xl md:text-5xl font-bold font-serif tracking-wide mb-6">Be Seen. Be Hired. Be Celebrated.</h1>
            <p className="text-lg text-gray-600 mb-10 font-sans leading-relaxed">
              Your profile works while you rest. EmviApp promotes your talent with AI.
            </p>
            <Link to="/auth/signup">
              <Button size="lg" className="font-medium px-8 py-6 text-base">
                Claim My Artist Profile
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
              Our AI-powered platform helps you build your career and connect with clients who value your talent.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BriefcaseBusiness className="h-10 w-10 text-primary" />,
                title: "Smart Job Matching",
                description: "Our AI matches you with salon positions and clients that align with your style, skills, and career goals."
              },
              {
                icon: <Users className="h-10 w-10 text-primary" />,
                title: "Auto-Generated Profiles",
                description: "Create a stunning profile in minutes with our AI-powered tools that highlight your best work."
              },
              {
                icon: <BarChart3 className="h-10 w-10 text-primary" />,
                title: "Boosted Visibility",
                description: "Get discovered by more clients through our intelligent recommendation algorithm."
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

      {/* AI Job Matches Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-3">AI Job Matches & Booth Rentals</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover jobs and rental opportunities that match your career goals and lifestyle.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Full-time Nail Tech", location: "Diamond Nails, San Francisco", salary: "$65,000 - $85,000/year" },
              { title: "Booth Rental Available", location: "Glam Studio, Los Angeles", price: "$250/week, flexible hours" },
              { title: "Part-time Nail Artist", location: "Polish Perfect, New York", salary: "$30-45/hour + tips" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden transition-all hover:shadow-lg h-full">
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
                      <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button variant="outline" className="mx-auto hover:bg-primary/5">
              View All Opportunities
            </Button>
          </div>
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
              <ul className="space-y-4 mb-8">
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
              <Button size="lg" className="hover:scale-105 transition-transform">Create Your Portfolio</Button>
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
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-3">Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from artists who transformed their careers using EmviApp.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden transition-all hover:shadow-lg h-full">
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
                    <Button variant="ghost" size="sm" className="text-primary hover:scale-105 transition-transform">
                      Read Full Story →
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
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">Join EmviApp — the Platform Made for Artists</h2>
            <p className="text-lg text-gray-600 mb-8">
              Take control of your career, connect with clients who value your work, and become part of a supportive community of beauty professionals.
            </p>
            <Link to="/auth/signup">
              <Button size="lg" className="font-medium px-8 py-6 text-base hover:scale-105 transition-transform">
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
