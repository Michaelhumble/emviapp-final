
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Scissors, Palette, Brush, Pen } from "lucide-react";

// Testimonial data with different artist types
const testimonials = [
  {
    quote: "I used to post on Facebook and just hope. Now I get real bookings and real results.",
    artist: "Jessica Kim",
    role: "Nail Technician",
    icon: "💅",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60",
    color: "from-pink-500 to-rose-400",
    bg: "bg-gradient-to-br from-pink-900 to-rose-800"
  },
  {
    quote: "Finally—an app that sees makeup artists as artists. EmviApp gave me my dream gig.",
    artist: "Michael Torres",
    role: "Makeup Artist",
    icon: "💄",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60",
    color: "from-violet-500 to-purple-400",
    bg: "bg-gradient-to-br from-violet-900 to-purple-800"
  },
  {
    quote: "I thought this was just for nail salons… but as a barber, I found everything I needed.",
    artist: "Devon Williams",
    role: "Barber",
    icon: "✂️",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60",
    color: "from-blue-500 to-teal-400",
    bg: "bg-gradient-to-br from-blue-900 to-teal-800"
  },
  {
    quote: "Tattoos. Booths. Rent. Jobs. Clients. EmviApp handles it all—and it feels built for me.",
    artist: "Alexa Johnson",
    role: "Tattoo Artist",
    icon: "🖋",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60",
    color: "from-amber-500 to-orange-400",
    bg: "bg-gradient-to-br from-amber-900 to-orange-800"
  }
];

// Icon components map
const iconComponents = {
  "💅": <Brush className="h-5 w-5 text-pink-300" />,
  "💄": <Palette className="h-5 w-5 text-violet-300" />,
  "✂️": <Scissors className="h-5 w-5 text-blue-300" />,
  "🖋": <Pen className="h-5 w-5 text-amber-300" />
};

const ArtistTestimonials = () => {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary rounded-full filter blur-3xl opacity-10" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl opacity-10" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 tracking-tight">
            Why Artists Love EmviApp
          </h2>
          <p className="text-lg text-gray-600">
            Real stories from industry professionals just like you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Card className="h-full overflow-hidden border-0 shadow-xl transition-all duration-300 hover:shadow-2xl">
                <div className={`h-2 bg-gradient-to-r ${testimonial.color}`}></div>
                <CardContent className={`p-0 h-full flex flex-col ${testimonial.bg}`}>
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center mb-4">
                      <div className="p-2 rounded-full bg-white/10 flex items-center justify-center mr-3">
                        {iconComponents[testimonial.icon as keyof typeof iconComponents]}
                      </div>
                      <span className="text-white font-medium">{testimonial.role}</span>
                    </div>
                    
                    <blockquote className="font-serif text-lg md:text-xl mb-6 flex-1 italic text-white/90 leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="flex items-center mt-auto pt-4 border-t border-white/10">
                      <Avatar className="h-10 w-10 mr-3 border-2 border-white/20 shadow-md">
                        <AvatarImage src={testimonial.image} alt={testimonial.artist} />
                        <AvatarFallback className="bg-white/10 text-white">{testimonial.artist.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-white">{testimonial.artist}</p>
                        <p className="text-sm text-white/70">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtistTestimonials;
