
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Star, Crown, Zap } from 'lucide-react';
import { billionDollarJobFormSchema } from './billionDollarJobFormSchema';
import { useTranslation } from '@/hooks/useTranslation';

interface BillionDollarJobFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

const BillionDollarJobForm: React.FC<BillionDollarJobFormProps> = ({
  initialData,
  onSubmit,
  onBack,
  isSubmitting = false
}) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const form = useForm({
    resolver: zodResolver(billionDollarJobFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      salonName: initialData?.salonName || initialData?.company || '',
      location: initialData?.location || '',
      employmentType: initialData?.employmentType || 'full-time',
      compensationType: initialData?.compensationType || 'commission',
      compensationDetails: initialData?.compensationDetails || '',
      description: initialData?.description || getDefaultDescription(initialData?.title || ''),
      vietnameseDescription: initialData?.vietnameseDescription || getDefaultVietnameseDescription(initialData?.title || ''),
      requirements: initialData?.requirements || [],
      specialties: initialData?.specialties || [],
      benefits: initialData?.benefits || [],
      weeklyPay: initialData?.weeklyPay || false,
      hasHousing: initialData?.hasHousing || false,
      hasWaxRoom: initialData?.hasWaxRoom || false,
      noSupplyDeduction: initialData?.noSupplyDeduction || false,
      ownerWillTrain: initialData?.ownerWillTrain || false,
      isUrgent: false,
      contactInfo: {
        ownerName: '',
        phone: '',
        email: '',
        notes: ''
      }
    }
  });

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      form.handleSubmit(handleFormSubmit)();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={prevStep}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center space-x-2">
              <Crown className="w-8 h-8 text-yellow-500" />
              <span>Premium Job Posting</span>
              <Badge variant="outline" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                <Star className="w-3 h-3 mr-1" />
                Billion Dollar Experience
              </Badge>
            </h1>
            <p className="text-gray-600 mt-1">
              Step {currentStep} of {totalSteps} • {initialData?.title || 'Job Position'}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i + 1 <= currentStep ? 'bg-purple-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Form Content */}
      <Card className="border-2 border-purple-100 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-purple-600" />
            <span>
              {currentStep === 1 && 'Job Details'}
              {currentStep === 2 && 'Compensation & Benefits'}
              {currentStep === 3 && 'Contact Information'}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* Job Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    {...form.register('title')}
                    className="border-purple-200 focus:border-purple-500"
                  />
                </div>

                {/* Salon Name */}
                <div className="space-y-2">
                  <Label htmlFor="salonName">Salon/Company Name *</Label>
                  <Input
                    id="salonName"
                    {...form.register('salonName')}
                    className="border-purple-200 focus:border-purple-500"
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    {...form.register('location')}
                    placeholder="City, State"
                    className="border-purple-200 focus:border-purple-500"
                  />
                </div>

                {/* Employment Type */}
                <div className="space-y-2">
                  <Label htmlFor="employmentType">Employment Type</Label>
                  <Select defaultValue={form.getValues('employmentType')}>
                    <SelectTrigger className="border-purple-200 focus:border-purple-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="booth-rental">Booth Rental</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Job Description - English */}
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description (English) *</Label>
                  <Textarea
                    id="description"
                    {...form.register('description')}
                    rows={6}
                    className="border-purple-200 focus:border-purple-500"
                  />
                </div>

                {/* Job Description - Vietnamese */}
                <div className="space-y-2">
                  <Label htmlFor="vietnameseDescription">Job Description (Vietnamese)</Label>
                  <Textarea
                    id="vietnameseDescription"
                    {...form.register('vietnameseDescription')}
                    rows={6}
                    className="border-purple-200 focus:border-purple-500"
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Compensation Type */}
                <div className="space-y-2">
                  <Label htmlFor="compensationType">Compensation Type</Label>
                  <Select defaultValue={form.getValues('compensationType')}>
                    <SelectTrigger className="border-purple-200 focus:border-purple-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="commission">Commission</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="salary">Salary</SelectItem>
                      <SelectItem value="booth-rental">Booth Rental</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Compensation Details */}
                <div className="space-y-2">
                  <Label htmlFor="compensationDetails">Compensation Details</Label>
                  <Input
                    id="compensationDetails"
                    {...form.register('compensationDetails')}
                    placeholder="e.g., $15-25/hour, 50-60% commission"
                    className="border-purple-200 focus:border-purple-500"
                  />
                </div>

                {/* Benefits Checkboxes */}
                <div className="space-y-4">
                  <Label>Benefits & Perks</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="weeklyPay" {...form.register('weeklyPay')} />
                      <Label htmlFor="weeklyPay">Weekly Pay</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="hasHousing" {...form.register('hasHousing')} />
                      <Label htmlFor="hasHousing">Housing Provided</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="hasWaxRoom" {...form.register('hasWaxRoom')} />
                      <Label htmlFor="hasWaxRoom">Wax Room Available</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="noSupplyDeduction" {...form.register('noSupplyDeduction')} />
                      <Label htmlFor="noSupplyDeduction">No Supply Deduction</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ownerWillTrain" {...form.register('ownerWillTrain')} />
                      <Label htmlFor="ownerWillTrain">Owner Will Train</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="isUrgent" {...form.register('isUrgent')} />
                      <Label htmlFor="isUrgent">Urgent Hiring</Label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                {/* Contact Information */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Contact Name *</Label>
                    <Input
                      id="ownerName"
                      {...form.register('contactInfo.ownerName')}
                      className="border-purple-200 focus:border-purple-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      {...form.register('contactInfo.phone')}
                      type="tel"
                      className="border-purple-200 focus:border-purple-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      {...form.register('contactInfo.email')}
                      type="email"
                      className="border-purple-200 focus:border-purple-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      {...form.register('contactInfo.notes')}
                      rows={4}
                      className="border-purple-200 focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={prevStep}
          className="border-purple-200 text-purple-600 hover:bg-purple-50"
        >
          {currentStep === 1 ? 'Back to Templates' : 'Previous'}
        </Button>
        <Button 
          onClick={nextStep}
          disabled={isSubmitting}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          {isSubmitting 
            ? 'Creating...' 
            : currentStep === totalSteps 
              ? 'Create Premium Job Post' 
              : 'Next'
          }
        </Button>
      </div>
    </div>
  );
};

