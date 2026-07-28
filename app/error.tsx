"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error securely to your tracking service
    console.error("Captured App Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background via-muted/50 to-background px-4">
      <Card className="w-full max-w-md border-border/60 shadow-xl backdrop-blur-sm bg-card/95 transition-all duration-300 transform hover:scale-[1.01]">
        <CardHeader className="text-center pb-2">
          {/* Animated Warning Icon wrapper using Tailwind's core design specs */}
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive animate-bounce">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Something went wrong
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground pt-1">
            An unexpected application error occurred while processing your
            request.
          </CardDescription>
        </CardHeader>

        {/* Technical Error Code Digest Container */}
        {error.digest && (
          <CardContent className="text-center pt-2 pb-4">
            <code className="inline-block px-2.5 py-1 bg-muted rounded-md text-xs font-mono text-muted-foreground select-all border border-border/40">
              Digest: {error.digest}
            </code>
          </CardContent>
        )}

        <CardFooter className="flex flex-col sm:flex-row gap-3 pt-2">
          {/* Action buttons styled with shadcn presets */}
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto flex-1 font-medium shadow-sm transition-transform active:scale-[0.98]"
          >
            Try again
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto flex-1 font-medium transition-transform active:scale-[0.98]"
          >
            <Link href="/">Go back home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
