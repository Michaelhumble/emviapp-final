
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Store, Upload, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { SalonSectionProps } from '../types';

const SalonIdentitySection = ({ data, onSubmit, onPrevious }: SalonSectionProps) => {
  const [formData, setFormData] = useState({
    salonName: data.identity?.salonName || '',
    businessType: data.identity?.businessType || '',
    establishedYear: data.identity?.establishedYear || '',
    logo: data.identity?.logo || null
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const businessTypes = [
    'Full Service Salon',
    'Nail Salon',
    'Hair Salon',
    'Barbershop',
    'Spa & Wellness',
    'Beauty Lounge',
    'Medical Spa',
    'Other'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.salonName.trim()) {
      newErrors.salonName = 'Salon name is required';
    }
    
    if (!formData.businessType) {
      newErrors.businessType = 'Business type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        identity: {
          salonName: formData.salonName,
          businessType: formData.businessType,
          establishedYear: formData.establishedYear,
          logo: formData.logo
        }
      });
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({ ...formData, logo: file });
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
            <Store className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
          Tell Us About Your Salon
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Start by sharing your salon's identity. This helps buyers understand what makes your business special.
        </p>
      </motion.div>

      {/* Trust Badge */}
      <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
        <CardContent className="p-4 text-center">
          <p className="text-sm text-emerald-700 font-medium">
            💎 Premium listings get 3x more qualified inquiries
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Salon Name */}
        <div className="space-y-2">
          <Label htmlFor="salonName" className="text-base font-medium">
            Salon Name *
          </Label>
          <Input
            id="salonName"
            value={formData.salonName}
            onChange={(e) => setFormData({ ...formData, salonName: e.target.value })}
            placeholder="Enter your salon's name"
            className={`h-12 ${errors.salonName ? 'border-red-500' : ''}`}
          />
          {errors.salonName && (
            <p className="text-red-500 text-sm">{errors.salonName}</p>
          )}
        </div>

        {/* Business Type */}
        <div className="space-y-2">
          <Label htmlFor="businessType" className="text-base font-medium">
            Business Type *
          </Label>
          <Select value={formData.businessType} onValueChange={(value) => setFormData({ ...formData, businessType: value })}>
            <SelectTrigger className={`h-12 ${errors.businessType ? 'border-red-500' : ''}`}>
              <SelectValue placeholder="Select business type" />
            </SelectTrigger>
            <SelectContent>
              {businessTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.businessType && (
            <p className="text-red-500 text-sm">{errors.businessType}</p>
          )}
        </div>

        {/* Established Year */}
        <div className="space-y-2">
          <Label htmlFor="establishedYear" className="text-base font-medium">
            Year Established
          </Label>
          <Input
            id="establishedYear"
            value={formData.establishedYear}
            onChange={(e) => setFormData({ ...formData, establishedYear: e.target.value })}
            placeholder="e.g., 2015"
            className="h-12"
          />
        </div>

        {/* Logo Upload */}
        <div className="space-y-2">
          <Label className="text-base font-medium">Salon Logo</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
            <input
              type="file"
              id="logo-upload"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
            <label htmlFor="logo-upload" className="cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                {formData.logo ? formData.logo.name : 'Click to upload logo'}
              </p>
            </label>
          </div>
        </div>
      </div>

      {/* Pro Tip */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">💡</span>
              </div>
            </div>
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Pro Tip:</p>
              <p>Salons with complete profiles and logos receive 40% more serious inquiries from qualified buyers.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        {onPrevious && (
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={onPrevious}
            className="px-8 py-3"
          >
            Previous
          </Button>
        )}
        <Button
          type="button"
          size="lg"
          onClick={handleSubmit}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg ml-auto"
        >
          Continue to Location
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default SalonIdentitySection;
