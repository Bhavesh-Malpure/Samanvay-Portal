import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  MapPin,
  Plus,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

const citizenProblems = [
  {
    id: "SAM-001",
    title: "Frequent power cuts in residential area",
    category: "Electricity",
    location: "Deopur, Dhule",
    status: "Under Review",
    priority: "High",
    date: "02 Sep 2026",
  },
  {
    id: "SAM-002",
    title: "Water supply interruption",
    category: "Water & Sanitation",
    location: "Chalisgaon Road, Dhule",
    status: "Validated",
    priority: "Medium-High",
    date: "31 Aug 2026",
  },
  {
    id: "SAM-003",
    title: "Damaged road near college area",
    category: "PWD & Roads",
    location: "MIDC Road, Dhule",
    status: "Submitted",
    priority: "Minimum",
    date: "29 Aug 2026",
  },
];

function CitizenDashboard() {
  return (
    <div className="min-h-screen bg-[#FFF5F5] text-[#4A4A4A]">
      {/* Header */}
      <header className="border-b border-[#E2B4BD]/40 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4A4A4A]/45">
              Citizen Workspace
            </p>

            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
              Welcome to Samanvay
            </h1>

            <div className="mt-2 flex items-center gap-2 text-sm text-[#4A4A4A]/60">
              <MapPin size={15} />
              Dhule District
            </div>
          </div>

          {/* Desktop Report Problem */}
          <Link
            to="/citizen/submit"
            style={{
              color: "#FFFFFF",
              backgroundColor: "#4A4A4A",
            }}
            className="hidden items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition hover:opacity-90 sm:inline-flex"
          >
            <Plus size={18} style={{ color: "#FFFFFF" }} />

            <span style={{ color: "#FFFFFF" }}>
              Report Problem
            </span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        {/* Mobile Report Problem */}
        <Link
          to="/citizen/submit"
          style={{
            color: "#FFFFFF",
            backgroundColor: "#4A4A4A",
          }}
          className="mb-6 flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold sm:hidden"
        >
          <Plus size={18} style={{ color: "#FFFFFF" }} />

          <span style={{ color: "#FFFFFF" }}>
            Report a Problem
          </span>
        </Link>

        {/* Intro */}
        <section className="rounded-3xl bg-[#E2B4BD] p-7 sm:p-9">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#4A4A4A]/55">
              Your voice matters
            </p>

            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Help turn local problems into local solutions.
            </h2>

            <p className="mt-4 leading-7 text-[#4A4A4A]/70">
              Report a societal problem in your area and Samanvay will help
              organize, analyze and route it to the right stakeholders.
            </p>
          </div>
        </section>

        {/* Statistics */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={FileText}
            label="Problems Reported"
            value="3"
            description="Your submitted problems"
          />

          <StatCard
            icon={Clock3}
            label="Under Review"
            value="1"
            description="Currently being reviewed"
          />

          <StatCard
            icon={CheckCircle2}
            label="Validated"
            value="1"
            description="Accepted for action"
          />

          <StatCard
            icon={TrendingUp}
            label="Impact"
            value="Growing"
            description="Community contribution"
          />
        </section>

        {/* Main grid */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          {/* Recent problems */}
          <section>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#4A4A4A]/45">
                  Your activity
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Recent Problems
                </h2>
              </div>

              <Link
                to="/citizen/problems"
                className="hidden items-center gap-1 text-sm font-semibold text-[#4A4A4A] sm:flex"
              >
                View all
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-5 space-y-4">
              {citizenProblems.map((problem) => (
                <Link
                  key={problem.id}
                  to={`/citizen/problems/${problem.id}`}
                  className="block rounded-2xl border border-[#E2B4BD]/40 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#F7D6D0] px-3 py-1 text-xs font-semibold">
                          {problem.category}
                        </span>

                        <span className="text-xs text-[#4A4A4A]/45">
                          {problem.id}
                        </span>
                      </div>

                      <h3 className="mt-3 font-semibold">
                        {problem.title}
                      </h3>

                      <div className="mt-2 flex items-center gap-2 text-xs text-[#4A4A4A]/55">
                        <MapPin size={14} />
                        {problem.location}
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-row gap-2 sm:flex-col sm:items-end">
                      <PriorityBadge priority={problem.priority} />
                      <StatusBadge status={problem.status} />
                    </div>
                  </div>

                  <div className="mt-4 border-t border-[#E2B4BD]/30 pt-3 text-xs text-[#4A4A4A]/45">
                    Reported on {problem.date}
                  </div>
                </Link>
              ))}
            </div>

            <Link
              to="/citizen/problems"
              className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-[#E2B4BD] bg-white px-4 py-3 text-sm font-semibold sm:hidden"
            >
              View All Problems
              <ArrowRight size={16} />
            </Link>
          </section>

          {/* Side panel */}
          <aside className="space-y-5">
            <div className="rounded-2xl border border-[#E2B4BD]/40 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F7D6D0]">
                  <AlertTriangle size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Priority Framework
                  </p>

                  <p className="text-xs text-[#4A4A4A]/50">
                    Current district priorities
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <PriorityRow
                  label="Electricity"
                  priority="High"
                  width="90%"
                />

                <PriorityRow
                  label="Water & Sanitation"
                  priority="Medium-High"
                  width="70%"
                />

                <PriorityRow
                  label="PWD & Roads"
                  priority="Minimum"
                  width="35%"
                />
              </div>
            </div>

            <div className="rounded-2xl bg-[#F7D6D0] p-6">
              <p className="text-sm font-bold">
                Want to contribute more?
              </p>

              <p className="mt-2 text-sm leading-6 text-[#4A4A4A]/65">
                A well-described problem helps government, universities and
                industry understand where support is needed.
              </p>

              <Link
                to="/citizen/submit"
                style={{
                  color: "#4A4A4A",
                }}
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold"
              >
                <span style={{ color: "#4A4A4A" }}>
                  Report a problem
                </span>

                <ArrowRight
                  size={16}
                  style={{ color: "#4A4A4A" }}
                />
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, description }) {
  return (
    <div className="rounded-2xl border border-[#E2B4BD]/40 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7D6D0]">
          <Icon size={19} />
        </div>

        <span className="text-2xl font-bold">{value}</span>
      </div>

      <p className="mt-4 text-sm font-semibold">{label}</p>

      <p className="mt-1 text-xs text-[#4A4A4A]/50">
        {description}
      </p>
    </div>
  );
}

function PriorityBadge({ priority }) {
  return (
    <span className="rounded-full bg-[#F7D6D0] px-3 py-1 text-xs font-semibold">
      {priority}
    </span>
  );
}

function StatusBadge({ status }) {
  return (
    <span className="rounded-full border border-[#E2B4BD]/50 px-3 py-1 text-xs font-medium">
      {status}
    </span>
  );
}

function PriorityRow({ label, priority, width }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium">{label}</span>
        <span className="text-[#4A4A4A]/50">{priority}</span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#FFF5F5]">
        <div
          className="h-full rounded-full bg-[#E2B4BD]"
          style={{ width }}
        />
      </div>
    </div>
  );
}

export default CitizenDashboard;