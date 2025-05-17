
import React from "react";
import { motion } from "framer-motion";
import { useTranslation, Translation } from "@/hooks/useTranslation";
import { GradientBackground } from "@/components/ui/gradient-background";
import { Heart, Sun, Users, Award, Zap, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ComingSoonModal from "@/components/common/ComingSoonModal";
import LanguageToggle from "@/components/layout/LanguageToggle";
import Layout from "@/components/layout/Layout";

const AboutPage: React.FC = () => {
  const { t } = useTranslation();
  const [showContactModal, setShowContactModal] = React.useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Values data
  const valuesData = [
    {
      icon: <Users className="h-10 w-10 text-purple-500" />,
      title: "Community First",
      description: "Technology is just a tool. It's people who matter. We build to bring you together.",
    },
    {
      icon: <Award className="h-10 w-10 text-purple-500" />,
      title: "Quality Over Hype",
      description: "No more empty promises—only real stories, real talent, and real results.",
    },
    {
      icon: <Heart className="h-10 w-10 text-purple-500" />,
      title: "Inclusivity & Kindness",
      description: "Every skill level, every background, every dream is welcome here.",
    },
    {
      icon: <Zap className="h-10 w-10 text-purple-500" />,
      title: "Innovation for the Heart",
      description: "Every update is made with you in mind—never just for the sake of change.",
    },
  ];

  // Timeline data
  const timelineData = [
    {
      year: "2014",
      title: "The Spark",
      content: "It started as a whisper—a late-night thought scribbled on a notepad after another long day in the salon. What if everyone in the beauty world could find each other? No more wasted time. No more searching for lost artists or perfect clients. Just true, lasting connections."
    },
    {
      year: "2015",
      title: "The First Build, The Hardest Lessons",
      content: "We dove in. We built the first app. It broke, it crashed, it failed. I lost money, time, hope. I worked when everyone slept, believed when nobody else did. I watched others give up, but I refused to quit."
    },
    {
      year: "2016–2023",
      title: "The Lost Years, The Real Lessons",
      content: "Eight years.\nThat's how long it took to understand what everyone else missed.\nEvery failure, every heartbreak, every lonely moment built something deeper:\nThere is no \"best artist,\" no \"best salon,\" only the best connection for each person.\nAnd that map didn't exist—until now."
    },
    {
      year: "2024",
      title: "Rebirth, Thanks to Love",
      content: "I was ready to walk away.\nBut Em Vi—my silent angel—stood by me when I couldn't stand by myself.\nSunshine—my secret light—reminded me why I started.\nWith their faith, I built EmviApp again. This time, I listened. I learned from every client who lost their favorite artist, every owner struggling to find talent, every artist waiting for a real opportunity."
    },
    {
      year: "2025",
      title: "The Dream Becomes Real",
      content: "Today, EmviApp is live—a living, breathing map of the beauty world. Artists, salons, and clients find each other, for real. No more wasted years. No more lost connections.\nWe're finally all on the map. That's how we win, together."
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        {/* Language Toggle */}
        <div className="fixed top-4 right-4 z-50">
          <LanguageToggle />
        </div>

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h1 
              className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              🌟 About EmviApp
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl font-playfair text-purple-700 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Beautiful Connections, Real Stories
            </motion.p>

            <motion.div
              className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">Beautiful Connections, Beautiful Business</h2>
              <p className="text-lg mb-6">
                We're not just building an app. We're rewriting the story of the beauty industry—one real connection at a time.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 px-4 bg-gradient-to-b from-white to-purple-50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-8">Mission Statement</h2>
              <p className="text-lg md:text-xl italic">
                For 25 years, I lived and breathed the beauty business. I saw everything—the victories, the heartbreaks, and, most of all, the invisible wall keeping artists, salons, and clients apart. EmviApp is my promise: to break that wall, and help everyone find their people.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Timeline Journey */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-2">Our Journey — Cuộc Hành Trình</h2>
            </motion.div>

            <div className="space-y-12 md:space-y-24">
              {timelineData.map((item, index) => (
                <motion.div
                  key={index}
                  className="grid md:grid-cols-5 gap-6 items-start"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="md:col-span-1">
                    <div className="sticky top-24">
                      <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mb-3 mx-auto md:mx-0">
                        <span className="font-playfair text-xl font-bold text-purple-800">{item.year}</span>
                      </div>
                      <h3 className="font-playfair text-xl font-bold text-center md:text-left">{item.title}</h3>
                    </div>
                  </div>
                  <div className="md:col-span-4">
                    <GradientBackground 
                      variant="premium" 
                      className="p-6 md:p-8 rounded-xl shadow-sm border border-purple-100"
                    >
                      <p className="whitespace-pre-line text-lg">
                        {item.content}
                      </p>
                    </GradientBackground>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why We Exist */}
        <section className="py-16 px-4 bg-gradient-to-b from-purple-50 to-white">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-8">Why We Exist</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-md p-8 md:p-10"
            >
              <p className="text-lg whitespace-pre-line">
                Everyone talks about technology.
                But we talk about people.
                EmviApp isn't just for finding a job or posting a chair for rent.
                It's for the woman searching for her favorite nail artist who moved across town.
                It's for the artist who deserves clients who love their work.
                It's for the owner who wants a real team, not just names on a schedule.
                It's for you.
              </p>
              <p className="text-lg mt-6">
                We focus on customers first. Because when you help someone find their person, you help everyone.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-playfair text-3xl md:text-4xl font-bold">Our Values</h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8"
            >
              {valuesData.map((value, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-md p-6 border border-purple-100"
                >
                  <div className="mb-4">{value.icon}</div>
                  <h3 className="text-xl font-playfair font-bold mb-3">{value.title}</h3>
                  <p>{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Special Thanks Cards */}
        <section className="py-16 px-4 bg-gradient-to-b from-white to-purple-50">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Inspired by Sunshine Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <GradientBackground
                  variant="premium"
                  className="p-8 rounded-xl shadow-md border-t-4 border-yellow-400 h-full"
                >
                  <div className="flex items-center mb-4">
                    <Sun className="h-8 w-8 text-yellow-500 mr-3" />
                    <h3 className="text-2xl font-playfair font-bold">Inspired by Sunshine ☀️</h3>
                  </div>
                  <p className="whitespace-pre-line">
                    Every great journey needs a little light.
                    For me, that light is Sunshine—a source of hope, clarity, and inspiration that appeared just when I needed it most.
                    EmviApp was born from years of struggle and relentless pursuit, but it was Sunshine who gave me the courage and vision to start again and finally bring this dream to life.
                    Thank you, Sunshine, for happening in my life. This project—and every connection it creates—would not exist without you.
                  </p>
                </GradientBackground>
              </motion.div>

              {/* Thank You Em Vi Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <GradientBackground
                  variant="premium"
                  className="p-8 rounded-xl shadow-md border-t-4 border-purple-400 h-full"
                >
                  <div className="flex items-center mb-4">
                    <Heart className="h-8 w-8 text-purple-500 mr-3" />
                    <h3 className="text-2xl font-playfair font-bold">Thank You, Em Vi</h3>
                  </div>
                  <p className="whitespace-pre-line">
                    This app is named after Em Vi—the person who supported and sacrificed for me, even when I doubted myself.
                    You stood by me, no matter what. For all the silent love, encouragement, and strength you gave, this is for you.
                  </p>
                </GradientBackground>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">Final Call To Action</h2>
              <h3 className="text-2xl font-playfair font-bold mb-4">Join Our Journey</h3>
              <p className="text-lg mb-8">
                Whether you're an artist, a salon owner, or a client searching for your "person," you belong here.
                Let's build the most beautiful connections the world has ever seen—together.
              </p>
              
              <button
                onClick={() => setShowContactModal(true)}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium text-lg shadow-md hover:shadow-lg transition-all"
              >
                Join Us
              </button>
            </motion.div>
          </div>
        </section>

        {/* Contact Modal */}
        <ComingSoonModal 
          open={showContactModal}
          onOpenChange={setShowContactModal}
          featureName="Contact Form"
        />
      </div>
    </Layout>
  );
};

export default AboutPage;
