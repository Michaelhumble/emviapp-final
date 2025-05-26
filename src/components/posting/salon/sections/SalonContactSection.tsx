
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Shield, MessageSquare, FileText, Lock } from "lucide-react";
import { EnhancedSalonFormValues } from "../enhancedSalonFormSchema";

interface SalonContactSectionProps {
  form: UseFormReturn<EnhancedSalonFormValues>;
}

const SalonContactSection = ({ form }: SalonContactSectionProps) => {
  const requireNDA = form.watch("requireNDA");
  const messagingOnly = form.watch("messagingOnly");

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-serif font-bold mb-2">Privacy & Communication Settings</h2>
        <p className="text-gray-600">Control how buyers can contact you and access your information</p>
      </div>

      {/* Messaging Preference */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MessageSquare className="h-8 w-8 text-blue-600" />
            <div>
              <h3 className="font-semibold text-blue-800 text-lg">Secure In-App Messaging</h3>
              <p className="text-blue-700">
                {messagingOnly 
                  ? "All communication through EmviApp's secure platform (Recommended)" 
                  : "Allow direct contact information sharing"}
              </p>
              <div className="mt-2 text-sm text-blue-600">
                <div className="flex items-center gap-4">
                  <span>✓ Spam protection</span>
                  <span>✓ Conversation history</span>
                  <span>✓ Verified buyer status</span>
                </div>
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
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* NDA Requirement */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <FileText className="h-8 w-8 text-amber-600" />
            <div>
              <h3 className="font-semibold text-amber-800 text-lg">NDA Protection</h3>
              <p className="text-amber-700">
                {requireNDA 
                  ? "Buyers must sign digital NDA before viewing detailed financials" 
                  : "No NDA required - standard privacy protection applies"}
              </p>
              <div className="mt-2 text-sm text-amber-600">
                Recommended for high-value salons or sensitive business information
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
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {requireNDA && (
          <div className="mt-4 p-4 bg-amber-100 rounded-lg">
            <h4 className="font-semibold text-amber-800 mb-2">NDA Protection Includes:</h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Digital signature required before detailed viewing</li>
              <li>• Legal protection for your business information</li>
              <li>• Verified buyer identity requirement</li>
              <li>• Enhanced privacy for financial data</li>
            </ul>
          </div>
        )}
      </div>

      {/* Privacy Summary */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-6 w-6 text-green-600" />
          <h3 className="font-semibold text-green-800">Your Privacy Protection</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
          <div>
            <h4 className="font-medium mb-2">Always Protected:</h4>
            <ul className="space-y-1">
              <li>• Personal contact information</li>
              <li>• Exact salon address</li>
              <li>• Customer databases</li>
              <li>• Staff personal information</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Buyer Verification:</h4>
            <ul className="space-y-1">
              <li>• Identity verification required</li>
              <li>• Financial qualification check</li>
              <li>• Serious intent confirmation</li>
              <li>• Background screening</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call-to-Action Preview */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
        <h3 className="font-semibold text-purple-800 mb-3">How Buyers Will Contact You</h3>
        <div className="space-y-3">
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Express Interest</h4>
                <p className="text-sm text-gray-600">Initial inquiry with basic buyer info</p>
              </div>
              <div className="text-purple-600 text-sm">Instant notification</div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Request Details</h4>
                <p className="text-sm text-gray-600">Verified buyers can request financials</p>
              </div>
              <div className="text-purple-600 text-sm">{requireNDA ? "NDA required" : "Direct access"}</div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Schedule Viewing</h4>
                <p className="text-sm text-gray-600">Qualified buyers can request site visit</p>
              </div>
              <div className="text-purple-600 text-sm">Your approval required</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonContactSection;
