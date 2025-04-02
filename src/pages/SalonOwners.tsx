
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Users, LineChart, Filter } from "lucide-react";

const SalonOwners = () => {
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
            <h1 className="text-3xl md:text-5xl font-bold font-serif tracking-wide mb-6">Your Dream Team Is One Click Away.</h1>
            <p className="text-lg text-gray-600 mb-10 font-sans leading-relaxed">
              Post jobs, view top-rated artists, and fill empty chairs fast — powered by AI.
            </p>
            <Link to="/auth/signup">
              <Button size="lg" className="font-medium px-8 py-6 text-base">
                Start Hiring
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
              Our AI-powered platform helps salon owners build the perfect team with ease.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="h-10 w-10 text-primary" />,
                title: "Instant Job Listings",
                description: "Create detailed job listings in minutes and reach thousands of qualified beauty professionals."
              },
              {
                icon: <Filter className="h-10 w-10 text-primary" />,
                title: "Artist Filtering",
                description: "Find the perfect candidate using advanced filters for skills, location, experience, and availability."
              },
              {
                icon: <LineChart className="h-10 w-10 text-primary" />,
                title: "AI Recommendations",
                description: "Our AI analyzes thousands of profiles to find candidates that best match your salon's needs."
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

      {/* Artist Profiles Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-3">View Artist Profiles</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Browse through our database of qualified beauty professionals who are actively looking for new opportunities.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: item * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden transition-all hover:shadow-lg h-full">
                    <div className="relative h-48">
                      <Skeleton className="h-full w-full" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-1">Jennifer Smith</h3>
                      <p className="text-xs text-gray-500 mb-2">Nail Artist • 5+ years exp</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {['Gel', 'Acrylic', 'Nail Art'].map((tag, i) => (
                          <span key={i} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Button variant="outline" size="sm" className="w-full hover:bg-primary/5">View Profile</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Button variant="outline" className="hover:bg-primary/5">View All Artists</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Post Job Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="md:w-1/2">
              <div className="relative rounded-lg overflow-hidden h-72 md:h-96 shadow-xl">
                <Skeleton className="h-full w-full" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent mix-blend-overlay" />
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-6">Post Your First Job For Free</h2>
              <p className="text-lg text-gray-600 mb-6">
                Create a detailed job listing with all your requirements and let our AI-powered matching system find the right candidates for you.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Reach thousands of qualified professionals",
                  "Set specific skill requirements and experience levels",
                  "Review applicant portfolios and credentials",
                  "Schedule interviews directly through the platform"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary font-bold mr-2">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" className="hover:scale-105 transition-transform">Post a Job — It's Free</Button>
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
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">Start Hiring with EmviApp</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of salon owners who trust EmviApp to find, vet, and hire the best beauty professionals in the industry.
            </p>
            <Link to="/auth/signup">
              <Button size="lg" className="font-medium px-8 py-6 text-base hover:scale-105 transition-transform">
                Create Salon Account
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default SalonOwners;
