
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Shield, MessageSquare, FileText, Phone, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { EnhancedSalonFormValues } from "../enhancedSalonFormSchema";

interface SalonContactSectionProps {
  form: UseFormReturn<EnhancedSalonFormValues>;
}

const SalonContactSection = ({ form }: SalonContactSectionProps) => {
  const requireNDA = form.watch("requireNDA");
  const messagingOnly = form.watch("messagingOnly");

  return (
    <div className="space-y-8">
      {/* Privacy & Security Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-3">
          <Shield className="h-8 w-8 text-blue-500" />
          <h2 className="text-3xl font-bold text-gray-900">Privacy & Contact Preferences</h2>
        </div>
        <p className="text-xl text-gray-600">Control how potential buyers can reach you and protect your business information</p>
      </motion.div>

      {/* Contact Method Preferences */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900">How should buyers contact you?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* In-App Messaging */}
          <div className={`p-6 rounded-2xl border-2 transition-all ${
            messagingOnly 
              ? 'border-green-400 bg-green-50' 
              : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">In-App Messaging Only</h4>
                  <p className="text-sm text-gray-600">Recommended for privacy</p>
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
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  <Shield className="h-3 w-3 mr-1" />
                  Most Secure
                </Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  Recommended
                </Badge>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Keep your personal contact info private</li>
                <li>• All conversations tracked and secure</li>
                <li>• No spam or unwanted calls</li>
                <li>• Built-in buyer verification</li>
                <li>• Share contact details when you're ready</li>
              </ul>
            </div>
          </div>

          {/* Direct Contact */}
          <div className={`p-6 rounded-2xl border-2 transition-all ${
            !messagingOnly 
              ? 'border-orange-400 bg-orange-50' 
              : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Direct Contact</h4>
                  <p className="text-sm text-gray-600">Show phone/email immediately</p>
                </div>
              </div>
              <Switch
                checked={!messagingOnly}
                onCheckedChange={(checked) => form.setValue("messagingOnly", !checked)}
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  <Phone className="h-3 w-3 mr-1" />
                  Direct
                </Badge>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                  Higher Risk
                </Badge>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Buyers can call/email directly</li>
                <li>• Faster initial contact</li>
                <li>• Risk of spam and unqualified leads</li>
                <li>• No conversation tracking</li>
                <li>• Less privacy protection</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* NDA Requirement */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900">Confidentiality Protection</h3>
        
        <div className={`p-6 rounded-2xl border-2 transition-all ${
          requireNDA 
            ? 'border-purple-400 bg-purple-50' 
            : 'border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Require NDA Before Sharing Details</h4>
                <p className="text-sm text-gray-600">Protect sensitive business information</p>
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
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          {requireNDA && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-3"
            >
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                <Lock className="h-3 w-3 mr-1" />
                Maximum Protection
              </Badge>
              <div className="bg-white/70 rounded-xl p-4">
                <h5 className="font-semibold text-purple-800 mb-2">What gets protected:</h5>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Detailed financial information</li>
                  <li>• Exact salon location address</li>
                  <li>• Client lists and business relationships</li>
                  <li>• Proprietary business methods</li>
                  <li>• Competitive advantages and trade secrets</li>
                </ul>
              </div>
              <div className="bg-white/70 rounded-xl p-4">
                <h5 className="font-semibold text-purple-800 mb-2">How it works:</h5>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Buyers see basic info (photos, general location, price range)</li>
                  <li>• Interested buyers must sign NDA to see full details</li>
                  <li>• Legal protection for your sensitive information</li>
                  <li>• Only serious buyers will proceed with NDA</li>
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Privacy Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-6 w-6 text-blue-500" />
          <h4 className="font-bold text-blue-800 text-lg">Your Privacy Settings Summary</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold text-blue-700 mb-3">Contact Method:</h5>
            <div className="bg-white/70 rounded-lg p-3">
              {messagingOnly ? (
                <div className="flex items-center gap-2 text-green-600">
                  <MessageSquare className="h-4 w-4" />
                  <span className="font-medium">In-App Messaging Only (Recommended)</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-orange-600">
                  <Phone className="h-4 w-4" />
                  <span className="font-medium">Direct Contact Allowed</span>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h5 className="font-semibold text-blue-700 mb-3">Confidentiality:</h5>
            <div className="bg-white/70 rounded-lg p-3">
              {requireNDA ? (
                <div className="flex items-center gap-2 text-purple-600">
                  <Lock className="h-4 w-4" />
                  <span className="font-medium">NDA Required for Full Details</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span className="font-medium">Standard Privacy Protection</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-blue-100 rounded-lg">
          <p className="text-blue-800 text-sm leading-relaxed">
            💡 <strong>Pro Tip:</strong> Using in-app messaging and requiring an NDA typically results in 
            higher quality inquiries and protects your business information while still attracting serious buyers.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SalonContactSection;
