
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const RealNumbers = () => {
  const stats = [
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
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-3">Real Numbers, Real Results</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform delivers measurable impact across the beauty industry.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
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
  );
};

export default RealNumbers;
