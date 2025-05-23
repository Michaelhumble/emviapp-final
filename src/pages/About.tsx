
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { GradientBackground } from "@/components/ui/gradient-background";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Heart, Award, Balance, Calendar, Stars, Sun } from 'lucide-react';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About EmviApp</title>
        <meta name="description" content="EmviApp - Uniting beauty professionals and clients through meaningful connections that transform the industry." />
      </Helmet>
      <Layout>
        <div className="bg-gradient-to-b from-purple-50 to-white">
          {/* Hero Section */}
          <Container className="max-w-5xl py-16 md:py-20 text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Beautiful Connections, Beautiful Business
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              Uniting beauty professionals and clients through meaningful connections that transform the industry.
            </p>
          </Container>

          {/* Our Story Section */}
          <Container className="max-w-4xl py-8 md:py-12">
            <GradientBackground className="p-8 md:p-10">
              <div className="mb-6 text-center">
                <h2 className="text-3xl font-playfair font-bold mb-4">Our Story</h2>
                <p className="text-xl font-medium text-center mb-8 text-gray-800">
                  <strong>Building bridges between talented beauty professionals and the clients who value them.</strong>
                </p>
              </div>

              <div className="space-y-6 text-gray-700">
                <p>
                  EmviApp was born from a simple observation: the beauty industry deserves a platform that truly understands its heart and soul. In salons across America, we saw remarkable talent flourishing alongside unique challenges—language barriers, cultural gaps, and digital walls that other platforms ignored.
                </p>
                <p>
                  What started as a vision to connect communities has grown into something greater: a home where artists are celebrated, salons can thrive, and clients discover exceptional talent with confidence and ease.
                </p>
              </div>
            </GradientBackground>
          </Container>

          {/* Why We Started EmviApp Section */}
          <Container className="max-w-4xl py-8">
            <Card className="overflow-hidden border-none shadow-lg">
              <CardContent className="p-8 md:p-10">
                <h2 className="text-3xl font-playfair font-bold mb-6">Why We Started EmviApp</h2>
                <div className="space-y-6 text-gray-700">
                  <p>
                    Growing up in a family deeply connected to the beauty industry, I witnessed firsthand the immense skill, determination, and community spirit of Vietnamese professionals in America. Yet I also saw how language and cultural differences could keep even the best artists from being recognized for their true value.
                  </p>
                  <p>
                    EmviApp isn't just another app. It's a bridge between cultures, a celebration of real artistry, and a promise: every talented professional deserves to shine, to be respected, and to find new opportunities.
                  </p>
                </div>
              </CardContent>
            </Card>
          </Container>

          {/* What Makes Us Different Section */}
          <Container className="max-w-4xl py-8 md:py-12">
            <h2 className="text-3xl font-playfair font-bold mb-8 text-center">What Makes Us Different</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="rounded-full bg-purple-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-purple-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Cultural Understanding</h3>
                  <p className="text-gray-700">
                    We proudly embrace both English and Vietnamese, making sure everyone feels seen and heard.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Community First</h3>
                  <p className="text-gray-700">
                    Every feature is built to strengthen connections—between artists, salon owners, and clients—because relationships are everything.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="rounded-full bg-pink-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-pink-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Authentic Representation</h3>
                  <p className="text-gray-700">
                    We highlight real talent and real stories, celebrating the artistry and human spirit behind every service.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="rounded-full bg-indigo-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <Balance className="h-6 w-6 text-indigo-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Fair and Transparent</h3>
                  <p className="text-gray-700">
                    Our platform helps businesses and customers thrive together—with honesty, clarity, and trust at every step.
                  </p>
                </CardContent>
              </Card>
            </div>
          </Container>

          {/* Our Mission Section */}
          <Container className="max-w-4xl py-8">
            <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-indigo-50">
              <CardContent className="p-8 md:p-10 text-center">
                <h2 className="text-3xl font-playfair font-bold mb-6">Our Mission</h2>
                <p className="text-lg md:text-xl font-medium text-gray-800">
                  To create a seamless platform where beauty professionals can thrive, salons can grow, and clients can discover exceptional services—all in one elegant ecosystem.
                </p>
              </CardContent>
            </Card>
          </Container>

          {/* Our Journey Section */}
          <Container className="max-w-4xl py-12">
            <h2 className="text-3xl font-playfair font-bold mb-8 text-center">Our Journey</h2>

            <div className="space-y-12 relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 via-purple-300 to-blue-200 transform -translate-x-1/2"></div>
              
              {/* Timeline Item 1 */}
              <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="md:w-1/2 md:pr-8 md:text-right order-2 md:order-1 mt-4 md:mt-0">
                  <h3 className="text-xl font-semibold mb-2">The Idea is Born</h3>
                  <p className="text-gray-700">
                    After years in the beauty industry, I saw a simple but powerful truth: connections are everything. I wanted to build something that would truly unite professionals and clients, helping everyone reach their highest potential.
                  </p>
                </div>
                <div className="md:mx-auto flex-shrink-0 order-1 md:order-2 relative z-10">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-600 text-white">
                    <Calendar className="h-6 w-6" />
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-8 invisible md:visible"></div>
              </div>
              
              {/* Timeline Item 2 */}
              <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="md:w-1/2 md:pr-8 invisible md:visible"></div>
                <div className="md:mx-auto flex-shrink-0 relative z-10">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-500 text-white">
                    <Stars className="h-6 w-6" />
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
                  <h3 className="text-xl font-semibold mb-2">First Build</h3>
                  <p className="text-gray-700">
                    EmviApp's journey started with bold ideas and long nights. We built, we tested, and we learned. Some things worked, others didn't—but every step moved us closer to our vision.
                  </p>
                </div>
              </div>
              
              {/* Timeline Item 3 */}
              <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="md:w-1/2 md:pr-8 md:text-right order-2 md:order-1 mt-4 md:mt-0">
                  <h3 className="text-xl font-semibold mb-2">Iteration and Growth</h3>
                  <p className="text-gray-700">
                    Over the years, we listened to users, rebuilt from scratch, and kept going. Every lesson, every update, every conversation made the platform stronger and more welcoming for everyone.
                  </p>
                </div>
                <div className="md:mx-auto flex-shrink-0 order-1 md:order-2 relative z-10">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white">
                    <Users className="h-6 w-6" />
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-8 invisible md:visible"></div>
              </div>

              {/* Timeline Item 4 */}
              <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="md:w-1/2 md:pr-8 invisible md:visible"></div>
                <div className="md:mx-auto flex-shrink-0 relative z-10">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 text-white">
                    <Heart className="h-6 w-6" />
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
                  <h3 className="text-xl font-semibold mb-2">A New Chapter</h3>
                  <p className="text-gray-700">
                    Today, EmviApp stands as a living bridge—between cultures, between dreams and opportunities, and between artists and the people who believe in them.
                  </p>
                </div>
              </div>
            </div>
          </Container>

          {/* Inspired by Sunshine Section */}
          <Container className="max-w-4xl py-8">
            <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-r from-yellow-50 to-orange-50">
              <CardContent className="p-8 md:p-10 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-300 bg-opacity-50">
                    <Sun className="h-10 w-10 text-yellow-600" />
                  </div>
                </div>
                <h2 className="text-3xl font-playfair font-bold mb-4 text-yellow-800">Inspired by Sunshine ☀️</h2>
                <p className="text-lg italic mb-4 text-gray-800">Every great journey needs a little light.</p>
                <div className="max-w-2xl mx-auto space-y-4 text-gray-700">
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
              </CardContent>
            </Card>
          </Container>

          {/* Thank You, Emvi Section */}
          <Container className="max-w-4xl py-8">
            <Card className="overflow-hidden border-none shadow-lg">
              <CardContent className="p-8 md:p-10 text-center">
                <h2 className="text-3xl font-playfair font-bold mb-4">Thank You, Emvi</h2>
                <p className="text-gray-700 max-w-2xl mx-auto">
                  This app is named after Emvi—the person who supported and sacrificed for me, even when I doubted myself. You stood by me, no matter what. For all the silent love, encouragement, and strength you gave, this is for you.
                </p>
              </CardContent>
            </Card>
          </Container>

          {/* Our Values Section */}
          <Container className="max-w-4xl py-12">
            <h2 className="text-3xl font-playfair font-bold mb-8 text-center">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Empathy</h3>
                  <p className="text-gray-700">
                    We walk in the shoes of our users and build with real-world understanding.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Integrity</h3>
                  <p className="text-gray-700">
                    Honest, transparent, and committed to what's right for the community.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                  <p className="text-gray-700">
                    Always improving, always listening, always building for the future.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Celebration</h3>
                  <p className="text-gray-700">
                    Every artist, every business, every client is part of the EmviApp family.
                  </p>
                </CardContent>
              </Card>
            </div>
          </Container>

          {/* Final Spacer */}
          <div className="h-16 md:h-24"></div>
        </div>
      </Layout>
    </>
  );
};

export default AboutPage;
