import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Shield, Target, Users, Award, Zap, Send, Star, Lightbulb, Globe, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import DynamicSEO from '@/components/seo/DynamicSEO';

const InvestorsPartnersPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    linkedin: '',
    message: '',
    whyChooseYou: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email via hidden endpoint - not exposing support@emvi.app
      const response = await fetch('/api/partner-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Redirect to thank you page instead of toast
        window.location.href = '/partners/thank-you';
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <DynamicSEO
        title="Partner With EmviApp | Investors & Strategic Collaborations"
        description="Apply to partner with EmviApp. We welcome all visionary leaders, but only choose the right partners who can scale the future of beauty with us."
        image="https://emvi.app/og-investors.png"
        structuredData={{
          "@type": "WebPage",
          "name": "Partner With EmviApp",
          "description": "Apply to partner with EmviApp. We welcome all visionary leaders, but only choose the right partners who can scale the future of beauty with us.",
          "potentialAction": {
            "@type": "ApplyAction",
            "target": "https://emvi.app/partners#contact-form",
            "object": {
              "@type": "JobPosting",
              "title": "Strategic Partnership with EmviApp"
            }
          }
        }}
      />

      <div className="min-h-screen" style={{ backgroundColor: '#FDFDFD' }}>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Luxury Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/30 to-purple-50/20">
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.03) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.03) 0%, transparent 50%)',
                  'radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.03) 0%, transparent 50%)',
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
            />
          </div>

          <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <motion.h1 
                className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] text-gray-900"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <span className="block">We Welcome Every</span>
                <motion.span 
                  className="block bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent mt-4"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                  style={{ backgroundSize: '200% 200%' }}
                >
                  Great Idea
                </motion.span>
              </motion.h1>

              <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto" />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-2xl md:text-3xl text-gray-600 max-w-5xl mx-auto leading-relaxed font-medium"
              >
                We welcome every great idea and partnership.<br />
                But we only move forward with the ones we believe fit our vision for 
                <span className="font-semibold text-gray-800"> shaping the future of beauty.</span>
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-500 max-w-4xl mx-auto leading-relaxed"
              >
                If you want to work with us, give us your very best.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-12 py-6 text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Submit Your Partnership Pitch
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Why The Right Partners Choose EmviApp Section */}
        <section className="py-32 px-4 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-16"
            >
              <div className="text-center">
                <h2 className="font-playfair text-5xl md:text-7xl font-bold text-gray-900 mb-8">
                  Why The Right Partners
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block">
                    Choose EmviApp
                  </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  We're not just another startup. We're building the definitive platform that will reshape how the beauty industry connects, operates, and grows.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Lightbulb className="h-8 w-8" />,
                    title: "Proven Market Need",
                    description: "The beauty industry is fragmented and underserved by technology. We're solving real problems with measurable impact.",
                    gradient: "from-blue-500 to-cyan-500"
                  },
                  {
                    icon: <Globe className="h-8 w-8" />,
                    title: "Global Scale Potential",
                    description: "Beauty is a $500B+ global market. We're positioned to capture significant market share across multiple verticals.",
                    gradient: "from-green-500 to-emerald-500"
                  },
                  {
                    icon: <Heart className="h-8 w-8" />,
                    title: "Mission-Driven Team",
                    description: "We're passionate about empowering beauty professionals and creating meaningful connections in the industry.",
                    gradient: "from-pink-500 to-red-500"
                  }
                ].map((item, index) => (
                  <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-10">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${item.gradient} flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform duration-300`}>
                        {item.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-lg">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button 
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold border-purple-200 text-purple-700 hover:bg-purple-50"
                  onClick={() => document.getElementById('ideal-partners')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  See Our Ideal Partner Profile
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Ideal Partner Profile Section */}
        <section id="ideal-partners" className="py-32 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-16"
            >
              <div className="text-center">
                <h2 className="font-playfair text-5xl md:text-7xl font-bold text-gray-900 mb-8">
                  Our Ideal Partner Profile
                </h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  We're looking for exceptional partners who share our vision and can help us scale globally. Here's what makes the perfect fit.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {[
                  {
                    icon: <Award className="h-8 w-8" />,
                    title: "Beauty Industry Expert",
                    description: "Deep knowledge and proven track record in beauty (nails, hair, lashes, spa, etc.) with documented success stories and measurable impact in growing beauty businesses.",
                    gradient: "from-purple-500 to-indigo-500"
                  },
                  {
                    icon: <Zap className="h-8 w-8" />,
                    title: "Growth Marketing Master",
                    description: "Hands-on experience scaling beauty businesses with real, measurable results. Show us the numbers, campaigns, and wins that prove your expertise.",
                    gradient: "from-pink-500 to-red-500"
                  },
                  {
                    icon: <Target className="h-8 w-8" />,
                    title: "Scale-Ready Vision",
                    description: "Proven ability to think and execute at national/global scale. We're building for millions of beauty professionals worldwide.",
                    gradient: "from-blue-500 to-cyan-500"
                  },
                  {
                    icon: <Users className="h-8 w-8" />,
                    title: "Aligned Mission",
                    description: "Deep alignment with our vision to empower beauty professionals. This is about building lasting impact, not quick returns.",
                    gradient: "from-green-500 to-emerald-500"
                  },
                  {
                    icon: <Shield className="h-8 w-8" />,
                    title: "Strategic Capital + Network",
                    description: "Investment capability plus valuable network access. We value connections, expertise, and operational support as much as capital.",
                    gradient: "from-orange-500 to-yellow-500"
                  }
                ].map((requirement, index) => (
                  <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-10">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${requirement.gradient} flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform duration-300`}>
                        {requirement.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">{requirement.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-lg">{requirement.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button 
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold border-purple-200 text-purple-700 hover:bg-purple-50"
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Ready to Apply?
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Recognition Section */}
        <section className="py-32 px-4 bg-gradient-to-br from-gray-50 to-purple-50/30">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-16"
            >
              <div className="text-center">
                <h2 className="font-playfair text-4xl md:text-6xl font-bold text-gray-900 mb-8">
                  Building Something
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block">
                    Extraordinary
                  </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  We're not just another platform — we're creating the future infrastructure for the entire beauty industry.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-12">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <Star className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Industry Recognition</h3>
                  <p className="text-gray-600 leading-relaxed">Featured by beauty industry leaders and recognized for innovation in professional services technology.</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Growing Community</h3>
                  <p className="text-gray-600 leading-relaxed">Thousands of beauty professionals already trust EmviApp to grow their businesses and find opportunities.</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <Globe className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Vision</h3>
                  <p className="text-gray-600 leading-relaxed">Positioned to scale across markets and become the definitive platform for beauty professionals worldwide.</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <blockquote className="text-center">
                  <p className="text-2xl md:text-3xl text-gray-700 font-light italic leading-relaxed">
                    "EmviApp is exactly what the beauty industry has been waiting for. They're solving real problems with elegant technology."
                  </p>
                  <footer className="mt-6">
                    <p className="text-gray-500 font-medium">— Industry Professional</p>
                  </footer>
                </blockquote>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact-form" className="py-32 px-4 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-16"
            >
              <div className="text-center">
                <h2 className="font-playfair text-5xl md:text-7xl font-bold text-foreground mb-8">
                  Think You're the One?
                </h2>
                <p className="text-2xl text-gray-600 mb-6">
                  Prove it. Fill out the contact form below.
                </p>
                <p className="text-lg text-gray-500 max-w-3xl mx-auto">
                  If we're interested, we'll be in touch. We don't publish our phone number — if selected, 
                  you will get direct text access to our team.
                </p>
              </div>

              <Card className="bg-white border-0 shadow-2xl">
                <CardContent className="p-12">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Name</label>
                        <Input
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="bg-gray-50 border-gray-200 text-gray-900 h-14 text-lg focus:ring-purple-500 focus:border-purple-500"
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Email</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="bg-gray-50 border-gray-200 text-gray-900 h-14 text-lg focus:ring-purple-500 focus:border-purple-500"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Company</label>
                        <Input
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className="bg-gray-50 border-gray-200 text-gray-900 h-14 text-lg focus:ring-purple-500 focus:border-purple-500"
                          placeholder="Company name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Website</label>
                        <Input
                          type="url"
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          className="bg-gray-50 border-gray-200 text-gray-900 h-14 text-lg focus:ring-purple-500 focus:border-purple-500"
                          placeholder="https://yourcompany.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">LinkedIn</label>
                      <Input
                        value={formData.linkedin}
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        className="bg-gray-50 border-gray-200 text-gray-900 h-14 text-lg focus:ring-purple-500 focus:border-purple-500"
                        placeholder="LinkedIn profile URL"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Your Track Record</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className="bg-gray-50 border-gray-200 text-gray-900 min-h-[120px] text-lg focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Tell us about your experience, achievements, and relevant case studies..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Why Should We Choose You? *</label>
                      <Textarea
                        value={formData.whyChooseYou}
                        onChange={(e) => handleInputChange('whyChooseYou', e.target.value)}
                        className="bg-gray-50 border-gray-200 text-gray-900 min-h-[150px] text-lg focus:ring-purple-500 focus:border-purple-500"
                        placeholder="What unique value do you bring? How can you help EmviApp scale? What makes you the right partner for us?"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6 text-xl rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      {isSubmitting ? (
                        'Submitting Your Partnership Pitch...'
                      ) : (
                        <>
                          Submit Your Partnership Pitch
                          <Send className="ml-3 h-6 w-6" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="py-32 px-4 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <h2 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Ready to Shape the Future
                <span className="block text-white/90">of Beauty?</span>
              </h2>

              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                We're looking for extraordinary partners who share our vision. If that's you, we want to hear from you.
              </p>

              <Button 
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-12 py-6 text-xl rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Submit Your Partnership Pitch
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Footer Disclaimer */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <p className="text-sm text-gray-500 leading-relaxed">
                Partnership consideration does not guarantee selection. We handpick our partners for fit, impact, and alignment. 
                Selected partners will receive private contact information for ongoing communication.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default InvestorsPartnersPage;