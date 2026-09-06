
import { useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { Link } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";

const API_URL = "http://127.0.0.1:8000";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    setEmail(event.target.value);

    if (error) {
      setError("");
    }

    if (success) {
      setSuccess(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        trimmedEmail
      )
    ) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: trimmedEmail,
          }),
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data.detail ||
            data.message ||
            "Unable to send password reset link."
        );
      }

      setSuccess(true);
    } catch (err) {
      console.error(
        "Forgot password request failed:",
        err
      );

      setError(
        err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    setSuccess(false);
    setError("");
  };

  return (
    <AuthLayout>
      {/* Back */}
      <Link
        to="/login"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#4A4A4A]/60 transition hover:text-[#4A4A4A]"
      >
        <ArrowLeft size={16} />
        Back to Login
      </Link>

      {/* Main Card */}
      <div className="rounded-3xl bg-white p-7 shadow-sm sm:p-9">

        {/* Header */}
        <div className="mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7D6D0] text-[#4A4A4A]">
            <Mail
              size={25}
              strokeWidth={1.8}
            />
          </div>

          <div className="mt-5 flex items-center gap-2">
            <ShieldCheck
              size={15}
              className="text-[#4A4A4A]/50"
            />

            <span className="text-xs font-semibold uppercase tracking-wider text-[#4A4A4A]/50">
              Account Recovery
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-bold text-[#4A4A4A]">
            Forgot your password?
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#4A4A4A]/60">
            Enter your registered email address and
            we'll send you a secure link to reset your
            password.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <p>{error}</p>
          </div>
        )}

        {/* Success */}
        {success ? (
          <div>
            <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-4 text-sm text-green-700">
              <CheckCircle2
                size={20}
                className="mt-0.5 shrink-0"
              />

              <div>
                <p className="font-semibold">
                  Check your email
                </p>

                <p className="mt-1 leading-6 text-green-700/80">
                  If an account exists for{" "}
                  <strong>{email}</strong>, a password
                  reset link has been sent.
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-[#FFF5F5] px-4 py-3 text-xs leading-5 text-[#4A4A4A]/60">
              Didn't receive the email? Check your
              spam or junk folder. You can also try
              another email address.
            </div>

            <button
              type="button"
              onClick={handleTryAgain}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#E2B4BD]/60 bg-white py-3.5 text-sm font-semibold text-[#4A4A4A] transition hover:bg-[#FFF5F5]"
            >
              Try Again
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Email */}
            <div>
              <label
                htmlFor="forgot-email"
                className="mb-2 block text-sm font-semibold text-[#4A4A4A]"
              >
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A4A]/40"
                />

                <input
                  id="forgot-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  disabled={loading}
                  className="w-full rounded-xl border border-[#E2B4BD]/60 bg-[#FFF5F5] py-3 pl-10 pr-4 text-sm text-[#4A4A4A] outline-none transition placeholder:text-[#4A4A4A]/35 focus:border-[#4A4A4A] disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#4A4A4A] py-3.5 font-semibold text-white transition hover:bg-[#4A4A4A]/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <span className="h-[18px] w-[18px] animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Sending Reset Link...
                </>
              ) : (
                <>
                  Send Reset Link
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>
        )}

        {/* Login */}
        <p className="mt-7 text-center text-sm text-[#4A4A4A]/60">
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#4A4A4A] underline underline-offset-4 transition hover:opacity-70"
          >
            Sign In
          </Link>
        </p>
      </div>

      {/* Security */}
      <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#4A4A4A]/45">
        <ShieldCheck size={13} />
        Secure password recovery
      </div>
    </AuthLayout>
  );
}

export default ForgotPassword;

