import { FileText, MapPin, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import ProblemCard from "../../components/problems/ProblemCard";
import ProblemFilters from "../../components/problems/ProblemFilters";

const problems = [
  {
    id: "SAM-001",
    title: "Frequent power cuts in residential area",
    description:
      "Residents are experiencing frequent electricity interruptions during evening hours.",
    category: "Electricity",
    location: "Deopur, Dhule",
    status: "Under Review",
    priority: "High",
    date: "02 Sep 2026",
  },
  {
    id: "SAM-002",
    title: "Water supply interruption",
    description:
      "Water supply has been irregular in the area for the last several days.",
    category: "Water & Sanitation",
    location: "Chalisgaon Road, Dhule",
    status: "Validated",
    priority: "Medium-High",
    date: "31 Aug 2026",
  },
  {
    id: "SAM-003",
    title: "Damaged road near college area",
    description:
      "Several sections of the road have potholes creating difficulty for commuters.",
    category: "PWD & Roads",
    location: "MIDC Road, Dhule",
    status: "Submitted",
    priority: "Minimum",
    date: "29 Aug 2026",
  },
];

function MyProblems() {
  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    status: "All",
    priority: "All",
  });

  const filteredProblems = useMemo(() => {
    return problems.filter((problem) => {
      const search = filters.search.toLowerCase();

      const matchesSearch =
        !search ||
        problem.title.toLowerCase().includes(search) ||
        problem.id.toLowerCase().includes(search) ||
        problem.location.toLowerCase().includes(search);

      const matchesCategory =
        filters.category === "All" ||
        problem.category === filters.category;

      const matchesStatus =
        filters.status === "All" ||
        problem.status === filters.status;

      const matchesPriority =
        filters.priority === "All" ||
        problem.priority === filters.priority;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-[#FFF5F5] text-[#4A4A4A]">
      <header className="border-b border-[#E2B4BD]/40 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#4A4A4A]/45">
              Citizen Workspace
            </p>

            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
              My Problems
            </h1>

            <p className="mt-2 text-sm text-[#4A4A4A]/55">
              Track problems you have reported in Dhule District.
            </p>
          </div>

          <Link
            to="/citizen/submit"
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#4A4A4A] px-5 py-3 text-sm font-semibold text-white"
          >
            <Plus size={18} />
            Report Problem
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        {/* Summary */}
        <div className="grid gap-4 sm:grid-cols-3">
          <SummaryCard
            icon={FileText}
            label="Total Problems"
            value={problems.length}
          />

          <SummaryCard
            label="Active"
            value={
              problems.filter(
                (problem) =>
                  problem.status !== "Resolved"
              ).length
            }
          />

          <SummaryCard
            label="Validated"
            value={
              problems.filter(
                (problem) =>
                  problem.status === "Validated"
              ).length
            }
          />
        </div>

        {/* Filters */}
        <div className="mt-8">
          <ProblemFilters
            filters={filters}
            onChange={setFilters}
          />
        </div>

        {/* Search result count */}
        <div className="mt-8 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">
              Submitted Problems
            </h2>

            <p className="mt-1 text-sm text-[#4A4A4A]/50">
              Showing {filteredProblems.length} of {problems.length} problems
            </p>
          </div>

          <Search size={20} className="text-[#4A4A4A]/35" />
        </div>

        {/* Problem list */}
        {filteredProblems.length > 0 ? (
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {filteredProblems.map((problem) => (
              <ProblemCard
                key={problem.id}
                problem={problem}
              />
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-[#E2B4BD]/40 bg-white p-10 text-center">
            <p className="font-semibold">
              No problems found
            </p>

            <p className="mt-2 text-sm text-[#4A4A4A]/50">
              Try changing your filters or search terms.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-[#E2B4BD]/40 bg-white p-5">
      {Icon && (
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7D6D0]">
          <Icon size={19} />
        </div>
      )}

      <p className="mt-4 text-sm font-medium text-[#4A4A4A]/55">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}

export default MyProblems;