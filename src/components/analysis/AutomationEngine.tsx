
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const AutomationEngine = () => {
  const features = [
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
  ];

  return (
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
                {features.map((feature, index) => (
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
  );
};

export default AutomationEngine;
