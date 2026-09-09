import { useCallback, useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  Loader2,
  LogOut,
  MapPin,
  Plus,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
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

function StatCard({ icon: Icon, label, value, iconClass }) {
  return (
    <div className="rounded-2xl border border-[#E2B4BD]/40 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {label}
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {value}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={22} className="text-gray-700" />
        </div>
      </div>
    </div>
  );
}

function PriorityBadge({ priority }) {
  if (!priority) return null;

  const normalized = priority.toString().toUpperCase();

  let classes =
    "bg-gray-50 text-gray-600 border-gray-200";

  if (normalized === "HIGH" || normalized === "CRITICAL") {
    classes = "bg-red-50 text-red-700 border-red-200";
  } else if (normalized === "MEDIUM") {
    classes = "bg-orange-50 text-orange-700 border-orange-200";
  } else if (normalized === "LOW") {
    classes = "bg-green-50 text-green-700 border-green-200";
  }

  return (
    <span
      className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${classes}`}
    >
      {formatPriority(priority)}
    </span>
  );
}

function StatusBadge({ status }) {
  const normalized = status?.toString().toUpperCase();

  let classes =
    "bg-amber-50 text-amber-700 border-amber-200";

  if (
    normalized === "VALIDATED" ||
    normalized === "IN_PROGRESS" ||
    normalized === "PROCESSING"
  ) {
    classes = "bg-blue-50 text-blue-700 border-blue-200";
  }

  if (
    normalized === "RESOLVED" ||
    normalized === "COMPLETED"
  ) {
    classes =
      "bg-emerald-50 text-emerald-700 border-emerald-200";
  }

  if (normalized === "REJECTED") {
    classes = "bg-red-50 text-red-700 border-red-200";
  }

  return (
    <span
      className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${classes}`}
    >
      {formatStatus(status)}
    </span>
  );
}

function PriorityRow({ priority, count }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
      <div className="flex items-center gap-3">
        <PriorityBadge priority={priority} />

        <span className="text-sm text-gray-600">
          Problems
        </span>
      </div>

      <span className="font-semibold text-gray-900">
        {count}
      </span>
    </div>
  );
}

function CitizenDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProblems = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyProblems();

      setProblems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load citizen problems:", err);

      setError(
        err.message ||
          "Unable to load your problems. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProblems();

    const handleFocus = () => {
      loadProblems();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        loadProblems();
      }
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [loadProblems]);

  const totalProblems = problems.length;

  const underReviewProblems = problems.filter((problem) => {
    const status = (
      problem.status || "SUBMITTED"
    )
      .toString()
      .toUpperCase();

    return status === "UNDER_REVIEW";
  }).length;

  const validatedProblems = problems.filter((problem) => {
    const status = (
      problem.status || ""
    )
      .toString()
      .toUpperCase();

    return status === "VALIDATED";
  }).length;

  const rejectedProblems = problems.filter((problem) => {
    const status = (
      problem.status || ""
    )
      .toString()
      .toUpperCase();

    return status === "REJECTED";
  }).length;

  const highPriority = problems.filter((problem) => {
    const priority = (
      problem.priority || ""
    )
      .toString()
      .toUpperCase();

    return priority === "HIGH";
  }).length;

  const mediumPriority = problems.filter((problem) => {
    const priority = (
      problem.priority || ""
    )
      .toString()
      .toUpperCase();

    return priority === "MEDIUM";
  }).length;

  const lowPriority = problems.filter((problem) => {
    const priority = (
      problem.priority || ""
    )
      .toString()
      .toUpperCase();

    return priority === "LOW";
  }).length;

  const recentProblems = problems.slice(0, 5);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#FFF5F5] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#6B7280]">
              Citizen Workspace
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-[#1F2937] sm:text-4xl">
              Welcome{user?.full_name ? `, ${user.full_name}` : ""}
            </h1>

            <p className="mt-2 text-sm text-[#6B7280]">
              {user?.district
                ? `${user.district} • Track and manage your civic problems`
                : "Track and manage your civic problems"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Report Problem */}
            <Link
              to="/citizen/submit"
              className="inline-flex items-center gap-2 rounded-xl bg-[#4A4A4A] px-5 py-3 text-sm font-semibold shadow-sm transition hover:bg-[#333333]"
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

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Report Problem */}
        <div className="mb-6 lg:hidden">
          <Link
            to="/citizen/submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#4A4A4A] px-5 py-3 text-sm font-semibold shadow-sm transition hover:bg-[#333333]"
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

        {/* Loading */}
        {loading && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-[#E2B4BD]/40 bg-white px-5 py-4 shadow-sm">
            <Loader2
              size={18}
              className="animate-spin text-gray-600"
            />

            <p className="text-sm text-gray-600">
              Loading your dashboard...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            <AlertTriangle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={FileText}
            label="Total Problems"
            value={totalProblems}
            iconClass="bg-[#F7D6D0]"
          />

          <StatCard
            icon={Clock3}
            label="Under Review"
            value={underReviewProblems}
            iconClass="bg-amber-50"
          />

          <StatCard
            icon={CheckCircle2}
            label="Validated"
            value={validatedProblems}
            iconClass="bg-blue-50"
          />

          <StatCard
            icon={XCircle}
            label="Rejected"
            value={rejectedProblems}
            iconClass="bg-red-50"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Recent Problems */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-[#E2B4BD]/40 bg-white p-5 shadow-sm">

              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Recent Problems
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Your latest reported civic problems
                  </p>
                </div>

                <Link
                  to="/citizen/problems"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-gray-700 hover:text-gray-900"
                >
                  View all
                  <ArrowRight size={16} />
                </Link>
              </div>

              {recentProblems.length === 0 && !loading ? (
                <div className="rounded-xl bg-gray-50 px-6 py-10 text-center">
                  <FileText
                    size={30}
                    className="mx-auto text-gray-400"
                  />

                  <p className="mt-3 text-sm font-medium text-gray-700">
                    No problems reported yet
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Start by reporting a civic problem in your area.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentProblems.map((problem) => {
                    const status =
                      problem.status || "SUBMITTED";

                    return (
                      <Link
                        key={problem.id}
                        to={`/citizen/problems/${problem.id}`}
                        className="block rounded-xl border border-gray-100 p-4 transition hover:border-gray-300 hover:bg-gray-50"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <span className="rounded-lg bg-[#F7D6D0] px-2 py-1 text-xs font-semibold text-gray-600">
                                #{problem.id}
                              </span>

                              {problem.category && (
                                <span className="rounded-lg bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                                  {problem.category}
                                </span>
                              )}
                            </div>

                            <h3 className="truncate text-sm font-bold text-gray-900">
                              {problem.title ||
                                "Untitled Problem"}
                            </h3>

                            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <MapPin size={13} />
                                {problem.location ||
                                  problem.district ||
                                  "Location not specified"}
                              </span>

                              <span>
                                {formatDate(
                                  problem.created_at ||
                                    problem.createdAt ||
                                    problem.submitted_at ||
                                    problem.submittedAt
                                )}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                            <StatusBadge status={status} />
                            <PriorityBadge
                              priority={problem.priority}
                            />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Priority Overview */}
          <div>
            <div className="rounded-2xl border border-[#E2B4BD]/40 bg-white p-5 shadow-sm">
              <div className="mb-5">
                <h2 className="text-lg font-bold text-gray-900">
                  Priority Overview
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Problems grouped by priority
                </p>
              </div>

              <div className="space-y-3">
                <PriorityRow
                  priority="HIGH"
                  count={highPriority}
                />

                <PriorityRow
                  priority="MEDIUM"
                  count={mediumPriority}
                />

                <PriorityRow
                  priority="LOW"
                  count={lowPriority}
                />
              </div>

              <div className="mt-5 rounded-xl bg-[#FFF5F5] p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp
                    size={17}
                    className="text-gray-600"
                  />

                  <p className="text-sm font-semibold text-gray-800">
                    Keep tracking
                  </p>
                </div>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  You can open any reported problem to see its
                  latest status and details.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* View All Problems */}
        <div className="mt-6">
          <Link
            to="/citizen/problems"
            className="group flex items-center justify-between rounded-2xl border border-[#E2B4BD]/40 bg-white p-5 shadow-sm transition hover:border-gray-300 hover:shadow-md"
          >
            <div>
              <p className="text-sm font-semibold text-gray-900">
                View My Problems
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Search, filter and track all your reported problems.
              </p>
            </div>

            <ArrowRight
              size={20}
              className="text-gray-500 transition group-hover:translate-x-1 group-hover:text-gray-900"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CitizenDashboard;