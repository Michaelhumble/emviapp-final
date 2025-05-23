
import React from 'react';
import { GradientBackground } from "@/components/ui/gradient-background";
import { 
  Heart, 
  Users, 
  Shield, 
  Sparkles
} from "lucide-react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
          Beautiful Connections, Beautiful Business
        </h1>
        <p className="font-inter text-xl text-gray-700 max-w-3xl mx-auto">
          Uniting beauty professionals and clients through meaningful connections that transform the industry.
        </p>
      </section>

      {/* Our Story */}
      <GradientBackground className="p-8 mb-12 rounded-xl shadow-md" variant="premium">
        <h2 className="font-playfair text-3xl font-bold mb-6 text-center">Our Story</h2>
        <h3 className="font-playfair text-xl italic text-center mb-6 text-gray-800">
          Building bridges between talented beauty professionals and the clients who value them.
        </h3>
        <div className="font-inter space-y-6 text-gray-700">
          <p>
            EmviApp was born from a simple observation: the beauty industry deserves a platform that truly understands its heart and soul. In salons across America, we saw remarkable talent flourishing alongside unique challenges—language barriers, cultural gaps, and digital walls that other platforms ignored.
          </p>
          <p>
            What started as a vision to connect communities has grown into something greater: a home where artists are celebrated, salons can thrive, and clients discover exceptional talent with confidence and ease.
          </p>
        </div>
      </GradientBackground>

      {/* Why We Started */}
      <GradientBackground className="p-8 mb-12 rounded-xl shadow-md" variant="salon">
        <h2 className="font-playfair text-3xl font-bold mb-6 text-center">Why We Started EmviApp</h2>
        <div className="font-inter space-y-6 text-gray-700">
          <p>
            Growing up in a family deeply connected to the beauty industry, I witnessed firsthand the immense skill, determination, and community spirit of Vietnamese professionals in America. Yet I also saw how language and cultural differences could keep even the best artists from being recognized for their true value.
          </p>
          <p>
            EmviApp isn't just another app. It's a bridge between cultures, a celebration of real artistry, and a promise: every talented professional deserves to shine, to be respected, and to find new opportunities.
          </p>
        </div>
      </GradientBackground>

      {/* What Makes Us Different */}
      <section className="mb-16">
        <h2 className="font-playfair text-3xl font-bold mb-8 text-center">What Makes Us Different</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GradientBackground className="p-6 rounded-xl shadow-md h-full" variant="default">
            <h3 className="font-playfair text-xl font-bold mb-3 flex items-center">
              <span className="bg-purple-100 p-2 rounded-full mr-3 text-purple-600">
                <Users size={20} />
              </span>
              Cultural Understanding
            </h3>
            <p className="font-inter text-gray-700">
              We proudly embrace both English and Vietnamese, making sure everyone feels seen and heard.
            </p>
          </GradientBackground>
          
          <GradientBackground className="p-6 rounded-xl shadow-md h-full" variant="default">
            <h3 className="font-playfair text-xl font-bold mb-3 flex items-center">
              <span className="bg-blue-100 p-2 rounded-full mr-3 text-blue-600">
                <Heart size={20} />
              </span>
              Community First
            </h3>
            <p className="font-inter text-gray-700">
              Every feature is built to strengthen connections—between artists, salon owners, and clients—because relationships are everything.
            </p>
          </GradientBackground>
          
          <GradientBackground className="p-6 rounded-xl shadow-md h-full" variant="default">
            <h3 className="font-playfair text-xl font-bold mb-3 flex items-center">
              <span className="bg-pink-100 p-2 rounded-full mr-3 text-pink-600">
                <Sparkles size={20} />
              </span>
              Authentic Representation
            </h3>
            <p className="font-inter text-gray-700">
              We highlight real talent and real stories, celebrating the artistry and human spirit behind every service.
            </p>
          </GradientBackground>
          
          <GradientBackground className="p-6 rounded-xl shadow-md h-full" variant="default">
            <h3 className="font-playfair text-xl font-bold mb-3 flex items-center">
              <span className="bg-green-100 p-2 rounded-full mr-3 text-green-600">
                <Shield size={20} />
              </span>
              Fair and Transparent
            </h3>
            <p className="font-inter text-gray-700">
              Our platform helps businesses and customers thrive together—with honesty, clarity, and trust at every step.
            </p>
          </GradientBackground>
        </div>
      </section>

      {/* Our Mission */}
      <GradientBackground className="p-8 mb-16 rounded-xl shadow-md text-center" variant="artist">
        <h2 className="font-playfair text-3xl font-bold mb-6">Our Mission</h2>
        <p className="font-inter text-xl italic">
          To create a seamless platform where beauty professionals can thrive, salons can grow, and clients can discover exceptional services—all in one elegant ecosystem.
        </p>
      </GradientBackground>

      {/* Our Journey */}
      <GradientBackground className="p-8 mb-12 rounded-xl shadow-md" variant="default">
        <h2 className="font-playfair text-3xl font-bold mb-8 text-center">Our Journey</h2>
        <div className="space-y-8 font-inter">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mb-4 md:mb-0">
              <div className="bg-purple-100 text-purple-700 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">1</div>
            </div>
            <div className="md:w-3/4">
              <h3 className="font-playfair text-xl font-bold mb-2">The Idea is Born</h3>
              <p className="text-gray-700">
                After years in the beauty industry, I saw a simple but powerful truth: connections are everything. I wanted to build something that would truly unite professionals and clients, helping everyone reach their highest potential.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mb-4 md:mb-0">
              <div className="bg-blue-100 text-blue-700 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">2</div>
            </div>
            <div className="md:w-3/4">
              <h3 className="font-playfair text-xl font-bold mb-2">First Build</h3>
              <p className="text-gray-700">
                EmviApp's journey started with bold ideas and long nights. We built, we tested, and we learned. Some things worked, others didn't—but every step moved us closer to our vision.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mb-4 md:mb-0">
              <div className="bg-pink-100 text-pink-700 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">3</div>
            </div>
            <div className="md:w-3/4">
              <h3 className="font-playfair text-xl font-bold mb-2">Iteration and Growth</h3>
              <p className="text-gray-700">
                Over the years, we listened to users, rebuilt from scratch, and kept going. Every lesson, every update, every conversation made the platform stronger and more welcoming for everyone.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mb-4 md:mb-0">
              <div className="bg-green-100 text-green-700 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">4</div>
            </div>
            <div className="md:w-3/4">
              <h3 className="font-playfair text-xl font-bold mb-2">A New Chapter</h3>
              <p className="text-gray-700">
                Today, EmviApp stands as a living bridge—between cultures, between dreams and opportunities, and between artists and the people who believe in them.
              </p>
            </div>
          </div>
        </div>
      </GradientBackground>

      {/* Inspired by Sunshine */}
      <GradientBackground className="p-8 mb-12 rounded-xl shadow-md bg-gradient-to-r from-amber-50 to-yellow-50" variant="default">
        <h2 className="font-playfair text-3xl font-bold mb-6 text-center flex justify-center items-center">
          <span className="text-amber-500 mr-2">☀️</span> Inspired by Sunshine
        </h2>
        <div className="font-inter space-y-4 text-center text-gray-700">
          <p className="italic">Every great journey needs a little light.</p>
          <p>
            For me, that light is Sunshine—a source of hope, clarity, and inspiration who appeared just when I needed it most.
          </p>
          <p>
            EmviApp was born from years of experience and relentless pursuit, but it was Sunshine who gave me the courage and vision to start again and bring this dream to life.
          </p>
          <p>
            Thank you, Sunshine, for happening in my life. This project—and every connection it creates—would not exist without you.
          </p>
        </div>
      </GradientBackground>

      {/* Thank You, Emvi */}
      <GradientBackground className="p-8 mb-12 rounded-xl shadow-md bg-gradient-to-r from-rose-50 to-pink-50" variant="default">
        <h2 className="font-playfair text-3xl font-bold mb-6 text-center">Thank You, Emvi</h2>
        <p className="font-inter text-center text-gray-700">
          This app is named after Emvi—the person who supported and sacrificed for me, even when I doubted myself. You stood by me, no matter what. For all the silent love, encouragement, and strength you gave, this is for you.
        </p>
      </GradientBackground>

      {/* Our Values */}
      <section className="mb-16">
        <h2 className="font-playfair text-3xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GradientBackground className="p-6 rounded-xl shadow-md" variant="default">
            <h3 className="font-playfair text-xl font-bold mb-3">Empathy</h3>
            <p className="font-inter text-gray-700">
              We walk in the shoes of our users and build with real-world understanding.
            </p>
          </GradientBackground>
          
          <GradientBackground className="p-6 rounded-xl shadow-md" variant="default">
            <h3 className="font-playfair text-xl font-bold mb-3">Integrity</h3>
            <p className="font-inter text-gray-700">
              Honest, transparent, and committed to what's right for the community.
            </p>
          </GradientBackground>
          
          <GradientBackground className="p-6 rounded-xl shadow-md" variant="default">
            <h3 className="font-playfair text-xl font-bold mb-3">Innovation</h3>
            <p className="font-inter text-gray-700">
              Always improving, always listening, always building for the future.
            </p>
          </GradientBackground>
          
          <GradientBackground className="p-6 rounded-xl shadow-md" variant="default">
            <h3 className="font-playfair text-xl font-bold mb-3">Celebration</h3>
            <p className="font-inter text-gray-700">
              Every artist, every business, every client is part of the EmviApp family.
            </p>
          </GradientBackground>
        </div>
      </section>
    </div>
  );
};

export default About;
