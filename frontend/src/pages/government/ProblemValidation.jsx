import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Eye,
  FileText,
  MapPin,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/common/Navbar";
import EmptyState from "../../components/common/EmptyState";
import api from "../../services/api";


function formatStatus(status) {
  switch (status) {
    case "SUBMITTED":
      return "Submitted";

    case "UNDER_REVIEW":
      return "Under Review";

    case "VALIDATED":
      return "Validated";

    case "REJECTED":
      return "Rejected";

    default:
      return status || "Unknown";
  }
}


function formatPriority(priority) {
  switch (priority) {
    case "MEDIUM_HIGH":
      return "Medium-High";

    case "HIGH":
      return "High";

    case "MEDIUM":
      return "Medium";

    case "LOW":
      return "Low";

    case "MINIMUM":
      return "Minimum";

    default:
      return priority || "Not Assigned";
  }
}


function formatDate(date) {
  if (!date) {
    return "Not available";
  }

  try {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "Not available";
  }
}


function getStatusClasses(status) {
  switch (status) {
    case "VALIDATED":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";

    case "REJECTED":
      return "border-red-200 bg-red-50 text-red-700";

    case "UNDER_REVIEW":
      return "border-amber-200 bg-amber-50 text-amber-700";

    case "SUBMITTED":
    default:
      return "border-blue-200 bg-blue-50 text-blue-700";
  }
}


