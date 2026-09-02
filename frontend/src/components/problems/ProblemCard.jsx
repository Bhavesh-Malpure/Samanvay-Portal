import {
  ArrowRight,
  CalendarDays,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import ProblemStatus from "./ProblemStatus";

function ProblemCard({ problem }) {
  return (
    <Link
      to={`/citizen/problems/${problem.id}`}
      className="group block rounded-2xl border border-[#E2B4BD]/40 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#F7D6D0] px-3 py-1 text-xs font-semibold">
              {problem.category}
            </span>

            <span className="text-xs text-[#4A4A4A]/40">
              {problem.id}
            </span>
          </div>

          <h3 className="mt-3 font-bold leading-6">
            {problem.title}
          </h3>
        </div>

        <ArrowRight
          size={18}
          className="shrink-0 text-[#4A4A4A]/35 transition group-hover:translate-x-1"
        />
      </div>

      {problem.description && (
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#4A4A4A]/55">
          {problem.description}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#4A4A4A]/50">
        <span className="flex items-center gap-1.5">
          <MapPin size={14} />
          {problem.location}
        </span>

        {problem.date && (
          <span className="flex items-center gap-1.5">
            <CalendarDays size={14} />
            {problem.date}
          </span>
        )}
      </div>

      <div className="mt-5 border-t border-[#E2B4BD]/30 pt-4">
        <ProblemStatus
          status={problem.status}
          priority={problem.priority}
          compact
        />
      </div>
    </Link>
  );
}

export default ProblemCard;