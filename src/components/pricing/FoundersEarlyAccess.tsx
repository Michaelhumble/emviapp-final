
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const foundersPlans = [
  {
    id: 'artist',
    title: 'Artist Access Pass',
    price: 29,
    description: 'Get premium tools & visibility at launch.',
    buttonText: 'Reserve My Artist Access',
    stripeLink: '/checkout?plan=artist_access',
  },
  {
    id: 'salon',
    title: 'Salon Pro Pass',
    price: 79,
    description: 'Unlock marketing tools & priority job listings.',
    buttonText: 'Secure My Salon Spot',
    stripeLink: '/checkout?plan=salon_pro',
  },
  {
    id: 'freelancer',
    title: 'Freelancer Boost Pass',
    price: 39,
    description: 'Enhance your profile & early booking features.',
    buttonText: 'Join as Freelancer',
    stripeLink: '/checkout?plan=freelancer_boost',
  },
];

const FoundersEarlyAccess = () => {
  return (
    <section className="py-12 px-4 bg-gradient-to-b from-white to-[#F8F7FF]">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <Badge 
            variant="outline" 
            className="mb-4 bg-primary/5 text-primary px-4 py-1.5"
          >
            Limited Time Offer
          </Badge>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            🎉 Founder's Early Access
          </h2>
          <h3 className="text-xl md:text-2xl text-emvi-dark mb-4">
            Unlock 3 Months FREE + Lifetime Discount!
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Reserve your spot today with a small deposit and be part of EmviApp's VIP launch community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {foundersPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full backdrop-blur-sm bg-white/90 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex flex-col items-center">
                    <span className="text-xl mb-4">{plan.title}</span>
                    <div className="text-3xl font-bold font-serif">
                      ${plan.price}
                      <span className="text-base ml-1 text-gray-500">deposit</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-600 mb-6">
                    {plan.description}
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button 
                    className="w-full bg-emvi-accent hover:bg-emvi-accent/90"
                    size="lg"
                    onClick={() => window.location.href = plan.stripeLink}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-emvi-accent font-medium">
            🚨 Limited Spots Available — Offer expires soon.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FoundersEarlyAccess;
