
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

const ArtistMotivationalQuote = () => {
  const [quote, setQuote] = useState<string>("");
  const { userRole } = useAuth();
  
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        // Determine which role to use for the query
        const roleToQuery = userRole || 'other';
        
        // Fetch a motivational quote based on user role
        const { data, error } = await supabase
          .from('motivational_quotes')
          .select('quote_text')
          .eq('role', roleToQuery)
          .maybeSingle();
        
        if (error) {
          console.error("Error fetching motivational quote:", error);
          return;
        }
        
        // If we have a quote for this role, use it
        if (data && data.quote_text) {
          setQuote(data.quote_text);
        } else {
          // Fallback to the 'other' quote if no specific quote is found
          const { data: fallbackData } = await supabase
            .from('motivational_quotes')
            .select('quote_text')
            .eq('role', 'other')
            .maybeSingle();
            
          if (fallbackData && fallbackData.quote_text) {
            setQuote(fallbackData.quote_text);
          } else {
            setQuote("Whatever your dream looks like — you belong here. EmviApp was made for you.");
          }
        }
      } catch (err) {
        console.error("Unexpected error fetching motivational quote:", err);
        toast.error("Could not load your motivational message");
        
        // Set a fallback quote
        setQuote("Whatever your dream looks like — you belong here. EmviApp was made for you.");
      }
    };
    
    fetchQuote();
  }, [userRole]);
  
  if (!quote) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-start">
              <Sparkles className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl md:text-2xl font-serif font-medium mb-2">
                  Your Emvi Inspiration
                </h3>
                <p className="opacity-90">
                  {quote}
                </p>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
};

export default ArtistMotivationalQuote;
