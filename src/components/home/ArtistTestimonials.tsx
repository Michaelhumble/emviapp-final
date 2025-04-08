
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
    color: "from-pink-100 to-rose-200"
  },
  {
    quote: "Finally—an app that sees makeup artists as artists. EmviApp gave me my dream gig.",
    artist: "Michael Torres",
    role: "Makeup Artist",
    icon: "💄",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60",
    color: "from-violet-100 to-purple-200"
  },
  {
    quote: "I thought this was just for nail salons… but as a barber, I found everything I needed.",
    artist: "Devon Williams",
    role: "Barber",
    icon: "✂️",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60",
    color: "from-blue-100 to-teal-200"
  },
  {
    quote: "Tattoos. Booths. Rent. Jobs. Clients. EmviApp handles it all—and it feels built for me.",
    artist: "Alexa Johnson",
    role: "Tattoo Artist",
    icon: "🖋",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60",
    color: "from-amber-100 to-orange-200"
  }
];

// Icon components map
const iconComponents = {
  "💅": <Brush className="h-5 w-5 text-pink-600" />,
  "💄": <Palette className="h-5 w-5 text-violet-600" />,
  "✂️": <Scissors className="h-5 w-5 text-blue-600" />,
  "🖋": <Pen className="h-5 w-5 text-amber-600" />
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
            >
              <Card className="h-full overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className={`bg-gradient-to-br ${testimonial.color} h-2`} />
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <span className="text-xl mr-2">{testimonial.icon}</span>
                    <div className="flex-1">{testimonial.role}</div>
                  </div>
                  
                  <blockquote className="font-serif text-lg mb-6 flex-1 italic text-gray-700">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex items-center mt-auto">
                    <Avatar className="h-10 w-10 mr-3 border border-white shadow-sm">
                      <AvatarImage src={testimonial.image} alt={testimonial.artist} />
                      <AvatarFallback>{testimonial.artist.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{testimonial.artist}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
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
