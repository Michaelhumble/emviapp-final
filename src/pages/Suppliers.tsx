
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Suppliers = () => {
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
            <h1 className="text-3xl md:text-5xl font-bold font-serif tracking-wide mb-6">Get Your Products in the Hands of Pros.</h1>
            <p className="text-lg text-gray-600 mb-8 font-sans leading-relaxed">
              Connect directly with salons and artists who are looking for quality beauty supplies, equipment, and materials for their businesses.
            </p>
            <Link to="/auth/signup">
              <Button size="lg" className="font-medium px-8">
                Become a Supplier
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Ad Placement Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="md:w-1/2 order-2 md:order-1">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-6">Ad Placement & Product Listing Features</h2>
              <p className="text-lg text-gray-600 mb-6">
                Showcase your products to thousands of beauty professionals actively looking for quality supplies. Create detailed product listings with specifications, pricing, and availability.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Premium placement on relevant searches",
                  "Detailed product galleries with multiple images",
                  "Direct messaging with potential buyers",
                  "Analytics on product views and inquiries"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary font-bold mr-2">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg">List Your Products</Button>
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <div className="relative rounded-lg overflow-hidden h-72 md:h-96 shadow-xl">
                <Skeleton className="h-full w-full" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent mix-blend-overlay" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Promotion Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-8 text-center">AI Promotion: EmviApp Recommends Your Products to the Right Users</h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
              Our intelligent recommendation engine analyzes users' preferences, behaviors, and needs to match them with relevant products.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Targeted Recommendations",
                  description: "Products are suggested to users based on their specific service offerings and client needs."
                },
                {
                  title: "Personalized Promotions",
                  description: "Special offers and discounts are shown to users most likely to convert based on their purchase history."
                },
                {
                  title: "Contextual Placement",
                  description: "Your products appear in relevant educational content, trending techniques, and service packages."
                }
              ].map((item, index) => (
                <Card key={index} className="transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="h-32 bg-primary/5 rounded-md flex items-center justify-center mb-5">
                      <Skeleton className="h-20 w-20 rounded-full" />
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

      {/* Upsell & Collab Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-8 text-center">Upsell Space Rental or Giveaway Collabs</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-48">
                  <Skeleton className="h-full w-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-semibold">Space Rental</h3>
                  </div>
                </div>
                <CardContent className="p-5">
                  <p className="text-gray-600 mb-4">
                    Rent booth space at major industry events or salon locations to showcase your products directly to professionals.
                  </p>
                  <Button variant="outline">Learn More</Button>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-48">
                  <Skeleton className="h-full w-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-semibold">Giveaway Collaborations</h3>
                  </div>
                </div>
                <CardContent className="p-5">
                  <p className="text-gray-600 mb-4">
                    Partner with popular artists and salons for product giveaways to increase brand awareness and generate leads.
                  </p>
                  <Button variant="outline">Learn More</Button>
                </CardContent>
              </Card>
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
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">Become a Beauty Supplier on EmviApp</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join our network of trusted suppliers and connect directly with beauty professionals who value quality and innovation.
            </p>
            <Link to="/auth/signup">
              <Button size="lg" className="font-medium px-8">
                Join as a Supplier
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Suppliers;
