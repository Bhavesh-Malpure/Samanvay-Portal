import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Filter,
  MapPin,
  Plus,
  Search,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { getMyProblems } from "../../services/problemService";

function formatStatus(status) {
  if (!status) return "Submitted";

  return status
    .toString()
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatPriority(priority) {
  if (!priority) return "Not Set";

  return priority
    .toString()
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatDate(dateValue) {
  if (!dateValue) return "Date not available";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Date not available";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getStatusClasses(status) {
  const normalized = status?.toString().toUpperCase();

  switch (normalized) {
    case "RESOLVED":
    case "COMPLETED":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";

    case "VALIDATED":
    case "IN_PROGRESS":
    case "PROCESSING":
      return "bg-blue-50 text-blue-700 border-blue-200";

    case "REJECTED":
      return "bg-red-50 text-red-700 border-red-200";

    default:
      return "bg-amber-50 text-amber-700 border-amber-200";
  }
}

function getPriorityClasses(priority) {
  const normalized = priority?.toString().toUpperCase();

  switch (normalized) {
    case "HIGH":
    case "CRITICAL":
      return "bg-red-50 text-red-700 border-red-200";

    case "MEDIUM":
      return "bg-orange-50 text-orange-700 border-orange-200";

    case "LOW":
      return "bg-green-50 text-green-700 border-green-200";

    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
}

function getCategory(problem) {
  return problem.category || problem.ai_category || "Other";
}

function getLocation(problem) {
  return (
    problem.location ||
    problem.district ||
    "Location not specified"
  );
}

function getProblemDate(problem) {
  return (
    problem.created_at ||
    problem.createdAt ||
    problem.submitted_at ||
    problem.submittedAt
  );
}

function MyProblems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

  useEffect(() => {
    const loadProblems = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMyProblems();

        console.log("MY PROBLEMS:", data);

        setProblems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load problems:", err);

        setError(
          err.message ||
            "Unable to load your problems. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProblems();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        problems.map((problem) => getCategory(problem))
      ),
    ];

    return uniqueCategories.sort();
  }, [problems]);

  const filteredProblems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return problems.filter((problem) => {
      const title = (problem.title || "").toLowerCase();

      const description = (
        problem.description || ""
      ).toLowerCase();

      const category = getCategory(problem);
      const location = getLocation(problem);

      const status = (
        problem.status || "SUBMITTED"
      )
        .toString()
        .toUpperCase();

      const priority = (
        problem.priority || ""
      )
        .toString()
        .toUpperCase();

      const matchesSearch =
        !query ||
        title.includes(query) ||
        description.includes(query) ||
        category.toLowerCase().includes(query) ||
        location.toLowerCase().includes(query);

      const matchesCategory =
        categoryFilter === "ALL" ||
        category === categoryFilter;

      const matchesStatus =
        statusFilter === "ALL" ||
        status === statusFilter;

      const matchesPriority =
        priorityFilter === "ALL" ||
        priority === priorityFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    problems,
    searchQuery,
    categoryFilter,
    statusFilter,
    priorityFilter,
  ]);

  const totalProblems = problems.length;

  const activeProblems = problems.filter((problem) => {
    const status = (
      problem.status || "SUBMITTED"
    )
      .toString()
      .toUpperCase();

    return ![
      "RESOLVED",
      "COMPLETED",
      "REJECTED",
    ].includes(status);
  }).length;

  const validatedProblems = problems.filter((problem) => {
    const status = (
      problem.status || ""
    )
      .toString()
      .toUpperCase();

    return status === "VALIDATED";
  }).length;

  return (
    <div className="min-h-screen bg-[#FFF5F5] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Back to Dashboard */}
        <div className="mb-6">
          <Link
            to="/citizen"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
          >
            <ArrowLeft size={18} />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#6B7280]">
              Citizen Profile
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-[#1F2937] sm:text-4xl">
              My Problems
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6B7280] sm:text-base">
              Track all the civic problems you have reported
              and monitor their progress.
            </p>
          </div>

          {/* Report Problem Button */}
          <Link
            to="/citizen/submit"
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#4A4A4A] px-5 py-3 text-sm font-semibold shadow-sm transition hover:bg-[#333333]"
            style={{ color: "#FFFFFF" }}
          >
            <Plus
              size={18}
              style={{ color: "#FFFFFF" }}
            />

            <span style={{ color: "#FFFFFF" }}>
              Report Problem
            </span>
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Total */}
          <div className="rounded-2xl border border-[#E2B4BD]/40 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Problems
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {totalProblems}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F7D6D0]">
                <AlertCircle
                  size={22}
                  className="text-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Active */}
          <div className="rounded-2xl border border-[#E2B4BD]/40 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Active
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {activeProblems}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
                <Clock3
                  size={22}
                  className="text-amber-600"
                />
              </div>
            </div>
          </div>

          {/* Validated */}
          <div className="rounded-2xl border border-[#E2B4BD]/40 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Validated
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {validatedProblems}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <CheckCircle2
                  size={22}
                  className="text-blue-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-2xl border border-[#E2B4BD]/40 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Filter
              size={18}
              className="text-gray-600"
            />

            <h2 className="text-sm font-semibold text-gray-800">
              Search & Filter
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">

            {/* Search */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="Search problems..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-800 outline-none transition focus:border-gray-400 focus:bg-white"
              />
            </div>

            {/* Category */}
            <select
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(event.target.value)
              }
              className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none focus:border-gray-400"
            >
              <option value="ALL">
                All Categories
              </option>

              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none focus:border-gray-400"
            >
              <option value="ALL">
                All Statuses
              </option>

              <option value="SUBMITTED">
                Submitted
              </option>

              <option value="VALIDATED">
                Validated
              </option>

              <option value="IN_PROGRESS">
                In Progress
              </option>

              <option value="RESOLVED">
                Resolved
              </option>

              <option value="COMPLETED">
                Completed
              </option>

              <option value="REJECTED">
                Rejected
              </option>
            </select>

            {/* Priority */}
            <select
              value={priorityFilter}
              onChange={(event) =>
                setPriorityFilter(event.target.value)
              }
              className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none focus:border-gray-400"
            >
              <option value="ALL">
                All Priorities
              </option>

              <option value="HIGH">
                High
              </option>

              <option value="MEDIUM">
                Medium
              </option>

              <option value="LOW">
                Low
              </option>

              <option value="CRITICAL">
                Critical
              </option>
            </select>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-[#E2B4BD]/40 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-gray-700" />

            <p className="text-sm text-gray-500">
              Loading your problems...
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          problems.length === 0 && (
            <div className="rounded-2xl border border-[#E2B4BD]/40 bg-white px-6 py-14 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F7D6D0]">
                <AlertCircle
                  size={26}
                  className="text-gray-500"
                />
              </div>

              <h2 className="mt-5 text-xl font-semibold text-gray-900">
                No problems reported yet
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                You haven't reported any civic problem yet.
                Start by reporting an issue in your area.
              </p>

              <Link
                to="/citizen/submit"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#4A4A4A] px-5 py-3 text-sm font-semibold transition hover:bg-[#333333]"
                style={{ color: "#FFFFFF" }}
              >
                <Plus
                  size={18}
                  style={{ color: "#FFFFFF" }}
                />

                <span style={{ color: "#FFFFFF" }}>
                  Report Problem
                </span>
              </Link>
            </div>
          )}

        {/* No Filter Results */}
        {!loading &&
          !error &&
          problems.length > 0 &&
          filteredProblems.length === 0 && (
            <div className="rounded-2xl border border-[#E2B4BD]/40 bg-white px-6 py-12 text-center shadow-sm">
              <Search
                size={28}
                className="mx-auto text-gray-400"
              />

              <h2 className="mt-4 text-lg font-semibold text-gray-900">
                No matching problems
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Try changing your search or filter options.
              </p>
            </div>
          )}

        {/* Problem Cards */}
        {!loading &&
          !error &&
          filteredProblems.length > 0 && (
            <div className="space-y-4">
              {filteredProblems.map((problem) => {
                const status =
                  problem.status || "SUBMITTED";

                const priority =
                  problem.priority || null;

                return (
                  <Link
                    key={problem.id}
                    to={`/citizen/problems/${problem.id}`}
                    className="block rounded-2xl border border-[#E2B4BD]/40 bg-white p-5 shadow-sm transition hover:-translate-y-[1px] hover:border-gray-300 hover:shadow-md"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

                      {/* Main Information */}
                      <div className="min-w-0 flex-1">

                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <span className="rounded-lg bg-[#F7D6D0] px-2.5 py-1 text-xs font-semibold text-gray-600">
                            #{problem.id}
                          </span>

                          <span className="rounded-lg bg-[#F7D6D0] px-2.5 py-1 text-xs font-medium text-gray-600">
                            {getCategory(problem)}
                          </span>
                        </div>

                        <h2 className="text-lg font-bold text-gray-900">
                          {problem.title ||
                            "Untitled Problem"}
                        </h2>

                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                          {problem.description ||
                            "No description available."}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-500">

                          <div className="flex items-center gap-1.5">
                            <MapPin size={15} />

                            <span>
                              {getLocation(problem)}
                            </span>
                          </div>

                          <div>
                            Submitted{" "}
                            {formatDate(
                              getProblemDate(problem)
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="flex flex-wrap items-center gap-2 lg:w-52 lg:justify-end">
                        <span
                          className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusClasses(
                            status
                          )}`}
                        >
                          {formatStatus(status)}
                        </span>

                        {priority && (
                          <span
                            className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${getPriorityClasses(
                              priority
                            )}`}
                          >
                            {formatPriority(priority)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
      </div>
    </div>
  );
}

export default MyProblems;