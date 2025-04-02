
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { BrainCircuit, Sparkles, Users, Zap } from "lucide-react";

const RoleBasedImpact = () => {
  const roles = [
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
  ];

  return (
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
          {roles.map((role, index) => (
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
  );
};

export default RoleBasedImpact;
