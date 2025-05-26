
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Upload, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { SalonSectionProps } from '../types';

const SalonIdentitySection = ({ data, onSubmit }: SalonSectionProps) => {
  const [formData, setFormData] = useState({
    salonName: data.identity?.salonName || '',
    businessType: data.identity?.businessType || '',
    logo: data.identity?.logo || null,
    establishedYear: data.identity?.establishedYear || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const businessTypes = [
    'Full Service Salon',
    'Nail Salon',
    'Hair Salon',
    'Beauty Spa',
    'Barbershop',
    'Massage Therapy',
    'Lash Studio',
    'Brow Bar',
    'Med Spa',
    'Day Spa'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, logo: file }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.salonName.trim()) {
      newErrors.salonName = 'Salon name is required';
    } else if (formData.salonName.length < 2) {
      newErrors.salonName = 'Salon name must be at least 2 characters';
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
          logo: formData.logo || undefined,
          establishedYear: formData.establishedYear || undefined,
        }
      });
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
            <Building2 className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
          Tell Us About Your Salon
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Let's start with the basics. This information helps buyers understand what makes your salon special.
        </p>
      </motion.div>

      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
        <CardContent className="p-8 space-y-6">
          {/* Salon Name */}
          <div className="space-y-2">
            <Label htmlFor="salonName" className="text-sm font-medium text-gray-700">
              Salon Name *
            </Label>
            <Input
              id="salonName"
              value={formData.salonName}
              onChange={(e) => handleInputChange('salonName', e.target.value)}
              placeholder="Enter your salon's name"
              className={`h-12 ${errors.salonName ? 'border-red-500' : ''}`}
            />
            {errors.salonName && (
              <p className="text-sm text-red-500">{errors.salonName}</p>
            )}
            <p className="text-xs text-gray-500">
              This is how your salon will appear to potential buyers
            </p>
          </div>

          {/* Business Type */}
          <div className="space-y-2">
            <Label htmlFor="businessType" className="text-sm font-medium text-gray-700">
              Business Type *
            </Label>
            <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
              <SelectTrigger className={`h-12 ${errors.businessType ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Select your business type" />
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
              <p className="text-sm text-red-500">{errors.businessType}</p>
            )}
          </div>

          {/* Established Year */}
          <div className="space-y-2">
            <Label htmlFor="establishedYear" className="text-sm font-medium text-gray-700">
              Year Established (Optional)
            </Label>
            <Input
              id="establishedYear"
              value={formData.establishedYear}
              onChange={(e) => handleInputChange('establishedYear', e.target.value)}
              placeholder="e.g., 2015"
              className="h-12"
              type="number"
              min="1900"
              max={new Date().getFullYear()}
            />
            <p className="text-xs text-gray-500">
              Shows how long your business has been established
            </p>
          </div>

          {/* Logo Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Salon Logo (Optional)
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                id="logo-upload"
              />
              <label htmlFor="logo-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  {formData.logo ? formData.logo.name : 'Click to upload your logo'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG up to 5MB
                </p>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-6">
        <Button
          onClick={handleSubmit}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg"
        >
          Continue to Location
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default SalonIdentitySection;
