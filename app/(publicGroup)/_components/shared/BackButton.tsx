"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()} // Moves to the exact previous route
      className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground uppercase tracking-widest mb-10 transition-colors"
    >
      <ArrowLeft size={14} />
      Back
    </button>
  );
}
