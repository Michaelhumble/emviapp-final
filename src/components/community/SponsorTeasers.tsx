
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Award, Gift, Heart, Zap, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const SponsorTeasers = () => {
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const brands = [
    { id: 'sephora', name: 'Sephora', icon: '💄' },
    { id: 'ulta', name: 'Ulta Beauty', icon: '✨' },
    { id: 'fenty', name: 'Fenty Beauty', icon: '👑' },
    { id: 'rare', name: 'Rare Beauty', icon: '💖' },
    { id: 'glossier', name: 'Glossier', icon: '🌸' },
    { id: 'charlotte', name: 'Charlotte Tilbury', icon: '💫' }
  ];

  const handleVoteSubmit = async () => {
    if (!selectedBrand) {
      toast.error('Please select a brand to vote for');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate vote submission
    setTimeout(() => {
      const brandName = brands.find(b => b.id === selectedBrand)?.name;
      toast.success(`Thank you for voting for ${brandName}! 🎉`);
      setSelectedBrand('');
      setIsVoteModalOpen(false);
      setIsSubmitting(false);
    }, 1000);
  };

  const sponsorCards = [
    {
      icon: <Crown className="h-8 w-8 text-yellow-500" />,
      title: "Premium Brand Partnership",
      description: "Vote for your favorite beauty brand to become our next community sponsor",
      gradient: "from-yellow-400 to-orange-500",
      action: "Vote Now",
      isVoteAction: true
    },
    {
      icon: <Gift className="h-8 w-8 text-pink-500" />,
      title: "Exclusive Giveaways",
      description: "Win premium beauty products from top brands every month",
      gradient: "from-pink-400 to-red-500",
      action: "Enter Contest"
    },
    {
      icon: <Star className="h-8 w-8 text-purple-500" />,
      title: "Brand Ambassador Program",
      description: "Become a brand ambassador and earn exclusive perks",
      gradient: "from-purple-400 to-indigo-500",
      action: "Apply Now"
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      title: "Early Access Events",
      description: "Get first access to new product launches and exclusive events",
      gradient: "from-blue-400 to-cyan-500",
      action: "Join Waitlist"
    }
  ];

  return (
    <div className="py-16 px-4 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full mb-4">
              <Award className="h-5 w-5 text-purple-600" />
              <span className="text-purple-700 font-semibold">Premium Partnerships</span>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Exclusive Brand Collaborations
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Connect with top beauty brands and unlock exclusive opportunities, products, and experiences
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {sponsorCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center h-full flex flex-col">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${card.gradient} bg-opacity-10 mb-4 mx-auto`}>
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">{card.description}</p>
                  
                  {card.isVoteAction ? (
                    <Dialog open={isVoteModalOpen} onOpenChange={setIsVoteModalOpen}>
                      <DialogTrigger asChild>
                        <Button className={`w-full bg-gradient-to-r ${card.gradient} hover:shadow-lg transition-all duration-300 text-white font-semibold`}>
                          <Heart className="mr-2 h-4 w-4" />
                          {card.action}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-center">
                            Vote for Your Favorite Brand! 💄
                          </DialogTitle>
                        </DialogHeader>
                        <div className="py-6">
                          <p className="text-gray-600 text-center mb-6">
                            Help us choose our next community sponsor! Your vote matters in bringing exclusive deals and partnerships.
                          </p>
                          
                          <RadioGroup value={selectedBrand} onValueChange={setSelectedBrand} className="space-y-3">
                            {brands.map((brand) => (
                              <div key={brand.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                <RadioGroupItem value={brand.id} id={brand.id} />
                                <Label htmlFor={brand.id} className="flex items-center gap-3 cursor-pointer flex-1">
                                  <span className="text-2xl">{brand.icon}</span>
                                  <span className="font-medium">{brand.name}</span>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                          
                          <div className="flex gap-3 mt-8">
                            <Button
                              onClick={handleVoteSubmit}
                              disabled={isSubmitting || !selectedBrand}
                              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
                            >
                              {isSubmitting ? 'Submitting Vote...' : 'Submit Vote'}
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setIsVoteModalOpen(false)}
                              disabled={isSubmitting}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Button 
                      className={`w-full bg-gradient-to-r ${card.gradient} hover:shadow-lg transition-all duration-300 text-white font-semibold`}
                      onClick={() => toast.success(`${card.action} feature coming soon! 🎉`)}
                    >
                      {card.action}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Unlock Exclusive Benefits?</h3>
          <p className="text-purple-100 mb-6 text-lg">
            Join our premium community and get access to brand partnerships, exclusive deals, and insider opportunities
          </p>
          <Button 
            size="lg"
            className="bg-white text-purple-600 hover:bg-purple-50 font-bold px-8 py-3 rounded-full"
            onClick={() => toast.success('Premium membership coming soon! 🌟')}
          >
            <Crown className="mr-2 h-5 w-5" />
            Upgrade to Premium
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default SponsorTeasers;
