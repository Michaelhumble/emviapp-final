
import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Salon Owner",
      company: "Luxe Beauty Studio",
      content: "EmviApp revolutionized how we hire. The AI matching brings us candidates who are perfect fits, not just random applications.",
      rating: 5,
      image: "/lovable-uploads/4e47f970-963a-483f-8356-eb64235bc2db.png"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Nail Technician",
      company: "Independent Artist",
      content: "I found my dream salon through EmviApp. The platform understood my skills and connected me with the perfect opportunity.",
      rating: 5,
      image: "/lovable-uploads/513e8703-1059-4ed5-aef3-9f9b4536b69d.png"
    },
    {
      id: 3,
      name: "Lisa Chen",
      role: "Beauty School Graduate",
      company: "Fresh Start Salon",
      content: "As a new graduate, EmviApp helped me navigate the industry and land my first professional position. The guidance was invaluable.",
      rating: 5,
      image: "/lovable-uploads/565dbac0-48b7-4aaf-b1ad-7c97ca38e1e9.png"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            What Our Community Says
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear directly from beauty professionals who've found success with EmviApp
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="relative">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 h-full border border-purple-100">
                <div className="absolute -top-4 left-8">
                  <div className="bg-purple-600 rounded-full p-3">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                      <div className="text-sm text-purple-600">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
