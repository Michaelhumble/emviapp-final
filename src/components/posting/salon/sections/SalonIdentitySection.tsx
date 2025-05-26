
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Upload, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SalonIdentitySectionProps {
  data: any;
  onSubmit: (data: any) => void;
  onPrevious?: () => void;
}

const businessTypes = [
  'Full Service Salon',
  'Hair Salon',
  'Nail Salon',
  'Spa & Wellness',
  'Barbershop',
  'Beauty Studio',
  'Med Spa',
  'Day Spa',
];

const SalonIdentitySection = ({ data, onSubmit }: SalonIdentitySectionProps) => {
  const [formData, setFormData] = useState({
    salonName: data?.identity?.salonName || '',
    businessType: data?.identity?.businessType || '',
    establishedYear: data?.identity?.establishedYear || '',
    logo: data?.identity?.logo || null,
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, logo: file });
      const reader = new FileReader();
      reader.onload = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (formData.salonName && formData.businessType) {
      onSubmit({ identity: formData });
    }
  };

  const isValid = formData.salonName.length >= 2 && formData.businessType;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-full">
            <Building2 className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
          Salon Identity
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Tell buyers about your salon's unique identity and brand.
        </p>
        
        <div className="flex items-center justify-center gap-2 mt-4">
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            💡 Tip: Professional names sell 40% faster
          </Badge>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        {/* Salon Name */}
        <Card className="border-2 border-purple-100 hover:border-purple-200 transition-all">
          <CardContent className="p-6">
            <Label htmlFor="salonName" className="text-lg font-medium mb-2 block">
              Salon Name *
            </Label>
            <Input
              id="salonName"
              value={formData.salonName}
              onChange={(e) => setFormData({ ...formData, salonName: e.target.value })}
              placeholder="e.g., Bella Vista Salon & Spa"
              className="text-lg p-4 border-2 focus:border-purple-400"
            />
            <p className="text-sm text-gray-500 mt-2">
              Choose a name that reflects your salon's personality and attracts buyers
            </p>
          </CardContent>
        </Card>

        {/* Business Type */}
        <Card className="border-2 border-purple-100 hover:border-purple-200 transition-all">
          <CardContent className="p-6">
            <Label htmlFor="businessType" className="text-lg font-medium mb-2 block">
              Business Type *
            </Label>
            <Select value={formData.businessType} onValueChange={(value) => setFormData({ ...formData, businessType: value })}>
              <SelectTrigger className="text-lg p-4 border-2 focus:border-purple-400">
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
          </CardContent>
        </Card>

        {/* Logo Upload */}
        <Card className="border-2 border-purple-100 hover:border-purple-200 transition-all">
          <CardContent className="p-6">
            <Label className="text-lg font-medium mb-2 block">
              Salon Logo (Optional)
            </Label>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className="flex items-center justify-center w-full p-4 border-2 border-dashed border-purple-300 rounded-lg cursor-pointer hover:border-purple-400 transition-colors"
                >
                  <Upload className="w-6 h-6 text-purple-500 mr-2" />
                  <span className="text-purple-600">Upload logo image</span>
                </label>
              </div>
              {logoPreview && (
                <div className="w-20 h-20 rounded-lg border-2 border-purple-200 overflow-hidden">
                  <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              A professional logo increases buyer confidence by 65%
            </p>
          </CardContent>
        </Card>

        {/* Established Year */}
        <Card className="border-2 border-purple-100 hover:border-purple-200 transition-all">
          <CardContent className="p-6">
            <Label htmlFor="establishedYear" className="text-lg font-medium mb-2 block">
              Year Established (Optional)
            </Label>
            <Input
              id="establishedYear"
              value={formData.establishedYear}
              onChange={(e) => setFormData({ ...formData, establishedYear: e.target.value })}
              placeholder="e.g., 2015"
              className="text-lg p-4 border-2 focus:border-purple-400"
              type="number"
              min="1900"
              max={new Date().getFullYear()}
            />
            <p className="text-sm text-gray-500 mt-2">
              Established businesses show stability and build buyer trust
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="flex justify-end pt-6">
        <Button
          onClick={handleSubmit}
          disabled={!isValid}
          size="lg"
          className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-8 py-3 text-lg"
        >
          Continue to Location
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default SalonIdentitySection;
