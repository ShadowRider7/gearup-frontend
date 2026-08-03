import React from "react";

const TabBar = <T extends string>({
  tabs,
  active,
  onChange,
}: {
  tabs: T[];
  active: T;
  onChange: (t: T) => void;
}) => {
  return (
    <div className="flex mb-6 border-b border-border">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`px-5 py-2.5 text-xs font-mono tracking-widest transition-all capitalize ${
            active === t
              ? "text-primary border-b-2 border-primary -mb-px font-medium"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {t.replace(/-/g, " ")}
        </button>
      ))}
    </div>
  );
};

export default TabBar;
