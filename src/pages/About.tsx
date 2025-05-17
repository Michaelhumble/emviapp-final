
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Container } from '@/components/ui/container';
import { GradientBackground } from '@/components/ui/gradient-background';
import { Button } from '@/components/ui/button';
import { 
  Award, 
  ArrowDown, 
  Bug, 
  Book, 
  Rocket, 
  Star, 
  Users, 
  Zap, 
  Sun, 
  Heart 
} from 'lucide-react';
import Logo from '@/components/ui/Logo';

const AboutPage = () => {
  const navigate = useNavigate();

  const timelineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const valueCards = [
    {
      title: "Community First",
      icon: <Users className="w-6 h-6 text-purple-600" />,
      description: "We build technology that strengthens real-world connections, bringing together artists, salon owners, and clients in meaningful ways."
    },
    {
      title: "Quality Service",
      icon: <Star className="w-6 h-6 text-purple-600" />,
      description: "We believe every customer deserves exceptional service, and every beauty professional deserves recognition for their craft and artistry."
    },
    {
      title: "Inclusivity",
      icon: <Users className="w-6 h-6 text-purple-600" />,
      description: "We create spaces where everyone belongs—across languages, cultures, specialties, and backgrounds—united by a passion for beauty."
    },
    {
      title: "Innovation",
      icon: <Zap className="w-6 h-6 text-purple-600" />,
      description: "We constantly evolve, using technology to solve real problems and create opportunities that weren't possible before."
    }
  ];

  const timelineMilestones = [
    {
      year: "2014",
      icon: <ArrowDown className="w-5 h-5 text-purple-600" />,
      title: "The Idea Is Born",
      description: "What began as a simple thought—to bridge gaps in the beauty industry through technology—quickly became an obsession. Working nights and weekends, I sketched the first vision of what EmviApp could become."
    },
    {
      year: "2015",
      icon: <Bug className="w-5 h-5 text-purple-600" />,
      title: "First Build, Many Failures",
      description: "Our first attempt at building the app was full of technical challenges and market misunderstandings. We learned painful but necessary lessons about what the industry truly needed versus what we thought it wanted."
    },
    {
      year: "2016-2023",
      icon: <Book className="w-5 h-5 text-purple-600" />,
      title: "Years of Learning & Heartbreak",
      description: "Through economic challenges, pandemic disruptions, and countless pivots, we never stopped believing. Each setback became a stepping stone, each failure a lesson that shaped our understanding of how to truly serve the beauty community."
    },
    {
      year: "2024",
      icon: <Rocket className="w-5 h-5 text-purple-600" />,
      title: "New Hope, Fresh Start",
      description: "With renewed vision and energy, we rebuilt EmviApp from the ground up. Armed with years of industry knowledge and technological advances, we created something truly special—a platform built by and for the beauty industry."
    },
    {
      year: "2025",
      icon: <Star className="w-5 h-5 text-purple-600" />,
      title: "The Dream Comes True",
      description: "The journey culminates as EmviApp fully launches, bringing together thousands of beauty professionals, salon owners, and clients. What began as one person's vision has become a thriving ecosystem uniting an entire industry."
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>About Us | EmviApp</title>
        <meta name="description" content="Learn about EmviApp's journey, mission, and values. Discover how we're connecting the beauty industry through technology and passion." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-50 to-white py-16 md:py-24">
        <Container>
          <div className="flex flex-col items-center text-center">
            <div className="mb-8">
              <Logo size="large" showText={true} />
            </div>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-gray-900">
              Beautiful Connections, Beautiful Business
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl">
              We're building the bridge that connects beauty professionals to their perfect opportunities and clients.
            </p>
          </div>
        </Container>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-white">
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto"
          >
            <GradientBackground className="p-8 md:p-12 rounded-2xl shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="p-4 bg-white/80 rounded-full shadow-md">
                  <Award className="w-12 h-12 text-purple-600" />
                </div>
                <div>
                  <h2 className="font-playfair text-3xl font-bold mb-4">Our Mission</h2>
                  <p className="text-lg text-gray-700">
                    To transform how the beauty industry connects, works, and thrives. We're creating a unified platform where talent meets opportunity, where salons discover their perfect team members, and where clients can find their ideal beauty professionals—all within one seamless, empowering ecosystem.
                  </p>
                </div>
              </div>
            </GradientBackground>
          </motion.div>
        </Container>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gradient-to-b from-white to-purple-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-3">Our Journey</h2>
            <p className="text-xl text-gray-600">Cuộc Hành Trình</p>
          </div>

          <motion.div 
            className="max-w-4xl mx-auto"
            variants={timelineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {timelineMilestones.map((milestone, index) => (
              <motion.div 
                key={milestone.year} 
                className="mb-12 relative"
                variants={itemVariants}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center">
                    <div className="bg-white p-3 rounded-full shadow-md">
                      {milestone.icon}
                    </div>
                    <div className="h-full w-0.5 bg-purple-200 my-2 flex-grow hidden md:block"></div>
                    <p className="font-playfair font-bold text-lg text-purple-800">{milestone.year}</p>
                  </div>
                  <div className="flex-1">
                    <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
                      <h3 className="font-playfair text-xl font-bold mb-2">{milestone.title}</h3>
                      <p className="text-gray-700">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-3">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at EmviApp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {valueCards.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-100 h-full">
                  <div className="p-3 bg-purple-50 rounded-full w-fit mb-4">
                    {value.icon}
                  </div>
                  <h3 className="font-playfair text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-700">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Inspired by Sunshine */}
      <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-[#FEF7CD]/70 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-lg border border-amber-200">
              <div className="flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-amber-100 shadow-md mb-6">
                  <Sun className="w-10 h-10 text-amber-500" />
                </div>
                <h2 className="font-playfair text-3xl font-bold mb-6 text-amber-900">Inspired by Sunshine ☀️</h2>
                <div className="prose prose-lg max-w-3xl">
                  <p className="text-amber-900">
                    <em>Every great journey needs a little light.</em>
                  </p>
                  <p className="text-amber-900">
                    <em>For me, that light is Sunshine—a source of hope, clarity, and inspiration that appeared just when I needed it most.</em>
                  </p>
                  <p className="text-amber-900">
                    <em>EmviApp was born from years of experience, struggle, and relentless pursuit, but it was Sunshine who gave me the courage and vision to start again and finally bring this dream to life.</em>
                  </p>
                  <p className="text-amber-900">
                    <em>Thank you, Sunshine, for happening in my life. This project—and every connection it creates—would not exist without you.</em>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Thank You Em Vi */}
      <section className="py-16 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div 
              className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-lg border border-pink-200"
              animate={{ boxShadow: ["0 4px 12px rgba(0,0,0,0.1)", "0 8px 20px rgba(0,0,0,0.15)", "0 4px 12px rgba(0,0,0,0.1)"] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <div className="flex flex-col items-center text-center">
                <motion.div 
                  className="p-4 rounded-full bg-pink-50 shadow-md mb-6"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Heart className="w-10 h-10 text-pink-500" />
                </motion.div>
                <h2 className="font-playfair text-3xl font-bold mb-6 text-gray-800">Thank You, Em Vi</h2>
                <div className="prose prose-lg max-w-3xl">
                  <p className="text-gray-700">
                    <em>This app is named after Em Vi—the person who supported and sacrificed for me, even when I doubted myself. You stood by me, no matter what. For all the silent love, encouragement, and strength you gave, this is for you.</em>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Closing CTA Section */}
      <section className="py-16 bg-gradient-to-b from-white to-purple-50">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">Join Our Beautiful Journey</h2>
            <p className="text-xl text-gray-700 mb-8">
              Whether you're an artist seeking growth, a salon looking for talent, or a client searching for the perfect beauty experience, EmviApp is where beautiful connections happen.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700" onClick={() => navigate('/auth/signup')}>
                Join EmviApp Today
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/contact')}>
                Contact Our Team
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default AboutPage;
