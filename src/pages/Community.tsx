
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { ChevronDown, ChevronUp, ThumbsUp, MessageSquare, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Community = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [votes, setVotes] = useState<Record<string, number>>({
    'ai-matching': 234,
    'mobile-app': 189,
    'video-portfolios': 156,
    'instant-messaging': 203,
    'calendar-sync': 128,
    'multi-language': 167
  });

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleVote = (id: string) => {
    setVotes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const featureSuggestions = [
    {
      id: 'ai-matching',
      title: 'AI-Powered Artist Matching',
      description: 'Automatically match salons with artists based on skills, location, and preferences',
      category: 'AI Features',
      votes: votes['ai-matching']
    },
    {
      id: 'mobile-app',
      title: 'Native Mobile App',
      description: 'Dedicated iOS and Android apps for better mobile experience',
      category: 'Platform',
      votes: votes['mobile-app']
    },
    {
      id: 'video-portfolios',
      title: 'Video Portfolio Support',
      description: 'Allow artists to showcase their work with time-lapse videos',
      category: 'Portfolio',
      votes: votes['video-portfolios']
    },
    {
      id: 'instant-messaging',
      title: 'Real-time Chat System',
      description: 'Instant messaging between salons and artists',
      category: 'Communication',
      votes: votes['instant-messaging']
    },
    {
      id: 'calendar-sync',
      title: 'Calendar Integration',
      description: 'Sync with Google Calendar and Apple Calendar for appointments',
      category: 'Scheduling',
      votes: votes['calendar-sync']
    },
    {
      id: 'multi-language',
      title: 'Enhanced Multi-language Support',
      description: 'Full support for Vietnamese, Spanish, and Korean languages',
      category: 'Accessibility',
      votes: votes['multi-language']
    }
  ];

  const faqData = [
    {
      category: "Product & Vision",
      questions: [
        {
          id: "what-is-emviapp",
          question: "What is EmviApp?",
          answer: "EmviApp is an AI-powered hiring and discovery platform built specifically for the beauty industry. It connects salon owners, artists, and freelancers through stunning profiles, smart matchmaking, and emotionally resonant design."
        },
        {
          id: "problem-solve",
          question: "What problem does EmviApp solve?",
          answer: "It eliminates the stress and randomness of hiring in the beauty space by creating a centralized, trustworthy platform where salons and artists can find the perfect match, fast."
        },
        {
          id: "inspiration",
          question: "What inspired you to build EmviApp?",
          answer: "After seeing how fragmented and unreliable beauty hiring is—especially in the Vietnamese nail salon industry—I knew there had to be a better, more beautiful solution built for this world."
        },
        {
          id: "long-term-vision",
          question: "What's your long-term vision?",
          answer: "To become the #1 hiring platform for the global beauty industry. Like Airbnb for salons and creators—AI-powered, visually stunning, emotionally authentic."
        },
        {
          id: "stand-out",
          question: "How does EmviApp stand out from competitors?",
          answer: "Most platforms feel cold, generic, or untrustworthy. EmviApp feels personal, premium, and emotionally real—designed specifically for the beauty world with AI at its core."
        }
      ]
    },
    {
      category: "Market & Audience",
      questions: [
        {
          id: "target-audience",
          question: "Who is your target audience?",
          answer: "Primarily nail salons and Vietnamese-owned beauty shops in the U.S., expanding into broader beauty sectors like hair, lashes, and tattoo. Artists and freelancers are our secondary core."
        },
        {
          id: "market-size",
          question: "Is the market big enough?",
          answer: "Absolutely. The beauty industry in the U.S. alone is a $100B+ market, with millions of salons and freelancers looking for better hiring tools."
        },
        {
          id: "vietnamese-community",
          question: "Why start with the Vietnamese nail community?",
          answer: "They represent a huge, underserved segment with strong word-of-mouth growth. If we win their trust, we win the market."
        }
      ]
    },
    {
      category: "Traction & Status",
      questions: [
        {
          id: "current-stage",
          question: "What stage is EmviApp in?",
          answer: "We've built 85% of Phase 1 and Phase 2: the homepage, listings system, artist dashboard, Stripe payment flow, and contact gating are all live. We're now polishing the job form and expanding salon features."
        },
        {
          id: "traction-seen",
          question: "What traction have you seen?",
          answer: "Early listings are converting well. Real job posts from Facebook groups are being transformed into professional ads, triggering trust and sign-ups."
        },
        {
          id: "marketing-spend",
          question: "Have you spent on marketing yet?",
          answer: "Not yet. Growth has come from organic FOMO, real-life listings, and design quality. We're holding off paid ads until we stabilize all features."
        }
      ]
    },
    {
      category: "Financials & Funding",
      questions: [
        {
          id: "current-valuation",
          question: "What's your current valuation?",
          answer: "We're offering 20% equity for $200,000, placing the pre-money valuation at $800,000 and post-money at $1 million."
        },
        {
          id: "fund-usage",
          question: "How will the $200,000 be used?",
          answer: "For finalizing development, launching smart AI agents for growth, and funding 12 months of runway to scale."
        },
        {
          id: "burn-rate",
          question: "What's your burn rate?",
          answer: "Very low. We're intentionally lean—contracting as needed and building most of the system ourselves with AI tools."
        },
        {
          id: "future-raises",
          question: "Do you plan to raise again?",
          answer: "Not unless strategically needed. Our goal is to be self-sustaining and profitable, not stuck in endless fundraising."
        }
      ]
    },
    {
      category: "Business Model & Revenue",
      questions: [
        {
          id: "monetization",
          question: "How does EmviApp make money?",
          answer: "Through job and salon post tiers (free to premium), ad placements, smart upsells, and future SaaS tools for business management."
        },
        {
          id: "pricing-strategy",
          question: "What's your pricing strategy?",
          answer: "We start free, then upsell gently through emotional trust triggers. Diamond listings are hidden and invite-only, creating exclusivity."
        },
        {
          id: "revenue-scale",
          question: "How do you plan to scale revenue?",
          answer: "By offering AI-enhanced listings, featured placements, salon CRM tools, and bilingual ad creation services."
        }
      ]
    },
    {
      category: "Product Features & Growth",
      questions: [
        {
          id: "exciting-features",
          question: "What are your most exciting features?",
          answer: "\"Polish with AI\" job post enhancer, secret pricing menus, gated contact info, emotional testimonials, and bilingual job templates."
        },
        {
          id: "user-acquisition",
          question: "How do you plan to acquire users?",
          answer: "Through FOMO listings, Facebook group outreach, affiliate links, and viral storytelling content from real users."
        },
        {
          id: "beauty-verticals",
          question: "Do you support other beauty verticals?",
          answer: "Yes—Hair, lashes, tattoo, massage, and more are already in the system. We're just leading with nails to earn community trust first."
        },
        {
          id: "ai-help",
          question: "How does AI help EmviApp?",
          answer: "AI enhances listings, routes users, polishes job descriptions, and eventually will run marketing and onboarding flows autonomously."
        }
      ]
    },
    {
      category: "Risks & Defensibility",
      questions: [
        {
          id: "biggest-risks",
          question: "What are the biggest risks?",
          answer: "Rushing too fast, or failing to maintain authenticity. We're focused on growing at the right pace while protecting the brand."
        },
        {
          id: "defensibility",
          question: "What makes this defensible?",
          answer: "Cultural trust, authentic listings, AI tooling, and our early traction in a deeply connected niche."
        },
        {
          id: "copying-prevention",
          question: "What stops others from copying this?",
          answer: "The emotional design, execution quality, and community connections we've built are hard to replicate."
        }
      ]
    },
    {
      category: "Team & Execution",
      questions: [
        {
          id: "team-building",
          question: "Who's building this?",
          answer: "I'm leading strategy, design, and product. We're using Lovable AI for rapid development and collaborating with contractors as needed."
        },
        {
          id: "founder-superpower",
          question: "What's your superpower as a founder?",
          answer: "Emotional design, community insight, and an obsession with execution. I understand both the culture and the tech."
        },
        {
          id: "why-now",
          question: "Why now?",
          answer: "The beauty industry is still offline. AI + emotional branding + community = the perfect storm to win now."
        }
      ]
    },
    {
      category: "Investor Questions",
      questions: [
        {
          id: "investor-expectations",
          question: "What are you looking for from investors?",
          answer: "Not just capital—wisdom, belief, and calm guidance. We want aligned partners who see the long game."
        },
        {
          id: "investor-returns",
          question: "How will I get a return on investment?",
          answer: "Through smart monetization, lean growth, and potential acquisition. Our model is built to scale profitably and organically."
        }
      ]
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/20">
        {/* Hero Section */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-6 bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
              EmviApp Community
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Shape the future of beauty hiring. Vote on features, ask questions, and connect with our growing community of salon owners and artists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white">
                Join the Community
              </Button>
              <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                Learn More
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Feature Suggestions Voting Board */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold font-playfair mb-4 text-gray-900">
                Feature Suggestions
              </h2>
              <p className="text-gray-600">
                Vote on the features you want to see next. Your voice shapes our roadmap.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {featureSuggestions.map((suggestion) => (
                <Card key={suggestion.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="h-4 w-4 text-purple-600" />
                          <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                            {suggestion.category}
                          </span>
                        </div>
                        <CardTitle className="text-lg">{suggestion.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{suggestion.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleVote(suggestion.id)}
                          className="flex items-center gap-1 hover:bg-purple-50 hover:border-purple-300"
                        >
                          <ThumbsUp className="h-3 w-3" />
                          {suggestion.votes}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          Discuss
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Investor Vision Q&A Section */}
          <div className="mb-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold font-playfair mb-4 text-gray-900">
                EmviApp Investor & Product Q&A
              </h2>
              <p className="text-gray-600">
                Transparent answers to build trust, clarity, and long-term belief.
              </p>
            </div>

            <div className="space-y-8">
              {faqData.map((section) => (
                <div key={section.category} className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 border-b pb-2">
                    {section.category}
                  </h3>
                  <div className="space-y-3">
                    {section.questions.map((faq) => (
                      <div key={faq.id} className="border rounded-lg">
                        <button
                          onClick={() => toggleFAQ(faq.id)}
                          className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                        >
                          <span className="font-medium text-gray-900">{faq.question}</span>
                          {expandedFAQ === faq.id ? (
                            <ChevronUp className="h-4 w-4 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-500 flex-shrink-0" />
                          )}
                        </button>
                        {expandedFAQ === faq.id && (
                          <div className="px-4 pb-3 text-gray-600 border-t bg-gray-50/50">
                            <p className="pt-3">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Community;
