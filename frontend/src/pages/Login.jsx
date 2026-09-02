import { ArrowLeft, LockKeyhole, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Temporary prototype login.
    // Real authentication will be implemented in Phase 2.
    login({
      id: "demo-user",
      name: "Demo Citizen",
      email: "demo@samanvay.local",
      role: "citizen",
    });

    navigate("/citizen");
  };

  return (
    <AuthLayout>
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#4A4A4A]/60 hover:text-[#4A4A4A]"
      >
        <ArrowLeft size={16} />
        Back to Samanvay
      </Link>

      <div className="rounded-3xl bg-white p-7 shadow-sm sm:p-9">
        <div className="mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E2B4BD] font-bold">
            S
          </div>

          <h1 className="mt-6 text-2xl font-bold">
            Welcome back
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#4A4A4A]/60">
            Sign in to continue to your Samanvay workspace.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold"
            >
              Email
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A4A]/40"
              />

              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#E2B4BD]/60 bg-[#FFF5F5] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#4A4A4A]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold"
            >
              Password
            </label>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A4A]/40"
              />

              <input
                id="password"
                type="password"
                required
                placeholder="Enter your password"
                className="w-full rounded-xl border border-[#E2B4BD]/60 bg-[#FFF5F5] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#4A4A4A]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#4A4A4A] py-3.5 font-semibold text-white transition hover:bg-[#4A4A4A]/90"
          >
            Sign In
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-[#4A4A4A]/60">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#4A4A4A] underline underline-offset-4"
          >
            Register
          </Link>
        </p>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#4A4A4A]/45">
        <LockKeyhole size={13} />
        Secure authentication
      </div>
    </AuthLayout>
  );
}

export default Login;