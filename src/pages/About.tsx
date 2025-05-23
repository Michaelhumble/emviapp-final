
import React from "react";
import { 
  Calendar, 
  Users, 
  Heart, 
  Award, 
  Star, 
  Sun, 
  Lightbulb,
  Clock,
  ArrowRight
} from "lucide-react";
import { GradientBackground } from "@/components/ui/gradient-background";
import LanguageToggle from "@/components/layout/LanguageToggle";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  const { isVietnamese, t } = useTranslation();

  // Timeline data
  const timelineSteps = [
    {
      year: "2014",
      icon: <Lightbulb className="h-8 w-8 text-amber-500" />,
      title: "The Idea is Born",
      description: "A vision to create meaningful connections within the beauty community begins to take shape."
    },
    {
      year: "2015",
      icon: <Calendar className="h-8 w-8 text-blue-500" />,
      title: "First Build",
      description: "Initial platform development focusing on understanding the unique needs of artists and salon owners."
    },
    {
      year: "2016-2023",
      icon: <Clock className="h-8 w-8 text-purple-500" />,
      title: "Iteration and Growth",
      description: "Years of learning, adjusting, and evolving to better serve our community through continuous improvement."
    },
    {
      year: "2025",
      icon: <Star className="h-8 w-8 text-emerald-500" />,
      title: "A New Chapter",
      description: "Expanding our vision with enhanced features, deeper connections, and a renewed commitment to our community."
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-end mb-8">
          <LanguageToggle />
        </div>
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-gray-900 mb-6">
            Beautiful Connections, Beautiful Business
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Uniting beauty professionals and clients through meaningful connections that transform the industry.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <GradientBackground
        variant="premium"
        className="max-w-4xl mx-auto mb-16 p-8 md:p-12 rounded-2xl shadow-lg"
      >
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 text-center mb-8">
            Our Story
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            <span className="font-medium">
              Building bridges between talented beauty professionals and the clients who value them.
            </span>
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            We started EmviApp with a simple observation: there was a disconnect between how beauty professionals found work and clients, especially in communities where language and cultural barriers existed. We saw talented artists struggling to showcase their skills and salon owners unable to find reliable team members. What began as a solution for a small community has evolved into an ecosystem where beauty professionals can thrive and be celebrated.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our personal connection to the beauty industry comes from seeing firsthand the challenges faced by those who dedicate their lives to bringing beauty and confidence to others. We believe every beauty professional deserves a platform that understands their unique journey, values their craft, and helps them build sustainable careers. This belief drives everything we do.
          </p>
        </div>
      </GradientBackground>

      {/* What Makes Us Different */}
      <div className="max-w-7xl mx-auto mb-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 text-center mb-12">
          What Makes Us Different
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GradientBackground className="p-8 rounded-2xl shadow-md">
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-playfair font-bold mb-4">Cultural Understanding</h3>
              <p className="text-gray-700 flex-grow">
                We bridge language and cultural gaps, creating an inclusive platform where everyone feels welcome and understood.
              </p>
            </div>
          </GradientBackground>
          
          <GradientBackground className="p-8 rounded-2xl shadow-md">
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <Heart className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-playfair font-bold mb-4">Community First</h3>
              <p className="text-gray-700 flex-grow">
                Every feature and decision is guided by what truly helps our community of beauty professionals and clients thrive together.
              </p>
            </div>
          </GradientBackground>
          
          <GradientBackground className="p-8 rounded-2xl shadow-md">
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <Award className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-playfair font-bold mb-4">Authentic Representation</h3>
              <p className="text-gray-700 flex-grow">
                We showcase beauty professionals honestly and authentically, celebrating their unique skills and perspectives.
              </p>
            </div>
          </GradientBackground>
          
          <GradientBackground className="p-8 rounded-2xl shadow-md">
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <Star className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-playfair font-bold mb-4">Fair and Transparent</h3>
              <p className="text-gray-700 flex-grow">
                We believe in transparent practices, fair opportunities, and creating value for everyone in our ecosystem.
              </p>
            </div>
          </GradientBackground>
        </div>
      </div>

      {/* Our Mission */}
      <GradientBackground
        variant="premium"
        className="max-w-4xl mx-auto mb-16 p-8 md:p-12 text-center rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8">
          Our Mission
        </h2>
        <p className="text-xl md:text-2xl text-gray-700 italic">
          "To empower beauty professionals with the tools, visibility, and community they need to build thriving, sustainable careers they love."
        </p>
      </GradientBackground>

      {/* Our Journey (Timeline) */}
      <div className="max-w-5xl mx-auto mb-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 text-center mb-12">
          Our Journey
        </h2>
        
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary/40 to-primary/80"></div>
          
          {/* Timeline items */}
          <div className="space-y-16">
            {timelineSteps.map((step, index) => (
              <div 
                key={index} 
                className={`relative flex items-center ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse md:flex-row-reverse"
                }`}
              >
                {/* Timeline icon */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-white rounded-full p-2 shadow-md border border-gray-100">
                    {step.icon}
                  </div>
                </div>
                
                {/* Timeline content */}
                <div className={`w-5/12 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 md:pl-8"}`}>
                  <div className="mb-1 text-primary font-bold">{step.year}</div>
                  <h3 className="text-xl font-playfair font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                
                {/* Empty space */}
                <div className="w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inspired by Sunshine */}
      <GradientBackground
        className="max-w-4xl mx-auto mb-16 p-8 md:p-12 rounded-2xl shadow-lg bg-gradient-to-br from-yellow-50 to-amber-100"
      >
        <div className="flex flex-col items-center text-center">
          <Sun className="h-16 w-16 text-amber-400 mb-6" />
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-6">
            Inspired by Sunshine ☀️
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            EmviApp was born from a desire to bring more light into the beauty industry—to illuminate talent that deserves recognition, to brighten the path for businesses seeking growth, and to spotlight connections that transform careers. Like sunshine, we aim to nurture growth, reveal beauty, and bring warmth to every interaction on our platform.
          </p>
        </div>
      </GradientBackground>

      {/* Thank You, Emvi */}
      <GradientBackground
        variant="premium"
        className="max-w-4xl mx-auto mb-16 p-8 md:p-12 rounded-2xl shadow-lg"
      >
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-8">
            Thank You, Emvi
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our name comes from a place of gratitude. Emvi represents the endless possibilities that emerge when talented beauty professionals connect with appreciative clients. It stands for the empowerment that comes from being seen, valued, and supported. Most importantly, it's our way of saying thank you to every artist, salon owner, and client who makes this community what it is. Thank you for trusting us with your journeys, your businesses, and your visions of beauty.
          </p>
        </div>
      </GradientBackground>

      {/* Our Values */}
      <div className="max-w-7xl mx-auto mb-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 text-center mb-12">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <GradientBackground className="p-8 rounded-2xl shadow-md">
            <h3 className="text-xl font-playfair font-bold mb-4">Community</h3>
            <p className="text-gray-700">
              We believe in the power of coming together. Success is sweeter when shared, and challenges are lighter when faced together.
            </p>
          </GradientBackground>
          
          <GradientBackground className="p-8 rounded-2xl shadow-md">
            <h3 className="text-xl font-playfair font-bold mb-4">Excellence</h3>
            <p className="text-gray-700">
              We strive for excellence in everything we do, honoring the dedication our beauty professionals bring to their craft.
            </p>
          </GradientBackground>
          
          <GradientBackground className="p-8 rounded-2xl shadow-md">
            <h3 className="text-xl font-playfair font-bold mb-4">Trust</h3>
            <p className="text-gray-700">
              We build relationships based on trust, transparency, and reliability, creating a platform everyone can depend on.
            </p>
          </GradientBackground>
          
          <GradientBackground className="p-8 rounded-2xl shadow-md">
            <h3 className="text-xl font-playfair font-bold mb-4">Innovation</h3>
            <p className="text-gray-700">
              We embrace progress and continuously seek new ways to solve problems and enhance experiences for our community.
            </p>
          </GradientBackground>
          
          <GradientBackground className="p-8 rounded-2xl shadow-md">
            <h3 className="text-xl font-playfair font-bold mb-4">Celebration</h3>
            <p className="text-gray-700">
              We celebrate beauty in all its forms, the artistry behind it, and the confidence it inspires in everyone it touches.
            </p>
          </GradientBackground>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 py-16 px-4 sm:px-6 lg:px-8 rounded-2xl max-w-7xl mx-auto shadow-xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-6">
            Ready to be part of something beautiful? Join our community today.
          </h2>
          <Button 
            asChild
            size="lg" 
            className="rounded-full px-8 py-6 text-lg font-medium bg-white text-primary hover:bg-gray-100 hover:text-primary/90 transition-all shadow-lg"
          >
            <Link to="/">
              Start Your Journey with EmviApp
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
