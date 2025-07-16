import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Heart, MessageSquare, Clock, CheckCircle, XCircle, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

interface Offer {
  id: string;
  salon_id: string;
  artist_id: string;
  message: string;
  status: string;
  offer_type: string;
  created_at: string;
  expires_at: string;
  updated_at: string;
  metadata: any;
}

const PokeOffersCard = () => {
  const { user } = useAuth();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [isResponding, setIsResponding] = useState(false);

  useEffect(() => {
    if (user) {
      fetchOffers();
    }
  }, [user]);

  const fetchOffers = async () => {
    try {
      // For demo purposes, create mock offers
      const mockOffers: Offer[] = [
        {
          id: '1',
          salon_id: 'salon-1',
          artist_id: user?.id || '',
          message: 'Hi! We love your work and would like to offer you a collaboration opportunity. Interested?',
          status: 'pending',
          offer_type: 'poke',
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
          expires_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
          updated_at: new Date().toISOString(),
          metadata: {}
        },
        {
          id: '2',
          salon_id: 'salon-2',
          artist_id: user?.id || '',
          message: 'We have a position opening that matches your skills perfectly. Would you be interested in learning more?',
          status: 'pending',
          offer_type: 'job_offer',
          created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
          expires_at: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date().toISOString(),
          metadata: {}
        }
      ];

      setOffers(mockOffers);
    } catch (error) {
      console.error('Error fetching offers:', error);
      toast.error('Failed to load offers');
    } finally {
      setIsLoading(false);
    }
  };

  const respondToOffer = async (offerId: string, status: 'accepted' | 'declined') => {
    setIsResponding(true);
    try {
      const { error } = await supabase
        .from('artist_offers')
        .update({ status })
        .eq('id', offerId);

      if (error) throw error;

      await fetchOffers();
      setSelectedOffer(null);
      toast.success(status === 'accepted' ? 'Offer accepted!' : 'Offer declined');
    } catch (error) {
      console.error('Error responding to offer:', error);
      toast.error('Failed to respond to offer');
    } finally {
      setIsResponding(false);
    }
  };

  const getOfferIcon = (type: string) => {
    switch (type) {
      case 'poke':
        return <Heart className="w-4 h-4 text-pink-500" />;
      case 'job_offer':
        return <Sparkles className="w-4 h-4 text-yellow-500" />;
      case 'collaboration':
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'accepted':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Accepted</Badge>;
      case 'declined':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Declined</Badge>;
      case 'expired':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Expired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const pendingOffers = offers.filter(offer => offer.status === 'pending');

  if (isLoading) {
    return (
      <Card className="card-glass border-purple-100/50">
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="card-glass border-purple-100/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-500" />
              Salon Offers
            </div>
            {pendingOffers.length > 0 && (
              <Badge className="bg-pink-500 text-white pulse-glow">
                {pendingOffers.length} new
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {offers.length === 0 ? (
            <div className="text-center py-8">
              <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="font-medium text-gray-600 mb-2">No offers yet</h3>
              <p className="text-sm text-gray-500">
                Complete your profile to start receiving offers from salons!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {offers.slice(0, 3).map((offer, index) => (
                  <motion.div
                    key={offer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      offer.status === 'pending' 
                        ? 'bg-pink-50 border-pink-200 hover:border-pink-300' 
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedOffer(offer)}
                  >
                    <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        S
                      </AvatarFallback>
                    </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {getOfferIcon(offer.offer_type)}
                        <h4 className="font-medium text-sm truncate">
                          {offer.offer_type === 'poke' ? 'Luxury Beauty Lounge' : 'Premium Nail Studio'}
                        </h4>
                          {getStatusBadge(offer.status)}
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                          {offer.message || 'No message provided'}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {formatDistanceToNow(new Date(offer.created_at), { addSuffix: true })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {offers.length > 3 && (
                <div className="bg-purple-50 rounded-lg p-3 border border-purple-100 text-center">
                  <p className="text-sm text-purple-700 font-medium">
                    Full Offers Management
                  </p>
                  <p className="text-xs text-purple-600 mt-1">
                    Coming Soon • View and manage all your offers in one place
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Offer Detail Dialog */}
      <Dialog open={!!selectedOffer} onOpenChange={() => setSelectedOffer(null)}>
        <DialogContent className="max-w-md">
          {selectedOffer && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {getOfferIcon(selectedOffer.offer_type)}
                  {selectedOffer.offer_type === 'poke' ? 'Salon Poke' : 
                   selectedOffer.offer_type === 'job_offer' ? 'Job Offer' : 'Collaboration'}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      S
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">
                      {selectedOffer.offer_type === 'poke' ? 'Luxury Beauty Lounge' : 'Premium Nail Studio'}
                    </h3>
                    <p className="text-sm text-gray-600">Los Angeles, CA</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm">{selectedOffer.message || 'No message provided'}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Sent {formatDistanceToNow(new Date(selectedOffer.created_at), { addSuffix: true })}</span>
                  {getStatusBadge(selectedOffer.status)}
                </div>

                {selectedOffer.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => respondToOffer(selectedOffer.id, 'declined')}
                      disabled={isResponding}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Decline
                    </Button>
                    <Button
                      className="flex-1 bg-pink-500 hover:bg-pink-600"
                      onClick={() => respondToOffer(selectedOffer.id, 'accepted')}
                      disabled={isResponding}
                    >
                      {isResponding ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <CheckCircle className="w-4 h-4 mr-2" />
                      )}
                      Accept
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PokeOffersCard;