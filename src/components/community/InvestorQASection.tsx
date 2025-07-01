
import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const InvestorQASection = () => {
  const qaData = {
    "Product & Vision": [
      {
        question: "What is EmviApp?",
        answer: "EmviApp is an AI-powered hiring and discovery platform built specifically for the beauty industry. It connects salon owners, artists, and freelancers through stunning profiles, smart matchmaking, and emotionally resonant design."
      },
      {
        question: "What problem does EmviApp solve?",
        answer: "It eliminates the stress and randomness of hiring in the beauty space by creating a centralized, trustworthy platform where salons and artists can find the perfect match, fast."
      },
      {
        question: "What inspired you to build EmviApp?",
        answer: "After seeing how fragmented and unreliable beauty hiring is—especially in the Vietnamese nail salon industry—I knew there had to be a better, more beautiful solution built for this world."
      },
      {
        question: "What's your long-term vision?",
        answer: "To become the #1 hiring platform for the global beauty industry. Like Airbnb for salons and creators—AI-powered, visually stunning, emotionally authentic."
      },
      {
        question: "How does EmviApp stand out from competitors?",
        answer: "Most platforms feel cold, generic, or untrustworthy. EmviApp feels personal, premium, and emotionally real—designed specifically for the beauty world with AI at its core."
      }
    ],
    "Market & Audience": [
      {
        question: "Who is your target audience?",
        answer: "Primarily nail salons and Vietnamese-owned beauty shops in the U.S., expanding into broader beauty sectors like hair, lashes, and tattoo. Artists and freelancers are our secondary core."
      },
      {
        question: "Is the market big enough?",
        answer: "Absolutely. The beauty industry in the U.S. alone is a $100B+ market, with millions of salons and freelancers looking for better hiring tools."
      },
      {
        question: "Why start with the Vietnamese nail community?",
        answer: "They represent a huge, underserved segment with strong word-of-mouth growth. If we win their trust, we win the market."
      }
    ],
    "Traction & Status": [
      {
        question: "What stage is EmviApp in?",
        answer: "We've built 85% of Phase 1 and Phase 2: the homepage, listings system, artist dashboard, Stripe payment flow, and contact gating are all live. We're now polishing the job form and expanding salon features."
      },
      {
        question: "What traction have you seen?",
        answer: "Early listings are converting well. Real job posts from Facebook groups are being transformed into professional ads, triggering trust and sign-ups."
      },
      {
        question: "Have you spent on marketing yet?",
        answer: "Not yet. Growth has come from organic FOMO, real-life listings, and design quality. We're holding off paid ads until we stabilize all features."
      }
    ],
    "Financials & Funding": [
      {
        question: "What's your current valuation?",
        answer: "We're offering 20% equity for $200,000, placing the pre-money valuation at $800,000 and post-money at $1 million."
      },
      {
        question: "How will the $200,000 be used?",
        answer: "For finalizing development, launching smart AI agents for growth, and funding 12 months of runway to scale."
      },
      {
        question: "What's your burn rate?",
        answer: "Very low. We're intentionally lean—contracting as needed and building most of the system ourselves with AI tools."
      },
      {
        question: "Do you plan to raise again?",
        answer: "Not unless strategically needed. Our goal is to be self-sustaining and profitable, not stuck in endless fundraising."
      }
    ],
    "Business Model & Revenue": [
      {
        question: "How does EmviApp make money?",
        answer: "Through job and salon post tiers (free to premium), ad placements, smart upsells, and future SaaS tools for business management."
      },
      {
        question: "What's your pricing strategy?",
        answer: "We start free, then upsell gently through emotional trust triggers. Diamond listings are hidden and invite-only, creating exclusivity."
      },
      {
        question: "How do you plan to scale revenue?",
        answer: "By offering AI-enhanced listings, featured placements, salon CRM tools, and bilingual ad creation services."
      }
    ],
    "Product Features & Growth": [
      {
        question: "What are your most exciting features?",
        answer: "'Polish with AI' job post enhancer, secret pricing menus, gated contact info, emotional testimonials, and bilingual job templates."
      },
      {
        question: "How do you plan to acquire users?",
        answer: "Through FOMO listings, Facebook group outreach, affiliate links, and viral storytelling content from real users."
      },
      {
        question: "Do you support other beauty verticals?",
        answer: "Yes—Hair, lashes, tattoo, massage, and more are already in the system. We're just leading with nails to earn community trust first."
      },
      {
        question: "How does AI help EmviApp?",
        answer: "AI enhances listings, routes users, polishes job descriptions, and eventually will run marketing and onboarding flows autonomously."
      }
    ],
    "Risks & Defensibility": [
      {
        question: "What are the biggest risks?",
        answer: "Rushing too fast, or failing to maintain authenticity. We're focused on growing at the right pace while protecting the brand."
      },
      {
        question: "What makes this defensible?",
        answer: "Cultural trust, authentic listings, AI tooling, and our early traction in a deeply connected niche."
      },
      {
        question: "What stops others from copying this?",
        answer: "The emotional design, execution quality, and community connections we've built are hard to replicate."
      }
    ],
    "Team & Execution": [
      {
        question: "Who's building this?",
        answer: "I'm leading strategy, design, and product. We're using Lovable AI for rapid development and collaborating with contractors as needed."
      },
      {
        question: "What's your superpower as a founder?",
        answer: "Emotional design, community insight, and an obsession with execution. I understand both the culture and the tech."
      },
      {
        question: "Why now?",
        answer: "The beauty industry is still offline. AI + emotional branding + community = the perfect storm to win now."
      }
    ],
    "Investor Questions": [
      {
        question: "What are you looking for from investors?",
        answer: "Not just capital—wisdom, belief, and calm guidance. We want aligned partners who see the long game."
      },
      {
        question: "How will I get a return on investment?",
        answer: "Through smart monetization, lean growth, and potential acquisition. Our model is built to scale profitably and organically."
      }
    ]
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-gray-900">
            Investor Vision & Q&A
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about EmviApp's vision, market opportunity, and growth strategy.
          </p>
        </motion.div>

        <div className="space-y-8">
          {Object.entries(qaData).map(([category, questions], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                {category}
              </h3>
              
              <Accordion type="single" collapsible className="w-full">
                {questions.map((qa, index) => (
                  <AccordionItem key={index} value={`${category}-${index}`} className="border-gray-100">
                    <AccordionTrigger className="text-left text-gray-800 hover:text-purple-600 py-3">
                      {qa.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-4 leading-relaxed">
                      {qa.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestorQASection;
