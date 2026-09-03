import React from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Users,
  Wrench,
} from "lucide-react";

const ImpactCard = ({
  projects = 3,
  people = 12,
  resolved = 1,
}) => {
  return (
    <div
      className="rounded-2xl border p-5"
      style={{
        backgroundColor: "#FFFFFF",
        borderColor: "#E2B4BD",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2
            className="text-lg font-bold"
            style={{ color: "#4A4A4A" }}
          >
            Community Impact
          </h2>

          <p
            className="mt-1 text-sm"
            style={{ color: "#777777" }}
          >
            Early impact generated through collaboration
          </p>
        </div>

        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{
            backgroundColor: "#F7D6D0",
            color: "#4A4A4A",
          }}
        >
          <ArrowUpRight size={20} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <div
          className="rounded-xl p-3 text-center"
          style={{ backgroundColor: "#FFF5F5" }}
        >
          <Wrench
            size={18}
            className="mx-auto mb-2"
            style={{ color: "#4A4A4A" }}
          />

          <p
            className="text-xl font-bold"
            style={{ color: "#4A4A4A" }}
          >
            {projects}
          </p>

          <p
            className="mt-1 text-[11px]"
            style={{ color: "#777777" }}
          >
            Projects
          </p>
        </div>

        <div
          className="rounded-xl p-3 text-center"
          style={{ backgroundColor: "#FFF5F5" }}
        >
          <Users
            size={18}
            className="mx-auto mb-2"
            style={{ color: "#4A4A4A" }}
          />

          <p
            className="text-xl font-bold"
            style={{ color: "#4A4A4A" }}
          >
            {people}
          </p>

          <p
            className="mt-1 text-[11px]"
            style={{ color: "#777777" }}
          >
            Contributors
          </p>
        </div>

        <div
          className="rounded-xl p-3 text-center"
          style={{ backgroundColor: "#FFF5F5" }}
        >
          <CheckCircle2
            size={18}
            className="mx-auto mb-2"
            style={{ color: "#4A4A4A" }}
          />

          <p
            className="text-xl font-bold"
            style={{ color: "#4A4A4A" }}
          >
            {resolved}
          </p>

          <p
            className="mt-1 text-[11px]"
            style={{ color: "#777777" }}
          >
            Resolved
          </p>
        </div>
      </div>

      <div
        className="mt-5 rounded-xl border p-3"
        style={{
          backgroundColor: "#F7D6D0",
          borderColor: "#E2B4BD",
        }}
      >
        <p
          className="text-xs leading-relaxed"
          style={{ color: "#4A4A4A" }}
        >
          Every validated problem can become an opportunity for
          students, universities, and industries to collaborate on
          a measurable solution.
        </p>
      </div>
    </div>
  );
};

export default ImpactCard;