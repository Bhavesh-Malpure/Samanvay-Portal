import React from "react";

const PriorityChart = ({
  high = 1,
  mediumHigh = 1,
  minimum = 1,
}) => {
  const total = high + mediumHigh + minimum;

  const getPercentage = (value) => {
    if (!total) return 0;
    return Math.round((value / total) * 100);
  };

  const priorities = [
    {
      label: "High",
      value: high,
      description: "Electricity issues",
    },
    {
      label: "Medium-High",
      value: mediumHigh,
      description: "Water & sanitation",
    },
    {
      label: "Minimum",
      value: minimum,
      description: "PWD & road development",
    },
  ];

  return (
    <div
      className="rounded-2xl border p-5"
      style={{
        backgroundColor: "#FFFFFF",
        borderColor: "#E2B4BD",
      }}
    >
      <div className="mb-5">
        <h2
          className="text-lg font-bold"
          style={{ color: "#4A4A4A" }}
        >
          Priority Distribution
        </h2>

        <p
          className="mt-1 text-sm"
          style={{ color: "#777777" }}
        >
          Current societal problem priorities
        </p>
      </div>

      <div className="space-y-5">
        {priorities.map((priority) => {
          const percentage = getPercentage(priority.value);

          return (
            <div key={priority.label}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "#4A4A4A" }}
                  >
                    {priority.label}
                  </p>

                  <p
                    className="text-xs"
                    style={{ color: "#888888" }}
                  >
                    {priority.description}
                  </p>
                </div>

                <span
                  className="text-sm font-bold"
                  style={{ color: "#4A4A4A" }}
                >
                  {priority.value}
                </span>
              </div>

              <div
                className="h-2.5 overflow-hidden rounded-full"
                style={{ backgroundColor: "#FFF5F5" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: "#E2B4BD",
                  }}
                />
              </div>

              <p
                className="mt-1 text-right text-[11px]"
                style={{ color: "#999999" }}
              >
                {percentage}%
              </p>
            </div>
          );
        })}
      </div>

      <div
        className="mt-5 rounded-xl p-3"
        style={{ backgroundColor: "#FFF5F5" }}
      >
        <p
          className="text-xs leading-relaxed"
          style={{ color: "#4A4A4A" }}
        >
          Priority is determined using Samanvay's predefined
          societal-impact framework with AI-assisted assessment.
        </p>
      </div>
    </div>
  );
};

export default PriorityChart;