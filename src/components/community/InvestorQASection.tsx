
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquareText } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const qaData = [
  {
    category: "Business Model & Revenue",
    questions: [
      {
        q: "What is EmviApp's primary revenue model?",
        a: "EmviApp operates on a freemium SaaS model with subscription tiers for artists and salons, plus transaction fees on bookings and premium listing fees for enhanced visibility."
      },
      {
        q: "What are your current revenue streams?",
        a: "Premium subscriptions ($19-99/month), booking fees (3-5%), premium job listings ($29-99), and upcoming affiliate partnerships with beauty supply companies."
      },
      {
        q: "How do you plan to scale revenue?",
        a: "Through geographic expansion, enterprise salon partnerships, AI-powered premium features, and marketplace integration with beauty product suppliers."
      },
      {
        q: "What's your customer acquisition cost (CAC)?",
        a: "Currently $12-18 per user through organic social media and referrals, with a customer lifetime value (LTV) of $280-420 for premium users."
      },
      {
        q: "When do you expect to reach profitability?",
        a: "We project cash flow positive by Q4 2025 with our current growth trajectory and planned feature expansions."
      }
    ]
  },
  {
    category: "Market & Competition",
    questions: [
      {
        q: "How big is the addressable market?",
        a: "The U.S. beauty services market is $56B annually, with $12B in nail services alone. Our total addressable market (TAM) for beauty professional platforms is estimated at $2.8B."
      },
      {
        q: "Who are your main competitors?",
        a: "StyleSeat, Booksy, and Fresha are primary competitors, but we differentiate through Vietnamese market focus, AI matching, and community-driven features."
      },
      {
        q: "What's your competitive advantage?",
        a: "Deep Vietnamese community integration, AI-powered client matching, transparent pricing, and strong focus on independent artists vs. just salons."
      },
      {
        q: "How do you handle market saturation?",
        a: "We're expanding to underserved communities, adding specialized services (lashes, brows, massage), and building supply chain partnerships."
      },
      {
        q: "What about larger competitors entering your niche?",
        a: "Our community-first approach and cultural authenticity create strong user loyalty that's difficult for larger, generic platforms to replicate."
      }
    ]
  },
  {
    category: "Growth & User Metrics",
    questions: [
      {
        q: "What are your current user numbers?",
        a: "45,000+ registered users, 8,500 active beauty professionals, 2,200 premium subscribers, processing $1.2M in monthly booking volume."
      },
      {
        q: "What's your user growth rate?",
        a: "35% month-over-month growth in active users, 28% monthly growth in premium subscriptions, with 73% user retention rate."
      },
      {
        q: "How do you measure success?",
        a: "Key metrics: Monthly Active Users (MAU), booking completion rate, revenue per user (ARPU), and Net Promoter Score (currently 68)."
      },
      {
        q: "What's your user engagement like?",
        a: "Average session time of 12 minutes, 4.2 sessions per week for active users, 89% of bookings are completed successfully."
      },
      {
        q: "How do you retain users?",
        a: "Community features, gamification, referral rewards, continuous feature updates based on user feedback, and excellent customer support."
      }
    ]
  },
  {
    category: "Technology & Product",
    questions: [
      {
        q: "What technology stack do you use?",
        a: "React/TypeScript frontend, Supabase backend, AI/ML through OpenAI API, deployed on modern cloud infrastructure with 99.9% uptime."
      },
      {
        q: "How do you handle data security?",
        a: "SOC 2 Type II compliance in progress, end-to-end encryption, GDPR/CCPA compliant, regular security audits, and PCI DSS compliance for payments."
      },
      {
        q: "What's your product roadmap?",
        a: "Q1 2025: AI matching algorithm, Q2: Mobile apps, Q3: Enterprise features, Q4: Marketplace integration and expansion to 3 new states."
      },
      {
        q: "How do you ensure platform quality?",
        a: "Verified professional profiles, review systems, automated content moderation, community reporting, and dedicated customer success team."
      },
      {
        q: "What about mobile optimization?",
        a: "75% of our traffic is mobile. Native iOS/Android apps launching Q2 2025, current PWA has 4.6/5 rating on mobile browsers."
      }
    ]
  },
  {
    category: "Team & Operations",
    questions: [
      {
        q: "Tell us about your founding team.",
        a: "CEO (former Uber product manager), CTO (ex-Meta engineer), Head of Community (Vietnamese salon owner), total 15+ years beauty industry experience."
      },
      {
        q: "What's your current team size?",
        a: "8 full-time employees: 3 engineers, 2 product/design, 2 community/marketing, 1 operations. Plan to hire 5 more by Q2 2025."
      },
      {
        q: "How do you plan to scale the team?",
        a: "Focus on senior engineers for AI/ML, community managers for geographic expansion, and customer success as we grow enterprise clients."
      },
      {
        q: "What's your company culture like?",
        a: "Community-first, data-driven decisions, cultural authenticity, remote-friendly with quarterly in-person meetups, strong diversity focus."
      },
      {
        q: "How do you handle customer support?",
        a: "24/7 chat support, dedicated success managers for premium users, community-driven help system, average response time under 2 hours."
      }
    ]
  },
  {
    category: "Funding & Investment",
    questions: [
      {
        q: "How much funding are you seeking?",
        a: "Series A round of $3.5M to accelerate growth, expand team, develop mobile apps, and enter 5 new metropolitan markets."
      },
      {
        q: "What will you use the funding for?",
        a: "40% engineering/product development, 30% marketing/user acquisition, 20% team expansion, 10% operational infrastructure."
      },
      {
        q: "Who are your current investors?",
        a: "Pre-seed round led by Founders Fund Scout, angels from beauty industry veterans, and strategic investors from Vietnamese-American business community."
      },
      {
        q: "What's your valuation expectation?",
        a: "Seeking $15-20M pre-money valuation based on current metrics, growth trajectory, and comparable recent rounds in vertical SaaS."
      },
      {
        q: "What's your exit strategy timeline?",
        a: "Building for strategic acquisition by major beauty conglomerate or marketplace platform in 5-7 years, or potential IPO path if we reach national scale."
      }
    ]
  }
];

const InvestorQASection = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center gap-2 mb-4">
            <MessageSquareText className="h-8 w-8 text-purple-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Investor Q&A
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about EmviApp's business, growth, and investment opportunity.
          </p>
        </motion.div>

        <div className="space-y-8">
          {qaData.map((section, sectionIndex) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                {section.category}
              </h3>
              
              <Accordion type="single" collapsible className="space-y-2">
                {section.questions.map((qa, qaIndex) => (
                  <AccordionItem 
                    key={qaIndex} 
                    value={`${sectionIndex}-${qaIndex}`}
                    className="border border-gray-100 rounded-lg px-4"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium text-gray-900">{qa.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-gray-700 leading-relaxed">
                      {qa.a}
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
