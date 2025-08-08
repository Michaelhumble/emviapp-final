import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signInWithPhone, verifyPhoneOtp } from "@/services/auth";
import { useLocation } from "react-router-dom";

interface PhoneOtpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PhoneOtpDialog: React.FC<PhoneOtpDialogProps> = ({ open, onOpenChange }) => {
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirectParam = params.get("redirect");

  const handleSendCode = async () => {
    if (!phone) {
      toast.error("Please enter your phone number");
      return;
    }
    try {
      setLoading(true);
      const { error } = await signInWithPhone(phone);
      if (error) throw error;
      toast.success("OTP sent. Please check your SMS.");
      setStep("code");
    } catch (e: any) {
      console.error("OTP send error", e);
      toast.error(e?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!code) {
      toast.error("Enter the code you received");
      return;
    }
    try {
      setLoading(true);
      const { error, data } = await verifyPhoneOtp(phone, code);
      if (error) throw error;
      toast.success("Phone verified! You're signed in.");
      onOpenChange(false);
      // Redirect if ?redirect is present
      if (redirectParam) {
        window.location.href = `${window.location.origin}${redirectParam}`;
      } else {
        window.location.href = "/";
      }
    } catch (e: any) {
      console.error("OTP verify error", e);
      toast.error(e?.message || "Invalid or expired code");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) {
      // Reset state on close
      setStep("phone");
      setPhone("");
      setCode("");
    }
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{step === "phone" ? "Sign in with phone" : "Enter verification code"}</DialogTitle>
          <DialogDescription>
            {step === "phone"
              ? "We'll send you a one-time code via SMS. Use E.164 format, e.g. +15551234567."
              : "Check your SMS and enter the 6-digit code to verify."}
          </DialogDescription>
        </DialogHeader>

        {step === "phone" ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input id="phone" type="tel" placeholder="+1 555 123 4567" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <Button className="w-full" onClick={handleSendCode} disabled={loading}>
              {loading ? "Sending..." : "Send code"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Verification code</Label>
              <Input id="code" inputMode="numeric" placeholder="123456" value={code} onChange={(e) => setCode(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep("phone")} disabled={loading}>
                Back
              </Button>
              <Button className="flex-1" onClick={handleVerify} disabled={loading}>
                {loading ? "Verifying..." : "Verify & Continue"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
