import { LucideIcon } from "lucide-react";

interface EmptyProps {
  icon: LucideIcon;
  message: string;
  sub?: string;
}

export default function Empty({ icon: Icon, message, sub }: EmptyProps) {
  return (
    <div className="text-center py-16" role="status" aria-live="polite">
      <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Icon size={24} className="text-muted-foreground" aria-hidden="true" />
      </div>

      <p className="font-sans font-semibold text-base text-muted-foreground uppercase tracking-wide">
        {message}
      </p>

      {sub && (
        <p className="text-xs font-mono text-muted-foreground mt-1">{sub}</p>
      )}
    </div>
  );
}
