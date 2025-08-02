import React from 'react';
import BlogArticleLayout from '@/components/blog/BlogArticleLayout';

const HairMaskDIYRecipes2025: React.FC = () => {
  const article = {
    title: "DIY Hair Masks: 8 Professional-Grade Recipes You Can Make at Home",
    description: "Transform your hair with these expert-approved DIY hair mask recipes using natural ingredients. Professional results without the salon price tag.",
    author: "EmviApp Team",
    publishedAt: "February 1, 2025",
    readTime: "10 min read",
    category: "Beauty Tips",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
    tags: ["hair care", "DIY beauty", "hair masks", "natural ingredients", "hair treatment"]
  };

  return (
    <BlogArticleLayout 
      article={article} 
      articleSlug="hair-mask-diy-recipes-2025"
      articleUrl="/blog/beauty-tips/hair-mask-diy-recipes-2025"
    >
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-green-900 mb-3">🌿 Natural Hair Transformation</h3>
          <p className="text-green-800">
            These professional-inspired DIY hair masks use natural ingredients to address specific hair concerns. Each recipe has been tested and refined for maximum effectiveness.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Before You Begin: Essential Tips</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">Preparation</h4>
              <ul className="text-yellow-800 text-sm space-y-1">
                <li>• Always patch test new ingredients</li>
                <li>• Use fresh, quality ingredients</li>
                <li>• Apply to damp, clean hair</li>
              </ul>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Application</h4>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Focus on mid-lengths to ends</li>
                <li>• Use a wide-tooth comb to distribute</li>
                <li>• Cover with plastic cap for better penetration</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Deep Hydration Avocado Mask</h2>
          <p className="text-gray-700 mb-4">Perfect for dry, damaged, or chemically-treated hair.</p>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-green-900 mb-2">Ingredients:</h4>
            <ul className="text-green-800 space-y-1">
              <li>• 1 ripe avocado</li>
              <li>• 2 tablespoons honey</li>
              <li>• 1 tablespoon olive oil</li>
              <li>• 1 egg yolk</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Instructions:</h4>
            <ol className="text-gray-700 space-y-1 list-decimal list-inside">
              <li>Mash avocado until completely smooth</li>
              <li>Mix in honey, olive oil, and egg yolk</li>
              <li>Apply from mid-length to ends</li>
              <li>Leave for 20-30 minutes, rinse with cool water</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Protein Strengthening Mask</h2>
          <p className="text-gray-700 mb-4">Ideal for weak, brittle, or over-processed hair that needs protein rebuilding.</p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-blue-900 mb-2">Ingredients:</h4>
            <ul className="text-blue-800 space-y-1">
              <li>• 1 whole egg</li>
              <li>• 2 tablespoons plain Greek yogurt</li>
              <li>• 1 tablespoon mayonnaise</li>
              <li>• 1 teaspoon honey</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Instructions:</h4>
            <ol className="text-gray-700 space-y-1 list-decimal list-inside">
              <li>Whisk all ingredients until smooth</li>
              <li>Apply throughout hair, avoiding roots</li>
              <li>Cover with shower cap for 15-20 minutes</li>
              <li>Rinse with lukewarm water, then shampoo</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Scalp Detox Clarifying Mask</h2>
          <p className="text-gray-700 mb-4">Removes product buildup and excess oil while promoting scalp health.</p>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-purple-900 mb-2">Ingredients:</h4>
            <ul className="text-purple-800 space-y-1">
              <li>• 2 tablespoons bentonite clay</li>
              <li>• 2 tablespoons apple cider vinegar</li>
              <li>• 1 tablespoon coconut oil</li>
              <li>• 3-4 drops tea tree oil</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg mb-4">
            <p className="text-yellow-800">
              <strong>Warning:</strong> Use this mask only once every 2-3 weeks as it's very clarifying and can be drying.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Shine-Boosting Banana Mask</h2>
          <p className="text-gray-700 mb-4">Adds natural shine and smoothness to dull, lifeless hair.</p>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-orange-900 mb-2">Ingredients:</h4>
            <ul className="text-orange-800 space-y-1">
              <li>• 2 ripe bananas</li>
              <li>• 1 tablespoon honey</li>
              <li>• 2 tablespoons coconut milk</li>
              <li>• 1 teaspoon vanilla extract</li>
            </ul>
          </div>
          
          <p className="text-gray-700 text-sm mb-4">
            <strong>Pro Tip:</strong> Ensure bananas are completely mashed to avoid chunks getting stuck in your hair.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Anti-Frizz Coconut Mask</h2>
          <p className="text-gray-700 mb-4">Tames frizz and adds moisture for smooth, manageable hair.</p>
          
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-teal-900 mb-2">Ingredients:</h4>
            <ul className="text-teal-800 space-y-1">
              <li>• 3 tablespoons coconut oil (melted)</li>
              <li>• 1 tablespoon argan oil</li>
              <li>• 2 tablespoons aloe vera gel</li>
              <li>• 1 teaspoon honey</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Volume-Boosting Beer Mask</h2>
          <p className="text-gray-700 mb-4">Adds body and volume to fine, flat hair using the proteins in beer.</p>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-amber-900 mb-2">Ingredients:</h4>
            <ul className="text-amber-800 space-y-1">
              <li>• 1/2 cup flat beer (let it sit overnight)</li>
              <li>• 1 tablespoon honey</li>
              <li>• 1 egg white</li>
              <li>• 1 teaspoon lemon juice</li>
            </ul>
          </div>
          
          <p className="text-gray-700 text-sm">
            Don't worry about the smell - it disappears once you rinse and style your hair!
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Color-Protecting Mask</h2>
          <p className="text-gray-700 mb-4">Maintains vibrancy and prevents fading in color-treated hair.</p>
          
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-pink-900 mb-2">Ingredients:</h4>
            <ul className="text-pink-800 space-y-1">
              <li>• 2 tablespoons coconut oil</li>
              <li>• 1 tablespoon shea butter</li>
              <li>• 1 teaspoon vitamin E oil</li>
              <li>• 2 tablespoons plain yogurt</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Growth-Stimulating Mask</h2>
          <p className="text-gray-700 mb-4">Promotes healthy hair growth with circulation-boosting ingredients.</p>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-red-900 mb-2">Ingredients:</h4>
            <ul className="text-red-800 space-y-1">
              <li>• 2 tablespoons castor oil</li>
              <li>• 1 tablespoon rosemary oil</li>
              <li>• 1 tablespoon honey</li>
              <li>• 1 egg yolk</li>
            </ul>
          </div>
          
          <p className="text-gray-700 text-sm">
            Massage gently into scalp before applying to lengths. The tingling sensation means it's working!
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Schedule</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Weekly Routine</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• Week 1: Deep Hydration Mask</li>
                <li>• Week 2: Protein Strengthening Mask</li>
                <li>• Week 3: Shine-Boosting Mask</li>
                <li>• Week 4: Clarifying Mask</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Storage and Safety Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Storage:</h4>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Make fresh batches each time</li>
                <li>• Store leftover ingredients properly</li>
                <li>• Refrigerate masks for 24 hours max</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Safety:</h4>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Always patch test first</li>
                <li>• Avoid if you have allergies</li>
                <li>• Rinse immediately if irritation occurs</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-purple-900 mb-3">✨ Professional Results at Home</h3>
          <p className="text-purple-800 mb-3">
            Consistency is key with DIY hair masks. Use them weekly for 4-6 weeks to see significant improvements in hair health and appearance.
          </p>
          <p className="text-purple-800">
            Document your hair journey with before and after photos - you'll be amazed at the transformation these natural ingredients can achieve!
          </p>
        </div>
      </div>
    </BlogArticleLayout>
  );
};

export default HairMaskDIYRecipes2025;