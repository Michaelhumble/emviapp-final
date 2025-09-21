import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, XCircle, Calendar, TrendingUp, DollarSign, Users, Target, Rocket, Award, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

const AffiliateStrategyPage = () => {
  const strengths = [
    "Solid technical foundation",
    "Stripe Connect integration",
    "Real-time analytics dashboard",
    "Scalable infrastructure",
    "Trusted beauty platform"
  ];

  const gaps = [
    "Missing recruitment funnels",
    "No systematic onboarding",
    "Limited social proof",
    "No gamification layer",
    "Weak attribution tracking",
    "Manual approval process"
  ];

  const phases = [
    {
      phase: 1,
      title: "Foundation",
      duration: "Months 1–2",
      icon: Target,
      color: "from-blue-500 to-blue-600",
      tasks: ["Multi-tier commission structure", "Smart link technology", "Attribution tracking"]
    },
    {
      phase: 2,
      title: "Recruitment Engine",
      duration: "Months 2–3", 
      icon: Users,
      color: "from-purple-500 to-purple-600",
      tasks: ["Influencer outreach automation", "Application funnel optimization", "Quality scoring system"]
    },
    {
      phase: 3,
      title: "Enablement & Training",
      duration: "Months 3–4",
      icon: Award,
      color: "from-green-500 to-green-600", 
      tasks: ["Comprehensive training modules", "Marketing asset library", "1-on-1 onboarding"]
    },
    {
      phase: 4,
      title: "Gamification & Competition",
      duration: "Months 4–5",
      icon: Rocket,
      color: "from-orange-500 to-orange-600",
      tasks: ["Leaderboards and badges", "Performance competitions", "Bonus tier unlocks"]
    },
    {
      phase: 5,
      title: "Scale & Automation",
      duration: "Months 5–6",
      icon: BarChart3,
      color: "from-indigo-500 to-indigo-600",
      tasks: ["AI-powered optimization", "Automated payouts", "Advanced analytics"]
    }
  ];

  const projections = [
    {
      type: "Conservative",
      timeline: "12 months",
      revenue: "$3.6M/year",
      affiliates: "1,500",
      color: "from-green-100 to-green-50 border-green-200",
      textColor: "text-green-800"
    },
    {
      type: "Aggressive", 
      timeline: "18 months",
      revenue: "$29.4M/year",
      affiliates: "5,000",
      color: "from-blue-100 to-blue-50 border-blue-200",
      textColor: "text-blue-800"
    },
    {
      type: "Scale",
      timeline: "24 months", 
      revenue: "$120M/year",
      affiliates: "15,000",
      color: "from-purple-100 to-purple-50 border-purple-200",
      textColor: "text-purple-800"
    }
  ];

  const actionItems = [
    {
      period: "Week 1–2 Quick Wins",
      items: [
        "Optimize affiliate signup flow",
        "Create initial marketing assets",
        "Set up basic tracking"
      ]
    },
    {
      period: "Month 1 Foundation",
      items: [
        "Launch multi-tier commission structure",
        "Implement smart link technology", 
        "Build recruitment landing pages"
      ]
    },
    {
      period: "Month 2–3 Preparation", 
      items: [
        "Develop training curriculum",
        "Create influencer outreach campaigns",
        "Build gamification framework"
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>EmviApp Affiliate Strategy — Road to $120M Scale</title>
        <meta name="description" content="Systematic recruitment, enablement, and gamification to build the world's most powerful beauty affiliate network. Professional investor-ready strategy." />
        <link rel="canonical" href="https://www.emvi.app/affiliate-strategy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* OpenGraph */}
        <meta property="og:title" content="EmviApp Affiliate Strategy — Road to $120M Scale" />
        <meta property="og:description" content="Systematic recruitment, enablement, and gamification to build the world's most powerful beauty affiliate network." />
        <meta property="og:url" content="https://www.emvi.app/affiliate-strategy" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="EmviApp" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="EmviApp Affiliate Strategy — Road to $120M Scale" />
        <meta name="twitter:description" content="Systematic recruitment, enablement, and gamification to build the world's most powerful beauty affiliate network." />
      </Helmet>
      
      <Layout>
        <div className="min-h-screen bg-[hsl(var(--pearl-white))]">
          {/* Hero Section */}
          <section className="relative isolate overflow-hidden bg-gradient-to-br from-[hsl(var(--pearl-white))] via-purple-50/30 to-indigo-50/20">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-transparent to-indigo-100/20" />
            </div>
            
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
              <motion.div 
                className="mx-auto max-w-4xl text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Badge className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 border border-purple-200">
                  <TrendingUp className="h-4 w-4" />
                  Strategic Roadmap
                </Badge>
                
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
                  EmviApp Affiliate Program
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                    Road to $120M Scale
                  </span>
                </h1>
                
                <p className="text-xl leading-8 text-gray-600 mb-10 max-w-3xl mx-auto">
                  Systematic recruitment, enablement, and gamification to build the world's most powerful beauty affiliate network.
                </p>
                
                <Link to="/affiliate">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    Join the Affiliate Program
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Current State Analysis */}
          <section className="py-20 bg-white">
            <div className="mx-auto max-w-7xl px-6">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
                  Current State Analysis
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Assessment of our existing affiliate program foundation and identified growth opportunities
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-green-200 bg-gradient-to-br from-green-50/50 to-emerald-50/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-green-800">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                        Strengths
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {strengths.map((strength, index) => (
                          <li key={index} className="flex items-center gap-3">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-green-700">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-red-200 bg-gradient-to-br from-red-50/50 to-rose-50/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-red-800">
                        <XCircle className="h-6 w-6 text-red-600" />
                        Gaps to Address
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {gaps.map((gap, index) => (
                          <li key={index} className="flex items-center gap-3">
                            <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                            <span className="text-red-700">{gap}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Phased Strategy Timeline */}
          <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50/20">
            <div className="mx-auto max-w-7xl px-6">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
                  Phased Strategy Timeline
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  5-phase systematic approach to building a world-class affiliate program
                </p>
              </motion.div>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-purple-200 via-indigo-200 to-purple-200 hidden lg:block" />
                
                <div className="space-y-12">
                  {phases.map((phase, index) => {
                    const IconComponent = phase.icon;
                    const isEven = index % 2 === 0;
                    
                    return (
                      <motion.div
                        key={phase.phase}
                        className={`flex items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col lg:gap-8`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className={`flex-1 ${isEven ? 'lg:text-right lg:pr-8' : 'lg:text-left lg:pl-8'} text-center lg:text-inherit`}>
                          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                            <CardHeader>
                              <div className={`flex items-center gap-3 ${isEven ? 'lg:justify-end' : 'lg:justify-start'} justify-center`}>
                                <div className={`p-3 rounded-full bg-gradient-to-r ${phase.color} text-white`}>
                                  <IconComponent className="h-6 w-6" />
                                </div>
                                <div>
                                  <Badge variant="outline" className="mb-2">
                                    Phase {phase.phase}
                                  </Badge>
                                  <CardTitle className="text-xl font-bold text-gray-900">
                                    {phase.title}
                                  </CardTitle>
                                  <p className="text-sm text-gray-600">{phase.duration}</p>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <ul className={`space-y-2 ${isEven ? 'lg:text-right' : 'lg:text-left'} text-center lg:text-inherit`}>
                                {phase.tasks.map((task, taskIndex) => (
                                  <li key={taskIndex} className={`flex items-center gap-2 ${isEven ? 'lg:justify-end' : 'lg:justify-start'} justify-center`}>
                                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                    <span className="text-gray-700">{task}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                        
                        {/* Timeline dot */}
                        <div className="relative z-10 hidden lg:block">
                          <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${phase.color} border-4 border-white shadow-lg`} />
                        </div>
                        
                        <div className="flex-1 lg:block hidden" />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Revenue Projections */}
          <section className="py-20 bg-white">
            <div className="mx-auto max-w-7xl px-6">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
                  Revenue Projections
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Conservative to aggressive growth scenarios based on industry benchmarks
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {projections.map((projection, index) => (
                  <motion.div
                    key={projection.type}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className={`h-full bg-gradient-to-br ${projection.color} border-2 hover:shadow-xl transition-all duration-300`}>
                      <CardHeader className="text-center">
                        <Badge variant="outline" className="mb-4 self-center">
                          {projection.timeline}
                        </Badge>
                        <CardTitle className={`text-2xl font-bold ${projection.textColor}`}>
                          {projection.type}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className={`text-4xl font-black ${projection.textColor} mb-4`}>
                          {projection.revenue}
                        </div>
                        <div className="flex items-center justify-center gap-2 text-gray-600">
                          <Users className="h-4 w-4" />
                          <span>{projection.affiliates} affiliates</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Immediate Action Items */}
          <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50/20">
            <div className="mx-auto max-w-7xl px-6">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
                  Immediate Action Items
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Prioritized roadmap for immediate implementation and long-term success
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {actionItems.map((period, index) => (
                  <motion.div
                    key={period.period}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full bg-white/80 backdrop-blur-sm border-gray-200 hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-4">
                          <Calendar className="h-6 w-6 text-purple-600" />
                          <CardTitle className="text-lg font-bold text-gray-900">
                            {period.period}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {period.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-3">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600">
            <div className="mx-auto max-w-4xl px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
                  Ready to Scale With Us?
                </h2>
                <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
                  Would you like me to implement any of these enhancements to your current affiliate system?
                </p>
                
                <Link to="/affiliate">
                  <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-50 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    Apply Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default AffiliateStrategyPage;