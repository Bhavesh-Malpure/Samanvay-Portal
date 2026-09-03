import React from "react";

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendType = "neutral",
}) => {
  const trendStyles = {
    positive: {
      backgroundColor: "#F7D6D0",
      color: "#4A4A4A",
    },
    negative: {
      backgroundColor: "#E2B4BD",
      color: "#4A4A4A",
    },
    neutral: {
      backgroundColor: "#FFF5F5",
      color: "#4A4A4A",
    },
  };

  return (
    <div
      className="rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      style={{
        backgroundColor: "#FFFFFF",
        borderColor: "#E2B4BD",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p
            className="text-sm font-medium"
            style={{ color: "#4A4A4A" }}
          >
            {title}
          </p>

          <h3
            className="mt-2 text-3xl font-bold"
            style={{ color: "#4A4A4A" }}
          >
            {value}
          </h3>

          {description && (
            <p
              className="mt-1 text-xs"
              style={{ color: "#777777" }}
            >
              {description}
            </p>
          )}
        </div>

        {Icon && (
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
            style={{
              backgroundColor: "#F7D6D0",
              color: "#4A4A4A",
            }}
          >
            <Icon size={21} />
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-4">
          <span
            className="inline-flex rounded-full px-2.5 py-1 text-xs font-medium"
            style={trendStyles[trendType] || trendStyles.neutral}
          >
            {trend}
          </span>
        </div>
      )}
    </div>
  );
};

export default StatCard;