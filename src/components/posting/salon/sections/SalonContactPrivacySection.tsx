
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, MessageCircle, FileText, Lock } from "lucide-react";
import { EnhancedSalonFormValues } from "../enhancedSalonFormSchema";

interface SalonContactPrivacySectionProps {
  form: UseFormReturn<EnhancedSalonFormValues>;
}

const SalonContactPrivacySection = ({ form }: SalonContactPrivacySectionProps) => {
  const requireNDA = form.watch("requireNDA");
  const messagingOnly = form.watch("messagingOnly");

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Contact & Privacy Settings</h2>
        <p className="text-gray-600">Control how buyers can contact you and protect your information</p>
      </div>

      {/* Contact Preferences */}
      <Card className="border-0 bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-full">
              <MessageCircle className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Contact Preferences</h3>
              <p className="text-sm text-gray-600">How should buyers reach out to you?</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-blue-900">Messaging Only</h4>
                  <p className="text-sm text-blue-700">
                    Require buyers to use our secure messaging system (recommended for privacy)
                  </p>
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
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {!messagingOnly && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-900">Direct Contact Warning</span>
                </div>
                <p className="text-sm text-amber-700">
                  Allowing direct contact may expose your personal information to unqualified buyers. 
                  We recommend using our secure messaging system for initial contact.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Privacy & NDAs */}
      <Card className="border-0 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-100 p-2 rounded-full">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Privacy Protection</h3>
              <p className="text-sm text-gray-600">Protect sensitive business information</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-purple-900">Require NDA for Details</h4>
                  <p className="text-sm text-purple-700">
                    Buyers must sign a Non-Disclosure Agreement before viewing sensitive information
                  </p>
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
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {requireNDA && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900">NDA Protection Active</span>
                </div>
                <p className="text-sm text-green-700">
                  Financial details, customer information, and other sensitive data will only be 
                  shared with verified buyers who have signed our standard NDA.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Information Security */}
      <Card className="border-0 bg-gradient-to-r from-gray-50 to-slate-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gray-100 p-2 rounded-full">
              <Lock className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">What Information is Protected?</h3>
              <p className="text-sm text-gray-600">Understanding what stays private vs. public</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Public Information:</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Salon name and general location
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Business type and size
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Photos and general description
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Asking price (if not hidden)
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Protected Information:</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Exact address and contact details
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Financial performance data
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Client lists and customer data
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Proprietary business information
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Guarantee */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
        <h3 className="font-semibold text-emerald-900 mb-3">🛡️ Our Security Guarantee</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-emerald-800 mb-2">Buyer Verification:</h4>
            <ul className="text-emerald-700 space-y-1">
              <li>• Identity verification required</li>
              <li>• Financial qualification check</li>
              <li>• Background screening process</li>
              <li>• Professional intent validation</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-emerald-800 mb-2">Data Protection:</h4>
            <ul className="text-emerald-700 space-y-1">
              <li>• End-to-end encryption</li>
              <li>• Secure document sharing</li>
              <li>• Audit trail tracking</li>
              <li>• GDPR compliant processes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonContactPrivacySection;
