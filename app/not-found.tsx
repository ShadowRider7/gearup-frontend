import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-4 text-center">
      <div className="flex flex-col items-center max-w-md w-full space-y-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted animate-pulse">
          <FileQuestion className="h-10 w-10 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            404
          </h1>
          <h2 className="text-xl font-semibold tracking-tight">
            Page Not Found
          </h2>
          <p className="text-sm text-muted-foreground">
            We could not find the resource you were looking for. It might have
            been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center pt-2">
          <Button asChild variant="outline">
            <Link href="..">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Link>
          </Button>

          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