function ProblemCard({
  problem,
  onValidate,
  onReject,
  onView,
}) {
  const canTakeAction =
    problem.status === "SUBMITTED" ||
    problem.status === "UNDER_REVIEW";

  return (
    <div className="rounded-2xl border border-[#E8D9D5] bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-[#F8F1EF] px-2.5 py-1 text-xs font-semibold text-[#7B4B3A]">
              Problem #{problem.id}
            </span>

            <span
              className={`rounded-lg border px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                problem.status
              )}`}
            >
              {formatStatus(problem.status)}
            </span>
          </div>

          <h3 className="text-lg font-bold text-[#2D211E]">
            {problem.title}
          </h3>

          <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#6F625E]">
            {problem.description}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-[#FAF7F6] p-3">
          <div className="flex items-center gap-2 text-xs font-medium text-[#8A7B75]">
            <FileText size={15} />
            Category
          </div>

          <p className="mt-1 text-sm font-semibold text-[#3B2C27]">
            {problem.category || "Not specified"}
          </p>
        </div>

        <div className="rounded-xl bg-[#FAF7F6] p-3">
          <div className="flex items-center gap-2 text-xs font-medium text-[#8A7B75]">
            <MapPin size={15} />
            Location
          </div>

          <p className="mt-1 text-sm font-semibold text-[#3B2C27]">
            {problem.location || "Not specified"}
          </p>
        </div>

        <div className="rounded-xl bg-[#FAF7F6] p-3">
          <div className="flex items-center gap-2 text-xs font-medium text-[#8A7B75]">
            <AlertTriangle size={15} />
            Priority
          </div>

          <p className="mt-1 text-sm font-semibold text-[#3B2C27]">
            {formatPriority(problem.priority)}
          </p>
        </div>

        <div className="rounded-xl bg-[#FAF7F6] p-3">
          <div className="flex items-center gap-2 text-xs font-medium text-[#8A7B75]">
            <Clock3 size={15} />
            Submitted
          </div>

          <p className="mt-1 text-sm font-semibold text-[#3B2C27]">
            {formatDate(problem.created_at)}
          </p>
        </div>
      </div>

      {/* AI Summary */}
      {problem.ai_summary && (
        <div className="mt-4 rounded-xl border border-purple-100 bg-purple-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-purple-700">
            AI Summary
          </p>

          <p className="mt-1 text-sm leading-6 text-purple-900">
            {problem.ai_summary}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[#F0E7E4] pt-4">
        <button
          type="button"
          onClick={() => onView(problem)}
          className="inline-flex items-center gap-2 rounded-xl border border-[#DCCBC5] bg-white px-4 py-2.5 text-sm font-semibold text-[#5D4037] transition hover:bg-[#FAF5F3]"
        >
          <Eye size={17} />
          View Details
        </button>

        {canTakeAction && (
          <>
            <button
              type="button"
              onClick={() => onValidate(problem)}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              <CheckCircle2 size={17} />
              Validate
            </button>

            <button
              type="button"
              onClick={() => onReject(problem)}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              <XCircle size={17} />
              Reject
            </button>
          </>
        )}
      </div>
    </div>
  );
}


function ProblemDetailsModal({
  problem,
  onClose,
  onValidate,
  onReject,
}) {
  if (!problem) {
    return null;
  }

  const canTakeAction =
    problem.status === "SUBMITTED" ||
    problem.status === "UNDER_REVIEW";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#E8D9D5] bg-white px-6 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#9A6B58]">
              Problem #{problem.id}
            </p>

            <h2 className="mt-1 text-xl font-bold text-[#2D211E]">
              {problem.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-[#776963] transition hover:bg-[#F7F1EF] hover:text-[#3B2C27]"
          >
            <XCircle size={22} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-5 p-6">
          <div>
            <p className="text-sm font-semibold text-[#4D3A33]">
              Description
            </p>

            <p className="mt-2 text-sm leading-7 text-[#6F625E]">
              {problem.description}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-[#FAF7F6] p-4">
              <p className="text-xs font-medium text-[#8A7B75]">
                Category
              </p>

              <p className="mt-1 font-semibold text-[#3B2C27]">
                {problem.category || "Not specified"}
              </p>
            </div>

            <div className="rounded-xl bg-[#FAF7F6] p-4">
              <p className="text-xs font-medium text-[#8A7B75]">
                Status
              </p>

              <p className="mt-1 font-semibold text-[#3B2C27]">
                {formatStatus(problem.status)}
              </p>
            </div>

            <div className="rounded-xl bg-[#FAF7F6] p-4">
              <p className="text-xs font-medium text-[#8A7B75]">
                Location
              </p>

              <p className="mt-1 font-semibold text-[#3B2C27]">
                {problem.location || "Not specified"}
              </p>
            </div>

            <div className="rounded-xl bg-[#FAF7F6] p-4">
              <p className="text-xs font-medium text-[#8A7B75]">
                District
              </p>

              <p className="mt-1 font-semibold text-[#3B2C27]">
                {problem.district || "Not specified"}
              </p>
            </div>

            <div className="rounded-xl bg-[#FAF7F6] p-4">
              <p className="text-xs font-medium text-[#8A7B75]">
                Priority
              </p>

              <p className="mt-1 font-semibold text-[#3B2C27]">
                {formatPriority(problem.priority)}
              </p>
            </div>

            <div className="rounded-xl bg-[#FAF7F6] p-4">
              <p className="text-xs font-medium text-[#8A7B75]">
                Submitted On
              </p>

              <p className="mt-1 font-semibold text-[#3B2C27]">
                {formatDate(problem.created_at)}
              </p>
            </div>
          </div>

          {problem.ai_category && (
            <div className="rounded-xl border border-purple-100 bg-purple-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-purple-700">
                AI Category
              </p>

              <p className="mt-1 text-sm font-semibold text-purple-900">
                {problem.ai_category}
              </p>
            </div>
          )}

          {problem.ai_summary && (
            <div className="rounded-xl border border-purple-100 bg-purple-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-purple-700">
                AI Summary
              </p>

              <p className="mt-1 text-sm leading-6 text-purple-900">
                {problem.ai_summary}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex flex-wrap justify-end gap-3 border-t border-[#E8D9D5] px-6 py-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#DCCBC5] px-5 py-2.5 text-sm font-semibold text-[#5D4037] transition hover:bg-[#FAF5F3]"
          >
            Close
          </button>

          {canTakeAction && (
            <>
              <button
                type="button"
                onClick={() => onReject(problem)}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                <XCircle size={17} />
                Reject
              </button>

              <button
                type="button"
                onClick={() => onValidate(problem)}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                <CheckCircle2 size={17} />
                Validate
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


export default function ProblemValidation() {
  const navigate = useNavigate();

  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("awaiting");
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // =========================================================
  // LOAD ALL GOVERNMENT PROBLEMS
  // =========================================================

  async function loadProblems() {
    try {
      setLoading(true);

      const response = await api.get(
        "/api/government/problems/all"
      );

      const backendProblems = Array.isArray(response.data)
        ? response.data
        : [];

      setProblems(backendProblems);
    } catch (error) {
      console.error(
        "Failed to load government problems:",
        error
      );

      setMessage({
        type: "error",
        text:
          error.message ||
          "Unable to load government problems.",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProblems();
  }, []);

  // Refresh whenever user comes back to the page
  useEffect(() => {
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
  }, []);

  // =========================================================
  // COUNTS
  // =========================================================

  const awaitingProblems = useMemo(
    () =>
      problems.filter(
        (problem) =>
          problem.status === "SUBMITTED" ||
          problem.status === "UNDER_REVIEW"
      ),
    [problems]
  );

  const validatedProblems = useMemo(
    () =>
      problems.filter(
        (problem) => problem.status === "VALIDATED"
      ),
    [problems]
  );

  const rejectedProblems = useMemo(
    () =>
      problems.filter(
        (problem) => problem.status === "REJECTED"
      ),
    [problems]
  );

  const activeProblems = useMemo(() => {
    switch (activeTab) {
      case "validated":
        return validatedProblems;

      case "rejected":
        return rejectedProblems;

      case "awaiting":
      default:
        return awaitingProblems;
    }
  }, [
    activeTab,
    awaitingProblems,
    validatedProblems,
    rejectedProblems,
  ]);

  // =========================================================
  // VALIDATE
  // SUBMITTED -> UNDER_REVIEW -> VALIDATED
  // =========================================================

  async function handleValidate(problem) {
    if (!problem) {
      return;
    }

    try {
      setActionLoading(true);
      setMessage(null);

      // If problem is still SUBMITTED,
      // first move it to UNDER_REVIEW.
      if (problem.status === "SUBMITTED") {
        await api.post(
          `/api/government/problems/${problem.id}/review`,
          {
            comment:
              "Problem opened for government validation.",
          }
        );
      }

      // Then validate it.
      await api.post(
        `/api/government/problems/${problem.id}/validate`,
        {
          comment:
            "Problem validated by government authority.",
        }
      );

      setSelectedProblem(null);

      setMessage({
        type: "success",
        text: `Problem #${problem.id} has been validated successfully.`,
      });

      // Reload from database so the problem
      // immediately appears in Validated tab.
      await loadProblems();

      setActiveTab("validated");
    } catch (error) {
      console.error(
        "Problem validation failed:",
        error
      );

      setMessage({
        type: "error",
        text:
          error.message ||
          "Unable to validate the problem.",
      });
    } finally {
      setActionLoading(false);
    }
  }

  // =========================================================
  // REJECT
  // SUBMITTED -> UNDER_REVIEW -> REJECTED
  // =========================================================

  async function handleReject(problem) {
    if (!problem) {
      return;
    }

    try {
      setActionLoading(true);
      setMessage(null);

      // If problem is still SUBMITTED,
      // first move it to UNDER_REVIEW.
      if (problem.status === "SUBMITTED") {
        await api.post(
          `/api/government/problems/${problem.id}/review`,
          {
            comment:
              "Problem opened for government review.",
          }
        );
      }

      // Then reject it.
      await api.post(
        `/api/government/problems/${problem.id}/reject`,
        {
          comment:
            "Problem rejected by government authority.",
        }
      );

      setSelectedProblem(null);

      setMessage({
        type: "success",
        text: `Problem #${problem.id} has been rejected.`,
      });

      // Reload from database.
      await loadProblems();

      setActiveTab("rejected");
    } catch (error) {
      console.error(
        "Problem rejection failed:",
        error
      );

      setMessage({
        type: "error",
        text:
          error.message ||
          "Unable to reject the problem.",
      });
    } finally {
      setActionLoading(false);
    }
  }

  // =========================================================
  // TAB CONFIG
  // =========================================================

  const tabs = [
    {
      id: "awaiting",
      label: "Awaiting Validation",
      count: awaitingProblems.length,
      icon: Clock3,
    },
    {
      id: "validated",
      label: "Validated",
      count: validatedProblems.length,
      icon: CheckCircle2,
    },
    {
      id: "rejected",
      label: "Rejected",
      count: rejectedProblems.length,
      icon: XCircle,
    },
  ];

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="min-h-screen bg-[#FBF8F7]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate("/government")}
            className="mb-4 text-sm font-semibold text-[#8B5E4A] hover:text-[#5D4037]"
          >
            ← Back to Government Dashboard
          </button>

          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-[#9A6B58]">
                Government Workspace
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#2D211E]">
                Problem Validation
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6F625E]">
                Review citizen-submitted problems, validate
                genuine issues, and manage rejected cases.
              </p>
            </div>

            <button
              type="button"
              onClick={loadProblems}
              disabled={loading}
              className="rounded-xl border border-[#DCCBC5] bg-white px-4 py-2.5 text-sm font-semibold text-[#5D4037] transition hover:bg-[#FAF5F3] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-6 rounded-2xl border px-4 py-3 text-sm font-medium ${
              message.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex min-w-max gap-2 rounded-2xl border border-[#E8D9D5] bg-white p-2 shadow-sm">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-[#5D4037] text-white shadow-sm"
                      : "text-[#6F625E] hover:bg-[#F8F1EF] hover:text-[#3B2C27]"
                  }`}
                >
                  <Icon size={17} />

                  <span>{tab.label}</span>

                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-[#F1E8E5] text-[#6F625E]"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Section */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-[#2D211E]">
            {activeTab === "awaiting" &&
              "Problems Awaiting Validation"}

            {activeTab === "validated" &&
              "Validated Problems"}

            {activeTab === "rejected" &&
              "Rejected Problems"}
          </h2>

          <p className="mt-1 text-sm text-[#7B6C66]">
            {activeTab === "awaiting" &&
              "Problems that still require government review."}

            {activeTab === "validated" &&
              "Problems that have been successfully validated."}

            {activeTab === "rejected" &&
              "Problems that were rejected during government review."}
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="rounded-2xl border border-[#E8D9D5] bg-white p-12 text-center shadow-sm">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#E8D9D5] border-t-[#5D4037]" />

            <p className="mt-4 text-sm font-medium text-[#6F625E]">
              Loading problems...
            </p>
          </div>
        ) : activeProblems.length === 0 ? (
          <EmptyState
            title={
              activeTab === "awaiting"
                ? "No problems awaiting validation"
                : activeTab === "validated"
                ? "No validated problems"
                : "No rejected problems"
            }
            description={
              activeTab === "awaiting"
                ? "All currently submitted problems have been processed."
                : activeTab === "validated"
                ? "Validated problems will appear here."
                : "Rejected problems will appear here."
            }
          />
        ) : (
          <div className="space-y-4">
            {activeProblems.map((problem) => (
              <ProblemCard
                key={problem.id}
                problem={problem}
                onValidate={handleValidate}
                onReject={handleReject}
                onView={setSelectedProblem}
              />
            ))}
          </div>
        )}
      </main>

      {/* Details Modal */}
      <ProblemDetailsModal
        problem={selectedProblem}
        onClose={() => {
          if (!actionLoading) {
            setSelectedProblem(null);
          }
        }}
        onValidate={handleValidate}
        onReject={handleReject}
      />

      {/* Action Loading Overlay */}
      {actionLoading && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/20">
          <div className="rounded-2xl bg-white px-6 py-5 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 animate-spin rounded-full border-3 border-[#DCCBC5] border-t-[#5D4037]" />

              <p className="text-sm font-semibold text-[#3B2C27]">
                Updating problem status...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}