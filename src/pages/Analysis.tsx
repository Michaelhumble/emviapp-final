
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Sparkles, Users, Zap } from "lucide-react";

const Analysis = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-[#FDFDFD] py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm z-10" aria-hidden="true" />
          <img 
            src="https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80" 
            alt="" 
            className="w-full h-full object-cover scale-110 blur-md opacity-20"
            aria-hidden="true"
          />
        </div>
        
        <motion.div 
          className="container mx-auto px-4 relative z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold font-serif tracking-wide mb-6">Here's How We Help Everyone Win</h1>
            <p className="text-lg text-gray-600 mb-8 font-sans leading-relaxed">
              Behind the beauty — there's powerful AI, automation, and empathy guiding every experience.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Role-Based AI Impact Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-3">Role-Based AI Impact</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how our AI technology benefits each role in the beauty ecosystem.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Sparkles className="h-12 w-12 text-primary" />,
                title: "Artists",
                description: "AI finds your perfect gigs — while you sleep."
              },
              {
                icon: <Users className="h-12 w-12 text-primary" />,
                title: "Salon Owners",
                description: "Your next hire — instantly recommended by AI."
              },
              {
                icon: <Zap className="h-12 w-12 text-primary" />,
                title: "Customers",
                description: "Deals, tips, and salons chosen just for you."
              },
              {
                icon: <BrainCircuit className="h-12 w-12 text-primary" />,
                title: "Suppliers",
                description: "Your ads, targeted automatically to buyers."
              }
            ].map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden transition-all hover:shadow-lg h-full backdrop-blur-sm bg-white/80 border border-gray-100">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="mb-4 p-3 rounded-full bg-primary/5 inline-flex">
                      {role.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
                    <p className="text-gray-600">{role.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Automation Engine Section */}
      <section className="bg-[#FDFDFD] py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-3">What Happens Behind the Scenes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our automation engine works tirelessly to create powerful connections.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="border border-gray-100 shadow-lg">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Smart Matching",
                      description: "AI connects roles across interests, timing, and trust."
                    },
                    {
                      title: "Automated Outreach",
                      description: "Emails, texts, and pings run 24/7."
                    },
                    {
                      title: "AI Content",
                      description: "Profiles, bios, and job posts auto-enhanced."
                    }
                  ].map((feature, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <span className="text-primary font-semibold">{index + 1}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Real Numbers Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-3">Real Numbers, Real Results</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform delivers measurable impact across the beauty industry.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                stat: "92%",
                description: "of jobs matched in < 24hrs"
              },
              {
                stat: "$1.2M+",
                description: "in salon booth rentals powered by AI"
              },
              {
                stat: "4.8⭐",
                description: "Avg artist rating"
              },
              {
                stat: "1000s",
                description: "of clients guided to the right pro"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col"
              >
                <Card className="h-full flex flex-col">
                  <CardContent className="p-6 flex-grow flex flex-col items-center justify-center text-center">
                    <span className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">
                      {item.stat}
                    </span>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emotional Trust Block */}
      <section className="bg-[#FDFDFD] py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">You Hustle with Heart. We Power That Hustle.</h2>
            <p className="text-lg text-gray-600 mb-8">
              Everything about EmviApp was built for people like you. We don't just connect — we care.
            </p>
            <Link to="/auth/signup">
              <Button size="lg" className="font-medium px-8 py-6 text-base">
                Get Started — Free Forever
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Analysis;
