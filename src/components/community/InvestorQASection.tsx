
import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const investorQAs = [
  {
    category: "Business Model & Revenue",
    questions: [
      {
        q: "What is EmviApp's primary revenue model?",
        a: "EmviApp operates on a freemium SaaS model with subscription tiers for professionals, premium listing fees for salons, and transaction fees on bookings. We also offer advertising placements and professional certification programs."
      },
      {
        q: "How large is the total addressable market?",
        a: "The global beauty services market is valued at $532B annually, with digital transformation accelerating adoption. Our addressable market in the US alone represents $95B in annual beauty service transactions."
      },
      {
        q: "What are your current revenue streams?",
        a: "Current revenue comes from subscription fees ($29-99/month per professional), premium salon listings ($199-499/month), booking transaction fees (3-5%), and advertising revenue from beauty suppliers."
      },
      {
        q: "What is your customer acquisition cost?",
        a: "Our blended CAC is $45 for beauty professionals and $180 for salon owners, with strong organic growth through word-of-mouth and community referrals reducing paid acquisition needs."
      },
      {
        q: "What are your unit economics?",
        a: "LTV:CAC ratio of 5:1 for professionals and 8:1 for salons. Average customer lifetime value is $1,200 for professionals and $2,400 for salon owners, with 18-month average payback period."
      }
    ]
  },
  {
    category: "Market & Competition",
    questions: [
      {
        q: "Who are your main competitors?",
        a: "Direct competitors include Booksy, StyleSeat, and Vagaro. However, most focus on booking only - we differentiate with community features, bilingual support, and comprehensive business management tools."
      },
      {
        q: "What is your competitive advantage?",
        a: "Our key differentiators are: 1) Strong Vietnamese-American community focus, 2) Integrated social features and professional networking, 3) AI-powered business insights, 4) Comprehensive salon management tools."
      },
      {
        q: "How do you plan to compete with larger platforms?",
        a: "We focus on underserved niches (Vietnamese-American beauty professionals), superior user experience, and community-driven growth rather than competing on features alone."
      },
      {
        q: "What barriers to entry protect your business?",
        a: "Network effects from our community, proprietary data on beauty professional preferences, established relationships with ethnic beauty supply chains, and cultural expertise that's hard to replicate."
      },
      {
        q: "How do you differentiate from booking-only platforms?",
        a: "We're building a comprehensive ecosystem: professional networking, business management, community support, career development, and supply chain connections - not just appointment booking."
      }
    ]
  },
  {
    category: "Growth & Traction",
    questions: [
      {
        q: "What is your current user growth rate?",
        a: "We're growing 25% month-over-month with 12,000+ registered professionals and 2,800 active salon partners. Organic growth represents 60% of new user acquisition."
      },
      {
        q: "What markets are you currently in?",
        a: "Primary markets: California, Texas, and New York with strong Vietnamese-American populations. Expanding to Florida, Washington, and Virginia in Q2 2025."
      },
      {
        q: "What is your retention rate?",
        a: "Professional retention: 78% at 12 months. Salon retention: 85% at 12 months. High retention driven by community engagement and integrated business tools."
      },
      {
        q: "How do you acquire customers?",
        a: "Multi-channel approach: community referrals (40%), social media marketing (25%), beauty trade shows (20%), and partnerships with beauty schools (15%)."
      },
      {
        q: "What are your expansion plans?",
        a: "Geographic expansion to 15 major metro areas by end of 2025, followed by international expansion to Canada and Vietnam. Also expanding to adjacent verticals like spa and wellness."
      }
    ]
  },
  {
    category: "Technology & Product",
    questions: [
      {
        q: "What technology stack do you use?",
        a: "Modern cloud-native architecture: React/TypeScript frontend, Node.js backend, PostgreSQL database, hosted on AWS with Supabase for real-time features and authentication."
      },
      {
        q: "How do you ensure platform scalability?",
        a: "Microservices architecture, auto-scaling infrastructure, CDN for global performance, and database optimization. Current infrastructure supports 10x user growth without major changes."
      },
      {
        q: "What are your key product metrics?",
        a: "DAU/MAU ratio of 0.4, average session time of 12 minutes, 65% feature adoption rate for premium tools, and 4.8/5 app store rating across 2,500+ reviews."
      },
      {
        q: "How do you protect user data and privacy?",
        a: "SOC 2 Type II compliant, GDPR ready, end-to-end encryption for messages, regular security audits, and comprehensive data governance policies."
      },
      {
        q: "What is your product development roadmap?",
        a: "Q1 2025: AI business insights, Q2: Advanced booking system, Q3: Inventory management, Q4: Payment processing integration. Continuous UX improvements based on user feedback."
      }
    ]
  },
  {
    category: "Team & Operations",
    questions: [
      {
        q: "What is the background of your founding team?",
        a: "Founding team combines 15+ years tech experience (ex-Google, Meta), 10+ years beauty industry experience, and deep Vietnamese-American community connections."
      },
      {
        q: "How many employees do you currently have?",
        a: "Team of 12: 4 engineers, 2 product managers, 3 customer success, 1 designer, 2 business development. Planning to scale to 25 employees by end of 2025."
      },
      {
        q: "What are your key operational metrics?",
        a: "Gross margin of 82%, customer support response time under 2 hours, 99.9% platform uptime, and Net Promoter Score of 68 among active users."
      },
      {
        q: "How do you handle customer support?",
        a: "Multilingual support team (English/Vietnamese), in-app chat, comprehensive knowledge base, video tutorials, and community-driven support forums."
      },
      {
        q: "What are your hiring plans?",
        a: "Prioritizing senior engineers, Vietnamese-speaking customer success managers, and business development roles. Focus on team members with beauty industry or community platform experience."
      }
    ]
  },
  {
    category: "Financials & Funding",
    questions: [
      {
        q: "What is your current financial status?",
        a: "Currently pre-revenue with strong user growth. Bootstrapped to date with $150K founder investment. Runway extends to Q3 2025 with current burn rate of $35K/monthly."
      },
      {
        q: "How much funding are you raising?",
        a: "Raising $2M seed round to accelerate user acquisition, expand engineering team, and enhance product features. This provides 24-month runway to reach break-even."
      },
      {
        q: "What will you use the funding for?",
        a: "40% product development and engineering, 30% customer acquisition and marketing, 20% team expansion, 10% operational infrastructure and compliance."
      },
      {
        q: "What are your revenue projections?",
        a: "Projecting $500K ARR by end of 2025, $2.5M ARR by end of 2026. Path to profitability by Q4 2026 with 35% net margin at scale."
      },
      {
        q: "When do you expect to be profitable?",
        a: "Break-even by Q2 2026, profitable by Q4 2026. Conservative projections based on current unit economics and growth trajectory."
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
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Investor Q&A
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Common questions from investors about EmviApp's business model, growth strategy, and market opportunity
          </p>
        </motion.div>

        <div className="space-y-8">
          {investorQAs.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                {category.category}
              </h3>
              
              <Accordion type="single" collapsible className="space-y-2">
                {category.questions.map((item, questionIndex) => (
                  <AccordionItem 
                    key={`${categoryIndex}-${questionIndex}`} 
                    value={`${categoryIndex}-${questionIndex}`}
                    className="border border-gray-200 rounded-lg px-4"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium text-gray-900">{item.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-gray-600 leading-relaxed">
                      {item.a}
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
