import { AlertTriangle, CheckCircle2, Clock3 } from "lucide-react";

function ProblemStatus({ status, priority, compact = false }) {
  const statusConfig = {
    Submitted: {
      icon: FileStatusIcon,
      label: "Submitted",
    },
    "Under Review": {
      icon: Clock3,
      label: "Under Review",
    },
    Validated: {
      icon: CheckCircle2,
      label: "Validated",
    },
    Resolved: {
      icon: CheckCircle2,
      label: "Resolved",
    },
  };

  const config = statusConfig[status] || {
    icon: Clock3,
    label: status,
  };

  const Icon = config.icon;

  return (
    <div
      className={`flex ${
        compact
          ? "flex-wrap items-center justify-between gap-3"
          : "flex-col gap-3"
      }`}
    >
      <div className="flex items-center gap-2">
        <Icon size={compact ? 15 : 18} />

        <span
          className={
            compact
              ? "text-xs font-semibold"
              : "text-sm font-semibold"
          }
        >
          {config.label}
        </span>
      </div>

      {priority && (
        <div className="flex items-center gap-1.5">
          <AlertTriangle size={14} />

          <span className="text-xs font-medium">
            {priority} Priority
          </span>
        </div>
      )}
    </div>
  );
}

function FileStatusIcon({ size = 18 }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid currentColor",
        borderRadius: "50%",
      }}
    />
  );
}

export default ProblemStatus;