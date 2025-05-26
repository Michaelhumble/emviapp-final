
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Shield, Lock, Eye, Users } from "lucide-react";
import { EnhancedSalonFormValues } from "../enhancedSalonFormSchema";

interface SalonContactSectionProps {
  form: UseFormReturn<EnhancedSalonFormValues>;
}

const SalonContactSection = ({ form }: SalonContactSectionProps) => {
  const requireNDA = form.watch("requireNDA");
  const messagingOnly = form.watch("messagingOnly");

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3">
          <Shield className="h-6 w-6 text-green-600" />
          <h3 className="text-2xl font-bold text-gray-900">Privacy & Contact Settings</h3>
        </div>
        <p className="text-gray-600">Control how buyers can contact you and protect your information</p>
      </div>

      {/* Messaging Preference */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-blue-900 mb-1">
                  In-App Messaging Only
                </h4>
                <p className="text-blue-700 text-sm">
                  {messagingOnly 
                    ? "Buyers contact you through our secure platform • No spam or unwanted calls"
                    : "Buyers can contact you directly • Your contact info may be shared"
                  }
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
                    <Shield className="h-3 w-3 mr-1" />
                    Secure
                  </Badge>
                  <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                    <Users className="h-3 w-3 mr-1" />
                    Recommended
                  </Badge>
                </div>
              </div>
            </div>
            <FormField
              control={form.control}
              name="messagingOnly"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-blue-500"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* NDA Requirement */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-purple-900 mb-1">
                  Require NDA for Details
                </h4>
                <p className="text-purple-700 text-sm">
                  {requireNDA 
                    ? "Buyers must sign NDA before seeing financial details • Maximum protection"
                    : "All listing details visible to registered buyers • Standard protection"
                  }
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-300">
                    <Lock className="h-3 w-3 mr-1" />
                    High Security
                  </Badge>
                  {requireNDA && (
                    <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-300">
                      <Eye className="h-3 w-3 mr-1" />
                      Gated Access
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <FormField
              control={form.control}
              name="requireNDA"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-purple-500"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="text-center">
              <MessageSquare className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h4 className="font-semibold text-green-900 mb-2">In-App Messaging Benefits</h4>
              <ul className="text-sm text-green-800 space-y-1 text-left">
                <li>• No spam calls or emails</li>
                <li>• Verified buyers only</li>
                <li>• Message history tracking</li>
                <li>• Report inappropriate contacts</li>
                <li>• Professional communication</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-6">
            <div className="text-center">
              <Lock className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h4 className="font-semibold text-purple-900 mb-2">NDA Protection Benefits</h4>
              <ul className="text-sm text-purple-800 space-y-1 text-left">
                <li>• Legally binding confidentiality</li>
                <li>• Financial data protection</li>
                <li>• Competitor screening</li>
                <li>• Serious buyers only</li>
                <li>• Professional documentation</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trust Indicators */}
      <Card className="bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">
              🛡️ Your Privacy is Our Priority
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-1">
                <div className="font-semibold text-gray-800">Buyer Verification</div>
                <div className="text-gray-600">All buyers verified before contact</div>
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-gray-800">Secure Platform</div>
                <div className="text-gray-600">Bank-level encryption & security</div>
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-gray-800">Professional Support</div>
                <div className="text-gray-600">Dedicated success manager</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final CTA */}
      <div className="text-center space-y-4">
        <h4 className="text-xl font-semibold text-gray-900">
          Ready to Launch Your Listing?
        </h4>
        <p className="text-gray-600">
          Join 500+ successful salon owners who chose EmviApp for their sale
        </p>
        <div className="flex justify-center gap-4 text-sm text-gray-500">
          <span>✅ Secure & confidential</span>
          <span>✅ Professional buyers</span>
          <span>✅ Expert support</span>
        </div>
      </div>
    </div>
  );
};

export default SalonContactSection;
