import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Users, Award, Star, Shield, Zap, Target, Eye, Lock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import DynamicSEO from '@/components/seo/DynamicSEO';

const InvestorsPartners = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    role: '',
    email: '',
    contactMethod: 'email',
    mobile: '',
    pitch: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to Twilio SMS function if Text Me is selected
      if (formData.contactMethod === 'text' && formData.mobile) {
        await supabase.functions.invoke('twilio-sms', {
          body: {
            to: formData.mobile,
            message: `Thank you ${formData.name} from ${formData.company}. We've received your partnership application for EmviApp. Our team will review your submission and respond within 48 hours. Reply to this message to continue the conversation.`
          }
        });
      }

      // You can add database storage here if needed
      toast.success('Application submitted successfully! We\'ll be in touch within 48 hours.');
      
      // Reset form
      setFormData({
        name: '',
        company: '',
        role: '',
        email: '',
        contactMethod: 'email',
        mobile: '',
        pitch: ''
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
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
        title="Investors & Partners | EmviApp"
        description="Join EmviApp as an exclusive strategic partner. We're building the future of the $600B beauty industry and seeking rare partners who can help us dominate."
        image="https://emvi.app/og-investors.png"
        structuredData={{
          "@type": "WebPage",
          "name": "Investors & Partners",
          "description": "Exclusive partnership opportunities with EmviApp",
          "provider": {
            "@type": "Organization",
            "name": "EmviApp"
          }
        }}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Cinematic Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-900">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.1),transparent_50%)]" />
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-white/[0.02] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_1px)] bg-[length:60px_60px]" />
            </div>
          </div>

          <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <Badge className="bg-white/10 text-white border-white/20 px-6 py-2 text-lg">
                <Lock className="w-5 h-5 mr-2" />
                By Invitation Only
              </Badge>

              <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
                The Future of Beauty
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent block">
                  Starts Here
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                We partner only with the rare few who can help us dominate the 
                <span className="font-bold text-white"> $600B beauty market</span>
              </p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Button 
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
                  onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Apply for Partnership
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Why EmviApp / Market Size */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-12"
            >
              <h2 className="font-playfair text-4xl md:text-6xl font-bold text-foreground">
                The Opportunity is
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Massive</span>
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-200">
                  <CardContent className="p-8 text-center">
                    <Globe className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">$600B+</h3>
                    <p className="text-gray-600">Global beauty market size</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-pink-50 to-white border-pink-200">
                  <CardContent className="p-8 text-center">
                    <Users className="h-12 w-12 text-pink-600 mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">Underserved</h3>
                    <p className="text-gray-600">Digital salon/artist sector</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-50 to-white border-orange-200">
                  <CardContent className="p-8 text-center">
                    <Award className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">Live</h3>
                    <p className="text-gray-600">Platform, brand & community proven</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-indigo-50 to-white border-indigo-200">
                  <CardContent className="p-8 text-center">
                    <Target className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">Unicorn</h3>
                    <p className="text-gray-600">Billion-dollar scale potential</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Who We're Looking For */}
        <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-purple-50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="text-center">
                <h2 className="font-playfair text-4xl md:text-6xl font-bold text-foreground mb-6">
                  Who We're Looking For
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  We don't work with everyone. We seek partners who understand our vision and can deliver extraordinary results.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Zap className="h-8 w-8" />,
                    title: "Marketing Agencies",
                    description: "Proven beauty/lifestyle growth with documented case studies and big-name client wins",
                    gradient: "from-yellow-500 to-orange-500"
                  },
                  {
                    icon: <Star className="h-8 w-8" />,
                    title: "PR/Brand Partners",
                    description: "Established media relationships with major beauty publications and influencer networks",
                    gradient: "from-pink-500 to-purple-500"
                  },
                  {
                    icon: <Target className="h-8 w-8" />,
                    title: "Growth Operators",
                    description: "Marketplace and local lead generation experts with proven scalability track records",
                    gradient: "from-blue-500 to-indigo-500"
                  },
                  {
                    icon: <Award className="h-8 w-8" />,
                    title: "Beauty Sector Investors",
                    description: "Operational expertise in beauty industry with strategic value beyond capital",
                    gradient: "from-green-500 to-teal-500"
                  },
                  {
                    icon: <Globe className="h-8 w-8" />,
                    title: "Tech/SaaS Partners",
                    description: "Enterprise solutions for reach, engagement, and monetization at massive scale",
                    gradient: "from-purple-500 to-pink-500"
                  },
                  {
                    icon: <Eye className="h-8 w-8" />,
                    title: "Strategic Visionaries",
                    description: "Industry leaders who see the future of beauty and want to build it with us",
                    gradient: "from-indigo-500 to-purple-500"
                  }
                ].map((partner, index) => (
                  <Card key={index} className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-8">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${partner.gradient} flex items-center justify-center text-white mb-6`}>
                        {partner.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">{partner.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{partner.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why It's By Invitation Only */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="font-playfair text-4xl md:text-6xl font-bold text-foreground">
                Exclusivity by Design
              </h2>

              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white mx-auto">
                    <Shield className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold">Selective Partnership</h3>
                  <p className="text-gray-600">We select no more than 3–5 strategic partners globally</p>
                </div>

                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white mx-auto">
                    <Target className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold">Perfect Alignment</h3>
                  <p className="text-gray-600">Partnership based on alignment, capability, and proven results</p>
                </div>

                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white mx-auto">
                    <Award className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold">Impact Over Quantity</h3>
                  <p className="text-gray-600">We value transformational impact over portfolio quantity</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Application Form */}
        <section id="application-form" className="py-20 px-4 bg-gradient-to-br from-black via-gray-900 to-purple-900">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="text-center text-white">
                <h2 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
                  How to Apply
                </h2>
                <p className="text-xl text-gray-300 mb-4">
                  We select our partners carefully. Prove you belong here.
                </p>
                <p className="text-lg text-gray-400">
                  Email us directly at: <span className="text-white font-semibold">support@emvi.app</span>
                </p>
                <div className="mt-6 p-4 bg-white/10 rounded-lg border border-white/20">
                  <p className="text-sm text-gray-300">
                    <Lock className="w-4 h-4 inline mr-2" />
                    We don't publish a phone number. If you choose 'Text me', we'll initiate a text thread—just reply to continue.
                  </p>
                </div>
              </div>

              <Card className="bg-white/10 border-white/20">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Name *</label>
                        <Input
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Company *</label>
                        <Input
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          placeholder="Company name"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Role *</label>
                        <Input
                          value={formData.role}
                          onChange={(e) => handleInputChange('role', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          placeholder="Your role/title"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Email *</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-4">Preferred Contact Method *</label>
                      <div className="flex gap-4">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="contactMethod"
                            value="email"
                            checked={formData.contactMethod === 'email'}
                            onChange={(e) => handleInputChange('contactMethod', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-white">Email me</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="contactMethod"
                            value="text"
                            checked={formData.contactMethod === 'text'}
                            onChange={(e) => handleInputChange('contactMethod', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-white">Text me</span>
                        </label>
                      </div>
                    </div>

                    {formData.contactMethod === 'text' && (
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Mobile Number *</label>
                        <Input
                          type="tel"
                          value={formData.mobile}
                          onChange={(e) => handleInputChange('mobile', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                          placeholder="+1 (555) 123-4567"
                          required={formData.contactMethod === 'text'}
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Why EmviApp? *</label>
                      <Textarea
                        value={formData.pitch}
                        onChange={(e) => handleInputChange('pitch', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-32"
                        placeholder="Share your track record, case studies, and why you're the right partner for EmviApp..."
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-white text-black hover:bg-gray-100 font-semibold py-4 text-lg"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                      <Send className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Final FOMO Section */}
        <section className="py-20 px-4 bg-black">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                We are building the #1 platform in beauty.
              </h2>
              
              <p className="text-2xl md:text-3xl text-white font-light">
                If you think you can help us scale, 
                <span className="font-bold"> prove it.</span>
              </p>

              <p className="text-xl text-white">
                The right partner will change the world with us.
              </p>

              <div className="mt-12">
                <p className="text-lg text-gray-400 font-light">
                  We don't need many. Just the right one.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default InvestorsPartners;