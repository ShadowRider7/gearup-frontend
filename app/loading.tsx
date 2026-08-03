import { Loader2 } from "lucide-react";

const GlobalLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 animate-in fade-in duration-200">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />

        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-medium tracking-wide text-foreground">
            Loading application
          </p>
          <p className="text-xs text-muted-foreground">
            Please wait a moment...
          </p>
        </div>
      </div>
    </div>
  );
};

export default GlobalLoading;
