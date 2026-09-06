import { ArrowLeft, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-6">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EEF2FF]">
          <ShieldAlert
            size={30}
            className="text-[#4F46E5]"
          />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-[#0F172A]">
          Access restricted
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#64748B]">
          You don't have permission to access this
          workspace with your current account.
        </p>

        <Link
          to="/"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#0F172A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1E293B]"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;