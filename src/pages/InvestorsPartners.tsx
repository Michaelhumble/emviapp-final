import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Shield, Target, Users, Award, Zap, Send } from 'lucide-react';
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
    message: ''
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
        toast.success('Application submitted. If we\'re interested, we\'ll be in touch.');
        setFormData({
          name: '',
          email: '',
          company: '',
          website: '',
          linkedin: '',
          message: ''
        });
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
        title="Investors & Partners | EmviApp"
        description="Exclusive partnership opportunities with EmviApp. We only work with proven experts in the beauty industry who can help us scale globally."
        image="https://emvi.app/og-investors.png"
        structuredData={{
          "@type": "WebPage",
          "name": "Investors & Partners",
          "description": "Exclusive partnership opportunities with EmviApp"
        }}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Premium Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-gray-900 to-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.02),transparent_50%)]" />
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0 bg-white/[0.02] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_1px)] bg-[length:80px_80px]" />
            </div>
          </div>

          <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <h1 className="font-playfair text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-[0.9]">
                We Don't Work With
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent block mt-4">
                  Everyone
                </span>
              </h1>

              <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto" />

              <p className="text-2xl md:text-3xl text-gray-300 max-w-5xl mx-auto leading-relaxed font-light">
                <span className="text-white font-medium">Only the Right Ones</span>
              </p>

              <p className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                If you have proven expertise and deep connections in the beauty industry — especially in marketing, scaling, and operations — you might be who we're looking for. 
                <span className="text-white font-medium"> But we choose.</span>
              </p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Button 
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100 font-semibold px-12 py-6 text-xl rounded-full"
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Prove You're the One
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-32 px-4 bg-gradient-to-br from-white via-gray-50 to-purple-50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-16"
            >
              <div className="text-center">
                <h2 className="font-playfair text-5xl md:text-7xl font-bold text-foreground mb-8">
                  Requirements
                </h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  We set the bar high because we're building something unprecedented. 
                  These aren't suggestions — they're minimums.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {[
                  {
                    icon: <Award className="h-8 w-8" />,
                    title: "Proven Deep Knowledge",
                    description: "Track record in the beauty industry (nails, hair, lashes, spa, etc.) with documented success stories and measurable impact.",
                    gradient: "from-purple-500 to-indigo-500"
                  },
                  {
                    icon: <Zap className="h-8 w-8" />,
                    title: "Marketing Agency Excellence",
                    description: "Operator experience with real, measurable growth results. We want to see the numbers, the campaigns, the wins.",
                    gradient: "from-pink-500 to-red-500"
                  },
                  {
                    icon: <Target className="h-8 w-8" />,
                    title: "Scale Capability",
                    description: "Ability to help us scale nationally & globally. Think big. We're not interested in small-market solutions.",
                    gradient: "from-blue-500 to-cyan-500"
                  },
                  {
                    icon: <Users className="h-8 w-8" />,
                    title: "Vision Alignment",
                    description: "Alignment with our long-term vision and values. This isn't transactional — it's transformational partnership.",
                    gradient: "from-green-500 to-emerald-500"
                  },
                  {
                    icon: <Shield className="h-8 w-8" />,
                    title: "Strategic Investment",
                    description: "Ability to provide strategic capital investment — not just money, but network, expertise, and operational support.",
                    gradient: "from-orange-500 to-yellow-500"
                  }
                ].map((requirement, index) => (
                  <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-10">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${requirement.gradient} flex items-center justify-center text-white mb-8`}>
                        {requirement.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">{requirement.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-lg">{requirement.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* FOMO Section */}
        <section className="py-32 px-4 bg-gradient-to-br from-black via-gray-900 to-slate-900">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <h2 className="font-playfair text-5xl md:text-7xl font-bold text-white leading-tight">
                Partnership Spots Are
                <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent block">
                  Extremely Limited
                </span>
              </h2>

              <div className="w-32 h-1 bg-gradient-to-r from-red-400 to-orange-400 mx-auto" />

              <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed">
                We are building an <span className="text-white font-bold">industry-defining platform</span> and will only choose partners who can move the needle at a national and global scale.
              </p>

              <div className="grid md:grid-cols-3 gap-8 mt-16">
                <div className="text-center">
                  <div className="text-5xl font-bold text-red-400 mb-4">3-5</div>
                  <p className="text-gray-400 text-lg">Strategic Partners Globally</p>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-orange-400 mb-4">∞</div>
                  <p className="text-gray-400 text-lg">Potential Market Impact</p>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-yellow-400 mb-4">1</div>
                  <p className="text-gray-400 text-lg">Chance to Join History</p>
                </div>
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
                      <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Message</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className="bg-gray-50 border-gray-200 text-gray-900 min-h-[150px] text-lg focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Your track record, case studies, and why EmviApp should choose you..."
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6 text-xl rounded-full transition-all duration-300"
                    >
                      {isSubmitting ? (
                        'Submitting Application...'
                      ) : (
                        <>
                          Submit Application
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

        {/* Final FOMO Section */}
        <section className="py-32 px-4 bg-gradient-to-br from-black to-gray-900">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <h2 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                We are building the <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">#1 platform</span> in beauty.
              </h2>

              <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                If you think you can help us scale, <span className="text-white font-bold">prove it</span>. 
                The right partner will change the world with us.
              </p>

              <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto" />

              <p className="text-xl text-gray-400 font-light">
                We don't need many. Just the right one.
              </p>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
                <p className="text-sm text-gray-400 leading-relaxed">
                  Partnership consideration does not guarantee selection. We handpick our partners for fit, impact, and alignment.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default InvestorsPartnersPage;