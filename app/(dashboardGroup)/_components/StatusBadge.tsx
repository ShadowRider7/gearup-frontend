import React from "react";

type OrderStatus =
  | "PLACED"
  | "CONFIRMED"
  | "PAID"
  | "PICKED_UP"
  | "RETURNED"
  | "CANCELLED";

const STATUS_CFG: Record<
  OrderStatus,
  { label: string; color: string; bg: string }
> = {
  PLACED: { label: "Placed", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  CONFIRMED: {
    label: "Confirmed",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.12)",
  },
  PAID: { label: "Paid", color: "#a855f7", bg: "rgba(168,85,247,0.12)" },
  PICKED_UP: {
    label: "Picked Up",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
  },
  RETURNED: {
    label: "Returned",
    color: "#94a3b8",
    bg: "rgba(148,163,184,0.12)",
  },
  CANCELLED: {
    label: "Cancelled",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.12)",
  },
};

// Fallback configuration to prevent production crashes on rogue DB values
const FALLBACK_CFG = {
  label: "Unknown",
  color: "#64748b",
  bg: "rgba(100,116,139,0.12)",
};

interface StatusBadgeProps {
  // Broadened type to accept string safely from backend API types
  status: OrderStatus | string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  // Convert incoming string to uppercase to avoid mismatch bugs (e.g., "placed" -> "PLACED")
  const normalizedStatus = (status || "").toUpperCase() as OrderStatus;

  // Use config layout if it exists, otherwise fall back gracefully
  const c = STATUS_CFG[normalizedStatus] || FALLBACK_CFG;

  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium tracking-widest uppercase transition-colors"
      style={{
        color: c.color,
        background: c.bg,
        border: `1px solid ${c.color}33`, // Append opacity hex suffix cleanly
      }}
    >
      {c.label}
    </span>
  );
};

export default StatusBadge;
