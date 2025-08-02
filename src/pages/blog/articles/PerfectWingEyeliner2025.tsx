import React from 'react';
import BlogArticleLayout from '@/components/blog/BlogArticleLayout';

const PerfectWingEyeliner2025: React.FC = () => {
  const article = {
    title: "Perfect Winged Eyeliner: Master the Art in 5 Simple Steps",
    description: "Learn the professional techniques makeup artists use to create flawless winged eyeliner every time. Step-by-step guide with expert tips.",
    author: "EmviApp Team",
    publishedAt: "February 1, 2025",
    readTime: "6 min read",
    category: "Beauty Tips",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
    tags: ["eyeliner", "makeup tutorial", "winged eyeliner", "eye makeup", "beauty techniques"]
  };

  return (
    <BlogArticleLayout 
      article={article} 
      articleSlug="perfect-winged-eyeliner-2025"
      articleUrl="/blog/beauty-tips/perfect-winged-eyeliner-2025"
    >
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-pink-900 mb-3">💄 Master the Wing</h3>
          <p className="text-pink-800">
            The perfect winged eyeliner can transform your entire look, but it's often the most challenging part of any makeup routine. Follow these professional techniques to nail it every time.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 1: Choose Your Weapon</h2>
          <p className="text-gray-700 mb-4">
            The right eyeliner makes all the difference. Here are the best options for different skill levels:
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Beginners</h4>
              <p className="text-blue-800 text-sm">Felt-tip pen liner for easy control and precision</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Intermediate</h4>
              <p className="text-green-800 text-sm">Gel liner with angled brush for smooth application</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Advanced</h4>
              <p className="text-purple-800 text-sm">Liquid liner for sharp, precise wings</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 2: Map Your Wing Angle</h2>
          <p className="text-gray-700 mb-4">
            Use this professional mapping technique to get the perfect angle every time:
          </p>
          <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
            <li>Hold a flat brush or business card against your nose</li>
            <li>Angle it past the outer corner of your eye</li>
            <li>The wing should follow this imaginary line</li>
            <li>Mark the endpoint with a tiny dot</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 3: Create the Outline</h2>
          <p className="text-gray-700 mb-4">
            Start by drawing the wing outline before filling it in:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>Draw the top line of your wing from the dot to your upper lash line</li>
            <li>Draw the bottom line from the dot to your lower lash line</li>
            <li>Check both eyes for symmetry before proceeding</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 4: Fill and Connect</h2>
          <p className="text-gray-700 mb-4">
            Now fill in your wing and connect it to your lash line:
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg mb-4">
            <p className="text-yellow-800">
              <strong>Pro Tip:</strong> Start thin and build up gradually. It's much easier to add more liner than to remove it!
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 5: Perfect and Clean Up</h2>
          <p className="text-gray-700 mb-4">
            Use these finishing techniques for a flawless result:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>Use a flat concealer brush to sharpen the wing edges</li>
            <li>Apply concealer under the wing for extra crispness</li>
            <li>Set with a matching eyeshadow to prevent smudging</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Mistakes to Avoid</h2>
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2">❌ Wing Too Thick</h4>
              <p className="text-red-800 text-sm">Start with a thin line and gradually build thickness</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2">❌ Uneven Wings</h4>
              <p className="text-red-800 text-sm">Always check both eyes before filling in the outline</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2">❌ Wrong Angle</h4>
              <p className="text-red-800 text-sm">The wing should lift your eye, not drag it down</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Different Wing Styles for Different Eyes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Hooded Eyes</h4>
              <p className="text-gray-700 text-sm">Keep wings thin and draw with eyes open for visibility</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Round Eyes</h4>
              <p className="text-gray-700 text-sm">Extend wings longer to create an elongated effect</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Almond Eyes</h4>
              <p className="text-gray-700 text-sm">Classic wings work perfectly - follow the natural shape</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Downturned Eyes</h4>
              <p className="text-gray-700 text-sm">Angle wings upward to lift and brighten the eyes</p>
            </div>
          </div>
        </section>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-purple-900 mb-3">✨ Final Pro Tips</h3>
          <ul className="text-purple-800 space-y-2">
            <li>• Practice makes perfect - don't give up after a few tries</li>
            <li>• Use tape as a guide when you're learning</li>
            <li>• Always have makeup remover ready for quick fixes</li>
            <li>• Set your liner with powder to prevent smudging throughout the day</li>
          </ul>
        </div>
      </div>
    </BlogArticleLayout>
  );
};

export default PerfectWingEyeliner2025;