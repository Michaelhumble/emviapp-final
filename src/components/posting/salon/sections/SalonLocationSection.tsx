
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowLeft, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

interface SalonLocationSectionProps {
  data: any;
  onSubmit: (data: any) => void;
  onPrevious: () => void;
}

const SalonLocationSection = ({ data, onSubmit, onPrevious }: SalonLocationSectionProps) => {
  const [formData, setFormData] = useState({
    address: data?.location?.address || '',
    city: data?.location?.city || '',
    state: data?.location?.state || '',
    zipCode: data?.location?.zipCode || '',
    neighborhood: data?.location?.neighborhood || '',
    hideAddressFromPublic: data?.location?.hideAddressFromPublic || false,
  });

  const handleSubmit = () => {
    if (formData.address && formData.city && formData.state && formData.zipCode) {
      onSubmit({ location: formData });
    }
  };

  const isValid = formData.address.length >= 5 && formData.city && formData.state && formData.zipCode.length >= 5;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-full">
            <MapPin className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
          Prime Location Details
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Location is everything in the beauty business. Help buyers understand your salon's positioning.
        </p>
        
        <div className="flex items-center justify-center gap-2 mt-4">
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
            🗺️ Tip: High-traffic locations increase value by 30%
          </Badge>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        {/* Full Address */}
        <Card className="border-2 border-emerald-100 hover:border-emerald-200 transition-all">
          <CardContent className="p-6">
            <Label htmlFor="address" className="text-lg font-medium mb-2 block">
              Street Address *
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="e.g., 1234 Main Street, Suite 100"
              className="text-lg p-4 border-2 focus:border-emerald-400"
            />
            <p className="text-sm text-gray-500 mt-2">
              Include suite/unit numbers for accurate buyer directions
            </p>
          </CardContent>
        </Card>

        {/* City, State, ZIP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-2 border-emerald-100 hover:border-emerald-200 transition-all">
            <CardContent className="p-6">
              <Label htmlFor="city" className="text-lg font-medium mb-2 block">
                City *
              </Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="e.g., Los Angeles"
                className="text-lg p-4 border-2 focus:border-emerald-400"
              />
            </CardContent>
          </Card>

          <Card className="border-2 border-emerald-100 hover:border-emerald-200 transition-all">
            <CardContent className="p-6">
              <Label htmlFor="state" className="text-lg font-medium mb-2 block">
                State *
              </Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="e.g., CA"
                className="text-lg p-4 border-2 focus:border-emerald-400"
              />
            </CardContent>
          </Card>

          <Card className="border-2 border-emerald-100 hover:border-emerald-200 transition-all">
            <CardContent className="p-6">
              <Label htmlFor="zipCode" className="text-lg font-medium mb-2 block">
                ZIP Code *
              </Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                placeholder="e.g., 90210"
                className="text-lg p-4 border-2 focus:border-emerald-400"
              />
            </CardContent>
          </Card>
        </div>

        {/* Neighborhood */}
        <Card className="border-2 border-emerald-100 hover:border-emerald-200 transition-all">
          <CardContent className="p-6">
            <Label htmlFor="neighborhood" className="text-lg font-medium mb-2 block">
              Neighborhood/Area Highlights (Optional)
            </Label>
            <Input
              id="neighborhood"
              value={formData.neighborhood}
              onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
              placeholder="e.g., Beverly Hills, Downtown, Near shopping center"
              className="text-lg p-4 border-2 focus:border-emerald-400"
            />
            <p className="text-sm text-gray-500 mt-2">
              Mention nearby attractions, shopping centers, or upscale neighborhoods
            </p>
          </CardContent>
        </Card>

        {/* Privacy Toggle */}
        <Card className="border-2 border-amber-100 bg-amber-50/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label className="text-lg font-medium mb-2 block flex items-center">
                  {formData.hideAddressFromPublic ? <EyeOff className="w-5 h-5 mr-2 text-amber-600" /> : <Eye className="w-5 h-5 mr-2 text-emerald-600" />}
                  Privacy Protection
                </Label>
                <p className="text-gray-600">
                  {formData.hideAddressFromPublic 
                    ? "Address will be hidden from public listings until serious inquiry"
                    : "Full address will be visible to potential buyers"
                  }
                </p>
              </div>
              <Switch
                checked={formData.hideAddressFromPublic}
                onCheckedChange={(checked) => setFormData({ ...formData, hideAddressFromPublic: checked })}
              />
            </div>
            <div className="mt-3">
              <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                🔒 Premium sellers prefer privacy protection
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="flex justify-between pt-6">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onPrevious}
          className="px-8 py-3"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!isValid}
          size="lg"
          className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3 text-lg"
        >
          Continue to Photos
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default SalonLocationSection;
