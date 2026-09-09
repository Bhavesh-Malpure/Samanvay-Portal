import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  MapPin,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import ProblemForm from "../../components/problems/ProblemForm";
import { createProblem } from "../../services/problemService";

function SubmitProblem() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const submittedProblem = await createProblem(formData);

      console.log(
        "Problem created successfully:",
        submittedProblem
      );

      navigate("/citizen/problems", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Problem submission failed:",
        error
      );

      alert(
        error.message ||
          "Unable to submit problem. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF5F5] text-[#4A4A4A]">
      <header className="border-b border-[#E2B4BD]/40 bg-white">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-5 py-5 sm:px-8">
          <Link
            to="/citizen"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E2B4BD]/50 transition hover:bg-[#F7D6D0]"
            aria-label="Back to dashboard"
          >
            <ArrowLeft size={18} />
          </Link>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#4A4A4A]/45">
              Citizen Workspace
            </p>

            <h1 className="text-xl font-bold">
              Report a Problem
            </h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
        <div className="rounded-3xl bg-[#E2B4BD] p-7 sm:p-9">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#4A4A4A]/55">
              Community reporting
            </p>

            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Tell us about a problem in your area.
            </h2>

            <p className="mt-4 leading-7 text-[#4A4A4A]/70">
              Provide clear information about the issue. Your
              submission will later be analyzed and routed to
              the appropriate stakeholders.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-[#E2B4BD]/40 bg-white p-6 sm:p-8">
          <div className="mb-8 flex items-start gap-4 rounded-2xl bg-[#FFF5F5] p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F7D6D0]">
              <MapPin size={19} />
            </div>

            <div>
              <p className="text-sm font-semibold">
                Submission location
              </p>

              <p className="mt-1 text-sm text-[#4A4A4A]/55">
                Dhule District
              </p>
            </div>
          </div>

          <ProblemForm onSubmit={handleSubmit} />
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#E2B4BD]/40 bg-white p-5">
          <CheckCircle2
            size={19}
            className="mt-0.5 shrink-0"
          />

          <p className="text-sm leading-6 text-[#4A4A4A]/60">
            By submitting this problem, you confirm that the
            information provided is accurate to the best of your
            knowledge.
          </p>
        </div>
      </main>
    </div>
  );
}

export default SubmitProblem;