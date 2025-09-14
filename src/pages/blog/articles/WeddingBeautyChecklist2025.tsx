import React from 'react';
import BlogArticleLayout from '@/components/blog/BlogArticleLayout';

const WeddingBeautyChecklist2025 = () => {
  const articleData = {
    title: 'Wedding Hair & Makeup Checklist 2025: Timeline, Lookbook & Budget Guide',
    description: 'Complete wedding beauty planning guide. 6-month timeline, trial tips, budget breakdown, and coordination strategies for your perfect wedding day look.',
    author: 'EmviApp Editorial',
    publishedAt: '2025-09-14',
    readTime: '13 min read',
    category: 'Wedding Guide',
    tags: ['wedding makeup', 'bridal hair', 'wedding planning', 'beauty timeline'],
    image: '/images/blog/wedding-beauty-checklist-2025-hero.jpg'
  };

  return (
    <BlogArticleLayout
      article={articleData}
      articleSlug="wedding-hair-makeup-checklist"
      articleUrl="/blog/wedding-guide/wedding-hair-makeup-checklist"
    >
      <div className="prose prose-lg max-w-none">
        <p className="lead text-xl text-gray-600 mb-8">
          Your wedding day beauty should be flawless and stress-free. This comprehensive guide covers everything from 6-month planning timelines to day-of coordination, ensuring you look and feel incredible on your special day.
        </p>

        <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-rose-900 mb-4">TL;DR: Wedding Beauty Success Formula</h2>
          <ul className="text-rose-800 space-y-2">
            <li>✅ <strong>Start Planning</strong>: 6 months before for popular artists</li>
            <li>✅ <strong>Trial Timeline</strong>: 2-3 months before wedding</li>
            <li>✅ <strong>Budget Range</strong>: $300-800 hair, $250-600 makeup</li>
            <li>✅ <strong>Book Together</strong>: Hair & makeup artists who collaborate</li>
            <li>✅ <strong>Final Appointment</strong>: 1-2 weeks before for touch-ups</li>
          </ul>
        </div>

        <h2>6-Month Wedding Beauty Timeline</h2>

        <div className="space-y-6 mb-8">
          <div className="bg-purple-50 border-l-4 border-purple-400 p-6">
            <h3 className="text-purple-900 font-bold mb-3">6 Months Before: Research & Vision</h3>
            <ul className="text-purple-800 space-y-2">
              <li>• Create Pinterest boards with hair & makeup inspiration</li>
              <li>• Research top artists in your area and read reviews</li>
              <li>• Determine your budget and style preferences</li>
              <li>• Start skincare routine for clear, healthy skin</li>
              <li>• Consider seasonal factors (humidity, outdoor venues)</li>
            </ul>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
            <h3 className="text-blue-900 font-bold mb-3">4-5 Months Before: Book Your Team</h3>
            <ul className="text-blue-800 space-y-2">
              <li>• Interview and book hair & makeup artists</li>
              <li>• Schedule engagement photo beauty prep if needed</li>
              <li>• Book bridesmaids' services if desired</li>
              <li>• Confirm availability for rehearsal dinner</li>
              <li>• Sign contracts and secure dates with deposits</li>
            </ul>
          </div>

          <div className="bg-green-50 border-l-4 border-green-400 p-6">
            <h3 className="text-green-900 font-bold mb-3">2-3 Months Before: Trial & Refinement</h3>
            <ul className="text-green-800 space-y-2">
              <li>• Schedule hair and makeup trials</li>
              <li>• Test looks with your dress and accessories</li>
              <li>• Take photos in different lighting conditions</li>
              <li>• Make adjustments based on trial results</li>
              <li>• Finalize timeline for wedding day services</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <h3 className="text-yellow-900 font-bold mb-3">1 Month Before: Final Preparations</h3>
            <ul className="text-yellow-800 space-y-2">
              <li>• Final consultation with beauty team</li>
              <li>• Confirm day-of timeline and location details</li>
              <li>• Arrange final hair cut/color appointment</li>
              <li>• Schedule facial treatment (2 weeks before)</li>
              <li>• Create emergency beauty kit for touch-ups</li>
            </ul>
          </div>
        </div>

        <h2>Wedding Lookbook Inspiration</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-purple-700 font-bold mb-4">Classic Elegance</h3>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h4 className="font-semibold mb-3">Hair Ideas</h4>
              <ul className="text-purple-800 space-y-2">
                <li>• Low chignon with face-framing pieces</li>
                <li>• Side-swept Hollywood waves</li>
                <li>• Elegant updo with subtle texture</li>
                <li>• French twist with floral accents</li>
              </ul>
              
              <h4 className="font-semibold mb-3 mt-4">Makeup Style</h4>
              <ul className="text-purple-800 space-y-2">
                <li>• Neutral eyeshadow with winged liner</li>
                <li>• Classic red or berry lip color</li>
                <li>• Defined brows with natural arch</li>
                <li>• Subtle contouring for definition</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h3 className="text-pink-700 font-bold mb-4">Modern Romance</h3>
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-6">
              <h4 className="font-semibold mb-3">Hair Ideas</h4>
              <ul className="text-pink-800 space-y-2">
                <li>• Textured low bun with wispy pieces</li>
                <li>• Half-up style with loose curls</li>
                <li>• Braided crown with flowing hair</li>
                <li>• Sleek middle part with waves</li>
              </ul>
              
              <h4 className="font-semibold mb-3 mt-4">Makeup Style</h4>
              <ul className="text-pink-800 space-y-2">
                <li>• Soft smoky eyes in warm tones</li>
                <li>• Natural pink or nude lip colors</li>
                <li>• Dewy, glowing complexion</li>
                <li>• Feathered, natural-looking brows</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-green-700 font-bold mb-4">Bohemian Chic</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-semibold mb-3">Hair Ideas</h4>
              <ul className="text-green-800 space-y-2">
                <li>• Loose braids with greenery</li>
                <li>• Beach waves with headband</li>
                <li>• Messy bun with face-framing layers</li>
                <li>• Half-braid crown with flowers</li>
              </ul>
              
              <h4 className="font-semibold mb-3 mt-4">Makeup Style</h4>
              <ul className="text-green-800 space-y-2">
                <li>• Earth-toned eyeshadow palette</li>
                <li>• Natural, glossy lips</li>
                <li>• Sun-kissed, bronzed complexion</li>
                <li>• Soft, undefined brows</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h3 className="text-blue-700 font-bold mb-4">Glamorous Drama</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold mb-3">Hair Ideas</h4>
              <ul className="text-blue-800 space-y-2">
                <li>• Voluminous Hollywood curls</li>
                <li>• High fashion sleek updo</li>
                <li>• Dramatic side part with waves</li>
                <li>• Textured ponytail with height</li>
              </ul>
              
              <h4 className="font-semibold mb-3 mt-4">Makeup Style</h4>
              <ul className="text-blue-800 space-y-2">
                <li>• Bold smoky eyes with metallics</li>
                <li>• Statement lip in deep colors</li>
                <li>• Sculpted contouring</li>
                <li>• Dramatic, defined brows</li>
              </ul>
            </div>
          </div>
        </div>

        <h2>Master Your Beauty Trials</h2>

        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-8">
          <h3 className="text-indigo-900 font-bold mb-4">Trial Preparation Checklist</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">What to Bring</h4>
              <ul className="text-indigo-800 space-y-2">
                <li>• Inspiration photos on your phone</li>
                <li>• Wedding dress or similar neckline</li>
                <li>• Veil, headpiece, or hair accessories</li>
                <li>• Jewelry you'll wear on wedding day</li>
                <li>• Good lighting for photos</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Questions to Ask</h4>
              <ul className="text-indigo-800 space-y-2">
                <li>• How long will services take on wedding day?</li>
                <li>• What happens if you're running late?</li>
                <li>• Do you bring backup supplies?</li>
                <li>• How do you handle touch-ups?</li>
                <li>• What's included in the package?</li>
              </ul>
            </div>
          </div>
        </div>

        <h2>Wedding Beauty Budget Breakdown</h2>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h4 className="font-bold text-green-900 mb-4">Budget-Friendly ($300-600)</h4>
            <div className="space-y-3">
              <div>
                <h5 className="font-semibold">Hair: $150-300</h5>
                <p className="text-green-800 text-sm">Salon stylist, simpler styles</p>
              </div>
              <div>
                <h5 className="font-semibold">Makeup: $150-300</h5>
                <p className="text-green-800 text-sm">Freelance artist, natural looks</p>
              </div>
              <div>
                <h5 className="font-semibold">Trial: $100-150</h5>
                <p className="text-green-800 text-sm">Combined or single service</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-bold text-blue-900 mb-4">Mid-Range ($600-1200)</h4>
            <div className="space-y-3">
              <div>
                <h5 className="font-semibold">Hair: $300-500</h5>
                <p className="text-blue-800 text-sm">Experienced stylist, updos</p>
              </div>
              <div>
                <h5 className="font-semibold">Makeup: $250-450</h5>
                <p className="text-blue-800 text-sm">Professional artist, full glam</p>
              </div>
              <div>
                <h5 className="font-semibold">Trial: $150-250</h5>
                <p className="text-blue-800 text-sm">Separate hair & makeup trials</p>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h4 className="font-bold text-purple-900 mb-4">Luxury ($1200+)</h4>
            <div className="space-y-3">
              <div>
                <h5 className="font-semibold">Hair: $500-800+</h5>
                <p className="text-purple-800 text-sm">Celebrity stylist, complex styles</p>
              </div>
              <div>
                <h5 className="font-semibold">Makeup: $400-600+</h5>
                <p className="text-purple-800 text-sm">High-end artist, premium products</p>
              </div>
              <div>
                <h5 className="font-semibold">Trial: $200-400</h5>
                <p className="text-purple-800 text-sm">Multiple trials, travel fees</p>
              </div>
            </div>
          </div>
        </div>

        <h2>Day-of Coordination Strategy</h2>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
          <h3 className="text-orange-900 font-bold mb-4">Timeline Planning</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">3-4 Hours Before Ceremony</h4>
              <p className="text-orange-800">Hair services begin (longest process first)</p>
            </div>
            <div>
              <h4 className="font-semibold">2-3 Hours Before Ceremony</h4>
              <p className="text-orange-800">Makeup application starts while hair finishing touches happen</p>
            </div>
            <div>
              <h4 className="font-semibold">1 Hour Before Ceremony</h4>
              <p className="text-orange-800">Final touch-ups, photos, getting dressed</p>
            </div>
            <div>
              <h4 className="font-semibold">30 Minutes Before Ceremony</h4>
              <p className="text-orange-800">Last-minute touch-ups, lipstick refresh</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6 mb-8">
          <h3 className="text-purple-900 font-bold mb-3">Find Your Perfect Beauty Team</h3>
          <p className="text-purple-800 mb-4">
            Connect with experienced wedding beauty professionals in your area. <a href="/artists" className="text-purple-600 underline font-semibold">Browse wedding specialists</a> with verified portfolios and client reviews.
          </p>
          <p className="text-purple-800">
            Need salon services for your wedding party? <a href="/salons" className="text-purple-600 underline font-semibold">Explore wedding-friendly salons</a> or <a href="/jobs" className="text-purple-600 underline font-semibold">find beauty professionals</a> who specialize in bridal services.
          </p>
        </div>

        <h2>Frequently Asked Questions</h2>

        <div className="space-y-6 mb-8">
          <details className="bg-gray-50 rounded-lg p-6">
            <summary className="font-semibold text-lg cursor-pointer">When should I do my wedding beauty trial?</summary>
            <div className="mt-4 text-gray-700">
              Schedule trials 2-3 months before your wedding. This gives you time to make adjustments and book a second trial if needed. Avoid doing trials too close to the wedding when artists may be booked.
            </div>
          </details>

          <details className="bg-gray-50 rounded-lg p-6">
            <summary className="font-semibold text-lg cursor-pointer">Should I book the same artist for hair and makeup?</summary>
            <div className="mt-4 text-gray-700">
              It's often more efficient and cost-effective to book artists who work well together, even if they're separate specialists. Ask potential artists for referrals to their preferred collaborators.
            </div>
          </details>

          <details className="bg-gray-50 rounded-lg p-6">
            <summary className="font-semibold text-lg cursor-pointer">How many people should get professional services?</summary>
            <div className="mt-4 text-gray-700">
              This depends on your budget and preferences. At minimum, focus on the bride. Consider key family members and maid of honor next. Many brides offer to split costs with bridesmaids for group services.
            </div>
          </details>

          <details className="bg-gray-50 rounded-lg p-6">
            <summary className="font-semibold text-lg cursor-pointer">What should I do if my makeup artist is running late?</summary>
            <div className="mt-4 text-gray-700">
              Build buffer time into your timeline (30-45 minutes extra). Have a backup plan with a bridesmaid who's skilled with makeup. Always communicate timeline concerns during the planning phase.
            </div>
          </details>

          <details className="bg-gray-50 rounded-lg p-6">
            <summary className="font-semibold text-lg cursor-pointer">How do I handle touch-ups throughout the day?</summary>
            <div className="mt-4 text-gray-700">
              Create a touch-up kit with lipstick, powder, bobby pins, and hairspray. Assign a bridesmaid or family member to carry it. Many artists offer to stay for touch-ups during photos for an additional fee.
            </div>
          </details>
        </div>

        <div className="bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg p-8 text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Create Your Dream Wedding Look</h2>
          <p className="text-lg mb-6 opacity-90">
            Connect with top wedding beauty professionals and start planning your perfect bridal beauty experience.
          </p>
          <a 
            href="/auth/signup" 
            className="inline-block bg-white text-purple-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Join EmviApp - It's Free
          </a>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-semibold mb-4">Further Reading</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="/blog/become-lash-artist-2025" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <h4 className="font-semibold text-purple-600">How to Become a Lash Artist in 2025</h4>
            </a>
            <a href="/blog/salon-marketing-facebook-instagram" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <h4 className="font-semibold text-purple-600">Salon Marketing on Facebook & Instagram</h4>
            </a>
          </div>
        </div>
      </div>
    </BlogArticleLayout>
  );
};

export default WeddingBeautyChecklist2025;