// Helper functions for default descriptions
function getDefaultDescription(title: string): string {
  const descriptions: Record<string, string> = {
    'Nail Technician': 'We are seeking an experienced and passionate Nail Technician to join our team. The ideal candidate will have expertise in manicures, pedicures, nail art, and gel applications. You should be detail-oriented, creative, and committed to providing exceptional customer service.',
    'Hair Stylist': 'Join our dynamic salon team as a skilled Hair Stylist! We are looking for a creative professional with experience in cutting, coloring, styling, and hair treatments. The perfect candidate will stay current with trends and provide outstanding client experiences.',
    'Lash Technician': 'We are hiring a talented Lash Technician specializing in eyelash extensions, lash lifts, and brow services. The ideal candidate will have certification in lash application techniques and a passion for enhancing natural beauty.',
    'Barber': 'Seeking an experienced Barber to provide high-quality men\'s grooming services including haircuts, beard trims, and traditional barbering techniques. Must have strong attention to detail and excellent customer service skills.',
    'Esthetician': 'Join our spa team as a licensed Esthetician! We need someone skilled in facial treatments, skincare analysis, and various spa services. The ideal candidate will be knowledgeable about skincare products and treatments.'
  };
  
  return descriptions[title] || 'We are seeking a qualified beauty professional to join our team. The ideal candidate will be passionate, skilled, and committed to providing excellent service to our clients.';
}

function getDefaultVietnameseDescription(title: string): string {
  const descriptions: Record<string, string> = {
    'Nail Technician': 'Chúng tôi đang tìm kiếm một Kỹ thuật viên Nail có kinh nghiệm và đam mê để gia nhập đội ngũ của chúng tôi. Ứng viên lý tưởng sẽ có chuyên môn về manicure, pedicure, nail art và ứng dụng gel.',
    'Hair Stylist': 'Hãy tham gia đội ngũ salon năng động của chúng tôi với tư cách là một Hair Stylist có kỹ năng! Chúng tôi đang tìm kiếm một chuyên gia sáng tạo có kinh nghiệm về cắt, nhuộm, tạo kiểu và các liệu pháp chăm sóc tóc.',
    'Lash Technician': 'Chúng tôi đang tuyển dụng một Kỹ thuật viên Mi có tài năng chuyên về nối mi, uốn mi và các dịch vụ chân mày. Ứng viên lý tưởng sẽ có chứng chỉ về kỹ thuật ứng dụng mi.',
    'Barber': 'Tìm kiếm một Thợ cắt tóc có kinh nghiệm để cung cấp các dịch vụ chăm sóc nam giới chất lượng cao bao gồm cắt tóc, cắt râu và các kỹ thuật cắt tóc truyền thống.',
    'Esthetician': 'Tham gia đội ngũ spa của chúng tôi với tư cách là một Chuyên viên Thẩm mỹ được cấp phép! Chúng tôi cần một người có kỹ năng trong các liệu pháp chăm sóc da mặt, phân tích da và các dịch vụ spa khác nhau.'
  };
  
  return descriptions[title] || 'Chúng tôi đang tìm kiếm một chuyên gia làm đẹp có trình độ để gia nhập đội ngũ của chúng tôi. Ứng viên lý tưởng sẽ đầy đam mê, có kỹ năng và cam kết cung cấp dịch vụ xuất sắc cho khách hàng của chúng tôi.';
}

export default BillionDollarJobForm;
