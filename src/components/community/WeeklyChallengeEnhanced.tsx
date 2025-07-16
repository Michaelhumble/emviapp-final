import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Camera, Heart, Star, Upload, Clock, Award, Users, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

interface ChallengeEntry {
  id: string;
  user_id: string;
  user_name: string;
  user_avatar: string;
  image_url: string;
  caption: string;
  votes_count: number;
  submitted_at: string;
  is_winner: boolean;
}

const WeeklyChallengeEnhanced: React.FC = () => {
  const { user } = useAuth();
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [entries, setEntries] = useState<ChallengeEntry[]>([]);
  const [userHasEntered, setUserHasEntered] = useState(false);
  const [submissionData, setSubmissionData] = useState({
    image: null as File | null,
    caption: '',
    imagePreview: ''
  });
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 27
  });

  const currentChallenge = {
    id: 'challenge-week-1',
    title: '✨ Nail Art Magic ✨',
    description: 'Show us your most creative nail design! Tag your specialty and tell us your inspiration.',
    prize: '$500 Cash + Feature on EmviApp',
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    category: 'Nails',
    emoji: '💅'
  };

  useEffect(() => {
    fetchChallengeEntries();
    
    // Update countdown timer
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const endTime = currentChallenge.endDate.getTime();
      const difference = endTime - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchChallengeEntries = async () => {
    // Mock data for now - replace with real Supabase query
    const mockEntries: ChallengeEntry[] = [
      {
        id: '1',
        user_id: 'user1',
        user_name: 'Sarah Nails',
        user_avatar: '/placeholder-avatar.jpg',
        image_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=300&h=300&fit=crop',
        caption: 'Sunset vibes with holographic accents! Inspired by California beaches 🌅',
        votes_count: 47,
        submitted_at: '2024-01-15T10:30:00Z',
        is_winner: false
      },
      {
        id: '2',
        user_id: 'user2',
        user_name: 'Emma Art',
        user_avatar: '/placeholder-avatar.jpg',
        image_url: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=300&h=300&fit=crop',
        caption: 'Minimalist geometric design with gold leaf details ✨',
        votes_count: 32,
        submitted_at: '2024-01-15T14:20:00Z',
        is_winner: false
      },
      {
        id: '3',
        user_id: 'user3',
        user_name: 'Luna Creative',
        user_avatar: '/placeholder-avatar.jpg',
        image_url: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=300&h=300&fit=crop',
        caption: 'Galaxy nails with real meteorite dust! Out of this world 🌌',
        votes_count: 68,
        submitted_at: '2024-01-15T16:45:00Z',
        is_winner: true
      }
    ];

    setEntries(mockEntries);
    setUserHasEntered(mockEntries.some(entry => entry.user_id === user?.id));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSubmissionData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmitEntry = async () => {
    if (!submissionData.image || !submissionData.caption.trim()) {
      toast.error('Please add an image and caption for your entry');
      return;
    }

    try {
      // Upload image to Supabase storage
      // const { data: imageData, error: imageError } = await supabase.storage
      //   .from('challenge-entries')
      //   .upload(`${user?.id}/${Date.now()}.jpg`, submissionData.image);

      // For now, create mock entry
      const newEntry: ChallengeEntry = {
        id: Date.now().toString(),
        user_id: user?.id || 'current-user',
        user_name: user?.email?.split('@')[0] || 'You',
        user_avatar: '/placeholder-avatar.jpg',
        image_url: submissionData.imagePreview,
        caption: submissionData.caption,
        votes_count: 0,
        submitted_at: new Date().toISOString(),
        is_winner: false
      };

      setEntries(prev => [newEntry, ...prev]);
      setUserHasEntered(true);
      setShowSubmissionModal(false);
      setSubmissionData({ image: null, caption: '', imagePreview: '' });
      
      toast.success('🎉 Entry submitted! Good luck in the challenge!');
    } catch (error) {
      console.error('Error submitting entry:', error);
      toast.error('Failed to submit entry. Please try again.');
    }
  };

  const handleVote = async (entryId: string) => {
    // Update votes optimistically
    setEntries(prev => prev.map(entry => 
      entry.id === entryId 
        ? { ...entry, votes_count: entry.votes_count + 1 }
        : entry
    ));
    
    toast.success('Vote submitted! 🗳️');
  };

  return (
    <div className="space-y-6">
      {/* Challenge Header */}
      <Card className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-200/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-500/20 rounded-full">
              <Trophy className="text-purple-600" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{currentChallenge.title}</h2>
              <p className="text-muted-foreground">{currentChallenge.description}</p>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl">{currentChallenge.emoji}</div>
            <div className="text-sm text-muted-foreground">This Week</div>
          </div>
        </div>

        {/* Challenge Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-white/50 rounded-xl">
            <div className="text-2xl font-bold text-purple-600">{entries.length}</div>
            <div className="text-sm text-muted-foreground">Entries</div>
          </div>
          <div className="text-center p-3 bg-white/50 rounded-xl">
            <div className="text-2xl font-bold text-pink-600">{entries.reduce((sum, entry) => sum + entry.votes_count, 0)}</div>
            <div className="text-sm text-muted-foreground">Total Votes</div>
          </div>
          <div className="text-center p-3 bg-white/50 rounded-xl">
            <div className="text-2xl font-bold text-green-600">{timeLeft.days}</div>
            <div className="text-sm text-muted-foreground">Days Left</div>
          </div>
          <div className="text-center p-3 bg-white/50 rounded-xl">
            <div className="text-lg font-bold text-yellow-600">💰</div>
            <div className="text-sm text-muted-foreground">{currentChallenge.prize}</div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <Clock className="text-primary" size={20} />
          <div className="flex items-center space-x-2">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{timeLeft.days}</div>
              <div className="text-xs text-muted-foreground">DAYS</div>
            </div>
            <span className="text-2xl text-muted-foreground">:</span>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{timeLeft.hours}</div>
              <div className="text-xs text-muted-foreground">HRS</div>
            </div>
            <span className="text-2xl text-muted-foreground">:</span>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{timeLeft.minutes}</div>
              <div className="text-xs text-muted-foreground">MIN</div>
            </div>
          </div>
        </div>

        {/* Entry Button */}
        {!userHasEntered ? (
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => {
                setShowSubmissionModal(true);
                toast.success('✨ Ready to showcase your talent?', {
                  description: 'Show the world your amazing skills!'
                });
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:shadow-xl focus:ring-4 focus:ring-purple-300"
              size="lg"
              aria-label="Submit your challenge entry"
            >
              <Camera className="mr-2" size={20} />
              Submit Your Entry
            </Button>
          </motion.div>
        ) : (
          <div className="text-center p-4 bg-green-100 rounded-xl border border-green-200">
            <Award className="mx-auto mb-2 text-green-600" size={24} />
            <div className="font-medium text-green-800">Entry Submitted! 🎉</div>
            <div className="text-sm text-green-600">Good luck in the challenge!</div>
          </div>
        )}
      </Card>

      {/* Challenge Entries Gallery */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Challenge Entries</h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Users size={16} />
            <span>{entries.length} entries so far</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`overflow-hidden ${entry.is_winner ? 'ring-2 ring-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50' : ''}`}>
                {entry.is_winner && (
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center py-2 font-bold">
                    🏆 CURRENT LEADER 🏆
                  </div>
                )}
                
                <div className="aspect-square bg-muted relative overflow-hidden">
                  <img
                    src={entry.image_url}
                    alt={`Entry by ${entry.user_name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">
                          {entry.user_name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="font-medium">{entry.user_name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            handleVote(entry.id);
                            confetti({
                              particleCount: 50,
                              spread: 70,
                              origin: { y: 0.6 }
                            });
                            toast.success('🗳️ Vote submitted!', {
                              description: 'Your support helps amazing talent shine!'
                            });
                          }}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-300 hover:shadow-md rounded-full focus:ring-2 focus:ring-red-200"
                          aria-label={`Vote for ${entry.user_name}'s entry`}
                        >
                          <Heart size={16} className="mr-1" />
                          {entry.votes_count}
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{entry.caption}</p>
                  
                  <div className="text-xs text-muted-foreground">
                    {new Date(entry.submitted_at).toLocaleDateString()}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Submission Modal */}
      <AnimatePresence>
        {showSubmissionModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSubmissionModal(false)}
          >
            <motion.div
              className="bg-background rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Submit Your Entry</h3>
                
                {/* Image Upload */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Upload Image</label>
                  {submissionData.imagePreview ? (
                    <div className="relative">
                      <img
                        src={submissionData.imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setSubmissionData(prev => ({ ...prev, image: null, imagePreview: '' }))}
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <Upload className="mx-auto mb-2 text-muted-foreground" size={32} />
                      <p className="text-muted-foreground mb-2">Upload your nail art photo</p>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <Button variant="outline" asChild>
                        <label htmlFor="image-upload" className="cursor-pointer">
                          Choose File
                        </label>
                      </Button>
                    </div>
                  )}
                </div>

                {/* Caption */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Caption</label>
                  <Textarea
                    value={submissionData.caption}
                    onChange={(e) => setSubmissionData(prev => ({ ...prev, caption: e.target.value }))}
                    placeholder="Tell us about your nail art! What inspired you?"
                    rows={3}
                  />
                </div>

                {/* Buttons */}
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowSubmissionModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={() => {
                        handleSubmitEntry();
                        confetti({
                          particleCount: 100,
                          spread: 70,
                          origin: { y: 0.6 }
                        });
                      }}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg transition-all duration-300 focus:ring-4 focus:ring-purple-300"
                      aria-label="Submit challenge entry"
                    >
                      Submit Entry
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WeeklyChallengeEnhanced;