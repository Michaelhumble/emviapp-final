import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signInWithPhone, verifyPhoneOtp } from "@/services/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { normalizeToE164, maskPhone as maskPhoneDisplay } from "@/utils/phone";

interface PhoneOtpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PhoneOtpDialog: React.FC<PhoneOtpDialogProps> = ({ open, onOpenChange }) => {
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendIn, setResendIn] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const redirectParam = params.get("redirect");

  // Restore persisted state on mount
  useEffect(() => {
    const savedPhone = localStorage.getItem('phone_otp_phone');
    const savedStep = localStorage.getItem('phone_otp_step');
    const until = Number(localStorage.getItem('phone_otp_resend_until') || '0');
    if (savedPhone) setPhone(savedPhone);
    if (savedStep === 'code') setStep('code');
    if (until > Date.now()) {
      setResendIn(Math.ceil((until - Date.now()) / 1000));
    }
  }, []);

  // Persist step and phone
  useEffect(() => {
    localStorage.setItem('phone_otp_phone', phone);
    localStorage.setItem('phone_otp_step', step);
  }, [phone, step]);

  // Countdown for resend
  useEffect(() => {
    if (resendIn <= 0) return;
    const id = window.setInterval(() => {
      setResendIn((s) => {
        if (s <= 1) {
          clearInterval(id);
          localStorage.removeItem('phone_otp_resend_until');
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [resendIn]);

  const handlePhoneBlur = () => {
    const normalized = normalizeToE164(phone, 'US');
    if (!phone.trim()) {
      setPhoneError(null);
      return;
    }
    if (!normalized) {
      setPhoneError("Enter a valid phone in E.164 (e.g., +15551234567).");
    } else {
      setPhoneError(null);
      setPhone(normalized);
    }
  };

  const handleSendCode = async () => {
    const normalized = normalizeToE164(phone, 'US');
    if (!normalized) {
      setPhoneError("Enter a valid phone in E.164 (e.g., +15551234567).");
      return;
    }
    setPhone(normalized);
    setPhoneError(null);
    try {
      setLoading(true);
      const { error } = await signInWithPhone(normalized);
      if (error) throw error;
      toast.success("OTP sent. Please check your SMS.");
      setStep("code");
      const until = Date.now() + 30000;
      localStorage.setItem('phone_otp_resend_until', String(until));
      setResendIn(30);
    } catch (e: any) {
      console.error("OTP send error", e);
      const msg = e?.message?.toLowerCase() || '';
      if (e?.status === 429 || msg.includes('rate') || msg.includes('limit')) {
        toast.error("Too many requests. Please wait before requesting another code.");
        if (resendIn === 0) {
          const until = Date.now() + 30000;
          localStorage.setItem('phone_otp_resend_until', String(until));
          setResendIn(30);
        }
      } else {
        toast.error(e?.message || "Failed to send OTP");
      }
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
      // Redirect through centralized post-login route on current origin
      const targetPath = `/auth/redirect${redirectParam ? `?redirect=${encodeURIComponent(redirectParam)}` : ''}`;
      navigate(targetPath, { replace: true });

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
      setResendIn(0);
      localStorage.removeItem('phone_otp_phone');
      localStorage.removeItem('phone_otp_step');
      localStorage.removeItem('phone_otp_resend_until');
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
              <Input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+1 555 123 4567"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (phoneError) setPhoneError(null);
                }}
                onBlur={handlePhoneBlur}
                aria-invalid={!!phoneError}
              />
              {phoneError && (
                <p className="text-sm text-destructive mt-1">
                  {phoneError}
                </p>
              )}
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
            <div className="flex items-center justify-between">
              <span className="text-sm opacity-70">Sending to {maskPhoneDisplay(phone)}</span>
              <Button variant="ghost" size="sm" onClick={handleSendCode} disabled={loading || resendIn > 0}>
                {resendIn > 0 ? `Resend in ${resendIn}s` : 'Resend code'}
              </Button>
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
