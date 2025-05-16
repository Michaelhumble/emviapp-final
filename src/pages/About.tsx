
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Heart, Target, Award, Star, MessageCircle, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import { GradientBackground } from '@/components/ui/gradient-background';

const AboutPage = () => {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  // Values with icons
  const values = [
    {
      icon: <Users className="h-8 w-8 text-purple-500" />,
      title: "Community First",
      description: "We believe in building a supportive network where professionals help each other grow."
    },
    {
      icon: <Award className="h-8 w-8 text-purple-500" />,
      title: "Quality Service",
      description: "We champion excellence in beauty services through education and showcasing top talent."
    },
    {
      icon: <Heart className="h-8 w-8 text-purple-500" />,
      title: "Inclusivity",
      description: "Our platform welcomes all skill levels, backgrounds, and beauty specialties."
    },
    {
      icon: <Rocket className="h-8 w-8 text-purple-500" />,
      title: "Innovation",
      description: "We continuously improve our platform to better serve the evolving beauty industry."
    }
  ];

  // Timeline events
  const timeline = [
    {
      year: "2022",
      title: "The Idea",
      description: "EmviApp was born from a vision to transform how beauty professionals connect with clients."
    },
    {
      year: "2023",
      title: "Development",
      description: "Our team created the foundation of a platform that truly understands the beauty industry."
    },
    {
      year: "2024",
      title: "Launch",
      description: "EmviApp went live, bringing innovative solutions to beauty professionals and salons."
    },
    {
      year: "Future",
      title: "Growth",
      description: "Expanding our community and features to revolutionize the beauty industry."
    }
  ];

  return (
    <>
      <Helmet>
        <title>About EmviApp</title>
        <meta name="description" content="Learn more about EmviApp and our mission to connect beauty professionals with clients." />
      </Helmet>
      <Layout>
        {/* Hero section with gradient background */}
        <div className="bg-gradient-to-b from-purple-50 to-white pt-12 pb-16 md:pt-16 md:pb-20">
          <div className="container max-w-4xl mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-6 font-playfair bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                Beautiful Connections, Beautiful Business
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                EmviApp is building the future of beauty industry connections, 
                where talented professionals and clients create magic together.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main content area */}
        <div className="container max-w-4xl mx-auto px-4 py-8 -mt-16">
          {/* Mission Section - Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <GradientBackground variant="premium" className="p-8 md:p-10 mb-12 shadow-lg">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="rounded-full bg-purple-100 p-5 flex-shrink-0">
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                  <p className="text-lg text-gray-700">
                    EmviApp was created to bridge the gap between beauty professionals and clients, 
                    making it easier than ever for talented artists to showcase their work and for 
                    clients to discover skilled professionals in their area.
                  </p>
                </div>
              </div>
            </GradientBackground>
          </motion.div>

          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center font-playfair">Our Story</h2>
            <Card className="p-6 md:p-8 shadow-md bg-white/80 backdrop-blur-sm border border-gray-100">
              <p className="text-lg mb-4">
                Founded with a passion for empowering beauty industry professionals, EmviApp began as a simple idea: 
                what if we could create a platform that truly serves both independent artists and established salons?
              </p>
              <p className="text-lg">
                Today, we're building the most comprehensive beauty professional networking platform, 
                designed specifically for the unique needs of nail technicians, hair stylists, 
                lash artists, barbers, makeup artists, and more.
              </p>
            </Card>
          </motion.div>

          {/* Values Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center font-playfair">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full p-6 hover:shadow-md transition-shadow duration-300">
                    <div className="flex flex-col items-center text-center">
                      {value.icon}
                      <h3 className="text-xl font-semibold mt-4 mb-2">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Timeline Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center font-playfair">Our Journey</h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-purple-300 to-blue-300"></div>
              
              {/* Timeline events */}
              <div className="space-y-12 md:space-y-0">
                {timeline.map((event, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 + index * 0.1 }}
                    className={`md:flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:items-center`}
                  >
                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <div className={`bg-white p-6 rounded-lg shadow-md border border-gray-100 ${index % 2 === 0 ? 'ml-0 mr-auto' : 'mr-0 ml-auto'}`}>
                        <div className="text-purple-500 font-bold text-xl mb-2">{event.year}</div>
                        <h3 className="text-lg font-bold mb-1">{event.title}</h3>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                    </div>
                    
                    {/* Timeline dot */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-white border-4 border-purple-500"></div>
                    
                    {/* Empty space for the other side */}
                    <div className="md:w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Founder's Note */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mb-16"
          >
            <GradientBackground variant="premium" className="p-8 md:p-10 shadow-lg">
              <div className="flex flex-col items-center text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 font-playfair">Founder's Note</h2>
                <div className="rounded-full bg-gradient-to-r from-purple-100 to-blue-100 p-1 mb-6">
                  <div className="rounded-full bg-white p-1">
                    <MessageCircle className="h-8 w-8 text-purple-500" />
                  </div>
                </div>
                <p className="text-lg italic text-gray-700 mb-6">
                  "We believe that technology should make the beauty industry more human, not less. 
                  EmviApp exists to amplify the talent, passion, and connection that make the beauty 
                  profession so special. Together, we're building something extraordinary."
                </p>
                <div className="flex items-center justify-center">
                  <div>
                    <p className="font-bold">The EmviApp Team</p>
                    <p className="text-sm text-muted-foreground">Building beauty's digital future</p>
                  </div>
                </div>
              </div>
            </GradientBackground>
          </motion.div>

          {/* Team Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible" 
            className="mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center font-playfair">Our Team</h2>
            <Card className="p-6 md:p-8 shadow-md">
              <p className="text-lg text-center">
                EmviApp is brought to you by a dedicated team of beauty industry enthusiasts and technology experts 
                who understand the challenges facing modern beauty professionals. We're working every day to build 
                features that make your professional life easier and help your business thrive.
              </p>
            </Card>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="text-center py-8 md:py-12"
          >
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-8 md:p-12 shadow-md">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 font-playfair">Join Our Community</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Whether you're a salon owner looking to grow your business, an independent artist seeking new clients, 
                or someone passionate about beauty looking for skilled professionals, EmviApp is here for you.
              </p>
              <Button 
                onClick={() => navigate('/sign-up')} 
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-6 px-8 text-lg hover:from-purple-700 hover:to-blue-700"
              >
                Get Started Free
              </Button>
            </div>
          </motion.div>
        </div>
      </Layout>
    </>
  );
};

export default AboutPage;
