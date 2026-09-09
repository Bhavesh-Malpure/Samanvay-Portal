import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  FileText,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import ProblemStatus from "../../components/problems/ProblemStatus";
import ProblemMap from "../../components/problems/ProblemMap";
import { getProblemById } from "../../services/problemService";

const API_BASE_URL = "http://127.0.0.1:8000";

function formatStatus(status) {
  if (!status) return "Submitted";

  return String(status)
    .toLowerCase()
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

function formatPriority(priority) {
  if (!priority) return "Minimum";

  return String(priority)
    .toLowerCase()
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

function formatDate(date) {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getImageUrl(imagePath) {
  if (!imagePath) return "";

  if (
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://")
  ) {
    return imagePath;
  }

  return `${API_BASE_URL}${imagePath}`;
}

function ProblemDetails() {
  const { id } = useParams();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProblem = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProblemById(id);

        console.log("PROBLEM DETAILS:", data);

        setProblem(data);
      } catch (err) {
        console.error("Failed to load problem:", err);

        setError(
          err.message ||
            "Unable to load this problem."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProblem();
    }
  }, [id]);

  const formattedProblem = useMemo(() => {
    if (!problem) {
      return null;
    }

    return {
      ...problem,

      id: problem.id,

      title:
        problem.title ||
        "Untitled Problem",

      description:
        problem.description || "",

      category:
        problem.category ||
        problem.ai_category ||
        "Other",

      location:
        problem.location ||
        problem.district ||
        "Location not specified",

      status: formatStatus(problem.status),

      priority: formatPriority(problem.priority),

      date: formatDate(problem.created_at),

      reporter:
        problem.reporter ||
        "You",

      department:
        problem.department ||
        "Not assigned yet",

      aiSummary:
        problem.ai_summary ||
        "AI analysis will be available after the problem is analyzed.",

      images: Array.isArray(problem.images)
        ? problem.images
        : [],
    };
  }, [problem]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFF5F5] px-5 text-[#4A4A4A]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#E2B4BD] border-t-[#4A4A4A]" />

          <p className="mt-4 text-sm font-medium">
            Loading problem details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !formattedProblem) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFF5F5] px-5 text-[#4A4A4A]">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Problem not found
          </h1>

          <p className="mt-2 text-sm text-[#4A4A4A]/55">
            {error ||
              "The requested problem does not exist."}
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

  const problemData = formattedProblem;

  return (
    <div className="min-h-screen bg-[#FFF5F5] text-[#4A4A4A]">
      {/* Header */}
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
              SAM-
              {String(problemData.id).padStart(3, "0")}
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8">

        {/* Main Problem */}
        <section className="rounded-3xl border border-[#E2B4BD]/40 bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#F7D6D0] px-3 py-1 text-xs font-semibold">
                  {problemData.category}
                </span>

                <span className="text-xs text-[#4A4A4A]/45">
                  SAM-
                  {String(problemData.id).padStart(3, "0")}
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                {problemData.title}
              </h2>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-[#4A4A4A]/55">
                <span className="flex items-center gap-2">
                  <MapPin size={16} />
                  {problemData.location}
                </span>

                <span className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  {problemData.date}
                </span>
              </div>
            </div>

            <ProblemStatus
              status={problemData.status}
              priority={problemData.priority}
            />
          </div>

          <div className="mt-8 border-t border-[#E2B4BD]/30 pt-7">
            <p className="text-sm font-bold">
              Problem Description
            </p>

            <p className="mt-3 max-w-4xl leading-7 text-[#4A4A4A]/65">
              {problemData.description}
            </p>
          </div>
        </section>

        {/* Uploaded Images */}
        {problemData.images.length > 0 && (
          <section className="mt-6 rounded-3xl border border-[#E2B4BD]/40 bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7D6D0]">
                <FileText size={19} />
              </div>

              <div>
                <h2 className="font-bold">
                  Uploaded Images
                </h2>

                <p className="text-sm text-[#4A4A4A]/50">
                  Images submitted with this problem.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {problemData.images.map(
                (image, index) => {
                  const imageUrl =
                    getImageUrl(image);

                  return (
                    <div
                      key={`${image}-${index}`}
                      className="overflow-hidden rounded-2xl border border-[#E2B4BD]/40 bg-[#FFF5F5]"
                    >
                      <img
                        src={imageUrl}
                        alt={`Problem image ${index + 1}`}
                        className="h-72 w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                        onError={(event) => {
                          event.currentTarget.style.display =
                            "none";
                        }}
                      />

                      <div className="px-4 py-3">
                        <p className="text-xs font-medium text-[#4A4A4A]/50">
                          Image {index + 1}
                        </p>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </section>
        )}

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
                problemData.status !== "Submitted"
              }
            />

            <TimelineStep
              title="Validated"
              active={
                problemData.status === "Validated"
              }
            />

            <TimelineStep
              title="Resolved"
              active={
                problemData.status === "Resolved"
              }
            />
          </div>
        </section>

        {/* AI Analysis */}
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
                AI-generated problem analysis
              </p>
            </div>
          </div>

          <p className="mt-5 max-w-4xl leading-7 text-[#4A4A4A]/70">
            {problemData.aiSummary}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <InfoBox
              label="Suggested Department"
              value={problemData.department}
            />

            <InfoBox
              label="Priority"
              value={problemData.priority}
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
                {problemData.location}, Dhule District
              </p>
            </div>
          </div>

          <div className="mt-5">
            <ProblemMap
              location={problemData.location}
              latitude={20.9042}
              longitude={74.7749}
            />
          </div>
        </section>

        {/* Submission Information */}
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
              value={problemData.reporter}
            />

            <InfoBox
              label="Problem ID"
              value={`SAM-${String(
                problemData.id
              ).padStart(3, "0")}`}
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
          active
            ? "bg-[#4A4A4A]"
            : "bg-[#E2B4BD]"
        }`}
      />

      <span
        className={`text-sm ${
          active
            ? "font-semibold"
            : "text-[#4A4A4A]/45"
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