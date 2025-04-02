
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Users, LineChart } from "lucide-react";

const SalonOwners = () => {
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
            <h1 className="text-3xl md:text-5xl font-bold font-serif tracking-wide mb-6">Find Your Next Nail Tech in Seconds.</h1>
            <p className="text-lg text-gray-600 mb-8 font-sans leading-relaxed">
              Smart hiring tools, verified professional profiles, and AI-matching to help you build the perfect team for your salon.
            </p>
            <Link to="/auth/signup">
              <Button size="lg" className="font-medium px-8">
                Start Hiring Now
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Smart Hiring Tools Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-10 text-center">Smart Hiring Tools Powered by AI</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Search className="h-10 w-10 text-primary" />,
                  title: "Intelligent Matching",
                  description: "Our AI analyzes thousands of profiles to find the perfect fit for your salon's culture and needs."
                },
                {
                  icon: <Users className="h-10 w-10 text-primary" />,
                  title: "Verified Professionals",
                  description: "Every artist is verified with background checks, license verification, and skill assessment."
                },
                {
                  icon: <LineChart className="h-10 w-10 text-primary" />,
                  title: "Performance Analytics",
                  description: "Track applicant responses, interview schedules, and hiring metrics all in one dashboard."
                }
              ].map((item, index) => (
                <Card key={index} className="transition-all hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-5">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
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
          >
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-8 text-center">View Artist Profiles</h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
              Browse through our database of qualified beauty professionals who are actively looking for new opportunities.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <Card key={item} className="overflow-hidden transition-all hover:shadow-lg">
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
                    <Button variant="outline" size="sm" className="w-full">View Profile</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Button variant="outline">View All Artists</Button>
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
              <ul className="space-y-3 mb-8">
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
              <Button size="lg">Post a Job — It's Free</Button>
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
              <Button size="lg" className="font-medium px-8">
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
