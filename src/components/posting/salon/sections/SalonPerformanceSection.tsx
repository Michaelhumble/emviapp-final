
import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, Calendar, TrendingUp, Eye, EyeOff, Lock, Unlock } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { EnhancedSalonFormValues } from '../enhancedSalonFormSchema';

interface SalonPerformanceSectionProps {
  onUpdate: (data: Partial<EnhancedSalonFormValues>) => void;
  data: Partial<EnhancedSalonFormValues>;
}

export const SalonPerformanceSection = ({ onUpdate, data }: SalonPerformanceSectionProps) => {
  const form = useForm<Partial<EnhancedSalonFormValues>>({
    defaultValues: data
  });

  const hidePrice = form.watch("hidePrice");
  const requireNDA = form.watch("requireNDA");

  const handleFieldChange = (field: string, value: any) => {
    form.setValue(field as any, value);
    onUpdate({ [field]: value });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Business Performance
        </h2>
        <p className="text-gray-600">Share key metrics to attract serious buyers (all information is secure)</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Financial Performance */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-green-500">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-green-800">Financial Overview</h3>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-green-700 mb-2 block">
                      Monthly Revenue
                    </label>
                    <Input
                      placeholder="$15,000"
                      value={data.monthlyRevenue || ''}
                      onChange={(e) => handleFieldChange('monthlyRevenue', e.target.value)}
                      className="border-green-300 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-green-700 mb-2 block">
                      Annual Revenue
                    </label>
                    <Input
                      placeholder="$180,000"
                      value={data.annualRevenue || ''}
                      onChange={(e) => handleFieldChange('annualRevenue', e.target.value)}
                      className="border-green-300 focus:border-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-green-700 mb-2 block">
                    Asking Price *
                  </label>
                  <div className="relative">
                    <Input
                      placeholder="$85,000"
                      value={data.askingPrice || ''}
                      onChange={(e) => handleFieldChange('askingPrice', e.target.value)}
                      className="border-green-300 focus:border-green-500 pr-10"
                    />
                    {hidePrice && (
                      <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Privacy Toggle */}
                <div className="bg-white/60 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {hidePrice ? <Eye className="h-4 w-4 text-gray-600" /> : <EyeOff className="h-4 w-4 text-gray-600" />}
                      <div>
                        <div className="font-medium text-green-800">Hide Pricing</div>
                        <div className="text-sm text-green-600">
                          {hidePrice ? "Price hidden until serious inquiry" : "Price visible to all viewers"}
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={hidePrice || false}
                      onCheckedChange={(checked) => handleFieldChange('hidePrice', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Operational Metrics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-blue-500">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-blue-800">Operations</h3>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-blue-700 mb-2 block">
                      Years in Operation
                    </label>
                    <Select onValueChange={(value) => handleFieldChange('yearsInOperation', value)}>
                      <SelectTrigger className="border-blue-300 focus:border-blue-500">
                        <SelectValue placeholder="Select years" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-1">Under 1 year</SelectItem>
                        <SelectItem value="1-2">1-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="over-10">Over 10 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-700 mb-2 block">
                      Team Size
                    </label>
                    <Select onValueChange={(value) => handleFieldChange('teamSize', value)}>
                      <SelectTrigger className="border-blue-300 focus:border-blue-500">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="solo">Solo operation</SelectItem>
                        <SelectItem value="2-3">2-3 team members</SelectItem>
                        <SelectItem value="4-6">4-6 team members</SelectItem>
                        <SelectItem value="7-10">7-10 team members</SelectItem>
                        <SelectItem value="over-10">Over 10 team members</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-blue-700 mb-2 block">
                    Monthly Rent
                  </label>
                  <Input
                    placeholder="$3,500"
                    value={data.monthlyRent || ''}
                    onChange={(e) => handleFieldChange('monthlyRent', e.target.value)}
                    className="border-blue-300 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-blue-700 mb-2 block">
                    Lease Terms
                  </label>
                  <Textarea
                    placeholder="5 years remaining, option to renew..."
                    value={data.leaseTerms || ''}
                    onChange={(e) => handleFieldChange('leaseTerms', e.target.value)}
                    className="border-blue-300 focus:border-blue-500 min-h-20"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Equipment & Assets */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-purple-500">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-purple-800">Equipment & Assets Included</h3>
          </div>

          <Textarea
            placeholder="List all equipment, furniture, and assets included in the sale... 
• 8 pedicure chairs (brand new)
• 6 manicure stations with LED lamps
• Reception desk and waiting area furniture
• Complete inventory of products and supplies
• Security system and POS system
• All licenses and permits"
            value={data.includedEquipment || ''}
            onChange={(e) => handleFieldChange('includedEquipment', e.target.value)}
            className="border-purple-300 focus:border-purple-500 min-h-32"
          />
        </CardContent>
      </Card>

      {/* Privacy & Security Options */}
      <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-amber-500">
              <Lock className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-amber-800">Privacy & Security</h3>
          </div>

          <div className="space-y-4">
            <div className="bg-white/60 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {requireNDA ? <Lock className="h-4 w-4 text-amber-600" /> : <Unlock className="h-4 w-4 text-amber-600" />}
                  <div>
                    <div className="font-medium text-amber-800">Require NDA</div>
                    <div className="text-sm text-amber-600">
                      {requireNDA ? "Buyers must sign NDA before viewing details" : "Standard information sharing"}
                    </div>
                  </div>
                </div>
                <Switch
                  checked={requireNDA || false}
                  onCheckedChange={(checked) => handleFieldChange('requireNDA', checked)}
                />
              </div>
            </div>

            <div className="bg-white/60 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-amber-600" />
                  <div>
                    <div className="font-medium text-amber-800">Team Transition</div>
                    <div className="text-sm text-amber-600">
                      Will current team stay with new owner?
                    </div>
                  </div>
                </div>
                <Switch
                  checked={data.teamStays || false}
                  onCheckedChange={(checked) => handleFieldChange('teamStays', checked)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trust Signals */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4 text-center">🔒 Your Information is Secure</h4>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 text-center">
          <div>
            <Badge className="bg-green-100 text-green-800 mb-2">✓ Encrypted</Badge>
            <div>All financial data is encrypted and secure</div>
          </div>
          <div>
            <Badge className="bg-blue-100 text-blue-800 mb-2">✓ Verified Buyers</Badge>
            <div>Only pre-qualified buyers can contact you</div>
          </div>
          <div>
            <Badge className="bg-purple-100 text-purple-800 mb-2">✓ NDA Available</Badge>
            <div>Extra protection for sensitive information</div>
          </div>
        </div>
      </div>
    </div>
  );
};
