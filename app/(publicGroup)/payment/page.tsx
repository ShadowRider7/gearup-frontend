"use client";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const Payment = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success") === "true";

  const handleRoute = (action: string) => {
    if (action === "dashboard") {
      router.push("/dashboard/customer");
    } else if (action === "home") {
      router.push("/");
    } else if (action === "try") {
      router.push("/dashboard/customer");
    }
  };
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      {isSuccess ? (
        <div className="text-center max-w-sm">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-green-500/10 rounded-full animate-ping" />
            <div className="relative w-24 h-24 bg-green-500/15 rounded-full flex items-center justify-center border border-green-500/25">
              <CheckCircle size={40} className="text-green-400" />
            </div>
          </div>
          <div className="text-xs font-mono text-green-400 uppercase tracking-[0.3em] mb-3">
            Payment Confirmed
          </div>
          <h1 className="font-['Barlow_Condensed'] font-black text-5xl uppercase text-foreground mb-4 leading-tight">
            You&apos;re all
            <br />
            set!
          </h1>
          <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
            Your rental order has been placed successfully. The provider will
            confirm your booking within 24 hours.
          </p>
          <p className="text-xs font-mono text-muted-foreground mb-8">
            Track your order in your dashboard.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => handleRoute("dashboard")}
              className="flex-1 py-3 bg-primary text-primary-foreground font-['Barlow_Condensed'] font-bold text-base uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-colors"
            >
              My Orders
            </button>
            <button
              onClick={() => handleRoute("home")}
              className="flex-1 py-3 border border-border text-foreground font-['Barlow_Condensed'] font-bold text-base uppercase tracking-widest rounded-xl hover:border-primary/40 transition-colors"
            >
              Browse More
            </button>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
          <div className="text-center max-w-sm">
            <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/20">
              <XCircle size={40} className="text-red-400" />
            </div>
            <div className="text-xs font-mono text-red-400 uppercase tracking-[0.3em] mb-3">
              Payment Cancelled
            </div>
            <h1 className="font-['Barlow_Condensed'] font-black text-5xl uppercase text-foreground mb-4 leading-tight">
              Order not
              <br />
              placed
            </h1>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
              Your payment was cancelled and no charges were made. Your gear
              selection is still saved — try again when you&apos;re ready.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleRoute("try")}
                className="flex-1 py-3 bg-primary text-primary-foreground font-['Barlow_Condensed'] font-bold text-base uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => handleRoute("home")}
                className="flex-1 py-3 border border-border text-foreground font-['Barlow_Condensed'] font-bold text-base uppercase tracking-widest rounded-xl hover:border-primary/40 transition-colors"
              >
                Browse Gear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
