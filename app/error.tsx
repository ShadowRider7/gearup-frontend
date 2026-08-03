"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
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
    console.error("Captured App Error:", error);
  }, [error]);

  return (
    <div className="min-h-dvh w-full flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md border-border/60 shadow-lg bg-card">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive animate-pulse">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Something went wrong
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground pt-1">
            An unexpected error occurred. Our team has been notified.
          </CardDescription>
        </CardHeader>

        {error.digest && (
          <CardContent className="text-center pt-2 pb-4">
            <div className="flex flex-col gap-1 items-center">
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
                Error Reference
              </span>
              <code className="inline-block px-3 py-1 bg-muted rounded-md text-xs font-mono text-muted-foreground select-all border border-border/50">
                {error.digest}
              </code>
            </div>
          </CardContent>
        )}

        <CardFooter className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button onClick={() => reset()} className="w-full sm:flex-1">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </Button>

          <Button asChild variant="outline" className="w-full sm:flex-1">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
