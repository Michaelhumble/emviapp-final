import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  Target, Plus, Eye, Share2, Users, Clock, 
  TrendingUp, Zap, Gift, Megaphone, Calendar,
  Edit, Trash2, Copy, BarChart3
} from 'lucide-react';
import { useSalonDashboard } from '@/hooks/useSalonDashboard';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface SalonOffersManagerProps {
  salonId?: string;
}

const SalonOffersManager: React.FC<SalonOffersManagerProps> = ({ salonId }) => {
  const { offers, stats, createOffer, loading } = useSalonDashboard(salonId);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discount_percent: '',
    discount_amount: '',
    start_date: '',
    end_date: '',
    max_redemptions: '',
  });

  const handleCreateOffer = async () => {
    if (!formData.title || !formData.description || !formData.end_date) {
      toast.error('Please fill in required fields');
      return;
    }

    setIsCreating(true);
    const success = await createOffer({
      title: formData.title,
      description: formData.description,
      discount_percent: formData.discount_percent ? parseInt(formData.discount_percent) : undefined,
      discount_amount: formData.discount_amount ? parseFloat(formData.discount_amount) : undefined,
      start_date: formData.start_date || new Date().toISOString(),
      end_date: new Date(formData.end_date).toISOString(),
      max_redemptions: formData.max_redemptions ? parseInt(formData.max_redemptions) : undefined,
      is_active: true,
    });

    if (success) {
      setFormData({
        title: '',
        description: '',
        discount_percent: '',
        discount_amount: '',
        start_date: '',
        end_date: '',
        max_redemptions: '',
      });
      // Trigger confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    setIsCreating(false);
  };

  const handleShareOffer = (offer: any) => {
    const shareText = `🎉 Special Offer: ${offer.title}\n${offer.description}\n\nBook now at EmviApp!`;
    
    if (navigator.share) {
      navigator.share({
        title: offer.title,
        text: shareText,
        url: window.location.origin,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast.success('Offer copied to clipboard!');
    }
  };

  const getDiscountText = (offer: any) => {
    if (offer.discount_percent) {
      return `${offer.discount_percent}% OFF`;
    }
    if (offer.discount_amount) {
      return `$${offer.discount_amount} OFF`;
    }
    return 'Special Offer';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-32 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Offers Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-100">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-500 rounded-lg">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-900">{stats.activeOffers}</p>
                <p className="text-sm text-orange-700">Active Offers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-100">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500 rounded-lg">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-900">1.2K</p>
                <p className="text-sm text-blue-700">Total Views</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-100">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-900">47</p>
                <p className="text-sm text-green-700">Redemptions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-indigo-100">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-900">+24%</p>
                <p className="text-sm text-purple-700">Conversion</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create New Offer */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-violet-50 to-purple-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-purple-600" />
              Create New Offer
            </CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Offer
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-purple-600" />
                    Create New Promotion
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Offer Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Flash Sale: 50% OFF All Services"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your amazing offer..."
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="discount_percent">Discount %</Label>
                      <Input
                        id="discount_percent"
                        type="number"
                        placeholder="50"
                        value={formData.discount_percent}
                        onChange={(e) => setFormData({...formData, discount_percent: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="discount_amount">Discount $</Label>
                      <Input
                        id="discount_amount"
                        type="number"
                        placeholder="25.00"
                        value={formData.discount_amount}
                        onChange={(e) => setFormData({...formData, discount_amount: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start_date">Start Date</Label>
                      <Input
                        id="start_date"
                        type="datetime-local"
                        value={formData.start_date}
                        onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="end_date">End Date *</Label>
                      <Input
                        id="end_date"
                        type="datetime-local"
                        value={formData.end_date}
                        onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="max_redemptions">Max Redemptions</Label>
                    <Input
                      id="max_redemptions"
                      type="number"
                      placeholder="100"
                      value={formData.max_redemptions}
                      onChange={(e) => setFormData({...formData, max_redemptions: e.target.value})}
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button 
                      onClick={handleCreateOffer}
                      disabled={isCreating}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      {isCreating ? 'Creating...' : 'Create Offer'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Create time-limited offers and flash sales to boost bookings and attract new customers.
          </p>
        </CardContent>
      </Card>

      {/* Active Offers */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-orange-600" />
            Your Active Offers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {offers.length > 0 ? (
            offers.map((offer) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border rounded-lg bg-gradient-to-r from-orange-50 to-red-50 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-lg text-orange-900">{offer.title}</h4>
                      <Badge className="bg-orange-500 text-white">
                        {getDiscountText(offer)}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-3">{offer.description}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{offer.views_count} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share2 className="h-4 w-4" />
                        <span>{offer.shares_count} shares</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{offer.current_redemptions}{offer.max_redemptions ? `/${offer.max_redemptions}` : ''} used</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Ends {new Date(offer.end_date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      onClick={() => handleShareOffer(offer)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Megaphone className="h-4 w-4 mr-2" />
                      Promote
                    </Button>
                    <Button size="sm" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analytics
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Progress bar for redemptions */}
                {offer.max_redemptions && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                      style={{ width: `${(offer.current_redemptions / offer.max_redemptions) * 100}%` }}
                    ></div>
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Target className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold mb-2">No Active Offers</h3>
              <p>Create your first promotion to attract more customers!</p>
              <Button className="mt-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Offer
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonOffersManager;