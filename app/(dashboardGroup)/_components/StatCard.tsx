import React from "react";

const StatCard = ({
  label,
  value,
  sub,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accent?: boolean;
}) => {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
          {label}
        </span>
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${accent ? "bg-primary/15" : "bg-muted"}`}
        >
          <Icon
            size={15}
            className={accent ? "text-primary" : "text-muted-foreground"}
          />
        </div>
      </div>
      <div
        className={`text-3xl font-['Barlow_Condensed'] font-bold ${accent ? "text-primary" : "text-foreground"}`}
      >
        {value}
      </div>
      {sub && (
        <div className="text-xs font-mono text-muted-foreground mt-1">
          {sub}
        </div>
      )}
    </div>
  );
};

export default StatCard;
