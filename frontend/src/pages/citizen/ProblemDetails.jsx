import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  FileText,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ProblemStatus from "../../components/problems/ProblemStatus";
import ProblemMap from "../../components/problems/ProblemMap";

const problems = {
  "SAM-001": {
    id: "SAM-001",
    title: "Frequent power cuts in residential area",
    description:
      "Residents in the Deopur area are experiencing frequent electricity interruptions, particularly during evening hours. The issue is affecting households, students and small businesses in the locality.",
    category: "Electricity",
    location: "Deopur, Dhule",
    status: "Under Review",
    priority: "High",
    date: "02 Sep 2026",
    reporter: "Demo Citizen",
    department: "Electricity Department",
    aiSummary:
      "A recurring electricity reliability issue affecting a residential locality. The problem may require assessment of local distribution infrastructure and outage patterns.",
  },

  "SAM-002": {
    id: "SAM-002",
    title: "Water supply interruption",
    description:
      "Water supply has been irregular in the Chalisgaon Road area for several days, affecting households and daily activities.",
    category: "Water & Sanitation",
    location: "Chalisgaon Road, Dhule",
    status: "Validated",
    priority: "Medium-High",
    date: "31 Aug 2026",
    reporter: "Demo Citizen",
    department: "Water Supply Department",
    aiSummary:
      "A water availability problem affecting residents in a defined locality. The issue has been validated and can be considered for departmental action.",
  },

  "SAM-003": {
    id: "SAM-003",
    title: "Damaged road near college area",
    description:
      "Several sections of the road near the college area have potholes, creating difficulty for students, pedestrians and other commuters.",
    category: "PWD & Roads",
    location: "MIDC Road, Dhule",
    status: "Submitted",
    priority: "Minimum",
    date: "29 Aug 2026",
    reporter: "Demo Citizen",
    department: "PWD",
    aiSummary:
      "Road surface damage has been reported near an educational area. The issue may require inspection and prioritization by the relevant public works authority.",
  },
};

function ProblemDetails() {
  const { id } = useParams();
  const problem = problems[id];

  if (!problem) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFF5F5] px-5 text-[#4A4A4A]">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Problem not found
          </h1>

          <p className="mt-2 text-sm text-[#4A4A4A]/55">
            The requested problem does not exist.
          </p>

          <Link
            to="/citizen/problems"
            className="mt-5 inline-flex rounded-xl bg-[#4A4A4A] px-5 py-3 text-sm font-semibold text-white"
          >
            Back to My Problems
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF5F5] text-[#4A4A4A]">
      <header className="border-b border-[#E2B4BD]/40 bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-5 sm:px-8">
          <Link
            to="/citizen/problems"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E2B4BD]/50 hover:bg-[#F7D6D0]"
          >
            <ArrowLeft size={18} />
          </Link>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#4A4A4A]/45">
              Problem Details
            </p>

            <h1 className="text-xl font-bold">
              {problem.id}
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        {/* Main problem */}
        <section className="rounded-3xl border border-[#E2B4BD]/40 bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#F7D6D0] px-3 py-1 text-xs font-semibold">
                  {problem.category}
                </span>

                <span className="text-xs text-[#4A4A4A]/45">
                  {problem.id}
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                {problem.title}
              </h2>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-[#4A4A4A]/55">
                <span className="flex items-center gap-2">
                  <MapPin size={16} />
                  {problem.location}
                </span>

                <span className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  {problem.date}
                </span>
              </div>
            </div>

            <ProblemStatus
              status={problem.status}
              priority={problem.priority}
            />
          </div>

          <div className="mt-8 border-t border-[#E2B4BD]/30 pt-7">
            <p className="text-sm font-bold">
              Problem Description
            </p>

            <p className="mt-3 max-w-4xl leading-7 text-[#4A4A4A]/65">
              {problem.description}
            </p>
          </div>
        </section>

        {/* Status */}
        <section className="mt-6 rounded-3xl border border-[#E2B4BD]/40 bg-white p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7D6D0]">
              <CheckCircle2 size={19} />
            </div>

            <div>
              <h2 className="font-bold">
                Current Status
              </h2>

              <p className="text-sm text-[#4A4A4A]/50">
                Track how your problem is progressing.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-4">
            <TimelineStep
              title="Submitted"
              active
            />

            <TimelineStep
              title="Analyzed"
              active={
                problem.status !== "Submitted"
              }
            />

            <TimelineStep
              title="Validated"
              active={
                problem.status === "Validated"
              }
            />

            <TimelineStep
              title="Resolved"
              active={false}
            />
          </div>
        </section>

        {/* AI analysis */}
        <section className="mt-6 rounded-3xl border border-[#E2B4BD]/40 bg-[#F7D6D0] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF5F5]">
              <Sparkles size={19} />
            </div>

            <div>
              <h2 className="font-bold">
                Samanvay AI Analysis
              </h2>

              <p className="text-sm text-[#4A4A4A]/55">
                Prototype AI-generated summary
              </p>
            </div>
          </div>

          <p className="mt-5 max-w-4xl leading-7 text-[#4A4A4A]/70">
            {problem.aiSummary}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <InfoBox
              label="Suggested Department"
              value={problem.department}
            />

            <InfoBox
              label="Priority"
              value={problem.priority}
            />
          </div>
        </section>

        {/* Location */}
        <section className="mt-6 rounded-3xl border border-[#E2B4BD]/40 bg-white p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <MapPin size={20} />

            <div>
              <h2 className="font-bold">
                Problem Location
              </h2>

              <p className="text-sm text-[#4A4A4A]/50">
                {problem.location}, Dhule District
              </p>
            </div>
          </div>

          <div className="mt-5">
            <ProblemMap
              location={problem.location}
              latitude={20.9042}
              longitude={74.7749}
            />
          </div>
        </section>

        {/* Submission info */}
        <section className="mt-6 rounded-3xl border border-[#E2B4BD]/40 bg-white p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <FileText size={19} />

            <h2 className="font-bold">
              Submission Information
            </h2>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <InfoBox
              label="Reported By"
              value={problem.reporter}
            />

            <InfoBox
              label="Problem ID"
              value={problem.id}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function TimelineStep({ title, active }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-[#FFF5F5] p-4">
      <div
        className={`h-3 w-3 rounded-full ${
          active ? "bg-[#4A4A4A]" : "bg-[#E2B4BD]"
        }`}
      />

      <span
        className={`text-sm ${
          active ? "font-semibold" : "text-[#4A4A4A]/45"
        }`}
      >
        {title}
      </span>
    </div>
  );
}

function InfoBox({ label, value }) {
  return (
    <div className="rounded-2xl bg-[#FFF5F5] p-4">
      <p className="text-xs font-medium text-[#4A4A4A]/45">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold">
        {value}
      </p>
    </div>
  );
}

export default ProblemDetails;