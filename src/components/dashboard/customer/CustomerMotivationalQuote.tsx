
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const quotes = [
  {
    text: "Beauty begins the moment you decide to be yourself.",
    author: "Coco Chanel"
  },
  {
    text: "The beauty of a woman is not in a facial mode but the true beauty in a woman is reflected in her soul.",
    author: "Audrey Hepburn"
  },
  {
    text: "To me, beauty is about being comfortable in your own skin.",
    author: "Gwyneth Paltrow"
  },
  {
    text: "There is no exquisite beauty without some strangeness in the proportion.",
    author: "Edgar Allan Poe"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "Everything has beauty, but not everyone sees it.",
    author: "Confucius"
  }
];

const CustomerMotivationalQuote = () => {
  const [quote, setQuote] = useState(quotes[0]);
  
  useEffect(() => {
    // Select a random quote once on mount
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className="overflow-hidden border-pink-100 bg-gradient-to-br from-pink-50 to-white">
        <CardContent className="p-6">
          <Quote className="h-8 w-8 text-pink-300 mb-4" />
          
          <p className="text-xl font-serif italic text-gray-700 mb-4">"{quote.text}"</p>
          
          <div className="flex justify-end">
            <p className="text-sm text-gray-500">— {quote.author}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CustomerMotivationalQuote;
